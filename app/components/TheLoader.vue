<script setup>
const emit = defineEmits(['done'])

const BOOT_TEXT = 'Hello World'

const decodedText = ref('')
const currentBinary = ref('')
const typingDone = ref(false)

const progress = ref(0)
const fadeOut = ref(false)
const hidden = ref(false)
const handoffActive = ref(false)
const statusLine = ref('initializing…')

/** Per-bit typing + pause after each revealed character. */
const MS_PER_BIT = 28
const MS_AFTER_CHAR = 72
const MS_START_DELAY = 280

/** Minimum time the splash stays up so the animation can be read. */
const MIN_DISPLAY_MS = 3400
const HANDOFF_MS = 780
const FADE_OUT_MS = 650
const MAX_WAIT_MS = 10000

let rafId = 0
let fadeTimer = null
let finishTimer = null
let decodeTimer = null
let exitStarted = false

function charToBinary(char) {
  return char.charCodeAt(0).toString(2).padStart(8, '0')
}

function finish() {
  hidden.value = true
  emit('done')
}

function startDecodeSequence() {
  const chars = [...BOOT_TEXT]
  let charIndex = 0
  let bitIndex = 0

  const step = () => {
    if (charIndex >= chars.length) {
      currentBinary.value = ''
      typingDone.value = true
      return
    }

    const fullBinary = charToBinary(chars[charIndex])

    if (bitIndex < 8) {
      currentBinary.value = fullBinary.slice(0, bitIndex + 1)
      bitIndex += 1
      decodeTimer = setTimeout(step, MS_PER_BIT)
      return
    }

    decodedText.value += chars[charIndex]
    currentBinary.value = fullBinary
    charIndex += 1
    bitIndex = 0

    const pause =
      chars[charIndex - 1] === ' ' ? MS_AFTER_CHAR + 40 : MS_AFTER_CHAR

    decodeTimer = setTimeout(() => {
      if (charIndex < chars.length) currentBinary.value = ''
      step()
    }, pause)
  }

  decodeTimer = setTimeout(step, MS_START_DELAY)
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
    decodedText.value = BOOT_TEXT
    typingDone.value = true
    progress.value = 100
    statusLine.value = 'ready'
    finish()
    return
  }

  startDecodeSequence()

  const start = performance.now()
  let ready = false

  statusLine.value = 'decoding payload…'
  waitForReady().then(() => {
    ready = true
    if (!exitStarted) statusLine.value = 'systems online'
  })

  const beginExit = () => {
    if (exitStarted) return
    exitStarted = true
    progress.value = 100
    handoffActive.value = true
    currentBinary.value = '0x48 0x65 0x6c… ✓'
    statusLine.value = 'signal locked · entering'
    fadeTimer = setTimeout(() => {
      fadeOut.value = true
      finishTimer = setTimeout(finish, FADE_OUT_MS)
    }, HANDOFF_MS)
  }

  const tick = (now) => {
    if (exitStarted) return

    const elapsed = now - start
    const decodeRatio = decodedText.value.length / BOOT_TEXT.length
    const progressCap = ready && typingDone.value ? 96 : 88
    let p = Math.min(progressCap, decodeRatio * progressCap + (elapsed / MIN_DISPLAY_MS) * 12)
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
  if (decodeTimer) clearTimeout(decodeTimer)
})
</script>

<template>
  <div
    v-if="!hidden"
    class="loader-screen fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-aurora transition-opacity duration-[650ms]"
    :class="{ 'opacity-0': fadeOut, 'loader-screen--handoff': handoffActive }"
    role="status"
    aria-live="polite"
    aria-busy="true"
    :aria-label="`Loading portfolio, ${progress} percent`"
  >
    <div v-if="handoffActive" class="loader-handoff-flash pointer-events-none" aria-hidden="true" />
    <div v-if="handoffActive" class="loader-handoff-ring loader-handoff-ring--a" aria-hidden="true" />
    <div v-if="handoffActive" class="loader-handoff-ring loader-handoff-ring--b" aria-hidden="true" />
    <div v-if="handoffActive" class="loader-handoff-scan" aria-hidden="true" />

    <div
      class="loader-card liquid-border glass-strong relative w-[min(440px,92vw)] rounded-3xl px-8 py-10 text-center sm:px-10 sm:py-12"
      :class="{ 'loader-card--launch': handoffActive }"
    >
      <p class="font-mono text-xs font-medium uppercase tracking-wider text-emerald-400">
        <span class="text-emerald-300">$</span> boot portfolio
      </p>

      <p class="mt-4 font-mono text-[10px] uppercase tracking-wide text-slate-500">
        // decode · utf-8
      </p>

      <div class="neo-pressed mx-auto mt-3 rounded-2xl px-4 py-3 sm:px-5 sm:py-4">
        <p class="font-mono text-[11px] text-slate-500 sm:text-xs">binary</p>
        <p
          class="mt-1 min-h-[1.25rem] font-mono text-sm tracking-[0.12em] text-emerald-300 sm:text-base"
          :class="{ 'loader-binary-lock': handoffActive }"
        >
          <span>{{ currentBinary || '········' }}</span><span
            v-if="!typingDone && !handoffActive"
            class="ml-0.5 inline-block text-emerald-400 hero-cursor"
            aria-hidden="true"
          >|</span>
        </p>
      </div>

      <h2
        class="loader-title mt-6 min-h-[2.5rem] font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl"
        :class="{ 'loader-title--locked': handoffActive }"
        aria-label="Hello World"
      >
        <span class="text-gradient-metal">{{ decodedText }}</span><span
          v-if="!typingDone && !handoffActive"
          class="ml-0.5 inline-block font-mono text-lg font-normal text-emerald-400 hero-cursor"
          aria-hidden="true"
        >|</span>
      </h2>

      <div
        class="neo-pressed mx-auto mt-8 h-1.5 w-full overflow-hidden rounded-full"
        :class="{ 'loader-progress--complete': handoffActive }"
      >
        <div
          class="loader-progress-fill h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-300 transition-[width] duration-150 ease-out"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <p class="mt-4 font-mono text-xs text-slate-400">
        {{ progress }}% · {{ statusLine }}
      </p>
    </div>
  </div>
</template>
