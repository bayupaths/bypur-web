import type { Project } from '~/types'

export const projects: Project[] = [
  {
    id: 1,
    title: 'by.pur_ Studio',
    description:
      'Personal studio site & playground. A handcrafted Nuxt 4 + Tailwind v4 portfolio with a custom design system and full dark mode support.',
    techStack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind v4'],
    imageUrl: '/images/projects/placeholder.svg',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/bayupurnomo',
  },
  {
    id: 2,
    title: 'HR Operations Platform',
    description:
      'Internal tool to manage attendance, payroll, and employee data. Backend powered by Laravel with role-based access control and audit logs.',
    techStack: ['Laravel', 'MySQL', 'Redis', 'Vue.js'],
    imageUrl: '/images/projects/placeholder.svg',
    liveUrl: '',
    repoUrl: '',
  },
  {
    id: 3,
    title: 'Realtime Order Dashboard',
    description:
      'Order tracking dashboard for an F&B chain. Live updates via WebSockets, queue-based notifications, and printable receipts.',
    techStack: ['Laravel', 'Pusher', 'Vue.js', 'PostgreSQL'],
    imageUrl: '/images/projects/placeholder.svg',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/bayupurnomo',
  },
  {
    id: 4,
    title: 'API Boilerplate Kit',
    description:
      'Opinionated Laravel API starter with auth, RBAC, OpenAPI docs, and CI pipelines — what I reach for on every new project.',
    techStack: ['Laravel', 'OpenAPI', 'Docker', 'GitHub Actions'],
    imageUrl: '/images/projects/placeholder.svg',
    liveUrl: '',
    repoUrl: 'https://github.com/bayupurnomo',
  },
  {
    id: 5,
    title: 'E-Commerce Storefront',
    description:
      'Modern storefront with product catalog, cart, and checkout flow. Integrated with a payment gateway and real-time inventory sync via webhooks.',
    techStack: ['Nuxt 3', 'Pinia', 'Stripe', 'Tailwind'],
    imageUrl: '/images/projects/placeholder.svg',
    liveUrl: 'https://example.com',
    repoUrl: '',
  },
  {
    id: 6,
    title: 'DevOps Pipeline Toolkit',
    description:
      'Reusable CI/CD workflows and infrastructure-as-code templates for containerised Laravel & Node.js apps. Cuts new-project setup from days to hours.',
    techStack: ['Docker', 'GitHub Actions', 'Terraform', 'AWS'],
    imageUrl: '/images/projects/placeholder.svg',
    liveUrl: '',
    repoUrl: 'https://github.com/bayupurnomo',
  },
]
