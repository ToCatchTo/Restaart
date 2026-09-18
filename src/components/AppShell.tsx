// Obal aplikace – obsah přes celou šířku okna a stav hlavního menu
import { useEffect, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
import { COLORS } from '../theme'
import { MenuContext } from './MenuContext'
import MenuOverlay from './MenuOverlay'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  // Změna stránky odscrolluje nahoru
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <MenuContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      <Box sx={{ minHeight: '100vh', backgroundColor: COLORS.dark }}>
        <Box
          component="main"
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            backgroundColor: COLORS.dark,
            overflowX: 'hidden',
          }}
        >
          {children}
        </Box>
        <MenuOverlay />
      </Box>
    </MenuContext.Provider>
  )
}

export default AppShell
