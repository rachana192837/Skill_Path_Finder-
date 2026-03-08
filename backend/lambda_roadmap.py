import json
import boto3
import uuid
from datetime import datetime

bedrock = boto3.client('bedrock-runtime', region_name='ap-south-1')
dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')

roadmaps_table = dynamodb.Table('skillpath-roadmaps')
users_table = dynamodb.Table('skillpath-users')

MODEL_ID = 'apac.anthropic.claude-3-haiku-20240307-v1:0'

ROADMAP_PROMPT = """You are an expert career counselor for rural Indian youth. 
Based on the skill profile provided, generate a detailed 3-month learning roadmap using ONLY free government resources.

Return ONLY valid JSON in this exact format:
{
  "roadmap_title": "Title in English",
  "roadmap_title_hi": "Title in Hindi",
  "total_duration": "3 months",
  "career_goal": "Target job role",
  "monthly_income_target": "₹8,000 - ₹12,000",
  "months": [
    {
      "month": 1,
      "title": "Month 1 title",
      "title_hi": "Month 1 title in Hindi",
      "focus": "Main skill focus",
      "courses": [
        {
          "name": "Course name",
          "platform": "SWAYAM / PMGDISHA / NIELIT / DigiLocker",
          "url": "https://swayam.gov.in",
          "duration_weeks": 2,
          "hours_per_week": 3,
          "description": "What they will learn",
          "description_hi": "Hindi description"
        }
      ],
      "project": {
        "title": "Project title",
        "title_hi": "Project title in Hindi",
        "description": "What to build/do",
        "description_hi": "Hindi description",
        "skills_demonstrated": ["skill1", "skill2"]
      },
      "milestone": "What they achieve by end of month"
    },
    {
      "month": 2,
      "title": "Month 2 title",
      "title_hi": "Month 2 title in Hindi",
      "focus": "Main skill focus",
      "courses": [
        {
          "name": "Course name",
          "platform": "SWAYAM / PMGDISHA / NIELIT",
          "url": "https://swayam.gov.in",
          "duration_weeks": 3,
          "hours_per_week": 4,
          "description": "What they will learn",
          "description_hi": "Hindi description"
        }
      ],
      "project": {
        "title": "Project title",
        "title_hi": "Project title in Hindi",
        "description": "What to build/do",
        "description_hi": "Hindi description",
        "skills_demonstrated": ["skill1", "skill2"]
      },
      "milestone": "What they achieve by end of month"
    },
    {
      "month": 3,
      "title": "Month 3 title",
      "title_hi": "Month 3 title in Hindi",
      "focus": "Main skill focus",
      "courses": [
        {
          "name": "Course name",
          "platform": "SWAYAM / PMGDISHA / NIELIT",
          "url": "https://swayam.gov.in",
          "duration_weeks": 4,
          "hours_per_week": 5,
          "description": "What they will learn",
          "description_hi": "Hindi description"
        }
      ],
      "project": {
        "title": "Final project title",
        "title_hi": "Final project title in Hindi",
        "description": "Final comprehensive project",
        "description_hi": "Hindi description",
        "skills_demonstrated": ["skill1", "skill2", "skill3"]
      },
      "milestone": "Job-ready milestone"
    }
  ],
  "government_schemes": [
    {
      "name": "PMKVY / PMGDISHA / other relevant scheme",
      "benefit": "What benefit they get",
      "url": "https://pmkvyofficial.org"
    }
  ],
  "success_message_hi": "Encouraging message in Hindi",
  "success_message_en": "Encouraging message in English"
}

Use these real government platforms:
- SWAYAM: https://swayam.gov.in (free courses)
- PMGDISHA: https://www.pmgdisha.in (digital literacy)
- NIELIT: https://www.nielit.gov.in (IT courses)
- NSDC: https://www.nsdcindia.org (skill development)
- MyGov: https://www.mygov.in (government schemes)
- DigiLocker: https://www.digilocker.gov.in

Return ONLY the JSON. No extra text."""


def lambda_handler(event, context):
    if event.get('httpMethod') == 'OPTIONS':
        return cors_response(200, {})

    try:
        body = json.loads(event.get('body', '{}'))
        user_id = body.get('userId', '')
        skill_profile = body.get('skillProfile', None)

        # If no skill profile passed, get from DynamoDB
        if not skill_profile and user_id:
            user_result = users_table.get_item(Key={'userId': user_id})
            if 'Item' in user_result:
                skill_profile = user_result['Item'].get('skillProfile', {})

        if not skill_profile:
            return cors_response(400, {'error': 'No skill profile found'})

        # Generate roadmap using Bedrock
        prompt = f"""Generate a personalized learning roadmap for this student:

Skill Profile:
{json.dumps(skill_profile, indent=2)}

Create a 3-month roadmap tailored to their background, goals, and available time."""

        response = bedrock.invoke_model(
            modelId=MODEL_ID,
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 3000,
                "system": ROADMAP_PROMPT,
                "messages": [{"role": "user", "content": prompt}]
            }),
            contentType='application/json',
            accept='application/json'
        )

        response_body = json.loads(response['body'].read())
        roadmap_text = response_body['content'][0]['text']

        # Parse roadmap JSON
        try:
            # Clean up response if needed
            roadmap_text = roadmap_text.strip()
            if roadmap_text.startswith('```'):
                roadmap_text = roadmap_text.split('```')[1]
                if roadmap_text.startswith('json'):
                    roadmap_text = roadmap_text[4:]
            roadmap = json.loads(roadmap_text)
        except json.JSONDecodeError:
            roadmap = {"raw": roadmap_text, "error": "Could not parse roadmap"}

        # Save roadmap to DynamoDB
        roadmap_id = str(uuid.uuid4())
        roadmaps_table.put_item(Item={
            'userId': user_id if user_id else roadmap_id,
            'roadmapId': roadmap_id,
            'roadmap': roadmap,
            'skillProfile': skill_profile,
            'createdAt': datetime.now().isoformat(),
            'progress': {
                'month1': False,
                'month2': False,
                'month3': False,
                'completedProjects': []
            }
        })

        # Update user record
        if user_id:
            users_table.update_item(
                Key={'userId': user_id},
                UpdateExpression='SET roadmapGenerated = :val, roadmapId = :rid',
                ExpressionAttributeValues={':val': True, ':rid': roadmap_id}
            )

        return cors_response(200, {
            'userId': user_id,
            'roadmapId': roadmap_id,
            'roadmap': roadmap
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return cors_response(500, {'error': str(e)})


def cors_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
        },
        'body': json.dumps(body, ensure_ascii=False)
    }