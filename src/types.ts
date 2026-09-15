// Sdílené datové typy aplikace

// Řádek ceníku (délka | cena)
export interface PriceRow {
  duration: string
  price: string
}

// Popis jednotlivé lekce (rozbalovací seznam na detailu aktivity)
export interface ActivityClass {
  name: string
  text: string
}

// Aktivita (sport / regenerace) zobrazená na univerzální detailové stránce
export interface Activity {
  slug: string
  title: string
  category: 'sport' | 'regenerace'
  description: string
  priceGroups: PriceRow[][]
  gallery: string[]
  backgroundImage: string
  hasClassList: boolean
  classes?: ActivityClass[]
}

// Akce (událost) v seznamu i detailu
export interface Event {
  slug: string
  title: string
  date: string
  image: string
  description: string
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
