// Tyrkysové tlačítko s upoutávkou na akci (odkaz na detail akce)
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import Icon from './Icon'

export function EventPill() {
  const { text, href, icon, arrowIcon } = content.eventPill

  return (
    <Box sx={{ paddingTop: fluid(75, 60), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
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
          paddingLeft: fluid(8, 9),
          paddingRight: fluid(20, 22),
          gap: fluid(14, 16),
          color: COLORS.black,
        }}
      >
        <Icon src={icon} size={fluid(32, 34)} />
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
        <Icon src={arrowIcon} size={fluid(14, 15)} />
      </ButtonBase>
    </Box>
  )
}

export default EventPill
