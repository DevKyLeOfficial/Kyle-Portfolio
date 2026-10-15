<script setup>
const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  /** When set, embeds the live app/game in a floating iframe. */
  iframeSrc: { type: String, default: '' },
  /** Optional link shown when iframe is not used (e.g. GitHub repo). */
  externalUrl: { type: String, default: '' },
  externalLabel: { type: String, default: 'Open link' },
})

const emit = defineEmits(['update:open', 'close'])

const iframeKey = ref(0)

function close() {
  emit('update:open', false)
  emit('close')
}

function onOverlayClick() {
  close()
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}

watch(
  () => props.open,
  (visible) => {
    if (!import.meta.client) return
    document.body.style.overflow = visible ? 'hidden' : ''
    if (!visible) {
      iframeKey.value += 1
    }
  },
)

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'Project preview'"
      >
        <div
          class="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
          aria-hidden="true"
          @click="onOverlayClick"
        />

        <div
          class="relative z-10 flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-glass-lg"
        >
          <header class="shrink-0 border-b border-white/10 px-4 py-3 sm:px-5">
            <h2 class="truncate font-display text-base font-bold text-slate-100 sm:text-lg">
              {{ title }}
            </h2>
          </header>

          <div class="min-h-0 flex-1 overflow-hidden">
            <iframe
              v-if="iframeSrc"
              :key="iframeKey"
              :src="iframeSrc"
              :title="title"
              class="block h-[min(78vh,720px)] w-full border-0 bg-white"
              allow="fullscreen"
              loading="lazy"
            />
            <div
              v-else
              class="flex h-[min(40vh,320px)] flex-col items-center justify-center gap-4 px-6 text-center"
            >
              <p class="max-w-md text-sm leading-relaxed text-slate-400">
                GitHub does not allow this repository to be embedded here. You can open it in your
                browser from the link below.
              </p>
              <a
                v-if="externalUrl"
                :href="externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-metal inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-mono text-sm font-semibold"
              >
                {{ externalLabel }}
              </a>
            </div>
          </div>

          <footer
            v-if="iframeSrc && externalUrl"
            class="flex shrink-0 justify-end border-t border-white/10 px-4 py-3 sm:px-5"
          >
            <a
              :href="externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-xs text-emerald-400/90 transition hover:text-emerald-300"
            >
              Open in new tab ↗
            </a>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
