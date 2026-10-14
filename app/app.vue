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
      <TheLoader v-if="showLoader" word="Hello World" @done="onLoaderDone" />
      <template #fallback>
        <div
          class="loader-screen fixed inset-0 z-[100] flex items-center justify-center bg-aurora"
          role="status"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <div class="liquid-border glass-strong w-[min(360px,88vw)] rounded-3xl px-10 py-12 text-center">
            <p class="font-mono text-xs uppercase tracking-wider text-emerald-400">$ boot portfolio</p>
            <h2 class="mt-4 font-display text-3xl font-bold text-gradient-metal">Hello World</h2>
            <div class="neo-pressed mx-auto mt-8 h-1.5 w-full overflow-hidden rounded-full">
              <div class="h-full w-1/3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-300 animate-pulse" />
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>

    <div
      class="transition-opacity duration-500 ease-out"
      :class="appReady ? 'opacity-100' : 'pointer-events-none opacity-0'"
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
