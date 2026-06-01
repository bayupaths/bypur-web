import axios from 'axios'
import { profile as staticProfile } from '~/data/profile'
import type { Profile } from '~/types'

interface ProfileResponse {
  id: number
  name: string
  nickname: string | null
  tagline: string | null
  taglines: string[] | null
  avatar: string | null
  phone: string | null
  email: string | null
  location: string | null
  bio: string | null
  resume_url: string | null
  website_url: string | null
  is_available: boolean
  socials: Record<string, string> | null
}

function transform(p: ProfileResponse): Profile {
  return {
    name:      p.name,
    title:     p.tagline ?? staticProfile.title,
    bio:       p.bio ?? staticProfile.bio,
    email:     p.email ?? staticProfile.email,
    phone:     p.phone ?? staticProfile.phone,
    location:  p.location ?? staticProfile.location,
    avatar:    p.avatar ?? staticProfile.avatar,
    resumeUrl: p.resume_url ?? staticProfile.resumeUrl,
    roles:     p.taglines ?? staticProfile.roles,
    socials:   p.socials ?? staticProfile.socials,
  }
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string | undefined
  const apiKey  = config.apiKey as string | undefined

  if (apiBase && apiKey) {
    try {
      const { data: raw } = await axios.get<{ data: ProfileResponse } | ProfileResponse>(
        `${apiBase}/api/profile/me`,
        { headers: { 'X-Api-Key': apiKey } }
      )
      const data = (raw as any)?.data ?? raw
      console.log('[profile] Fetched from backend:', data)
      return transform(data)
    } catch (err) {
      console.warn('[profile] Backend unreachable, falling back to static data:', err)
    }
  }

  return staticProfile
})
