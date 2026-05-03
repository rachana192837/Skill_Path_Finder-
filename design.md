# Design Document: Skill Path Finder 2.0

## Overview

Skill Path Finder 2.0 is a voice-first, multilingual career counseling platform designed to bridge the employment gap for rural Indian youth aged 18-25. The system addresses the critical challenge of connecting rural youth with ₹10,000+ crore in government skill resources while achieving measurable employment outcomes (60% employment rate within 6 months, ₹5,000+ monthly income increase).

### Key Design Principles

1. **Voice-First, Mobile-First**: Optimize for voice interaction on low-end smartphones with limited data connectivity
2. **Multilingual by Default**: Support 10+ Indian languages at every interaction point using fine-tuned LLMs
3. **Offline-Capable**: Enable learning continuation without constant connectivity through PWA caching
4. **Government Resource Leverage**: Use existing free resources (SWAYAM, PMGDISHA) rather than creating new content
5. **Hyperlocal Job Matching**: Focus on district-level (50km radius) employment opportunities
6. **Verification-First**: Build employer trust through AI-evaluated projects and verified skill passports
7. **Data-Driven Impact**: Track employment outcomes and continuously optimize for the 60% placement target

### Target Metrics

- 60% employment rate within 6 months of program completion
- ₹5,000+ average monthly income increase
- 15-20 minute skill assessment completion time
- <5 second response time for user interactions
- 99.5% platform uptime
- 10,000+ concurrent user support

## Architecture

The system follows a microservices architecture optimized for scalability, multilingual support, and integration with external services.

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interfaces                          │
│         WhatsApp Business API  │  Progressive Web App           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                          │
│        (Rate Limiting, Auth, Request Routing)                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────┬──────────────┬──────────────┬──────────────────┐
│ Conversation │  Learning    │  Project     │  Job Matching    │
│   Service    │  Roadmap     │  Evaluation  │    Service       │
│              │  Service     │  Service     │                  │
└──────────────┴──────────────┴──────────────┴──────────────────┘
                              ↓
┌──────────────┬──────────────┬──────────────┬──────────────────┐
│ Multilingual │  Voice       │  Skill       │  Notification    │
│ LLM Service  │  Processing  │  Passport    │    Service       │
│              │  Service     │  Service     │                  │
└──────────────┴──────────────┴──────────────┴──────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Integration Layer                            │
│  SWAYAM API │ PMGDISHA │ Job Portals │ WhatsApp Business API   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                 │
│  User DB │ Conversation DB │ Progress DB │ Analytics DB        │
└─────────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Microservices Architecture**: Enables independent scaling of compute-intensive services (LLM, voice processing)
2. **Event-Driven Communication**: Use message queues for async operations (project evaluation, job matching)
3. **Multi-Region Deployment**: Deploy across Indian regions for low latency
4. **CDN for Static Content**: Cache government resources and PWA assets
5. **Separate Analytics Database**: Isolate analytics queries from transactional workload
6. **WhatsApp Business API**: Leverage Meta's infrastructure for reliable message delivery
7. **Fine-Tuned LLM**: Custom model trained on Indian languages and skill assessment conversations

## Components and Interfaces

### 1. Conversation Service

Orchestrates conversational interactions for skill assessment and user guidance.

```typescript
interface ConversationService {
  // Start a new conversation session
  startConversation(userId: string, language: string, channel: 'whatsapp' | 'pwa'): ConversationSession
  
  // Process user message and generate response
  processMessage(sessionId: string, message: UserMessage): Promise<BotResponse>
  
  // Get conversation context
  getContext(sessionId: string): ConversationContext
  
  // Complete skill assessment and generate profile
  completeAssessment(sessionId: string): SkillProfile
  
  // Resume a previous conversation
  resumeConversation(userId: string): ConversationSession
}

interface UserMessage {
  text?: string
  audioUrl?: string
  language: string
  timestamp: Date
}

interface BotResponse {
  text: string
  audioUrl?: string
  quickReplies?: string[]
  buttons?: Button[]
  language: string
}

interface ConversationContext {
  userId: string
  sessionId: string
  language: string
  stage: 'greeting' | 'assessment' | 'roadmap' | 'progress' | 'jobs'
  collectedData: Record<string, any>
  messageHistory: Message[]
}
```

### 2. Multilingual LLM Service

Provides fine-tuned language model inference for Indian languages.

```typescript
interface MultilingualLLMService {
  // Generate conversational response
  generateResponse(prompt: string, language: string, context: ConversationContext): Promise<string>
  
  // Extract structured data from conversation
  extractSkills(conversationHistory: Message[], language: string): SkillProfile
  
  // Evaluate project submission
  evaluateProject(submission: ProjectSubmission, rubric: EvaluationRubric, language: string): ProjectEvaluation
  
  // Generate personalized learning roadmap
  generateRoadmap(skillProfile: SkillProfile, jobGoals: string[], language: string): LearningRoadmap
  
  // Translate content between supported languages
  translate(text: string, fromLanguage: string, toLanguage: string): Promise<string>
}
```

### 3. Voice Processing Service

Handles speech-to-text and text-to-speech for voice interactions.

```typescript
interface VoiceProcessingService {
  // Transcribe audio to text
  transcribe(audioUrl: string, language: string): Promise<TranscriptionResult>
  
  // Generate speech from text
  synthesize(text: string, language: string, voice: VoiceProfile): Promise<AudioUrl>
  
  // Detect language from audio
  detectLanguage(audioUrl: string): Promise<string>
  
  // Validate audio quality
  validateAudio(audioUrl: string): AudioValidation
}

interface TranscriptionResult {
  text: string
  confidence: number
  language: string
  duration: number
}

interface AudioValidation {
  isValid: boolean
  duration: number
  format: string
  issues?: string[]
}
```

