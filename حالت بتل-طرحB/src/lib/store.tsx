import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { products, type Product } from "../data/shop";

type CartLine = { id: string; qty: number; color?: string };
type Toast = { id: number; text: string; kind?: "ok" | "info" };

type Ctx = {
  cart: CartLine[];
  lines: (CartLine & { product: Product })[];
  count: number;
  total: number;
  saved: number;
  add: (id: string, color?: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  wish: string[];
  toggleWish: (id: string) => void;
  compare: string[];
  toggleCompare: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  authOpen: boolean;
  setAuthOpen: (v: boolean) => void;
  toasts: Toast[];
  toast: (text: string, kind?: "ok" | "info") => void;
};

const ShopCtx = createContext<Ctx | null>(null);

const load = <T,>(k: string, f: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : f;
  } catch {
    return f;
  }
};

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => load("pk_cart", []));
  const [wish, setWish] = useState<string[]>(() => load("pk_wish", []));
  const [compare, setCompare] = useState<string[]>(() => load("pk_cmp", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem("pk_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("pk_wish", JSON.stringify(wish));
  }, [wish]);
  useEffect(() => {
    localStorage.setItem("pk_cmp", JSON.stringify(compare));
  }, [compare]);

  const toast = useCallback((text: string, kind: "ok" | "info" = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const add = useCallback(
    (id: string, color?: string) => {
      setCart((c) => {
        const ex = c.find((l) => l.id === id);
        if (ex)
          return c.map((l) =>
            l.id === id ? { ...l, qty: Math.min(l.qty + 1, 10) } : l
          );
        return [...c, { id, qty: 1, color }];
      });
      const p = products.find((x) => x.id === id);
      toast(`«${p?.title.slice(0, 26)}…» به سبد خرید اضافه شد`);
      setCartOpen(true);
    },
    [toast]
  );

  const remove = useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.id !== id)
        : c.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 10) } : l))
    );
  }, []);

  const toggleWish = useCallback(
    (id: string) => {
      setWish((w) => {
        const has = w.includes(id);
        toast(has ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد", "info");
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [toast]
  );

  const toggleCompare = useCallback(
    (id: string) => {
      setCompare((w) => {
        const has = w.includes(id);
        toast(has ? "از مقایسه حذف شد" : "به لیست مقایسه اضافه شد", "info");
        return has ? w.filter((x) => x !== id) : [...w, id].slice(-4);
      });
    },
    [toast]
  );

  const lines = useMemo(
    () =>
      cart
        .map((l) => {
          const product = products.find((p) => p.id === l.id);
          return product ? { ...l, product } : null;
        })
        .filter(Boolean) as (CartLine & { product: Product })[],
    [cart]
  );

  const count = cart.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const saved = lines.reduce(
    (s, l) => s + ((l.product.old || l.product.price) - l.product.price) * l.qty,
    0
  );

  const value: Ctx = {
    cart,
    lines,
    count,
    total,
    saved,
    add,
    remove,
    setQty,
    clear: () => setCart([]),
    wish,
    toggleWish,
    compare,
    toggleCompare,
    cartOpen,
    setCartOpen,
    authOpen,
    setAuthOpen,
    toasts,
    toast,
  };

  return <ShopCtx.Provider value={value}>{children}</ShopCtx.Provider>;
}

export function useShop() {
  const c = useContext(ShopCtx);
  if (!c) throw new Error("useShop outside provider");
  return c;
}

export function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  return {
    h: Math.floor(s / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: diff === 0,
  };
}
