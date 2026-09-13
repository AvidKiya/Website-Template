"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import type { CartLine } from "@/store/store-provider";
import { useStore } from "@/store/store-provider";
import { formatPrice, toPersianDigits } from "@/lib/utils";

export function CartItem({ line }: { line: CartLine }) {
  const { updateQty, removeFromCart, toggleWishlist } = useStore();

  return (
    <li className="flex gap-3 py-4 md:gap-4">
      <Link
        href={`/product/${line.slug}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-[#f7f7f7] md:size-28"
      >
        <Image src={line.image} alt={line.title} fill sizes="112px" className="object-cover" />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/product/${line.slug}`}
            className="line-2 text-[13px] font-medium leading-7 text-[#202020]"
          >
            {line.title}
          </Link>
          <button
            type="button"
            onClick={() => removeFromCart(line.slug, line.size, line.color)}
            aria-label="حذف از سبد"
            className="hidden size-9 shrink-0 place-items-center rounded-lg text-[#999] transition-colors hover:text-[#e53935] md:grid"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-3 text-[11.5px] text-[#888]">
          {line.size ? <span>سایز: {line.size}</span> : null}
          {line.color ? <span>رنگ: {line.color}</span> : null}
          {line.seller ? <span>فروشنده: {line.seller}</span> : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-[#e8e8e8]">
            <button
              type="button"
              aria-label="افزایش تعداد"
              onClick={() => updateQty(line.slug, line.qty + 1, line.size, line.color)}
              className="grid size-9 place-items-center text-[#555] hover:text-[#111]"
            >
              <Plus size={15} />
            </button>
            <span className="num w-7 text-center text-[13px]">{toPersianDigits(line.qty)}</span>
            {line.qty > 1 ? (
              <button
                type="button"
                aria-label="کاهش تعداد"
                onClick={() => updateQty(line.slug, line.qty - 1, line.size, line.color)}
                className="grid size-9 place-items-center text-[#555] hover:text-[#111]"
              >
                <Minus size={15} />
              </button>
            ) : (
              <button
                type="button"
                aria-label="حذف کالا"
                onClick={() => removeFromCart(line.slug, line.size, line.color)}
                className="grid size-9 place-items-center text-[#e53935]"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(line.slug)}
            className="flex items-center gap-1.5 text-[11.5px] text-[#888] transition-colors hover:text-[#202020]"
          >
            <Heart size={14} /> ذخیره برای بعد
          </button>

          <div className="text-end">
            {line.oldPrice ? (
              <span className="num block text-[11.5px] text-[#bbb] line-through">
                {formatPrice(line.oldPrice * line.qty)}
              </span>
            ) : null}
            <span className="num text-[14px] font-bold text-[#202020]">
              {formatPrice(line.price * line.qty)}
              <span className="mx-1 text-[10.5px] font-normal text-[#888]">تومان</span>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
