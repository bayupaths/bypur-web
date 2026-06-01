import { services as staticServices } from '~/data/services'
import type { Service } from '~/types'

interface BackendService {
  id: number
  title: string
  slug: string
  description: string
  icon: string | null
  price_from: number | null
  is_active: boolean
  order: number
}

function transform(s: BackendService): Service {
  return {
    title:       s.title,
    slug:        s.slug,
    description: s.description,
    icon:        s.icon ?? undefined,
    priceFrom:   s.price_from,
    isActive:    s.is_active,
  }
}

export default defineEventHandler(async () => {
  const apiBase = useRuntimeConfig().public.apiBase as string

  if (apiBase && useRuntimeConfig().apiKey) {
    try {
      const raw = await $fetch<BackendService[]>(`${apiBase}/api/v1/portfolio/services`, {
        headers: { 'X-Api-Key': useRuntimeConfig().apiKey as string },
      })
      return raw
        .filter(s => s.is_active)
        .sort((a, b) => a.order - b.order)
        .map(transform)
    } catch {
      // fallthrough to static
    }
  }

  return staticServices
})
