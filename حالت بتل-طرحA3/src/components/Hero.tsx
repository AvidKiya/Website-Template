import { useCallback, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { SLIDES, byId, faNum } from "../data/store";
import { useCart } from "../cart";
import { ChevronLeft, ChevronRight, Zap } from "./Icons";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const { setQuick } = useCart();

  const next = useCallback(() => setIdx((i) => (i + 1) % SLIDES.length), []);
  const prev = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative overflow-hidden border-b border-line/60"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto h-[440px] max-w-[1400px] md:h-[500px]">
        {SLIDES.map((s, i) => {
          const active = i === idx;
          return (
            <div
              key={s.id}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-all duration-700 ease-out",
                active ? "z-10 opacity-100" : "z-0 opacity-0"
              )}
            >
              {/* backdrop image */}
              <div
                className={cn(
                  "absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-linear",
                  active && "scale-105"
                )}
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/85 to-ink/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

              {/* content */}
              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
                <div
                  className={cn(
                    "max-w-xl transition-all delay-200 duration-700",
                    active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  )}
                >
                  <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/15 px-3.5 py-1.5 text-xs font-bold text-ember backdrop-blur-sm">
                    <Zap className="h-3.5 w-3.5" />
                    {s.chip}
                  </span>
                  <h1 className="font-display text-4xl leading-[1.15] text-snow md:text-[52px]">
                    {s.kicker}
                  </h1>
                  <p className="mt-4 max-w-md text-sm leading-7 text-mute md:text-[15px] md:leading-8">
                    {s.sub}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setQuick(byId(s.productId))}
                      className="rounded-xl bg-ember px-6 py-3 text-sm font-bold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-emberdeep"
                    >
                      مشاهده و خرید محصول
                    </button>
                    <a
                      href="#amazing"
                      className="rounded-xl border border-line bg-ink/50 px-6 py-3 text-sm font-bold text-snow backdrop-blur-sm transition-all hover:border-ember/60 hover:text-ember"
                    >
                      همه‌ی تخفیف‌ها
                    </a>
                  </div>

                  {/* floating spec chips */}
                  <div className="mt-8 hidden gap-2.5 md:flex">
                    {s.stats.map((t, j) => (
                      <span
                        key={t}
                        className="anim-floaty rounded-lg border border-line/80 bg-coal/70 px-3 py-1.5 text-[11px] font-medium text-mute backdrop-blur-sm"
                        style={{ animationDelay: `${j * 0.7}s` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* arrows */}
        <button
          onClick={prev}
          aria-label="اسلاید قبلی"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/60 text-snow backdrop-blur-md transition-all hover:border-ember/60 hover:text-ember md:grid"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="اسلاید بعدی"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/60 text-snow backdrop-blur-md transition-all hover:border-ember/60 hover:text-ember md:grid"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* dots + counter */}
        <div className="absolute bottom-5 right-1/2 z-20 flex translate-x-1/2 items-center gap-2 md:right-6 md:translate-x-0">
          <span className="me-2 text-[11px] font-medium text-faint">
            {faNum(idx + 1)} / {faNum(SLIDES.length)}
          </span>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIdx(i)}
              aria-label={`اسلاید ${faNum(i + 1)}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === idx ? "w-8 bg-ember" : "w-2 bg-snow/25 hover:bg-snow/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
