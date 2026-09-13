import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { useCart } from "../cart";
import { useScrolled } from "../hooks";
import {
  CAT_LABEL,
  MEGA_MENU,
  NAV_LINKS,
  PRODUCTS,
  faNum,
  faPrice,
  type Product,
} from "../data/store";
import {
  Cart,
  ChevronDown,
  Close,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  Clock,
  User,
  Zap,
} from "./Icons";

/* ------------------------------ logo ------------------------------ */

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex shrink-0 items-center gap-2.5">
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-ember to-emberdeep text-white shadow-glow transition-transform duration-300 group-hover:rotate-6">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M15.8 3.2a8.6 8.6 0 1 0 4.6 12.9A7.2 7.2 0 0 1 15.8 3.2z" />
          <path d="M14 5.5h6l-.8 2.2h-5.6z" opacity=".9" />
        </svg>
        <span className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full border-2 border-ink bg-gold" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[26px] text-snow">شب‌بازار</span>
          <span className="mt-1 block text-[10px] font-medium tracking-widest text-faint">
            فروشگاه اینترنتی کالای دیجیتال
          </span>
        </span>
      )}
    </a>
  );
}

/* ------------------------------ top bar ------------------------------ */

function TopBar() {
  return (
    <div className="border-b border-line/70 bg-coal/80 text-xs text-mute">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <a href="tel:02191000240" className="flex items-center gap-1.5 transition-colors hover:text-snow">
            <Phone className="h-3.5 w-3.5" />
            <span className="ltr-phone font-semibold tracking-wide">{faNum("021-9100-0240")}</span>
          </a>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <a
            href="mailto:info@shabbazar.ir"
            className="hidden items-center gap-1.5 transition-colors hover:text-snow sm:flex"
          >
            <Mail className="h-3.5 w-3.5" />
            info@shabbazar.ir
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 md:flex">
            <Clock className="h-3.5 w-3.5 text-jade" />
            هفت روز هفته، ۲۴ ساعته پاسخگوی شماییم
          </span>
          <a href="#contact" className="transition-colors hover:text-ember">
            پیگیری سفارش
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ search ------------------------------ */

function SearchBox({ onPick }: { onPick?: () => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const { setQuick } = useCart();
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const t = q.trim();
    if (t.length < 2) return [];
    return PRODUCTS.filter((p) => p.title.includes(t)).slice(0, 5);
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (p: Product) => {
    setQuick(p);
    setQ("");
    setOpen(false);
    onPick?.();
  };

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="flex h-11 items-center gap-2 rounded-xl border border-line bg-raise px-3 transition-colors focus-within:border-ember/60">
        <Search className="h-5 w-5 shrink-0 text-faint" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="جستجو در شب‌بازار؛ مثلاً آیفون، هدفون، پلی‌استیشن..."
          className="w-full bg-transparent text-sm text-snow placeholder:text-faint focus:outline-none"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-faint transition-colors hover:text-snow"
            aria-label="پاک کردن جستجو"
          >
            <Close className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="anim-fadeUp absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-line bg-coal shadow-card">
          <p className="border-b border-line/70 px-4 py-2 text-[11px] font-medium text-faint">
            {faNum(results.length)} نتیجه برای «{q}»
          </p>
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => pick(p)}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-right transition-colors hover:bg-hover"
            >
              <img src={p.image} alt={p.title} className="h-11 w-11 rounded-lg border border-line object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs text-snow">{p.title}</span>
                <span className="mt-0.5 block text-[11px] text-mute">{CAT_LABEL[p.category]}</span>
              </span>
              <span className="shrink-0 text-xs font-bold text-ember">
                {faPrice(p.price)}
                <span className="mr-1 text-[10px] font-normal text-mute">تومان</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {open && q.trim().length >= 2 && results.length === 0 && (
        <div className="anim-fadeUp absolute inset-x-0 top-[calc(100%+8px)] z-50 rounded-xl border border-line bg-coal px-4 py-4 text-center text-xs text-mute shadow-card">
          چیزی برای «{q}» پیدا نکردیم؛ عبارت دیگری را امتحان کنید.
        </div>
      )}
    </div>
  );
}

/* ------------------------------ header ------------------------------ */

function Header() {
  const { count, wishlist, setDrawerOpen, push } = useCart();
  const scrolled = useScrolled(14);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-ink/90 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "border-line/80 shadow-[0_10px_35px_rgb(0_0_0/0.45)]" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center gap-4 px-4 lg:gap-6">
        <Logo />

        <div className="hidden flex-1 md:block">
          <SearchBox />
        </div>

        <div className="ms-auto flex items-center gap-2 lg:gap-3">
          <button
            onClick={() => push("ورود و ثبت‌نام به‌زودی فعال می‌شود", "info")}
            className="hidden items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-snow transition-all hover:border-ember/60 hover:text-ember lg:flex"
          >
            <User className="h-5 w-5" />
            ورود | ثبت‌نام
          </button>

          <span className="hidden h-8 w-px bg-line lg:block" />

          <button
            aria-label="علاقه‌مندی‌ها"
            className="relative grid h-11 w-11 place-items-center rounded-xl border border-line text-mute transition-all hover:border-ember/60 hover:text-ember"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="anim-pop absolute -top-1.5 -left-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                {faNum(wishlist.length)}
              </span>
            )}
          </button>

          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="سبد خرید"
            className="relative flex h-11 items-center gap-2 rounded-xl bg-ember px-3.5 text-sm font-bold text-white shadow-glow transition-all hover:bg-emberdeep sm:px-4"
          >
            <Cart className="h-5 w-5" />
            <span className="hidden sm:inline">سبد خرید</span>
            <span
              key={count}
              className="anim-pop grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-black text-emberdeep"
            >
              {faNum(count)}
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <SearchBox />
      </div>
    </header>
  );
}

