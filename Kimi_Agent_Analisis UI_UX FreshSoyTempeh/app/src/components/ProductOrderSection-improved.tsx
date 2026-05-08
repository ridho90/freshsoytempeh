import { CheckCircle2 } from 'lucide-react'
import CTAButton from './CTAButton-improved'
import WhatsAppOrderButton from './WhatsAppOrderButton-improved'

const FEATURES = [
  'Net 450g',
  'Plant Based Protein',
  '100% Non-GMO Soybeans',
  'No Preservatives',
  'No Artificial Additives',
  'Made in New Zealand',
  '5 Health Star Rating',
] as const

function ProductOrderSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
      <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8 card-hover">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7EA]">
            <CheckCircle2 className="h-5 w-5 text-[#4F7C48]" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2F3432] sm:text-3xl">
              Fresh Soy Tempeh 450g
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B736E] sm:text-base">
              A versatile plant-based protein made in New Zealand from 100% Non-GMO soybeans, with no
              preservatives or artificial additives. Perfect for BBQ, steaming, stir-frying, soups, or
              any of your favourite dishes.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <div
              key={feature}
              className="group flex items-center gap-2.5 rounded-xl border border-[#D8EBD0] bg-[#FFFDF8] px-4 py-3 text-sm font-semibold text-[#4F7C48] transition-all duration-200 hover:border-[#7FAD5A] hover:bg-[#EEF7EA] hover:shadow-sm"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#65A957] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              {feature}
            </div>
          ))}
        </div>

        {/* Order CTA Box */}
        <div className="mt-6 rounded-2xl border border-[#65A957]/20 bg-gradient-to-br from-[#EEF7EA] to-[#F5FBF3] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#2F3432]">Ready to order?</h3>
              <p className="mt-1 text-sm text-[#6B736E]">
                Chat with us to order fresh tempeh directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <WhatsAppOrderButton label="Order via WhatsApp" />
              <CTAButton href="#stockists" variant="secondary">
                Find a Stockist
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductOrderSection
