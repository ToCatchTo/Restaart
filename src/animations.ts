// Sdílené vstupní animace (jemné zjevení zdola)
import { keyframes } from '@mui/material/styles'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`

// Styl pro prvek, který se po vykreslení zjeví zdola; delayMs posouvá start (stagger)
export const fadeInUpSx = (delayMs = 0) =>
  ({
    opacity: 0,
    animation: `${fadeInUp} 0.6s ease-out ${delayMs}ms forwards`,
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      animation: 'none',
    },
  }) as const
