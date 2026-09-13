"use client";

import { ShieldCheck, Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice, toPersianDigits } from "@/lib/utils";

export const FREE_SHIPPING_THRESHOLD = 2_000_000;
export const SHIPPING_COST = 89_000;

export function CartSummary({
  subtotal,
  discount,
  count,
  href = "/checkout",
  cta = "ادامه فرآیند خرید",
}: {
  subtotal: number;
  discount: number;
  count: number;
  href?: string;
  cta?: string;
}) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="rounded-[16px] border border-[#e8e8e8] bg-white p-4 lg:sticky lg:top-[124px]">
      <h2 className="text-[13.5px] font-bold text-[#202020]">خلاصه سفارش</h2>

      <dl className="mt-3 space-y-2.5 border-b border-[#f0f0f0] pb-3 text-[12.5px]">
        <div className="flex items-center justify-between">
          <dt className="text-[#777]">قیمت کالاها ({toPersianDigits(count)})</dt>
          <dd className="num text-[#202020]">{formatPrice(subtotal + discount)}</dd>
        </div>
        {discount > 0 ? (
          <div className="flex items-center justify-between">
            <dt className="text-[#777]">تخفیف کالاها</dt>
            <dd className="num text-[#e53935]">{formatPrice(discount)}−</dd>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <dt className="text-[#777]">هزینه ارسال</dt>
          <dd className="num text-[#202020]">
            {shipping === 0 ? <span className="text-[#18a86b]">رایگان</span> : formatPrice(shipping)}
          </dd>
        </div>
      </dl>

      <div className="flex items-center justify-between py-3">
        <span className="text-[13px] font-medium text-[#202020]">مبلغ قابل پرداخت</span>
        <span className="num text-[16px] font-bold text-[#202020]">
          {formatPrice(total)}
          <span className="mx-1 text-[11px] font-normal text-[#777]">تومان</span>
        </span>
      </div>

      {remaining > 0 && subtotal > 0 ? (
        <p className="num mb-3 rounded-lg bg-[#f7f7f7] px-3 py-2 text-[11.5px] leading-6 text-[#777]">
          <Truck size={13} className="ms-1 inline" /> با {formatPrice(remaining)} تومان خرید بیشتر،
          ارسال رایگان می‌شود.
        </p>
      ) : null}

      <ButtonLink href={href} size="lg" fullWidth>
        {cta}
      </ButtonLink>

      <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-6 text-[#999]">
        <ShieldCheck size={14} className="mt-1 shrink-0" />
        پرداخت شما روی بستر امن انجام می‌شود و تا زمان تحویل کالا نزد فروشگاه امانت است.
      </p>
    </div>
  );
}
