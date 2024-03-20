import { useEffect, useRef, useState } from 'react'

const useWindowResizeThreshold = () => {
  const [isMobileSize, setIsMobileSize] = useState(window.innerWidth <= 768)
  const prevWidth = useRef(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth
      if (currWidth <= 767 && prevWidth.current > 767) {
        setIsMobileSize(true)
      } else if (currWidth > 767 && prevWidth.current <= 767) {
        setIsMobileSize(false)
      }
      prevWidth.current = currWidth
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobileSize
}

export default useWindowResizeThreshold
