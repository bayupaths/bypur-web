/**
 * Fetches the profile from the API with Nuxt's built-in deduplication.
 * Safe to call in multiple components — only one network request is made per render.
 */
export const useProfile = () => useFetch('/api/profile')
