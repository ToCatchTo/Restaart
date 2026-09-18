// Čtvercová karta akce s bílým štítkem data
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { fluid, fluidDesktop } from '../fluid'
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
      sx={{
        display: 'block',
        width: '100%',
        position: 'relative',
        textAlign: 'left',
        // Při najetí ztmavne jen fotka, štítek s datem zůstává
        '& > img': { transition: 'filter 0.2s ease' },
        '@media (hover: hover)': { '&:hover > img': { filter: 'brightness(0.75)' } },
      }}
    >
      <Box
        component="img"
        src={event.image}
        alt={event.title}
        loading="lazy"
        decoding="async"
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          borderRadius: { xs: fluid(31, 33), md: fluidDesktop(24, 31) },
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
          height: { xs: fluid(41, 38), md: fluidDesktop(42, 58) },
          width: { md: fluidDesktop(90, 123) },
          boxSizing: 'border-box',
          paddingLeft: { xs: fluid(16, 17), md: 0 },
          paddingRight: { xs: fluid(16, 17), md: 0 },
          borderRadius: { xs: fluid(20, 19), md: fluidDesktop(16, 20) },
          backgroundColor: COLORS.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: { xs: FONT_LABEL, md: FONT_BODY },
          fontSize: { xs: fluid(20, 17), md: fluidDesktop(20, 28) },
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
