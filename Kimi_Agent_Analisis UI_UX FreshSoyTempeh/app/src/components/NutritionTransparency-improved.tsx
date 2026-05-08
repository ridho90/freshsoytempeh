import { useEffect, useRef, useState } from 'react'
import { Beef, Droplets, Zap, ShieldCheck, Info } from 'lucide-react'

const NUTRITION = [
  {
    title: 'High Protein',
    value: '16.6g',
    unit: 'per 100g',
    icon: Beef,
    percent: 85,
    color: '#65A957',
  },
  {
    title: 'Low Sodium',
    value: '16mg',
    unit: 'per 100g',
    icon: Droplets,
    percent: 15,
    color: '#4F7C48',
  },
  {
    title: 'Energy',
    value: '677',
    unit: 'KJ per 100g',
    icon: Zap,
    percent: 55,
    color: '#7FAD5A',
  },
  {
    title: 'Soybean Base',
    value: '100%',
    unit: 'Non-GMO Soybeans',
    icon: ShieldCheck,
    percent: 100,
    color: '#4F7C48',
  },
] as const

function AnimatedBar({ percent, color, delay }: { percent: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          setTimeout(() => setWidth(percent), delay)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [percent, delay])

  return (
    <div ref={ref} className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#EEF7EA]">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    </div>
  )
}

function NutritionTransparency() {
  return (
    <section id="nutrition" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
      <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF7EA]">
            <Zap className="h-5 w-5 text-[#4F7C48]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4F7C48]">
              Nutrition & Transparency
            </p>
            <h2 className="text-2xl font-bold text-[#2F3432] sm:text-3xl">Clean ingredients. Clear information.</h2>
          </div>
        </div>

        {/* Nutrition Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NUTRITION.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-[#D8EBD0] bg-[#EEF7EA] p-5 transition-all duration-300 hover:border-[#7FAD5A] hover:shadow-md hover:bg-white"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#4F7C48]">
                    {item.title}
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-2xl font-extrabold text-[#2F3432]">{item.value}</p>
                  <p className="text-xs text-[#6B736E]">{item.unit}</p>
                </div>

                <AnimatedBar percent={item.percent} color={item.color} delay={index * 150} />
              </div>
            )
          })}
        </div>

        {/* Chef's Note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#D8EBD0] bg-[#FFFDF8] px-5 py-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#E89035]" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-[#2F3432]">
            <span className="font-bold">Chef&apos;s Note:</span> Black spots are normal culture growth in
            naturally fermented tempeh and indicate authenticity, not spoilage.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NutritionTransparency
