// Text z datového souboru s inline HTML (např. <span style="font-weight: 200">)
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ElementType } from 'react'
import { COLORS } from '../theme'

interface RichTextProps {
  html: string
  component?: ElementType
  sx?: SxProps<Theme>
}

// Zachované řádkování z dat; inline tloušťka 200 z dat se přepíše na 400
const baseSx = {
  whiteSpace: 'pre-line',
  color: COLORS.white,
  '& [style*="font-weight: 200"], & [style*="font-weight:200"]': {
    fontWeight: '400 !important',
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
