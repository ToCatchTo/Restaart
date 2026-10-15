// Hlavička stránky – logo, tlačítko přihlášení k rezervacím / zpět na web (desktop) a ikona menu
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP, hoverDimMenuSx, theme } from '../theme'
import ArrowLinkButton from './ArrowLinkButton'
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
      {/* Řádek hlavičky – mobil: logo uprostřed, desktop: vše v jedné ose */}
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
        <ArrowLinkButton
          label={button.label}
          icon={button.icon}
          href={button.href}
          reverse={isBack}
          iconSize={fluidDesktop(18, 27.8)}
          fontSize={fluidDesktop(16, 24)}
          lineHeight="25px"
          sx={{
            // Na malém desktopu vyšší než sdílené prosklené tlačítko
            height: fluidDesktop(52, 60),
            borderRadius: fluidDesktop(35, 40),
            display: { xs: 'none', md: 'flex' },
            marginLeft: 'auto',
            minWidth: desktopScaled(210),
            // Mezera mezi textem a šipkou jen při zmenšení
            gap: 'clamp(0px, calc((1920px - 100vw) / 60), 8px)',
            paddingLeft: fluidDesktop(14, 17),
            paddingRight: fluidDesktop(14, 17),
          }}
        />

        <ButtonBase
          aria-label={content.header.openMenu}
          onClick={open}
          sx={{
            // Mobil: ikona menu fixně vpravo nahoře, zůstává i při scrollu
            position: { xs: 'fixed', md: 'static' },
            top: { xs: fluid(50, 66) },
            right: { xs: fluid(30, 34) },
            zIndex: { xs: theme.zIndex.appBar, md: 'auto' },
            marginLeft: { md: desktopScaled(78) },
            padding: { xs: '6px', md: 0 },
            borderRadius: '8px',
            ...hoverDimMenuSx,
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
