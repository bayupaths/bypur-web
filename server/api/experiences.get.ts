import { experiences as staticExperiences } from '~/data/experiences'
import type { Experience } from '~/types'

/**
 * Raw shape from the Laravel admin API.
 * When the backend is ready, replace the static fallback with an actual fetch.
 */
interface BackendExperience {
  id: number
  company: string
  position: string
  location: string | null
  type: string | null
  started_at: string | null
  ended_at: string | null
  is_current: boolean
  description: string | null
  order: number
}

function formatMonth(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function buildPeriod(exp: BackendExperience): string {
  const start = exp.started_at ? formatMonth(exp.started_at) : ''
  if (exp.is_current) return `${start} — Present`
  const end = exp.ended_at ? formatMonth(exp.ended_at) : ''
  return end ? `${start} — ${end}` : start
}

function parseDescription(raw: string | null): string[] {
  if (!raw) return []
  // Support both JSON-array strings and plain newline-separated text
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.filter(Boolean)
  } catch {
    // not JSON — split on newlines
  }
  return raw.split('\n').map(l => l.trim()).filter(Boolean)
}

function transform(exp: BackendExperience): Experience {
  return {
    id:          exp.id,
    company:     exp.company,
    role:        exp.position,
    period:      buildPeriod(exp),
    location:    exp.location ?? undefined,
    type:        exp.type ?? undefined,
    description: parseDescription(exp.description),
    techStack:   undefined, // populated by backend when tech_stack field is added
  }
}

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase as string | undefined

  // When a backend URL is configured, fetch live data
  if (apiBase && runtimeConfig.apiKey) {
    try {
      const raw = await $fetch<BackendExperience[]>(`${apiBase}/api/v1/portfolio/experiences`, {
        headers: { 'X-Api-Key': runtimeConfig.apiKey as string },
      })
      return raw.map(transform)
    } catch (err) {
      console.warn('[experiences] Backend unreachable, falling back to static data:', err)
    }
  }

  // Fallback: return static data as-is (already matches Experience shape)
  return staticExperiences
})
