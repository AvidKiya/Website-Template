import { useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CartDrawer, { type CartLine } from "./components/CartDrawer";
import { BackToTop, Footer, MobileBar } from "./components/Footer";
import {
  AmazingOffers,
  BannerRow,
  Brands,
  Blog,
  CategoryStrip,
  Features,
  ProductTabs,
  SplitShowcase,
  Ticker,
} from "./components/Sections";
import { faIn, type Product } from "./data";
import { Close, User } from "./components/Icons";

export default function App() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [liked, setLiked] = useState<number[]>([3, 11]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const count = useMemo(() => lines.reduce((s, l) => s + l.q, 0), [lines]);

  const addToCart = (p: Product) => {
    setLines((old) => {
      const found = old.find((l) => l.p.id === p.id);
      if (found) return old.map((l) => (l.p.id === p.id ? { ...l, q: l.q + 1 } : l));
      return [...old, { p, q: 1 }];
    });
    setToast(`«${p.title}» به سبد خرید اضافه شد`);
    window.setTimeout(() => setToast(null), 2200);
  };

  const setQty = (id: number, d: number) =>
    setLines((old) =>
      old
        .map((l) => (l.p.id === id ? { ...l, q: l.q + d } : l))
        .filter((l) => l.q > 0)
    );

  const remove = (id: number) => setLines((old) => old.filter((l) => l.p.id !== id));

  const toggleLike = (id: number) =>
    setLiked((old) => (old.includes(id) ? old.filter((x) => x !== id) : [...old, id]));

  const shop = { onAdd: addToCart, liked, onLike: toggleLike };

  return (
    <div className="min-h-screen bg-ink-950 text-slate-200">
      <Header
        cartCount={count}
        wishCount={liked.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />

      <main>
        <Hero />
        <CategoryStrip />
        <AmazingOffers {...shop} />
        <BannerRow />
        <ProductTabs {...shop} />
        <Ticker />
        <SplitShowcase {...shop} />
        <Brands />
        <Blog />
        <Features />
      </main>

      <Footer />
      <MobileBar cartCount={count} onOpenCart={() => setCartOpen(true)} />
      <BackToTop />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={lines}
        setQty={setQty}
        remove={remove}
      />

      {/* login modal */}
      {loginOpen && (
        <div className="fixed inset-0 z-[70] grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/75" onClick={() => setLoginOpen(false)} />
          <div className="animate-pop relative w-full max-w-sm rounded-3xl border border-ink-700 bg-ink-900 p-6">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute left-4 top-4 text-mute transition hover:text-white"
            >
              <Close />
            </button>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600/15 text-brand-400">
              <User className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-white">ورود | ثبت نام</h3>
            <p className="mt-2 text-[12.5px] text-mute">
              شماره موبایل خود را وارد نمایید تا کد تأیید ارسال شود.
            </p>
            <input
              dir="ltr"
              placeholder="09xxxxxxxxx"
              className="mt-5 h-12 w-full rounded-2xl border border-ink-700 bg-ink-850 px-4 text-[13px] outline-none placeholder:text-mute focus:border-brand-500"
            />
            <button
              onClick={() => setLoginOpen(false)}
              className="mt-4 w-full rounded-2xl bg-brand-600 py-3.5 text-sm font-bold text-white transition hover:bg-brand-500 glow-brand"
            >
              ادامه
            </button>
            <p className="mt-4 text-center text-[11px] leading-6 text-mute">
              ورود شما به معنای پذیرش <span className="text-brand-400">شرایط و قوانین</span> پارس کالا است.
            </p>
          </div>
        </div>
      )}

      {/* toast */}
      <div
        className={`fixed bottom-24 right-4 z-[80] rounded-2xl border border-teal-400/40 bg-ink-900/95 px-4 py-3 text-[12.5px] text-slate-100 shadow-2xl backdrop-blur transition-all lg:bottom-6 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        ✅ {toast ?? ""} <span className="text-mute">({faIn(count)} کالا)</span>
      </div>
    </div>
  );
}
