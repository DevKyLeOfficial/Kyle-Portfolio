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

const items = computed(() => {
  const list = (site.certificates ?? []).map((cert, index) => ({ cert, index }))
  list.sort((a, b) => sortKey(a.cert, a.index) - sortKey(b.cert, b.index))
  return list.map(({ cert }) => cert)
})

function hasImage(cert) {
  return Boolean(cert.image && isVisible(cert.image))
}

function openPreview(cert) {
  if (!hasImage(cert)) return
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
    v-if="items.length"
    id="certificates"
    data-scroll-section
    class="scroll-section relative px-5 py-24 sm:py-28"
  >
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        tag="// certs/"
        :title="`Credentials (${items.length})`"
      />

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article
          v-for="(cert, i) in items"
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
            <h3 class="mt-2 font-display text-lg font-bold text-slate-100">{{ cert.title }}</h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
              {{ cert.description }}
            </p>
            <TButton
              v-if="hasImage(cert)"
              size="small"
              theme="primary"
              variant="outline"
              class="mt-4 !rounded-lg"
              @click="openPreview(cert)"
            >
              Preview
            </TButton>
          </div>
        </article>
      </div>
    </div>

    <TDialog
      v-model:visible="previewOpen"
      :header="preview?.title"
      width="min(820px, 94vw)"
      :footer="false"
      @close="closePreview"
    >
      <img
        v-if="preview && hasImage(preview)"
        :src="mediaUrl(preview.image)"
        :alt="preview.title"
        class="max-h-[70vh] w-full rounded-2xl object-contain bg-slate-950"
      />
    </TDialog>
  </section>
</template>
