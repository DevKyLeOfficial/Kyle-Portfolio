/** Canvas matrix rain — lightweight background effect. */
export function useMatrixRain(canvasRef, options = {}) {
  const columns = options.columns ?? 0
  const fps = options.fps ?? 24
  let animationId = null
  let drops = []
  let ctx = null
  let w = 0
  let h = 0
  let fontSize = options.fontSize ?? 14
  const chars =
    options.chars ??
    'アイウエオ0123456789ABCDEF<>{}[]();const let async await return import export'

  const resize = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
    const colCount = columns || Math.floor(w / fontSize)
    drops = Array.from({ length: colCount }, () => Math.random() * -100)
    ctx = canvas.getContext('2d')
  }

  const draw = () => {
    if (!ctx) return
    ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'
    ctx.fillRect(0, 0, w, h)
    ctx.font = `${fontSize}px Share Tech Mono, monospace`

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)]
      const x = i * fontSize
      const y = drops[i] * fontSize

      const isHead = Math.random() > 0.975
      ctx.fillStyle = isHead ? '#ef4444' : `rgba(0, 255, 65, ${0.15 + Math.random() * 0.35})`
      ctx.fillText(char, x, y)

      if (y > h && Math.random() > 0.975) drops[i] = 0
      drops[i] += 0.6 + Math.random() * 0.4
    }
  }

  const start = () => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    resize()
    window.addEventListener('resize', resize)
    let last = 0
    const loop = (time) => {
      animationId = requestAnimationFrame(loop)
      if (time - last < 1000 / fps) return
      last = time
      draw()
    }
    animationId = requestAnimationFrame(loop)
  }

  const stop = () => {
    window.removeEventListener('resize', resize)
    if (animationId) cancelAnimationFrame(animationId)
  }

  onUnmounted(stop)

  return { start, stop }
}
