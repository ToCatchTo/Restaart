// Karta týdenního rozvrhu – tabulka dny × časy, pilulky termínů podle stavu, blesk = bez termínu
import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { addDays, formatDayMonth } from '../format'
import { TABLE_MIN_WIDTH, buildScheduleRows, scheduleCardWidth, scheduleGutter, type SchedulePill } from '../reservations'
import { COLORS, visuallyHiddenSx } from '../theme'
import type { ReservationWeek, SlotState } from '../types'
import DataStatus from './DataStatus'
import Icon from './Icon'

interface ScheduleTableProps {
  // Pondělí zobrazeného týdne (ISO)
  weekFrom: string
  week: ReservationWeek | null
  loading?: boolean
  error?: string | null
}

const TIME_COLUMN_WIDTH = { xs: '56px', md: fluidDesktop(56, 96) }
// Volný sloupec vpravo, aby poslední den nebyl u okraje karty
const END_COLUMN_WIDTH = { xs: '24px', md: fluidDesktop(24, 44) }
// Šířka obsahu buňky, do které se vejde jedna nebo více pilulek
const CELL_CONTENT_WIDTH = '96px'


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
  textOverflow: 'ellipsis',
} as const

// Proběhlý termín zůstává v barvě stavu, jen ztlumený
const PAST_OPACITY = 0.45

// Barva podle stavu; volná lekce má vlastní barvu, volný kurt/místnost tyrkysovou
const stateColor = (state: SlotState, color: string | null) => {
  if (state === 'full') return COLORS.scheduleReserved
  if (state === 'cleaning') return COLORS.navy
  return color ?? COLORS.teal
}

// Viditelný je jen krátký text, čtečka dostane celé podrobnosti (aria-label na span čtečky ignorují)
function Pill({ pill }: { pill: SchedulePill }) {
  return (
    <Typography component="span" title={pill.detail} sx={{ ...pillSx, backgroundColor: stateColor(pill.state, pill.color), opacity: pill.state === 'past' ? PAST_OPACITY : 1 }}>
      <span aria-hidden>{pill.text}</span>
      <Box component="span" sx={visuallyHiddenSx}>
        {pill.detail}
      </Box>
    </Typography>
  )
}

// Legenda stavů – barva tečky odpovídá pilulce místnosti daného stavu
const LEGEND_STATES: SlotState[] = ['free', 'full', 'cleaning', 'past']

export function ScheduleTable({ weekFrom, week, loading = false, error = null }: ScheduleTableProps) {
  const { dayNames, emptySlotIcon, emptySlot, states, legendLabel, empty } = content.pages.reservations
  const days = dayNames.map((name, index) => {
    const date = addDays(weekFrom, index)
    return { date, label: `${name} ${formatDayMonth(date)}` }
  })
  const rows = useMemo(() => (week ? buildScheduleRows(week, weekFrom) : []), [week, weekFrom])
  // Skupinové lekce mají vlastní barvy, legenda stavů je jen u kurtů a místností
  const showLegend = week?.type !== 'skupinovky'

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: { xs: fluid(28, 32), md: desktopScaled(43) },
        paddingLeft: scheduleGutter,
        paddingRight: scheduleGutter,
      }}
    >
      <Box
        sx={{
          width: scheduleCardWidth,
          // Výška z návrhu jen bez tabulky (načítání, chyba, prázdný týden), jinak karta sedí na tabulce
          minHeight: { md: rows.length > 0 ? 0 : desktopScaled(562) },
          borderRadius: { xs: fluid(40, 44), md: desktopScaled(84) },
          backgroundColor: COLORS.schedule,
          boxSizing: 'border-box',
          overflowX: 'auto',
        }}
      >
        {!week ? (
          <DataStatus loading={loading} error={error} />
        ) : rows.length === 0 ? (
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
                {rows.map((row) => (
                  <Box component="tr" key={row.time} sx={{ height: { xs: '48px', md: fluidDesktop(48, 51.75) } }}>
                    <Box component="th" scope="row" sx={timeCellSx}>
                      {row.time}
                    </Box>
                    {row.cells.map((pills, index) => (
                      <Box component="td" key={days[index].date} sx={{ ...lineSx, padding: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3px', width: CELL_CONTENT_WIDTH, marginX: 'auto' }}>
                          {pills.length > 0 ? (
                            pills.map((pill) => <Pill key={pill.key} pill={pill} />)
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
                    ))}
                    <Box component="td" aria-hidden sx={lineSx} />
                  </Box>
                ))}
              </tbody>
            </Box>

            {/* Legenda jen u kurtů a místností (lekce mají vlastní barvy); při posunu zůstává vlevo */}
            {showLegend && (
              <Box
                component="ul"
                aria-label={legendLabel}
                sx={{
                  position: 'sticky',
                  left: 0,
                  width: 'max-content',
                  maxWidth: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: { xs: '14px', md: fluidDesktop(14, 18) },
                  margin: 0,
                  padding: 0,
                  paddingTop: { xs: '12px', md: fluidDesktop(12, 13) },
                  paddingLeft: { xs: fluid(24, 26), md: fluidDesktop(60, 131) },
                  paddingRight: { xs: fluid(24, 26), md: fluidDesktop(60, 131) },
                  listStyle: 'none',
                }}
              >
                {LEGEND_STATES.map((state) => (
                  <Box component="li" key={state} sx={{ display: 'flex', alignItems: 'center', gap: { xs: '6px', md: fluidDesktop(6, 6.5) } }}>
                    <Box
                      sx={{
                        width: { xs: '14px', md: fluidDesktop(14, 14.5) },
                        height: { xs: '14px', md: fluidDesktop(14, 14.5) },
                        borderRadius: '50%',
                        backgroundColor: stateColor(state, null),
                        opacity: state === 'past' ? PAST_OPACITY : 1,
                      }}
                    />
                    <Typography component="span" sx={{ fontSize: '12px', lineHeight: 1, fontWeight: 400, color: COLORS.white }}>
                      {states[state]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            <Box aria-hidden sx={{ height: { xs: '20px', md: fluidDesktop(20, 26) } }} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default ScheduleTable
