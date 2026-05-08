import { useRef, useEffect, useState } from 'react'
import {
  Leaf,
  ShieldCheck,
  FlaskConical,
  Ban,
  MapPin,
  Weight,
  Star,
} from 'lucide-react'

const ITEMS = [
  { label: 'Plant Based Protein', icon: Leaf },
  { label: '100% Non-GMO Soybeans', icon: ShieldCheck },
  { label: 'No Preservatives', icon: FlaskConical },
  { label: 'No Artificial Additives', icon: Ban },
  { label: 'Made in New Zealand', icon: MapPin },
  { label: 'Net 450g', icon: Weight },
  { label: '5 Health Star Rating', icon: Star },
] as const

function TrustStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // Tampilkan scroll hint sebentar di mobile
    const isMobile = window.innerWidth < 1024
    if (isMobile && scrollRef.current) {
      const el = scrollRef.current
      const hasOverflow = el.scrollWidth > el.clientWidth
      if (hasOverflow) {
        setShowHint(true)
        const timer = setTimeout(() => setShowHint(false), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  return (
    <section className="relative border-y border-[#D8EBD0] bg-[#EEF7EA]">
      <div
        ref={scrollRef}
        className="mx-auto flex w-full max-w-6xl snap-x gap-2 overflow-x-auto px-4 py-4 scrollbar-hide lg:flex-wrap lg:justify-center lg:gap-3 lg:px-8 lg:overflow-visible"
      >
        {ITEMS.map((item, index) => {
          const Icon = item.icon
          return (
            <span
              key={item.label}
              className="snap-start inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#D8EBD0] bg-white px-3.5 py-2 text-xs font-semibold text-[#4F7C48] shadow-sm transition-all duration-200 hover:border-[#7FAD5A] hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {item.label}
            </span>
          )
        })}
      </div>

      {/* Scroll hint indicator */}
      {showHint && (
        <div className="absolute bottom-1 right-4 animate-fade-in lg:hidden">
          <div className="flex items-center gap-1 rounded-full bg-[#4F7C48] px-2.5 py-1 text-[10px] font-medium text-white shadow-md">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Swipe
          </div>
        </div>
      )}
    </section>
  )
}

export default TrustStrip
