// Galerie – jedna zaoblená fotka a šipky pro přepínání; desktop: 1640×650 s rámem
import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, hoverDimSx } from '../theme'
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
    <Box
      sx={{
        paddingTop: { xs: fluid(45, 100), md: desktopScaled(200) },
        paddingLeft: { xs: fluid(30, 34), md: desktopScaled(140) },
        paddingRight: { xs: fluid(30, 34), md: desktopScaled(140) },
      }}
    >
      <Box
        component="img"
        src={images[index]}
        alt={alt}
        loading="lazy"
        decoding="async"
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: { xs: '1 / 1', md: '1640 / 650' },
          objectFit: 'cover',
          borderRadius: { xs: fluid(31, 33), md: desktopScaled(71) },
          border: { md: `${desktopScaled(4)} solid ${COLORS.grayFrame}` },
          boxSizing: 'border-box',
          backgroundColor: COLORS.gray,
        }}
      />
      <Box
        sx={{
          paddingTop: { xs: fluid(36, 38), md: fluidDesktop(40, 66) },
          // Výška řádku = horní odsazení + šipky + volné místo pod nimi
          minHeight: { xs: fluid(132, 136), md: fluidDesktop(140, 200) },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: { xs: fluid(28, 30), md: desktopScaled(64.3) },
        }}
      >
        <ButtonBase aria-label={prevLabel} onClick={() => step(-1)} sx={{ borderRadius: '50%', ...hoverDimSx() }}>
          <Icon src={prevIcon} size={{ xs: fluid(28, 30), md: desktopType(53.6) }} />
        </ButtonBase>
        <ButtonBase aria-label={nextLabel} onClick={() => step(1)} sx={{ borderRadius: '50%', ...hoverDimSx() }}>
          <Icon src={nextIcon} size={{ xs: fluid(28, 30), md: desktopType(53.6) }} />
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default Gallery
