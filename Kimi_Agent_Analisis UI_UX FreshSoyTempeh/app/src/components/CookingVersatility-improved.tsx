import { useState } from 'react'
import { Flame, Soup, CookingPot, Waves, AlertTriangle } from 'lucide-react'

const CARDS = [
  {
    title: 'Pan-Fry',
    icon: Flame,
    text: 'Heat 1–2 tbsp oil in a pan. Cook tempeh for 3–4 minutes per side until golden brown.',
    tip: 'Best for: crispy salads, rice bowls',
  },
  {
    title: 'Steam',
    icon: Waves,
    text: 'Steam for 10 minutes for salads or stir-fries.',
    tip: 'Best for: light, healthy preparations',
  },
  {
    title: 'BBQ / Grill',
    icon: CookingPot,
    text: 'Marinate for 15 minutes, then grill for 3–4 minutes per side.',
    tip: 'Best for: summer gatherings, smoky flavour',
  },
  {
    title: 'Soup',
    icon: Soup,
    text: 'Add cubes to stews or soups and simmer for 10 minutes.',
    tip: 'Best for: warming winter meals',
  },
] as const

function CookingVersatility() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="how-to-enjoy" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
      <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF7EA]">
            <CookingPot className="h-5 w-5 text-[#4F7C48]" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2F3432] sm:text-3xl">How to Enjoy</h2>
            <p className="mt-1 text-sm text-[#6B736E] sm:text-base">
              Fresh Soy Tempeh is perfect for BBQ, steaming, stir-frying, soups, or any of your favourite dishes.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {CARDS.map((card, index) => {
            const Icon = card.icon
            const isActive = activeIndex === index
            return (
              <article
                key={card.title}
                className={`group relative rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#65A957] shadow-md ring-1 ring-[#65A957]/20'
                    : 'border-[#D8EBD0] hover:-translate-y-0.5 hover:shadow-md hover:border-[#7FAD5A]'
                }`}
                onClick={() => setActiveIndex(isActive ? null : index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIndex(isActive ? null : index)
                  }
                }}
                aria-expanded={isActive}
              >
                {/* Step Number */}
                <span className="absolute right-4 top-4 text-xs font-bold text-[#D8EBD0] transition-colors group-hover:text-[#7FAD5A]">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="mb-3 inline-flex rounded-xl bg-[#EEF7EA] p-2.5 text-[#4F7C48] transition-all duration-200 group-hover:bg-[#4F7C48] group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#2F3432]">{card.title}</h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-[#6B736E]">{card.text}</p>

                {/* Expandable Tip */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="rounded-lg bg-[#EEF7EA] px-3 py-2 text-xs font-medium text-[#4F7C48]">
                    {card.tip}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Warning */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E89035]/30 bg-[#F6F0E4] px-4 py-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#E89035]" aria-hidden="true" />
          <p className="text-sm font-semibold text-[#2F3432]">
            Important: Tempeh must be cooked. Do not eat raw.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CookingVersatility
