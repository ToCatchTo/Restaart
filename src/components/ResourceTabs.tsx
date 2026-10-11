// Záložky zdrojů rezervací – řádek pilulek, aktivní má tyrkysovou výplň; mobil: pod sebou
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP, hoverDarkenSx } from '../theme'
import type { ReservationResource } from '../types'

interface ResourceTabsProps {
  resources: ReservationResource[]
  active: string
  onChange: (slug: string) => void
}

export function ResourceTabs({ resources, active, onChange }: ResourceTabsProps) {
  return (
    <Box
      role="tablist"
      aria-label={content.pages.reservations.tabsLabel}
      sx={{
        display: 'flex',
        // Mobil: záložky pod sebou přes celou šířku
        flexDirection: { xs: 'column', md: 'row' },
        // Desktop: úzké okno zalomí záložky na další řádek
        flexWrap: { md: 'wrap' },
        justifyContent: { md: 'center' },
        gap: { xs: fluid(12, 14), md: desktopScaled(35) },
        // Desktop: na menších oknech větší mezera pod hlavičkou
        paddingTop: { xs: fluid(48, 44), md: fluidDesktop(64, 40) },
        paddingLeft: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.margin) },
        paddingRight: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.margin) },
      }}
    >
      {resources.map((resource) => {
        const selected = resource.slug === active
        return (
          <ButtonBase
            key={resource.slug}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(resource.slug)}
            sx={{
              flexShrink: 0,
              width: { xs: '100%', md: 'auto' },
              minWidth: { md: fluidDesktop(120, 190) },
              height: { xs: fluid(44, 48), md: fluidDesktop(44, 58) },
              borderRadius: { xs: fluid(22, 24), md: fluidDesktop(22, 40) },
              paddingLeft: { xs: fluid(20, 24), md: fluidDesktop(16, 12) },
              paddingRight: { xs: fluid(20, 24), md: fluidDesktop(16, 12) },
              boxSizing: 'border-box',
              // Neaktivní záložka má jen bílý rám, aktivní výplň bez rámu
              border: `1px solid ${selected ? 'transparent' : COLORS.white}`,
              backgroundColor: selected ? COLORS.tabActive : 'transparent',
              ...hoverDarkenSx(),
              transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
                lineHeight: { xs: fluid(20, 21), md: fluidDesktop(21, 25) },
                fontWeight: 600,
                color: COLORS.white,
                whiteSpace: 'nowrap',
              }}
            >
              {resource.name}
            </Typography>
          </ButtonBase>
        )
      })}
    </Box>
  )
}

export default ResourceTabs
