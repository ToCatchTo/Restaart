// Otevírací doba – bloky „dny / hodiny“
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS, FONT_SECONDARY } from '../theme'

const textSx = {
  display: 'block',
  fontSize: fluid(16, 17),
  lineHeight: fluid(20, 21),
  color: COLORS.white,
  fontFamily: FONT_SECONDARY,
  fontWeight: 200
} as const

export function OpeningHours() {
  return (
    <Box component="dl" sx={{ margin: 0 }}>
      {content.openingHours.map((group) => (
        <Box key={group.days} sx={{ '& + &': { paddingTop: fluid(24, 28) } }}>
          <Typography component="dt" sx={textSx}>
            {group.days}
          </Typography>
          <Typography component="dd" sx={{ ...textSx, margin: 0 }}>
            {group.hours}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default OpeningHours
