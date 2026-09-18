// Karta s hodnocením Google – logo, známka, hvězdy, počet recenzí a odkaz na všechny recenze
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid, fluidDesktop } from '../fluid'
import { useGoogleRating } from '../hooks/useGoogleRating'
import { COLORS, FONT_SECONDARY, hoverDarkenSx } from '../theme'
import MaskIcon from './MaskIcon'

const CARD_COLOR = '#f6f7fc'
const TITLE_COLOR = '#1b1f4a'
const COUNT_COLOR = '#7c80a6'
const STAR_COLOR = '#f6b400'
const STAR_EMPTY_COLOR = '#c9cce0'
const BUTTON_COLOR = '#0a7cff'
const LOGO_SHADOW = '0 2px 8px rgba(0, 0, 0, 0.08)'

// Desktop: hodnoty z návrhu se k breakpointu zmenšují jen na 80 %
const DESKTOP_MIN_RATIO = 0.8
const mild = (px: number) => fluidDesktop(Math.round(px * DESKTOP_MIN_RATIO * 10) / 10, px)

// Desktop: rozměry karty a odstup od horní hrany patičky
const CARD_WIDTH = fluidDesktop(540, 1226)
const CARD_HEIGHT = mild(121)
const FOOTER_OFFSET = fluidDesktop(70, 130)

const formatRating = (rating: number) => rating.toLocaleString('cs-CZ', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const formatCount = (count: number) => count.toLocaleString('cs-CZ')

interface GoogleRatingProps {
  // Stránky, které mají widget jen v desktopovém návrhu
  desktopOnly?: boolean
  // Desktop: karta přesahuje spodní okraj fotosekce, nebo leží pod horní hranou patičky
  anchor?: 'section-bottom' | 'footer-top'
}

export function GoogleRating({ desktopOnly = false, anchor = 'section-bottom' }: GoogleRatingProps) {
  const { logo, logoAlt, starIcon, maxStars, title, buttonLabel, reviewsUrl } = content.googleRating
  const { rating, count } = useGoogleRating()
  const filledStars = Math.round(rating)

  return (
    <Box
      sx={{
        paddingTop: { xs: fluid(145, 100), md: 0 },
        display: { xs: desktopOnly ? 'none' : 'flex', md: 'flex' },
        justifyContent: 'center',
        // Desktop: karta vodorovně uprostřed, ukotvená k okraji sekce
        position: { md: 'absolute' },
        left: { md: '50%' },
        transform: { md: 'translateX(-50%)' },
        bottom: { md: anchor === 'section-bottom' ? `calc(-1 * (${FOOTER_OFFSET} + ${CARD_HEIGHT}))` : 'auto' },
        top: { md: anchor === 'footer-top' ? FOOTER_OFFSET : 'auto' },
      }}
    >
      <Box
        sx={{
          width: { xs: fluid(280, 300), md: CARD_WIDTH },
          height: { md: CARD_HEIGHT },
          borderRadius: { xs: fluid(16, 18), md: mild(18) },
          backgroundColor: CARD_COLOR,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          paddingTop: { xs: fluid(20, 22), md: 0 },
          paddingBottom: { xs: fluid(20, 22), md: 0 },
          paddingLeft: { xs: fluid(20, 22), md: mild(30) },
          paddingRight: { xs: fluid(20, 22), md: mild(30) },
          boxSizing: 'border-box',
          fontFamily: FONT_SECONDARY,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* Logo v bílém čtverci a název */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: fluid(14, 15), md: mild(14) } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                width: { xs: fluid(40, 42), md: mild(40) },
                height: { xs: fluid(40, 42), md: mild(40) },
                borderRadius: { xs: fluid(8, 9), md: mild(10) },
                backgroundColor: COLORS.white,
                boxShadow: LOGO_SHADOW,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt={logoAlt}
                sx={{ width: { xs: fluid(28, 30), md: mild(26) }, height: { xs: fluid(28, 30), md: mild(26) }, display: 'block' }}
              />
            </Box>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: fluid(20, 21), md: mild(26) },
                lineHeight: { xs: fluid(24, 25), md: mild(30) },
                fontFamily: FONT_SECONDARY,
                fontWeight: 700,
                color: TITLE_COLOR,
                // Mobil: název ve dvou řádcích vedle loga
                maxWidth: { xs: '6em', md: 'none' },
                whiteSpace: { md: 'nowrap' },
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Známka, hvězdy a počet recenzí */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: fluid(10, 11), md: mild(10) }, paddingTop: { xs: fluid(14, 15), md: mild(6) } }}>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: fluid(17, 18), md: mild(20) },
                lineHeight: { xs: fluid(20, 21), md: mild(24) },
                fontFamily: FONT_SECONDARY,
                fontWeight: 700,
                color: TITLE_COLOR,
              }}
            >
              {formatRating(rating)}
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: fluid(3, 4), md: mild(3) } }} aria-hidden>
              {Array.from({ length: maxStars }, (_, index) => (
                <MaskIcon key={index} src={starIcon} size={{ xs: fluid(16, 17), md: mild(18) }} color={index < filledStars ? STAR_COLOR : STAR_EMPTY_COLOR} />
              ))}
            </Box>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: fluid(13, 14), md: mild(14) },
                lineHeight: { xs: fluid(16, 17), md: mild(18) },
                fontFamily: FONT_SECONDARY,
                fontWeight: 500,
                color: COUNT_COLOR,
              }}
            >
              ({formatCount(count)})
            </Typography>
          </Box>
        </Box>

        {/* Odkaz na všechny recenze – mobil přes celou šířku, desktop vpravo */}
        <ButtonBase
          component="a"
          href={reviewsUrl}
          target="_blank"
          rel="noopener"
          sx={{
            marginTop: { xs: fluid(22, 24), md: 0 },
            marginLeft: { md: 'auto' },
            width: { xs: '100%', md: 'auto' },
            height: { xs: fluid(40, 42), md: mild(42) },
            paddingLeft: { md: mild(22) },
            paddingRight: { md: mild(22) },
            borderRadius: { xs: fluid(8, 9), md: mild(8) },
            backgroundColor: BUTTON_COLOR,
            fontSize: { xs: fluid(14, 15), md: mild(15) },
            lineHeight: 1,
            fontFamily: FONT_SECONDARY,
            fontWeight: 700,
            color: COLORS.white,
            whiteSpace: 'nowrap',
            ...hoverDarkenSx(),
          }}
        >
          {buttonLabel}
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default GoogleRating
