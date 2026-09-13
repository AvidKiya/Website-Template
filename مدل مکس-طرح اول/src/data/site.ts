export const UP = "https://dark.parskalas.com/wp-content/uploads/";
export const W = UP + "webp/2024/12/";
export const P = UP + "2024/12/";

/** bundled fallbacks used when the remote CDN assets are unreachable */
export const LOCAL = {
  shoeDark: "/img/shoe-dark.jpg",
  shoeWhite: "/img/shoe-white.jpg",
  bag: "/img/bag-women.jpg",
  backpack: "/img/backpack.jpg",
  jacket: "/img/jacket.jpg",
  pants: "/img/pants.jpg",
  tech: "/img/tech.jpg",
  hero: "/img/hero.jpg",
};

export function localFor(p: { id: number; cat: string }): string {
  switch (p.cat) {
    case "کفش":
      return p.id % 2 === 1 ? LOCAL.shoeDark : LOCAL.shoeWhite;
    case "کیف":
      return p.id === 5 ? LOCAL.backpack : LOCAL.bag;
    case "کیف زنانه":
      return LOCAL.bag;
    case "مردانه":
      return LOCAL.jacket;
    case "زنانه":
      return LOCAL.pants;
    case "کالای دیجیتال":
      return LOCAL.tech;
    default:
      return LOCAL.jacket;
  }
}

