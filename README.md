# 🧠 AI Resume Analyzer with RAG-Based Career Assistant

A production-ready AI system that analyzes resumes against job descriptions and enables context-aware resume chat using Retrieval-Augmented Generation (RAG).

Built end-to-end with TypeScript across frontend and backend.

---

## 🚀 Project Overview

This project demonstrates practical implementation of:

- Large Language Model (LLM) integration
- Prompt engineering for structured outputs
- Retrieval-Augmented Generation (RAG)
- Vector embeddings + similarity search
- Full-stack TypeScript architecture
- Modern AI-powered UI/UX

The system performs two major tasks:

1. 📄 Resume-to-Job Description Analysis (Structured AI Evaluation)
2. 💬 Context-Aware Resume Chat (RAG-based Assistant)

---

## 🧠 System Architecture

### 1️⃣ Resume Analysis Pipeline

```
Resume Upload → File Parsing → Prompt Engineering →
LLM (Groq - LLaMA 3.1) → Structured JSON Output → UI Dashboard
```

### Key Characteristics

- Custom prompt template enforcing JSON schema
- Structured parsing of AI responses
- Clean separation of concerns (controllers, services, routes)
- Optimized prompts for deterministic output

---

### 2️⃣ RAG-Based Resume Chat

```
Resume → Text Chunking → Embedding Generation →
MongoDB Storage → Cosine Similarity Retrieval →
Context Injection → LLM Response
```

### Retrieval Strategy

- Resume split into semantic chunks
- Embeddings generated for each chunk
- Stored in MongoDB
- On user query:
  - Query embedding generated
  - Cosine similarity scoring applied
  - Top-k chunks retrieved
  - Context injected into LLM
  - Grounded AI response generated

This ensures answers are based strictly on resume content.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Axios
- React Markdown
- Modern ChatGPT-style UI
- Typing animation + glassmorphism design

### Backend
- Node.js
- Express
- TypeScript
- Multer (file uploads)
- pdf-parse
- MongoDB + Mongoose
- Groq SDK (LLaMA 3.1)

### AI / NLP Concepts Applied
- Prompt Engineering
- JSON Output Enforcement
- Retrieval-Augmented Generation (RAG)
- Vector Embeddings
- Cosine Similarity Search
- Context Grounding

---

## 📦 Key Features

### Resume Analyzer
- Resume + Job Description matching
- Match score calculation
- Strengths extraction
- Weakness identification
- Improvement suggestions
- Missing skills detection
- Structured JSON response parsing

### Resume Chat Assistant
- Context-aware Q&A
- Resume-grounded responses
- Markdown rendering
- Real-time typing animation
- ChatGPT-style interface
- Input disabled during inference

---

## 🏗 Code Structure

```
resume-ai/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── api/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.ts
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

Modular service-based architecture ensures scalability and maintainability.

---

## 🔐 Environment Variables

Backend `.env` file:

```
GROQ_API_KEY=your_groq_api_key
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## ⚙️ Local Development

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### Analyze Resume
```
POST /api/analyze
```

Returns structured JSON analysis + resumeId.

---

### Resume Chat (RAG)
```
POST /api/chat
```

Body:
```
{
  "resumeId": "string",
  "question": "How can I improve my backend skills?"
}
```

Returns:
```
{
  "answer": "Context-grounded AI response"
}
```

---

## 🎯 Why This Project Matters

This project demonstrates:

- Real-world LLM integration
- Production-grade TypeScript backend
- Applied RAG architecture
- Vector search implementation
- AI output structuring
- Clean UI/UX for AI systems
- Free LLM deployment strategy (Groq)

It reflects practical AI engineering skills beyond simple API usage.

---

## 🔮 Future Enhancements

- Authentication system
- Persistent chat history
- Multi-resume management
- Dedicated vector database (Pinecone/Weaviate)
- Streaming LLM responses
- Cloud deployment with CI/CD

---

## 🌍 Deployment

Frontend:    https://ai-resume-analyzer-3pu1jmlic-rambabu00s-projects.vercel.app/
             Render Backend:- 
Backend:   1) https://ai-powered-resume-analyzer-d0jh.onrender.com/api/analyze
           2) https://ai-powered-resume-analyzer-d0jh.onrender.com/api/chat
           Railway Backend:- 
           1) https://airesumeanalyzer-production-a67d.up.railway.app/api/analyze
           2) https://airesumeanalyzer-production-a67d.up.railway.app/api/chat
           
---

## 👨‍💻 Author

Rambabu Kadagala  
AI Engineer | Full Stack Developer | Backend Enthusiast

---

