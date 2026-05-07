import CTAButton from './CTAButton'
import WhatsAppOrderButton from './WhatsAppOrderButton'

const features = [
  'Net 450g',
  'Plant Based Protein',
  '100% Non-GMO Soybeans',
  'No Preservatives',
  'No Artificial Additives',
  'Made in New Zealand',
  '5 Health Star Rating',
]

function ProductOrderSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
      <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-[#2F3432] sm:text-3xl">Fresh Soy Tempeh 450g</h2>
        <p className="mt-3 text-sm text-[#6B736E] sm:text-base">
          A versatile plant-based protein made in New Zealand from 100% Non-GMO soybeans, with no
          preservatives or artificial additives. Perfect for BBQ, steaming, stir-frying, soups, or
          any of your favourite dishes.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-[#D8EBD0] bg-[#FFFDF8] px-4 py-3 text-sm font-semibold text-[#4F7C48]"
            >
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[#D8EBD0] bg-[#EEF7EA] p-5">
          <h3 className="text-lg font-bold text-[#2F3432]">Ready to order?</h3>
          <p className="mt-1 text-sm text-[#6B736E]">Chat with us to order fresh tempeh.</p>
          <p className="mt-1 text-sm text-[#6B736E]">
            Tap below to start a WhatsApp chat and place your order directly with Fresh Soy Tempeh.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <WhatsAppOrderButton label="Order via WhatsApp" />
            <CTAButton href="#stockists" variant="secondary">
              Find a Stockist
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductOrderSection
