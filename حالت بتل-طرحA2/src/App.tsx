import { useCallback, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductRow from "./components/ProductRow";
import {
  AboutBox,
  Band,
  Brands,
  DealsSection,
  Features,
  PromoCards,
  SmsCta,
  TabsSection,
  TripleBanners,
  WideBanner,
} from "./components/Sections";
import Footer from "./components/Footer";
import { CartDrawer, Toast, type CartItem } from "./components/Cart";
import { bestSellers, womenLatest, type Product } from "./data";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wished, setWished] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = useCallback((text: string) => {
    setToast({ id: Date.now(), text });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const addToCart = useCallback(
    (p: Product) => {
      setCart((c) => {
        const ex = c.find((it) => it.p.id === p.id);
        return ex ? c.map((it) => (it.p.id === p.id ? { ...it, qty: it.qty + 1 } : it)) : [...c, { p, qty: 1 }];
      });
      showToast("به سبد خرید اضافه شد");
    },
    [showToast]
  );

  const toggleWish = useCallback(
    (id: number) => {
      const has = wished.has(id);
      setWished((w) => {
        const n = new Set(w);
        if (has) n.delete(id);
        else n.add(id);
        return n;
      });
      showToast(has ? "از لیست علاقه‌مندی‌ها حذف شد" : "به لیست علاقه‌مندی‌ها اضافه شد");
    },
    [wished, showToast]
  );

  const inc = (id: number) => setCart((c) => c.map((it) => (it.p.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const dec = (id: number) =>
    setCart((c) => c.map((it) => (it.p.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)));
  const remove = (id: number) => setCart((c) => c.filter((it) => it.p.id !== id));

  const cardProps = { wished, onWish: toggleWish, onAdd: addToCart };
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <div className="min-h-screen">
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main className="mx-auto max-w-[1320px] px-4">
        <Hero />

        <section className="mt-9">
          <Band>تخفیف‌های باورنکردنی پارس کالا</Band>
          <PromoCards />
        </section>

        <div className="mt-10">
          <ProductRow id="best" title="پرفروش‌ترین محصولات" products={bestSellers} {...cardProps} />
        </div>

        <div className="mt-10">
          <WideBanner />
        </div>

        <div className="mt-10">
          <TripleBanners />
        </div>

        <div className="mt-10">
          <DealsSection {...cardProps} />
        </div>

        <div className="mt-10">
          <ProductRow
            id="women"
            title={
              <>
                جدیدترین‌های <span className="text-accent">زنانه</span>
              </>
            }
            products={womenLatest}
            {...cardProps}
          />
        </div>

        <div className="mt-10">
          <TabsSection {...cardProps} />
        </div>

        <div className="mt-12">
          <Brands />
        </div>

        <div className="mt-10">
          <AboutBox />
        </div>

        <div className="mt-10">
          <Features />
        </div>

        <div className="mt-10">
          <SmsCta />
        </div>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
      />
      <Toast toast={toast} />
    </div>
  );
}
