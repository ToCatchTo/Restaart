// Otevírací doba – bloky „dny / hodiny“; desktop: mřížka 2 × 2 nebo jeden sloupec
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS } from '../theme'
import { useFetch } from '../hooks/useFetch'
import type { OpeningHoursData } from '../types'

interface OpeningHoursProps {
  // Desktop: bloky pod sebou v jednom sloupci (stránka Kontakt)
  column?: boolean
}

const textSx = {
  display: 'block',
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: fluidDesktop(22, 30) },
  color: COLORS.white,
  fontWeight: 400,
} as const

export function OpeningHours({ column = false }: OpeningHoursProps) {
  const { data } = useFetch<OpeningHoursData>(content.api.openingHours)

  // Bez dnes platné otevírací doby (404) nebo při chybě se blok nevykreslí
  if (!data) return null

  return (
    <Box
      component="dl"
      sx={{
        margin: 0,
        // Desktop: první sloupec mřížky drží šířku z návrhu, nikdy užší než obsah
        display: { md: column ? 'flex' : 'grid' },
        flexDirection: { md: 'column' },
        gridTemplateColumns: { md: `minmax(max-content, ${desktopScaled(276)}) max-content` },
        rowGap: { md: column ? 0 : fluidDesktop(20, 39) },
      }}
    >
      {data.items.map((group, index) => (
        <Box
          key={`${index}-${group.label}`}
          sx={{
            // Odsazení mezi bloky podle pořadí v datech
            paddingTop: index === 0 ? 0 : { xs: fluid(24, 28), md: column ? fluidDesktop(18, 24) : 0 },
            paddingRight: { md: column || index % 2 === 1 ? 0 : fluidDesktop(28, 20) },
            boxSizing: 'border-box',
          }}
        >
          <Typography component="dt" sx={textSx}>
            {group.label}
          </Typography>
          <Typography component="dd" sx={{ ...textSx, margin: 0 }}>
            {group.value}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default OpeningHours
