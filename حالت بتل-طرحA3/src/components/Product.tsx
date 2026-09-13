import { useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { CAT_LABEL, discountOf, faNum, faPrice, type Product } from "../data/store";
import { useCart } from "../cart";
import {
  Cart,
  Check,
  ChevronLeft,
  ChevronRight,
  Close,
  Eye,
  Heart,
  HeartFill,
  Minus,
  Plus,
  Star,
  Zap,
} from "./Icons";

/* ------------------------------ rating ------------------------------ */

export function Stars({ value, count, size = "h-3.5 w-3.5" }: { value: number; count?: number; size?: string }) {
  const pct = (value / 5) * 100;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative inline-flex" dir="ltr">
        <span className="flex gap-0.5 text-line">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={size} />
          ))}
        </span>
        <span className="absolute inset-y-0 right-0 overflow-hidden" style={{ width: `${pct}%` }}>
          <span className="flex gap-0.5 text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={size} />
            ))}
          </span>
        </span>
      </span>
      <span className="text-[11px] font-bold text-snow">{faNum(value.toLocaleString("en-US"))}</span>
      {count !== undefined && <span className="text-[11px] text-faint">({faNum(count)} دیدگاه)</span>}
    </span>
  );
}

/* ------------------------------ price ------------------------------ */

export function DiscountBadge({ p, className }: { p: Product; className?: string }) {
  const d = discountOf(p);
  if (!d) return null;
  return (
    <span
      className={cn(
        "grid h-7 min-w-7 place-items-center rounded-full bg-ember px-1 text-[11px] font-black text-white",
        className
      )}
    >
      {faNum(d)}٪
    </span>
  );
}

export function PriceTag({ p, big = false }: { p: Product; big?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <DiscountBadge p={p} />
      <div className="text-left leading-tight">
        {p.oldPrice && (
          <div className={cn("text-faint line-through decoration-ember/70", big ? "text-xs" : "text-[10px]")}>
            {faPrice(p.oldPrice)}
          </div>
        )}
        <div className={cn("font-black text-snow", big ? "text-xl" : "text-[15px]")}>
          {faPrice(p.price)}
          <span className="mr-1 text-[10px] font-medium text-mute">تومان</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ card ------------------------------ */

export function ProductCard({ p, className }: { p: Product; className?: string }) {
  const { add, toggleWish, wishlist, setQuick } = useCart();
  const wished = wishlist.includes(p.id);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-line bg-coal transition-all duration-300 hover:-translate-y-1.5 hover:border-ember/40 hover:shadow-card",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-raise">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          onClick={() => setQuick(p)}
          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-108"
        />
        {/* badges */}
        <div className="absolute right-2.5 top-2.5 flex flex-col items-center gap-1.5">
          <DiscountBadge p={p} className="h-8 min-w-8 text-xs shadow-glow" />
        </div>
        {p.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-ink/80 px-2 py-1 text-[10px] font-bold text-gold backdrop-blur-sm">
            {p.badge}
          </span>
        )}
        <button
          onClick={() => toggleWish(p)}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className={cn(
            "absolute bottom-2.5 left-2.5 grid h-9 w-9 place-items-center rounded-full border backdrop-blur-md transition-all",
            wished
              ? "border-ember/60 bg-ember/20 text-ember"
              : "border-line bg-ink/60 text-mute hover:border-ember/60 hover:text-ember"
          )}
        >
          {wished ? <HeartFill className="h-4.5 w-4.5" /> : <Heart className="h-4.5 w-4.5" />}
        </button>
        {/* quick view */}
        <button
          onClick={() => setQuick(p)}
          className="absolute inset-x-2.5 bottom-2.5 hidden translate-y-3 items-center justify-center gap-1.5 rounded-lg bg-ink/85 py-2 text-[11px] font-bold text-snow opacity-0 backdrop-blur-sm transition-all duration-300 hover:text-ember group-hover:translate-y-0 group-hover:opacity-100 md:flex"
        >
          <Eye className="h-4 w-4" />
          مشاهده سریع
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <h3
          onClick={() => setQuick(p)}
          className="line-clamp-2 min-h-10 cursor-pointer text-[13px] font-medium leading-5 text-snow transition-colors hover:text-ember"
        >
          {p.title}
        </h3>
        <Stars value={p.rating} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <PriceTag p={p} />
          <button
            onClick={() => add(p)}
            aria-label="افزودن به سبد خرید"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ember/50 text-ember transition-all hover:bg-ember hover:text-white hover:shadow-glow"
          >
            <Cart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ mini row (showcases) ------------------------------ */

export function MiniRow({ p }: { p: Product }) {
  const { add, setQuick } = useCart();
  return (
    <div
      onClick={() => setQuick(p)}
      className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-hover"
    >
      <img src={p.image} alt={p.title} loading="lazy" className="h-16 w-16 shrink-0 rounded-lg border border-line object-cover" />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-[13px] font-medium text-snow transition-colors group-hover:text-ember">
          {p.title}
        </p>
        <div className="mt-1.5">
          <Stars value={p.rating} size="h-3 w-3" />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <div className="text-left leading-tight">
          {p.oldPrice && <div className="text-[10px] text-faint line-through">{faPrice(p.oldPrice)}</div>}
          <div className="text-[13px] font-black text-snow">
            {faPrice(p.price)}
            <span className="mr-1 text-[9px] font-medium text-mute">تومان</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            add(p);
          }}
          aria-label="افزودن به سبد"
          className="grid h-9 w-9 place-items-center rounded-lg border border-line text-mute transition-all hover:border-ember hover:bg-ember hover:text-white"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ horizontal rail ------------------------------ */

export function Rail({
  title,
  sub,
  linkHref,
  linkLabel,
  children,
  headerExtra,
}: {
  title: ReactNode;
  sub?: string;
  linkHref?: string;
  linkLabel?: string;
  children: ReactNode;
  headerExtra?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * el.clientWidth * 0.8 * (rtl ? -1 : 1), behavior: "smooth" });
  };

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div>
          <h2 className="font-display text-2xl text-snow md:text-[28px]">{title}</h2>
          {sub && <p className="mt-1 text-xs text-faint">{sub}</p>}
        </div>
        {headerExtra}
        <div className="ms-auto flex items-center gap-2">
          {linkHref && (
            <a
              href={linkHref}
              className="flex items-center gap-1 text-xs font-bold text-ember transition-all hover:gap-2"
            >
              {linkLabel ?? "مشاهده همه"}
              <ChevronLeft className="h-4 w-4" />
            </a>
          )}
          <span className="hidden h-4 w-px bg-line sm:block" />
          <button
            onClick={() => scroll(-1)}
            aria-label="قبلی"
            className="hidden h-9 w-9 place-items-center rounded-lg border border-line text-mute transition-all hover:border-ember/60 hover:text-ember sm:grid"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="بعدی"
            className="hidden h-9 w-9 place-items-center rounded-lg border border-line text-mute transition-all hover:border-ember/60 hover:text-ember sm:grid"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2">
        {children}
      </div>
    </section>
  );
}

