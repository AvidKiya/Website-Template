import { useEffect, useState } from "react";
import { faIn } from "../data";
import {
  Android,
  Apple,
  ArrowUp,
  Cart,
  Grid,
  Heart,
  Home,
  Instagram,
  Phone,
  Telegram,
  User,
  Whatsapp,
} from "./Icons";

const cols = [
  { h: "راهنمای خرید", items: ["نحوه ثبت سفارش", "رویه ارسال سفارش", "شیوه‌های پرداخت", "پیگیری سفارش"] },
  { h: "خدمات مشتریان", items: ["پاسخ به پرسش‌های متداول", "رویه بازگرداندن کالا", "شرایط استفاده", "حریم خصوصی"] },
  { h: "با پارس کالا", items: ["اتاق خبر پارس کالا", "فروش در پارس کالا", "فرصت‌های شغلی", "تماس با ما"] },
];

export function Footer() {
  const [mail, setMail] = useState("");
  const [ok, setOk] = useState(false);

  return (
    <footer className="mt-10 border-t border-ink-800 bg-ink-950">
      {/* newsletter + app */}
      <div className="mx-auto max-w-[1320px] px-4 py-10">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-ink-700 bg-gradient-to-l from-brand-600/20 to-ink-900 p-6">
            <h3 className="text-base font-extrabold text-white">از جدیدترین تخفیف‌ها باخبر شوید</h3>
            <p className="mt-2 text-[12.5px] text-mute">ایمیل خود را وارد کنید تا پیشنهادهای ویژه برایتان ارسال شود.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (mail) {
                  setOk(true);
                  setMail("");
                  setTimeout(() => setOk(false), 2500);
                }
              }}
              className="mt-4 flex gap-2"
            >
              <input
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="example@email.com"
                className="h-12 flex-1 rounded-2xl border border-ink-700 bg-ink-850 px-4 text-[13px] outline-none placeholder:text-mute focus:border-brand-500"
              />
              <button className="rounded-2xl bg-brand-600 px-6 text-[13px] font-bold text-white transition hover:bg-brand-500">
                عضویت
              </button>
            </form>
            {ok && <p className="mt-2 text-[12px] text-teal-400">عضویت شما با موفقیت ثبت شد ✅</p>}
          </div>

          <div className="rounded-3xl border border-ink-700 bg-ink-900 p-6">
            <h3 className="text-base font-extrabold text-white">اپلیکیشن پارس کالا</h3>
            <p className="mt-2 text-[12.5px] text-mute">خرید سریع‌تر و دریافت تخفیف‌های اختصاصی در اپلیکیشن.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { i: <Apple className="h-6 w-6" />, t: "App Store", s: "دانلود از" },
                { i: <Android className="h-6 w-6" />, t: "Google Play", s: "دریافت از" },
                { i: <span className="text-lg font-black">B</span>, t: "بازار", s: "دانلود از" },
              ].map((a) => (
                <a
                  key={a.t}
                  href="#"
                  className="flex items-center gap-2.5 rounded-2xl border border-ink-700 bg-ink-850 px-4 py-2.5 transition hover:border-brand-500/60"
                >
                  <span className="text-slate-200">{a.i}</span>
                  <span className="leading-tight">
                    <span className="block text-[10px] text-mute">{a.s}</span>
                    <span className="block text-[12.5px] font-semibold text-slate-100">{a.t}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* links */}
      <div className="border-t border-ink-800">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 font-black text-white">
                پ
              </span>
              <div className="leading-tight">
                <p className="text-[15px] font-extrabold text-white">فروشگاه اینترنتی پارس کالا</p>
                <p className="text-[10px] tracking-widest text-mute">PARS KALA STORE</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-[12.5px] leading-7 text-mute">
              پارس کالا به عنوان یکی از قدیمی‌ترین فروشگاه‌های اینترنتی با بیش از یک دهه تجربه، با پایبندی به سه اصل
              پرداخت در محل، ۷ روز ضمانت بازگشت کالا و تضمین اصل بودن کالا در خدمت شماست.
            </p>
            <div className="mt-5 space-y-2 text-[12.5px] text-mute">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-500" /> شماره تماس: {faIn("061-535-10225")}
              </p>
              <p>آدرس ایمیل: info@parskala.com</p>
            </div>
            <div className="mt-5 flex gap-2.5">
              {[<Instagram key="i" />, <Telegram key="t" />, <Whatsapp key="w" />].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-ink-700 bg-ink-900 text-mute transition hover:border-brand-500 hover:text-brand-400"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="mb-4 text-[13.5px] font-bold text-white">{c.h}</h4>
              <ul className="space-y-2.5 text-[12.5px] text-mute">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="transition hover:text-brand-400">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* badges */}
      <div className="border-t border-ink-800">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
          <div className="flex gap-3">
            {["نماد اعتماد", "ساماندهی", "اتحادیه کشوری"].map((n) => (
              <span
                key={n}
                className="grid h-16 w-16 place-items-center rounded-xl border border-ink-700 bg-ink-900 p-2 text-center text-[9.5px] leading-4 text-mute"
              >
                {n}
              </span>
            ))}
          </div>
          <p className="text-center text-[11.5px] text-mute">
            کلیه حقوق این سایت متعلق به فروشگاه اینترنتی پارس کالا است © {faIn("۱۴۰۴")}
          </p>
        </div>
      </div>
      <div className="h-16 lg:hidden" />
    </footer>
  );
}

export function MobileBar({
  cartCount,
  onOpenCart,
}: {
  cartCount: number;
  onOpenCart: () => void;
}) {
  const items = [
    { i: <Home />, t: "خانه" },
    { i: <Grid />, t: "دسته‌ها" },
    { i: <Cart />, t: "سبد", action: onOpenCart, badge: cartCount },
    { i: <Heart />, t: "علاقه‌مندی" },
    { i: <User />, t: "حساب" },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-800 bg-ink-900/95 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((it, i) => (
          <button
            key={it.t}
            onClick={it.action}
            className={`relative flex flex-1 flex-col items-center gap-1 py-1 text-[10px] ${
              i === 0 ? "text-brand-400" : "text-mute"
            }`}
          >
            {it.i}
            {it.badge ? (
              <span className="absolute right-1/2 top-0 translate-x-4 rounded-full bg-brand-600 px-1.5 text-[9px] font-bold text-white">
                {faIn(it.badge)}
              </span>
            ) : null}
            {it.t}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-20 left-4 z-40 grid h-11 w-11 place-items-center rounded-2xl border border-ink-600 bg-ink-900/90 text-slate-200 backdrop-blur transition-all hover:bg-brand-600 lg:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="بازگشت به بالا"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