### 4. Learning Roadmap Service

Generates and manages personalized learning pathways.

```typescript
interface LearningRoadmapService {
  // Generate personalized roadmap
  generateRoadmap(skillProfile: SkillProfile, preferences: UserPreferences): LearningRoadmap
  
  // Get roadmap for user
  getRoadmap(userId: string): LearningRoadmap
  
  // Update roadmap based on progress
  updateRoadmap(userId: string, completedItems: string[]): LearningRoadmap
  
  // Get next milestone
  getNextMilestone(userId: string): Milestone
  
  // Validate government resource availability
  validateResources(roadmap: LearningRoadmap): ResourceValidation
}

interface LearningRoadmap {
  id: string
  userId: string
  duration: number // months
  milestones: Milestone[]
  projects: PracticalProject[]
  estimatedCompletionDate: Date
  targetJobRoles: string[]
  createdAt: Date
}

interface Milestone {
  id: string
  weekNumber: number
  title: string
  description: string
  courses: Course[]
  activities: Activity[]
  estimatedHours: number
  completed: boolean
}

interface Course {
  id: string
  title: string
  provider: 'SWAYAM' | 'PMGDISHA' | 'OTHER'
  url: string
  duration: number
  language: string
  topics: string[]
}
```

### 5. Project Evaluation Service

Evaluates practical project submissions using AI.

```typescript
interface ProjectEvaluationService {
  // Submit project for evaluation
  submitProject(userId: string, projectId: string, submission: ProjectSubmission): Promise<string> // returns evaluationId
  
  // Get evaluation result
  getEvaluation(evaluationId: string): ProjectEvaluation
  
  // Request re-evaluation
  resubmitProject(evaluationId: string, improvedSubmission: ProjectSubmission): Promise<string>
  
  // Get evaluation rubric
  getRubric(projectId: string): EvaluationRubric
}

interface ProjectSubmission {
  projectId: string
  userId: string
  submissionType: 'text' | 'image' | 'video' | 'document'
  content: string | string[] // URLs for media
  description: string
  language: string
  submittedAt: Date
}

interface ProjectEvaluation {
  id: string
  projectId: string
  userId: string
  scores: {
    technicalAccuracy: number // 0-100
    completeness: number // 0-100
    creativity: number // 0-100
    overall: number // 0-100
  }
  passed: boolean // overall >= 70
  feedback: string
  improvementSuggestions: string[]
  evaluatedAt: Date
  language: string
}

interface EvaluationRubric {
  projectId: string
  criteria: {
    name: string
    description: string
    weight: number
    passingScore: number
  }[]
  requiredElements: string[]
  exampleSubmissions: string[]
}
```

### 6. Job Matching Service

Matches users with local employment opportunities.

```typescript
interface JobMatchingService {
  // Find matching jobs for user
  findJobs(userId: string, filters?: JobFilters): Job[]
  
  // Get job details
  getJob(jobId: string): Job
  
  // Express interest in job
  expressInterest(userId: string, jobId: string): JobApplication
  
  // Get recommended skills for available jobs
  getSkillGaps(userId: string, district: string): SkillGap[]
  
  // Update job listings from external sources
  syncJobListings(district: string): number // returns count of new jobs
}

interface Job {
  id: string
  title: string
  employer: string
  location: {
    district: string
    state: string
    coordinates: { lat: number, lng: number }
  }
  salaryRange: { min: number, max: number }
  requiredSkills: string[]
  description: string
  postedDate: Date
  source: 'government_portal' | 'partner_employer' | 'manual'
  distanceKm?: number
}

interface JobFilters {
  district?: string
  maxDistanceKm?: number
  minSalary?: number
  requiredSkills?: string[]
  jobType?: 'full_time' | 'part_time' | 'contract'
}

interface SkillGap {
  skill: string
  demandCount: number // number of jobs requiring this skill
  userHasSkill: boolean
  recommendedCourses: Course[]
}
```

### 7. Skill Passport Service

Manages digital skill credentials and verification.

```typescript
interface SkillPassportService {
  // Get user's skill passport
  getPassport(userId: string): SkillPassport
  
  // Add skill to passport
  addSkill(userId: string, skill: VerifiedSkill): SkillPassport
  
  // Request employer verification
  requestVerification(userId: string, skillId: string, employerEmail: string): VerificationRequest
  
  // Verify skill (called by employer)
  verifySkill(verificationToken: string, employerId: string): VerifiedSkill
  
  // Generate shareable URL
  generateShareableUrl(userId: string): string
  
  // Get passport by share URL
  getPassportByUrl(shareToken: string): PublicSkillPassport
  
  // Export passport as PDF
  exportPDF(userId: string, language: string): Promise<Buffer>
  
  // Track passport views
  trackView(shareToken: string, viewerInfo: ViewerInfo): void
}

interface SkillPassport {
  userId: string
  userName: string
  skills: VerifiedSkill[]
  completedProjects: CompletedProject[]
  certifications: Certification[]
  createdAt: Date
  lastUpdated: Date
  shareUrl: string
  viewCount: number
}

interface VerifiedSkill {
  id: string
  name: string
  category: string
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced'
  acquiredDate: Date
  verifiedBy?: {
    employerId: string
    employerName: string
    verifiedDate: Date
  }
  evidence: {
    projectId: string
    evaluationScore: number
  }
}

interface CompletedProject {
  id: string
  title: string
  description: string
  completedDate: Date
  evaluationScore: number
  skillsDemonstrated: string[]
  artifacts: string[] // URLs to project outputs
}
```

