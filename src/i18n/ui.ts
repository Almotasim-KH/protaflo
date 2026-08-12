// Every string the site renders outside of content collections. Sections are
// grouped by component so a translator can work one screen at a time, and so a
// missing key is obvious at the call site rather than three levels deep.
//
// Project copy (titles, case-study bodies) is NOT here — that lives in the
// frontmatter of src/content/projects/*.md under an `ar:` block, so each project
// keeps its translation next to the original.

export const languages = { en: 'English', ar: 'العربية' } as const;
export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';
// Arabic is the only RTL locale so far; keep it a list so adding Hebrew/Farsi
// later is one entry rather than a rewrite.
const rtlLangs: Lang[] = ['ar'];

export function isRtl(lang: Lang): boolean {
  return rtlLangs.includes(lang);
}

// The locale lives in the first path segment (/ar/...); the default locale is
// unprefixed, matching the astro.config i18n setting.
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return seg in languages && seg !== defaultLang ? (seg as Lang) : defaultLang;
}

// Prefix an app-absolute path for a locale. Hash-only and external links are
// returned untouched so callers can pass any href through.
export function localizePath(path: string, lang: Lang): string {
  if (!path.startsWith('/')) return path;
  const bare = path.replace(/^\/(ar)(?=\/|$)/, '') || '/';
  if (lang === defaultLang) return bare;
  return bare === '/' ? '/ar/' : `/ar${bare}`;
}

export function t(lang: Lang) {
  return ui[lang];
}

