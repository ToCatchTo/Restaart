// Jednotný hook pro načítání dat (API administrace přes VITE_API_URL, lokální /api funkce nebo absolutní URL)
import { useEffect, useState } from 'react'
import { content } from '../content'

export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  // Požadavek skončil odpovědí 404
  notFound: boolean
}

// Výsledek posledního dokončeného požadavku včetně cesty, ke které patří
interface FetchResult<T> {
  path: string | null
  data: T | null
  error: string | null
  notFound: boolean
}

// Cesty /api/… patří API administrace, kromě lokální funkce hodnocení Google
const isBackendPath = (path: string) => path.startsWith('/api/') && path !== content.api.googleRating

// Základní URL API – prázdná znamená stejný origin (lokálně Vite proxy)
const resolveUrl = (path: string) => (isBackendPath(path) ? `${import.meta.env.VITE_API_URL ?? ''}${path}` : path)

// Mezipaměť úspěšných odpovědí podle výsledné URL, sdílená napříč komponentami
const cache = new Map<string, unknown>()

// Vyprázdní mezipaměť fetchů (pro testy)
export const clearFetchCache = () => cache.clear()

// Cesta null = nic se nenačítá
export function useFetch<T>(path: string | null): FetchState<T> {
  const [result, setResult] = useState<FetchResult<T>>({ path: null, data: null, error: null, notFound: false })

  useEffect(() => {
    if (path === null) return

    const url = resolveUrl(path)

    // Data už jsou v mezipaměti – žádný požadavek, výsledek se čte přímo při renderu níže
    if (cache.has(url)) return

    const controller = new AbortController()
    // Token se posílá jen API administrace
    const token = import.meta.env.VITE_API_TOKEN
    const headers = isBackendPath(path) && token ? { 'X-AUTH-TOKEN': token } : undefined

    fetch(url, { signal: controller.signal, headers })
      .then((response) => {
        if (response.status === 404) {
          setResult({ path, data: null, error: 'HTTP 404', notFound: true })
          return
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return (response.json() as Promise<T>).then((data) => {
          cache.set(url, data)
          setResult({ path, data, error: null, notFound: false })
        })
      })
      .catch((error: unknown) => {
        // Zrušený požadavek není chyba
        if (error instanceof DOMException && error.name === 'AbortError') return
        setResult({ path, data: null, error: error instanceof Error ? error.message : String(error), notFound: false })
      })

    return () => controller.abort()
  }, [path])

  if (path === null) return { data: null, loading: false, error: null, notFound: false }

  // Cesta už je v mezipaměti – vrátit rovnou bez čekání na efekt
  const url = resolveUrl(path)
  if (cache.has(url)) return { data: cache.get(url) as T, loading: false, error: null, notFound: false }

  // Dokud výsledek nepatří k aktuální cestě, data se teprve načítají
  const isCurrent = result.path === path
  return {
    data: isCurrent ? result.data : null,
    loading: !isCurrent,
    error: isCurrent ? result.error : null,
    notFound: isCurrent && result.notFound,
  }
}

export default useFetch
