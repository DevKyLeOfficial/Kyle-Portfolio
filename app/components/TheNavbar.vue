<script setup>
import { site } from '~/data/site'

const mobileOpen = ref(false)
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function closeDrawer() {
  mobileOpen.value = false
}

const logoName = computed(() => site.name.split(' ')[0])

/** Desktop row: links only; Contact stays the high-contrast CTA. */
const navMain = computed(() => site.nav.filter((item) => item.id !== 'contact'))
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 z-50 transition-[padding] duration-300"
    :class="scrolled ? 'pt-2' : 'pt-3'"
  >
    <div class="mx-auto max-w-6xl px-3 sm:px-4">
      <div
        class="nav-bar flex min-h-[52px] items-center justify-between gap-2 rounded-2xl px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5"
        :class="scrolled ? 'nav-bar--scrolled' : ''"
      >
        <a href="#" class="nav-logo flex items-center gap-0.5 truncate">
          <span class="nav-logo__prompt">&lt;</span>
          <span>{{ logoName }}</span>
          <span class="nav-logo__prompt">/&gt;</span>
        </a>

        <nav class="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
          <a
            v-for="item in navMain"
            :key="item.id"
            :href="`#${item.id}`"
            class="nav-link whitespace-nowrap"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <a href="#contact" class="nav-cta hidden sm:inline-flex">
            Contact
          </a>

          <button
            type="button"
            class="nav-burger lg:hidden"
            aria-label="Open navigation menu"
            :aria-expanded="mobileOpen"
            @click="mobileOpen = true"
          >
            <span class="flex flex-col gap-1.5" aria-hidden="true">
              <span class="nav-burger__line" />
              <span class="nav-burger__line" />
              <span class="nav-burger__line" />
            </span>
          </button>
        </div>
      </div>
    </div>

    <TDrawer
      v-model:visible="mobileOpen"
      placement="right"
      size="min(100%, 320px)"
      :footer="false"
      drawer-class-name="nav-drawer"
      attach="body"
    >
      <template #header>
        <span class="font-mono text-sm font-semibold uppercase tracking-wider text-slate-100">
          <span class="text-emerald-400">$</span> ./menu.sh
        </span>
      </template>

      <nav class="flex flex-col gap-2.5 pt-1" aria-label="Mobile">
        <a
          v-for="item in site.nav"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav-drawer-link"
          @click="closeDrawer"
        >
          <span class="text-emerald-400/90">→</span>
          {{ item.label }}
        </a>

      </nav>
    </TDrawer>
  </header>
</template>
