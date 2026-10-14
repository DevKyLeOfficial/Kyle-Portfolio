<script setup>
import { site } from '~/data/site'

/** Split timeline copy on ` | ` into separate bullet lines. */
function eventLines(event) {
  if (!event || typeof event !== 'string') return []
  return event
    .split(/\s*\|\s*/)
    .map((line) => line.replace(/<\/?br\s*\/?>/gi, ' ').trim())
    .filter(Boolean)
}

/** e.g. "2025 - Present" → year line + "Present" below for aligned bullet columns. */
function timeParts(time) {
  if (!time || typeof time !== 'string') return { primary: '', secondary: '' }
  const present = time.match(/^(.+?)\s*-\s*Present$/i)
  if (present) {
    return { primary: `${present[1].trim()} -`, secondary: 'Present' }
  }
  return { primary: time.trim(), secondary: '' }
}
</script>

<template>
  <section id="stack" data-scroll-section class="scroll-section relative px-5 py-24 sm:py-28">
    <div class="mx-auto max-w-6xl">
      <SectionHeading tag="// git log" title="Career timeline" />

      <ol class="space-y-4">
        <li
          v-for="(entry, i) in site.stackLog"
          :key="`${entry.time}-${i}`"
          v-reveal="{ type: 'left', delay: i * 90 }"
          class="glass liquid-border grid gap-3 rounded-2xl px-6 py-5 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:items-start sm:gap-8"
        >
          <time
            class="flex shrink-0 flex-col font-display text-lg font-bold leading-tight text-emerald-400"
          >
            <span>{{ timeParts(entry.time).primary }}</span>
            <span v-if="timeParts(entry.time).secondary">{{ timeParts(entry.time).secondary }}</span>
          </time>
          <div class="min-w-0">
            <ul
              v-if="eventLines(entry.event).length > 1"
              class="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-400 marker:text-emerald-400 sm:text-base"
            >
              <li v-for="(line, j) in eventLines(entry.event)" :key="j">
                {{ line }}
              </li>
            </ul>
            <p
              v-else
              class="text-sm leading-relaxed text-slate-400 sm:text-base"
            >
              {{ eventLines(entry.event)[0] ?? entry.event }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
