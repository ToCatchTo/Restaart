// Převod týdne rezervací z API na řádky tabulky rozvrhu (čistá logika bez Reactu)
import { content } from './content'
import { desktopScaled, fluid } from './fluid'
import { addDays } from './format'
import { DESKTOP } from './theme'
import type { LessonSlot, ReservationSlot, ReservationWeek, SlotState } from './types'

// Minimální šířka tabulky (sloupec časů 56 + 7 dnů po 112), pod ní se karta posouvá vodorovně
export const TABLE_MIN_WIDTH = '840px'
// Šířka karty: desktop z návrhu, na menších oknech alespoň šířka tabulky (max. šířka okna bez okrajů)
export const scheduleCardWidth = { xs: '100%', md: `max(${desktopScaled(1170)}, min(${TABLE_MIN_WIDTH}, 100% - 2 * ${desktopScaled(DESKTOP.margin)}))` }
// Vodorovné okraje obsahu stránky okolo karty
export const scheduleGutter = { xs: fluid(30, 34), md: 0 }

// Pilulka v buňce – text, barva lekce (null = barva podle stavu), stav a podrobnosti do title/aria-label
export interface SchedulePill {
  key: string
  text: string
  color: string | null
  state: SlotState
  detail: string
}

// Řádek času se sedmi buňkami v pořadí dnů od pondělí
export interface ScheduleRow {
  time: string
  cells: SchedulePill[][]
}

export const isLessonSlot = (slot: ReservationSlot): slot is LessonSlot => 'id' in slot

// „07:00“ → „7:00“ (bez úvodní nuly jako v návrhu)
export const formatTime = (hhmm: string) => {
  const [hours, minutes = '00'] = hhmm.split(':')
  return `${Number(hours)}:${minutes}`
}

const toMinutes = (hhmm: string) => {
  const [hours, minutes] = hhmm.split(':').map(Number)
  return hours * 60 + (minutes || 0)
}

export const formatPrice = (price: number) => `${price} ${content.pages.reservations.priceUnit}`

const stateLabel = (state: SlotState) => content.pages.reservations.states[state]

// „SQUASH I“ → „I“: do úzké pilulky jen číslo kurtu, celý název zůstává v podrobnostech
const courtLabel = (name: string, typeName: string) => {
  const matches = typeName !== '' && name.toLowerCase().startsWith(typeName.toLowerCase())
  const short = matches ? name.slice(typeName.length).trim() : name
  return short || name
}

// Pilulky jednoho termínu: lekce = 1, kurty = 1 na kurt (zkrácený název), místnost = 1 s textem stavu
export function slotPills(slot: ReservationSlot, typeName = ''): SchedulePill[] {
  const price = slot.price === null ? [] : [formatPrice(slot.price)]

  if (isLessonSlot(slot)) {
    const detail = [slot.name, slot.trainer, `${slot.occupied}/${slot.capacity}`, ...price].filter(Boolean).join(', ')
    return [
      {
        key: `lesson-${slot.id}`,
        text: slot.label || slot.name,
        color: slot.color,
        state: slot.state,
        detail: slot.state === 'free' ? detail : `${detail} – ${stateLabel(slot.state)}`,
      },
    ]
  }

  if (slot.courts && slot.courts.length > 0) {
    return slot.courts.map((court, index) => ({
      key: `court-${slot.start}-${index}`,
      text: courtLabel(court.name, typeName),
      color: null,
      state: court.state,
      detail: [`${court.name} – ${stateLabel(court.state)}`, ...price].join(', '),
    }))
  }

  return [
    {
      key: `room-${slot.start}`,
      text: stateLabel(slot.state),
      color: null,
      state: slot.state,
      detail: [`${formatTime(slot.start)}–${formatTime(slot.end)}`, stateLabel(slot.state), ...price].join(', '),
    },
  ]
}

// Řádky = seřazené sjednocení začátků přes 7 dní od pondělí; prázdné pole = v týdnu žádný termín
export function buildScheduleRows(week: ReservationWeek, weekFrom: string): ScheduleRow[] {
  const dates = Array.from({ length: 7 }, (_, index) => addDays(weekFrom, index))
  const slotsByDate = new Map(week.days.map((day) => [day.date, day.slots]))
  // Časy jen ze zobrazených dnů – den mimo týden by přidal prázdný řádek
  const times = new Set<string>()
  dates.forEach((date) => (slotsByDate.get(date) ?? []).forEach((slot) => times.add(formatTime(slot.start))))

  return [...times]
    .sort((a, b) => toMinutes(a) - toMinutes(b))
    .map((time) => ({
      time,
      cells: dates.map((date) =>
        (slotsByDate.get(date) ?? []).filter((slot) => formatTime(slot.start) === time).flatMap((slot) => slotPills(slot, week.name)),
      ),
    }))
}
