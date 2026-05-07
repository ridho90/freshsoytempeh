import { Snowflake, Clock3, Flame } from 'lucide-react'

const guides = [
  {
    title: 'Keep Frozen',
    detail: 'Keep frozen until ready to use for best product quality.',
    icon: Snowflake,
  },
  {
    title: 'Use Within 5 Days',
    detail: 'Once opened, consume within 5 days.',
    icon: Clock3,
  },
  {
    title: 'Cook Through',
    detail: 'Tempeh must be cooked before consumption. Do not eat raw.',
    icon: Flame,
  },
]

function QualityGuide() {
  return (
    <section id="quality" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
      <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4F7C48]">Storage &amp; Quality</p>
        <h2 className="mt-2 text-2xl font-bold text-[#2F3432] sm:text-3xl">Quality Guide</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {guides.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-2xl border border-[#D8EBD0] bg-[#FFFDF8] p-4">
                <div className="inline-flex rounded-xl bg-[#EEF7EA] p-2 text-[#4F7C48]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-bold text-[#2F3432]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#6B736E]">{item.detail}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default QualityGuide
