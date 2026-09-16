// Detail akce – /akce/:slug
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
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
  usePageTitle(event?.title ?? content.pages.events.title)

  return (
    <>
      <PageBackground image={image} minHeight={fluid(1594, 1650)} overlay="rgba(0, 0, 0, 0.65)">
        <Header />
        <QuickNav />
        <BackLink to={content.quickNav.events.href} label={back} icon={backIcon} />

        {event ? (
          <>
            <PageTitle align="center">{event.title}</PageTitle>
            <Box sx={{ paddingTop: fluid(30, 54), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
              <Box
                component="img"
                src={event.image}
                alt={event.title}
                sx={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  borderRadius: fluid(31, 33),
                  backgroundColor: COLORS.gray,
                }}
              />
            </Box>
            <RichText
              html={event.description}
              sx={{
                paddingTop: fluid(42, 54),
                paddingLeft: fluid(30, 34),
                paddingRight: fluid(30, 34),
                paddingBottom: fluid(110, 54),
                fontSize: fluid(16, 17),
                lineHeight: fluid(28, 30),
              }}
            />
          </>
        ) : (
          <DataStatus loading={loading} error={error} notFound={!loading && !error} />
        )}
      </PageBackground>
      <Footer />
    </>
  )
}

export default EventDetailPage
