import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    title: "Backend systems",
    slug: "backend-systems",
    description: "Multi-tenant Laravel apps, queues, and observability built to scale.",
    icon: "i-logos-laravel",
  },
  {
    title: "Web interfaces",
    slug: "web-interfaces",
    description: "Accessible, fast Vue / Nuxt UIs with a strict performance budget.",
    icon: "i-logos-nuxt-icon",
  },
  {
    title: "APIs & integrations",
    slug: "apis-integrations",
    description: "Typed REST endpoints with clear docs and predictable behavior.",
  },
  {
    title: "Shipping workflow",
    slug: "shipping-workflow",
    description: "CI/CD, code review, and DX tooling so teams move with confidence.",
  },
];
