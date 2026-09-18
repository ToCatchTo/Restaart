// Plynulé škálování pixelových hodnot podle šířky viewportu pomocí CSS clamp().
// fluid(minPx, maxPx): minPx na 390 px, maxPx na 1920 px, mezi tím lineárně, mimo rozsah zaseknuté.
// fluidDesktop(minPx, maxPx): totéž v rozsahu 600 → 1920 px.
// desktopScaled(px): hodnota z návrhu (1920 px) zmenšená proporčně až na 600 px.
// desktopType(px): totéž pro písmo a výšky řádků s dolní mezí 55 %.

// Referenční šířky viewportu (mobil → desktop)
const MIN_VIEWPORT = 390
const MAX_VIEWPORT = 1920

// Šířka, od které platí desktopová struktura
export const DESKTOP_BREAKPOINT = 600

// Zaokrouhlení na 3 desetinná místa
const round = (n: number) => Math.round(n * 1000) / 1000

// Obecná interpolace mezi dvěma šířkami viewportu
export function fluidBetween(minPx: number, maxPx: number, fromVw: number, toVw: number): string {
  if (minPx === maxPx) return `${minPx}px`

  // Lineární funkce hodnota = sklon * šířka + průsečík (v px)
  const slope = (maxPx - minPx) / (toVw - fromVw)
  const interceptPx = minPx - slope * fromVw
  // sklon * šířka vyjádřený ve vw
  const slopeVw = slope * 100

  // clamp() vyžaduje MIN ≤ MAX, při klesajícím průběhu se meze prohodí
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

// Geometrie z návrhu zmenšená proporčně až na breakpoint
export function desktopScaled(px: number): string {
  return fluidDesktop(round((px * DESKTOP_BREAKPOINT) / MAX_VIEWPORT), px)
}

// Typografie z návrhu – zmenšuje se jen na 55 %, aby text zůstal čitelný
const TYPE_MIN_RATIO = 0.55
export function desktopType(px: number): string {
  return fluidDesktop(round(px * TYPE_MIN_RATIO), px)
}

export default fluid
