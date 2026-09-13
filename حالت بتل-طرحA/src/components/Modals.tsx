import { useEffect, useState } from "react";
import { X, ShoppingCart, Trash2, Plus, Minus, Star, Heart, ShieldCheck, Truck, BadgeCheck, User, Phone, CheckCircle2, AlertCircle, Eye, Store } from "lucide-react";
import { faNum, type Product } from "../data";

export type CartItem = { p: Product; qty: number };

export function CartDrawer({
  open, items, onClose, onQty, onRemove, onCheckout,
}: {
  open: boolean; items: CartItem[]; onClose: () => void;
  onQty: (id: number, d: number) => void; onRemove: (id: number) => void; onCheckout: () => void;
}) {
  if (!open) return null;
  const total = items.reduce((s, i) => s + i.p.price * i.qty, 0);
  const freeAt = 500000;
  const prog = Math.min(100, (total / freeAt) * 100);
  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute top-0 left-0 bottom-0 w-full max-w-[400px] bg-[#14141c] border-r border-white/10 flex flex-col animate-pop-in">
        <div className="p-5 flex items-center justify-between border-b border-white/[0.07]">
          <p className="font-black text-[15px] flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-[#ef394e]" /> سبد خرید <span className="text-[11px] bg-[#ef394e] px-2 py-0.5 rounded-full">{faNum(items.reduce((s, i) => s + i.qty, 0))} کالا</span></p>
          <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-xl bg-white/[0.06] hover:bg-[#ef394e] transition"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-5 pt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-3">
            <p className="text-[12px] text-zinc-300">{total >= freeAt ? "🎉 تبریک! ارسال سفارش شما رایگان شد" : `برای ارسال رایگان ${faNum(freeAt - total)} تومان دیگر بخرید`}</p>
            <div className="h-2 rounded-full bg-white/[0.07] mt-2 overflow-hidden"><div className="h-full bg-gradient-to-l from-[#ef394e] to-[#ffab00] rounded-full transition-all" style={{ width: `${prog}%` }} /></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center">
              <div>
                <span className="w-20 h-20 mx-auto rounded-3xl bg-white/[0.05] grid place-items-center mb-4"><ShoppingCart className="w-9 h-9 text-zinc-600" /></span>
                <p className="font-bold text-[14px]">سبد خرید شما خالی است</p>
                <p className="text-[12px] text-zinc-500 mt-1">می‌توانید محصولات شگفت‌انگیز را ببینید</p>
                <button onClick={onClose} className="mt-4 h-11 px-6 rounded-xl bg-[#ef394e] text-[13px] font-bold">شروع خرید</button>
              </div>
            </div>
          ) : items.map(({ p, qty }) => (
            <div key={p.id} className="flex gap-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-3">
              <img src={p.image} alt={p.title} className="w-[72px] h-[72px] rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium leading-5 line-clamp-2">{p.title}</p>
                <p className="text-[13px] font-black mt-1">{faNum(p.price * qty)} <span className="text-[10px] font-medium text-zinc-500">تومان</span></p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 bg-white/[0.06] rounded-xl p-1">
                    <button onClick={() => onQty(p.id, 1)} className="w-7 h-7 grid place-items-center rounded-lg hover:bg-[#ef394e] transition"><Plus className="w-3.5 h-3.5" /></button>
                    <span className="w-6 text-center text-[13px] font-black">{faNum(qty)}</span>
                    <button onClick={() => onQty(p.id, -1)} className="w-7 h-7 grid place-items-center rounded-lg hover:bg-white/10 transition"><Minus className="w-3.5 h-3.5" /></button>
                  </div>
                  <button onClick={() => onRemove(p.id)} className="w-8 h-8 grid place-items-center rounded-lg text-zinc-500 hover:text-[#ef394e] hover:bg-[#ef394e]/10 transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-t border-white/[0.07] space-y-3 bg-[#101016]">
            <div className="flex justify-between text-[13px]"><span className="text-zinc-400">جمع سبد خرید</span><span className="font-black">{faNum(total)} تومان</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-zinc-400">هزینه ارسال</span><span className="font-bold text-emerald-400">{total >= freeAt ? "رایگان" : `${faNum(45000)} تومان`}</span></div>
            <button onClick={onCheckout} className="w-full h-[50px] rounded-2xl bg-[#ef394e] hover:bg-[#d92d42] font-black text-[14px] shadow-[0_12px_30px_-8px_rgba(239,57,78,.6)] transition">ادامه و ثبت سفارش</button>
          </div>
        )}
      </aside>
    </div>
  );
}

