import { useEffect, useRef, useState } from "react";
import SafeImg from "./SafeImg";
import {
  IconBox,
  IconCart,
  IconChevron,
  IconGrid,
  IconHeart,
  IconInfo,
  IconLifebuoy,
  IconMenu,
  IconPhone,
  IconSearch,
  IconUser,
} from "./Icons";
import { LOGO, LOGO_TYPE, megaMenu } from "../data/site";
import { toFa } from "../lib/utils";

type Props = {
  cartCount: number;
  wishCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  onOpenMenu: () => void;
};

const topLinks = [
  { label: "فروشگاه", icon: <IconGrid className="w-4 h-4" /> },
  { label: "پرسش و پاسخ", icon: <IconInfo className="w-4 h-4" /> },
  { label: "پیگیری سفارش", icon: <IconBox className="w-4 h-4" /> },
  { label: "تماس با ما", icon: <IconLifebuoy className="w-4 h-4" /> },
];

const navLinks = [
  "صفحه اصلی",
  "شگفت‌انگیزها",
  "جدیدترین‌ها",
  "پرفروش‌ترین‌ها",
  "برندها",
  "وبلاگ",
  "تماس با ما",
];

const popular = ["گوشی و موبایل", "آیفون", "لپ تاپ", "کفش نایکی", "کیف زنانه"];

