---
title: Namariq Invoicing
role: Product, Design & Development
year: 2026
category: developing
tags: [internal]
order: 7
summary: Month-end billing for every company, down from 7 hours to one minute.
cover: ../../../assets/namariq-invoicing/cover.png
# Built on the job, for the front desk, and in daily use at Yanbu. The idea came
# from a colleague; the design and the build are mine, and the body says so.
client: internal
status: live
# Every figure here is from the pitch to management (October 2026). Money
# totals stay off the page: they are the business's revenue, not the project's.
stats:
  - value: "7 hrs → 1 min"
    label: "Per billing cycle"
  - value: "1 run"
    label: "For every company's report"
  - value: "252 hrs"
    label: "Saved a year at one site"
headline: One minute instead of seven hours, for every company's billing report.
stack: [Python, pandas, Excel, Tkinter, UI/UX]
# The app windows show only generic file names. The pitch slides are off the
# page until they are re-exported without the site, system and company count.
gallery:
  - ../../../assets/namariq-invoicing/room-invoices.png
  - ../../../assets/namariq-invoicing/meal-reports.png
captions:
  - "Room invoices: upload the export, pick the month, confirm the dates, Process. The sidebar ticks off each step as it is done."
  - "Meal reports: the kitchen's Packed, ODC and Upgrade records in, with the month read from the sheets rather than the file names."
galleryGroups:
  - at: 1
    label: "All data in these shots is replaced with non-real values"
body:
  - "1. Overview: A desktop app whose idea came from the team; I did the design, the product, the billing logic and the build. It takes an export file from the system in use and produces a billing report for every company in about a minute, plus catering reports from the restaurant's records."
  - "2. Problem: The front desk was doing an accountant's job. On top of reservations, check-ins and check-outs, guest complaints and night audit, billing reports with their follow-ups had been added to the team's duties. Each billing cycle took one officer about 7 hours, three times a month: 21 hours. It needed advanced Excel formulas and checking that every number matched, and if that officer was on leave, billing slowed down and the risk of mistakes went up."
  - "3. Solution & process: I designed the app around three steps: upload the file, choose the period, confirm the dates. Then one Process button. Behind it, every Days, Amount and Total cell is written as a live Excel formula, so the accountant can see how each number was reached. On the meals side, the app reads four kinds of kitchen record, detects the month from the sheets themselves, applies head-count tier pricing per day, and checks every company total against the kitchen's summary. A missing value is never guessed. It runs offline on a company PC and ships as a single .exe, and a build script runs 72 automated tests before it replaces the old version. AI helped me write the code; no client or guest data was ever given to an AI tool or a cloud service."
  - "4. Result: One run produces every company's report plus a summary that compares them all, and a second run produces meal reports across Packed, ODC, Upgrade and Additional, with 15% VAT included, so clients now see what they ate, day by day. Every report is checked three times: automatically by the app, by hand against the system, and by the client. All data in the screenshots is changed or replaced with non-real values to protect the organisation's and its clients' privacy."
  - "5. Impact: A billing cycle went from about 7 hours of one officer's time to about a minute, and it no longer depends on one person being in. That is 21 hours a month and 252 hours a year at one branch. I presented it to management with an estimate of 756 hours a year across the three sites, and asked to trial it at the other two."
