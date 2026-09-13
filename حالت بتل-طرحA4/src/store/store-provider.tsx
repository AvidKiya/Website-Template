"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";

export type CartLine = {
  slug: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  qty: number;
  size?: string;
  color?: string;
  seller?: string;
  stock: number;
};

type ToastItem = { id: number; message: string; tone: "success" | "info" };

type StoreState = {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  searchHistory: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  hydrated: boolean;
};

type StoreApi = StoreState & {
  addToCart: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  removeFromCart: (slug: string, size?: string, color?: string) => void;
  updateQty: (slug: string, qty: number, size?: string, color?: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWished: (slug: string) => boolean;
  pushRecentlyViewed: (slug: string) => void;
  pushSearch: (term: string) => void;
  clearSearchHistory: () => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  toast: (message: string, tone?: "success" | "info") => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
};

const StoreContext = createContext<StoreApi | null>(null);

const KEYS = {
  cart: "yb.cart.v1",
  wishlist: "yb.wishlist.v1",
  recent: "yb.recent.v1",
  search: "yb.search.v1",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

const sameLine = (a: CartLine, slug: string, size?: string, color?: string) =>
  a.slug === slug && (a.size ?? "") === (size ?? "") && (a.color ?? "") === (color ?? "");

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    setCart(read<CartLine[]>(KEYS.cart, []));
    setWishlist(read<string[]>(KEYS.wishlist, []));
    setRecentlyViewed(read<string[]>(KEYS.recent, []));
    setSearchHistory(read<string[]>(KEYS.search, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) write(KEYS.cart, cart);
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.wishlist, wishlist);
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.recent, recentlyViewed);
  }, [recentlyViewed, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.search, searchHistory);
  }, [searchHistory, hydrated]);

  const toast = useCallback((message: string, tone: "success" | "info" = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const addToCart: StoreApi["addToCart"] = useCallback(
    (line) => {
      const qty = line.qty ?? 1;
      setCart((prev) => {
        const idx = prev.findIndex((l) => sameLine(l, line.slug, line.size, line.color));
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            qty: Math.min(next[idx].stock || 99, next[idx].qty + qty),
          };
          return next;
        }
        return [...prev, { ...line, qty }];
      });
      toast("کالا به سبد خرید اضافه شد");
    },
    [toast],
  );

  const removeFromCart: StoreApi["removeFromCart"] = useCallback((slug, size, color) => {
    setCart((prev) => prev.filter((l) => !sameLine(l, slug, size, color)));
  }, []);

  const updateQty: StoreApi["updateQty"] = useCallback((slug, qty, size, color) => {
    setCart((prev) =>
      prev
        .map((l) =>
          sameLine(l, slug, size, color)
            ? { ...l, qty: Math.max(1, Math.min(l.stock || 99, qty)) }
            : l,
        )
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (slug: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(slug);
        toast(exists ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد", "info");
        return exists ? prev.filter((s) => s !== slug) : [...prev, slug];
      });
    },
    [toast],
  );

  const pushRecentlyViewed = useCallback((slug: string) => {
    setRecentlyViewed((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 12));
  }, []);

  const pushSearch = useCallback((term: string) => {
    const value = term.trim();
    if (!value) return;
    setSearchHistory((prev) => [value, ...prev.filter((s) => s !== value)].slice(0, 8));
  }, []);

  const value = useMemo<StoreApi>(() => {
    const cartSubtotal = cart.reduce((sum, l) => sum + l.price * l.qty, 0);
    const cartDiscount = cart.reduce(
      (sum, l) => sum + ((l.oldPrice ?? l.price) - l.price) * l.qty,
      0,
    );
    return {
      cart,
      wishlist,
      recentlyViewed,
      searchHistory,
      cartOpen,
      searchOpen,
      hydrated,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWished: (slug: string) => wishlist.includes(slug),
      pushRecentlyViewed,
      pushSearch,
      clearSearchHistory: () => setSearchHistory([]),
      setCartOpen,
      setSearchOpen,
      toast,
      cartCount: cart.reduce((sum, l) => sum + l.qty, 0),
      cartSubtotal,
      cartDiscount,
    };
  }, [
    cart,
    wishlist,
    recentlyViewed,
    searchHistory,
    cartOpen,
    searchOpen,
    hydrated,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    pushRecentlyViewed,
    pushSearch,
    toast,
  ]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed start-0 end-0 bottom-4 z-[120] flex flex-col items-center gap-2 px-4"
        role="status"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto flex items-center gap-2 rounded-xl bg-[#252525] px-4 py-2.5 text-[13px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
            >
              {t.tone === "success" ? (
                <CheckCircle2 size={16} className="text-[#4ade80]" />
              ) : (
                <Info size={16} className="text-white/70" />
              )}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </StoreContext.Provider>
  );
}

export function useStore(): StoreApi {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
