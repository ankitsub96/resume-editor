  import profilePhoto from '../assets/photo.jpeg';

  export const initialResume = {
    header: {
      name: "Ankit Dahiya",
      title: "Senior Software Engineer",
      summary:
        "Senior Software Engineer with 5+ years of experience building scalable full-stack applications, distributed systems, and high-throughput backend services. Strong expertise in React, Node.js, real-time architectures, and end-to-end product ownership. Delivered large-scale collaboration, payment, and enterprise platforms serving thousands of users and processing ₹30–40 Cr annually. Built AI-powered applications, RAG pipelines, and agentic workflows using Python, FastAPI, LangChain, and LangGraph.",
      photo: profilePhoto,
      contacts: [
        {
          id: "email",
          icon: "email",
          label: "ankitsub96@gmail.com",
          href: "mailto:ankitsub96@gmail.com",
        },
        {
          id: "phone",
          icon: "phone",
          label: "9910113275",
          href: "tel:9910113275",
        },
        {
          id: "location",
          icon: "location",
          label: "Gurugram, India",
          href: null,
        },
        {
          id: "linkedin",
          icon: "linkedin",
          label: "linkedin.com/in/ankit-dahiya-3673a369",
          href: "https://linkedin.com/in/ankit-dahiya-3673a369",
        },
        {
          id: "github",
          icon: "github",
          label: "github.com/ankitsub96",
          href: "https://github.com/ankitsub96",
        },
      ],
    },
    sections: [
      {
        id: "techSkills",
        type: "techSkills",
        title: "Technical Skills",
        visible: true,
        column: "left",
        items: [
          {
            id: "tech-1",
            category: "Web Development",
            skills:
              "NodeJs, JavaScript, TypeScript, Python, ReactJS, Redux, Context API, NextJS, Vite, Node.js, ExpressJS, FastAPI",
          },
          {
            id: "tech-1.5",
            category: "AI & LLM Engineering",
            skills: "LangChain, LangGraph, RAG, Agentic Workflows, Prompt Engineering, Vector Databases, Embeddings, Hybrid Search, Semantic Search, Reranking, Response Grounding, Query Expansion, FAISS",
          },
          {
            id: "tech-2",
            category: "Databases",
            skills: "MongoDB, Mongoose, MySQL, PostgreSQL, Redis, Elasticsearch",
          },
          {
            id: "tech-3",
            category: "Cloud & DevOps",
            skills: "AWS, Docker, RabbitMQ, Socket.IO , CI/CD",
          },
        ],
      },
      {
        id: "skills",
        type: "skills",
        title: "Core Skills",
        visible: true,
        column: "left",
        items: [
          { id: "sk-1", label: "System Design (HLD/LLD)" },
          { id: "sk-2", label: "Distributed Systems" },
          { id: "sk-3", label: "Microservices" },
          { id: "sk-4", label: "Event-Driven (RabbitMQ, S3)" },
          { id: "sk-5", label: "Auth, RBAC & IAM" },
          { id: "sk-6", label: "Schema & Data Modeling" },
          { id: "sk-7", label: "Redis & Caching" },
          { id: "sk-8", label: "Performance & Latency Tuning" },
          { id: "sk-9", label: "Real-Time Systems" },
          { id: "sk-10", label: "AWS Serverless (Lambda, AppSync)" },
          { id: "sk-11", label: "Docker & Containerization" },
          { id: "sk-12", label: "Technical Leadership" },
          { id: "sk-13", label: "CI/CD & DevOps" },
          { id: "sk-14", label: "RAG" },
          { id: "sk-15", label: "Semantic Search" },
          { id: "sk-16", label: "Agentic Workflows" },
        ],
      },
      {
        id: "work",
        type: "work",
        title: "Work Experience",
        visible: true,
        column: "right",
        items: [
          {
            id: "work-1",
            jobTitle: "Senior Software Engineer",
            company: "Tagbin",
            period: "01/2025 – Present",
            location: "Gurugram",
            bullets: [
              "Led delivery of Workly, a collaboration SaaS reaching 50k+ DAUs — chat, meetings, tasks, and notifications",
              "Shipped AI meeting features (transcription, auto-MOM, task suggestions) cutting administrative overhead by ~40%",
              "Built Workly AI Assistant using LLM-driven workflows and Google Workspace integrations (Gmail, Calendar) to enable enterprise search, contextual assistance, and productivity automation",
              "Built WFM module for 10,000+ employees and standardized engineering practices across the team",
            ],
          },
          {
            id: "work-2",
            jobTitle: "Full Stack Developer",
            company: "Imarticus Learning",
            period: "06/2021 – 01/2025",
            location: "New Delhi",
            bullets: [
              "Scaled payment infrastructure to support multiple payment gateways, processing ₹30–40 Cr annually with a 99.8% success rate",
              "Built an RBAC framework that reduced access-related support tickets by ~50% and mentored 3 developers",
              "Shipped a live lecture platform supporting 5,000+ concurrent learners, becoming the platform's highest-retention feature",
            ],
          },
          {
            id: "work-3",
            jobTitle: "Full Stack Developer",
            company: "Mogi I/O",
            period: "12/2020 – 07/2021",
            location: "Delhi",
            bullets: [
              "Built and shipped REST APIs and React frontend features for a video-tech SaaS platform",
              "Integrated third-party video streaming SDKs and developed reusable component libraries used across multiple product teams",
            ],
          },
        ],
      },
     {
        id: "projects",
        type: "projects",
        title: "Projects",
        visible: true,
        column: "right",
        items: [
          {
            id: "proj-1",
            title: "Workly",
            subtitle:
              "AWS AppSync, Lambda, S3, Chime, RabbitMQ, WebSockets, Transcribe, Elasticsearch, Node.js, PostgreSQL",
            period: "2025 – Present",
            bullets: [
              "Architected event-driven microservices for a real-time collaboration platform serving 50k+ DAUs with sub-200ms message delivery",
              "Built unified notifications (WebSocket, push, email, VoIP) and scalable file-sharing infrastructure with resumable S3 uploads",
              "Shipped AI meeting capabilities including recording, transcription, auto-MOM generation, and action-item extraction, reducing API latency by 60% through Redis and Elasticsearch optimizations",
            ],
          },
          {
            id: "proj-2",
            title: "Holobox",
            subtitle:
              "Python, FastAPI, LangChain, LangGraph, FAISS, Transformers, RAG, Redis",
            period: "2025 – Present",
            bullets: [
              "Architected and developed production RAG pipelines for AI-powered holographic assistants deployed for clients including HAL and BIPARD",
              "Enabled grounded, domain-specific voice interactions through semantic retrieval, reranking, LLM orchestration, and Redis-backed caching",
            ],
          },
          {
            id: "proj-3",
            title: "Multi-Gateway Payment Platform",
            subtitle: "Node.js, PostgreSQL, MongoDB, RabbitMQ",
            period: "2021 – 2025",
            bullets: [
              "Architected payment orchestration across 3+ gateways supporting online, offline, and device-based transactions",
              "Built a reconciliation engine and event-driven notification pipeline across the complete payment lifecycle",
            ],
          },
          {
            id: "proj-4",
            title: "Workforce Management System",
            subtitle: "AWS Lambda, Docker, ECS, Socket.IO, PostgreSQL",
            period: "2025 – Present",
            bullets: [
              "Built geo-fenced attendance for 10,000+ employees across 50+ sites with anti-spoofing validation",
              "Developed a configurable leave engine (20+ leave types) and task management module tracking 500+ concurrent tasks",
            ],
          },
          {
            id: "proj-5",
            title: "Multi-Tenant BI & Dashboarding Platform",
            subtitle: "ReactJS, PostgreSQL, MySQL, MongoDB",
            period: "2021 – 2025",
            bullets: [
              "Built a drag-and-drop analytics dashboard supporting 20+ chart types and cross-database queries for 15+ enterprise tenants",
              "Implemented tenant isolation, query optimization, and scalable multi-database architecture",
            ],
          },
        ],
      },
      {
        id: "education",
        type: "education",
        title: "Education",
        visible: true,
        column: "left",
        items: [
          {
            id: "edu-1",
            degree: "B.Tech – Computer Science",
            institution: "Bharati Vidyapeeth / GGSIPU",
            period: "08/2013 – 07/2017",
            location: "New Delhi",
            gpa: "",
          },
          {
            id: "edu-2",
            degree: "12th – CBSE",
            institution: "K.V. Sec-8 RK Puram",
            period: "04/2012 – 03/2013",
            location: "New Delhi",
            gpa: "86.4%",
          },
        ],
      },
    ],
  };
