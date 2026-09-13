import { useEffect, useRef, useState } from "react";
import SafeImg from "./SafeImg";
import { IconChevron, IconFlash } from "./Icons";
import { localFor, products, type Product } from "../data/site";
import { money, pad2, toFa } from "../lib/utils";

function useCountdown(hours = 9) {
  const [left, setLeft] = useState(hours * 3600 + 43 * 60 + 12);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : hours * 3600)), 1000);
    return () => clearInterval(t);
  }, [hours]);
  return {
    h: Math.floor(left / 3600),
    m: Math.floor((left % 3600) / 60),
    s: left % 60,
  };
}

export default function AmazingOffers({ onAdd }: { onAdd: (p: Product) => void }) {
  const { h, m, s } = useCountdown();
  const track = useRef<HTMLDivElement>(null);
  const list = products.filter((p) => p.off && p.off >= 3);

  const scrollBy = (dir: number) => {
    track.current?.scrollBy({ left: dir * 620, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1440px] px-4 lg:px-6 mt-10">
      <div className="relative rounded-3xl overflow-hidden border border-brand-700/40 bg-[linear-gradient(250deg,#2a0512_0%,#14060c_45%,#0c0c10_100%)]">
        <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-28 left-10 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row">
          {/* side panel */}
          <div className="lg:w-[248px] shrink-0 p-6 lg:border-l border-brand-700/25 flex lg:flex-col items-center lg:items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] px-2.5 py-1 rounded-full bg-brand-500/20 border border-brand-500/35 text-brand-300">
                <IconFlash className="w-3.5 h-3.5" />
                Amazing Offers
              </span>
              <h2 className="mt-3 text-lg lg:text-[22px] font-extrabold text-white leading-8">
                تخفیف‌های باورنکردنی
                <br />
                <span className="text-brand-400">پارس کالا</span>
              </h2>
            </div>

            <div className="hidden lg:block">
              <p className="text-[11.5px] text-ink-300 mb-2">پایان پیشنهاد تا :</p>
              <div className="flex items-center gap-1.5 digits" dir="ltr">
                {[
                  { v: pad2(s), l: "ثانیه" },
                  { v: pad2(m), l: "دقیقه" },
                  { v: pad2(h), l: "ساعت" },
                ].map((x) => (
                  <div
                    key={x.l}
                    className="w-[52px] rounded-xl bg-ink-950/70 border border-brand-700/35 py-2 text-center"
                  >
                    <p className="text-base font-bold text-white">{x.v}</p>
                    <p className="text-[9.5px] text-ink-400 mt-0.5">{x.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBy(1)}
                aria-label="قبلی"
                className="w-9 h-9 rounded-full border border-brand-700/40 bg-ink-950/60 text-white grid place-items-center hover:bg-brand-600 transition"
              >
                <IconChevron className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBy(-1)}
                aria-label="بعدی"
                className="w-9 h-9 rounded-full border border-brand-700/40 bg-ink-950/60 text-white grid place-items-center hover:bg-brand-600 transition rotate-180"
              >
                <IconChevron className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* rail */}
          <div
            ref={track}
            className="flex-1 flex gap-4 overflow-x-auto no-scrollbar p-4 lg:py-6 scroll-smooth"
          >
            {list.map((p) => (
              <div
                key={p.id}
                className="group shrink-0 w-[186px] rounded-2xl bg-ink-900/70 border border-ink-700/70 p-3 hover:border-brand-500/60 transition-colors"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-ink-850">
                  <SafeImg
                    src={p.img}
                    fallbackSrc={localFor(p)}
                    alt={p.title}
                    contain
                    className="absolute inset-0 w-full h-full p-3 group-hover:scale-105 transition-transform duration-500"
                    wrapClassName="absolute inset-0 w-full h-full"
                    fallbackText={p.title}
                  />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-brand-500 text-white text-[10px] font-bold">
                    ٪{toFa(p.off!)}
                  </span>
                </div>
                <h3 className="mt-3 text-[12.5px] leading-5 text-ink-100 h-10 line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-1 text-[11px] text-ink-500 line-through digits">
                  {money(p.old ?? p.price)}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-[14px] font-bold text-white digits">
                    {money(p.price)}
                    <span className="text-[10px] font-normal text-ink-300 mr-1">تومان</span>
                  </p>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-ink-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-brand-600 to-gold-500"
                    style={{ width: `${Math.min(92, 20 + p.sold / 5)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10.5px] text-ink-400">
                  {toFa(p.stock)} عدد باقی‌مانده
                </p>
                <button
                  onClick={() => onAdd(p)}
                  className="mt-3 w-full h-9 rounded-xl bg-ink-700 text-[12px] text-ink-100 hover:bg-brand-500 hover:text-white transition-colors"
                >
                  افزودن به سبد
                </button>
              </div>
            ))}

            <a
              href="#"
              className="shrink-0 w-[150px] rounded-2xl border border-dashed border-brand-700/50 grid place-items-center text-center text-[12.5px] text-brand-300 hover:bg-brand-500/10 transition"
            >
              <span>
                مشاهده همه
                <br />
                <span className="text-ink-400 text-[11px]">
                  {toFa(list.length)} کالای تخفیف‌دار
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