### 8. Notification Service

Manages multi-channel notifications and reminders.

```typescript
interface NotificationService {
  // Send notification through preferred channel
  sendNotification(userId: string, notification: Notification): Promise<void>
  
  // Schedule reminder
  scheduleReminder(userId: string, reminder: Reminder): string // returns reminderId
  
  // Cancel scheduled reminder
  cancelReminder(reminderId: string): void
  
  // Get notification preferences
  getPreferences(userId: string): NotificationPreferences
  
  // Update notification preferences
  updatePreferences(userId: string, preferences: NotificationPreferences): void
}

interface Notification {
  type: 'milestone_complete' | 'reminder' | 'job_match' | 'verification_request' | 'system'
  title: string
  message: string
  language: string
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  actionButtons?: Button[]
}

interface Reminder {
  type: 'progress_check' | 'milestone_due' | 'project_submission'
  scheduledFor: Date
  message: string
  language: string
}

interface NotificationPreferences {
  userId: string
  preferredChannel: 'whatsapp' | 'pwa' | 'both'
  enableReminders: boolean
  reminderFrequency: 'daily' | 'weekly' | 'custom'
  quietHours: { start: string, end: string } // e.g., "22:00" to "08:00"
}
```

### 9. WhatsApp Integration Service

Handles WhatsApp Business API integration.

```typescript
interface WhatsAppService {
  // Send text message
  sendMessage(phoneNumber: string, message: string): Promise<MessageStatus>
  
  // Send message with buttons
  sendInteractiveMessage(phoneNumber: string, message: InteractiveMessage): Promise<MessageStatus>
  
  // Send media message
  sendMedia(phoneNumber: string, mediaUrl: string, caption?: string): Promise<MessageStatus>
  
  // Download media from WhatsApp
  downloadMedia(mediaId: string): Promise<Buffer>
  
  // Handle incoming webhook
  handleWebhook(payload: WhatsAppWebhook): void
  
  // Get message status
  getMessageStatus(messageId: string): MessageStatus
}

interface InteractiveMessage {
  text: string
  buttons?: Button[]
  listItems?: ListItem[]
  quickReplies?: string[]
}

interface Button {
  id: string
  title: string
  action?: string
}

interface MessageStatus {
  messageId: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: Date
  error?: string
}
```

### 10. Government Resource Integration Service

Integrates with government skill platforms.

```typescript
interface GovernmentResourceService {
  // Fetch courses from SWAYAM
  fetchSWAYAMCourses(filters?: CourseFilters): Promise<Course[]>
  
  // Fetch PMGDISHA content
  fetchPMGDISHAContent(topic: string): Promise<Course[]>
  
  // Validate resource availability
  validateResource(resourceUrl: string): Promise<boolean>
  
  // Get enrollment link
  getEnrollmentLink(courseId: string, provider: string): string
  
  // Sync course completion status
  syncCompletionStatus(userId: string, externalUserId: string): Promise<CompletionStatus[]>
  
  // Find alternative resource
  findAlternative(unavailableResourceId: string): Promise<Course | null>
  
  // Update resource catalog
  updateCatalog(): Promise<number> // returns count of updated resources
}

interface CourseFilters {
  language?: string
  topic?: string
  duration?: { min: number, max: number }
  level?: 'beginner' | 'intermediate' | 'advanced'
}

interface CompletionStatus {
  courseId: string
  userId: string
  completed: boolean
  completionDate?: Date
  certificateUrl?: string
}
```

### 11. Analytics Service

Tracks metrics and generates impact reports.

```typescript
interface AnalyticsService {
  // Track user event
  trackEvent(userId: string, event: AnalyticsEvent): void
  
  // Get user journey analytics
  getUserJourney(userId: string): UserJourney
  
  // Get platform metrics
  getPlatformMetrics(dateRange: DateRange): PlatformMetrics
  
  // Get employment outcomes
  getEmploymentOutcomes(dateRange: DateRange, filters?: OutcomeFilters): EmploymentOutcomes
  
  // Generate impact report
  generateImpactReport(dateRange: DateRange): ImpactReport
  
  // Get resource effectiveness
  getResourceEffectiveness(): ResourceEffectiveness[]
  
  // Calculate ROI
  calculateROI(dateRange: DateRange): ROIMetrics
}

interface AnalyticsEvent {
  type: string
  properties: Record<string, any>
  timestamp: Date
  sessionId?: string
}

interface PlatformMetrics {
  activeUsers: number
  newRegistrations: number
  assessmentCompletionRate: number
  roadmapCompletionRate: number
  averageSessionDuration: number
  messageVolume: number
  responseTime: { p50: number, p95: number, p99: number }
}

interface EmploymentOutcomes {
  totalPlacements: number
  placementRate: number // percentage
  averageTimeToEmployment: number // days
  averageIncomeIncrease: number // rupees
  placementsByDistrict: Record<string, number>
  placementsBySkill: Record<string, number>
}

interface ImpactReport {
  dateRange: DateRange
  metrics: PlatformMetrics
  outcomes: EmploymentOutcomes
  roi: ROIMetrics
  topPerformingResources: Course[]
  userTestimonials: Testimonial[]
}
```

### 12. User Repository

Data access layer for user operations.

