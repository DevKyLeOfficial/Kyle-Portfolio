/** Captures beforeinstallprompt and exposes reactive $pwa for the install panel. */
export default defineNuxtPlugin(() => {
  const state = reactive({
    showInstallPrompt: false,
    isPWAInstalled: false,
    _deferred: null,
  })

  function syncInstalled() {
    if (typeof window === 'undefined') return
    state.isPWAInstalled =
      window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true
  }

  if (import.meta.client) {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
      state._deferred = event
      state.showInstallPrompt = true
    })
    window.addEventListener('appinstalled', () => {
      state._deferred = null
      state.showInstallPrompt = false
      syncInstalled()
    })
    syncInstalled()
  }

  return {
    provide: {
      pwa: {
        get showInstallPrompt() {
          return state.showInstallPrompt
        },
        get isPWAInstalled() {
          return state.isPWAInstalled
        },
        async install() {
          const prompt = state._deferred
          if (!prompt) return
          await prompt.prompt()
          await prompt.userChoice
          state._deferred = null
          state.showInstallPrompt = false
        },
      },
    },
  }
})
