import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from './Dashboard'

const INTEREST_BRANCHES = {
  computer: {
    followUp: "Computer mein kaun si cheez zyada pasand hai? Programming (coding), Design (Canva/Figma/Photoshop), Data/Excel, AI tools (ChatGPT etc), ya kuch aur?",
    followUp_en: "What interests you more about computers? Programming/coding, Design (Canva/Figma/Photoshop), Data & Excel, AI tools (ChatGPT), or something else?",
    subBranches: {
      programming: {
        q: "Coding mein interest hai! Kya aapne kabhi kuch try kiya — HTML, Python, YouTube se dekha? Aur zyada interest kisme hai: websites banana, mobile apps, ya AI/data science?",
        q_en: "You're into coding! Have you tried anything — HTML, Python, YouTube tutorials? And more interest in: building websites, mobile apps, or AI/data science?",
        path: "Web Development / Python Programming",
        skills: ["HTML/CSS", "Python Basics", "JavaScript", "Git & GitHub"],
        youtube: [
          { title: "HTML & CSS Full Course Hindi (11 hrs)", channel: "CodeWithHarry", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs", duration: "11 hrs" },
          { title: "Python Tutorial Beginners Hindi", channel: "CodeWithHarry", url: "https://www.youtube.com/watch?v=gfDE2a7MKjA", duration: "8 hrs" },
          { title: "JavaScript Full Course Hindi", channel: "Thapa Technical", url: "https://www.youtube.com/watch?v=cvvwkxbHnSg", duration: "10 hrs" },
          { title: "React JS Course Hindi", channel: "Thapa Technical", url: "https://www.youtube.com/watch?v=RGKi6LSPDLU", duration: "6 hrs" },
        ]
      },
      design: {
        q: "Design mein acha interest hai! Kya specifically banana chahte hain — social media posts, logos, YouTube thumbnails, wedding cards? Aur Canva use kiya kabhi, ya Figma/Photoshop try kiya?",
        q_en: "Great design interest! What specifically do you want to make — social media posts, logos, YouTube thumbnails, wedding cards? Have you used Canva, or tried Figma/Photoshop?",
        path: "Graphic Design & Digital Media",
        skills: ["Canva Pro", "Adobe Photoshop", "Logo Design", "Social Media Graphics"],
        youtube: [
          { title: "Canva Complete Tutorial Hindi", channel: "Technical Guruji", url: "https://www.youtube.com/watch?v=PBMtMbJ9OKg", duration: "3 hrs" },
          { title: "Photoshop Full Course Beginners Hindi", channel: "Graphic Design Tutorials", url: "https://www.youtube.com/watch?v=IyR_uYsnevE", duration: "8 hrs" },
          { title: "Logo Design in Canva Hindi", channel: "Design With Canva", url: "https://www.youtube.com/watch?v=7sPBJXJhJFI", duration: "2 hrs" },
          { title: "Freelance Graphic Design Income Hindi", channel: "WsCube Tech", url: "https://www.youtube.com/watch?v=k4l2E7RJKVI", duration: "4 hrs" },
        ]
      },
      data: {
        q: "Data/Excel — kya karna chahte hain exactly? Office work ke liye basic Excel, ya advanced Data Analysis, ya Tally/Accounting ke saath? Aur Excel pehle use kiya hai?",
        q_en: "Data/Excel — what exactly? Basic Excel for office work, advanced Data Analysis, or Tally/Accounting? Have you used Excel before?",
        path: "Data Analysis & MS Excel",
        skills: ["MS Excel Advanced", "Pivot Tables", "Tally ERP", "MIS Reports", "Power BI Basics"],
        youtube: [
          { title: "MS Excel Full Course Hindi Zero to Hero", channel: "LearnVern", url: "https://www.youtube.com/watch?v=_3BOEJM_9Xo", duration: "6 hrs" },
          { title: "Excel Advanced Formulas & Pivot Tables", channel: "MyEdu Self", url: "https://www.youtube.com/watch?v=K74_FNs6T2s", duration: "4 hrs" },
          { title: "Tally ERP 9 Full Course Hindi", channel: "Gyaan la", url: "https://www.youtube.com/watch?v=2XPBU5upPP4", duration: "10 hrs" },
          { title: "Data Analysis for Beginners Hindi", channel: "Chandoo.org Hindi", url: "https://www.youtube.com/watch?v=pCJ15nGFgVg", duration: "5 hrs" },
        ]
      },
      ai: {
        q: "AI tools mein interest — bahut acha field hai! AI tools use karna chahte hain (ChatGPT, Midjourney, AI for work), ya actually AI programming seekhna chahte hain? Aur current background kya hai coding mein?",
        q_en: "AI tools interest — great field! Do you want to use AI tools for work (ChatGPT, Midjourney, AI for business), or actually learn AI/ML programming? What's your current coding background?",
        path: "AI Tools & Prompt Engineering",
        skills: ["ChatGPT Mastery", "Prompt Engineering", "AI for Business", "Midjourney", "Automation with AI"],
        youtube: [
          { title: "ChatGPT Complete Guide Hindi 2024", channel: "Technical Guruji", url: "https://www.youtube.com/watch?v=l5mG4z343qg", duration: "2 hrs" },
          { title: "AI Tools for Freelancing Income Hindi", channel: "WsCube Tech", url: "https://www.youtube.com/watch?v=2jHFoQ3QXCQ", duration: "3 hrs" },
          { title: "Midjourney AI Art Complete Hindi", channel: "AI Wale Bhaiya", url: "https://www.youtube.com/watch?v=7BH6t_ah9xg", duration: "2 hrs" },
          { title: "Python for AI/ML Beginners Hindi", channel: "CodeWithHarry", url: "https://www.youtube.com/watch?v=gfDE2a7MKjA", duration: "8 hrs" },
        ]
      }
    }
  },
  design: {
    followUp: "Design mein kya zyada interest hai? Graphic design (posters, logos), UI/UX design (Figma - apps/websites), Fashion design/tailoring, ya Interior design?",
    followUp_en: "What specifically in design? Graphic design (posters, logos), UI/UX design (Figma - apps/websites), Fashion design/tailoring, or Interior design?",
    subBranches: {
      graphic: {
        q: "Graphic design! Specific batao — social media posts banana chahte hain, business ke liye logos, wedding/event cards, product packaging, ya YouTube thumbnails? Aur tools mein Canva comfortable hai ya Photoshop/Illustrator sikhna hai?",
        q_en: "Graphic design! Be specific — social media posts, business logos, wedding/event cards, product packaging, or YouTube thumbnails? Are you comfortable with Canva or want to learn Photoshop/Illustrator?",
        path: "Graphic Design & Visual Communication",
        skills: ["Canva Pro", "Adobe Photoshop", "Adobe Illustrator", "Brand Identity", "Typography"],
        youtube: [
          { title: "Canva Pro Full Course Hindi 2024", channel: "Technical Guruji", url: "https://www.youtube.com/watch?v=PBMtMbJ9OKg", duration: "3 hrs" },
          { title: "Photoshop Beginners to Advanced Hindi", channel: "Graphic Design Tutorials", url: "https://www.youtube.com/watch?v=IyR_uYsnevE", duration: "8 hrs" },
          { title: "Adobe Illustrator Full Course Hindi", channel: "Graphic Designing", url: "https://www.youtube.com/watch?v=Ib8UBwu3yGA", duration: "6 hrs" },
          { title: "Freelance Graphic Design Se Paise Hindi", channel: "Ishan Sharma", url: "https://www.youtube.com/watch?v=QRp5BHwLKLk", duration: "1 hr" },
        ]
      },
      uiux: {
        q: "UI/UX design — bahut promising career! Figma kabhi use kiya? Aur app design mein interest hai ya website design? Coding bhi sikhna chahte hain saath mein, ya sirf design side pe focus?",
        q_en: "UI/UX design — very promising career! Ever used Figma? Interest in app design or website design? Do you want to learn coding alongside, or focus purely on design?",
        path: "UI/UX Design & Figma",
        skills: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
        youtube: [
          { title: "Figma Full Course Hindi for Beginners", channel: "Thapa Technical", url: "https://www.youtube.com/watch?v=l9ANNkCBVNU", duration: "5 hrs" },
          { title: "UI UX Design Career Kaise Start Karein", channel: "Designlab Hindi", url: "https://www.youtube.com/watch?v=5gEntbleYPo", duration: "2 hrs" },
          { title: "App UI Design in Figma Hindi Tutorial", channel: "WsCube Tech", url: "https://www.youtube.com/watch?v=eZJOqu5UYgQ", duration: "4 hrs" },
          { title: "UX Research & User Testing Hindi", channel: "Springboard India", url: "https://www.youtube.com/watch?v=tXd-B-d7Zok", duration: "3 hrs" },
        ]
      },
      fashion: {
        q: "Fashion design — mujhe batao zyada detail mein. Kapde design karna hai, ya stitching/tailoring sikhni hai, ya boutique open karna hai? Aur kya koi basic stitching pehle se aati hai? Aur target market kya hai — bridal, casual, kids?",
        q_en: "Fashion design — tell me more detail. Design clothes, learn stitching/tailoring, or open a boutique? Do you know basic stitching already? Target market — bridal, casual, kids?",
        path: "Fashion Design & Tailoring Business",
        skills: ["Pattern Making", "Stitching & Tailoring", "Fashion Illustration", "Boutique Management", "Fabric Knowledge"],
        youtube: [
          { title: "Tailoring Full Course Hindi Beginners", channel: "Tailoring With Usha", url: "https://www.youtube.com/watch?v=xQzBTzIJXrg", duration: "5 hrs" },
          { title: "Blouse Cutting & Stitching Hindi", channel: "Sewing Times", url: "https://www.youtube.com/watch?v=Xuz3h4YQJXY", duration: "3 hrs" },
          { title: "Fashion Design Business Kaise Kholein", channel: "Fashion Design Hub", url: "https://www.youtube.com/watch?v=dXx9XDKmjwQ", duration: "4 hrs" },
          { title: "Boutique Business Home Se Hindi", channel: "Startup Wallah", url: "https://www.youtube.com/watch?v=YVZeN4NJAFI", duration: "1 hr" },
        ]
      }
    }
  },
  marketing: {
    followUp: "Marketing — great choice! Kya zyada interesting lagta hai: Social media management (Instagram/FB handle karna), content creation (videos/reels banana), SEO/blogging, ya paid ads (Google/Meta ads)?",
    followUp_en: "Marketing — great choice! What's more interesting: Social media management (handling Instagram/FB), content creation (making videos/reels), SEO/blogging, or paid ads (Google/Meta)?",
    subBranches: {
      social: {
        q: "Social media management — achha! Kis platform pe focus sochte hain — Instagram, Facebook, LinkedIn, ya YouTube? Aur kya brands ke accounts manage karna chahte hain (freelance/agency), ya apna khud ka audience build karna hai?",
        q_en: "Social media management — nice! Which platform — Instagram, Facebook, LinkedIn, or YouTube? Do you want to manage brand accounts (freelance/agency) or build your own audience?",
        path: "Social Media Marketing & Management",
        skills: ["Instagram Growth Strategy", "Content Calendar", "Canva for Social", "Meta Business Suite", "Analytics & Insights"],
        youtube: [
          { title: "Social Media Marketing Full Course Hindi 2024", channel: "WsCube Tech", url: "https://www.youtube.com/watch?v=HCeD9NKAG3U", duration: "8 hrs" },
          { title: "Instagram Marketing Strategy Hindi", channel: "Ishan Sharma", url: "https://www.youtube.com/watch?v=5Ql5CIf6BDYY", duration: "2 hrs" },
          { title: "Freelance Social Media Manager Hindi", channel: "Digital Deepak", url: "https://www.youtube.com/watch?v=z9mqMFHDf0Y", duration: "2 hrs" },
          { title: "Meta Ads Beginners Hindi 2024", channel: "WsCube Tech", url: "https://www.youtube.com/watch?v=HCeD9NKAG3U", duration: "4 hrs" },
        ]
      },
      content: {
        q: "Content creation! Exciting field. Kya banana chahte hain mainly — YouTube videos, Instagram Reels, short form content? Aur kaun sa topic/niche sochte hain? (Cooking, education, comedy, tech, beauty, travel?) Aur kya aapke paas video editing experience hai?",
        q_en: "Content creation! Exciting. What mainly — YouTube videos, Instagram Reels, short-form content? What topic/niche? (Cooking, education, comedy, tech, beauty, travel?) Do you have video editing experience?",
        path: "Content Creation & YouTube",
        skills: ["Video Editing (CapCut/Premiere)", "Script Writing", "Thumbnail Design in Canva", "YouTube SEO", "Storytelling"],
        youtube: [
          { title: "YouTube Channel Kaise Start Karein Hindi 2024", channel: "Amit Tiwari", url: "https://www.youtube.com/watch?v=kQXFtCXHBNY", duration: "2 hrs" },
          { title: "CapCut Video Editing Full Tutorial Hindi", channel: "Technical Guruji", url: "https://www.youtube.com/watch?v=7qlKuPO3WKc", duration: "2 hrs" },
          { title: "Instagram Reels Strategy 2024 Hindi", channel: "Ishan Sharma", url: "https://www.youtube.com/watch?v=5Ql5CIf6BDYY", duration: "1 hr" },
          { title: "Content Strategy & Niche Selection Hindi", channel: "Neil Patel Hindi", url: "https://www.youtube.com/watch?v=Lm8yCbPuCDo", duration: "2 hrs" },
        ]
      }
    }
  },
  electronics: {
    followUp: "Electronics — interesting field! Kya zyada suits karta hai — Mobile/laptop repair, electrical wiring/fitting, Arduino/Raspberry Pi hobby projects, ya solar energy/renewable?",
    followUp_en: "Electronics — interesting field! What suits you more — Mobile/laptop repair, electrical wiring/fitting, Arduino/hobby projects, or solar/renewable energy?",
    subBranches: {
      repair: {
        q: "Mobile repair — good career choice especially rural areas mein! Sirf basic repair (screen, battery, charging port) ya chip level bhi sikhna hai? Aur kya koi experience hai — kabhi apna ya kisi ka phone khola?",
        q_en: "Mobile repair — great career especially in rural areas! Just basic repairs (screen, battery, charging port) or chip-level too? Any experience — ever opened your own or someone's phone?",
        path: "Mobile & Electronics Repair",
        skills: ["Mobile Hardware Diagnosis", "Screen & Battery Replacement", "Motherboard Repair", "Customer Service", "Business Setup"],
        youtube: [
          { title: "Mobile Repairing Full Course Hindi Free", channel: "Mobile Repairing Institute", url: "https://www.youtube.com/watch?v=iPBFMOcBDEg", duration: "8 hrs" },
          { title: "Screen Replacement Step by Step Hindi", channel: "Technical Dost", url: "https://www.youtube.com/watch?v=OcYSaEcMDqw", duration: "1 hr" },
          { title: "Mobile Repair Shop Kaise Kholein", channel: "Business Tak", url: "https://www.youtube.com/watch?v=YBHvCPiXoAo", duration: "1 hr" },
          { title: "Laptop Repairing Course Hindi Complete", channel: "Laptop Repair World", url: "https://www.youtube.com/watch?v=x9YfYpckJu0", duration: "5 hrs" },
        ]
      },
      arduino: {
        q: "Arduino/IoT — bahut acha! Kya projects banana chahte hain — home automation (smart lights, sensors), robotics, weather station, ya kuch specific idea hai? Aur programming background hai (C ya Python)?",
        q_en: "Arduino/IoT — excellent! What projects do you want to build — home automation (smart lights, sensors), robotics, weather station, or some specific idea? Do you have programming background (C or Python)?",
        path: "IoT & Embedded Systems",
        skills: ["Arduino Programming (C)", "Raspberry Pi", "IoT Sensors & Modules", "Python for Hardware", "Circuit Design"],
        youtube: [
          { title: "Arduino Full Course Hindi Beginners", channel: "Last Moment Tuitions", url: "https://www.youtube.com/watch?v=_qE7iCKMBpM", duration: "6 hrs" },
          { title: "Raspberry Pi Projects for Beginners Hindi", channel: "Electronics Projects Hub", url: "https://www.youtube.com/watch?v=aI3p3nJMKJY", duration: "4 hrs" },
          { title: "IoT Home Automation Hindi Tutorial", channel: "Robo Circuit", url: "https://www.youtube.com/watch?v=h0YmGGMzjDQ", duration: "3 hrs" },
          { title: "ESP32 Wi-Fi Projects Hindi", channel: "Circuit Digest Hindi", url: "https://www.youtube.com/watch?v=GnXaIlWfwGA", duration: "2 hrs" },
        ]
      }
    }
  },
  beauty: {
    followUp: "Beauty field — bahut demand hai India mein! Kya specifically karna chahte hain — Makeup artist banna, Hair styling, Mehndi design, Skincare/facial specialist, ya apna parlour open karna?",
    followUp_en: "Beauty field — huge demand in India! What specifically — become a makeup artist, hair styling, mehndi design, skincare/facial specialist, or open your own parlour?",
    subBranches: {
      makeup: {
        q: "Makeup artist — brilliant choice! Bridal makeup mein focus karna chahte hain, ya everyday/party makeup? Aur kya kabhi kisi pe makeup practice ki hai? Freelance karna chahte hain (ghar pe clients aana) ya kisi salon mein join karna?",
        q_en: "Makeup artist — brilliant! Focus on bridal makeup or everyday/party looks? Have you practiced on anyone before? Do you want to freelance (clients come home) or join a salon?",
        path: "Makeup Artist & Beauty Professional",
        skills: ["Foundation & Skin Prep", "Eye Makeup Techniques", "Bridal Makeup", "Contouring", "Client Management"],
        youtube: [
          { title: "Makeup Artist Course Hindi Free Complete", channel: "Meribindiya", url: "https://www.youtube.com/watch?v=WoJMFzJn7jc", duration: "6 hrs" },
          { title: "Bridal Makeup Step by Step Hindi", channel: "Shraddha Makeup Artist", url: "https://www.youtube.com/watch?v=JcqmYgN5sUg", duration: "2 hrs" },
          { title: "Professional Makeup Artist Business Hindi", channel: "Business Tak", url: "https://www.youtube.com/watch?v=ylMr0CXHF4U", duration: "1 hr" },
          { title: "Makeup Tools Guide for Beginners Hindi", channel: "Nidhi Katiyar", url: "https://www.youtube.com/watch?v=T7NX5RCIGQE", duration: "1 hr" },
        ]
      },
      parlour: {
        q: "Parlour/salon — smart business idea! Kya skills already hain (threading, waxing, facial, hair cutting)? Aur ghar pe start karna chahte hain ya dedicated shop? Aur kya aap ladies ya gents ya family parlour sochte hain?",
        q_en: "Parlour/salon — smart business! What skills do you already have (threading, waxing, facial, hair cutting)? Start from home or take a shop? Ladies, gents, or family salon?",
        path: "Beauty Parlour & Salon Business",
        skills: ["Hair Cutting & Styling", "Facial & Skincare", "Threading & Waxing", "Nail Art", "Salon Management & Billing"],
        youtube: [
          { title: "Beauty Parlour Full Course Hindi Free", channel: "BeautyHub India", url: "https://www.youtube.com/watch?v=WoJMFzJn7jc", duration: "6 hrs" },
          { title: "Ghar Pe Parlour Kaise Kholein Hindi", channel: "Women Entrepreneur India", url: "https://www.youtube.com/watch?v=pWFz3s7EZyM", duration: "1 hr" },
          { title: "Hair Styling Techniques Beginners Hindi", channel: "Hair Academy India", url: "https://www.youtube.com/watch?v=8Uw1wKp6Rb8", duration: "3 hrs" },
          { title: "Facial Steps at Home Professionally Hindi", channel: "Skin Care Hindi", url: "https://www.youtube.com/watch?v=Ot-yGaX2O3g", duration: "2 hrs" },
        ]
      }
    }
  },
  teaching: {
    followUp: "Teaching — noble aur demanding field! Kya specifically — School students ko coaching (private tuition), online teaching (YouTube/Unacademy), ya skill training dena (computer, tailoring, etc.)?",
    followUp_en: "Teaching — noble and in-demand! What specifically — coaching school students (private tuition), online teaching (YouTube/Unacademy), or skill training (computer, tailoring, etc.)?",
    subBranches: {
      coaching: {
        q: "Coaching — good! Kaun sa subject aur kaun si class? (Math/Science/English, Class 1-5/6-10/11-12?) Aur kya ghar pe padhana chahte hain, coaching center join karna, ya online? Aur aapka khud ka is subject mein confidence level kya hai?",
        q_en: "Coaching — good! Which subject and which class level? (Math/Science/English, Class 1-5/6-10/11-12?) Home tuition, join coaching center, or online teaching? How confident are you in the subject?",
        path: "Teaching & Private Coaching",
        skills: ["Subject Expertise", "Lesson Planning", "Communication Skills", "Online Teaching (Zoom/Google Meet)", "Content Creation for Education"],
        youtube: [
          { title: "Online Tutor Kaise Bane Paise Kamaein", channel: "Digital Paathshala", url: "https://www.youtube.com/watch?v=lEe98NiCAwE", duration: "2 hrs" },
          { title: "Unacademy Pe Teaching Kaise Karein Hindi", channel: "Unacademy Official", url: "https://www.youtube.com/watch?v=i0ANAlHU58Y", duration: "1 hr" },
          { title: "Communication Skills for Teachers Hindi", channel: "Josh Talks", url: "https://www.youtube.com/watch?v=dJFWLVkVCfE", duration: "1 hr" },
          { title: "How to Make Teaching Videos Hindi", channel: "Amit Tiwari", url: "https://www.youtube.com/watch?v=kQXFtCXHBNY", duration: "1 hr" },
        ]
      }
    }
  },
  business: {
    followUp: "Business mindset — bahut acha! Kya idea mein sochte hain — Online selling (Meesho/Amazon/Instagram), Food business (tiffin/bakery/catering), koi service business, ya kuch aur unique idea hai?",
    followUp_en: "Business mindset — great! What idea are you thinking — Online selling (Meesho/Amazon/Instagram), Food business (tiffin/bakery/catering), service business, or some unique idea?",
    subBranches: {
      ecommerce: {
        q: "Online selling — exciting! Kya product bechna chahte hain exactly? Apne haath se banaya hua (handmade), kapde/fashion, electronics reselling, ya Meesho se reselling? Aur kya aapke paas smartphone hai product photos ke liye?",
        q_en: "Online selling — exciting! What product exactly? Handmade items, clothes/fashion, electronics reselling, or Meesho reselling? Do you have a smartphone for product photos?",
        path: "E-Commerce & Online Selling",
        skills: ["Meesho/Amazon Seller Setup", "Product Photography with Phone", "Digital Payments (UPI/Razorpay)", "Customer Communication", "Packaging & Shipping"],
        youtube: [
          { title: "Meesho Se Paise Kaise Kamaein 2024 Hindi", channel: "Meesho Official", url: "https://www.youtube.com/watch?v=4e2Y-MCu-eE", duration: "1 hr" },
          { title: "Amazon Seller Account Start Karna Hindi", channel: "eCommerce Wala", url: "https://www.youtube.com/watch?v=_1sHFQp_Dgw", duration: "2 hrs" },
          { title: "Instagram Shop Kaise Kholein Products Bechein", channel: "Digital Deepak", url: "https://www.youtube.com/watch?v=z9mqMFHDf0Y", duration: "1 hr" },
          { title: "Product Photography Phone Se Hindi", channel: "Photography Hindi", url: "https://www.youtube.com/watch?v=wm8QoGTnwPo", duration: "1 hr" },
        ]
      },
      food: {
        q: "Food business — great idea! Ghar se tiffin service, snacks bechna, bakery/sweets, ya event catering? Aur kya specialty dish hai aapki jo logo ko bahut pasand aati hai? Aur kya aap FSSAI registration ke baare mein jaante hain?",
        q_en: "Food business — great idea! Home tiffin service, selling snacks, bakery/sweets, or event catering? What's your specialty dish that people love? Do you know about FSSAI registration?",
        path: "Food Business & Catering",
        skills: ["Food Safety & FSSAI Compliance", "Packaging & Branding", "Zomato/Swiggy Onboarding", "Costing & Pricing", "Instagram Food Marketing"],
        youtube: [
          { title: "Tiffin Service Business Ghar Se Hindi", channel: "Business Tak", url: "https://www.youtube.com/watch?v=YVZeN4NJAFI", duration: "1 hr" },
          { title: "Zomato Swiggy Pe Restaurant Register Hindi", channel: "Restaurant Business Hindi", url: "https://www.youtube.com/watch?v=_mFj5vCO8oQ", duration: "1 hr" },
          { title: "FSSAI License Kaise Milti Hai Hindi", channel: "Legal Help India", url: "https://www.youtube.com/watch?v=O-AJ5mO7r4s", duration: "1 hr" },
          { title: "Bakery Business Ghar Se Kaise Kholein", channel: "Women Entrepreneur India", url: "https://www.youtube.com/watch?v=pWFz3s7EZyM", duration: "1 hr" },
        ]
      }
    }
  }
}

function detectInterest(text) {
  const t = text.toLowerCase()
  if (t.match(/comput|laptop|tech|software|cod|program|excel|data|typing|it field|information/)) return 'computer'
  if (t.match(/design|canva|figma|photoshop|illustrat|graphic|creative|art|draw|visual|poster|logo/)) return 'design'
  if (t.match(/market|social media|instagram|facebook|ads|content|youtube|influenc|digital market/)) return 'marketing'
  if (t.match(/electron|mobile repair|circuit|arduino|raspberry|hardware|wiring|repair|phone fix/)) return 'electronics'
  if (t.match(/beauty|makeup|salon|parlour|mehndi|hair|skincare|facial|cosmetic/)) return 'beauty'
  if (t.match(/teach|tutor|coaching|padha|school|education|student|class/)) return 'teaching'
  if (t.match(/business|sell|shop|product|meesho|amazon|food|tiffin|bakery|start|entrepreneur/)) return 'business'
  return null
}

function detectSubBranch(text, branch) {
  const t = text.toLowerCase()
  if (branch === 'computer') {
    if (t.match(/cod|program|html|python|javascript|web|app|develop|software dev/)) return 'programming'
    if (t.match(/design|canva|photoshop|graphic|figma|logo|poster|visual|creative/)) return 'design'
    if (t.match(/data|excel|tally|account|spread|analys|mis|report/)) return 'data'
    if (t.match(/ai|ml|machine|chatgpt|artificial|prompt|midjourney|automation/)) return 'ai'
    return 'data'
  }
  if (branch === 'design') {
    if (t.match(/graphic|canva|poster|logo|photoshop|illustrat|social|banner/)) return 'graphic'
    if (t.match(/ui|ux|figma|app|website|product design|user/)) return 'uiux'
    if (t.match(/fashion|clothes|tailor|stitch|boutique|kapde|sewing/)) return 'fashion'
    return 'graphic'
  }
  if (branch === 'marketing') {
    if (t.match(/social|instagram|facebook|manage|post|handle|account/)) return 'social'
    if (t.match(/content|video|reel|youtube|blog|podcast|create/)) return 'content'
    return 'social'
  }
  if (branch === 'electronics') {
    if (t.match(/repair|mobile|phone|laptop|fix|screen|battery/)) return 'repair'
    if (t.match(/arduino|raspberry|iot|robot|project|circuit|esp/)) return 'arduino'
    return 'repair'
  }
  if (branch === 'beauty') {
    if (t.match(/makeup|bridal|artist|cosmetic/)) return 'makeup'
    return 'parlour'
  }
  if (branch === 'teaching') return 'coaching'
  if (branch === 'business') {
    if (t.match(/sell|meesho|amazon|online|resell|product|shop/)) return 'ecommerce'
    if (t.match(/food|tiffin|bakery|cook|restaurant|catering|snack/)) return 'food'
    return 'ecommerce'
  }
  return null
}

const STAGES = ['intro', 'education', 'interest1', 'followup', 'deep', 'experience', 'time', 'goal', 'done']

export default function Assessment() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [stage, setStage] = useState('intro')
  const [ctx, setCtx] = useState({})
  const [branch, setBranch] = useState(null)
  const [sub, setSub] = useState(null)
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('spf_user') || '{}')

  useEffect(() => {
    setTimeout(() => {
      addAI(
        `नमस्ते! मैं Priya हूं — आपकी AI career counselor। 😊\n\nआज हम मिलकर आपके लिए एक perfect career path ढूंढेंगे। मैं ChatGPT की तरह आपसे detailed questions पूछूंगी — जितना detail देंगे, उतना better guidance मिलेगी!\n\nपहले बताइए — आपका नाम क्या है और आप कहाँ से हैं?`,
        `Hello! I'm Priya — your AI career counselor. 😊\n\nToday we'll find your perfect career path together. I'll ask you detailed questions like a real counselor — the more detail you share, the better I can help!\n\nFirst tell me — what's your name and where are you from?`
      )
    }, 600)
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const addAI = (hi, en, extra = {}) => setMessages(prev => [...prev, { type: 'ai', hi, en, ...extra }])

  const respond = async (userText) => {
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 800))
    const t = userText.toLowerCase()

    if (stage === 'intro') {
      const name = userText.split(/[,\s]/)[0]
      const loc = userText.includes(',') ? userText.split(',').slice(1).join(',').trim() : user.district || 'India'
      const newCtx = { ...ctx, name, location: loc }
      setCtx(newCtx)
      setStage('education')
      addAI(
        `बढ़िया ${name}! आपसे मिलकर खुशी हुई! 🙏\n\nAapne 12th mein kya padha? Arts, Science, Commerce, ya Vocational/ITI kuch kiya? Aur marks/percentage kaisi rahi?\n\n(Tension mat lo — marks se career decide nahi hota, bas aapko better samajhne ke liye pooch rahi hoon 😊)`,
        `Great to meet you, ${name}! 🙏\n\nWhat did you study in 12th? Arts, Science, Commerce, or Vocational/ITI? How were your marks?\n\n(Don't worry — marks don't define your career, I'm asking just to understand you better 😊)`
      )
    }
    else if (stage === 'education') {
      setCtx(c => ({ ...c, education: userText }))
      setStage('interest1')
      addAI(
        `Achha! 👍\n\nAb sabse important question — aapko genuinely kya cheez pasand hai ya interesting lagti hai? Dil se batao:\n\n🖥️ Computer / Technology\n🎨 Design / Creative (Canva, Figma, Art)\n📱 Marketing / Social Media\n⚡ Electronics / Mobile Repair\n💄 Beauty / Fashion / Makeup\n📚 Teaching / Coaching\n🛒 Business / Selling / Entrepreneurship\n🎵 Music / Photography / Video\n\nYa kuch aur? Jо bhi genuinely exciting lage! Koi galat jawab nahi hai. 🌟`,
        `Got it! 👍\n\nNow the most important question — what do you genuinely enjoy or find interesting? Tell me from your heart:\n\n🖥️ Computer / Technology\n🎨 Design / Creative (Canva, Figma, Art)\n📱 Marketing / Social Media\n⚡ Electronics / Mobile Repair\n💄 Beauty / Fashion / Makeup\n📚 Teaching / Coaching\n🛒 Business / Selling / Entrepreneurship\n🎵 Music / Photography / Video\n\nOr something else? Whatever genuinely excites you! No wrong answer. 🌟`
      )
    }
    else if (stage === 'interest1') {
      setCtx(c => ({ ...c, interest1: userText }))
      const detected = detectInterest(userText)
      setBranch(detected)

      if (detected && INTEREST_BRANCHES[detected]) {
        setStage('followup')
        const b = INTEREST_BRANCHES[detected]
        addAI(`Waah! ${b.followUp} 🎯`, b.followUp_en)
      } else {
        // Unknown — dig deeper
        addAI(
          `"${userText}" — interesting! Thoda aur detail mein bato. Is mein specifically kya karna chahte ho? Kya cheez attractive lagti hai isme? Koi specific goal ya example hai mind mein?`,
          `"${userText}" — interesting! Tell me a bit more in detail. What specifically do you want to do in this? What makes it attractive? Any specific goal or example in mind?`
        )
      }
    }
    else if (stage === 'followup') {
      setCtx(c => ({ ...c, interest2: userText }))
      const detected = detectSubBranch(userText, branch)
      setSub(detected)

      if (detected && INTEREST_BRANCHES[branch]?.subBranches[detected]) {
        setStage('deep')
        const sd = INTEREST_BRANCHES[branch].subBranches[detected]
        addAI(sd.q, sd.q_en)
      } else {
        setStage('experience')
        addAI(
          `Samajh gayi! Ab batao — is field mein koi experience hai? Kabhi khud try kiya, YouTube se seekha, ya bilkul beginner ho? Aur kya tools available hain (laptop, smartphone, koi equipment)?`,
          `Understood! Now tell me — do you have any experience in this field? Ever tried it yourself, learned from YouTube, or completely beginner? What tools do you have available (laptop, smartphone, equipment)?`
        )
      }
    }
    else if (stage === 'deep') {
      setCtx(c => ({ ...c, interest3: userText }))
      setStage('experience')
      addAI(
        `Perfect! Bahut clear picture aa gayi! 💡\n\nAb batao — is field mein koi experience hai already? Kabhi practice ki, YouTube se seekha, kisi ne sikhaya, ya school/college mein kuch related kiya? Aur kya tools hain aapke paas (laptop, smartphone, koi specific equipment)?`,
        `Perfect! Very clear picture now! 💡\n\nNow tell me — any existing experience in this field? Ever practiced, learned from YouTube, been taught by someone, or done something related in school/college? What tools do you have (laptop, smartphone, specific equipment)?`
      )
    }
    else if (stage === 'experience') {
      setCtx(c => ({ ...c, experience: userText }))
      setStage('time')
      addAI(
        `Bahut acha! Yeh sab sun ke confident feel ho raha hai! 💪\n\nAb practical cheezein:\n1️⃣ Ek din mein kitne ghante de sakte hain learning ke liye?\n2️⃣ Income kitni jaldi chahiye — 1-2 months mein start karna hai, ya 3-6 months invest kar sakte hain?\n3️⃣ Monthly mein minimum kitna earn karna chahte hain? (Realistic target batao)`,
        `Excellent! Feeling confident hearing this! 💪\n\nNow the practical questions:\n1️⃣ How many hours per day can you give for learning?\n2️⃣ How soon do you need income — start in 1-2 months, or can you invest 3-6 months?\n3️⃣ What's your minimum monthly earning target? (Give a realistic number)`
      )
    }
    else if (stage === 'time') {
      setCtx(c => ({ ...c, timeMoney: userText }))
      setStage('goal')
      addAI(
        `Samajh gayi! Almost done — last question! 🎯\n\nAapka ultimate sapna kya hai? Sirf job chahiye, ya eventually freelancing karna hai, ya apna business start karna hai? Aur 1 saal baad aap khud ko kahan dekhte hain?\n\nBado ki socho — dream answer chahiye! 🌟`,
        `Got it! Almost done — last question! 🎯\n\nWhat's your ultimate dream? Just want a stable job, or eventually want to freelance, or start your own business? Where do you see yourself in 1 year?\n\nThink big — I want your dream answer! 🌟`
      )
    }
    else if (stage === 'goal') {
      const newCtx = { ...ctx, goal: userText }
      setCtx(newCtx)
      setStage('done')

      const branchData = INTEREST_BRANCHES[branch] || {}
      const subData = branchData.subBranches?.[sub] || {}

      const profile = {
        name: newCtx.name || user.name || 'Student',
        location: newCtx.location || user.district || 'India',
        education: newCtx.education || '12th Standard',
        career_goal: newCtx.goal || subData.path || 'Professional',
        current_skills: newCtx.interest1 ? [newCtx.interest1] : [],
        recommended_path: subData.path || newCtx.interest1 || 'Digital Skills Professional',
        interest_branch: branch,
        interest_sub: sub,
        youtube_resources: subData.youtube || [],
        skill_targets: subData.skills || ['Digital Literacy', 'Communication'],
        time_available: newCtx.timeMoney?.match(/\d+/)?.[0] ? `${newCtx.timeMoney.match(/\d+/)[0]} hours/day` : '2 hours/day',
        skill_level: newCtx.experience?.match(/no|never|nahi|beginner|new|bilkul/i) ? 'beginner' : 'intermediate'
      }
      localStorage.setItem('skillProfile', JSON.stringify(profile))
      localStorage.setItem('userId', user.userId || crypto.randomUUID())

      addAI(
        `🎉 ${newCtx.name}! Aapki poori profile taiyar ho gayi!\n\nMaine detail mein samjha aapko:\n✅ Interest: ${subData.path || newCtx.interest1}\n✅ Level: ${profile.skill_level === 'beginner' ? 'Beginner — perfect starting point!' : 'Intermediate — great base!'}\n✅ Target: ${newCtx.goal}\n\nAb main bana rahi hoon:\n📚 Personalized 3-month roadmap\n▶️ Curated YouTube videos specifically for you\n🏛️ Free government courses & schemes\n💼 Matched local jobs\n\nRoadmap ready ho raha hai... ✨`,
        `🎉 ${newCtx.name}! Your complete profile is ready!\n\nHere's what I understood about you:\n✅ Interest: ${subData.path || newCtx.interest1}\n✅ Level: ${profile.skill_level === 'beginner' ? 'Beginner — perfect starting point!' : 'Intermediate — great foundation!'}\n✅ Goal: ${newCtx.goal}\n\nNow generating:\n📚 Personalized 3-month roadmap\n▶️ Curated YouTube videos just for you\n🏛️ Free government courses & schemes\n💼 Matched local jobs\n\nBuilding your roadmap... ✨`,
        { complete: true }
      )
      setComplete(true)
      setTimeout(() => navigate('/roadmap'), 4000)
    }
  }

  const send = async () => {
    if (!input.trim() || loading || complete) return
    const text = input.trim()
    setInput('')
    setMessages(prev => [...prev, { type: 'user', text }])
    setLoading(true)
    await respond(text)
    setLoading(false)
    inputRef.current?.focus()
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const stageIndex = STAGES.indexOf(stage)
  const progress = (stageIndex / (STAGES.length - 1)) * 100

  return (
    <div className="app-shell">
      <Sidebar active="assessment" />
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

        <div className="chat-header">
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#F0A500,#FF6B35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Priya — AI Career Counselor</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3FB950' }} />
              <span style={{ fontSize: 12, color: '#8B949E' }}>
                {branch ? `Exploring: ${INTEREST_BRANCHES[branch]?.subBranches[sub]?.path || branch}` : 'Online • Listening carefully...'}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right', minWidth: 150 }}>
            <div style={{ fontSize: 12, color: '#8B949E', marginBottom: 6 }}>
              {stage === 'done' ? '✅ Complete!' : `Step ${Math.max(1, stageIndex)} of ${STAGES.length - 1}`}
            </div>
            <div className="progress" style={{ width: 150 }}>
              <div className="progress-fill" style={{ width: `${Math.max(5, progress)}%` }} />
            </div>
          </div>
        </div>

        <div className="chat-messages" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ background: '#161B22', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '6px 16px', fontSize: 12, color: '#8B949E' }}>
              🔒 Adaptive AI — questions adapt to your answers
            </div>
          </div>

          {messages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.type}`}>
              <div className={`msg-avatar ${msg.type}`}>
                {msg.type === 'ai' ? '🤖' : (user.name?.[0]?.toUpperCase() || '👤')}
              </div>
              <div className={`msg-bubble ${msg.type}`}>
                {msg.type === 'ai' ? (
                  <>
                    <div className="msg-hi" style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{msg.hi}</div>
                    {msg.en && <div className="msg-en" style={{ whiteSpace: 'pre-line', marginTop: 8, lineHeight: 1.7 }}>{msg.en}</div>}
                    {msg.complete && (
                      <div className="success-complete" style={{ marginTop: 14 }}>
                        ✅ Taking you to your personalized roadmap...
                      </div>
                    )}
                  </>
                ) : (
                  <span style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>{msg.text}</span>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg-row">
              <div className="msg-avatar ai">🤖</div>
              <div className="msg-bubble ai">
                <div className="typing-dots"><div className="dot" /><div className="dot" /><div className="dot" /></div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {!complete && (
          <div className="chat-input-bar">
            <textarea ref={inputRef} className="chat-input" value={input}
              onChange={e => setInput(e.target.value)} onKeyPress={handleKey}
              placeholder="Type your answer in Hindi or English... (Enter to send)"
              disabled={loading} rows={1} />
            <button className="send-btn hover-scale" onClick={send} disabled={loading || !input.trim()}>
              {loading
                ? <div className="spinner" />
                : '↑'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}