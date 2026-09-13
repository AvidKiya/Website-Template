import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryCircles from "./components/CategoryCircles";
import AmazingOffers from "./components/AmazingOffers";
import ProductTabs from "./components/ProductTabs";
import { BlogSection, BrandStrip, DoubleBanner, FaqSection } from "./components/Sections";
import Footer from "./components/Footer";
import {
  Backdrop,
  CartDrawer,
  LoginModal,
  MobileBottomNav,
  MobileMenu,
  SearchModal,
  SupportWidget,
  Toast,
  type CartLine,
} from "./components/Overlays";
import type { Product } from "./data/site";

export default function App() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const anyOpen = cartOpen || searchOpen || loginOpen || menuOpen;

  useEffect(() => {
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOpen]);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback(
    (p: Product) => {
      setLines((prev) => {
        const found = prev.find((l) => l.p.id === p.id);
        if (found) return prev.map((l) => (l.p.id === p.id ? { ...l, qty: l.qty + 1 } : l));
        return [...prev, { p, qty: 1 }];
      });
      flash(`«${p.title.slice(0, 34)}» به سبد خرید اضافه شد`);
    },
    [flash]
  );

  const toggleWish = useCallback(
    (id: number) => {
      setWishlist((prev) => {
        const has = prev.includes(id);
        flash(has ? "از لیست علاقه‌مندی‌ها حذف شد" : "به لیست علاقه‌مندی‌ها اضافه شد");
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [flash]
  );

  const setQty = (id: number, q: number) =>
    setLines((prev) => prev.map((l) => (l.p.id === id ? { ...l, qty: q } : l)));
  const remove = (id: number) => setLines((prev) => prev.filter((l) => l.p.id !== id));

  const cartCount = lines.reduce((s, l) => s + l.qty, 0);

  const closeAll = () => {
    setCartOpen(false);
    setSearchOpen(false);
    setLoginOpen(false);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-ink-950 pb-16 lg:pb-0">
      <Header
        cartCount={cartCount}
        wishCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <main>
        <Hero />
        <CategoryCircles />
        <AmazingOffers onAdd={addToCart} />
        <ProductTabs onAdd={addToCart} onWish={toggleWish} wishlist={wishlist} />
        <DoubleBanner />
        <BrandStrip />
        <BlogSection />
        <FaqSection />
      </main>

      <Footer />

      {/* overlays */}
      <Backdrop show={anyOpen} onClose={closeAll} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={lines}
        setQty={setQty}
        remove={remove}
      />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <SupportWidget />
      <MobileBottomNav
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />
      <Toast msg={toast} />
    </div>
  );
}
