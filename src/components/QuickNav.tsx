// Rychlá navigace (mobil) – fixní pruh se čtyřmi ikonami a rozbalovacím panelem aktivit
import { useEffect, useRef, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import ActivitiesDropdown from './ActivitiesDropdown'
import CloseMark from './CloseMark'
import Icon from './Icon'

interface QuickNavItemProps {
  label: string
  icon: string
  active?: boolean
  href?: string
  external?: boolean
  onClick?: () => void
}

// Odsazení pruhu od horního okraje (hlavička + logo + mezera)
const BAR_TOP = fluid(183, 198)
const BAR_HEIGHT = fluid(94, 100)
const BAR_GAP = fluid(38, 42)
// Panel aktivit začíná ve svislém středu pilulky
const PANEL_OVERLAP = `calc(${BAR_HEIGHT} / 2)`
const PANEL_COLOR = 'rgba(54, 105, 106, 0.92)'

const itemSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: fluid(6, 7),
  textDecoration: 'none',
  color: COLORS.white,
  borderRadius: '30px',
} as const

// Jedna položka pruhu – ikona v kruhu a popisek
function QuickNavItem({ label, icon, active = false, href, external, onClick }: QuickNavItemProps) {
  const inner: ReactNode = (
    <>
      {active ? <CloseMark size={fluid(44, 50)} markSize={fluid(16, 17)} /> : <Icon src={icon} size={fluid(44, 50)} />}
      <Typography component="span" sx={{ fontSize: fluid(12, 13), lineHeight: fluid(14, 15), fontWeight: 400, letterSpacing: '0.02em' }}>
        {label}
      </Typography>
    </>
  )

  if (onClick) {
    return (
      <ButtonBase onClick={onClick} aria-expanded={active} sx={itemSx}>
        {inner}
      </ButtonBase>
    )
  }
  if (external) {
    return (
      <ButtonBase component="a" href={href} sx={itemSx}>
        {inner}
      </ButtonBase>
    )
  }
  return (
    <ButtonBase component={Link} to={href ?? '/'} sx={itemSx}>
      {inner}
    </ButtonBase>
  )
}

export function QuickNav() {
  const [activitiesOpen, setActivitiesOpen] = useState(false)
  const layerRef = useRef<HTMLDivElement>(null)
  const { reservation, events, activities, reception } = content.quickNav

  // Kliknutí nebo dotyk mimo vrstvu zavře panel aktivit
  useEffect(() => {
    if (!activitiesOpen) return

    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (!layerRef.current?.contains(event.target as Node)) setActivitiesOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('touchstart', handlePointer)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('touchstart', handlePointer)
    }
  }, [activitiesOpen])

  return (
    <>
      {/* Zástupné místo v toku stránky – samotný pruh je ve fixní vrstvě */}
      <Box aria-hidden sx={{ height: BAR_HEIGHT, marginTop: BAR_GAP, display: { xs: 'block', md: 'none' } }} />

      <Box
        ref={layerRef}
        data-layer="quick-nav"
        sx={{
          position: 'fixed',
          top: BAR_TOP,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          // Vrstva propouští kliknutí na obsah, kliká se jen na pruh
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box',
            paddingLeft: fluid(19, 22),
            paddingRight: fluid(19, 22),
            pointerEvents: 'auto',
          }}
        >
          {/* Pilulka – rozostřené pozadí, leží nad rozbaleným panelem */}
          <Box
            component="nav"
            sx={{
              position: 'relative',
              zIndex: 1,
              height: BAR_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingLeft: fluid(6, 8),
              paddingRight: fluid(6, 8),
              borderRadius: fluid(47, 50),
              backgroundColor: 'rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <QuickNavItem label={reservation.label} icon={reservation.icon} href={content.contact.reservationUrl} external />
            <QuickNavItem label={events.label} icon={events.icon} href={events.href} />
            <QuickNavItem
              label={activities.label}
              icon={activities.icon}
              active={activitiesOpen}
              onClick={() => setActivitiesOpen((value) => !value)}
            />
            <QuickNavItem label={reception.label} icon={reception.icon} href={content.contact.phoneHref} external />
          </Box>

          {/* Panel aktivit – horní část je schovaná za pilulkou */}
          {activitiesOpen && (
            <Box
              sx={{
                position: 'absolute',
                top: '0px',
                left: fluid(19, 22),
                right: fluid(19, 22),
                zIndex: 0,
                boxSizing: 'border-box',
                paddingTop: '85px',
                borderRadius: fluid(60, 32),
                backgroundColor: PANEL_COLOR,
                backdropFilter: 'blur(30px)',
                '@keyframes quickNavFadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
                animation: 'quickNavFadeIn 200ms ease-out',
                // Delší seznam se posouvá uvnitř panelu bez viditelného scrollbaru
                maxHeight: `calc(100vh - ${BAR_TOP} - ${PANEL_OVERLAP} - 16px)`,
                overflowY: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <ActivitiesDropdown onNavigate={() => setActivitiesOpen(false)} />
              <Box aria-hidden sx={{ height: fluid(40, 44) }} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default QuickNav
