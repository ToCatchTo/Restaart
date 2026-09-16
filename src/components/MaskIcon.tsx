// Jednobarevná SVG ikona vykreslená přes CSS mask – barva se řídí přes prop color
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ResponsiveStyleValue } from '@mui/system'

interface MaskIconProps {
  src: string
  size: ResponsiveStyleValue<string>
  color?: string
  sx?: SxProps<Theme>
}

export function MaskIcon({ src, size, color = 'currentColor', sx }: MaskIconProps) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: color,
        maskImage: `url(${src})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
        ...sx,
      }}
    />
  )
}

export default MaskIcon
