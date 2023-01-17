import { useCallback, useEffect, useRef } from 'react'

export function useIsMounted (initialState) {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const getIsMounted = useCallback(() => isMounted.current, [])

  return getIsMounted
}
