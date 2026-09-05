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
  - "1. Context: A client came with a product line and no way to sell it online or see where the business stood day to day."
  - "2. Problem: Every sale, every stock check, every new customer was invisible to him. No storefront, no dashboard, no record of what was actually moving."
  - "3. Approach: I built both sides at once: a storefront customers buy from, and an admin panel covering sales, orders, products, branches and an activity log, so nothing changes without a trace. A ready-made e-commerce platform would have gotten a store live faster, but the client needed his own control panel and a design built around his brand, not a template, so I built it full-stack instead."
  - "4. Result: The build is finished and packaged in Docker as a portable unit; it's parked one step from launch, because the payment gateway and delivery integration need API keys only the client can issue."
  - "5. Lesson: This is where I first used APIs, payment gateways and delivery interfaces for real, and learned to package a whole app with Docker so it's easy to hand off and move."
ar:
  # The project's name, not a phrase — it stays Latin in Arabic like Budgettr,
  # so the same name identifies it everywhere on the site.
  title: 'Coffee Shop Website'
  role: 'المنتج والتطوير المتكامل'
  stack: ['تطوير متكامل', 'قواعد بيانات', Docker, UX/UI]
  summary: 'متجر قهوة مختصة مع لوحة الإدارة التي تديره.'
  headline: 'متجر قهوة مختصة مع لوحة الإدارة التي تديره.'
  tags: ['طلب من عميل']
  body:
    - "١. السياق: جاء عميل يملك خط منتجات ولا يملك طريقة لبيعها عبر الإنترنت ولا لمعرفة وضع متجره يومًا بيوم."
    - "٢. المشكلة: كانت كل عملية بيع وكل فحص مخزون وكل عميل جديد غير مرئي له. لا متجر، ولا لوحة إدارة، ولا سجل يوضح ما يتحرك فعليًا."
    - "٣. القرار: بنيت الطرفين معًا: واجهة يشتري منها العميل، ولوحة إدارة تغطي المبيعات والطلبات والمنتجات والفروع مع سجل نشاط، بحيث لا يمر أي تعديل دون أثر. كان بالإمكان استخدام منصة تجارة إلكترونية جاهزة يظهر بها المتجر أسرع، غير أن العميل يحتاج لوحة تحكم خاصة به وتصميمًا يناسب هويته لا قالبًا جاهزًا، فبنيتها متكاملة من الصفر."
    - "٤. النتيجة: العمل منتهٍ ومغلَّف بـDocker كوحدة متنقلة، وهو واقف عند خطوة واحدة قبل الإطلاق، إذ تحتاج بوابة الدفع وربط التوصيل مفاتيح API لا يصدرها إلا العميل."
    - "٥. الدرس: هذا أول مشروع استخدمت فيه واجهات API وبوابات الدفع وواجهات التوصيل بصورة حقيقية، وتعلّمت فيه تغليف برنامج كامل بـDocker بحيث يسهل تسليمه ونقله."
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
