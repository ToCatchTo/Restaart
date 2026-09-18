// Seznam akcí – /akce
import { content } from '../content'
import { fluid } from '../fluid'
import { SEO } from '../seo'
import type { Event } from '../types'
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
  const { data, loading, error } = useFetch<Event[]>(content.api.events)

  return (
    <>
      <Seo path="/akce" title={SEO['/akce'].title} description={SEO['/akce'].description} />
      <PageBackground
        image={content.pages.events.image}
        minHeight={{ xs: fluid(1238, 1300), md: '0px' }}
        viewportHeight
        position={{ xs: 'center top', md: '47.9% 40.5%' }}
        size={{ xs: 'cover', md: 'auto 459%' }}
      >
        <Header />
        <QuickNav />
        <PageTitle>{content.pages.events.title}</PageTitle>
        {data ? <EventsGrid events={data} /> : <DataStatus loading={loading} error={error} />}
      </PageBackground>
      <Footer rating />
    </>
  )
}

export default EventsPage
