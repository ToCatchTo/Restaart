// Bílé tlačítko „zpět na výpis“ se šipkou
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
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
        marginTop: fluid(40, 44),
        marginLeft: fluid(30, 34),
        height: fluid(34, 36),
        borderRadius: fluid(17, 18),
        backgroundColor: COLORS.white,
        display: 'inline-flex',
        alignItems: 'center',
        gap: fluid(10, 11),
        paddingLeft: fluid(6, 7),
        paddingRight: fluid(16, 17),
      }}
    >
      <MaskIcon src={icon} size={fluid(24, 25)} color={COLORS.dark} />
      <Typography component="span" sx={{ fontSize: fluid(14, 13), lineHeight: '25px', fontWeight: 500, color: COLORS.dark }}>
        {label}
      </Typography>
    </ButtonBase>
  )
}

export default BackLink
