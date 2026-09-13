import { useState } from "react";
import SafeImg from "./SafeImg";
import { IconChevron, IconPlus } from "./Icons";
import { LOCAL, blogPosts, brands, faqs, W } from "../data/site";
import { toFa } from "../lib/utils";

/* ------------------------------------------------------------------ */
export function DoubleBanner() {
  const items = [
    {
      img: W + "Mobile-Sliders.webp-01.webp",
      tag: "کالکشن زنانه",
      title: "استایل خود را متفاوت بساز",
      desc: "مجموعه‌ای از بهترین برندهای پوشاک زنانه با تخفیف ویژه",
      g: ["#3c0d24", "#100810"] as [string, string],
    },
    {
      img: W + "Mobile-Sliders-03.webp",
      tag: "کالکشن مردانه",
      title: "کتانی‌های اسپرت اورجینال",
      desc: "نایکی، آدیداس و پوما با ضمانت اصالت و بازگشت کالا",
      g: ["#0d2138", "#080b10"] as [string, string],
    },
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-4 lg:px-6 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {items.map((b) => (
        <a
          key={b.tag}
          href="#"
          className="relative h-[200px] lg:h-[240px] rounded-3xl overflow-hidden border border-ink-800 group"
        >
          <SafeImg
            src={b.img}
            fallbackSrc={LOCAL.hero}
            alt={b.title}
            className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-[900ms]"
            wrapClassName="absolute inset-0 w-full h-full"
            gradient={b.g}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ink-950/95 via-ink-950/70 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-7 lg:px-10 max-w-[380px]">
            <span className="text-[11px] text-brand-400">{b.tag}</span>
            <h3 className="mt-2 text-lg lg:text-2xl font-bold text-white leading-9">{b.title}</h3>
            <p className="mt-2 text-[12.5px] text-ink-300 leading-6">{b.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-white w-fit border-b border-brand-500 pb-1">
              مشاهده محصولات
              <IconChevron className="w-3.5 h-3.5" />
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function BrandStrip() {
  const row = [...brands, ...brands];
  return (
    <section className="mx-auto max-w-[1440px] px-4 lg:px-6 mt-10">
      <div className="rounded-3xl card-surface py-7 overflow-hidden">
        <div className="flex items-center justify-between px-6 mb-5">
          <h2 className="text-[15px] font-bold text-white">برندهای موجود در پارس کالا</h2>
          <a href="#" className="text-[12px] text-brand-400 hover:text-brand-300">
            همه برندها
          </a>
        </div>
        <div className="relative">
          <div className="flex w-max animate-marquee">
            {row.map((b, i) => (
              <div
                key={b + i}
                className="w-[160px] shrink-0 mx-2 h-16 rounded-2xl border border-ink-700 bg-ink-850 grid place-items-center text-ink-300 hover:text-white hover:border-brand-500/50 transition-colors"
              >
                <span className="text-[13.5px] font-bold tracking-[0.12em]">{b}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function BlogSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 lg:px-6 mt-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-brand-400 to-brand-700" />
          <h2 className="text-[17px] lg:text-xl font-bold text-white">
            آخرین مقالات مجله پارس کالا
          </h2>
        </div>
        <a href="#" className="text-[12.5px] text-brand-400 hover:text-brand-300">
          آرشیو مجله
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {blogPosts.map((b) => (
          <a
            key={b.title}
            href="#"
            className="group rounded-2xl card-surface overflow-hidden hover:border-ink-500 transition-colors"
          >
            <div className="relative h-40 bg-ink-900 overflow-hidden">
              <SafeImg
                src={b.img}
                fallbackSrc={b.local}
                alt={b.title}
                contain
                className="absolute inset-0 w-full h-full p-6 group-hover:scale-110 transition-transform duration-700"
                wrapClassName="absolute inset-0 w-full h-full"
                fallbackText={b.title}
              />
              <span className="absolute top-3 right-3 text-[10.5px] px-2 py-1 rounded-md bg-ink-950/80 border border-ink-700 text-ink-200">
                {b.cat}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-[13.5px] leading-6 text-ink-100 h-12 line-clamp-2 group-hover:text-brand-400 transition-colors">
                {b.title}
              </h3>
              <div className="mt-3 flex items-center justify-between text-[11px] text-ink-400">
                <span>{b.date}</span>
                <span className="flex items-center gap-1 text-brand-400">
                  ادامه مطلب
                  <IconChevron className="w-3 h-3" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-[1440px] px-4 lg:px-6 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4">
        <div className="rounded-3xl card-surface p-7 relative overflow-hidden">
          <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-brand-600/15 blur-3xl" />
          <h2 className="relative text-xl font-extrabold text-white leading-9">
            پرسش‌های متداول
          </h2>
          <p className="relative mt-3 text-[12.5px] text-ink-300 leading-7">
            پاسخ سوالات پرتکرار کاربران درباره خرید، ارسال، مرجوعی و گارانتی کالا در فروشگاه
            اینترنتی پارس کالا.
          </p>
          <a
            href="#"
            className="relative mt-6 inline-flex h-11 px-5 items-center rounded-xl bg-gradient-to-l from-brand-600 to-brand-500 text-white text-[13px]"
          >
            ارتباط با پشتیبانی
          </a>
          <p className="relative mt-5 text-[12px] text-ink-400">
            شماره تماس: <span className="digits text-ink-200">{toFa("061-535-10225")}</span>
          </p>
        </div>

        <div className="rounded-3xl card-surface p-3 lg:p-5">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-ink-800 last:border-0">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-right py-4 px-2"
              >
                <span
                  className={`text-[13px] transition-colors ${
                    open === i ? "text-brand-400" : "text-ink-100"
                  }`}
                >
                  {f.q}
                </span>
                <span
                  className={`w-7 h-7 shrink-0 rounded-lg grid place-items-center border transition-all ${
                    open === i
                      ? "bg-brand-500 border-brand-500 text-white rotate-45"
                      : "border-ink-600 text-ink-300"
                  }`}
                >
                  <IconPlus className="w-4 h-4" />
                </span>
              </button>
              <div
                className="grid transition-all duration-300"
                style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-2 pb-5 text-[12.5px] leading-7 text-ink-300">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