export type Product = {
  id: number;
  title: string;
  cat: string;
  img: string;
  img2?: string;
  price: number;
  old?: number;
  off?: number;
  rating: number;
  sold: number;
  stock: number;
  colors?: string[];
  special?: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    title: "کفش نایکی جردن Black",
    cat: "کفش",
    img: W + "Group-14384.webp",
    img2: W + "Group-14383.webp",
    price: 889000,
    old: 935000,
    off: 5,
    rating: 4.6,
    sold: 128,
    stock: 7,
    colors: ["#111827", "#d1d5db", "#f5023a"],
    special: true,
  },
  {
    id: 2,
    title: "کفش نایکی جردن",
    cat: "کفش",
    img: W + "Group-14383.webp",
    img2: W + "Group-14385.webp",
    price: 800000,
    old: 850000,
    off: 6,
    rating: 4.3,
    sold: 94,
    stock: 12,
    colors: ["#e5e7eb", "#1f2937"],
    special: true,
  },
  {
    id: 3,
    title: "کفش آدیداس Sneakers",
    cat: "کفش",
    img: W + "Group-14385.webp",
    img2: W + "Group-14386.webp",
    price: 860000,
    old: 960000,
    off: 10,
    rating: 4.8,
    sold: 212,
    stock: 4,
    colors: ["#ffffff", "#0ea5e9", "#111827"],
    special: true,
  },
  {
    id: 4,
    title: "کفش آدیداس مشکی",
    cat: "کفش",
    img: W + "Group-14386.webp",
    img2: W + "Group-14384.webp",
    price: 850000,
    old: 880000,
    off: 3,
    rating: 4.1,
    sold: 61,
    stock: 9,
    colors: ["#111827"],
    special: true,
  },
  {
    id: 5,
    title: "کوله پشتی آبی مدل L901",
    cat: "کیف",
    img: W + "Group-14379.webp",
    img2: W + "Group-14381.webp",
    price: 382000,
    old: 445000,
    off: 14,
    rating: 4.4,
    sold: 143,
    stock: 15,
    colors: ["#1d4ed8", "#111827"],
    special: true,
  },
  {
    id: 6,
    title: "کیف ورزشی مدل R12S",
    cat: "کیف",
    img: W + "Group-14381.webp",
    price: 745000,
    rating: 3.9,
    sold: 37,
    stock: 21,
    colors: ["#374151"],
  },
  {
    id: 7,
    title: "کیف زنانه مدل Ep006",
    cat: "کیف زنانه",
    img: W + "Group-14378.webp",
    img2: W + "Group-14382.webp",
    price: 119000,
    old: 120000,
    off: 1,
    rating: 4.2,
    sold: 305,
    stock: 33,
    colors: ["#be185d", "#111827"],
    special: true,
  },
  {
    id: 8,
    title: "کیف زنانه مدل E500",
    cat: "کیف زنانه",
    img: W + "Group-14382.webp",
    img2: W + "Group-14378.webp",
    price: 979000,
    old: 980000,
    off: 1,
    rating: 4.7,
    sold: 88,
    stock: 6,
    colors: ["#a16207", "#111827"],
    special: true,
  },
  {
    id: 9,
    title: "کیف اسپورت 5001",
    cat: "کیف",
    img: W + "Group-14374.webp",
    img2: W + "Group-14373.webp",
    price: 495000,
    old: 550000,
    off: 10,
    rating: 4.0,
    sold: 52,
    stock: 18,
    colors: ["#111827", "#4b5563"],
    special: true,
  },
  {
    id: 10,
    title: "کیف زنانه M520",
    cat: "کیف زنانه",
    img: W + "Group-14373.webp",
    img2: W + "Group-14368.webp",
    price: 750000,
    old: 800000,
    off: 6,
    rating: 4.5,
    sold: 77,
    stock: 11,
    colors: ["#7c2d12", "#111827"],
    special: true,
  },
  {
    id: 11,
    title: "کت چرم مدل 5003",
    cat: "مردانه",
    img: W + "Group-14372.webp",
    img2: W + "Group-14371.webp",
    price: 550000,
    old: 680000,
    off: 19,
    rating: 4.9,
    sold: 164,
    stock: 3,
    colors: ["#111827", "#78350f"],
    special: true,
  },
  {
    id: 12,
    title: "کاپشن برند مراکش f91",
    cat: "مردانه",
    img: W + "Group-14371.webp",
    img2: W + "Group-14372.webp",
    price: 265000,
    old: 315000,
    off: 16,
    rating: 4.2,
    sold: 231,
    stock: 25,
    colors: ["#065f46", "#111827"],
    special: true,
  },
  {
    id: 13,
    title: "پیراهن مردانه مدل puma",
    cat: "مردانه",
    img: W + "Group-14370.webp",
    img2: W + "Group-14352.webp",
    price: 465000,
    old: 550000,
    off: 15,
    rating: 4.4,
    sold: 119,
    stock: 14,
    colors: ["#1e3a8a", "#ffffff"],
    special: true,
  },
  {
    id: 14,
    title: "شلوار مام فیت gray",
    cat: "زنانه",
    img: W + "Group-14369.webp",
    img2: W + "Group-14368.webp",
    price: 795000,
    old: 880000,
    off: 10,
    rating: 4.6,
    sold: 402,
    stock: 8,
    colors: ["#6b7280", "#111827"],
    special: true,
  },
  {
    id: 15,
    title: "کیف زنانه قرمز c1007",
    cat: "کیف زنانه",
    img: W + "Group-14368.webp",
    img2: W + "Group-14373.webp",
    price: 360000,
    old: 450000,
    off: 20,
    rating: 4.3,
    sold: 96,
    stock: 17,
    colors: ["#f5023a", "#111827"],
    special: true,
  },
  {
    id: 16,
    title: "دورس یقه نیم زیپ",
    cat: "مردانه",
    img: W + "Group-14352.webp",
    img2: W + "Group-14370.webp",
    price: 830000,
    old: 850000,
    off: 2,
    rating: 4.1,
    sold: 44,
    stock: 22,
    colors: ["#0f172a", "#9ca3af"],
    special: true,
  },
  {
    id: 17,
    title: "کیف زنانه مدل ZC0012",
    cat: "کیف زنانه",
    img: P + "Group-14380.png",
    img2: W + "Group-14378.webp",
    price: 320000,
    old: 365000,
    off: 12,
    rating: 4.0,
    sold: 71,
    stock: 19,
    colors: ["#be123c", "#0f172a"],
    special: true,
  },
  {
    id: 18,
    title: "هدست مخصوص بازی هیسکا مدل GHR-07",
    cat: "کالای دیجیتال",
    img: UP + "2026/07/digikala-dkp-20503688-0-300x300.jpg",
    img2: UP + "2026/07/digikala-dkp-20503688-1-300x300.jpg",
    price: 3499000,
    old: 5250000,
    off: 33,
    rating: 4.5,
    sold: 58,
    stock: 5,
    colors: ["#111827", "#f5023a"],
    special: true,
  },
  {
    id: 19,
    title:
      "لپ تاپ 18 اینچی ایسوس مدل ROG Strix G18 G815LM-Core Ultra 9 275HX-RTX5060",
    cat: "کالای دیجیتال",
    img: UP + "2026/07/digikala-dkp-22126271-0-300x300.jpg",
    img2: UP + "2026/07/digikala-dkp-22126271-1-300x300.jpg",
    price: 439900000,
    old: 548000000,
    off: 20,
    rating: 4.7,
    sold: 7,
    stock: 7,
    colors: ["#4b5563", "#111827"],
    special: true,
  },
];

