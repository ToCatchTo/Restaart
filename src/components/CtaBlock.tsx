// Tyrkysový blok s tlačítkem a rozbalitelným textem z administrace
import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP, columnSx, hoverDarkenSx } from '../theme'
import type { PageCta } from '../types'
import Icon from './Icon'
import RichText from './RichText'

interface CtaBlockProps {
  cta: PageCta
}

export function CtaBlock({ cta }: CtaBlockProps) {
  const [open, setOpen] = useState(false)
  const { ctaButton, openIcon, closeIcon } = content.pages.activity

  // Bez textu není co rozbalit
  if (!cta.text) return null

  return (
    <Box
      sx={{
        backgroundColor: COLORS.teal,
        minHeight: { xs: fluid(360, 380), md: desktopScaled(500) },
        paddingTop: { xs: fluid(140, 150), md: desktopScaled(210) },
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ ...columnSx, paddingLeft: { xs: fluid(30, 34), md: 0 }, paddingRight: { xs: fluid(30, 34), md: 0 } }}>
        <ButtonBase
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          sx={{
            width: { xs: '100%', md: 'auto' },
            minWidth: { md: desktopScaled(316) },
            height: { xs: fluid(80, 84), md: desktopType(80) },
            borderRadius: { xs: fluid(40, 42), md: desktopType(40) },
            border: open ? 'none' : `1px solid ${COLORS.white}`,
            backgroundColor: open ? COLORS.dark : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: { xs: fluid(28, 30), md: desktopScaled(30) },
            boxSizing: 'border-box',
            marginX: { md: 'auto' },
            paddingLeft: { xs: fluid(24, 26), md: desktopScaled(41) },
            paddingRight: { xs: fluid(24, 26), md: desktopScaled(25) },
            ...hoverDarkenSx(),
            transition: 'background-color 200ms, box-shadow 200ms ease',
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: { xs: fluid(20, 21), md: fluidDesktop(20.4, 20) },
              lineHeight: { xs: fluid(24, 25), md: desktopType(25) },
              fontWeight: { xs: 500, md: 400 },
              color: COLORS.white,
            }}
          >
            {cta.buttonLabel ?? ctaButton}
          </Typography>
          <Icon src={open ? closeIcon : openIcon} size={{ xs: fluid(34, 36), md: fluidDesktop(26, 32.8) }} />
        </ButtonBase>
      </Box>

      <Collapse in={open}>
        {/* Desktop: text mezi obsahovými hranami */}
        <RichText
          html={cta.text}
          sx={{
            ...columnSx,
            marginX: 'auto',
            boxSizing: 'border-box',
            paddingTop: { xs: fluid(90, 96), md: desktopScaled(90) },
            paddingLeft: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) },
            paddingRight: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) },
            fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
            lineHeight: { xs: fluid(28, 30), md: fluidDesktop(27, 30) },
          }}
        />
        <Box aria-hidden sx={{ height: fluid(100, 110) }} />
      </Collapse>
    </Box>
  )
}

export default CtaBlock
