import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, MapPin, ShieldCheck, Star } from 'lucide-react'
import CTAButton from './CTAButton-improved'
import WhatsAppOrderButton from './WhatsAppOrderButton-improved'
import packImage from '../assets/fresh-soy-tempeh-pack.png'

const BADGES = [
  'Plant Based Protein',
  '100% Non-GMO Soybeans',
  'No Preservatives',
  'Made in New Zealand',
  '5 Health Star Rating',
] as const

function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 pb-12 pt-8 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:pt-14">
      {/* Left Column — Copy */}
      <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* Location Badge */}
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#EEF7EA] px-3 py-1.5 text-xs font-semibold text-[#4F7C48]">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          Made in New Zealand
        </p>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#2F3432] sm:text-4xl lg:text-[2.6rem]">
          Fresh Soy Tempeh,{' '}
          <span className="relative">
            crafted for healthy
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
              <path d="M0 6C50 2 150 2 200 6" stroke="#7FAD5A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            </svg>
          </span>{' '}
          everyday meals.
        </h1>

        {/* Subheadline */}
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#6B736E] sm:text-base">
          A versatile plant-based protein made in New Zealand from 100% Non-GMO soybeans, with no
          preservatives or artificial additives. Perfect for BBQ, steaming, stir-frying, soups, or
          any of your favourite dishes.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppOrderButton label="Order via WhatsApp" />
          <CTAButton href="#stockists" variant="secondary">
            Find a Stockist
          </CTAButton>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {BADGES.map((badge, index) => (
            <span
              key={badge}
              className={`inline-flex items-center gap-1.5 rounded-full border border-[#D8EBD0] bg-white px-3 py-1.5 text-xs font-medium text-[#4F7C48] shadow-sm transition-all duration-300 hover:border-[#7FAD5A] hover:shadow-md ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: `${400 + index * 60}ms` }}
            >
              <CheckCircle2 className="h-3 w-3 text-[#65A957]" aria-hidden="true" />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column — Product Image */}
      <div
        className={`relative mx-auto w-full max-w-md transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        {/* Product Tag */}
        <div className="absolute -left-2 -top-2 z-10 rounded-full bg-[#E89035] px-3 py-1.5 text-xs font-bold text-white shadow-lg animate-[bounceSubtle_3s_ease-in-out_infinite]">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-white" aria-hidden="true" />
            Fresh Soy Tempeh
          </span>
        </div>

        {/* Image Container */}
        <div className="img-container border border-[#D8EBD0] bg-white p-3 shadow-xl">
          {/* Skeleton placeholder */}
          {!imageLoaded && (
            <div className="skeleton aspect-square w-full" />
          )}
          <img
            src={packImage}
            alt="Fresh Soy Tempeh 450g packaging — green bag with sliced tempeh visible through the window"
            className={`w-full rounded-2xl transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            width="400"
            height="400"
          />
        </div>

        {/* Info Cards */}
        <div
          className={`mt-4 grid grid-cols-2 gap-3 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="card-hover rounded-2xl border border-[#D8EBD0] bg-white p-3.5 text-xs text-[#2F3432] shadow-sm">
            <div className="mb-1 flex items-center gap-1.5 font-semibold text-[#4F7C48]">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF7EA]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </div>
              Trusted Ingredients
            </div>
            <p className="ml-9 text-[#6B736E]">No preservatives or artificial additives</p>
          </div>

          <div className="card-hover rounded-2xl border border-[#D8EBD0] bg-white p-3.5 text-xs text-[#2F3432] shadow-sm">
            <div className="mb-1 flex items-center gap-1.5 font-semibold text-[#4F7C48]">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF7EA]">
                <Star className="h-4 w-4" aria-hidden="true" />
              </div>
              5 Health Star Rating
            </div>
            <p className="ml-9 text-[#6B736E]">Balanced nutrition in every serve</p>
          </div>
        </div>

        {/* Safety Note */}
        <div
          className={`mt-3 inline-flex items-start gap-2 rounded-xl border border-[#E89035]/30 bg-[#F6F0E4] px-4 py-3 text-xs font-medium text-[#2F3432] transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E89035]" aria-hidden="true" />
          <span>Tempeh must be cooked, not to be eaten raw.</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
