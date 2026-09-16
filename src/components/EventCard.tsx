// Čtvercová karta akce s bílým štítkem data
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS, FONT_BODY, FONT_LABEL } from '../theme'
import type { Event } from '../types'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <ButtonBase
      component={Link}
      to={`/akce/${event.slug}`}
      sx={{ display: 'block', width: '100%', position: 'relative', textAlign: 'left' }}
    >
      <Box
        component="img"
        src={event.image}
        alt={event.title}
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          borderRadius: { xs: fluid(31, 33), md: desktopScaled(31) },
          backgroundColor: COLORS.gray,
          boxShadow: { md: '2px 2px 15px rgba(0, 0, 0, 0.16)' },
        }}
      />
      <Typography
        component="span"
        sx={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          height: { xs: fluid(41, 38), md: desktopScaled(58) },
          width: { md: desktopScaled(123) },
          boxSizing: 'border-box',
          paddingLeft: { xs: fluid(16, 17), md: 0 },
          paddingRight: { xs: fluid(16, 17), md: 0 },
          borderRadius: { xs: fluid(20, 19), md: desktopScaled(20) },
          backgroundColor: COLORS.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: { xs: FONT_LABEL, md: FONT_BODY },
          fontSize: { xs: fluid(20, 17), md: fluidDesktop(12, 28) },
          lineHeight: 1,
          fontWeight: 600,
          color: COLORS.black,
          letterSpacing: { xs: '0.02em', md: 0 },
        }}
      >
        {event.date}
      </Typography>
    </ButtonBase>
  )
}

export default EventCard
