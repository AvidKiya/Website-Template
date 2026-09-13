import {
  AppleIcon,
  BagIcon,
  HeadsetIcon,
  MapPinIcon,
  PhoneIcon,
  PlayIcon,
  ShieldIcon,
} from "./icons";

function ColTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-[13px] font-black">{children}</h4>;
}

const quickLinks = ["خرید از دسته‌بندی‌ها", "فروش ویژه", "کد تخفیف", "همکاری در فروش", "پیگیری سفارش", "تماس با ما"];
const serviceLinks = [
  "پرسش پرتکرار",
  "رویه بازگشت کالا",
  "شرایط بازگشت کالا",
  "ارسال به سراسر کشور",
  "قوانین و مقررات",
  "حریم خصوصی",
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-line/70 bg-ink-2/70">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-b from-accent to-accent-2 shadow-lg shadow-accent/25">
              <BagIcon className="h-6 w-6 text-accent-ink" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black">پارس کالا</span>
              <span className="block text-[10.5px] text-mist">فروشگاه اینترنتی</span>
            </span>
          </div>
          <p className="mt-4 text-[12px] leading-7 text-mist">
            فروشگاه اینترنتی پارس کالا، بررسی، انتخاب و خرید آنلاین؛ پارس کالا به عنوان یکی از قدیمی‌ترین فروشگاه‌های
            اینترنتی با بیش از یک دهه تجربه، با پایبندی به سه اصل، پرداخت در محل، ۷ روز ضمانت بازگشت کالا و تضمین
            اصل‌بودن کالا موفق شده است همگام با فروشگاه‌های معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی ایران تبدیل شود.
          </p>
        </div>

        <div>
          <ColTitle>دسترسی سریع</ColTitle>
          <ul className="mt-4 space-y-2.5 text-[12.5px] text-mist">
            {quickLinks.map((x) => (
              <li key={x}>
                <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-accent">
                  {x}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColTitle>خدمات مشتریان</ColTitle>
          <ul className="mt-4 space-y-2.5 text-[12.5px] text-mist">
            {serviceLinks.map((x) => (
              <li key={x}>
                <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-accent">
                  {x}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-line/70 bg-card p-3.5 text-[11.5px] text-mist">
            <MapPinIcon className="h-4.5 w-4.5 shrink-0 text-accent" />
            <span>تهران، خیابان ولیعصر، خیابان پاسداران، ساختمان پارس کلاش</span>
          </div>
        </div>

        <div>
          <ColTitle>دانلود اپلیکیشن</ColTitle>
          <p className="mt-4 text-[12px] leading-6 text-mist">
            اپلیکیشن پارس کالا را روی گوشی خود نصب کنید تا همیشه از تخفیف‌ها باخبر باشید.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-card px-4 py-2.5 transition hover:border-accent/50"
            >
              <AppleIcon className="h-6 w-6 text-snow/85" />
              <span className="text-right leading-tight">
                <span className="block text-[9px] text-mist">دانلود از</span>
                <span className="block text-[12px] font-bold">App Store</span>
              </span>
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-card px-4 py-2.5 transition hover:border-accent/50"
            >
              <PlayIcon className="h-5.5 w-5.5 text-snow/85" />
              <span className="text-right leading-tight">
                <span className="block text-[9px] text-mist">دانلود از</span>
                <span className="block text-[12px] font-bold">Google Play</span>
              </span>
            </a>
          </div>
          <div className="mt-4 rounded-2xl border border-line/70 bg-card p-4 text-[12px] text-mist">
            <p className="flex items-center gap-2 font-bold text-snow/90">
              <HeadsetIcon className="h-4.5 w-4.5 text-accent" />
              پشتیبانی ۲۴ ساعته
            </p>
            <p className="mt-2.5 flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-accent" />
              <span dir="ltr" className="font-bold text-snow/90">
                061-535-10225
              </span>
            </p>
            <p className="mt-2 flex items-center gap-2">
              <span className="text-[10px]">ایمیل:</span>
              <span dir="ltr" className="tracking-wide">
                info@parskala.com
              </span>
            </p>
            <p className="mt-3 border-t border-line/60 pt-3 text-[11px] leading-5">
              هفت روز هفته، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">
          <p className="text-[11.5px] text-mist">© ۱۴۳ فروشگاه پارس کالا — تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-1.5 text-[10px] font-bold text-mist">
              <ShieldIcon className="h-3.5 w-3.5 text-accent" />
              نماد اعتماد الکترونیکی
            </span>
            <span className="rounded-lg border border-line bg-card px-3 py-1.5 text-[10px] font-bold text-mist">درگاه زرین‌پال</span>
            <span className="rounded-lg border border-line bg-card px-3 py-1.5 text-[10px] font-bold text-mist">پایانه شاپرک</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
