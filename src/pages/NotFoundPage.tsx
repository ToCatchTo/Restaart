// Náhradní stránka pro zatím nenavržené cesty (SLUŽBY, 404)
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { NOT_FOUND_SEO } from '../seo'
import { COLORS, DESKTOP } from '../theme'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'
import Seo from '../components/Seo'

export function NotFoundPage() {
  const location = useLocation()

  return (
    <>
      <Seo path={location.pathname} title={NOT_FOUND_SEO.title} description={NOT_FOUND_SEO.description} noindex />
      <PageBackground
        image={content.hero.image}
        minHeight={{ xs: fluid(810, 860), md: '0px' }}
        viewportHeight
        position={{ xs: 'center top', md: '50% 42.6%' }}
      >
        <Header />
        <QuickNav />
        <PageTitle topDesktop={120}>{content.pages.notFound.title}</PageTitle>
        <Box sx={{ paddingTop: { xs: fluid(40, 44), md: desktopScaled(60) }, paddingLeft: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) }, textAlign: { md: 'center' } }}>
          <Typography
            component={Link}
            to="/"
            sx={{
              fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
              lineHeight: { xs: fluid(20, 21), md: desktopType(25) },
              color: COLORS.white,
              textDecoration: 'underline',
            }}
          >
            {content.pages.notFound.back}
          </Typography>
        </Box>
      </PageBackground>
      <Footer />
    </>
  )
}

export default NotFoundPage
