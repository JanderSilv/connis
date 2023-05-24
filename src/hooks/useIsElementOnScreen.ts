import { useState, useEffect } from 'react'

export const useIsElementOnScreen = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isIntersecting
}
