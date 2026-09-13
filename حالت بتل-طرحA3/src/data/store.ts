export type Category = "mobile" | "laptop" | "audio" | "wearable" | "gaming";

export type Product = {
  id: number;
  title: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  ratingCount: number;
  image: string;
  badge?: string;
  stock: number;
  soldPercent?: number;
  specs: string[];
  amazing?: boolean;
};

export const CAT_LABEL: Record<Category, string> = {
  mobile: "موبایل و تبلت",
  laptop: "لپ‌تاپ",
  audio: "صوتی و تصویری",
  wearable: "پوشیدنی هوشمند",
  gaming: "گیمینگ",
};

const img = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "گوشی موبایل اپل مدل iPhone 15 Pro Max ظرفیت 256 گیگابایت",
    category: "mobile",
    price: 89_500_000,
    oldPrice: 94_000_000,
    rating: 4.8,
    ratingCount: 214,
    image: img(15916262),
    badge: "پرفروش",
    stock: 5,
    soldPercent: 72,
    amazing: true,
    specs: ["تراشه A17 Pro با معماری ۳ نانومتری", "دوربین سه‌گانه ۴۸ مگاپیکسلی", "نمایشگر ۶.۷ اینچی Super Retina XDR", "بدنه تیتانیومی سبک و مقاوم"],
  },
  {
    id: 2,
    title: "گوشی موبایل سامسونگ مدل Galaxy S24 Ultra ظرفیت 512 گیگابایت",
    category: "mobile",
    price: 72_900_000,
    oldPrice: 78_500_000,
    rating: 4.7,
    ratingCount: 189,
    image: img(13570132),
    stock: 8,
    soldPercent: 64,
    amazing: true,
    specs: ["قلم S Pen داخلی", "دوربین ۲۰۰ مگاپیکسلی با زوم فضایی", "هوش مصنوعی Galaxy AI", "نمایشگر Dynamic AMOLED 2X"],
  },
  {
    id: 3,
    title: "گوشی موبایل شیائومی مدل Redmi Note 13 Pro ظرفیت 256 گیگابایت",
    category: "mobile",
    price: 15_490_000,
    oldPrice: 17_200_000,
    rating: 4.5,
    ratingCount: 342,
    image: img(10883732),
    stock: 22,
    specs: ["دوربین اصلی ۲۰۰ مگاپیکسلی", "شارژ سریع ۶۷ واتی", "نمایشگر AMOLED 120Hz", "رم ۸ گیگابایت"],
  },
  {
    id: 4,
    title: "گوشی موبایل ناتینگ مدل Phone (2a) ظرفیت 256 گیگابایت و رم 12",
    category: "mobile",
    price: 19_990_000,
    oldPrice: 22_500_000,
    rating: 4.4,
    ratingCount: 97,
    image: img(12969242),
    stock: 6,
    soldPercent: 58,
    amazing: true,
    specs: ["طراحی شفاف منحصربه‌فرد", "رابط کاربری Nothing OS", "نمایشگر AMOLED 120Hz", "باتری ۵۰۰۰ میلی‌آمپری"],
  },
  {
    id: 5,
    title: "گوشی موبایل آنر مدل Magic 6 Pro ظرفیت 512 گیگابایت",
    category: "mobile",
    price: 42_800_000,
    oldPrice: 45_000_000,
    rating: 4.6,
    ratingCount: 76,
    image: img(19582386),
    badge: "جدید",
    stock: 9,
    specs: ["دوربین تله‌فوتو پریسکوپی", "شارژ بی‌سیم ۸۰ واتی", "نمایشگر LTPO با روشنایی ۵۰۰۰ نیت", "مقاومت IP68"],
  },
  {
    id: 6,
    title: "تبلت اپل مدل iPad Air M2 به همراه قلم هوشمند",
    category: "mobile",
    price: 38_700_000,
    oldPrice: 41_000_000,
    rating: 4.9,
    ratingCount: 58,
    image: img(33632614),
    stock: 11,
    specs: ["تراشه Apple M2", "نمایشگر ۱۱ اینچی Liquid Retina", "پشتیبانی از Apple Pencil Pro", "بدنه آلومینیومی بازیافتی"],
  },
  {
    id: 7,
    title: "لپ‌تاپ ایسوس مدل Zenbook 14 OLED پردازنده Core Ultra 7",
    category: "laptop",
    price: 54_200_000,
    oldPrice: 58_900_000,
    rating: 4.7,
    ratingCount: 121,
    image: img(12882908),
    badge: "پرفروش",
    stock: 7,
    specs: ["نمایشگر OLED 2.8K با دقت رنگ سینمایی", "وزن تنها ۱.۲ کیلوگرم", "باتری با شارژدهی ۱۵ ساعت", "رم ۱۶ گیگابایت LPDDR5X"],
  },
  {
    id: 8,
    title: "لپ‌تاپ لنوو مدل Legion 5 Pro گرافیک RTX 4060",
    category: "laptop",
    price: 78_400_000,
    oldPrice: 84_000_000,
    rating: 4.8,
    ratingCount: 88,
    image: img(7610451),
    badge: "جدید",
    stock: 4,
    specs: ["پردازنده Ryzen 7 نسل ۸", "نمایشگر ۱۶ اینچی 240Hz", "سیستم خنک‌کننده Coldfront", "کیبورد RGB کامل"],
  },
  {
    id: 9,
    title: "هدفون بی‌سیم جی‌بی‌ال مدل Tune 770NC نویزکنسلینگ",
    category: "audio",
    price: 4_890_000,
    oldPrice: 5_600_000,
    rating: 4.5,
    ratingCount: 203,
    image: img(3081173),
    stock: 30,
    specs: ["حذف نویز فعال Adaptive", "تا ۷۰ ساعت شارژدهی", "صدای Pure Bass", "اتصال هم‌زمان دو دستگاه"],
  },
  {
    id: 10,
    title: "هدفون بی‌سیم سونی مدل WH-1000XM5 مشکی",
    category: "audio",
    price: 16_900_000,
    oldPrice: 18_500_000,
    rating: 4.9,
    ratingCount: 315,
    image: img(10292805),
    badge: "پرفروش",
    stock: 12,
    specs: ["بهترین حذف نویز دنیا", "۳۰ ساعت شارژدهی", "درایور ۳۰ میلی‌متری کربنی", "میکروفون‌های هوشمند مکالمه"],
  },
  {
    id: 11,
    title: "هدفون بی‌سیم بیتس مدل Studio Pro نقره‌ای",
    category: "audio",
    price: 14_200_000,
    oldPrice: 17_800_000,
    rating: 4.4,
    ratingCount: 87,
    image: img(577768),
    stock: 3,
    soldPercent: 81,
    amazing: true,
    specs: ["صدای فراگیر Spatial Audio", "حالت شفافیت صدا", "تا ۴۰ ساعت شارژدهی", "کیف حمل اختصاصی"],
  },
  {
    id: 12,
    title: "هدفون بی‌سیم انکر مدل Soundcore Space Q45",
    category: "audio",
    price: 6_350_000,
    oldPrice: 7_900_000,
    rating: 4.6,
    ratingCount: 240,
    image: img(9154412),
    stock: 4,
    soldPercent: 67,
    amazing: true,
    specs: ["حذف نویز تا ۹۸٪", "۵۰ ساعت شارژدهی", "درایورهای ابریشمی ۴۰ میلی‌متری", "پشتیبانی از LDAC"],
  },
  {
    id: 13,
    title: "ایرپاد بی‌سیم اپل مدل AirPods Pro 2 با کیس USB-C",
    category: "audio",
    price: 12_750_000,
    oldPrice: 13_900_000,
    rating: 4.8,
    ratingCount: 402,
    image: img(6700057),
    stock: 18,
    specs: ["تراشه H2 اپل", "حذف نویز دو برابلی نسل قبل", "صدای تطبیقی Adaptive Audio", "مقاومت IP54"],
  },
  {
    id: 14,
    title: "هندزفری بی‌سیم کیو‌سی‌وای مدل TWS ANC",
    category: "audio",
    price: 1_290_000,
    oldPrice: 1_800_000,
    rating: 4.2,
    ratingCount: 511,
    image: img(18542286),
    stock: 2,
    soldPercent: 88,
    amazing: true,
    specs: ["حالت گیمینگ با تاخیر کم", "کنترل لمسی", "شارژدهی ۲۴ ساعته با کیس", "بلوتوث ۵.۳"],
  },
  {
    id: 15,
    title: "ساعت هوشمند اپل مدل Apple Watch Series 9 سایز 45",
    category: "wearable",
    price: 27_300_000,
    oldPrice: 29_800_000,
    rating: 4.8,
    ratingCount: 145,
    image: img(13007642),
    badge: "پرفروش",
    stock: 10,
    specs: ["تراشه S9 با نمایشگر روشن‌تر", "سنسور اکسیژن خون و نوار قلب", "ژست حرکتی Double Tap", "بدنه آلومینیومی"],
  },
  {
    id: 16,
    title: "ساعت هوشمند امیزفیت مدل GTR 4 بند چرمی",
    category: "wearable",
    price: 8_940_000,
    oldPrice: 10_500_000,
    rating: 4.5,
    ratingCount: 167,
    image: img(39076652),
    stock: 6,
    soldPercent: 55,
    amazing: true,
    specs: ["۱۴ روز شارژدهی", "مسیریاب ماهواره‌ای دقیق", "۱۵۰ حالت ورزشی", "مکالمه بلوتوثی"],
  },
  {
    id: 17,
    title: "ساعت هوشمند سامسونگ مدل Galaxy Watch 6 Classic",
    category: "wearable",
    price: 13_600_000,
    oldPrice: 15_200_000,
    rating: 4.6,
    ratingCount: 132,
    image: img(3646165),
    stock: 14,
    specs: ["بزل چرخان کلاسیک", "سنسور BioActive سه‌گانه", "نمایشگر Sapphire Crystal", "بند یک‌کلیکه"],
  },
  {
    id: 18,
    title: "دسته بازی سونی مدل DualShock 4 نسخه قرمز آتشین",
    category: "gaming",
    price: 4_150_000,
    oldPrice: 4_900_000,
    rating: 4.7,
    ratingCount: 356,
    image: img(2323435),
    stock: 5,
    soldPercent: 76,
    amazing: true,
    specs: ["اتصال بی‌سیم و USB", "تاچ‌پد و اسپیکر داخلی", "سازگار با PC و PS4", "لرزش دوگانه دقیق"],
  },
  {
    id: 19,
    title: "کنسول بازی دستی ولو مدل Steam Deck OLED ظرفیت 512",
    category: "gaming",
    price: 46_500_000,
    oldPrice: 49_900_000,
    rating: 4.9,
    ratingCount: 64,
    image: img(14005916),
    badge: "جدید",
    stock: 3,
    specs: ["نمایشگر OLED HDR با ۹۰Hz", "باتری با ۵۰٪ شارژدهی بیشتر", "کتابخانه کامل استیم", "وای‌فای 6E پرسرعت"],
  },
  {
    id: 20,
    title: "کنسول بازی نینتندو مدل Switch نسخه Retro Edition",
    category: "gaming",
    price: 18_200_000,
    oldPrice: 20_400_000,
    rating: 4.6,
    ratingCount: 228,
    image: img(10389703),
    stock: 9,
    specs: ["سه حالت بازی: دستی، رومیزی، تلویزیون", "دو کنترلر جداشونده", "خروجی 1080p روی داک", "کتابخانه بازی‌های انحصاری"],
  },
];

