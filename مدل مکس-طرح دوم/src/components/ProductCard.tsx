import { money, px, faIn, type Product } from "../data";
import { Cart, Compare, Eye, Heart, Star } from "./Icons";

type Props = {
  p: Product;
  onAdd: (p: Product) => void;
  liked: boolean;
  onLike: (id: number) => void;
  compact?: boolean;
};

export default function ProductCard({ p, onAdd, liked, onLike, compact }: Props) {
  const off = p.old ? Math.round(((p.old - p.price) / p.old) * 100) : 0;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-850 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-[0_22px_45px_-25px_rgba(244,63,82,.8)] ${
        compact ? "w-[190px] shrink-0 sm:w-[215px]" : ""
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-ink-800">
        <img
          src={px(p.img)}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

        {off > 0 && (
          <span className="absolute right-3 top-3 rounded-lg bg-brand-600 px-2 py-1 text-[11px] font-bold text-white shadow-lg">
            {faIn(off)}٪
          </span>
        )}
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-lg bg-ink-950/80 px-2 py-1 text-[10px] font-semibold text-gold-400 ring-1 ring-gold-400/40 backdrop-blur">
            {p.badge}
          </span>
        )}

        <div className="absolute left-3 top-1/2 flex -translate-y-1/2 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 ltr:left-auto ltr:right-3">
          <button
            onClick={() => onLike(p.id)}
            aria-label="افزودن به علاقه‌مندی"
            className={`grid h-9 w-9 place-items-center rounded-full border border-ink-600 bg-ink-900/90 backdrop-blur transition hover:border-brand-500 hover:text-brand-400 ${
              liked ? "text-brand-500" : "text-mute"
            }`}
          >
            <Heart className="h-4.5 w-4.5" filled={liked} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full border border-ink-600 bg-ink-900/90 text-mute backdrop-blur transition hover:border-brand-500 hover:text-brand-400">
            <Compare className="h-4.5 w-4.5" />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full border border-ink-600 bg-ink-900/90 text-mute backdrop-blur transition hover:border-brand-500 hover:text-brand-400">
            <Eye className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <p className="text-[11px] text-mute">{p.en}</p>
        <h3 className="line-clamp-2 min-h-[2.6rem] text-[13.5px] font-semibold leading-6 text-slate-100 transition group-hover:text-brand-400">
          {p.title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-gold-400">
            <Star className="h-3.5 w-3.5" />
            <span className="font-medium">{faIn(p.rate.toFixed(1))}</span>
            <span className="text-mute">({faIn(p.sold)})</span>
          </div>
          <div className="flex gap-1">
            {p.colors.map((c) => (
              <span key={c} className="h-3 w-3 rounded-full ring-1 ring-white/20" style={{ background: c }} />
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            {p.old && (
              <div className="text-[11px] text-mute line-through">{money(p.old)}</div>
            )}
            <div className="flex items-baseline gap-1 text-brand-400">
              <span className="text-[15px] font-extrabold">{money(p.price)}</span>
              <span className="text-[10px] text-mute">تومان</span>
            </div>
          </div>
          <button
            onClick={() => onAdd(p)}
            aria-label="افزودن به سبد"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-500 active:scale-95"
          >
            <Cart className="h-4.5 w-4.5" />
          </button>
        </div>

        {p.stock <= 6 && (
          <div className="pt-1">
            <div className="h-1 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-gradient-to-l from-brand-500 to-gold-400"
                style={{ width: `${Math.min(100, 100 - p.stock * 9)}%` }}
              />
            </div>
            <p className="mt-1 text-[10px] text-brand-400">تنها {faIn(p.stock)} عدد در انبار باقی مانده</p>
          </div>
        )}
      </div>
    </div>
  );
}
