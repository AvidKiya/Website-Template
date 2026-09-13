import { useEffect, useRef, useState } from "react";
import { cn, px, fa } from "../lib/utils";
import { slides, categories } from "../data/shop";
import { navigate } from "../lib/router";
import { Rail } from "./Rail";
import { Chevron, Sparkle } from "./Icons";

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(
      () => setI((v) => (v + 1) % slides.length),
      5200
    );
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused]);

  const go = (d: 1 | -1) =>
    setI((v) => (v + d + slides.length) % slides.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ transform: `translateX(${i * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <article
            key={idx}
            className="relative min-w-full"
            style={{
              background: `radial-gradient(120% 130% at 85% 15%, ${s.from} 0%, ${s.to} 62%, #08080a 100%)`,
            }}
          >
            <div className="pk-grid absolute inset-0 opacity-50" />
            <div className="relative grid items-center gap-4 p-5 sm:p-8 md:grid-cols-[1.05fr_.95fr] md:p-10">
              <div className="relative z-10 order-2 md:order-1">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black backdrop-blur"
                  style={{ background: s.accent + "22", color: s.accent }}
                >
                  <Sparkle className="h-3.5 w-3.5" />
                  {s.kicker}
                </span>
                <h2 className="mt-3 whitespace-pre-line text-2xl font-black leading-[1.35] text-white sm:text-4xl md:text-[42px] md:leading-[1.25]">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-md text-[12.5px] font-medium leading-6 text-white/60 sm:text-sm">
                  {s.sub}
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="group mt-5 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-[13px] font-black text-white shadow-[0_18px_40px_-18px] transition hover:brightness-110"
                  style={{ background: s.accent, boxShadow: `0 18px 40px -18px ${s.accent}` }}
                >
                  {s.cta}
                  <Chevron className="h-4 w-4 rotate-180 transition group-hover:-translate-x-1" />
                </button>
              </div>

              <div className="relative order-1 md:order-2">
                <div
                  className="absolute inset-6 rounded-full blur-3xl"
                  style={{ background: s.accent + "55" }}
                />
                <img
                  src={px(s.img, 760)}
                  alt=""
                  className={cn(
                    "relative mx-auto aspect-square w-full max-w-[300px] rounded-3xl object-cover shadow-[0_30px_70px_-30px_#000] ring-1 ring-white/10 md:max-w-[380px]",
                    idx === i && "float-slow"
                  )}
                />
                <span
                  className="num absolute bottom-3 right-3 rounded-2xl px-3 py-2 text-[11px] font-black backdrop-blur-md ring-1 ring-white/15"
                  style={{ background: "#000000aa", color: s.accent }}
                >
                  تا ٪{fa(40)} تخفیف
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        onClick={() => go(1)}
        aria-label="اسلاید بعدی"
        className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur transition hover:bg-pk md:grid md:opacity-60 md:group-hover/hero:opacity-100"
      >
        <Chevron className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(-1)}
        aria-label="اسلاید قبلی"
        className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rotate-180 place-items-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur transition hover:bg-pk md:grid md:opacity-60 md:group-hover/hero:opacity-100"
      >
        <Chevron className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-2 backdrop-blur">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`اسلاید ${idx + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === i ? "w-7 bg-pk" : "w-1.5 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
}

const BANNERS = [
  { t: "جشنواره تخفیف‌های شگفت‌انگیز", s: "تا ۷۰٪ روی صدها کالا", grad: "from-pk/85 via-pk-dark to-[#2b0710]", k: "شگفت‌انگیز" },
  { t: "جمعه سیاه پارس کالا", s: "فقط تا پایان هفته", grad: "from-[#2a2a33] via-[#15151a] to-black", k: "BLACK FRIDAY" },
  { t: "تازه‌رسیده‌ها", s: "کالکشن جدید پاییز ۱۴۰۴", grad: "from-gold/80 via-[#8a5a08] to-[#1a1204]", k: "NEW" },
];

export function BannerStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {BANNERS.map((b) => (
        <button
          key={b.t}
          onClick={() => navigate("/shop")}
          className={cn(
            "group relative flex h-[104px] items-center overflow-hidden rounded-2xl border border-line bg-gradient-to-l p-4 text-start sm:h-[122px]",
            b.grad
          )}
        >
          <div className="pk-grid absolute inset-0 opacity-30" />
          <div className="shine pointer-events-none absolute inset-0 overflow-hidden" />
          <div className="relative z-10">
            <span className="rounded-md bg-black/35 px-2 py-0.5 text-[9px] font-black tracking-[0.18em] text-white/85">
              {b.k}
            </span>
            <h3 className="mt-1.5 text-[15px] font-black text-white sm:text-[17px]">
              {b.t}
            </h3>
            <p className="mt-0.5 text-[11px] font-bold text-white/70">{b.s}</p>
          </div>
          <span className="relative z-10 ms-auto grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:-translate-x-1 group-hover:bg-white group-hover:text-black">
            <Chevron className="h-4 w-4 rotate-180" />
          </span>
        </button>
      ))}
    </div>
  );
}

export function CategoryCircles() {
  return (
    <Rail>
      {categories.map((c) => (
        <button
          key={c.title}
          onClick={() => navigate(`/shop?cat=${c.cat}`)}
          className="group flex w-[124px] shrink-0 snap-start flex-col items-center gap-2.5 rounded-3xl border border-line bg-surface p-3 transition hover:-translate-y-1 hover:border-pk/45 sm:w-[148px]"
        >
          <span className="relative grid h-[74px] w-[74px] place-items-center overflow-hidden rounded-full bg-surface-2 ring-1 ring-line transition group-hover:ring-pk/50 sm:h-[88px] sm:w-[88px]">
            <img
              src={px(c.img, 260)}
              alt={c.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </span>
          <span className="text-center">
            <span className="block text-[12.5px] font-black text-fg transition group-hover:text-pk">
              {c.title}
            </span>
            <span className="mt-0.5 block text-[9.5px] font-medium text-fg-mute">
              {c.en}
            </span>
          </span>
        </button>
      ))}
    </Rail>
  );
}
