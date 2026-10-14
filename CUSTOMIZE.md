# Customize your portfolio (local)

Everything personal lives in **one config file** plus **files you drop in `public/uploads/`**. No database, no CMS—edit, save, refresh the browser.

## Run locally

1. Install [Node.js](https://nodejs.org/) (LTS, v20+ recommended).
2. Open a terminal in this project folder (`Portfolio`).
3. Install and start:

```bash
npm install
npm run dev
```

If you see a **Tailwind / `bg-canvas` / PostCSS** error, clear the cache and restart:

```bash
npm run dev:clean
```

4. Open **http://localhost:3000** in your browser.
5. While `npm run dev` is running, changes to `site.js` or files in `public/` reload automatically.

Production build (optional):

```bash
npm run build
npm run preview
```

Static export for GitHub Pages:

```bash
npm run generate
```

Deploy the output folder Nuxt prints (typically `.output/public`).

---

## Step 1 — Your name, links, and text

Edit **`app/data/site.js`**:

| Field | What to change |
|--------|----------------|
| `handle`, `name`, `title`, `tagline` | Hero and page title |
| `email`, `github`, `linkedin`, `location`, `timeZone` | Contact section + hero (`Asia/Manila` = Philippines / PHT) |
| `availability` | Hero status line |
| `roles` | Rotating typewriter lines in the hero |
| `about` | About section paragraphs |
| `skills` | Skill tags (four groups) |
| `projects` | Your work (see below) |
| `certificates` | Your certs (see below) |
| `stackLog` | Timeline / career notes |

Navigation labels are in `site.nav`. Each `id` must match a section `id` on the page (`about`, `skills`, `projects`, `certificates`, etc.).

---

## Step 2 — Profile photo

1. Save your photo as **`public/uploads/profile.jpg`** (or `.webp` / `.png`).
2. In `site.js`, set:

```js
media: {
  profile: '/uploads/profile.jpg',
  profileAlt: 'Your Name — developer portrait',
},
```

Paths always start with `/uploads/...` (served from the `public` folder).

Until you add a photo, the site uses `profile-placeholder.svg`.

---

## Step 3 — Project screenshots and links

1. Put screenshots in **`public/uploads/projects/`**, e.g. `my-app.png`.
2. In `site.js`, add or edit a project object:

```js
{
  id: 'my-app',
  name: 'My App',
  tag: 'full-stack',
  year: '2025',
  summary: 'What it does and why it matters.',
  stack: ['Nuxt', 'Vue', 'Node'],
  image: '/uploads/projects/my-app.png',  // or null for no image
  link: 'https://github.com/you/my-app',  // use '#' to hide "open" link
},
```

You can duplicate the object block for each project.

---

## Step 4 — Certificates (images)

1. Export or screenshot each certificate as **PNG/JPG** into **`public/uploads/certificates/`** (e.g. `1.jpg`, `2.jpg`, …).
2. In `site.js`:

```js
{
  id: 'aws-cloud',
  order: 1,
  title: 'AWS Cloud Practitioner',
  issuer: 'Amazon Web Services',
  issued: '2024',
  description: 'Short note about the credential.',
  image: '/uploads/certificates/1.jpg',
},
```

Remove sample entries you do not need, or set `certificates: []` to hide the whole section.

---

## Folder layout (reference)

```
public/uploads/
  profile.jpg              ← your face / avatar
  projects/
    my-app.png
    another-build.webp
  certificates/
    cert-one.png
    cert-one.pdf
```

See also **`public/uploads/README.txt`**.

---

## Contact

The Contact section shows **`site.email`** with **Email me** (`mailto:`) and **Copy email**. No form backend required.

---

## Tips

- **File names:** use lowercase and hyphens (`devfest-2025.png`) to avoid broken links on the web.
- **Size:** compress large PNGs (certificates, screenshots) for faster loads; aim for under ~500 KB per image when possible.
- **Privacy:** only commit files you are comfortable publishing if you push to GitHub Pages.
- **Wrong path?** The UI shows a “missing image” state until the path matches a real file under `public/`.

If something does not update, hard-refresh the browser (Ctrl+F5) or restart `npm run dev`.