export function QuickView({
  p, onClose, onAdd, wished, onWish,
}: {
  p: Product | null; onClose: () => void; onAdd: (p: Product) => void;
  wished: boolean; onWish: (id: number) => void;
}) {
  const [color, setColor] = useState(0);
  const [qty, setQty] = useState(1);
  useEffect(() => { setColor(0); setQty(1); }, [p?.id]);
  if (!p) return null;
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[760px] bg-[#1a1a24] border border-white/10 rounded-3xl overflow-hidden animate-pop-in max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 left-4 z-10 w-9 h-9 grid place-items-center rounded-xl bg-black/50 backdrop-blur border border-white/15 hover:bg-[#ef394e] transition"><X className="w-5 h-5" /></button>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[280px]">
            <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
            {p.discount && <span className="absolute top-4 right-4 text-[12px] font-black bg-[#ef394e] px-2.5 py-1.5 rounded-xl">٪{faNum(p.discount)} تخفیف</span>}
          </div>
          <div className="p-6">
            <p className="text-[11.5px] text-zinc-500">{p.brand} • {p.en}</p>
            <h3 className="text-[15px] font-bold leading-7 mt-1.5">{p.title}</h3>
            <div className="flex items-center gap-2 mt-2.5">
              <span className="flex items-center gap-1 text-[12px] font-bold"><Star className="w-4 h-4 fill-[#ffab00] text-[#ffab00]" /> {faNum(p.rating.toFixed(1))}</span>
              <span className="text-[12px] text-zinc-500">({faNum(p.comments)} دیدگاه)</span>
              <span className="mr-auto text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2 py-1 rounded-lg">موجود در انبار</span>
            </div>
            {p.colors && (
              <div className="mt-4">
                <p className="text-[12.5px] font-bold mb-2">انتخاب رنگ:</p>
                <div className="flex gap-2">
                  {p.colors.map((c, i) => (
                    <button key={c} onClick={() => setColor(i)} className={`w-9 h-9 rounded-xl border-2 transition ${color === i ? "border-[#ef394e] scale-110" : "border-white/15"}`} style={{ background: c }} />
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] p-3.5 space-y-2 text-[12px] text-zinc-300">
              <p className="flex items-center gap-2"><Truck className="w-4 h-4 text-sky-400" /> ارسال فوری + پرداخت در محل</p>
              <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> ۷ روز ضمانت بازگشت کالا</p>
              <p className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-[#ffab00]" /> تضمین اصل بودن کالا • فروشنده: فروشگاه اینترنتی پارس کالا</p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                {p.oldPrice && <p className="text-[12px] text-zinc-500 line-through">{faNum(p.oldPrice)} تومان</p>}
                <p className="text-[20px] font-black">{faNum(p.price)} <span className="text-[12px] font-medium text-zinc-400">تومان</span></p>
              </div>
              <div className="flex items-center gap-1 bg-white/[0.06] rounded-xl p-1">
                <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[#ef394e] transition"><Plus className="w-4 h-4" /></button>
                <span className="w-7 text-center font-black">{faNum(qty)}</span>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-white/10 transition"><Minus className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { for (let i = 0; i < qty; i++) onAdd(p); onClose(); }} className="flex-1 h-[48px] rounded-2xl bg-[#ef394e] hover:bg-[#d92d42] font-black text-[13.5px] flex items-center justify-center gap-2 transition"><ShoppingCart className="w-5 h-5" /> افزودن به سبد خرید</button>
              <button onClick={() => onWish(p.id)} className={`w-[48px] h-[48px] rounded-2xl grid place-items-center border transition ${wished ? "bg-[#ef394e] border-[#ef394e]" : "border-white/15 hover:border-[#ef394e]"}`}><Heart className={`w-5 h-5 ${wished ? "fill-current" : ""}`} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoginModal({ open, onClose, onToast }: { open: boolean; onClose: () => void; onToast: (m: string, ok: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  if (!open) return null;
  const sendCode = () => {
    const clean = mobile.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    if (!/^09\d{9}$/.test(clean)) {
      onToast("شماره موبایل یا ایمیل نامعتبر است", false);
      return;
    }
    setStep(2);
    onToast("کد تایید به شماره شما پیامک شد", true);
  };
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[400px] bg-[#1a1a24] border border-white/10 rounded-3xl p-7 animate-pop-in">
        <button onClick={onClose} className="absolute top-4 left-4 w-8 h-8 grid place-items-center rounded-lg hover:bg-white/10"><X className="w-4.5 h-4.5 w-5 h-5" /></button>
        <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ef394e] to-[#ff6a3d] grid place-items-center mx-auto"><Store className="w-7 h-7 text-white" /></span>
        <h3 className="text-center font-black text-[17px] mt-4">ورود | ثبت‌نام</h3>
        <p className="text-center text-[12.5px] text-zinc-400 mt-1.5">سلام! برای ورود شماره موبایل خود را وارد کنید</p>
        {step === 1 ? (
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 bg-[#101016] border border-white/10 rounded-2xl px-4 focus-within:border-[#ef394e]/60 transition">
              <Phone className="w-4.5 h-4.5 w-5 h-5 text-zinc-500" />
              <input value={mobile} onChange={(e) => setMobile(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendCode()} placeholder="۰۹۱۲ ـــ ــــ ـــ" className="flex-1 bg-transparent h-[50px] outline-none text-[15px] tracking-wider text-left" dir="ltr" />
            </div>
            <button onClick={sendCode} className="w-full h-[50px] rounded-2xl bg-[#ef394e] hover:bg-[#d92d42] font-black text-[14px] transition">دریافت کد تایید</button>
            <p className="text-[11px] text-zinc-500 text-center leading-5">با ورود، <span className="text-zinc-300">قوانین پارس کالا</span> را می‌پذیرید</p>
          </div>
        ) : (
          <div className="mt-5 space-y-3 animate-pop-in">
            <div className="flex gap-2 justify-center" dir="ltr">
              {[0, 1, 2, 3, 4].map((i) => (
                <input key={i} maxLength={1} className="w-12 h-[52px] text-center text-[20px] font-black bg-[#101016] border border-white/10 rounded-2xl outline-none focus:border-[#ef394e]" />
              ))}
            </div>
            <button onClick={() => { onToast("خوش آمدید! ورود با موفقیت انجام شد 🎉", true); onClose(); setStep(1); }} className="w-full h-[50px] rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-[14px] transition">تایید و ورود</button>
            <button onClick={() => setStep(1)} className="w-full text-[12px] text-zinc-400 hover:text-white">ویرایش شماره موبایل</button>
          </div>
        )}
        <div className="mt-5 pt-4 border-t border-white/[0.07] flex items-center justify-center gap-2 text-[11.5px] text-zinc-500"><User className="w-3.5 h-3.5" /> ورود شما به منزله پذیرش قوانین است</div>
      </div>
    </div>
  );
}

export function Toasts({ list }: { list: { id: number; msg: string; ok: boolean }[] }) {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-[360px] z-[80] space-y-2 pointer-events-none">
      {list.map((t) => (
        <div key={t.id} className={`flex items-start gap-2.5 p-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl animate-pop-in pointer-events-auto ${t.ok ? "bg-emerald-950/90 border-emerald-500/30" : "bg-[#2a0f16]/95 border-[#ef394e]/40"}`}>
          {t.ok ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-[#ff6b7e] shrink-0 mt-0.5" />}
          <p className="text-[12.5px] font-medium leading-6">{t.msg}</p>
        </div>
      ))}
    </div>
  );
}

export function RecentBuyers() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  const buyers = [
    { name: "علی محمدی از تهران", item: "گوشی Galaxy S23 Plus", time: "۲ دقیقه پیش", img: "https://images.pexels.com/photos/36680544/pexels-photo-36680544.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280" },
    { name: "سارا کریمی از اصفهان", item: "اپل واچ سری ۹", time: "۵ دقیقه پیش", img: "https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280" },
    { name: "رضا احمدی از شیراز", item: "کفش رانینگ نایک", time: "۸ دقیقه پیش", img: "https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280" },
    { name: "مریم حسینی از مشهد", item: "کیف چرم رادین", time: "۱۲ دقیقه پیش", img: "https://images.pexels.com/photos/26965828/pexels-photo-26965828.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280" },
  ];
  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => { setI((v) => (v + 1) % buyers.length); setShow(true); }, 400);
    }, 7000);
    return () => clearInterval(id);
  }, []);
  if (!show) return null;
  const b = buyers[i];
  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-[60] hidden sm:flex items-center gap-3 bg-[#1a1a24]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 pr-4 shadow-2xl animate-pop-in max-w-[320px]">
      <img src={b.img} className="w-12 h-12 rounded-xl object-cover" alt="" />
      <div className="min-w-0">
        <p className="text-[11.5px] font-bold truncate">{b.name}</p>
        <p className="text-[11px] text-zinc-400 truncate">«{b.item}» را خرید <span className="text-emerald-400">✓</span></p>
        <p className="text-[10px] text-zinc-500 flex items-center gap-1"><Eye className="w-3 h-3" /> {b.time} • خرید تایید شده</p>
      </div>
      <button onClick={() => setShow(false)} className="text-zinc-600 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

export function MobileNav({ cart, onCart, onLogin }: { cart: number; onCart: () => void; onLogin: () => void }) {
  const [active, setActive] = useState("خانه");
  return (
    <div className="lg:hidden fixed bottom-0 right-0 left-0 z-40 bg-[#14141c]/95 backdrop-blur-xl border-t border-white/10 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-[64px]">
        {[
          { t: "خانه", icon: Store },
          { t: "دسته‌ها", icon: Eye },
          { t: "سبد", icon: ShoppingCart, badge: cart },
          { t: "علاقه‌ها", icon: Heart },
          { t: "حساب", icon: User },
        ].map((m) => (
          <button
            key={m.t}
            onClick={() => { setActive(m.t); if (m.t === "سبد") onCart(); if (m.t === "حساب") onLogin(); else if (m.t === "خانه") window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className={`relative flex flex-col items-center justify-center gap-1 text-[10.5px] font-bold transition ${active === m.t ? "text-[#ff6b7e]" : "text-zinc-500"}`}
          >
            <m.icon className="w-5 h-5" />
            {m.t}
            {m.badge ? <span className="absolute top-1 left-1/2 -translate-x-[-18px] min-w-[18px] h-[18px] px-1 rounded-full bg-[#ef394e] text-white text-[10px] grid place-items-center">{m.badge}</span> : null}
            {active === m.t && <span className="absolute bottom-1 w-8 h-1 rounded-full bg-[#ef394e]" />}
          </button>
        ))}
      </div>
    </div>
  );
}
