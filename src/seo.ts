// SEO texty stránek – titulky, popisky a údaje o provozovně pro strukturovaná data
import { content } from './content'
import { formatEventDate } from './format'
import type { EventDetail, PageDetail } from './types'

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

// URL obrázku z API je absolutní, lokální cesta dostane origin webu
export const absoluteUrl = (url: string) => (/^https?:\/\//.test(url) ? url : SITE_ORIGIN + url)

// Odstraní HTML a zkrátí text na délku popisku
const stripHtml = (html: string | null) =>
  (html ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
const clip = (text: string, max = 155) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`)

export const seoForPage = (page: PageDetail): SeoMeta => ({
  title: page.title,
  description: clip(`${page.title} v Restaart Pardubice. ${stripHtml(page.text)}`.trim()),
})

export const seoForEvent = (event: EventDetail): SeoMeta => ({
  title: event.title,
  description: clip(
    `${event.title} (${formatEventDate(event.dateFrom, event.dateTo)}) – akce ve sportovním centru Restaart Pardubice. ${stripHtml(event.text)}`.trim(),
  ),
})

// Údaje provozovny pro JSON-LD (LocalBusiness)
export const LOCAL_BUSINESS = {
  name: 'Restaart – sportovní centrum',
  legalName: 'RESTAART SPORTOVNÍ CENTRUM s.r.o.',
  street: 'Přerovská 503',
  city: 'Pardubice',
  postalCode: '530 06',
  region: 'Pardubický kraj',
} as const

// Odkazy na sítě mají smysl v sameAs, jen pokud vedou na konkrétní profil, ne na placeholder domény
const socialSameAs = content.contact.social.filter((item) => new URL(item.href).pathname !== '/').map((item) => item.href)

export const localBusinessJsonLd = (): Record<string, unknown> => ({
  '@type': 'SportsActivityLocation',
  '@id': `${SITE_ORIGIN}/#business`,
  name: LOCAL_BUSINESS.name,
  legalName: LOCAL_BUSINESS.legalName,
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/icons/apple_touch_icon.png`,
  image: `${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`,
  telephone: content.contact.phone,
  email: content.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: LOCAL_BUSINESS.street,
    addressLocality: LOCAL_BUSINESS.city,
    postalCode: LOCAL_BUSINESS.postalCode,
    addressRegion: LOCAL_BUSINESS.region,
    addressCountry: 'CZ',
  },
  ...(socialSameAs.length > 0 && { sameAs: socialSameAs }),
})

// Popisek úvodní stránky v drobečkové navigaci
export const ACTIVITIES_LABEL = 'Aktivity'

export const eventJsonLd = (event: EventDetail, path: string): Record<string, unknown> => ({
  '@type': 'Event',
  name: event.title,
  ...(event.text && { description: clip(stripHtml(event.text), 300) }),
  ...(event.image && { image: absoluteUrl(event.image) }),
  url: SITE_ORIGIN + path,
  startDate: event.dateFrom,
  ...(event.dateTo && { endDate: event.dateTo }),
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: LOCAL_BUSINESS.name,
    address: { '@type': 'PostalAddress', streetAddress: LOCAL_BUSINESS.street, addressLocality: LOCAL_BUSINESS.city, postalCode: LOCAL_BUSINESS.postalCode, addressCountry: 'CZ' },
  },
  organizer: { '@type': 'Organization', name: LOCAL_BUSINESS.name, url: SITE_ORIGIN },
})

export const breadcrumbJsonLd = (items: { name: string; path: string }[]): Record<string, unknown> => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: SITE_ORIGIN + item.path })),
})
