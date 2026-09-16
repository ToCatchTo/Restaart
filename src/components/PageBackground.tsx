// Sekce s fotkou na pozadí a tmavým překryvem (hlavička každé stránky, patička)
// Pozadí jde přes celou šířku, obsah sedí v centrovaném sloupci (mobil 480, desktop 1920)
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import type { ResponsiveStyleValue } from '@mui/system'
import { COLORS, DESKTOP_MQ, columnSx } from '../theme'

interface PageBackgroundProps {
  image: string
  children: ReactNode
  minHeight?: ResponsiveStyleValue<string>
  // Pevná výška sekce – obsah, který přesahuje, zůstává viditelný (např. karta přes okraj)
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
        // Sekce s pevnou výškou leží nad následující sekcí, aby přesahující obsah nebyl překrytý
        zIndex: height || viewportHeight ? 1 : undefined,
        ...(viewportHeight && {
          [DESKTOP_MQ]: { minHeight: '100vh', '@supports (height: 100dvh)': { minHeight: '100dvh' } },
        }),
        // Sloupec obsahu se roztáhne na výšku sekce (prvky ukotvené ke spodnímu okraji)
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
