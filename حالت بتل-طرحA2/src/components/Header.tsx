import { useState } from "react";
import { cn } from "../utils/cn";
import { categories, fa, navLinks, popularSearches } from "../data";
import {
  BagIcon,
  BookIcon,
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  CreamIcon,
  DressIcon,
  DumbbellIcon,
  GamepadIcon,
  LaptopIcon,
  MenuIcon,
  MessageIcon,
  MonitorIcon,
  PhoneDeviceIcon,
  PhoneIcon,
  SearchIcon,
  ShoeIcon,
  TshirtIcon,
  TvIcon,
  UserIcon,
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

function Logo() {
  return (
    <a href="#" className="flex shrink-0 items-center gap-2.5">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-b from-accent to-accent-2 shadow-lg shadow-accent/25">
        <BagIcon className="h-6 w-6 text-accent-ink" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-black tracking-tight">پارس کالا</span>
        <span className="block text-[10.5px] text-mist">فروشگاه اینترنتی</span>
      </span>
    </a>
  );
}

type Props = { cartCount: number; onOpenCart: () => void };

export default function Header({ cartCount, onOpenCart }: Props) {
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* top utility bar */}
      <div className="border-b border-line/60 bg-panel/70">
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between px-4 text-[11.5px] text-mist">
          <div className="flex items-center gap-2">
            <MessageIcon className="h-4 w-4 text-accent" />
            <span>پاسخگوی شما هستیم</span>
            <span className="hidden text-line sm:inline">|</span>
            <span className="hidden sm:inline">هفت روز هفته، ۲۴ ساعت شبانه‌روز</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden lg:inline">فروشگاه اینترنتی پارس کالا، بررسی، انتخاب و خرید آنلاین</span>
            <PhoneIcon className="h-3.5 w-3.5" />
            <a dir="ltr" href="tel:06153510225" className="font-bold text-snow/80 transition hover:text-accent">
              061-535-10225
            </a>
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="border-b border-line/60 bg-ink-2/70">
        <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-4 py-4 sm:gap-5">
          <Logo />

          {/* search */}
          <div className="relative min-w-0 flex-1">
            <div className="flex items-stretch overflow-hidden rounded-xl border border-line bg-card transition focus-within:border-accent/60 focus-within:shadow-[0_0_0_3px_rgba(82,255,104,0.08)]">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => window.setTimeout(() => setFocus(false), 150)}
                placeholder="جستجو در پارس کالا…"
                className="w-full bg-transparent px-4 py-2.5 text-[13px] outline-none placeholder:text-mist/70"
              />
              <button
                onClick={() => focus && setFocus(false)}
                className="flex items-center gap-2 bg-accent px-4 text-[13px] font-extrabold text-accent-ink transition hover:bg-accent-2 sm:px-6"
              >
                <SearchIcon className="h-4.5 w-4.5" />
                <span className="hidden sm:inline">جستجو</span>
              </button>
            </div>
            {focus && (
              <div className="absolute top-full z-50 mt-1.5 w-full rounded-2xl border border-line bg-card p-3.5 shadow-2xl shadow-black/50">
                <p className="mb-2.5 text-[11px] font-bold text-mist">جستجوهای پرطرفدار</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => setQ(s)}
                      className="rounded-full border border-line bg-ink-2 px-3.5 py-1.5 text-[11.5px] font-medium text-snow/80 transition hover:border-accent/50 hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* account & cart */}
          <div className="flex shrink-0 items-center gap-2.5">
            <button className="hidden flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-mist transition hover:text-snow md:flex">
              <UserIcon className="h-5.5 w-5.5" />
              <span className="text-[10.5px] font-bold">ورود | ثبت‌نام</span>
            </button>
            <button
              onClick={onOpenCart}
              aria-label="سبد خرید"
              className="relative grid h-11 w-11 place-items-center rounded-xl border border-line bg-card text-snow transition hover:border-accent/60 hover:text-accent"
            >
              <CartIcon className="h-5.5 w-5.5" />
              {cartCount > 0 && (
                <span className="absolute -left-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-black text-accent-ink">
                  {fa(cartCount)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* sticky category nav */}
      <div className="sticky top-0 z-40 border-b border-line/70 bg-ink/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1320px] items-center gap-3 px-4">
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setCatOpen((v) => !v);
                setMobileOpen(false);
              }}
              className="flex h-10 items-center gap-2 rounded-xl bg-accent px-3.5 text-[12.5px] font-extrabold text-accent-ink shadow-lg shadow-accent/15 transition hover:bg-accent-2 sm:px-4"
            >
              <MenuIcon className="h-4.5 w-4.5" />
              همه دسته‌بندی‌ها
              <ChevronDownIcon className={cn("h-3.5 w-3.5 transition-transform", catOpen && "rotate-180")} />
            </button>
            {catOpen && (
              <>
                <button
                  aria-label="بستن منو"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setCatOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-card p-2 shadow-2xl shadow-black/60">
                  {categories.map((c) => {
                    const Ic = catIcons[c.icon];
                    return (
                      <a
                        key={c.label}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCatOpen(false);
                        }}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12.5px] font-medium text-snow/80 transition hover:bg-card-2 hover:text-accent"
                      >
                        <Ic className="h-4.5 w-4.5 text-mist transition group-hover:text-accent" />
                        {c.label}
                      </a>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <nav className="no-scrollbar hidden items-center gap-0.5 overflow-x-auto lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={cn(
                  "whitespace-nowrap rounded-lg px-3 py-2 text-[12.5px] font-medium text-mist transition hover:bg-card hover:text-snow",
                  l.accent && "font-bold text-accent hover:text-accent"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="منو"
            className="ms-auto grid h-10 w-10 place-items-center rounded-xl border border-line bg-card text-snow transition hover:border-accent/50 lg:hidden"
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-line/70 bg-ink-2/95 backdrop-blur lg:hidden">
            <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-1 px-4 py-3">
              {categories.map((c) => {
                const Ic = catIcons[c.icon];
                return (
                  <a
                    key={c.label}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12.5px] font-medium text-snow/80 transition hover:bg-card"
                  >
                    <Ic className="h-4.5 w-4.5 text-accent" />
                    {c.label}
                  </a>
                );
              })}
              <div className="col-span-2 mt-1 flex flex-wrap gap-1.5 border-t border-line/60 pt-2">
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-full border border-line bg-card px-3.5 py-1.5 text-[11.5px] font-medium text-mist",
                      l.accent && "border-accent/40 text-accent"
                    )}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
