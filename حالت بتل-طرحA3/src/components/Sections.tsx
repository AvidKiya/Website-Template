import { useMemo, useState } from "react";
import { cn } from "../utils/cn";
import {
  ARTICLES,
  BRANDS,
  CAT_LABEL,
  PRODUCTS,
  amazingProducts,
  bestRated,
  byId,
  faNum,
  faPrice,
  type Category,
  type Product,
} from "../data/store";
import { useCart } from "../cart";
import { pad2, Reveal, useCountdown } from "../hooks";
import { DiscountBadge, MiniRow, ProductCard, Rail } from "./Product";
import {
  Card,
  Check,
  ChevronDown,
  ChevronLeft,
  Clock,
  Flame,
  Gift,
  Headset,
  Rotate,
  Shield,
  Truck,
  Zap,
} from "./Icons";

/* ================= amazing offers ================= */

function AmazingCard({ p }: { p: Product }) {
  const { add, setQuick } = useCart();
  return (
    <article className="group flex w-[210px] shrink-0 flex-col rounded-xl bg-[#f4f6f9] p-3 text-[#1c2733] shadow-[0_6px_18px_rgb(0_0_0/0.25)] transition-all duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          onClick={() => setQuick(p)}
          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-108"
        />
        <span className="absolute right-2 top-2 rounded-md bg-[#1c2733]/85 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {CAT_LABEL[p.category]}
        </span>
      </div>
      <h3
        onClick={() => setQuick(p)}
        className="mt-3 line-clamp-2 min-h-10 cursor-pointer text-[12.5px] font-semibold leading-5 transition-colors hover:text-emberdeep"
      >
        {p.title}
      </h3>
      <div className="mt-2 flex items-end justify-between gap-2">
        <DiscountBadge p={p} className="bg-emberdeep" />
        <div className="text-left leading-tight">
          {p.oldPrice && (
            <div className="text-[10px] text-[#8b95a5] line-through decoration-ember/70">{faPrice(p.oldPrice)}</div>
          )}
          <div className="text-[15px] font-black">
            {faPrice(p.price)}
            <span className="mr-1 text-[9px] font-medium text-[#8b95a5]">تومان</span>
          </div>
        </div>
      </div>
      <div className="mt-2.5">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#e2e6ec]">
          <div
            className="h-full rounded-full bg-gradient-to-l from-ember to-emberdeep transition-all"
            style={{ width: `${p.soldPercent ?? 50}%` }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] font-bold text-emberdeep">
          <span>فقط {faNum(p.stock)} عدد باقی مانده</span>
          <span className="text-[#8b95a5]">{faNum(p.soldPercent ?? 50)}٪ فروش رفته</span>
        </div>
      </div>
      <button
        onClick={() => add(p)}
        className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-emberdeep text-[12px] font-bold text-white transition-colors hover:bg-ember"
      >
        <Zap className="h-3.5 w-3.5" />
        افزودن به سبد
      </button>
    </article>
  );
}

function TimeCell({ v, label }: { v: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        key={v}
        className="anim-pop grid h-12 w-12 place-items-center rounded-lg bg-white/15 font-display text-2xl text-white backdrop-blur-sm md:h-14 md:w-14 md:text-[28px]"
      >
        {faNum(pad2(v))}
      </span>
      <span className="text-[10px] font-medium text-white/75">{label}</span>
    </div>
  );
}

