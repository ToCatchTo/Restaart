// SEO texty stránek – titulky, popisky a údaje o provozovně pro strukturovaná data
import { content } from './content'
import type { Activity, Event } from './types'

export const SITE_ORIGIN = 'https://www.restaart.cz'
export const BRAND = content.brand.name
export const TITLE_SEPARATOR = ' - '
export const DEFAULT_OG_IMAGE = '/images/og_default.jpg'
const HOME_TITLE = 'Sport a relax centrum Pardubice'

export interface SeoMeta {
  // Bez brandu; prázdné = jen brand + výchozí titulek
  title?: string
  // Cca 120–160 znaků
  description: string
}

// Statické stránky podle cesty
export const SEO: Record<string, SeoMeta> = {
  '/': {
    description:
      'Restaart – sportovní a relaxační centrum v Pardubicích-Svítkově. Skupinová cvičení, squash, badminton, posilovna, privátní sauna, masáže a dětské kroužky.',
  },
  '/akce': {
    title: 'Akce',
    description: 'Aktuální akce a události ve sportovním centru Restaart Pardubice – dny otevřených dveří, turnaje, kroužky a speciální lekce.',
  },
  '/kontakt': {
    title: 'Kontakt',
    description: 'Kontakt a otevírací doba sportovního centra Restaart, Přerovská 503, Pardubice-Svítkov. Telefon +420 608 197 964, e-mail info@restaart.cz.',
  },
  '/prihlaseni': { title: 'Přihlášení', description: 'Přihlášení do rezervačního systému sportovního centra Restaart Pardubice.' },
  '/registrace': { title: 'Registrace', description: 'Registrace nového účtu do rezervačního systému sportovního centra Restaart Pardubice.' },
  [content.footer.terms.href]: { title: content.footer.terms.label, description: 'Obchodní podmínky sportovního centra Restaart Pardubice – rezervace, platby, storno a provozní řád.' },
  [content.footer.privacy.href]: { title: content.footer.privacy.label, description: 'Zásady ochrany osobních údajů sportovního centra Restaart Pardubice – jaké údaje zpracováváme a proč.' },
}

export const NOT_FOUND_SEO: SeoMeta = { title: 'Stránka nenalezena', description: 'Požadovaná stránka na webu sportovního centra Restaart Pardubice neexistuje nebo byla přesunuta.' }

export const formatTitle = (title?: string) => `${BRAND}${TITLE_SEPARATOR}${title ?? HOME_TITLE}`

// Odstraní HTML a zkrátí text na délku popisku
const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const clip = (text: string, max = 155) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`)

export const seoForActivity = (activity: Activity): SeoMeta => ({
  title: activity.title,
  description: clip(`${activity.title} v Restaart Pardubice. ${stripHtml(activity.description)}`),
})

export const seoForEvent = (event: Event): SeoMeta => ({
  title: event.title,
  description: clip(`${event.title} (${event.date}) – akce ve sportovním centru Restaart Pardubice. ${stripHtml(event.description)}`),
})

// Údaje provozovny pro JSON-LD (LocalBusiness)
export const LOCAL_BUSINESS = {
  name: 'Restaart – sportovní centrum',
  legalName: 'RESTAART SPORTOVNÍ CENTRUM s.r.o.',
  street: 'Přerovská 503',
  city: 'Pardubice',
  postalCode: '530 06',
  region: 'Pardubický kraj',
  geo: { latitude: 50.0432, longitude: 15.7156 },
} as const
