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
        paddingTop: { xs: fluid(76, 82), md: fluidDesktop(64, 104) },
        paddingLeft: { md: desktopScaled(DESKTOP.margin) },
        paddingRight: { md: desktopScaled(DESKTOP.margin) },
      }}
    >
      {/* Řádek hlavičky – desktop: logo, tlačítko a menu v jedné ose; mobil: logo uprostřed, menu ukotvené k řádku */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
        <Link to="/" aria-label={content.brand.name} style={{ display: 'block', lineHeight: 0 }}>
          <Box
            component="img"
            src={content.brand.logo}
            alt={content.brand.logoAlt}
            sx={{ height: { xs: fluid(69, 74), md: desktopType(102) }, width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Desktop: tlačítko rezervovat / zpět na web */}
        <ButtonBase
          component={isBack ? Link : 'a'}
          {...(isBack ? { to: button.href } : { href: button.href, target: '_blank', rel: 'noopener' })}
          sx={{
            ...frostedButtonSx,
            // U breakpointu větší než sdílené prosklené tlačítko, na 1920 px stejné
            height: fluidDesktop(52, 60),
            borderRadius: fluidDesktop(35, 40),
            display: { xs: 'none', md: 'flex' },
            marginLeft: 'auto',
            minWidth: desktopScaled(210),
            alignItems: 'center',
            // Mezera mezi textem a šipkou jen při zmenšení (na 1920 px ji pohltí auto margin)
            gap: 'clamp(0px, calc((1920px - 100vw) / 60), 8px)',
            flexDirection: isBack ? 'row-reverse' : 'row',
            paddingLeft: fluidDesktop(14, 17),
            paddingRight: fluidDesktop(14, 17),
          }}
        >
          <Typography
            component="span"
            sx={{
              textAlign: 'center',
              fontSize: fluidDesktop(16, 24),
              lineHeight: '25px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: COLORS.white,
            }}
          >
            {button.label}
          </Typography>
          <Box sx={{ marginLeft: isBack ? 0 : 'auto', marginRight: isBack ? 'auto' : 0, transform: isBack ? 'scaleX(-1)' : 'none' }}>
            <Icon src={button.icon} size={fluidDesktop(18, 27.8)} />
          </Box>
        </ButtonBase>

        <ButtonBase
          aria-label={content.header.openMenu}
          onClick={open}
          sx={{
            // Mobil: ikona vpravo nad osou loga, poloha vztažená k řádku hlavičky
            position: { xs: 'absolute', md: 'static' },
            top: { xs: fluid(-26, -16) },
            right: { xs: fluid(30, 34) },
            marginLeft: { md: desktopScaled(78) },
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
    </Box>
  )
}

export default Header
