<script setup>
const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  imageSrc: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
})

const emit = defineEmits(['update:open', 'close'])

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
        class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'Preview'"
      >
        <div
          class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          aria-hidden="true"
          @click="onOverlayClick"
        />

        <div
          class="relative z-10 flex max-h-[92vh] w-full max-w-[820px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-glass-lg"
        >
          <header class="border-b border-white/10 px-5 py-4 sm:px-6">
            <h2 class="font-display text-lg font-bold text-slate-100 sm:text-xl">
              {{ title }}
            </h2>
          </header>

          <div class="overflow-y-auto p-4 sm:p-6">
            <img
              v-if="imageSrc"
              :src="imageSrc"
              :alt="imageAlt || title"
              class="mx-auto max-h-[70vh] w-full rounded-2xl object-contain bg-slate-950"
            />
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
