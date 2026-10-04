// Seznam akcí – /akce
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { SEO } from '../seo'
import { COLORS } from '../theme'
import type { EventSummary, ItemsResponse } from '../types'
import { useFetch } from '../hooks/useFetch'
import DataStatus from '../components/DataStatus'
import EventsGrid from '../components/EventsGrid'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'
import Seo from '../components/Seo'

export function EventsPage() {
  const { data, loading, error } = useFetch<ItemsResponse<EventSummary>>(content.api.events)
  const { title, image, empty } = content.pages.events

  return (
    <>
      <Seo path="/akce" title={SEO['/akce'].title} description={SEO['/akce'].description} />
      <PageBackground
        image={image}
        minHeight={{ xs: fluid(1238, 1300), md: '0px' }}
        viewportHeight
        position={{ xs: 'center top', md: '47.9% 40.5%' }}
        size={{ xs: 'cover', md: 'auto 459%' }}
      >
        <Header />
        <QuickNav />
        <PageTitle>{title}</PageTitle>
        {!data ? (
          <DataStatus loading={loading} error={error} />
        ) : data.items.length > 0 ? (
          <EventsGrid events={data.items} />
        ) : (
          <Typography
            sx={{
              paddingTop: fluid(60, 64),
              paddingLeft: fluid(30, 34),
              paddingRight: fluid(30, 34),
              textAlign: 'center',
              fontSize: fluid(16, 17),
              lineHeight: fluid(24, 26),
              color: COLORS.white,
            }}
          >
            {empty}
          </Typography>
        )}
      </PageBackground>
      <Footer rating />
    </>
  )
}

export default EventsPage
