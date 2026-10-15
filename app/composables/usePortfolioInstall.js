import { site } from '~/data/site'

/** Installer: PWA on desktop; PWA then verified APK on Android only. */
export function usePortfolioInstall() {
  const { mediaUrl } = usePublicMedia()
  const nuxtApp = useNuxtApp()
  const notify = useNotify()

  const canInstall = ref(false)
  const isInstalled = ref(false)

  const apkUrl = computed(() => mediaUrl(site.pwa?.apkPath ?? ''))

  let pollId = null

  function tick() {
    const pwa = nuxtApp.$pwa
    if (!pwa) return
    canInstall.value = Boolean(pwa.showInstallPrompt)
    isInstalled.value = Boolean(pwa.isPWAInstalled)
  }

  onMounted(() => {
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

  async function apkLooksValid(url) {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (!res.ok) return false
      const type = (res.headers.get('content-type') || '').toLowerCase()
      const len = Number(res.headers.get('content-length') || 0)
      if (type.includes('text/html')) return false
      return len > 50_000
    } catch {
      return false
    }
  }

  async function runInstaller() {
    if (isInstalled.value) return

    if (canInstall.value) {
      try {
        await promptInstall()
      } catch {
        notify.warning('Install cancelled.')
      }
      return
    }

    const isAndroid = /android/i.test(navigator.userAgent || '')

    if (!isAndroid) {
      notify.warning(
        'Use Chrome or Edge on this PC: click the install (⊕) icon in the address bar. This button does not download a Windows app.',
      )
      return
    }

    const url = apkUrl.value
    if (!url) return

    if (!(await apkLooksValid(url))) {
      notify.warning(
        'Package not on the server yet. Use Chrome menu → Install app, or try again after the site deploy finishes.',
      )
      return
    }

    window.location.assign(url)
  }

  return {
    canInstall,
    isInstalled,
    runInstaller,
  }
}
