// Bílá karta s hodnocením Google (logo, známka, hvězdy, počet recenzí) – data ze serverless funkce api/google-rating
// Desktop: široká karta ukotvená na spodním okraji fotosekce, přesahující do patičky
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { useFetch } from '../hooks/useFetch'
import { COLORS, FONT_SECONDARY } from '../theme'
import MaskIcon from './MaskIcon'

const STAR_COLOR = '#f4b400'
const STAR_EMPTY_COLOR = '#dadce0'
const REVIEWS_COLOR = '#1a73e8'

// Desktop: odstup karty od horní hrany patičky
const FOOTER_OFFSET = fluidDesktop(70, 130)

// Odpověď serverless funkce (pole z Places API)
interface PlaceDetails {
  rating?: number
  userRatingCount?: number
}

const formatRating = (rating: number) => rating.toLocaleString('cs-CZ', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const formatCount = (count: number) => count.toLocaleString('cs-CZ')

interface GoogleRatingProps {
  // Stránky, které mají widget jen v desktopovém návrhu
  desktopOnly?: boolean
  // Desktop: ukotvení karty – přesah přes spodní okraj fotosekce (výchozí), nebo pod horní hranou patičky
  anchor?: 'section-bottom' | 'footer-top'
}

export function GoogleRating({ desktopOnly = false, anchor = 'section-bottom' }: GoogleRatingProps) {
  const { logo, logoAlt, starIcon, maxStars, reviewsLabel, fallbackRating, fallbackCount } = content.googleRating
  const { data } = useFetch<PlaceDetails>(content.api.googleRating)

  const rating = data?.rating ?? fallbackRating
  const count = data?.userRatingCount ?? fallbackCount
  const filledStars = Math.round(rating)

  return (
    <Box
      sx={{
        paddingTop: { xs: fluid(145, 100), md: 0 },
        display: { xs: desktopOnly ? 'none' : 'flex', md: 'flex' },
        justifyContent: 'center',
        // Desktop: karta 1226×121 leží pod horní hranou patičky (fotosekce má z-index nad patičkou)
        position: { md: 'absolute' },
        left: { md: desktopScaled(347) },
        bottom: { md: anchor === 'section-bottom' ? `calc(-1 * (${FOOTER_OFFSET} + ${desktopType(121)}))` : 'auto' },
        top: { md: anchor === 'footer-top' ? FOOTER_OFFSET : 'auto' },
      }}
    >
      <Box
        sx={{
          width: { xs: fluid(258, 270), md: desktopScaled(1226) },
          minHeight: { xs: fluid(156, 162), md: 0 },
          height: { md: desktopType(121) },
          borderRadius: { xs: fluid(34, 36), md: desktopType(34) },
          backgroundColor: COLORS.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          paddingTop: { xs: fluid(24, 26), md: 0 },
          boxSizing: 'border-box',
        }}
      >
        {/* Desktop: obsah v bloku 198×120 odsazeném 122 px od levého okraje karty */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: { md: desktopScaled(122) },
            width: { md: desktopType(198) },
            height: { md: desktopType(120) },
            justifyContent: { md: 'center' },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt={logoAlt}
            sx={{ width: { xs: fluid(30, 32), md: desktopType(24) }, height: { xs: fluid(30, 32), md: desktopType(24) }, display: 'block' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: fluid(8, 9), md: desktopScaled(7) }, paddingTop: { xs: fluid(14, 16), md: desktopScaled(8) } }}>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: fluid(26, 28), md: fluidDesktop(16, 21) },
                lineHeight: { xs: fluid(30, 32), md: desktopType(24) },
                fontFamily: FONT_SECONDARY,
                fontWeight: 700,
                color: COLORS.black,
              }}
            >
              {formatRating(rating)}
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: fluid(2, 3), md: desktopScaled(2) } }} aria-hidden>
              {Array.from({ length: maxStars }, (_, index) => (
                <MaskIcon
                  key={index}
                  src={starIcon}
                  size={{ xs: fluid(20, 21), md: desktopType(16) }}
                  color={index < filledStars ? STAR_COLOR : STAR_EMPTY_COLOR}
                />
              ))}
            </Box>
          </Box>
          <Typography
            component="span"
            sx={{
              paddingTop: { xs: fluid(10, 11), md: desktopScaled(6) },
              fontSize: { xs: fluid(13, 14), md: fluidDesktop(10, 11) },
              lineHeight: { xs: fluid(16, 17), md: desktopType(13) },
              fontFamily: FONT_SECONDARY,
              fontWeight: 500,
              color: REVIEWS_COLOR,
            }}
          >
            {formatCount(count)} {reviewsLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default GoogleRating
