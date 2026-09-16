// Hamburger menu (tyrkysové pozadí) – mobil přes celou obrazovku, desktop jako pravý panel;
// rozbalená je vždy nejvýše jedna sekce, po zavření se všechny zabalí, takže menu se vždy otevírá zabalené
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid } from '../fluid'
import { COLORS, DESKTOP, DESKTOP_MQ } from '../theme'
import Icon from './Icon'
import { useMenu } from './MenuContext'
import NavSection from './NavSection'

// Délka animace otevření/zavření menu
const MENU_TRANSITION_MS = 300

export function MenuOverlay() {
  const { isOpen, close } = useMenu()
  // Popisek právě rozbalené sekce; opětovné kliknutí ji zabalí
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  // Menu zůstává v DOM po dobu zavírací animace
  const [rendered, setRendered] = useState(isOpen)

  // Otevření vykreslí menu hned (odvozený stav), zavření ho odstraní až po doběhnutí animace
  if (isOpen && !rendered) setRendered(true)

  useEffect(() => {
    if (isOpen) return
    const timer = window.setTimeout(() => {
      setRendered(false)
      setExpandedLabel(null)
    }, MENU_TRANSITION_MS)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  // Otevřené menu zamkne scroll stránky; kliknutí mimo panel (desktop) menu zavře
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handlePointer = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) close()
    }
    document.addEventListener('mousedown', handlePointer)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('mousedown', handlePointer)
    }
  }, [isOpen, close])

  if (!rendered) return null

  return (
    <Box
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={content.header.menuLabel}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: (theme) => theme.zIndex.modal,
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: COLORS.teal,
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        display: 'flex',
        flexDirection: 'column',
        // Mobil: menu se objeví a zmizí prolnutím
        animation: `menuFadeIn ${MENU_TRANSITION_MS}ms ease-out`,
        opacity: isOpen ? 1 : 0,
        transition: `opacity ${MENU_TRANSITION_MS}ms ease-in`,
        '@keyframes menuFadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
        '@keyframes menuSlideIn': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        // Desktop: panel u pravého okraje okna, vyjíždí zprava a při zavírání zajíždí zpět
        [DESKTOP_MQ]: {
          left: 'auto',
          width: desktopScaled(814),
          // Panel se nikdy nezúží pod šířku nejdelší položky menu
          minWidth: 'max-content',
          animation: `menuSlideIn ${MENU_TRANSITION_MS}ms ease-out`,
          opacity: 1,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform ${MENU_TRANSITION_MS}ms ease-in`,
        },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none', transition: 'none' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: { xs: fluid(76, 82), md: 0 },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Logo vede na úvod a zavře menu (na desktopu zůstává vidět logo hlavičky pod panelem) */}
        <Link to="/" aria-label={content.brand.name} onClick={close} style={{ display: 'block', lineHeight: 0 }}>
          <Box
            component="img"
            src={content.brand.logo}
            alt={content.brand.logoAlt}
            sx={{ height: fluid(69, 74), width: 'auto', display: { xs: 'block', md: 'none' } }}
          />
        </Link>
        <ButtonBase
          aria-label={content.header.closeMenu}
          onClick={close}
          sx={{
            position: 'absolute',
            top: { xs: fluid(52, 56), md: desktopScaled(104) },
            right: { xs: fluid(28, 32), md: desktopScaled(DESKTOP.margin) },
            borderRadius: '50%',
          }}
        >
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Icon src={content.menu.closeIcon} size={fluid(64, 68)} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Icon src={content.menu.closeIconDesktop} size={desktopType(60)} />
          </Box>
        </ButtonBase>
      </Box>

      <Box
        component="nav"
        sx={{
          paddingTop: { xs: fluid(92, 100), md: desktopScaled(248) },
          paddingLeft: { xs: fluid(70, 76), md: desktopScaled(173) },
          paddingRight: { xs: fluid(30, 34), md: 0 },
        }}
      >
        {content.navSections.map((section) => (
          <Box key={section.label} sx={{ '& + &': { paddingTop: { xs: fluid(26, 28), md: desktopScaled(10) } } }}>
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
          // Desktopový návrh blok s telefonem nemá
          display: { xs: 'block', md: 'none' },
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
              sx={{
                display: 'block',
                fontSize: fluid(20, 22),
                lineHeight: fluid(24, 26),
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              {content.menu.callReception}
            </Typography>
            <Typography
              component="span"
              sx={{
                display: 'block',
                fontSize: fluid(10, 11),
                lineHeight: fluid(14, 15),
                fontStyle: 'italic',
                paddingTop: '2px',
              }}
            >
              {content.menu.callNote}
            </Typography>
          </Box>
        </Typography>
      </Box>
    </Box>
  )
}

export default MenuOverlay
