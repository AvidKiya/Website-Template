import { useState } from "react";
import { cn, px, money, fa } from "../lib/utils";
import { useShop } from "../lib/store";
import { navigate } from "../lib/router";
import { Crumb } from "./Shop";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/shop";
import {
  Cart as CartIcon,
  Trash,
  Plus,
  Minus,
  Shield,
  Truck,
  Check,
  Card,
  Sms,
} from "../components/Icons";

export default function CartPage() {
  const { lines, total, saved, setQty, remove, clear, toast } = useShop();
  const [ship, setShip] = useState<"post" | "express">("post");
  const [pay, setPay] = useState<"online" | "cod">("online");
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);

  const shipCost = ship === "express" ? 89000 : total > 500000 ? 0 : 49000;
  const grand = Math.max(0, total + shipCost);

  if (done)
    return (
      <div className="mx-auto grid max-w-lg place-items-center gap-4 px-4 py-20 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-lime/15 text-lime ring-1 ring-lime/30">
          <Check className="h-12 w-12" />
        </span>
        <h1 className="text-xl font-black text-white">سفارش شما ثبت شد!</h1>
        <p className="text-[12.5px] leading-6 text-fg-dim">
          کد رهگیری سفارش شما: <span className="num font-black text-pk">PK-{fa(428913)}</span>
          <br />
          وضعیت سفارش از طریق صفحه «پیگیری سفارش» قابل مشاهده است.
        </p>
        <button
          onClick={() => navigate("/track")}
          className="rounded-2xl bg-pk px-6 py-3 text-[13px] font-black text-white"
        >
          پیگیری سفارش
        </button>
      </div>
    );

  if (!lines.length)
    return (
      <div className="mx-auto grid max-w-lg place-items-center gap-4 px-4 py-20 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-surface text-fg-mute ring-1 ring-line">
          <CartIcon className="h-11 w-11" />
        </span>
        <h1 className="text-lg font-black text-white">سبد خرید شما خالی است</h1>
        <p className="text-[12.5px] text-fg-dim">
          می‌توانید از میان هزاران کالای پارس کالا انتخاب کنید.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="rounded-2xl bg-pk px-6 py-3 text-[13px] font-black text-white"
        >
          رفتن به فروشگاه
        </button>
        <div className="mt-8 w-full">
          <h2 className="mb-3 text-[13px] font-black text-fg">پیشنهاد ما</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-[1320px] px-3 py-4 sm:px-5 sm:py-6">
      <Crumb items={[{ l: "خانه", to: "/" }, { l: "سبد خرید" }]} />
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {lines.map((l) => (
            <div
              key={l.id}
              className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-3.5 sm:flex-row"
            >
              <button
                onClick={() => navigate(`/product/${l.id}`)}
                className="h-28 w-28 shrink-0 self-center overflow-hidden rounded-2xl bg-[#f4f4f6] sm:self-start"
              >
                <img src={px(l.product.img, 300)} alt="" className="h-full w-full object-cover" />
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <button
                    onClick={() => navigate(`/product/${l.id}`)}
                    className="text-start text-[13.5px] font-black leading-6 text-fg hover:text-pk"
                  >
                    {l.product.title}
                  </button>
                  <button
                    onClick={() => remove(l.id)}
                    className="shrink-0 text-fg-mute transition hover:text-pk"
                    aria-label="حذف"
                  >
                    <Trash className="h-[18px] w-[18px]" />
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-fg-mute">
                  فروشنده: {l.product.seller}
                  {l.color && <> • رنگ: {l.color}</>}
                </p>
                <p
                  className={cn(
                    "mt-2 text-[11px] font-black",
                    l.product.stock === "∞" ? "text-lime" : "text-gold"
                  )}
                >
                  {l.product.stock === "∞"
                    ? "موجود در انبار"
                    : `${fa(l.product.stock)} عدد باقی‌مانده`}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1 rounded-xl border border-line bg-ink p-1">
                    <button
                      onClick={() => setQty(l.id, l.qty + 1)}
                      className="grid h-7 w-7 place-items-center rounded-lg text-fg-dim transition hover:bg-surface-2 hover:text-pk"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <span className="num w-7 text-center text-[12.5px] font-black">
                      {fa(l.qty)}
                    </span>
                    <button
                      onClick={() => setQty(l.id, l.qty - 1)}
                      className="grid h-7 w-7 place-items-center rounded-lg text-fg-dim transition hover:bg-surface-2 hover:text-pk"
                    >
                      {l.qty === 1 ? (
                        <Trash className="h-3.5 w-3.5" />
                      ) : (
                        <Minus className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="num text-[16px] font-black text-white">
                      {money(l.product.price * l.qty)}
                    </span>
                    <span className="text-[11px] font-bold text-fg-dim">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between rounded-3xl border border-line bg-surface p-4">
            <span className="text-[12px] font-bold text-fg-dim">
              مجموع {fa(lines.length)} قلم کالا
            </span>
            <button
              onClick={() => {
                clear();
                toast("سبد خرید خالی شد", "info");
              }}
              className="text-[12px] font-black text-pk hover:underline"
            >
              حذف همه
            </button>
          </div>
        </div>

        {/* summary */}
        <aside className="space-y-3 lg:sticky lg:top-[84px] lg:h-fit">
          <div className="rounded-3xl border border-line bg-surface p-5">
            <h3 className="mb-4 text-[13.5px] font-black text-white">
              شیوه ارسال را انتخاب کنید
            </h3>
            <div className="space-y-2">
              {(
                [
                  { k: "post", l: "پست پیشتاز", s: "۲ تا ۴ روز کاری", p: total > 500000 ? "رایگان" : "۴۹,۰۰۰" },
                  { k: "express", l: "پیک اکسپرس", s: "زیر ۲۴ ساعت (تهران)", p: "۸۹,۰۰۰" },
                ] as const
              ).map((o) => (
                <button
                  key={o.k}
                  onClick={() => setShip(o.k)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition",
                    ship === o.k
                      ? "border-pk bg-pk/8"
                      : "border-line bg-surface-2 hover:border-line-2"
                  )}
                >
                  <Truck className={cn("h-5 w-5", ship === o.k ? "text-pk" : "text-fg-mute")} />
                  <span className="flex-1">
                    <span className="block text-[12.5px] font-black text-fg">{o.l}</span>
                    <span className="block text-[10.5px] text-fg-mute">{o.s}</span>
                  </span>
                  <span className="num text-[11.5px] font-black text-fg-dim">{o.p}</span>
                </button>
              ))}
            </div>

            <h3 className="mb-3 mt-5 text-[13.5px] font-black text-white">
              شیوه پرداخت
            </h3>
            <div className="space-y-2">
              {(
                [
                  { k: "online", l: "پرداخت اینترنتی", Icon: Card },
                  { k: "cod", l: "پرداخت در محل", Icon: Sms },
                ] as const
              ).map((o) => (
                <button
                  key={o.k}
                  onClick={() => setPay(o.k)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition",
                    pay === o.k ? "border-pk bg-pk/8" : "border-line bg-surface-2"
                  )}
                >
                  <o.Icon className={cn("h-5 w-5", pay === o.k ? "text-pk" : "text-fg-mute")} />
                  <span className="text-[12.5px] font-black text-fg">{o.l}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-5">
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="کد تخفیف"
                className="h-11 flex-1 rounded-2xl border border-line bg-ink px-4 text-[12.5px] outline-none transition placeholder:text-fg-mute focus:border-pk/60"
              />
              <button
                onClick={() => toast(code ? "کد تخفیف نامعتبر است" : "کد را وارد کنید", "info")}
                className="h-11 shrink-0 rounded-2xl border border-line bg-surface-2 px-4 text-[12px] font-black text-fg-dim transition hover:text-pk"
              >
                اعمال
              </button>
            </div>

            <div className="mt-4 space-y-2.5 border-t border-line pt-4 text-[12px]">
              <Row l="مبلغ کالاها" v={`${money(total)} تومان`} />
              {!!saved && <Row l="تخفیف کالاها" v={`${money(saved)} تومان`} pk />}
              <Row
                l="هزینه ارسال"
                v={shipCost === 0 ? "رایگان" : `${money(shipCost)} تومان`}
              />
              <div className="flex items-center justify-between border-t border-dashed border-line pt-3">
                <span className="text-[12.5px] font-black text-white">قابل پرداخت</span>
                <div className="flex items-baseline gap-1">
                  <span className="num text-lg font-black text-pk">{money(grand)}</span>
                  <span className="text-[11px] font-bold text-fg-dim">تومان</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setDone(true);
                clear();
                toast("سفارش شما با موفقیت ثبت شد ✓");
              }}
              className="mt-4 w-full rounded-2xl bg-pk py-3.5 text-[13.5px] font-black text-white shadow-[0_16px_36px_-18px_rgba(239,57,78,1)] transition hover:bg-pk-dark"
            >
              تایید و تکمیل سفارش
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] font-bold text-fg-mute">
              <Shield className="h-3.5 w-3.5 text-lime" />
              پرداخت امن از طریق درگاه بانکی
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ l, v, pk }: { l: string; v: string; pk?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-bold text-fg-mute">{l}</span>
      <span className={cn("num font-black", pk ? "text-pk" : "text-fg")}>{v}</span>
    </div>
  );
}
