---
title: Coffee Shop Website
role: Product & Full-stack Development
year: 2026
category: developing
tags: [Client Request]
order: 6
summary: A specialty-coffee storefront with the admin panel that runs it.
cover: ../../../assets/coffee-shop/cover.png
client: client
status: built
headline: A specialty-coffee storefront with the admin panel that runs it.
# Four entries, and they are the four the card prints. The list used to run to
# six while the card showed the first four, so the same project stated two
# different stacks one click apart. Claude AI came off with the trim: it is how
# the work was done, not what the thing is built out of, and the About section is
# where that belongs.
stack: [Full-stack, Database, Docker, UX/UI]
gallery:
  - ../../../assets/coffee-shop/storefront-home.png
  - ../../../assets/coffee-shop/storefront-catalog.png
  - ../../../assets/coffee-shop/admin-dashboard.png
  - ../../../assets/coffee-shop/admin-sales.png
  - ../../../assets/coffee-shop/admin-products.png
  - ../../../assets/coffee-shop/admin-stores.png
captions:
  - "Home: the hero, three entry points, best sellers that add to the cart from the card itself, and the four-step sourcing story."
  - "Catalog: category filter, search and sort. A product that is out of stock stays visible but dimmed with its button disabled, rather than disappearing from the grid."
  - "Admin overview: 30 days of sales, new customers, low stock, the recent orders queue, and stock alerts."
  - "Sales: daily, weekly and monthly views, with revenue and VAT broken out per day under the chart."
  - "Products: the full catalogue with category, price and active state, filtered by the same categories the storefront uses."
  - "Branches: address, map location and opening hours per branch, added from the same panel."
galleryGroups:
  - at: 1
    label: "Storefront, what the customer sees"
  - at: 3
    label: "Admin panel, what the owner runs the store from"
body:
  - "1. Overview: Coffee Shop Website, a client engagement where I was the product designer and the full-stack developer. It is a storefront plus the admin panel that runs it, built full-stack with its own database, UX/UI and Docker packaging."
  - "2. Problem: The client had a product line and no way to sell it online or see where the business stood day to day. Every sale, every stock check, every new customer was invisible to him."
  - "3. Research: I worked from what the client already had, his product line, his branches, and the way he described a day of trading, and looked at the ready-made e-commerce platforms he could have signed up for instead. Those would have put a store online quickly, but none of them gave him his own control panel or a design built around his brand, which was what he was asking for."
  - "4. Process: I built both sides at once, storefront and admin, so the catalogue a customer browses and the products the owner edits are the same records. The template platform is the alternative I rejected, for the reason above. On the storefront an out-of-stock product stays visible but dimmed with its button disabled instead of vanishing from the grid, so the catalogue never silently changes shape; on the admin side an activity log means nothing changes without a trace."
  - "5. Result: A finished storefront and admin panel, packaged in Docker as a portable unit. The shots below are split into the two sides: what the customer sees, and what the owner runs the shop from."
  - "6. Impact: The build is complete and parked one step from launch, because the payment gateway and delivery integration need API keys only the client can issue, so there is no live trading figure to report yet."
  - "7. Takeaway: This is where I first used APIs, payment gateways and delivery interfaces for real, and learned to package a whole app with Docker so it is easy to hand off and move. What I would change: get the gateway and delivery accounts opened at the start of the project rather than the end, since that dependency is what is holding a finished build offline."
