// Hodnocení Google ze serverless funkce s náhradními hodnotami; live = načtená skutečná data
import { content } from '../content'
import { useFetch } from './useFetch'

interface PlaceDetails {
  rating?: number
  userRatingCount?: number
}

export function useGoogleRating() {
  const { data } = useFetch<PlaceDetails>(content.api.googleRating)
  const { fallbackRating, fallbackCount } = content.googleRating
  return {
    rating: data?.rating ?? fallbackRating,
    count: data?.userRatingCount ?? fallbackCount,
    live: data?.rating !== undefined && data?.userRatingCount !== undefined,
  }
}

export default useGoogleRating
