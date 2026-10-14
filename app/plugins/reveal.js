const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scroll-reveal directive — SSR-safe via getSSRProps. */
const reveal = {
  getSSRProps() {
    return {}
  },
  mounted(el, binding) {
    if (import.meta.server) return
    if (prefersReducedMotion()) return

    const opts = binding.value && typeof binding.value === 'object' ? binding.value : {}
    const type = opts.type || binding.arg || 'up'
    const delay = opts.delay || 0

    el.classList.add('reveal', `reveal-${type}`)
    if (delay) el.style.transitionDelay = `${delay}ms`

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            obs.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    el.__revealObserver = observer
  },
  unmounted(el) {
    if (el.__revealObserver) {
      el.__revealObserver.disconnect()
      delete el.__revealObserver
    }
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
