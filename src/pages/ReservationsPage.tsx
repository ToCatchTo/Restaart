// Výpis rezervací – /vypis-rezervaci: záložky typů, přepínač týdne, karta rozvrhu a podmínky z API; pozadí podle podstránky aktivity
import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { addDays, formatDayMonth, mondayOf } from '../format'
import { scheduleCardWidth, scheduleGutter } from '../reservations'
import { SEO } from '../seo'
import { visuallyHiddenSx } from '../theme'
import type { PageDetail, ReservationTypeSlug, ReservationWeek } from '../types'
import { useFetch } from '../hooks/useFetch'
import ArrowLinkButton from '../components/ArrowLinkButton'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import ResourceTabs from '../components/ResourceTabs'
import RichText from '../components/RichText'
import ScheduleTable from '../components/ScheduleTable'
import Seo from '../components/Seo'
import WeekSwitcher from '../components/WeekSwitcher'

// Podmínky pod kartou ve sloupci stejné šířky jako karta (vnější okraj stránky přidává obal)
const noteSx = {
  width: scheduleCardWidth,
  boxSizing: 'border-box',
  marginX: 'auto',
  paddingTop: { xs: fluid(24, 28), md: desktopScaled(32) },
  paddingLeft: { xs: fluid(24, 26), md: fluidDesktop(60, 131) },
  paddingRight: { xs: fluid(24, 26), md: fluidDesktop(60, 131) },
  fontSize: { xs: fluid(14, 15), md: fluidDesktop(14, 16) },
  lineHeight: { xs: fluid(20, 22), md: fluidDesktop(20, 24) },
} as const

export function ReservationsPage() {
  const { title, image, types, reserve } = content.pages.reservations
  const [selected, setSelected] = useState<ReservationTypeSlug>(types[0].slug)
  const [weekFrom, setWeekFrom] = useState(() => mondayOf(new Date()))

  const active = types.find((type) => type.slug === selected) ?? types[0]
  const week = useFetch<ReservationWeek>(content.api.reservations(active.slug, weekFrom))

  // Fotka pozadí z podstránky aktivity; během načítání zůstává předchozí, bez fotky úvodní
  const page = useFetch<PageDetail>(content.api.page(active.page))
  const [shownImage, setShownImage] = useState(image)
  const nextImage = page.data ? (page.data.backgroundImage ?? image) : page.loading ? shownImage : image
  if (nextImage !== shownImage) setShownImage(nextImage)

  return (
    <>
      <Seo path="/vypis-rezervaci" title={SEO['/vypis-rezervaci'].title} description={SEO['/vypis-rezervaci'].description} noindex />
      <PageBackground image={shownImage} fixedImage minHeight={{ xs: '100vh', md: '0px' }} viewportHeight position={{ xs: 'center top', md: '50% 42.6%' }}>
        <Header />
        <Typography component="h1" sx={visuallyHiddenSx}>
          {title}
        </Typography>

        <ResourceTabs resources={types} active={active.slug} onChange={setSelected} />

        {/* Mobil: odkaz na přihlášení k rezervacím pod záložkami, užší a vycentrovaný jako tlačítko „přihlásit“ */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            paddingTop: fluid(24, 28),
            paddingLeft: fluid(30, 34),
            paddingRight: fluid(30, 34),
          }}
        >
          <ArrowLinkButton
            label={reserve.label}
            icon={reserve.icon}
            href={reserve.href}
            iconSize={fluid(27, 28)}
            textWidth={fluid(137, 140)}
            fontSize={fluid(16, 17)}
            lineHeight={fluid(20, 21)}
            sx={{
              minWidth: fluid(188, 190),
              height: fluid(54, 56),
              borderRadius: fluid(27, 28),
              paddingLeft: fluid(11, 12),
              paddingRight: fluid(12, 13),
            }}
          />
        </Box>
        <WeekSwitcher
          label={`${active.name} ${formatDayMonth(weekFrom)} - ${formatDayMonth(addDays(weekFrom, 6))}`}
          onPrev={() => setWeekFrom((value) => addDays(value, -7))}
          onNext={() => setWeekFrom((value) => addDays(value, 7))}
        />
        <ScheduleTable weekFrom={weekFrom} week={week.data} loading={week.loading} error={week.error} />

        {week.data?.note && (
          <Box sx={{ paddingLeft: scheduleGutter, paddingRight: scheduleGutter }}>
            <RichText html={week.data.note} sx={noteSx} />
          </Box>
        )}

        {/* Mezera pod kartou k dolnímu okraji sekce */}
        <Box aria-hidden sx={{ height: { xs: fluid(60, 70), md: desktopScaled(109) } }} />
      </PageBackground>
    </>
  )
}

export default ReservationsPage
