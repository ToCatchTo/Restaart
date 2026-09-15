// Celoobrazovkové hamburger menu (tyrkysové pozadí) – rozbalená je vždy nejvýše jedna sekce,
// po zavření se všechny sekce zabalí, takže menu se vždy otevírá zabalené
import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { fluid } from '../fluid'
import { APP_MAX_WIDTH, COLORS } from '../theme'
import Icon from './Icon'
import { useMenu } from './MenuContext'
import NavSection from './NavSection'

export function MenuOverlay() {
  const { isOpen, close } = useMenu()
  // Popisek právě rozbalené sekce; opětovné kliknutí ji zabalí
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null)

  return (
    <Fade in={isOpen} unmountOnExit onExited={() => setExpandedLabel(null)}>
      <Box
        role="dialog"
        aria-modal="true"
        aria-label={content.header.menuLabel}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: (theme) => theme.zIndex.modal,
          width: '100%',
          maxWidth: APP_MAX_WIDTH,
          marginX: 'auto',
          backgroundColor: COLORS.teal,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ position: 'relative', paddingTop: fluid(76, 82), display: 'flex', justifyContent: 'center' }}>
          {/* Logo vede na úvod a zavře menu */}
          <Link to="/" aria-label={content.brand.name} onClick={close} style={{ display: 'block', lineHeight: 0 }}>
            <Box
              component="img"
              src={content.brand.logo}
              alt={content.brand.logoAlt}
              sx={{ height: fluid(69, 74), width: 'auto', display: 'block' }}
            />
          </Link>
          <ButtonBase
            aria-label={content.header.closeMenu}
            onClick={close}
            sx={{ position: 'absolute', top: fluid(52, 56), right: fluid(28, 32), borderRadius: '50%' }}
          >
            <Icon src={content.menu.closeIcon} size={fluid(64, 68)} />
          </ButtonBase>
        </Box>

        <Box component="nav" sx={{ paddingTop: fluid(92, 100), paddingLeft: fluid(70, 76), paddingRight: fluid(30, 34) }}>
          {content.navSections.map((section) => (
            <Box key={section.label} sx={{ '& + &': { paddingTop: fluid(26, 28) } }}>
              <NavSection
                section={section}
                onNavigate={close}
                expanded={expandedLabel === section.label}
                onToggle={() => setExpandedLabel((current) => (current === section.label ? null : section.label))}
              />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            marginTop: 'auto',
            paddingTop: fluid(80, 90),
            paddingLeft: fluid(78, 84),
            minHeight: fluid(200, 210),
          }}
        >
          <Typography
            component="a"
            href={content.contact.phoneHref}
            sx={{ display: 'flex', alignItems: 'center', gap: fluid(20, 22), textDecoration: 'none' }}
          >
            <Icon src={content.menu.phoneIcon} size={fluid(48, 50)} />
            <Box>
              <Typography
                component="span"
                sx={{ display: 'block', fontSize: fluid(20, 22), lineHeight: fluid(24, 26), fontStyle: 'italic', fontWeight: 500 }}
              >
                {content.menu.callReception}
              </Typography>
              <Typography
                component="span"
                sx={{ display: 'block', fontSize: fluid(10, 11), lineHeight: fluid(14, 15), fontStyle: 'italic', paddingTop: '2px' }}
              >
                {content.menu.callNote}
              </Typography>
            </Box>
          </Typography>
        </Box>
      </Box>
    </Fade>
  )
}

export default MenuOverlay
