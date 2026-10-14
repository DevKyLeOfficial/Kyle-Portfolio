/** Toast messages without importing TDesign on the server (avoids SSR CSS errors). */
export function useNotify() {
  async function show(type, content) {
    if (import.meta.server) return
    const { MessagePlugin } = await import('tdesign-vue-next')
    const fn = MessagePlugin[type]
    if (typeof fn === 'function') fn(content)
  }

  return {
    success: (content) => show('success', content),
    warning: (content) => show('warning', content),
    error: (content) => show('error', content),
  }
}
