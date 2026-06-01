# 🛡️ Guardian AI

<p align="center">
  <img src="assets/logo.png" alt="Guardian AI Logo" width="180" />
</p>

<p align="center">
  <b>Guardian AI</b> is an AI-powered healthcare web platform designed to assist patients, support doctors, and improve emergency response through intelligent, multimodal, and secure digital health services.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Guardian%20AI-HealthTech%20%26%20AI-0B5FFF?style=for-the-badge&logo=shield&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Prototype%20%2F%20Ideathon%20Ready-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Platform-Web%20App-1E90FF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2F%20Next.js-22C55E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-API%20Ready-purple?style=for-the-badge" />
</p>

---

## 📸 Project Preview

<p align="center">
  <img src="assets/guardian-dashboard.png" alt="Guardian AI Dashboard" />
</p>

<p align="center">
  <img src="assets/guardian-patient-interface.png" alt="Guardian AI Patient Interface" />
</p>

<p align="center">
  <img src="assets/guardian-doctor-interface.png" alt="Guardian AI Doctor Interface" />
</p>

---

## 🌟 Vision

> **To build a personal medical guardian that monitors, understands, and acts before it is too late.**

Guardian AI is designed as a life-centric healthcare ecosystem that combines:
- AI-based symptom understanding
- Multimodal health analysis
- Doctor-patient workflow support
- Emergency SOS intelligence
- Smart health tracking
- Digital prescription assistance
- Future pharmacy aggregation and delivery support

---

## 🧠 What is Guardian AI?

Guardian AI is an intelligent healthcare assistant that helps users manage their health more efficiently and safely. It provides:

- A **Patient Interface** for health queries, media-based symptom checks, appointment booking, prescriptions, and health monitoring
- A **Doctor Interface** for managing patients, prescriptions, appointments, and medical records
- A future-ready **Smart Pharmacy** module for medicine comparison and delivery
- A powerful **Guardian SOS System** for emergency detection and escalation

---

## 💡 Problem Statement

Healthcare is often:
- Slow during emergencies
- Fragmented across platforms
- Difficult for patients to understand
- Hard for doctors to manage at scale
- Lacking continuous monitoring and intelligent support

Guardian AI aims to solve this by combining AI, health data, and smart workflows into one secure platform.

---

## ✅ Core Features

### 👤 Patient Interface
- AI symptom assistant
- Image upload for skin/tongue analysis
- Voice note support
- Video consultation
- Digital prescription interpretation
- Personalized diet and lifestyle guidance
- Mental health support
- Health metrics dashboard
- Emergency SOS monitoring

### 🩺 Doctor Interface
- AI-assisted prescription generation
- Patient medical record storage
- Appointment scheduling
- Clean disease and medication history
- Clinical workflow support

### 🚨 Guardian SOS System
- Continuous monitoring through smart devices
- Emergency detection
- False-alarm verification
- Multi-layer escalation
- Smart notification to emergency contacts
- Ambulance call workflow

### 💊 Smart Pharmacy (Future Module)
- Compare medicine prices
- Link with pharmacy apps
- Apollo 24/7 integration
- Tata 1mg integration
- Prescription-based ordering
- Coming soon / under maintenance placeholder in current version

### ⚙️ Settings & Account Control
- Profile management
- Account settings
- Theme appearance: Light / Dark
- Logout system

---

## 🧩 Main Modules

| Module | Purpose |
|--------|---------|
| Health Assistant | AI health support through text, image, voice, and video |
| Health Metrics | Monitor and visualize vitals and wellness trends |
| Guardian SOS System | Emergency response and verification |
| Doctor Dashboard | Treatment workflow and patient record management |
| Smart Pharmacy | Future medicine price comparison and ordering |
| Settings Panel | User profile, account, appearance, and logout |

---

## 🔍 Health Assistant Functionalities

### 📷 Image Upload
Users can upload:
- Skin images
- Tongue images
- Medical report images

The AI can then analyze and respond with health guidance.

### 🎙️ Voice Note
Users can speak their symptoms or concerns, and the system can convert speech to text for AI processing.

### 🎥 Video Consult
Users can connect with doctors through scheduled or instant video consultation.

---

## 📊 Health Metrics Section

The Health Metrics dashboard helps users track:
- Heart rate
- Blood pressure
- Oxygen level
- Sleep quality
- Body temperature
- Activity level

Features:
- Trend graphs
- AI-generated health insights
- Manual input support
- Future wearable integration

---

## 🚨 Guardian SOS System

The Guardian SOS System is the flagship emergency feature of Guardian AI.

### It is designed to:
- Continuously collect health vitals from smart devices
- Detect abnormal conditions
- Verify whether the event is real or false
- Ask for user response
- Escalate to emergency contacts if needed
- Notify support workers or ambulance services if required

