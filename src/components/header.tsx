import { Menu, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useActiveSection } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { profile, ui } from "@/lib/data"
import { LANGS, useLang, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export const NAV_IDS = ["about", "skills", "experience", "research", "projects", "education", "contact"] as const

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label={profile.name}>
      <span className="flex items-center gap-[3px]" aria-hidden>
        <span className="size-2.5 rounded-full bg-bh-red transition-transform duration-500 group-hover:-translate-y-0.5" />
        <span className="size-2.5 bg-bh-blue transition-transform duration-500 group-hover:rotate-45" />
        <span className="size-0 border-x-[5px] border-b-[9px] border-x-transparent border-b-bh-yellow transition-transform duration-500 group-hover:translate-y-0.5" />
      </span>
      <span className="hidden font-serif text-xl sm:inline">{profile.name}</span>
    </a>
  )
}

function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <ToggleGroup
      aria-label={t(ui.labels.language)}
      value={[lang]}
      onValueChange={(v) => v[0] && setLang(v[0] as Lang)}
      spacing={0}
      className="rounded-full bg-soft p-0.5"
    >
      {LANGS.map((l) => (
        <ToggleGroupItem
          key={l}
          value={l}
          className="h-7 rounded-full px-3 font-mono text-[11px] tracking-wider uppercase transition-all hover:bg-transparent data-pressed:bg-card data-pressed:shadow-soft"
        >
          {l}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function ThemeToggle() {
  const { t } = useLang()
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem("theme", dark ? "dark" : "light")
    } catch {
      // storage unavailable
    }
  }, [dark])
  return (
    <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} aria-label={t(ui.labels.theme)} className="rounded-full">
      {dark ? <Sun /> : <Moon />}
    </Button>
  )
}

export function Header() {
  const { t } = useLang()
  const nav = ui.nav as Record<string, { de: string; en: string }>
  const active = useActiveSection(NAV_IDS)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:pr-2 sm:pl-5",
          scrolled ? "border-line bg-card/75 shadow-soft backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
      >
        <Logo />
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                active === id && "bg-soft text-foreground",
              )}
            >
              {t(nav[id])}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LangSwitch />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label={t(ui.labels.menu)} />}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-paper">
              <SheetHeader>
                <SheetTitle className="font-serif text-3xl font-normal">{t(ui.labels.menu)}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-4">
                {NAV_IDS.map((id, i) => (
                  <SheetClose
                    key={id}
                    render={<a href={`#${id}`} />}
                    nativeButton={false}
                    className="flex items-baseline gap-4 border-b border-line py-4 font-serif text-3xl"
                  >
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    {t(nav[id])}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
