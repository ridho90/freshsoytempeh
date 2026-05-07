import { CheckCircle2, MapPin, ShieldCheck, Star } from 'lucide-react'
import CTAButton from './CTAButton'
import WhatsAppOrderButton from './WhatsAppOrderButton'
import packImage from '../assets/fresh-soy-tempeh-pack.png'

const badges = [
  'Plant Based Protein',
  '100% Non-GMO Soybeans',
  'No Preservatives',
  'No Artificial Additives',
  'Made in New Zealand',
  'Net 450g',
  '5 Health Star Rating',
]

function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-12 pt-8 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:pt-14">
      <div>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#EEF7EA] px-3 py-1 text-xs font-semibold text-[#4F7C48]">
          <MapPin className="h-3.5 w-3.5" />
          Made in New Zealand
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-[#2F3432] sm:text-4xl">
          Fresh Soy Tempeh, crafted for healthy everyday meals.
        </h1>
        <p className="mt-4 text-sm text-[#6B736E] sm:text-base">
          A versatile plant-based protein made in New Zealand from 100% Non-GMO soybeans, with no
          preservatives or artificial additives. Perfect for BBQ, steaming, stir-frying, soups, or
          any of your favourite dishes.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppOrderButton label="Order via WhatsApp" />
          <CTAButton href="#stockists" variant="secondary">
            Find a Stockist
          </CTAButton>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {badges.map((badge) => (
            <div
              key={badge}
              className="rounded-xl border border-[#D8EBD0] bg-white px-3 py-2 text-xs font-medium text-[#4F7C48] shadow-sm"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -left-3 -top-3 rounded-full bg-[#E89035] px-3 py-1 text-xs font-bold text-white shadow">
          Fresh Soy Tempeh
        </div>
        <img
          src={packImage}
          alt="Fresh Soy Tempeh product packaging"
          className="w-full rounded-3xl border border-[#D8EBD0] bg-white p-3 shadow-lg"
        />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#D8EBD0] bg-white p-3 text-xs text-[#2F3432] shadow-sm">
            <div className="mb-1 flex items-center gap-1 font-semibold text-[#4F7C48]">
              <ShieldCheck className="h-4 w-4" />
              Trusted Ingredients
            </div>
            No preservatives or artificial additives
          </div>
          <div className="rounded-2xl border border-[#D8EBD0] bg-white p-3 text-xs text-[#2F3432] shadow-sm">
            <div className="mb-1 flex items-center gap-1 font-semibold text-[#4F7C48]">
              <Star className="h-4 w-4" />
              5 Health Star Rating
            </div>
            Balanced nutrition in every serve
          </div>
        </div>
        <p className="mt-3 inline-flex items-start gap-2 rounded-xl bg-[#EEF7EA] px-3 py-2 text-xs font-medium text-[#4F7C48]">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          Tempeh must be cooked, not to be eaten raw.
        </p>
      </div>
    </section>
  )
}

export default Hero
