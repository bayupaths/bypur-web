/**
 * Fades & translates an element into view on first intersection.
 *
 * @example
 *   const { el, visible } = useScrollReveal()
 *   <section ref="el" :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'" />
 */
export function useScrollReveal(threshold = 0.06) {
  const el      = ref<HTMLElement | null>(null)
  const visible = ref(false)
  let io: IntersectionObserver | null = null

  onMounted(() => {
    io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          visible.value = true
          io?.disconnect()
        }
      },
      { threshold },
    )
    if (el.value) io.observe(el.value)
  })

  onUnmounted(() => io?.disconnect())

  return { el, visible }
}
