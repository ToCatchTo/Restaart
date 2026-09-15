// Patička – fotka na pozadí, kontakt, otevírací doba, provozovatel a právní odkazy
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import ContactInfo from './ContactInfo'
import OpeningHours from './OpeningHours'
import PageBackground from './PageBackground'

interface FooterProps {
  // Zkrácená varianta bez kontaktu a otevírací doby (stránka Kontakt je má v obsahu)
  compact?: boolean
  // Vykreslit bez vlastní fotky – patička je vložená do sekce stránky, která pozadí už má
  embedded?: boolean
}

const smallSx = {
  display: 'block',
  fontSize: fluid(12, 13),
  lineHeight: fluid(15, 16),
  color: COLORS.white,
  fontWeight: 200
} as const

// Textový obsah patičky
function FooterContent({ compact }: { compact: boolean }) {
  const { operatorTitle, operatorLines, premisesTitle, premisesLines, terms, privacy } = content.footer

  return (
    <Box
      component="footer"
      sx={{ paddingTop: compact ? fluid(289, 280) : fluid(248, 270), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34), paddingBottom: compact ? fluid(68, 68) : fluid(34, 34) }}
    >
      {!compact && (
        <>
          <ContactInfo />
          <Box sx={{ paddingTop: fluid(30, 58) }}>
            <OpeningHours />
          </Box>
        </>
      )}

      <Box sx={{ paddingTop: compact ? 0 : fluid(45, 64) }}>
        <Typography component="span" sx={smallSx}>
          {operatorTitle}
        </Typography>
        {operatorLines.map((line) => (
          <Typography key={line} component="span" sx={smallSx}>
            {line}
          </Typography>
        ))}
      </Box>

      <Box sx={{ paddingTop: fluid(18, 20) }}>
        <Typography component="span" sx={smallSx}>
          {premisesTitle}
        </Typography>
        {premisesLines.map((line) => (
          <Typography key={line} component="span" sx={smallSx}>
            {line}
          </Typography>
        ))}
      </Box>

      <Box sx={{ paddingTop: fluid(42, 46) }}>
        <Typography component={Link} to={terms.href} sx={{ ...smallSx, textDecoration: 'underline' }}>
          {terms.label}
        </Typography>
        <Typography
          component={Link}
          to={privacy.href}
          sx={{ ...smallSx, textDecoration: 'underline', paddingTop: fluid(9, 10) }}
        >
          {privacy.label}
        </Typography>
      </Box>
    </Box>
  )
}

export function Footer({ compact = false, embedded = false }: FooterProps) {
  if (embedded) return <FooterContent compact={compact} />

  return (
    <PageBackground image={content.footer.image} minHeight={fluid(811, 860)} overlay="rgba(0, 0, 0, 0.6)" position="right top">
      <FooterContent compact={compact} />
    </PageBackground>
  )
}

export default Footer
