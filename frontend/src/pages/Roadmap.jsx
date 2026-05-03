import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from './Dashboard'

// ─── FULL CONTENT DATABASE ─────────────────────────────────────────────────
const DB = {
  'computer-programming': {
    title: 'Web Development & Programming', emoji: '💻', color: '#6C8EF5',
    skills: ['HTML/CSS','JavaScript','Python Basics','React','Git & GitHub','REST APIs'],
    youtube: [
      { title:'HTML & CSS Full Course Hindi — Zero to Hero', channel:'CodeWithHarry', url:'https://www.youtube.com/watch?v=BsDoLVMnmZs', duration:'11 hrs', level:'Beginner' },
      { title:'JavaScript Complete Course Hindi', channel:'Thapa Technical', url:'https://www.youtube.com/watch?v=cvvwkxbHnSg', duration:'10 hrs', level:'Beginner' },
      { title:'Python Tutorial for Beginners Hindi', channel:'CodeWithHarry', url:'https://www.youtube.com/watch?v=gfDE2a7MKjA', duration:'8 hrs', level:'Beginner' },
      { title:'React JS Full Course Hindi', channel:'Thapa Technical', url:'https://www.youtube.com/watch?v=RGKi6LSPDLU', duration:'6 hrs', level:'Intermediate' },
      { title:'Git & GitHub Tutorial Hindi', channel:'CodeWithHarry', url:'https://www.youtube.com/watch?v=gwWKnnCMQ5c', duration:'3 hrs', level:'Beginner' },
      { title:'Freelancing as Developer — Earn Online', channel:'Ishan Sharma', url:'https://www.youtube.com/watch?v=QRp5BHwLKLk', duration:'1 hr', level:'All' },
    ],
    courses: [
      { name:'SWAYAM — Web Technologies', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
      { name:'NIELIT — Programming Fundamentals', platform:'NIELIT', url:'https://www.nielit.gov.in', free:true },
    ],
    jobs: [
      { title:'Junior Web Developer', salary:'₹15,000–₹25,000', type:'Private', match:92 },
      { title:'Frontend Developer Intern', salary:'₹8,000–₹15,000', type:'Startup', match:89 },
      { title:'Python Developer (Entry)', salary:'₹18,000–₹30,000', type:'Private', match:85 },
      { title:'Freelance Web Developer', salary:'₹20,000–₹60,000', type:'Freelance', match:94 },
    ],
    weeks: [
      { w:'1–2', focus:'HTML basics — headings, links, images, forms', outcome:'Your first webpage live online' },
      { w:'3–4', focus:'CSS — flexbox, grid, colors, responsive design', outcome:'Styled portfolio website' },
      { w:'5–6', focus:'JavaScript — variables, DOM, event listeners', outcome:'Interactive webpage with logic' },
      { w:'7–8', focus:'Python basics — data types, loops, functions', outcome:'5 working Python scripts' },
      { w:'9–10', focus:'React — components, props, state, hooks', outcome:'React mini-project' },
      { w:'11–12', focus:'GitHub + deploy on Vercel + Fiverr profile', outcome:'Live project + first freelance bid' },
    ],
  },
  'computer-design': {
    title:'Graphic Design (Computer Tools)', emoji:'🎨', color:'#FF6B9D',
    skills:['Canva Pro','Adobe Photoshop','Illustrator Basics','Logo Design','Typography','Brand Identity'],
    youtube:[
      { title:'Canva Pro Complete Tutorial Hindi 2024', channel:'Technical Guruji', url:'https://www.youtube.com/watch?v=PBMtMbJ9OKg', duration:'3 hrs', level:'Beginner' },
      { title:'Photoshop Beginner to Advanced Hindi', channel:'Graphic Design Tutorials', url:'https://www.youtube.com/watch?v=IyR_uYsnevE', duration:'8 hrs', level:'Beginner' },
      { title:'Adobe Illustrator Full Course Hindi', channel:'Graphic Designing', url:'https://www.youtube.com/watch?v=Ib8UBwu3yGA', duration:'6 hrs', level:'Intermediate' },
      { title:'Logo Design Masterclass Hindi', channel:'WsCube Tech', url:'https://www.youtube.com/watch?v=k4l2E7RJKVI', duration:'3 hrs', level:'Beginner' },
      { title:'Earn from Design Freelancing Hindi', channel:'Ishan Sharma', url:'https://www.youtube.com/watch?v=QRp5BHwLKLk', duration:'1 hr', level:'All' },
      { title:'Fiverr Design Gigs Setup Hindi', channel:'Digital Deepak', url:'https://www.youtube.com/watch?v=z9mqMFHDf0Y', duration:'1 hr', level:'All' },
    ],
    courses:[{ name:'SWAYAM — Creative Arts & Design', platform:'SWAYAM', url:'https://swayam.gov.in', free:true }],
    jobs:[
      { title:'Graphic Designer', salary:'₹12,000–₹22,000', type:'Private', match:95 },
      { title:'Social Media Designer', salary:'₹10,000–₹18,000', type:'Private', match:91 },
      { title:'Freelance Designer (Fiverr)', salary:'₹20,000–₹60,000', type:'Freelance', match:97 },
      { title:'Brand Designer (Agency)', salary:'₹18,000–₹35,000', type:'Private', match:88 },
    ],
    weeks:[
      { w:'1–2', focus:'Canva basics — templates, elements, brand kit setup', outcome:'First social media post set (10 posts)' },
      { w:'3–4', focus:'Color theory, logo design principles in Canva', outcome:'5 logo designs for portfolio' },
      { w:'5–6', focus:'Photoshop — layers, masking, photo retouching', outcome:'Professional photo editing portfolio' },
      { w:'7–8', focus:'Brand identity — logo + color palette + fonts + mockups', outcome:'Complete brand kit project' },
      { w:'9–10', focus:'Illustrator vectors, icons, custom illustrations', outcome:'Vector design portfolio (10 pieces)' },
      { w:'11–12', focus:'Behance + Fiverr portfolio + first client outreach', outcome:'First paid design order received' },
    ],
  },
  'computer-data': {
    title:'Data Analysis & MS Excel', emoji:'📊', color:'#00D9A3',
    skills:['MS Excel Advanced','Pivot Tables','VLOOKUP/XLOOKUP','Tally ERP 9','Power BI Basics','MIS Reports'],
    youtube:[
      { title:'MS Excel Full Course Hindi Zero to Hero', channel:'LearnVern', url:'https://www.youtube.com/watch?v=_3BOEJM_9Xo', duration:'6 hrs', level:'Beginner' },
      { title:'Excel Advanced — Pivot Tables & VLOOKUP', channel:'MyEdu Self', url:'https://www.youtube.com/watch?v=K74_FNs6T2s', duration:'4 hrs', level:'Intermediate' },
      { title:'Tally ERP 9 Complete Course Hindi', channel:'Gyaan la', url:'https://www.youtube.com/watch?v=2XPBU5upPP4', duration:'10 hrs', level:'Beginner' },
      { title:'Power BI Full Tutorial Hindi', channel:'Data Analytics Hindi', url:'https://www.youtube.com/watch?v=pCJ15nGFgVg', duration:'5 hrs', level:'Intermediate' },
      { title:'MIS Report in Excel Hindi', channel:'Excel Hindi', url:'https://www.youtube.com/watch?v=K74_FNs6T2s', duration:'2 hrs', level:'Intermediate' },
      { title:'Data Entry Job Interview Prep', channel:'Career Guidance', url:'https://www.youtube.com/watch?v=RdTdo5UrbKQ', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'NIELIT — MS Office & Data Entry', platform:'NIELIT', url:'https://www.nielit.gov.in', free:true },
      { name:'SWAYAM — Business Analytics', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
    ],
    jobs:[
      { title:'Data Entry Operator', salary:'₹8,000–₹14,000', type:'Govt+Private', match:96 },
      { title:'MIS Executive', salary:'₹12,000–₹20,000', type:'Private', match:90 },
      { title:'Tally Accountant', salary:'₹10,000–₹18,000', type:'Private', match:88 },
      { title:'Back Office Executive', salary:'₹10,000–₹16,000', type:'Private', match:85 },
    ],
    weeks:[
      { w:'1–2', focus:'Excel basics — SUM, AVERAGE, IF, VLOOKUP', outcome:'First working data spreadsheet' },
      { w:'3–4', focus:'Pivot tables, charts, data visualization', outcome:'Business dashboard built' },
      { w:'5–6', focus:'Tally — ledgers, vouchers, GST entry', outcome:'Tally practice company complete' },
      { w:'7–8', focus:'Advanced Excel — XLOOKUP, Power Query, conditional formatting', outcome:'MIS report template ready' },
      { w:'9–10', focus:'Power BI — connect data, build visual reports', outcome:'Interactive BI dashboard' },
      { w:'11–12', focus:'Portfolio projects + job applications', outcome:'5 portfolio projects + 10 applications sent' },
    ],
  },
  'computer-ai': {
    title:'AI Tools & Prompt Engineering', emoji:'🤖', color:'#A855F7',
    skills:['ChatGPT Mastery','Prompt Engineering','Midjourney/DALL-E','AI Automation','Make.com','AI Content Creation'],
    youtube:[
      { title:'ChatGPT Complete Guide Hindi 2024', channel:'Technical Guruji', url:'https://www.youtube.com/watch?v=l5mG4z343qg', duration:'2 hrs', level:'Beginner' },
      { title:'Prompt Engineering Masterclass Hindi', channel:'AI Wale Bhaiya', url:'https://www.youtube.com/watch?v=7BH6t_ah9xg', duration:'3 hrs', level:'Intermediate' },
      { title:'Midjourney AI Art Complete Guide Hindi', channel:'AI Wale Bhaiya', url:'https://www.youtube.com/watch?v=7BH6t_ah9xg', duration:'2 hrs', level:'Beginner' },
      { title:'Make Money with AI Tools Hindi 2024', channel:'WsCube Tech', url:'https://www.youtube.com/watch?v=2jHFoQ3QXCQ', duration:'3 hrs', level:'All' },
      { title:'AI Automation with Make.com Hindi', channel:'Automation Hindi', url:'https://www.youtube.com/watch?v=l5mG4z343qg', duration:'2 hrs', level:'Intermediate' },
      { title:'Freelancing with AI Tools Hindi', channel:'Digital Deepak', url:'https://www.youtube.com/watch?v=z9mqMFHDf0Y', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'SWAYAM — AI & Machine Learning', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
      { name:'NIELIT — IT & AI Basics', platform:'NIELIT', url:'https://www.nielit.gov.in', free:true },
    ],
    jobs:[
      { title:'AI Content Creator', salary:'₹15,000–₹35,000', type:'Freelance', match:94 },
      { title:'Digital Marketing (AI Focus)', salary:'₹15,000–₹25,000', type:'Private', match:88 },
      { title:'AI Tools Trainer', salary:'₹20,000–₹40,000', type:'Private', match:85 },
      { title:'Prompt Engineer (Remote)', salary:'₹25,000–₹60,000', type:'Remote', match:82 },
    ],
    weeks:[
      { w:'1–2', focus:'ChatGPT basics — prompting, use cases, business applications', outcome:'Personal AI workflow system built' },
      { w:'3–4', focus:'Advanced prompting — chain-of-thought, role, few-shot', outcome:'Prompt library for 5 business use-cases' },
      { w:'5–6', focus:'Midjourney — image generation, styles, commercial use', outcome:'AI art portfolio (20+ images)' },
      { w:'7–8', focus:'AI for business — content, emails, marketing copy, SEO', outcome:'AI content agency setup' },
      { w:'9–10', focus:'Make.com automation — connect apps, build workflows', outcome:'One fully automated business process' },
      { w:'11–12', focus:'Fiverr AI gigs + portfolio site + first client', outcome:'Active AI freelance income' },
    ],
  },
  'design-graphic': {
    title:'Graphic Design & Visual Communication', emoji:'🖌️', color:'#FF6B9D',
    skills:['Canva Pro','Adobe Photoshop','Adobe Illustrator','Brand Identity','Typography','Social Media Design'],
    youtube:[
      { title:'Canva Pro Full Tutorial Hindi 2024', channel:'Technical Guruji', url:'https://www.youtube.com/watch?v=PBMtMbJ9OKg', duration:'3 hrs', level:'Beginner' },
      { title:'Photoshop Beginners to Pro Hindi', channel:'Graphic Design Tutorials', url:'https://www.youtube.com/watch?v=IyR_uYsnevE', duration:'8 hrs', level:'Beginner' },
      { title:'Adobe Illustrator Complete Hindi', channel:'Graphic Designing', url:'https://www.youtube.com/watch?v=Ib8UBwu3yGA', duration:'6 hrs', level:'Intermediate' },
      { title:'Logo Design Process Hindi', channel:'WsCube Tech', url:'https://www.youtube.com/watch?v=k4l2E7RJKVI', duration:'3 hrs', level:'Beginner' },
      { title:'Social Media Design Masterclass', channel:'Design With Canva', url:'https://www.youtube.com/watch?v=7sPBJXJhJFI', duration:'2 hrs', level:'Beginner' },
      { title:'Earn ₹50K from Design Freelancing', channel:'Ishan Sharma', url:'https://www.youtube.com/watch?v=QRp5BHwLKLk', duration:'1 hr', level:'All' },
    ],
    courses:[{ name:'SWAYAM — Creative Design', platform:'SWAYAM', url:'https://swayam.gov.in', free:true }],
    jobs:[
      { title:'Graphic Designer', salary:'₹12,000–₹22,000', type:'Private', match:95 },
      { title:'Social Media Designer', salary:'₹10,000–₹18,000', type:'Private', match:92 },
      { title:'Freelance Designer', salary:'₹20,000–₹60,000', type:'Freelance', match:97 },
      { title:'Brand Designer (Agency)', salary:'₹18,000–₹35,000', type:'Private', match:88 },
    ],
    weeks:[
      { w:'1–2', focus:'Canva — templates, elements, typography, brand kit', outcome:'First social media post set (10 posts)' },
      { w:'3–4', focus:'Color theory + logo design + visual hierarchy', outcome:'5 logo concepts for portfolio' },
      { w:'5–6', focus:'Photoshop — layers, selections, retouching', outcome:'Photo editing portfolio' },
      { w:'7–8', focus:'Brand identity — logo + palette + fonts + mockups', outcome:'Complete brand kit project' },
      { w:'9–10', focus:'Illustrator — vectors, icons, illustrations', outcome:'Vector portfolio (10 pieces)' },
      { w:'11–12', focus:'Behance + Fiverr profile + first client', outcome:'First paid design order' },
    ],
  },
  'design-uiux': {
    title:'UI/UX Design & Figma', emoji:'📱', color:'#6C8EF5',
    skills:['Figma','Wireframing','User Research','Prototyping','Design Systems','Usability Testing'],
    youtube:[
      { title:'Figma Full Course Hindi for Beginners', channel:'Thapa Technical', url:'https://www.youtube.com/watch?v=l9ANNkCBVNU', duration:'5 hrs', level:'Beginner' },
      { title:'UI/UX Career Kaise Start Karein Hindi', channel:'Designlab Hindi', url:'https://www.youtube.com/watch?v=5gEntbleYPo', duration:'2 hrs', level:'Beginner' },
      { title:'App UI Design in Figma Step by Step', channel:'WsCube Tech', url:'https://www.youtube.com/watch?v=eZJOqu5UYgQ', duration:'4 hrs', level:'Intermediate' },
      { title:'UX Research Methods Hindi', channel:'Springboard India', url:'https://www.youtube.com/watch?v=tXd-B-d7Zok', duration:'3 hrs', level:'Intermediate' },
      { title:'Design Systems in Figma Hindi', channel:'UI/UX Hindi', url:'https://www.youtube.com/watch?v=l9ANNkCBVNU', duration:'2 hrs', level:'Advanced' },
      { title:'Portfolio for UX Jobs Hindi', channel:'Career in Design', url:'https://www.youtube.com/watch?v=5gEntbleYPo', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'SWAYAM — Human Computer Interaction', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
      { name:'Google UX Design Certificate', platform:'Coursera', url:'https://www.coursera.org/professional-certificates/google-ux-design', free:false, note:'Apply for financial aid' },
    ],
    jobs:[
      { title:'Junior UI/UX Designer', salary:'₹18,000–₹35,000', type:'Private', match:93 },
      { title:'Product Designer Intern', salary:'₹12,000–₹20,000', type:'Startup', match:90 },
      { title:'UI Designer (App Agency)', salary:'₹20,000–₹40,000', type:'Private', match:88 },
      { title:'Freelance Figma Designer', salary:'₹25,000–₹80,000', type:'Freelance', match:95 },
    ],
    weeks:[
      { w:'1–2', focus:'Figma basics — frames, components, auto-layout, styles', outcome:'First app screen designed (3 screens)' },
      { w:'3–4', focus:'UX principles — user flows, wireframing, information architecture', outcome:'Wireframe for app concept' },
      { w:'5–6', focus:'Visual design — spacing, typography, color systems', outcome:'High-fidelity app UI (10 screens)' },
      { w:'7–8', focus:'Prototyping — interactions, transitions, clickable prototype', outcome:'Clickable prototype ready to test' },
      { w:'9–10', focus:'Design systems — components library, tokens, documentation', outcome:'Personal reusable design system' },
      { w:'11–12', focus:'3 case studies + portfolio website + LinkedIn + job apply', outcome:'Active job applications + interviews' },
    ],
  },
  'design-fashion': {
    title:'Fashion Design & Tailoring Business', emoji:'👗', color:'#F0A500',
    skills:['Pattern Making','Stitching & Tailoring','Fashion Illustration','Embroidery','Boutique Management','Instagram Marketing'],
    youtube:[
      { title:'Tailoring Full Course Hindi — Beginners', channel:'Tailoring With Usha', url:'https://www.youtube.com/watch?v=xQzBTzIJXrg', duration:'5 hrs', level:'Beginner' },
      { title:'Blouse Cutting & Stitching Hindi', channel:'Sewing Times', url:'https://www.youtube.com/watch?v=Xuz3h4YQJXY', duration:'3 hrs', level:'Beginner' },
      { title:'Fashion Design Business from Home', channel:'Fashion Design Hub', url:'https://www.youtube.com/watch?v=dXx9XDKmjwQ', duration:'4 hrs', level:'All' },
      { title:'Boutique Business Kaise Kholein', channel:'Startup Wallah', url:'https://www.youtube.com/watch?v=YVZeN4NJAFI', duration:'1 hr', level:'All' },
      { title:'Pattern Making Basics Hindi', channel:'Sewing Academy', url:'https://www.youtube.com/watch?v=xQzBTzIJXrg', duration:'3 hrs', level:'Beginner' },
      { title:'Instagram for Boutique Business Hindi', channel:'Digital Deepak', url:'https://www.youtube.com/watch?v=z9mqMFHDf0Y', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'PMKVY — Apparel & Textile (₹8K stipend)', platform:'PMKVY', url:'https://pmkvyofficial.org', free:true, note:'₹8,000 stipend' },
      { name:'NSDC — Fashion Design', platform:'NSDC', url:'https://www.nsdcindia.org', free:true },
    ],
    jobs:[
      { title:'Boutique Owner (Self)', salary:'₹15,000–₹50,000', type:'Business', match:97 },
      { title:'Fashion Designer (Boutique)', salary:'₹10,000–₹20,000', type:'Private', match:90 },
      { title:'Tailor / Stitching Expert', salary:'₹8,000–₹18,000', type:'Private', match:88 },
      { title:'Embroidery Specialist', salary:'₹8,000–₹16,000', type:'Freelance', match:85 },
    ],
    weeks:[
      { w:'1–2', focus:'Fabric types, measurements, tools, basic stitching', outcome:'First simple salwar stitched' },
      { w:'3–4', focus:'Blouse pattern making, cutting, full stitching', outcome:'3 blouse designs completed' },
      { w:'5–6', focus:'Salwar kameez full outfit stitching', outcome:'Complete outfit — portfolio piece' },
      { w:'7–8', focus:'Embroidery, lace work, decorations, finishing', outcome:'Decorated garment collection' },
      { w:'9–10', focus:'Bridal/party wear + pricing strategy + client handling', outcome:'Premium service menu ready' },
      { w:'11–12', focus:'Instagram/WhatsApp setup + first 5 paying clients', outcome:'Active boutique with income' },
    ],
  },
  'marketing-social': {
    title:'Social Media Marketing & Management', emoji:'📱', color:'#FF6B35',
    skills:['Instagram Growth Strategy','Content Calendar','Canva for Social','Meta Business Suite','Reels Editing','Analytics & Reporting'],
    youtube:[
      { title:'Social Media Marketing Full Course Hindi 2024', channel:'WsCube Tech', url:'https://www.youtube.com/watch?v=HCeD9NKAG3U', duration:'8 hrs', level:'Beginner' },
      { title:'Instagram Marketing Strategy 2024 Hindi', channel:'Ishan Sharma', url:'https://www.youtube.com/watch?v=5Ql5CIf6BDYY', duration:'2 hrs', level:'Beginner' },
      { title:'Meta Ads (Facebook/Instagram) Hindi', channel:'WsCube Tech', url:'https://www.youtube.com/watch?v=HCeD9NKAG3U', duration:'4 hrs', level:'Intermediate' },
      { title:'Content Calendar Hindi Guide', channel:'Digital Deepak', url:'https://www.youtube.com/watch?v=z9mqMFHDf0Y', duration:'1 hr', level:'Beginner' },
      { title:'Freelance Social Media Manager Hindi', channel:'Digital Deepak', url:'https://www.youtube.com/watch?v=z9mqMFHDf0Y', duration:'2 hrs', level:'All' },
      { title:'Instagram Reels Strategy for Growth', channel:'Ishan Sharma', url:'https://www.youtube.com/watch?v=5Ql5CIf6BDYY', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'Google Digital Marketing Certificate (Free)', platform:'Google', url:'https://learndigital.withgoogle.com', free:true },
      { name:'SWAYAM — Digital Marketing', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
    ],
    jobs:[
      { title:'Social Media Manager', salary:'₹12,000–₹25,000', type:'Private', match:94 },
      { title:'Digital Marketing Executive', salary:'₹15,000–₹28,000', type:'Private', match:90 },
      { title:'Content Creator (Brand)', salary:'₹12,000–₹22,000', type:'Private', match:87 },
      { title:'Freelance SMM (3 clients)', salary:'₹20,000–₹50,000', type:'Freelance', match:95 },
    ],
    weeks:[
      { w:'1–2', focus:'Platform mastery — Instagram algorithm, hashtags, content types', outcome:'First content strategy document' },
      { w:'3–4', focus:'Canva for social — carousels, stories, Reels covers', outcome:'30-day content calendar with designs' },
      { w:'5–6', focus:'Analytics — reach, engagement, insights, A/B testing', outcome:'First analytics report for a brand' },
      { w:'7–8', focus:'Meta Business Suite — scheduling, ads basics, pixel', outcome:'First ₹500 ad campaign run' },
      { w:'9–10', focus:'Client management — proposals, contracts, reporting', outcome:'Professional proposal template' },
      { w:'11–12', focus:'First 2 clients onboarded + retainer pricing set', outcome:'Active monthly retainer income' },
    ],
  },
  'marketing-content': {
    title:'Content Creation & YouTube', emoji:'🎬', color:'#FF0000',
    skills:['Video Editing (CapCut)','Script Writing','Thumbnail Design','YouTube SEO','Storytelling','Audience Growth'],
    youtube:[
      { title:'YouTube Channel Kaise Start Karein 2024', channel:'Amit Tiwari', url:'https://www.youtube.com/watch?v=kQXFtCXHBNY', duration:'2 hrs', level:'Beginner' },
      { title:'CapCut Video Editing Complete Hindi', channel:'Technical Guruji', url:'https://www.youtube.com/watch?v=7qlKuPO3WKc', duration:'2 hrs', level:'Beginner' },
      { title:'YouTube SEO 2024 — Rank Videos Hindi', channel:'Amit Tiwari', url:'https://www.youtube.com/watch?v=kQXFtCXHBNY', duration:'1 hr', level:'Intermediate' },
      { title:'Thumbnail Design in Canva Hindi', channel:'Technical Guruji', url:'https://www.youtube.com/watch?v=PBMtMbJ9OKg', duration:'1 hr', level:'Beginner' },
      { title:'Script Writing for YouTube Hindi', channel:'Content Creation', url:'https://www.youtube.com/watch?v=kQXFtCXHBNY', duration:'1 hr', level:'Intermediate' },
      { title:'Reels + Shorts Strategy 2024', channel:'Ishan Sharma', url:'https://www.youtube.com/watch?v=5Ql5CIf6BDYY', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'Google Digital Garage — Content Marketing', platform:'Google', url:'https://learndigital.withgoogle.com', free:true },
      { name:'SWAYAM — Mass Communication', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
    ],
    jobs:[
      { title:'Video Editor', salary:'₹12,000–₹25,000', type:'Private', match:90 },
      { title:'Content Creator (Brand)', salary:'₹15,000–₹30,000', type:'Private', match:88 },
      { title:'YouTuber (Self)', salary:'₹10,000–₹2,00,000', type:'Self', match:95 },
      { title:'Reels Editor (Freelance)', salary:'₹15,000–₹45,000', type:'Freelance', match:92 },
    ],
    weeks:[
      { w:'1–2', focus:'Niche selection, channel setup, first video script + shoot', outcome:'Channel live + first video uploaded' },
      { w:'3–4', focus:'CapCut editing — cuts, captions, transitions, B-roll', outcome:'4 videos with professional editing' },
      { w:'5–6', focus:'Thumbnail design + YouTube SEO + optimized descriptions', outcome:'CTR-optimized thumbnails set' },
      { w:'7–8', focus:'Content consistency — batch filming, scheduling 2/week', outcome:'Consistent posting habit built' },
      { w:'9–10', focus:'Community — comments, Shorts, Instagram cross-posting', outcome:'100 subscribers milestone' },
      { w:'11–12', focus:'Brand deal outreach + Shorts monetization + Patreon', outcome:'First brand collab or sponsorship' },
    ],
  },
  'electronics-repair': {
    title:'Mobile & Electronics Repair', emoji:'🔧', color:'#00D9A3',
    skills:['Phone Screen Replacement','Battery Repair','Water Damage Recovery','Motherboard Diagnosis','Laptop Repair','Customer Service'],
    youtube:[
      { title:'Mobile Repairing Full Course Hindi Free', channel:'Mobile Repairing Institute', url:'https://www.youtube.com/watch?v=iPBFMOcBDEg', duration:'8 hrs', level:'Beginner' },
      { title:'Screen Replacement All Phone Models Hindi', channel:'Technical Dost', url:'https://www.youtube.com/watch?v=OcYSaEcMDqw', duration:'1 hr', level:'Beginner' },
      { title:'Laptop Repairing Complete Course Hindi', channel:'Laptop Repair World', url:'https://www.youtube.com/watch?v=x9YfYpckJu0', duration:'5 hrs', level:'Intermediate' },
      { title:'Mobile Repair Shop Business Hindi', channel:'Business Tak', url:'https://www.youtube.com/watch?v=YBHvCPiXoAo', duration:'1 hr', level:'All' },
      { title:'Chip Level Repair Course Hindi', channel:'Chip Level Repair', url:'https://www.youtube.com/watch?v=iPBFMOcBDEg', duration:'4 hrs', level:'Advanced' },
      { title:'Water Damaged Phone Recovery Hindi', channel:'Mobile Repair', url:'https://www.youtube.com/watch?v=OcYSaEcMDqw', duration:'1 hr', level:'Intermediate' },
    ],
    courses:[
      { name:'PMKVY — Electronics & Hardware (₹8K stipend)', platform:'PMKVY', url:'https://pmkvyofficial.org', free:true, note:'₹8,000 stipend' },
      { name:'ITI — Electronics Mechanic', platform:'ITI', url:'https://www.msde.gov.in', free:true },
    ],
    jobs:[
      { title:'Mobile Repair Technician', salary:'₹8,000–₹18,000', type:'Private', match:92 },
      { title:'Own Repair Shop (Self)', salary:'₹15,000–₹50,000', type:'Business', match:96 },
      { title:'Laptop Repair Specialist', salary:'₹12,000–₹25,000', type:'Private', match:88 },
      { title:'Electronics Service Franchise', salary:'₹10,000–₹30,000', type:'Franchise', match:85 },
    ],
    weeks:[
      { w:'1–2', focus:'Phone anatomy — parts, tools, safe teardown & reassembly', outcome:'First successful phone teardown' },
      { w:'3–4', focus:'Screen replacement on 5 different phone models', outcome:'5 screen repairs completed' },
      { w:'5–6', focus:'Battery, charging port, speaker, camera module repairs', outcome:'Full repair service menu' },
      { w:'7–8', focus:'Software — flashing, factory reset, data recovery', outcome:'Software diagnosis skills' },
      { w:'9–10', focus:'Laptop — RAM upgrade, HDD→SSD, screen, keyboard', outcome:'Laptop repair capability' },
      { w:'11–12', focus:'Shop/home service setup + first 10 paid customers', outcome:'Active repair income' },
    ],
  },
  'electronics-arduino': {
    title:'IoT & Embedded Systems', emoji:'⚡', color:'#00D9A3',
    skills:['Arduino C Programming','Raspberry Pi','IoT Sensors','Python for Hardware','ESP32 Wi-Fi','Circuit Design'],
    youtube:[
      { title:'Arduino Full Course Hindi — Beginners', channel:'Last Moment Tuitions', url:'https://www.youtube.com/watch?v=_qE7iCKMBpM', duration:'6 hrs', level:'Beginner' },
      { title:'Raspberry Pi Projects Hindi', channel:'Electronics Projects Hub', url:'https://www.youtube.com/watch?v=aI3p3nJMKJY', duration:'4 hrs', level:'Intermediate' },
      { title:'IoT Home Automation Hindi Tutorial', channel:'Robo Circuit', url:'https://www.youtube.com/watch?v=h0YmGGMzjDQ', duration:'3 hrs', level:'Intermediate' },
      { title:'ESP32 Wi-Fi Projects Hindi', channel:'Circuit Digest Hindi', url:'https://www.youtube.com/watch?v=GnXaIlWfwGA', duration:'2 hrs', level:'Intermediate' },
      { title:'Python for Hardware Hindi', channel:'CodeWithHarry', url:'https://www.youtube.com/watch?v=gfDE2a7MKjA', duration:'8 hrs', level:'Beginner' },
      { title:'Electronics Freelancing — Earn Online', channel:'Ishan Sharma', url:'https://www.youtube.com/watch?v=QRp5BHwLKLk', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'SWAYAM — IoT & Embedded Systems', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
      { name:'NIELIT — Electronics & Hardware', platform:'NIELIT', url:'https://www.nielit.gov.in', free:true },
    ],
    jobs:[
      { title:'IoT Engineer (Entry)', salary:'₹15,000–₹30,000', type:'Private', match:88 },
      { title:'Embedded Systems Technician', salary:'₹12,000–₹25,000', type:'Private', match:85 },
      { title:'Arduino Trainer / Instructor', salary:'₹15,000–₹35,000', type:'Self', match:82 },
      { title:'Freelance Hardware Developer', salary:'₹20,000–₹60,000', type:'Freelance', match:90 },
    ],
    weeks:[
      { w:'1–2', focus:'Arduino IDE setup, digital I/O, LED blink, button', outcome:'First working Arduino circuit' },
      { w:'3–4', focus:'Sensors — DHT11, ultrasonic, LDR, servo motor control', outcome:'3 sensor projects built' },
      { w:'5–6', focus:'LCD display, serial monitor, EEPROM data storage', outcome:'Data logging project' },
      { w:'7–8', focus:'ESP32 Wi-Fi — connect to internet, HTTP requests, MQTT', outcome:'Wi-Fi controlled device' },
      { w:'9–10', focus:'Raspberry Pi — Linux, Python GPIO, camera module', outcome:'Raspberry Pi smart device' },
      { w:'11–12', focus:'Full IoT project + documentation + GitHub + showcase', outcome:'Capstone IoT project complete' },
    ],
  },
  'beauty-makeup': {
    title:'Makeup Artist & Beauty Professional', emoji:'💄', color:'#FF69B4',
    skills:['Foundation & Skin Prep','Eye Makeup Techniques','Bridal Makeup','Contouring','Airbrush Basics','Client Management'],
    youtube:[
      { title:'Makeup Artist Course Free Hindi', channel:'Meribindiya', url:'https://www.youtube.com/watch?v=WoJMFzJn7jc', duration:'6 hrs', level:'Beginner' },
      { title:'Bridal Makeup Complete Tutorial Hindi', channel:'Shraddha Makeup Artist', url:'https://www.youtube.com/watch?v=JcqmYgN5sUg', duration:'2 hrs', level:'Intermediate' },
      { title:'Eye Makeup Step by Step Hindi', channel:'Nidhi Katiyar', url:'https://www.youtube.com/watch?v=T7NX5RCIGQE', duration:'2 hrs', level:'Beginner' },
      { title:'Contouring & Highlighting Hindi', channel:'Makeup Tips Hindi', url:'https://www.youtube.com/watch?v=WoJMFzJn7jc', duration:'1 hr', level:'Intermediate' },
      { title:'Makeup Artist Business Setup Hindi', channel:'Business Tak', url:'https://www.youtube.com/watch?v=ylMr0CXHF4U', duration:'1 hr', level:'All' },
      { title:'Instagram Portfolio for Makeup Artists', channel:'Beauty Business', url:'https://www.youtube.com/watch?v=WoJMFzJn7jc', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'PMKVY — Beauty & Wellness (₹8K stipend)', platform:'PMKVY', url:'https://pmkvyofficial.org', free:true, note:'₹8,000 stipend' },
      { name:'NSDC — Beauty Therapist', platform:'NSDC', url:'https://www.nsdcindia.org', free:true },
    ],
    jobs:[
      { title:'Freelance Makeup Artist', salary:'₹15,000–₹60,000', type:'Freelance', match:96 },
      { title:'Salon Makeup Artist', salary:'₹10,000–₹20,000', type:'Private', match:90 },
      { title:'Bridal Makeup Specialist', salary:'₹25,000–₹80,000', type:'Self', match:94 },
      { title:'Beauty Trainer', salary:'₹15,000–₹30,000', type:'Private', match:85 },
    ],
    weeks:[
      { w:'1–2', focus:'Skin analysis, prep, base application, foundation matching', outcome:'Natural everyday look mastered' },
      { w:'3–4', focus:'Eyes — shadow, liner, mascara, false lashes, 5 looks', outcome:'Eye makeup portfolio (5 looks)' },
      { w:'5–6', focus:'Contouring, highlighting, blusher, full face sculpting', outcome:'Sculpted face look portfolio' },
      { w:'7–8', focus:'Bridal makeup — full look, photography, hair accessories', outcome:'3 bridal portfolio photos' },
      { w:'9–10', focus:'Client management — kit building, pricing, booking system', outcome:'Service menu + booking system ready' },
      { w:'11–12', focus:'Instagram portfolio + first 5 paid client bookings', outcome:'Active paying client list' },
    ],
  },
  'beauty-parlour': {
    title:'Beauty Parlour & Salon Business', emoji:'💅', color:'#FF69B4',
    skills:['Hair Cutting & Styling','Facial & Skincare','Threading & Waxing','Nail Art','Hair Coloring','Salon Management'],
    youtube:[
      { title:'Beauty Parlour Full Course Free Hindi', channel:'BeautyHub India', url:'https://www.youtube.com/watch?v=WoJMFzJn7jc', duration:'6 hrs', level:'Beginner' },
      { title:'Hair Cutting Techniques Beginners Hindi', channel:'Hair Academy India', url:'https://www.youtube.com/watch?v=8Uw1wKp6Rb8', duration:'3 hrs', level:'Beginner' },
      { title:'Facial Steps Professionally at Home Hindi', channel:'Skin Care Hindi', url:'https://www.youtube.com/watch?v=Ot-yGaX2O3g', duration:'2 hrs', level:'Beginner' },
      { title:'Ghar Pe Parlour Kaise Kholein Hindi', channel:'Women Entrepreneur', url:'https://www.youtube.com/watch?v=pWFz3s7EZyM', duration:'1 hr', level:'All' },
      { title:'Nail Art Designs Beginners Hindi', channel:'Nail Art India', url:'https://www.youtube.com/watch?v=8Uw1wKp6Rb8', duration:'2 hrs', level:'Beginner' },
      { title:'Salon Business Pricing & Income Hindi', channel:'Business Tak', url:'https://www.youtube.com/watch?v=YBHvCPiXoAo', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'PMKVY — Beauty & Wellness (₹8K stipend)', platform:'PMKVY', url:'https://pmkvyofficial.org', free:true, note:'₹8,000 stipend' },
      { name:'NSDC — Salon & Spa Management', platform:'NSDC', url:'https://www.nsdcindia.org', free:true },
    ],
    jobs:[
      { title:'Home Parlour Owner (Self)', salary:'₹12,000–₹40,000', type:'Business', match:97 },
      { title:'Salon Beautician', salary:'₹8,000–₹18,000', type:'Private', match:90 },
      { title:'Hair Stylist', salary:'₹10,000–₹25,000', type:'Private', match:88 },
      { title:'Mobile Beauty Service', salary:'₹15,000–₹35,000', type:'Freelance', match:92 },
    ],
    weeks:[
      { w:'1–2', focus:'Threading, eyebrow shaping, facial cleansing basics', outcome:'First 3 free practice clients done' },
      { w:'3–4', focus:'Waxing, body treatments, D-tan, skin analysis', outcome:'10 practice sessions completed' },
      { w:'5–6', focus:'Hair cutting — trim, layers, blow-dry styling', outcome:'Hair service menu finalized' },
      { w:'7–8', focus:'Nail art, manicure, pedicure, gel polish basics', outcome:'Nail service portfolio ready' },
      { w:'9–10', focus:'Salon setup — tools, price list, WhatsApp Business page', outcome:'Home salon ready to open' },
      { w:'11–12', focus:'First 10 paid clients + referral system + Instagram page', outcome:'Regular monthly income from salon' },
    ],
  },
  'teaching-coaching': {
    title:'Teaching & Private Coaching', emoji:'📚', color:'#6C8EF5',
    skills:['Subject Expertise','Lesson Planning','Online Teaching','Communication','Student Assessment','YouTube Education Content'],
    youtube:[
      { title:'Online Tutor Kaise Bane — Earn Hindi', channel:'Digital Paathshala', url:'https://www.youtube.com/watch?v=lEe98NiCAwE', duration:'2 hrs', level:'Beginner' },
      { title:'Unacademy Teacher Kaise Bane Hindi', channel:'Unacademy Official', url:'https://www.youtube.com/watch?v=i0ANAlHU58Y', duration:'1 hr', level:'Beginner' },
      { title:'Communication Skills for Teachers Hindi', channel:'Josh Talks', url:'https://www.youtube.com/watch?v=dJFWLVkVCfE', duration:'1 hr', level:'All' },
      { title:'Zoom & Google Meet for Teaching', channel:'Tech for Teachers', url:'https://www.youtube.com/watch?v=lEe98NiCAwE', duration:'1 hr', level:'Beginner' },
      { title:'YouTube Education Channel Banana', channel:'Amit Tiwari', url:'https://www.youtube.com/watch?v=kQXFtCXHBNY', duration:'1 hr', level:'All' },
      { title:'Spoken English for Hindi Speakers', channel:'Awal', url:'https://www.youtube.com/watch?v=7JCiVuSxCf4', duration:'5 hrs', level:'Beginner' },
    ],
    courses:[
      { name:'SWAYAM — Pedagogy & Teaching Methods', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
      { name:'DIKSHA — Teacher Training Portal', platform:'DIKSHA', url:'https://diksha.gov.in', free:true },
    ],
    jobs:[
      { title:'Private Tutor (Home)', salary:'₹10,000–₹25,000', type:'Self', match:94 },
      { title:'Online Tutor (Unacademy/Vedantu)', salary:'₹15,000–₹40,000', type:'Platform', match:90 },
      { title:'School Teacher (Private)', salary:'₹10,000–₹20,000', type:'Private', match:85 },
      { title:'Coaching Center Teacher', salary:'₹12,000–₹22,000', type:'Private', match:88 },
    ],
    weeks:[
      { w:'1–2', focus:'Lesson planning — structure, examples, practice problems', outcome:'4 detailed lesson plans ready' },
      { w:'3–4', focus:'Communication — clarity, voice modulation, engagement', outcome:'3 recorded practice lessons' },
      { w:'5–6', focus:'Online tools — Zoom, Google Classroom, quiz apps, whiteboard', outcome:'First online demo class conducted' },
      { w:'7–8', focus:'Marketing — WhatsApp groups, school outreach, word of mouth', outcome:'First 3 paid students enrolled' },
      { w:'9–10', focus:'Content creation — notes, worksheets, YouTube shorts', outcome:'First educational YouTube video' },
      { w:'11–12', focus:'Scale — batch classes, Unacademy reg, fee structure', outcome:'10+ students, stable income' },
    ],
  },
  'business-ecommerce': {
    title:'E-Commerce & Online Selling', emoji:'🛒', color:'#F0A500',
    skills:['Meesho/Amazon Seller Setup','Product Photography','Digital Payments','Customer Communication','Inventory Management','Returns Handling'],
    youtube:[
      { title:'Meesho Se Paise Kaise Kamaein 2024', channel:'Meesho Official', url:'https://www.youtube.com/watch?v=4e2Y-MCu-eE', duration:'1 hr', level:'Beginner' },
      { title:'Amazon Seller Account Start Hindi', channel:'eCommerce Wala', url:'https://www.youtube.com/watch?v=_1sHFQp_Dgw', duration:'2 hrs', level:'Beginner' },
      { title:'Product Photography Phone Se Hindi', channel:'Photography Hindi', url:'https://www.youtube.com/watch?v=wm8QoGTnwPo', duration:'1 hr', level:'Beginner' },
      { title:'Instagram Shop Se Sell Karna Hindi', channel:'Digital Deepak', url:'https://www.youtube.com/watch?v=z9mqMFHDf0Y', duration:'1 hr', level:'Beginner' },
      { title:'eCommerce Business Scaling Tips Hindi', channel:'Ishan Sharma', url:'https://www.youtube.com/watch?v=QRp5BHwLKLk', duration:'2 hrs', level:'Intermediate' },
      { title:'GST & Taxes for Online Business Hindi', channel:'CA Guru Ji', url:'https://www.youtube.com/watch?v=dxVAGCUXNWI', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'Amazon Seller University (Free)', platform:'Amazon', url:'https://sell.amazon.in/learn', free:true },
      { name:'SWAYAM — Entrepreneurship', platform:'SWAYAM', url:'https://swayam.gov.in', free:true },
    ],
    jobs:[
      { title:'Meesho Reseller (Self)', salary:'₹8,000–₹25,000', type:'Self', match:96 },
      { title:'Amazon/Flipkart Seller', salary:'₹15,000–₹60,000', type:'Self', match:93 },
      { title:'Instagram Shop Owner', salary:'₹10,000–₹40,000', type:'Self', match:91 },
      { title:'eCommerce Executive (Company)', salary:'₹12,000–₹20,000', type:'Private', match:85 },
    ],
    weeks:[
      { w:'1–2', focus:'Platform setup — Meesho/Amazon account, bank, KYC', outcome:'Seller account live & verified' },
      { w:'3–4', focus:'Product research — high demand, low competition, pricing', outcome:'First 10 products listed' },
      { w:'5–6', focus:'Product photography — lighting, background, phone editing', outcome:'Professional product image set' },
      { w:'7–8', focus:'Order handling — packing, labeling, shipping, returns', outcome:'First 5 orders fulfilled smoothly' },
      { w:'9–10', focus:'Reviews — customer service, follow-up, seller rating', outcome:'5-star seller rating achieved' },
      { w:'11–12', focus:'Scale — 3+ platforms, bulk buying, Instagram shop', outcome:'30+ orders/month target' },
    ],
  },
  'business-food': {
    title:'Food Business & Catering', emoji:'🍱', color:'#F0A500',
    skills:['Food Safety & Hygiene','FSSAI Compliance','Packaging & Branding','Zomato/Swiggy Onboarding','Costing & Pricing','Instagram Food Marketing'],
    youtube:[
      { title:'Tiffin Service Business Ghar Se Hindi', channel:'Business Tak', url:'https://www.youtube.com/watch?v=YVZeN4NJAFI', duration:'1 hr', level:'Beginner' },
      { title:'FSSAI License Kaise Milti Hai Hindi', channel:'Legal Help India', url:'https://www.youtube.com/watch?v=O-AJ5mO7r4s', duration:'1 hr', level:'Beginner' },
      { title:'Zomato Swiggy Pe Restaurant Register', channel:'Restaurant Business', url:'https://www.youtube.com/watch?v=_mFj5vCO8oQ', duration:'1 hr', level:'Beginner' },
      { title:'Food Photography Phone Se Hindi', channel:'Photography Hindi', url:'https://www.youtube.com/watch?v=wm8QoGTnwPo', duration:'1 hr', level:'Beginner' },
      { title:'Bakery Business Ghar Se Kholein', channel:'Women Entrepreneur', url:'https://www.youtube.com/watch?v=pWFz3s7EZyM', duration:'1 hr', level:'All' },
      { title:'Food Costing & Pricing Strategy Hindi', channel:'Restaurant Business', url:'https://www.youtube.com/watch?v=YVZeN4NJAFI', duration:'1 hr', level:'All' },
    ],
    courses:[
      { name:'FSSAI Food Safety Training (Free)', platform:'FSSAI', url:'https://foscos.fssai.gov.in', free:true },
      { name:'PMKVY — Food Processing (₹8K stipend)', platform:'PMKVY', url:'https://pmkvyofficial.org', free:true, note:'₹8,000 stipend' },
    ],
    jobs:[
      { title:'Tiffin Service Owner', salary:'₹12,000–₹35,000', type:'Business', match:96 },
      { title:'Home Baker', salary:'₹10,000–₹30,000', type:'Self', match:92 },
      { title:'Catering Business', salary:'₹20,000–₹80,000', type:'Business', match:90 },
      { title:'Cloud Kitchen Owner', salary:'₹15,000–₹50,000', type:'Business', match:88 },
    ],
    weeks:[
      { w:'1–2', focus:'Business plan — menu, pricing, target customers, FSSAI apply', outcome:'Business plan + FSSAI registration' },
      { w:'3–4', focus:'Kitchen setup — equipment, hygiene, packaging materials', outcome:'Production kitchen ready' },
      { w:'5–6', focus:'First 5 customers — WhatsApp marketing, free trial', outcome:'First paying customers' },
      { w:'7–8', focus:'Zomato/Swiggy onboarding + Instagram food photos', outcome:'Online presence live on 2 platforms' },
      { w:'9–10', focus:'Scale — subscription model, bulk orders, referrals', outcome:'20 regular customers' },
      { w:'11–12', focus:'Event catering + brand identity + Google reviews', outcome:'Event catering capability + reputation' },
    ],
  },
}

// fallback
const FALLBACK = DB['computer-data']

function getContent(profile) {
  const key = `${profile.interest_branch}-${profile.interest_sub}`
  return DB[key] || DB[profile.interest_branch + '-' + Object.keys(DB).find(k => k.startsWith(profile.interest_branch + '-'))?.split('-')[1]] || FALLBACK
}

function buildMonths(weeks, totalMonths) {
  const perMonth = Math.ceil(weeks.length / totalMonths)
  return Array.from({ length: totalMonths }, (_, i) => ({
    index: i,
    label: `Month ${i + 1}`,
    sublabel: i === 0 ? 'Foundation' : i === totalMonths - 1 ? 'Launch & Earn' : 'Build & Practice',
    emoji: ['🌱','🔥','🏆','⭐'][i] || '📈',
    weeks: weeks.slice(i * perMonth, (i + 1) * perMonth),
    skillsUnlocked: [],
  }))
}

export default function Roadmap() {
  const [tab, setTab] = useState('roadmap')
  const [monthIdx, setMonthIdx] = useState(0)
  const navigate = useNavigate()

  const profile = JSON.parse(localStorage.getItem('skillProfile') || '{}')
  const content = getContent(profile)

  // Determine plan duration from time_available
  const hoursRaw = profile.time_available || '2 hours/day'
  const hpd = parseInt(hoursRaw.match(/\d+/)?.[0] || 2)
  const hpw = hpd * 6
  const totalMonths = hpw >= 18 ? 1 : hpw >= 10 ? 2 : 3

  const months = buildMonths(content.weeks, totalMonths)
  const mColors = ['#F0A500','#00D9A3','#6C8EF5','#FF6B9D']
  const accent = content.color

  const tabList = [
    { id:'roadmap', label:`🗓️ ${totalMonths}-Month Plan` },
    { id:'youtube', label:'▶️ YouTube' },
    { id:'jobs', label:'💼 Jobs' },
    { id:'govt', label:'🏛️ Resources' },
  ]

  const TypeBadge = ({ type }) => {
    const map = { Govt:'badge-blue','Govt+Private':'badge-blue', Freelance:'badge-teal', Self:'badge-teal', Business:'badge-teal', Startup:'badge-gold', Remote:'badge-blue', Platform:'badge-gold', Franchise:'badge-gold' }
    const icon = { Govt:'🏛️','Govt+Private':'🏛️', Freelance:'💻', Self:'🌐', Business:'🏪', Startup:'🚀', Remote:'🌍', Platform:'📱', Franchise:'🤝', Private:'🏢' }
    return <span className={`badge ${map[type] || 'badge-gold'}`} style={{ fontSize:10 }}>{icon[type] || '🏢'} {type}</span>
  }

  return (
    <div className="app-shell">
      <Sidebar active="roadmap" />
      <div className="main-content">

        {/* ── HERO ── */}
        <div style={{ padding:'32px 36px 0' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                <div style={{ width:52, height:52, borderRadius:16, background:`${accent}15`, border:`1px solid ${accent}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>
                  {content.emoji}
                </div>
                <div>
                  <div style={{ fontSize:11, color:accent, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:2 }}>
                    Personalized for {profile.name || 'You'}
                  </div>
                  <h1 style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5, color:'#E6EDF3', lineHeight:1.2 }}>{content.title}</h1>
                </div>
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <span className="badge badge-gold">⏱ {totalMonths} Month{totalMonths > 1 ? 's' : ''}</span>
                <span className="badge badge-teal">📅 {hpd} hrs/day</span>
                <span className="badge badge-blue">{profile.skill_level === 'beginner' ? '🌱 Beginner' : '⚡ Intermediate'}</span>
                <span className="badge badge-green">💰 {content.jobs[0]?.salary}/mo target</span>
              </div>
            </div>
            <button onClick={() => navigate('/assessment')} className="btn btn-ghost btn-sm hover-scale">🔄 Retake</button>
          </div>

          {/* Visual timeline across months */}
          <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'18px 22px', marginBottom:20, overflowX:'auto' }}>
            <div style={{ fontSize:11, color:'#484F58', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:12 }}>Your Journey at a Glance</div>
            <div style={{ display:'flex', alignItems:'stretch', gap:0, minWidth:'max-content' }}>
              {months.map((m, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center' }}>
                  <div onClick={() => { setMonthIdx(i); setTab('roadmap') }}
                    style={{ cursor:'pointer', background: i === monthIdx ? `${mColors[i]}12` : 'transparent', border:`1px solid ${i === monthIdx ? mColors[i] : 'rgba(255,255,255,0.06)'}`, borderRadius:12, padding:'12px 18px', minWidth:180, transition:'all 0.2s' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                      <span style={{ fontSize:20 }}>{m.emoji}</span>
                      <div>
                        <div style={{ fontWeight:700, fontSize:13, color: i === monthIdx ? mColors[i] : '#E6EDF3' }}>{m.label}</div>
                        <div style={{ fontSize:11, color:'#8B949E' }}>{m.sublabel}</div>
                      </div>
                    </div>
                    <div style={{ fontSize:11, color:'#8B949E' }}>
                      {m.weeks.length} week{m.weeks.length !== 1 ? 's' : ''} • {m.weeks.length * hpd * 6} hrs total
                    </div>
                    <div style={{ marginTop:8, fontSize:11, color: mColors[i], fontWeight:600 }}>
                      🎯 {m.weeks[m.weeks.length - 1]?.outcome}
                    </div>
                  </div>
                  {i < months.length - 1 && (
                    <div style={{ width:32, height:2, background:`linear-gradient(90deg, ${mColors[i]}, ${mColors[i+1]})`, margin:'0 4px', borderRadius:2 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display:'flex', gap:2, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            {tabList.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ padding:'9px 18px', border:'none', background:'none', cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:13, color: tab === t.id ? accent : '#8B949E', borderBottom: tab === t.id ? `2px solid ${accent}` : '2px solid transparent', transition:'all 0.2s', marginBottom:-1 }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ padding:'24px 36px 40px' }}>

          {/* ROADMAP */}
          {tab === 'roadmap' && months[monthIdx] && (
            <div>
              {/* Month pills */}
              <div style={{ display:'flex', gap:8, marginBottom:20 }}>
                {months.map((m, i) => (
                  <button key={i} onClick={() => setMonthIdx(i)}
                    style={{ padding:'8px 18px', borderRadius:10, border:`1px solid ${monthIdx === i ? mColors[i] : 'rgba(255,255,255,0.06)'}`, background: monthIdx === i ? `${mColors[i]}15` : '#0D1117', color: monthIdx === i ? mColors[i] : '#8B949E', cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:13, transition:'all 0.2s' }}>
                    {m.emoji} {m.label}
                  </button>
                ))}
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:16 }}>
                {/* Weeks */}
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:'#8B949E', textTransform:'uppercase', letterSpacing:1, marginBottom:12 }}>
                    Week-by-Week Breakdown — {months[monthIdx].sublabel}
                  </div>
                  {months[monthIdx].weeks.map((w, i) => (
                    <div key={i} style={{ display:'flex', gap:14, marginBottom:10, padding:'16px', background:'#0D1117', border:'1px solid rgba(255,255,255,0.05)', borderRadius:14, cursor:'default', transition:'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${mColors[monthIdx]}35`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}>
                      <div style={{ width:38, height:38, borderRadius:10, background:`${mColors[monthIdx]}12`, border:`1px solid ${mColors[monthIdx]}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:mColors[monthIdx], flexShrink:0, fontFamily:'DM Mono,monospace' }}>
                        W{w.w.split('–')[0]}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, color:'#484F58', marginBottom:4, fontFamily:'DM Mono,monospace' }}>WEEK {w.w}</div>
                        <div style={{ fontSize:14, color:'#E6EDF3', fontWeight:500, marginBottom:6, lineHeight:1.5 }}>{w.focus}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:11, color:mColors[monthIdx] }}>✓</span>
                          <span style={{ fontSize:12, color:mColors[monthIdx], fontWeight:600 }}>You'll be able to: {w.outcome}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sidebar */}
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {/* Month goal */}
                  <div style={{ background:`${mColors[monthIdx]}08`, border:`1px solid ${mColors[monthIdx]}20`, borderRadius:14, padding:18 }}>
                    <div style={{ fontSize:11, color:mColors[monthIdx], fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>End Goal</div>
                    <div style={{ fontSize:15, fontWeight:700, color:'#E6EDF3', lineHeight:1.5 }}>
                      {months[monthIdx].weeks[months[monthIdx].weeks.length - 1]?.outcome}
                    </div>
                  </div>

                  {/* Skills unlocked */}
                  <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:18 }}>
                    <div style={{ fontSize:11, color:'#8B949E', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:12 }}>Skills You'll Gain</div>
                    {content.skills.slice(monthIdx * 2, monthIdx * 2 + 3).map((s, i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <div style={{ width:6, height:6, borderRadius:'50%', background:mColors[monthIdx], flexShrink:0 }} />
                        <span style={{ fontSize:13, color:'#E6EDF3' }}>{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Submit */}
                  <div style={{ background:'#0D1117', border:'1px dashed rgba(255,255,255,0.08)', borderRadius:14, padding:16, textAlign:'center' }}>
                    <div style={{ fontSize:24, marginBottom:6 }}>📤</div>
                    <div style={{ fontWeight:600, fontSize:13, marginBottom:4 }}>Submit Project</div>
                    <div style={{ fontSize:12, color:'#8B949E', marginBottom:12 }}>Get AI feedback + verified badge</div>
                    <button className="btn btn-primary btn-full btn-sm" onClick={() => navigate('/evaluate')}>Submit →</button>
                  </div>
                </div>
              </div>

              {/* All skills */}
              <div style={{ marginTop:20, background:'#0D1117', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:18 }}>
                <div style={{ fontSize:11, color:'#8B949E', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:12 }}>
                  Complete Skill Set After {totalMonths} Month{totalMonths > 1 ? 's' : ''}
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {content.skills.map((s, i) => (
                    <span key={i} style={{ background:`${accent}10`, border:`1px solid ${accent}25`, borderRadius:8, padding:'5px 12px', fontSize:12, fontWeight:600, color:accent }}>✓ {s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* YOUTUBE */}
          {tab === 'youtube' && (
            <div>
              <div style={{ marginBottom:20 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                  <span style={{ fontSize:24 }}>{content.emoji}</span>
                  <h2 style={{ fontSize:18, fontWeight:700 }}>Curated for: {content.title}</h2>
                </div>
                <p style={{ color:'#8B949E', fontSize:14 }}>Free Hindi YouTube courses — ordered beginner to advanced</p>
              </div>
              <div style={{ display:'grid', gap:10 }}>
                {content.youtube.map((v, i) => (
                  <a key={i} href={v.url} target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', gap:14, alignItems:'center', background:'#0D1117', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:'14px 18px', textDecoration:'none', transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,0,0,0.3)'; e.currentTarget.style.background='#0D1117' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)' }}>
                    <div style={{ width:48, height:48, borderRadius:12, background:'rgba(255,0,0,0.1)', border:'1px solid rgba(255,0,0,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>▶️</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:14, color:'#E6EDF3', marginBottom:6 }}>{v.title}</div>
                      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                        <span style={{ fontSize:11, color:'#FF4444', fontWeight:600 }}>📺 {v.channel}</span>
                        <span className="badge badge-gold" style={{ fontSize:10 }}>⏱ {v.duration}</span>
                        <span className={`badge ${v.level === 'Beginner' ? 'badge-green' : v.level === 'Intermediate' ? 'badge-blue' : v.level === 'Advanced' ? 'badge-red' : 'badge-teal'}`} style={{ fontSize:10 }}>{v.level}</span>
                        <span style={{ fontSize:11, color:'#484F58' }}>Hindi • Free</span>
                      </div>
                    </div>
                    <span style={{ color:'#FF4444', fontSize:18 }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* JOBS */}
          {tab === 'jobs' && (
            <div>
              <div style={{ marginBottom:20 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                  <span style={{ fontSize:24 }}>{content.emoji}</span>
                  <h2 style={{ fontSize:18, fontWeight:700 }}>Jobs for: {content.title}</h2>
                </div>
                <p style={{ color:'#8B949E', fontSize:14 }}>Matched to your specific path • {profile.location || 'Your region'}</p>
              </div>
              <div style={{ display:'grid', gap:10, marginBottom:20 }}>
                {content.jobs.map((job, i) => (
                  <div key={i} style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:'16px 18px', display:'flex', gap:14, alignItems:'center', transition:'all 0.2s', cursor:'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}40`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                    <div style={{ width:54, height:54, borderRadius:'50%', background: job.match >= 90 ? 'rgba(0,217,163,0.1)' : 'rgba(240,165,0,0.1)', border:`2px solid ${job.match >= 90 ? '#00D9A3' : '#F0A500'}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, color: job.match >= 90 ? '#00D9A3' : '#F0A500', flexShrink:0 }}>
                      <div>{job.match}%</div>
                      <div style={{ fontSize:8, opacity:0.7, fontWeight:400 }}>match</div>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:15, color:'#E6EDF3', marginBottom:6 }}>{job.title}</div>
                      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                        <span className="badge badge-green" style={{ fontSize:11 }}>💰 {job.salary}</span>
                        <TypeBadge type={job.type} />
                      </div>
                    </div>
                    <div style={{ color:accent, fontSize:18 }}>→</div>
                  </div>
                ))}
              </div>
              <div style={{ background:'rgba(240,165,0,0.05)', border:'1px solid rgba(240,165,0,0.15)', borderRadius:14, padding:18 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>🪪 3x More Job Responses with Skill Passport</div>
                <div style={{ color:'#8B949E', fontSize:13, marginBottom:12 }}>Employers trust verified digital credentials over plain resumes.</div>
                <div style={{ display:'flex', gap:10 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('/passport')}>View Passport →</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate('/evaluate')}>Submit Project</button>
                </div>
              </div>
            </div>
          )}

          {/* GOVT RESOURCES */}
          {tab === 'govt' && (
            <div>
              <h2 style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>🏛️ Free Government Resources</h2>
              <p style={{ color:'#8B949E', fontSize:14, marginBottom:20 }}>Courses & schemes specific to {content.title}</p>

              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#8B949E', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>Relevant Courses</div>
                <div style={{ display:'grid', gap:10 }}>
                  {content.courses.map((c, i) => (
                    <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'#0D1117', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:'16px 18px', textDecoration:'none', transition:'all 0.2s' }}>
                      <div>
                        <div style={{ fontWeight:600, fontSize:14, color:'#E6EDF3', marginBottom:4 }}>{c.name}</div>
                        <div style={{ display:'flex', gap:8 }}>
                          <span className="badge badge-gold" style={{ fontSize:10 }}>{c.platform}</span>
                          <span className={`badge ${c.free ? 'badge-green' : 'badge-blue'}`} style={{ fontSize:10 }}>{c.free ? '✅ Free' : '💳 Paid'}</span>
                          {c.note && <span className="badge badge-teal" style={{ fontSize:10 }}>💰 {c.note}</span>}
                        </div>
                      </div>
                      <span style={{ color:accent, fontSize:16 }}>→</span>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ fontSize:12, fontWeight:700, color:'#8B949E', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>National Schemes</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  { name:'PMKVY 4.0', desc:'Free training + ₹8,000 stipend', url:'https://pmkvyofficial.org', icon:'🎓' },
                  { name:'Startup India', desc:'Grants for new businesses', url:'https://www.startupindia.gov.in', icon:'🚀' },
                  { name:'National Career Service', desc:'Official govt job portal', url:'https://www.ncs.gov.in', icon:'💼' },
                  { name:'eShram Card', desc:'Worker benefits & insurance', url:'https://eshram.gov.in', icon:'🪪' },
                  { name:'PMEGP Loan', desc:'Business loan up to ₹25 lakh', url:'https://www.kviconline.gov.in', icon:'💰' },
                  { name:'DigiLocker', desc:'Store & share digital certificates', url:'https://www.digilocker.gov.in', icon:'📂' },
                ].map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'14px 16px', textDecoration:'none', display:'flex', gap:12, alignItems:'center', transition:'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}30`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                    <div style={{ fontSize:24 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:13, color:'#E6EDF3' }}>{s.name}</div>
                      <div style={{ fontSize:11, color:'#8B949E', marginTop:2 }}>{s.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div style={{ display:'flex', gap:12, marginTop:28 }}>
            <button className="btn btn-primary" onClick={() => navigate('/jobs')} style={{ flex:1, padding:14 }}>💼 All Jobs →</button>
            <button className="btn btn-ghost" onClick={() => navigate('/passport')} style={{ flex:1, padding:14 }}>🪪 Passport</button>
          </div>
        </div>
      </div>
    </div>
  )
}