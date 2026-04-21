  import profilePhoto from '../assets/photo.jpeg';

  export const initialResume = {
    header: {
      name: "Ankit Dahiya",
      title: "Senior Software Engineer",
      summary:
        "Senior Software Engineer with 5+ years building distributed, high-throughput backend systems — shipped a 50k+ DAU real-time collaboration platform (0→1) and payment infrastructure processing ₹30–40 Cr annually. Deep in event-driven architecture, distributed systems, and full-stack delivery. Led teams, drove AI integration, and scaled products.",
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
              "JavaScript, TypeScript, ReactJS, Redux, Context API, ExpressJS, NextJS, Vite",
          },
          {
            id: "tech-2",
            category: "Databases",
            skills: "MongoDB, Mongoose, MySQL, PostgreSQL, Redis, Elasticsearch",
          },
          {
            id: "tech-3",
            category: "Cloud & DevOps",
            skills: "AWS, Docker, RabbitMQ, Socket.IO",
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
          { id: "sk-2", label: "Auth, RBAC & IAM" },
          { id: "sk-3", label: "Schema & Data Modeling" },
          { id: "sk-4", label: "AWS Serverless (Lambda, AppSync)" },
          { id: "sk-5", label: "Redis & Caching" },
          { id: "sk-6", label: "Event-Driven (RabbitMQ, S3)" },
          { id: "sk-7", label: "Performance & Latency Tuning" },
          { id: "sk-8", label: "Technical Leadership" },
          { id: "sk-9", label: "CI/CD & DevOps" },
          { id: "sk-10", label: "Docker & Containerization" },
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
            jobTitle: "Senior Full Stack Developer",
            company: "Tagbin",
            period: "01/2025 – Present",
            location: "Gurugram",
            bullets: [
              "Led delivery of Workly, a collaboration SaaS reaching 50k+ DAUs — chat, meetings, tasks, and notifications",
              "Shipped AI meeting features (transcription, auto-MOM, task suggestions) cutting admin overhead ~40%",
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
              "Scaled payment infra to multi-gateway, processing ₹30–40 Cr/year at 99.8% success rate",
              "Built RBAC framework (cut tickets ~50%) and mentored 3 developers",
              "Shipped live lecture system for 5,000+ concurrent learners — platform's highest-retention feature",
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
              "Integrated third-party video streaming SDKs and authored reusable component library across product teams",
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
              "Architected event-driven microservices for 50k+ concurrent connections with <200ms delivery",
              "Built unified notification system (WebSocket, push/email, VoIP) and resumable S3 upload pipeline",
              "Built meeting pipeline — recording, transcription, and NLP extraction of agendas, MOM, and action items",
              "Reduced API latency 60% via Redis caching and Elasticsearch query optimization",
            ],
          },
          {
            id: "proj-3",
            title: "Multi-Gateway Payment Platform",
            subtitle: "Node.js, PostgreSQL, MongoDB, RabbitMQ",
            period: "2021 – 2025",
            bullets: [
              "Architected payment orchestration across 3+ gateways — online, offline, and device-based",
              "Built reconciliation engine and event-driven notification pipeline across the full payment lifecycle",
            ],
          },
          {
            id: "proj-4",
            title: "Workforce Management System",
            subtitle: "AWS Lambda, Docker, ECS, Socket.IO, PostgreSQL",
            period: "2025 – Present",
            bullets: [
              "Built geo-fenced attendance for 10,000+ employees across 50+ sites with anti-spoofing checks",
              "Built leave engine (20+ types, configurable chains) and task module tracking 500+ concurrent tasks",
            ],
          },
          {
            id: "proj-5",
            title: "Multi-Tenant BI & Dashboarding Platform",
            subtitle: "ReactJS, PostgreSQL, MySQL, MongoDB",
            period: "2021 – 2025",
            bullets: [
              "Built drag-and-drop dashboard with 20+ chart types and cross-database queries for 15+ enterprise tenants",
              "Implemented tenant isolation and query optimization across a multi-database backend",
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
