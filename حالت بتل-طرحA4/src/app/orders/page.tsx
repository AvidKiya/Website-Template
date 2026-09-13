"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate, formatPrice, toPersianDigits } from "@/lib/utils";

type OrderResult = {
  code: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
  items: { title: string; qty: number; price: number }[];
};

export default function OrdersPage() {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!code.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOrder(data.order);
    } catch {
      setError("سفارشی با این کد پیدا نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-x pb-16">
      <Breadcrumb items={[{ title: "پیگیری سفارش" }]} />
      <div className="mx-auto max-w-xl">
        <h1 className="text-[18px] font-bold text-[#202020]">پیگیری سفارش</h1>
        <p className="mt-1 text-[12.5px] text-[#888]">
          کد پیگیری سفارش خود را وارد کنید تا وضعیت آن نمایش داده شود.
        </p>

        <form onSubmit={search} className="mt-4 flex items-end gap-2">
          <Input
            label="کد پیگیری"
            placeholder="YB-00000000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button type="submit" loading={loading} className="shrink-0">
            <PackageSearch size={16} /> جستجو
          </Button>
        </form>

        {error ? <p className="mt-3 text-[12px] text-[#e53935]">{error}</p> : null}

        {order ? (
          <div className="mt-5 rounded-[16px] border border-[#e8e8e8] p-5">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <span className="num text-[13px] font-bold text-[#202020]">{order.code}</span>
              <span className="rounded-md bg-[#f7f7f7] px-2 py-1 text-[11.5px] text-[#555]">
                {order.status === "pending" ? "در حال پردازش" : order.status}
              </span>
            </div>
            <p className="mt-3 text-[12.5px] text-[#666]">
              ثبت‌شده در {formatDate(order.createdAt)} برای {order.customerName}
            </p>
            <ul className="mt-3 space-y-2">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between text-[12.5px] text-[#666]">
                  <span className="line-2">{item.title}</span>
                  <span className="num">{toPersianDigits(item.qty)} ×</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-[#f0f0f0] pt-3 text-[13px] font-bold">
              <span>مبلغ پرداخت‌شده</span>
              <span className="num">{formatPrice(order.total)} تومان</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
