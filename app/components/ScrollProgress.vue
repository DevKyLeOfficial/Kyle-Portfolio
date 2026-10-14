<script setup>
const progress = ref(0)

const update = () => {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - doc.clientHeight
  progress.value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
})
</script>

<template>
  <div
    class="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-full bg-black/10"
    aria-hidden="true"
  >
    <div
      class="h-full bg-gradient-to-r from-emerald-600 via-teal-400 to-amber-200/90 transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(16,185,129,0.35)]"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
