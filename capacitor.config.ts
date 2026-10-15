import type { CapacitorConfig } from '@capacitor/cli'

const pagesBase =
  process.env.CAPACITOR_SERVER_URL
  || 'https://devkyleofficial.github.io/Kyle-Portfolio/'

const config: CapacitorConfig = {
  appId: 'dev.kyle.portfolio',
  appName: 'Kyle | Portfolio',
  webDir: '.output/public',
  server: {
    url: pagesBase,
    cleartext: false,
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
  },
}

export default config
