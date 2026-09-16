// Hotová SVG ikona z /public/icons vykreslená jako obrázek (barvy jsou součástí souboru)
import Box from '@mui/material/Box'

import type { ResponsiveStyleValue } from '@mui/system'

interface IconProps {
  src: string
  size: ResponsiveStyleValue<string>
  // Výška odlišná od šířky (ikony, které nejsou čtvercové)
  height?: ResponsiveStyleValue<string>
  alt?: string
}

export function Icon({ src, size, height, alt = '' }: IconProps) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      aria-hidden={alt === '' ? true : undefined}
      sx={{ width: size, height: height ?? size, display: 'block', flexShrink: 0 }}
    />
  )
}

export default Icon
