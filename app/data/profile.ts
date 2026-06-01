import type { Profile } from '~/types'

export const profile: Profile = {
  name: 'Bayu Purnomo',
  title: 'Full Stack Developer',
  bio: 'I help teams ship robust backend systems, elegant APIs, and modern web experiences — powered by Laravel, Vue/Nuxt, and an AI-accelerated workflow that turns ideas into production in record time.',
  email: 'bayupurnomo.dev@gmail.com',
  phone: '+62 881 2785 635',
  location: 'Indonesia',
  avatar: '/images/avatar/bayu-purnomo-no-bg.png',
  resumeUrl: '/cv.pdf',
  roles: [
    'Fullstack Developer',
    'Backend Engineer',
    'Laravel Specialist',
    'AI-Powered Builder',
  ],
  techStack: ['Laravel', 'Vue / Nuxt', 'Node.js', 'PostgreSQL', 'AI Agents'],
  stats: [
    { value: '40+', label: 'Projects' },
    { value: '12+', label: 'Clients'  },
    { value: '3+',  label: 'Years Exp' },
  ],
  highlights: [
    { label: 'REST API',   icon: 'Server'   },
    { label: 'Laravel',    icon: 'Code2'    },
    { label: 'PostgreSQL', icon: 'Database' },
    { label: 'Vue / Nuxt', icon: 'Layers'   },
  ],
  socials: {
    github: 'https://github.com/bayupaths',
    linkedin: 'https://linkedin.com/in/bayupurnomo1710',
    instagram: 'https://instagram.com/bayuuu.p',
    whatsapp: 'https://wa.me/628812785635',
  },
}