export function AmazingOffers() {
  const { h, m, s } = useCountdown();
  return (
    <section id="amazing" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-emberdeep via-ember to-[#f0554a]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 40%, #fff 1.5px, transparent 1.5px), radial-gradient(circle at 70% 80%, #fff 1px, transparent 1px)",
              backgroundSize: "90px 90px, 60px 60px",
            }}
          />
          <div className="relative grid lg:grid-cols-[290px_1fr]">
            {/* header column */}
            <div className="flex flex-col items-center gap-4 px-6 py-8 text-center lg:items-start lg:justify-center lg:border-e lg:border-white/15 lg:text-right">
              <Flame className="anim-flicker h-12 w-12 text-gold drop-shadow-[0_0_18px_rgb(246_176_58/0.7)]" />
              <div>
                <h2 className="font-display text-3xl text-white md:text-4xl">پیشنهاد شگفت‌انگیز</h2>
                <p className="mt-1.5 text-xs font-medium text-white/80">
                  تخفیف‌های باورنکردنی شب‌بازار — فقط تا پایان امروز
                </p>
              </div>
              <div className="flex items-start gap-2.5" dir="ltr">
                <TimeCell v={h} label="ساعت" />
                <span className="pt-2.5 font-display text-2xl text-white/80">:</span>
                <TimeCell v={m} label="دقیقه" />
                <span className="pt-2.5 font-display text-2xl text-white/80">:</span>
                <TimeCell v={s} label="ثانیه" />
              </div>
              <a
                href="#bestsellers"
                className="mt-1 flex items-center gap-1.5 rounded-lg border border-white/30 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white hover:text-emberdeep"
              >
                مشاهده همه تخفیف‌ها
                <ChevronLeft className="h-4 w-4" />
              </a>
            </div>

            {/* products */}
            <div className="no-scrollbar flex gap-4 overflow-x-auto p-5 lg:p-6">
              {amazingProducts.map((p) => (
                <AmazingCard key={p.id} p={p} />
              ))}
              <a
                href="#bestsellers"
                className="flex w-[120px] shrink-0 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/35 text-center text-xs font-bold text-white/90 transition-all hover:border-white hover:bg-white/10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/20">
                  <ChevronLeft className="h-6 w-6" />
                </span>
                مشاهده همه
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= promo banners ================= */

const BANNERS = [
  {
    id: "wearables",
    chip: "تا ۳۵٪ تخفیف",
    title: "پوشیدنی‌های هوشمند",
    sub: "ساعت و مچ‌بند از برندهای معتبر",
    image: byId(17).image,
    href: "#wearables",
  },
  {
    id: "gaming",
    chip: "ارسال رایگان",
    title: "ست کامل گیمینگ",
    sub: "کنسول، دسته و لوازم جانبی",
    image: byId(18).image,
    href: "#gaming",
  },
];

export function PromoBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10">
      <div className="grid gap-5 md:grid-cols-2">
        {BANNERS.map((b, i) => (
          <Reveal key={b.id} delay={i * 120}>
            <a
              href={b.href}
              className="group relative block h-44 overflow-hidden rounded-2xl border border-line md:h-56"
            >
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/70 to-ink/10" />
              <div className="relative flex h-full flex-col items-start justify-center gap-2 p-6 md:p-8">
                <span className="rounded-full bg-ember px-3 py-1 text-[11px] font-bold text-white shadow-glow">
                  {b.chip}
                </span>
                <h3 className="font-display text-2xl text-snow md:text-3xl">{b.title}</h3>
                <p className="text-xs text-mute md:text-sm">{b.sub}</p>
                <span className="mt-2 flex items-center gap-1 text-xs font-bold text-ember transition-all group-hover:gap-2.5">
                  خرید کنید
                  <ChevronLeft className="h-4 w-4" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= best sellers ================= */

const TABS: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "همه کالاها" },
  { key: "mobile", label: "موبایل و تبلت" },
  { key: "laptop", label: "لپ‌تاپ" },
  { key: "audio", label: "صوتی و تصویری" },
  { key: "wearable", label: "پوشیدنی هوشمند" },
  { key: "gaming", label: "گیمینگ" },
];

export function BestSellers() {
  const [tab, setTab] = useState<Category | "all">("all");
  const list = useMemo(
    () => (tab === "all" ? bestRated : bestRated.filter((p) => p.category === tab)).slice(0, 10),
    [tab]
  );

  return (
    <section id="bestsellers" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-14">
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl text-snow md:text-[28px]">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ember/15 text-ember">
                <Flame className="h-5 w-5" />
              </span>
              پرفروش‌ترین محصولات شب‌بازار
            </h2>
            <p className="mt-1.5 text-xs text-faint">محبوب‌ترین انتخاب‌های خریداران ما در این هفته</p>
          </div>
          <span className="ms-auto hidden items-center gap-1.5 text-[11px] font-bold text-jade md:flex">
            <Clock className="h-4 w-4" />
            به‌روزرسانی روزانه
          </span>
        </div>

        <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "h-9 shrink-0 rounded-full px-4 text-xs font-bold transition-all",
                tab === t.key
                  ? "bg-ember text-white shadow-glow"
                  : "border border-line bg-coal text-mute hover:border-ember/40 hover:text-snow"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div key={tab} className="anim-fadeUp grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 6) * 60}>
              <ProductCard p={p} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================= category showcase (tabs + banner) ================= */

type ShowcaseTab = { label: string; ids: number[] };

function Showcase({
  id,
  title,
  sub,
  image,
  imageLabel,
  tabs,
  flip = false,
}: {
  id: string;
  title: string;
  sub: string;
  image: string;
  imageLabel: string;
  tabs: ShowcaseTab[];
  flip?: boolean;
}) {
  const [active, setActive] = useState(0);
  const list = tabs[active].ids.map(byId);

  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line bg-coal">
          <div className={cn("grid lg:grid-cols-[320px_1fr]", flip && "lg:[direction:ltr]")}>
            <a href="#bestsellers" className="group relative block min-h-56 [direction:rtl] lg:min-h-full">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute bottom-0 right-0 p-6">
                <h3 className="font-display text-2xl text-white">{title}</h3>
                <p className="mt-1 text-xs text-white/75">{imageLabel}</p>
                <span className="mt-3 inline-flex items-center gap-1 rounded-lg bg-ember px-3 py-1.5 text-[11px] font-bold text-white opacity-90 transition-opacity group-hover:opacity-100">
                  مشاهده همه
                  <ChevronLeft className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>

            <div className="p-5 [direction:rtl] md:p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl text-snow md:text-2xl">{sub}</h3>
                </div>
                <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
                  {tabs.map((t, i) => (
                    <button
                      key={t.label}
                      onClick={() => setActive(i)}
                      className={cn(
                        "h-8 shrink-0 rounded-lg px-3.5 text-[11px] font-bold transition-all",
                        active === i
                          ? "bg-raise text-ember shadow-[inset_0_0_0_1px_rgb(239_59_82/0.5)]"
                          : "text-mute hover:bg-raise/60 hover:text-snow"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div key={active} className="anim-fadeUp divide-y divide-line/60">
                {list.map((p) => (
                  <MiniRow key={p.id} p={p} />
                ))}
              </div>
              <a
                href="#bestsellers"
                className="mt-2 flex items-center justify-center gap-1 rounded-lg border border-dashed border-line py-2.5 text-xs font-bold text-mute transition-all hover:border-ember/50 hover:text-ember"
              >
                مشاهده همه محصولات
                <ChevronLeft className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Showcases() {
  return (
    <div className="mx-auto max-w-7xl space-y-5 px-4 pt-14">
      <Showcase
        id="gaming"
        title="دنیای گیمینگ"
        sub="جدیدترین‌های دنیای بازی"
        image={byId(19).image}
        imageLabel="کنسول‌های دستی و خانگی"
        tabs={[
          { label: "کنسول و دسته", ids: [19, 20, 18] },
          { label: "صوتی گیمینگ", ids: [10, 12, 14] },
          { label: "پرفروش‌ها", ids: [18, 19, 10] },
        ]}
      />
      <Showcase
        id="wearables"
        title="پوشیدنی‌های هوشمند"
        sub="جدیدترین‌های پوشیدنی"
        image={byId(16).image}
        imageLabel="ساعت و مچ‌بند هوشمند"
        flip
        tabs={[
          { label: "ساعت هوشمند", ids: [15, 16, 17] },
          { label: "هدفون و ایرپاد", ids: [13, 9, 11] },
          { label: "پرفروش‌ها", ids: [15, 13, 17] },
        ]}
      />
    </div>
  );
}

/* ================= brands marquee ================= */

export function Brands() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="pt-16">
      <Reveal>
        <h2 className="mb-6 text-center font-display text-2xl text-snow md:text-[28px]">
          برندهایی که دوستشان داریم
        </h2>
        <div
          className="marquee-wrap border-y border-line/70 bg-coal/50 py-7"
          style={{
            maskImage: "linear-gradient(to left, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to left, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="anim-marquee flex w-max items-center">
            {row.map((b, i) => (
              <span key={`${b}-${i}`} className="flex items-center">
                <span
                  dir="ltr"
                  className="cursor-default px-8 text-2xl font-black tracking-[0.18em] text-faint transition-colors duration-300 hover:text-snow"
                >
                  {b}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-line" />
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= blog ================= */

export function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-16">
      <Reveal>
        <div className="mb-6 flex items-center gap-3">
          <div>
            <h2 className="font-display text-2xl text-snow md:text-[28px]">خواندنی‌های شب‌بازار</h2>
            <p className="mt-1 text-xs text-faint">راهنمای خرید، بررسی و مقایسه از تیم محتوای ما</p>
          </div>
          <a href="#blog" className="ms-auto flex items-center gap-1 text-xs font-bold text-ember transition-all hover:gap-2">
            همه مقالات
            <ChevronLeft className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.id} delay={i * 110}>
              <article className="group h-full overflow-hidden rounded-2xl border border-line bg-coal transition-all duration-300 hover:-translate-y-1.5 hover:border-ember/40 hover:shadow-card">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/70 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-md bg-ink/80 px-2.5 py-1 text-[10px] font-bold text-gold backdrop-blur-sm">
                    {a.cat}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 p-5">
                  <h3 className="line-clamp-1 font-bold text-snow transition-colors group-hover:text-ember">
                    {a.title}
                  </h3>
                  <p className="line-clamp-2 text-[13px] leading-6 text-mute">{a.excerpt}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-faint">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {a.date} · {a.read} مطالعه
                    </span>
                    <span className="flex items-center gap-1 font-bold text-ember transition-all group-hover:gap-2">
                      ادامه مطلب
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================= expandable about text ================= */

export function AboutText() {
  const [open, setOpen] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16">
      <Reveal>
        <div className="rounded-2xl border border-line bg-coal/70 p-6 md:p-8">
          <h2 className="font-display text-2xl text-snow md:text-[26px]">
            فروشگاه اینترنتی شب‌بازار؛ بررسی، انتخاب و خرید آنلاین
          </h2>
          <div className={cn("relative overflow-hidden text-[13.5px] leading-8 text-mute transition-all duration-500", !open && "max-h-28")}>
            <p className="mt-4">
              شب‌بازار به‌عنوان یکی از فروشگاه‌های اینترنتی کالای دیجیتال، با بیش از یک دهه تجربه و پایبندی به سه اصل
              «ضمانت اصالت کالا»، «۷ روز مهلت بازگشت» و «ارسال سریع»، تلاش کرده است تجربه‌ای متفاوت از خرید آنلاین را
              برای مشتریان ایرانی بسازد؛ جایی که قیمت شفاف است و هیچ کالایی بدون بررسی تخصصی وارد ویترین نمی‌شود.
            </p>
            <p className="mt-4">
              از گوشی‌های پرچم‌دار و لپ‌تاپ‌های گیمینگ گرفته تا پوشیدنی‌های هوشمند و لوازم صوتی، همه‌ی کالاها پیش از
              ارسال بازرسی و بسته‌بندی امن می‌شوند. تیم پشتیبانی شب‌بازار هفت روز هفته و به‌صورت ۲۴ ساعته آماده‌ی
              پاسخ‌گویی است تا انتخابی مطمئن و آگاهانه داشته باشید.
            </p>
            <p className="mt-4">
              با عضویت در باشگاه مشتریان، در هر خرید امتیاز جمع کنید و از تخفیف‌های اختصاصی شبانه — که هر شب رأس ساعت
              ۲۲ منتشر می‌شوند — باخبر شوید. در شب‌بازار، شب زنده‌دارها همیشه برنده‌اند.
            </p>
            {!open && (
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-coal to-transparent" />
            )}
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="mx-auto mt-4 flex items-center gap-1.5 rounded-full border border-line px-5 py-2 text-xs font-bold text-mute transition-all hover:border-ember/60 hover:text-ember"
          >
            {open ? "نمایش کمتر" : "نمایش بیشتر"}
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= features strip ================= */

const FEATURES = [
  { icon: Shield, title: "تضمین اصالت کالا", sub: "کالای اورجینال با هولوگرام" },
  { icon: Card, title: "پرداخت امن آنلاین", sub: "درگاه‌های معتبر بانکی" },
  { icon: Truck, title: "ارسال سریع", sub: "تحویل اکسپرس سراسری" },
  { icon: Rotate, title: "۷ روز ضمانت بازگشت", sub: "بدون قید و شرط" },
  { icon: Headset, title: "پشتیبانی ۲۴ ساعته", sub: "در هر ساعت از شبانه‌روز" },
  { icon: Gift, title: "باشگاه مشتریان", sub: "امتیاز در هر خرید" },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16">
      <Reveal>
        <h2 className="mb-6 text-center font-display text-2xl text-snow md:text-[26px]">
          ویژگی‌های مهم خرید از شب‌بازار
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70} className="h-full">
              <div className="group flex h-full flex-col items-center gap-3 rounded-xl border border-line bg-coal px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-ember/40">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-raise text-ember transition-all duration-300 group-hover:bg-ember group-hover:text-white group-hover:shadow-glow">
                  <f.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-snow">{f.title}</p>
                  <p className="mt-1 text-[10.5px] text-faint">{f.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================= newsletter ================= */

export function Newsletter() {
  const { push } = useCart();
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState(false);
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!/^09\d{9}$/.test(phone)) {
      setErr(true);
      push("شماره همراه معتبر نیست؛ مثال: 09121234567", "error");
      window.setTimeout(() => setErr(false), 600);
      return;
    }
    setDone(true);
    push("عضویت شما با موفقیت ثبت شد");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-emberdeep via-ember to-[#f0554a] p-7 md:p-10">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border-[26px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full border-[34px] border-white/10" />
          <div className="relative grid items-center gap-7 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl leading-relaxed text-white md:text-3xl">
                از تخفیف‌های شبانه باخبر شوید!
              </h2>
              <p className="mt-2 max-w-md text-sm leading-7 text-white/85">
                شماره همراه خود را وارد کنید تا آخرین تخفیف‌های سایت در لحظه برایتان پیامک شود؛ بدون اسپم، فقط
                پیشنهاد‌های واقعی.
              </p>
            </div>
            <div>
              {done ? (
                <div className="anim-fadeUp flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-emberdeep">
                    <Check className="h-6 w-6" />
                  </span>
                  <div className="text-white">
                    <p className="text-sm font-black">عضویت شما ثبت شد</p>
                    <p className="mt-0.5 text-xs text-white/80">اولین پیامک تخفیف، امشب ساعت ۲۲ ارسال می‌شود.</p>
                  </div>
                </div>
              ) : (
                <div className={cn("flex rounded-xl bg-white p-1.5 shadow-card", err && "anim-shake")}>
                  <input
                    dir="ltr"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 11))}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                    placeholder="09xxxxxxxxx"
                    className="w-full min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-[#1c2733] placeholder:text-[#a2abba] focus:outline-none"
                  />
                  <button
                    onClick={submit}
                    className="h-11 shrink-0 rounded-lg bg-ink px-6 text-sm font-bold text-white transition-colors hover:bg-black"
                  >
                    عضویت
                  </button>
                </div>
              )}
              <p className="mt-2.5 text-[11px] text-white/70">
                با عضویت، <span className="underline decoration-white/50 underline-offset-4">شرایط و قوانین</span>{" "}
                شب‌بازار را می‌پذیرید.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= extra: trending rail (mobile/laptop mix) ================= */

export function TrendingRail() {
  const items = useMemo(() => PRODUCTS.filter((p) => p.category === "mobile").slice(0, 6), []);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-14">
      <Reveal>
        <Rail
          title="تازه‌های موبایل و تبلت"
          sub="جدیدترین مدل‌های اضافه‌شده به فروشگاه"
          linkHref="#bestsellers"
        >
          {items.map((p) => (
            <ProductCard key={p.id} p={p} className="w-[220px] shrink-0 md:w-[230px]" />
          ))}
        </Rail>
      </Reveal>
    </div>
  );
}
