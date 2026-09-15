// Galerie – jedna zaoblená fotka a šipky pro přepínání
import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import Icon from './Icon'

interface GalleryProps {
  images: string[]
  alt: string
}

export function Gallery({ images, alt }: GalleryProps) {
  const [index, setIndex] = useState(0)
  const { prevIcon, nextIcon, prevLabel, nextLabel } = content.pages.activity
  const count = images.length

  if (count === 0) return null

  const step = (delta: number) => setIndex((value) => (value + delta + count) % count)

  return (
    <Box sx={{ paddingTop: fluid(95, 100), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
      <Box
        component="img"
        src={images[index]}
        alt={alt}
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          borderRadius: fluid(31, 33),
          backgroundColor: COLORS.gray,
        }}
      />
      <Box
        sx={{
          paddingTop: fluid(36, 38),
          minHeight: fluid(132, 136),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: fluid(28, 30),
        }}
      >
        <ButtonBase aria-label={prevLabel} onClick={() => step(-1)} sx={{ borderRadius: '50%' }}>
          <Icon src={prevIcon} size={fluid(28, 30)} />
        </ButtonBase>
        <ButtonBase aria-label={nextLabel} onClick={() => step(1)} sx={{ borderRadius: '50%' }}>
          <Icon src={nextIcon} size={fluid(28, 30)} />
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default Gallery
