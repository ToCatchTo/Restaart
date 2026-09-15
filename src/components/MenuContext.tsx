// Sdílený stav otevření hamburger menu
import { createContext, useContext } from 'react'

export interface MenuContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const MenuContext = createContext<MenuContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export const useMenu = () => useContext(MenuContext)
