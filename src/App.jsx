import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import ProductOrderSection from './components/ProductOrderSection'
import CookingVersatility from './components/CookingVersatility'
import NutritionTransparency from './components/NutritionTransparency'
import QualityGuide from './components/QualityGuide'
import Footer from './components/Footer'
import StickyWhatsAppCTA from './components/StickyWhatsAppCTA'
import CTAButton from './components/CTAButton'
import WhatsAppOrderButton from './components/WhatsAppOrderButton'

function App() {
  return (
    <div className="bg-[#FFFDF8] text-[#2F3432]">
      <Navbar />
      <main className="pb-28 lg:pb-0">
        <Hero />
        <TrustStrip />
        <ProductOrderSection />

        {/* ─── PROMO BANNER ─── */}
        <section className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8">
          <div className="rounded-2xl border-2 border-[#E89035] bg-[#F6F0E4] p-5 text-center sm:p-6">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#E89035]">Fresh Soy Tempeh Available Now</p>
            <p className="mt-1 text-xl font-extrabold text-[#2F3432] sm:text-2xl">BUY 4, GET 1 FREE</p>
            <div className="mt-3 space-y-1 text-sm text-[#6B736E]">
              <p>• Pick-up available in Totara Vale, Northshore</p>
              <p>• Order 8 pcs for FREE Auckland delivery</p>
              <p>• Nationwide orders get $8 off shipping</p>
            </div>
          </div>
        </section>

        <CookingVersatility />

        <NutritionTransparency />
        <QualityGuide />

        <section id="stockists" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
          <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#2F3432] sm:text-3xl">Find Fresh Soy Tempeh</h2>
            <p className="mt-3 text-sm text-[#6B736E] sm:text-base">
              Looking for Fresh Soy Tempeh near you? Find a local stockist or ask your favourite
              grocer to stock our New Zealand-made tempeh.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CTAButton href="#" variant="accent">
                View Stockists
              </CTAButton>
              <WhatsAppOrderButton label="Wholesale Enquiry" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyWhatsAppCTA />
    </div>
  )
}

export default App
