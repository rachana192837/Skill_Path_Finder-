# Requirements Document: Skill Path Finder 2.0

## Introduction

Skill Path Finder 2.0 is an AI-powered career counseling platform designed for rural Indian youth aged 18-25 who have completed 12th standard. The platform addresses the critical gap between available government skill resources (₹10,000+ crore) and actual employment outcomes, where 60% of rural youth remain underemployed. The system provides voice-first, multilingual skill assessment, personalized learning roadmaps using free government resources, AI-evaluated practical projects, local job matching, and employer-verified digital skill passports. The target outcome is 60% employment rate within 6 months with ₹5,000+ monthly income increase.

## Glossary

- **Platform**: The Skill Path Finder 2.0 system
- **User**: Rural Indian youth aged 18-25, post-12th standard
- **Skill_Assessment**: Conversational evaluation of user's current skills and interests
- **Learning_Roadmap**: Personalized 3-6 month learning plan using government resources
- **Government_Resource**: Free educational content from SWAYAM, PMGDISHA, and similar programs
- **Practical_Project**: Hands-on assignment to demonstrate skill mastery
- **Skill_Passport**: Employer-verified digital credential showing completed skills
- **Local_Employer**: District-level companies with job opportunities
- **LLM**: Fine-tuned Large Language Model for Indian languages
- **WhatsApp_Interface**: WhatsApp Business API integration for voice and text interaction
- **PWA**: Progressive Web Application for browser-based access
- **Supported_Language**: One of 10+ Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and English

## Requirements

### Requirement 1: Multilingual Voice-First Skill Assessment

**User Story:** As a rural youth with limited English proficiency, I want to complete a skill assessment in my native language using voice, so that I can accurately communicate my abilities and interests.

#### Acceptance Criteria

1. WHEN a User initiates skill assessment, THE Platform SHALL offer language selection from 10+ Supported_Languages
2. WHEN a User selects a Supported_Language, THE Platform SHALL conduct the entire Skill_Assessment in that language
3. WHEN a User provides voice input, THE Platform SHALL transcribe the audio to text using the selected Supported_Language
4. WHEN a User provides text input, THE Platform SHALL process it using the LLM in the selected Supported_Language
5. THE Platform SHALL ask conversational questions to assess technical skills, soft skills, interests, and career goals
6. WHEN a Skill_Assessment is completed, THE Platform SHALL generate a skill profile with proficiency levels for identified skills
7. THE Platform SHALL complete a Skill_Assessment within 15-20 minutes of conversation
8. WHEN a User provides ambiguous responses, THE Platform SHALL ask clarifying follow-up questions

### Requirement 2: Personalized Learning Roadmap Generation

**User Story:** As a user who completed skill assessment, I want a personalized learning plan using free resources, so that I can develop job-ready skills without financial burden.

#### Acceptance Criteria

1. WHEN a Skill_Assessment is completed, THE Platform SHALL generate a Learning_Roadmap within 30 seconds
2. THE Platform SHALL create Learning_Roadmaps with duration between 3 and 6 months based on user's current skill level and goals
3. WHEN generating a Learning_Roadmap, THE Platform SHALL use only Government_Resources from SWAYAM, PMGDISHA, and integrated platforms
4. THE Platform SHALL organize Learning_Roadmaps into weekly milestones with specific courses and activities
5. WHEN a Learning_Roadmap is created, THE Platform SHALL include at least 3 Practical_Projects aligned with target job roles
6. THE Platform SHALL provide course links, estimated time commitments, and learning objectives for each roadmap item
7. WHEN a User has limited time availability, THE Platform SHALL adjust the Learning_Roadmap duration accordingly
8. THE Platform SHALL align Learning_Roadmaps with district-level job opportunities in the user's region

### Requirement 3: WhatsApp Business API Integration

**User Story:** As a rural youth with limited smartphone data, I want to access the platform through WhatsApp, so that I can use familiar technology with minimal data consumption.

#### Acceptance Criteria

1. THE Platform SHALL provide full functionality through the WhatsApp_Interface
2. WHEN a User sends a message to the WhatsApp number, THE Platform SHALL respond within 5 seconds
3. THE Platform SHALL support both text and voice messages through WhatsApp
4. WHEN a User sends voice messages, THE Platform SHALL process audio files up to 3 minutes in length
5. THE Platform SHALL send structured responses using WhatsApp message formatting (lists, buttons, quick replies)
6. WHEN a User requests their Learning_Roadmap, THE Platform SHALL deliver it as a formatted WhatsApp message with clickable links
7. THE Platform SHALL send weekly progress reminders and milestone notifications through WhatsApp
8. THE Platform SHALL maintain conversation context across multiple WhatsApp sessions

