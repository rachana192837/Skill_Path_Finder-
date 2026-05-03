# Implementation Plan: Skill Path Finder 2.0

## Overview

This implementation plan breaks down the Skill Path Finder 2.0 platform into discrete, manageable tasks. The approach follows a phased implementation strategy: (1) Core infrastructure and data models, (2) Multilingual conversation and assessment, (3) Learning roadmap generation, (4) Project evaluation, (5) Job matching and skill passport, (6) Analytics and monitoring. Each phase builds on the previous, ensuring incremental validation and early feedback.

## Tasks

- [ ] 1. Set up project infrastructure and core data models
  - [ ] 1.1 Initialize TypeScript project with microservices structure
    - Create monorepo structure with separate packages for each service
    - Configure TypeScript, ESLint, Prettier
    - Set up build and deployment scripts
    - _Requirements: All requirements (foundational)_
  
  - [ ] 1.2 Define core data models and database schema
    - Implement User, SkillProfile, LearningRoadmap, Session, Message models
    - Implement Job, SkillPassport, ProjectSubmission, ProjectEvaluation models
    - Create database migration scripts
    - _Requirements: 1.6, 2.1, 5.1, 6.2, 7.1, 10.1_
  
  - [ ] 1.3 Set up database layer with PostgreSQL
    - Configure PostgreSQL connection and connection pooling
    - Implement UserRepository with CRUD operations
    - Implement data encryption at rest
    - _Requirements: 10.1, 10.5_
  
  - [ ] 1.4 Set up Redis for caching and session management
    - Configure Redis connection
    - Implement caching layer for government resources and job listings
    - Implement session storage
    - _Requirements: 11.8, 3.8_
  
  - [ ]* 1.5 Write property tests for data model integrity
    - **Property 60: Data encryption**
    - **Validates: Requirements 10.1, 10.8**

- [ ] 2. Implement API Gateway and authentication
  - [ ] 2.1 Create API Gateway with Express.js
    - Set up Express server with routing
    - Implement request logging and error handling
    - Configure CORS and security headers
    - _Requirements: 10.8, 11.2_
  
  - [ ] 2.2 Implement authentication and authorization
    - Implement phone number-based authentication
    - Create JWT token generation and validation
    - Implement session management
    - _Requirements: 10.8_
  
  - [ ] 2.3 Implement rate limiting middleware
    - Create rate limiter for authentication endpoints
    - Implement per-IP and per-user rate limits
    - _Requirements: 11.6_
  
  - [ ]* 2.4 Write property tests for authentication
    - **Property 60: Data encryption**
    - **Validates: Requirements 10.8**

- [ ] 3. Checkpoint - Ensure infrastructure tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement Multilingual LLM Service
  - [ ] 4.1 Set up LLM integration (OpenAI/Anthropic or fine-tuned model)
    - Configure LLM API client
    - Implement prompt templates for Indian languages
    - Create language detection utility
    - _Requirements: 1.2, 1.4, 1.5_
  
  - [ ] 4.2 Implement conversation generation
    - Create generateResponse function with context handling
    - Implement skill extraction from conversation history
    - Create clarifying question generation logic
    - _Requirements: 1.5, 1.8_
  
  - [ ] 4.3 Implement roadmap generation
    - Create generateRoadmap function using LLM
    - Implement skill-to-course mapping logic
    - Create project recommendation engine
    - _Requirements: 2.1, 2.2, 2.5_
  
  - [ ] 4.4 Implement project evaluation
    - Create evaluateProject function with rubric-based scoring
    - Implement feedback generation in multiple languages
    - Create improvement suggestion generator
    - _Requirements: 5.2, 5.3, 5.4, 5.5_
  
  - [ ]* 4.5 Write property tests for LLM service
    - **Property 1: Language consistency across platform**
    - **Validates: Requirements 1.2, 1.4, 4.7, 5.4**
  
  - [ ]* 4.6 Write property tests for LLM performance
    - **Property 72: LLM inference optimization**
    - **Validates: Requirements 11.7**

