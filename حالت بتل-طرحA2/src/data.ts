export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  tag?: "پرفروش" | "جدید" | "ویژه";
  cats: string[];
};

export const img = (id: number, w = 560, h = 560) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const fa = (n: number) => n.toLocaleString("fa-IR");

export const discountOf = (p: Product) =>
  p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

const P = (
  id: number,
  title: string,
  photo: number,
  price: number,
  oldPrice?: number,
  tag?: Product["tag"],
  cats: string[] = []
): Product => ({ id, title, image: img(photo), price, oldPrice, tag, cats });

export const products: Product[] = [
  P(1, "لپ‌تاپ اپل مک‌بوک پرو ۱۴ اینچ با پردازنده M3", 8534378, 84500000, 89900000, "پرفروش", ["best", "deals", "electronics"]),
  P(2, "لپ‌تاپ ایسوس روگ استرایکس گیمینگ ۱۶ اینچ", 19269762, 72800000, 78200000, "ویژه", ["deals", "electronics"]),
  P(3, "گوشی هوشمند اپل آیفون ۱۵ پرو مکس ۲۵۶ گیگابایت", 30639091, 78900000, 82500000, "پرفروش", ["best", "electronics"]),
  P(4, "گوشی هوشمند سامسونگ گلکسی S24 اولترا", 20360361, 68400000, 71900000, undefined, ["deals", "electronics"]),
  P(5, "هدفون بی‌سیم نویز کنسلینگ سونی WH-1000XM5", 7772548, 34500000, 39800000, "پرفروش", ["best", "electronics"]),
  P(6, "هدست بی‌سیم گیمینگ JBL Quantum 900", 8038326, 28700000, 31500000, undefined, ["deals", "electronics"]),
  P(7, "ساعت هوشمند اپل واچ سری ۸ مدل ۴۵ میلی‌متری", 13007642, 42900000, 47500000, "پرفروش", ["best", "electronics"]),
  P(8, "ساعت هوشمند سامسونگ گالکسی واچ ۶ کلاسیک", 5237704, 19800000, 22400000, "جدید", ["deals", "electronics"]),
  P(9, "کفش ورزشی نایک ایرمکس ۲۷۰", 12628400, 12500000, 15900000, "پرفروش", ["best", "shoes", "men"]),
  P(10, "کفش پیاده‌روی آدیداس اولترابوست", 9537434, 9800000, 12200000, undefined, ["shoes", "men"]),
  P(11, "کفش رانینگ دوگانه پوما", 6540997, 8400000, 10900000, "جدید", ["shoes", "women"]),
  P(12, "کفش پاشنه‌بلند زنانه مدل تابستانه", 10827097, 3600000, 4500000, undefined, ["shoes", "women"]),
  P(13, "کفش پاشنه‌بلند چرم طبیعی زنانه", 12687623, 4100000, 5200000, "ویژه", ["shoes", "women"]),
  P(14, "کیف دستی زنانه چرم طبیعی", 27174573, 4300000, 5600000, "پرفروش", ["best", "bags", "women"]),
  P(15, "ست کیف زنانه چرم مدل ۲۰۲", 21897127, 3900000, 4800000, "جدید", ["bags", "women"]),
  P(16, "کیف شانه‌ای زنانه مدل جدید", 21897309, 3200000, 3900000, undefined, ["bags", "women"]),
  P(17, "مانتو بلند زنانه مدل پاییزه", 37015070, 2850000, 3400000, "جدید", ["clothes", "women", "deals"]),
  P(18, "لباس مجلسی زنانه مدل رسمی", 34160661, 5400000, 6800000, "ویژه", ["clothes", "women"]),
  P(19, "مانتو شب زنانه مدل کرپ", 18586865, 3100000, 3700000, undefined, ["clothes", "women"]),
  P(20, "تاپ و شلوار جین زنانه ست", 1107604, 2450000, 2900000, undefined, ["clothes", "women"]),
  P(21, "ست استایل مردانه: پیراهن کاردستی و شلوار جین", 3944693, 3300000, 3950000, "جدید", ["clothes", "men"]),
  P(22, "شال و کیف دستی مردانه کتان", 3944690, 1900000, 2300000, undefined, ["clothes", "men"]),
  P(23, "عطر اورجینال زنانه آرسد ۱۰۰ میلی‌لیتر", 7703038, 6200000, 7500000, "پرفروش", ["best", "beauty", "women"]),
  P(24, "ادکلن زنانه زارا مدل جدید ۷۵ میلی‌لیتر", 14736080, 2900000, 3600000, "جدید", ["beauty", "women"]),
  P(25, "کرم‌پودر فیتین پالت ۲۴ رنگه", 1327689, 1450000, 1850000, undefined, ["beauty", "women"]),
  P(26, "ست لوازم آرایش حرفه‌ای ۱۲ عددی", 3148938, 2700000, 3300000, "ویژه", ["beauty", "women"]),
  P(27, "کرم فیکس و کاندیسر ست", 7256102, 980000, 1250000, undefined, ["beauty", "women"]),
  P(28, "تلویزیون هوشمند ال‌جی ۶۵ اینچ", 7546648, 98000000, 112000000, "پرفروش", ["best", "deals", "home"]),
  P(29, "تلویزیون ال‌سی‌دی سامسونگ ۵۵ اینچ", 7587783, 54500000, 61000000, undefined, ["home"]),
  P(30, "ماشین اسپرسوساز فیلیپس مدل EP2220", 18272580, 8900000, 10500000, "پرفروش", ["home"]),
  P(31, "دستگاه اسپرسوساز دلتا مدل پلنتا", 5638847, 12400000, 13800000, undefined, ["home"]),
];

