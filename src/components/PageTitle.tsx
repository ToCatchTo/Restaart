// Nadpis stránky (h1)
import Typography from '@mui/material/Typography'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP } from '../theme'

interface PageTitleProps {
  children: string
  align?: 'left' | 'center'
  // Desktop: zarovnání a horní odsazení (px v návrhu)
  alignDesktop?: 'left' | 'center'
  topDesktop?: number
  // Desktop: menší podtržená varianta (detail akce)
  variantDesktop?: 'large' | 'small'
  // Desktop: maximální šířka textu (px v návrhu)
  widthDesktop?: number
}

export function PageTitle({
  children,
  align = 'left',
  alignDesktop = 'center',
  topDesktop = 14,
  variantDesktop = 'large',
  widthDesktop,
}: PageTitleProps) {
  const small = variantDesktop === 'small'

  return (
    <Typography
      component="h1"
      sx={{
        margin: 0,
        paddingTop: { xs: fluid(48, 44), md: desktopScaled(topDesktop) },
        paddingLeft: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) },
        paddingRight: { xs: fluid(30, 34), md: widthDesktop ? 0 : desktopScaled(DESKTOP.content) },
        maxWidth: { md: widthDesktop ? desktopScaled(widthDesktop) : 'none' },
        boxSizing: { md: 'content-box' },
        fontSize: { xs: fluid(40, 32), md: fluidDesktop(37, small ? 50 : 100) },
        lineHeight: { xs: fluid(40, 40), md: fluidDesktop(small ? 44 : 49.5, small ? 60 : 90) },
        fontWeight: { xs: 600, md: small ? 600 : 400 },
        textAlign: { xs: align, md: alignDesktop },
        color: COLORS.white,
        textDecoration: { md: small ? 'underline' : 'none' },
        textUnderlineOffset: '6px',
        textDecorationThickness: '2px',
      }}
    >
      {children}
    </Typography>
  )
}

export default PageTitle