```typescript
interface UserRepository {
  // Create new user
  createUser(user: CreateUserRequest): User
  
  // Get user by ID
  getUser(userId: string): User | null
  
  // Get user by phone number
  getUserByPhone(phoneNumber: string): User | null
  
  // Update user profile
  updateUser(userId: string, updates: Partial<User>): User
  
  // Delete user and all data
  deleteUser(userId: string): void
  
  // Export user data
  exportUserData(userId: string): UserDataExport
  
  // Update employment outcome
  recordEmployment(userId: string, employment: EmploymentOutcome): void
}

interface User {
  id: string
  phoneNumber: string
  name: string
  age: number
  district: string
  state: string
  preferredLanguage: string
  education: string
  createdAt: Date
  lastActiveAt: Date
  consentGiven: boolean
  skillProfile?: SkillProfile
  currentRoadmapId?: string
  employmentOutcome?: EmploymentOutcome
}

interface EmploymentOutcome {
  employed: boolean
  jobTitle?: string
  employer?: string
  salary?: number
  employmentDate?: Date
  incomeIncrease?: number
}
```

## Data Models

### Core User Data

```typescript
interface User {
  id: string
  phoneNumber: string
  name: string
  age: number
  district: string
  state: string
  preferredLanguage: string
  education: string // "12th standard" or higher
  createdAt: Date
  lastActiveAt: Date
  consentGiven: boolean
  dataExportRequested: boolean
}

interface SkillProfile {
  userId: string
  technicalSkills: Skill[]
  softSkills: Skill[]
  interests: string[]
  careerGoals: string[]
  timeAvailability: number // hours per week
  assessmentCompletedAt: Date
  language: string
}

interface Skill {
  name: string
  category: string
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced'
  assessedBy: 'conversation' | 'project' | 'employer'
  confidence: number // 0-1
}
```

### Learning Progress Data

```typescript
interface UserProgress {
  userId: string
  roadmapId: string
  currentWeek: number
  completedMilestones: string[]
  completedCourses: string[]
  completedProjects: string[]
  totalHoursSpent: number
  streakDays: number
  lastActivityDate: Date
  progressPercentage: number
  estimatedCompletionDate: Date
}

interface PracticalProject {
  id: string
  title: string
  description: string
  skillsRequired: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  rubric: EvaluationRubric
  exampleSubmissions: string[]
  language: string
}
```

### Conversation Data

```typescript
interface ConversationSession {
  id: string
  userId: string
  channel: 'whatsapp' | 'pwa'
  language: string
  stage: 'greeting' | 'assessment' | 'roadmap' | 'progress' | 'jobs'
  startedAt: Date
  lastMessageAt: Date
  messageCount: number
  active: boolean
}

interface Message {
  id: string
  sessionId: string
  sender: 'user' | 'bot'
  content: {
    text?: string
    audioUrl?: string
    mediaUrls?: string[]
  }
  language: string
  timestamp: Date
  metadata?: Record<string, any>
}
```

### Job and Employment Data

```typescript
interface Job {
  id: string
  title: string
  employer: string
  employerVerified: boolean
  location: {
    district: string
    state: string
    coordinates: { lat: number, lng: number }
  }
  salaryRange: { min: number, max: number }
  requiredSkills: string[]
  preferredSkills: string[]
  description: string
  responsibilities: string[]
  qualifications: string[]
  jobType: 'full_time' | 'part_time' | 'contract' | 'internship'
  postedDate: Date
  expiryDate: Date
  source: 'government_portal' | 'partner_employer' | 'manual'
  contactInfo: {
    email?: string
    phone?: string
    applicationUrl?: string
  }
  active: boolean
}

interface JobApplication {
  id: string
  userId: string
  jobId: string
  status: 'interested' | 'applied' | 'interviewing' | 'offered' | 'accepted' | 'rejected'
  appliedAt: Date
  lastUpdated: Date
  notes?: string
}
```

### Analytics Data

```typescript
interface UserJourney {
  userId: string
  registrationDate: Date
  assessmentCompletedDate?: Date
  roadmapStartDate?: Date
  firstProjectCompletedDate?: Date
  roadmapCompletedDate?: Date
  firstJobApplicationDate?: Date
  employmentDate?: Date
  milestones: JourneyMilestone[]
  totalEngagementHours: number
  messageCount: number
  dropoffStage?: string
}

interface JourneyMilestone {
  type: string
  completedAt: Date
  daysFromStart: number
}

interface ResourceEffectiveness {
  resourceId: string
  resourceTitle: string
  provider: string
  completionRate: number
  averageTimeToComplete: number
  employmentCorrelation: number // 0-1, correlation with employment outcomes
  userRating: number // 1-5
  usageCount: number
}
```

### Configuration Data

