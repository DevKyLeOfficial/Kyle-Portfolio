<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="px-5 py-10">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-2xl py-6 sm:flex-row"
    >
      <p class="text-sm text-slate-400">
        © {{ year }} · Built with Nuxt, Vue & TDesign
      </p>
      <p class="text-sm font-medium text-slate-400">
        Built to ship.
      </p>
    </div>
  </footer>
</template>
