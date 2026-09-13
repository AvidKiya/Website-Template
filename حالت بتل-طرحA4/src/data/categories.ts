import type { Category } from "./types";
import { img } from "./media";

export const categories: Category[] = [
  {
    id: "c1",
    slug: "mens-fashion",
    title: "پوشاک مردانه",
    subtitle: "بیش از ۱٬۲۰۰ کالا",
    icon: "shirt",
    image: img(38652616, 700),
    description:
      "مجموعه‌ای کامل از پوشاک مردانه شامل پیراهن، تی‌شرت، شلوار جین، کت و سویشرت از برندهای داخلی و وارداتی. همه کالاها دارای ضمانت اصالت و امکان بازگشت هفت روزه هستند.",
    children: [
      { title: "پیراهن و تی‌شرت", slug: "mens-shirts" },
      { title: "شلوار و جین", slug: "mens-pants" },
      { title: "کت و پالتو", slug: "mens-coats" },
      { title: "سویشرت و هودی", slug: "mens-hoodies" },
    ],
  },
  {
    id: "c2",
    slug: "womens-fashion",
    title: "پوشاک زنانه",
    subtitle: "بیش از ۲٬۴۰۰ کالا",
    icon: "dress",
    image: img(38652623, 700),
    description:
      "جدیدترین مدل‌های پوشاک زنانه از مانتو و شومیز تا لباس مجلسی و ست‌های راحتی؛ انتخابی دقیق از کالکشن فصل با تنوع رنگ و سایز کامل.",
    children: [
      { title: "مانتو و شومیز", slug: "women-manto" },
      { title: "لباس مجلسی", slug: "women-party" },
      { title: "شلوار و دامن", slug: "women-pants" },
      { title: "ست راحتی", slug: "women-home" },
    ],
  },
  {
    id: "c3",
    slug: "shoes",
    title: "کیف و کفش",
    subtitle: "بیش از ۹۰۰ کالا",
    icon: "footprints",
    image: img(27256462, 700),
    description:
      "کفش روزمره، رسمی، ورزشی و بوت زنانه و مردانه در کنار کیف‌های دست‌دوز چرمی؛ همگی با جدول سایزبندی دقیق و امکان تعویض رایگان سایز.",
    children: [
      { title: "کفش روزمره", slug: "casual-shoes" },
      { title: "کفش ورزشی", slug: "sport-shoes" },
      { title: "بوت و نیم‌بوت", slug: "boots" },
      { title: "کیف چرم", slug: "leather-bags" },
    ],
  },
  {
    id: "c4",
    slug: "watches",
    title: "ساعت و زیورآلات",
    subtitle: "بیش از ۵۰۰ کالا",
    icon: "watch",
    image: img(8839887, 700),
    description:
      "ساعت‌های مچی مکانیکی و کوارتز، دستبند، گردنبند و ست‌های هدیه با ضمانت اصالت کالا و گارانتی تعویض موتور.",
    children: [
      { title: "ساعت مردانه", slug: "mens-watch" },
      { title: "ساعت زنانه", slug: "womens-watch" },
      { title: "دستبند و گردنبند", slug: "jewelry" },
      { title: "ست هدیه", slug: "gift-set" },
    ],
  },
  {
    id: "c5",
    slug: "beauty",
    title: "آرایشی و بهداشتی",
    subtitle: "بیش از ۱٬۸۰۰ کالا",
    icon: "sparkles",
    image: img(24602077, 700),
    description:
      "محصولات مراقبت از پوست و مو، لوازم آرایش و عطر با تضمین اصالت و تاریخ انقضای معتبر؛ ارسال با بسته‌بندی ایمن و محافظت‌شده.",
    children: [
      { title: "مراقبت پوست", slug: "skincare" },
      { title: "لوازم آرایش", slug: "makeup" },
      { title: "عطر و ادکلن", slug: "perfume" },
      { title: "مراقبت مو", slug: "haircare" },
    ],
  },
  {
    id: "c6",
    slug: "digital",
    title: "کالای دیجیتال",
    subtitle: "بیش از ۷۰۰ کالا",
    icon: "headphones",
    image: img(3394650, 700),
    description:
      "هدفون، هندزفری، ساعت هوشمند و لوازم جانبی موبایل با گارانتی معتبر شرکتی و امکان بررسی کالا هنگام تحویل.",
    children: [
      { title: "هدفون و هندزفری", slug: "headphones" },
      { title: "ساعت هوشمند", slug: "smartwatch" },
      { title: "لوازم جانبی", slug: "accessories" },
      { title: "اسپیکر", slug: "speakers" },
    ],
  },
  {
    id: "c7",
    slug: "sport",
    title: "ورزش و سفر",
    subtitle: "بیش از ۴۰۰ کالا",
    icon: "dumbbell",
    image: img(2364580, 700),
    description:
      "پوشاک و تجهیزات ورزشی، کوله‌پشتی و لوازم سفر برای تمرین روزانه و سفرهای طولانی.",
    children: [
      { title: "پوشاک ورزشی", slug: "sportswear" },
      { title: "کوله و ساک", slug: "backpacks" },
      { title: "تجهیزات تمرین", slug: "equipment" },
      { title: "لوازم سفر", slug: "travel" },
    ],
  },
  {
    id: "c8",
    slug: "accessories",
    title: "اکسسوری",
    subtitle: "بیش از ۶۰۰ کالا",
    icon: "glasses",
    image: img(8372217, 700),
    description:
      "عینک آفتابی، کلاه، شال و کمربند؛ جزئیاتی کوچک که استایل روزمره را کامل می‌کنند.",
    children: [
      { title: "عینک آفتابی", slug: "sunglasses" },
      { title: "کلاه", slug: "hats" },
      { title: "شال و روسری", slug: "scarves" },
      { title: "کمربند", slug: "belts" },
    ],
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
