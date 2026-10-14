import { createReadStream, existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { join, normalize, sep } from 'node:path'
import { createError, sendStream, setHeader } from 'h3'

function resolveUploadsRoot() {
  const cwd = process.cwd()
  const candidates = [
    join(cwd, 'public', 'uploads'),
    join(cwd, '..', 'public', 'uploads'),
  ]
  for (const dir of candidates) {
    if (existsSync(dir)) return normalize(dir)
  }
  return normalize(join(cwd, 'public', 'uploads'))
}

const uploadsRoot = resolveUploadsRoot()

const MIME: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  txt: 'text/plain; charset=utf-8',
}

/** Serve public/uploads/* (fixes dev/prod when SPA catches /uploads). */
export default defineEventHandler(async (event) => {
  const segments = event.context.params?.path
  const rel = Array.isArray(segments) ? segments.join('/') : segments
  if (!rel || rel.includes('..')) {
    throw createError({ statusCode: 400, statusMessage: 'Bad path' })
  }

  const filePath = normalize(join(uploadsRoot, rel))
  if (!filePath.startsWith(uploadsRoot + sep) && filePath !== uploadsRoot) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  let fileStat
  try {
    fileStat = await stat(filePath)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }
  if (!fileStat.isFile()) {
    throw createError({ statusCode: 404, statusMessage: 'Not a file' })
  }

  const ext = filePath.split('.').pop()?.toLowerCase() ?? ''
  setHeader(event, 'Content-Type', MIME[ext] || 'application/octet-stream')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return sendStream(event, createReadStream(filePath))
})
