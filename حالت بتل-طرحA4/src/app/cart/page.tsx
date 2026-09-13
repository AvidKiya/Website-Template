"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/store/store-provider";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button, ButtonLink } from "@/components/ui/Button";
import { toPersianDigits } from "@/lib/utils";

export default function CartPage() {
  const { cart, cartSubtotal, cartDiscount, cartCount, clearCart, hydrated } = useStore();

  return (
    <div className="container-x pb-10">
      <Breadcrumb items={[{ title: "سبد خرید" }]} />

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[18px] font-bold text-[#202020] md:text-[20px]">سبد خرید</h1>
        {cart.length > 0 ? (
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <Trash2 size={15} /> خالی کردن سبد
          </Button>
        ) : null}
      </div>

      {!hydrated ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="skeleton h-[320px] rounded-[16px]" />
          <div className="skeleton h-[280px] rounded-[16px]" />
        </div>
      ) : cart.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[16px] border border-dashed border-[#e0e0e0] px-6 py-20 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-[#f7f7f7] text-[#bbb]">
            <ShoppingBag size={26} />
          </span>
          <p className="text-[14px] font-medium text-[#202020]">سبد خرید شما خالی است</p>
          <p className="max-w-sm text-[12.5px] leading-7 text-[#888]">
            برای مشاهده کالاهای پرفروش و پیشنهادهای ویژه، به صفحه فروشگاه سر بزنید.
          </p>
          <ButtonLink href="/category/all" size="lg" className="mt-2">
            رفتن به فروشگاه
          </ButtonLink>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="rounded-[16px] border border-[#e8e8e8] bg-white px-4">
            <p className="num border-b border-[#f0f0f0] py-3 text-[12px] text-[#888]">
              {toPersianDigits(cartCount)} کالا در سبد خرید شما قرار دارد
            </p>
            <ul className="divide-y divide-[#f0f0f0]">
              {cart.map((line) => (
                <CartItem key={`${line.slug}-${line.size}-${line.color}`} line={line} />
              ))}
            </ul>
            <div className="py-4">
              <Link href="/category/all" className="text-[12.5px] text-[#555] hover:text-[#202020]">
                ← افزودن کالای دیگر به سبد
              </Link>
            </div>
          </div>

          <CartSummary subtotal={cartSubtotal} discount={cartDiscount} count={cartCount} />
        </div>
      )}
    </div>
  );
}
