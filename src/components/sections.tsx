import { ArrowUpRight, BookOpen, GraduationCap, Mail, MapPin, Phone } from "lucide-react"
import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  accent,
  awards,
  education,
  experience,
  profile,
  projects,
  publications,
  skills,
  ui,
  type Publication,
} from "@/lib/data"
import { useLang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const cardBase = "gap-0 rounded-3xl border border-line bg-card py-0 shadow-soft ring-0"

function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group/link inline-flex items-center gap-1 font-medium underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-current",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="h-7 rounded-full bg-soft px-3 text-[13px] font-normal text-foreground/80">
      {children}
    </Badge>
  )
}

function useDateRange() {
  const { t, formatMonth } = useLang()
  return (start: string, end: string | null) =>
    end ? `${formatMonth(start)} – ${formatMonth(end)}` : `${t(ui.labels.since)} ${formatMonth(start)}`
}

function useNav() {
  const { t } = useLang()
  const nav = ui.nav as Record<string, { de: string; en: string }>
  return (id: string) => t(nav[id])
}

/** Vertical timeline used by Experience and Education (dates left, like a German Lebenslauf). */
function TimelineItem({
  date,
  location,
  dotClass,
  children,
  last,
}: {
  date: string
  location: string
  dotClass: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <li className="relative grid gap-4 md:grid-cols-[12rem_1fr] md:gap-10">
      <div className="md:pt-7 md:text-right">
        <div className="font-mono text-xs tracking-[0.15em] text-foreground uppercase">{date}</div>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground md:justify-end">
          <MapPin className="size-3.5" /> {location}
        </div>
      </div>
      <div className="relative md:pl-10">
        <span className="absolute top-8 left-0 hidden -translate-x-1/2 md:block" aria-hidden>
          <span className={cn("block size-3 rounded-full ring-4 ring-paper", dotClass)} />
        </span>
        {!last && <span className="absolute top-12 bottom-[-2.5rem] left-0 hidden w-px -translate-x-1/2 bg-line md:block" aria-hidden />}
        {children}
      </div>
    </li>
  )
}

