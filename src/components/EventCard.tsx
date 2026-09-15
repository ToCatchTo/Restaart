// Čtvercová karta akce s bílým štítkem data
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { fluid } from '../fluid'
import { COLORS, FONT_LABEL } from '../theme'
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
          borderRadius: fluid(31, 33),
          backgroundColor: COLORS.gray,
        }}
      />
      <Typography
        component="span"
        sx={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          height: fluid(41, 38),
          paddingLeft: fluid(16, 17),
          paddingRight: fluid(16, 17),
          borderRadius: fluid(20, 19),
          backgroundColor: COLORS.white,
          display: 'flex',
          alignItems: 'center',
          fontFamily: FONT_LABEL,
          fontSize: fluid(20, 17),
          lineHeight: 1,
          fontWeight: 600,
          color: COLORS.black,
          letterSpacing: '0.02em',
        }}
      >
        {event.date}
      </Typography>
    </ButtonBase>
  )
}

export default EventCard
