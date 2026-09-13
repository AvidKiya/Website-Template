"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Check,
  Clock4,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react";
import type { Product } from "@/data/types";
import { Rating, Stars } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { cn, discountPercent, formatPrice, toPersianDigits } from "@/lib/utils";
import { useStore } from "@/store/store-provider";
import { brandBySlug } from "@/data/brands";
import { categoryBySlug } from "@/data/categories";

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, pushRecentlyViewed, setCartOpen } = useStore();
  const [size, setSize] = useState<string | undefined>(product.sizes[0]);
  const [color, setColor] = useState<string | undefined>(product.colors[0]?.name);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    pushRecentlyViewed(product.slug);
  }, [product.slug, pushRecentlyViewed]);

  const discount = discountPercent(product.price, product.oldPrice);
  const brand = brandBySlug(product.brandSlug);
  const category = categoryBySlug(product.categorySlug);

  const add = (goToCart = false) => {
    addToCart({
      slug: product.slug,
      title: product.title,
      image: product.images[0],
      price: product.price,
      oldPrice: product.oldPrice,
      size,
      color,
      seller: product.seller.name,
      stock: product.stock,
      qty,
    });
    if (goToCart) setCartOpen(true);
  };

  return (
    <>
      {/* ---------- center: information ---------- */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-[#888]">
          {category ? (
            <Link href={`/category/${category.slug}`} className="hover:text-[#202020]">
              {category.title}
            </Link>
          ) : null}
          {brand ? (
            <>
              <span aria-hidden>•</span>
              <Link href={`/category/all?brand=${brand.slug}`} className="hover:text-[#202020]">
                برند {brand.title}
              </Link>
            </>
          ) : null}
        </div>

        <h1 className="mt-2 text-[17px] font-bold leading-9 text-[#202020] md:text-[20px]">
          {product.title}
        </h1>
        <p className="mt-1 text-[12px] text-[#999]">{product.englishTitle}</p>

        <div className="mt-3 flex flex-wrap items-center gap-4 border-b border-[#f0f0f0] pb-4">
          <div className="flex items-center gap-2">
            <Stars value={product.rating} size={14} />
            <span className="num text-[12.5px] text-[#202020]">
              {toPersianDigits(product.rating.toFixed(1))}
            </span>
          </div>
          <a href="#reviews" className="num text-[12px] text-[#777] hover:text-[#202020]">
            {toPersianDigits(product.reviewCount)} دیدگاه کاربران
          </a>
          <span className="num text-[12px] text-[#777]">
            {toPersianDigits(Math.round(product.reviewCount * 1.8))} بازدید این هفته
          </span>
        </div>

        {product.colors.length > 0 ? (
          <div className="border-b border-[#f0f0f0] py-4">
            <span className="mb-2.5 block text-[12.5px] text-[#555]">
              رنگ: <span className="font-medium text-[#202020]">{color}</span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[12px] transition-colors duration-200",
                    color === c.name
                      ? "border-[#252525] text-[#202020]"
                      : "border-[#e8e8e8] text-[#777] hover:border-[#c9c9c9]",
                  )}
                >
                  <span
                    className="size-4 rounded-full ring-1 ring-[#e0e0e0]"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {product.sizes.length > 0 ? (
          <div className="border-b border-[#f0f0f0] py-4">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[12.5px] text-[#555]">
                سایز: <span className="font-medium text-[#202020]">{size}</span>
              </span>
              <button type="button" className="text-[11.5px] text-[#777] underline-offset-4 hover:underline">
                راهنمای انتخاب سایز
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cn(
                    "num min-w-[52px] rounded-xl border px-3 py-2 text-[12.5px] transition-colors duration-200",
                    size === s
                      ? "border-[#252525] bg-[#252525] text-white"
                      : "border-[#e8e8e8] text-[#555] hover:border-[#c9c9c9]",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <ul className="space-y-2 py-4">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[12.5px] leading-7 text-[#666]">
              <Check size={15} className="mt-1.5 shrink-0 text-[#18a86b]" />
              {h}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-3 rounded-[14px] bg-[#f7f7f7] p-4 md:grid-cols-4">
          {[
            { icon: Truck, title: "ارسال سریع", desc: product.shipping },
            { icon: ShieldCheck, title: "ضمانت اصالت", desc: "کالای اورجینال" },
            { icon: Clock4, title: "۷ روز بازگشت", desc: "بدون قید و شرط" },
            { icon: BadgeCheck, title: "پرداخت امن", desc: "درگاه بانکی" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-2">
              <Icon size={17} className="mt-0.5 shrink-0 text-[#555]" />
              <div className="min-w-0">
                <span className="block text-[12px] font-medium text-[#202020]">{title}</span>
                <span className="block text-[11px] leading-5 text-[#888]">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- left: purchase / seller panel ---------- */}
      <aside className="lg:sticky lg:top-[124px]">
        <div className="rounded-[16px] border border-[#e8e8e8] bg-white p-4">
          <div className="flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <Store size={17} className="text-[#555]" />
            <div className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-medium text-[#202020]">
                {product.seller.name}
              </span>
              <div className="mt-0.5 flex items-center gap-2">
                <Rating value={product.seller.rating} size={12} />
                <span className="num text-[11px] text-[#999]">
                  {toPersianDigits(product.seller.sales)} فروش موفق
                </span>
              </div>
            </div>
            {product.seller.badge ? (
              <span className="rounded-md bg-[#18a86b]/10 px-2 py-1 text-[10.5px] text-[#18a86b]">
                {product.seller.badge}
              </span>
            ) : null}
          </div>

          <ul className="space-y-2 border-b border-[#f0f0f0] py-3 text-[12px] text-[#666]">
            <li className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-[#555]" /> {product.warranty}
            </li>
            <li className="flex items-center gap-2">
              <Truck size={15} className="text-[#555]" /> {product.shipping}
            </li>
            <li className="flex items-center gap-2">
              <Check size={15} className="text-[#18a86b]" />
              {product.stock > 0 ? (
                <span className="text-[#18a86b]">موجود در انبار فروشگاه</span>
              ) : (
                <span className="text-[#e53935]">ناموجود</span>
              )}
            </li>
          </ul>

          <div className="py-3">
            <span className="mb-2 block text-[12px] text-[#777]">تعداد</span>
            <div className="flex w-fit items-center gap-1 rounded-xl border border-[#e8e8e8]">
              <button
                type="button"
                aria-label="افزایش تعداد"
                onClick={() => setQty((q) => Math.min(product.stock || 10, q + 1))}
                className="grid size-10 place-items-center text-[#555] hover:text-[#111]"
              >
                <Plus size={15} />
              </button>
              <span className="num w-8 text-center text-[13px]">{toPersianDigits(qty)}</span>
              <button
                type="button"
                aria-label="کاهش تعداد"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-10 place-items-center text-[#555] hover:text-[#111]"
              >
                <Minus size={15} />
              </button>
            </div>
          </div>

          <div className="border-t border-[#f0f0f0] pt-3">
            {product.oldPrice ? (
              <div className="mb-1 flex items-center gap-2">
                <span className="num rounded-md bg-[#e53935] px-1.5 py-0.5 text-[11px] font-semibold text-white">
                  ٪{toPersianDigits(discount)}
                </span>
                <span className="num text-[12px] text-[#aaa] line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              </div>
            ) : null}
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] text-[#777]">قیمت نهایی</span>
              <span className="num text-[19px] font-bold text-[#202020]">
                {formatPrice(product.price * qty)}
                <span className="mx-1 text-[11.5px] font-normal text-[#777]">تومان</span>
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <Button size="lg" fullWidth onClick={() => add(false)} disabled={product.stock === 0}>
                <ShoppingCart size={17} />
                افزودن به سبد خرید
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="outline"
                onClick={() => add(true)}
                disabled={product.stock === 0}
              >
                خرید سریع
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-3 px-1 text-[11.5px] leading-6 text-[#999]">
          با ثبت سفارش، شرایط استفاده و رویه بازگرداندن کالا را می‌پذیرید.
        </p>
      </aside>

      {/* ---------- mobile sticky buy bar ---------- */}
      <div className="fixed start-0 end-0 bottom-[58px] z-40 flex items-center gap-3 border-t border-[#eee] bg-white/97 px-4 py-2.5 backdrop-blur lg:hidden">
        <div className="flex-1">
          {product.oldPrice ? (
            <span className="num block text-[11px] text-[#aaa] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          ) : null}
          <span className="num text-[15px] font-bold text-[#202020]">
            {formatPrice(product.price * qty)}
            <span className="mx-1 text-[10.5px] font-normal text-[#777]">تومان</span>
          </span>
        </div>
        <Button size="md" onClick={() => add(false)} disabled={product.stock === 0} className="px-6">
          <ShoppingCart size={16} />
          افزودن به سبد
        </Button>
      </div>
    </>
  );
}
