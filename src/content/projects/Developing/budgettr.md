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
  - "1. Overview: Budgettr, a personal project I designed and built end to end. It is a monthly spending dashboard in React, TypeScript, PostgreSQL and Tailwind, live in Arabic and English."
  - "2. Problem: My own spending was scattered across the month with no single view of it. Tracking expenses meant flipping between notes and bank statements, and a savings goal stayed a guess instead of something I could measure."
  - "3. Research: I tried the existing budgeting apps first. None of them handled Arabic and English or SAR the way this needed, and they were built around logging a transaction rather than around the month as a cycle. Once other people started using it, their first screens became the second round of research: what a new account looks like with nothing in it yet."
  - "4. Process: I built it around a monthly cycle, setting income and categories at the start, logging expenses against them, and watching the savings goal update as the month runs. Wrapping an existing app was the alternative I dropped, for the reason above. The first version treated empty screens as an edge case and they read as broken, so every empty state was rebuilt to name the action that fills it and to hold totals at SAR 0.00 instead of going blank."
  - "5. Result: A live dashboard covering income, category budgets, bills and goals in both languages, with dark and light mode. The shots below run in two groups: the app with a month of data in it, then the empty states a new user actually starts from."
  - "6. Impact: 27 people use it, and it is my own daily tool, which is where the bill reminders and the empty states came from in the first place."
  - "7. Takeaway: Using something you build yourself every day surfaces the small annoyances a spec would never catch. What I would change: build the empty states first rather than last, since they are the first screen every new user sees and they were the last thing I designed."
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
    - "١. نظرة عامة: Budgettr، مشروع شخصي صمّمته وبنيته من الطرف إلى الطرف. وهو لوحة لمصروفات الشهر مبنية بـReact وTypeScript وPostgreSQL وTailwind، وتعمل بالعربية والإنجليزية."
    - "٢. المشكلة: كانت مصروفاتي موزّعة على طول الشهر دون رؤية واحدة تجمعها. فتتبّع المصروفات يعني التنقّل بين الملاحظات وكشف الحساب، ويظل هدف الادخار تخمينًا لا شيئًا يمكن قياسه."
    - "٣. البحث والفهم: جرّبت تطبيقات الميزانية الموجودة أولًا. ولم يتعامل أيّ منها مع العربية والإنجليزية والريال السعودي بالشكل المطلوب، كما أنها مبنية حول تسجيل عملية لا حول الشهر بوصفه دورة. ولمّا بدأ آخرون باستخدامها، صارت شاشاتهم الأولى جولة البحث الثانية: كيف يبدو حساب جديد لا بيانات فيه بعد."
    - "٤. الحل والعملية: بنيتها حول دورة شهرية، بتحديد الدخل والفئات في البداية، ثم تسجيل المصروفات عليها، ومتابعة هدف الادخار وهو يتحدّث مع مرور الشهر. والبديل الذي استبعدته هو استخدام تطبيق جاهز، للسبب أعلاه. وقد عاملت النسخة الأولى الشاشات الفارغة كحالة هامشية فبدت معطّلة، فأُعيد بناء كل حالة فارغة لتسمّي الإجراء الذي يملؤها ولتبقي المجاميع عند ٠٫٠٠ ريال بدل أن تختفي."
    - "٥. النتيجة: لوحة تعمل فعليًا تغطي الدخل وميزانية كل فئة والفواتير والأهداف باللغتين، وبوضعين نهاري وليلي. والصور أدناه في مجموعتين: التطبيق وفيه بيانات شهر كامل، ثم الحالات الفارغة التي يبدأ منها المستخدم الجديد."
    - "٦. الأثر: يستخدمها ٢٧ شخصًا، وهي أداتي اليومية أنا أيضًا، ومن هناك جاءت تذكيرات الفواتير والحالات الفارغة أصلًا."
    - "٧. الخلاصة والدروس: استخدام ما تبنيه بنفسك يوميًا يكشف التفاصيل الصغيرة التي لا تلتقطها أي مواصفة مكتوبة. وما كنت سأغيّره: بناء الحالات الفارغة أولًا لا أخيرًا، فهي أول شاشة يراها كل مستخدم جديد، وقد كانت آخر ما صمّمته."
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
