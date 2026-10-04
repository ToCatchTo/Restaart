// Sekce navigace sestavené z kategorií podstránek v API
import { content } from '../content'
import { pagePath } from '../paths'
import type { ItemsResponse, NavSectionData, PageCategory } from '../types'
import { useFetch } from './useFetch'

const toSection = (category: PageCategory): NavSectionData => ({
  label: category.name.toLocaleUpperCase('cs'),
  items: category.pages.map((page) => ({ label: page.title, href: pagePath(category.slug, page.slug) })),
})

// Sekce kategorií, volitelně jen vybraných; do načtení dat prázdné
export function useCategorySections(only?: readonly string[]): NavSectionData[] {
  const { data } = useFetch<ItemsResponse<PageCategory>>(content.api.pageCategories)
  return (data?.items ?? []).filter((category) => !only || only.includes(category.slug)).map(toSection)
}

// Celé menu: kategorie z API a za nimi pevné sekce
export function useNavSections(): NavSectionData[] {
  return [...useCategorySections(), ...content.navSections]
}

export default useNavSections
