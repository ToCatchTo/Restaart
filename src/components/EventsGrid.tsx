// Mřížka akcí – dva sloupce (MUI Grid)
import Grid from '@mui/material/Grid'
import { fluid } from '../fluid'
import type { Event } from '../types'
import EventCard from './EventCard'

interface EventsGridProps {
  events: Event[]
}

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <Grid
      container
      columnSpacing={fluid(31, 34)}
      rowSpacing={fluid(30, 38)}
      sx={{ paddingTop: fluid(40, 44), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}
    >
      {events.map((event) => (
        <Grid key={event.slug} size={6}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  )
}

export default EventsGrid
