// Formátování hodnot z API pro zobrazení a práce s týdnem rozvrhu

// „2026-09-28“ → „28/9“
const dayMonth = (iso: string) => {
  const [, month, day] = iso.split('-').map(Number)
  return `${day}/${month}`
}

// Datum akce, u vícedenní jako rozsah
export const formatEventDate = (dateFrom: string, dateTo: string | null) =>
  dateTo && dateTo !== dateFrom ? `${dayMonth(dateFrom)}–${dayMonth(dateTo)}` : dayMonth(dateFrom)

// Velikost souboru v bajtech → „178 kB“ / „1,2 MB“
export const formatFileSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} kB`
    : `${(bytes / (1024 * 1024)).toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} MB`

// „2026-10-05“ → „5. 10.“
export const formatDayMonth = (iso: string) => {
  const [, month, day] = iso.split('-').map(Number)
  return `${day}. ${month}.`
}

// Datum → ISO „RRRR-MM-DD“ v místním čase
export const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

// ISO datum posunuté o počet dní
export const addDays = (iso: string, days: number) => {
  const [year, month, day] = iso.split('-').map(Number)
  return toIsoDate(new Date(year, month - 1, day + days))
}

// Pondělí týdne, do kterého datum patří (ISO)
export const mondayOf = (date: Date) => {
  // Neděle (0) patří k předchozímu pondělí
  const offset = (date.getDay() + 6) % 7
  return addDays(toIsoDate(date), -offset)
}
