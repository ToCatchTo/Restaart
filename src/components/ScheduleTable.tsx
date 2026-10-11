// Karta týdenního rozvrhu – tabulka dny × časy, barevné pilulky termínů, šedá = obsazeno, blesk = bez termínu
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { addDays, formatDayMonth } from '../format'
import { COLORS, DESKTOP } from '../theme'
import type { ReservationSchedule, ScheduleSlot } from '../types'
import DataStatus from './DataStatus'
import Icon from './Icon'

interface ScheduleTableProps {
  // Pondělí zobrazeného týdne (ISO)
  weekFrom: string
  schedule: ReservationSchedule | null
  loading?: boolean
  error?: string | null
  notFound?: boolean
}

// Minimální šířka tabulky (sloupec časů 56 + 7 dnů po 112), pod ní se karta posouvá vodorovně
const TABLE_MIN_WIDTH = '840px'
const TIME_COLUMN_WIDTH = { xs: '56px', md: fluidDesktop(56, 96) }
// Volný sloupec vpravo, aby poslední den nebyl u okraje karty
const END_COLUMN_WIDTH = { xs: '24px', md: fluidDesktop(24, 44) }
// Šířka obsahu buňky, do které se vejde jedna nebo více pilulek
const CELL_CONTENT_WIDTH = '80px'

const lineSx = { borderBottom: `1px solid ${COLORS.white}` } as const

const headerCellSx = {
  ...lineSx,
  height: { xs: '40px', md: fluidDesktop(40, 41.5) },
  padding: 0,
  fontSize: '12px',
  lineHeight: 1,
  fontWeight: 500,
  color: COLORS.white,
  textAlign: 'center',
  whiteSpace: 'nowrap',
} as const

const timeCellSx = {
  ...lineSx,
  // Sloupec časů zůstává při vodorovném posunu vlevo
  position: 'sticky',
  left: 0,
  zIndex: 1,
  backgroundColor: COLORS.schedule,
  padding: 0,
  paddingLeft: { md: fluidDesktop(0, 34) },
  fontSize: { xs: '12px', md: fluidDesktop(12, 11) },
  lineHeight: 1,
  fontWeight: 500,
  color: COLORS.white,
  textAlign: 'center',
  whiteSpace: 'nowrap',
} as const

const pillSx = {
  flex: 1,
  minWidth: 0,
  height: { xs: '24px', md: fluidDesktop(24, 20.5) },
  lineHeight: { xs: '24px', md: fluidDesktop(24, 20.5) },
  borderRadius: '999px',
  paddingLeft: '6px',
  paddingRight: '6px',
  boxSizing: 'border-box',
  fontSize: { xs: '12px', md: fluidDesktop(12, 10.5) },
  fontWeight: 400,
  color: COLORS.white,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
} as const

function Slot({ slot }: { slot: ScheduleSlot }) {
  const { reservedLabel } = content.pages.reservations
  return (
    <Typography
      component="span"
      aria-label={slot.reserved ? `${slot.label} – ${reservedLabel}` : undefined}
      title={slot.reserved ? `${slot.label} – ${reservedLabel}` : undefined}
      sx={{ ...pillSx, backgroundColor: slot.reserved ? COLORS.scheduleReserved : (slot.color ?? COLORS.gray) }}
    >
      {slot.label}
    </Typography>
  )
}

