// MUI téma – barvy a písma podle XD návrhu (Restaart_web)
import { createTheme } from '@mui/material/styles'

// Rodiny písem (náhrady za Safiro / Avalanche z návrhu)
export const FONT_BODY = "'Outfit', 'Helvetica Neue', Arial, sans-serif"
export const FONT_LABEL = "'Gantari', 'Helvetica Neue', Arial, sans-serif"
export const FONT_SCRIPT = "'Permanent Marker', 'Comic Sans MS', cursive"

// Barevné tokeny z návrhu
export const COLORS = {
  white: '#ffffff',
  black: '#000000',
  teal: '#36696a',
  cyan: '#00f5ff',
  cyanDark: '#00ced1',
  dark: '#2b2b2b',
  navy: '#252f3e',
  grayLight: '#eaeaea',
  gray: '#707070',
  overlay: 'rgba(0, 0, 0, 0.55)',
} as const

// Maximální šířka mobilního sloupce na širších obrazovkách
export const APP_MAX_WIDTH = 480

export const theme = createTheme({
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
        body: { backgroundColor: COLORS.dark, margin: 0 },
        a: { color: 'inherit' },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
  },
})

export default theme
