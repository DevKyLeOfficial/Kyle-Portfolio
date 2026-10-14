<script setup>
import { site } from '~/data/site'

defineProps({
  visible: { type: Boolean, default: true },
})

const { mediaUrl } = usePublicMedia()
const profileFailed = ref(false)
const profileSrc = computed(() => mediaUrl(site.media?.profile))

const objectPosition = computed(
  () => site.media?.profilePosition || 'center 20%',
)
</script>

<template>
  <figure
    v-if="profileSrc"
    class="hero-profile"
    :class="{ 'hero-profile--visible': visible }"
  >
    <div class="liquid-border glass-strong overflow-hidden rounded-2xl p-2 shadow-glass-lg">
      <div class="hero-profile-frame">
        <img
          v-if="!profileFailed"
          :src="profileSrc"
          :alt="site.media.profileAlt || site.name"
          class="hero-profile-img"
          :style="{ objectPosition }"
          width="400"
          height="320"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          @error="profileFailed = true"
        />
        <div
          v-else
          class="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 bg-slate-900/60 px-4 text-center"
        >
          <p class="font-mono text-xs text-slate-400">Image not found</p>
        </div>
      </div>
    </div>
  </figure>
</template>
