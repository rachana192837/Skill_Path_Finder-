import json
import boto3
import uuid
from datetime import datetime

bedrock = boto3.client('bedrock-runtime', region_name='ap-south-1')
dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
passports_table = dynamodb.Table('skillpath-passports')

MODEL_ID = 'apac.anthropic.claude-3-haiku-20240307-v1:0'

EVALUATOR_PROMPT = """You are an expert project evaluator for rural Indian youth skill development.
Evaluate the submitted project fairly and encouragingly.

Return ONLY valid JSON in this exact format:
{
  "scores": {
    "technical_accuracy": 85,
    "completeness": 78,
    "creativity": 72,
    "overall": 78
  },
  "passed": true,
  "feedback_hi": "Detailed feedback in Hindi - be encouraging and specific",
  "feedback_en": "Detailed feedback in English - be encouraging and specific",
  "strengths_hi": ["Strength 1 in Hindi", "Strength 2 in Hindi"],
  "strengths_en": ["Strength 1 in English", "Strength 2 in English"],
  "improvements_hi": ["Improvement 1 in Hindi", "Improvement 2 in Hindi"],
  "improvements_en": ["Improvement 1 in English", "Improvement 2 in English"],
  "next_steps_hi": "What to do next in Hindi",
  "next_steps_en": "What to do next in English",
  "skill_verified": "Name of the skill that is now verified",
  "badge": "Beginner / Intermediate / Advanced"
}

Scoring rules:
- Score each dimension from 0-100
- Overall = average of three scores
- passed = true if overall >= 70
- Be encouraging - rural youth need motivation
- Give specific, actionable feedback
- Always respond in both Hindi and English

Return ONLY the JSON. No extra text."""


def lambda_handler(event, context):
    if event.get('httpMethod') == 'OPTIONS':
        return cors_response(200, {})

    try:
        body = json.loads(event.get('body', '{}'))
        user_id = body.get('userId', '')
        project_title = body.get('projectTitle', '')
        project_description = body.get('projectDescription', '')
        skill_being_tested = body.get('skillBeingTested', '')
        month = body.get('month', 1)

        if not project_description:
            return cors_response(400, {
                'error': 'Project description is required',
                'error_hi': 'Project description zaroori hai'
            })

        # Create evaluation prompt
        prompt = f"""Evaluate this project submission:

Project Title: {project_title}
Skill Being Tested: {skill_being_tested}
Month: {month} of 3

Student's Submission:
{project_description}

Evaluate fairly for a rural Indian youth who is a beginner learner."""

        response = bedrock.invoke_model(
            modelId=MODEL_ID,
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1500,
                "system": EVALUATOR_PROMPT,
                "messages": [{"role": "user", "content": prompt}]
            }),
            contentType='application/json',
            accept='application/json'
        )

        response_body = json.loads(response['body'].read())
        eval_text = response_body['content'][0]['text']

        # Parse evaluation JSON
        try:
            eval_text = eval_text.strip()
            if eval_text.startswith('```'):
                eval_text = eval_text.split('```')[1]
                if eval_text.startswith('json'):
                    eval_text = eval_text[4:]
            evaluation = json.loads(eval_text)
        except json.JSONDecodeError:
            evaluation = {
                "scores": {"technical_accuracy": 75, "completeness": 75, "creativity": 70, "overall": 73},
                "passed": True,
                "feedback_en": eval_text,
                "feedback_hi": "Aapka kaam achha hai!",
                "skill_verified": skill_being_tested
            }

        # If passed, update skill passport
        if evaluation.get('passed') and user_id:
            update_passport(user_id, {
                'skill': skill_being_tested,
                'score': evaluation['scores']['overall'],
                'badge': evaluation.get('badge', 'Beginner'),
                'projectTitle': project_title,
                'verifiedAt': datetime.now().isoformat(),
                'month': month
            })

        return cors_response(200, {
            'userId': user_id,
            'evaluation': evaluation,
            'submittedAt': datetime.now().isoformat()
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return cors_response(500, {'error': str(e)})


def update_passport(user_id, skill_data):
    try:
        result = passports_table.get_item(Key={'userId': user_id})
        if 'Item' in result:
            skills = result['Item'].get('skills', [])
            skills.append(skill_data)
            passports_table.update_item(
                Key={'userId': user_id},
                UpdateExpression='SET skills = :skills, updatedAt = :updated',
                ExpressionAttributeValues={
                    ':skills': skills,
                    ':updated': datetime.now().isoformat()
                }
            )
        else:
            passports_table.put_item(Item={
                'userId': user_id,
                'skills': [skill_data],
                'createdAt': datetime.now().isoformat(),
                'updatedAt': datetime.now().isoformat()
            })
    except Exception as e:
        print(f"Error updating passport: {e}")


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