- [ ] 5. Implement Voice Processing Service
  - [ ] 5.1 Set up speech-to-text integration (Google Cloud Speech-to-Text or similar)
    - Configure STT API client
    - Implement language-specific transcription
    - Create audio validation utility
    - _Requirements: 1.3, 3.4_
  
  - [ ] 5.2 Implement text-to-speech for voice responses
    - Configure TTS API client
    - Implement voice synthesis in multiple languages
    - Create audio file management
    - _Requirements: 1.3_
  
  - [ ]* 5.3 Write property tests for voice processing
    - **Property 2: Voice input transcription**
    - **Validates: Requirements 1.3**
  
  - [ ]* 5.4 Write property tests for voice performance
    - **Property 69: Voice transcription performance**
    - **Validates: Requirements 11.4**

- [ ] 6. Implement Conversation Service
  - [ ] 6.1 Create ConversationService with session management
    - Implement startConversation and resumeConversation
    - Create conversation context management
    - Implement message history storage
    - _Requirements: 1.1, 3.8_
  
  - [ ] 6.2 Implement skill assessment flow
    - Create assessment question sequencing
    - Implement skill extraction and profiling
    - Create assessment completion logic
    - _Requirements: 1.5, 1.6, 1.7, 1.8_
  
  - [ ] 6.3 Implement message processing pipeline
    - Create processMessage function with voice/text handling
    - Implement response generation with formatting
    - Create quick reply and button generation
    - _Requirements: 1.4, 3.3, 3.5_
  
  - [ ]* 6.4 Write property tests for conversation service
    - **Property 6: Assessment question coverage**
    - **Validates: Requirements 1.5**
  
  - [ ]* 6.5 Write property tests for skill profile generation
    - **Property 7: Skill profile generation**
    - **Validates: Requirements 1.6**
  
  - [ ]* 6.6 Write property tests for assessment duration
    - **Property 8: Assessment duration**
    - **Validates: Requirements 1.7**
  
  - [ ]* 6.7 Write property tests for clarifying questions
    - **Property 9: Clarifying questions for ambiguity**
    - **Validates: Requirements 1.8**

- [ ] 7. Checkpoint - Ensure conversation and assessment tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement Government Resource Integration Service
  - [ ] 8.1 Create SWAYAM API integration
    - Implement fetchSWAYAMCourses with filtering
    - Create course catalog caching
    - Implement enrollment link generation
    - _Requirements: 9.1, 9.7_
  
  - [ ] 8.2 Create PMGDISHA integration
    - Implement fetchPMGDISHAContent
    - Create content caching
    - _Requirements: 9.2_
  
  - [ ] 8.3 Implement resource validation and substitution
    - Create validateResource function
    - Implement weekly link validation job
    - Create findAlternative function for unavailable resources
    - _Requirements: 9.3, 9.4, 9.5_
  
  - [ ]* 8.4 Write property tests for resource integration
    - **Property 54: SWAYAM integration**
    - **Validates: Requirements 9.1**
  
  - [ ]* 8.5 Write property tests for resource management
    - **Property 56: Resource availability management**
    - **Validates: Requirements 9.3, 9.4, 9.5**

- [ ] 9. Implement Learning Roadmap Service
  - [ ] 9.1 Create LearningRoadmapService with generation logic
    - Implement generateRoadmap using LLM and government resources
    - Create milestone structuring logic
    - Implement project selection based on job roles
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ] 9.2 Implement roadmap customization
    - Create time availability adjustment logic
    - Implement district-level job alignment
    - Create roadmap item completeness validation
    - _Requirements: 2.6, 2.7, 2.8_
  
  - [ ] 9.3 Implement roadmap retrieval and updates
    - Create getRoadmap and updateRoadmap functions
    - Implement getNextMilestone logic
    - Create progress tracking
    - _Requirements: 2.1, 8.1_
  
  - [ ]* 9.4 Write property tests for roadmap generation
    - **Property 10: Roadmap generation performance**
    - **Validates: Requirements 2.1, 11.3**
  
  - [ ]* 9.5 Write property tests for roadmap structure
    - **Property 11: Roadmap duration bounds**
    - **Validates: Requirements 2.2, 2.7**
  
  - [ ]* 9.6 Write property tests for government resource usage
    - **Property 12: Government resource exclusivity**
    - **Validates: Requirements 2.3**
  
  - [ ]* 9.7 Write property tests for milestone structure
    - **Property 13: Weekly milestone structure**
    - **Validates: Requirements 2.4**
  
  - [ ]* 9.8 Write property tests for project requirements
    - **Property 14: Minimum project requirement**
    - **Validates: Requirements 2.5**

