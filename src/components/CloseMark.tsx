// Tmavý kruh s bílým křížkem (aktivní stav položky „aktivity“ v rychlé navigaci)
import Box from '@mui/material/Box'
import { COLORS } from '../theme'

interface CloseMarkProps {
  size: string
  markSize: string
}

const barSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '2px',
  backgroundColor: COLORS.white,
  borderRadius: '1px',
} as const

export function CloseMark({ size, markSize }: CloseMarkProps) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: COLORS.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Box sx={{ position: 'relative', width: markSize, height: markSize }}>
        <Box sx={{ ...barSx, transform: 'translate(-50%, -50%) rotate(45deg)' }} />
        <Box sx={{ ...barSx, transform: 'translate(-50%, -50%) rotate(-45deg)' }} />
      </Box>
    </Box>
  )
}

export default CloseMark
