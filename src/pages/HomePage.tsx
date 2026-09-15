// Homepage – hlavička, rychlá navigace, úvodní nadpis, upoutávka na akci, hodnocení Google, patička
import { content } from '../content'
import { fluid } from '../fluid'
import { usePageTitle } from '../hooks/usePageTitle'
import EventPill from '../components/EventPill'
import Footer from '../components/Footer'
import GoogleRating from '../components/GoogleRating'
import Header from '../components/Header'
import Hero from '../components/Hero'
import PageBackground from '../components/PageBackground'
import QuickNav from '../components/QuickNav'

export function HomePage() {
  usePageTitle(content.titles.home)

  return (
    <>
      <PageBackground image={content.hero.image} height={fluid(812, 860)}>
        <Header />
        <QuickNav />
        <Hero />
        <EventPill />
        <GoogleRating />
      </PageBackground>
      <Footer />
    </>
  )
}

export default HomePage
