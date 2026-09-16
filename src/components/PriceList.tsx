// Ceník – jedna prosklená karta, řádky „délka | cena“ ve skupinách
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fluid } from '../fluid'
import { COLORS, FONT_SECONDARY } from '../theme'
import type { PriceRow } from '../types'

interface PriceListProps {
  groups: PriceRow[][]
}

// Délka lekce – tučně hlavním písmem
const durationSx = {
  fontSize: fluid(16, 17),
  lineHeight: fluid(20, 21),
  fontWeight: 500,
  color: COLORS.white,
} as const

// Cena – lehkým písmem
const priceSx = {
  fontSize: fluid(16, 17),
  lineHeight: fluid(20, 21),
  fontFamily: FONT_SECONDARY,
  fontWeight: 200,
  color: COLORS.white,
} as const

// Rozestup mezi řádky (i mezi skupinami)
const ROW_GAP = fluid(25, 27)

export function PriceList({ groups }: PriceListProps) {
  return (
    <Box sx={{ paddingTop: fluid(60, 64), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
      <Box
        sx={{
          borderRadius: fluid(58, 37),
          backgroundColor: 'rgba(255, 255, 255, 0.16)',
          backdropFilter: 'blur(4px)',
          paddingTop: fluid(72, 62),
          paddingBottom: fluid(72, 62),
          paddingLeft: fluid(22, 24),
          paddingRight: fluid(22, 24),
        }}
      >
        {groups.map((rows, groupIndex) => (
          <Box
            component="ul"
            key={groupIndex}
            sx={{ listStyle: 'none', margin: 0, padding: 0, '& + &': { paddingTop: ROW_GAP } }}
          >
            {rows.map((row) => (
              <Box
                component="li"
                key={`${row.duration}-${row.price}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '& + &': { paddingTop: ROW_GAP },
                }}
              >
                <Typography component="span" sx={durationSx}>
                  {row.duration}
                </Typography>
                <Typography component="span" sx={priceSx}>
                  {row.price}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default PriceList
