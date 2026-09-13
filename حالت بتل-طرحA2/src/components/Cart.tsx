import { cn } from "../utils/cn";
import { fa, type Product } from "../data";
import { CartIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "./icons";

export type CartItem = { p: Product; qty: number };

type DrawerProps = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onRemove: (id: number) => void;
};

export function CartDrawer({ open, items, onClose, onInc, onDec, onRemove }: DrawerProps) {
  const total = items.reduce((s, it) => s + it.p.price * it.qty, 0);
  const count = items.reduce((s, it) => s + it.qty, 0);

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-black/65 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-full max-w-[390px] flex-col border-r border-line bg-ink-2 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-line/70 px-5 py-4">
          <h3 className="flex items-center gap-2.5 text-[15px] font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent">
              <CartIcon className="h-5 w-5" />
            </span>
            سبد خرید
            {count > 0 && <span className="text-[12px] font-bold text-mist">({fa(count)} کالا)</span>}
          </h3>
          <button
            onClick={onClose}
            aria-label="بستن سبد خرید"
            className="grid h-9 w-9 place-items-center rounded-xl border border-line text-mist transition hover:border-danger/50 hover:text-danger"
          >
            <CloseIcon className="h-4.5 w-4.5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full border border-line bg-card text-mist">
              <CartIcon className="h-9 w-9" />
            </span>
            <div>
              <p className="text-[14px] font-extrabold">سبد خرید شما خالی است</p>
              <p className="mt-1.5 text-[12px] leading-6 text-mist">
                محصولات مورد علاقه‌تان را اضافه کنید تا اینجا را شلوغ کنید!
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl bg-accent px-6 py-2.5 text-[12.5px] font-extrabold text-accent-ink transition hover:bg-accent-2"
            >
              مشاهده محصولات
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {items.map(({ p, qty }) => (
                <div key={p.id} className="flex gap-3 rounded-2xl border border-line/60 bg-card p-3">
                  <img src={p.image} alt={p.title} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="line-clamp-2 text-[11.5px] font-medium leading-5 text-snow/85">{p.title}</p>
                    <div className="mt-auto flex items-center justify-between pt-1.5">
                      <span className="text-[12px] font-black">
                        {fa(p.price * qty)} <span className="text-[9px] font-medium text-mist">تومان</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onDec(p.id)}
                          aria-label="کاهش تعداد"
                          className="grid h-7 w-7 place-items-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-[12px] font-bold tabular-nums">{fa(qty)}</span>
                        <button
                          onClick={() => onInc(p.id)}
                          aria-label="افزایش تعداد"
                          className="grid h-7 w-7 place-items-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(p.id)}
                    aria-label="حذف از سبد"
                    className="self-start text-mist transition hover:text-danger"
                  >
                    <TrashIcon className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-line/70 px-5 py-4">
              <div className="flex items-center justify-between text-[12.5px] text-mist">
                <span>جمع سبد خرید</span>
                <span>
                  {fa(total)} <span className="text-[10px]">تومان</span>
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[13.5px] font-extrabold">مبلغ قابل پرداخت</span>
                <span className="text-[15px] font-black text-accent">
                  {fa(total)} <span className="text-[10px] font-medium text-mist">تومان</span>
                </span>
              </div>
              <button className="mt-4 h-12 w-full rounded-xl bg-accent text-[13.5px] font-black text-accent-ink shadow-lg shadow-accent/20 transition hover:bg-accent-2">
                ثبت نهایی سفارش
              </button>
              <button
                onClick={onClose}
                className="mt-2 h-11 w-full rounded-xl border border-line bg-card text-[12.5px] font-bold text-mist transition hover:border-accent/40 hover:text-snow"
              >
                ادامه خرید
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function Toast({ toast }: { toast: { id: number; text: string } | null }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2">
      <div
        key={toast.id}
        className="anim-toast flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-accent/30 bg-[#0c2413] px-5 py-3.5 text-[12.5px] font-bold text-accent shadow-2xl shadow-black/60"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-accent-ink">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        {toast.text}
      </div>
    </div>
  );
}
