const items = [
  'Plant Based Protein',
  '100% Non-GMO Soybeans',
  'No Preservatives',
  'No Artificial Additives',
  'Made in New Zealand',
  'Net 450g',
  '5 Health Star Rating',
]

function TrustStrip() {
  return (
    <section className="border-y border-[#D8EBD0] bg-[#EEF7EA]">
      <div className="mx-auto flex w-full max-w-6xl snap-x gap-2 overflow-x-auto px-4 py-4 lg:flex-wrap lg:justify-center lg:gap-3 lg:px-8">
        {items.map((item) => (
          <span
            key={item}
            className="snap-start whitespace-nowrap rounded-full border border-[#D8EBD0] bg-white px-3 py-1.5 text-xs font-semibold text-[#4F7C48] shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

export default TrustStrip