export const SLIDES = [
  {
    id: 1,
    chip: "پیشنهاد ویژه",
    kicker: "آیفون ۱۵ پرو مکس؛ پادشاهِ شب",
    sub: "تا ۱۲٪ تخفیف جشنواره‌ای به همراه ارسال فوری رایگان برای سفارش‌های بالای ۵ میلیون تومان",
    image: img(15916262),
    productId: 1,
    stats: ["گارانتی ۱۸ ماهه", "رجیسترشده", "ارسال از انبار تهران"],
  },
  {
    id: 2,
    chip: "تازه رسیده",
    kicker: "قدرتِ کنسول، توی مُشتِ شما",
    sub: "استیم دک OLED با نمایشگر خیره‌کننده HDR و دسترسی به هزاران بازی، همه‌جا همراه شماست",
    image: img(14005916),
    productId: 19,
    stats: ["نمایشگر OLED 90Hz", "۵۱۲ گیگابایت", "تحویل اکسپرس"],
  },
  {
    id: 3,
    chip: "تا ۲۰٪ تخفیف",
    kicker: "سکوت را با کیفیت بشنوید",
    sub: "هدفون‌های نویزکنسلینگ سونی و بیتس با ۳۰ ساعت شارژدهی و گارانتی معتبر شب‌بازار",
    image: img(10292805),
    productId: 10,
    stats: ["حذف نویز فعال", "۳۰ ساعت شارژدهی", "۷ روز ضمانت بازگشت"],
  },
];

