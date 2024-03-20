import { useRef, useEffect } from 'react'

export default function ClickOutside({ children, onClick, className }) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickListener)

    return () => {
      document.removeEventListener('mousedown', handleClickListener)
    }
  }, [])

  const handleClickListener = (event: any) => {
    let clickedInside: any
    clickedInside = wrapperRef && wrapperRef.current.contains(event.target)

    if (clickedInside) return
    else onClick()
  }

  return (
    <div ref={wrapperRef} className={`${className || ''}`}>
      {children}
    </div>
  )
}
