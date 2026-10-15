import { site } from '~/data/site'

/** Installer: PWA prompt when ready; APK only on Android when hosted. */
export function usePortfolioInstall() {
  const { mediaUrl } = usePublicMedia()
  const nuxtApp = useNuxtApp()
  const notify = useNotify()
  const runtimeConfig = useRuntimeConfig()

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

  function manifestHref() {
    const base = runtimeConfig.app?.baseURL || '/'
    const root = base.endsWith('/') ? base : `${base}/`
    return `${root}manifest.webmanifest`.replace(/\/{2,}/g, '/')
  }

  async function pwaAssetsReady() {
    try {
      const res = await fetch(manifestHref(), { cache: 'no-store' })
      const type = (res.headers.get('content-type') || '').toLowerCase()
      return res.ok && (type.includes('json') || type.includes('manifest'))
    } catch {
      return false
    }
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

    tick()
    if (canInstall.value) {
      try {
        await promptInstall()
      } catch {
        notify.warning('Install cancelled.')
      }
      return
    }

    if (!(await pwaAssetsReady())) {
      notify.warning(
        'Install files are missing on this deploy. Redeploy with the latest code, then open the site at your Vercel URL (root /, not /Kyle-Portfolio/).',
      )
      return
    }

    const isAndroid = /android/i.test(navigator.userAgent || '')

    if (!isAndroid) {
      notify.warning(
        'Open this site in Chrome or Edge, then use ⋮ → Install Kyle | Portfolio, or the install icon in the address bar when it appears.',
      )
      return
    }

    const url = apkUrl.value
    if (!url) return

    if (!(await apkLooksValid(url))) {
      notify.warning('Use Chrome → Install app, or try again after deploy finishes.')
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
