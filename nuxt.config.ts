// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'

const rootDir = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(rootDir, 'public')

function normalizeBase(path: string) {
  if (!path || path === '/') return '/'
  return path.endsWith('/') ? path : `${path}/`
}

/** GitHub Pages uses /Repo-name/; Vercel & local use /. Override with NUXT_APP_BASE_URL. */
const baseURL = normalizeBase(
  process.env.NUXT_APP_BASE_URL
  ?? (process.env.VERCEL ? '/' : process.env.NODE_ENV === 'production' ? '/Kyle-Portfolio/' : '/'),
)
const isDev = process.env.NODE_ENV === 'development'

/** Baseline HTTP security headers (static + SSR). CSP kept relaxed for Nuxt/Vite + Google Fonts. */
const securityHeaders: Record<string, string> = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-site',
}

export default defineNuxtConfig({
  srcDir: 'app',
  dir: {
    public: publicDir,
  },
  nitro: {
    publicAssets: [{ dir: publicDir, maxAge: 60 * 60 * 24 * 7 }],
    routeRules: {
      '/**': { headers: securityHeaders },
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: isDev },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    plugins: [
      VitePWA({
        base: baseURL,
        registerType: 'autoUpdate',
        includeAssets: ['pwa/favicon-32.png', 'pwa/icon.svg', 'robots.txt'],
        manifestFilename: 'manifest.webmanifest',
        manifest: {
          name: 'Kyle | Portfolio',
          short_name: 'Kyle',
          description: 'Kyle — junior full-stack developer portfolio. Projects, skills, and credentials.',
          theme_color: '#071018',
          background_color: '#071018',
          display: 'standalone',
          orientation: 'portrait-primary',
          lang: 'en',
          start_url: baseURL,
          scope: baseURL,
          icons: [
            {
              src: `${baseURL}pwa/icon-192.png`.replace(/\/{2,}/g, '/'),
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: `${baseURL}pwa/icon-512.png`.replace(/\/{2,}/g, '/'),
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: `${baseURL}pwa/icon-maskable-512.png`.replace(/\/{2,}/g, '/'),
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg,jpeg,webp,woff2,json,txt,apk}'],
          navigateFallback: baseURL,
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        },
        devOptions: {
          enabled: isDev,
          navigateFallback: baseURL,
          type: 'module',
        },
      }),
    ],
  },
  css: ['~/assets/css/main.css', 'tdesign-vue-next/es/style/index.css', 'lenis/dist/lenis.css'],
  app: {
    baseURL,
    head: {
      title: 'Kyle | Portfolio',
      meta: [
        {
          name: 'description',
          content: 'Kyle — junior full-stack developer portfolio. Projects, skills, and credentials.',
        },
        { name: 'theme-color', content: '#071018' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'Kyle | Portfolio' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
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
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${baseURL}pwa/favicon-32.png` },
        { rel: 'apple-touch-icon', href: `${baseURL}pwa/apple-touch-icon.png` },
        { rel: 'manifest', href: `${baseURL}manifest.webmanifest` },
      ],
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
})
