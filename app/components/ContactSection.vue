<script setup>
import { site } from '~/data/site'

const { mediaUrl, onMediaError } = usePublicMedia()
const notify = useNotify()
const copied = ref(false)
const bgFailed = ref(false)

const contactImage = computed(() => site.contact?.image ?? '')
const bgUrl = computed(() => (contactImage.value ? mediaUrl(contactImage.value) : ''))
const showBg = computed(() => Boolean(bgUrl.value && !bgFailed.value))

async function copyEmail() {
  const text = site.email
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    copied.value = true
    notify.success('Email copied to clipboard')
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch {
    notify.warning('Copy failed — select the address and copy manually.')
  }
}

function onBgError() {
  bgFailed.value = true
  if (contactImage.value) onMediaError(contactImage.value)
}
</script>

<template>
  <section
    id="contact"
    data-scroll-section
    class="scroll-section relative min-h-[32rem] overflow-hidden px-5 py-24 sm:min-h-[36rem] sm:py-32"
  >
    <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <img
        v-if="showBg"
        :src="bgUrl"
        alt=""
        class="absolute inset-0 h-full min-h-full w-full object-cover object-center"
        loading="eager"
        @error="onBgError"
      />
      <div
        v-if="showBg"
        class="absolute inset-0 bg-[#071018]/25"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#071018]/75 from-0% via-[#071018]/15 via-45% to-[#071018]/80"
      />
      <div
        v-if="showBg"
        class="absolute inset-0 backdrop-blur-[1px]"
      />
    </div>

    <div class="relative z-10 mx-auto max-w-6xl">
      <SectionHeading tag="// contact — EOF" title="Start a conversation" />

      <div
        v-reveal="{ type: 'zoom' }"
        class="liquid-border glass-strong mx-auto max-w-2xl rounded-[2rem] border border-white/15 bg-slate-950/55 p-8 text-center shadow-glass-lg backdrop-blur-md sm:p-12"
      >
        <p class="text-base leading-relaxed text-slate-300">
          {{ site.contact?.intro || 'Have a project in mind or want to collaborate? Reach out by email anytime.' }}
        </p>

        <a
          :href="`mailto:${site.email}`"
          class="mt-8 inline-block font-mono text-lg font-medium text-emerald-400 underline-offset-4 transition hover:text-emerald-300 hover:underline sm:text-xl"
        >
          {{ site.email }}
        </a>

        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            :href="`mailto:${site.email}`"
            class="nav-cta inline-flex min-h-[44px] items-center justify-center px-6 py-3"
          >
            Email me
          </a>
          <button
            type="button"
            class="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-100 transition hover:bg-white/15"
            @click="copyEmail"
          >
            {{ copied ? 'Copied ✓' : 'Copy email' }}
          </button>
        </div>

        <PortfolioInstallPanel />

        <div
          v-if="site.github || site.linkedin"
          class="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 text-sm font-medium"
        >
          <a
            v-if="site.github"
            :href="site.github"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono text-slate-300 transition hover:text-emerald-400"
          >
            GitHub
          </a>
          <span v-if="site.github && site.linkedin" class="text-slate-600">·</span>
          <a
            v-if="site.linkedin"
            :href="site.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono text-slate-300 transition hover:text-emerald-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
