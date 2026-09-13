import type { NavItem } from "./types";
import { categories } from "./categories";

export const BRAND = {
  name: "یور برند",
  latin: "YOUR BRAND",
  tagline: "فروشگاه اینترنتی مد و لایف‌استایل",
  phone: "۰۲۱-۹۱۰۰۲۰۳۰",
  email: "support@yourbrand.example",
  address: "تهران، خیابان ولیعصر، نبش کوچه نمونه، پلاک ۱۲۰",
};

export const mainNav: NavItem[] = [
  {
    title: "دسته‌بندی کالاها",
    href: "/category/mens-fashion",
    children: categories.map((c) => ({ title: c.title, href: `/category/${c.slug}` })),
  },
  { title: "جدیدترین‌ها", href: "/category/all?sort=newest" },
  { title: "پیشنهاد شگفت‌انگیز", href: "/category/all?tag=amazing" },
  { title: "پرفروش‌ترین‌ها", href: "/category/all?tag=bestseller" },
  { title: "مجله", href: "/blog" },
  { title: "تماس با ما", href: "/contact" },
];

export const utilityNav: NavItem[] = [
  { title: "پیگیری سفارش", href: "/orders" },
  { title: "راهنمای خرید", href: "/guide" },
  { title: "سوالات متداول", href: "/#faq" },
];

export const footerColumns: { title: string; links: { title: string; href: string }[] }[] = [
  {
    title: "خدمات مشتریان",
    links: [
      { title: "پاسخ به پرسش‌های متداول", href: "/#faq" },
      { title: "رویه‌های بازگرداندن کالا", href: "/guide" },
      { title: "شرایط استفاده", href: "/guide" },
      { title: "حریم خصوصی", href: "/guide" },
      { title: "گزارش باگ", href: "/contact" },
    ],
  },
  {
    title: "راهنمای خرید",
    links: [
      { title: "نحوه ثبت سفارش", href: "/guide" },
      { title: "شیوه‌های پرداخت", href: "/guide" },
      { title: "رویه ارسال کالا", href: "/guide" },
      { title: "پیگیری سفارش", href: "/orders" },
      { title: "راهنمای سایزبندی", href: "/guide" },
    ],
  },
  {
    title: "با یور برند",
    links: [
      { title: "درباره ما", href: "/about" },
      { title: "فرصت‌های شغلی", href: "/about" },
      { title: "تماس با ما", href: "/contact" },
      { title: "فروش در یور برند", href: "/about" },
      { title: "مجله یور برند", href: "/blog" },
    ],
  },
];

export const trustPoints = [
  { title: "ضمانت اصالت کالا", icon: "shield" },
  { title: "۷ روز ضمانت بازگشت", icon: "rotate" },
  { title: "ارسال سریع سراسر کشور", icon: "truck" },
  { title: "پرداخت امن و مطمئن", icon: "lock" },
  { title: "پشتیبانی ۲۴ ساعته", icon: "headset" },
];
