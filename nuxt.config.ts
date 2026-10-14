// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const rootDir = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(rootDir, 'public')
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserPagesSite = repositoryName?.endsWith('.github.io')
const baseURL = process.env.NUXT_APP_BASE_URL
  || (process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserPagesSite
    ? `/${repositoryName}/`
    : '/')

export default defineNuxtConfig({
  srcDir: 'app',
  dir: {
    public: publicDir,
  },
  nitro: {
    publicAssets: [{ dir: publicDir, maxAge: 60 * 60 * 24 * 7 }],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css', 'tdesign-vue-next/es/style/index.css', 'lenis/dist/lenis.css'],
  app: {
    baseURL,
    head: {
      title: 'Developer Portfolio',
      meta: [
        {
          name: 'description',
          content: 'Developer & programmer portfolio — systems, code, and craft.',
        },
        { name: 'theme-color', content: '#071018' },
      ],
      htmlAttrs: {
        class: 'is-loading',
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
      ],
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
})
