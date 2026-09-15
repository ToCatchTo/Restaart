// Právní stránka (obchodní podmínky / zásady ochrany osobních údajů) – jen text na šedém pozadí, bez fotky a patičky
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import { usePageTitle } from '../hooks/usePageTitle'
import Header from '../components/Header'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'

interface LegalPageProps {
  page: keyof typeof content.legal
}

const headingSx = {
  display: 'block',
  margin: 0,
  fontSize: fluid(18, 19),
  lineHeight: fluid(24, 25),
  fontWeight: 500,
  letterSpacing: '0.02em',
  color: COLORS.white,
} as const

const paragraphSx = {
  display: 'block',
  margin: 0,
  paddingTop: fluid(12, 14),
  fontSize: fluid(15, 16),
  lineHeight: fluid(24, 26),
  fontWeight: 200,
  letterSpacing: '0.02em',
  color: COLORS.white,
} as const

export function LegalPage({ page }: LegalPageProps) {
  const { title, updated, sections } = content.legal[page]
  usePageTitle(title)

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: COLORS.dark }}>
      <Header />
      <QuickNav />
      <PageTitle>{title}</PageTitle>
      <Typography component="span" sx={{ ...paragraphSx, paddingTop: fluid(14, 16), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
        {updated}
      </Typography>

      <Box
        component="article"
        sx={{
          paddingTop: fluid(40, 44),
          paddingLeft: fluid(30, 34),
          paddingRight: fluid(30, 34),
          paddingBottom: fluid(60, 70),
        }}
      >
        {sections.map((section) => (
          <Box key={section.heading} component="section" sx={{ '& + &': { paddingTop: fluid(32, 36) } }}>
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
