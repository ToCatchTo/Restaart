// Náhradní stránka pro zatím nenavržené cesty (SLUŽBY, 404)
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'

export function NotFoundPage() {
  return (
    <>
      <PageBackground image={content.hero.image} minHeight={fluid(810, 860)}>
        <Header />
        <QuickNav />
        <PageTitle>{content.pages.notFound.title}</PageTitle>
        <Box sx={{ paddingTop: fluid(40, 44), paddingLeft: fluid(30, 34) }}>
          <Typography
            component={Link}
            to="/"
            sx={{ fontSize: fluid(16, 17), lineHeight: fluid(20, 21), color: COLORS.white, textDecoration: 'underline' }}
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
