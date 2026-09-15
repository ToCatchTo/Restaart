// Nastaví titulek karty prohlížeče ve formátu „Restaart - Název stránky“
import { useEffect } from 'react'
import { content } from '../content'

export const formatPageTitle = (title: string) => `${content.brand.name}${content.titles.separator}${title}`

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = formatPageTitle(title)
  }, [title])
}

export default usePageTitle
