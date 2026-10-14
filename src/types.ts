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

// Druhá část stránky přihlášení – text po řádcích a tlačítko s odkazem
export interface AuthAside {
  lines: string[]
  label: string
  icon: string
  href: string
}

// Typ rezervací (záložka rozvrhu) – pevný seznam, API typy nevypisuje
export type ReservationTypeSlug = 'skupinovky' | 'squash' | 'badminton' | 'sauna' | 'vacushape'

export interface ReservationType {
  slug: ReservationTypeSlug
  name: string
}

// Stav termínu: volno / obsazeno / úklid (sauna) / už začal
export type SlotState = 'free' | 'full' | 'cleaning' | 'past'

interface SlotBase {
  // Začátek „07:00“
  start: string
  state: SlotState
  capacity: number
  occupied: number
  // Cena v Kč bez slev, může chybět
  price: number | null
}

// Skupinová lekce – bez konce, má název, trenéra a barvu
export interface LessonSlot extends SlotBase {
  id: number
  name: string
  label: string | null
  trainer: string | null
  color: string | null
}

// Kurt nebo místnost – má konec, squash navíc jednotlivé kurty
export interface CourtSlot extends SlotBase {
  end: string
  courts?: { name: string; state: SlotState }[]
}

export type ReservationSlot = LessonSlot | CourtSlot

// Den rozvrhu; prázdné sloty = zavřeno nebo žádná lekce
export interface ReservationDay {
  date: string
  slots: ReservationSlot[]
}

// Odpověď GET /api/reservations/{typ}
export interface ReservationWeek {
  type: ReservationTypeSlug
  name: string
  from: string
  to: string
  previous: { from: string; to: string }
  next: { from: string; to: string }
  slotMinutes: number | null
  // Podmínky (storno apod.) jako HTML z editoru
  note: string | null
  days: ReservationDay[]
}

// Blok textu právní stránky; v textu lze použít **tučně** a [odkaz](url)
export type LegalBlock =
  | { type: 'paragraph'; lead?: string; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: { lead?: string; text: string }[] }
  | { type: 'table'; head: [string, string]; rows: [string, string][] }
  | { type: 'lines'; lines: string[] }

// Sekce právní stránky; id slouží jako kotva pro obsah
export interface LegalSection {
  id?: string
  heading: string
  blocks: LegalBlock[]
}

// Právní dokument (obchodní podmínky / ochrana osobních údajů)
export interface LegalDocument {
  title: string
  subtitle: string
  // Obsah s odkazy na sekce a oddělovače mezi sekcemi
  contents?: boolean
  footer?: string
  sections: LegalSection[]
}
