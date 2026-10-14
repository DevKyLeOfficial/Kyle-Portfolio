<script setup>
import { site } from '~/data/site'

const { mediaUrl, isVisible, onMediaError } = usePublicMedia()
const active = ref(null)
const dialogOpen = ref(false)

function openProject(project) {
  active.value = project
  dialogOpen.value = true
}

function closeDialog() {
  dialogOpen.value = false
  active.value = null
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
            <div class="mt-6 flex gap-3">
              <TButton size="medium" theme="primary" variant="outline" class="!rounded-xl" @click="openProject(project)">
                Details
              </TButton>
              <TButton
                v-if="project.link && project.link !== '#'"
                size="medium"
                tag="a"
                :href="project.link"
                target="_blank"
                rel="noopener"
                theme="default"
                variant="text"
                class="!text-emerald-400"
              >
                Visit ↗
              </TButton>
            </div>
          </div>
        </article>
      </div>
    </div>

    <TDialog
      v-model:visible="dialogOpen"
      :header="active?.name"
      width="520px"
      :footer="false"
      @close="closeDialog"
    >
      <template v-if="active">
        <img
          v-if="isVisible(active.image)"
          :src="mediaUrl(active.image)"
          :alt="active.name"
          class="mb-4 max-h-48 w-full rounded-2xl object-cover"
          @error="onMediaError(active.image)"
        />
        <p class="text-sm leading-relaxed text-slate-400">{{ active.summary }}</p>
        <TDivider class="!my-4" />
        <p class="text-xs font-semibold uppercase text-slate-400">Stack</p>
        <div class="mt-2 flex flex-wrap gap-2">
          <TTag v-for="t in active.stack" :key="t" size="small">{{ t }}</TTag>
        </div>
      </template>
    </TDialog>
  </section>
</template>
