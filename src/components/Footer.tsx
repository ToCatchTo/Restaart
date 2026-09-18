// Patička – kontakt, otevírací doba, provozovatel a právní odkazy na fotce; desktop ve sloupcích
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP, FONT_SECONDARY } from '../theme'
import ContactInfo from './ContactInfo'
import FooterCredit from './FooterCredit'
import GoogleRating from './GoogleRating'
import OpeningHours from './OpeningHours'
import PageBackground from './PageBackground'

interface FooterProps {
  // Zkrácená varianta bez kontaktu a otevírací doby
  compact?: boolean
  // Bez vlastní fotky – patička je vložená do sekce, která pozadí už má
  embedded?: boolean
  // Desktop: karta hodnocení Google pod horní hranou patičky
  rating?: boolean
}

// Texty provozovatele – kompaktní varianta má větší písmo
const smallSx = (compact: boolean) =>
  ({
    display: 'block',
    fontSize: { xs: fluid(12, 13), md: fluidDesktop(12.5, compact ? 20 : 16) },
    lineHeight: { xs: fluid(15, 16), md: fluidDesktop(16, compact ? 25 : 20) },
    color: COLORS.white,
    fontFamily: FONT_SECONDARY,
    fontWeight: 200,
  }) as const

const linkSx = {
  ...smallSx(false),
  lineHeight: { xs: fluid(15, 16), md: fluidDesktop(16, 15) },
  textDecoration: 'underline',
} as const

// Textový obsah patičky
function FooterContent({ compact, embedded }: { compact: boolean; embedded: boolean }) {
  const { operatorTitle, operatorLines, premisesTitle, premisesLines, terms, privacy } = content.footer
  const textSx = smallSx(compact)

  return (
    <Box
      component="footer"
      sx={{
        paddingTop: { xs: compact ? fluid(289, 280) : fluid(248, 270), md: compact ? fluidDesktop(40, 58) : fluidDesktop(210, 440) },
        paddingLeft: { xs: fluid(30, 34), md: compact ? 0 : desktopScaled(DESKTOP.content) },
        paddingRight: { xs: fluid(30, 34), md: 0 },
        // Místo pro kredit autora webu u spodního okraje
        paddingBottom: { xs: fluid(68, 68), md: embedded ? 0 : fluidDesktop(70, 95) },
        display: { md: compact ? 'block' : 'flex' },
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        // Mezery jen při zmenšení a zalomení (na 1920 px rozestup určují šířky sloupců)
        columnGap: { md: fluidDesktop(24, 0) },
        rowGap: { md: fluidDesktop(32, 40) },
      }}
    >
      {!compact && (
        <>
          <Box sx={{ paddingTop: { md: desktopScaled(0) }, width: { md: desktopScaled(414) }, minWidth: { md: 'max-content' } }}>
            <ContactInfo />
          </Box>
          <Box sx={{ paddingTop: { xs: fluid(30, 58), md: desktopScaled(0) }, width: { md: desktopScaled(690) }, minWidth: { md: 'max-content' } }}>
            <OpeningHours />
          </Box>
        </>
      )}

      <Box sx={{ flexGrow: { md: 1 }, minWidth: { md: 'max-content' } }}>
        <Box sx={{ paddingTop: compact ? 0 : { xs: fluid(45, 64), md: 0 } }}>
          <Typography component="span" sx={textSx}>
            {operatorTitle}
          </Typography>
          {operatorLines.map((line) => (
            <Typography key={line} component="span" sx={textSx}>
              {line}
            </Typography>
          ))}
        </Box>

        <Box sx={{ paddingTop: { xs: fluid(18, 20), md: fluidDesktop(compact ? 18 : 14, compact ? 25 : 20) } }}>
          <Typography component="span" sx={textSx}>
            {premisesTitle}
          </Typography>
          {premisesLines.map((line) => (
            <Typography key={line} component="span" sx={textSx}>
              {line}
            </Typography>
          ))}
        </Box>

        <Box sx={{ paddingTop: { xs: fluid(42, 46), md: fluidDesktop(compact ? 60 : 32, compact ? 188 : 73) } }}>
          <Typography component={Link} to={terms.href} sx={linkSx}>
            {terms.label}
          </Typography>
          <Typography component={Link} to={privacy.href} sx={{ ...linkSx, paddingTop: { xs: fluid(9, 10), md: fluidDesktop(10, 19) } }}>
            {privacy.label}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export function Footer({ compact = false, embedded = false, rating = false }: FooterProps) {
  if (embedded) return <FooterContent compact={compact} embedded />

  return (
    <PageBackground
      image={content.footer.image}
      minHeight={{ xs: fluid(811, 860), md: desktopScaled(799) }}
      position={{ xs: 'right top', md: '100% 39.6%' }}
      size={{ xs: 'cover', md: '368% auto' }}
    >
      {rating && <GoogleRating desktopOnly anchor="footer-top" />}
      <FooterContent compact={compact} embedded={false} />
      <FooterCredit />
    </PageBackground>
  )
}

export default Footer
