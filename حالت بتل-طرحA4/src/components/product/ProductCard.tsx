"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/data/types";
import { cn, discountPercent, formatPrice, toPersianDigits } from "@/lib/utils";
import { useStore } from "@/store/store-provider";
import { Rating } from "@/components/ui/Rating";

export function ProductCard({
  product,
  className,
  compact,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  const { toggleWishlist, isWished, hydrated } = useStore();
  const discount = discountPercent(product.price, product.oldPrice);
  const wished = hydrated && isWished(product.slug);
  const secondImage = product.images[1] ?? product.images[0];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white transition-[box-shadow,transform,border-color] duration-250 ease-out hover:-translate-y-0.5 hover:border-[#dcdcdc] hover:shadow-[0_10px_28px_rgba(16,16,16,0.08)]",
        className,
      )}
    >
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-[#fafafa]"
          aria-label={product.title}
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
            className="object-cover transition-opacity duration-300 ease-out group-hover:opacity-0"
          />
          <Image
            src={secondImage}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
            className="scale-[1.03] object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          />
        </Link>

        {discount > 0 ? (
          <span className="num absolute start-2.5 top-2.5 rounded-md bg-[#e53935] px-1.5 py-0.5 text-[11px] font-semibold text-white">
            ٪{toPersianDigits(discount)}
          </span>
        ) : null}

        {product.stock <= 5 && product.stock > 0 ? (
          <span className="absolute start-2.5 bottom-2.5 rounded-md bg-white/92 px-1.5 py-0.5 text-[10.5px] font-medium text-[#e53935] backdrop-blur">
            تنها {toPersianDigits(product.stock)} عدد
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label={wished ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          aria-pressed={wished}
          className={cn(
            "absolute end-2 top-2 grid size-9 place-items-center rounded-full bg-white/92 text-[#777] shadow-[0_1px_4px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-200 ease-out md:opacity-0 md:group-hover:opacity-100",
            wished && "text-[#e53935] md:opacity-100",
          )}
        >
          <Heart size={16} className={cn(wished && "fill-[#e53935]")} />
        </button>
      </div>

      <div className={cn("flex flex-1 flex-col gap-1.5 p-3", compact && "p-2.5")}>
        <Link
          href={`/product/${product.slug}`}
          className="line-2 min-h-[42px] text-[12.5px] font-medium leading-[21px] text-[#202020] transition-colors hover:text-[#000]"
        >
          {product.title}
        </Link>

        <div className="flex items-center justify-between gap-2">
          <Rating value={product.rating} count={product.reviewCount} />
          {product.colors.length > 0 ? (
            <div className="flex items-center gap-1" aria-hidden>
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  className="size-2.5 rounded-full ring-1 ring-[#e8e8e8]"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1.5">
          <div className="flex flex-col">
            {product.oldPrice ? (
              <span className="num text-[11.5px] text-[#aaa] line-through">
                {formatPrice(product.oldPrice)}
              </span>
            ) : (
              <span className="h-[17px]" />
            )}
            <span className="num text-[15px] font-bold text-[#202020]">
              {formatPrice(product.price)}
              <span className="mx-1 text-[11px] font-normal text-[#777]">تومان</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
