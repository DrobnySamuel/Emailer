# Emailer App  

A simple email client demo built with **Spring Boot (Java)** and **React**.  
It highlights important delivered emails with the help of **AI (OpenAI API)** to automatically assign importance scores to new emails. Possible better highlighting may be pop-up with something like "don't miss these", or user's ability to set gis own importance for each contact, so AI can determine easier  

---

## Features
- **AI-powered importance scoring**:  
  - New emails start with `importance = -1`.  
  - Importance (0–10) is stored in DB.  
- Now shows only emails with `importance >= 7`

---

## Tech Stack  
- **Backend**: Java 17, Spring Boot, Spring Data JPA, H2 (in-memory DB).  
- **Frontend**: React (Create React App), Fetch API.  
- **AI**: OpenAI Chat Completions API.  

---

## Running the App  

### Backend  
```bash

./mvnw spring-boot:run
```
### Frontend
cd frontend
npm install
npm start
