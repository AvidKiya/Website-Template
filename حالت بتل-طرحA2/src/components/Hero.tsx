import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { categories, slides } from "../data";
import {
  BagIcon,
  BookIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreamIcon,
  DressIcon,
  DumbbellIcon,
  GamepadIcon,
  LaptopIcon,
  MonitorIcon,
  PhoneDeviceIcon,
  ShoeIcon,
  TshirtIcon,
  TvIcon,
} from "./icons";

const catIcons: Record<string, (p: { className?: string }) => React.ReactNode> = {
  phone: PhoneDeviceIcon,
  laptop: LaptopIcon,
  monitor: MonitorIcon,
  tv: TvIcon,
  gamepad: GamepadIcon,
  shoe: ShoeIcon,
  bag: BagIcon,
  dress: DressIcon,
  tshirt: TshirtIcon,
  cream: CreamIcon,
  dumbbell: DumbbellIcon,
  book: BookIcon,
};

export default function Hero() {
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);

  const start = () => {
    if (timer.current !== null) return;
    timer.current = window.setInterval(() => setI((v) => (v + 1) % slides.length), 5500);
  };
  const stop = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (n: number) => {
    setI((n + slides.length) % slides.length);
    stop();
    start();
  };

  return (
    <section className="pt-5">
      {/* hero slider */}
      <div
        className="relative h-[300px] overflow-hidden rounded-3xl border border-line/70 bg-ink-2 sm:h-[360px] lg:h-[420px]"
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              idx === i ? "z-10 opacity-100" : "z-0 opacity-0"
            )}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-l to-transparent", s.from)} />
            <div className={cn("absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl anim-glow", s.glow)} />
            <div className="relative z-10 flex h-full items-center gap-6 px-6 sm:px-10 lg:px-16">
              <div key={idx === i ? "on" : "off"} className="anim-fade-up flex-1 text-center lg:text-right">
                <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-[11px] font-bold text-accent">
                  {s.badge}
                </span>
                <h1 className="mt-3.5 text-2xl font-black leading-snug sm:text-3xl lg:text-[40px] lg:leading-[1.3]">
                  {s.title}
                </h1>
                <p className="mx-auto mt-2.5 max-w-md text-[12.5px] leading-6 text-snow/65 sm:text-sm lg:mx-0">
                  {s.desc}
                </p>
                <a
                  href="#deals"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-[13px] font-extrabold text-accent-ink shadow-lg shadow-accent/25 transition hover:bg-accent-2"
                >
                  {s.cta}
                  <ChevronLeftIcon className="h-4 w-4" />
                </a>
              </div>
              <div className="hidden w-44 shrink-0 sm:block lg:w-64">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-40 w-full rounded-2xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/10 lg:h-64"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => go(i - 1)}
          aria-label="اسلاید قبلی"
          className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink/60 text-snow/80 backdrop-blur transition hover:border-accent/50 hover:text-accent"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(i + 1)}
          aria-label="اسلاید بعدی"
          className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink/60 text-snow/80 backdrop-blur transition hover:border-accent/50 hover:text-accent"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="absolute bottom-4 right-1/2 z-20 flex translate-x-1/2 gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`اسلاید ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === i ? "w-6 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* category row */}
      <div className="no-scrollbar mt-5 overflow-x-auto rounded-2xl border border-line/70 bg-card/95 p-4 backdrop-blur">
        <div className="flex min-w-max items-start gap-1 lg:grid lg:grid-cols-6">
          {categories.map((c) => {
            const Ic = catIcons[c.icon];
            return (
              <a
                key={c.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex w-[74px] shrink-0 flex-col items-center gap-2.5 rounded-xl p-1.5 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-ink-2 text-snow/75 transition duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent group-hover:shadow-lg group-hover:shadow-accent/10">
                  <Ic className="h-6.5 w-6.5" />
                </span>
                <span className="text-[11px] font-medium leading-4 text-mist transition group-hover:text-snow">
                  {c.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
