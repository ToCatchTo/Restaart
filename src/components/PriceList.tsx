// Ceník – řádky „délka | cena“ ve skupinách
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import type { PriceRow } from '../types'

interface PriceListProps {
  groups: PriceRow[][]
}

const cellSx = {
  fontSize: fluid(16, 17),
  lineHeight: fluid(20, 21),
  color: COLORS.white,
  fontWeight: 200,
} as const

export function PriceList({ groups }: PriceListProps) {
  return (
    <Box sx={{ paddingTop: fluid(60, 64), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
      {groups.map((rows, groupIndex) => (
        <Box
          component="ul"
          key={groupIndex}
          sx={{ listStyle: 'none', margin: 0, padding: 0, '& + &': { paddingTop: fluid(5, 6) } }}
        >
          {rows.map((row) => (
            <Box
              component="li"
              key={`${row.duration}-${row.price}`}
              sx={{
                height: fluid(48, 50),
                borderRadius: fluid(17, 18),
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: fluid(27, 29),
                paddingRight: fluid(27, 29),
                '& + &': { marginTop: fluid(5, 6) },
              }}
            >
              <Typography component="span" sx={cellSx}>
                {row.duration}
              </Typography>
              <Typography component="span" sx={cellSx}>
                {row.price}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default PriceList
