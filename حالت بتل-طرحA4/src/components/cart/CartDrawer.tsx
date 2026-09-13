"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatPrice, toPersianDigits } from "@/lib/utils";
import { useStore } from "@/store/store-provider";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQty,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartCount,
  } = useStore();

  return (
    <Drawer
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      title={`سبد خرید (${toPersianDigits(cartCount)})`}
      footer={
        cart.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#777]">مبلغ کل</span>
              <span className="num font-bold text-[#202020]">
                {formatPrice(cartSubtotal)} <span className="text-[11px] font-normal">تومان</span>
              </span>
            </div>
            {cartDiscount > 0 ? (
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-[#777]">سود شما از خرید</span>
                <span className="num font-medium text-[#e53935]">
                  {formatPrice(cartDiscount)} تومان
                </span>
              </div>
            ) : null}
            <ButtonLink href="/cart" size="lg" fullWidth>
              مشاهده سبد و پرداخت
            </ButtonLink>
          </div>
        ) : null
      }
    >
      {cart.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-[#f7f7f7] text-[#bbb]">
            <ShoppingBag size={26} />
          </span>
          <p className="text-[13.5px] font-medium text-[#202020]">سبد خرید شما خالی است</p>
          <p className="text-[12.5px] leading-7 text-[#888]">
            می‌توانید از میان هزاران کالای موجود، محصول مورد نظر خود را انتخاب کنید.
          </p>
          <Button variant="outline" onClick={() => setCartOpen(false)}>
            شروع خرید
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-[#f0f0f0]">
          {cart.map((line) => (
            <li key={`${line.slug}-${line.size}-${line.color}`} className="flex gap-3 p-4">
              <Link
                href={`/product/${line.slug}`}
                onClick={() => setCartOpen(false)}
                className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[#f7f7f7]"
              >
                <Image src={line.image} alt={line.title} fill sizes="80px" className="object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/product/${line.slug}`}
                  onClick={() => setCartOpen(false)}
                  className="line-2 text-[12.5px] font-medium leading-6 text-[#202020]"
                >
                  {line.title}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11.5px] text-[#888]">
                  {line.size ? <span>سایز: {line.size}</span> : null}
                  {line.color ? <span>رنگ: {line.color}</span> : null}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 rounded-lg border border-[#e8e8e8]">
                    <button
                      type="button"
                      aria-label="افزایش تعداد"
                      onClick={() => updateQty(line.slug, line.qty + 1, line.size, line.color)}
                      className="grid size-8 place-items-center text-[#555] hover:text-[#111]"
                    >
                      <Plus size={14} />
                    </button>
                    <span className="num w-6 text-center text-[12.5px]">
                      {toPersianDigits(line.qty)}
                    </span>
                    {line.qty > 1 ? (
                      <button
                        type="button"
                        aria-label="کاهش تعداد"
                        onClick={() => updateQty(line.slug, line.qty - 1, line.size, line.color)}
                        className="grid size-8 place-items-center text-[#555] hover:text-[#111]"
                      >
                        <Minus size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-label="حذف کالا"
                        onClick={() => removeFromCart(line.slug, line.size, line.color)}
                        className="grid size-8 place-items-center text-[#e53935]"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <span className="num text-[13px] font-bold text-[#202020]">
                    {formatPrice(line.price * line.qty)}
                    <span className="mx-1 text-[10.5px] font-normal text-[#888]">تومان</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
