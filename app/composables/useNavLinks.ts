export interface NavLink {
  label: string
  to: string
  section: string
}

const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home',       to: '#hero',       section: 'hero' },
  { label: 'About',      to: '#about',      section: 'about' },
  { label: 'Skills',     to: '#skills',     section: 'skills' },
  { label: 'Projects',   to: '#projects',   section: 'projects' },
  { label: 'Experience', to: '#experience', section: 'experience' },
  { label: 'Contact',    to: '#contact',    section: 'contact' },
] as const

export const useNavLinks = () => NAV_LINKS