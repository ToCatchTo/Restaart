// Hlavička stránky – logo uprostřed a hamburger vpravo
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import Icon from './Icon'
import { useMenu } from './MenuContext'

export function Header() {
  const { open } = useMenu()

  return (
    <Box component="header" sx={{ position: 'relative', paddingTop: fluid(76, 82) }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/" aria-label={content.brand.name} style={{ display: 'block', lineHeight: 0 }}>
          <Box
            component="img"
            src={content.brand.logo}
            alt={content.brand.logoAlt}
            sx={{ height: fluid(69, 74), width: 'auto', display: 'block' }}
          />
        </Link>
      </Box>

      <ButtonBase
        aria-label={content.header.openMenu}
        onClick={open}
        sx={{
          position: 'absolute',
          top: fluid(50, 66),
          right: fluid(30, 34),
          padding: '6px',
          borderRadius: '8px',
          color: COLORS.white,
        }}
      >
        <Icon src={content.header.menuIcon} size={fluid(40, 42)} />
      </ButtonBase>
    </Box>
  )
}

export default Header
