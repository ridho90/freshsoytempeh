function CTAButton({ href = '#', children, variant = 'primary', className = '' }) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  const variants = {
    primary:
      'bg-[#65A957] text-white shadow-sm hover:bg-[#4F7C48] focus-visible:ring-[#65A957]',
    secondary:
      'border border-[#D8EBD0] bg-white text-[#2F3432] hover:bg-[#EEF7EA] focus-visible:ring-[#7FAD5A]',
    accent:
      'bg-[#E89035] text-white shadow-sm hover:brightness-95 focus-visible:ring-[#E89035]',
  }

  return (
    <a href={href} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </a>
  )
}

export default CTAButton
