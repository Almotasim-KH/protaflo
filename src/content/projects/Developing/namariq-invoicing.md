---
title: Invoicing App
role: Product, Design & Development
year: 2026
category: developing
tags: [internal]
order: 7
summary: Month-end billing for every company, down from 7 hours to one minute.
cover: ../../../assets/invoicing-app/cover.png
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
  - ../../../assets/invoicing-app/room-invoices.png
  - ../../../assets/invoicing-app/meal-reports.png
captions:
  - "Room invoices: upload the export, pick the month, confirm the dates, Process. The sidebar ticks off each step as it is done."
  - "Meal reports: the kitchen's Packed, ODC and Upgrade records in, with the month read from the sheets rather than the file names."
galleryGroups:
  - at: 1
    label: "All data in these shots is replaced with non-real values"
body:
  - "1. Overview: An internal process-improvement initiative inspired by an operational challenge. I independently handled the product design, development, billing logic, and implementation of a desktop application that automates repetitive reporting tasks.\n\nThe application processes structured Excel exports and generates individual billing reports, consolidated summaries, and supporting catering reports in approximately one minute."
  - "2. The Challenge: A significant amount of time was being spent on repetitive administrative and reporting tasks alongside regular operational responsibilities.\n\nThe existing process relied heavily on manual Excel work, complex formulas, and repeated data verification. Each reporting cycle required approximately seven hours of manual work, creating unnecessary workload, dependency on individual employees, and potential inconsistencies."
  - "3. The Solution: I developed a desktop application designed around a simple workflow:\n1. Upload the source file.\n2. Select the reporting period.\n3. Confirm the required dates.\n4. Generate the reports.\n\nThe application automatically processes the data and generates Excel reports with live formulas, maintaining transparency and allowing users to trace how each figure is calculated.\n\nI also developed a separate reporting workflow that processes multiple categories of structured records, applies predefined pricing rules, calculates daily totals, and validates the results against source summaries.\n\nKey technical considerations:\n• Offline operation on a local computer.\n• No external cloud processing or data transmission.\n• Automated data validation and missing-value detection.\n• Excel reports with transparent, traceable formulas.\n• Automated testing before application updates.\n• Single executable deployment for easier use.\n\nAI-assisted development tools supported the coding process. No confidential business, customer, or personal data was shared with external AI services."
  - "4. Results: The application generates individual reports, consolidated summaries, and supporting breakdowns through a repeatable process.\n\nIt also improves reporting transparency by providing detailed daily breakdowns and making calculations easier to review and verify.\n\nThe reporting workflow includes multiple validation stages to maintain consistency and accuracy.\n\nAll examples and screenshots used in the project presentation contain modified or synthetic data."
  - "5. Business Impact: The automation reduced the processing time for one reporting cycle from approximately seven hours to around one minute.\n\nBased on the original workload, this represents an estimated:\n• 21 hours saved per month at one location.\n• 252 hours saved annually at one location.\n• 756 hours of potential annual savings if adopted across three locations.\n\nThe project demonstrates how targeted automation can reduce repetitive work, improve reporting consistency, and make operational processes less dependent on individual employees.\n\nFollowing its presentation, I proposed expanding the solution through a controlled trial in additional locations."
