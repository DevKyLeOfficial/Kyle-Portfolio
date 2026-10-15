<script setup>
import { site } from '~/data/site'

const groups = computed(() => {
  const defs = site.skillGroups ?? [
    { key: 'languages', label: 'Languages' },
    { key: 'frameworks', label: 'Frameworks & libraries' },
    { key: 'tools', label: 'Tools' },
    { key: 'focus', label: 'Focus areas' },
  ]
  return defs.filter((g) => (site.skills?.[g.key]?.length ?? 0) > 0)
})
</script>

<template>
  <section id="skills" data-scroll-section class="scroll-section relative px-5 py-24 sm:py-28">
    <div class="mx-auto max-w-6xl">
      <SectionHeading tag="// skills.json" title="Tech stack" />

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(group, gi) in groups"
          :key="group.key"
          v-reveal="{ type: 'up', delay: gi * 70 }"
          class="neo-surface group rounded-3xl p-6 transition hover:shadow-glass"
          :class="{ 'sm:col-span-2 lg:col-span-3': group.key === 'learning' }"
        >
          <h3 class="font-display text-base font-bold text-slate-100">
            {{ group.label }}
          </h3>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="skill in site.skills[group.key]" :key="skill">
              <TTag
                size="small"
                variant="light"
                class="!rounded-lg !border !border-white/20 !bg-white/10 !text-xs !text-slate-400"
                :class="{
                  '!border-emerald-400/30 !text-emerald-300/90': group.key === 'learning',
                }"
              >
                {{ skill }}
              </TTag>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