export const ARTICLES = [
  {
    id: 1,
    title: "راهنمای خرید گوشی میان‌رده در سال ۱۴۰۴؛ ۷ نکته‌ی طلایی",
    excerpt: "قبل از خرید گوشی میان‌رده، این هفت معیار را بشناسید تا با بودجه‌ی محدود، بهترین انتخاب را داشته باشید.",
    cat: "راهنمای خرید",
    date: "۱۲ دی ۱۴۰۴",
    read: "۸ دقیقه",
    image: img(19582386),
  },
  {
    id: 2,
    title: "مقایسه‌ی بهترین لپ‌تاپ‌های دانشجویی؛ از لنوو تا ایسوس",
    excerpt: "سه لپ‌تاپ پرفروش دانشجویی را از نظر وزن، شارژدهی و ارزش خرید در مقابل قیمت بررسی کردیم.",
    cat: "مقایسه",
    date: "۸ دی ۱۴۰۴",
    read: "۱۲ دقیقه",
    image: img(32774292),
  },
  {
    id: 3,
    title: "بهترین تبلت‌ها برای طراحی و جزوه‌نویسی دیجیتال",
    excerpt: "اگر قلم برایتان مهم است، این مقایسه‌ی تبلت‌های محبوب را پیش از انتخاب از دست ندهید.",
    cat: "بررسی",
    date: "۳ دی ۱۴۰۴",
    read: "۶ دقیقه",
    image: img(33632614),
  },
];

