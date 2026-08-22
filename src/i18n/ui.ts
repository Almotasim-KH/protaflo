// Every string the site renders outside of content collections.
//
// Single source, two languages side by side: each leaf is written once as
// `L(english, arabic)`, so the two locales cannot drift apart — you physically
// cannot add a string without writing both, and TypeScript rejects the file if
// you try. The shape is shared too, so a row that exists in one language exists
// in the other by construction.
//
// `t(lang)` hands back the resolved tree for one locale, so call sites stay
// exactly as they were: t(lang).nav.brand, t(lang).detail.shot(2), etc.
//
// Project copy (titles, case-study bodies) is NOT here — that lives in the
// frontmatter of src/content/projects/*.md under an `ar:` block, so each project
// keeps its translation next to the original. That block is required and
// complete for the same reason this file pairs its strings.

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

// --- bilingual leaves -------------------------------------------------------

// Branded so a translated pair is never confused with a content object that
// happens to carry `en`/`ar` keys of its own.
declare const BI_BRAND: unique symbol;
const BI = Symbol.for('i18n.pair');
type Bi<T> = { readonly [BI_BRAND]: true; en: T; ar: T };

/** One value in both languages. Both arguments are required — that is the point. */
function L<T>(en: T, ar: T): Bi<T> {
  return { [BI]: true, en, ar } as unknown as Bi<T>;
}

type Resolve<T> =
  T extends Bi<infer U>
    ? Resolve<U>
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      T extends (...args: any[]) => any
      ? T
      : T extends object
        ? { [K in keyof T]: Resolve<T[K]> }
        : T;

function resolve<T>(node: T, lang: Lang): Resolve<T> {
  if (Array.isArray(node)) {
    return node.map((child) => resolve(child, lang)) as Resolve<T>;
  }
  if (node !== null && typeof node === 'object') {
    const record = node as Record<string | symbol, unknown>;
    if (record[BI] === true) return resolve(record[lang], lang) as Resolve<T>;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(record)) {
      out[key] = resolve(value, lang);
    }
    return out as Resolve<T>;
  }
  return node as Resolve<T>;
}

// --- copy -------------------------------------------------------------------

