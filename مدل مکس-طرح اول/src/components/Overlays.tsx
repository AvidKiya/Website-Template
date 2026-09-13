import { useEffect, useMemo, useState } from "react";
import SafeImg from "./SafeImg";
import {
  IconCart,
  IconChevron,
  IconClose,
  IconGrid,
  IconHeart,
  IconHome,
  IconMinus,
  IconPhone,
  IconPlus,
  IconSearch,
  IconTrash,
  IconUser,
  Social,
} from "./Icons";
import { LOCAL, LOGO, localFor, megaMenu, products, P, type Product } from "../data/site";
import { money, toFa } from "../lib/utils";

export type CartLine = { p: Product; qty: number };

/* ================================================================== */
export function Backdrop({ show, onClose }: { show: boolean; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    />
  );
}

/* ================================================================== */
export function CartDrawer({
  open,
  onClose,
  lines,
  setQty,
  remove,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  setQty: (id: number, q: number) => void;
  remove: (id: number) => void;
}) {
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const saved = lines.reduce((s, l) => s + ((l.p.old ?? l.p.price) - l.p.price) * l.qty, 0);

  return (
    <aside
      className={`fixed top-0 left-0 z-[100] h-full w-full sm:w-[400px] bg-ink-900 border-l border-ink-800 flex flex-col transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-16 px-5 flex items-center justify-between border-b border-ink-800">
        <p className="text-[14px] text-white font-semibold">
          سبد خرید شما <span className="text-ink-400 text-[12px]">({toFa(lines.length)} کالا)</span>
        </p>
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-ink-800 grid place-items-center">
          <IconClose className="w-4 h-4" />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex-1 grid place-items-center p-8 text-center">
          <div>
            <SafeImg
              src="https://dark.parskalas.com/wp-content/themes/parskala/assets/img/empty-cart.svg"
              alt="سبد خالی"
              contain
              className="w-32 h-32 mx-auto opacity-80"
              wrapClassName="w-32 h-32 mx-auto rounded-2xl"
              fallbackText="🛒"
            />
            <p className="mt-5 text-[13.5px] text-ink-100">هیچ محصولی در سبد خرید نیست.</p>
            <p className="mt-2 text-[12px] text-ink-400 leading-6">
              جهت مشاهده محصولات بیشتر به صفحات زیر مراجعه نمایید.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button onClick={onClose} className="h-10 px-5 rounded-xl bg-ink-800 text-[12.5px]">
                صفحه اصلی
              </button>
              <button
                onClick={onClose}
                className="h-10 px-5 rounded-xl bg-gradient-to-l from-brand-600 to-brand-500 text-white text-[12.5px]"
              >
                فروشگاه
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto thin-scroll p-4 space-y-3">
            {lines.map((l) => (
              <div key={l.p.id} className="flex gap-3 rounded-2xl bg-ink-850 border border-ink-700 p-3">
                <div className="w-20 h-20 shrink-0 rounded-xl bg-ink-800 overflow-hidden">
                  <SafeImg
                    src={l.p.img}
                    fallbackSrc={localFor(l.p)}
                    alt={l.p.title}
                    contain
                    className="w-full h-full p-1.5"
                    wrapClassName="w-full h-full"
                    fallbackText={l.p.title}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] leading-5 text-ink-100 line-clamp-2">{l.p.title}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-lg border border-ink-600">
                      <button
                        onClick={() => setQty(l.p.id, l.qty + 1)}
                        className="w-7 h-7 grid place-items-center text-brand-400"
                      >
                        <IconPlus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-[12px] digits">{toFa(l.qty)}</span>
                      {l.qty > 1 ? (
                        <button
                          onClick={() => setQty(l.p.id, l.qty - 1)}
                          className="w-7 h-7 grid place-items-center text-ink-300"
                        >
                          <IconMinus className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => remove(l.p.id)}
                          className="w-7 h-7 grid place-items-center text-ink-300 hover:text-brand-400"
                        >
                          <IconTrash className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-[12.5px] font-bold text-white digits">
                      {money(l.p.price * l.qty)}
                      <span className="text-[10px] font-normal text-ink-400 mr-1">تومان</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-ink-800 p-5 space-y-3">
            {saved > 0 && (
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-ink-400">سود شما از این خرید</span>
                <span className="text-mint-400 digits">{money(saved)} تومان</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-ink-300">مبلغ قابل پرداخت</span>
              <span className="text-[16px] font-bold text-white digits">
                {money(total)}
                <span className="text-[11px] font-normal text-ink-300 mr-1">تومان</span>
              </span>
            </div>
            <button className="w-full h-12 rounded-xl bg-gradient-to-l from-brand-600 to-brand-500 text-white text-[13.5px] font-medium glow-brand">
              ثبت سفارش و پرداخت
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

/* ================================================================== */
export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(
    () => (q.trim() ? products.filter((p) => p.title.includes(q.trim())).slice(0, 6) : []),
    [q]
  );

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-ink-900 border-b border-ink-800 shadow-2xl">
        <div className="mx-auto max-w-[900px] px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 h-12 rounded-2xl bg-ink-850 border border-ink-700 px-4 focus-within:border-brand-500">
              <IconSearch className="w-5 h-5 text-ink-400" />
              <input
                autoFocus={open}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="جستجو در بین هزاران کالای پارس کالا ..."
                className="flex-1 bg-transparent outline-none text-[13.5px]"
              />
            </div>
            <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-ink-800 grid place-items-center">
              <IconClose className="w-4 h-4" />
            </button>
          </div>

          {!q && (
            <>
              <p className="mt-6 text-[12px] text-ink-400">جستجوی پرطرفدار</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["گوشی و موبایل", "آیفون", "اپل واچ", "مک بوک سری ۸", "کفش نایکی", "کیف زنانه"].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => setQ(t)}
                      className="text-[12.5px] px-3 py-1.5 rounded-full border border-ink-700 bg-ink-850 text-ink-200 hover:border-brand-500 hover:text-white transition-colors"
                    >
                      {t}
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {q && (
            <div className="mt-5 space-y-2 max-h-[52vh] overflow-y-auto thin-scroll">
              {results.length === 0 && (
                <p className="text-[12.5px] text-ink-400 py-8 text-center">
                  کالایی با این عنوان پیدا نشد.
                </p>
              )}
              {results.map((p) => (
                <a
                  key={p.id}
                  href="#"
                  className="flex items-center gap-3 rounded-2xl border border-ink-700 bg-ink-850 p-3 hover:border-brand-500/60 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-ink-800 overflow-hidden shrink-0">
                    <SafeImg
                      src={p.img}
                      fallbackSrc={localFor(p)}
                      alt={p.title}
                      contain
                      className="w-full h-full p-1"
                      wrapClassName="w-full h-full"
                      fallbackText={p.title}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] text-ink-100 line-clamp-1">{p.title}</p>
                    <p className="text-[11px] text-ink-400 mt-1">{p.cat}</p>
                  </div>
                  <p className="text-[12.5px] font-bold text-white digits shrink-0">
                    {money(p.price)}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center p-4 transition-all duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-[760px] rounded-3xl overflow-hidden border border-ink-700 bg-ink-900 grid md:grid-cols-2">
        <div className="relative hidden md:block min-h-[380px]">
          <SafeImg
            src={P + "01.jpg"}
            fallbackSrc={LOCAL.hero}
            alt="ورود و عضویت"
            className="absolute inset-0 w-full h-full"
            wrapClassName="absolute inset-0 w-full h-full"
            gradient={["#2a0a16", "#0c0c10"]}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 to-ink-950/30" />
          <div className="relative h-full flex flex-col justify-end p-7">
            <p className="text-white font-bold text-lg">به پارس کالا خوش آمدید</p>
            <p className="text-[12px] text-ink-300 mt-2 leading-6">
              با عضویت در پارس کالا از تخفیف‌های اختصاصی، ارسال رایگان و پیگیری آسان سفارش‌ها
              بهره‌مند شوید.
            </p>
          </div>
        </div>

        <div className="p-7">
          <div className="flex items-center justify-between">
            <SafeImg
              src={LOGO}
              alt="پارس کالا"
              contain
              className="h-10 w-auto"
              wrapClassName="w-10 h-10 rounded-xl"
              fallbackText="PK"
            />
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-ink-800 grid place-items-center">
              <IconClose className="w-4 h-4" />
            </button>
          </div>

          <h3 className="mt-6 text-[16px] font-bold text-white">ورود | ثبت نام</h3>
          <p className="mt-2 text-[12px] text-ink-400 leading-6">
            {step === 0
              ? "موبایل یا ایمیل خود را وارد نمایید."
              : "کد تایید ۵ رقمی ارسال شده را وارد کنید."}
          </p>

          {step === 0 ? (
            <input
              dir="ltr"
              placeholder="09xxxxxxxxx"
              className="mt-5 w-full h-12 rounded-xl bg-ink-850 border border-ink-700 px-4 text-[13px] text-left outline-none focus:border-brand-500 transition-colors"
            />
          ) : (
            <div dir="ltr" className="mt-5 flex items-center gap-2 justify-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <input
                  key={i}
                  maxLength={1}
                  className="w-12 h-14 rounded-xl bg-ink-850 border border-ink-700 text-center text-lg outline-none focus:border-brand-500"
                />
              ))}
            </div>
          )}

          <button
            onClick={() => (step === 0 ? setStep(1) : onClose())}
            className="mt-5 w-full h-12 rounded-xl bg-gradient-to-l from-brand-600 to-brand-500 text-white text-[13.5px] font-medium"
          >
            {step === 0 ? "ورود به حساب کاربری" : "تایید و ورود"}
          </button>

          {step === 1 && (
            <button
              onClick={() => setStep(0)}
              className="mt-3 w-full text-[12px] text-ink-400 hover:text-white"
            >
              تغییر شماره موبایل
            </button>
          )}

          <p className="mt-5 text-[11px] leading-6 text-ink-500">
            ورود شما به معنای پذیرش <span className="text-brand-400">شرایط پارس کالا</span> و{" "}
            <span className="text-brand-400">قوانین حریم خصوصی</span> است.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [acc, setAcc] = useState<number | null>(null);
  return (
    <aside
      className={`fixed top-0 right-0 z-[100] h-full w-[300px] bg-ink-900 border-r border-ink-800 flex flex-col transition-transform duration-300 lg:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-16 px-4 flex items-center justify-between border-b border-ink-800">
        <SafeImg
          src={LOGO}
          alt="پارس کالا"
          contain
          className="h-9 w-auto"
          wrapClassName="w-9 h-9 rounded-lg"
          fallbackText="PK"
        />
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-ink-800 grid place-items-center">
          <IconClose className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto thin-scroll p-3">
        {megaMenu.map((m, i) => (
          <div key={m.title} className="border-b border-ink-850">
            <button
              onClick={() => setAcc(acc === i ? null : i)}
              className="w-full flex items-center gap-3 py-3.5 px-2 text-[13px] text-ink-100"
            >
              <span className="text-base">{m.icon}</span>
              {m.title}
              <IconChevron
                className={`w-4 h-4 mr-auto text-ink-500 transition-transform ${
                  acc === i ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: acc === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <ul className="pb-3 pr-9 space-y-2.5">
                  {m.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="text-[12.5px] text-ink-400">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        <ul className="mt-4 space-y-1">
          {["فروشگاه", "پرسش و پاسخ", "پیگیری سفارش", "تماس با ما", "وبلاگ"].map((l) => (
            <li key={l}>
              <a href="#" className="block py-2.5 px-2 text-[13px] text-ink-300">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-ink-800">
        <a
          href="tel:09167971886"
          className="flex items-center justify-center gap-2 h-11 rounded-xl bg-ink-850 border border-ink-700 text-[12.5px] text-ink-100"
        >
          <IconPhone className="w-4 h-4" />
          <span className="digits">{toFa("0916-797-1886")}</span>
        </a>
      </div>
    </aside>
  );
}

/* ================================================================== */
export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const items = [
    { t: "تماس با فروشگاه", i: <IconPhone className="w-4 h-4" />, href: "tel:09167971886" },
    { t: "تماس با پشتیبان فروش", i: <IconPhone className="w-4 h-4" />, href: "tel:09167971886" },
    { t: "ارتباط از طریق واتساپ", i: Social.whatsapp("w-4 h-4"), href: "#" },
    { t: "ارتباط از طریق تلگرام", i: Social.telegram("w-4 h-4"), href: "#" },
    { t: "ارتباط از طریق اینستاگرام", i: Social.instagram("w-4 h-4"), href: "#" },
  ];

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 z-[80] flex flex-col items-start gap-3">
      {open && (
        <div className="w-[262px] rounded-2xl border border-ink-700 bg-ink-900/98 backdrop-blur-xl p-4 shadow-2xl animate-fade-up">
          <p className="text-[13px] font-semibold text-white">پاسخگوی شما هستیم</p>
          <p className="text-[11.5px] text-ink-400 mt-1">
            یکی از راه های زیر را برای ارتباط انتخاب کنید
          </p>
          <ul className="mt-3 space-y-1.5">
            {items.map((it) => (
              <li key={it.t}>
                <a
                  href={it.href}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] text-ink-200 hover:bg-ink-800 hover:text-white transition-colors"
                >
                  <span className="text-brand-400">{it.i}</span>
                  {it.t}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="پشتیبانی"
        className="w-14 h-14 rounded-full bg-gradient-to-l from-brand-600 to-brand-500 text-white grid place-items-center shadow-lg animate-pulse-ring"
      >
        {open ? <IconClose className="w-5 h-5" /> : <IconPhone className="w-5 h-5" />}
      </button>
    </div>
  );
}

/* ================================================================== */
export function MobileBottomNav({
  cartCount,
  onOpenCart,
  onOpenMenu,
  onOpenSearch,
  onOpenLogin,
}: {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
}) {
  const items = [
    { t: "خانه", i: <IconHome />, a: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { t: "دسته‌بندی", i: <IconGrid />, a: onOpenMenu },
    { t: "جستجو", i: <IconSearch />, a: onOpenSearch },
    { t: "سبد خرید", i: <IconCart />, a: onOpenCart, badge: cartCount },
    { t: "پروفایل", i: <IconUser />, a: onOpenLogin },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-[85] bg-ink-900/97 backdrop-blur-xl border-t border-ink-800">
      <ul className="grid grid-cols-5">
        {items.map((it) => (
          <li key={it.t}>
            <button
              onClick={it.a}
              className="w-full py-2.5 flex flex-col items-center gap-1 text-ink-300 active:text-brand-400"
            >
              <span className="relative">
                {it.i}
                {!!it.badge && it.badge > 0 && (
                  <span className="absolute -top-1.5 -left-2 min-w-4 h-4 px-1 rounded-full bg-brand-500 text-white text-[9px] grid place-items-center">
                    {toFa(it.badge)}
                  </span>
                )}
              </span>
              <span className="text-[10px]">{it.t}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ================================================================== */
export function Toast({ msg }: { msg: string | null }) {
  return (
    <div
      className={`fixed z-[120] bottom-24 lg:bottom-8 right-1/2 translate-x-1/2 transition-all duration-300 ${
        msg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2.5 rounded-2xl bg-ink-800 border border-ink-600 px-5 h-12 shadow-2xl">
        <span className="w-6 h-6 rounded-full bg-mint-500/20 text-mint-400 grid place-items-center">
          <IconHeart className="w-3.5 h-3.5" filled />
        </span>
        <span className="text-[12.5px] text-ink-100 whitespace-nowrap">{msg}</span>
      </div>
    </div>
  );
}
