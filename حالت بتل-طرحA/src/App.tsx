import { useMemo, useState, useCallback } from "react";
import { TopBar, Header } from "./components/Header";
import { Hero } from "./components/Hero";
import {
  Categories, Amazing, TripleBanners, BestSellers, TopSellers,
  WideBanner, MensSection, BrandStrip, ProductCard, SectionHead,
} from "./components/ProductSections";
import { Newsletter, Footer } from "./components/Footer";
import { CartDrawer, QuickView, LoginModal, Toasts, RecentBuyers, MobileNav, type CartItem } from "./components/Modals";
import { products, faNum, type Product } from "./data";
import { SearchX } from "lucide-react";

export default function App() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([3, 7]);
  const [quick, setQuick] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; msg: string; ok: boolean }[]>([]);

  const toast = useCallback((msg: string, ok = true) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, msg, ok }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  const addToCart = useCallback((p: Product) => {
    setCart((c) => {
      const f = c.find((i) => i.p.id === p.id);
      if (f) return c.map((i) => (i.p.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { p, qty: 1 }];
    });
    toast(`«${p.title.slice(0, 38)}...» به سبد اضافه شد`);
  }, [toast]);

  const changeQty = (id: number, d: number) =>
    setCart((c) => c.map((i) => (i.p.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)).filter((i) => i.qty > 0));

  const toggleWish = (id: number) => {
    setWishlist((w) => {
      const has = w.includes(id);
      toast(has ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد", true);
      return has ? w.filter((x) => x !== id) : [...w, id];
    });
  };

  const onSearch = (q: string) => {
    setSubmitted(q.trim());
    setTimeout(() => document.getElementById("search-result")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const results = useMemo(() => {
    if (!submitted) return [];
    return products.filter((p) => p.title.includes(submitted) || p.brand?.includes(submitted) || p.en?.toLowerCase().includes(submitted.toLowerCase()));
  }, [submitted]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-[#0b0b11] text-zinc-100 pb-[76px] lg:pb-0">
      <TopBar />
      <Header
        cartCount={cartCount}
        wishCount={wishlist.length}
        query={query}
        setQuery={setQuery}
        onCart={() => setCartOpen(true)}
        onLogin={() => setLoginOpen(true)}
        onSearchSubmit={onSearch}
      />

      <main>
        <Hero onShop={() => document.getElementById("amazing")?.scrollIntoView({ behavior: "smooth" })} />

        {/* search result */}
        {submitted && (
          <section id="search-result" className="max-w-[1400px] mx-auto px-4 mt-8 scroll-mt-32">
            <div className="bg-[#14141c] border border-white/[0.07] rounded-3xl p-5 md:p-6">
              <SectionHead title={`نتایج جستجو برای «${submitted}»`} sub={`${faNum(results.length)} کالا یافت شد`} />
              {results.length === 0 ? (
                <div className="py-10 text-center">
                  <SearchX className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                  <p className="font-bold text-[14px]">کالایی یافت نشد!</p>
                  <p className="text-[12.5px] text-zinc-500 mt-1">عبارت دیگری مثل «آیفون» یا «اپل واچ» را امتحان کنید</p>
                  <button onClick={() => { setSubmitted(""); setQuery(""); }} className="mt-4 h-10 px-5 rounded-xl bg-white/[0.07] border border-white/10 text-[13px] font-bold hover:bg-[#ef394e] transition">حذف فیلتر</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    {results.map((p) => (
                      <ProductCard key={p.id} p={p} onAdd={addToCart} onQuick={setQuick} wished={wishlist.includes(p.id)} onWish={toggleWish} />
                    ))}
                  </div>
                  <button onClick={() => { setSubmitted(""); setQuery(""); }} className="mt-4 text-[12.5px] text-zinc-400 hover:text-white">✕ پاک کردن جستجو و بازگشت</button>
                </>
              )}
            </div>
          </section>
        )}

        <TopSellers onQuick={setQuick} />
        <Categories />
        <Amazing onAdd={addToCart} onQuick={setQuick} wishlist={wishlist} onWish={toggleWish} />
        <TripleBanners />
        <BestSellers onAdd={addToCart} onQuick={setQuick} wishlist={wishlist} onWish={toggleWish} />
        <WideBanner />
        <MensSection onAdd={addToCart} onQuick={setQuick} wishlist={wishlist} onWish={toggleWish} />
        <BrandStrip />
        <Newsletter onToast={toast} />
      </main>

      <Footer onTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

      {/* overlays */}
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onRemove={(id) => setCart((c) => c.filter((i) => i.p.id !== id))}
        onCheckout={() => { setCartOpen(false); toast("سفارش شما با موفقیت ثبت شد! کد پیگیری پیامک شد 🎉", true); setCart([]); }}
      />
      <QuickView p={quick} onClose={() => setQuick(null)} onAdd={addToCart} wished={quick ? wishlist.includes(quick.id) : false} onWish={toggleWish} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onToast={toast} />
      <Toasts list={toasts} />
      <RecentBuyers />
      <MobileNav cart={cartCount} onCart={() => setCartOpen(true)} onLogin={() => setLoginOpen(true)} />
    </div>
  );
}
