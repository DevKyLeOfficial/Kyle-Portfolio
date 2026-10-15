<script setup>
import { site } from '~/data/site'

const { mediaUrl, isVisible, onMediaError } = usePublicMedia()
const preview = ref(null)
const previewOpen = ref(false)

function sortKey(cert, index) {
  if (typeof cert.order === 'number' && !Number.isNaN(cert.order)) {
    return cert.order
  }
  const path = cert.image || ''
  const numbered = path.match(/\/(\d+)\.(png|jpe?g|webp)$/i)
  if (numbered) return Number(numbered[1])
  return index + 1
}

const sortedCerts = computed(() => {
  const list = (site.certificates ?? []).map((cert, index) => ({ cert, index }))
  list.sort((a, b) => sortKey(a.cert, a.index) - sortKey(b.cert, b.index))
  return list.map(({ cert }) => cert)
})

const groupedSections = computed(() => {
  const byGroup = new Map()
  for (const cert of sortedCerts.value) {
    const key = cert.group || 'others'
    if (!byGroup.has(key)) byGroup.set(key, [])
    byGroup.get(key).push(cert)
  }

  const defs = site.certificateGroups ?? [{ id: 'others', title: 'Others' }]
  return defs
    .filter((g) => byGroup.has(g.id) && byGroup.get(g.id).length > 0)
    .map((g) => ({
      ...g,
      items: byGroup.get(g.id),
    }))
})

const totalCount = computed(() => sortedCerts.value.length)

function hasImage(cert) {
  return Boolean(cert.image && isVisible(cert.image))
}

function openPreview(cert) {
  if (!cert?.image) return
  preview.value = cert
  previewOpen.value = true
}

function closePreview() {
  previewOpen.value = false
  preview.value = null
}
</script>

<template>
  <section
    v-if="totalCount"
    id="certificates"
    data-scroll-section
    class="scroll-section relative px-5 py-24 sm:py-28"
  >
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        tag="// certs/"
        :title="`Credentials (${totalCount})`"
      />

      <div
        v-for="(section, sectionIndex) in groupedSections"
        :key="section.id"
        class="cert-group"
        :class="{ 'mt-14 sm:mt-16': sectionIndex > 0 }"
      >
        <TDivider v-if="sectionIndex > 0" class="!mb-8 !border-white/15" />

        <header
          v-reveal="{ type: 'up', delay: 40 }"
          class="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4"
        >
          <div>
            <p class="font-mono text-xs text-emerald-400/90">// {{ section.id }}/</p>
            <h3 class="font-display text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
              {{ section.title }}
            </h3>
          </div>
          <p class="font-mono text-xs text-slate-500">
            {{ section.items.length }} certificate{{ section.items.length === 1 ? '' : 's' }}
          </p>
        </header>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <article
            v-for="(cert, i) in section.items"
            :key="cert.id"
            v-reveal="{ type: 'up', delay: Math.min(i * 45, 360) }"
            class="neo-surface flex flex-col overflow-hidden rounded-3xl transition hover:shadow-glass"
          >
            <button
              type="button"
              class="group relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-slate-900/80 text-left"
              :disabled="!cert.image"
              @click="openPreview(cert)"
            >
              <img
                v-if="hasImage(cert)"
                :src="mediaUrl(cert.image)"
                :alt="cert.title"
                class="h-full w-full object-contain bg-slate-950 p-1 transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                @error="onMediaError(cert.image)"
              />
              <div
                v-else
                class="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-xs text-slate-400"
              >
                <span
                  class="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-900 font-mono text-sm font-bold text-emerald-400"
                >
                  {{ cert.order ?? '?' }}
                </span>
                <span class="text-slate-500">Add image</span>
                <span class="font-mono text-[10px] text-slate-500">
                  public/uploads/Certificates/
                </span>
              </div>
            </button>

            <div class="flex flex-1 flex-col p-5">
              <p class="text-xs font-semibold text-emerald-400">
                <span class="font-mono text-slate-500">#{{ cert.order }}</span>
                · {{ cert.issuer }} · {{ cert.issued }}
              </p>
              <h4 class="mt-2 font-display text-lg font-bold text-slate-100">{{ cert.title }}</h4>
              <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                {{ cert.description }}
              </p>
              <button
                v-if="cert.image"
                type="button"
                class="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
                @click.stop="openPreview(cert)"
              >
                Preview
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>

    <MediaPreviewDialog
      v-model:open="previewOpen"
      :title="preview?.title ?? 'Certificate'"
      :image-src="preview?.image ? mediaUrl(preview.image) : ''"
      :image-alt="preview?.title"
      @close="closePreview"
    />
  </section>
</template>
