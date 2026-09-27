// All site content lives in src/data/*.json — edit those files, not this one.
// These types describe the shape each JSON file must follow.
import awardsJson from "@/data/awards.json"
import educationJson from "@/data/education.json"
import experienceJson from "@/data/experience.json"
import profileJson from "@/data/profile.json"
import projectsJson from "@/data/projects.json"
import publicationsJson from "@/data/publications.json"
import skillsJson from "@/data/skills.json"
import uiJson from "@/data/ui.json"
import type { Localized, Text } from "@/lib/i18n"

export type IconName = "github" | "linkedin" | "scholar" | "orcid" | "mail" | "phone" | "web"

export type Profile = {
  name: string
  initials: string
  title: Localized
  location: Localized
  status: Localized
  tagline: Localized
  email: string
  phone: string
  cv: Localized
  links: { label: string; url: string; icon: IconName | string }[]
  summary: Localized[]
  stats: { value: Localized; label: Localized }[]
}

export type SkillGroup = {
  title: Localized
  icon: string
  items: Text[]
}

export type Experience = {
  role: Localized
  company: string
  url: string
  location: Localized
  /** "YYYY-MM" */
  start: string
  /** "YYYY-MM", or null while ongoing */
  end: string | null
  highlights: Localized[]
  tags: string[]
}

export type Publication = {
  title: string
  authors: string
  venue: Localized
  year: number
  status: "published" | "submitted" | "ongoing"
  doi: string
  url: string
  summary: Localized
  links: { label: string; url: string }[]
}

export type Project = {
  title: string
  subtitle: Localized
  url: string
  urlLabel: string
  description: Localized
  highlights: Localized[]
  tags: string[]
}

export type Education = {
  degree: Localized
  school: string
  url: string
  location: Localized
  start: string
  end: string | null
  grade: Localized | null
  details: Localized[]
  thesis: {
    title: Localized
    supervisor: string
    period: string
    points: Localized[]
  } | null
}

export type Award = {
  title: Localized
  issuer: string
  url: string
  icon: string
}

export const profile = profileJson as Profile
export const skills = skillsJson as SkillGroup[]
export const experience = experienceJson as Experience[]
export const publications = publicationsJson as Publication[]
export const projects = projectsJson as Project[]
export const education = educationJson as Education[]
export const awards = awardsJson as Award[]
export const ui = uiJson

/** Bauhaus palette, cycled through list items so every card gets a colour. */
export const ACCENTS = [
  { bg: "bg-bh-red", text: "text-bh-red", fg: "text-white", tint: "bg-bh-red/10", border: "border-bh-red/25", from: "from-bh-red/15" },
  { bg: "bg-bh-blue", text: "text-bh-blue", fg: "text-white", tint: "bg-bh-blue/10", border: "border-bh-blue/25", from: "from-bh-blue/15" },
  { bg: "bg-bh-yellow", text: "text-[#b07d00] dark:text-bh-yellow", fg: "text-[#15151c]", tint: "bg-bh-yellow/15", border: "border-bh-yellow/35", from: "from-bh-yellow/20" },
  { bg: "bg-bh-green", text: "text-bh-green", fg: "text-white", tint: "bg-bh-green/10", border: "border-bh-green/25", from: "from-bh-green/15" },
] as const

export const accent = (i: number) => ACCENTS[i % ACCENTS.length]
