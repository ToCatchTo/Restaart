// Sdílené datové typy aplikace

// Seznam z API obalený v { items }
export interface ItemsResponse<T> {
  items: T[]
}

// Výjimečná událost v upoutávce na homepage
export interface SpecialEvent {
  title: string
  url: string
}

// Nastavení homepage
export interface Homepage {
  backgroundImage: string | null
  specialEvent: SpecialEvent | null
}

// Řádek „popisek | hodnota“ (otevírací doba, ceník)
export interface LabelValue {
  label: string
  value: string
}

// Dnes platná otevírací doba
export interface OpeningHoursData {
  name: string
  validFrom: string
  validTo: string | null
  items: LabelValue[]
}

export type PageCategorySlug = 'sport' | 'regenerace' | 'sluzby'

// Podstránka ve výpisu kategorie
export interface PageSummary {
  id: number
  slug: string
  title: string
  backgroundImage: string | null
}

// Kategorie s podstránkami
export interface PageCategory {
  slug: PageCategorySlug
  name: string
  pages: PageSummary[]
}

// Fotka v galerii podstránky
export interface GalleryImage {
  url: string
  name: string | null
}

// Text s tlačítkem na podstránce
export interface PageCta {
  text: string | null
  buttonLabel: string | null
}

// Detail podstránky (aktivita / služba)
export interface PageDetail {
  id: number
  slug: string
  title: string
  category: { slug: PageCategorySlug; name: string }
  text: string | null
  priceList: LabelValue[]
  gallery: GalleryImage[]
  backgroundImage: string | null
  cta: PageCta | null
}

// Akce ve výpisu
export interface EventSummary {
  id: number
  slug: string
  title: string
  dateFrom: string
  dateTo: string | null
  image: string | null
}

// Detail akce
export interface EventDetail extends EventSummary {
  text: string | null
  attachment: { url: string; name: string | null; size: number | null } | null
  link: { url: string; label: string | null } | null
}

// Položka navigace
export interface NavItem {
  label: string
  href: string
  external?: boolean
}

// Sekce navigace (např. SPORT) s volitelnými podpoložkami
export interface NavSectionData {
  label: string
  href?: string
  external?: boolean
  items?: NavItem[]
}

// Pole formuláře účtu (přihlášení / registrace)
export interface AuthField {
  type: 'text' | 'email' | 'tel' | 'password'
  name: string
  label: string
  autoComplete?: string
}
