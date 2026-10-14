/** Resolve optional media paths; hide broken assets gracefully in the UI. */
export function usePublicMedia() {
  const failed = ref(new Set())

  function mediaUrl(path) {
    if (!path || typeof path !== 'string') return null
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path
    }
    const normalized = path.startsWith('/') ? path : `/${path}`
    return normalized
      .split('/')
      .map((segment, i) => (i === 0 || segment === '' ? segment : encodeURIComponent(segment)))
      .join('/')
  }

  function isVisible(path) {
    const url = mediaUrl(path)
    if (!url) return false
    return !failed.value.has(url)
  }

  function onMediaError(path) {
    const url = mediaUrl(path)
    if (url) failed.value.add(url)
  }

  return { mediaUrl, isVisible, onMediaError }
}
