// Otevírací doba – bloky „dny / hodiny“; desktop: dva sloupce (PO,ST,PÁ + SOBOTA | ÚT,ČT + NEDĚLE)
import { Fragment } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, FONT_SECONDARY } from '../theme'

interface OpeningHoursProps {
  // Desktop: bloky pod sebou v jednom sloupci (stránka Kontakt) místo dvou sloupců (patička)
  column?: boolean
}

const textSx = {
  display: 'block',
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: desktopType(30) },
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
        display: { md: 'flex' },
        flexDirection: { md: column ? 'column' : 'row' },
        flexWrap: 'wrap',
        rowGap: { md: column ? 0 : desktopScaled(39) },
      }}
    >
      {content.openingHours.map((group, index) => (
        <Fragment key={group.days}>
        {/* Desktop, dva sloupce: po každé dvojici zalomit řádek */}
        {!column && index > 0 && index % 2 === 0 && <Box aria-hidden sx={{ display: { xs: 'none', md: 'block' }, flexBasis: '100%' }} />}
        <Box
          sx={{
            // Odsazení mezi bloky podle pořadí v datech (sourozenecký selektor nelze použít – bloky mají různé třídy)
            paddingTop: index === 0 ? 0 : { xs: fluid(24, 28), md: column ? desktopScaled(24) : 0 },
            // Návrh stránky Kontakt má NEDĚLE před SOBOTOU
            order: { md: column ? [0, 1, 3, 2][index] : 0 },
            // Šířka prvního sloupce = rozestup sloupců v návrhu (692 → 968)
            width: { md: column ? 'auto' : index % 2 === 0 ? desktopScaled(276) : 'auto' },
            minWidth: { md: 'max-content' },
            paddingRight: { md: column ? 0 : desktopScaled(20) },
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
        </Fragment>
      ))}
    </Box>
  )
}

export default OpeningHours