ar:
  title: 'Invoicing App'
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
    - "١. نظرة عامة: مبادرة داخلية لتحسين العمليات انطلقت من تحدٍّ تشغيلي. تولّيت بنفسي تصميم المنتج وتطويره ومنطق الفوترة وتنفيذه، وهو تطبيق سطح مكتب يؤتمت مهام التقارير المتكررة.\n\nيعالج التطبيق ملفات Excel المُصدَّرة ذات البنية الثابتة، ويُخرج تقارير فوترة فردية وملخصات مجمّعة وتقارير إعاشة داعمة في نحو دقيقة واحدة."
    - "٢. التحدي: كان جزء كبير من الوقت يذهب إلى مهام إدارية وتقارير متكررة، إلى جانب المسؤوليات التشغيلية المعتادة.\n\nواعتمدت العملية القائمة اعتمادًا كبيرًا على العمل اليدوي في Excel والمعادلات المعقدة والتحقق المتكرر من البيانات. وكانت كل دورة تقارير تتطلب نحو سبع ساعات من العمل اليدوي، ما يخلق عبئًا غير ضروري، واعتمادًا على موظفين بعينهم، واحتمالًا لعدم الاتساق."
    - "٣. الحل: طوّرت تطبيق سطح مكتب مبنيًا على مسار عمل بسيط:\n١. رفع الملف المصدر.\n٢. اختيار فترة التقرير.\n٣. تأكيد التواريخ المطلوبة.\n٤. إنشاء التقارير.\n\nيعالج التطبيق البيانات تلقائيًا ويُخرج تقارير Excel بمعادلات حيّة، فتبقى الأرقام شفافة ويستطيع المستخدم تتبّع طريقة حساب كل رقم.\n\nوطوّرت أيضًا مسار تقارير منفصلًا يعالج عدة فئات من السجلات المنظّمة، ويطبّق قواعد تسعير محددة مسبقًا، ويحسب الإجماليات اليومية، ويطابق النتائج مع ملخصات المصدر.\n\nأبرز الاعتبارات التقنية:\n• يعمل دون اتصال على جهاز محلي.\n• لا معالجة سحابية خارجية ولا نقل للبيانات.\n• تحقق آلي من البيانات واكتشاف للقيم الناقصة.\n• تقارير Excel بمعادلات شفافة يمكن تتبّعها.\n• اختبارات آلية قبل أي تحديث للتطبيق.\n• ملف تنفيذي واحد لتسهيل الاستخدام.\n\nاستعنت بأدوات تطوير مدعومة بالذكاء الاصطناعي في كتابة الكود، ولم تُشارَك أي بيانات سرية تخص العمل أو العملاء، ولا أي بيانات شخصية، مع خدمات ذكاء اصطناعي خارجية."
    - "٤. النتائج: يُخرج التطبيق تقارير فردية وملخصات مجمّعة وتفاصيل داعمة من خلال عملية قابلة للتكرار.\n\nكما يرفع شفافية التقارير بتفاصيل يومية دقيقة، ويجعل الحسابات أسهل في المراجعة والتحقق.\n\nويتضمن مسار التقارير عدة مراحل تحقق للحفاظ على الاتساق والدقة.\n\nجميع الأمثلة والصور المستخدمة في عرض المشروع تحتوي على بيانات مُعدَّلة أو مُصطنعة."
    - "٥. الأثر على العمل: خفّضت الأتمتة وقت معالجة دورة التقارير الواحدة من نحو سبع ساعات إلى قرابة دقيقة.\n\nوبناءً على حجم العمل الأصلي، يمثّل ذلك تقديريًا:\n• توفير ٢١ ساعة شهريًا في موقع واحد.\n• توفير ٢٥٢ ساعة سنويًا في موقع واحد.\n• توفيرًا سنويًا محتملًا قدره ٧٥٦ ساعة إذا اعتُمد في ثلاثة مواقع.\n\nيُظهر المشروع كيف تقلّل الأتمتة الموجّهة العمل المتكرر، وتحسّن اتساق التقارير، وتجعل العمليات التشغيلية أقل اعتمادًا على موظفين بعينهم.\n\nوبعد عرضه، اقترحت توسيع الحل عبر تجربة مضبوطة في مواقع إضافية."
  captions:
    - 'فواتير الغرف: ارفع الملف، واختر الشهر، وأكّد التواريخ، ثم معالجة. ويؤشّر الشريط الجانبي على كل خطوة عند إتمامها.'
    - 'تقارير الوجبات: سجلات المطبخ Packed وODC وUpgrade، والشهر يُقرأ من الأوراق لا من أسماء الملفات.'
  galleryGroups:
    - 'جميع البيانات في هذه الصور مستبدلة ببيانات غير حقيقية'
---
