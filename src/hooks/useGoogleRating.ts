// Hodnocení Google ze serverless funkce s náhradními hodnotami, dokud se nenačtou skutečná data
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
  }
}

export default useGoogleRating