- [ ] 10. Implement Project Evaluation Service
  - [ ] 10.1 Create ProjectEvaluationService with submission handling
    - Implement submitProject with multi-format support
    - Create evaluation queue management
    - Implement resubmitProject logic
    - _Requirements: 5.1, 5.5, 5.8_
  
  - [ ] 10.2 Implement AI-based evaluation
    - Create evaluation rubric processing
    - Implement LLM-based scoring for technical accuracy, completeness, creativity
    - Create feedback generation in user's language
    - _Requirements: 5.2, 5.3, 5.4_
  
  - [ ] 10.3 Implement evaluation result handling
    - Create getEvaluation function
    - Implement passing score validation (70%+)
    - Create skill passport update on project pass
    - _Requirements: 5.6, 5.7, 7.1_
  
  - [ ]* 10.4 Write property tests for evaluation performance
    - **Property 26: Evaluation performance**
    - **Validates: Requirements 5.2**
  
  - [ ]* 10.5 Write property tests for evaluation completeness
    - **Property 27: Evaluation score completeness**
    - **Validates: Requirements 5.3**
  
  - [ ]* 10.6 Write property tests for failed project feedback
    - **Property 28: Failed project feedback**
    - **Validates: Requirements 5.5**
  
  - [ ]* 10.7 Write property tests for passing threshold
    - **Property 29: Passing score threshold**
    - **Validates: Requirements 5.6**

- [ ] 11. Checkpoint - Ensure roadmap and evaluation tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement Job Matching Service
  - [ ] 12.1 Create JobMatchingService with job fetching
    - Implement integration with government job portals
    - Create partner employer database integration
    - Implement daily job listing sync
    - _Requirements: 6.4, 6.8_
  
  - [ ] 12.2 Implement job matching algorithm
    - Create findJobs with skill, location, and requirement matching
    - Implement 50km distance prioritization
    - Create job display with all required fields
    - _Requirements: 6.2, 6.3, 6.6_
  
  - [ ] 12.3 Implement job application and skill gap analysis
    - Create expressInterest function
    - Implement getSkillGaps for users without matches
    - Create skill recommendation engine
    - _Requirements: 6.5, 6.7_
  
  - [ ] 12.4 Implement job visibility threshold
    - Create logic to show jobs at 70%+ roadmap completion
    - _Requirements: 6.1_
  
  - [ ]* 12.5 Write property tests for job matching
    - **Property 32: Job visibility threshold**
    - **Validates: Requirements 6.1**
  
  - [ ]* 12.6 Write property tests for matching criteria
    - **Property 33: Job matching criteria**
    - **Validates: Requirements 6.2**
  
  - [ ]* 12.7 Write property tests for job display
    - **Property 34: Job display completeness**
    - **Validates: Requirements 6.3**

- [ ] 13. Implement Skill Passport Service
  - [ ] 13.1 Create SkillPassportService with passport management
    - Implement getPassport and addSkill functions
    - Create unique shareable URL generation
    - Implement passport display with all required fields
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ] 13.2 Implement employer verification
    - Create requestVerification function
    - Implement verifySkill with token-based verification
    - Create verification badge addition logic
    - _Requirements: 7.4, 7.5_
  
  - [ ] 13.3 Implement passport export and tracking
    - Create exportPDF function with multilingual support
    - Implement trackView for analytics
    - Create public passport view
    - _Requirements: 7.7, 7.8_
  
  - [ ]* 13.4 Write property tests for passport updates
    - **Property 30: Project completion updates passport**
    - **Validates: Requirements 5.7, 7.1**
  
  - [ ]* 13.5 Write property tests for shareable URLs
    - **Property 40: Unique shareable URL**
    - **Validates: Requirements 7.2**
  
  - [ ]* 13.6 Write property tests for verification
    - **Property 43: Verification badge addition**
    - **Validates: Requirements 7.5**

