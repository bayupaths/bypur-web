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
  category: 'frontend' | 'backend' | 'tools' | 'other'
  icon?: string
}

export interface Experience {
  id: number
  company: string
  role: string
  period: string
  description: string[]
  techStack?: string[]
}

export interface Education {
  id: number
  institution: string
  degree: string
  field: string
  period: string
  description?: string
}

export interface Profile {
  name: string
  title: string
  bio: string
  email: string
  location: string
  avatar: string
  socials: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}
