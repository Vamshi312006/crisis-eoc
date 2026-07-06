# Emergency Operations Center (EOC)

A web-based Emergency Operations Center (EOC) prototype that centralizes incident reporting, resource monitoring, and strategic decision support during emergencies. The platform enables operators to manage incidents, visualize them on an interactive map, monitor resource availability, and receive AI-assisted recommendations for emergency response.

---

# Table of Contents

- Overview
- Problem Statement
- Solution
- Features
- System Architecture
- Technology Stack
- Project Structure
- Installation
- Usage
- Workflow
- Future Scope
- Team

---

# Overview

Emergency Operations Centers coordinate information, resources, and decision-making during disasters such as floods, fires, earthquakes, and power outages. This prototype demonstrates how a centralized dashboard can improve situational awareness and streamline emergency response.

The application provides a simple yet effective platform for reporting incidents, tracking their progress, monitoring emergency resources, and assisting operators with resource allocation recommendations.

---

# Problem Statement

During emergency situations:

- Information is often distributed across multiple agencies.
- Resource allocation is delayed.
- Decision makers lack a centralized operational view.
- Incident tracking becomes difficult.
- Coordination between responders becomes inefficient.

These challenges increase response time and reduce operational effectiveness.

---

# Solution

The Emergency Operations Center provides a centralized platform that enables emergency operators to:

- Report new incidents
- Monitor ongoing incidents
- Track incident lifecycle
- Visualize incidents geographically
- Monitor emergency resources
- Receive AI-assisted resource recommendations
- Maintain strategic situational awareness.

---

# Features

## Incident Management

- Report new incidents
- Assign priority levels
- Monitor incident status
- View live incident feed

---

## Incident Lifecycle

Each incident progresses through the following workflow:

New
↓
Assigned
↓
Contained
↓
Resolved

---

## Interactive Map

- OpenStreetMap integration
- Geographic visualization of incidents
- Incident markers

---

## Resource Monitoring

Displays available emergency resources:

- Ambulances
- Fire Units
- Police Units
- Emergency Shelters

---

## AI Resource Recommendation

Based on incident priority, the system suggests an initial allocation of emergency resources.

Example:

High Priority

- 3 Ambulances
- 2 Fire Units
- 5 Police Units

---

## Analytics Dashboard

Provides:

- Total incidents
- Active incidents
- Priority distribution
- Resource availability
- Strategic operational overview

---

# System Architecture

                  User
                    │
                    ▼
            Flask Web Application
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
 Incident      Resource Engine   Analytics
 Management
      │
      ▼
Emergency Operations Dashboard
      │
 ┌────┼─────────────┐
 ▼    ▼             ▼
Map  Incident Feed  AI Recommendation

---

# Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Python
- Flask

## Visualization

- Leaflet.js
- OpenStreetMap
- Chart.js

## Deployment

- Render

## Version Control

- Git
- GitHub

---

# Project Structure

crisis-eoc/

│── app.py

│── requirements.txt

│── README.md

├── static

│ ├── style.css

│ └── script.js

└── templates

└── index.html

---

# Installation

Clone the repository

\`\`\`bash
git clone https://github.com/Vamshi312006/crisis-eoc.git
\`\`\`

Enter the project directory

\`\`\`bash
cd crisis-eoc
\`\`\`

Create a virtual environment

\`\`\`bash
python -m venv venv
\`\`\`

Activate the virtual environment

Linux

\`\`\`bash
source venv/bin/activate
\`\`\`

Windows

\`\`\`bash
venv\Scripts\activate
\`\`\`

Install dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

Run the application

\`\`\`bash
python app.py
\`\`\`

Open

http://127.0.0.1:5000

---

# Usage

## Report an Incident

1. Enter incident title.
2. Enter location.
3. Select priority.
4. Click **Report Incident**.

---

## Manage Incident

Advance the incident through its lifecycle using the **Advance** button.

---

## AI Recommendation

Click **AI** to view recommended emergency resource allocation.

---

## Dashboard

Monitor:

- Incident statistics
- Resource availability
- Interactive map
- Priority analytics
- Strategic summary

---

# Workflow

Operator

↓

Create Incident

↓

Dashboard

↓

AI Recommendation

↓

Assign Resources

↓

Update Status

↓

Resolved

---

# Future Scope

- User Authentication
- Role-Based Access Control
- Multi-Agency Coordination
- GIS Integration
- Weather API Integration
- Database Support
- Real-Time Notifications
- Machine Learning Resource Optimization
- Predictive Analytics
- Mobile Application

---

# Team

Hackathon Team

- Krishna Vamshi
- Neerumalla HImavath Sai Ganesh
- Kommana Dheeraj
- Nekkanti Venkata Avinash Krishna

---

# License

Developed as a prototype for a hackathon demonstration.

---

# Acknowledgements

- Flask
- OpenStreetMap
- Leaflet.js
- Chart.js
- Render
- GitHub
EOF