/* ---------- 01 Profil ---------- */
export function About({ index }: { index: number }) {
  const { t } = useLang()
  const navLabel = useNav()
  const facts = [
    { icon: MapPin, label: t(ui.labels.location), value: t(profile.location), href: "" },
    { icon: Mail, label: t(ui.labels.email), value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: t(ui.labels.phone), value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  ]
  const [lead, ...body] = profile.summary
  return (
    <Section id="about" index={index} eyebrow={navLabel("about")} title={t(ui.sections.about)}>
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <Reveal className="space-y-6">
          {lead && (
            <p className="font-serif text-3xl leading-[1.25] md:text-4xl">
              {t(lead)}
            </p>
          )}
          {body.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground">
              {t(p)}
            </p>
          ))}
        </Reveal>
        <Reveal delay={150} className="self-start">
          <Card className={cardBase}>
            <CardContent className="divide-y divide-line px-6 py-2">
              {facts.map(({ icon: FactIcon, label, value, href }, i) => (
                <div key={label} className="flex items-center gap-4 py-5">
                  <span className={cn("grid size-11 shrink-0 place-items-center rounded-2xl", accent(i).tint, accent(i).text)}>
                    <FactIcon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">{label}</div>
                    {href ? (
                      <a href={href} className="font-medium break-all transition-colors hover:text-bh-blue">
                        {value}
                      </a>
                    ) : (
                      <div className="font-medium">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------- 02 Kenntnisse ---------- */
export function Skills({ index }: { index: number }) {
  const { t } = useLang()
  const navLabel = useNav()
  return (
    <Section id="skills" index={index} eyebrow={navLabel("skills")} title={t(ui.sections.skills)} className="bg-soft/50">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {skills.map((group, i) => {
          const a = accent(i)
          return (
            <Reveal key={i} delay={(i % 3) * 80}>
              <Card className={cn(cardBase, "group h-full p-7 lift")}>
                <div className="flex items-start justify-between">
                  <span className={cn("grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110", a.tint, a.text)}>
                    <Icon name={group.icon} className="size-6" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <CardTitle className="mt-6 font-serif text-2xl font-normal">{t(group.title)}</CardTitle>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item, j) => (
                    <Tag key={j}>{t(item)}</Tag>
                  ))}
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------- 03 Erfahrung ---------- */
export function ExperienceSection({ index }: { index: number }) {
  const { t } = useLang()
  const navLabel = useNav()
  const range = useDateRange()
  return (
    <Section id="experience" index={index} eyebrow={navLabel("experience")} title={t(ui.sections.experience)}>
      <ol className="space-y-10">
        {experience.map((job, i) => (
          <TimelineItem
            key={i}
            date={range(job.start, job.end)}
            location={t(job.location)}
            dotClass={accent(i).bg}
            last={i === experience.length - 1}
          >
            <Reveal>
              <Card className={cardBase}>
                <CardHeader className="px-7 pt-7 md:px-9 md:pt-9">
                  <CardTitle className="font-serif text-3xl font-normal md:text-4xl">{t(job.role)}</CardTitle>
                  <CardDescription className="mt-1 text-base font-medium text-bh-red">
                    {job.url ? <ExternalLink href={job.url}>{job.company}</ExternalLink> : job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-7 pb-7 md:px-9 md:pb-9">
                  <ul className="mt-6 grid gap-x-10 gap-y-4 lg:grid-cols-2">
                    {job.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 leading-relaxed text-muted-foreground">
                        <span className={cn("mt-2.5 size-1.5 shrink-0 rounded-full", accent(j).bg)} />
                        <span>{t(h)}</span>
                      </li>
                    ))}
                  </ul>
                  {job.tags.length > 0 && (
                    <>
                      <Separator className="my-7 bg-line" />
                      <div className="flex flex-wrap gap-1.5">
                        {job.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </Reveal>
          </TimelineItem>
        ))}
      </ol>
    </Section>
  )
}

/* ---------- 04 Forschung ---------- */
const STATUS_STYLE: Record<Publication["status"], string> = {
  published: "bg-bh-green/10 text-bh-green",
  submitted: "bg-bh-blue/10 text-bh-blue",
  ongoing: "bg-bh-yellow/15 text-[#9a6d00] dark:text-bh-yellow",
}

function Authors({ authors }: { authors: string }) {
  // Highlight my own name in the author list.
  const me = "M. Samsuddin"
  const parts = authors.split(me)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong className="font-semibold text-foreground">{me}</strong>}
        </span>
      ))}
    </>
  )
}

export function Research({ index }: { index: number }) {
  const { t } = useLang()
  const navLabel = useNav()
  const labels = ui.labels as Record<string, { de: string; en: string }>
  return (
    <Section id="research" index={index} eyebrow={navLabel("research")} title={t(ui.sections.research)} className="bg-soft/50">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        {publications.map((pub, i) => (
          <Reveal key={i} delay={(i % 2) * 100}>
            <Card className={cn(cardBase, "h-full p-7 lift md:p-8")}>
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge className={cn("h-6 rounded-full px-2.5 font-mono text-[10px] font-medium tracking-widest uppercase", STATUS_STYLE[pub.status])}>
                  {t(labels[pub.status])}
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {pub.year} · {t(pub.venue)}
                </span>
              </div>
              <CardTitle className="mt-5 font-serif text-2xl leading-snug font-normal">{pub.title}</CardTitle>
              <p className="mt-3 text-sm text-muted-foreground">
                <Authors authors={pub.authors} />
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t(pub.summary)}</p>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm">
                {pub.url && <ExternalLink href={pub.url}>{pub.doi ? `DOI ${pub.doi}` : t(ui.labels.visit)}</ExternalLink>}
                {!pub.url && pub.doi && <ExternalLink href={`https://doi.org/${pub.doi}`}>DOI {pub.doi}</ExternalLink>}
                {pub.links.map((l) => (
                  <ExternalLink key={l.url} href={l.url}>
                    {l.label}
                  </ExternalLink>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------- 05 Projekte ---------- */
const PROJECT_SHAPES = [
  "rounded-full",
  "rounded-none rotate-12",
  "[clip-path:polygon(50%_0,100%_100%,0_100%)]",
  "rounded-t-full",
]

export function Projects({ index }: { index: number }) {
  const { t } = useLang()
  const navLabel = useNav()
  return (
    <Section id="projects" index={index} eyebrow={navLabel("projects")} title={t(ui.sections.projects)}>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => {
          const a = accent(i)
          return (
            <Reveal key={i} delay={(i % 2) * 100}>
              <Card className={cn(cardBase, "group h-full overflow-hidden lift")}>
                <div className={cn("relative h-44 overflow-hidden bg-gradient-to-br to-transparent", a.from)}>
                  <div
                    className={cn(
                      "absolute -right-6 -bottom-10 size-44 opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6",
                      a.bg,
                      PROJECT_SHAPES[i % PROJECT_SHAPES.length],
                    )}
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
                  <div className="relative p-7 md:p-8">
                    <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                      {String(i + 1).padStart(2, "0")} · {t(p.subtitle)}
                    </div>
                    <h3 className="mt-3 max-w-[70%] font-serif text-4xl leading-[1.05]">{p.title}</h3>
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col p-7 md:p-8">
                  <p className="text-lg leading-relaxed">{t(p.description)}</p>
                  <ul className="mt-5 space-y-3">
                    {p.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 leading-relaxed text-muted-foreground">
                        <span className={cn("mt-2.5 size-1.5 shrink-0 rounded-full", a.bg)} />
                        <span>{t(h)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    {p.url && (
                      <ExternalLink href={p.url} className="text-sm">
                        {p.urlLabel || t(ui.labels.visit)}
                      </ExternalLink>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------- 06 Ausbildung + Auszeichnungen ---------- */
export function EducationSection({ index }: { index: number }) {
  const { t } = useLang()
  const navLabel = useNav()
  const range = useDateRange()
  return (
    <Section id="education" index={index} eyebrow={navLabel("education")} title={t(ui.sections.education)} className="bg-soft/50">
      <ol className="space-y-10">
        {education.map((edu, i) => (
          <TimelineItem
            key={i}
            date={range(edu.start, edu.end)}
            location={t(edu.location)}
            dotClass={accent(i + 1).bg}
            last={i === education.length - 1}
          >
            <Reveal>
              <Card className={cn(cardBase, "p-7 md:p-9")}>
                <div className="flex items-start gap-5">
                  <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", accent(i + 1).tint, accent(i + 1).text)}>
                    <GraduationCap className="size-6" />
                  </span>
                  <div>
                    <CardTitle className="font-serif text-2xl leading-tight font-normal md:text-3xl">
                      {t(edu.degree)}
                    </CardTitle>
                    <div className="mt-1.5 font-medium text-bh-red">
                      {edu.url ? <ExternalLink href={edu.url}>{edu.school}</ExternalLink> : edu.school}
                    </div>
                  </div>
                </div>
                {(edu.grade || edu.details.length > 0 || edu.thesis) && (
                  <div className="mt-6 space-y-4 md:pl-[4.25rem]">
                    {edu.grade && (
                      <p className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1 text-sm">
                        <span className="text-muted-foreground">{t(ui.labels.grade)}</span>
                        <span className="font-semibold">{t(edu.grade)}</span>
                      </p>
                    )}
                    {edu.details.map((d, j) => (
                      <p key={j} className="leading-relaxed text-muted-foreground">
                        <span className="font-medium text-foreground">{t(ui.labels.coursework)}: </span>
                        {t(d)}
                      </p>
                    ))}
                    {edu.thesis && (
                      <div className="rounded-2xl border border-line bg-paper p-6">
                        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-bh-blue uppercase">
                          <BookOpen className="size-3.5" /> {t(ui.labels.thesis)} · {edu.thesis.period}
                        </div>
                        <h3 className="mt-3 font-serif text-2xl leading-snug">{t(edu.thesis.title)}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {t(ui.labels.supervisor)}: {edu.thesis.supervisor}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {edu.thesis.points.map((pt, j) => (
                            <li key={j} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-bh-blue" />
                              <span>{t(pt)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </Reveal>
          </TimelineItem>
        ))}
      </ol>

      <Reveal className="mt-24 mb-8">
        <h3 className="font-serif text-4xl md:text-5xl">{t(ui.sections.awards)}</h3>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {awards.map((aw, i) => {
          const a = accent(i + 2)
          const body = (
            <>
              <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", a.tint, a.text)}>
                <Icon name={aw.icon} className="size-6" />
              </span>
              <div className="min-w-0">
                <div className="leading-snug font-medium">{t(aw.title)}</div>
                <div className="mt-1 text-sm text-muted-foreground">{aw.issuer}</div>
              </div>
              {aw.url && (
                <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </>
          )
          const cls = "group flex h-full items-center gap-4 rounded-3xl border border-line bg-card p-6 shadow-soft"
          return (
            <Reveal key={i} delay={i * 80}>
              {aw.url ? (
                <a href={aw.url} target="_blank" rel="noreferrer" className={cn(cls, "lift")}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------- 07 Kontakt ---------- */
export function Contact({ index }: { index: number }) {
  const { t } = useLang()
  const navLabel = useNav()
  return (
    <section id="contact" className="px-3 py-20 sm:px-6 md:py-32">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#15151c] px-6 py-16 text-white sm:px-12 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -top-24 -right-24 size-96 animate-drift rounded-full bg-[#e0402d]/35 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 size-96 animate-drift rounded-full bg-[#2456d6]/40 blur-3xl [animation-delay:-8s]" />
          <div className="absolute top-1/3 left-1/2 size-72 animate-drift rounded-full bg-[#efb20c]/20 blur-3xl [animation-delay:-4s]" />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
              <span className="size-2 rounded-full bg-[#efb20c]" />
              <span>{String(index).padStart(2, "0")}</span>
              <span className="h-px w-10 bg-white/20" />
              <span>{navLabel("contact")}</span>
            </div>
            <h2 className="mt-6 font-serif text-6xl leading-[0.95] md:text-8xl">{t(ui.sections.contact)}</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">{t(ui.contact.text)}</p>
            <Button
              nativeButton={false}
              render={<a href={`mailto:${profile.email}`} />}
              className="group mt-10 h-13 rounded-full bg-white px-7 text-base text-[#15151c] transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <Mail className="size-4" /> {t(ui.contact.button)}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
          <div className="space-y-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:bg-white/10"
            >
              <Mail className="size-5 text-[#f2604c]" />
              <span className="break-all">{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:bg-white/10"
            >
              <Phone className="size-5 text-[#6b93f2]" />
              <span>{profile.phone}</span>
            </a>
            <div className="grid grid-cols-2 gap-2">
              {profile.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur transition-colors hover:bg-white/10"
                >
                  <Icon name={link.icon} className="size-4 text-white/70" />
                  {link.label}
                  <ArrowUpRight className="ml-auto size-3.5 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
