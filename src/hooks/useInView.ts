// Sleduje, zda prvek vjel do viewportu (jednorázově); threshold = viditelný podíl prvku
import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    // Bez IntersectionObserver (staré prohlížeče, testy) zobrazit rovnou
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export default useInView
