<script setup>
import { site } from '~/data/site'

const notify = useNotify()
const copied = ref(false)

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
</script>

<template>
  <section id="contact" data-scroll-section class="scroll-section relative px-5 py-24 sm:py-32">
    <div class="relative mx-auto max-w-6xl">
      <SectionHeading tag="// contact — EOF" title="Start a conversation" />

      <div
        v-reveal="{ type: 'zoom' }"
        class="liquid-border glass-strong mx-auto max-w-2xl rounded-[2rem] p-8 text-center sm:p-12"
      >
        <p class="text-base leading-relaxed text-slate-300">
          Have a project in mind or want to collaborate? Reach out by email anytime.
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

        <div class="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 text-sm font-medium">
          <a
            :href="site.github"
            target="_blank"
            rel="noopener"
            class="font-mono text-slate-300 transition hover:text-emerald-400"
          >
            GitHub
          </a>
          <span class="text-slate-600">·</span>
          <a
            :href="site.linkedin"
            target="_blank"
            rel="noopener"
            class="font-mono text-slate-300 transition hover:text-emerald-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
