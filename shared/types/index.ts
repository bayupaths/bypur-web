// Shared TypeScript types — accessible in both app/ and server/
// Docs: https://nuxt.com/docs/4.x/directory-structure/shared

export interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  imageUrl?: string
  liveUrl?: string
  repoUrl?: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'ai' | 'other'
  icon?: string
}

export interface Experience {
  id: number
  company: string
  role: string
  period: string
  location?: string
  type?: string
  description: string[]
  techStack?: string[]
}

export interface Service {
  title: string
  slug: string
  description: string
  /** Iconify format, e.g. 'i-logos-vuejs' or 'logos:vuejs' */
  icon?: string
  priceFrom?: number | null
  isActive?: boolean
}

export interface ProfileStat {
  value: string
  label: string
}

export interface ProfileHighlight {
  /** Label shown on the badge (omit for icon-only dot) */
  label?: string
  /** Key into the client-side icon map, e.g. 'Server', 'Code2', 'Database' */
  icon: string
}

export interface Profile {
  name: string
  title: string
  bio: string
  email: string
  location: string
  avatar: string
  phone?: string
  resumeUrl?: string
  roles?: string[]
  techStack?: string[]
  stats?: ProfileStat[]
  highlights?: ProfileHighlight[]
  socials: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    whatsapp?: string
  }
}
