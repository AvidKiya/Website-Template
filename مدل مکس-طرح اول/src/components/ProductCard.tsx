import { useState } from "react";
import SafeImg from "./SafeImg";
import { IconCart, IconCompare, IconHeart, IconSearch, IconStar } from "./Icons";
import { localFor, type Product } from "../data/site";
import { money, toFa } from "../lib/utils";

type Props = {
  p: Product;
  onAdd: (p: Product) => void;
  onWish: (id: number) => void;
  wished: boolean;
};

export default function ProductCard({ p, onAdd, onWish, wished }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative rounded-2xl card-surface overflow-hidden transition-all duration-300 hover:border-ink-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(245,2,58,.55)]"
    >
      {/* image */}
      <div className="relative aspect-square bg-ink-900/60 overflow-hidden">
        <SafeImg
          src={p.img}
          fallbackSrc={localFor(p)}
          alt={p.title}
          contain
          className={`absolute inset-0 w-full h-full p-5 transition-all duration-500 ${
            hover && p.img2 ? "opacity-0 scale-105" : "opacity-100"
          }`}
          wrapClassName="absolute inset-0 w-full h-full"
          fallbackText={p.title}
        />
        {p.img2 && (
          <SafeImg
            src={p.img2}
            fallbackSrc={localFor(p)}
            alt={p.title}
            contain
            className={`absolute inset-0 w-full h-full p-5 transition-all duration-500 ${
              hover ? "opacity-100 scale-105" : "opacity-0"
            }`}
            wrapClassName="absolute inset-0 w-full h-full"
            fallbackText={p.title}
          />
        )}

        {/* badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {p.special && (
            <span className="text-[10px] px-2 py-1 rounded-md bg-brand-500 text-white font-medium">
              پیشنهاد ویژه
            </span>
          )}
          {p.stock <= 5 && (
            <span className="text-[10px] px-2 py-1 rounded-md bg-gold-500/15 border border-gold-500/30 text-gold-400">
              {toFa(p.stock)} عدد باقیمانده
            </span>
          )}
        </div>

        {!!p.off && (
          <span className="absolute top-3 left-3 w-9 h-9 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 text-white text-[11px] font-bold grid place-items-center">
            ٪{toFa(p.off)}
          </span>
        )}

        {/* hover actions */}
        <div
          className={`absolute left-3 bottom-3 flex flex-col gap-2 transition-all duration-300 ${
            hover ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
          }`}
        >
          <button
            onClick={() => onWish(p.id)}
            aria-label="علاقه‌مندی"
            className={`w-9 h-9 rounded-xl grid place-items-center border transition ${
              wished
                ? "bg-brand-500 border-brand-500 text-white"
                : "bg-ink-900/90 border-ink-600 text-ink-200 hover:text-white"
            }`}
          >
            <IconHeart className="w-[17px] h-[17px]" filled={wished} />
          </button>
          <button
            aria-label="مقایسه"
            className="w-9 h-9 rounded-xl grid place-items-center border bg-ink-900/90 border-ink-600 text-ink-200 hover:text-white transition"
          >
            <IconCompare className="w-[17px] h-[17px]" />
          </button>
          <button
            aria-label="نمایش سریع"
            className="w-9 h-9 rounded-xl grid place-items-center border bg-ink-900/90 border-ink-600 text-ink-200 hover:text-white transition"
          >
            <IconSearch className="w-[17px] h-[17px]" />
          </button>
        </div>
      </div>

      {/* body */}
      <div className="p-4">
        <p className="text-[10.5px] text-ink-400">{p.cat}</p>
        <h3 className="mt-1.5 text-[13px] leading-6 text-ink-100 h-12 line-clamp-2 group-hover:text-brand-400 transition-colors">
          {p.title}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11.5px] text-gold-400">
            <IconStar className="w-3.5 h-3.5" />
            {toFa(p.rating.toFixed(1))}
          </span>
          <span className="text-[11px] text-ink-400">{toFa(p.sold)} فروش</span>
        </div>

        {p.colors && (
          <div className="mt-3 flex items-center gap-1.5">
            {p.colors.map((c) => (
              <span
                key={c}
                className="w-3.5 h-3.5 rounded-full ring-1 ring-ink-600"
                style={{ background: c }}
              />
            ))}
          </div>
        )}

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            {p.old && (
              <p className="text-[11px] text-ink-500 line-through digits">{money(p.old)}</p>
            )}
            <p className="text-[15px] font-bold text-white digits truncate">
              {money(p.price)}
              <span className="text-[11px] font-normal text-ink-300 mr-1">تومان</span>
            </p>
          </div>
          <button
            onClick={() => onAdd(p)}
            aria-label="افزودن به سبد خرید"
            className="shrink-0 w-10 h-10 rounded-xl bg-ink-700 text-ink-100 grid place-items-center hover:bg-brand-500 hover:text-white transition-colors"
          >
            <IconCart className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
