import { skills as staticSkills } from '~/data/skills'
import type { Skill } from '~/types'

const VALID_CATEGORIES = new Set<Skill['category']>(['frontend', 'backend', 'tools', 'ai', 'other'])

interface BackendSkill {
  id: number
  name: string
  slug: string
  icon: string | null
  category: string | null
  level: number | null
  order: number
}

function transform(s: BackendSkill): Skill {
  const cat = s.category && VALID_CATEGORIES.has(s.category as Skill['category'])
    ? s.category as Skill['category']
    : 'other'
  return {
    name:     s.name,
    category: cat,
    icon:     s.icon ?? undefined,
  }
}

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase as string | undefined

  if (apiBase && runtimeConfig.apiKey) {
    try {
      const raw = await $fetch<BackendSkill[]>(`${apiBase}/api/v1/portfolio/skills`, {
        headers: { 'X-Api-Key': runtimeConfig.apiKey as string },
      })
      return raw.map(transform)
    } catch (err) {
      console.warn('[skills] Backend unreachable, falling back to static data:', err)
    }
  }

  return staticSkills
})
