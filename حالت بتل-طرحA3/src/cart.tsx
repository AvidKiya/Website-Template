import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./data/store";

export type CartItem = { product: Product; qty: number };
export type Toast = { id: number; msg: string; kind: "success" | "error" | "info" };

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (p: Product, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;

  wishlist: number[];
  toggleWish: (p: Product) => void;

  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;

  quick: Product | null;
  setQuick: (p: Product | null) => void;

  toasts: Toast[];
  push: (msg: string, kind?: Toast["kind"]) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function useCart(): CartCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}

const STORAGE_KEY = "shabbazaar-cart-v1";
const WISH_KEY = "shabbazaar-wish-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist]);

  const push = useCallback((msg: string, kind: Toast["kind"] = "success") => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, msg, kind }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3000);
  }, []);

  const add = useCallback(
    (p: Product, qty = 1) => {
      setItems((prev) => {
        const found = prev.find((i) => i.product.id === p.id);
        if (found) {
          return prev.map((i) =>
            i.product.id === p.id ? { ...i, qty: Math.min(9, i.qty + qty) } : i
          );
        }
        return [...prev, { product: p, qty: Math.min(9, qty) }];
      });
      push("به سبد خرید اضافه شد");
    },
    [push]
  );

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty: Math.min(9, qty) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const toggleWish = useCallback(
    (p: Product) => {
      setWishlist((prev) => {
        const has = prev.includes(p.id);
        push(has ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد", has ? "info" : "success");
        return has ? prev.filter((x) => x !== p.id) : [...prev, p.id];
      });
    },
    [push]
  );

  const { count, total } = useMemo(() => {
    return {
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.product.price, 0),
    };
  }, [items]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count,
      total,
      add,
      remove,
      setQty,
      clear,
      wishlist,
      toggleWish,
      drawerOpen,
      setDrawerOpen,
      quick,
      setQuick,
      toasts,
      push,
    }),
    [items, count, total, add, remove, setQty, clear, wishlist, toggleWish, drawerOpen, quick, toasts, push]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
