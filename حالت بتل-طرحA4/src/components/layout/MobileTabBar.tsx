"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutGrid, Search, ShoppingCart } from "lucide-react";
import { cn, toPersianDigits } from "@/lib/utils";
import { useStore } from "@/store/store-provider";

export function MobileTabBar() {
  const pathname = usePathname();
  const { setSearchOpen, setCartOpen, cartCount, hydrated } = useStore();

  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10.5px]";

  return (
    <nav
      aria-label="ناوبری پایین"
      className="fixed start-0 end-0 bottom-0 z-40 flex h-[58px] items-stretch border-t border-[#eee] bg-white/95 backdrop-blur lg:hidden"
    >
      <Link href="/" className={cn(item, pathname === "/" ? "text-[#202020]" : "text-[#8a8a8a]")}>
        <Home size={19} />
        خانه
      </Link>
      <Link
        href="/category/all"
        className={cn(item, pathname.startsWith("/category") ? "text-[#202020]" : "text-[#8a8a8a]")}
      >
        <LayoutGrid size={19} />
        دسته‌بندی
      </Link>
      <button type="button" onClick={() => setSearchOpen(true)} className={cn(item, "text-[#8a8a8a]")}>
        <Search size={19} />
        جستجو
      </button>
      <button type="button" onClick={() => setCartOpen(true)} className={cn(item, "relative text-[#8a8a8a]")}>
        <ShoppingCart size={19} />
        سبد خرید
        {hydrated && cartCount > 0 ? (
          <span className="num absolute end-5 top-1 grid min-w-4 place-items-center rounded-full bg-[#e53935] px-1 text-[9.5px] font-bold text-white">
            {toPersianDigits(cartCount)}
          </span>
        ) : null}
      </button>
      <Link
        href="/wishlist"
        className={cn(item, pathname === "/wishlist" ? "text-[#202020]" : "text-[#8a8a8a]")}
      >
        <Heart size={19} />
        علاقه‌مندی
      </Link>
    </nav>
  );
}
