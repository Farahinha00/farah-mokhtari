export type Metric = { value: string; label: string };

export type Service = {
  title: string;
  audienceLabel: string;
  audience: string;
  problem: string;
  whatIDo: string[];
  whatYouGet: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  desc: string;
};

export type LangContent = {
  nav: { about: string; services: string; experience: string; contact: string };
  hero: {
    eyebrow: string;
    subtitle: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    availability: string;
  };
  metrics: Metric[];
  about: {
    title: string;
    p1: string;
    p2: string;
    values: string[];
    sectorsTitle: string;
    sectors: string[];
    interestsTitle: string;
    interestsPlaceholder: string;
  };
  services: {
    hint: string;
    doLabel: string;
    getLabel: string;
    backLabel: string;
    list: Service[];
  };
  experience: ExperienceItem[];
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formProject: string;
    formMessage: string;
    formSubmit: string;
    direct: string;
    thanks: string;
  };
  footer: string;
};

export type SiteContent = {
  fr: LangContent;
  en: LangContent;
};

export type Lang = keyof SiteContent;
