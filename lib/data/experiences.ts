import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Freelance / Self-employed",
    role: "Full Stack Developer",
    period: "2024 - Present",
    location: "Remote",
    type: "Freelance",
    description: [
      "Designed and shipped end-to-end web applications for small businesses and startups.",
      "Built reusable Laravel API boilerplates and Nuxt admin dashboards used across projects.",
      "Collaborated directly with clients to translate requirements into clean, maintainable code.",
    ],
    techStack: ["Laravel", "Nuxt", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    id: 2,
    company: "PT Ethos",
    role: "Backend Engineer",
    period: "2022 - 2024",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    description: [
      "Owned core backend services for an internal HR and operations platform.",
      "Reduced API latency by around 40% through query tuning and Redis caching.",
      "Mentored junior developers on code review, testing, and Laravel best practices.",
    ],
    techStack: ["Laravel", "MySQL", "Redis", "REST API"],
  },
  {
    id: 3,
    company: "Digital Agency",
    role: "Junior Web Developer",
    period: "2020 - 2022",
    location: "Bandung, Indonesia",
    type: "Full-time",
    description: [
      "Delivered marketing websites and CMS-driven applications for various clients.",
      "Implemented responsive UIs from Figma designs with high pixel-perfect accuracy.",
    ],
    techStack: ["PHP", "Vue.js", "Tailwind CSS", "MySQL"],
  },
];
