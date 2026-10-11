// Přepínač týdne rozvrhu – šipky kolem popisku „zdroj od - do“
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, hoverDimSx } from '../theme'
import Icon from './Icon'

interface WeekSwitcherProps {
  label: string
  onPrev: () => void
  onNext: () => void
}

const ARROW_SIZE = { xs: fluid(28, 30), md: desktopType(35.17) }

export function WeekSwitcher({ label, onPrev, onNext }: WeekSwitcherProps) {
  const { prevWeek, nextWeek, prevIcon, nextIcon } = content.pages.reservations

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: fluid(8, 10), md: desktopScaled(10) },
        paddingTop: { xs: fluid(28, 32), md: desktopScaled(44.8) },
        paddingLeft: { xs: fluid(30, 34), md: 0 },
        paddingRight: { xs: fluid(30, 34), md: 0 },
      }}
    >
      <ButtonBase aria-label={prevWeek} onClick={onPrev} sx={{ borderRadius: '50%', ...hoverDimSx() }}>
        <Icon src={prevIcon} size={ARROW_SIZE} />
      </ButtonBase>
      <Typography
        component="p"
        aria-live="polite"
        sx={{
          margin: 0,
          minWidth: { md: desktopScaled(308) },
          textAlign: 'center',
          fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
          lineHeight: { xs: fluid(20, 21), md: fluidDesktop(21, 25) },
          fontWeight: 600,
          color: COLORS.white,
        }}
      >
        {label}
      </Typography>
      <ButtonBase aria-label={nextWeek} onClick={onNext} sx={{ borderRadius: '50%', ...hoverDimSx() }}>
        <Icon src={nextIcon} size={ARROW_SIZE} />
      </ButtonBase>
    </Box>
  )
}

export default WeekSwitcher
