// Generuje public/sitemap.xml ze statických cest a dat API (podstránky, akce)
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const ORIGIN = 'https://www.restaart.cz'
const DEFAULT_API_URL = 'https://admin.restaart.cz'
// Veřejné stránky bez přihlášení/registrace a 404
export const STATIC_PATHS = ['/', '/akce', '/kontakt', '/obchodni-podminky', '/ochrana-osobnich-udaju']

// Cesty podstránek a akcí z API
export async function collectRoutes({ apiUrl, token, fetchImpl = fetch }) {
  const getItems = async (path) => {
    const response = await fetchImpl(`${apiUrl}${path}`, { headers: { 'X-AUTH-TOKEN': token } })
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`)
    return (await response.json()).items
  }
  const [categories, events] = await Promise.all([getItems('/api/page-categories'), getItems('/api/events')])
  return [
    // Služby mají vlastní prefix, sport a regenerace sdílí /aktivity
    ...categories.flatMap((category) => category.pages.map((page) => `/${category.slug === 'sluzby' ? 'sluzby' : 'aktivity'}/${page.slug}`)),
    ...events.map((event) => `/akce/${event.slug}`),
  ]
}

export function buildSitemap({ origin, paths, today }) {
  const urls = paths.map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

// Spuštění z příkazové řádky
if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..')
  // Proměnné prostředí mají přednost, poté .env.local a .env
  for (const file of ['.env.local', '.env']) {
    try {
      process.loadEnvFile(join(root, file))
    } catch {
      // Soubor nemusí existovat
    }
  }

  let dynamicPaths = []
  try {
    if (!process.env.VITE_API_TOKEN) throw new Error('chybí VITE_API_TOKEN')
    dynamicPaths = await collectRoutes({ apiUrl: process.env.VITE_API_URL || DEFAULT_API_URL, token: process.env.VITE_API_TOKEN })
  } catch (error) {
    // Bez API zůstanou v sitemapě jen statické stránky
    console.warn(`sitemap.xml: data z API se nepodařilo načíst (${error.message}), jen statické stránky`)
  }

  const xml = buildSitemap({ origin: ORIGIN, paths: [...STATIC_PATHS, ...dynamicPaths], today: new Date().toISOString().slice(0, 10) })
  writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
  console.log(`sitemap.xml: ${xml.match(/<url>/g).length} URL`)
}
