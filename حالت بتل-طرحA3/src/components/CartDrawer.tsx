import { useEffect } from "react";
import { cn } from "../utils/cn";
import { useCart } from "../cart";
import { faNum, faPrice } from "../data/store";
import { Cart, Check, Close, Minus, Plus, Trash, Truck } from "./Icons";

export function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, remove, setQty, total, count, clear, push, setQuick } = useCart();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  if (!drawerOpen) return null;

  const shipping = total >= 5_000_000 || total === 0 ? 0 : 150_000;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="anim-overlay absolute inset-0 bg-ink/75 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />

      <aside className="anim-drawer absolute inset-y-0 left-0 flex w-full max-w-md flex-col border-e border-line bg-coal shadow-card">
        {/* header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h3 className="flex items-center gap-2 font-display text-xl text-snow">
            <Cart className="h-5 w-5 text-ember" />
            سبد خرید
            {count > 0 && (
              <span className="rounded-full bg-ember/15 px-2.5 py-0.5 text-[11px] font-bold text-ember">
                {faNum(count)} کالا
              </span>
            )}
          </h3>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="بستن سبد خرید"
            className="grid h-9 w-9 place-items-center rounded-lg text-mute transition-colors hover:bg-hover hover:text-snow"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          /* empty state */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-24 w-24 place-items-center rounded-full border-2 border-dashed border-line text-faint">
              <Cart className="h-10 w-10" />
            </span>
            <p className="font-bold text-snow">سبد خرید شما خالی است</p>
            <p className="text-xs leading-6 text-mute">
              از میان هزاران کالای دیجیتال، محصول موردنظرتان را پیدا کنید و همین حالا سفارش دهید.
            </p>
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-2 rounded-xl bg-ember px-6 py-3 text-sm font-bold text-white shadow-glow transition-colors hover:bg-emberdeep"
            >
              مشاهده محصولات
            </button>
          </div>
        ) : (
          <>
            {/* items */}
            <div className="flex-1 divide-y divide-line/60 overflow-y-auto px-5">
              {items.map(({ product: p, qty }) => (
                <div key={p.id} className="flex gap-3 py-4">
                  <button onClick={() => { setQuick(p); setDrawerOpen(false); }} className="shrink-0">
                    <img src={p.image} alt={p.title} className="h-20 w-20 rounded-lg border border-line object-cover" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[12.5px] font-medium leading-5 text-snow">{p.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-line">
                        <button
                          onClick={() => setQty(p.id, qty + 1)}
                          className="grid h-8 w-8 place-items-center text-mute transition-colors hover:text-ember"
                          aria-label="افزایش"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-black text-snow">{faNum(qty)}</span>
                        {qty === 1 ? (
                          <button
                            onClick={() => {
                              remove(p.id);
                              push("از سبد خرید حذف شد", "info");
                            }}
                            className="grid h-8 w-8 place-items-center text-mute transition-colors hover:text-ember"
                            aria-label="حذف"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setQty(p.id, qty - 1)}
                            className="grid h-8 w-8 place-items-center text-mute transition-colors hover:text-ember"
                            aria-label="کاهش"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="text-left leading-tight">
                        <div className="text-[13px] font-black text-snow">
                          {faPrice(p.price * qty)}
                          <span className="mr-1 text-[9px] font-medium text-mute">تومان</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="space-y-3 border-t border-line p-5">
              {shipping > 0 && (
                <p className="flex items-center gap-2 rounded-lg bg-raise/70 px-3 py-2.5 text-[11px] text-mute">
                  <Truck className="h-4 w-4 shrink-0 text-gold" />
                  با {faPrice(5_000_000 - total)} تومان خرید بیشتر، ارسال شما رایگان می‌شود.
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-mute">
                <span>هزینه ارسال</span>
                <span className={cn("font-bold", shipping === 0 ? "text-jade" : "text-snow")}>
                  {shipping === 0 ? "رایگان" : `${faPrice(shipping)} تومان`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-snow">مبلغ قابل پرداخت</span>
                <span className="text-lg font-black text-ember">
                  {faPrice(total + shipping)}
                  <span className="mr-1 text-[10px] font-medium text-mute">تومان</span>
                </span>
              </div>
              <button
                onClick={() => push("در حال انتقال به درگاه پرداخت امن بانکی...")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-ember py-3.5 text-sm font-black text-white shadow-glow transition-colors hover:bg-emberdeep"
              >
                <Check className="h-5 w-5" />
                ادامه فرآیند خرید
              </button>
              <button
                onClick={() => {
                  clear();
                  push("سبد خرید خالی شد", "info");
                }}
                className="w-full py-1 text-center text-[11px] font-medium text-faint transition-colors hover:text-ember"
              >
                حذف همه کالاها از سبد
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ------------------------------ toasts ------------------------------ */

export function Toasts() {
  const { toasts } = useCart();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[90] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="anim-toast flex items-center gap-2.5 rounded-xl border border-line bg-raise/95 px-4 py-3 shadow-card backdrop-blur-md"
        >
          <span
            className={cn(
              "grid h-6 w-6 shrink-0 place-items-center rounded-full",
              t.kind === "success" && "bg-jade/15 text-jade",
              t.kind === "error" && "bg-ember/15 text-ember",
              t.kind === "info" && "bg-gold/15 text-gold"
            )}
          >
            {t.kind === "error" ? <Close className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
          </span>
          <span className="text-[12.5px] font-bold text-snow">{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
