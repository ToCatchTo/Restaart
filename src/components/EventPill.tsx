// Tyrkysové tlačítko s upoutávkou na akci – obal má pevnou výšku i při skrytém tlačítku
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { SITE_ORIGIN } from '../seo'
import { COLORS, hoverDarkenSx } from '../theme'
import type { SpecialEvent } from '../types'
import Icon from './Icon'

interface EventPillProps {
  // null = tlačítko se nevykreslí, místo zůstane
  event: SpecialEvent | null
}

// Doména webu bez www
const SITE_HOST = new URL(SITE_ORIGIN).hostname.replace(/^www\./, '')

// Cesta v rámci webu, nebo null u odkazu jinam
const internalPath = (url: string) => {
  try {
    const target = new URL(url, window.location.origin)
    const isOwn = target.origin === window.location.origin || target.hostname.replace(/^www\./, '') === SITE_HOST
    return isOwn ? target.pathname + target.search + target.hash : null
  } catch {
    return null
  }
}

export function EventPill({ event }: EventPillProps) {
  const { arrowIcon } = content.eventPill
  const path = event ? internalPath(event.url) : null
  // Odkaz v rámci webu přes router, jinak běžný odkaz v novém panelu
  const linkProps = path !== null ? { component: Link, to: path } : { component: 'a', href: event?.url, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Box
      sx={{
        // Mobil: výška = horní odsazení + výška tlačítka
        height: { xs: fluid(72, 110), md: 'auto' },
        boxSizing: 'border-box',
        paddingTop: { xs: fluid(25, 60), md: fluidDesktop(76, 86) },
        paddingLeft: { xs: fluid(30, 34), md: desktopScaled(282) },
        paddingRight: { xs: fluid(30, 34), md: 0 },
      }}
    >
      {event && (
        <ButtonBase
          {...linkProps}
          sx={{
            width: { xs: '100%', md: fluidDesktop(320, 532) },
            minWidth: { md: 'max-content' },
            height: { xs: fluid(47, 50), md: fluidDesktop(40, 47) },
            borderRadius: { xs: fluid(24, 25), md: fluidDesktop(20, 24) },
            backgroundColor: COLORS.cyan,
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingLeft: { xs: fluid(22, 22), md: fluidDesktop(18, 21) },
            paddingRight: { xs: fluid(10, 22), md: fluidDesktop(10, 12) },
            gap: fluid(14, 16),
            color: COLORS.black,
            ...hoverDarkenSx(),
          }}
        >
          <Typography
            component="span"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
              lineHeight: { xs: fluid(20, 21), md: fluidDesktop(21, 25) },
              fontWeight: 500,
              fontStyle: 'italic',
              color: COLORS.black,
            }}
          >
            {event.title}
          </Typography>
          <Icon src={arrowIcon} size={{ xs: fluid(28, 15), md: fluidDesktop(24, 27.8) }} />
        </ButtonBase>
      )}
    </Box>
  )
}

export default EventPill
