// Výpis rezervací – /vypis-rezervaci: záložky zdrojů, přepínač týdne a karta rozvrhu
import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, fluid } from '../fluid'
import { addDays, formatDayMonth, mondayOf } from '../format'
import { SEO } from '../seo'
import type { ItemsResponse, ReservationResource, ReservationSchedule } from '../types'
import { useFetch } from '../hooks/useFetch'
import DataStatus from '../components/DataStatus'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import QuickNav from '../components/QuickNav'
import ResourceTabs from '../components/ResourceTabs'
import ScheduleTable from '../components/ScheduleTable'
import Seo from '../components/Seo'
import WeekSwitcher from '../components/WeekSwitcher'

// Nadpis jen pro čtečky – návrh viditelný titulek nemá
const visuallyHiddenSx = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const

export function ReservationsPage() {
  const { title, image } = content.pages.reservations
  // Zvolený zdroj; bez volby první ze seznamu
  const [selected, setSelected] = useState<string | null>(null)
  const [weekFrom, setWeekFrom] = useState(() => mondayOf(new Date()))

  const resources = useFetch<ItemsResponse<ReservationResource>>(content.api.reservationResources)
  const items = resources.data?.items ?? []
  const active = items.find((item) => item.slug === selected) ?? items[0] ?? null
  const schedule = useFetch<ReservationSchedule>(active ? content.api.reservationSchedule(active.slug, weekFrom) : null)

  return (
    <>
      <Seo path="/vypis-rezervaci" title={SEO['/vypis-rezervaci'].title} description={SEO['/vypis-rezervaci'].description} noindex />
      <PageBackground image={image} minHeight={{ xs: '100vh', md: '0px' }} viewportHeight position={{ xs: 'center top', md: '50% 42.6%' }}>
        <Header />
        <QuickNav />
        <Typography component="h1" sx={visuallyHiddenSx}>
          {title}
        </Typography>

        {!active ? (
          <DataStatus loading={resources.loading} error={resources.error} />
        ) : (
          <>
            <ResourceTabs resources={items} active={active.slug} onChange={setSelected} />
            <WeekSwitcher
              label={`${active.name} ${formatDayMonth(weekFrom)} - ${formatDayMonth(addDays(weekFrom, 6))}`}
              onPrev={() => setWeekFrom((value) => addDays(value, -7))}
              onNext={() => setWeekFrom((value) => addDays(value, 7))}
            />
            <ScheduleTable weekFrom={weekFrom} schedule={schedule.data} loading={schedule.loading} error={schedule.error} notFound={schedule.notFound} />
          </>
        )}

        {/* Mezera pod kartou k dolnímu okraji sekce */}
        <Box aria-hidden sx={{ height: { xs: fluid(60, 70), md: desktopScaled(109) } }} />
      </PageBackground>
    </>
  )
}

export default ReservationsPage
