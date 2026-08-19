export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Project Manager, FSD",
    company: "Scaleup Ads Agency",
    period: "2025 — 2026",
    description:
      "Led a team of 65+ engineers (Full Stack and Mobile) to deliver scalable software solutions, ensuring KPI growth from $0 to $50K+ revenue. Deployed and managed applications on AWS (EC2) and VPS servers with focus on scalability, security and uptime. Built and maintained backend systems for web and mobile applications with emphasis on performance and reliability. Ensured end-to-end project delivery including testing, deployment and client handover with high satisfaction.",
    stack: ["Node.js", "PostgreSQL", "Docker", "AWS", "Project Management"],
  },
  {
    role: "Bankend Developer",
    company: "Scaleup Ads Agency",
    period: "2024 - 2025",
    description:
      "Develop and handle backend services with the MERN stack (MongoDB, Express, React, and Node.js) for web and mobile apps. Develop and enhance database queries and schemas to provide high performance data operations.",
    stack: ["Node.js", "Next.js", "MongoDB", "Redis"],
  },
];
