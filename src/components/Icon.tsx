// Hotová SVG ikona z /public/icons vykreslená jako obrázek (barvy jsou součástí souboru)
import Box from '@mui/material/Box'

interface IconProps {
  src: string
  size: string
  alt?: string
}

export function Icon({ src, size, alt = '' }: IconProps) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      aria-hidden={alt === '' ? true : undefined}
      sx={{ width: size, height: size, display: 'block', flexShrink: 0 }}
    />
  )
}

export default Icon