// Headlines are split rather than stored as one HTML blob: the design highlights
// one phrase per heading with an animated <span class="mark">, and the reveal
// script needs those spans in the markup, not inside a string.
export const ui = {
  en: {
    meta: {
      home: 'Almotasim Khairullah — Developer & Data Analyst',
      description:
        'Almotasim Khairullah — developer and data analyst in Yanbu. I build the interface and the model behind it.',
    },
    nav: {
      brand: 'Almotasim Khairullah',
      cv: 'CV',
      cta: "Let's Talk",
      // Label for the switch, written in the language it switches TO.
      switchTo: 'العربية',
      switchLabel: 'Switch language',
    },
    preloader: {
      name: 'Almotasim Khairullah',
      tagline: 'Developer & Data Analyst — Yanbu RCY',
    },
    hero: {
      line1: 'Storefronts that sell.',
      line2Pre: 'Data that ',
      line2Muted: 'says',
      line2Post: ' why',
      sublinePre: 'We are the ',
      sublineScramble: 'vision',
      sublinePost: ' of 2030',
      portraitAlt: 'Portrait of Almotasim',
    },
    work: {
      eyebrow: 'Selected work',
      titleLead: 'Work ',
      titleMark: 'Features',
      filtersLabel: 'Filter projects',
      developing: 'Developing',
      analysis: 'Analysis',
    },
    about: {
      eyebrow: 'About me',
      titleLead: 'Half builder,',
      titleSecond: 'half ',
      titleMark: 'analyst.',
      paragraphs: [
        "Hi, I'm Almotasim — a developer and data analyst based in Yanbu. I hold a diploma in Web & Tech Development and I'm in the final year of my Data Science bachelor's degree.",
        'I build the interface and the model behind it, so what I ship answers the question someone actually asked.',
        'Most of my work starts with a messy spreadsheet and ends as something a team opens every morning.',
      ],
      skills: [
        { title: 'UI / UX Design', desc: 'Figma, design systems, prototyping' },
        { title: 'Data Analysis', desc: 'Python, SQL, Power BI' },
        { title: 'Web Development', desc: 'React, APIs, front-end architecture' },
        { title: 'Excel', desc: 'Modelling, automation, dashboards' },
      ],
    },
    experience: {
      eyebrow: 'Experience',
      titleLead: 'The short',
      titleMark: 'version.',
      rows: [
        {
          when: '2024 — now',
          role: 'Developer & Data Analyst — Yanbu RCY',
          desc: 'Own the reporting stack and the internal tools on top of it: ingest, model, dashboard, front end.',
        },
        {
          when: '2023 — 2024',
          role: 'Freelance web development',
          desc: 'Client sites, portals, and booking flows — design through deployment, mostly React.',
        },
        {
          when: '2022 — 2023',
          role: 'Analytics projects',
          desc: 'Fleet utilisation, enrollment forecasting, and reporting automation built out of spreadsheets nobody wanted to touch.',
        },
        {
          when: 'Ongoing',
          role: 'Learning in public',
          desc: 'Side builds around AI tooling and data products. Toniq AI is the current one.',
        },
      ],
    },
    contact: {
      eyebrow: 'Connect with me',
      titleLead: "Let's build something",
      titleSecond: 'worth ',
      titleMark: 'shipping.',
      linkedin: 'LinkedIn ↗',
      github: 'GitHub ↗',
      note: 'Yanbu RCY · usually replies within a day',
    },
    detail: {
      // Points back toward where the reader came from; mirrored in Arabic.
      back: '← All work',
      cta: "Let's Talk",
      // The rail's first field is the kind of engagement, not a client name —
      // both values come from here so a project file only stores the key.
      client: 'Project Type',
      clientValue: { client: 'Client Work', personal: 'Personal Project' },
      industry: 'Industry',
      stack: 'Stack',
      year: 'Year',
      link: 'Website',
      ctaText: 'Want the same for your product?',
      shot: (n: number) => `Drop shot ${n}`,
      screen: (title: string, n: number) => `${title} — screen ${n}`,
    },
  },

  ar: {
    meta: {
      home: 'المعتصم خير الله — مطوّر ومحلل بيانات',
      description:
        'المعتصم خير الله — مطوّر ومحلل بيانات في ينبع. أبني الواجهة والنموذج الذي خلفها.',
    },
    nav: {
      brand: 'المعتصم خير الله',
      cv: 'السيرة الذاتية',
      cta: 'لنتحدث',
      switchTo: 'English',
      switchLabel: 'تغيير اللغة',
    },
    preloader: {
      name: 'المعتصم خير الله',
      tagline: 'مطوّر ومحلل بيانات — الهيئة الملكية بينبع',
    },
    hero: {
      line1: 'متاجر تبيع.',
      line2Pre: 'وبيانات ',
      line2Muted: 'تقول',
      line2Post: ' لماذا',
      sublinePre: 'نحن ',
      sublineScramble: 'رؤية',
      sublinePost: ' 2030',
      portraitAlt: 'صورة المعتصم',
    },
    work: {
      eyebrow: 'أعمال مختارة',
      titleLead: 'الأعمال ',
      titleMark: 'المميزة',
      filtersLabel: 'تصفية المشاريع',
      developing: 'تطوير',
      analysis: 'تحليل',
    },
    about: {
      eyebrow: 'نبذة عني',
      titleLead: 'نصف مطوّر،',
      titleSecond: 'ونصف ',
      titleMark: 'محلل.',
      paragraphs: [
        'مرحبًا، أنا المعتصم — مطوّر ومحلل بيانات مقيم في ينبع. أحمل دبلومًا في تطوير الويب والتقنية، وأنا في السنة الأخيرة من بكالوريوس علم البيانات.',
        'أبني الواجهة والنموذج الذي خلفها، حتى يجيب ما أسلّمه عن السؤال الذي طُرح فعلًا.',
        'معظم أعمالي تبدأ بجدول بيانات فوضوي وتنتهي بشيء يفتحه الفريق كل صباح.',
      ],
      skills: [
        { title: 'تصميم الواجهات وتجربة المستخدم', desc: 'فيجما، أنظمة التصميم، النماذج الأولية' },
        { title: 'تحليل البيانات', desc: 'بايثون، SQL، Power BI' },
        { title: 'تطوير الويب', desc: 'رياكت، واجهات برمجية، معمارية الواجهة' },
        { title: 'إكسل', desc: 'النمذجة، الأتمتة، لوحات المعلومات' },
      ],
    },
    experience: {
      eyebrow: 'الخبرة',
      titleLead: 'النسخة',
      titleMark: 'المختصرة.',
      rows: [
        {
          when: '2024 — الآن',
          role: 'مطوّر ومحلل بيانات — الهيئة الملكية بينبع',
          desc: 'أدير منظومة التقارير والأدوات الداخلية فوقها: الاستيعاب، والنمذجة، ولوحات المعلومات، والواجهة.',
        },
        {
          when: '2023 — 2024',
          role: 'تطوير ويب مستقل',
          desc: 'مواقع عملاء وبوابات ومسارات حجز — من التصميم حتى النشر، غالبًا برياكت.',
        },
        {
          when: '2022 — 2023',
          role: 'مشاريع تحليلية',
          desc: 'استغلال الأسطول، وتوقّع التسجيل، وأتمتة التقارير — مبنية من جداول لم يرغب أحد بلمسها.',
        },
        {
          when: 'مستمر',
          role: 'التعلّم علنًا',
          desc: 'مشاريع جانبية حول أدوات الذكاء الاصطناعي ومنتجات البيانات، وToniq AI هو الحالي.',
        },
      ],
    },
    contact: {
      eyebrow: 'تواصل معي',
      titleLead: 'لنبنِ شيئًا',
      titleSecond: 'يستحق ',
      titleMark: 'الإطلاق.',
      linkedin: 'لينكدإن ↗',
      github: 'غيت هَب ↗',
      note: 'الهيئة الملكية بينبع · الرد عادةً خلال يوم',
    },
    detail: {
      // In RTL "back" points right, so the arrow flips with the text direction.
      // The leading U+200F (RLM) forces the arrow — a bidi-neutral character —
      // into the RTL run; without it the browser parks it at the far left of the
      // pill, pointing away from the label it belongs to.
      back: '‏→ كل الأعمال',
      cta: 'لنتحدث',
      client: 'نوع المشروع',
      clientValue: { client: 'عمل لعميل', personal: 'مشروع شخصي' },
      industry: 'القطاع',
      stack: 'الأدوات',
      year: 'السنة',
      link: 'الموقع',
      ctaText: 'تريد الشيء نفسه لمنتجك؟',
      shot: (n: number) => `أضف لقطة ${n}`,
      screen: (title: string, n: number) => `${title} — لقطة ${n}`,
    },
  },
} as const;
