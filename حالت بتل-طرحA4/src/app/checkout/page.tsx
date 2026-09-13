"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useStore } from "@/store/store-provider";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/components/cart/CartSummary";
import { formatPrice, toPersianDigits } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, cartSubtotal, cartDiscount, cartCount, clearCart, hydrated } = useStore();
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState<string | null>(null);

  const shipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = cartSubtotal + shipping;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.customerName.trim() || form.phone.trim().length < 8 || form.address.trim().length < 10) {
      setError("لطفا نام، شماره تماس و نشانی کامل را وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cart.map((l) => ({ slug: l.slug, title: l.title, price: l.price, qty: l.qty })),
          subtotal: cartSubtotal,
          discount: cartDiscount,
          shipping,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCode(data.code);
      clearCart();
    } catch {
      setError("ثبت سفارش انجام نشد. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  if (code) {
    return (
      <div className="container-x pb-16">
        <Breadcrumb items={[{ title: "تکمیل خرید" }]} />
        <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-[16px] border border-[#e8e8e8] px-6 py-16 text-center">
          <CheckCircle2 size={44} className="text-[#18a86b]" />
          <h1 className="text-[16px] font-bold text-[#202020]">سفارش شما ثبت شد</h1>
          <p className="text-[12.5px] leading-7 text-[#888]">
            کد پیگیری سفارش شما <span className="num font-bold text-[#202020]">{code}</span> است.
            وضعیت سفارش از طریق پیامک اطلاع‌رسانی می‌شود.
          </p>
          <ButtonLink href="/" className="mt-2">
            بازگشت به صفحه اصلی
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (hydrated && cart.length === 0) {
    return (
      <div className="container-x pb-16">
        <Breadcrumb items={[{ title: "تکمیل خرید" }]} />
        <div className="mx-auto max-w-lg rounded-[16px] border border-dashed border-[#e0e0e0] px-6 py-16 text-center">
          <p className="text-[13.5px] font-medium text-[#202020]">سبد خرید شما خالی است</p>
          <ButtonLink href="/category/all" className="mt-4">
            مشاهده محصولات
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x pb-16">
      <Breadcrumb items={[{ title: "سبد خرید", href: "/cart" }, { title: "تکمیل خرید" }]} />
      <h1 className="mb-4 text-[18px] font-bold text-[#202020]">اطلاعات ارسال و پرداخت</h1>

      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-3 rounded-[16px] border border-[#e8e8e8] bg-white p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="نام و نام خانوادگی"
              value={form.customerName}
              onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
              required
            />
            <Input
              label="شماره تماس"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              required
            />
          </div>
          <Textarea
            label="نشانی کامل پستی"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            required
          />
          <Textarea
            label="توضیحات سفارش (اختیاری)"
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            className="min-h-[80px]"
          />
          {error ? <p className="text-[12px] text-[#e53935]">{error}</p> : null}
        </div>

        <div className="h-fit rounded-[16px] border border-[#e8e8e8] bg-white p-4 lg:sticky lg:top-[124px]">
          <h2 className="text-[13.5px] font-bold text-[#202020]">خلاصه پرداخت</h2>
          <dl className="mt-3 space-y-2.5 border-b border-[#f0f0f0] pb-3 text-[12.5px]">
            <div className="flex justify-between">
              <dt className="text-[#777]">تعداد کالا</dt>
              <dd className="num">{toPersianDigits(cartCount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#777]">جمع کالاها</dt>
              <dd className="num">{formatPrice(cartSubtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#777]">هزینه ارسال</dt>
              <dd className="num">
                {shipping === 0 ? <span className="text-[#18a86b]">رایگان</span> : formatPrice(shipping)}
              </dd>
            </div>
          </dl>
          <div className="flex items-center justify-between py-3">
            <span className="text-[13px] font-medium">مبلغ نهایی</span>
            <span className="num text-[16px] font-bold">
              {formatPrice(total)}
              <span className="mx-1 text-[11px] font-normal text-[#777]">تومان</span>
            </span>
          </div>
          <Button type="submit" size="lg" fullWidth loading={loading}>
            ثبت نهایی سفارش
          </Button>
        </div>
      </form>
    </div>
  );
}
