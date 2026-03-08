import json
import boto3
import uuid
from datetime import datetime
from decimal import Decimal

# AWS clients
bedrock = boto3.client('bedrock-runtime', region_name='ap-south-1')
dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')

conversations_table = dynamodb.Table('skillpath-conversations')
users_table = dynamodb.Table('skillpath-users')

MODEL_ID = 'anthropic.claude-haiku-4-5-20251001-v1:0'

SYSTEM_PROMPT = """You are Priya, a warm and encouraging career counselor for rural Indian youth aged 18-25.
Your job is to assess their skills, interests, and goals through friendly conversation.

RULES:
1. Always respond in BOTH Hindi and English (Hindi first, then English translation)
2. Ask ONE question at a time only
3. Be warm, encouraging, and simple in language
4. After 8 questions, generate a skill profile

FORMAT your response EXACTLY like this:
{
  "message_hi": "Hindi message here",
  "message_en": "English message here", 
  "question_number": 1,
  "assessment_complete": false,
  "skill_profile": null
}

When assessment is complete after 8 questions, set assessment_complete to true and fill skill_profile:
{
  "message_hi": "Assessment complete message in Hindi",
  "message_en": "Assessment complete message in English",
  "question_number": 8,
  "assessment_complete": true,
  "skill_profile": {
    "name": "user's name",
    "location": "user's district and state",
    "education": "12th standard details",
    "interests": ["interest1", "interest2"],
    "current_skills": ["skill1", "skill2"],
    "career_goal": "what they want to do",
    "time_available": "hours per day",
    "recommended_path": "Data Entry / Digital Marketing / Accounting / Tailoring / etc",
    "skill_level": "beginner / intermediate"
  }
}

The 8 questions to ask (one by one):
1. Name and where they are from (district, state)
2. What subjects did they study in 12th standard
3. What work or skills do they already know
4. What kind of work do they want to do / their dream job
5. Do they have a smartphone and internet access
6. How many hours per day can they study
7. Do they want to work locally or are they open to relocating
8. What is stopping them from getting a job right now

ALWAYS return valid JSON only. No extra text outside JSON."""

def lambda_handler(event, context):
    # Handle CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return cors_response(200, {})

    try:
        body = json.loads(event.get('body', '{}'))
        user_message = body.get('message', '')
        session_id = body.get('sessionId', str(uuid.uuid4()))
        user_id = body.get('userId', str(uuid.uuid4()))

        # Get conversation history from DynamoDB
        conversation_history = get_conversation_history(session_id)

        # Add user message to history
        conversation_history.append({
            "role": "user",
            "content": user_message
        })

        # If this is the first message, start the assessment
        if len(conversation_history) == 1:
            conversation_history = [{
                "role": "user",
                "content": "Start the skill assessment. Ask the first question."
            }]

        # Call Bedrock
        response = bedrock.invoke_model(
            modelId=MODEL_ID,
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1000,
                "system": SYSTEM_PROMPT,
                "messages": conversation_history
            }),
            contentType='application/json',
            accept='application/json'
        )

        # Parse response
        response_body = json.loads(response['body'].read())
        ai_text = response_body['content'][0]['text']

        # Parse the JSON response from AI
        try:
            ai_response = json.loads(ai_text)
        except json.JSONDecodeError:
            # If AI didn't return valid JSON, wrap it
            ai_response = {
                "message_hi": ai_text,
                "message_en": ai_text,
                "question_number": len(conversation_history),
                "assessment_complete": False,
                "skill_profile": None
            }

        # Add AI response to history
        conversation_history.append({
            "role": "assistant",
            "content": ai_text
        })

        # Save conversation to DynamoDB
        save_conversation(session_id, user_id, conversation_history)

        # If assessment complete, save user profile
        if ai_response.get('assessment_complete') and ai_response.get('skill_profile'):
            save_user_profile(user_id, session_id, ai_response['skill_profile'])

        return cors_response(200, {
            'sessionId': session_id,
            'userId': user_id,
            'response': ai_response,
            'messageCount': len([m for m in conversation_history if m['role'] == 'user'])
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return cors_response(500, {
            'error': str(e),
            'response': {
                'message_hi': 'Maafi kijiye, kuch gadbad ho gayi. Dobara try karein.',
                'message_en': 'Sorry, something went wrong. Please try again.',
                'assessment_complete': False
            }
        })


def get_conversation_history(session_id):
    try:
        result = conversations_table.get_item(Key={'sessionId': session_id})
        if 'Item' in result:
            return result['Item'].get('history', [])
        return []
    except Exception as e:
        print(f"Error getting conversation: {e}")
        return []


def save_conversation(session_id, user_id, history):
    try:
        conversations_table.put_item(Item={
            'sessionId': session_id,
            'userId': user_id,
            'history': history,
            'updatedAt': datetime.now().isoformat()
        })
    except Exception as e:
        print(f"Error saving conversation: {e}")


def save_user_profile(user_id, session_id, skill_profile):
    try:
        users_table.put_item(Item={
            'userId': user_id,
            'sessionId': session_id,
            'skillProfile': skill_profile,
            'createdAt': datetime.now().isoformat(),
            'roadmapGenerated': False
        })
        print(f"Saved profile for user {user_id}")
    except Exception as e:
        print(f"Error saving profile: {e}")


def cors_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
        },
        'body': json.dumps(body)
    }