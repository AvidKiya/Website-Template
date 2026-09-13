import { useMemo, useState } from "react";
import { cn, fa, money } from "../lib/utils";
import { products, brands } from "../data/shop";
import { useCountdown, useShop } from "../lib/store";
import { navigate } from "../lib/router";
import { Rail, SectionTitle } from "./Rail";
import { ProductCard, MiniProduct, DiscountPill } from "./ProductCard";
import {
  Fire,
  Shield,
  Truck,
  Refresh,
  Card,
  Chevron,
  Sparkle,
  Grid,
  Star,
  Support,
  Sms,
} from "./Icons";

/* ------------------------------------------------------------------ */
export function AmazingOffers() {
  const target = useMemo(() => {
    const d = new Date();
    d.setHours(24, 0, 0, 0);
    return d.getTime();
  }, []);
  const { h, m, s } = useCountdown(target);
  const deals = products.filter((p) => p.badge === "پیشنهاد ویژه").slice(0, 12);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-pk/25 bg-[linear-gradient(120deg,#3a0b15_0%,#1b0710_45%,#0d0d11_100%)] p-4 sm:p-5">
      <div className="pk-grid absolute inset-0 opacity-30" />
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-pk/25 blur-3xl" />
      <div className="relative">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-pk text-white shadow-[0_10px_30px_-10px_rgba(239,57,78,1)]">
              <Fire className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-lg font-black text-white sm:text-xl">
                تخفیف‌های باورنکردنی پارس کالا
              </h2>
              <p className="mt-0.5 text-[11px] font-bold text-white/55">
                تا پایان امروز فرصت دارید
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock value={h} />
            <span className="text-lg font-black text-pk">:</span>
            <Clock value={m} />
            <span className="text-lg font-black text-pk">:</span>
            <Clock value={s} />
            <button
              onClick={() => navigate("/shop?sort=off")}
              className="group flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[11.5px] font-black text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white hover:text-pk"
            >
              مشاهده همه
              <Chevron className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            </button>
          </div>
        </div>

        <Rail>
          {deals.map((p) => (
            <div key={p.id} className="w-[172px] shrink-0 snap-start sm:w-[196px]">
              <ProductCard p={p} />
            </div>
          ))}
        </Rail>
      </div>
    </section>
  );
}

function Clock({ value }: { value: number }) {
  return (
    <span className="num grid h-11 w-11 place-items-center rounded-xl border border-pk/30 bg-black/40 text-[15px] font-black text-white shadow-inner">
      {fa(String(value).padStart(2, "0"))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
export function PromoGrid() {
  const items = [
    {
      title: "کیف و کوله",
      sub: "بیش از ۹ مدل پرفروش",
      img: 27174572,
      span: "sm:col-span-2",
      grad: "from-[#26202f]",
    },
    {
      title: "کالای دیجیتال",
      sub: "گجت‌های هوشمند",
      img: 3394653,
      span: "",
      grad: "from-[#10222e]",
    },
    {
      title: "پوشاک مردانه",
      sub: "استایل روز اروپا",
      img: 20248582,
      span: "",
      grad: "from-[#2a1d10]",
    },
    {
      title: "کفش اسپرت",
      sub: "اورجینال با ضمانت",
      img: 19869753,
      span: "sm:col-span-2",
      grad: "from-[#231019]",
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <button
          key={it.title}
          onClick={() => navigate("/shop")}
          className={cn(
            "group relative flex h-[132px] items-center overflow-hidden rounded-2xl border border-line bg-gradient-to-bl to-transparent p-4 text-start sm:h-[150px]",
            it.span,
            it.grad
          )}
        >
          <div className="pk-grid absolute inset-0 opacity-25" />
          <div className="relative z-10 max-w-[58%]">
            <h3 className="text-[15px] font-black text-white sm:text-[17px]">
              {it.title}
            </h3>
            <p className="mt-1 text-[11px] font-bold text-fg-dim">{it.sub}</p>
            <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-black text-pk">
              خرید کنید
              <Chevron className="h-3.5 w-3.5 transition group-hover:-translate-x-1" />
            </span>
          </div>
          <img
            src={`https://images.pexels.com/photos/${it.img}/pexels-photo-${it.img}.jpeg?auto=compress&cs=tinysrgb&w=420&h=420&fit=crop`}
            alt=""
            loading="lazy"
            className="absolute -left-4 bottom-0 h-[112px] w-[112px] rounded-2xl object-cover opacity-80 ring-1 ring-white/10 transition duration-500 group-hover:-translate-x-1 group-hover:scale-105 sm:h-[136px] sm:w-[136px]"
          />
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
const TABS = [
  { key: "best", label: "پرفروش‌ترین", sort: (a: any, b: any) => (b.sold ?? b.votes) - (a.sold ?? a.votes) },
  { key: "new", label: "جدیدترین", sort: (a: any, b: any) => +b.id.slice(1) - +a.id.slice(1) },
  { key: "cheap", label: "ارزان‌ترین", sort: (a: any, b: any) => a.price - b.price },
  { key: "rate", label: "محبوب‌ترین", sort: (a: any, b: any) => b.rate - a.rate },
];

export function TabbedProducts() {
  const [tab, setTab] = useState("best");
  const list = useMemo(() => {
    const t = TABS.find((x) => x.key === tab)!;
    return [...products].sort(t.sort).slice(0, 12);
  }, [tab]);

  return (
    <section>
      <SectionTitle
        title="محبوب‌ترین کالاهای پارس کالا"
        sub="انتخاب مشتریان در ۳۰ روز گذشته"
        action="مشاهده همه"
        onAction={() => navigate("/shop")}
        icon={<Grid className="h-5 w-5" />}
      />
      <div className="no-bar mb-4 flex gap-2 overflow-x-auto rounded-2xl border border-line bg-surface p-1.5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-xl px-4 py-2 text-[12.5px] font-black transition",
              tab === t.key
                ? "bg-pk text-white shadow-[0_10px_24px_-14px_rgba(239,57,78,1)]"
                : "text-fg-dim hover:bg-surface-2 hover:text-white"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function BestTwoCol() {
  const best = [...products].sort((a, b) => b.votes - a.votes).slice(0, 6);
  const viewed = [...products].sort((a, b) => b.rate - a.rate).slice(6, 12);
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-line bg-surface p-4">
        <SectionTitle
          title="پرفروش‌ترین محصولات"
          sub="بیشترین تعداد فروش این هفته"
          action="همه"
          onAction={() => navigate("/shop?sort=pop")}
          accent="gold"
          icon={<Star className="h-5 w-5" />}
        />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {best.map((p) => (
            <MiniProduct key={p.id} p={p} />
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-line bg-surface p-4">
        <SectionTitle
          title="بازدید شده‌های اخیر"
          sub="شاید این‌ها هم به کارتان بیاید"
          action="همه"
          onAction={() => navigate("/shop")}
          accent="sky"
          icon={<Sparkle className="h-5 w-5" />}
        />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {viewed.map((p) => (
            <MiniProduct key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function DealOfDay() {
  const p = products.find((x) => x.id === "p22")!;
  const { add } = useShop();
  const target = useMemo(() => Date.now() + 1000 * 60 * 60 * 9.5, []);
  const { h, m, s } = useCountdown(target);
  return (
    <section className="relative overflow-hidden rounded-3xl border border-gold/25 bg-[linear-gradient(115deg,#2a1f08,#15130a_55%,#0d0d11)] p-5 sm:p-7">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="pk-grid absolute inset-0 opacity-25" />
      <div className="relative grid items-center gap-6 md:grid-cols-[1fr_.85fr]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-[11px] font-black text-gold ring-1 ring-gold/25">
            <Fire className="h-3.5 w-3.5" /> پیشنهاد لحظه‌ای
          </span>
          <h2 className="mt-3 text-xl font-black leading-8 text-white sm:text-3xl sm:leading-[1.5]">
            {p.title}
          </h2>
          <p className="mt-2 max-w-lg text-[12.5px] leading-6 text-fg-dim">{p.desc}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="num text-2xl font-black text-white">
                {money(p.price)}
              </span>
              <span className="text-[12px] font-bold text-fg-dim">تومان</span>
              {!!p.old && (
                <span className="num text-[13px] text-fg-mute line-through">
                  {money(p.old)}
                </span>
              )}
              {!!p.off && <DiscountPill off={p.off} className="scale-110" />}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {[
              { v: h, l: "ساعت" },
              { v: m, l: "دقیقه" },
              { v: s, l: "ثانیه" },
            ].map((t) => (
              <div
                key={t.l}
                className="w-16 rounded-xl border border-gold/25 bg-black/40 py-2 text-center"
              >
                <div className="num text-lg font-black text-gold">
                  {fa(String(t.v).padStart(2, "0"))}
                </div>
                <div className="text-[9.5px] font-bold text-fg-mute">{t.l}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => add(p.id)}
            className="mt-5 rounded-2xl bg-gold px-6 py-3 text-[13px] font-black text-black transition hover:brightness-110"
          >
            افزودن به سبد خرید
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-8 rounded-full bg-gold/25 blur-3xl" />
          <img
            src={`https://images.pexels.com/photos/${p.img}/pexels-photo-${p.img}.jpeg?auto=compress&cs=tinysrgb&w=680&h=680&fit=crop`}
            alt={p.title}
            className="relative mx-auto aspect-square w-full max-w-[320px] rounded-3xl object-cover shadow-[0_30px_70px_-30px_#000] ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
const SERVICES = [
  { Icon: Truck, t: "ارسال سریع", s: "تحویل اکسپرس در تهران" },
  { Icon: Card, t: "پرداخت در محل", s: "پرداخت هنگام تحویل کالا" },
  { Icon: Refresh, t: "۷ روز ضمانت بازگشت", s: "بدون قید و شرط" },
  { Icon: Shield, t: "تضمین اصل بودن", s: "۱۰۰٪ اورجینال" },
  { Icon: Support, t: "پشتیبانی ۲۴ ساعته", s: "۷ روز هفته کنار شما" },
];

export function Services() {
  return (
    <section className="grid grid-cols-2 gap-2.5 rounded-3xl border border-line bg-surface p-3 sm:grid-cols-3 lg:grid-cols-5">
      {SERVICES.map(({ Icon, t, s }) => (
        <div
          key={t}
          className="group flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-surface-2"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-pk/10 text-pk ring-1 ring-pk/20 transition group-hover:bg-pk group-hover:text-white">
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-[12.5px] font-black text-fg">{t}</span>
            <span className="block text-[10.5px] text-fg-mute">{s}</span>
          </span>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function BrandsMarquee() {
  const row = [...brands, ...brands];
  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-surface py-6">
      <SectionTitle
        title="برندهای منتخب پارس کالا"
        sub="بیش از ۱۲۰ برند معتبر داخلی و خارجی"
        icon={<Sparkle className="h-5 w-5" />}
      />
      <div className="group/mq relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" />
        <div className="flex w-max animate-marquee gap-3 px-3">
          {row.map((b, i) => (
            <span
              key={b + i}
              className="grid h-16 w-40 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-[13px] font-black tracking-widest text-fg-dim transition hover:border-pk/40 hover:text-white"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function SmsBanner() {
  const { toast } = useShop();
  const [v, setV] = useState("");
  const ok = /^09\d{9}$/.test(v.replace(/\D/g, ""));
  return (
    <section className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-l from-[#12212e] via-surface to-surface p-6 sm:p-8">
      <div className="pk-grid absolute inset-0 opacity-30" />
      <div className="absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-sky/20 blur-3xl" />
      <div className="relative grid items-center gap-5 md:grid-cols-[1fr_auto]">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky/15 text-sky ring-1 ring-sky/25">
            <Sms className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-base font-black text-white sm:text-lg">
              از تخفیف‌ها زودتر باخبر شوید
            </h2>
            <p className="mt-1 max-w-lg text-[12px] leading-6 text-fg-dim">
              شماره همراه خود را وارد کنید تا آخرین تخفیفات سایت در لحظه برای شما
              پیامک شود.
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!ok) return toast("شماره موبایل یا ایمیل نامعتبر است", "info");
            toast("ثبت شد! منتظر پیامک‌های پارس کالا باشید ✓");
            setV("");
          }}
          className="flex w-full items-center gap-2 md:w-auto"
        >
          <input
            value={v}
            onChange={(e) => setV(e.target.value)}
            inputMode="tel"
            placeholder="شماره موبایل"
            className="num h-12 w-full rounded-2xl border border-line bg-ink px-4 text-[13px] outline-none transition placeholder:text-fg-mute focus:border-sky/60 md:w-56"
          />
          <button className="h-12 shrink-0 rounded-2xl bg-sky px-5 text-[13px] font-black text-white transition hover:brightness-110">
            عضویت
          </button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function AppDownload() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-l from-[#1a1026] via-surface to-surface p-6 sm:p-8">
      <div className="pk-grid absolute inset-0 opacity-25" />
      <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-pk/20 blur-3xl" />
      <div className="relative grid items-center gap-6 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pk/12 px-3 py-1.5 text-[11px] font-black text-pk ring-1 ring-pk/25">
            <Sparkle className="h-3.5 w-3.5" /> اپلیکیشن پارس کالا
          </span>
          <h2 className="mt-3 text-xl font-black leading-8 text-white sm:text-2xl">
            خرید آسان‌تر با اپلیکیشن موبایل پارس کالا
          </h2>
          <p className="mt-2 max-w-lg text-[12.5px] leading-7 text-fg-dim">
            با نصب اپلیکیشن پارس کالا، از تخفیف‌های اختصاصی، پیگیری لحظه‌ای سفارش و
            پرداخت سریع بهره‌مند شوید. اعلان‌های شگفت‌انگیز را زودتر از همه دریافت
            کنید.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {[
              { t: "دانلود از بازار", s: "اندروید" },
              { t: "دانلود مستقیم", s: "فایل APK" },
              { t: "App Store", s: "iOS" },
            ].map((b) => (
              <button
                key={b.t}
                className="group flex items-center gap-2.5 rounded-2xl border border-line bg-surface-2 px-4 py-2.5 text-start transition hover:border-pk/50"
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-pk/12 text-pk transition group-hover:bg-pk group-hover:text-white">
                  <Card className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[11.5px] font-black text-fg">{b.t}</span>
                  <span className="block text-[9.5px] text-fg-mute">{b.s}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[190px] w-[110px] rotate-6 rounded-[22px] border-4 border-line-2 bg-ink p-2 shadow-[0_30px_60px_-25px_#000] sm:h-[220px] sm:w-[126px]">
          <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-line-2" />
          <div className="space-y-1.5">
            <div className="h-10 rounded-lg bg-gradient-to-br from-pk to-pk-dark" />
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-md bg-surface-3" />
              ))}
            </div>
            <div className="h-3 rounded bg-surface-3" />
            <div className="h-3 w-2/3 rounded bg-surface-3" />
            <div className="mt-1 h-6 rounded-lg bg-pk/25 ring-1 ring-pk/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
const POSTS = [
  {
    t: "راهنمای خرید کفش اسپرت اورجینال",
    c: "راهنمای خرید",
    d: "۸ دقیقه",
    img: 19869753,
  },
  {
    t: "۵ نکته طلایی برای خرید کیف چرم",
    c: "مجله پارس کالا",
    d: "۵ دقیقه",
    img: 27174572,
  },
  {
    t: "چطور ساعت هوشمند مناسب انتخاب کنیم؟",
    c: "کالای دیجیتال",
    d: "۶ دقیقه",
    img: 31541678,
  },
];

export function Blog() {
  return (
    <section>
      <SectionTitle
        title="مجله پارس کالا"
        sub="راهنمای خرید و مقالات تخصصی"
        action="همه مقالات"
        onAction={() => navigate("/faq")}
        icon={<Sparkle className="h-5 w-5" />}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        {POSTS.map((b) => (
          <article
            key={b.t}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-line bg-surface transition hover:-translate-y-1 hover:border-pk/40"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={`https://images.pexels.com/photos/${b.img}/pexels-photo-${b.img}.jpeg?auto=compress&cs=tinysrgb&w=700&h=400&fit=crop`}
                alt={b.t}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center gap-2 text-[10.5px] font-bold">
                <span className="rounded-md bg-pk/12 px-2 py-1 text-pk">{b.c}</span>
                <span className="text-fg-mute">مطالعه {b.d}</span>
              </div>
              <h3 className="text-[13.5px] font-black leading-6 text-fg transition group-hover:text-pk">
                {b.t}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
