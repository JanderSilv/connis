import { useEffect, useState } from 'react'

export const useComponentIsMounted = (timeout = 0) => {
  const [isComponentMounted, setIsComponentMounted] = useState(false)

  useEffect(() => {
    if (!isComponentMounted) setTimeout(() => setIsComponentMounted(true), timeout)
  }, [isComponentMounted, timeout])

  return { isComponentMounted }
}
