# 🎯 SkillPath Finder — AI Career Counselor for Bharat

<div align="center">

![SkillPath Finder](https://img.shields.io/badge/SkillPath-Finder-FF6B00?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Amazon Bedrock](https://img.shields.io/badge/Amazon-Bedrock-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900?style=for-the-badge&logo=aws-lambda&logoColor=white)
![AWS Amplify](https://img.shields.io/badge/AWS-Amplify-FF9900?style=for-the-badge&logo=aws-amplify&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![DynamoDB](https://img.shields.io/badge/Amazon-DynamoDB-4053D6?style=for-the-badge&logo=amazon-dynamodb&logoColor=white)

**India's AI-powered career counselor — on Web, WhatsApp, and Voice Call.**


[🌐 Live Demo](https://master.dz3ur97e6jwin.amplifyapp.com) · [💬 WhatsApp Bot](#whatsapp-bot) · [📞 Voice Call](#voice-call) · [📹 Demo Video](#demo-video)

</div>

---

## 🇮🇳 The Problem

In India, **65 crore young people** don't know what to learn, what skills to build, or how to get a job.

- ❌ No career roadmap
- ❌ Cannot afford a career counselor (₹500–₹2000/session)
- ❌ No internet connection in rural areas
- ❌ No access to skill development guidance

**They deserve better. We built SkillPath Finder.**

---

## 💡 The Solution

**SkillPath Finder** is an AI-powered career counseling platform that gives every Indian a personalized career roadmap — completely free — on any device.

At its heart is **Priya** — our AI career counselor powered by **Amazon Bedrock (Claude 3 Haiku)**. She listens to your goals, understands your situation, and builds you a complete 3-month learning roadmap in under 60 seconds.

> *"Because every dream deserves a direction."*

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Adaptive AI Assessment** | 5-question intelligent assessment across 7 career branches and 15 paths |
| 🗺️ **Personalized Roadmap** | Custom 3-month career plan with monthly milestones |
| 🏛️ **Government Courses** | Free certified programs — NSDC, PM Kaushal Vikas, Skill India |
| 💼 **Local Job Matching** | Real jobs matched to your exact career path and city with salary data |
| 🏆 **Skill Passport** | Digital credentials tracking your learning progress and certifications |
| 💬 **WhatsApp Bot** | Full AI conversation on WhatsApp — works on 2G internet |
| 📞 **Voice Call + SMS** | Call Priya on any phone — she speaks, you answer, roadmap arrives by SMS |
| 🌐 **Multilingual** | Hindi and English support for tier-2 and tier-3 city youth |

---

## 🚀 Our Biggest USP — 3 Channels

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   🌐 Web App    │    │  💬 WhatsApp    │    │  📞 Voice Call  │
│                 │    │                 │    │                 │
│ Full experience │    │ Send "Hi"       │    │ Any phone       │
│ on any browser  │    │ Works on 2G     │    │ No internet     │
│                 │    │ No app needed   │    │ SMS roadmap     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                      │                      │
         └──────────────────────┴──────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │    🧠 Priya AI        │
                    │  Amazon Bedrock       │
                    │   Claude 3 Haiku      │
                    └───────────────────────┘
```

**One AI. Three channels. 95% of India covered.**

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                 │
│         Web Browser    WhatsApp User    Phone Caller         │
└────────────┬───────────────┬────────────────┬───────────────┘
             │               │                │
             ▼               ▼                ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  AWS Amplify   │  │    Twilio      │  │    Twilio      │
│  React.js      │  │  WhatsApp API  │  │  Voice/TwiML   │
│  (ap-south-1)  │  │                │  │                │
└───────┬────────┘  └───────┬────────┘  └───────┬────────┘
        │                   │                    │
        ▼                   ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                   Amazon API Gateway                         │
│                      (REST API)                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     AWS Lambda                               │
│                   Python 3.14                                │
│         ap-south-1 (main) + us-east-1 (voice/WA)           │
└─────────────────────────┬───────────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
┌─────────────────────┐   ┌─────────────────────┐
│   Amazon Bedrock    │   │   Amazon DynamoDB    │
│  Claude 3 Haiku     │   │                      │
│   (ap-south-1)      │   │ • skillpath-users    │
│                     │   │ • whatsapp-sessions  │
│  AI Inference +     │   │ • voice-sessions     │
│  Roadmap Generation │   │                      │
└─────────────────────┘   └─────────────────────┘
```

---

## 🛠️ Tech Stack

### AWS Services
- **Amazon Bedrock** — Claude 3 Haiku for AI career counseling and roadmap generation
- **AWS Lambda** — Serverless Python 3.14 backend (zero server management)
- **Amazon API Gateway** — REST endpoints connecting all layers
- **Amazon DynamoDB** — NoSQL database for user profiles and session management
- **AWS Amplify** — Frontend hosting with CI/CD from GitHub

### Frontend
- **React.js + Vite** — Modern SPA framework
- **Tailwind CSS** — Responsive dark UI

### Communication
- **Twilio** — WhatsApp Business API (sandbox) + Voice/TwiML + SMS delivery

### DevOps
- **GitHub** — Source control with auto-deploy pipeline to Amplify

---

## 🌐 Live Demo

**Web App:** [https://master.dz3ur97e6jwin.amplifyapp.com](https://master.dz3ur97e6jwin.amplifyapp.com)

---

## 💬 WhatsApp Bot

Try Priya on WhatsApp right now:

```
1. Save this number on WhatsApp: +1 415 523 8886
2. Send: "join made-dance"
3. Wait for confirmation message
4. Send: "Hi"
5. Priya will guide you through your career assessment!
```

---

## 📞 Voice Call

```
1. Call Priya's Twilio number -+18703612602
2. She will speak to you and ask 5 questions
3. Answer naturally by speaking
4. Receive your personalized roadmap via SMS
5. Works on ANY phone — no internet needed!
```

---

## 📹 Demo Video

> 🎬 [Watch Full Demo Video](#) ← Add your YouTube/Drive link here

---

## 🤖 Meet Priya — Our AI Counselor

Priya is powered by **Amazon Bedrock (Claude 3 Haiku)** and asks 5 smart questions:

```
Question 1: What is your name?
Question 2: What field interests you most?
           1️⃣ Computers & Coding
           2️⃣ Graphic Design
           3️⃣ Digital Marketing
           4️⃣ Electronics Repair
           5️⃣ Beauty & Fashion
           6️⃣ Teaching
           7️⃣ Business & Selling
Question 3: What specifically do you want to learn?
Question 4: What is your experience level?
Question 5: How many hours per day can you dedicate?
Question 6: Which city are you from?
```

Based on your answers, Priya generates:
- ✅ Personalized 3-month roadmap
- ✅ Free YouTube resources in Hindi
- ✅ Government scheme recommendations
- ✅ Local job matches with salary data
- ✅ Expected monthly income range

---

## 💰 Cost Analysis

| | Human Counselor | SkillPath Finder |
|---|---|---|
| **Cost per session** | ₹500 – ₹2,000 | ₹0.50 |
| **Availability** | Appointment needed | 24/7 instant |
| **Location** | Only in cities | Anywhere in India |
| **Language** | Limited | Hindi + English |
| **Device needed** | In-person / Video call | Any phone |

**99.9% cost reduction. 100x more accessible.**

### AWS Cost Breakdown (10,000 users/month)
| Service | Cost |
|---|---|
| AWS Lambda | ~$2/month |
| Amazon DynamoDB | ~$5/month |
| AWS Amplify | ~$3/month |
| Amazon API Gateway | ~$2/month |
| Amazon Bedrock (Claude 3 Haiku) | ~$20/month |
| **Total** | **~$32/month** |

---

## 📁 Project Structure

```
skillpath-finder/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Assessment/
│   │   │   ├── Roadmap/
│   │   │   ├── JobBoard/
│   │   │   └── SkillPassport/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Assessment.jsx
│   │   │   ├── Roadmap.jsx
│   │   │   ├── Jobs.jsx
│   │   │   └── Passport.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── lambda_function.py        ← Main API Lambda
│   ├── lambda_whatsapp.py        ← WhatsApp Bot Lambda
│   └── lambda_voice.py           ← Voice Call Lambda
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18
Python >= 3.11
AWS Account
Twilio Account (for WhatsApp + Voice)
```

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/rachana192837/Skill-Path-Finder-AI-for-Bharat-.git

# Navigate to frontend
cd skillpath-finder/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to backend
cd skillpath-finder/backend

# Deploy Lambda functions on AWS
# (Use AWS Console or AWS CLI)

# Set environment variables in Lambda:
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
AMPLIFY_URL=https://master.dz3ur97e6jwin.amplifyapp.com
DYNAMODB_TABLE=skillpath-whatsapp-sessions
BASE_URL=your_api_gateway_url
```

### AWS Services Setup
```
1. Create DynamoDB tables:
   - skillpath-users (partition key: userId)
   - skillpath-whatsapp-sessions (partition key: phone)
   - skillpath-voice-sessions (partition key: callSid)

2. Create Lambda functions:
   - skillpath-main (ap-south-1)
   - skillpath-whatsapp (us-east-1)
   - skillpath-voice (us-east-1)

3. Add IAM permissions:
   - AmazonDynamoDBFullAccess
   - AmazonBedrockFullAccess

4. Create API Gateway:
   - HTTP API
   - Connect to Lambda functions

5. Deploy frontend to Amplify:
   - Connect GitHub repository
   - Set build settings (frontend/dist)
   - Add redirect rule: /<*> → /index.html
```

---

## 🗺️ Roadmap — Future Development

| Phase | Timeline | Features |
|---|---|---|
| **Phase 1** | ✅ Now | Web + WhatsApp + Voice LIVE |
| **Phase 2** | 3 months | Amazon Polly Hindi voice + 12 Indian languages |
| **Phase 3** | 6 months | NSDC + Skill India integration + video courses |
| **Phase 4** | 12 months | Job portal + AI mentorship + 1 crore users |

**Goal: Reach 1 crore youth across 500 districts of India by 2027**


<div align="center">

**SkillPath Finder**

*Career guidance for every Indian. On every device. Completely free.*

*Because every dream deserves a direction.* 🇮🇳

[![Live Demo](https://img.shields.io/badge/Live-Demo-FF6B00?style=for-the-badge)](https://master.dz3ur97e6jwin.amplifyapp.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/rachana192837/Skill-Path-Finder-AI-for-Bharat-)

</div>