export function ScheduleTable({ weekFrom, schedule, loading = false, error = null, notFound = false }: ScheduleTableProps) {
  const { dayNames, emptySlotIcon, emptySlot, reservedLabel, empty } = content.pages.reservations
  const days = dayNames.map((name, index) => {
    const date = addDays(weekFrom, index)
    return { date, label: `${name} ${formatDayMonth(date)}` }
  })

  // Termíny daného dne a času, bez záznamu prázdná buňka
  const slotsAt = (date: string, time: string): ScheduleSlot[] => schedule?.days.find((day) => day.date === date)?.slots[time] ?? []

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: { xs: fluid(28, 32), md: desktopScaled(43) },
        paddingLeft: { xs: fluid(30, 34), md: 0 },
        paddingRight: { xs: fluid(30, 34), md: 0 },
      }}
    >
      <Box
        sx={{
          // Desktop: šířka z návrhu, na menších oknech alespoň šířka tabulky (max. šířka okna bez okrajů)
          width: { xs: '100%', md: `max(${desktopScaled(1170)}, min(${TABLE_MIN_WIDTH}, 100% - 2 * ${desktopScaled(DESKTOP.margin)}))` },
          minHeight: { md: desktopScaled(562) },
          borderRadius: { xs: fluid(40, 44), md: desktopScaled(84) },
          backgroundColor: COLORS.schedule,
          boxSizing: 'border-box',
          overflowX: 'auto',
        }}
      >
        {!schedule ? (
          notFound ? (
            <Typography
              sx={{
                paddingTop: { xs: fluid(40, 44), md: desktopScaled(60) },
                paddingLeft: { xs: fluid(24, 26), md: desktopScaled(80) },
                paddingRight: { xs: fluid(24, 26), md: desktopScaled(80) },
                textAlign: 'center',
                fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
                lineHeight: { xs: fluid(24, 26), md: fluidDesktop(24, 30) },
                color: COLORS.white,
              }}
            >
              {empty}
            </Typography>
          ) : (
            <DataStatus loading={loading} error={error} />
          )
        ) : (
          <>
            <Box component="table" sx={{ width: '100%', minWidth: TABLE_MIN_WIDTH, tableLayout: 'fixed', borderCollapse: 'collapse' }}>
              <colgroup>
                <Box component="col" sx={{ width: TIME_COLUMN_WIDTH }} />
                {days.map((day) => (
                  <col key={day.date} />
                ))}
                <Box component="col" sx={{ width: END_COLUMN_WIDTH }} />
              </colgroup>
              <thead>
                <tr>
                  <Box component="th" scope="col" sx={{ ...headerCellSx, ...timeCellSx }} />
                  {days.map((day) => (
                    <Box component="th" scope="col" key={day.date} sx={headerCellSx}>
                      {day.label}
                    </Box>
                  ))}
                  <Box component="td" aria-hidden sx={lineSx} />
                </tr>
              </thead>
              <tbody>
                {schedule.times.map((time) => (
                  <Box component="tr" key={time} sx={{ height: { xs: '48px', md: fluidDesktop(48, 51.75) } }}>
                    <Box component="th" scope="row" sx={timeCellSx}>
                      {time}
                    </Box>
                    {days.map((day) => {
                      const slots = slotsAt(day.date, time)
                      return (
                        <Box component="td" key={day.date} sx={{ ...lineSx, padding: 0 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3px', width: CELL_CONTENT_WIDTH, marginX: 'auto' }}>
                            {slots.length > 0 ? (
                              slots.map((slot, index) => <Slot key={`${index}-${slot.label}`} slot={slot} />)
                            ) : (
                              <Icon
                                src={emptySlotIcon}
                                alt={emptySlot}
                                size={{ xs: '7px', md: fluidDesktop(7, 6) }}
                                height={{ xs: '13px', md: fluidDesktop(13, 11) }}
                              />
                            )}
                          </Box>
                        </Box>
                      )
                    })}
                    <Box component="td" aria-hidden sx={lineSx} />
                  </Box>
                ))}
              </tbody>
            </Box>

            {/* Legenda zůstává při posunu vlevo */}
            <Box
              sx={{
                position: 'sticky',
                left: 0,
                width: 'max-content',
                display: 'flex',
                alignItems: 'center',
                gap: { xs: '6px', md: fluidDesktop(6, 6.5) },
                paddingTop: { xs: '12px', md: fluidDesktop(12, 13) },
                paddingLeft: { xs: fluid(24, 26), md: fluidDesktop(60, 131) },
              }}
            >
              <Box sx={{ width: { xs: '14px', md: fluidDesktop(14, 14.5) }, height: { xs: '14px', md: fluidDesktop(14, 14.5) }, borderRadius: '50%', backgroundColor: COLORS.scheduleReserved }} />
              <Typography component="span" sx={{ fontSize: '12px', lineHeight: 1, fontWeight: 400, color: COLORS.white }}>
                {reservedLabel}
              </Typography>
            </Box>
            <Box aria-hidden sx={{ height: { xs: '20px', md: fluidDesktop(20, 26) } }} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default ScheduleTable
