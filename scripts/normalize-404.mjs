// GitHub Pages expects the soft-404 page at the artifact root as 404.html.
// TanStack Start's prerenderer (as of 1.168) writes non-root pages as
// <path>/index.html, so move it into place after the build. No-op if the
// directory doesn't exist (e.g. upstream behavior changes).
import { existsSync } from 'node:fs'
import { renameSync, rmdirSync } from 'node:fs'
import path from 'node:path'

const clientDir = path.resolve('dist/client')
const nested = path.join(clientDir, '404', 'index.html')
const target = path.join(clientDir, '404.html')

if (existsSync(nested)) {
  renameSync(nested, target)
  rmdirSync(path.join(clientDir, '404'))
  console.log(`[normalize-404] moved ${path.relative(process.cwd(), nested)} -> ${path.relative(process.cwd(), target)}`)
} else if (!existsSync(target)) {
  console.warn('[normalize-404] no 404 page found in dist/client — nothing to do')
}
