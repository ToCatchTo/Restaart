// Jednotný hook pro načítání dat (mock JSON v /public/data, API podle VITE_API_URL nebo absolutní URL)
import { useEffect, useState } from 'react'

export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// Výsledek posledního dokončeného požadavku včetně cesty, ke které patří
interface FetchResult<T> {
  path: string | null
  data: T | null
  error: string | null
}

// Základní URL – prázdná env proměnná znamená lokální mock data
const BASE_URL = import.meta.env.VITE_API_URL || '/data'

// Absolutní URL a /api/… beze změny, ostatní cesty se připojí k základní URL
const resolveUrl = (path: string) => (/^https?:\/\//.test(path) || path.startsWith('/api/') ? path : `${BASE_URL}${path}`)

// Mezipaměť úspěšných odpovědí podle výsledné URL, sdílená napříč komponentami
const cache = new Map<string, unknown>()

// Vyprázdní mezipaměť fetchů (pro testy)
export const clearFetchCache = () => cache.clear()

// Cesta null = nic se nenačítá
export function useFetch<T>(path: string | null): FetchState<T> {
  const [result, setResult] = useState<FetchResult<T>>({ path: null, data: null, error: null })

  useEffect(() => {
    if (path === null) return

    const url = resolveUrl(path)

    // Data už jsou v mezipaměti – žádný požadavek, výsledek se čte přímo při renderu níže
    if (cache.has(url)) return

    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<T>
      })
      .then((data) => {
        cache.set(url, data)
        setResult({ path, data, error: null })
      })
      .catch((error: unknown) => {
        // Zrušený požadavek není chyba
        if (error instanceof DOMException && error.name === 'AbortError') return
        setResult({ path, data: null, error: error instanceof Error ? error.message : String(error) })
      })

    return () => controller.abort()
  }, [path])

  if (path === null) return { data: null, loading: false, error: null }

  // Cesta už je v mezipaměti – vrátit rovnou bez čekání na efekt
  const url = resolveUrl(path)
  if (cache.has(url)) return { data: cache.get(url) as T, loading: false, error: null }

  // Dokud výsledek nepatří k aktuální cestě, data se teprve načítají
  const isCurrent = result.path === path
  return {
    data: isCurrent ? result.data : null,
    loading: !isCurrent,
    error: isCurrent ? result.error : null,
  }
}

export default useFetch
