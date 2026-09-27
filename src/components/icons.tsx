import {
  Award,
  Brain,
  Code,
  Database,
  Eye,
  Globe,
  GraduationCap,
  Mail,
  Phone,
  Sigma,
  Sparkles,
  Trophy,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

// Lucide dropped brand logos, so these are simple inline marks.
function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function ScholarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 1 0 9.5l4.9 3.56A7.5 7.5 0 0 1 12 8a7.5 7.5 0 0 1 7.1 5.06L24 9.5 12 1Z" />
      <circle cx="12" cy="16" r="6" />
    </svg>
  )
}

function OrcidIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM8.1 17.6H6.6V7.1h1.5v10.5ZM7.35 6.1a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3.05 1h4.05c3.86 0 5.55 2.76 5.55 5.25 0 2.7-2.1 5.25-5.53 5.25H10.4V7.1Zm1.5 1.36v7.78h2.4c3.43 0 4.2-2.6 4.2-3.89 0-2.1-1.34-3.89-4.28-3.89H11.9Z" />
    </svg>
  )
}

const LINK_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  scholar: ScholarIcon,
  orcid: OrcidIcon,
}

const LUCIDE_ICONS: Record<string, LucideIcon> = {
  award: Award,
  brain: Brain,
  code: Code,
  database: Database,
  eye: Eye,
  graduation: GraduationCap,
  mail: Mail,
  phone: Phone,
  sigma: Sigma,
  trophy: Trophy,
  web: Globe,
  workflow: Workflow,
}

/** Renders an icon by the name used in the JSON files (falls back to a sparkle). */
export function Icon({ name, className }: { name: string; className?: string }) {
  const Brand = LINK_ICONS[name]
  if (Brand) return <Brand className={className} />
  const Lucide = LUCIDE_ICONS[name] ?? Sparkles
  return <Lucide className={className} aria-hidden />
}
