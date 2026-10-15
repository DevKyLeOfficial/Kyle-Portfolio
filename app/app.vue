<script setup>
import { site } from '~/data/site'

const showLoader = ref(true)
const introReady = ref(false)
const appReady = computed(() => !showLoader.value)

provide('introReady', introReady)

useHead({
  title: `${site.name} | ${site.title}`,
  htmlAttrs: {
    class: computed(() => (showLoader.value ? 'is-loading' : '')),
  },
})

function onLoaderDone() {
  showLoader.value = false
  introReady.value = true
}
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip bg-aurora">
    <ClientOnly>
      <TheLoader v-if="showLoader" @done="onLoaderDone" />
      <template #fallback>
        <div
          class="loader-screen fixed inset-0 z-[100] flex items-center justify-center bg-aurora"
          role="status"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <div class="liquid-border glass-strong w-[min(440px,92vw)] rounded-3xl px-8 py-10 text-center sm:px-10 sm:py-12">
            <p class="font-mono text-xs font-medium uppercase tracking-wider text-emerald-400">
              <span class="text-emerald-300">$</span> boot portfolio
            </p>
            <p class="mt-4 font-mono text-[10px] uppercase tracking-wide text-slate-500">
              // decode · utf-8
            </p>
            <div class="neo-pressed mx-auto mt-3 rounded-2xl px-4 py-3 sm:px-5 sm:py-4">
              <p class="font-mono text-[11px] text-slate-500 sm:text-xs">binary</p>
              <p class="mt-1 min-h-[1.25rem] font-mono text-sm tracking-[0.2em] text-emerald-300/70 sm:text-base">
                ········
              </p>
            </div>
            <div
              class="loader-title mt-6 min-h-[2.5rem] font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl"
              aria-hidden="true"
            />
            <div class="neo-pressed mx-auto mt-8 h-1.5 w-full overflow-hidden rounded-full">
              <div class="h-full w-[8%] rounded-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-300" />
            </div>
            <p class="mt-4 font-mono text-xs text-slate-400">0% · initializing…</p>
          </div>
        </div>
      </template>
    </ClientOnly>

    <div
      class="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="
        appReady
          ? 'scale-100 opacity-100 blur-0'
          : 'pointer-events-none invisible scale-[0.985] opacity-0 blur-[2px]'
      "
      :aria-hidden="showLoader ? 'true' : undefined"
    >
      <ScrollProgress />
      <AmbientBackground />
      <TheNavbar />
      <main class="relative z-10 min-w-0 overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <StackLogSection />
        <ContactSection />
      </main>
      <TheFooter />
    </div>

    <NuxtRouteAnnouncer />
  </div>
</template>
