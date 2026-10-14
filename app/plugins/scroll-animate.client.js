export default defineNuxtPlugin(() => {
  if (import.meta.server) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let ticking = false

  const update = () => {
    ticking = false
    const vh = window.innerHeight
    document.querySelectorAll('[data-scroll-section]').forEach((el) => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const dist = (center - vh / 2) / vh
      const clamped = Math.max(-1, Math.min(1, dist))
      el.style.setProperty('--scroll-shift', `${clamped * -20}px`)
    })
  }

  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()
})
