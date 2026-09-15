// Bílá karta s hodnocením Google (logo, známka, hvězdy, počet recenzí) – data z Google Places API
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { useFetch } from '../hooks/useFetch'
import { COLORS } from '../theme'
import MaskIcon from './MaskIcon'

const STAR_COLOR = '#f4b400'
const STAR_EMPTY_COLOR = '#dadce0'
const REVIEWS_COLOR = '#1a73e8'
const PLACES_API_URL = 'https://places.googleapis.com/v1/places/'

// Odpověď Places API (New) s vyžádanými poli
interface PlaceDetails {
  rating?: number
  userRatingCount?: number
}

// URL požadavku na Places API; bez klíče nebo Place ID se nic nenačítá
function buildPlaceUrl(): string | null {
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID
  if (!apiKey || !placeId) return null

  const params = new URLSearchParams({ fields: 'rating,userRatingCount', key: apiKey })
  return `${PLACES_API_URL}${encodeURIComponent(placeId)}?${params}`
}

const formatRating = (rating: number) => rating.toLocaleString('cs-CZ', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const formatCount = (count: number) => count.toLocaleString('cs-CZ')

export function GoogleRating() {
  const { logo, logoAlt, starIcon, maxStars, reviewsLabel, fallbackRating, fallbackCount } = content.googleRating
  const { data } = useFetch<PlaceDetails>(buildPlaceUrl())

  const rating = data?.rating ?? fallbackRating
  const count = data?.userRatingCount ?? fallbackCount
  const filledStars = Math.round(rating)

  return (
    <Box sx={{ paddingTop: fluid(92, 100), display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: fluid(258, 270),
          minHeight: fluid(156, 162),
          borderRadius: fluid(34, 36),
          backgroundColor: COLORS.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: fluid(24, 26),
        }}
      >
        <Box component="img" src={logo} alt={logoAlt} sx={{ width: fluid(30, 32), height: fluid(30, 32), display: 'block' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: fluid(8, 9), paddingTop: fluid(14, 16) }}>
          <Typography component="span" sx={{ fontSize: fluid(26, 28), lineHeight: fluid(30, 32), fontWeight: 700, color: COLORS.black }}>
            {formatRating(rating)}
          </Typography>
          <Box sx={{ display: 'flex', gap: fluid(2, 3) }} aria-hidden>
            {Array.from({ length: maxStars }, (_, index) => (
              <MaskIcon key={index} src={starIcon} size={fluid(20, 21)} color={index < filledStars ? STAR_COLOR : STAR_EMPTY_COLOR} />
            ))}
          </Box>
        </Box>
        <Typography
          component="span"
          sx={{ paddingTop: fluid(10, 11), fontSize: fluid(13, 14), lineHeight: fluid(16, 17), fontWeight: 500, color: REVIEWS_COLOR }}
        >
          {formatCount(count)} {reviewsLabel}
        </Typography>
      </Box>
    </Box>
  )
}

export default GoogleRating
