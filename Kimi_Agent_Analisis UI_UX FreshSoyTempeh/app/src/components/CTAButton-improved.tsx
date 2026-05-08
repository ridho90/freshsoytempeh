import { type ReactNode } from 'react'

interface CTAButtonProps {
  href?: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  className?: string
  ariaLabel?: string
  onClick?: () => void
  disabled?: boolean
}

function CTAButton({
  href = '#',
  children,
  variant = 'primary',
  className = '',
  ariaLabel,
  onClick,
  disabled = false,
}: CTAButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary:
      'bg-[#65A957] text-white shadow-sm hover:bg-[#4F7C48] hover:shadow-md focus-visible:ring-[#65A957]',
    secondary:
      'border border-[#D8EBD0] bg-white text-[#2F3432] hover:bg-[#EEF7EA] hover:border-[#7FAD5A] focus-visible:ring-[#7FAD5A]',
    accent:
      'bg-[#E89035] text-white shadow-sm hover:brightness-105 hover:shadow-md focus-visible:ring-[#E89035]',
  }

  return (
    <a
      href={disabled ? undefined : href}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
      role={disabled ? 'button' : undefined}
      aria-disabled={disabled || undefined}
    >
      {children}
    </a>
  )
}

export default CTAButton
