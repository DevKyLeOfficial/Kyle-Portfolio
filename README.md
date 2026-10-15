# Kyle | Portfolio

Personal portfolio for **Kyle** — junior full-stack developer. Built with Nuxt 3, Vue 3, Tailwind CSS, TDesign, and Lenis smooth scroll. Dark emerald theme with loader, projects, credentials, and contact.

**Live site (GitHub Pages):** [devkyleofficial.github.io/Kyle-Portfolio](https://devkyleofficial.github.io/Kyle-Portfolio/)

## Quick start (local)

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

**Content:** edit `app/data/site.js` and add images under `public/uploads/`. See **[CUSTOMIZE.md](./CUSTOMIZE.md)** for details.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build (SSR) |
| `npm run generate` | Static export for GitHub Pages |
| `npm run preview` | Preview production build |

## Deploy

Pushes to `main` run [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml): `nuxt generate` with `NUXT_APP_BASE_URL=/Kyle-Portfolio/`, then GitHub Pages.

## Stack

- Nuxt 3 / Vue 3
- [TDesign Vue Next](https://tdesign.tencent.com/vue-next/overview)
- Tailwind CSS
- Lenis + scroll-reveal