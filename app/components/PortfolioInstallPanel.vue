<script setup>
const { isInstalled, runInstaller } = usePortfolioInstall()
</script>

<template>
  <button
    v-if="!isInstalled"
    type="button"
    class="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600/70 transition hover:text-emerald-500/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-emerald-500/40"
    aria-label="Install portfolio app"
    @click="runInstaller"
  >
    installer
  </button>
</template>
