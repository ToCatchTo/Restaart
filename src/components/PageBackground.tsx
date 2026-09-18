// Sekce s fotkou přes celou šířku, tmavým překryvem a centrovaným sloupcem obsahu
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import type { ResponsiveStyleValue } from '@mui/system'
import { COLORS, DESKTOP_MQ, columnSx } from '../theme'

interface PageBackgroundProps {
  image: string
  children: ReactNode
  minHeight?: ResponsiveStyleValue<string>
  // Pevná výška sekce, přesahující obsah zůstává viditelný
  height?: ResponsiveStyleValue<string>
  overlay?: ResponsiveStyleValue<string>
  // Výřez fotky (hodnota background-position), výchozí je střed nahoře
  position?: ResponsiveStyleValue<string>
  // Velikost fotky (hodnota background-size), výchozí cover
  size?: ResponsiveStyleValue<string>
  // Desktop: sekce vysoká alespoň jako okno prohlížeče
  viewportHeight?: boolean
}

export function PageBackground({
  image,
  children,
  minHeight,
  height,
  overlay = COLORS.overlay,
  position = 'center top',
  size = 'cover',
  viewportHeight = false,
}: PageBackgroundProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight,
        height,
        // Sekce s pevnou výškou leží nad následující sekcí kvůli přesahujícímu obsahu
        zIndex: height || viewportHeight ? 1 : undefined,
        ...(viewportHeight && {
          [DESKTOP_MQ]: { minHeight: '100vh', '@supports (height: 100dvh)': { minHeight: '100dvh' } },
        }),
        // Sloupec obsahu se roztáhne na výšku sekce
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.dark,
        backgroundImage: `url(${image})`,
        backgroundSize: size,
        backgroundPosition: position,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: overlay,
        },
      }}
    >
      <Box sx={{ ...columnSx, flexGrow: 1 }}>{children}</Box>
    </Box>
  )
}

export default PageBackground