### Requirement 4: Progressive Web Application (PWA)

**User Story:** As a user with occasional internet access, I want a web application that works offline, so that I can access my learning materials without constant connectivity.

#### Acceptance Criteria

1. THE Platform SHALL provide a PWA accessible through mobile and desktop browsers
2. THE Platform SHALL allow users to install the PWA on their device home screen
3. WHEN a User loses internet connectivity, THE PWA SHALL display cached content and allow offline access to downloaded materials
4. THE Platform SHALL sync user progress automatically when internet connectivity is restored
5. THE PWA SHALL display the same functionality as the WhatsApp_Interface with enhanced visual interface
6. THE Platform SHALL allow users to download Government_Resource content for offline viewing
7. WHEN a User accesses the PWA, THE Platform SHALL display content in their selected Supported_Language
8. THE Platform SHALL provide responsive design optimized for mobile devices with screen sizes from 320px width

### Requirement 5: AI-Evaluated Practical Projects

**User Story:** As a user completing my learning roadmap, I want my practical projects evaluated by AI, so that I can receive immediate feedback and improve my skills.

#### Acceptance Criteria

1. WHEN a User completes a Practical_Project, THE Platform SHALL accept submissions through WhatsApp_Interface or PWA
2. THE Platform SHALL evaluate Practical_Project submissions within 2 minutes using the LLM
3. WHEN evaluating a Practical_Project, THE Platform SHALL provide scores on technical accuracy, completeness, and creativity
4. THE Platform SHALL generate detailed feedback in the User's selected Supported_Language
5. WHEN a Practical_Project fails evaluation, THE Platform SHALL provide specific improvement suggestions and allow resubmission
6. THE Platform SHALL require passing scores of 70% or higher on all Practical_Projects before marking them complete
7. WHEN a User passes a Practical_Project, THE Platform SHALL update their Skill_Passport with the demonstrated skill
8. THE Platform SHALL support multiple submission formats including text descriptions, photos, videos, and document uploads

### Requirement 6: District-Level Job Matching

**User Story:** As a user who completed my learning roadmap, I want to discover local job opportunities, so that I can find employment near my home without relocating.

#### Acceptance Criteria

1. WHEN a User completes 70% of their Learning_Roadmap, THE Platform SHALL begin showing relevant job opportunities
2. THE Platform SHALL match users with Local_Employers based on completed skills, location (district-level), and job requirements
3. WHEN displaying job opportunities, THE Platform SHALL show job title, employer name, location, salary range, and required skills
4. THE Platform SHALL integrate with government job portals and partner employer databases to fetch opportunities
5. WHEN a User expresses interest in a job, THE Platform SHALL facilitate connection with the Local_Employer
6. THE Platform SHALL prioritize job opportunities within 50 kilometers of the user's district
7. WHEN no local jobs match the user's skills, THE Platform SHALL suggest additional skills to learn for available opportunities
8. THE Platform SHALL update job listings daily to ensure current opportunities

### Requirement 7: Employer-Verified Digital Skill Passport

**User Story:** As a user seeking employment, I want a verified digital credential, so that employers can trust my demonstrated skills.

#### Acceptance Criteria

1. WHEN a User completes a Practical_Project, THE Platform SHALL add the skill to their Skill_Passport
2. THE Platform SHALL generate a unique, shareable URL for each user's Skill_Passport
3. WHEN an employer accesses a Skill_Passport URL, THE Platform SHALL display verified skills, completion dates, and project evidence
4. THE Platform SHALL allow users to request employer verification for completed projects
5. WHEN an employer verifies a skill, THE Platform SHALL add a verification badge to the Skill_Passport
6. THE Platform SHALL display Skill_Passports in a professional format suitable for job applications
7. THE Platform SHALL allow users to download their Skill_Passport as a PDF document
8. WHEN a User shares their Skill_Passport, THE Platform SHALL track views and employer interactions for analytics

### Requirement 8: Progress Tracking and Motivation

**User Story:** As a user working through my learning roadmap, I want to track my progress and receive encouragement, so that I stay motivated to complete my goals.

#### Acceptance Criteria

