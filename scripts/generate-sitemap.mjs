// Generuje public/sitemap.xml ze statických cest a JSON dat (aktivity, akce)
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const ORIGIN = 'https://www.restaart.cz'
// Veřejné stránky bez přihlášení/registrace a 404
export const STATIC_PATHS = ['/', '/akce', '/kontakt', '/obchodni-podminky', '/ochrana-osobnich-udaju']

export function collectRoutes(dataDir) {
  const read = (name) => JSON.parse(readFileSync(join(dataDir, name), 'utf8'))
  return { staticPaths: STATIC_PATHS, activities: read('activities.json'), events: read('events.json') }
}

export function buildSitemap({ origin, staticPaths, activities, events, today }) {
  const paths = [...staticPaths, ...activities.map((a) => `/aktivity/${a.slug}`), ...events.map((e) => `/akce/${e.slug}`)]
  const urls = paths.map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

// Spuštění z příkazové řádky
if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..')
  const routes = collectRoutes(join(root, 'public', 'data'))
  const xml = buildSitemap({ origin: ORIGIN, ...routes, today: new Date().toISOString().slice(0, 10) })
  writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
  console.log(`sitemap.xml: ${xml.match(/<url>/g).length} URL`)
}
