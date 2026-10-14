/** Live clock for the site’s IANA timezone (e.g. Asia/Manila for Philippines). */
export function useSiteClock(timeZone = 'Asia/Manila') {
  const formatted = ref('')

  const formatNow = () => {
    formatted.value = new Intl.DateTimeFormat('en-PH', {
      timeZone,
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'shortGeneric',
    }).format(new Date())
  }

  let intervalId

  onMounted(() => {
    formatNow()
    intervalId = setInterval(formatNow, 30_000)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return { formatted }
}
