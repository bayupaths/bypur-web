export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "ai" | "other";
  icon?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location?: string;
  type?: string;
  description: string[];
  techStack?: string[];
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  priceFrom?: number | null;
  isActive?: boolean;
}

export interface ProfileStat {
  value: string;
  label: string;
}

export interface MobileStat {
  value: string;
  label: string;
  accent?: boolean;
  icon?: string;
}

export interface ProfileHighlight {
  label?: string;
  icon: string;
}

export interface ExperienceConfig {
  label?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  stats?: {
    yearsExp?: string;
    positions?: string;
    highlight?: {
      value: string;
      label: string;
    };
  };
}

export interface ProjectsConfig {
  label?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string;
  copyable?: boolean;
}

export interface ContactConfig {
  label?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  info?: ContactInfo[];
  form?: {
    title?: string;
    subtitle?: string;
    projectTypes?: string[];
  };
}

export interface PrimaryStackItem {
  name: string;
  desc: string;
  icon: string;
}

export interface SkillsConfig {
  label?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  primaryStack?: PrimaryStackItem[];
  familiarWith?: string[];
  cta?: {
    label?: string;
    title?: string;
    description?: string;
    button?: {
      text: string;
      href: string;
    };
  };
}

export interface Profile {
  name: string;
  title: string;
  tagline?: string;
  taglineHighlight?: string;
  bio: string;
  email: string;
  location: string;
  avatar: string;
  phone?: string;
  resumeUrl?: string;
  roles?: string[];
  rolesLabel?: string;
  techStack?: string[];
  stats?: ProfileStat[];
  mobileStats?: MobileStat[];
  highlights?: ProfileHighlight[];
  skills?: SkillsConfig;
  experience?: ExperienceConfig;
  projects?: ProjectsConfig;
  contact?: ContactConfig;
  about?: {
    label?: string;
    title?: string;
    titleHighlight?: string;
    headline?: string;
    description?: string;
    yearLabel?: string;
    cta?: {
      primary?: {
        text: string;
        href: string;
      };
      secondary?: {
        text: string;
        href: string;
      };
    };
  };
  cta?: {
    primary?: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
  };
}