/* ------------------------------ nav + mega menu ------------------------------ */

function Nav() {
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  return (
    <nav className="relative z-30 border-b border-line/70 bg-coal/60">
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-1 px-4">
        {/* mega menu trigger */}
        <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
          <button
            onClick={() => setMega((v) => !v)}
            className={cn(
              "flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-bold transition-colors",
              mega ? "bg-hover text-snow" : "text-snow hover:bg-hover"
            )}
          >
            <Menu className="h-5 w-5 text-ember" />
            دسته‌بندی کالاها
            <ChevronDown className={cn("h-4 w-4 text-faint transition-transform", mega && "rotate-180")} />
          </button>

          {mega && (
            <div className="anim-fadeUp absolute top-[calc(100%+10px)] right-0 z-50 w-[720px] max-w-[92vw] rounded-xl border border-line bg-coal p-6 shadow-card">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
                {MEGA_MENU.map((col) => (
                  <div key={col.title}>
                    <a href="#bestsellers" className="mb-3 flex items-center gap-2 font-bold text-ember">
                      <Zap className="h-4 w-4" />
                      {col.title}
                    </a>
                    <ul className="space-y-2.5">
                      {col.links.map((l) => (
                        <li key={l}>
                          <a
                            href="#bestsellers"
                            className="text-[13px] text-mute transition-all hover:pr-1 hover:text-snow"
                          >
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="rounded-lg border border-dashed border-line bg-raise/60 p-4 text-[12px] leading-6 text-mute">
                  <p className="mb-1 font-bold text-snow">بیش از ۲٬۰۰۰ کالای دیجیتال</p>
                  همه‌ی کالاها با ضمانت اصالت، ۷ روز مهلت بازگشت و ارسال سریع به سراسر کشور عرضه می‌شوند.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden h-5 w-px bg-line md:block" />

        <div className="no-scrollbar hidden flex-1 items-center gap-1 overflow-x-auto md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={cn(
                "relative h-9 shrink-0 px-3 leading-9 text-[13px] font-medium transition-colors hover:text-snow",
                l.hot ? "flex items-center gap-1 font-bold text-ember hover:text-ember" : "text-mute"
              )}
            >
              {l.hot && <Zap className="h-3.5 w-3.5" />}
              {l.label}
              {l.hot && (
                <span className="absolute inset-x-3 bottom-0.5 h-px bg-gradient-to-l from-transparent via-ember/70 to-transparent" />
              )}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobile(true)}
          className="ms-auto grid h-9 w-9 place-items-center rounded-lg text-mute transition-colors hover:bg-hover hover:text-snow md:hidden"
          aria-label="منوی موبایل"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* mobile drawer */}
      {mobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="anim-overlay absolute inset-0 bg-ink/75 backdrop-blur-sm" onClick={() => setMobile(false)} />
          <div className="anim-fadeUp absolute inset-y-0 right-0 flex w-[84%] max-w-sm flex-col bg-coal shadow-card">
            <div className="flex items-center justify-between border-b border-line px-4 py-4">
              <Logo />
              <button
                onClick={() => setMobile(false)}
                className="grid h-9 w-9 place-items-center rounded-lg text-mute hover:bg-hover hover:text-snow"
                aria-label="بستن منو"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <p className="mb-2 px-2 text-[11px] font-bold text-faint">منوی اصلی</p>
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => setMobile(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-3 text-sm transition-colors hover:bg-hover",
                        l.hot ? "font-bold text-ember" : "text-snow"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {l.hot && <Zap className="h-4 w-4" />}
                        {l.label}
                      </span>
                      <span className="text-faint">‹</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mb-2 mt-6 px-2 text-[11px] font-bold text-faint">دسته‌بندی‌ها</p>
              <ul className="space-y-1">
                {MEGA_MENU.map((m) => (
                  <li key={m.title}>
                    <a
                      href="#bestsellers"
                      onClick={() => setMobile(false)}
                      className="block rounded-lg px-3 py-3 text-sm text-mute transition-colors hover:bg-hover hover:text-snow"
                    >
                      {m.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-line p-4">
              <a
                href="tel:02191000240"
                className="flex items-center justify-center gap-2 rounded-xl bg-ember py-3 text-sm font-bold text-white"
              >
                <Phone className="h-4 w-4" />
                تماس با پشتیبانی
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function HeaderGroup() {
  return (
    <div id="top">
      <TopBar />
      <Header />
      <Nav />
    </div>
  );
}
