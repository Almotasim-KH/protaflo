---
# One canonical name, used here, on the card, in the page title, in the share
# card and in the KPI source line. The work used to answer to three — "Data
# Analysis Competition" in the work list, "Sales Analytics Challenge" in the
# timeline, "LinkedIn data challenge" on the KPI plate — and a reader could not
# tell whether that was one project or three.
title: Sales Analytics Challenge
role: Data Analysis
year: 2025
category: analysis
tags: [Power BI, Python, Data Cleaning, Sales Analysis]
order: 1
summary: "A LinkedIn data-analysis tournament: find the top 3 products overall, and the top product in each city."
client: challenge
headline: "A LinkedIn data-analysis tournament: find the top 3 products overall, and the top product in each city."
stack: [Python, Power BI, Excel]
video:
  src: /videos/revenue-analysis-walkthrough.mp4
  width: 1440
  height: 836
  alt: Screen recording of the challenge dashboard, stepping through the sales overview, the top three products and the leading product in each city.
stats:
  - value: "~300"
    label: "Entrants in the challenge"
  - value: "3 + 1"
    label: "Top products, overall and per city"
  - value: "4"
    label: "Steps from raw file to answer"
body:
  - "1. Overview: Sales Analytics Challenge, an open LinkedIn competition with around 300 entrants. I entered on my own as the analyst, cleaning in Python and building the dashboard in Power BI from a single raw Excel file."
  - "2. Problem: The brief asked for the top 3 products by sales and the leading product in each city, plus visuals that support a decision. The supplied file could not answer it as it stood, because missing values and duplicates sat under every number, so any ranking read straight off it would have been wrong."
  - "3. Research: I profiled the file before deciding anything, counting missing values per column, checking for duplicate rows, and reading the distributions to see which fields the ranking would actually rest on. That pass is what showed the data was not analysis-ready."
  - "4. Process: I fixed four steps, clean, prep, model, visualise, and kept them separate so every answer could be traced back to one of them. The faster route was to open the raw file straight in Power BI and chart it; I dropped that, because it produces a confident ranking off dirty rows. Charts that did not answer a line in the brief were cut too."
  - "5. Result: A Power BI dashboard reading off the cleaned dataset, with a sales overview, the top three products, and the leading product in each city. The recording below steps through it in the order the brief asks its questions."
  - "6. Impact: Every question in the brief is answered on one screen among roughly 300 entries, and the ranking holds up because the cleaning behind it is documented rather than assumed."
  - "7. Takeaway: Under competition time pressure the instinct is to jump straight to the visual, and this confirmed the cleaning step is what the whole answer stands on. What I would change: write the profiling pass up as a short data-quality note beside the dashboard, so a reader can see why the numbers are trustworthy instead of taking my word for it."
ar:
  title: تحدي تحليل المبيعات
  role: تحليل البيانات
  summary: "مسابقة لتحليل البيانات على LinkedIn: تحديد أعلى ٣ منتجات إجمالًا، وأعلى منتج في كل مدينة."
  headline: "مسابقة لتحليل البيانات على LinkedIn: تحديد أعلى ٣ منتجات إجمالًا، وأعلى منتج في كل مدينة."
  tags: ['Power BI', 'Python', 'تنظيف البيانات', 'تحليل المبيعات']
  stack: [Python, Power BI, Excel]
  videoAlt: تسجيل شاشة للوحة التحدي، يستعرض نظرة عامة على المبيعات، ثم المنتجات الثلاثة الأعلى والمنتج الأعلى في كل مدينة.
  stats:
    - value: "~٣٠٠"
      label: "مشاركًا في التحدي"
    - value: "٣ + ١"
      label: "منتجات أعلى، إجمالًا وفي كل مدينة"
    - value: "٤"
      label: "خطوات من الملف الخام إلى الإجابة"
  body:
    - "١. نظرة عامة: تحدي تحليل المبيعات، مسابقة مفتوحة على LinkedIn بمشاركة نحو ٣٠٠ متسابق. شاركت فيها منفردًا بدور المحلّل، فنظّفت البيانات بـPython وبنيت اللوحة بـPower BI انطلاقًا من ملف Excel خام واحد."
    - "٢. المشكلة: طلب التحدي أعلى ٣ منتجات من حيث المبيعات والمنتج الأعلى في كل مدينة، مع مرئيات تدعم القرار فعليًا. والملف المُسلَّم لا يجيب عن ذلك كما هو، إذ كانت القيم الناقصة والتكرارات كامنة تحت كل رقم، فأي ترتيب يُقرأ منه مباشرة سيكون خاطئًا."
    - "٣. البحث والفهم: فحصت الملف قبل أي قرار، فحصرت القيم الناقصة في كل عمود، وبحثت عن الصفوف المكرّرة، وقرأت التوزيعات لأعرف الحقول التي سيقوم عليها الترتيب فعلًا. هذه الجولة هي ما كشف أن البيانات غير جاهزة للتحليل."
    - "٤. الحل والعملية: ثبّتُّ أربع خطوات، تنظيف ثم تهيئة ثم نمذجة ثم عرض، وأبقيتها منفصلة ليمكن ردّ كل إجابة إلى خطوتها. الطريق الأسرع كان فتح الملف الخام مباشرة في Power BI ورسمه، وقد استبعدته لأنه ينتج ترتيبًا واثقًا مبنيًا على صفوف غير نظيفة. واستبعدت كذلك كل رسم لا يجيب عن سطر في التحدي."
    - "٥. النتيجة: لوحة Power BI تقرأ من مجموعة البيانات النظيفة، وفيها نظرة عامة على المبيعات، والمنتجات الثلاثة الأعلى، والمنتج الأعلى في كل مدينة. ويستعرضها التسجيل أدناه بالترتيب الذي يطرح به التحدي أسئلته."
    - "٦. الأثر: كل أسئلة التحدي مُجابة في شاشة واحدة بين نحو ٣٠٠ مشاركة، والترتيب صامد لأن التنظيف خلفه موثّق لا مفترض."
    - "٧. الخلاصة والدروس: تحت ضغط وقت المسابقة يميل المرء إلى الانتقال مباشرة إلى الرسم البياني، وقد أكّد هذا المشروع أن خطوة التنظيف هي ما تقوم عليه الإجابة كلها. وما كنت سأغيّره: تدوين جولة الفحص في ملاحظة قصيرة عن جودة البيانات بجانب اللوحة، ليرى القارئ سبب الثقة بالأرقام بدل أن يأخذها على كلامي."
---
