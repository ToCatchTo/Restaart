// Právní stránka (obchodní podmínky / ochrana osobních údajů) – text na šedém pozadí bez fotky a patičky
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { SEO } from '../seo'
import { COLORS, DESKTOP, columnSx } from '../theme'
import Header from '../components/Header'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'
import Seo from '../components/Seo'

interface LegalPageProps {
  page: keyof typeof content.legal
}

// Desktop: text ve sloupci 812 px od obsahové hrany, písmo 16/25
const headingSx = {
  display: 'block',
  margin: 0,
  fontSize: { xs: fluid(18, 19), md: fluidDesktop(18.4, 20) },
  lineHeight: { xs: fluid(24, 25), md: desktopType(30) },
  fontWeight: { xs: 500, md: 600 },
  letterSpacing: { xs: '0.02em', md: 0 },
  color: COLORS.white,
} as const

const paragraphSx = {
  display: 'block',
  margin: 0,
  paddingTop: { xs: fluid(12, 14), md: desktopScaled(14) },
  fontSize: { xs: fluid(15, 16), md: fluidDesktop(15.4, 16) },
  lineHeight: { xs: fluid(24, 26), md: desktopType(25) },
  fontWeight: 400,
  letterSpacing: { xs: '0.02em', md: 0 },
  color: COLORS.white,
} as const

// Mobilní okraje; desktop: sloupec 812 px od obsahové hrany
const gutterSx = {
  paddingLeft: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) },
  paddingRight: { xs: fluid(30, 34), md: 0 },
  maxWidth: { md: desktopScaled(812) },
} as const

export function LegalPage({ page }: LegalPageProps) {
  const { title, updated, sections } = content.legal[page]
  const path = page === 'terms' ? content.footer.terms.href : content.footer.privacy.href

  return (
    <Box sx={{ ...columnSx, minHeight: '100vh', backgroundColor: COLORS.dark }}>
      <Seo path={path} title={SEO[path].title} description={SEO[path].description} />
      <Header />
      <QuickNav />
      <PageTitle alignDesktop="left" variantDesktop="small" topDesktop={78} widthDesktop={812}>
        {title}
      </PageTitle>
      <Typography component="span" sx={{ ...paragraphSx, ...gutterSx, paddingTop: { xs: fluid(14, 16), md: desktopScaled(20) } }}>
        {updated}
      </Typography>

      <Box
        component="article"
        sx={{
          ...gutterSx,
          paddingTop: { xs: fluid(40, 44), md: desktopScaled(58) },
          paddingBottom: { xs: fluid(60, 70), md: desktopScaled(110) },
        }}
      >
        {sections.map((section) => (
          <Box key={section.heading} component="section" sx={{ '& + &': { paddingTop: { xs: fluid(32, 36), md: desktopScaled(40) } } }}>
            <Typography component="h2" sx={headingSx}>
              {section.heading}
            </Typography>
            {section.paragraphs.map((paragraph) => (
              <Typography key={paragraph} component="p" sx={paragraphSx}>
                {paragraph}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default LegalPage
