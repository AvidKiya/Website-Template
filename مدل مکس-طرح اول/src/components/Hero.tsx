import { useEffect, useState } from "react";
import SafeImg from "./SafeImg";
import { IconChevron } from "./Icons";
import { LOCAL, slides, stripBanners, W } from "../data/site";
import { toFa } from "../lib/utils";

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5200);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);

  return (
    <section className="mx-auto max-w-[1440px] px-4 lg:px-6 pt-5">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-4">
        {/* slider */}
        <div className="relative rounded-3xl overflow-hidden border border-ink-800 bg-ink-900 h-[230px] sm:h-[320px] lg:h-[420px] group">
          {slides.map((s, idx) => (
            <div
              key={s.img}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: idx === i ? 1 : 0, pointerEvents: idx === i ? "auto" : "none" }}
            >
              <SafeImg
                src={s.img}
                fallbackSrc={LOCAL.hero}
                alt={s.title}
                className="absolute inset-0 w-full h-full"
                wrapClassName="absolute inset-0 w-full h-full"
                gradient={[s.from, s.to]}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(270deg, rgba(8,8,10,.92) 8%, rgba(8,8,10,.72) 38%, rgba(8,8,10,.15) 75%)",
                }}
              />
              <div className="relative h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 max-w-[640px]">
                <span className="inline-flex w-fit items-center gap-2 text-[11.5px] px-3 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  پیشنهاد ویژه پارس کالا
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[42px] font-extrabold text-white leading-tight">
                  {s.title}
                </h2>
                <p className="mt-3 text-[13px] sm:text-[15px] text-ink-200 leading-7">{s.sub}</p>
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href="#"
                    className="h-11 px-6 rounded-xl bg-gradient-to-l from-brand-600 to-brand-500 text-white text-[13.5px] font-medium grid place-items-center glow-brand hover:brightness-110 transition"
                  >
                    {s.cta}
                  </a>
                  <a
                    href="#"
                    className="h-11 px-5 rounded-xl border border-ink-600 text-ink-100 text-[13.5px] grid place-items-center hover:bg-ink-800 transition"
                  >
                    همه محصولات
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* arrows */}
          <button
            onClick={() => go(1)}
            aria-label="قبلی"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink-900/70 border border-ink-700 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition"
          >
            <IconChevron className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(-1)}
            aria-label="بعدی"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink-900/70 border border-ink-700 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition rotate-180"
          >
            <IconChevron className="w-4 h-4" />
          </button>

          {/* dots */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`اسلاید ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-7 bg-brand-500" : "w-2.5 bg-ink-600 hover:bg-ink-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* side banners */}
        <div className="hidden lg:grid grid-rows-2 gap-4">
          {[
            {
              img: W + "002-2-1024x253.webp",
              t: "کالکشن مردانه",
              s: "تا ۴۰٪ تخفیف",
              g: ["#3f0d1f", "#120a10"] as [string, string],
            },
            {
              img: W + "new-1024x253.webp",
              t: "جدیدترین‌ها",
              s: "تازه رسیده‌های این هفته",
              g: ["#161a3a", "#0b0b12"] as [string, string],
            },
          ].map((b) => (
            <a
              key={b.t}
              href="#"
              className="relative rounded-3xl overflow-hidden border border-ink-800 group"
            >
              <SafeImg
                src={b.img}
                alt={b.t}
                className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700"
                wrapClassName="absolute inset-0 w-full h-full"
                gradient={b.g}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-ink-950/90 via-ink-950/55 to-transparent" />
              <div className="relative p-6 h-full flex flex-col justify-center">
                <p className="text-white font-bold text-lg">{b.t}</p>
                <p className="text-ink-300 text-[12.5px] mt-1">{b.s}</p>
                <span className="mt-4 text-[12px] text-brand-400 flex items-center gap-1">
                  مشاهده
                  <IconChevron className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* strip banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {stripBanners.map((b, idx) => (
          <a
            key={b.img}
            href="#"
            className="relative h-[104px] rounded-2xl overflow-hidden border border-ink-800 group"
          >
            <SafeImg
              src={b.img}
              alt="بنر تخفیف"
              className="absolute inset-0 w-full h-full group-hover:scale-[1.06] transition-transform duration-700"
              wrapClassName="absolute inset-0 w-full h-full"
              gradient={[b.from, b.to]}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-ink-950/75 to-transparent" />
            <div className="relative h-full flex flex-col justify-center pr-6">
              <p className="text-white text-[14px] font-bold">
                {["فروش فوق‌العاده", "جمعه سیاه", "تازه‌های پارس کالا"][idx]}
              </p>
              <p className="text-ink-300 text-[11.5px] mt-1">
                {["تخفیف تا ۵۰٪", `از ${toFa("99,000")} تومان`, "کالکشن ۱۴۰۴"][idx]}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
