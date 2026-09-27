import { ArrowUp } from "lucide-react"
import { Header } from "@/components/header"
import { Hero, Stats } from "@/components/hero"
import { About, Contact, EducationSection, ExperienceSection, Projects, Research, Skills } from "@/components/sections"
import { profile, ui } from "@/lib/data"
import { useLang } from "@/lib/i18n"

function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6">
        <p>
          © {new Date().getFullYear()} <span className="font-serif text-base text-foreground">{profile.name}</span> · {t(ui.footer.built)}
        </p>
        <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
          <ArrowUp className="size-4" /> {t(ui.labels.backToTop)}
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About index={1} />
        <Skills index={2} />
        <ExperienceSection index={3} />
        <Research index={4} />
        <Projects index={5} />
        <EducationSection index={6} />
        <Contact index={7} />
      </main>
      <Footer />
    </>
  )
}
