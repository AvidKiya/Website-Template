import { useEffect, useState } from "react";
import { cn, px, money, fa } from "../lib/utils";
import { useShop } from "../lib/store";
import { navigate } from "../lib/router";
import {
  Close,
  Cart,
  Trash,
  Plus,
  Minus,
  Check,
  Shield,
  User,
  Phone,
  Sms,
  Star,
} from "./Icons";
import { Logo } from "./Logo";

/* --------------------------------- cart -------------------------------- */
export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, total, saved, setQty, remove, count } =
    useShop();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={cn(
          "fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[71] flex w-full max-w-[420px] flex-col border-e border-line bg-ink-2 transition-transform duration-300",
          cartOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <header className="flex items-center justify-between border-b border-line p-4">
          <div className="flex items-center gap-2">
            <Cart className="h-5 w-5 text-pk" />
            <h3 className="text-[14px] font-black text-white">سبد خرید شما</h3>
            <span className="num rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-black text-fg-dim">
              {fa(count)}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-fg-dim transition hover:text-pk"
            aria-label="بستن"
          >
            <Close className="h-5 w-5" />
          </button>
        </header>

        {!lines.length ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-surface text-fg-mute ring-1 ring-line">
              <Cart className="h-10 w-10" />
            </span>
            <p className="text-[13px] font-bold text-fg-dim">
              سبد خرید شما خالی است!
            </p>
            <button
              onClick={() => {
                setCartOpen(false);
                navigate("/shop");
              }}
              className="rounded-2xl bg-pk px-5 py-2.5 text-[13px] font-black text-white"
            >
              رفتن به فروشگاه
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-2.5 overflow-y-auto p-3">
              {lines.map((l) => (
                <div
                  key={l.id}
                  className="flex gap-3 rounded-2xl border border-line bg-surface p-2.5"
                >
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate(`/product/${l.id}`);
                    }}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f4f4f6]"
                  >
                    <img
                      src={px(l.product.img, 200)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[12.5px] font-bold leading-5 text-fg">
                      {l.product.title}
                    </p>
                    {!!l.product.off && (
                      <span className="num mt-1 inline-block rounded-md bg-pk/12 px-1.5 py-0.5 text-[10px] font-black text-pk">
                        ٪{fa(l.product.off)} تخفیف
                      </span>
                    )}
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-xl border border-line bg-ink p-1">
                        <button
                          onClick={() => setQty(l.id, l.qty + 1)}
                          className="grid h-6 w-6 place-items-center rounded-lg text-fg-dim transition hover:bg-surface-2 hover:text-pk"
                          aria-label="افزودن"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <span className="num w-6 text-center text-[12px] font-black">
                          {fa(l.qty)}
                        </span>
                        <button
                          onClick={() => setQty(l.id, l.qty - 1)}
                          className="grid h-6 w-6 place-items-center rounded-lg text-fg-dim transition hover:bg-surface-2 hover:text-pk"
                          aria-label="کاهش"
                        >
                          {l.qty === 1 ? (
                            <Trash className="h-3.5 w-3.5" />
                          ) : (
                            <Minus className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="num text-[13px] font-black text-white">
                          {money(l.product.price * l.qty)}
                        </span>
                        <span className="text-[10px] text-fg-dim">تومان</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(l.id)}
                    className="self-start text-fg-mute transition hover:text-pk"
                    aria-label="حذف"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <footer className="space-y-3 border-t border-line bg-surface p-4">
              {!!saved && (
                <div className="flex items-center justify-between text-[12px] font-bold text-pk">
                  <span>سود شما از این خرید</span>
                  <span className="num">
                    {money(saved)} تومان
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-bold text-fg-dim">
                  مبلغ قابل پرداخت
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="num text-lg font-black text-white">
                    {money(total)}
                  </span>
                  <span className="text-[11px] font-bold text-fg-dim">تومان</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigate("/cart");
                }}
                className="w-full rounded-2xl bg-pk py-3.5 text-[13.5px] font-black text-white shadow-[0_14px_34px_-16px_rgba(239,57,78,1)] transition hover:bg-pk-dark"
              >
                ثبت سفارش
              </button>
              <p className="flex items-center justify-center gap-1.5 text-[10.5px] font-bold text-fg-mute">
                <Shield className="h-3.5 w-3.5 text-lime" />
                پرداخت در محل و ۷ روز ضمانت بازگشت کالا
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

/* --------------------------------- auth -------------------------------- */
export function AuthModal() {
  const { authOpen, setAuthOpen, toast } = useShop();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [t, setT] = useState(120);

  useEffect(() => {
    if (step !== 2) return;
    setT(120);
    const id = setInterval(
      () => setT((v) => (v > 0 ? v - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, [step]);

  useEffect(() => {
    if (!authOpen) {
      setStep(1);
      setCode("");
    }
  }, [authOpen]);

  const okPhone = /^09\d{9}$/.test(phone.replace(/\D/g, ""));

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4 backdrop-blur-sm transition-opacity",
        authOpen ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={() => setAuthOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "pop relative w-full max-w-[400px] overflow-hidden rounded-3xl border border-line bg-ink-2",
          authOpen ? "" : "scale-95"
        )}
      >
        <div className="pk-grid absolute inset-0 opacity-25" />
        <div className="absolute -top-24 right-1/2 h-48 w-48 translate-x-1/2 rounded-full bg-pk/25 blur-3xl" />
        <button
          onClick={() => setAuthOpen(false)}
          className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-fg-dim transition hover:text-pk"
          aria-label="بستن"
        >
          <Close className="h-5 w-5" />
        </button>

        <div className="relative p-7">
          <div className="mb-6 flex flex-col items-center text-center">
            <Logo />
            <h3 className="mt-4 text-[16px] font-black text-white">
              {mode === "login" ? "ورود به پارس کالا" : "ثبت‌نام در پارس کالا"}
            </h3>
            <p className="mt-1.5 text-[11.5px] text-fg-mute">
              {step === 1
                ? "شماره موبایل خود را وارد کنید"
                : `کد تایید ۵ رقمی به ${fa(phone)} ارسال شد`}
            </p>
          </div>

          {step === 1 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!okPhone) return toast("شماره موبایل نامعتبر است", "info");
                setStep(2);
              }}
              className="space-y-3"
            >
              <label className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-4 transition focus-within:border-pk/60">
                <Phone className="h-5 w-5 text-fg-mute" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  dir="ltr"
                  placeholder="09123456789"
                  className="num h-13 flex-1 bg-transparent py-3.5 text-[14px] outline-none placeholder:text-fg-mute"
                />
              </label>
              <button className="w-full rounded-2xl bg-pk py-3.5 text-[13.5px] font-black text-white shadow-[0_14px_34px_-16px_rgba(239,57,78,1)] transition hover:bg-pk-dark">
                دریافت کد تایید
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (code.length < 4) return toast("کد تایید کامل نیست", "info");
                setAuthOpen(false);
                toast("خوش آمدید! ورود شما با موفقیت انجام شد ✓");
              }}
              className="space-y-3"
            >
              <label className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-4 transition focus-within:border-pk/60">
                <Sms className="h-5 w-5 text-fg-mute" />
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  inputMode="numeric"
                  dir="ltr"
                  placeholder="- - - - -"
                  className="num flex-1 bg-transparent py-3.5 text-center text-[18px] tracking-[0.5em] outline-none placeholder:tracking-[0.5em]"
                />
              </label>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-fg-dim hover:text-pk"
                >
                  تغییر شماره
                </button>
                <span className="num text-fg-mute">
                  {fa(Math.floor(t / 60))}:{fa(String(t % 60).padStart(2, "0"))}
                </span>
              </div>
              <button className="w-full rounded-2xl bg-pk py-3.5 text-[13.5px] font-black text-white transition hover:bg-pk-dark">
                تایید و ورود
              </button>
            </form>
          )}

          <div className="my-5 flex items-center gap-3 text-[10.5px] font-bold text-fg-mute">
            <span className="h-px flex-1 bg-line" />
            یا
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setStep(1);
            }}
            className="w-full rounded-2xl border border-line bg-surface py-3 text-[12.5px] font-bold text-fg-dim transition hover:border-pk/40 hover:text-pk"
          >
            {mode === "login" ? "ساخت حساب کاربری جدید" : "بازگشت به ورود"}
          </button>

          <p className="mt-5 flex items-start gap-2 text-[10.5px] leading-5 text-fg-mute">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" />
            ورود شما به معنای پذیرش «شرایط و قوانین استفاده از سرویس‌های سایت پارس
            کالا» و «قوانین حریم خصوصی» است.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- toasts ------------------------------- */
export function Toasts() {
  const { toasts } = useShop();
  return (
    <div className="pointer-events-none fixed bottom-20 left-1/2 z-[90] flex w-[92%] max-w-sm -translate-x-1/2 flex-col gap-2 sm:bottom-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pop pointer-events-auto flex items-center gap-2.5 rounded-2xl border border-line bg-surface-2/95 px-4 py-3 shadow-card backdrop-blur"
        >
          <span
            className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-xl",
              t.kind === "info" ? "bg-sky/15 text-sky" : "bg-lime/15 text-lime"
            )}
          >
            {t.kind === "info" ? (
              <Star className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </span>
          <p className="text-[12px] font-bold text-fg">{t.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ user fab ------------------------------ */
export function UserFab() {
  const { setAuthOpen } = useShop();
  return (
    <button
      onClick={() => setAuthOpen(true)}
      className="fixed bottom-24 left-4 z-40 hidden h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2/90 text-fg-dim backdrop-blur transition hover:border-pk hover:text-pk lg:grid"
      title="ورود / ثبت نام"
      aria-label="ورود"
    >
      <User className="h-5 w-5" />
    </button>
  );
}
