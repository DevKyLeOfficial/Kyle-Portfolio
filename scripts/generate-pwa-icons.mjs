/**
 * Generates PWA / favicon PNGs from a single SVG (portfolio monogram).
 * Run: node scripts/generate-pwa-icons.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'pwa')

/** Unique mark: “K” monogram + terminal prompt on brand dark. */
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="55%" stop-color="#2dd4bf"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="#071018"/>
  <rect x="24" y="24" width="464" height="464" rx="96" fill="none" stroke="url(#g)" stroke-width="4" opacity="0.45"/>
  <path d="M148 128h52v256h-52V128zm0 128 88-128h62L188 272l118 112h-64L148 256v128z" fill="url(#g)" filter="url(#glow)"/>
  <text x="256" y="420" text-anchor="middle" font-family="ui-monospace, monospace" font-size="28" fill="#94a3b8" opacity="0.9">&lt;/&gt;</text>
</svg>`

const sizes = [
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-192.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32.png', size: 32 },
]

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'icon.svg'), svg, 'utf8')

const buf = Buffer.from(svg)
for (const { name, size } of sizes) {
  await sharp(buf).resize(size, size).png({ compressionLevel: 9 }).toFile(join(outDir, name))
}

await sharp(buf).resize(512, 512).png().toFile(join(outDir, 'icon-maskable-512.png'))

console.log('PWA icons written to public/pwa/')
