// Univerzální detail podstránky – /aktivity/:slug (sport, regenerace) a /sluzby/:slug
import Box from '@mui/material/Box'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { fadeInUpSx } from '../animations'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { pagePath } from '../paths'
import { ACTIVITIES_LABEL, NOT_FOUND_SEO, SEO, breadcrumbJsonLd, seoForPage } from '../seo'
import { DESKTOP } from '../theme'
import type { PageDetail } from '../types'
import { useFetch } from '../hooks/useFetch'
import CtaBlock from '../components/CtaBlock'
import DataStatus from '../components/DataStatus'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import Header from '../components/Header'
import JsonLd from '../components/JsonLd'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import PriceList from '../components/PriceList'
import QuickNav from '../components/QuickNav'
import RichText from '../components/RichText'
import Seo from '../components/Seo'

// Od této šířky je popis a ceník vedle sebe, pod ní pod sebou
const SIDE_BY_SIDE_MQ = '@media (min-width: 900px)'

export function SubpagePage() {
  const { slug } = useParams<{ slug: string }>()
  const { pathname } = useLocation()
  const { data: page, loading, error, notFound } = useFetch<PageDetail>(slug ? content.api.page(slug) : null)
  // Cesta podle kategorie podstránky
  const path = page ? pagePath(page.category.slug, page.slug) : pathname
  const meta = page ? seoForPage(page) : notFound ? NOT_FOUND_SEO : SEO['/']

  // Podstránka otevřená pod prefixem jiné kategorie
  if (page && pathname !== path) return <Navigate to={path} replace />

  return (
    <>
      {/* Neexistující podstránka je soft-404 – neindexovat */}
      <Seo
        path={path}
        title={page?.title ?? (notFound ? NOT_FOUND_SEO.title : undefined)}
        description={meta.description}
        ogImage={page?.backgroundImage ?? undefined}
        noindex={notFound}
      />
      {page && (
        <JsonLd
          data={breadcrumbJsonLd([
            { name: page.category.slug === 'sluzby' ? page.category.name : ACTIVITIES_LABEL, path: '/' },
            { name: page.title, path },
          ])}
        />
      )}
      <PageBackground
        image={page ? (page.backgroundImage ?? content.hero.image) : loading ? null : content.hero.image}
        preload={Boolean(page)}
        minHeight={{ md: desktopScaled(2083) }}
        position={{ xs: 'center top', md: '50% 84.5%' }}
        size={{ xs: 'cover', md: '103.75% auto' }}
      >
        <Header />
        <QuickNav />

        {page ? (
          <>
            <PageTitle topDesktop={120}>{page.title}</PageTitle>
            {/* Od 900 px: popis (674 px) a ceník (673 px) vedle sebe, jinak pod sebou */}
            <Box
              sx={{
                paddingTop: { md: desktopScaled(119) },
                paddingLeft: { md: desktopScaled(DESKTOP.content) },
                paddingRight: { md: desktopScaled(DESKTOP.content) },
                [SIDE_BY_SIDE_MQ]: {
                  display: 'grid',
                  gridTemplateColumns: `${desktopScaled(674)} ${desktopScaled(673)}`,
                  columnGap: desktopScaled(95),
                  alignItems: 'start',
                  paddingRight: 0,
                },
              }}
            >
              {/* Prázdný obal drží ceník ve druhém sloupci i bez textu */}
              <Box>
                {page.text && (
                  <RichText
                    html={page.text}
                    sx={{
                      paddingTop: { xs: fluid(27, 44), md: desktopScaled(34) },
                      paddingLeft: { xs: fluid(30, 34), md: 0 },
                      paddingRight: { xs: fluid(30, 34), md: 0 },
                      fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 30) },
                      lineHeight: { xs: fluid(25, 30), md: fluidDesktop(26, 35) },
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      ...fadeInUpSx(),
                    }}
                  />
                )}
              </Box>
              {page.priceList.length > 0 && (
                <Box sx={{ paddingTop: { md: fluidDesktop(48, 60) }, [SIDE_BY_SIDE_MQ]: { paddingTop: 0 } }}>
                  <PriceList rows={page.priceList} />
                </Box>
              )}
            </Box>
            <Gallery images={page.gallery} alt={page.title} />
          </>
        ) : (
          <DataStatus loading={loading} error={notFound ? null : error} notFound={notFound} />
        )}
      </PageBackground>

      {page?.cta && <CtaBlock cta={page.cta} />}
      <Footer rating />
    </>
  )
}

export default SubpagePage
