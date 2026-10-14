<script setup>
import { site } from '~/data/site'

const introReady = inject('introReady', ref(true))

const { display: helloLine, complete: helloDone } = useTypeIn('Hello World', {
  msPerChar: 62,
  startDelayMs: 350,
  waitUntil: introReady,
})
const { display: roleLine } = useTypewriter(site.roles, { msPerChar: 45, pauseMs: 2000 })

const { formatted: localTime } = useSiteClock(site.timeZone)
</script>

<template>
  <section
    id="hero"
    data-scroll-section
    class="scroll-section relative flex min-h-[100svh] flex-col justify-center overflow-x-clip px-4 pb-20 pt-24 sm:px-5 sm:pb-24 sm:pt-28"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.06]"
      aria-hidden="true"
      style="
        background-image: linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
        background-size: 32px 32px;
      "
    />

    <!-- Mobile: intro → visuals → rest. Desktop: left column | code + photo -->
    <div
      class="relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12"
    >
      <div class="hero-left contents min-w-0 lg:block">
        <div class="hero-intro order-1 min-w-0">
          <p
            v-reveal="{ type: 'blur' }"
            class="mb-3 font-mono text-sm text-slate-400"
          >
            <span class="text-emerald-400">$</span> ./run portfolio<span class="animate-pulse text-emerald-300">_</span>
          </p>

          <h1
            v-reveal="{ type: 'up', delay: 60 }"
            class="font-display text-[clamp(2.25rem,9vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-tight break-words"
            aria-label="Hello World"
          >
            <ClientOnly>
              <span
                class="hero-hello text-gradient-metal"
                :class="{ 'hero-hello--done': helloDone }"
              >{{ helloLine }}</span>
              <template #fallback>
                <span class="text-gradient-metal">Hello World</span>
              </template>
            </ClientOnly><span
              class="hero-cursor ml-0.5 inline-block font-mono font-normal text-emerald-400"
              aria-hidden="true"
            >|</span>
          </h1>

          <p
            v-reveal="{ type: 'up', delay: 120 }"
            class="mt-4 font-display text-[clamp(1.35rem,4vw,2.25rem)] font-bold text-slate-200"
          >
            I'm <span class="text-gradient-emerald">{{ site.name }}</span>
          </p>

          <p
            v-reveal="{ type: 'up', delay: 180 }"
            class="mt-2 font-mono text-sm text-emerald-400/90"
          >
            &gt; {{ site.title }}
          </p>
        </div>

        <div class="hero-body order-3 min-w-0 lg:order-none">
          <p
            v-reveal="{ type: 'up', delay: 220 }"
            class="mt-0 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg lg:mt-6"
          >
            {{ site.tagline }}
          </p>

          <p
            v-reveal="{ type: 'up', delay: 280 }"
            class="mt-5 min-h-[2rem] break-words font-mono text-sm text-slate-100 sm:text-base"
          >
            <span class="text-slate-500">const focus =</span>
            "<span class="text-teal-300">{{ roleLine }}</span><span class="animate-pulse text-emerald-400">|</span>"
          </p>

          <div
            v-reveal="{ type: 'up', delay: 340 }"
            class="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center"
          >
            <a
              href="#projects"
              class="btn-metal inline-flex items-center justify-center rounded-xl px-6 py-3 font-mono text-sm font-semibold transition"
            >
              git clone projects
            </a>
            <TButton
              theme="default"
              variant="outline"
              size="large"
              tag="a"
              href="#about"
              class="!rounded-xl !border-white/20 !bg-white/5 !font-mono !text-slate-200 hover:!bg-white/10"
            >
              cat README.md
            </TButton>
          </div>

          <dl
            v-reveal="{ type: 'up', delay: 400 }"
            class="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-3"
          >
            <div class="neo-surface min-w-0 rounded-2xl px-3 py-3 sm:px-4">
              <dt class="font-mono text-[10px] uppercase tracking-wide text-slate-500">status</dt>
              <dd class="mt-1 text-sm font-semibold text-emerald-400">{{ site.availability }}</dd>
            </div>
            <div class="neo-surface min-w-0 rounded-2xl px-3 py-3 sm:px-4">
              <dt class="font-mono text-[10px] uppercase tracking-wide text-slate-500">role</dt>
              <dd class="mt-1 text-sm font-semibold text-slate-100">{{ site.title }}</dd>
            </div>
            <div class="col-span-2 neo-surface min-w-0 rounded-2xl px-3 py-3 sm:col-span-1 sm:px-4">
              <dt class="font-mono text-[10px] uppercase tracking-wide text-slate-500">location</dt>
              <dd class="mt-1 text-sm font-semibold text-slate-100">
                {{ site.location }}
                <span v-if="localTime" class="mt-0.5 block text-xs font-normal text-slate-400">{{ localTime }}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        class="hero-aside order-2 flex min-w-0 w-full max-w-full flex-col gap-5 sm:gap-6 lg:order-none lg:max-w-none"
      >
        <HeroProfilePhoto
          :visible="introReady"
          class="mx-auto w-full max-w-[min(100%,20rem)] sm:max-w-sm lg:max-w-none"
        />
        <HeroCodePanel />
      </div>
    </div>
  </section>
</template>
