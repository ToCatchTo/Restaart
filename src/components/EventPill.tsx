// Tyrkysové tlačítko s upoutávkou na akci (odkaz na detail akce)
// Obal má pevnou výšku, aby se při skrytém tlačítku obsah pod ním neposunul
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import Icon from './Icon'

export function EventPill() {
  const { enabled, text, href, arrowIcon } = content.eventPill

  return (
    <Box
      sx={{
        // Výška = horní odsazení + výška tlačítka (rezervované místo)
        height: fluid(72, 110),
        boxSizing: 'border-box',
        paddingTop: fluid(25, 60),
        paddingLeft: fluid(30, 34),
        paddingRight: fluid(30, 34),
      }}
    >
      {enabled && (
        <ButtonBase
          component={Link}
          to={href}
          sx={{
            width: '100%',
            height: fluid(47, 50),
            borderRadius: fluid(24, 25),
            backgroundColor: COLORS.cyan,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: fluid(22, 22),
            paddingRight: fluid(10, 22),
            gap: fluid(14, 16),
            color: COLORS.black,
          }}
        >
          <Typography
            component="span"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              fontSize: fluid(16, 17),
              lineHeight: fluid(20, 21),
              fontWeight: 500,
              fontStyle: 'italic',
              color: COLORS.black,
            }}
          >
            {text}
          </Typography>
          <Icon src={arrowIcon} size={fluid(28, 15)} />
        </ButtonBase>
      )}
    </Box>
  )
}

export default EventPill
