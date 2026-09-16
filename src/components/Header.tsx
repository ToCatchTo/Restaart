// Hlavička stránky – mobil: logo uprostřed a hamburger vpravo;
// desktop: logo vlevo, tlačítko „rezervovat“ a hamburger vpravo
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP, frostedButtonSx } from '../theme'
import Icon from './Icon'
import { useMenu } from './MenuContext'

interface HeaderProps {
  // Varianta tlačítka na desktopu: rezervace (výchozí) nebo návrat na web (přihlášení)
  action?: 'reservation' | 'backToWeb'
}

export function Header({ action = 'reservation' }: HeaderProps) {
  const { open } = useMenu()
  const button = content.header[action]
  const isBack = action === 'backToWeb'

  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        paddingTop: { xs: fluid(76, 82), md: desktopScaled(104) },
        paddingLeft: { md: desktopScaled(DESKTOP.margin) },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
        <Link to="/" aria-label={content.brand.name} style={{ display: 'block', lineHeight: 0 }}>
          <Box
            component="img"
            src={content.brand.logo}
            alt={content.brand.logoAlt}
            sx={{ height: { xs: fluid(69, 74), md: desktopType(102) }, width: 'auto', display: 'block' }}
          />
        </Link>
      </Box>

      {/* Desktop: tlačítko rezervovat / zpět na web */}
      <ButtonBase
        component={isBack ? Link : 'a'}
        {...(isBack ? { to: button.href } : { href: button.href, target: '_blank', rel: 'noopener' })}
        sx={{
          ...frostedButtonSx,
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          top: desktopScaled(125),
          right: desktopScaled(DESKTOP.width - 1642),
          minWidth: desktopScaled(210),
          alignItems: 'center',
          // Mezera mezi textem a šipkou jen při zmenšení (na 1920 px ji pohltí auto margin)
          gap: 'clamp(0px, calc((1920px - 100vw) / 60), 8px)',
          flexDirection: isBack ? 'row-reverse' : 'row',
          paddingLeft: isBack ? desktopScaled(17) : 0,
          paddingRight: isBack ? 0 : desktopScaled(17),
        }}
      >
        <Typography
          component="span"
          sx={{
            width: desktopScaled(162),
            minWidth: 'max-content',
            textAlign: 'center',
            fontSize: fluidDesktop(14, 24),
            lineHeight: desktopType(25),
            fontWeight: 400,
            fontStyle: 'italic',
            color: COLORS.white,
          }}
        >
          {button.label}
        </Typography>
        <Box sx={{ marginLeft: isBack ? 0 : 'auto', marginRight: isBack ? 'auto' : 0, transform: isBack ? 'scaleX(-1)' : 'none' }}>
          <Icon src={button.icon} size={desktopType(27.8)} />
        </Box>
      </ButtonBase>

      <ButtonBase
        aria-label={content.header.openMenu}
        onClick={open}
        sx={{
          position: 'absolute',
          top: { xs: fluid(50, 66), md: desktopScaled(133) },
          right: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.margin) },
          padding: { xs: '6px', md: 0 },
          borderRadius: '8px',
          color: COLORS.white,
        }}
      >
        <Icon
          src={content.header.menuIcon}
          size={{ xs: fluid(40, 42), md: desktopType(60) }}
          height={{ xs: fluid(40, 42), md: desktopType(43.1) }}
        />
      </ButtonBase>
    </Box>
  )
}

export default Header