export const BRANDS = [
  "APPLE",
  "SAMSUNG",
  "XIAOMI",
  "SONY",
  "ASUS",
  "LENOVO",
  "HUAWEI",
  "JBL",
  "ANKER",
  "HONOR",
  "HP",
  "LG",
];

export const NAV_LINKS = [
  { label: "شگفت‌انگیزها", href: "#amazing", hot: true },
  { label: "پرفروش‌ترین‌ها", href: "#bestsellers" },
  { label: "موبایل و تبلت", href: "#bestsellers" },
  { label: "لپ‌تاپ", href: "#bestsellers" },
  { label: "صوتی و تصویری", href: "#bestsellers" },
  { label: "گیمینگ", href: "#gaming" },
  { label: "پوشیدنی‌ها", href: "#wearables" },
  { label: "وبلاگ", href: "#blog" },
  { label: "تماس با ما", href: "#contact" },
];

export const MEGA_MENU: { title: string; cat: Category; links: string[] }[] = [
  { title: "موبایل و تبلت", cat: "mobile", links: ["گوشی اپل", "گوشی سامسونگ", "گوشی شیائومی", "تبلت", "لوازم جانبی گوشی"] },
  { title: "لپ‌تاپ", cat: "laptop", links: ["لپ‌تاپ ایسوس", "لپ‌تاپ لنوو", "لپ‌تاپ گیمینگ", "لپ‌تاپ دانشجویی", "اولترابوک"] },
  { title: "صوتی و تصویری", cat: "audio", links: ["هدفون بی‌سیم", "ایرپاد", "اسپیکر بلوتوثی", "ساندبار", "سینمای خانگی"] },
  { title: "گیمینگ", cat: "gaming", links: ["کنسول بازی", "دسته بازی", "کنسول دستی", "هدست گیمینگ", "صندلی گیمینگ"] },
  { title: "پوشیدنی هوشمند", cat: "wearable", links: ["ساعت هوشمند", "اپل واچ", "مچ‌بند سلامتی", "بند ساعت", "هندزفری ورزشی"] },
];

/* ---------- helpers ---------- */

export const faNum = (v: number | string): string =>
  String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export const faPrice = (n: number): string => n.toLocaleString("fa-IR");

export const discountOf = (p: Product): number =>
  p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

export const byId = (id: number): Product => PRODUCTS.find((p) => p.id === id)!;

export const amazingProducts = PRODUCTS.filter((p) => p.amazing);

export const bestRated = [...PRODUCTS].sort((a, b) => b.ratingCount - a.ratingCount);