export const circleCats = [
  { fa: "لباس ورزشی", en: "jogging suit", img: P + "list-item-prk-1.png" },
  {
    fa: "لباس مردانه",
    en: "Men's Clothes",
    img: P + "cat1-pylvthi6zzteklo1tjjmh91xu358v76heyvx7hgdtu.png",
  },
  {
    fa: "لباس زنانه",
    en: "Women's Clothes",
    img: P + "cat2-pylvthi6zzteklo1tjjmh91xu358v76heyvx7hgdtu.png",
  },
  {
    fa: "لباس بچگانه",
    en: "Childrens Clothing",
    img: P + "tshirt-pylvthi6zzteklo1tjjmh91xu358v76heyvx7hgdtu.png",
  },
  {
    fa: "انواع کلاه",
    en: "Types of hats",
    img: P + "cat4-pylvthi6zzteklo1tjjmh91xu358v76heyvx7hgdtu.png",
  },
];

export const slides = [
  {
    img: W + "Mobile-Sliders-02.webp",
    title: "کالکشن زمستانه پارس کالا",
    sub: "تا ۶۰٪ تخفیف روی پوشاک برندهای اورجینال",
    cta: "مشاهده کالکشن",
    from: "#3b0a18",
    to: "#0b0b0f",
  },
  {
    img: W + "Mobile-Sliders.webp-01.webp",
    title: "جمعه سیاه پارس کالا",
    sub: "شگفت‌انگیزترین قیمت‌ها فقط تا پایان هفته",
    cta: "خرید با تخفیف",
    from: "#1b1030",
    to: "#0b0b0f",
  },
  {
    img: W + "Mobile-Sliders-03.webp",
    title: "کفش و کتونی اسپرت",
    sub: "نایکی • آدیداس • پوما با ضمانت اصالت کالا",
    cta: "ورود به دسته کفش",
    from: "#082f2a",
    to: "#0b0b0f",
  },
];

export const stripBanners = [
  { img: W + "002-2-1024x253.webp", from: "#4c0519", to: "#1c0a12" },
  { img: W + "black-friday-banner-1024x253.webp", from: "#111827", to: "#0a0a0d" },
  { img: W + "new-1024x253.webp", from: "#1e1b4b", to: "#0b0b12" },
];

export const services = [
  { t: "ارسال سریع کالا", img: P + "stopwatch-4799455-4002335-1.webp" },
  { t: "پرداخت در محل", img: P + "location-pin-4799457-4002337.webp" },
  { t: "پشتیبانی تلفنی", img: P + "winner-trophy-4799451-4002331.webp" },
  { t: "تضمین اصالت کالا", img: P + "star-badge-4799453-4002333.webp" },
];

export const shopCats = [
  { name: "مردانه", count: 20 },
  { name: "پوشاک", count: 13 },
  { name: "زنانه", count: 12 },
  { name: "کیف", count: 9 },
  { name: "کفش", count: 7 },
  { name: "کالای دیجیتال", count: 2 },
  { name: "ژاکت مردانه", count: 1 },
  { name: "کفش زنانه", count: 1 },
  { name: "کیف زنانه", count: 1 },
];

export const megaMenu: { title: string; icon: string; items: string[] }[] = [
  {
    title: "پوشاک مردانه",
    icon: "👔",
    items: ["پیراهن", "تیشرت و پولوشرت", "کت و شلوار", "کاپشن و پالتو", "شلوار جین", "هودی و سویشرت"],
  },
  {
    title: "پوشاک زنانه",
    icon: "👗",
    items: ["مانتو و شومیز", "شلوار و دامن", "بافت و پلیور", "پالتو زنانه", "لباس مجلسی", "ست ورزشی"],
  },
  {
    title: "کیف و کفش",
    icon: "👟",
    items: ["کتانی و اسنیکرز", "کفش رسمی", "بوت و نیم بوت", "کوله پشتی", "کیف دوشی", "کیف اداری"],
  },
  {
    title: "کالای دیجیتال",
    icon: "💻",
    items: ["گوشی موبایل", "لپ تاپ و اولترابوک", "هدفون و هدست", "ساعت هوشمند", "کنسول بازی", "لوازم جانبی"],
  },
  {
    title: "اکسسوری",
    icon: "🕶️",
    items: ["ساعت مچی", "عینک آفتابی", "کلاه", "کمربند", "شال و روسری", "جواهرات"],
  },
  {
    title: "ورزش و سفر",
    icon: "🏋️",
    items: ["لباس ورزشی", "کفش ورزشی", "چمدان", "لوازم کمپینگ", "دوچرخه", "مکمل ورزشی"],
  },
];

