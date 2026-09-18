// MUI téma – barvy a písma podle XD návrhu (Restaart_web)
import { createTheme } from '@mui/material/styles'
import { DESKTOP_BREAKPOINT, fluidDesktop } from './fluid'

// Rodiny písem – Safiro je lokální (public/fonts), ostatní jsou náhrady z Google Fonts
export const FONT_BODY = "'Safiro', 'Helvetica Neue', Arial, sans-serif"
// Outfit – lehké texty (tloušťka pod 400, Safiro ji nemá) a Google widget
export const FONT_SECONDARY = "'Outfit', 'Helvetica Neue', Arial, sans-serif"
export const FONT_LABEL = "'Gantari', 'Helvetica Neue', Arial, sans-serif"
export const FONT_SCRIPT = "'Permanent Marker', 'Comic Sans MS', cursive"

// Barevné tokeny z návrhu
export const COLORS = {
  white: '#ffffff',
  black: '#000000',
  teal: '#36696a',
  cyan: '#00f5ff',
  cyanDark: '#00ced1',
  cyanLabel: '#00f8ff',
  dark: '#2b2b2b',
  navy: '#252f3e',
  grayLight: '#eaeaea',
  gray: '#707070',
  grayFrame: '#696969',
  overlay: 'rgba(0, 0, 0, 0.7)',
} as const

// Desktop: šířka návrhu a rozměry mřížky (okraj 140, obsahová hrana 278)
export const DESKTOP_MAX_WIDTH = 1920
export const DESKTOP = { margin: 140, content: 278, width: DESKTOP_MAX_WIDTH } as const

// Media query pro desktopovou strukturu (klíč do sx pro skupinové bloky)
export const DESKTOP_MQ = `@media (min-width: ${DESKTOP_BREAKPOINT}px)`

// Prosklené tlačítko z desktopového návrhu (průhledná výplň + rozostření a zesvětlení pozadí)
export const frostedButtonSx = {
  height: fluidDesktop(45, 60),
  borderRadius: fluidDesktop(30, 40),
  backdropFilter: 'blur(30px) brightness(1.15)',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  color: COLORS.white,
  // Ztmavení při najetí přímo přes vlastnosti prvku – filter ani překryv nad backdrop-filter
  // se nevykreslují spolehlivě (ztmavení ve dvou krocích, blikání)
  transition: 'background-color 0.2s ease, backdrop-filter 0.2s ease',
  '& > *': { transition: 'opacity 0.2s ease' },
  '@media (hover: hover)': {
    '&:hover': {
      filter: 'none',
      backdropFilter: 'blur(30px) brightness(1.05)',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },
    '&:hover > *': { opacity: 0.9 },
  },
} as const

// Centrovaný sloupec obsahu: pod breakpointem plná šířka, nad ním nejvýše 1920 px
export const columnSx = {
  position: 'relative',
  width: '100%',
  maxWidth: { xs: 'none', md: DESKTOP_MAX_WIDTH },
  marginX: 'auto',
} as const

export const theme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 480, md: DESKTOP_BREAKPOINT, lg: 1440, xl: 1920 },
  },
  palette: {
    mode: 'dark',
    primary: { main: COLORS.teal, contrastText: COLORS.white },
    secondary: { main: COLORS.cyan, contrastText: COLORS.black },
    background: { default: COLORS.dark, paper: COLORS.dark },
    text: { primary: COLORS.white, secondary: COLORS.grayLight },
  },
  typography: {
    fontFamily: FONT_BODY,
    allVariants: { color: COLORS.white },
  },
  shape: { borderRadius: 17 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Místo pro posuvník zůstává i při zamknutém scrollu (otevřené menu), stránka tak neposkočí
        html: { scrollbarGutter: 'stable' },
        body: { backgroundColor: COLORS.dark, margin: 0 },
        a: { color: 'inherit' },
        // Ztmavení odkazů a tlačítek při najetí myší (jen zařízení s kurzorem)
        'a, button': { transition: 'filter 0.2s ease' },
        '@media (hover: hover)': {
          'a:hover, button:hover': { filter: 'brightness(0.75)' },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
  },
})

export default theme
