/**
 * Builds a debug APK that loads the live GitHub Pages site (updates on each visit).
 * Requires JDK 17+ and Android SDK (local or CI).
 */
import { cp, mkdir, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const androidDir = join(root, 'android')
const apkOut = join(root, '.output', 'public', 'downloads', 'Kyle-Portfolio.apk')
const gradlew = process.platform === 'win32' ? 'gradlew.bat' : 'gradlew'

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd: opts.cwd || root, shell: process.platform === 'win32' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

async function exists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

if (!(await exists(join(root, '.output', 'public', 'index.html')))) {
  console.error('Run `npm run generate` first (missing .output/public).')
  process.exit(1)
}

try {
  await access(join(androidDir, 'app'), constants.F_OK)
} catch {
  console.log('Adding Android platform…')
  run('npx', ['cap', 'add', 'android'])
}

console.log('Syncing Capacitor Android project…')
run('npx', ['cap', 'sync', 'android'])

console.log('Applying launcher icons…')
run('npx', [
  'capacitor-assets',
  'generate',
  '--android',
  '--iconBackgroundColor',
  '#071018',
  '--iconBackgroundColorDark',
  '#071018',
  '--splashBackgroundColor',
  '#071018',
])

console.log('Assembling debug APK…')
run(join(androidDir, gradlew), ['assembleDebug'], { cwd: androidDir })

const built = join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk')
await mkdir(dirname(apkOut), { recursive: true })
await cp(built, apkOut)
console.log(`APK ready: ${apkOut}`)
