// Tyrkysové tlačítko s upoutávkou na akci (odkaz na detail akce)
// Obal má pevnou výšku, aby se při skrytém tlačítku obsah pod ním neposunul
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS } from '../theme'
import Icon from './Icon'

export function EventPill() {
  const { enabled, text, href, arrowIcon } = content.eventPill

  return (
    <Box
      sx={{
        // Výška = horní odsazení + výška tlačítka (rezervované místo); desktop: nadpis začíná 131 px pod hlavičkou
        height: { xs: fluid(72, 110), md: 'auto' },
        boxSizing: 'border-box',
        paddingTop: { xs: fluid(25, 60), md: desktopScaled(86) },
        paddingLeft: { xs: fluid(30, 34), md: desktopScaled(282) },
        paddingRight: { xs: fluid(30, 34), md: 0 },
      }}
    >
      {enabled && (
        <ButtonBase
          component={Link}
          to={href}
          sx={{
            width: { xs: '100%', md: desktopScaled(532) },
            minWidth: { md: 'max-content' },
            height: { xs: fluid(47, 50), md: desktopType(47) },
            borderRadius: { xs: fluid(24, 25), md: desktopType(24) },
            backgroundColor: COLORS.cyan,
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingLeft: { xs: fluid(22, 22), md: desktopScaled(21) },
            paddingRight: { xs: fluid(10, 22), md: desktopScaled(12) },
            gap: fluid(14, 16),
            color: COLORS.black,
          }}
        >
          <Typography
            component="span"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
              lineHeight: { xs: fluid(20, 21), md: desktopType(25) },
              fontWeight: 500,
              fontStyle: 'italic',
              color: COLORS.black,
            }}
          >
            {text}
          </Typography>
          <Icon src={arrowIcon} size={{ xs: fluid(28, 15), md: desktopType(27.8) }} />
        </ButtonBase>
      )}
    </Box>
  )
}

export default EventPill
