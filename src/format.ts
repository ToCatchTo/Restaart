// Formátování hodnot z API pro zobrazení

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
