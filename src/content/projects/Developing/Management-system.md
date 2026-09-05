---
title: Management System
role: Product & Full-stack Development
year: 2026
category: developing
tags: [internal]
order: 5
summary: A single view of occupancy, capacity and night operations across every building.
cover: ../../../assets/horizon/cover.png
# Built on the job, for the team — the body has always said "volunteer
# initiative", so "Client Work" on the card and the spec row contradicted the
# page's own first sentence. `internal` renders as "Internal Work".
client: internal
headline: Overview of occupancy, capacity and night operations across every building.
stack: [Full-Stack,UI/UX]
gallery:
  - ../../../assets/horizon/overview.png
  - ../../../assets/horizon/occupancy.png
  - ../../../assets/horizon/building.png
  - ../../../assets/horizon/night-audit.png
captions:
  - "Overview: revenue, pax, rooms and vacant beds for the day, over arrivals against departures across the last 14 days."
  - "Occupancy report: who is staying under which company, filtered by company and room category, and exportable as it stands on screen."
  - "Building info: capacity, pax, rooms and vacancies floor by floor for every building, with out-of-order rooms called out on each card."
  - "Night audit: checked in against checked out for the shift, over the room table the audit is actually run from."
galleryGroups:
  - at: 1
    label: "All data in these shots is replaced with non-real values"
body:
  - "1. Overview: Management System, a volunteer build for a residential operation, where I did the product and the full-stack work. It is an admin platform reading live from the organisation's own database, with an Overview page and a Night Audit page."
  - "2. Problem: The nightly headcount and building status were done by hand. Staff spent the shift chasing numbers instead of running it, and management had no single screen showing where the day stood."
  - "3. Research: I worked through the organisation's existing system and its database before designing anything, to see what was already recorded and what staff were re-entering by hand. Sitting with the night shift is what split the product in two: management wants the day at a glance, the shift wants the building in front of it."
  - "4. Process: I connected the platform straight to the organisation's database instead of standing up a separate one and syncing it. The separate database was the safer-looking option and I rejected it, because a synced copy drifts and a night audit run off a stale number is worse than no screen at all. The two pages were then built for two different readers rather than as one dashboard with a filter on it."
  - "5. Result: One admin platform showing occupancy, capacity and night operations across every building, with an Overview page for management and a Night Audit page built around the shift. All data in the screenshots is changed or replaced with non-real values to protect the organisation's privacy."
  - "6. Impact: The nightly headcount moved off paper onto one screen, and management can see where the day stands without asking for it. No before-and-after timings were collected, so the result here is qualitative rather than a number."
  - "7. Takeaway: Building on top of someone else's live system is a different discipline from starting clean, and most of the work is reading their model correctly. What I would change: agree how to measure the shift before shipping, so the improvement would be a figure here rather than a description."
ar:
  title: 'نظام الإدارة'
  role: 'المنتج والتطوير المتكامل'
  stack: [Full-Stack,UI/UX]
  summary: 'عرض واحد للإشغال والسعة وعمليات الليل في كل المباني.'
  headline: 'نظرة عامة على الإشغال والسعة وعمليات الليل في كل المباني.'
  tags: ['عمل داخلي']
  body:
    - "١. نظرة عامة: نظام الإدارة، عمل تطوّعي لمنشأة سكنية تولّيت فيه المنتج والتطوير المتكامل. وهو منصة إدارية تقرأ مباشرة من قاعدة بيانات الجهة نفسها، وفيها صفحة نظرة عامة وصفحة تدقيق ليلي."
    - "٢. المشكلة: كان عدّ النزلاء ورصد حالة المباني يجريان يدويًا كل ليلة. فيقضي الموظفون الوردية في ملاحقة الأرقام بدل إدارتها، ولا تملك الإدارة شاشة واحدة تُظهر أين وصل اليوم."
    - "٣. البحث والفهم: راجعت النظام القائم لدى الجهة وقاعدة بياناته قبل تصميم أي شيء، لأعرف ما هو مسجَّل أصلًا وما يعيد الموظفون إدخاله يدويًا. والجلوس مع وردية الليل هو ما قسّم المنتج إلى قسمين: الإدارة تريد اليوم في لمحة، والوردية تريد المبنى أمامها."
    - "٤. الحل والعملية: ربطت المنصة مباشرة بقاعدة بيانات الجهة بدل إنشاء قاعدة منفصلة تُزامَن يدويًا. وكانت القاعدة المنفصلة هي الخيار الذي يبدو أأمن، وقد رفضته لأن النسخة المزامَنة تنحرف، والتدقيق الليلي المبني على رقم قديم أسوأ من غياب الشاشة أصلًا. ثم بُنيت الصفحتان لقارئين مختلفين، لا كلوحة واحدة عليها فلتر."
    - "٥. النتيجة: منصة إدارية واحدة تعرض الإشغال والسعة وعمليات الليل في كل المباني، بصفحة نظرة عامة للإدارة وصفحة تدقيق ليلي مبنية حول الوردية. وجميع البيانات في الصور مُغيَّرة أو مُستبدَلة بقيم غير حقيقية حفاظًا على خصوصية الجهة."
    - "٦. الأثر: انتقل العدّ الليلي من الورق إلى شاشة واحدة، وصارت الإدارة ترى أين وصل اليوم دون أن تسأل عنه. ولم تُقَس الأزمنة قبل العمل وبعده، فالنتيجة هنا وصفية لا رقمية."
    - "٧. الخلاصة والدروس: البناء فوق نظام حيّ يملكه غيرك انضباط مختلف عن البدء من الصفر، وأغلب العمل فيه قراءة نموذجهم قراءة صحيحة. وما كنت سأغيّره: الاتفاق على طريقة قياس الوردية قبل التسليم، ليكون التحسّن هنا رقمًا لا وصفًا."
  captions:
    - 'نظرة عامة: الإيراد وعدد النزلاء والغرف والأسرّة الشاغرة لليوم، وفوقها الوصول مقابل المغادرة خلال آخر ١٤ يومًا.'
    - 'تقرير الإشغال: من يقيم تحت أي شركة، مع فلترة بالشركة وفئة الغرفة، وقابل للتصدير كما هو على الشاشة.'
    - 'معلومات المباني: النسبة والنزلاء والغرف والشاغر دورًا بدور لكل مبنى، مع إبراز الغرف خارج الخدمة على كل بطاقة.'
    - 'التدقيق الليلي: الداخل مقابل الخارج في الوردية، وفوق جدول الغرف الذي يُنفَّذ منه التدقيق فعليًا.'
  galleryGroups:
    - 'جميع البيانات في هذه الصور مستبدلة ببيانات غير حقيقية'
---
