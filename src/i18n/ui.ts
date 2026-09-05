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

// The site used to mix the two digit sets inside one Arabic screen — ١٢ in a KPI
// card, 2025 in the timeline beside it — which reads as an oversight rather than
// a choice. The Arabic build is Arabic-Indic throughout: every number that
// reaches the page through code goes through `num()`, and every number written
// into copy is typed in ٠-٩ to match.
//
// The map itself lives in ./numerals so the client scripts that compose numbers
// at runtime can share it without pulling this file's whole copy tree into the
// browser bundle.
export { num } from './numerals';

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
    // Browser-tab title, search result and share-card headline — all three read
    // this one string, so it has to answer who and what on its own. "Portfolio"
    // alone did not: it carried no name, no discipline and no place, which is
    // the single heaviest SEO signal on the page spent on nothing.
    home: L(
      'Almotasim Khairullah — Web Developer & Data Analyst · Yanbu',
      'المعتصم خير الله — مطوّر ويب ومحلل بيانات · ينبع',
    ),
    // Suffix for inner pages: the project's own name leads and this follows, so
    // a project tab reads "Budgettr — Almotasim Khairullah" rather than
    // repeating the whole home title after every slug.
    siteName: L('Almotasim Khairullah', 'المعتصم خير الله'),
    // Tracks the hero standfirst, with two things the page itself does not have
    // to say: the name leads, because a search result is read out of context,
    // and the city stays, because it is what local search matches on.
    description: L(
      'Almotasim Khairullah, web developer and data analyst in Yanbu. Design, deployment, analysis, and AI in one track.',
      'المعتصم خير الله، مطوّر ويب ومحلّل بيانات في ينبع. تصميم ونشر وتحليل وذكاء اصطناعي في مسار واحد.',
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
    // Kicker above the title. The headline states what the work does and the
    // term row states what it is made of, but neither says what he IS — and a
    // stranger needs that before either of the other two mean anything. Set
    // small on purpose: it answers the question and gets out of the way.
    eyebrow: L('Web developer and data analyst', 'مطوّر ويب ومحلّل بيانات'),
    // Two lines, one sentence broken across them: the first states where the
    // work starts, the second where it ends. The muted span carries the second
    // half's verb, so the emphasis lands on the finished thing rather than on
    // the idea.
    line1: L('From the idea', 'من الفكرة'),
    line2Pre: L('to something that ', 'إلى شيء '),
    line2Muted: L('runs', 'يعمل'),
    line2Post: L('', ''),
    // The line under the title is one claim, not a list of disciplines: the
    // headline says what the work does, and this says which era it is built
    // for. Split in two so only the year churns — a whole sentence scrambling
    // runs long enough to read as a fault rather than as an effect.
    claim: L('We are the vision of', 'نحن رؤية'),
    claimYear: L('2030', '٢٠٣٠'),
    // The portrait is the same photograph in both builds, so the description of
    // it is the same fact — it just has to be readable to whoever is listening.
    portraitAlt: L('Portrait of Almotasim', 'صورة شخصية للمعتصم'),
  },
  work: {
    // Chapter title. Deliberately the same string as chapters.one rather than a
    // sentence about the chapter: the projects underneath make the argument, and
    // a heading that also makes it says the same thing twice. Chapter.astro drops
    // its small running head when the two match, so this prints once.
    chapterTitle: L('The work', 'الأعمال'),
  },
  // Chapter folios. The page is set as a printed feature, so each section carries
  // a number and a running head; the folio in the top margin shows whichever one
  // the reader is currently inside.
  chapters: {
    one: L('The work', 'الأعمال'),
    two: L('How I work', 'طريقة العمل'),
    three: L('The record', 'السجل'),
    four: L('KPIs', 'مؤشرات الأداء'),
    // Roman numerals are language-independent, but Arabic sets its own digits, so
    // the pair is written out rather than assumed.
    numerals: [L('I', '١'), L('II', '٢'), L('III', '٣'), L('IV', '٤')],
  },
  // The figures on the KPI plate. `value` is rendered as written; `count` is the
  // numeric target where one exists, and an entry without a count simply appears
  // rather than counting.
  figures: {
    entries: [
      {
        count: '12',
        value: L('12', '١٢'),
        label: L('Excel sources merged into one dashboard', 'مصدر Excel مدمج في لوحة واحدة'),
        source: L('Revenue Analysis 2024', 'تحليل الإيرادات ٢٠٢٤'),
      },
      {
        // A range, not a quantity: there is nothing here for a counter to count
        // up to, so this line simply arrives.
        count: null,
        value: L('60 min → 1 min', '٦٠ دقيقة ← دقيقة واحدة'),
        label: L('Time to find one revenue number', 'الوقت للوصول إلى رقم إيراد واحد'),
        source: L('Revenue Analysis 2024', 'تحليل الإيرادات ٢٠٢٤'),
      },
      {
        // One hour, not a countable climb — this line arrives rather than
        // counting, same as the range above it.
        count: null,
        value: L('1 hr', 'ساعة واحدة'),
        label: L('Manual reporting saved every morning', 'من التقارير اليدوية موفرة كل صباح'),
        source: L('Camp Operations Dashboard', 'لوحة العمليات التشغيلية'),
      },
      {
        count: '27',
        value: L('27', '٢٧'),
        label: L('People using one platform I shipped', 'شخصًا يستخدمون منصة أطلقتها'),
        source: L('Budgettr', 'Budgettr'),
      },
      {
        // A placing, not a tally. The counter still climbs the field size, which
        // is the number that carries the result: 4th of four teams and 4th of
        // forty-four are not the same claim.
        count: '44',
        value: L('4th /44', 'الرابع من ٤٤'),
        label: L('Teams at YCATThon, tourism track', 'فريقًا في YCATThon، المسار السياحي'),
        source: L('YCATThon 2024', 'YCATThon ٢٠٢٤'),
      },
      {
        count: '300',
        value: L('~300', '~٣٠٠'),
        label: L(
          'Participants in the LinkedIn data challenge',
          'مشاركًا في تحدي البيانات على LinkedIn',
        ),
        source: L('Sales Analytics Challenge', 'تحدي تحليل المبيعات'),
      },
    ],
  },
  evidence: {
    title: L('KPIs', 'مؤشرات الأداء'),
    lead: L(
      'Six figures, each one from a project on this page.',
      'ستة أرقام، كل واحد منها من مشروع في هذه الصفحة.',
    ),
    sourceLabel: L('Source', 'المصدر'),
  },
  about: {
    // The newline is an authored line break, not formatting: Chapter.astro sets
    // each half on its own line and sweeps them in one after the other.
    chapterTitle: L('Half builder\nhalf analyst', 'نصف مطور\nونصف محلل'),
    // The opening lines are set larger than the prose below them: they say who
    // is talking before the section argues anything.
    proof: [
      L(
        "I'm currently working and studying, and I've chosen technology as my path.",
        'موظف وطالب، واخترت التقنية طريقا لي.',
      ),
      L(
        'My journey started between work, study, and courses, then it grew into freelance work and personal projects.',
        'بدأت مسيرتي بين العمل والدراسة والدورات، ثم امتدت إلى الأعمال الحرة والمشاريع الشخصية.',
      ),
    ],
    paragraph: L(
      'My goal is to build something useful that serves people and makes their experience easier, through technology and AI.',
      'هدفي أن أصنع شيئا نافعا يخدم الناس ويسهل تجربتهم، عبر عالم التقنية والذكاء الاصطناعي.',
    ),
    // The thesis the section closes on, set at prose weight rather than as a
    // footnote: it is the argument the paragraph above is building toward, not
    // an aside to it.
    closer: L(
      "In the 21st century, if you know how to use the tools the right way, with the right thinking, you'll end up with a product that looks like you.",
      'في القرن الواحد والعشرين، إذا عرفت كيف تستخدم الأدوات بالطريقة الصحيحة وبتفكير سليم، فتأكد أنك ستخرج بمنتج يشبهك.',
    ),
    // Skills stay in English on the Arabic side too — these are tool and
    // discipline names, and transliterating them read worse than leaving the
    // Latin script the industry actually uses. Written out twice anyway, so it
    // stays a decision rather than an oversight.
    skills: [
      {
        title: L('UI / UX Design', 'UI / UX Design'),
        // Named disciplines, not page effects. "Scrolling, layering" described
        // what this site happens to do rather than anything a reader could hire;
        // beside Figma they read as placeholder text left in production.
        desc: L('Figma, design systems, prototyping', 'Figma, design systems, prototyping'),
      },
      {
        title: L('Data Analysis', 'Data Analysis'),
        desc: L('Python, SQL, Power BI', 'Python, SQL, Power BI'),
      },
      {
        title: L('Web Development', 'Web Development'),
        // The line under a skill says what it is made of. "Full-Stack Web
        // Developer" only restated the label above it and cost the row its one
        // chance to be specific.
        desc: L('React, APIs, full-stack', 'React, APIs, full-stack'),
      },
      {
        title: L('Excel', 'Excel'),
        desc: L('Modelling, automation, dashboards', 'Modelling, automation, dashboards'),
      },
      {
        title: L('AI', 'AI'),
        desc: L('Claude, prompt design, automation', 'Claude, prompt design, automation'),
      },
    ],
  },
  experience: {
    chapterTitle: L('Work journey', 'مسيرة العمل'),
    // Phone-only: the record folds to its two most recent rows behind these two
    // labels. Desktop never shows them, but they live here with the rest of the
    // chapter's copy rather than hard-coded in the component.
    viewAll: L('View all', 'عرض الكل'),
    showLess: L('Show less', 'عرض أقل'),
    // The job is one row; the analytics and engineering work built alongside it
    // gets its own, because none of it is front-desk duty. One array for both
    // locales, so the two timelines always list the same rows in the same order.
    rows: [
      {
        when: L('2026', '٢٠٢٦'),
        // The project's canonical name, the same string the card, the page title
        // and the share card use. A timeline that calls it something else makes
        // a reader ask whether they are two pieces of work.
        role: L('Freelance full-stack, Coffee Shop Website', 'عمل حر، Coffee Shop Website'),
        // Built and handed over, but never went live: the launch waits on API
        // access the client has to supply, so the copy says built, not live.
        desc: L(
          'A storefront and admin dashboard built end to end: Node.js and SQL behind it, React and TypeScript in front, packaged with Docker. Not launched; the build stopped at the payment and delivery APIs, which are on the client side.',
          'متجر إلكتروني ولوحة إدارة مبنيان بالكامل: Node.js وSQL في الخلفية، وReact وTypeScript في الواجهة، ومغلّف بـDocker. لم يُطلَق؛ العمل توقف عند واجهات الدفع والتوصيل، وهي من طرف العميل.',
        ),
      },
      {
        when: L('2025', '٢٠٢٥'),
        role: L('Revenue dashboards, Power BI', 'لوحات الإيرادات، Power BI'),
        desc: L(
          'Twelve-plus internal Excel sources folded into one Power BI view: Python for the prep, Figma for the layout. The 2025 rebuild added average performance rates and faster drill-down.',
          'دمج أكثر من ١٢ مصدر Excel داخليًا في لوحة واحدة: Python للتحضير وFigma للتصميم. أضافت نسخة ٢٠٢٥ معدلات الأداء المتوسطة وتنقّلًا أسرع في تفاصيل البيانات.',
        ),
      },
      // The Sales Analytics Challenge used to sit here as well as in the work
      // list, under a second name — a reader could not tell whether that was one
      // entry or two. It has a project page, and the page is where it is told.
      {
        when: L('2025 - now', '٢٠٢٥ - الآن'),
        role: L('Front Desk Group Leader, Namariq', 'مسؤول قسم الاستقبال، نمارق'),
        desc: L(
          'Lead the front desk team and own the daily operational reports that other departments rely on in their decision-making.',
          'أقود فريق الاستقبال وأتولى التقارير التشغيلية اليومية التي تعتمد عليها الأقسام الأخرى في قراراتها.',
        ),
      },
      {
        when: L('2024', '٢٠٢٤'),
        role: L('YCATThon participant', 'المشاركة في YCATThon'),
        desc: L(
          '4th place out of 44 teams. The hackathon ran across several sectors; I entered the tourism track.',
          'المركز الرابع من بين ٤٤ فريقًا. أُقيمت المسابقة في عدة قطاعات، واخترت المسار السياحي.',
        ),
      },
      {
        when: L('2023 - 2025', '٢٠٢٣ - ٢٠٢٥'),
        role: L('Front Desk Clerk, Namariq', 'موظف استقبال، نمارق'),
        desc: L(
          'Handled guest and visitor services, managed reservation correspondence, responded to emails, and performed night audit operations.',
          'خدمة النزلاء والزوار، وإدارة الحجوزات، والرد على البريد الإلكتروني، وتنفيذ عمليات التدقيق الليلي.',
        ),
      },
      {
        when: L('2023 - 2025', '٢٠٢٣ - ٢٠٢٥'),
        role: L('UI/UX Designer', 'مصمم واجهات مستخدم'),
        desc: L(
          'Designed wireframes, web interfaces, and mobile applications for clients using Figma.',
          'تصميم النماذج الأولية وواجهات الويب وتطبيقات الجوال للعملاء باستخدام Figma.',
        ),
      },
      {
        when: L('2018 - 2023', '٢٠١٨ - ٢٠٢٣'),
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
    // One CV file serves both builds and it is written in English. Saying so in
    // the label costs three characters and saves an Arabic reader a download.
    cv: L('CV', 'السيرة الذاتية (بالإنجليزية)'),
    email: L('Email', 'البريد'),
    rights: L('© 2026 Almotasim Khairullah', '© ٢٠٢٦ المعتصم خير الله'),
    // Sits between the name and the place, on the last line before the plate.
    // The plate below only finishes arriving on further scroll, and this is the
    // one place on the page that says so.
    more: L('Scroll more', 'واصل التمرير'),
    // Captions the dithered city plate at the foot of the page.
    place: L('Yanbu · Red Sea Coast', 'ينبع · ساحل البحر الأحمر'),
  },
  contact: {
    titleLead: L("Let's build something", 'لنبنِ شيئًا'),
    titleSecond: L('worth ', 'يستحق '),
    titleMark: L('shipping.', 'الإطلاق.'),
    linkedin: L('LinkedIn ↗', 'LinkedIn ↗'),
    github: L('GitHub ↗', 'GitHub ↗'),
    note: L('Usually replies within 1-2 days', 'الرد عادةً خلال يوم إلى يومين'),
  },
  detail: {
    // Points back toward where the reader came from. In RTL "back" points right,
    // so the arrow flips with the text direction. The leading U+200F (RLM) forces
    // the arrow — a bidi-neutral character — into the RTL run; without it the
    // browser parks it at the far left of the pill, pointing away from its label.
    back: L('← All work', '‏→ كل الأعمال'),
    // Section heading above the long-form body on a project page.
    caseStudy: L('Case study', 'رحلة المشروع'),
    // The spec row's first field is the kind of engagement, not a client name —
    // both values come from here so a project file only stores the key.
    client: L('Project Type', 'نوع المشروع'),
    clientValue: {
      client: L('Client Work', 'عمل لعميل'),
      personal: L('Personal Project', 'مشروع شخصي'),
      // Built on the job, for the team I work in — not a client engagement and
      // not a side project. The distinction is the point of these pages.
      internal: L('Internal Work', 'عمل داخلي'),
      challenge: L('Competition', 'مسابقة'),
      // Work started on my own initiative against a real problem, not asked for
      // by a client and not a side project.
      initiative: L('Initiative', 'مبادرة'),
    },
    // Ship state, shown in the spec row. `built` is the honest label for work that
    // is finished on my side but never went live — it must not read as "live".
    status: L('Status', 'الحالة'),
    statusValue: {
      live: L('Live', 'منشور'),
      built: L('Built, not launched', 'مكتمل، لم يُطلَق'),
      wip: L('In progress', 'قيد التطوير'),
    },
    stack: L('Stack', 'الأدوات'),
    year: L('Year', 'السنة'),
    link: L('Website', 'الموقع'),
    // Sits under the plate's media in the run and says out loud what the media
    // already is: a way in. The arrow points the way the reader reads, so it
    // flips in Arabic, and the leading U+200F (RLM) keeps that bidi-neutral
    // glyph inside the RTL run instead of parking it at the far edge.
    viewProject: L('View project →', '‏عرض المشروع ←'),
    // Screen-reader name for that link, so six plates do not read as six
    // identical "View project" rows in a list of links.
    viewProjectOf: L(
      (title: string) => `View project: ${title}`,
      (title: string) => `عرض المشروع: ${title}`,
    ),
    // Full-screen gallery viewer.
    zoom: L('View full screen', 'عرض بملء الشاشة'),
    // Accessible name for the viewer itself, which is a modal dialog and has to
    // announce as one before its controls make any sense.
    lbLabel: L('Full screen image viewer', 'عارض الصور بملء الشاشة'),
    lbClose: L('Close', 'إغلاق'),
    lbPrev: L('Previous image', 'الصورة السابقة'),
    lbNext: L('Next image', 'الصورة التالية'),
    shot: L(
      (n: number) => `Drop shot ${n}`,
      (n: number) => `أضف لقطة ${n}`,
    ),
    screen: L(
      (title: string, n: number) => `${title}, screen ${n}`,
      (title: string, n: number) => `${title}، لقطة ${n}`,
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
