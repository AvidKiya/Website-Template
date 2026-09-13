import { useEffect, useState } from "react";
import { pxWide, px, slides, faIn } from "../data";
import { ChevronLeft, ChevronRight } from "./Icons";

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);

  return (
    <section className="mx-auto max-w-[1320px] px-4 pt-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* slider */}
        <div className="relative overflow-hidden rounded-3xl border border-ink-700 lg:col-span-9">
          <div className="relative h-[230px] sm:h-[320px] lg:h-[420px]">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <img src={pxWide(s.img)} alt={s.title} className="h-full w-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-l ${s.from} via-ink-950/80 to-ink-950/30`} />
                <div className="absolute inset-y-0 right-0 flex w-full flex-col justify-center gap-3 p-6 sm:w-[62%] sm:p-10">
                  <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] text-white backdrop-blur">
                    {s.tag}
                  </span>
                  <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-4xl">{s.title}</h2>
                  <p className="max-w-md text-[13px] text-white/80 sm:text-base">{s.sub}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button className="rounded-2xl bg-brand-600 px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand-500 glow-brand">
                      {s.cta}
                    </button>
                    <button className="rounded-2xl border border-white/25 bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur transition hover:bg-white/20">
                      تخفیف‌ها
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => go(-1)}
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-white backdrop-blur transition hover:bg-brand-600"
          >
            <ChevronRight />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-white backdrop-blur transition hover:bg-brand-600"
          >
            <ChevronLeft />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-7 bg-brand-500" : "w-2.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* side banners */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1">
          <div className="relative overflow-hidden rounded-3xl border border-ink-700 bg-gradient-to-br from-purple-700/40 to-ink-900 p-5">
            <img
              src={px(24702077, 400)}
              alt="کفش"
              className="absolute -left-6 bottom-0 h-28 w-28 rounded-full object-cover opacity-60 blur-[1px] lg:h-32 lg:w-32"
            />
            <p className="text-[11px] text-purple-300">کالکشن جدید</p>
            <h3 className="mt-1 text-base font-extrabold text-white">کفش‌های اسپرت</h3>
            <p className="mt-1 text-[11px] text-mute">شروع از {faIn("۴۹۹,۰۰۰")} تومان</p>
            <button className="mt-4 rounded-xl bg-white/10 px-3 py-1.5 text-[11px] text-white backdrop-blur transition hover:bg-white/20">
              خرید کنید
            </button>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-ink-700 bg-gradient-to-br from-brand-600/50 to-ink-900 p-5">
            <img
              src={px(27174572, 400)}
              alt="کیف"
              className="absolute -left-6 bottom-0 h-28 w-28 rounded-full object-cover opacity-60 blur-[1px] lg:h-32 lg:w-32"
            />
            <p className="text-[11px] text-brand-400">فقط امروز</p>
            <h3 className="mt-1 text-base font-extrabold text-white">۳۰٪ تخفیف کیف چرم</h3>
            <p className="mt-1 text-[11px] text-mute">با کد PARS30</p>
            <button className="mt-4 rounded-xl bg-white/10 px-3 py-1.5 text-[11px] text-white backdrop-blur transition hover:bg-white/20">
              دریافت کد
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