### Example emergency flow:
```text
Smart Device Data
   ↓
Risk Detection
   ↓
False Alarm Check
   ↓
User Message Prompt
   ↓
No Response
   ↓
Contact Emergency Person
   ↓
Wait for Confirmation
   ↓
Call Ambulance / Support
```
---
### 🧬 Future Smart Pharmacy Module

This module is planned for future releases.

## Expected behavior:
Compare medicine prices
Search availability
Accept symptoms and prescriptions
Show results from Apollo 24/7 and Tata 1mg
Display two comparison responses
Redirect to delivery or partner checkout
## Current UI state:
Shown in the sidebar as disabled
Black color tile
Red highlight border
Label: Under Maintenance
Tooltip: Coming Soon
---
### 👨‍⚕️ Doctor Interface Features

AI-generated prescription support
Appointment scheduling
Patient history tracking
Medical record storage
Clean and structured patient management
Secure access to doctor-specific tools

### ⚙️ Settings Menu

Accessible through the gear button on the right side of the header.

Menu Options:
>Profile
>Account Settings
>Appearance
>Light Mode
>Dark Mode
>Settings
>Log Out
---

### 🔐 Security & Privacy Principles

Guardian AI is designed with:

* Role-based access
* Secure authentication
* Consent-driven data handling
* Encrypted sensitive information
* Health-first privacy design
---

### 🏗️ Suggested Tech Stack

Frontend:

React|
Next.js|
Tailwind CSS|
Framer Motion|
Lucide React|

Backend:

Node.js / Express|
FastAPI|
REST APIs|
JWT Authentication|

Database:

PostgreSQL|
MongoDB|

AI / ML:

OCR for handwritten prescriptions|
Speech-to-text processing|
Multimodal AI models|
Recommendation engine|

Deployment:

Vercel|
Netlify|
Render|
Google Cloud Platform|
Docker|
---

### 🔁 System Workflow
General Flow
```
User Input
   ↓
Health Assistant / Image / Voice / Video
   ↓
AI Processing Layer
   ↓
Insight Generation
   ↓
Doctor / Patient Response
   ↓
Data Storage & History
Emergency Flow
Vitals / Device Signal
   ↓
Risk Detection
   ↓
False Alarm Check
   ↓
User Confirmation
   ↓
Emergency Contact Escalation
   ↓
Ambulance / Support Trigger
```
---
### 🛣️ Roadmap

## Phase 1 — MVP
* Authentication
* Patient dashboard
* Doctor dashboard
* Health assistant UI
* Health metrics UI
* Settings panel
* SOS placeholder
## Phase 2
* Image upload analysis
* Voice note processing
* Prescription OCR
* Appointment booking
* Video consultation
## Phase 3
* SOS system logic
* Wearable integration
* Smart alerts
* Emergency escalation
## Phase 4
* Smart Pharmacy integration
* Price comparison
* Medicine ordering
* Partner API support

---

🧑‍💻 Team Visionary Coders
<p align="center"> <b>Built by Team Visionary Coders</b> </p>

Team Members

Vaibhav Shaw — Team Leader|
Debasish Dey|
Sabujdip Sahoo|
Samprit Koley|

### 🙏 Acknowledgement

We sincerely acknowledge:

Doctors and healthcare professionals for inspiring this concept
Patients and caregivers who face healthcare delays
Open-source communities that power modern development
Mentors and ideathon organizers who encourage innovation
Every teammate who contributed ideas, effort, and execution
📌 Startup / Ideathon Value

Guardian AI is a strong startup and ideathon concept because it:

Solves a real healthcare problem
Combines AI with practical workflow support
Has strong social impact
Supports both patients and doctors
Includes emergency and preventive care
Can scale into a larger digital health ecosystem
Why it stands out
Not just a chatbot
Not just a telemedicine app
Not just a wearable tracker
It is a complete AI health guardian
---
### 🎨 Brand Identity
* Logo Concept
* Shield symbol for protection
* Healthcare cross for medical support
* Blue tone for trust and technology
* Red highlights for caution and emergencies
* Clean, modern typography
---
### ⚠️ Disclaimer

> Guardian AI is an assistive healthcare technology concept and should not replace licensed medical professionals. Final diagnosis and treatment decisions must always remain with qualified doctors.

📫 Contact

For demos, ideathons, startup discussions, or collaboration:

|Team Visionary Coders|

* Vaibhav Shaw
* Debasish Dey
* Sabujdip Sahoo
* Samprit Koley
  
⭐ Support the Project

If you like the concept of Guardian AI, give the repository a star ⭐ and support the journey toward a smarter healthcare future.

<p align="center"> <b>Guardian AI — Monitor. Understand. Protect. 💙</b> </p> ```
