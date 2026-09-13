import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { faNum } from "../data/store";
import { useScrolled } from "../hooks";
import { Logo } from "./Header";
import {
  ArrowUp,
  Card,
  Instagram,
  Mail,
  Phone,
  Pin,
  Clock,
  Shield,
  Telegram,
  Truck,
  Whatsapp,
  Youtube,
  Box,
} from "./Icons";

const LINK_COLS = [
  {
    title: "دسترسی سریع",
    links: [
      { label: "پیشنهاد شگفت‌انگیز", href: "#amazing" },
      { label: "پرفروش‌ترین‌ها", href: "#bestsellers" },
      { label: "دنیای گیمینگ", href: "#gaming" },
      { label: "پوشیدنی‌های هوشمند", href: "#wearables" },
      { label: "وبلاگ شب‌بازار", href: "#blog" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { label: "پیگیری سفارش", href: "#contact" },
      { label: "شرایط بازگشت کالا", href: "#about" },
      { label: "سوالات متداول", href: "#about" },
      { label: "حریم خصوصی", href: "#about" },
      { label: "گزارش تخلف", href: "#contact" },
    ],
  },
  {
    title: "راهنمای خرید",
    links: [
      { label: "نحوه ثبت سفارش", href: "#about" },
      { label: "روش‌های پرداخت", href: "#about" },
      { label: "ارسال و تحویل", href: "#about" },
      { label: "خرید اقساطی", href: "#about" },
      { label: "باشگاه مشتریان", href: "#about" },
    ],
  },
];

function TrustBadge({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="group flex w-36 cursor-pointer flex-col items-center gap-2 rounded-xl border border-line bg-raise/60 px-3 py-4 text-center transition-all hover:-translate-y-1 hover:border-gold/50">
      {children}
      <p className="text-[10.5px] font-bold leading-4 text-snow">{title}</p>
      <p className="text-[9px] text-faint">{sub}</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 scroll-mt-28 border-t border-line bg-coal/60">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* intro */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[13px] leading-7 text-mute">
              شب‌بازار، فروشگاه اینترنتی کالای دیجیتال با بیش از یک دهه تجربه؛ بررسی تخصصی، قیمت شفاف، ضمانت اصالت و
              ارسال سریع به سراسر کشور. شب‌های روشنِ خرید از این‌جا شروع می‌شود.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {[
                { icon: Instagram, label: "اینستاگرام" },
                { icon: Telegram, label: "تلگرام" },
                { icon: Whatsapp, label: "واتساپ" },
                { icon: Youtube, label: "یوتیوب" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line text-mute transition-all hover:-translate-y-1 hover:border-ember hover:bg-ember hover:text-white"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-3 text-[13px] text-mute">
              <p className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 shrink-0 text-ember" />
                <span dir="ltr">{faNum("021-9100-0240")}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 shrink-0 text-ember" />
                info@shabbazar.ir
              </p>
              <p className="flex items-start gap-2.5">
                <Pin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ember" />
                تهران، خیابان جمهوری، پاساژ علاءالدین ۲، طبقه سوم، پلاک ۳۱۴
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="h-4.5 w-4.5 shrink-0 text-ember" />
                هفت روز هفته، ۲۴ ساعته پاسخگوی شماییم
              </p>
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {LINK_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 flex items-center gap-2 text-sm font-black text-snow">
                  <span className="h-4 w-1 rounded-full bg-ember" />
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group flex items-center gap-1.5 text-[13px] text-mute transition-all hover:pr-1 hover:text-ember"
                      >
                        <span className="h-px w-0 bg-ember transition-all group-hover:w-2.5" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 border-t border-line/70 pt-8">
          <TrustBadge title="نماد اعتماد الکترونیکی" sub="دارای مجوز دو ستاره">
            <Shield className="h-10 w-10 text-gold transition-transform group-hover:scale-110" />
          </TrustBadge>
          <TrustBadge title="نشان ملی ساماندهی" sub="رسانه‌های دیجیتال">
            <Box className="h-10 w-10 text-jade transition-transform group-hover:scale-110" />
          </TrustBadge>
          <TrustBadge title="پرداخت امن شتاب" sub="درگاه‌های معتبر بانکی">
            <Card className="h-10 w-10 text-snow transition-transform group-hover:scale-110" />
          </TrustBadge>
          <TrustBadge title="ارسال به سراسر کشور" sub="تحویل اکسپرس">
            <Truck className="h-10 w-10 text-ember transition-transform group-hover:scale-110" />
          </TrustBadge>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line/70 pt-6 text-[11.5px] text-faint md:flex-row">
          <p>© ۱۴۰۴ کلیه‌ی حقوق این سایت متعلق به فروشگاه اینترنتی شب‌بازار است.</p>
          <p>
            طراحی‌شده با <span className="text-ember">♥</span> برای شب‌زنده‌دارانِ ایران
          </p>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const show = useScrolled(600);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (!show) setHover(false);
  }, [show]);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="بازگشت به بالا"
      className={cn(
        "fixed bottom-6 left-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-coal/90 text-mute shadow-card backdrop-blur-md transition-all duration-300 hover:border-ember hover:text-ember",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <ArrowUp className={cn("h-5 w-5 transition-transform", hover && "-translate-y-0.5")} />
    </button>
  );
}
