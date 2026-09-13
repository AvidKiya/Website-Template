import { useState } from "react";
import { px, money, fa, cn } from "../lib/utils";
import type { Product } from "../data/shop";
import { useShop } from "../lib/store";
import { navigate } from "../lib/router";
import { Heart, Cart, Star, Eye, Scale, Check } from "./Icons";

export function Stars({ rate, votes }: { rate: number; votes?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-[1px] text-gold">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              rate >= i
                ? "text-gold"
                : rate > i - 1
                ? "text-gold/50"
                : "text-line-2"
            )}
          />
        ))}
      </div>
      <span className="num text-[11px] font-bold text-fg-dim">{fa(rate)}</span>
      {!!votes && (
        <span className="num text-[10px] text-fg-mute">({fa(votes)})</span>
      )}
    </div>
  );
}

export function DiscountPill({ off, className }: { off: number; className?: string }) {
  return (
    <span
      className={cn(
        "num inline-flex items-center rounded-full bg-pk px-2 py-0.5 text-[11px] font-black text-white shadow-[0_4px_12px_-4px_rgba(239,57,78,.9)]",
        className
      )}
    >
      ٪{fa(off)}
    </span>
  );
}

export function ProductCard({
  p,
  variant = "grid",
}: {
  p: Product;
  variant?: "grid" | "mini";
}) {
  const { add, wish, toggleWish, compare, toggleCompare } = useShop();
  const [hover, setHover] = useState(false);
  const liked = wish.includes(p.id);
  const cmp = compare.includes(p.id);
  const img = hover && p.gallery?.[1] ? p.gallery[1] : p.img;
  const mini = variant === "mini";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-pk/40 hover:shadow-[0_20px_50px_-24px_rgba(239,57,78,.45)]",
        mini ? "p-2.5" : "p-3"
      )}
    >
      {/* badges */}
      <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          {p.badge && (
            <span className="rounded-lg bg-white/10 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md ring-1 ring-white/15">
              {p.badge}
            </span>
          )}
          {typeof p.stock === "number" && p.stock <= 7 && (
            <span className="num rounded-lg bg-gold/15 px-2 py-1 text-[10px] font-bold text-gold ring-1 ring-gold/25">
              {fa(p.stock)} عدد باقی‌مانده
            </span>
          )}
        </div>
        {!!p.off && <DiscountPill off={p.off} />}
      </div>

      {/* actions */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 max-lg:opacity-100">
        <IconBtn
          active={liked}
          onClick={() => toggleWish(p.id)}
          label="علاقه‌مندی"
        >
          <Heart className="h-4 w-4" filled={liked} />
        </IconBtn>
        <IconBtn active={cmp} onClick={() => toggleCompare(p.id)} label="مقایسه">
          <Scale className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={() => navigate(`/product/${p.id}`)} label="مشاهده">
          <Eye className="h-4 w-4" />
        </IconBtn>
      </div>

      <button
        onClick={() => navigate(`/product/${p.id}`)}
        className="relative mb-3 block aspect-square w-full overflow-hidden rounded-2xl bg-[#f4f4f6]"
      >
        <img
          src={px(img, 520)}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </button>

      {!!p.colors?.length && (
        <div className="mb-2 flex items-center gap-1.5">
          {p.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3.5 w-3.5 rounded-full ring-1 ring-white/20 ring-offset-1 ring-offset-surface"
              style={{ background: c.hex }}
            />
          ))}
          {!!p.colors.length && (
            <span className="num ms-1 text-[10px] text-fg-mute">
              {fa(p.colors.length)} رنگ
            </span>
          )}
        </div>
      )}

      <button
        onClick={() => navigate(`/product/${p.id}`)}
        className="mb-1.5 line-clamp-2 min-h-[42px] text-start text-[13px] font-bold leading-6 text-fg transition hover:text-pk"
      >
        {p.title}
      </button>

      {p.en && (
        <p className="mb-1 line-clamp-1 text-[10px] font-medium tracking-wide text-fg-mute">
          {p.en}
        </p>
      )}

      <div className="mb-2 flex items-center justify-between">
        <Stars rate={p.rate} votes={p.votes} />
        <span
          className={cn(
            "text-[10px] font-bold",
            p.stock === "∞" ? "text-lime" : "text-gold"
          )}
        >
          {p.stock === "∞" ? "موجود در انبار" : `${fa(p.stock)} عدد موجود`}
        </span>
      </div>

      <div className="mt-auto border-t border-dashed border-line pt-2.5">
        {!!p.old && (
          <div className="mb-1 flex items-center justify-end gap-2">
            <span className="num text-[12px] text-fg-mute line-through">
              {money(p.old)}
            </span>
            {!!p.off && <DiscountPill off={p.off} />}
          </div>
        )}
        <div className="flex items-end justify-between gap-2">
          <button
            onClick={() => add(p.id)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-pk/12 text-pk ring-1 ring-pk/25 transition hover:bg-pk hover:text-white"
            aria-label="افزودن به سبد"
          >
            <Cart className="h-4 w-4" />
          </button>
          <div className="flex items-baseline gap-1">
            <span className="num text-[15px] font-black text-white">
              {money(p.price)}
            </span>
            <span className="text-[11px] font-bold text-fg-dim">تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-xl border border-line bg-ink-2/85 text-fg-dim backdrop-blur transition hover:border-pk hover:text-pk",
        active && "border-pk/60 bg-pk text-white hover:bg-pk hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

export function MiniProduct({ p }: { p: Product }) {
  const { add } = useShop();
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-2.5 transition hover:border-pk/40">
      <button
        onClick={() => navigate(`/product/${p.id}`)}
        className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f4f4f6]"
      >
        <img src={px(p.img, 240)} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
      </button>
      <div className="min-w-0 flex-1">
        <button
          onClick={() => navigate(`/product/${p.id}`)}
          className="line-clamp-1 text-start text-[13px] font-bold text-fg hover:text-pk"
        >
          {p.title}
        </button>
        <div className="mt-1">
          <Stars rate={p.rate} />
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="num text-[13px] font-black text-white">
              {money(p.price)}
            </span>
            <span className="text-[10px] text-fg-dim">تومان</span>
          </div>
          <button
            onClick={() => add(p.id)}
            className="flex items-center gap-1 rounded-lg bg-pk/12 px-2 py-1 text-[11px] font-bold text-pk ring-1 ring-pk/25 transition hover:bg-pk hover:text-white"
          >
            <Check className="h-3.5 w-3.5" /> افزودن
          </button>
        </div>
      </div>
    </div>
  );
}
