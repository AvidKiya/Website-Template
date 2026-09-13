import SafeImg from "./SafeImg";
import { IconChevron, Social } from "./Icons";
import { LOGO, appBadges, footerCols, trustBadges, P } from "../data/site";
import { toFa } from "../lib/utils";

const socials = [
  { k: "instagram", el: Social.instagram },
  { k: "telegram", el: Social.telegram },
  { k: "whatsapp", el: Social.whatsapp },
  { k: "twitter", el: Social.twitter },
  { k: "youtube", el: Social.youtube },
  { k: "linkedin", el: Social.linkedin },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-ink-850 bg-ink-900">
      {/* support bar */}
      <div className="border-b border-ink-850">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-3 text-center lg:text-right">
          <p className="text-[13px] text-ink-200">
            <span className="text-white font-semibold">پشتیبانی</span>
            <span className="mx-3 text-ink-500">|</span>
            شماره تماس:{" "}
            <span className="digits text-ink-100">{toFa("061-535-10225")}</span>
            <span className="mx-3 text-ink-500">|</span>
            آدرس ایمیل: <span className="text-ink-100">info@parskala.com</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[12px] text-ink-400">
              هفت روز هفته ، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم.
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 text-[12px] text-ink-200 border border-ink-700 rounded-xl px-3 h-9 hover:border-brand-500 hover:text-white transition-colors"
            >
              بازگشت به بالا
              <IconChevron className="w-3.5 h-3.5 -rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="mx-auto max-w-[1440px] px-4 lg:px-6 py-10 grid grid-cols-2 lg:grid-cols-12 gap-8">
        <div className="col-span-2 lg:col-span-4">
          <div className="flex items-center gap-3">
            <SafeImg
              src={LOGO}
              alt="پارس کالا"
              contain
              className="h-11 w-auto"
              wrapClassName="w-11 h-11 rounded-xl"
              fallbackText="PK"
            />
            <div>
              <p className="text-white font-bold text-[15px]">فروشگاه پارس کالا</p>
              <p className="text-[11.5px] text-ink-400 mt-0.5">
                برترین قالب فروشگاهی ایران
              </p>
            </div>
          </div>

          <p className="mt-5 text-[12.5px] leading-7 text-ink-400 max-w-sm">
            از جدیدترین تخفیفات ما خبردار شوید...
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-3 flex items-center gap-2 max-w-sm"
          >
            <input
              placeholder="ایمیل یا شماره موبایل"
              className="flex-1 h-11 rounded-xl bg-ink-850 border border-ink-700 px-4 text-[12.5px] outline-none focus:border-brand-500 transition-colors"
            />
            <button className="h-11 px-6 rounded-xl bg-gradient-to-l from-brand-600 to-brand-500 text-white text-[12.5px]">
              ثبت
            </button>
          </form>

          <p className="mt-7 text-[12.5px] text-ink-200">شبکه های داغ ما در فضای مجازی..</p>
          <div className="mt-3 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.k}
                href="#"
                aria-label={s.k}
                className="w-10 h-10 rounded-xl border border-ink-700 bg-ink-850 text-ink-300 grid place-items-center hover:text-white hover:border-brand-500 hover:bg-brand-500/10 transition-colors"
              >
                {s.el("w-[18px] h-[18px]")}
              </a>
            ))}
          </div>
        </div>

        {footerCols.map((c) => (
          <div key={c.title} className="lg:col-span-2">
            <p className="text-[13.5px] font-semibold text-white">{c.title}</p>
            <ul className="mt-4 space-y-3">
              {c.items.map((it) => (
                <li key={it}>
                  <a
                    href="#"
                    className="text-[12.5px] text-ink-400 hover:text-brand-400 transition-colors"
                  >
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 lg:col-span-2">
          <p className="text-[13.5px] font-semibold text-white">دانلود اپلیکیشن</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {appBadges.map((b) => (
              <a key={b} href="#" className="rounded-xl overflow-hidden border border-ink-700 bg-ink-850">
                <SafeImg
                  src={b}
                  alt="دانلود اپلیکیشن"
                  contain
                  className="w-full h-10 p-1"
                  wrapClassName="w-full h-10"
                  fallbackText="App"
                />
              </a>
            ))}
          </div>
          <a
            href="#"
            className="mt-3 flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-850 p-2.5"
          >
            <SafeImg
              src={P + "favicon-dark-1.png"}
              alt="پارس کالا"
              contain
              className="w-7 h-7"
              wrapClassName="w-7 h-7 rounded-lg"
              fallbackText="PK"
            />
            <span className="text-[11.5px] text-ink-200">دانلود اپلیکیشن پارس کالا</span>
          </a>
        </div>
      </div>

      {/* seo text */}
      <div className="border-t border-ink-850">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="text-[14px] font-bold text-white">
              فروشگاه اینترنتی پارس کالا، بررسی، انتخاب و خرید آنلاین
            </h2>
            <p className="mt-3 text-[12px] leading-7 text-ink-400 max-w-4xl">
              پارس کالا به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی با بیش از یک دهه تجربه، با
              پایبندی به سه اصل، پرداخت در محل، ۷ روز ضمانت بازگشت کالا و تضمین اصل‌بودن کالا موفق
              شده تا همگام با فروشگاه‌های معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی ایران تبدیل شود.
              به محض ورود به سایت پارس کالا با دنیایی از کالا رو به رو می‌شوید! هر آنچه که نیاز
              دارید و به ذهن شما خطور می‌کند در اینجا پیدا خواهید کرد.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {trustBadges.map((t) => (
              <a
                key={t}
                href="#"
                className="w-[86px] h-[86px] rounded-2xl bg-ink-850 border border-ink-700 grid place-items-center overflow-hidden"
              >
                <SafeImg
                  src={t}
                  alt="نماد اعتماد"
                  contain
                  className="w-full h-full p-2"
                  wrapClassName="w-full h-full"
                  fallbackText="نماد"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ink-850">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-6 py-5 text-center text-[11.5px] leading-6 text-ink-500">
          استفاده از مطالب فروشگاه اینترنتی پارس کالا فقط برای مقاصد غیرتجاری و با ذکر منبع بلامانع
          است. کلیه حقوق این سایت متعلق به پارس کالا می‌باشد.
          <span className="digits"> Copyright © 2006 - {toFa(2026)}</span>
        </div>
      </div>
    </footer>
  );
}
