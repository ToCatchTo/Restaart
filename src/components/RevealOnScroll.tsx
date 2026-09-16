// Obal, který obsah zjeví animací až po najetí do viewportu
import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import { fadeInUpSx } from '../animations'
import { useInView } from '../hooks/useInView'

interface RevealOnScrollProps {
  children: ReactNode
  // Podíl prvku, který musí být vidět, než se animace spustí
  threshold?: number
}

export function RevealOnScroll({ children, threshold = 0.35 }: RevealOnScrollProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold)

  return (
    <Box ref={ref} sx={inView ? fadeInUpSx() : { opacity: 0 }}>
      {children}
    </Box>
  )
}

export default RevealOnScroll
