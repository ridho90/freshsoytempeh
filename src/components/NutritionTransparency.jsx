const nutrition = [
  { title: 'High Protein', value: '16.6g per 100g' },
  { title: 'Low Sodium', value: '16mg per 100g' },
  { title: 'Energy', value: '677KJ per 100g' },
  { title: 'Soybean Base', value: '100% Non-GMO Soybeans' },
]

function NutritionTransparency() {
  return (
    <section id="nutrition" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8">
      <div className="rounded-3xl border border-[#D8EBD0] bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-[#2F3432] sm:text-3xl">Nutrition &amp; Transparency</h2>
        <p className="mt-1 text-sm text-[#6B736E] sm:text-base">
          Clean ingredients. Clear product information.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {nutrition.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#D8EBD0] bg-[#EEF7EA] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#4F7C48]">{item.title}</p>
              <p className="mt-2 text-sm font-bold text-[#2F3432]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[#D8EBD0] bg-[#FFFDF8] p-4">
          <p className="text-sm text-[#2F3432]">
            <span className="font-bold">Chef’s Note:</span> Black spots are normal culture growth in
            naturally fermented tempeh and indicate authenticity, not spoilage.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NutritionTransparency
