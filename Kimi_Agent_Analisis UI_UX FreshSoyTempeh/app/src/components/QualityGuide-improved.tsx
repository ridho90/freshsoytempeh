import { Snowflake, Clock3, Flame, Award } from 'lucide-react'

const GUIDES = [
  {
    title: 'Keep Frozen',
    detail: 'Keep frozen until ready to use for best product quality. Do not thaw and refreeze.',
    icon: Snowflake,
    color: '#4F7C48',
  },
  {
    title: 'Use Within 5 Days',
    detail: 'Once opened, consume within 5 days. Store any unused portion sealed in the refrigerator.',
    icon: Clock3,
    color: '#7FAD5A',
  },
  {
    title: 'Cook Through',
    detail: 'Tempeh must be cooked before consumption. Do not eat raw. Ensure internal temperature reaches safe levels.',
    icon: Flame,
    color: '#E89035',
  },
] as const

function QualityGuide() {
  return (
    <section id="quality" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
      <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF7EA]">
            <Award className="h-5 w-5 text-[#4F7C48]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4F7C48]">
              Storage & Quality
            </p>
            <h2 className="text-2xl font-bold text-[#2F3432] sm:text-3xl">Quality Guide</h2>
          </div>
        </div>

        {/* Guide Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {GUIDES.map((item, index) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-[#D8EBD0] bg-[#FFFDF8] p-5 transition-all duration-300 hover:border-[#7FAD5A] hover:bg-white hover:shadow-md"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Icon */}
                <div
                  className="inline-flex rounded-xl p-2.5 text-white transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="mt-4 text-base font-bold text-[#2F3432]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B736E]">{item.detail}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default QualityGuide