- [ ] 14. Implement Progress Tracking and Notification Service
  - [ ] 14.1 Create progress tracking logic
    - Implement UserProgress model updates
    - Create progress percentage calculation
    - Implement streak tracking (daily and weekly)
    - _Requirements: 8.1, 8.3_
  
  - [ ] 14.2 Create NotificationService with multi-channel support
    - Implement sendNotification for WhatsApp and PWA
    - Create scheduleReminder with 3-day inactivity detection
    - Implement milestone completion celebrations
    - _Requirements: 8.2, 8.4, 3.7_
  
  - [ ] 14.3 Implement motivation features
    - Create completion time estimation
    - Implement district-specific success story display
    - Create gamification system (points, badges, achievements)
    - _Requirements: 8.5, 8.6, 8.8_
  
  - [ ] 14.4 Implement employment outcome collection
    - Create employment outcome data request flow
    - Implement outcome recording and linkage to learning path
    - _Requirements: 8.7, 12.3_
  
  - [ ]* 14.5 Write property tests for progress tracking
    - **Property 46: Progress indicator display**
    - **Validates: Requirements 8.1**
  
  - [ ]* 14.6 Write property tests for notifications
    - **Property 49: Inactivity reminders**
    - **Validates: Requirements 8.4**

- [ ] 15. Checkpoint - Ensure job matching and progress tracking tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Implement WhatsApp Integration Service
  - [ ] 16.1 Set up WhatsApp Business API integration
    - Configure WhatsApp Business API client
    - Implement webhook handler for incoming messages
    - Create message sending functions (text, interactive, media)
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ] 16.2 Implement WhatsApp-specific features
    - Create structured response formatting (lists, buttons, quick replies)
    - Implement media download and upload
    - Create roadmap delivery formatting
    - _Requirements: 3.5, 3.6_
  
  - [ ] 16.3 Implement WhatsApp notification delivery
    - Create weekly reminder sending
    - Implement milestone notification delivery
    - _Requirements: 3.7_
  
  - [ ]* 16.4 Write property tests for WhatsApp integration
    - **Property 17: Message response time**
    - **Validates: Requirements 3.2, 11.2**
  
  - [ ]* 16.5 Write property tests for message formats
    - **Property 18: Message format support**
    - **Validates: Requirements 3.3**
  
  - [ ]* 16.6 Write property tests for context persistence
    - **Property 22: Conversation context persistence**
    - **Validates: Requirements 3.8**

- [ ] 17. Implement Progressive Web Application (PWA)
  - [ ] 17.1 Create React-based PWA frontend
    - Set up React project with TypeScript
    - Implement responsive design for 320px+ screens
    - Create service worker for offline functionality
    - _Requirements: 4.1, 4.2, 4.8_
  
  - [ ] 17.2 Implement offline capabilities
    - Create offline content caching
    - Implement resource download for offline viewing
    - Create offline progress tracking
    - _Requirements: 4.3, 4.6_
  
  - [ ] 17.3 Implement sync functionality
    - Create automatic sync on connectivity restoration
    - Implement conflict resolution for offline changes
    - _Requirements: 4.4_
  
  - [ ] 17.4 Implement PWA feature parity with WhatsApp
    - Create all core features in PWA interface
    - Implement multilingual UI
    - Create enhanced visual interface
    - _Requirements: 4.5, 4.7_
  
  - [ ]* 17.5 Write property tests for offline functionality
    - **Property 23: Offline content access**
    - **Validates: Requirements 4.3**
  
  - [ ]* 17.6 Write property tests for sync
    - **Property 24: Progress synchronization**
    - **Validates: Requirements 4.4**
  
  - [ ]* 17.7 Write property tests for feature parity
    - **Property 3: Cross-interface feature parity**
    - **Validates: Requirements 3.1, 4.5, 5.1**

