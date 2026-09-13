import { useEffect, useRef, useState } from "react";
import { blog, brands, categories, faIn, products, px, pxWide, type Product } from "../data";
import ProductCard from "./ProductCard";
import { Bolt, ChevronLeft, ChevronRight, Refresh, Shield, Support, Truck } from "./Icons";

type ShopProps = {
  onAdd: (p: Product) => void;
  liked: number[];
  onLike: (id: number) => void;
};

/* ---------------- section heading ---------------- */
function Head({ title, sub, more = "مشاهده همه" }: { title: string; sub?: string; more?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-white sm:text-xl">
          <span className="h-5 w-1.5 rounded-full bg-brand-600" />
          {title}
        </h2>
        {sub && <p className="mt-1.5 pr-3.5 text-[12px] text-mute">{sub}</p>}
      </div>
      <a href="#" className="flex shrink-0 items-center gap-1 text-[12.5px] text-mute transition hover:text-brand-400">
        {more}
        <ChevronLeft className="h-4 w-4" />
      </a>
    </div>
  );
}

/* ---------------- categories ---------------- */
export function CategoryStrip() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-8">
      <div className="rounded-3xl border border-ink-700 bg-ink-900 p-5">
        <Head title="خرید بر اساس دسته‌بندی" sub="محبوب‌ترین دسته‌های فروشگاه پارس کالا" more="همه دسته‌ها" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <a
              key={c.title}
              href="#"
              className="group flex w-[110px] shrink-0 flex-col items-center gap-2.5 sm:w-auto"
            >
              <span
                className="grid h-[86px] w-[86px] place-items-center rounded-full text-3xl ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-brand-500/70"
                style={{ background: `linear-gradient(145deg, ${c.from}33, ${c.to}66)` }}
              >
                {c.icon}
              </span>
              <span className="text-center text-[12.5px] font-semibold text-slate-200 transition group-hover:text-brand-400">
                {c.title}
              </span>
              <span className="-mt-1.5 text-[10px] text-mute">{c.en}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- amazing offers ---------------- */
function useCountdown(hours = 8) {
  const [left, setLeft] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v <= 0 ? hours * 3600 : v - 1)), 1000);
    return () => clearInterval(t);
  }, [hours]);
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  return [h, m, s].map((n) => faIn(String(n).padStart(2, "0")));
}

export function AmazingOffers({ onAdd, liked, onLike }: ShopProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [h, m, s] = useCountdown(8);
  const list = products.filter((p) => p.old);

  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 460, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-[1320px] px-4 py-6">
      <div className="overflow-hidden rounded-3xl border border-brand-600/40 bg-gradient-to-l from-brand-600/25 via-ink-900 to-ink-900">
        <div className="flex flex-col gap-4 p-5 lg:flex-row">
          {/* right panel */}
          <div className="flex shrink-0 flex-row items-center justify-between gap-4 lg:w-[210px] lg:flex-col lg:items-start lg:justify-start">
            <div>
              <div className="flex items-center gap-2 text-brand-400">
                <Bolt className="h-5 w-5" />
                <span className="text-xs font-semibold">شگفت‌انگیز</span>
              </div>
              <h2 className="mt-2 text-lg font-extrabold leading-7 text-white lg:text-xl">
                تخفیف‌های باورنکردنی پارس کالا
              </h2>
              <p className="mt-2 hidden text-[12px] text-mute lg:block">
                هر روز محصولاتی با بیشترین میزان تخفیف؛ تا پایان زمان باقی‌مانده فرصت دارید.
              </p>
            </div>
            <div className="flex items-center gap-1.5" dir="ltr">
              {[h, m, s].map((v, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-950 text-base font-extrabold text-white ring-1 ring-brand-600/40">
                    {v}
                  </span>
                  {idx < 2 && <span className="text-brand-400">:</span>}
                </div>
              ))}
            </div>
            <a
              href="#"
              className="hidden w-full rounded-2xl bg-brand-600 py-2.5 text-center text-[13px] font-bold text-white transition hover:bg-brand-500 lg:block"
            >
              مشاهده همه پیشنهادها
            </a>
          </div>

          {/* products rail */}
          <div className="relative min-w-0 flex-1">
            <div ref={ref} className="no-scrollbar flex gap-3.5 overflow-x-auto scroll-smooth pb-1">
              {list.map((p) => (
                <ProductCard key={p.id} p={p} compact onAdd={onAdd} liked={liked.includes(p.id)} onLike={onLike} />
              ))}
            </div>
            <button
              onClick={() => scroll(1)}
              className="absolute -right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-ink-600 bg-ink-950/90 text-slate-200 backdrop-blur transition hover:bg-brand-600 lg:grid"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => scroll(-1)}
              className="absolute -left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-ink-600 bg-ink-950/90 text-slate-200 backdrop-blur transition hover:bg-brand-600 lg:grid"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- promo banners ---------------- */
