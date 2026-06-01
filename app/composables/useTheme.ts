export const useTheme = () => {
  const isDark = useState<boolean>('isDark', () => true)

  const apply = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark)
  }

  const toggle = () => {
    if (!import.meta.client) return
    isDark.value = !isDark.value
    apply(isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  const init = () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = saved !== null ? saved === 'dark' : systemDark
    apply(isDark.value)
  }

  return { isDark: computed(() => isDark.value), toggle, init }
}
