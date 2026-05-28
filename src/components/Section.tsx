import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  eyebrow: string
  title: string
  description: string
  className?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  return (
    <section id={id} className={`mt-8 sm:mt-10 ${className ?? ''}`}>
      <div className="mb-5 space-y-2 px-1">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted">{eyebrow}</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">{description}</p>
      </div>
      {children}
    </section>
  )
}