/* ------------------------------ quick view modal ------------------------------ */

export function QuickView() {
  const { quick, setQuick, add, toggleWish, wishlist } = useCart();
  const [qty, setQty] = useState(1);

  if (!quick) return null;
  const p = quick;
  const wished = wishlist.includes(p.id);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div className="anim-overlay absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setQuick(null)} />
      <div className="anim-modal relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line bg-coal shadow-card sm:rounded-2xl">
        <button
          onClick={() => setQuick(null)}
          aria-label="بستن"
          className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-ink/70 text-mute backdrop-blur-sm transition-colors hover:border-ember/60 hover:text-ember"
        >
          <Close className="h-4.5 w-4.5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative min-h-64 bg-raise md:min-h-full">
            <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute right-3 top-3 flex flex-col items-center gap-1.5">
              <DiscountBadge p={p} className="h-9 min-w-9 text-sm shadow-glow" />
              {p.badge && (
                <span className="rounded-md bg-ink/80 px-2 py-1 text-[10px] font-bold text-gold backdrop-blur-sm">
                  {p.badge}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5 md:p-6">
            <span className="w-fit rounded-md bg-raise px-2.5 py-1 text-[11px] font-bold text-ember">
              {CAT_LABEL[p.category]}
            </span>
            <h3 className="font-display text-xl leading-8 text-snow md:text-2xl">{p.title}</h3>
            <Stars value={p.rating} count={p.ratingCount} size="h-4 w-4" />

            <ul className="space-y-2">
              {p.specs.map((s) => (
                <li key={s} className="flex items-start gap-2 text-[13px] text-mute">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between rounded-xl border border-line bg-raise/70 p-3.5">
              <PriceTag p={p} big />
              <span className={cn("text-[11px] font-bold", p.stock <= 5 ? "text-ember" : "text-jade")}>
                {p.stock <= 5 ? `فقط ${faNum(p.stock)} عدد باقی مانده!` : "موجود در انبار"}
              </span>
            </div>

            <div className="mt-auto flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-line">
                <button
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                  className="grid h-11 w-10 place-items-center text-mute transition-colors hover:text-ember"
                  aria-label="افزایش تعداد"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-black text-snow">{faNum(qty)}</span>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-11 w-10 place-items-center text-mute transition-colors hover:text-ember"
                  aria-label="کاهش تعداد"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  add(p, qty);
                  setQuick(null);
                }}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-ember text-sm font-bold text-white shadow-glow transition-all hover:bg-emberdeep"
              >
                <Cart className="h-5 w-5" />
                افزودن به سبد خرید
              </button>
              <button
                onClick={() => toggleWish(p)}
                aria-label="علاقه‌مندی"
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-xl border transition-all",
                  wished ? "border-ember/60 bg-ember/15 text-ember" : "border-line text-mute hover:border-ember/60 hover:text-ember"
                )}
              >
                {wished ? <HeartFill className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
              </button>
            </div>

            <p className="flex items-center gap-1.5 text-[11px] text-faint">
              <Zap className="h-3.5 w-3.5 text-gold" />
              ارسال فوری از انبار تهران با بسته‌بندی امن شب‌بازار
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
