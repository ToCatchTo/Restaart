// Náhradní stránka pro zatím nenavržené cesty (SLUŽBY, 404)
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP } from '../theme'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'

export function NotFoundPage() {
  usePageTitle(content.pages.notFound.title)

  return (
    <>
      <PageBackground
        image={content.hero.image}
        minHeight={{ xs: fluid(810, 860), md: '0px' }}
        viewportHeight
        overlay={{ xs: COLORS.overlay, md: 'rgba(0, 0, 0, 0.7)' }}
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
