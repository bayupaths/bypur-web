import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "by.pur_ Studio",
    description:
      "Personal studio site and playground. A handcrafted Nuxt 4 plus Tailwind v4 portfolio with a custom design system.",
    techStack: ["Nuxt 4", "Vue 3", "TypeScript", "Tailwind v4"],
    imageUrl: "/images/projects/placeholder.svg",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/bayupurnomo",
  },
  {
    id: 2,
    title: "HR Operations Platform",
    description:
      "Internal tool to manage attendance, payroll, and employee data with RBAC and audit logs.",
    techStack: ["Laravel", "MySQL", "Redis", "Vue.js"],
    imageUrl: "/images/projects/placeholder.svg",
  },
  {
    id: 3,
    title: "Realtime Order Dashboard",
    description:
      "Order tracking dashboard for an F&B chain with live updates and queue-based notifications.",
    techStack: ["Laravel", "Pusher", "Vue.js", "PostgreSQL"],
    imageUrl: "/images/projects/placeholder.svg",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/bayupurnomo",
  },
  {
    id: 4,
    title: "API Boilerplate Kit",
    description:
      "Opinionated Laravel API starter with auth, RBAC, OpenAPI docs, and CI pipelines.",
    techStack: ["Laravel", "OpenAPI", "Docker", "GitHub Actions"],
    imageUrl: "/images/projects/placeholder.svg",
    repoUrl: "https://github.com/bayupurnomo",
  },
  {
    id: 5,
    title: "E-Commerce Storefront",
    description:
      "Modern storefront with product catalog, cart, and checkout flow with payment integration.",
    techStack: ["Nuxt 3", "Pinia", "Stripe", "Tailwind"],
    imageUrl: "/images/projects/placeholder.svg",
    liveUrl: "https://example.com",
  },
  {
    id: 6,
    title: "DevOps Pipeline Toolkit",
    description:
      "Reusable CI/CD workflows and IaC templates for containerized Laravel and Node.js apps.",
    techStack: ["Docker", "GitHub Actions", "Terraform", "AWS"],
    imageUrl: "/images/projects/placeholder.svg",
    repoUrl: "https://github.com/bayupurnomo",
  },
];
