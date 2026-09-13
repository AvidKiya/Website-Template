import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "../utils/cn";
import {
  byTab,
  deals,
  fa,
  features,
  img,
  promoCards,
  tabs,
  tripleBanners,
  brands,
  type Product,
} from "../data";
import ProductCard from "./ProductCard";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ClockIcon,
  GiftIcon,
  MessageIcon,
  ShieldIcon,
  SparkIcon,
  StoreIcon,
  WalletIcon,
  ZapIcon,
} from "./icons";

type CardProps = {
  wished: Set<number>;
  onWish: (id: number) => void;
  onAdd: (p: Product) => void;
};

/* ---------- gradient title band ---------- */
export function Band({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-gradient-to-l from-[#0f2e19] via-panel to-ink-2">
      <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <h2 className="relative px-6 py-6 text-center text-lg font-black tracking-tight sm:text-2xl">{children}</h2>
    </div>
  );
}

/* ---------- vertical promo cards ---------- */
export function PromoCards() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {promoCards.map((b) => (
        <a
          key={b.title}
          href="#"
          onClick={(e) => e.preventDefault()}
          className={cn(
            "group relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl border border-line/60 bg-gradient-to-b p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-black/40",
            b.grad
          )}
        >
          <span className="self-start rounded-full bg-accent px-3 py-1.5 text-[11px] font-black text-accent-ink shadow-lg shadow-accent/20">
            {b.tag}
          </span>
          <img
            src={b.image}
            alt={b.title}
            loading="lazy"
            className="min-h-0 flex-1 object-contain py-3 drop-shadow-2xl transition duration-500 group-hover:scale-105"
          />
          <div>
            <p className="text-[13px] font-extrabold sm:text-sm">{b.title}</p>
            <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-accent">
              مشاهده محصول
              <ChevronLeftIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ---------- wide banner ---------- */
export function WideBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-l from-[#0d2b18] via-ink-2 to-ink-2">
      <div className="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl anim-glow" />
      <div className="relative z-10 flex items-center justify-between gap-8 px-6 py-8 sm:px-12 sm:py-10">
        <div className="text-center lg:text-right">
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-[11px] font-bold text-accent">
            بیش از ۱۰ سال تجربه
          </span>
          <h3 className="mt-3 text-xl font-black leading-snug sm:text-3xl">خرید هوشمندانه از فروشگاه پارس کالا</h3>
          <p className="mx-auto mt-2.5 max-w-md text-[12.5px] leading-6 text-snow/60 sm:text-sm lg:mx-0">
            تضمین اصل بودن کالا، ۷ روز ضمانت بازگشت و ارسال فوری به سراسر کشور؛ با پایبندی به سه اصل پرداخت در محل
          </p>
          <a
            href="#deals"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-[13px] font-extrabold text-accent-ink shadow-lg shadow-accent/25 transition hover:bg-accent-2"
          >
            همین حالا بخرید
            <ChevronLeftIcon className="h-4 w-4" />
          </a>
        </div>
        <img
          src={img(19269762, 640, 420)}
          alt="لپ‌تاپ"
          loading="lazy"
          className="hidden h-32 w-56 rounded-2xl object-cover ring-1 ring-white/10 md:block lg:h-44 lg:w-80"
        />
      </div>
    </div>
  );
}

/* ---------- triple banners ---------- */
export function TripleBanners() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      {tripleBanners.map((b) => (
        <a
          key={b.title}
          href="#"
          onClick={(e) => e.preventDefault()}
          className={cn(
            "group relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl border border-line/60 bg-gradient-to-b p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/40",
            b.grad
          )}
        >
          <span className="self-start rounded-full border border-accent/40 bg-ink/60 px-3 py-1.5 text-[10.5px] font-bold text-accent backdrop-blur">
            {b.tag}
          </span>
          <img
            src={b.image}
            alt={b.title}
            loading="lazy"
            className="min-h-0 flex-1 object-contain py-3 drop-shadow-2xl transition duration-500 group-hover:scale-105"
          />
          <p className="text-[13px] font-extrabold">{b.title}</p>
        </a>
      ))}
    </div>
  );
}

/* ---------- deals with countdown ---------- */
export function DealsSection({ wished, onWish, onAdd }: CardProps) {
  const target = useRef(Date.now() + (47 * 3600 + 33 * 60 + 12) * 1000);
  const [left, setLeft] = useState(target.current - Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setLeft(Math.max(0, target.current - Date.now())), 1000);
    return () => window.clearInterval(t);
  }, []);

  const h = Math.floor(left / 3600000);
  const m = Math.floor(left / 60000) % 60;
  const s = Math.floor(left / 1000) % 60;

  const cell = (v: number, label: string) => (
    <div className="flex flex-col items-center gap-1">
      <div className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-[#0a2413] text-base font-black tabular-nums text-accent">
        {fa(v)}
      </div>
      <span className="text-[10px] text-mist">{label}</span>
    </div>
  );

  return (
    <section id="deals" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-l from-[#0d2b18] via-panel to-ink-2 p-4 sm:p-6">
        <div className="absolute -left-20 -top-28 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-2.5 text-[15px] font-extrabold sm:text-xl">
            <span className="h-6 w-1.5 rounded-full bg-accent" />
            پرفروش‌ترین محصولات پارس کالا
            <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-[11px] font-bold text-accent">
              فروش ویژه
            </span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-[11px] text-mist sm:flex">
              <ClockIcon className="h-4 w-4 text-accent" />
              زمان باقی مانده
            </span>
            <div className="flex items-center gap-1.5">
              {cell(h, "ساعت")}
              <span className="pb-5 font-black text-accent">:</span>
              {cell(m, "دقیقه")}
              <span className="pb-5 font-black text-accent">:</span>
              {cell(s, "ثانیه")}
            </div>
          </div>
        </div>
        <div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} p={p} wished={wished.has(p.id)} onWish={onWish} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- tabbed latest section ---------- */
export function TabsSection({ wished, onWish, onAdd }: CardProps) {
  const [tab, setTab] = useState<string>(tabs[0].key);
  return (
    <section id="men" className="scroll-mt-24">
      <h2 className="flex items-center gap-2.5 text-[15px] font-extrabold sm:text-lg">
        <span className="h-6 w-1.5 rounded-full bg-accent" />
        جدیدترین‌های <span className="text-accent">مردانه</span>
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-full px-5 py-2 text-[12.5px] font-bold transition",
              tab === t.key
                ? "bg-accent text-accent-ink shadow-lg shadow-accent/20"
                : "border border-line bg-card text-mist hover:border-accent/40 hover:text-snow"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div key={tab} className="anim-fade-up mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {byTab(tab).map((p) => (
          <ProductCard key={p.id} p={p} wished={wished.has(p.id)} onWish={onWish} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

/* ---------- brands marquee ---------- */
export function Brands() {
  return (
    <section id="brands" className="scroll-mt-24">
      <Band>برندهایی که دوست داریم</Band>
      <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(to_left,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-3 pr-3">
              {brands.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-2.5 rounded-2xl border border-line/70 bg-card px-7 py-4 transition hover:border-accent/40 sm:px-9 sm:py-5"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="whitespace-nowrap text-base font-black tracking-wide text-snow/60">{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- about / description box ---------- */
export function AboutBox() {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-3xl border border-line/70 bg-panel p-5 sm:p-8">
      <h2 className="flex items-center gap-2.5 text-[15px] font-extrabold sm:text-lg">
        <span className="h-6 w-1.5 rounded-full bg-accent" />
        درباره فروشگاه پارس کالا
      </h2>
      <div className={cn("relative mt-4 space-y-3 text-[12.5px] leading-7 text-mist", !open && "max-h-44 overflow-hidden")}>
        <p>
          فروشگاه اینترنتی پارس کالا، مرجع بررسی، انتخاب و خرید آنلاین؛ به عنوان یکی از قدیمی‌ترین فروشگاه‌های اینترنتی با
          بیش از یک دهه تجربه، با پایبندی به سه اصل «پرداخت در محل، ۷ روز ضمانت بازگشت کالا و تضمین اصل‌بودن کالا» موفق
          شده است همگام با فروشگاه‌های معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی ایران تبدیل شود.
        </p>
        <p>
          ما با همکاری صدها فروشنده معتبر و برندهای برتر داخلی و خارجی، میلیون‌ها محصول را در دسته‌بندی‌های کالای دیجیتال،
          لوازم خانگی، پوشاک، زیبایی و سلامت و بسیاری از سایر دسته‌ها با بهترین قیمت‌ها و تخفیف‌های لحظه‌ای در اختیار شما
          قرار می‌دهیم تا تجربه‌ی متفاوتی از خرید آنلاین را تجربه کنید.
        </p>
        <p>
          تیم پشتیبانی پارس کالا هفت روز هفته و ۲۴ ساعته آماده پاسخ‌گویی به سؤالات و نیازهای شماست؛ کافی است با شماره
          ۰۶-۵۳-۱۰۲۲۵ تماس بگیرید. رضایت شما مهم‌ترین سرمایه‌ی ماست و همواره در کنار شما هستیم.
        </p>
        {!open && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-panel to-transparent" />}
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-accent transition hover:text-accent-2"
      >
        {open ? "بستن" : "نمایش بیشتر"}
        <ChevronDownIcon className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
    </section>
  );
}

/* ---------- features ---------- */
const featIcons: Record<string, (p: { className?: string }) => React.ReactNode> = {
  spark: SparkIcon,
  shield: ShieldIcon,
  wallet: WalletIcon,
  zap: ZapIcon,
  store: StoreIcon,
  gift: GiftIcon,
};
const grads = [
  "from-emerald-400 to-teal-600",
  "from-sky-400 to-blue-600",
  "from-violet-400 to-purple-600",
  "from-amber-400 to-orange-600",
  "from-rose-400 to-pink-600",
  "from-lime-400 to-green-600",
];

export function Features() {
  return (
    <section>
      <h2 className="flex items-center gap-2.5 text-[15px] font-extrabold sm:text-lg">
        <span className="h-6 w-1.5 rounded-full bg-accent" />
        ویژگی مهم خرید از پارس کالا
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {features.map((f, i) => {
          const Ic = featIcons[f.icon];
          return (
            <div
              key={f.title}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-line/60 bg-card p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card-2"
            >
              <span
                className={cn(
                  "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition duration-300 group-hover:scale-110",
                  grads[i]
                )}
              >
                <Ic className="h-6 w-6" />
              </span>
              <div>
                <p className="text-[12.5px] font-extrabold">{f.title}</p>
                <p className="mt-1 text-[10.5px] leading-5 text-mist">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- sms cta ---------- */
export function SmsCta() {
  const [v, setV] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const t = v.trim().replace(/[\s-]/g, "");
    const okMobile = /^09\d{9}$/.test(t);
    const okMail = /^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-zA-Z]{2,}$/.test(t);
    if (!okMobile && !okMail) {
      setErr("شماره موبایل یا ایمیل نامعتبر است");
      return;
    }
    setErr("");
    setOk(true);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-l from-[#0d2b18] via-[#0e1510] to-ink-2 px-6 py-10 text-center sm:py-14">
      <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-accent/30 bg-accent/15 text-accent">
        <MessageIcon className="h-7 w-7" />
      </span>
      <h2 className="relative mx-auto mt-4 max-w-2xl text-lg font-black leading-9 sm:text-2xl sm:leading-11">
        شماره همراه خود را وارد کنید تا آخرین تخفیفات سایت در لحظه پیامک شود.
      </h2>
      {ok ? (
        <div className="anim-fade-up relative mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-5 py-3.5 text-[13px] font-bold text-accent">
          <CheckIcon className="h-5 w-5 shrink-0" />
          شماره شما با موفقیت ثبت شد؛ آخرین تخفیفات برایتان پیامک می‌شود.
        </div>
      ) : (
        <>
          <form onSubmit={submit} noValidate className="relative mx-auto mt-6 flex max-w-md gap-2">
            <input
              dir="auto"
              value={v}
              onChange={(e) => {
                setV(e.target.value);
                if (err) setErr("");
              }}
              placeholder="شماره موبایل یا ایمیل"
              className={cn(
                "h-12 min-w-0 flex-1 rounded-xl border bg-ink/70 px-4 text-sm outline-none transition",
                err ? "border-danger/60" : "border-line focus:border-accent/60"
              )}
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-xl bg-accent px-5 text-[13px] font-black text-accent-ink shadow-lg shadow-accent/25 transition hover:bg-accent-2 sm:px-7"
            >
              دریافت تخفیفات
            </button>
          </form>
          {err && <p className="anim-fade-up relative mt-3 text-[12px] font-bold text-danger">{err}</p>}
        </>
      )}
    </section>
  );
}
