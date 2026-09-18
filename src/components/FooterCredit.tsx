// Kredit autora webu u spodního okraje sekce
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid, fluidDesktop } from '../fluid'
import { COLORS, FONT_SECONDARY } from '../theme'

export function FooterCredit() {
  const { label, href, logo, logoAlt, logoIcon, logoIconAlt } = content.footer.credit

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: { xs: fluid(24, 24), md: fluidDesktop(24, 40) },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component="a"
        href={href}
        target="_blank"
        rel="noreferrer"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: { xs: fluid(15, 20), md: fluidDesktop(18, 25) },
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          '&:hover': { opacity: 0.7 },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: { xs: fluid(12, 13), md: fluidDesktop(14, 16) },
            lineHeight: { xs: fluid(15, 16), md: fluidDesktop(18, 20) },
            color: COLORS.white,
            fontFamily: FONT_SECONDARY,
            fontWeight: 200,
          }}
        >
          {label}
        </Typography>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <Box
            component="img"
            src={logo}
            alt={logoAlt}
            loading="lazy"
            decoding="async"
            sx={{ display: 'block', width: 'auto', height: { xs: fluid(13, 14), md: fluidDesktop(13, 15) } }}
          />
          <Box
            component="img"
            src={logoIcon}
            alt={logoIconAlt}
            loading="lazy"
            decoding="async"
            sx={{ display: 'block', width: 'auto', height: { xs: fluid(13, 14), md: fluidDesktop(13, 15) } }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default FooterCredit
