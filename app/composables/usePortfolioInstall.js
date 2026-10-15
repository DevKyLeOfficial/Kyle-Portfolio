import { site } from '~/data/site'

/** PWA install prompt + APK download URL (respects GitHub Pages baseURL). */
export function usePortfolioInstall() {
  const { mediaUrl } = usePublicMedia()
  const nuxtApp = useNuxtApp()

  const canInstall = ref(false)
  const isInstalled = ref(false)
  const isIos = ref(false)
  const isAndroid = ref(false)

  const apkUrl = computed(() => mediaUrl(site.pwa?.apkPath ?? ''))
  const displayName = computed(() => site.pwa?.displayName ?? 'Kyle | Portfolio')

  let pollId = null

  function tick() {
    const pwa = nuxtApp.$pwa
    if (!pwa) return
    canInstall.value = Boolean(pwa.showInstallPrompt)
    isInstalled.value = Boolean(pwa.isPWAInstalled)
  }

  onMounted(() => {
    const ua = navigator.userAgent || ''
    isIos.value = /iphone|ipad|ipod/i.test(ua)
    isAndroid.value = /android/i.test(ua)
    tick()
    pollId = window.setInterval(tick, 800)
    window.addEventListener('appinstalled', tick)
  })

  onUnmounted(() => {
    if (pollId) window.clearInterval(pollId)
    window.removeEventListener('appinstalled', tick)
  })

  async function promptInstall() {
    const pwa = nuxtApp.$pwa
    if (pwa?.install) await pwa.install()
  }

  return {
    apkUrl,
    displayName,
    canInstall,
    isInstalled,
    isIos,
    isAndroid,
    promptInstall,
    installHint: site.pwa?.installHint,
    iosHint: site.pwa?.iosHint,
    apkFileName: site.pwa?.apkFileName ?? 'Kyle-Portfolio.apk',
  }
}
