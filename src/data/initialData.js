export const initialResume = {
  header: {
    name: "Ankit Dahiya",
    title: "Senior Full-Stack Developer",
    summary:
      "Fulls stack developer with a keen interest in System Design and have successfully delivered multiple projects single-handedly, including Bl Tools highly customized payment solutions. My passion for innovative problem-solving and collaboration ensures I deliver efficient and scalable solutions.",
    photo: null,
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
      id: "projects",
      type: "projects",
      title: "Projects",
      visible: true,
      column: "left",
      items: [
        {
          id: "proj-1",
          title: "Workly App",
          subtitle: "Full-Stack SaaS Platform",
          period: "2022 – Present",
          bullets: [
            "Built a multi-tenant SaaS platform handling 50k+ daily active users with 99.9% uptime",
            "Designed microservices architecture with event-driven communication via RabbitMQ",
            "Implemented RBAC system supporting 15+ permission levels across tenant hierarchies",
            "Reduced API latency by 60% through Redis caching and Elasticsearch query optimization",
          ],
        },
        {
          id: "proj-2",
          title: "Workforce Management System",
          subtitle: "Enterprise HR Platform",
          period: "2020 – 2022",
          bullets: [
            "Developed real-time attendance and shift scheduling for 10,000+ employees",
            "Integrated Socket.IO for live notifications and shift-swap workflows",
            "Built serverless functions on AWS Lambda for payroll processing pipelines",
            "Containerized entire stack with Docker and deployed on AWS ECS",
          ],
        },
        {
          id: "proj-3",
          title: "BI Tool (Business Intelligence)",
          subtitle: "Data Analytics Dashboard",
          period: "2019 – 2020",
          bullets: [
            "Created drag-and-drop dashboard builder with 20+ chart types using ReactJS",
            "Optimized complex SQL queries on PostgreSQL reducing report generation time by 70%",
            "Built custom query engine supporting MySQL, PostgreSQL, and MongoDB data sources",
          ],
        },
        {
          id: "proj-4",
          title: "Pegasus / Imarticus Learning",
          subtitle: "EdTech Platform",
          period: "2018 – 2019",
          bullets: [
            "Built interactive course delivery platform serving 5,000+ concurrent learners",
            "Implemented adaptive content delivery with personalized learning paths",
            "Developed real-time collaborative tools (whiteboards, quizzes) using WebSockets",
          ],
        },
      ],
    },
    {
      id: "skills",
      type: "skills",
      title: "Core Skills",
      visible: true,
      column: "right",
      items: [
        { id: "sk-1", label: "System Design" },
        { id: "sk-2", label: "Auth & RBAC" },
        { id: "sk-3", label: "Data Modeling" },
        { id: "sk-4", label: "Serverless" },
        { id: "sk-5", label: "Caching Strategies" },
        { id: "sk-6", label: "Event Driven Architecture" },
        { id: "sk-7", label: "Latency Optimization" },
        { id: "sk-8", label: "Debugging" },
        { id: "sk-9", label: "DevOps" },
        { id: "sk-10", label: "Containerization" },
      ],
    },
    {
      id: "techSkills",
      type: "techSkills",
      title: "Technical Skills",
      visible: true,
      column: "right",
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
      id: "education",
      type: "education",
      title: "Education",
      visible: true,
      column: "right",
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
