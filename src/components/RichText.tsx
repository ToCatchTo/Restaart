// Text z datového souboru s inline HTML (např. <span style="font-weight: 200">)
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ElementType } from 'react'
import { COLORS, FONT_SECONDARY } from '../theme'

interface RichTextProps {
  html: string
  component?: ElementType
  sx?: SxProps<Theme>
}

// Základní styl: zachované řádkování z dat a Outfit pro tloušťku 200, kterou Safiro nemá
const baseSx = {
  whiteSpace: 'pre-line',
  color: COLORS.white,
  '& [style*="font-weight: 200"], & [style*="font-weight:200"]': {
    fontFamily: FONT_SECONDARY,
  },
} as const

export function RichText({ html, component = 'p', sx }: RichTextProps) {
  return (
    <Typography
      component={component}
      sx={[baseSx, ...(Array.isArray(sx) ? sx : [sx])]}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default RichText
