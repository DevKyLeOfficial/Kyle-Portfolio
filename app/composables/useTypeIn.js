/** Type a single string once (hero titles, code-style intros). */
export function useTypeIn(source, options = {}) {
  const msPerChar = options.msPerChar ?? 58
  const startDelayMs = options.startDelayMs ?? 400
  const display = ref('')
  const complete = ref(false)
  let timer = null
  let started = false

  const run = () => {
    if (started) return
    started = true

    const text = String(unref(source) ?? '')
    if (!text.length) {
      complete.value = true
      return
    }

    if (import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      display.value = text
      complete.value = true
      return
    }

    let index = 0
    const step = () => {
      index += 1
      display.value = text.slice(0, index)
      if (index < text.length) {
        const ch = text[index - 1]
        const pause = ch === ' ' ? msPerChar * 1.4 : msPerChar
        timer = setTimeout(step, pause)
      } else {
        complete.value = true
      }
    }
    timer = setTimeout(step, startDelayMs)
  }

  onMounted(() => {
    const waitUntil = options.waitUntil
    if (waitUntil) {
      watch(
        () => unref(waitUntil),
        (ready) => {
          if (ready) run()
        },
        { immediate: true },
      )
    } else {
      run()
    }
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { display, complete }
}