// Headlines are split rather than stored as one HTML blob: the design highlights
// one phrase per heading with an animated <span class="mark">, and the reveal
// script needs those spans in the markup, not inside a string.
const copy = {
  meta: {
    // Browser-tab title. The name already sits in the nav and the hero, so the
    // tab says what the site is instead of repeating it.
    home: L('Portfolio', 'موقع تعريفي'),
    description: L(
      'Almotasim Khairullah — developer and data analyst in Yanbu. I build the interface and the model behind it.',
      'المعتصم خير الله مطوّر ومحلل بيانات في ينبع. أبني الواجهة والنموذج الذي خلفها.'
    ),
  },
  nav: {
    brand: L('Almotasim Khairullah', 'المعتصم خير الله'),
    cv: L('CV', 'السيرة الذاتية'),
    cta: L("Let's Talk", 'تواصل'),
    // Label for the switch, written in the language it switches TO.
    switchTo: L('العربية', 'English'),
    switchLabel: L('Switch language', 'تغيير اللغة'),
    // Keyboard-only shortcut past the nav, first thing in the tab order.
    skip: L('Skip to content', 'تخطٍ إلى المحتوى'),
  },
  preloader: {
    name: L('Almotasim Khairullah', 'المعتصم خير الله'),
    tagline: L('Worth every pixel', 'يستاهل كل بكسل'),
  },
  hero: {
    line1: L('Storefronts that build identity', 'متاجر تصنع هوية'),
    line2Pre: L('Data that ', 'وبيانات '),
    line2Muted: L('explains', 'تشرح'),
    line2Post: L(' itself', ' نفسها'),
    sublinePre: L('We are the ', 'نحن '),
    sublineScramble: L('vision', 'رؤية'),
    sublinePost: L(' of 2030', ' 2030'),
  },
  work: {
    eyebrow: L('Selected work', 'أعمال مختارة'),
    titleLead: L('Work ', 'الأعمال '),
    titleMark: L('Features', 'المميزة'),
  },
  about: {
    eyebrow: L('About me', 'نبذة عني'),
    titleLead: L('Half builder,', 'نصف مطوّر،'),
    titleSecond: L('half ', 'ونصف '),
    titleMark: L('analyst.', 'محلل.'),
    paragraphs: [
      // Leads with the angle most portfolios can't claim: the work came out of
      // the operation, not from a brief about it. Everything else follows from
      // that, so it goes first.
      L(
        "Hi, I'm Almotasim — I work inside operations, so I saw first-hand where the numbers go missing, and I built the dashboard the team now opens every morning.",
        'أهلًا، أنا المعتصم — أشتغل داخل العمليات، فشفت من جوّه وين تضيع الأرقام، وبنيت اللوحة اللي يفتحها الفريق كل صباح.'
      ),
      L(
        "I work between web development and data analysis. I hold a diploma in Web & Tech Development and I'm in the final year of my Data Science bachelor's degree. Working across both makes me see projects differently — the data and what it means, and the interface people actually use.",
        'أشتغل بين تطوير الويب وتحليل البيانات. حاصل على دبلوم في تطوير الويب والتقنية، وحاليًا بسنتي الأخيرة في بكالوريوس علم البيانات. الدمج بين الاثنين خلّاني أشوف المشاريع بنظرة مختلفة — البيانات وإيش تعني، والواجهة اللي يستخدمها الناس.'
      ),
      L(
        'I plan before writing the first line, and I use AI as a tool that speeds the work up — not a replacement for the decision.',
        'أفضّل أخطط قبل ما أكتب أول سطر، وأستخدم الذكاء الاصطناعي كأداة تسرّع الشغل، مو كبديل عن القرار.'
      ),
    ],
    // Skills stay in English on the Arabic side too — these are tool and
    // discipline names, and transliterating them read worse than leaving the
    // Latin script the industry actually uses. Written out twice anyway, so it
    // stays a decision rather than an oversight.
    skills: [
      {
        title: L('UI / UX Design', 'UI / UX Design'),
        desc: L(
          'Figma, design systems, prototyping',
          'Figma, design systems, prototyping'
        ),
      },
      {
        title: L('Data Analysis', 'Data Analysis'),
        desc: L('Python, SQL, Power BI', 'Python, SQL, Power BI'),
      },
      {
        title: L('Web Development', 'Web Development'),
        desc: L('React, APIs, full-stack', 'React, APIs, full-stack'),
      },
      {
        title: L('Excel', 'Excel'),
        desc: L(
          'Modelling, automation, dashboards',
          'Modelling, automation, dashboards'
        ),
      },
      {
        title: L('AI', 'AI'),
        desc: L(
          'Claude, prompt design, automation',
          'Claude, prompt design, automation'
        ),
      },
    ],
  },
  experience: {
    eyebrow: L('Experience', 'الخبرة'),
    titleLead: L('The short', 'النسخة'),
    titleMark: L('version.', 'المختصرة.'),
    // The job is one row; the analytics and engineering work built alongside it
    // gets its own, because none of it is front-desk duty. One array for both
    // locales, so the two timelines always list the same rows in the same order.
    rows: [
      {
        when: L('2026', '2026'),
        role: L(
          'Freelance full-stack — Coffee Shop Website',
          'عمل حر — موقع متجر القهوة'
        ),
        // Built and handed over, but never went live: the launch waits on API
        // access the client has to supply, so the copy says built, not live.
        desc: L(
          'A storefront and admin dashboard built end to end: Node.js and SQL behind it, React and TypeScript in front, packaged with Docker. Not launched — the build stopped at the payment and delivery APIs, which are on the client side.',
          'متجر إلكتروني ولوحة إدارة مبنيان بالكامل: Node.js وSQL في الخلفية، وReact وTypeScript في الواجهة، ومغلّف بـDocker. لم يُطلَق — العمل توقف عند واجهات الدفع والتوصيل، وهي من طرف العميل.'
        ),
      },
      {
        when: L('2025', '2025'),
        role: L('Revenue dashboards — Power BI', 'لوحات الإيرادات — Power BI'),
        desc: L(
          'Twelve-plus internal Excel sources folded into one Power BI view: Python for the prep, Figma for the layout. The 2025 rebuild added average performance rates and faster drill-down.',
          'دمج أكثر من 12 مصدر Excel داخلي في لوحة واحدة: Python للتحضير وFigma للتصميم. نسخة 2025 أضافت معدلات الأداء المتوسطة وتنقّلًا أسرع في تفاصيل البيانات.'
        ),
      },
      {
        when: L('2025', '2025'),
        role: L('Sales Analytics Challenge', 'تحدي تحليل المبيعات'),
        desc: L(
          'Open LinkedIn data challenge, around 300 participants. Cleaned and modelled a raw sales dataset into a Power BI read on revenue and product performance.',
          'تحدٍ على LinkedIn بمشاركة نحو 300 شخص. تنظيف بيانات مبيعات خام ونمذجتها في لوحة Power BI تُبرز الإيرادات وأداء المنتجات.'
        ),
      },
      {
        when: L('2025 — now', '2025 — الآن'),
        role: L(
          'Front Desk Group Leader — Namariq',
          'مسؤول قسم الاستقبال — نمارق'
        ),
        desc: L(
          'Lead the front desk team and own the daily operational reports that other departments rely on in their decision-making.',
          'أقود فريق الاستقبال وأتولى التقارير التشغيلية اليومية التي تعتمد عليها الأقسام الأخرى في قراراتها.'
        ),
      },
      {
        when: L('2024', '2024'),
        role: L('YCATThon — participant', 'المشاركة في YCATThon'),
        desc: L(
          'Fourth place out of forty-four teams. The hackathon ran across several sectors; I entered the tourism track.',
          'المركز الرابع من بين أربعة وأربعين فريقًا. فكرة المسابقة كانت في عدة قطاعات، وأنا اخترت السياحي.'
        ),
      },
      {
        when: L('2023 — 2025', '2023 — 2025'),
        role: L('Front Desk Clerk — Namariq', 'موظف استقبال — نمارق'),
        desc: L(
          'Handled guest and visitor services, managed reservation correspondence, responded to emails, and performed night audit operations.',
          'خدمة النزلاء والزوار، وإدارة الحجوزات، والرد على البريد الإلكتروني، وتنفيذ عمليات التدقيق الليلي.'
        ),
      },
      {
        when: L('2023 — 2025', '2023 — 2025'),
        role: L('UI/UX Designer', 'مصمم واجهات مستخدم'),
        desc: L(
          'Designed wireframes, web interfaces, and mobile applications for clients using Figma.',
          'تصميم النماذج الأولية وواجهات الويب وتطبيقات الجوال للعملاء باستخدام Figma.'
        ),
      },
      {
        when: L('2018 — 2023', '2018 — 2023'),
        role: L('Assorted work', 'أعمال مختلفة'),
        // Deliberately no detail line — this row is there for the timeline, not
        // for a story. `desc` is optional, and optional for both locales at
        // once, so it cannot go missing on one side only.
      },
    ],
  },
  // Footer. Labels mirror the page sections; hrefs live in Footer.astro so they
  // can be localised, only the labels translate.
  footer: {
    label: L('Footer', 'تذييل'),
    tagline: L('Personal website', 'موقع شخصي'),
    sections: L('Sections', 'الأقسام'),
    elsewhere: L('Elsewhere', 'روابط أخرى'),
    work: L('Work', 'الأعمال'),
    about: L('About', 'نبذة'),
    experience: L('Experience', 'الخبرة'),
    contact: L('Contact', 'تواصل'),
    cv: L('CV', 'السيرة الذاتية'),
    email: L('Email', 'البريد'),
    rights: L('© 2026 Almotasim Khairullah', '© 2026 المعتصم خير الله'),
    // Captions the dithered city plate at the foot of the page.
    place: L('Yanbu · Red Sea Coast', 'ينبع · ساحل البحر الأحمر'),
  },
  contact: {
    eyebrow: L('Connect with me', 'تواصل معي'),
    titleLead: L("Let's build something", 'لنبنِ شيئًا'),
    titleSecond: L('worth ', 'يستحق '),
    titleMark: L('shipping.', 'الإطلاق.'),
    linkedin: L('LinkedIn ↗', 'LinkedIn ↗'),
    github: L('GitHub ↗', 'GitHub ↗'),
    note: L('Usually replies within 1-2 days', 'الرد عادةً خلال 1-2 يوم'),
  },
  detail: {
    // Points back toward where the reader came from. In RTL "back" points right,
    // so the arrow flips with the text direction. The leading U+200F (RLM) forces
    // the arrow — a bidi-neutral character — into the RTL run; without it the
    // browser parks it at the far left of the pill, pointing away from its label.
    back: L('← All work', '‏→ كل الأعمال'),
    // Label on the fold that hides the long-form body on a project page.
    caseStudy: L('Case study', 'رحلة المشروع'),
    // The rail's first field is the kind of engagement, not a client name — both
    // values come from here so a project file only stores the key.
    client: L('Project Type', 'نوع المشروع'),
    clientValue: {
      client: L('Client Work', 'عمل لعميل'),
      personal: L('Personal Project', 'مشروع شخصي'),
      // Built on the job, for the team I work in — not a client engagement and
      // not a side project. The distinction is the point of these pages.
      internal: L('Internal Work', 'عمل داخلي'),
      challenge: L('Competition', 'مسابقة'),
    },
    // Ship state, shown in the rail. `built` is the honest label for work that
    // is finished on my side but never went live — it must not read as "live".
    status: L('Status', 'الحالة'),
    statusValue: {
      live: L('Live', 'منشور'),
      built: L('Built — not launched', 'مكتمل — لم يُطلَق'),
      wip: L('In progress', 'قيد التطوير'),
    },
    stack: L('Stack', 'الأدوات'),
    year: L('Year', 'السنة'),
    link: L('Website', 'الموقع'),
    // Full-screen gallery viewer.
    zoom: L('View full screen', 'عرض بملء الشاشة'),
    lbClose: L('Close', 'إغلاق'),
    lbPrev: L('Previous image', 'الصورة السابقة'),
    lbNext: L('Next image', 'الصورة التالية'),
    shot: L(
      (n: number) => `Drop shot ${n}`,
      (n: number) => `أضف لقطة ${n}`
    ),
    screen: L(
      (title: string, n: number) => `${title} — screen ${n}`,
      (title: string, n: number) => `${title} — لقطة ${n}`
    ),
  },
};

export const ui = {
  en: resolve(copy, 'en'),
  ar: resolve(copy, 'ar'),
};

export function t(lang: Lang) {
  return ui[lang];
}
