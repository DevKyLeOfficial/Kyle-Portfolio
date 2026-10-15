<script setup>
import { site } from '~/data/site'

const { mediaUrl, isVisible, onMediaError } = usePublicMedia()
const introReady = inject('introReady', ref(true))

const { display: helloLine, complete: helloDone } = useTypeIn('Hello World', {
  msPerChar: 62,
  startDelayMs: 350,
  waitUntil: introReady,
})
const { display: roleLine } = useTypewriter(site.roles, { msPerChar: 45, pauseMs: 2000 })

const { formatted: localTime } = useSiteClock(site.timeZone)

const activeBadge = ref(null)
const badgePreviewOpen = ref(false)

function openBadgeCertificate(item) {
  activeBadge.value = item
  badgePreviewOpen.value = true
}

function closeBadgeCertificate() {
  badgePreviewOpen.value = false
  activeBadge.value = null
}
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
                <span class="hero-hello text-gradient-metal inline-block min-h-[1em] min-w-[1ch]" aria-hidden="true"
                  >&nbsp;</span
                >
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
            class="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4"
          >
            <div class="neo-surface flex min-h-[5.25rem] min-w-0 flex-col rounded-2xl px-3 py-3 sm:px-4">
              <dt class="font-mono text-[10px] uppercase tracking-wide text-slate-500">status</dt>
              <dd class="mt-1 flex-1 text-xs font-semibold leading-snug text-emerald-400 sm:text-sm">
                {{ site.availability }}
              </dd>
            </div>
            <div class="neo-surface flex min-h-[5.25rem] min-w-0 flex-col rounded-2xl px-3 py-3 sm:px-4">
              <dt class="font-mono text-[10px] uppercase tracking-wide text-slate-500">role</dt>
              <dd class="mt-1 flex-1 text-xs font-semibold leading-snug text-slate-100 sm:text-sm">
                {{ site.title }}
              </dd>
            </div>
            <div class="neo-surface flex min-h-[5.25rem] min-w-0 flex-col rounded-2xl px-3 py-3 sm:px-4">
              <dt class="font-mono text-[10px] uppercase tracking-wide text-slate-500">location</dt>
              <dd class="mt-1 flex-1 text-xs font-semibold leading-snug text-slate-100 sm:text-sm">
                {{ site.location }}
                <span v-if="localTime" class="mt-0.5 block text-[11px] font-normal text-slate-400 sm:text-xs">
                  {{ localTime }}
                </span>
              </dd>
            </div>
          </dl>

          <div
            v-if="site.badges?.length"
            v-reveal="{ type: 'up', delay: 460 }"
            class="neo-surface mt-4 rounded-2xl px-4 py-4 sm:mt-5"
          >
            <p class="font-mono text-[10px] uppercase tracking-wide text-slate-500">badges</p>
            <p class="mt-1 text-sm leading-snug text-slate-300">
              Verified course credentials — tap a badge to preview the certificate.
            </p>
            <ul class="mt-4 flex flex-wrap gap-4 sm:gap-5">
              <li
                v-for="item in site.badges"
                :key="item.id"
                v-show="isVisible(item.badge)"
                class="min-w-[5.5rem] max-w-[7rem] flex-1 sm:flex-none"
              >
                <button
                  type="button"
                  class="group flex w-full flex-col items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 p-3 transition hover:border-emerald-400/50 hover:bg-slate-900/60"
                  :title="`Verify ${item.title} certificate`"
                  :aria-label="`Verify ${item.title} certificate`"
                  @click="openBadgeCertificate(item)"
                >
                  <span
                    class="flex h-[4.75rem] w-[4.75rem] shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/10"
                  >
                    <img
                      :src="mediaUrl(item.badge)"
                      :alt="`${item.title} badge`"
                      class="h-full w-full object-contain"
                      loading="lazy"
                      @error="onMediaError(item.badge)"
                    />
                  </span>
                  <span class="text-center text-xs font-semibold leading-tight text-slate-100 group-hover:text-emerald-300">
                    {{ item.title }}
                  </span>
                </button>
              </li>
            </ul> 
          </div>
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

    <TDialog
      v-model:visible="badgePreviewOpen"
      :header="activeBadge?.title ?? 'Certificate'"
      width="min(820px, 94vw)"
      :footer="false"
      :close-btn="false"
      @close="closeBadgeCertificate"
    >
      <template v-if="activeBadge">
        <img
          :src="mediaUrl(activeBadge.certificate)"
          :alt="`${activeBadge.title} certificate`"
          class="max-h-[70vh] w-full rounded-2xl object-contain bg-slate-950"
          loading="lazy"
        />
        <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TButton
            theme="primary"
            variant="outline"
            size="medium"
            class="!rounded-xl"
            @click="closeBadgeCertificate"
          >
            Back to badges
          </TButton>
        </div>
      </template>
    </TDialog>
  </section>
</template>
