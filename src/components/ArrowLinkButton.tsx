// Prosklené tlačítko s odkazem a šipkou – hlavička (desktop) a výpis rezervací (mobil)
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ResponsiveStyleValue } from '@mui/system'
import { Link } from 'react-router-dom'
import { COLORS, frostedButtonSx } from '../theme'
import Icon from './Icon'

interface ArrowLinkButtonProps {
  label: string
  icon: string
  href: string
  // Šipka vlevo otočená zpět (návrat na web)
  reverse?: boolean
  iconSize: ResponsiveStyleValue<string>
  // Šířka textu – text je vycentrovaný v prostoru před šipkou
  textWidth?: ResponsiveStyleValue<string>
  fontSize: ResponsiveStyleValue<string>
  lineHeight: ResponsiveStyleValue<string>
  // Rozměry a odsazení tlačítka podle místa použití
  sx?: SxProps<Theme>
}

export function ArrowLinkButton({ label, icon, href, reverse = false, iconSize, textWidth, fontSize, lineHeight, sx }: ArrowLinkButtonProps) {
  return (
    <ButtonBase
      component={Link}
      to={href}
      sx={[
        {
          ...frostedButtonSx,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          flexDirection: reverse ? 'row-reverse' : 'row',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        component="span"
        sx={{ width: textWidth, minWidth: 'max-content', textAlign: 'center', fontSize, lineHeight, fontWeight: 400, fontStyle: 'italic', color: COLORS.white }}
      >
        {label}
      </Typography>
      <Box sx={{ marginLeft: reverse ? 0 : 'auto', marginRight: reverse ? 'auto' : 0, transform: reverse ? 'scaleX(-1)' : 'none' }}>
        <Icon src={icon} size={iconSize} />
      </Box>
    </ButtonBase>
  )
}

export default ArrowLinkButton
