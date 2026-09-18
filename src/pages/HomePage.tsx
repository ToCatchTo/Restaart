// Homepage – hlavička, rychlá navigace, úvodní nadpis, upoutávka na akci, hodnocení Google a patička
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid } from '../fluid'
import { SEO } from '../seo'
import { DESKTOP } from '../theme'
import EventPill from '../components/EventPill'
import Footer from '../components/Footer'
import GoogleRating from '../components/GoogleRating'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Icon from '../components/Icon'
import PageBackground from '../components/PageBackground'
import QuickNav from '../components/QuickNav'
import Seo from '../components/Seo'

export function HomePage() {
  const { eventsLabel } = content.hero

  return (
    <>
      <Seo path="/" description={SEO['/'].description} />
      <PageBackground
        image={content.hero.image}
        height={{ xs: fluid(812, 860), md: 'auto' }}
        viewportHeight
        position={{ xs: 'center top', md: '50% 42.6%' }}
      >
        <Header />
        <QuickNav />
        <EventPill />
        <Hero />
        <GoogleRating />
        {/* Desktop: nápis „akce“ v pravém dolním rohu hera */}
        <Box
          component={Link}
          to={eventsLabel.href}
          aria-label={eventsLabel.alt}
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            right: desktopScaled(DESKTOP.margin),
            bottom: desktopScaled(105),
            lineHeight: 0,
          }}
        >
          <Icon src={eventsLabel.icon} size={desktopType(122)} height={desktopType(31)} />
        </Box>
      </PageBackground>
      <Footer />
    </>
  )
}

export default HomePage
