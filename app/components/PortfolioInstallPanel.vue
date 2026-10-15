<script setup>
const { mediaUrl } = usePublicMedia()
const iconUrl = computed(() => mediaUrl('/pwa/icon-192.png'))

const {
  apkUrl,
  displayName,
  canInstall,
  isInstalled,
  isIos,
  isAndroid,
  promptInstall,
  installHint,
  iosHint,
  apkFileName,
} = usePortfolioInstall()

const notify = useNotify()

async function onInstallClick() {
  try {
    await promptInstall()
  } catch {
    notify.warning('Install was cancelled or is not available in this browser.')
  }
}
</script>

<template>
  <div
    v-reveal="{ type: 'fade-up' }"
    class="liquid-border mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6 text-left sm:p-8"
  >
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <img
        :src="iconUrl"
        alt=""
        width="64"
        height="64"
        class="mx-auto h-16 w-16 shrink-0 rounded-2xl shadow-lg ring-1 ring-white/10 sm:mx-0"
        loading="lazy"
      />
      <div class="min-w-0 flex-1 text-center sm:text-left">
        <p class="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400/90">
          // install
        </p>
        <h3 class="mt-1 font-display text-lg font-semibold text-slate-100">
          {{ displayName }}
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-400">
          {{ installHint }}
        </p>
        <p v-if="isIos && iosHint" class="mt-2 text-xs text-slate-500">
          {{ iosHint }}
        </p>
      </div>
    </div>

    <div class="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
      <button
        v-if="canInstall && !isInstalled"
        type="button"
        class="nav-cta inline-flex min-h-[44px] items-center justify-center px-6 py-3"
        @click="onInstallClick"
      >
        Install app
      </button>
      <p
        v-else-if="isInstalled"
        class="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300"
      >
        Installed on this device
      </p>
      <button
        v-else-if="!isIos"
        type="button"
        disabled
        class="inline-flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500"
        title="Use Chrome or Edge on desktop/Android for Install app"
      >
        Install (use Chrome / Edge)
      </button>

      <a
        v-if="isAndroid || !isIos"
        :href="apkUrl"
        :download="apkFileName"
        class="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-100 transition hover:bg-white/15"
      >
        Download APK (Android)
      </a>
    </div>
  </div>
</template>
