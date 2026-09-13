import { useEffect, useRef, useState } from "react";
import { cn, px, money, fa } from "../lib/utils";
import { products } from "../data/shop";
import { useShop } from "../lib/store";
import { Link, navigate, useRoute } from "../lib/router";
import {
  Search,
  Cart,
  User,
  Phone,
  Menu,
  Close,
  Info,
  BoxSearch,
  Lifebuoy,
  Grid,
  Heart,
  Sms,
  Support,
  Fire,
} from "./Icons";
import { Logo } from "./Logo";

const NAV = [
  { to: "/shop", label: "فروشگاه", Icon: Grid },
  { to: "/faq", label: "پرسش و پاسخ", Icon: Info },
  { to: "/track", label: "پیگیری سفارش", Icon: BoxSearch },
  { to: "/contact", label: "تماس با ما", Icon: Lifebuoy },
];

const POPULAR = ["گوشی و موبایل", "آیفون", "لپ تاپ", "کفش نایکی", "کیف زنانه"];

export function Header() {
  const { count, setCartOpen, setAuthOpen, wish } = useShop();
  const route = useRoute();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [mSearch, setMSearch] = useState(false);
  const [phone, setPhone] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 90);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setDrawer(false);
    setMSearch(false);
    setFocus(false);
  }, [route.path]);

  const results = q.trim()
    ? products
        .filter((p) => (p.title + " " + (p.en ?? "") + " " + p.cat).includes(q.trim()))
        .slice(0, 6)
    : [];

  const submit = (term?: string) => {
    const t = (term ?? q).trim();
    if (!t) return;
    navigate(`/shop?q=${encodeURIComponent(t)}`);
    setQ("");
    setFocus(false);
    setMSearch(false);
  };

  return (
    <>
      <TopBar phone={phone} setPhone={setPhone} />

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-line bg-ink-2/95 backdrop-blur-xl shadow-[0_10px_40px_-20px_#000]"
            : "border-transparent bg-ink-2"
        )}
      >
        <div className="mx-auto max-w-[1320px] px-3 sm:px-5">
          {/* main row */}
          <div
            className={cn(
              "flex items-center gap-3 transition-all duration-300",
              scrolled ? "h-16" : "h-[74px]"
            )}
          >
            <button
              onClick={() => setDrawer(true)}
              className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-fg-dim ring-1 ring-line lg:hidden"
              aria-label="منو"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="shrink-0">
              <Logo />
            </Link>

            <nav className="mr-4 hidden items-center gap-1 lg:flex">
              {NAV.map(({ to, label, Icon }) => {
                const active = route.path === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      "group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-bold transition",
                      active
                        ? "bg-pk/12 text-pk"
                        : "text-fg-dim hover:bg-surface-2 hover:text-white"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {label}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-pk transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="ms-auto flex items-center gap-2">
              <a
                href="tel:09167971886"
                className="hidden items-center gap-2 rounded-xl px-3 py-2 text-fg-dim transition hover:text-white xl:flex"
              >
                <Support className="h-5 w-5 text-pk" />
                <span className="num text-[13px] font-bold" dir="ltr">
                  ۰۹۱۶ ۷۹۷ ۱۸۸۶
                </span>
              </a>
              <button
                onClick={() => setMSearch((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-fg-dim ring-1 ring-line transition hover:text-white sm:hidden"
                aria-label="جستجو"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                to="/shop?tab=wish"
                className="relative hidden h-10 w-10 place-items-center rounded-xl bg-surface-2 text-fg-dim ring-1 ring-line transition hover:text-pk sm:grid"
                aria-label="علاقه‌مندی‌ها"
              >
                <Heart className="h-5 w-5" />
                {!!wish.length && (
                  <span className="num absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-pk px-1 text-[10px] font-black text-white">
                    {fa(wish.length)}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden items-center gap-2 rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-[13px] font-bold text-fg transition hover:border-pk/50 hover:text-pk sm:flex"
              >
                <User className="h-[18px] w-[18px]" />
                ورود / ثبت نام
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 rounded-xl bg-pk px-3.5 py-2.5 text-[13px] font-black text-white shadow-[0_10px_26px_-12px_rgba(239,57,78,1)] transition hover:bg-pk-dark"
              >
                <Cart className="h-[18px] w-[18px]" />
                <span className="hidden sm:inline">سبد خرید</span>
                <span className="num grid h-5 min-w-5 place-items-center rounded-full bg-white/20 px-1 text-[11px] font-black">
                  {fa(count)}
                </span>
              </button>
            </div>
          </div>

          {/* search row */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              scrolled && !mSearch ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
            )}
          >
            <div className={cn("pb-4", mSearch ? "block" : "hidden sm:block")}>
              <div ref={boxRef} className="relative">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-2xl border bg-surface px-4 transition-all",
                    focus ? "border-pk/60 shadow-[0_0_0_4px_rgba(239,57,78,.09)]" : "border-line"
                  )}
                >
                  <Search className="h-5 w-5 shrink-0 text-fg-mute" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setTimeout(() => setFocus(false), 160)}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                    placeholder="جستجو در بین بیش از ۳۴ هزار کالا..."
                    className="h-12 flex-1 bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-mute"
                  />
                  {q && (
                    <button onClick={() => setQ("")} aria-label="پاک کردن">
                      <Close className="h-4 w-4 text-fg-mute hover:text-pk" />
                    </button>
                  )}
                  <button
                    onClick={() => submit()}
                    className="my-1.5 hidden rounded-xl bg-pk px-4 py-2 text-[12px] font-black text-white transition hover:bg-pk-dark sm:block"
                  >
                    جستجو
                  </button>
                </div>

                {focus && (
                  <div className="pop absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
                    <div className="border-b border-line px-4 py-3">
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-black text-fg-mute">
                        <Fire className="h-3.5 w-3.5 text-pk" /> جستجوی پرطرفدار
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR.map((t) => (
                          <button
                            key={t}
                            onMouseDown={() => submit(t)}
                            className="rounded-full bg-surface-2 px-3 py-1.5 text-[11px] font-bold text-fg-dim ring-1 ring-line transition hover:bg-pk hover:text-white"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    {!!results.length && (
                      <ul className="max-h-[320px] overflow-y-auto p-2">
                        {results.map((p) => (
                          <li key={p.id}>
                            <button
                              onMouseDown={() => navigate(`/product/${p.id}`)}
                              className="flex w-full items-center gap-3 rounded-xl p-2 text-start transition hover:bg-surface-2"
                            >
                              <img
                                src={px(p.img, 120)}
                                alt=""
                                className="h-11 w-11 rounded-lg object-cover"
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[12px] font-bold text-fg">
                                  {p.title}
                                </span>
                                <span className="text-[10px] text-fg-mute">{p.cat}</span>
                              </span>
                              <span className="num shrink-0 text-[12px] font-black text-pk">
                                {money(p.price)}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-3 hidden items-center gap-2 sm:flex">
                <span className="text-[11px] font-bold text-fg-mute">
                  جستجوی پرطرفدار:
                </span>
                {POPULAR.map((t) => (
                  <button
                    key={t}
                    onClick={() => submit(t)}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-bold text-fg-dim transition hover:border-pk/50 hover:text-pk"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}

function TopBar({
  phone,
  setPhone,
}: {
  phone: string;
  setPhone: (v: string) => void;
}) {
  const { toast } = useShop();
  const ok = /^09\d{9}$/.test(phone.replace(/\D/g, ""));
  return (
    <div className="relative overflow-hidden bg-gradient-to-l from-pk-dark via-[#8d1830] to-ink">
      <div className="pk-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-center gap-2 px-4 py-2.5 sm:flex-row sm:gap-4">
        <p className="flex items-center gap-2 text-center text-[11.5px] font-bold text-white/90 sm:text-start">
          <Sms className="h-4 w-4 shrink-0 text-white/80" />
          شماره همراه خود را وارد کنید تا آخرین تخفیفات سایت در لحظه پیامک شود.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!ok) return toast("شماره موبایل یا ایمیل نامعتبر است", "info");
            toast("عضویت شما در خبرنامه پیکی ثبت شد ✓");
            setPhone("");
          }}
          className="flex w-full items-center gap-2 sm:w-auto sm:ms-auto"
        >
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            className="num h-9 w-full min-w-0 rounded-xl border border-white/20 bg-black/25 px-3 text-[12px] text-white outline-none transition placeholder:text-white/45 focus:border-white/60 sm:w-48"
          />
          <button className="h-9 shrink-0 rounded-xl bg-white px-3.5 text-[12px] font-black text-pk transition hover:bg-white/90">
            ثبت
          </button>
        </form>
        <p className="hidden items-center gap-1.5 text-[11px] font-bold text-white/80 md:flex">
          <Support className="h-4 w-4" />
          ۲۴ ساعته پاسخگوی شما هستیم
        </p>
      </div>
    </div>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setAuthOpen, wish, compare } = useShop();
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-[61] flex w-[86%] max-w-[320px] flex-col border-l border-line bg-ink-2 transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <Logo />
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-fg-dim"
            aria-label="بستن"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {NAV.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className="mb-1 flex items-center gap-3 rounded-xl bg-surface px-3 py-3 text-[13px] font-bold text-fg ring-1 ring-line"
            >
              <Icon className="h-5 w-5 text-pk" />
              {label}
            </Link>
          ))}
          <div className="my-3 h-px bg-line" />
          <button
            onClick={() => {
              onClose();
              setAuthOpen(true);
            }}
            className="mb-1 flex w-full items-center gap-3 rounded-xl bg-surface px-3 py-3 text-[13px] font-bold text-fg ring-1 ring-line"
          >
            <User className="h-5 w-5 text-pk" /> ورود / ثبت نام
          </button>
          <Link
            to="/shop?tab=wish"
            className="mb-1 flex items-center gap-3 rounded-xl bg-surface px-3 py-3 text-[13px] font-bold text-fg ring-1 ring-line"
          >
            <Heart className="h-5 w-5 text-pk" />
            علاقه‌مندی‌ها
            <span className="num ms-auto text-[11px] text-fg-mute">
              {fa(wish.length)}
            </span>
          </Link>
          <Link
            to="/shop?tab=cmp"
            className="flex items-center gap-3 rounded-xl bg-surface px-3 py-3 text-[13px] font-bold text-fg ring-1 ring-line"
          >
            <Grid className="h-5 w-5 text-pk" />
            لیست مقایسه
            <span className="num ms-auto text-[11px] text-fg-mute">
              {fa(compare.length)}
            </span>
          </Link>
        </div>
        <a
          href="tel:09167971886"
          className="flex items-center justify-center gap-2 border-t border-line bg-surface p-4 text-[13px] font-black text-pk"
        >
          <Phone className="h-4 w-4" />
          <span className="num" dir="ltr">
            ۰۹۱۶ ۷۹۷ ۱۸۸۶
          </span>
        </a>
      </aside>
    </>
  );
}

export function BottomNav() {
  const { count, setCartOpen, setAuthOpen } = useShop();
  const route = useRoute();
  const items = [
    { to: "/", label: "خانه", Icon: Grid, active: route.path === "/" },
    { to: "/shop", label: "دسته‌ها", Icon: Menu, active: route.path === "/shop" },
    { to: "/track", label: "سفارش‌ها", Icon: BoxSearch, active: route.path === "/track" },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink-2/95 backdrop-blur-xl sm:hidden">
      <div className="grid grid-cols-5 items-end px-2 pb-1.5 pt-2">
        {items.map(({ to, label, Icon, active }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex flex-col items-center gap-1 py-1 text-[10px] font-bold transition",
              active ? "text-pk" : "text-fg-mute"
            )}
          >
            <Icon className="h-[22px] w-[22px]" />
            {label}
          </Link>
        ))}
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-1 text-[10px] font-bold text-fg-mute"
        >
          <span className="relative">
            <Cart className="h-[22px] w-[22px]" />
            {!!count && (
              <span className="num absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-pk px-1 text-[9px] font-black text-white">
                {fa(count)}
              </span>
            )}
          </span>
          سبد خرید
        </button>
        <button
          onClick={() => setAuthOpen(true)}
          className="flex flex-col items-center gap-1 py-1 text-[10px] font-bold text-fg-mute"
        >
          <User className="h-[22px] w-[22px]" />
          پارس کالا
        </button>
      </div>
    </nav>
  );
}
