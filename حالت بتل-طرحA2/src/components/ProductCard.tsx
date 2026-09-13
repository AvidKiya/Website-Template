import { cn } from "../utils/cn";
import { discountOf, fa, type Product } from "../data";
import { CartIcon, HeartIcon } from "./icons";

type Props = {
  p: Product;
  wished: boolean;
  onWish: (id: number) => void;
  onAdd: (p: Product) => void;
  className?: string;
};

export default function ProductCard({ p, wished, onWish, onAdd, className }: Props) {
  const disc = discountOf(p);
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-line/60 bg-card p-3 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-xl hover:shadow-black/40",
        className
      )}
    >
      {p.tag && (
        <span className="absolute right-3 top-3 z-10 rounded-full border border-line bg-ink/85 px-2.5 py-1 text-[10px] font-bold text-accent backdrop-blur">
          {p.tag}
        </span>
      )}
      <button
        onClick={() => onWish(p.id)}
        aria-label="علاقه‌مندی"
        className={cn(
          "absolute left-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border bg-ink/85 backdrop-blur transition",
          wished ? "border-danger/50 text-danger" : "border-line text-mist hover:text-danger"
        )}
      >
        <HeartIcon className="h-4 w-4" filled={wished} />
      </button>

      <div className="relative overflow-hidden rounded-xl bg-ink-2">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.06]"
        />
        <button
          onClick={() => onAdd(p)}
          className="absolute inset-x-2.5 top-2.5 flex translate-y-[-140%] items-center justify-center gap-1.5 rounded-lg bg-accent py-2 text-[12px] font-extrabold text-accent-ink opacity-0 shadow-lg shadow-black/30 transition-all duration-300 hover:bg-accent-2 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <CartIcon className="h-4 w-4" />
          افزودن به سبد
        </button>
      </div>

      <h3 className="mt-3 line-clamp-2 min-h-10 text-[12.5px] font-medium leading-5 text-snow/85">{p.title}</h3>

      <div className="mt-auto flex items-end justify-between pt-2">
        <div className="flex flex-col items-end">
          <span className="text-[13.5px] font-black">
            {fa(p.price)} <span className="text-[10px] font-medium text-mist">تومان</span>
          </span>
          {p.oldPrice && <span className="text-[11px] text-mist line-through">{fa(p.oldPrice)}</span>}
        </div>
        {disc > 0 && (
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 bg-accent/10 text-[11px] font-black text-accent">
            %{fa(disc)}
          </span>
        )}
      </div>
    </article>
  );
}
