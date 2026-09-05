---
title: Camp Operations Dashboard
role: Data Analysis & Dashboard Design
year: 2025
category: analysis
tags: [initiative]
order: 2
summary: Twelve Excel sheets replaced by one morning screen.
video:
  src: /videos/dashboard-configuration-walkthrough.mp4
  width: 1280
  height: 620
  alt: Screen recording of the camp operations dashboard, walking through the morning view of revenue, beds, persons and category averages.
client: initiative
headline: Twelve spreadsheets replaced by one screen, a yearly report.
stack: [SQL, Excel, Python, Power BI]
body:
  - "1. Overview: Camp Operations Dashboard, an internal initiative for the team running a residential operation. I was the analyst and designed the screen itself: 12 sheets in, one Power BI dashboard out, cleaned with Python and SQL."
  - "2. Problem: Correct numbers were hard to pin down. The data sat in 12 separate Excel sheets, none of it analysis-ready, and the team spent roughly an hour every morning assembling a manual report out of them before the day could start."
  - "3. Research: This grew out of the review of an earlier dashboard, where the team asked for deeper detail. I went through what the morning report actually consisted of, which figures were copied, in what order, and which ones got argued about. That is what showed the screen had to answer revenue, beds, persons and category averages together rather than one at a time."
  - "4. Process: I merged the 12 sheets into one final dataset in Python, then laid the dashboard out in the order the morning is read rather than the order the sheets happened to be stored in. Tidying the 12 sheets in place was the cheaper fix, and I dropped it because it still leaves the team switching between files every morning, which was the actual cost."
  - "5. Result: One screen covering revenue, beds, persons and category averages across all four quarters. The recording below walks through it as a morning read."
  - "6. Impact: About an hour of manual reporting saved every morning, 12 sheets replaced by one screen, and the team could see which categories needed attention instead of only totalling them."
  - "7. Takeaway: A dashboard opened fresh every morning has to be designed for that habit, not for the one report it started as. What I would change: sit with the team through a full morning before laying anything out, instead of inferring the order from the report they handed me."
stats:
  - value: "1 hr"
    label: "Saved every morning"
  - value: "12"
    label: "Sheets merged into one"
  - value: "4"
    label: "Quarters covered"
ar:
  title: 'لوحة العمليات التشغيلية'
  role: 'تحليل البيانات وتصميم لوحات المعلومات'
  stack: [SQL, Excel, Python, Power BI]
  summary: '١٢ جدولًا استُبدلت بشاشة واحدة كل صباح.'
  headline: '١٢ جدولًا استُبدلت بشاشة واحدة، بمثابة تقرير سنوي.'
  tags: ['مبادرة']
  videoAlt: تسجيل شاشة للوحة العمليات التشغيلية، يستعرض شاشة الصباح من الإيرادات والأسرّة والأشخاص إلى متوسط كل فئة.
  body:
    - "١. نظرة عامة: لوحة العمليات التشغيلية، مبادرة داخلية لفريق يدير منشأة سكنية. كنت المحلّل ومصمّم الشاشة نفسها: ١٢ جدولًا في المدخل، ولوحة Power BI واحدة في المخرج، مع تنظيف بـPython وSQL."
    - "٢. المشكلة: كان الوصول إلى الأرقام الصحيحة صعبًا. فالبيانات موزّعة على ١٢ جدول Excel منفصلًا وغير جاهزة للتحليل، والفريق يقضي نحو ساعة كل صباح في تجميع تقرير يدوي منها قبل أن يبدأ اليوم."
    - "٣. البحث والفهم: نشأ العمل من مراجعة لوحة سابقة طلب الفريق فيها تفاصيل أعمق. فتتبّعت ما يتألف منه تقرير الصباح فعليًا: أي الأرقام يُنقل، وبأي ترتيب، وأيها يثير الجدل. وهذا ما بيّن أن الشاشة ينبغي أن تجيب عن الإيرادات والأسرّة والأشخاص ومتوسط الفئات مجتمعة، لا واحدًا بعد آخر."
    - "٤. الحل والعملية: دمجت الجداول الاثني عشر في مجموعة بيانات نهائية واحدة باستخدام Python، ثم رتّبت اللوحة بترتيب قراءة الصباح لا بترتيب حفظ الجداول. وكان الحل الأرخص هو ترتيب الجداول الاثني عشر في مواضعها، وقد استبعدته لأنه يُبقي الفريق متنقّلًا بين الملفات كل صباح، وهو أصل التكلفة."
    - "٥. النتيجة: شاشة واحدة تغطي الإيرادات والأسرّة والأشخاص ومتوسط كل فئة على مدار أرباع السنة الأربعة. ويستعرضها التسجيل أدناه كما تُقرأ في الصباح."
    - "٦. الأثر: توفير نحو ساعة من التقارير اليدوية كل صباح، واستبدال ١٢ جدولًا بشاشة واحدة، وصار بإمكان الفريق تحديد الفئات التي تحتاج اهتمامًا بدل الاكتفاء بجمعها."
    - "٧. الخلاصة والدروس: اللوحة التي تُفتح من جديد كل صباح ينبغي أن تُصمَّم لهذه العادة، لا للتقرير الواحد الذي بدأت منه. وما كنت سأغيّره: الجلوس مع الفريق طوال صباح كامل قبل رسم أي تخطيط، بدل استنتاج الترتيب من التقرير الذي سلّموه لي."
  stats:
    - value: "ساعة واحدة"
      label: "موفَّرة كل صباح"
    - value: "١٢"
      label: "جدولًا مدمجًا في مصدر واحد"
    - value: "٤"
      label: "أرباع سنوية مغطاة"
---
