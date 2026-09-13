import { useEffect, useState } from "react";
import { faIn, megaMenu } from "../data";
import {
  Cart,
  ChevronDown,
  Close,
  Grid,
  Heart,
  Menu,
  Phone,
  Search,
  Support,
  User,
} from "./Icons";

const topLinks = [
  { t: "فروشگاه", i: "🛍️" },
  { t: "پرسش و پاسخ", i: "❓" },
  { t: "پیگیری سفارش", i: "📦" },
  { t: "تماس با ما", i: "🎧" },
];

const navLinks = ["صفحه اصلی", "محصولات", "پیشنهاد شگفت‌انگیز", "برندها", "وبلاگ", "درباره ما", "تماس با ما"];

export default function Header({
  cartCount,
  wishCount,
  onOpenCart,
  onOpenLogin,
}: {
  cartCount: number;
  wishCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
}) {
  const [stuck, setStuck] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const on = () => setStuck(window.scrollY > 90);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      {/* top strip */}
      <div className="hidden border-b border-ink-800 bg-ink-950 text-[12px] text-mute lg:block">
        <div className="mx-auto flex h-10 max-w-[1320px] items-center justify-between px-4">
          <div className="flex items-center gap-5">
            {topLinks.map((l) => (
              <a key={l.t} href="#" className="flex items-center gap-1.5 transition hover:text-brand-400">
                <span className="text-[13px]">{l.i}</span>
                {l.t}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Support className="h-4 w-4 text-brand-500" /> پشتیبانی ۲۴ ساعته، ۷ روز هفته
            </span>
            <span className="h-3.5 w-px bg-ink-700" />
            <a href="tel:09167971886" className="flex items-center gap-1.5 transition hover:text-brand-400">
              <Phone className="h-4 w-4 text-brand-500" /> {faIn("0916-797-1886")}
            </a>
          </div>
        </div>
      </div>

      {/* main header */}
      <header
        className={`sticky top-0 z-40 border-b border-ink-800 bg-ink-900/95 backdrop-blur-xl transition-shadow ${
          stuck ? "shadow-[0_10px_35px_-20px_rgba(0,0,0,.9)]" : ""
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-3 px-4 lg:h-[86px] lg:gap-6">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-700 text-slate-200 lg:hidden"
            onClick={() => setDrawer(true)}
            aria-label="منو"
          >
            <Menu />
          </button>

          <a href="#" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-lg font-black text-white glow-brand">
              پ
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[15px] font-extrabold text-white">پارس کالا</span>
              <span className="block text-[10px] tracking-widest text-mute">PARS KALA STORE</span>
            </span>
          </a>

          {/* search */}
          <div className="relative hidden flex-1 lg:block">
            <div className="group flex h-12 items-center gap-3 rounded-2xl border border-ink-700 bg-ink-850 px-4 transition focus-within:border-brand-500/70">
              <Search className="h-5 w-5 text-mute" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="جستجو در بین هزاران محصول پارس کالا..."
                className="h-full flex-1 bg-transparent text-[13.5px] text-slate-100 outline-none placeholder:text-mute"
              />
              <button className="rounded-xl bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-500">
                جستجو
              </button>
            </div>
            {searchOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSearchOpen(false)} />
                <div className="animate-pop absolute inset-x-0 top-14 z-20 rounded-2xl border border-ink-700 bg-ink-850 p-4 shadow-2xl">
                  <p className="mb-3 text-xs text-mute">جستجوی پرطرفدار</p>
                  <div className="flex flex-wrap gap-2">
                    {["گوشی و موبایل", "آیفون", "لپ تاپ", "کفش نایکی", "کیف چرم", "کاپشن زمستانی"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setQ(s);
                          setSearchOpen(false);
                        }}
                        className="rounded-xl border border-ink-700 bg-ink-800 px-3 py-1.5 text-xs text-slate-300 transition hover:border-brand-500 hover:text-brand-400"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-ink-700 pt-3 text-xs text-mute">
                    بیش از {faIn("12,400")} کالا آماده ارسال فوری
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mr-auto flex items-center gap-2">
            <button
              className="grid h-10 w-10 place-items-center rounded-xl border border-ink-700 text-slate-200 lg:hidden"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="جستجو"
            >
              <Search />
            </button>

            <button
              onClick={onOpenLogin}
              className="hidden items-center gap-2 rounded-xl border border-ink-700 bg-ink-850 px-3.5 py-2.5 text-[13px] text-slate-200 transition hover:border-brand-500 hover:text-brand-400 sm:flex"
            >
              <User className="h-4.5 w-4.5" />
              ورود / ثبت نام
            </button>

            <button className="relative hidden h-10 w-10 place-items-center rounded-xl border border-ink-700 text-slate-200 transition hover:border-brand-500 hover:text-brand-400 sm:grid">
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {faIn(wishCount)}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-500"
              aria-label="سبد خرید"
            >
              <Cart />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink-950 px-1 text-[10px] font-bold text-brand-400 ring-1 ring-brand-500/60">
                {faIn(cartCount)}
              </span>
            </button>
          </div>
        </div>

        {/* mobile inline search */}
        {searchOpen && (
          <div className="border-t border-ink-800 px-4 py-3 lg:hidden">
            <div className="flex h-11 items-center gap-2 rounded-xl border border-ink-700 bg-ink-850 px-3">
              <Search className="h-4.5 w-4.5 text-mute" />
              <input
                autoFocus
                placeholder="جستجوی محصول..."
                className="h-full flex-1 bg-transparent text-[13px] outline-none placeholder:text-mute"
              />
              <button onClick={() => setSearchOpen(false)} className="text-mute">
                <Close className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        )}

        {/* nav */}
        <nav className="hidden border-t border-ink-800 bg-ink-900 lg:block">
          <div className="mx-auto flex h-12 max-w-[1320px] items-center gap-6 px-4 text-[13px]">
            <div
              className="relative h-full"
              onMouseEnter={() => setOpenMega(true)}
              onMouseLeave={() => setOpenMega(false)}
            >
              <button className="flex h-full items-center gap-2 rounded-t-xl bg-brand-600 px-4 font-semibold text-white">
                <Grid className="h-4.5 w-4.5" />
                دسته‌بندی کالاها
                <ChevronDown className={`h-4 w-4 transition ${openMega ? "rotate-180" : ""}`} />
              </button>

              {openMega && (
                <div className="animate-pop absolute right-0 top-full z-30 flex w-[880px] overflow-hidden rounded-b-2xl border border-ink-700 bg-ink-850 shadow-2xl">
                  <ul className="w-56 shrink-0 border-l border-ink-700 bg-ink-900 py-2">
                    {megaMenu.map((m, i) => (
                      <li key={m.title}>
                        <button
                          className={`group flex w-full items-center gap-2.5 px-4 py-2.5 text-right text-[13px] transition ${
                            i === 0 ? "bg-ink-850 text-brand-400" : "text-slate-300 hover:bg-ink-850 hover:text-brand-400"
                          }`}
                        >
                          <span>{m.icon}</span>
                          <span className="flex-1">{m.title}</span>
                          <ChevronDown className="h-4 w-4 -rotate-90 opacity-40" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="grid flex-1 grid-cols-3 gap-6 p-6">
                    {megaMenu[0].cols.map((c) => (
                      <div key={c.head}>
                        <h4 className="mb-3 text-[13px] font-bold text-brand-400">{c.head}</h4>
                        <ul className="space-y-2 text-[12.5px] text-mute">
                          {c.items.map((it) => (
                            <li key={it}>
                              <a href="#" className="transition hover:text-slate-100">
                                {it}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-purple-700 p-4">
                      <p className="text-xs text-white/80">پیشنهاد ویژه هفته</p>
                      <p className="mt-1 text-lg font-extrabold text-white">تا ۵۰٪ تخفیف</p>
                      <p className="mt-2 text-[11px] text-white/80">روی کالکشن پاییز و زمستان</p>
                      <button className="mt-4 rounded-xl bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur transition hover:bg-white/25">
                        مشاهده
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((l, i) => (
              <a
                key={l}
                href="#"
                className={`transition hover:text-brand-400 ${i === 0 ? "text-white" : "text-slate-300"}`}
              >
                {l}
              </a>
            ))}

            <span className="mr-auto flex items-center gap-1.5 text-[12px] text-gold-400">
              🔥 تخفیف‌های شگفت‌انگیز امروز فعال است
            </span>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawer ? "" : "pointer-events-none"}`}
        aria-hidden={!drawer}
      >
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity ${drawer ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawer(false)}
        />
        <aside
          className={`absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-ink-900 transition-transform duration-300 ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink-800 p-4">
            <span className="flex items-center gap-2 font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">پ</span>
              پارس کالا
            </span>
            <button onClick={() => setDrawer(false)} className="text-mute">
              <Close />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <p className="mb-2 text-[11px] text-mute">دسته‌بندی کالاها</p>
            <ul className="mb-5 space-y-1">
              {megaMenu.map((m) => (
                <li key={m.title}>
                  <a href="#" className="flex items-center gap-3 rounded-xl bg-ink-850 px-3 py-3 text-[13px] text-slate-200">
                    <span>{m.icon}</span>
                    {m.title}
                    <ChevronDown className="mr-auto h-4 w-4 -rotate-90 text-mute" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mb-2 text-[11px] text-mute">دسترسی سریع</p>
            <ul className="space-y-1 text-[13px] text-slate-300">
              {navLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="block rounded-xl px-3 py-2.5 transition hover:bg-ink-850">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-ink-800 p-4">
            <button
              onClick={() => {
                setDrawer(false);
                onOpenLogin();
              }}
              className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white"
            >
              ورود / ثبت نام
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
