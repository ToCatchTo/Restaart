// Cesty na webu odvozené z dat API
import type { PageCategorySlug } from './types'

// Služby mají vlastní prefix, sport a regenerace sdílí /aktivity
export const pagePath = (categorySlug: PageCategorySlug, slug: string) =>
  `/${categorySlug === 'sluzby' ? 'sluzby' : 'aktivity'}/${slug}`

export const eventPath = (slug: string) => `/akce/${slug}`