export const byCat = (cat: string, limit = 8) =>
  products.filter((p) => p.cats.includes(cat)).slice(0, limit);

export const bestSellers = byCat("best", 10);
export const deals = byCat("deals", 8);
export const womenLatest = byCat("women", 10);

export const tabs = [
  { key: "bags", label: "کیف زنانه" },
  { key: "clothes", label: "پوشاک" },
  { key: "shoes", label: "کفش زنانه" },
  { key: "beauty", label: "عطر و آرایش" },
] as const;

export const byTab = (key: string) => products.filter((p) => p.cats.includes(key));

export const categories = [
  { icon: "phone", label: "موبایل و تبلت" },
  { icon: "laptop", label: "لپ‌تاپ" },
  { icon: "monitor", label: "کامپیوتر" },
  { icon: "tv", label: "لوازم خانگی" },
  { icon: "gamepad", label: "گیمینگ" },
  { icon: "shoe", label: "کفش" },
  { icon: "bag", label: "کیف و کوله" },
  { icon: "dress", label: "پوشاک زنانه" },
  { icon: "tshirt", label: "پوشاک مردانه" },
  { icon: "cream", label: "آرایشی و بهداشتی" },
  { icon: "dumbbell", label: "ورزش و سفر" },
  { icon: "book", label: "کتاب و لوازم تحریر" },
] as const;

export const slides = [
  {
    badge: "فروش ویژه پاییز",
    title: "جشنواره‌ی فروش پارس کالا",
    desc: "تا ۷۰٪ تخفیف موبایل، لپ‌تاپ و لوازم جانبی؛ فقط تا پایان هفته",
    cta: "مشاهده محصولات",
    image: img(30639091, 640, 640),
    from: "from-[#123722]",
    glow: "bg-accent/25",
  },
  {
    badge: "کالکشن جدید ۲۰۲۵",
    title: "لپ‌تاپ‌های نسل جدید",
    desc: "با گارانتی ۱۸ ماهه، ارسال فوری و پشتیبانی ۲۴ ساعته",
    cta: "مشاهده لپ‌تاپ‌ها",
    image: img(19269762, 640, 640),
    from: "from-[#101d3a]",
    glow: "bg-sky-400/20",
  },
  {
    badge: "تخفیف باورنکردنی",
    title: "صدای حرفه‌ای، قیمت استثنایی",
    desc: "مجموعه‌ی کامل هدفون و اسپیکر برندهای معتبر جهانی",
    cta: "خرید هدفون",
    image: img(7772548, 640, 640),
    from: "from-[#2d1a3a]",
    glow: "bg-fuchsia-400/20",
  },
];

