// Úvodní nadpis homepage: „pohodové / sport a relax / centrum v Pardubicích“
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS, FONT_SCRIPT } from '../theme'

const lineSx = {
  display: 'block',
  fontSize: fluid(50, 54),
  lineHeight: fluid(52, 56),
  fontWeight: 600,
  fontStyle: 'italic',
  color: COLORS.white,
} as const

export function Hero() {
  return (
    <Box
      component="h1"
      sx={{ margin: 0, paddingTop: fluid(78, 84), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34), textAlign: 'center' }}
    >
      <Typography component="span" sx={lineSx}>
        {content.hero.lineA}
      </Typography>
      <Typography
        component="span"
        sx={{
          display: 'block',
          fontFamily: FONT_SCRIPT,
          fontSize: fluid(39, 55),
          lineHeight: fluid(48, 60),
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          color: COLORS.white,
        }}
      >
        {content.hero.script}
      </Typography>
      <Typography component="span" sx={lineSx}>
        {content.hero.lineB}
      </Typography>
    </Box>
  )
}

export default Hero
