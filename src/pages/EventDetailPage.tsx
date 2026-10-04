// Detail akce – /akce/:slug
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { formatFileSize } from '../format'
import { NOT_FOUND_SEO, SEO, breadcrumbJsonLd, eventJsonLd, seoForEvent } from '../seo'
import { COLORS, DESKTOP } from '../theme'
import type { EventDetail } from '../types'
import { useFetch } from '../hooks/useFetch'
import BackLink from '../components/BackLink'
import DataStatus from '../components/DataStatus'
import Footer from '../components/Footer'
import Header from '../components/Header'
import JsonLd from '../components/JsonLd'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'
import RichText from '../components/RichText'
import Seo from '../components/Seo'

// Užší desktop: obrázek, nadpis a popis pod sebou
const STACKED_MQ = '@media (min-width: 600px) and (max-width: 999.95px)'

// Písmo popisu, přílohy a odkazu
const textSx = {
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.4, 16) },
  lineHeight: { xs: fluid(28, 30), md: fluidDesktop(24, 25) },
} as const

const linkSx = {
  ...textSx,
  display: 'block',
  width: 'fit-content',
  color: COLORS.white,
  fontWeight: 500,
  textDecoration: 'underline',
  '& + &': { marginTop: fluid(8, 10) },
} as const

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: event, loading, error, notFound } = useFetch<EventDetail>(slug ? content.api.event(slug) : null)
  const { back, backIcon, image, attachmentLabel, linkLabel } = content.pages.eventDetail
  const meta = event ? seoForEvent(event) : notFound ? NOT_FOUND_SEO : SEO['/akce']

  return (
    <>
      {/* Neexistující akce je soft-404 – neindexovat */}
      <Seo
        path={`/akce/${slug}`}
        title={event?.title ?? (notFound ? NOT_FOUND_SEO.title : SEO['/akce'].title)}
        description={meta.description}
        ogImage={event?.image ?? undefined}
        noindex={notFound}
      />
      {event && <JsonLd data={eventJsonLd(event, `/akce/${slug}`)} />}
      {event && <JsonLd data={breadcrumbJsonLd([{ name: SEO['/akce'].title!, path: '/akce' }, { name: event.title, path: `/akce/${slug}` }])} />}
      <PageBackground
        image={image}
        minHeight={{ xs: fluid(1594, 1650), md: desktopScaled(1581) }}
        position={{ xs: 'center top', md: '47.9% 40.5%' }}
        size={{ xs: 'cover', md: 'auto 459%' }}
      >
        <Header />
        <QuickNav />
        <BackLink to={content.quickNav.events.href} label={back} icon={backIcon} />

        {event ? (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                [STACKED_MQ]: {
                  order: 2,
                  paddingTop: '16px',
                  // Nadpis vycentrovaný přes šířku obsahu
                  '& h1': {
                    textAlign: 'center',
                    maxWidth: 'none',
                    boxSizing: 'border-box',
                    paddingRight: desktopScaled(DESKTOP.content),
                  },
                },
              }}
            >
              <PageTitle align="center" alignDesktop="left" variantDesktop="small" topDesktop={57} widthDesktop={569}>
                {event.title}
              </PageTitle>
            </Box>
            {/* Od 1000 px: popis (812 px) a obrázek (620 px) vedle sebe; užší desktop: obrázek, nadpis, popis pod sebou */}
            <Box
              sx={{
                display: { md: 'grid' },
                gridTemplateColumns: { md: `${desktopScaled(812)} ${desktopScaled(620)}` },
                columnGap: { md: desktopScaled(70) },
                alignItems: { md: 'start' },
                paddingLeft: { md: desktopScaled(DESKTOP.content) },
                [STACKED_MQ]: { display: 'contents' },
              }}
            >
              <Box
                sx={{
                  order: { md: 2 },
                  paddingTop: { xs: fluid(30, 54), md: desktopScaled(129) },
                  paddingLeft: { xs: fluid(30, 34), md: 0 },
                  paddingRight: { xs: fluid(30, 34), md: 0 },
                  [STACKED_MQ]: {
                    order: 1,
                    paddingTop: '40px',
                    alignSelf: 'center',
                    width: fluidDesktop(240, 620),
                  },
                }}
              >
                <Box
                  component="img"
                  src={event.image ?? content.pages.events.image}
                  alt={event.title}
                  sx={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: { xs: fluid(31, 33), md: desktopScaled(31) },
                    boxShadow: { md: '2px 2px 15px rgba(0, 0, 0, 0.16)' },
                    backgroundColor: COLORS.gray,
                  }}
                />
              </Box>
              <Box
                sx={{
                  paddingTop: { xs: fluid(42, 54), md: fluidDesktop(36, 58) },
                  paddingLeft: { xs: fluid(30, 34), md: 0 },
                  paddingRight: { xs: fluid(30, 34), md: 0 },
                  paddingBottom: { xs: fluid(110, 54), md: fluidDesktop(80, 120) },
                  [STACKED_MQ]: {
                    order: 3,
                    paddingLeft: desktopScaled(DESKTOP.content),
                    paddingRight: desktopScaled(DESKTOP.content),
                  },
                }}
              >
                {event.text && <RichText html={event.text} sx={textSx} />}
                {(event.attachment || event.link) && (
                  <Box sx={{ paddingTop: event.text ? fluid(24, 32) : 0 }}>
                    {event.attachment && (
                      <Typography component="a" href={event.attachment.url} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                        {event.attachment.name ?? attachmentLabel}
                        {event.attachment.size !== null && ` (${formatFileSize(event.attachment.size)})`}
                      </Typography>
                    )}
                    {event.link && (
                      <Typography component="a" href={event.link.url} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                        {event.link.label ?? linkLabel}
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <DataStatus loading={loading} error={notFound ? null : error} notFound={notFound} />
        )}
      </PageBackground>
      <Footer rating />
    </>
  )
}

export default EventDetailPage
