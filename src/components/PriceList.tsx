// Ceník – prosklená karta s řádky „délka | cena“ ve skupinách
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fadeInUpSx } from '../animations'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS } from '../theme'
import { useInView } from '../hooks/useInView'
import type { PriceRow } from '../types'

interface PriceListProps {
  groups: PriceRow[][]
}

// Délka lekce
const durationSx = {
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 24) },
  lineHeight: { xs: fluid(20, 21), md: fluidDesktop(21, 25) },
  fontWeight: 500,
  color: COLORS.white,
} as const

// Cena – lehkým písmem
const priceSx = {
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 24) },
  lineHeight: { xs: fluid(20, 21), md: fluidDesktop(21, 25) },
  fontWeight: 400,
  color: COLORS.white,
} as const

// Rozestup mezi řádky i skupinami
const ROW_GAP = { xs: fluid(25, 27), md: fluidDesktop(22, 35) }

export function PriceList({ groups }: PriceListProps) {
  // Karta se zjeví po najetí do viewportu; animace na obalu by vypnula backdrop-filter
  const { ref, inView } = useInView<HTMLDivElement>(0.5)

  return (
    <Box
      sx={{
        paddingTop: { xs: fluid(60, 64), md: 0 },
        paddingLeft: { xs: fluid(30, 34), md: 0 },
        paddingRight: { xs: fluid(30, 34), md: 0 },
      }}
    >
      <Box
        ref={ref}
        sx={{
          ...(inView ? fadeInUpSx() : { opacity: 0 }),
          borderRadius: { xs: fluid(58, 37), md: fluidDesktop(40, 80) },
          backgroundColor: { xs: 'rgba(255, 255, 255, 0.16)', md: 'rgba(88, 88, 88, 0.6)' },
          backdropFilter: 'blur(8px)',
          width: { md: '100%' },
          minHeight: { md: desktopScaled(419) },
          boxSizing: 'border-box',
          paddingTop: { xs: fluid(72, 62), md: fluidDesktop(32, 45) },
          paddingBottom: { xs: fluid(72, 62), md: fluidDesktop(32, 45) },
          paddingLeft: { xs: fluid(22, 24), md: fluidDesktop(28, 57) },
          paddingRight: { xs: fluid(22, 24), md: fluidDesktop(28, 57) },
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
