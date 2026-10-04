// Tyrkysový blok s textem a tlačítkem do rezervačního systému
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
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
  const { ctaIcon } = content.pages.activity

  if (!cta.text && !cta.buttonLabel) return null

  return (
    <Box
      sx={{
        backgroundColor: COLORS.teal,
        minHeight: { xs: fluid(360, 380), md: desktopScaled(500) },
        paddingTop: { xs: fluid(100, 110), md: desktopScaled(140) },
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          ...columnSx,
          boxSizing: 'border-box',
          paddingLeft: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) },
          paddingRight: { xs: fluid(30, 34), md: desktopScaled(DESKTOP.content) },
        }}
      >
        {cta.text && (
          <RichText
            html={cta.text}
            sx={{
              textAlign: 'center',
              // Vycentrovaný text: odrážky u textu, citace bez postranní linky
              '& ul, & ol': { paddingLeft: 0, listStylePosition: 'inside' },
              '& blockquote': { paddingLeft: 0, borderLeft: 'none', fontStyle: 'italic' },
              fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
              lineHeight: { xs: fluid(28, 30), md: fluidDesktop(27, 30) },
            }}
          />
        )}
        {cta.buttonLabel && (
          <Box sx={{ paddingTop: cta.text ? { xs: fluid(40, 44), md: desktopScaled(50) } : 0, display: 'flex', justifyContent: 'center' }}>
            <ButtonBase
              component="a"
              href={content.contact.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: { xs: '100%', md: 'auto' },
                minWidth: { md: desktopScaled(316) },
                height: { xs: fluid(80, 84), md: desktopType(80) },
                borderRadius: { xs: fluid(40, 42), md: desktopType(40) },
                border: `1px solid ${COLORS.white}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: fluid(28, 30), md: desktopScaled(30) },
                boxSizing: 'border-box',
                paddingLeft: { xs: fluid(24, 26), md: desktopScaled(41) },
                paddingRight: { xs: fluid(24, 26), md: desktopScaled(25) },
                ...hoverDarkenSx(),
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
                {cta.buttonLabel}
              </Typography>
              <Icon src={ctaIcon} size={{ xs: fluid(34, 36), md: fluidDesktop(26, 32.8) }} />
            </ButtonBase>
          </Box>
        )}
      </Box>
      <Box aria-hidden sx={{ height: { xs: fluid(100, 110), md: desktopScaled(140) } }} />
    </Box>
  )
}

export default CtaBlock
