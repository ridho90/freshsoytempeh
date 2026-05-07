import { Flame, Soup, CookingPot, Waves } from 'lucide-react'

const cards = [
  {
    title: 'Pan-Fry',
    icon: Flame,
    text: 'Heat 1–2 tbsp oil in a pan. Cook tempeh for 3–4 minutes per side until golden brown.',
  },
  {
    title: 'Steam',
    icon: Waves,
    text: 'Steam for 10 minutes for salads or stir-fries.',
  },
  {
    title: 'BBQ / Grill',
    icon: CookingPot,
    text: 'Marinate for 15 minutes, then grill for 3–4 minutes per side.',
  },
  {
    title: 'Soup',
    icon: Soup,
    text: 'Add cubes to stews or soups and simmer for 10 minutes.',
  },
]

function CookingVersatility() {
  return (
    <section id="how-to-enjoy" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
      <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-[#2F3432] sm:text-3xl">How to Enjoy</h2>
        <p className="mt-3 text-sm text-[#6B736E] sm:text-base">
          Fresh Soy Tempeh is perfect for BBQ, steaming, stir-frying, soups, or any of your
          favourite dishes.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.title}
                className="group rounded-2xl border border-[#D8EBD0] bg-[#FFFDF8] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-xl bg-[#EEF7EA] p-2 text-[#4F7C48]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#2F3432]">{card.title}</h3>
                <p className="mt-1 text-sm text-[#6B736E]">{card.text}</p>
              </article>
            )
          })}
        </div>

        <p className="mt-6 rounded-xl border border-[#E89035]/40 bg-[#F6F0E4] px-4 py-3 text-sm font-semibold text-[#2F3432]">
          Important: Tempeh must be cooked. Do not eat raw.
        </p>
      </div>
    </section>
  )
}

export default CookingVersatility