export default function Header({
  cartCount,
  wishCount,
  onOpenCart,
  onOpenSearch,
  onOpenLogin,
  onOpenMenu,
}: Props) {
  const [stuck, setStuck] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(0);
  const [focusSearch, setFocusSearch] = useState(false);
  const searchWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchWrap.current && !searchWrap.current.contains(e.target as Node)) {
        setFocusSearch(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="relative z-50">
      {/* ------- top strip ------- */}
      <div className="hidden lg:block border-b border-ink-800 bg-ink-950">
        <div className="mx-auto max-w-[1440px] px-6 h-11 flex items-center justify-between text-[13px] text-ink-300">
          <ul className="flex items-center gap-7">
            {topLinks.map((l) => (
              <li key={l.label}>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span className="text-ink-400">{l.icon}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
              ارسال رایگان برای سفارش‌های بالای {toFa("1,500,000")} تومان
            </span>
            <span className="text-ink-500">|</span>
            <span>پشتیبانی ۲۴ ساعته : {toFa("061-535-10225")}</span>
          </div>
        </div>
      </div>

      {/* ------- main header ------- */}
      <div
        className={`sticky top-0 z-50 transition-all duration-300 ${
          stuck
            ? "bg-ink-900/95 backdrop-blur-xl border-b border-ink-800 shadow-[0_10px_40px_-20px_rgba(0,0,0,.9)]"
            : "bg-ink-950 border-b border-ink-850"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 lg:px-6">
          <div className="h-16 lg:h-[88px] flex items-center gap-3 lg:gap-6">
            <button
              onClick={onOpenMenu}
              className="lg:hidden w-10 h-10 grid place-items-center rounded-xl bg-ink-800 text-ink-100"
              aria-label="منو"
            >
              <IconMenu />
            </button>

            {/* logo */}
            <a href="#" className="flex items-center gap-2 shrink-0">
              <SafeImg
                src={LOGO}
                alt="فروشگاه پارس کالا"
                className="h-9 lg:h-11 w-auto"
                contain
                wrapClassName="w-11 h-11 rounded-xl"
                fallbackText="PK"
              />
              <SafeImg
                src={LOGO_TYPE}
                alt="پارس کالا"
                className="hidden xl:block h-6 w-auto opacity-95"
                contain
                wrapClassName="w-24 h-6 rounded"
                fallbackText="پارس کالا"
              />
            </a>

            {/* search */}
            <div ref={searchWrap} className="relative flex-1 max-w-[620px] hidden md:block">
              <div
                className={`flex items-center gap-3 h-12 rounded-2xl px-4 border transition-all ${
                  focusSearch
                    ? "bg-ink-800 border-brand-500/60 shadow-[0_0_0_4px_rgba(245,2,58,.08)]"
                    : "bg-ink-850 border-ink-700 hover:border-ink-600"
                }`}
              >
                <IconSearch className="w-5 h-5 text-ink-300 shrink-0" />
                <input
                  onFocus={() => setFocusSearch(true)}
                  placeholder="جستجو در بین هزاران کالای پارس کالا ..."
                  className="flex-1 bg-transparent outline-none text-[13.5px] text-ink-100"
                />
                <button
                  onClick={onOpenSearch}
                  className="text-[12px] px-3 py-1.5 rounded-lg bg-ink-700 text-ink-200 hover:bg-brand-500 hover:text-white transition-colors"
                >
                  جستجو
                </button>
              </div>

              {focusSearch && (
                <div className="absolute top-14 inset-x-0 rounded-2xl border border-ink-700 bg-ink-850 p-4 shadow-2xl animate-fade-up">
                  <p className="text-[12px] text-ink-400 mb-3">جستجوی پرطرفدار</p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <button
                        key={p}
                        onClick={onOpenSearch}
                        className="text-[12.5px] px-3 py-1.5 rounded-full border border-ink-700 bg-ink-800 text-ink-200 hover:border-brand-500 hover:text-white transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 md:hidden" />

            {/* actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              <button
                onClick={onOpenSearch}
                className="md:hidden w-10 h-10 grid place-items-center rounded-xl bg-ink-800 text-ink-100"
                aria-label="جستجو"
              >
                <IconSearch />
              </button>

              <a
                href="tel:09167971886"
                className="hidden xl:flex items-center gap-2 h-11 px-4 rounded-xl border border-ink-700 bg-ink-850 text-[13px] text-ink-200 hover:border-brand-500/60 hover:text-white transition-colors"
              >
                <IconPhone className="w-[18px] h-[18px]" />
                {toFa("0916-797-1886")}
              </a>

              <button
                onClick={onOpenLogin}
                className="hidden sm:flex items-center gap-2 h-11 px-4 rounded-xl bg-gradient-to-l from-brand-600 to-brand-500 text-white text-[13px] font-medium hover:brightness-110 transition"
              >
                <IconUser className="w-[18px] h-[18px]" />
                ورود / ثبت نام
              </button>

              <button
                className="relative hidden sm:grid w-11 h-11 place-items-center rounded-xl border border-ink-700 bg-ink-850 text-ink-200 hover:text-white hover:border-ink-600 transition"
                aria-label="علاقه‌مندی"
              >
                <IconHeart />
                {wishCount > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 min-w-5 h-5 px-1 rounded-full bg-brand-500 text-white text-[10px] grid place-items-center">
                    {toFa(wishCount)}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenCart}
                className="relative w-11 h-11 grid place-items-center rounded-xl border border-ink-700 bg-ink-850 text-ink-200 hover:text-white hover:border-ink-600 transition"
                aria-label="سبد خرید"
              >
                <IconCart />
                <span className="absolute -top-1.5 -left-1.5 min-w-5 h-5 px-1 rounded-full bg-brand-500 text-white text-[10px] grid place-items-center">
                  {toFa(cartCount)}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ------- nav / mega menu ------- */}
        <div className="hidden lg:block border-t border-ink-850">
          <div className="mx-auto max-w-[1440px] px-6 h-12 flex items-center gap-6">
            <div
              className="relative h-full"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="h-full flex items-center gap-2 text-[13.5px] font-medium text-ink-100">
                <IconMenu className="w-[18px] h-[18px] text-brand-500" />
                دسته‌بندی کالاها
                <IconChevron className="w-4 h-4 rotate-90 text-ink-400" />
              </button>

              {megaOpen && (
                <div className="absolute top-full right-0 w-[860px] rounded-2xl border border-ink-700 bg-ink-850/98 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-up">
                  <div className="flex">
                    <ul className="w-56 border-l border-ink-700 py-2 bg-ink-900/60">
                      {megaMenu.map((m, i) => (
                        <li key={m.title}>
                          <button
                            onMouseEnter={() => setActiveMega(i)}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors ${
                              activeMega === i
                                ? "bg-ink-800 text-white border-r-2 border-brand-500"
                                : "text-ink-300 hover:text-white"
                            }`}
                          >
                            <span className="text-base">{m.icon}</span>
                            {m.title}
                            <IconChevron className="w-3.5 h-3.5 mr-auto rotate-180 opacity-50" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex-1 p-6">
                      <p className="text-[13px] font-semibold text-white mb-4">
                        {megaMenu[activeMega].title}
                      </p>
                      <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                        {megaMenu[activeMega].items.map((it) => (
                          <a
                            key={it}
                            href="#"
                            className="text-[12.5px] text-ink-300 hover:text-brand-400 transition-colors"
                          >
                            {it}
                          </a>
                        ))}
                      </div>
                      <div className="mt-6 rounded-xl border border-ink-700 bg-gradient-to-l from-brand-700/30 to-transparent p-4">
                        <p className="text-[13px] text-white font-medium">
                          تخفیف ویژه اعضای باشگاه مشتریان پارس کالا
                        </p>
                        <p className="text-[11.5px] text-ink-300 mt-1">
                          با کد <span className="text-gold-400 font-bold">PARS۲۰</span> تا ۲۰٪ تخفیف بگیرید
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <span className="w-px h-5 bg-ink-700" />

            <ul className="flex items-center gap-6">
              {navLinks.map((l, i) => (
                <li key={l}>
                  <a
                    href="#"
                    className={`text-[13px] transition-colors ${
                      i === 0 ? "text-white" : "text-ink-300 hover:text-white"
                    }`}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mr-auto flex items-center gap-2 text-[12px] text-gold-400">
              <span className="px-2 py-1 rounded-md bg-gold-500/10 border border-gold-500/25">
                فروش ویژه پاییزه
              </span>
              <span className="text-ink-400">تا ۶۰٪ تخفیف روی همه کالاها</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
