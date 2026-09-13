import { Logo } from "./Logo";
import { Link } from "../lib/router";
import { Phone, Support, Sms, Shield, Truck, Refresh, Chevron } from "./Icons";
import { useState } from "react";
import { useShop } from "../lib/store";

const COLS = [
  {
    title: "با پارس کالا",
    items: [
      { l: "فروشگاه", to: "/shop" },
      { l: "پرسش و پاسخ", to: "/faq" },
      { l: "پیگیری سفارش", to: "/track" },
      { l: "تماس با ما", to: "/contact" },
      { l: "درباره پارس کالا", to: "/contact" },
    ],
  },
  {
    title: "خدمات مشتریان",
    items: [
      { l: "رویه بازگرداندن کالا", to: "/faq" },
      { l: "شرایط استفاده", to: "/faq" },
      { l: "حریم خصوصی", to: "/faq" },
      { l: "گزارش باگ", to: "/contact" },
      { l: "پیگیری سفارش", to: "/track" },
    ],
  },
  {
    title: "راهنمای خرید",
    items: [
      { l: "نحوه ثبت سفارش", to: "/faq" },
      { l: "شیوه‌های پرداخت", to: "/faq" },
      { l: "رویه ارسال سفارش", to: "/faq" },
      { l: "شرایط بازگشت کالا", to: "/faq" },
      { l: "سوالات متداول", to: "/faq" },
    ],
  },
];

const CATS = [
  "کالای دیجیتال",
  "موبایل",
  "لپ تاپ",
  "ساعت هوشمند",
  "مردانه",
  "زنانه",
  "کفش",
  "کیف و کوله",
];

export function Footer() {
  const { toast } = useShop();
  const [mail, setMail] = useState("");

  return (
    <footer className="mt-12 border-t border-line bg-ink-2">
      {/* services */}
      <div className="border-b border-line">
        <div className="mx-auto grid max-w-[1320px] gap-3 px-4 py-7 sm:grid-cols-3">
          {[
            { Icon: Truck, t: "امکان تحویل اکسپرس", s: "در تهران و کرج زیر ۲۴ ساعت" },
            { Icon: Refresh, t: "۷ روز ضمانت بازگشت", s: "بدون قید و شرط، بدون سوال" },
            { Icon: Shield, t: "تضمین اصل‌بودن کالا", s: "کالای اورجینال با ضمانت" },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pk/10 text-pk ring-1 ring-pk/20">
                <Icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-[13px] font-black text-fg">{t}</span>
                <span className="block text-[11px] text-fg-mute">{s}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 py-9">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_repeat(3,.62fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-[11.5px] leading-6 text-fg-mute">
              فروشگاه اینترنتی پارس کالا، بررسی، انتخاب و خرید آنلاین. پارس کالا به
              عنوان یکی از قدیمی‌ترین فروشگاه‌های اینترنتی با بیش از یک دهه تجربه، با
              پایبندی به سه اصل پرداخت در محل، ۷ روز ضمانت بازگشت کالا و تضمین
              اصل‌بودن کالا موفق شده تا همگام با فروشگاه‌های معتبر جهان، به بزرگ‌ترین
              فروشگاه اینترنتی ایران تبدیل شود.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {["نماد اعتماد الکترونیکی", "ساماندهی رسانه‌ها", "اتحادیه کشوری"].map(
                (b) => (
                  <span
                    key={b}
                    className="grid h-20 w-[74px] place-items-center rounded-2xl border border-line bg-surface p-2 text-center text-[8.5px] font-bold leading-3 text-fg-mute transition hover:border-pk/40 hover:text-fg-dim"
                  >
                    <Shield className="mb-1 h-5 w-5 text-pk/70" />
                    {b}
                  </span>
                )
              )}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="mb-3.5 text-[13px] font-black text-white">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.items.map((i) => (
                  <li key={i.l}>
                    <Link
                      to={i.to}
                      className="group flex items-center gap-1.5 text-[11.5px] text-fg-mute transition hover:text-pk"
                    >
                      <Chevron className="h-3 w-3 text-pk/50 transition group-hover:-translate-x-0.5" />
                      {i.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* cats */}
        <div className="mt-9 rounded-3xl border border-line bg-surface p-5">
          <h4 className="mb-3 text-[13px] font-black text-white">
            دسته‌بندی‌های محبوب
          </h4>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <Link
                key={c}
                to="/shop"
                className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[11px] font-bold text-fg-dim transition hover:border-pk/50 hover:text-pk"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        {/* newsletter + contact */}
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!mail.includes("@")) return toast("ایمیل نامعتبر است", "info");
              toast("ایمیل شما ثبت شد ✓");
              setMail("");
            }}
            className="flex flex-col gap-2 rounded-3xl border border-line bg-surface p-4 sm:flex-row sm:items-center"
          >
            <span className="flex items-center gap-2 text-[12px] font-black text-fg">
              <Sms className="h-5 w-5 text-pk" />
              خبرنامه ایمیلی پارس کالا
            </span>
            <div className="flex flex-1 items-center gap-2 sm:ms-auto">
              <input
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                dir="ltr"
                placeholder="email@example.com"
                className="h-11 flex-1 rounded-2xl border border-line bg-ink px-4 text-[12.5px] outline-none transition placeholder:text-fg-mute focus:border-pk/60"
              />
              <button className="h-11 shrink-0 rounded-2xl bg-pk px-5 text-[12.5px] font-black text-white transition hover:bg-pk-dark">
                ثبت ایمیل
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 rounded-3xl border border-line bg-surface p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-pk/10 text-pk ring-1 ring-pk/20">
              <Support className="h-5 w-5" />
            </span>
            <span className="text-[11.5px] leading-5">
              <span className="block font-black text-fg">پاسخگوی شما هستیم</span>
              <span className="num block text-fg-mute">۲۴ ساعته، ۷ روز هفته</span>
            </span>
            <a
              href="tel:09167971886"
              className="num ms-auto flex items-center gap-1.5 rounded-2xl bg-pk px-3 py-2.5 text-[12px] font-black text-white transition hover:bg-pk-dark"
            >
              <Phone className="h-4 w-4" />
              ۰۹۱۶۷۹۷۱۸۸۶
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line py-5">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:text-start">
          <p className="text-[11px] text-fg-mute">
            استفاده از مطالب فروشگاه اینترنتی پارس کالا فقط برای مقاصد غیرتجاری و با
            ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به پارس کالا است.
          </p>
          <p className="text-[11px] font-bold text-fg-mute">
            © {new Date().getFullYear() > 0 ? "۱۴۰۴" : ""} پارس کالا
          </p>
        </div>
      </div>
    </footer>
  );
}