- [ ] 18. Implement Analytics Service
  - [ ] 18.1 Create AnalyticsService with event tracking
    - Implement trackEvent function
    - Create user journey tracking
    - Implement engagement metrics collection
    - _Requirements: 12.1, 12.6_
  
  - [ ] 18.2 Implement employment outcome analytics
    - Create getEmploymentOutcomes function
    - Implement placement rate calculation
    - Create income increase tracking
    - _Requirements: 12.2, 12.3_
  
  - [ ] 18.3 Implement reporting and segmentation
    - Create generateImpactReport function
    - Implement analytics segmentation by district, language, age, skill
    - Create ROI calculation
    - _Requirements: 12.4, 12.7, 12.9_
  
  - [ ] 18.4 Implement resource effectiveness tracking
    - Create getResourceEffectiveness function
    - Implement completion rate and employment correlation tracking
    - _Requirements: 12.5, 9.6_
  
  - [ ] 18.5 Create admin dashboard
    - Implement real-time metrics display
    - Create target metric tracking (60% employment, ₹5,000+ income)
    - _Requirements: 12.8, 12.10_
  
  - [ ]* 18.6 Write property tests for analytics tracking
    - **Property 74: User journey metrics tracking**
    - **Validates: Requirements 12.1**
  
  - [ ]* 18.7 Write property tests for employment outcomes
    - **Property 75: Employment outcome measurement**
    - **Validates: Requirements 12.2**
  
  - [ ]* 18.8 Write property tests for target metrics
    - **Property 82: Target metric tracking**
    - **Validates: Requirements 12.10**

- [ ] 19. Implement Data Privacy and Security Features
  - [ ] 19.1 Implement consent management
    - Create consent collection flow on account creation
    - Implement consent tracking and validation
    - _Requirements: 10.3_
  
  - [ ] 19.2 Implement data portability and deletion
    - Create exportUserData function
    - Implement deleteUser with complete data removal
    - _Requirements: 10.4, 10.5_
  
  - [ ] 19.3 Implement data sharing controls
    - Create third-party consent verification
    - Implement employer data sharing restrictions (skills only, no contact info)
    - _Requirements: 10.6, 10.7_
  
  - [ ] 19.4 Implement security auditing
    - Create data access logging
    - Implement analytics data anonymization
    - _Requirements: 10.9, 10.10_
  
  - [ ]* 19.5 Write property tests for consent
    - **Property 61: Explicit consent collection**
    - **Validates: Requirements 10.3**
  
  - [ ]* 19.6 Write property tests for data deletion
    - **Property 63: Account deletion completeness**
    - **Validates: Requirements 10.5**
  
  - [ ]* 19.7 Write property tests for data sharing
    - **Property 65: Employer data sharing limitations**
    - **Validates: Requirements 10.7**

- [ ] 20. Checkpoint - Ensure all integration and security tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 21. Implement Performance Optimization and Monitoring
  - [ ] 21.1 Implement performance monitoring
    - Set up application performance monitoring (APM)
    - Create response time tracking
    - Implement uptime monitoring
    - _Requirements: 11.2, 11.5_
  
  - [ ] 21.2 Implement load balancing and scaling
    - Configure horizontal scaling for services
    - Implement request queueing for overload scenarios
    - Create user notification for wait times
    - _Requirements: 11.1, 11.6_
  
  - [ ] 21.3 Optimize critical paths
    - Optimize LLM inference latency
    - Implement caching for frequent data
    - Optimize database queries
    - _Requirements: 11.7, 11.8_
  
  - [ ]* 21.4 Write property tests for concurrent users
    - **Property 68: Concurrent user support**
    - **Validates: Requirements 11.1**
  
  - [ ]* 21.5 Write property tests for uptime
    - **Property 70: System uptime**
    - **Validates: Requirements 11.5**

- [ ] 22. Integration and End-to-End Testing
  - [ ]* 22.1 Write integration tests for complete user journeys
    - Test: New user → assessment → roadmap → first project → job discovery
    - Test: Project submission → evaluation → skill passport → employer verification
    - Test: Offline usage → sync → data consistency
    - Test: WhatsApp to PWA cross-interface journey
    - _Requirements: All requirements_
  
  - [ ]* 22.2 Write performance tests
    - Load test with 10,000 concurrent users
    - Test response times under load
    - Test roadmap generation performance
    - Test voice transcription performance
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  
  - [ ]* 22.3 Write security tests
    - Test authentication and authorization
    - Test data encryption
    - Test rate limiting
    - Test data access logging
    - _Requirements: 10.1, 10.8, 10.9, 11.6_

- [ ] 23. Final Checkpoint - Ensure all tests pass and system is ready
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties (82 total properties)
- Unit tests validate specific examples, edge cases, and integration points
- The implementation follows a phased approach: infrastructure → conversation → roadmap → evaluation → jobs → analytics
- TypeScript is used throughout for type safety and better developer experience
- Microservices architecture allows independent scaling of compute-intensive services (LLM, voice processing)

