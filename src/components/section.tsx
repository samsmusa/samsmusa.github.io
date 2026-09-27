import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"
import { accent } from "@/lib/data"
import { cn } from "@/lib/utils"

type SectionProps = {
  id: string
  index: number
  eyebrow: string
  title: string
  children: ReactNode
  className?: string
}

/** Numbered section: small mono eyebrow ("01 — Profil") above a large serif title. */
export function Section({ id, index, eyebrow, title, children, className }: SectionProps) {
  const a = accent(index - 1)
  return (
    <section id={id} className={cn("relative py-20 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <span className={cn("size-2 rounded-full", a.bg)} />
            <span>{String(index).padStart(2, "0")}</span>
            <span className="h-px w-10 bg-line" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="mt-5 font-serif text-5xl leading-[1.05] md:text-7xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
