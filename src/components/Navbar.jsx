import WhatsAppOrderButton from './WhatsAppOrderButton'

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#D8EBD0]/80 bg-[#FFFDF8]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        <a href="#" className="text-sm font-extrabold tracking-wide text-[#4F7C48]">
          FRESH SOY TEMPEH
        </a>

        <div className="hidden items-center gap-6 text-sm text-[#2F3432] md:flex">
          <a href="#how-to-enjoy" className="hover:text-[#65A957]">
            How to Enjoy
          </a>
          <a href="#nutrition" className="hover:text-[#65A957]">
            Nutrition
          </a>
          <a href="#quality" className="hover:text-[#65A957]">
            Quality
          </a>
          <a href="#stockists" className="hover:text-[#65A957]">
            Stockists
          </a>
        </div>

        <WhatsAppOrderButton label="Chat to Order" className="hidden md:inline-flex" />
      </nav>
    </header>
  )
}

export default Navbar
