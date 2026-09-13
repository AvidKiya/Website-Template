export const px = (id: number, w = 700) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=${w}&w=${w}`;

export const pxWide = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

export type Product = {
  id: number;
  title: string;
  en: string;
  price: number;
  old?: number;
  img: number;
  rate: number;
  sold: number;
  stock: number;
  cat: string;
  colors: string[];
  badge?: string;
};

export const products: Product[] = [
  { id: 1, title: "کفش نایکی جردن Black", en: "Nike Jordan Black", price: 889000, old: 935000, img: 4161710, rate: 4.8, sold: 128, stock: 6, cat: "کفش", colors: ["#111827", "#dc2626", "#e5e7eb"] },
  { id: 2, title: "کفش نایکی جردن", en: "Nike Jordan Retro", price: 800000, old: 850000, img: 19869759, rate: 4.5, sold: 92, stock: 11, cat: "کفش", colors: ["#2563eb", "#111827"] },
  { id: 3, title: "کفش آدیداس Sneakers", en: "Adidas Sneakers", price: 860000, old: 960000, img: 24702077, rate: 4.9, sold: 210, stock: 4, cat: "کفش", colors: ["#f8fafc", "#0ea5e9"], badge: "پرفروش" },
  { id: 4, title: "کفش آدیداس مشکی", en: "Adidas Black", price: 850000, old: 880000, img: 27988921, rate: 4.2, sold: 61, stock: 9, cat: "کفش", colors: ["#111827"] },
  { id: 5, title: "کوله پشتی آبی مدل L901", en: "Backpack L901", price: 382000, old: 445000, img: 2416871, rate: 4.6, sold: 144, stock: 7, cat: "کیف", colors: ["#1d4ed8", "#111827"] },
  { id: 6, title: "کیف ورزشی مدل R12S", en: "Sport Bag R12S", price: 745000, img: 4452386, rate: 4.1, sold: 38, stock: 15, cat: "کیف", colors: ["#92400e", "#111827"] },
  { id: 7, title: "کیف زنانه مدل Ep006", en: "Women Bag Ep006", price: 119000, old: 120000, img: 19869755, rate: 4.4, sold: 77, stock: 12, cat: "کیف", colors: ["#dc2626", "#16a34a"], badge: "جدید" },
  { id: 8, title: "کیف چرم مدل E500", en: "Leather Bag E500", price: 979000, old: 1180000, img: 27174572, rate: 4.7, sold: 53, stock: 3, cat: "کیف", colors: ["#7c2d12", "#111827"] },
  { id: 9, title: "کیف اسپورت 5001", en: "Sport Case 5001", price: 495000, old: 550000, img: 4678187, rate: 4.0, sold: 26, stock: 18, cat: "کیف", colors: ["#a16207"] },
  { id: 10, title: "ست چرم مردانه M520", en: "Leather Set M520", price: 750000, old: 800000, img: 4452380, rate: 4.3, sold: 45, stock: 8, cat: "کیف", colors: ["#78350f", "#111827"] },
  { id: 11, title: "کت جین مدل 5003", en: "Denim Jacket 5003", price: 550000, old: 680000, img: 3649765, rate: 4.8, sold: 187, stock: 5, cat: "پوشاک", colors: ["#1e3a8a", "#111827"], badge: "پرفروش" },
  { id: 12, title: "کاپشن برند مراکش f91", en: "Marakesh Jacket f91", price: 265000, old: 315000, img: 4172099, rate: 4.2, sold: 64, stock: 10, cat: "پوشاک", colors: ["#065f46", "#111827"] },
  { id: 13, title: "پیراهن مردانه مدل puma", en: "Puma Shirt", price: 465000, old: 550000, img: 13094187, rate: 4.5, sold: 98, stock: 14, cat: "پوشاک", colors: ["#9ca3af", "#111827"] },
  { id: 14, title: "شلوار مام فیت gray", en: "Mom Fit Jeans", price: 795000, old: 880000, img: 18533668, rate: 4.6, sold: 121, stock: 6, cat: "پوشاک", colors: ["#475569", "#1e293b"] },
  { id: 15, title: "ست پاییزه کژوال", en: "Casual Autumn Set", price: 360000, old: 450000, img: 18533674, rate: 4.9, sold: 240, stock: 2, cat: "پوشاک", colors: ["#b91c1c", "#0f172a"], badge: "شگفت‌انگیز" },
  { id: 16, title: "دورس یقه نیم زیپ", en: "Half Zip Sweat", price: 830000, old: 850000, img: 13094233, rate: 4.1, sold: 31, stock: 20, cat: "پوشاک", colors: ["#6b7280"] },
  { id: 17, title: "ساعت مچی کرنوگراف چرم", en: "Chrono Watch", price: 2450000, old: 2990000, img: 28977357, rate: 5, sold: 74, stock: 3, cat: "اکسسوری", colors: ["#111827", "#a16207"], badge: "لاکچری" },
  { id: 18, title: "ست هدیه زمستانی", en: "Winter Gift Set", price: 690000, old: 790000, img: 14706201, rate: 4.4, sold: 58, stock: 9, cat: "اکسسوری", colors: ["#be123c", "#0f172a"] },
];

export const categories = [
  { title: "لباس ورزشی", en: "Jogging Suit", icon: "🏃", from: "#f43f52", to: "#7f1d1d" },
  { title: "لباس مردانه", en: "Men's Clothes", icon: "👔", from: "#3b82f6", to: "#1e3a8a" },
  { title: "لباس زنانه", en: "Women's Clothes", icon: "👗", from: "#ec4899", to: "#831843" },
  { title: "لباس بچگانه", en: "Children Clothing", icon: "🧸", from: "#f59e0b", to: "#78350f" },
  { title: "انواع کلاه", en: "Types of Hats", icon: "🧢", from: "#22c55e", to: "#14532d" },
  { title: "کیف و کفش", en: "Bags & Shoes", icon: "👜", from: "#a855f7", to: "#4c1d95" },
  { title: "اکسسوری", en: "Accessories", icon: "⌚", from: "#06b6d4", to: "#164e63" },
  { title: "عینک آفتابی", en: "Sunglasses", icon: "🕶️", from: "#eab308", to: "#713f12" },
];

export const megaMenu = [
  {
    title: "کالای دیجیتال",
    icon: "📱",
    cols: [
      { head: "موبایل", items: ["گوشی سامسونگ", "گوشی اپل", "گوشی شیائومی", "پاوربانک"] },
      { head: "لپ تاپ", items: ["لپ تاپ گیمینگ", "لپ تاپ اداری", "مک بوک", "لوازم جانبی"] },
    ],
  },
  {
    title: "مد و پوشاک",
    icon: "👕",
    cols: [
      { head: "مردانه", items: ["پیراهن", "کت و شلوار", "شلوار جین", "سویشرت"] },
      { head: "زنانه", items: ["مانتو", "شومیز", "کیف دستی", "شال و روسری"] },
    ],
  },
  {
    title: "کفش و کتانی",
    icon: "👟",
    cols: [
      { head: "ورزشی", items: ["کتانی رانینگ", "کفش فوتسال", "کفش بسکتبال", "صندل"] },
      { head: "کلاسیک", items: ["کفش چرم", "کالج", "بوت", "نیم بوت"] },
    ],
  },
  {
    title: "خانه و آشپزخانه",
    icon: "🏠",
    cols: [
      { head: "لوازم برقی", items: ["چای ساز", "جاروبرقی", "مایکروویو", "سرخ کن"] },
      { head: "دکوراسیون", items: ["فرش", "آباژور", "تابلو", "گلدان"] },
    ],
  },
  {
    title: "زیبایی و سلامت",
    icon: "💄",
    cols: [
      { head: "آرایشی", items: ["لوازم آرایش", "عطر و ادکلن", "مراقبت پوست", "مراقبت مو"] },
      { head: "بهداشتی", items: ["شامپو", "کرم دست", "ماسک صورت", "ریش تراش"] },
    ],
  },
  { title: "ورزش و سفر", icon: "🎒", cols: [{ head: "ورزشی", items: ["دمبل", "تردمیل", "توپ", "مچ بند"] }, { head: "سفر", items: ["چمدان", "کوله", "کیف کمری", "لوازم کمپینگ"] }] },
];

export const brands = ["NIKE", "adidas", "PUMA", "Levi's", "ZARA", "H&M", "Gucci", "Reebok"];

export const blog = [
  { id: 1, title: "۱۰ ترند پوشاک زمستان امسال که باید بشناسید", cat: "مد و استایل", date: "۱۲ دی ۱۴۰۴", read: "۵ دقیقه", img: 8108596 },
  { id: 2, title: "راهنمای خرید کفش ورزشی مناسب دویدن", cat: "راهنمای خرید", date: "۸ دی ۱۴۰۴", read: "۷ دقیقه", img: 14703446 },
  { id: 3, title: "چگونه کیف چرم اصل را از تقلبی تشخیص دهیم؟", cat: "آموزشی", date: "۳ دی ۱۴۰۴", read: "۴ دقیقه", img: 27174572 },
  { id: 4, title: "ست کردن رنگ لباس؛ از تئوری تا عمل", cat: "مد و استایل", date: "۲۹ آذر ۱۴۰۴", read: "۶ دقیقه", img: 6835877 },
];

export const slides = [
  {
    id: 1,
    img: 8108596,
    tag: "کالکشن زمستان ۱۴۰۴",
    title: "استایل شب‌های شهر",
    sub: "تا ۴۵٪ تخفیف روی کاپشن و کت چرم",
    cta: "مشاهده کالکشن",
    from: "from-brand-600/80",
  },
  {
    id: 2,
    img: 4904563,
    tag: "فروش ویژه بلک فرایدی",
    title: "جمعه سیاه پارس کالا",
    sub: "خرید بالای ۲ میلیون تومان، ارسال رایگان",
    cta: "شروع خرید",
    from: "from-purple-700/80",
  },
  {
    id: 3,
    img: 7193844,
    tag: "جدیدترین‌ها",
    title: "اکسسوری‌های خاص",
    sub: "عینک، ساعت و زیورآلات با قیمت باورنکردنی",
    cta: "همین حالا ببین",
    from: "from-rose-700/80",
  },
];

export const faIn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export const money = (n: number) => faIn(n.toLocaleString("en-US"));
