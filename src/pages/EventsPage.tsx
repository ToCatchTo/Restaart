// Seznam akcí – /akce
import { content } from '../content'
import { fluid } from '../fluid'
import type { Event } from '../types'
import { useFetch } from '../hooks/useFetch'
import DataStatus from '../components/DataStatus'
import EventsGrid from '../components/EventsGrid'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'

export function EventsPage() {
  const { data, loading, error } = useFetch<Event[]>(content.api.events)

  return (
    <>
      <PageBackground image={content.pages.events.image} minHeight={fluid(1238, 1300)} overlay="rgba(0, 0, 0, 0.65)">
        <Header />
        <QuickNav />
        <PageTitle>{content.pages.events.title}</PageTitle>
        {data ? <EventsGrid events={data} /> : <DataStatus loading={loading} error={error} />}
      </PageBackground>
      <Footer />
    </>
  )
}

export default EventsPage
