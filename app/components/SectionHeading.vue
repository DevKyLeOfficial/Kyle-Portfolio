<script setup>
defineProps({
  tag: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <div v-reveal class="mb-12">
    <p class="mb-2 font-mono text-sm font-medium tracking-wide text-emerald-400">
      {{ tag }}
    </p>
    <h2 class="font-display text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
      <span class="text-gradient-metal">{{ title }}</span>
    </h2>
    <div class="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-200/80" />
  </div>
</template>
