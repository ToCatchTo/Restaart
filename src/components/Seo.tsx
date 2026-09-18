// SEO hlavička stránky přes nativní document metadata Reactu 19 (titulek, popis, canonical, OG)
import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE, SITE_ORIGIN, formatTitle } from '../seo'

interface SeoProps {
  // Cesta bez originu, např. /kontakt
  path: string
  title?: string
  description: string
  ogImage?: string
  // Stránky, které se nemají indexovat (přihlášení, 404)
  noindex?: boolean
}

export function Seo({ path, title, description, ogImage = DEFAULT_OG_IMAGE, noindex = false }: SeoProps) {
  const fullTitle = formatTitle(title)
  const url = SITE_ORIGIN + path

  // Statické značky v index.html sloužily robotům bez JS, po naskočení Reactu je nahradí ty hoistnuté níže
  useEffect(() => {
    document.head.querySelectorAll('[data-seo-static]').forEach((el) => el.remove())
  }, [])

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />
      {/* og:type, og:site_name, og:locale a twitter:card jsou napříč webem stejné – statické v index.html */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE_ORIGIN + ogImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_ORIGIN + ogImage} />
    </>
  )
}

export default Seo
