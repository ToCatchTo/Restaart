// Mřížka akcí (CSS grid) – mobil dva sloupce, desktop pět karet 207 px v centrovaném bloku 1088 px;
// při zmenšování okna karet na řádku ubývá, aby zůstaly dostatečně velké
import Box from '@mui/material/Box'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import type { Event } from '../types'
import EventCard from './EventCard'

interface EventsGridProps {
  events: Event[]
}

// Desktop: nejmenší šířka karty (na 1920 px se do bloku vejde právě pět karet)
const CARD_MIN_WIDTH = fluidDesktop(150, 200)

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: `repeat(auto-fill, minmax(${CARD_MIN_WIDTH}, 1fr))` },
        columnGap: { xs: fluid(31, 34), md: fluidDesktop(12, 13.25) },
        rowGap: { xs: fluid(30, 38), md: fluidDesktop(24, 40) },
        paddingTop: { xs: fluid(40, 44), md: desktopScaled(107) },
        paddingLeft: { xs: fluid(30, 34), md: 0 },
        paddingRight: { xs: fluid(30, 34), md: 0 },
        width: { md: fluidDesktop(512, 1088) },
        marginX: { md: 'auto' },
      }}
    >
      {events.map((event) => (
        <EventCard key={event.slug} event={event} />
      ))}
    </Box>
  )
}

export default EventsGrid