export function BannerRow() {
  const items = [
    { t: "جمعه سیاه", s: "تا ۷۰٪ تخفیف", img: 8108574, g: "from-ink-950/90 to-brand-600/40" },
    { t: "کالکشن زنانه", s: "جدیدترین مدل‌ها", img: 6835877, g: "from-ink-950/90 to-purple-600/40" },
    { t: "ارسال رایگان", s: "سفارش بالای ۲ میلیون", img: 18393313, g: "from-ink-950/90 to-teal-500/30" },
  ];
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((b) => (
          <a
            key={b.t}
            href="#"
            className="group relative h-[130px] overflow-hidden rounded-2xl border border-ink-700 sm:h-[150px]"
          >
            <img
              src={pxWide(b.img)}
              alt={b.t}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-l ${b.g}`} />
            <div className="absolute inset-y-0 right-0 flex flex-col justify-center gap-1 p-5">
              <h3 className="text-base font-extrabold text-white">{b.t}</h3>
              <p className="text-[12px] text-white/75">{b.s}</p>
              <span className="mt-1 flex items-center gap-1 text-[11px] text-brand-400">
                مشاهده <ChevronLeft className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- tabbed product grid ---------------- */
const tabs = [
  { key: "پرفروش‌ترین", filter: (p: Product) => p.sold > 60 },
  { key: "جدیدترین", filter: (p: Product) => p.id > 8 },
  { key: "محبوب‌ترین", filter: (p: Product) => p.rate >= 4.4 },
  { key: "ارزان‌ترین", filter: (p: Product) => p.price < 800000 },
];

export function ProductTabs({ onAdd, liked, onLike }: ShopProps) {
  const [tab, setTab] = useState(0);
  const list = products.filter(tabs[tab].filter).slice(0, 10);

  return (
    <section className="mx-auto max-w-[1320px] px-4 py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-white sm:text-xl">
          <span className="h-5 w-1.5 rounded-full bg-brand-600" />
          محصولات فروشگاه
        </h2>
        <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-2xl border border-ink-700 bg-ink-900 p-1.5">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setTab(i)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-[12.5px] font-semibold transition ${
                i === tab ? "bg-brand-600 text-white" : "text-mute hover:text-slate-200"
              }`}
            >
              {t.key}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {list.map((p) => (
          <div key={p.id} className="animate-fade-up">
            <ProductCard p={p} onAdd={onAdd} liked={liked.includes(p.id)} onLike={onLike} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- double banner + best sellers ---------------- */
export function SplitShowcase({ onAdd, liked, onLike }: ShopProps) {
  const list = products.slice(0, 4);
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-8">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-3xl border border-ink-700 lg:col-span-4">
          <img src={pxWide(8108596)} alt="کالکشن" className="h-full min-h-[280px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[11px] text-brand-400">کالکشن ویژه</p>
            <h3 className="mt-1 text-xl font-extrabold text-white">استایل چرم و مشکی</h3>
            <p className="mt-2 text-[12px] text-white/70">ترکیب کلاسیک و مدرن برای شب‌های سرد</p>
            <button className="mt-4 rounded-2xl bg-brand-600 px-5 py-2.5 text-[12.5px] font-bold text-white transition hover:bg-brand-500">
              مشاهده محصولات
            </button>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Head title="منتخب سردبیر" sub="گلچینی از بهترین‌های این هفته" />
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} onAdd={onAdd} liked={liked.includes(p.id)} onLike={onLike} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- brands ---------------- */
export function Brands() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-8">
      <div className="overflow-hidden rounded-3xl border border-ink-700 bg-ink-900 p-6">
        <Head title="برندهای محبوب" sub="خرید از معتبرترین برندهای جهانی" more="همه برندها" />
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {brands.map((b) => (
            <a
              key={b}
              href="#"
              className="grid h-16 place-items-center rounded-2xl border border-ink-700 bg-ink-850 text-sm font-bold tracking-wide text-mute transition hover:-translate-y-1 hover:border-brand-500/60 hover:text-white"
            >
              {b}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- blog ---------------- */
export function Blog() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-8">
      <Head title="مجله پارس کالا" sub="آخرین مقالات دنیای مد، استایل و خرید هوشمند" more="همه مقالات" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {blog.map((b) => (
          <a
            key={b.id}
            href="#"
            className="group overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 transition hover:-translate-y-1 hover:border-brand-500/50"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={px(b.img, 600)}
                alt={b.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute right-3 top-3 rounded-lg bg-ink-950/80 px-2 py-1 text-[10px] text-brand-400 backdrop-blur">
                {b.cat}
              </span>
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 min-h-[3rem] text-[13.5px] font-semibold leading-6 text-slate-100 transition group-hover:text-brand-400">
                {b.title}
              </h3>
              <div className="mt-3 flex items-center justify-between text-[11px] text-mute">
                <span>{b.date}</span>
                <span>⏱ {b.read}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- trust features ---------------- */
export function Features() {
  const items = [
    { i: <Truck className="h-7 w-7" />, t: "ارسال سریع", s: "تحویل اکسپرس در سراسر ایران" },
    { i: <Refresh className="h-7 w-7" />, t: "۷ روز ضمانت بازگشت", s: "بدون قید و شرط" },
    { i: <Shield className="h-7 w-7" />, t: "تضمین اصالت کالا", s: "۱۰۰٪ اورجینال" },
    { i: <Support className="h-7 w-7" />, t: "پشتیبانی ۲۴ ساعته", s: "۷ روز هفته کنار شما" },
  ];
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-8">
      <div className="grid gap-3.5 rounded-3xl border border-ink-700 bg-ink-900 p-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((f) => (
          <div key={f.t} className="flex items-center gap-3.5 rounded-2xl bg-ink-850 p-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-600/15 text-brand-400">
              {f.i}
            </span>
            <div>
              <p className="text-[13.5px] font-bold text-slate-100">{f.t}</p>
              <p className="mt-0.5 text-[11.5px] text-mute">{f.s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- marquee ---------------- */
export function Ticker() {
  const text = "ارسال رایگان برای خرید بالای ۲ میلیون تومان • تخفیف ویژه اعضای باشگاه مشتریان • پرداخت در محل • ۷ روز ضمانت بازگشت کالا • ";
  return (
    <div className="overflow-hidden border-y border-ink-800 bg-brand-600/10 py-2.5">
      <div className="animate-marquee flex w-[200%] gap-8 whitespace-nowrap text-[12px] text-brand-400">
        <span>{text.repeat(3)}</span>
        <span>{text.repeat(3)}</span>
      </div>
    </div>
  );
}

export { Head };
