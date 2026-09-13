export type Product = {
  id: number;
  title: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  badge?: string;
  installment?: boolean;
};

export const categories = [
  { id: 1, title: "گوشی و موبایل", icon: "Smartphone" },
  { id: 2, title: "لپ‌تاپ", icon: "Laptop" },
  { id: 3, title: "ساعت هوشمند", icon: "Watch" },
  { id: 4, title: "هدفون و هدست", icon: "Headphones" },
  { id: 5, title: "تبلت", icon: "Tablet" },
  { id: 6, title: "دوربین", icon: "Camera" },
  { id: 7, title: "اسپیکر", icon: "Speaker" },
  { id: 8, title: "کنسول بازی", icon: "Gamepad2" },
  { id: 9, title: "لوازم خانگی", icon: "Refrigerator" },
  { id: 10, title: "کیف و کوله", icon: "Briefcase" },
];

export const megaMenu = [
  {
    title: "گوشی و موبایل",
    items: ["اپل", "سامسونگ", "شیائومی", "هواوی", "نوکیا", "ریلمی"],
  },
  {
    title: "لپ‌تاپ",
    items: ["اپل", "ایسوس", "لنوو", "اچ‌پی", "دل", "مایکروسافت"],
  },
  {
    title: "لوازم جانبی",
    items: ["پاوربانک", "کابل و شارژر", "کیف و قاب", "هندزفری", "مموری"],
  },
  {
    title: "کالای دیجیتال",
    items: ["دوربین", "کنسول بازی", "اسپیکر", "ساعت هوشمند", "تلویزیون"],
  },
];

const img = (name: string) => `/images/products/${name}`;

export const products: Product[] = [
  {
    id: 1,
    title: "گوشی موبایل مدل Pro Max ظرفیت ۲۵۶ گیگابایت",
    brand: "پارس‌فون",
    image: img("phone.jpg"),
    price: 42500000,
    oldPrice: 48900000,
    discount: 13,
    rating: 4.6,
    reviews: 342,
    badge: "پرفروش",
    installment: true,
  },
  {
    id: 2,
    title: "لپ‌تاپ ۱۵.۶ اینچی مدل UltraBook نسل ۱۳",
    brand: "پارس‌بوک",
    image: img("laptop.jpg"),
    price: 68900000,
    oldPrice: 75500000,
    discount: 9,
    rating: 4.8,
    reviews: 210,
    badge: "شگفت‌انگیز",
    installment: true,
  },
  {
    id: 3,
    title: "ساعت هوشمند سری ۷ ضدآب با صفحه آمولد",
    brand: "پارس‌واچ",
    image: img("watch.jpg"),
    price: 8900000,
    oldPrice: 11500000,
    discount: 22,
    rating: 4.4,
    reviews: 528,
    installment: true,
  },
  {
    id: 4,
    title: "هدفون بی‌سیم مدل Studio با حذف نویز فعال",
    brand: "ساندمکس",
    image: img("headphone.jpg"),
    price: 5200000,
    oldPrice: 6900000,
    discount: 25,
    rating: 4.7,
    reviews: 891,
    badge: "پیشنهاد ویژه",
  },
  {
    id: 5,
    title: "تبلت ۱۱ اینچی ظرفیت ۱۲۸ گیگابایت به همراه قلم",
    brand: "پارس‌تب",
    image: img("tablet.jpg"),
    price: 24900000,
    oldPrice: 27500000,
    discount: 10,
    rating: 4.5,
    reviews: 156,
    installment: true,
  },
  {
    id: 6,
    title: "دوربین بدون آینه حرفه‌ای همراه با لنز ۱۸-۵۵",
    brand: "فوتوپرو",
    image: img("camera.jpg"),
    price: 55900000,
    oldPrice: 61000000,
    discount: 8,
    rating: 4.9,
    reviews: 74,
  },
  {
    id: 7,
    title: "اسپیکر بلوتوثی قابل حمل ضدآب باس قوی",
    brand: "ساندمکس",
    image: img("speaker.jpg"),
    price: 3200000,
    oldPrice: 4500000,
    discount: 29,
    rating: 4.3,
    reviews: 640,
    badge: "شگفت‌انگیز",
  },
  {
    id: 8,
    title: "کنسول بازی نسل نهم به همراه یک دسته اضافه",
    brand: "پلی‌تک",
    image: img("console.jpg"),
    price: 39900000,
    oldPrice: 43900000,
    discount: 9,
    rating: 4.8,
    reviews: 302,
    installment: true,
  },
];

export const heroSlides = [
  {
    id: 1,
    image: "/images/hero-banner.jpg",
    title: "جشنواره فروش ویژه دیجیتال",
    subtitle: "تا ۴۰٪ تخفیف برای موبایل و لپ‌تاپ",
    cta: "مشاهده محصولات",
  },
  {
    id: 2,
    image: "/images/hero-banner2.jpg",
    title: "پیشنهادهای شگفت‌انگیز هر روز",
    subtitle: "ساعت هوشمند و هدفون با بهترین قیمت",
    cta: "خرید کنید",
  },
];
