export function useTypewriter(phrases, options = {}) {
  const msPerChar = options.msPerChar ?? 42
  const pauseMs = options.pauseMs ?? 2200
  const display = ref('')
  const phraseIndex = ref(0)
  const charIndex = ref(0)
  const deleting = ref(false)
  let timer = null

  const tick = () => {
    const list = unref(phrases)
    if (!list?.length) return

    const current = list[phraseIndex.value]
    if (!deleting.value) {
      display.value = current.slice(0, charIndex.value + 1)
      charIndex.value += 1
      if (charIndex.value >= current.length) {
        deleting.value = true
        timer = setTimeout(tick, pauseMs)
        return
      }
      timer = setTimeout(tick, msPerChar)
    } else {
      display.value = current.slice(0, charIndex.value - 1)
      charIndex.value -= 1
      if (charIndex.value <= 0) {
        deleting.value = false
        phraseIndex.value = (phraseIndex.value + 1) % list.length
        timer = setTimeout(tick, msPerChar * 2)
        return
      }
      timer = setTimeout(tick, msPerChar / 1.8)
    }
  }

  onMounted(() => {
    timer = setTimeout(tick, 400)
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { display }
}
