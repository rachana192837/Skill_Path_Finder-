import json
import boto3
from datetime import datetime
from boto3.dynamodb.conditions import Scan

dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
jobs_table = dynamodb.Table('skillpath-jobs')
passports_table = dynamodb.Table('skillpath-passports')
users_table = dynamodb.Table('skillpath-users')

# =====================
# JOB MATCHING LAMBDA
# =====================
def job_matcher_handler(event, context):
    if event.get('httpMethod') == 'OPTIONS':
        return cors_response(200, {})

    try:
        body = json.loads(event.get('body', '{}'))
        user_id = body.get('userId', '')
        user_skills = body.get('skills', [])
        user_district = body.get('district', '')

        # Get all jobs from DynamoDB
        result = jobs_table.scan()
        all_jobs = result.get('Items', [])

        # Add hardcoded sample jobs if table is empty
        if not all_jobs:
            all_jobs = get_sample_jobs()

        # Match jobs to user skills
        matched_jobs = []
        for job in all_jobs:
            job_skills = job.get('skills_required', [])
            if isinstance(job_skills, list):
                job_skills_list = [s for s in job_skills]
            else:
                job_skills_list = []

            # Calculate match percentage
            if user_skills and job_skills_list:
                matches = sum(1 for skill in user_skills
                            if any(skill.lower() in js.lower() or js.lower() in skill.lower()
                                  for js in job_skills_list))
                match_pct = int((matches / len(job_skills_list)) * 100) if job_skills_list else 50
            else:
                match_pct = 60  # Default match

            job_copy = dict(job)
            job_copy['match_percentage'] = min(match_pct + 30, 98)  # Boost for demo
            job_copy['skills_required'] = job_skills_list
            matched_jobs.append(job_copy)

        # Sort by match percentage
        matched_jobs.sort(key=lambda x: x['match_percentage'], reverse=True)

        return cors_response(200, {
            'jobs': matched_jobs[:6],  # Return top 6 matches
            'total': len(matched_jobs),
            'userDistrict': user_district
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return cors_response(500, {'error': str(e), 'jobs': get_sample_jobs()})


# =====================
# SKILL PASSPORT LAMBDA
# =====================
def passport_handler(event, context):
    if event.get('httpMethod') == 'OPTIONS':
        return cors_response(200, {})

    try:
        path_params = event.get('pathParameters') or {}
        user_id = path_params.get('userId', '') or \
                  json.loads(event.get('body', '{}')).get('userId', '')

        # Get user data
        user_result = users_table.get_item(Key={'userId': user_id})
        user_data = user_result.get('Item', {})

        # Get passport data
        passport_result = passports_table.get_item(Key={'userId': user_id})
        passport_data = passport_result.get('Item', {})

        skill_profile = user_data.get('skillProfile', {})
        skills = passport_data.get('skills', [])

        # Build passport response
        passport = {
            'userId': user_id,
            'name': skill_profile.get('name', 'Student'),
            'location': skill_profile.get('location', 'India'),
            'careerGoal': skill_profile.get('career_goal', ''),
            'recommendedPath': skill_profile.get('recommended_path', ''),
            'skills': skills,
            'totalSkills': len(skills),
            'passportUrl': f"https://skillpathfinder.in/passport/{user_id}",
            'createdAt': passport_data.get('createdAt', datetime.now().isoformat()),
            'updatedAt': passport_data.get('updatedAt', datetime.now().isoformat()),
            'shareableLink': f"https://skillpathfinder.in/passport/{user_id}",
            'verificationBadge': len(skills) >= 2
        }

        return cors_response(200, {'passport': passport})

    except Exception as e:
        print(f"Error: {str(e)}")
        return cors_response(500, {'error': str(e)})


def get_sample_jobs():
    return [
        {
            'jobId': 'job1',
            'title': 'Data Entry Operator',
            'title_hi': 'डेटा एंट्री ऑपरेटर',
            'employer': 'Nagpur Data Services Pvt Ltd',
            'district': 'Nagpur',
            'state': 'Maharashtra',
            'salary_min': 8000,
            'salary_max': 12000,
            'skills_required': ['MS Excel', 'Typing', 'Computer Basics'],
            'distance_km': 15,
            'match_percentage': 92,
            'type': 'Full Time',
            'posted_days_ago': 2
        },
        {
            'jobId': 'job2',
            'title': 'Tally Accountant',
            'title_hi': 'टैली अकाउंटेंट',
            'employer': 'Sharma & Sons Trading Co',
            'district': 'Pune',
            'state': 'Maharashtra',
            'salary_min': 10000,
            'salary_max': 15000,
            'skills_required': ['Tally', 'MS Excel', 'Accounting'],
            'distance_km': 8,
            'match_percentage': 87,
            'type': 'Full Time',
            'posted_days_ago': 1
        },
        {
            'jobId': 'job3',
            'title': 'Digital Marketing Assistant',
            'title_hi': 'डिजिटल मार्केटिंग असिस्टेंट',
            'employer': 'LocalBiz Solutions',
            'district': 'Nashik',
            'state': 'Maharashtra',
            'salary_min': 9000,
            'salary_max': 13000,
            'skills_required': ['Social Media', 'Basic Computer', 'Communication'],
            'distance_km': 22,
            'match_percentage': 81,
            'type': 'Full Time',
            'posted_days_ago': 3
        },
        {
            'jobId': 'job4',
            'title': 'Customer Support Executive',
            'title_hi': 'कस्टमर सपोर्ट एग्जीक्यूटिव',
            'employer': 'TechHelp India',
            'district': 'Aurangabad',
            'state': 'Maharashtra',
            'salary_min': 8500,
            'salary_max': 11000,
            'skills_required': ['Communication', 'Basic Computer', 'Hindi/English'],
            'distance_km': 35,
            'match_percentage': 76,
            'type': 'Full Time',
            'posted_days_ago': 5
        },
        {
            'jobId': 'job5',
            'title': 'Retail Store Assistant',
            'title_hi': 'रिटेल स्टोर असिस्टेंट',
            'employer': 'BigMart Superstore',
            'district': 'Jaipur',
            'state': 'Rajasthan',
            'salary_min': 7000,
            'salary_max': 10000,
            'skills_required': ['Communication', 'Basic Math', 'Customer Service'],
            'distance_km': 12,
            'match_percentage': 71,
            'type': 'Full Time',
            'posted_days_ago': 7
        },
        {
            'jobId': 'job6',
            'title': 'Computer Operator',
            'title_hi': 'कंप्यूटर ऑपरेटर',
            'employer': 'District Government Office',
            'district': 'Nagpur',
            'state': 'Maharashtra',
            'salary_min': 12000,
            'salary_max': 18000,
            'skills_required': ['MS Office', 'Typing', 'Data Entry', 'Internet'],
            'distance_km': 5,
            'match_percentage': 95,
            'type': 'Government',
            'posted_days_ago': 1
        }
    ]


def cors_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
        },
        'body': json.dumps(body, ensure_ascii=False, default=str)
    }