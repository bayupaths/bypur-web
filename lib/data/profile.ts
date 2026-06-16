import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Bayu Purnomo",
  title: "Backend & Systems Engineer",
  tagline: "I craft scalable digital products.",
  taglineHighlight: "scalable",
  bio: "I design and build backend systems — APIs, auth layers, data pipelines, and infrastructure that teams can ship on with confidence.",
  email: "bayupurnomo.dev@gmail.com",
  phone: "+62 881 2785 635",
  location: "Indonesia",
  avatar: "/images/avatar/bayu-purnomo-no-bg.png",
  resumeUrl: "/cv.pdf",
  roles: [
    "Backend Engineer",
    "Systems Architect",
    "Laravel Specialist",
    "Full Stack Developer",
  ],
  rolesLabel: "Currently working as",
  techStack: ["Laravel", "Go", "Node.js", "PostgreSQL", "Docker", "Redis"],
  stats: [
    { value: "40+", label: "Projects shipped" },
    { value: "5+", label: "Years building" },
    { value: "12+", label: "Clients served" },
  ],
  mobileStats: [
    {
      value: "5+",
      label: "years experience",
      accent: true,
      icon: "ti-briefcase",
    },
    {
      value: "40+",
      label: "projects shipped",
      accent: true,
      icon: "ti-rocket",
    },
    {
      value: "Laravel",
      label: "primary stack",
      accent: false,
      icon: "ti-server",
    },
    {
      value: "100%",
      label: "remote ready",
      accent: false,
      icon: "ti-world",
    },
  ],
  highlights: [
    { label: "REST API", icon: "Server" },
    { label: "Laravel", icon: "Code2" },
    { label: "PostgreSQL", icon: "Database" },
    { label: "Docker", icon: "Container" },
  ],
  skills: {
    label: "Skills",
    title: "Tools I use to build great things.",
    titleHighlight: "build great things.",
    description: "A snapshot of technologies and practices I rely on day-to-day",
    primaryStack: [
      {
        name: "Laravel",
        desc: "Web app & backend services",
        icon: "Server",
      },
      {
        name: "PostgreSQL",
        desc: "Database design & queries",
        icon: "Database",
      },
      {
        name: "Vue / Nuxt",
        desc: "Frontend & SSR",
        icon: "Layers",
      },
      {
        name: "Go",
        desc: "REST API & clean architecture",
        icon: "Zap",
      },
    ],
    familiarWith: ["Redis", "Firebase", "MinIO", "TypeScript", "Tailwind CSS"],
    cta: {
      label: "Portfolio Showcase",
      title: "See these skills in action",
      description: "Browse real-world projects where I've applied these technologies",
      button: {
        text: "View Projects",
        href: "#projects",
      },
    },
  },
  about: {
    label: "About",
    title: "A developer who cares about",
    titleHighlight: "the full picture.",
    headline: "Half a decade shipping **backend systems** and **interfaces** people actually want to use.",
    description: "My favorite part is the seam where they meet — clean architecture, typed APIs, and thoughtful UI turning into a product that just feels right.",
    yearLabel: "years",
    cta: {
      primary: {
        text: "Get in touch",
        href: "#contact",
      },
      secondary: {
        text: "Download CV",
        href: "/cv.pdf",
      },
    },
  },
  experience: {
    label: "Experience",
    title: "A timeline of building & learning.",
    titleHighlight: "building & learning.",
    description: "The roles, teams, and challenges that shaped how I work today.",
    stats: {
      yearsExp: "5+",
      positions: "Positions held",
      highlight: {
        value: "↓40%",
        label: "API latency cut",
      },
    },
  },
  projects: {
    label: "Projects",
    title: "Selected work I'm proud of.",
    titleHighlight: "I'm proud of.",
    description: "A few projects that capture how I think about product, architecture, and craft.",
  },
  contact: {
    label: "Contact",
    title: "Let's build something together.",
    titleHighlight: "something together.",
    description: "Open to freelance projects, full-time opportunities, or just a friendly chat about code.",
    info: [
      {
        icon: "Mail",
        label: "Email",
        value: "bayupurnomo.dev@gmail.com",
        href: "mailto:bayupurnomo.dev@gmail.com",
        copyable: true,
      },
      {
        icon: "Phone",
        label: "Phone",
        value: "+62 881 2785 635",
        href: "tel:+6288127856 35",
        copyable: false,
      },
      {
        icon: "MapPin",
        label: "Location",
        value: "Indonesia · UTC+7 · Replies in ~24h",
        href: "#",
        copyable: false,
      },
    ],
    form: {
      title: "Send me a message",
      subtitle: "I'll get back to you within 1–2 working days.",
      projectTypes: ["Web app", "Landing page", "API / Backend", "Consulting", "Other"],
    },
  },
  cta: {
    primary: {
      text: "View my work",
      href: "#projects",
    },
    secondary: {
      text: "Let's talk",
      href: "#contact",
    },
  },
  socials: {
    github: "https://github.com/bayupaths",
    linkedin: "https://linkedin.com/in/bayupurnomo1710",
    instagram: "https://instagram.com/bayuuu.p",
    whatsapp: "https://wa.me/628812785635",
  },
};