export const faqs = [
  {
    q: "چطور می‌توانم سفارشم را پیگیری کنم؟",
    a: "وارد سایت پارس کالا شوید. روی گزینه سفارش‌های من کلیک کنید. در این قسمت با کلیک روی جزییات می‌توانید سفارش خود را ببینید. می‌توانید در این قسمت روند آماده‌سازی و مراحل ارسال سفارش خود را پیگیری کنید.",
  },
  {
    q: "چطور میتوانم سفارشم را لغو کنم ؟",
    a: "شما میتوانید با مراجعه به پروفایل خود سفارش یا مرسوله ایی که از ارسال آن منصرف شدید را لغو نمایید. میتوانید برای مشاهده روند لغو سفارش به توضیحات تکمیلی مراجعه کنید.",
  },
  {
    q: "هزینه ی ارسال کالا چگونه محاسبه میشود؟",
    a: "هزینه ارسال بر اساس شیوه ارسال متفاوت است و در زمان ثبت سفارش نمایش داده می شود.",
  },
  {
    q: "چطور درخواست خود را جهت بازگرداندن کالا (مرجوعی کالا) به شما اطلاع دهم؟",
    a: "شما میتوانید از طریق فرم درخواست مرجوعی در حساب کاربری ، صفحه تماس با ما و تلفن درخواست خود را ثبت نمایید.",
  },
  {
    q: "شرایط گارانتی پارس کالا",
    a: "امروزه توجه به کیفیت کالا از مهمترین وظایف فروشندگان کالا است و خدمات پس از فروش ضامن حفظ این کیفیت می باشد. در همین راستا شرکت پارس کالا مفتخر به ارائه سرویس در اسرع وقت به مشتریان گرامی می باشد.",
  },
  {
    q: "شرایط استفاده از کد تخفیف اولین خرید چیست؟",
    a: "سیستم هوشمند پارس کالا، پس از بررسی حساب کاربری در صورتی که مالک آن مشتری جدید باشد خودکار اعمال می نماید.",
  },
];

export const blogPosts = [
  {
    title: "راهنمای کامل انتخاب کفش اسنیکرز اورجینال",
    cat: "راهنمای خرید",
    date: "۲۴ آذر ۱۴۰۴",
    img: W + "Group-14385.webp",
    local: LOCAL.shoeWhite,
  },
  {
    title: "۱۰ ترند پوشاک زمستانی که امسال نباید از دست بدهید",
    cat: "مد و فشن",
    date: "۱۸ آذر ۱۴۰۴",
    img: W + "Group-14372.webp",
    local: LOCAL.jacket,
  },
  {
    title: "چطور کیف چرم اصل را از تقلبی تشخیص دهیم؟",
    cat: "آموزش",
    date: "۰۹ آذر ۱۴۰۴",
    img: W + "Group-14382.webp",
    local: LOCAL.bag,
  },
  {
    title: "بهترین هدست‌های گیمینگ بازار ایران",
    cat: "کالای دیجیتال",
    date: "۰۲ آذر ۱۴۰۴",
    img: UP + "2026/07/digikala-dkp-20503688-0-300x300.jpg",
    local: LOCAL.tech,
  },
];

export const brands = [
  "NIKE",
  "ADIDAS",
  "PUMA",
  "ZARA",
  "LEVI'S",
  "ASUS",
  "REEBOK",
  "GUCCI",
  "LACOSTE",
  "NEW BALANCE",
];

export const footerCols = [
  { title: "خدمات ما", items: ["چگونگی ثبت سفارش", "چگونگی ارسال کالا", "چگونگی پرداخت"] },
  { title: "راهنمای خرید", items: ["معرفی تخفیف‌ها", "پرسش‌های متداول", "چگونگی بازگشت کالا"] },
  { title: "دسترسی سریع", items: ["درباره ما", "پیگیری سفارش", "تماس با ما"] },
];

export const appBadges = [
  "https://digital.parskalas.com/wp-content/uploads/2023/09/google_play.png",
  "https://digital.parskalas.com/wp-content/uploads/2023/09/android_app.png",
  "https://digital.parskalas.com/wp-content/uploads/2023/09/myket.png",
  "https://digital.parskalas.com/wp-content/uploads/2023/09/ios_app.png",
];

export const trustBadges = [
  "https://pars.parskalas.com/wp-content/uploads/2022/10/1e5dab5a.png",
  "https://pars.parskalas.com/wp-content/uploads/2022/10/samandehi.png",
  "https://pars.parskalas.com/wp-content/uploads/2022/10/enamad.png",
];

export const LOGO = P + "prk-logo-white.png";
export const LOGO_TYPE = W + "white-logo-type-pars.webp";
