// Sekce s fotkou na pozadí a tmavým překryvem (hlavička každé stránky, patička)
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { COLORS } from '../theme'

interface PageBackgroundProps {
  image: string
  children: ReactNode
  minHeight?: string
  // Pevná výška sekce – obsah, který přesahuje, zůstává viditelný (např. karta přes okraj)
  height?: string
  overlay?: string
  // Výřez fotky (hodnota background-position), výchozí je střed nahoře
  position?: string
}

export function PageBackground({
  image,
  children,
  minHeight,
  height,
  overlay = COLORS.overlay,
  position = 'center top',
}: PageBackgroundProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight,
        height,
        // Sekce s pevnou výškou leží nad následující sekcí, aby přesahující obsah nebyl překrytý
        zIndex: height ? 1 : undefined,
        backgroundColor: COLORS.dark,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: position,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: overlay,
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>{children}</Box>
    </Box>
  )
}

export default PageBackground
