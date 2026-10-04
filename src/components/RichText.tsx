// Text z editoru v administraci (HTML: div, br, strong, em, del, a, ul/ol/li, h1, blockquote)
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ElementType } from 'react'
import { COLORS } from '../theme'

interface RichTextProps {
  html: string
  component?: ElementType
  sx?: SxProps<Theme>
}

const baseSx = {
  color: COLORS.white,
  overflowWrap: 'anywhere',
  '& a': { color: 'inherit', textDecoration: 'underline' },
  '& strong': { fontWeight: 700 },
  '& h1, & ul, & ol, & blockquote': { margin: 0 },
  // Bloky pod sebou odsazené shora
  '& > * + :is(div, h1, ul, ol, blockquote)': { marginTop: '1em' },
  '& h1': { fontSize: '1.25em', lineHeight: 1.3, fontWeight: 600 },
  '& ul, & ol': { paddingLeft: '1.4em' },
  '& blockquote': { paddingLeft: '1em', borderLeft: `2px solid ${COLORS.white}` },
} as const

export function RichText({ html, component = 'div', sx }: RichTextProps) {
  return (
    <Typography
      component={component}
      sx={[baseSx, ...(Array.isArray(sx) ? sx : [sx])]}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default RichText
