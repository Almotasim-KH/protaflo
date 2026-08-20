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
      home: 'Almotasim Khairullah',
      description:
        'Almotasim Khairullah',
    },
    nav: {
      brand: 'Almotasim Khairullah',
      cv: 'CV',
      cta: "Let's Talk",
      // Label for the switch, written in the language it switches TO.
      switchTo: 'العربية',
      switchLabel: 'Switch language',
      // Keyboard-only shortcut past the nav, first thing in the tab order.
      skip: 'Skip to content',
    },
    preloader: {
      name: 'Almotasim Khairullah',
      tagline: 'Worth every pixel',
    },
    hero: {
      line1: 'Storefronts that build identity',
      line2Pre: 'Data that ',
      line2Muted: 'explains',
      line2Post: ' itself',
      sublinePre: 'We are the ',
      sublineScramble: 'vision',
      sublinePost: ' of 2030',
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
        "Hi, I'm Almotasim — I work between web development and data analysis.",
        'I hold a diploma in Web & Tech Development and Im in the final year of my Data Science bachelors degree. Working across both makes me see projects differently the data and what it means, and the interface people actually use.',
        'I plan before writing the first line, and I use AI as a tool that speeds the work up — not a replacement for the decision.',
        'A project starts as a messy spreadsheet and ends as a tool the team opens every morning.',
      ],
      skills: [
        { title: 'UI / UX Design', desc: 'Figma, design systems, prototyping' },
        { title: 'Data Analysis', desc: 'Python, SQL, Power BI' },
        { title: 'Web Development', desc: 'React, APIs, full-stack' },
        { title: 'Excel', desc: 'Modelling, automation, dashboards' },
        { title: 'AI', desc: 'Claude, prompt design, automation' },
      ],
    },
    experience: {
      eyebrow: 'Experience',
      titleLead: 'The short',
      titleMark: 'version.',
      // The job is one row; the analytics and engineering work built alongside
      // it gets its own, because none of it is front-desk duty.
      rows: [
        {
          when: '2026',
          role: 'Freelance full-stack — Webste Coffee Store',
          desc: 'A live e-commerce site with an admin dashboard: Node.js and SQL behind it, React and TypeScript in front. Companion mobile app for pickup orders and loyalty points in progress.',
        },
        {
          when: '2025',
          role: 'Revenue dashboards — Power BI',
          desc: 'Twelve-plus internal Excel sources folded into one Power BI view: Python for the prep, Figma for the layout. The 2025 rebuild added average performance rates and faster drill-down.',
        },
        {
          when: '2025',
          role: 'Sales Analytics Challenge',
          desc: 'Open LinkedIn data challenge, around 300 participants. Cleaned and modelled a raw sales dataset into a Power BI read on revenue and product performance.',
        },
        {
          when: '2025 — now',
          role: 'Front Desk Group Leader — Namariq',
          desc: 'Lead the front desk team, and work with the other departments to answer their questions.',
        },
        {
          when: '2024 — 2025',
          role: 'Front Desk Clerk — Namariq',
          desc: 'Handled guest and visitor services, managed reservation correspondence, responded to emails, and performed night audit operations.',
        },
        {
          when: '2023 — 2025',
          role: 'UI/UX Designer',
          desc: 'Designed wireframes, web interfaces, and mobile applications for clients using Figma.',
        },
      ],
    },
    // Footer. `links` mirrors the page sections; hrefs live in Footer.astro so
    // they can be localised, only the labels translate.
    footer: {
      label: 'Footer',
      tagline: 'Personal website',
      sections: 'Sections',
      elsewhere: 'Elsewhere',
      work: 'Work',
      about: 'About',
      experience: 'Experience',
      contact: 'Contact',
      cv: 'CV',
      email: 'Email',
      rights: '© 2026 Almotasim Khairullah',
      // Captions the dithered city plate at the foot of the page.
      place: 'Yanbu · Red Sea Coast',
    },
    contact: {
      eyebrow: 'Connect with me',
      titleLead: "Let's build something",
      titleSecond: 'worth ',
      titleMark: 'shipping.',
      linkedin: 'LinkedIn ↗',
      github: 'GitHub ↗',
      note: 'Usually replies within a day',
    },
    detail: {
      // Points back toward where the reader came from; mirrored in Arabic.
      back: '← All work',
      // Label on the fold that hides the long-form body on a project page.
      caseStudy: 'Case study',
      // The rail's first field is the kind of engagement, not a client name —
      // both values come from here so a project file only stores the key.
      client: 'Project Type',
      clientValue: { client: 'Client Work', personal: 'Personal Project' },
      stack: 'Stack',
      year: 'Year',
      link: 'Website',
      // Full-screen gallery viewer.
      zoom: 'View full screen',
      lbClose: 'Close',
      lbPrev: 'Previous image',
      lbNext: 'Next image',
      shot: (n: number) => `Drop shot ${n}`,
      screen: (title: string, n: number) => `${title} — screen ${n}`,
    },
  },

  ar: {
    meta: {
      home: 'المعتصم خير الله',
      description:
        'المعتصم خير الله مطوّر ومحلل بيانات في ينبع. أبني الواجهة والنموذج الذي خلفها.',
    },
    nav: {
      brand: 'المعتصم خير الله',
      cv: 'السيرة الذاتية',
      cta: 'تواصل',
      switchTo: 'English',
      switchLabel: 'تغيير اللغة',
      skip: 'تخطٍ إلى المحتوى',
    },
    preloader: {
      name: 'المعتصم خير الله',
      tagline: 'يستاهل كل بكسل',
    },
    hero: {
      line1: 'متاجر تصنع هوية',
      line2Pre: 'وبيانات ',
      line2Muted: 'تشرح',
      line2Post: ' نفسها',
      sublinePre: 'نحن ',
      sublineScramble: 'رؤية',
      sublinePost: ' 2030',
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
        'أهلا، أنا المعتصم أشتغل بين تطوير الويب وتحليل البيانات.',
        ' حاصل على دبلوم في تطوير الويب والتقنية، وحاليًا بسنتي الأخيرة في بكالوريوس علم البيانات، الدمج بين الاثنين خلاني أشوف المشاريع بنظرة مختلفة البيانات وإيش تعني، والواجهة اللي يستخدمها الناس',
        'أفضل أخطط قبل ما أكتب أول سطر، وأستخدم الذكاء الاصطناعي كأداة تسرع الشغل، مو كبديل عن القرار.',
        'مشروع يبدأ بجدول بيانات مخربط، وينتهي بأداة الفريق يفتحها كل صباح.',
      ],
      // Skills stay in English on the Arabic side too — these are tool and
      // discipline names, and transliterating them read worse than leaving the
      // Latin script the industry actually uses.
      skills: [
        { title: 'UI / UX Design', desc: 'Figma, design systems, prototyping' },
        { title: 'Data Analysis', desc: 'Python, SQL, Power BI' },
        { title: 'Web Development', desc: 'React, APIs, full-stack' },
        { title: 'Excel', desc: 'Modelling, automation, dashboards' },
        { title: 'AI', desc: 'Claude, prompt design, automation' },
      ],
    },
    experience: {
      eyebrow: 'الخبرة',
      titleLead: 'النسخة',
      titleMark: 'المختصرة.',
      rows: [
        {
          when: '2026',
          role: 'عمل حر —  Coffee Store',
          desc: 'متجر إلكتروني يعمل فعليًا مع لوحة إدارة: Node.js وSQL في الخلفية، وReact وTypeScript في الواجهة. وتطبيق جوال لطلبات الاستلام ونقاط الولاء قيد التطوير.',
        },
        {
          when: '2025',
          role: 'لوحات الإيرادات — Power BI',
          desc: 'دمج أكثر من 12 مصدر Excel داخلي في لوحة واحدة: Python للتحضير وFigma للتصميم. نسخة 2025 أضافت معدلات الأداء المتوسطة وتنقّلًا أسرع في تفاصيل البيانات.',
        },
        {
          when: '2025',
          role: 'تحدي تحليل المبيعات',
          desc: 'تحد على LinkedIn بمشاركة نحو 300 شخص. تنظيف بيانات مبيعات خام ونمذجتها في لوحة Power BI تُبرز الإيرادات وأداء المنتجات.',
        },
        {
          when: '2025 — الآن',
          role: 'مسؤول قسم الاستقبال — نمارق',
          desc: 'اشرف على فريق الاستقبال و التقارير، وأعمل مع بقية الأقسام للإجابة على استفساراتهم.',
        },
         {
          when: '2024 ',
          role: 'المشاركه في YCATThon',
          desc:'المركز الرابع من بين أربعة وأربعين فريق فكرة المسابقة كانت في عدة قطاعات انا اخترت السياحي.',
        },
        {
          when: '2023 — 2025',
          role: 'موظف استقبال — نمارق',
          desc: 'خدمة النزلاء والزوار، وإدارة الحجوزات، والرد على البريد الإلكتروني، وتنفيذ عمليات التدقيق الليلي.',
        },
        {
          when: '2023 — 2025',
          role: 'مصمم واجهات مستخدم',
          desc: 'تصميم النماذج الأولية وواجهات الويب وتطبيقات الجوال للعملاء باستخدام Figma.',
        },
         {
          when: '2018 — 2023',
          role: 'اعمال مختلفة',
        },
      ],
    },
    footer: {
      label: 'تذييل',
      tagline: 'موقع شخصي.', 
      sections: 'الأقسام',
      elsewhere: 'روابط أخرى',
      work: 'الأعمال',
      about: 'نبذة',
      experience: 'الخبرة',
      contact: 'تواصل',
      cv: 'السيرة الذاتية',
      email: 'البريد',
      rights: '© 2026 المعتصم خير الله',
      place: 'ينبع · ساحل البحر الأحمر',
    },
    contact: {
      eyebrow: 'تواصل',
      titleLead: 'لنبنِ شيئًا',
      titleSecond: 'يستحق ',
      titleMark: 'الإطلاق.',
      linkedin: 'LinkedIn ↗',
      github: 'GitHub ↗',
      note: 'الرد عادةً خلال 1-2 يوم',
    },
    detail: {
      // In RTL "back" points right, so the arrow flips with the text direction.
      // The leading U+200F (RLM) forces the arrow — a bidi-neutral character —
      // into the RTL run; without it the browser parks it at the far left of the
      // pill, pointing away from the label it belongs to.
      back: '‏→ كل الأعمال',
      caseStudy: 'رحلة المشروع',
      client: 'نوع المشروع',
      clientValue: { client: 'عمل لعميل', personal: 'مشروع شخصي' },
      stack: 'الأدوات',
      year: 'السنة',
      link: 'الموقع',
      zoom: 'عرض بملء الشاشة',
      lbClose: 'إغلاق',
      lbPrev: 'الصورة السابقة',
      lbNext: 'الصورة التالية',
      shot: (n: number) => `أضف لقطة ${n}`,
      screen: (title: string, n: number) => `${title} — لقطة ${n}`,
    },
  },
} as const;
