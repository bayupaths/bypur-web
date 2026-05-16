export const useScrollSpy = (sectionIds: string[]) => {
  const activeSection = ref<string>(sectionIds[0] ?? '')

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    { threshold: 0.4 }
  )

  onMounted(() => {
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onUnmounted(() => observer.disconnect())

  return { activeSection }
}
