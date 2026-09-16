// Úvodní nadpis homepage: „sportovní centrum / pro celou rodinu“
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fadeInUpSx } from '../animations'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'

// Rozestup animace mezi jednotlivými řádky
const LINE_STAGGER_MS = 120

const lineSx = {
  display: 'block',
  fontSize: fluid(65, 54),
  lineHeight: fluid(60, 56),
  fontWeight: 600,
  color: COLORS.white,
} as const

export function Hero() {
  return (
    <Box
      component="h1"
      sx={{
        margin: 0,
        paddingTop: fluid(40, 84),
        paddingLeft: fluid(30, 34),
        paddingRight: fluid(30, 34),
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
