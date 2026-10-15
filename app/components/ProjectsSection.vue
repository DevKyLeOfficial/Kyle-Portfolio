<script setup>
import { site } from '~/data/site'

const { mediaUrl, isVisible, onMediaError } = usePublicMedia()

const floatOpen = ref(false)
const floatProject = ref(null)
const floatMode = ref('play')

const floatTitle = computed(() => {
  if (!floatProject.value) return ''
  if (floatMode.value === 'github') return `${floatProject.value.name} — GitHub`
  return floatProject.value.button?.label
    ? `${floatProject.value.name} — ${floatProject.value.button.label}`
    : floatProject.value.name
})

const floatIframeSrc = computed(() => {
  if (!floatOpen.value || !floatProject.value) return ''
  if (floatMode.value === 'play' && floatProject.value.button?.url) {
    return floatProject.value.button.url
  }
  return ''
})

const floatExternalUrl = computed(() => {
  if (!floatProject.value) return ''
  if (floatMode.value === 'github') return floatProject.value.github || ''
  return floatProject.value.button?.url || ''
})

const floatExternalLabel = computed(() =>
  floatMode.value === 'github' ? 'Open repository ↗' : 'Open in new tab ↗',
)

function openPlayModal(project) {
  if (!project.button?.url) return
  floatProject.value = project
  floatMode.value = 'play'
  floatOpen.value = true
}

function openGithubModal(project) {
  if (!project.github) return
  floatProject.value = project
  floatMode.value = 'github'
  floatOpen.value = true
}

function closeFloatModal() {
  floatOpen.value = false
  floatProject.value = null
}
</script>

<template>
  <section id="projects" data-scroll-section class="scroll-section relative px-5 py-24 sm:py-28">
    <div class="mx-auto max-w-6xl">
      <SectionHeading tag="// projects/" title="Repositories & builds" />

      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="(project, i) in site.projects"
          :key="project.id"
          v-reveal="{ type: i % 2 ? 'right' : 'left', delay: i * 60 }"
          class="liquid-border glass group overflow-hidden rounded-3xl transition hover:shadow-glass-lg"
        >
          <div
            v-if="isVisible(project.image)"
            class="relative aspect-[16/10] overflow-hidden"
          >
            <img
              :src="mediaUrl(project.image)"
              :alt="`${project.name} preview`"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              @error="onMediaError(project.image)"
            />
          </div>
          <div v-else class="neo-pressed m-4 flex aspect-[16/10] items-center justify-center rounded-2xl">
            <span class="text-sm text-slate-400">Add screenshot in uploads/projects</span>
          </div>

          <div class="p-6 sm:p-8">
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              {{ project.tag }} · {{ project.year }}
            </p>
            <h3 class="mt-2 font-display text-xl font-bold text-slate-100 group-hover:text-emerald-400">
              {{ project.name }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-slate-400">
              {{ project.summary }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <TTag
                v-for="t in project.stack"
                :key="t"
                size="small"
                variant="light"
                class="!rounded-lg !border !border-white/20 !bg-white/10 !text-xs !text-slate-400"
              >
                {{ t }}
              </TTag>
            </div>
            <div
              v-if="project.button?.url || project.github"
              class="mt-6 flex flex-wrap items-center gap-3"
            >
              <button
                v-if="project.button?.url"
                type="button"
                class="btn-metal inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-mono text-sm font-semibold transition"
                @click="openPlayModal(project)"
              >
                {{ project.button.label || 'Open' }}
              </button>
              <button
                v-if="project.github"
                type="button"
                class="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-sm font-semibold text-slate-200 transition hover:border-emerald-400/40 hover:bg-white/10 hover:text-emerald-300"
                @click="openGithubModal(project)"
              >
                GitHub
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <ProjectFloatModal
      v-model:open="floatOpen"
      :title="floatTitle"
      :iframe-src="floatIframeSrc"
      :external-url="floatExternalUrl"
      :external-label="floatExternalLabel"
      @close="closeFloatModal"
    />
  </section>
</template>
