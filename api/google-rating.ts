// Serverless funkce (Vercel) – hodnocení podniku z Google Places API, klíč na serveru, odpověď cachovaná na CDN 24 h

const PLACES_API_URL = 'https://places.googleapis.com/v1/places/'
const CACHE_SECONDS = 60 * 60 * 24

// Pole vyžádaná z Places API
interface PlaceDetails {
  rating?: number
  userRatingCount?: number
}

const jsonResponse = (body: unknown, status: number, cache = false) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cache ? `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}` : 'no-store',
    },
  })

export async function GET(): Promise<Response> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!apiKey || !placeId) return jsonResponse({ error: 'Chybí konfigurace Google Places API' }, 503)

  const response = await fetch(`${PLACES_API_URL}${encodeURIComponent(placeId)}`, {
    headers: { 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': 'rating,userRatingCount' },
  })
  if (!response.ok) return jsonResponse({ error: `Google Places API: HTTP ${response.status}` }, 502)

  const { rating, userRatingCount } = (await response.json()) as PlaceDetails
  return jsonResponse({ rating, userRatingCount }, 200, true)
}