1. THE Platform SHALL display a visual progress indicator showing percentage completion of the Learning_Roadmap
2. WHEN a User completes a milestone, THE Platform SHALL send a congratulatory message through their preferred interface
3. THE Platform SHALL track daily and weekly learning streaks and display them to the user
4. WHEN a User has not engaged with the Platform for 3 days, THE Platform SHALL send a reminder message
5. THE Platform SHALL display estimated time to completion based on current progress rate
6. THE Platform SHALL show success stories from other users who achieved employment in the user's district
7. WHEN a User achieves employment, THE Platform SHALL request outcome data (salary, job title, employer) for impact tracking
8. THE Platform SHALL gamify learning with points, badges, and achievement levels

### Requirement 9: Government Resource Integration

**User Story:** As a platform administrator, I want seamless integration with government skill programs, so that users have access to the latest free educational content.

#### Acceptance Criteria

1. THE Platform SHALL integrate with SWAYAM API to fetch course catalogs and enrollment links
2. THE Platform SHALL integrate with PMGDISHA to access digital literacy content
3. WHEN a Government_Resource is added to a Learning_Roadmap, THE Platform SHALL verify the resource is currently available
4. THE Platform SHALL update Government_Resource links weekly to ensure they remain valid
5. WHEN a Government_Resource becomes unavailable, THE Platform SHALL automatically substitute an equivalent resource
6. THE Platform SHALL track which Government_Resources are most effective for employment outcomes
7. THE Platform SHALL provide deep links that allow users to enroll in courses directly from the Platform
8. THE Platform SHALL sync course completion status from integrated platforms when available

### Requirement 10: Data Privacy and Security

**User Story:** As a user providing personal information, I want my data protected, so that my privacy is maintained and my information is secure.

#### Acceptance Criteria

1. THE Platform SHALL encrypt all user data at rest and in transit
2. THE Platform SHALL comply with Indian data protection regulations and guidelines
3. WHEN a User creates an account, THE Platform SHALL obtain explicit consent for data collection and usage
4. THE Platform SHALL allow users to download all their personal data in a portable format
5. THE Platform SHALL allow users to delete their account and all associated data
6. THE Platform SHALL not share user data with third parties without explicit consent
7. WHEN integrating with employers, THE Platform SHALL share only skills and Skill_Passport data, not personal contact information
8. THE Platform SHALL implement secure authentication for user accounts
9. THE Platform SHALL log all data access for security auditing
10. THE Platform SHALL anonymize user data for analytics and reporting

### Requirement 11: Performance and Scalability

**User Story:** As a platform administrator, I want the system to handle thousands of concurrent users, so that we can serve rural youth across India without performance degradation.

#### Acceptance Criteria

1. THE Platform SHALL support at least 10,000 concurrent users without performance degradation
2. WHEN a User sends a message, THE Platform SHALL respond within 5 seconds under normal load
3. THE Platform SHALL generate Learning_Roadmaps within 30 seconds even during peak usage
4. THE Platform SHALL process voice transcription within 10 seconds for audio up to 1 minute
5. THE Platform SHALL maintain 99.5% uptime measured monthly
6. WHEN system load exceeds capacity, THE Platform SHALL queue requests and inform users of expected wait time
7. THE Platform SHALL optimize LLM inference to minimize response latency
8. THE Platform SHALL use caching for frequently accessed Government_Resources and job listings

### Requirement 12: Analytics and Impact Measurement

**User Story:** As a program manager, I want detailed analytics on user outcomes, so that I can measure impact and improve the platform.

#### Acceptance Criteria

1. THE Platform SHALL track user registration, skill assessment completion, and learning roadmap progress rates
2. THE Platform SHALL measure employment outcomes including job placement rate, time to employment, and salary increases
3. WHEN a User achieves employment, THE Platform SHALL record the outcome and link it to their learning path
4. THE Platform SHALL generate monthly reports showing key metrics: active users, completion rates, employment rate, and average income increase
5. THE Platform SHALL track which Government_Resources have highest completion rates and best employment outcomes
6. THE Platform SHALL measure user engagement metrics including session duration, message frequency, and feature usage
7. THE Platform SHALL segment analytics by district, language, age group, and skill category
8. THE Platform SHALL provide a dashboard for administrators to view real-time platform metrics
9. THE Platform SHALL calculate return on investment by comparing platform costs to user income increases
10. THE Platform SHALL track the 60% employment rate target and ₹5,000+ monthly income increase goal
