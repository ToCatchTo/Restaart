// Úvodní nadpis homepage: „sportovní centrum / pro celou rodinu“
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fadeInUpSx } from '../animations'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP } from '../theme'

// Rozestup animace mezi jednotlivými řádky
const LINE_STAGGER_MS = 120

const lineSx = {
  display: 'block',
  fontSize: { xs: fluid(65, 60), md: fluidDesktop(60, 160) },
  lineHeight: { xs: fluid(60, 58), md: fluidDesktop(58, 150) },
  fontWeight: 600,
  color: COLORS.white,
} as const

export function Hero() {
  return (
    <Box
      component="h1"
      sx={{
        margin: 0,
        paddingTop: { xs: fluid(40, 84), md: desktopScaled(40) },
        // Návrh: nadpis začíná 2 px nad spodní hranou upoutávky
        marginTop: { md: desktopScaled(-2) },
        paddingLeft: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) },
        paddingRight: { xs: fluid(30, 34), md: 0 },
        maxWidth: { md: desktopScaled(950) },
        boxSizing: { md: 'content-box' },
        textAlign: 'left',
      }}
    >
      {content.hero.lines.map((line, index) => (
        <Typography key={line} component="span" sx={{ ...lineSx, ...fadeInUpSx(index * LINE_STAGGER_MS) }}>
          {line}
        </Typography>
      ))}
    </Box>
  )
}

export default Hero
