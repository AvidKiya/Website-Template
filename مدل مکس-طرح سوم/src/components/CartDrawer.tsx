import { faIn, money, px, type Product } from "../data";
import { Close, Minus, Plus, Trash, Cart as CartIcon } from "./Icons";

export type CartLine = { p: Product; q: number };

export default function CartDrawer({
  open,
  onClose,
  lines,
  setQty,
  remove,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  setQty: (id: number, d: number) => void;
  remove: (id: number) => void;
}) {
  const total = lines.reduce((s, l) => s + l.p.price * l.q, 0);
  const saved = lines.reduce((s, l) => s + ((l.p.old ?? l.p.price) - l.p.price) * l.q, 0);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute inset-y-0 left-0 flex w-[92%] max-w-[420px] flex-col border-l border-ink-700 bg-ink-900 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-800 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <CartIcon className="h-5 w-5 text-brand-500" />
            سبد خرید شما ({faIn(lines.length)})
          </h3>
          <button onClick={onClose} className="text-mute transition hover:text-white">
            <Close />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-ink-850 text-3xl">🛒</span>
              <p className="text-sm text-slate-200">سبد خرید شما خالی است</p>
              <p className="text-[12px] text-mute">می‌توانید از فروشگاه محصول مورد نظر را اضافه کنید.</p>
              <button onClick={onClose} className="mt-2 rounded-xl bg-brand-600 px-5 py-2.5 text-[13px] font-semibold text-white">
                بازگشت به فروشگاه
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={l.p.id} className="flex gap-3 rounded-2xl border border-ink-700 bg-ink-850 p-3">
                  <img src={px(l.p.img, 300)} alt={l.p.title} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <p className="line-clamp-1 text-[13px] font-semibold text-slate-100">{l.p.title}</p>
                    <p className="mt-0.5 text-[11px] text-mute">{l.p.cat}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-xl border border-ink-600 px-2 py-1">
                        <button onClick={() => setQty(l.p.id, 1)} className="text-brand-400">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-[12px]">{faIn(l.q)}</span>
                        <button onClick={() => setQty(l.p.id, -1)} className="text-mute">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-bold text-brand-400">{money(l.p.price * l.q)}</p>
                        <p className="text-[10px] text-mute">تومان</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => remove(l.p.id)} className="self-start text-mute transition hover:text-brand-500">
                    <Trash className="h-4.5 w-4.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-3 border-t border-ink-800 bg-ink-950/60 p-4">
            <div className="flex items-center justify-between text-[12.5px] text-mute">
              <span>سود شما از خرید</span>
              <span className="text-teal-400">{money(saved)} تومان</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-white">
              <span>مبلغ قابل پرداخت</span>
              <span className="text-brand-400">{money(total)} تومان</span>
            </div>
            <button className="w-full rounded-2xl bg-brand-600 py-3.5 text-sm font-bold text-white transition hover:bg-brand-500 glow-brand">
              ثبت سفارش و پرداخت
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
