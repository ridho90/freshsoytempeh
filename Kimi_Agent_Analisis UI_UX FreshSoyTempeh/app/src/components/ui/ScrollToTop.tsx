import { useState, useEffect, useCallback } from 'react'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 400)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [toggleVisibility])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="animate-fade-in fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#D8EBD0] bg-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 lg:bottom-8 lg:right-8"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <svg
        className="h-5 w-5 text-[#4F7C48]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}

export default ScrollToTop
