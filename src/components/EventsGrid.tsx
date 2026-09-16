// Mřížka akcí (MUI Grid) – mobil dva sloupce, desktop pět karet 207 px v centrovaném bloku 1088 px
import Grid from '@mui/material/Grid'
import { desktopScaled, fluid } from '../fluid'
import type { Event } from '../types'
import EventCard from './EventCard'

interface EventsGridProps {
  events: Event[]
}

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <Grid
      container
      columns={{ xs: 12, md: 10 }}
      columnSpacing={{ xs: fluid(31, 34), md: desktopScaled(13.25) }}
      rowSpacing={{ xs: fluid(30, 38), md: desktopScaled(40) }}
      sx={{
        paddingTop: { xs: fluid(40, 44), md: desktopScaled(107) },
        paddingLeft: { xs: fluid(30, 34), md: 0 },
        paddingRight: { xs: fluid(30, 34), md: 0 },
        width: { md: desktopScaled(1088) },
        marginX: { md: 'auto' },
      }}
    >
      {events.map((event) => (
        <Grid key={event.slug} size={{ xs: 6, md: 2 }}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  )
}

export default EventsGrid
