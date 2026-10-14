<script setup>
import { site } from '~/data/site'

const { mediaUrl, isVisible, onMediaError } = usePublicMedia()

const aboutFailed = ref(false)

const aboutSrc = computed(() => {
  const src = site.media?.about
  if (!src) return null
  if (typeof src === 'string' && src.startsWith('/uploads/')) return mediaUrl(src)
  return src
})

const aboutAlt = computed(() => site.media?.aboutAlt || site.name)

const showAboutPhoto = computed(() => {
  if (!aboutSrc.value || aboutFailed.value) return false
  const raw = site.media?.about
  if (typeof raw === 'string' && raw.startsWith('/uploads/')) {
    return isVisible(raw)
  }
  return true
})
</script>

<template>
  <!-- No scroll-section parallax here — it blurs photos on many browsers -->
  <section id="about" class="relative px-5 py-24 sm:py-28">
    <div class="mx-auto max-w-6xl space-y-10">
      <SectionHeading tag="// about.md" title="Who is Kyle?" />

      <div class="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-8 lg:gap-10">
        <div
          data-scroll-section
          class="scroll-section glass liquid-border space-y-6 rounded-3xl p-8 sm:p-10"
        >
          <p
            v-for="(para, i) in site.about"
            :key="i"
            v-reveal="{ type: 'up', delay: i * 80 }"
            class="text-base leading-relaxed text-slate-400"
          >
            {{ para }}
          </p>
        </div>

        <aside
          v-reveal="{ type: 'up', delay: 120 }"
          data-scroll-section
          class="scroll-section neo-surface flex min-h-full flex-col justify-center gap-6 rounded-3xl p-8 sm:p-10"
        >
          <h3 class="font-mono text-base font-bold text-emerald-400">dev.stats</h3>
          <ul class="space-y-4 font-mono text-sm leading-relaxed text-slate-300 sm:text-base">
            <li class="flex gap-3">
              <span class="mt-0.5 shrink-0 text-emerald-500">✓</span>
              <span>Clean, maintainable codebases</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-0.5 shrink-0 text-emerald-500">✓</span>
              <span>Git workflow &amp; code reviews</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-0.5 shrink-0 text-emerald-500">✓</span>
              <span>Debug → fix → ship cycle</span>
            </li>
          </ul>
        </aside>
      </div>

      <figure
        v-if="site.media?.about"
        class="about-photo-wrap neo-surface mx-auto w-full max-w-[854px] overflow-hidden rounded-3xl p-2 shadow-glass"
      >
        <div class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
          <img
            v-if="showAboutPhoto"
            :src="aboutSrc"
            :alt="aboutAlt"
            class="about-photo-img block h-auto w-full max-w-full"
            width="854"
            height="481"
            sizes="(max-width: 854px) 100vw, 854px"
            loading="lazy"
            decoding="async"
            @error="aboutFailed = true"
          />
          <div
            v-else
            class="flex min-h-[200px] items-center justify-center px-4 text-center font-mono text-xs text-slate-500"
          >
            Replace app/assets/media/who.jpg
          </div>
        </div>
        <figcaption
          class="flex flex-col gap-1 px-3 pb-2 pt-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="font-mono text-xs leading-relaxed text-slate-500">
            <span class="text-emerald-400/90">//</span>
            {{ site.media?.aboutCaption || 'Collaborating, brainstorming, and mentoring with college students' }}
          </p>
          <p class="font-mono text-[11px] text-slate-600">
            {{ site.media?.aboutCaptionOrg || 'ACATECH Aviation College' }}
          </p>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
