<script setup>
const props = defineProps({
  word: { type: String, default: 'Hello World' },
})

const emit = defineEmits(['done'])

const progress = ref(0)
const fadeOut = ref(false)
const hidden = ref(false)
const statusLine = ref('initializing…')

const { display: typedWord, complete: typingDone } = useTypeIn(
  () => props.word,
  { msPerChar: 55, startDelayMs: 350 },
)

/** Minimum time the splash stays up so the animation can be read. */
const MIN_DISPLAY_MS = 3600
const HOLD_AT_COMPLETE_MS = 850
const FADE_OUT_MS = 600
const MAX_WAIT_MS = 9000

let rafId = 0
let fadeTimer = null
let finishTimer = null
let exitStarted = false

function finish() {
  hidden.value = true
  emit('done')
}

async function waitForReady() {
  const jobs = [
    new Promise((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', resolve, { once: true })
    }),
  ]
  if (document.fonts?.ready) jobs.push(document.fonts.ready)
  await Promise.race([
    Promise.all(jobs),
    new Promise((resolve) => setTimeout(resolve, 4500)),
  ])
}

onMounted(async () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced) {
    progress.value = 100
    statusLine.value = 'ready'
    finish()
    return
  }

  const start = performance.now()
  let ready = false

  statusLine.value = 'loading assets…'
  waitForReady().then(() => {
    ready = true
    if (!exitStarted) statusLine.value = 'systems online'
  })

  const beginExit = () => {
    if (exitStarted) return
    exitStarted = true
    progress.value = 100
    statusLine.value = 'opening portfolio…'
    fadeTimer = setTimeout(() => {
      fadeOut.value = true
      finishTimer = setTimeout(finish, FADE_OUT_MS)
    }, HOLD_AT_COMPLETE_MS)
  }

  const tick = (now) => {
    if (exitStarted) return

    const elapsed = now - start
    const progressCap = ready && typingDone.value ? 96 : 90
    let p = Math.min(progressCap, (elapsed / MIN_DISPLAY_MS) * progressCap)
    if (ready && typingDone.value && elapsed >= MIN_DISPLAY_MS * 0.85) {
      p = Math.min(100, p + (elapsed - MIN_DISPLAY_MS * 0.85) / 400)
    }

    progress.value = Math.floor(p)

    const canFinish = ready && typingDone.value && elapsed >= MIN_DISPLAY_MS
    if (canFinish || elapsed > MAX_WAIT_MS) {
      beginExit()
      return
    }

    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (fadeTimer) clearTimeout(fadeTimer)
  if (finishTimer) clearTimeout(finishTimer)
})
</script>

<template>
  <div
    v-if="!hidden"
    class="loader-screen fixed inset-0 z-[100] flex items-center justify-center bg-aurora transition-opacity duration-[600ms]"
    :class="{ 'opacity-0': fadeOut }"
    role="status"
    aria-live="polite"
    aria-busy="true"
    :aria-label="`Loading portfolio, ${progress} percent`"
  >
    <div class="liquid-border glass-strong w-[min(360px,88vw)] rounded-3xl px-10 py-12 text-center">
      <p class="font-mono text-xs font-medium uppercase tracking-wider text-emerald-400">
        <span class="text-emerald-300">$</span> boot portfolio
      </p>
      <h2 class="mt-4 font-display text-3xl font-bold uppercase tracking-tight">
        <span class="text-gradient-metal">{{ typedWord }}</span><span
          class="ml-0.5 inline-block font-mono text-lg font-normal text-emerald-400 hero-cursor"
          aria-hidden="true"
        >|</span>
      </h2>
      <div class="neo-pressed mx-auto mt-8 h-1.5 w-full overflow-hidden rounded-full">
        <div
          class="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-300 transition-[width] duration-150 ease-out"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <p class="mt-4 font-mono text-xs text-slate-400">
        {{ progress }}% · {{ statusLine }}
      </p>
    </div>
  </div>
</template>