export const promoCards = [
  {
    tag: "تا ۴۰٪ تخفیف",
    title: "گوشی‌های هوشمند",
    image: img(20360361, 560, 700),
    grad: "from-[#132a4d] via-panel to-ink-2",
  },
  {
    tag: "جشنواره کفش",
    title: "از ۳۹۹ هزار تومان",
    image: img(12628400, 560, 700),
    grad: "from-[#3a2412] via-panel to-ink-2",
  },
  {
    tag: "تا ۳۵٪ تخفیف",
    title: "عطر و ادکلن",
    image: img(15096784, 560, 700),
    grad: "from-[#2a1240] via-panel to-ink-2",
  },
  {
    tag: "ارسال رایگان",
    title: "لوازم خانگی هوشمند",
    image: img(18272580, 560, 700),
    grad: "from-[#123722] via-panel to-ink-2",
  },
];

export const sideBanners = [
  {
    tag: "جشنواره فصلی",
    title: "تا ۵۰٪ تخفیف پوشاک",
    image: img(34160661, 560, 560),
    grad: "from-[#3a1220] via-panel to-ink-2",
  },
  {
    tag: "تجربه‌ی سینمایی",
    title: "تلویزیون‌های هوشمند",
    image: img(7546648, 560, 560),
    grad: "from-[#101d3a] via-panel to-ink-2",
  },
];

export const tripleBanners = [
  {
    tag: "کالکشن پاییزه",
    title: "لباس مجلسی زنانه",
    image: img(37015070, 560, 700),
    grad: "from-[#3a1224] via-panel to-ink-2",
  },
  {
    tag: "چرم طبیعی",
    title: "کیف‌های شیک زنانه",
    image: img(27174573, 560, 700),
    grad: "from-[#3a2a12] via-panel to-ink-2",
  },
  {
    tag: "ارسال رایگان",
    title: "تلویزیون و صوتی-تصویری",
    image: img(7587783, 560, 700),
    grad: "from-[#12203a] via-panel to-ink-2",
  },
];

export const brands = [
  "Apple", "Samsung", "Sony", "Nike", "Adidas", "Philips", "HP", "LG", "JBL", "Canon",
];

export const features = [
  { icon: "spark", title: "انتخابی هوشمندانه", desc: "پیشنهاد بر اساس علاقه‌مندی شما" },
  { icon: "shield", title: "ضمانت اصالت", desc: "تضمین اصل بودن تمامی کالاها" },
  { icon: "wallet", title: "پرداخت آنلاین", desc: "از طریق تمامی درگاه‌های بانکی" },
  { icon: "zap", title: "ارسال فوری", desc: "تحویل سریع به سراسر کشور" },
  { icon: "store", title: "تحویل حضوری", desc: "امکان تحویل در فروشگاه" },
  { icon: "gift", title: "باشگاه مشتریان", desc: "امتیاز در ازای هر خرید" },
] as const;

export const navLinks = [
  { label: "فروش ویژه", href: "#deals", accent: true },
  { label: "پرفروش‌ترین‌ها", href: "#best" },
  { label: "جدیدترین‌ها", href: "#women" },
  { label: "تخفیف روزانه", href: "#deals" },
  { label: "مردانه", href: "#men" },
  { label: "زنانه", href: "#women" },
  { label: "موبایل و تبلت", href: "#best" },
  { label: "لوازم جانبی", href: "#best" },
  { label: "کالای دیجیتال", href: "#deals" },
  { label: "برندها", href: "#brands" },
];

export const popularSearches = ["اپل واچ", "مک‌بوک سری ۸", "آیفون ۱۵", "هدفون سونی", "کفش نایک"];
