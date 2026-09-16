// Plynulé (fluid) škálování pixelové hodnoty podle šířky viewportu pomocí CSS clamp().
//
// fluid(minPx, maxPx) vrátí clamp(), který hodnotu lineárně interpoluje mezi
// referenčními šířkami obrazovky: minPx platí na 390px, maxPx na 1920px.
// Mimo tento rozsah je hodnota "zaseknutá" (clampnutá) na krajních hodnotách.
//
// Např.: height: fluid(100, 120) → 100px na 390px, 120px na 1920px, mezi tím plynule.
//
// fluidDesktop(minPx, maxPx) dělá totéž v rozsahu 600px → 1920px (desktopová struktura),
// desktopScaled(px) zmenšuje hodnotu z návrhu (1920px) proporčně až na 600px,
// desktopType(px) totéž pro písmo a výšky řádků s dolní mezí 55 %.

// Referenční šířky viewportu (mobil → desktop)
const MIN_VIEWPORT = 390
const MAX_VIEWPORT = 1920

// Šířka, od které platí desktopová struktura
export const DESKTOP_BREAKPOINT = 600

// Zaokrouhlení na 3 desetinná místa, ať v CSS nejsou zbytečně dlouhá čísla
const round = (n: number) => Math.round(n * 1000) / 1000

// Obecná interpolace mezi dvěma šířkami viewportu
export function fluidBetween(minPx: number, maxPx: number, fromVw: number, toVw: number): string {
  // Stejné hodnoty → není co interpolovat
  if (minPx === maxPx) return `${minPx}px`

  // Lineární funkce hodnota(šířka) = sklon * šířka + průsečík (vše v px)
  const slope = (maxPx - minPx) / (toVw - fromVw)
  const interceptPx = minPx - slope * fromVw
  // 1vw = 1 % šířky viewportu, takže sklon * šířku vyjádříme jako (sklon * 100)vw
  const slopeVw = slope * 100

  // clamp() vyžaduje MIN ≤ MAX; při klesajícím průběhu (minPx > maxPx) je nutné prohodit
  const lower = Math.min(minPx, maxPx)
  const upper = Math.max(minPx, maxPx)

  return `clamp(${lower}px, calc(${round(interceptPx)}px + ${round(slopeVw)}vw), ${upper}px)`
}

export function fluid(minPx: number, maxPx: number): string {
  return fluidBetween(minPx, maxPx, MIN_VIEWPORT, MAX_VIEWPORT)
}

// Desktopový rozsah: minPx na breakpointu (600px), maxPx na 1920px
export function fluidDesktop(minPx: number, maxPx: number): string {
  return fluidBetween(minPx, maxPx, DESKTOP_BREAKPOINT, MAX_VIEWPORT)
}

// Geometrie z návrhu (1920px) zmenšená proporčně k šířce viewportu až na breakpoint
export function desktopScaled(px: number): string {
  return fluidDesktop(round((px * DESKTOP_BREAKPOINT) / MAX_VIEWPORT), px)
}

// Typografie a výšky textových prvků z návrhu: zmenšují se jen na 55 %, aby text zůstal čitelný
const TYPE_MIN_RATIO = 0.55
export function desktopType(px: number): string {
  return fluidDesktop(round(px * TYPE_MIN_RATIO), px)
}

export default fluid
