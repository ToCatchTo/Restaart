// Sekce navigace – podtržený nadpis, volitelně rozbalitelný seznam podpoložek
import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, FONT_SECONDARY } from '../theme'
import type { NavSectionData } from '../types'

interface NavSectionProps {
  section: NavSectionData
  onNavigate?: () => void
  // Trvale rozbalený seznam bez možnosti zavření (panel aktivit pod rychlou navigací)
  alwaysOpen?: boolean
  // Řízené rozbalení z nadřazené komponenty (hamburger menu – rozbalená je vždy jen jedna sekce)
  expanded?: boolean
  onToggle?: () => void
}

const headingSx = {
  fontSize: { xs: fluid(20, 22), md: fluidDesktop(21, 25) },
  lineHeight: { xs: fluid(24, 26), md: desktopType(40) },
  fontWeight: 400,
  letterSpacing: '0.02em',
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
  textDecorationThickness: '1.5px',
  color: COLORS.white,
  textTransform: 'uppercase',
} as const

export function NavSection({ section, onNavigate, alwaysOpen = false, expanded, onToggle }: NavSectionProps) {
  // Bez řízení zvenčí si sekce drží vlastní stav rozbalení
  const [localExpanded, setLocalExpanded] = useState(alwaysOpen)
  const isExpanded = alwaysOpen || (expanded ?? localExpanded)
  const toggle = () => {
    if (alwaysOpen) return
    if (onToggle) onToggle()
    else setLocalExpanded((value) => !value)
  }
  const items = section.items ?? []
  const hasItems = items.length > 0

  return (
    <Box>
      {hasItems ? (
        <ButtonBase
          onClick={toggle}
          aria-expanded={isExpanded}
          sx={{ display: 'block', textAlign: 'left' }}
        >
          <Typography component="span" sx={headingSx}>
            {section.label}
          </Typography>
        </ButtonBase>
      ) : section.external ? (
        <Typography component="a" href={section.href} sx={headingSx} onClick={onNavigate}>
          {section.label}
        </Typography>
      ) : (
        <Typography component={Link} to={section.href ?? '/'} sx={headingSx} onClick={onNavigate}>
          {section.label}
        </Typography>
      )}

      {hasItems && (
        <Collapse in={isExpanded}>
          <Box
            component="ul"
            sx={{ listStyle: 'none', margin: 0, padding: 0, paddingTop: { xs: fluid(14, 16), md: desktopScaled(9) } }}
          >
            {items.map((item) => (
              <Box
                component="li"
                key={item.href}
                sx={{
                  paddingLeft: { xs: fluid(37, 40), md: desktopScaled(38) },
                  '& + &': { paddingTop: { xs: fluid(14, 16), md: 0 } },
                }}
              >
                <Typography
                  component={Link}
                  to={item.href}
                  onClick={onNavigate}
                  sx={{
                    display: { md: 'block' },
                    fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 25) },
                    lineHeight: { xs: fluid(26, 28), md: desktopType(40) },
                    fontFamily: FONT_SECONDARY,
                    fontWeight: 200,
                    color: COLORS.white,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

export default NavSection
