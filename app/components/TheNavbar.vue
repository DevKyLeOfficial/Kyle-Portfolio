<script setup>
import { site } from '~/data/site'

const mobileOpen = ref(false)
const scrolled = ref(false)
const navHidden = ref(false)

const lenis = inject('lenis', null)

let lastScrollY = 0
let lenisScrollHandler = null

const HIDE_AFTER_Y = 72
const SCROLL_DELTA = 6

function updateNavScroll(currentY) {
  scrolled.value = currentY > 12

  if (mobileOpen.value || currentY < HIDE_AFTER_Y) {
    navHidden.value = false
    lastScrollY = currentY
    return
  }

  const delta = currentY - lastScrollY
  if (Math.abs(delta) < SCROLL_DELTA) return

  navHidden.value = delta > 0
  lastScrollY = currentY
}

function onWindowScroll() {
  updateNavScroll(window.scrollY)
}

onMounted(() => {
  if (typeof window === 'undefined') return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  onWindowScroll()

  if (reduced) {
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    return
  }

  if (lenis?.on) {
    lenisScrollHandler = ({ scroll }) => updateNavScroll(scroll)
    lenis.on('scroll', lenisScrollHandler)
  }

  window.addEventListener('scroll', onWindowScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onWindowScroll)
  if (lenis?.off && lenisScrollHandler) {
    lenis.off('scroll', lenisScrollHandler)
  }
})

watch(mobileOpen, (open) => {
  if (open) navHidden.value = false
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
    class="nav-shell fixed left-0 right-0 top-0 z-50 px-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
    :class="[
      scrolled ? 'pt-2' : 'pt-3',
      navHidden ? 'nav-shell--hidden pointer-events-none' : 'nav-shell--visible',
    ]"
  >
    <div class="mx-auto max-w-6xl px-3 sm:px-4">
      <div
        class="nav-bar flex min-h-[52px] items-center justify-between gap-2 rounded-2xl px-3 py-2 transition-[background-color,border-color,box-shadow,opacity] duration-300 sm:gap-3 sm:px-4 sm:py-2.5"
        :class="scrolled ? 'nav-bar--scrolled' : 'nav-bar--top'"
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