ar:
  # The project's name, not a phrase — it stays Latin in Arabic like Budgettr,
  # so the same name identifies it everywhere on the site.
  title: 'Coffee Shop Website'
  role: 'المنتج والتطوير المتكامل'
  stack: [Full-stack, Database, Docker, UX/UI]
  summary: 'متجر قهوة مختصة مع لوحة الإدارة التي تديره.'
  headline: 'متجر قهوة مختصة مع لوحة الإدارة التي تديره.'
  tags: ['طلب من عميل']
  body:
    - "١. نظرة عامة: Coffee Shop Website، عمل لعميل تولّيت فيه التصميم والتطوير المتكامل. وهو واجهة متجر مع لوحة الإدارة التي تديره، مبني بالكامل بقاعدة بياناته الخاصة وتصميم تجربة وواجهة وتغليف بـDocker."
    - "٢. المشكلة: كان لدى العميل خط منتجات ولا طريقة لبيعه عبر الإنترنت ولا لمعرفة وضع متجره يومًا بيوم. فكل عملية بيع وكل فحص مخزون وكل عميل جديد غير مرئي له."
    - "٣. البحث والفهم: انطلقت مما يملكه العميل فعلًا، من خط منتجاته وفروعه وطريقة وصفه ليوم بيع كامل، ثم راجعت منصات التجارة الإلكترونية الجاهزة التي كان بإمكانه الاشتراك فيها بدلًا من ذلك. وهي تضع متجرًا على الإنترنت بسرعة، غير أن أيًّا منها لا يمنحه لوحة تحكم خاصة به ولا تصميمًا مبنيًا على هويته، وهو ما كان يطلبه."
    - "٤. الحل والعملية: بنيت الطرفين معًا، الواجهة ولوحة الإدارة، بحيث يكون الكتالوج الذي يتصفّحه العميل والمنتجات التي يحرّرها صاحب المتجر سجلات واحدة. والمنصة الجاهزة هي البديل الذي رفضته للسبب أعلاه. وفي الواجهة يبقى المنتج غير المتوفر ظاهرًا لكن باهتًا وزرّه معطّل بدل أن يختفي من الشبكة، فلا يتغيّر شكل الكتالوج في صمت؛ وفي لوحة الإدارة سجل نشاط يجعل كل تعديل مصحوبًا بأثره."
    - "٥. النتيجة: واجهة متجر ولوحة إدارة مكتملتان، مغلَّفتان بـDocker كوحدة متنقلة. والصور أدناه مقسومة على الطرفين: ما يراه العميل، وما يدير منه صاحب المتجر متجره."
    - "٦. الأثر: العمل منتهٍ وواقف عند خطوة واحدة قبل الإطلاق، إذ تحتاج بوابة الدفع وربط التوصيل مفاتيح API لا يصدرها إلا العميل، فلا يوجد بعد رقم تشغيل حقيقي يُذكر."
    - "٧. الخلاصة والدروس: هذا أول مشروع استخدمت فيه واجهات API وبوابات الدفع وواجهات التوصيل بصورة حقيقية، وتعلّمت فيه تغليف برنامج كامل بـDocker بحيث يسهل تسليمه ونقله. وما كنت سأغيّره: فتح حسابات البوابة والتوصيل في بداية المشروع لا في نهايته، فهذا الاعتماد هو ما يُبقي عملًا مكتملًا خارج الخدمة."
  captions:
    - 'الرئيسية: الواجهة، وثلاثة مداخل، والأكثر مبيعًا مع الإضافة إلى السلة من البطاقة نفسها، وقصة المنشأ في أربع خطوات.'
    - 'الكتالوج: فلترة بالفئات وبحث وترتيب. يبقى المنتج غير المتوفر ظاهرًا لكن باهتًا وزرّه معطّل، بدل أن يختفي من الشبكة.'
    - 'نظرة عامة للإدارة: مبيعات ٣٠ يومًا، والعملاء الجدد، والمخزون المنخفض، وطابور أحدث الطلبات، وتنبيهات المخزون.'
    - 'المبيعات: عرض يومي وأسبوعي وشهري، مع تفصيل الإيراد والضريبة لكل يوم تحت الرسم.'
    - 'المنتجات: الكتالوج كاملًا بالفئة والسعر وحالة التفعيل، بالفئات نفسها المستخدمة في واجهة المتجر.'
    - 'الفروع: العنوان والموقع على الخريطة وأوقات الدوام لكل فرع، تُضاف من اللوحة نفسها.'
  galleryGroups:
    - 'واجهة المتجر، ما يراه العميل'
    - 'لوحة الإدارة، ما يدير منها صاحب المتجر متجره'
---
