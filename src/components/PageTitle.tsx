// Podtržený nadpis stránky (např. „Soukromá sauna“, „Akce“)
import Typography from '@mui/material/Typography'
import { fluid } from '../fluid'
import { COLORS } from '../theme'

interface PageTitleProps {
  children: string
  align?: 'left' | 'center'
}

export function PageTitle({ children, align = 'left' }: PageTitleProps) {
  return (
    <Typography
      component="h1"
      sx={{
        margin: 0,
        paddingTop: fluid(40, 44),
        paddingLeft: fluid(30, 34),
        paddingRight: fluid(30, 34),
        fontSize: fluid(30, 32),
        lineHeight: fluid(40, 40),
        fontWeight: 500,
        textAlign: align,
        color: COLORS.white,
        textDecoration: 'underline',
        textUnderlineOffset: '6px',
        textDecorationThickness: '2px',
      }}
    >
      {children}
    </Typography>
  )
}

export default PageTitle
