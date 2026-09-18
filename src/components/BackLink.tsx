// Bílé tlačítko „zpět na výpis“ se šipkou; desktop: 180×50 na obsahové hraně
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP, hoverDarkenSx } from '../theme'
import MaskIcon from './MaskIcon'

interface BackLinkProps {
  to: string
  label: string
  icon: string
}

export function BackLink({ to, label, icon }: BackLinkProps) {
  return (
    <ButtonBase
      component={Link}
      to={to}
      sx={{
        marginTop: { xs: fluid(40, 44), md: desktopScaled(78) },
        marginLeft: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) },
        minWidth: { md: desktopScaled(180) },
        height: { xs: fluid(34, 36), md: fluidDesktop(40, 50) },
        borderRadius: { xs: fluid(17, 18), md: fluidDesktop(20, 25) },
        backgroundColor: COLORS.white,
        display: 'inline-flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        gap: { xs: fluid(10, 11), md: fluidDesktop(10, 16.6) },
        // Desktop: odsazení drží obsah uvnitř i po zmenšení
        paddingLeft: { xs: fluid(6, 7), md: fluidDesktop(12, 14) },
        paddingRight: { xs: fluid(16, 17), md: fluidDesktop(16, 14) },
        ...hoverDarkenSx(),
      }}
    >
      <MaskIcon src={icon} size={{ xs: fluid(24, 25), md: fluidDesktop(20, 23.7) }} color={COLORS.dark} />
      <Typography
        component="span"
        sx={{
          fontSize: { xs: fluid(14, 13), md: fluidDesktop(13.6, 16) },
          lineHeight: { xs: '25px', md: fluidDesktop(20, 25) },
          fontWeight: { xs: 500, md: 600 },
          color: COLORS.dark,
        }}
      >
        {label}
      </Typography>
    </ButtonBase>
  )
}

export default BackLink
