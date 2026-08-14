export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Senior Backend Engineer",
    company: "Company Name",
    period: "2023 — Present",
    description:
      "Leading the design of internal APIs and event-driven services, cutting p95 latency by 40% while scaling to 10x traffic.",
    stack: ["Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    role: "Full-Stack Engineer",
    company: "Previous Company",
    period: "2021 — 2023",
    description:
      "Built and shipped customer-facing features end to end, from database schema to production UI, across a Next.js + Express stack.",
    stack: ["React", "Next.js", "Express", "MongoDB"],
  },
  {
    role: "Software Engineer Intern",
    company: "Earlier Company",
    period: "2020 — 2021",
    description:
      "Automated deployment pipelines and reduced release time from an hour to under ten minutes.",
    stack: ["Python", "CI/CD", "Linux"],
  },
];