```typescript
interface PlatformConfig {
  supportedLanguages: string[]
  assessmentQuestions: {
    [language: string]: AssessmentQuestion[]
  }
  roadmapTemplates: RoadmapTemplate[]
  evaluationRubrics: EvaluationRubric[]
  notificationTemplates: {
    [type: string]: {
      [language: string]: string
    }
  }
  performanceThresholds: {
    responseTimeMs: number
    roadmapGenerationTimeMs: number
    voiceTranscriptionTimeMs: number
  }
  targetMetrics: {
    employmentRate: number // 0.6 for 60%
    incomeIncrease: number // 5000 rupees
    placementTimeMonths: number // 6 months
  }
}

interface AssessmentQuestion {
  id: string
  text: string
  category: 'technical' | 'soft_skills' | 'interests' | 'goals'
  followUpQuestions?: string[]
  expectedAnswerType: 'open_ended' | 'multiple_choice' | 'rating'
}

interface RoadmapTemplate {
  id: string
  name: string
  targetJobRoles: string[]
  duration: number // months
  skillsRequired: string[]
  milestoneTemplates: MilestoneTemplate[]
}

interface MilestoneTemplate {
  weekNumber: number
  title: string
  description: string
  recommendedCourses: string[] // course IDs
  activities: string[]
  estimatedHours: number
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Multilingual and Accessibility Properties

**Property 1: Language consistency across platform**
*For any* user interaction (assessment, roadmap, evaluation feedback, notifications), all content should be delivered in the user's selected supported language.
**Validates: Requirements 1.2, 1.4, 4.7, 5.4**

**Property 2: Voice input transcription**
*For any* voice input in a supported language, the platform should transcribe the audio to text using the correct language model.
**Validates: Requirements 1.3**

**Property 3: Cross-interface feature parity**
*For any* core feature (skill assessment, roadmap access, project submission, job viewing), it should be accessible through both WhatsApp and PWA interfaces.
**Validates: Requirements 3.1, 4.5, 5.1**

**Property 4: Voice message processing**
*For any* voice message up to 3 minutes in length, the platform should successfully process and transcribe it.
**Validates: Requirements 3.4**

**Property 5: Responsive design support**
*For any* screen size from 320px width and above, the PWA should render correctly and maintain full functionality.
**Validates: Requirements 4.8**

### Skill Assessment Properties

**Property 6: Assessment question coverage**
*For any* skill assessment conversation, questions should cover all four categories: technical skills, soft skills, interests, and career goals.
**Validates: Requirements 1.5**

**Property 7: Skill profile generation**
*For any* completed skill assessment, a skill profile should be generated containing identified skills with proficiency levels.
**Validates: Requirements 1.6**

**Property 8: Assessment duration**
*For any* skill assessment, the conversation should complete within 15-20 minutes.
**Validates: Requirements 1.7**

**Property 9: Clarifying questions for ambiguity**
*For any* ambiguous user response during assessment, the platform should ask at least one clarifying follow-up question.
**Validates: Requirements 1.8**

### Learning Roadmap Properties

**Property 10: Roadmap generation performance**
*For any* completed skill assessment, a learning roadmap should be generated within 30 seconds, even during peak usage.
**Validates: Requirements 2.1, 11.3**

**Property 11: Roadmap duration bounds**
*For any* generated learning roadmap, the duration should be between 3 and 6 months based on the user's skill level and time availability.
**Validates: Requirements 2.2, 2.7**

**Property 12: Government resource exclusivity**
*For any* learning roadmap, all included resources should be from approved government sources (SWAYAM, PMGDISHA, or integrated platforms).
**Validates: Requirements 2.3**

**Property 13: Weekly milestone structure**
*For any* learning roadmap, it should be organized into weekly milestones, each containing specific courses and activities.
**Validates: Requirements 2.4**

**Property 14: Minimum project requirement**
*For any* learning roadmap, it should include at least 3 practical projects aligned with the target job roles.
**Validates: Requirements 2.5**

**Property 15: Roadmap item completeness**
*For any* roadmap item (course or activity), it should include a link, estimated time commitment, and learning objectives.
**Validates: Requirements 2.6**

**Property 16: District-level job alignment**
*For any* learning roadmap, the skills taught should align with job opportunities available in the user's district.
**Validates: Requirements 2.8**

### Communication and Interaction Properties

**Property 17: Message response time**
*For any* user message sent through WhatsApp or PWA under normal load, the platform should respond within 5 seconds.
**Validates: Requirements 3.2, 11.2**

**Property 18: Message format support**
*For any* user interaction, the platform should support both text and voice message formats.
**Validates: Requirements 3.3**

**Property 19: Structured response formatting**
*For any* bot response, appropriate WhatsApp formatting (lists, buttons, quick replies) should be used when applicable.
**Validates: Requirements 3.5**

**Property 20: Roadmap delivery format**
*For any* roadmap request via WhatsApp, the response should be formatted with clickable links to all resources.
**Validates: Requirements 3.6**

**Property 21: Scheduled notifications**
*For any* user with an active roadmap, weekly progress reminders and milestone notifications should be sent.
**Validates: Requirements 3.7**

**Property 22: Conversation context persistence**
*For any* user, conversation context should be maintained across multiple sessions, allowing seamless continuation.
**Validates: Requirements 3.8**

### Offline and Sync Properties

**Property 23: Offline content access**
*For any* user who loses internet connectivity, the PWA should display cached content and allow access to previously downloaded materials.
**Validates: Requirements 4.3**

**Property 24: Progress synchronization**
*For any* offline progress made by a user, when connectivity is restored, all progress should automatically sync to the server.
**Validates: Requirements 4.4**

**Property 25: Resource download capability**
*For any* government resource in a user's roadmap, the platform should allow downloading for offline viewing.
**Validates: Requirements 4.6**

### Project Evaluation Properties

**Property 26: Evaluation performance**
*For any* practical project submission, AI evaluation should complete within 2 minutes.
**Validates: Requirements 5.2**

**Property 27: Evaluation score completeness**
*For any* project evaluation, scores should be provided for all three categories: technical accuracy, completeness, and creativity.
**Validates: Requirements 5.3**

**Property 28: Failed project feedback**
*For any* project that fails evaluation (score < 70%), specific improvement suggestions should be provided and resubmission should be allowed.
**Validates: Requirements 5.5**

**Property 29: Passing score threshold**
*For any* practical project, it should only be marked complete if the overall score is 70% or higher.
**Validates: Requirements 5.6**

**Property 30: Project completion updates passport**
*For any* practical project that passes evaluation, the demonstrated skill should be added to the user's skill passport.
**Validates: Requirements 5.7, 7.1**

**Property 31: Multiple submission format support**
*For any* project submission, the platform should accept text descriptions, photos, videos, and document uploads.
**Validates: Requirements 5.8**

### Job Matching Properties

**Property 32: Job visibility threshold**
*For any* user who has completed 70% or more of their learning roadmap, relevant job opportunities should be displayed.
**Validates: Requirements 6.1**

**Property 33: Job matching criteria**
*For any* job match, it should consider the user's completed skills, district-level location, and job requirements.
**Validates: Requirements 6.2**

**Property 34: Job display completeness**
*For any* displayed job opportunity, it should show job title, employer name, location, salary range, and required skills.
**Validates: Requirements 6.3**

**Property 35: Job source integration**
*For any* job listing, it should be fetched from government job portals or partner employer databases.
**Validates: Requirements 6.4**

**Property 36: Job interest facilitation**
*For any* job that a user expresses interest in, the platform should facilitate connection with the employer.
**Validates: Requirements 6.5**

**Property 37: Local job prioritization**
*For any* job list displayed to a user, jobs within 50 kilometers of their district should be prioritized.
**Validates: Requirements 6.6**

**Property 38: Skill gap suggestions**
*For any* user with no matching local jobs, the platform should suggest additional skills to learn based on available opportunities.
**Validates: Requirements 6.7**

**Property 39: Job listing freshness**
*For any* district, job listings should be updated daily to ensure current opportunities are displayed.
**Validates: Requirements 6.8**

### Skill Passport Properties

**Property 40: Unique shareable URL**
*For any* user, a unique shareable URL should be generated for their skill passport.
**Validates: Requirements 7.2**

**Property 41: Passport display completeness**
*For any* skill passport accessed via URL, it should display verified skills, completion dates, and project evidence.
**Validates: Requirements 7.3**

**Property 42: Verification request capability**
*For any* completed project in a user's passport, the user should be able to request employer verification.
**Validates: Requirements 7.4**

**Property 43: Verification badge addition**
*For any* skill verified by an employer, a verification badge should be added to the skill passport.
**Validates: Requirements 7.5**

**Property 44: PDF export capability**
*For any* user, their skill passport should be downloadable as a PDF document.
**Validates: Requirements 7.7**

**Property 45: Passport view tracking**
*For any* skill passport share, views and employer interactions should be tracked for analytics.
**Validates: Requirements 7.8**

### Progress and Motivation Properties

**Property 46: Progress indicator display**
*For any* user with an active roadmap, a visual progress indicator showing percentage completion should be displayed.
**Validates: Requirements 8.1**

**Property 47: Milestone completion celebration**
*For any* milestone completed by a user, a congratulatory message should be sent through their preferred interface.
**Validates: Requirements 8.2**

**Property 48: Learning streak tracking**
*For any* user, daily and weekly learning streaks should be tracked and displayed.
**Validates: Requirements 8.3**

**Property 49: Inactivity reminders**
*For any* user who has not engaged with the platform for 3 consecutive days, a reminder message should be sent.
**Validates: Requirements 8.4**

**Property 50: Completion time estimation**
*For any* user with an active roadmap, an estimated time to completion should be calculated and displayed based on current progress rate.
**Validates: Requirements 8.5**

**Property 51: District-specific success stories**
*For any* user, success stories from other users who achieved employment in the same district should be shown.
**Validates: Requirements 8.6**

**Property 52: Employment outcome data collection**
*For any* user who achieves employment, the platform should request outcome data including salary, job title, and employer.
**Validates: Requirements 8.7**

**Property 53: Gamification elements**
*For any* user activity (completing courses, projects, milestones), appropriate gamification elements (points, badges, achievements) should be awarded.
**Validates: Requirements 8.8**

### Government Resource Integration Properties

**Property 54: SWAYAM integration**
*For any* roadmap generation, the platform should fetch current course catalogs and enrollment links from the SWAYAM API.
**Validates: Requirements 9.1**

**Property 55: PMGDISHA integration**
*For any* digital literacy content needed, the platform should access it from PMGDISHA.
**Validates: Requirements 9.2**

**Property 56: Resource availability management**
*For any* government resource added to a roadmap, its availability should be verified, links should be updated weekly, and unavailable resources should be automatically substituted with equivalents.
**Validates: Requirements 9.3, 9.4, 9.5**

**Property 57: Resource effectiveness tracking**
*For any* government resource used in roadmaps, the platform should track completion rates and correlation with employment outcomes.
**Validates: Requirements 9.6**

**Property 58: Direct enrollment links**
*For any* course in a roadmap, a deep link should be provided that allows users to enroll directly.
**Validates: Requirements 9.7**

**Property 59: Completion status synchronization**
*For any* integrated platform that provides completion status, the platform should sync this data for users.
**Validates: Requirements 9.8**

### Data Privacy and Security Properties

**Property 60: Data encryption**
*For any* user data, it should be encrypted both at rest and in transit using industry-standard encryption.
**Validates: Requirements 10.1, 10.8**

**Property 61: Explicit consent collection**
*For any* new user account creation, explicit consent for data collection and usage should be obtained before proceeding.
**Validates: Requirements 10.3**

**Property 62: Data portability**
*For any* user, they should be able to download all their personal data in a portable format.
**Validates: Requirements 10.4**

**Property 63: Account deletion completeness**
*For any* user who requests account deletion, all associated data should be permanently removed from the system.
**Validates: Requirements 10.5**

**Property 64: Third-party data sharing restrictions**
*For any* data sharing with third parties, explicit user consent should be verified before sharing occurs.
**Validates: Requirements 10.6**

**Property 65: Employer data sharing limitations**
*For any* employer integration, only skills and skill passport data should be shared, never personal contact information.
**Validates: Requirements 10.7**

**Property 66: Data access logging**
*For any* access to user data, a log entry should be created with timestamp, accessor, and purpose for security auditing.
**Validates: Requirements 10.9**

**Property 67: Analytics data anonymization**
*For any* user data used in analytics and reporting, personal identifiers should be removed or anonymized.
**Validates: Requirements 10.10**

### Performance and Scalability Properties

**Property 68: Concurrent user support**
*For any* load up to 10,000 concurrent users, the platform should maintain performance without degradation.
**Validates: Requirements 11.1**

**Property 69: Voice transcription performance**
*For any* voice message up to 1 minute in length, transcription should complete within 10 seconds.
**Validates: Requirements 11.4**

**Property 70: System uptime**
*For any* monthly measurement period, the platform should maintain 99.5% or higher uptime.
**Validates: Requirements 11.5**

**Property 71: Overload handling**
*For any* situation where system load exceeds capacity, requests should be queued and users should be informed of expected wait time.
**Validates: Requirements 11.6**

**Property 72: LLM inference optimization**
*For any* LLM inference request, response latency should be minimized through optimization techniques.
**Validates: Requirements 11.7**

**Property 73: Caching for frequent data**
*For any* frequently accessed government resources and job listings, caching should be used to improve performance.
**Validates: Requirements 11.8**

### Analytics and Impact Measurement Properties

**Property 74: User journey metrics tracking**
*For any* user, the platform should track registration, skill assessment completion, and learning roadmap progress rates.
**Validates: Requirements 12.1**

**Property 75: Employment outcome measurement**
*For any* user who achieves employment, the platform should measure job placement rate, time to employment, and salary increase.
**Validates: Requirements 12.2**

**Property 76: Learning path linkage**
*For any* employment outcome, it should be linked to the user's learning path for impact analysis.
**Validates: Requirements 12.3**

**Property 77: Monthly reporting**
*For any* month, the platform should generate reports showing active users, completion rates, employment rate, and average income increase.
**Validates: Requirements 12.4**

**Property 78: Resource effectiveness analytics**
*For any* government resource, the platform should track completion rates and employment outcome correlations.
**Validates: Requirements 12.5**

**Property 79: User engagement metrics**
*For any* user, the platform should measure session duration, message frequency, and feature usage.
**Validates: Requirements 12.6**

**Property 80: Analytics segmentation**
*For any* analytics query, data should be segmentable by district, language, age group, and skill category.
**Validates: Requirements 12.7**

**Property 81: ROI calculation**
*For any* reporting period, the platform should calculate return on investment by comparing platform costs to user income increases.
**Validates: Requirements 12.9**

**Property 82: Target metric tracking**
*For any* reporting period, the platform should track progress toward the 60% employment rate target and ₹5,000+ monthly income increase goal.
**Validates: Requirements 12.10**

## Error Handling

### Error Categories

The system defines clear error categories with appropriate handling strategies:

1. **User Input Errors**
   - Invalid language selection
   - Malformed voice messages
   - Unsupported file formats
   - Missing required fields
   - **Handling**: Provide clear error messages in user's language with guidance on correction

2. **Service Integration Errors**
   - WhatsApp API failures
   - Government resource API timeouts
   - Email service unavailability
   - Job portal connection failures
   - **Handling**: Retry with exponential backoff, fallback to cached data, notify user if persistent

3. **LLM Processing Errors**
   - Transcription failures
   - Assessment generation errors
   - Roadmap generation timeouts
   - Project evaluation failures
   - **Handling**: Retry with different parameters, fallback to template-based responses, escalate to human review if needed

4. **Data Consistency Errors**
   - Sync conflicts during offline-online transition
   - Duplicate submissions
   - Stale data references
   - **Handling**: Use last-write-wins or merge strategies, validate data integrity, prompt user for conflict resolution

5. **Performance Degradation**
   - High latency responses
   - Queue overflow
   - Resource exhaustion
   - **Handling**: Activate rate limiting, scale resources, queue requests, inform users of delays

6. **Security Errors**
   - Authentication failures
   - Unauthorized access attempts
   - Data breach attempts
   - **Handling**: Log security events, block suspicious activity, notify administrators, enforce rate limits

### Error Response Format

All errors follow a consistent multilingual format:

```typescript
interface ErrorResponse {
  error: {
    code: string              // Machine-readable error code
    message: string           // User-friendly message in user's language
    type: 'user' | 'system' | 'integration'
    severity: 'low' | 'medium' | 'high' | 'critical'
    retryable: boolean
    retryAfter?: number       // Seconds to wait before retry
    supportContact?: string   // Contact for critical errors
  }
  requestId: string           // For support tracking
  timestamp: Date
}
```

### Graceful Degradation Strategies

1. **Offline Mode**: When connectivity is lost, PWA continues functioning with cached data
2. **Fallback Resources**: If primary government resource is unavailable, substitute with equivalent
3. **Simplified Responses**: If LLM is overloaded, use template-based responses
4. **Async Processing**: Queue long-running operations (project evaluation) for later processing
5. **Partial Functionality**: If WhatsApp API is down, direct users to PWA

### Error Recovery Procedures

1. **Automatic Retry**: Transient errors trigger automatic retry with exponential backoff
2. **User Notification**: Persistent errors notify user with clear explanation and next steps
3. **Admin Alerts**: Critical errors trigger immediate admin notifications
4. **Fallback Mechanisms**: Each service has defined fallback behavior
5. **Data Preservation**: User progress is always saved before error handling

## Testing Strategy

### Dual Testing Approach

The system requires both unit testing and property-based testing for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, integration points, and error conditions
- **Property tests**: Verify universal properties across all inputs and scenarios

Both approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Unit Testing Focus

Unit tests should focus on:
- Specific examples demonstrating correct behavior (e.g., successful Hindi language assessment)
- Integration points between services (e.g., WhatsApp API integration, SWAYAM API integration)
- Edge cases and error conditions (e.g., 3-minute voice messages, network failures, malformed data)
- Boundary conditions (e.g., exactly 70% roadmap completion, exactly 50km distance)
- Multilingual content rendering (verify correct display in all 10+ supported languages)
- Offline-online synchronization scenarios

Avoid writing too many unit tests for scenarios that property-based tests already cover comprehensively.

### Property-Based Testing Configuration

**Library Selection**: Use a property-based testing library appropriate for the implementation language:
- TypeScript/JavaScript: fast-check
- Python: Hypothesis
- Java: jqwik or QuickCheck
- Go: gopter
- Rust: proptest or quickcheck

**Test Configuration**:
- Minimum 100 iterations per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: `Feature: skill-path-finder, Property {number}: {property_text}`

**Example Property Test Structure**:

```typescript
// Feature: skill-path-finder, Property 1: Language consistency across platform
test('language consistency across platform', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'en'),
      fc.string({ minLength: 10, maxLength: 100 }),
      async (language, userMessage) => {
        // Setup: Create user with selected language
        const user = await createUser({ preferredLanguage: language });
        const session = await conversationService.startConversation(user.id, language, 'pwa');
        
        // Action: Send message and get response
        const response = await conversationService.processMessage(session.id, {
          text: userMessage,
          language: language,
          timestamp: new Date()
        });
        
        // Assert: Response is in the same language
        expect(response.language).toBe(language);
        expect(await isInLanguage(response.text, language)).toBe(true);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Coverage Requirements

Each correctness property (Properties 1-82) must be implemented by a single property-based test. The properties cover:

- Multilingual and accessibility (Properties 1-5)
- Skill assessment (Properties 6-9)
- Learning roadmap generation (Properties 10-16)
- Communication and interaction (Properties 17-22)
- Offline and sync (Properties 23-25)
- Project evaluation (Properties 26-31)
- Job matching (Properties 32-39)
- Skill passport (Properties 40-45)
- Progress and motivation (Properties 46-53)
- Government resource integration (Properties 54-59)
- Data privacy and security (Properties 60-67)
- Performance and scalability (Properties 68-73)
- Analytics and impact measurement (Properties 74-82)

### Integration Testing

Integration tests should verify:
- WhatsApp Business API integration (send/receive messages, media handling)
- SWAYAM and PMGDISHA API integration (course fetching, enrollment)
- Voice processing service integration (transcription, synthesis)
- LLM service integration (conversation, evaluation, roadmap generation)
- Job portal integration (job fetching, application submission)
- Email service integration (notifications, verification requests)
- Database operations (CRUD operations, transactions, consistency)
- Cache layer integration (Redis/Memcached for performance)

### End-to-End Testing

E2E tests should verify complete user journeys:
- New user onboarding → assessment → roadmap generation → first milestone
- Project submission → evaluation → skill passport update → employer verification
- Job discovery → application → employment outcome recording
- Offline usage → sync on reconnection → data consistency
- Cross-interface journey (start on WhatsApp, continue on PWA)

### Performance Testing

Performance tests should verify:
- Load testing: 10,000 concurrent users
- Response time: <5 seconds for messages, <30 seconds for roadmap generation
- Voice transcription: <10 seconds for 1-minute audio
- Scalability: Linear scaling with additional resources
- Database query performance under load
- LLM inference latency optimization
- Cache hit rates and effectiveness

### Security Testing

Security-focused tests should verify:
- Authentication and authorization mechanisms
- Data encryption at rest and in transit
- SQL injection and XSS prevention
- Rate limiting effectiveness
- Data access logging and auditing
- Privacy compliance (data export, deletion)
- Secure API key management
- HTTPS enforcement

### Multilingual Testing

Multilingual tests should verify:
- Correct rendering in all 10+ supported languages
- Language-specific character encoding (Devanagari, Tamil script, etc.)
- Right-to-left text support if needed
- Voice transcription accuracy per language
- LLM response quality per language
- Translation accuracy between languages

### Accessibility Testing

Accessibility tests should verify:
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- Text size adjustability
- Voice-first interaction flows
- Low-bandwidth optimization

### Monitoring and Observability

Production monitoring should track:
- Real-time metrics: active users, message volume, response times
- Error rates and types by service
- LLM inference latency and token usage
- API integration health (WhatsApp, SWAYAM, PMGDISHA)
- Database performance and connection pool usage
- Cache hit rates
- Employment outcome metrics (60% target, ₹5,000+ income increase)
- User engagement metrics (session duration, completion rates)
- System resource utilization (CPU, memory, network)

