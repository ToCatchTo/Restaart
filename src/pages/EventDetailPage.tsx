// Detail akce – /akce/:slug
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP } from '../theme'
import type { Event } from '../types'
import { useFetch } from '../hooks/useFetch'
import { usePageTitle } from '../hooks/usePageTitle'
import BackLink from '../components/BackLink'
import DataStatus from '../components/DataStatus'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'
import RichText from '../components/RichText'

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, loading, error } = useFetch<Event[]>(content.api.events)
  const event = data?.find((item) => item.slug === slug) ?? null
  const { back, backIcon, image } = content.pages.eventDetail
  usePageTitle(event?.title ?? content.titles.events)

  return (
    <>
      <PageBackground
        image={image}
        minHeight={{ xs: fluid(1594, 1650), md: desktopScaled(1581) }}
        overlay={{ xs: 'rgba(0, 0, 0, 0.65)', md: 'rgba(0, 0, 0, 0.7)' }}
        position={{ xs: 'center top', md: '47.9% 40.5%' }}
        size={{ xs: 'cover', md: 'auto 459%' }}
      >
        <Header />
        <QuickNav />
        <BackLink to={content.quickNav.events.href} label={back} icon={backIcon} />

        {event ? (
          <>
            <PageTitle align="center" alignDesktop="left" variantDesktop="small" topDesktop={57} widthDesktop={569}>
              {event.title}
            </PageTitle>
            {/* Desktop: popis vlevo (812 px) a obrázek vpravo (620 px) v CSS gridu */}
            <Box
              sx={{
                display: { md: 'grid' },
                gridTemplateColumns: { md: `${desktopScaled(812)} ${desktopScaled(620)}` },
                columnGap: { md: desktopScaled(70) },
                alignItems: { md: 'start' },
                paddingLeft: { md: desktopScaled(DESKTOP.content) },
              }}
            >
              <Box
                sx={{
                  order: { md: 2 },
                  paddingTop: { xs: fluid(30, 54), md: desktopScaled(129) },
                  paddingLeft: { xs: fluid(30, 34), md: 0 },
                  paddingRight: { xs: fluid(30, 34), md: 0 },
                }}
              >
                <Box
                  component="img"
                  src={event.image}
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
              <RichText
                html={event.description}
                sx={{
                  paddingTop: { xs: fluid(42, 54), md: desktopScaled(58) },
                  paddingLeft: { xs: fluid(30, 34), md: 0 },
                  paddingRight: { xs: fluid(30, 34), md: 0 },
                  paddingBottom: { xs: fluid(110, 54), md: 0 },
                  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.4, 16) },
                  lineHeight: { xs: fluid(28, 30), md: desktopType(25) },
                }}
              />
            </Box>
          </>
        ) : (
          <DataStatus loading={loading} error={error} notFound={!loading && !error} />
        )}
      </PageBackground>
      <Footer rating />
    </>
  )
}

export default EventDetailPage
