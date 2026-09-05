---
title: Budgettr
role: Personal Work
year: 2026
category: developing
tags: [Personal Project]
order: 4
summary: A dashboard that organises your spending at the start of every month, so you have a clear view of where it goes and a record you can go back to.
cover: ../../../assets/budgettr/cover.png
client: personal
status: live
# The home page's KPI plate and the footer band both state that a platform I
# shipped is used by 27 people, and both name this project as the source — so
# the number has to be visible on the page a reader opens to check it.
stats:
  - value: "27"
    label: "People using it"
headline: A dashboard that organises your spending at the start of every month, so you have a clear view of where it goes and a record you can go back to.
stack: [React, TypeScript, PostgreSQL, Tailwind]
gallery:
  - ../../../assets/budgettr/dashboard.png
  - ../../../assets/budgettr/transactions.png
  - ../../../assets/budgettr/budget.png
  - ../../../assets/budgettr/bills.png
  - ../../../assets/budgettr/goals.png
  - ../../../assets/budgettr/empty-dashboard.png
  - ../../../assets/budgettr/empty-transactions.png
  - ../../../assets/budgettr/empty-budget.png
  - ../../../assets/budgettr/empty-bills.png
  - ../../../assets/budgettr/empty-goals.png
captions:
  - "Dashboard: the month's net, income against expenses, every budget category's progress, bill reminders, and goal progress on one screen."
  - "Transactions: each entry with its category, note and date, filtered by month, category and type, with income, expenses and net recalculated above the list."
  - "Budget: a ceiling per category with spent, remaining and percentage. The bar runs green while there is room and turns amber as the category approaches its limit."
  - "Bills: a month calendar over a due list. Each bill is tagged overdue, due in N days, or paid, and clears in one click."
  - "Goals: saved against target, percentage, days left, and the contributions logged against each goal."
  - "Empty dashboard: totals read SAR 0.00 rather than going blank, and the budget card offers the action that fills it instead of an empty chart."
  - "Empty transactions: the filters stay in place and the message names the reason, no transactions match these filters, so the screen never reads as broken."
  - "Empty budget: both cards name the button that fills them, so the next step is never a guess."
  - "Empty bills: the calendar still draws the month, so the shape of the page is learned before any data arrives."
  - "Empty goals: one card, one sentence, and the total above it reading SAR 0.00."
galleryGroups:
  - at: 1
    label: "The app with a month of data in it"
  - at: 6
    label: "Empty states, because a new user's first screen has no data in it"
link: 'https://budgettr.com/'
body:
  - "1. Context: Personal problem. Spending was scattered across the month with no way to see where it went, so I built a tool to fix that for myself first."
  - "2. Problem: Without a clear monthly view, tracking expenses meant flipping between notes and bank statements, and a savings goal stayed a guess instead of something you could measure."
  - "3. Approach: I built it around a monthly cycle: set income and categories at the start, log expenses against them, and watch a savings goal update as you go. I could have wrapped an existing budgeting app instead, but none of them fit Arabic/English and SAR the way this needed to, so I built it from scratch."
  - "4. Result: A live dashboard, Budgettr, covering income, category budgets, bills and goals, in both Arabic and English, with dark and light mode."
  - "5. Lesson: Using something you build for yourself every day surfaces the small annoyances, like empty states and bill reminders, that a spec would never catch."
ar:
  title: 'Budgettr'
  role: 'عمل خاص'
  stack: [React, TypeScript, PostgreSQL, Tailwind]
  summary: 'لوحة تنظّم مصروفك في بداية كل شهر، فتصل إلى رؤية واضحة لمصروفات الشهر وسجل يمكنك الرجوع إليه.'
  headline: 'لوحة تنظّم مصروفك في بداية كل شهر، فتصل إلى رؤية واضحة لمصروفات الشهر وسجل يمكنك الرجوع إليه.'
  tags: ['مشروع شخصي']
  stats:
    - value: "٢٧"
      label: "شخصًا يستخدمونها"
  body:
    - "١. السياق: مشكلة شخصية. كانت مصروفاتي موزّعة على طول الشهر دون طريقة أرى بها أين ذهبت، فقررت بناء أداة تحلّها لي أولًا."
    - "٢. المشكلة: من دون رؤية واضحة للشهر، يعني تتبّع المصروفات التنقّل بين الملاحظات وكشف الحساب، ويظل هدف الادخار تخمينًا لا شيئًا يمكن قياسه."
    - "٣. القرار: بنيتها حول دورة شهرية: تحديد الدخل والفئات في البداية، ثم تسجيل المصروفات عليها، ومتابعة هدف الادخار وهو يتحدّث أولًا بأول. كان بالإمكان استخدام تطبيق ميزانية جاهز، غير أن أيًّا منها لا يناسب العربية والإنجليزية والريال السعودي بالشكل المطلوب، فبنيتها من الصفر."
    - "٤. النتيجة: لوحة تعمل فعليًا باسم Budgettr، تغطي الدخل وميزانية كل فئة والفواتير والأهداف، بالعربية والإنجليزية، وبوضعين نهاري وليلي."
    - "٥. الدرس: استخدام ما تبنيه بنفسك يوميًا يكشف التفاصيل الصغيرة، كالحالات الفارغة وتذكير الفواتير، مما لا تلتقطه أي مواصفة مكتوبة."
  captions:
    - 'لوحة التحكم: صافي الشهر، والدخل مقابل المصروفات، وتقدّم كل فئة من الميزانية، وتذكيرات الفواتير، ونسب الأهداف في شاشة واحدة.'
    - 'المعاملات: كل عملية بفئتها وملاحظتها وتاريخها، مع فلترة بالشهر والفئة والنوع، ويُعاد حساب الدخل والمصروفات والصافي فوق القائمة.'
    - 'الميزانية: سقف لكل فئة مع المنفَق والمتبقي والنسبة. يبقى الشريط أخضر ما دام هناك متسع، ويتحول إلى الأصفر كلما اقتربت الفئة من حدّها.'
    - 'الفواتير: تقويم الشهر فوق قائمة الاستحقاق. كل فاتورة موسومة بمتأخرة أو مستحقة خلال عدد من الأيام أو مدفوعة، وتُسدَّد بضغطة واحدة.'
    - 'الأهداف: المُدّخر مقابل المستهدف، والنسبة، والأيام المتبقية، والمساهمات المسجّلة على كل هدف.'
    - 'لوحة تحكم فارغة: تظهر المجاميع بقيمة ٠٫٠٠ ريال بدل أن تختفي، وتعرض بطاقة الميزانية الإجراء الذي يملؤها بدل رسم فارغ.'
    - 'معاملات فارغة: تبقى الفلاتر في مكانها وتذكر الرسالة السبب، وهو أنه لا توجد معاملات مطابقة لهذه الفلاتر، فلا تبدو الشاشة معطّلة.'
    - 'ميزانية فارغة: تسمّي البطاقتان الزر الذي يملؤهما، فلا تكون الخطوة التالية تخمينًا.'
    - 'فواتير فارغة: يرسم التقويم الشهر كما هو، فيتعرف المستخدم على شكل الصفحة قبل وصول أي بيانات.'
    - 'أهداف فارغة: بطاقة واحدة وجملة واحدة، وفوقها الإجمالي بقيمة ٠٫٠٠ ريال.'
  galleryGroups:
    - 'التطبيق وفيه بيانات شهر كامل'
    - 'الحالات الفارغة، لأن أول شاشة يراها المستخدم الجديد بلا بيانات'
---
