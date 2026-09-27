import { ArrowRight, FileDown, MapPin } from "lucide-react"
import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { accent, profile, publications, ui } from "@/lib/data"
import { useLang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/** Soft colour glows drifting behind the hero. */
function Glows() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -top-32 -left-24 size-[28rem] animate-drift rounded-full bg-bh-yellow/25 blur-3xl" />
      <div className="absolute top-20 right-[-8rem] size-[26rem] animate-drift rounded-full bg-bh-blue/20 blur-3xl [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 size-[22rem] animate-drift rounded-full bg-bh-red/15 blur-3xl [animation-delay:-12s]" />
    </div>
  )
}

/** A refined Bauhaus composition with floating detail cards. */
function Composition() {
  const { t } = useLang()
  const topPaper = publications.find((p) => p.status === "published")
  const stat = profile.stats[2] ?? profile.stats[0]
  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-card shadow-soft">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-[1fr_1fr_0.6fr]" aria-hidden>
          <div className="relative bg-bh-yellow">
            <div className="absolute inset-[14%] rounded-full bg-bh-red shadow-[inset_-12px_-12px_30px_rgb(0_0_0/0.15)]" />
          </div>
          <div className="relative overflow-hidden bg-soft">
            <div className="absolute -right-1/2 -bottom-1/2 size-full rounded-full bg-bh-blue" />
          </div>
          <div className="relative grid place-items-center bg-[#15151c] dark:bg-[#262631]">
            <span className="font-serif text-8xl text-white italic">{profile.initials}</span>
          </div>
          <div className="relative bg-bh-blue">
            <div className="absolute inset-0 bg-bh-yellow [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
          </div>
          <div className="col-span-2 flex items-center gap-3 bg-card px-6">
            <span className="size-3 rounded-full bg-bh-red" />
            <span className="size-3 bg-bh-blue" />
            <span className="size-0 border-x-[7px] border-b-[12px] border-x-transparent border-b-bh-yellow" />
            <span className="ml-auto font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              {t(profile.location)}
            </span>
          </div>
        </div>
      </div>

      {stat && (
        <div className="absolute -top-6 left-3 animate-float rounded-2xl border border-line bg-card/85 px-4 py-3 shadow-soft backdrop-blur-md sm:-left-10 lg:-left-20">
          <div className="font-serif text-3xl leading-none">{t(stat.value)}</div>
          <div className="mt-1 max-w-[10rem] text-xs text-muted-foreground">{t(stat.label)}</div>
        </div>
      )}
      {topPaper && (
        <div className="absolute right-3 bottom-24 max-w-[13rem] animate-float rounded-2xl border border-line bg-card/85 px-4 py-3 shadow-soft backdrop-blur-md [animation-delay:-3s] sm:-right-10">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-bh-green uppercase">
            <span className="size-1.5 rounded-full bg-bh-green" />
            {t(ui.labels.published)} · {topPaper.year}
          </div>
          <div className="mt-1 line-clamp-2 text-sm leading-snug font-medium">{topPaper.title}</div>
        </div>
      )}
    </div>
  )
}

// Written out in full so Tailwind can see the class names.
const LINK_HOVER = ["hover:text-bh-red", "hover:text-bh-blue", "hover:text-[#b07d00] dark:hover:text-bh-yellow", "hover:text-bh-green"]

export function Hero() {
  const { t } = useLang()
  const [first, ...rest] = profile.name.split(" ")
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      <Glows />
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card/70 py-1.5 pr-4 pl-3 text-[13px] text-muted-foreground shadow-soft backdrop-blur">
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-bh-green/60" />
                <span className="relative size-2.5 rounded-full bg-bh-green" />
              </span>
              {t(profile.status)}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-8 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">{t(ui.hero.hello)}</p>
            <h1 className="mt-3 font-serif text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.92]">
              {first}
              <br />
              <span className="text-gradient italic">{rest.join(" ")}</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 text-xl font-medium md:text-2xl">{t(profile.title)}</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">{t(profile.tagline)}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-bh-red" /> {t(profile.location)}
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              render={<a href="#contact" />}
              className="group h-12 rounded-full px-6 text-base shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary hover:shadow-[var(--shadow-lift)]"
            >
              {t(ui.hero.contact)}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              nativeButton={false}
              render={<a href={t(profile.cv)} target="_blank" rel="noreferrer" />}
              variant="outline"
              className="h-12 rounded-full border-line bg-card/70 px-6 text-base backdrop-blur transition-all hover:-translate-y-0.5"
            >
              <FileDown /> {t(ui.hero.cv)}
            </Button>
            <div className="ml-1 flex items-center gap-1">
              {profile.links.map((link, i) => (
                <Tooltip key={link.url}>
                  <TooltipTrigger
                    render={
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        className={cn(
                          "grid size-11 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-soft",
                          LINK_HOVER[i % LINK_HOVER.length],
                        )}
                      />
                    }
                  >
                    <Icon name={link.icon} className="size-5" />
                  </TooltipTrigger>
                  <TooltipContent>{link.label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <Composition />
        </Reveal>
      </div>
    </section>
  )
}

export function Stats() {
  const { t } = useLang()
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {profile.stats.map((s, i) => {
          const a = accent(i)
          return (
            <Reveal key={i} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-card p-5 shadow-soft lift md:p-6">
                <div className={cn("absolute inset-x-0 top-0 h-1", a.bg)} />
                <div className={cn("absolute -top-10 -right-10 size-28 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-100", a.tint)} />
                <p className={cn("relative font-serif text-4xl leading-none md:text-5xl", a.text)}>{t(s.value)}</p>
                <p className="relative mt-3 text-sm leading-snug text-muted-foreground">{t(s.label)}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
