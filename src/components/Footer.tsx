// Patička – fotka na pozadí, kontakt, otevírací doba, provozovatel a právní odkazy
// Desktop: čtyři sloupce (kontakt | otevírací doba ve dvou sloupcích | provozovatel + odkazy)
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP, FONT_SECONDARY } from '../theme'
import ContactInfo from './ContactInfo'
import GoogleRating from './GoogleRating'
import OpeningHours from './OpeningHours'
import PageBackground from './PageBackground'

interface FooterProps {
  // Zkrácená varianta bez kontaktu a otevírací doby (stránka Kontakt je má v obsahu)
  compact?: boolean
  // Vykreslit bez vlastní fotky – patička je vložená do sekce stránky, která pozadí už má
  embedded?: boolean
  // Desktop: karta hodnocení Google 97 px pod horní hranou patičky (stránky, kde fotosekce nekončí patičkou)
  rating?: boolean
}

// Texty provozovatele; desktop: 16/20 v patičce, 20/25 na stránce Kontakt
const smallSx = (compact: boolean) =>
  ({
    display: 'block',
    fontSize: { xs: fluid(12, 13), md: fluidDesktop(12.5, compact ? 20 : 16) },
    lineHeight: { xs: fluid(15, 16), md: desktopType(compact ? 25 : 20) },
    color: COLORS.white,
    fontFamily: FONT_SECONDARY,
    fontWeight: 200,
  }) as const

const linkSx = {
  ...smallSx(false),
  lineHeight: { xs: fluid(15, 16), md: desktopType(15) },
  textDecoration: 'underline',
} as const

// Textový obsah patičky
function FooterContent({ compact }: { compact: boolean }) {
  const { operatorTitle, operatorLines, premisesTitle, premisesLines, terms, privacy } = content.footer
  const textSx = smallSx(compact)

  return (
    <Box
      component="footer"
      sx={{
        paddingTop: { xs: compact ? fluid(289, 280) : fluid(248, 270), md: desktopScaled(compact ? 58 : 362) },
        paddingLeft: { xs: fluid(30, 34), md: compact ? 0 : desktopScaled(DESKTOP.content) },
        paddingRight: { xs: fluid(30, 34), md: 0 },
        paddingBottom: { xs: compact ? fluid(68, 68) : fluid(34, 34), md: 0 },
        // Desktop: sloupce začínají na x = 278, 692, 968 a 1382 (kompaktní varianta je jen jeden sloupec);
        // sloupce se při nedostatku místa zalomí pod sebe, aby se texty nepřekrývaly
        display: { md: compact ? 'block' : 'flex' },
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      {!compact && (
        <>
          <Box sx={{ paddingTop: { md: desktopScaled(0) }, width: { md: desktopScaled(414) }, minWidth: { md: 'max-content' } }}>
            <ContactInfo />
          </Box>
          <Box sx={{ paddingTop: { xs: fluid(30, 58), md: desktopScaled(0) }, width: { md: desktopScaled(690) } }}>
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

        <Box sx={{ paddingTop: { xs: fluid(18, 20), md: desktopScaled(compact ? 25 : 20) } }}>
          <Typography component="span" sx={textSx}>
            {premisesTitle}
          </Typography>
          {premisesLines.map((line) => (
            <Typography key={line} component="span" sx={textSx}>
              {line}
            </Typography>
          ))}
        </Box>

        <Box sx={{ paddingTop: { xs: fluid(42, 46), md: desktopScaled(compact ? 188 : 73) } }}>
          <Typography component={Link} to={terms.href} sx={linkSx}>
            {terms.label}
          </Typography>
          <Typography component={Link} to={privacy.href} sx={{ ...linkSx, paddingTop: { xs: fluid(9, 10), md: desktopScaled(19) } }}>
            {privacy.label}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export function Footer({ compact = false, embedded = false, rating = false }: FooterProps) {
  if (embedded) return <FooterContent compact={compact} />

  return (
    <PageBackground
      image={content.footer.image}
      minHeight={{ xs: fluid(811, 860), md: desktopScaled(721) }}
      overlay={{ xs: 'rgba(0, 0, 0, 0.6)', md: 'rgba(0, 0, 0, 0.7)' }}
      position={{ xs: 'right top', md: '100% 39.6%' }}
      size={{ xs: 'cover', md: '368% auto' }}
    >
      {rating && <GoogleRating desktopOnly anchor="footer-top" />}
      <FooterContent compact={compact} />
    </PageBackground>
  )
}

export default Footer
