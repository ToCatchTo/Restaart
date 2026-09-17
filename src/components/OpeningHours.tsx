// Otevírací doba – bloky „dny / hodiny“; desktop: dva sloupce (PO,ST,PÁ + SOBOTA | ÚT,ČT + NEDĚLE)
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS, FONT_SECONDARY } from '../theme'

interface OpeningHoursProps {
  // Desktop: bloky pod sebou v jednom sloupci (stránka Kontakt) místo dvou sloupců (patička)
  column?: boolean
}

const textSx = {
  display: 'block',
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: fluidDesktop(22, 30) },
  color: COLORS.white,
  fontFamily: FONT_SECONDARY,
  fontWeight: 200,
} as const

export function OpeningHours({ column = false }: OpeningHoursProps) {
  return (
    <Box
      component="dl"
      sx={{
        margin: 0,
        // Desktop: sloupec (Kontakt), nebo mřížka 2 × 2 – první sloupec široký jako rozestup v návrhu (692 → 968),
        // nikdy však užší než jeho obsah
        display: { md: column ? 'flex' : 'grid' },
        flexDirection: { md: 'column' },
        gridTemplateColumns: { md: `minmax(max-content, ${desktopScaled(276)}) max-content` },
        rowGap: { md: column ? 0 : fluidDesktop(20, 39) },
      }}
    >
      {content.openingHours.map((group, index) => (
        <Box
          key={group.days}
          sx={{
            // Odsazení mezi bloky podle pořadí v datech (sourozenecký selektor nelze použít – bloky mají různé třídy)
            paddingTop: index === 0 ? 0 : { xs: fluid(24, 28), md: column ? fluidDesktop(18, 24) : 0 },
            // Návrh stránky Kontakt má NEDĚLE před SOBOTOU
            order: { md: column ? [0, 1, 3, 2][index] : 0 },
            paddingRight: { md: column || index % 2 === 1 ? 0 : fluidDesktop(28, 20) },
            boxSizing: 'border-box',
          }}
        >
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
