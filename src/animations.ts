// Sdílené vstupní animace (jemné zjevení zdola)
import { keyframes } from '@mui/material/styles'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`

// Prvek se po vykreslení zjeví zdola; delayMs posouvá start
export const fadeInUpSx = (delayMs = 0) =>
  ({
    opacity: 0,
    animation: `${fadeInUp} 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms forwards`,
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      animation: 'none',
    },
  }) as const