ar:
  title: 'Namariq Invoicing'
  role: 'المنتج والتصميم والتطوير'
  stack: [Python, pandas, Excel, Tkinter, UI/UX]
  summary: 'فوترة نهاية الشهر لجميع الشركات، من ٧ ساعات إلى دقيقة واحدة.'
  headline: 'دقيقة واحدة بدل سبع ساعات، لتقرير فوترة كل شركة.'
  tags: ['عمل داخلي']
  stats:
    - value: "٧ ساعات ← دقيقة"
      label: "لكل دورة فوترة"
    - value: "تشغيل واحد"
      label: "لتقارير جميع الشركات"
    - value: "٢٥٢ ساعة"
      label: "موفَّرة سنويًا في موقع واحد"
  body:
    - "١. نظرة عامة: تطبيق سطح مكتب جاءت فكرته من فريق العمل، وعملتُ على التصميم والمنتج ومنطق الفوترة والبناء. يأخذ ملفًا من النظام المستخدَم ويُخرج تقرير فوترة لجميع الشركات في نحو دقيقة، بالإضافة إلى تقارير الإعاشة من سجلات المطعم."
    - "٢. المشكلة: كان قسم الاستقبال يؤدي عمل المحاسب. فإلى جانب الحجوزات وتسجيل الدخول والخروج وشكاوى النزلاء والتدقيق الليلي، أُضيفت إلى مهام الفريق تقارير فوترة مع متابعاتها. وكانت كل دورة فوترة تستغرق من موظف واحد نحو ٧ ساعات، ثلاث مرات في الشهر: ٢١ ساعة. وتتطلب معادلات Excel متقدمة والتحقق من تطابق كل رقم، وإذا غاب ذلك الموظف في إجازة تباطأت الفوترة وزاد احتمال الخطأ."
    - "٣. الحل والعملية: صمّمت التطبيق حول ثلاث خطوات: رفع الملف، واختيار الفترة، وتأكيد التواريخ. ثم زر معالجة واحد. وخلفه تُكتب كل خلايا الأيام والمبلغ والإجمالي معادلات Excel حيّة، ليرى المحاسب كيف وصل كل رقم. وفي جانب الوجبات يقرأ التطبيق أربعة أنواع من سجلات المطبخ، ويستخرج الشهر من الأوراق نفسها، ويطبّق تسعير الشرائح بحسب عدد الأفراد في كل يوم، ويطابق إجمالي كل شركة مع ملخص المطبخ. ولا يُخمَّن أي رقم ناقص أبدًا. يعمل دون اتصال على جهاز الشركة ويُسلَّم كملف .exe واحد، ويشغّل سكربت البناء ٧٢ اختبارًا آليًا قبل أن يستبدل النسخة القديمة. ساعدني الذكاء الاصطناعي في كتابة الكود، ولم تُعطَ أي بيانات لعميل أو نزيل لأداة ذكاء اصطناعي أو خدمة سحابية."
    - "٤. النتيجة: تشغيل واحد يُخرج تقارير جميع الشركات مع ملخص يقارن بينها جميعًا، وتشغيل ثانٍ يُخرج تقارير وجبات تشمل Packed وODC وUpgrade وAdditional، شاملة ضريبة القيمة المضافة ١٥٪، فصار العميل يرى ما تناوله يومًا بيوم. ويُراجَع كل تقرير ثلاث مرات: آليًا من التطبيق، ويدويًا مقابل النظام، ثم من العميل. وجميع البيانات في الصور مُغيَّرة أو مُستبدَلة بقيم غير حقيقية حفاظًا على خصوصية الجهة وعملائها."
    - "٥. الأثر: انتقلت دورة الفوترة من نحو ٧ ساعات من وقت موظف واحد إلى نحو دقيقة، ولم تعد تتوقف على حضور شخص بعينه. أي ٢١ ساعة في الشهر و٢٥٢ ساعة في السنة في فرع واحد. وقدّمته للإدارة مع تقدير بـ ٧٥٦ ساعة سنويًا عبر المواقع الثلاثة، وطلبت تجربته في الموقعين الآخرين."
  captions:
    - 'فواتير الغرف: ارفع الملف، واختر الشهر، وأكّد التواريخ، ثم معالجة. ويؤشّر الشريط الجانبي على كل خطوة عند إتمامها.'
    - 'تقارير الوجبات: سجلات المطبخ Packed وODC وUpgrade، والشهر يُقرأ من الأوراق لا من أسماء الملفات.'
  galleryGroups:
    - 'جميع البيانات في هذه الصور مستبدلة ببيانات غير حقيقية'
---
