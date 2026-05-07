import WhatsAppOrderButton from './WhatsAppOrderButton'

function Footer() {
  return (
    <footer className="mt-12 border-t border-[#D8EBD0] bg-[#4F7C48] pb-32 pt-10 text-[#EEF7EA] lg:pb-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-sm leading-relaxed">
            Fresh Soy Tempeh is a plant based protein made in New Zealand from 100% Non-GMO soybeans,
            with no preservatives or artificial additives. Perfect for BBQ, steaming, stir-frying,
            soups, or any of your favourite dishes.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#how-to-enjoy" className="hover:text-white">
                How to Enjoy
              </a>
            </li>
            <li>
              <a href="#nutrition" className="hover:text-white">
                Nutrition
              </a>
            </li>
            <li>
              <a href="#quality" className="hover:text-white">
                Quality Guide
              </a>
            </li>
            <li>
              <a href="#stockists" className="hover:text-white">
                Stockists
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Product Notes</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            <li>Keep frozen until ready to use.</li>
            <li>Consume within 5 days of opening.</li>
            <li>Tempeh must be cooked before consumption.</li>
            <li>Do not eat raw.</li>
            <li>Black spots can be normal culture growth.</li>
          </ul>

          <div className="mt-4 space-y-1 text-sm">
            <p>freshsoytempeh.nz</p>
            <p>WhatsApp: +64 27 406 9207</p>
            <p>Made in New Zealand</p>
          </div>

          <div className="mt-4">
            <WhatsAppOrderButton label="Chat to Order" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
