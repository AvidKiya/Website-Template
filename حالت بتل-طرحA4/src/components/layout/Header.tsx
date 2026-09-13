"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Heart,
  Headphones,
  Menu,
  Search,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import { categories } from "@/data/categories";
import { BRAND, mainNav, utilityNav } from "@/data/navigation";
import { toPersianDigits } from "@/lib/utils";
import { useStore } from "@/store/store-provider";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Header() {
  const { setSearchOpen, setCartOpen, cartCount, hydrated, wishlist } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <>
      <header className="dark-scope sticky top-0 z-50 bg-[#252525] text-white">
        {/* ---------- desktop ---------- */}
        <div className="hidden lg:block">
          <div className="container-x flex h-[68px] items-center gap-6">
            <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={BRAND.name}>
              <span className="grid size-9 place-items-center rounded-lg bg-white text-[15px] font-black text-[#252525]">
                Y
              </span>
              <span className="leading-4">
                <span className="block text-[14px] font-bold tracking-tight">{BRAND.latin}</span>
                <span className="block text-[10.5px] text-white/55">{BRAND.name}</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-11 flex-1 items-center gap-2.5 rounded-xl bg-white/10 px-4 text-start text-white/60 transition-colors duration-200 hover:bg-white/15"
              aria-label="جستجو در فروشگاه"
            >
              <Search size={18} className="shrink-0" />
              <span className="text-[13px]">جستجوی محصول، برند یا دسته‌بندی...</span>
            </button>

            <div className="flex shrink-0 items-center gap-1.5">
              <Link
                href="/login"
                className="flex h-11 items-center gap-2 rounded-xl border border-white/15 px-3.5 text-[12.5px] text-white/90 transition-colors hover:border-white/35"
              >
                <User size={17} />
                ورود | ثبت‌نام
              </Link>

              <span className="mx-1 block h-6 w-px bg-white/12" aria-hidden />

              <Link
                href="/wishlist"
                aria-label="علاقه‌مندی‌ها"
                className="relative grid size-11 place-items-center rounded-xl text-white/85 transition-colors hover:bg-white/10"
              >
                <Heart size={19} />
                {hydrated && wishlist.length > 0 ? (
                  <span className="num absolute end-1.5 top-1.5 grid min-w-4 place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-[#252525]">
                    {toPersianDigits(wishlist.length)}
                  </span>
                ) : null}
              </Link>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label="سبد خرید"
                className="relative grid size-11 place-items-center rounded-xl text-white/85 transition-colors hover:bg-white/10"
              >
                <ShoppingCart size={19} />
                {hydrated && cartCount > 0 ? (
                  <span className="num absolute end-1 top-1.5 grid min-w-4 place-items-center rounded-full bg-[#e53935] px-1 text-[10px] font-bold text-white">
                    {toPersianDigits(cartCount)}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          <div className="border-t border-white/8">
            <div className="container-x flex h-11 items-center justify-between">
              <nav aria-label="ناوبری اصلی" className="flex items-center gap-1">
                <div
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((v) => !v)}
                    className="flex h-11 items-center gap-1.5 px-3 text-[12.5px] text-white/85 transition-colors hover:text-white"
                  >
                    <Menu size={16} />
                    دسته‌بندی کالاها
                    <ChevronDown size={14} className="text-white/50" />
                  </button>

                  {megaOpen ? (
                    <div className="absolute start-0 top-full z-50 w-[760px] rounded-b-2xl border border-[#eee] bg-white p-5 text-[#202020] shadow-[0_24px_50px_rgba(0,0,0,0.14)]">
                      <div className="grid grid-cols-4 gap-x-6 gap-y-5">
                        {categories.map((cat) => (
                          <div key={cat.slug}>
                            <Link
                              href={`/category/${cat.slug}`}
                              className="mb-1.5 block text-[12.5px] font-bold text-[#202020] hover:text-black"
                            >
                              {cat.title}
                            </Link>
                            <ul className="space-y-1">
                              {cat.children.map((child) => (
                                <li key={child.slug}>
                                  <Link
                                    href={`/category/${cat.slug}?sub=${child.slug}`}
                                    className="block text-[12px] text-[#777] transition-colors hover:text-[#202020]"
                                  >
                                    {child.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {mainNav.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex h-11 items-center px-3 text-[12.5px] text-white/75 transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4 text-[11.5px] text-white/55">
                <span className="flex items-center gap-1.5">
                  <Truck size={15} /> ارسال رایگان بالای ۲ میلیون تومان
                </span>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="num flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Headphones size={15} /> {BRAND.phone}
                </a>
                {utilityNav.slice(0, 1).map((item) => (
                  <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- mobile ---------- */}
        <div className="lg:hidden">
          <div className="flex h-14 items-center gap-1 px-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="منو"
              className="grid size-11 place-items-center rounded-lg text-white/90"
            >
              <Menu size={22} />
            </button>

            <Link href="/" className="flex items-center gap-1.5" aria-label={BRAND.name}>
              <span className="grid size-8 place-items-center rounded-lg bg-white text-[13px] font-black text-[#252525]">
                Y
              </span>
              <span className="text-[13px] font-bold tracking-tight">{BRAND.latin}</span>
            </Link>

            <div className="flex-1" />

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="جستجو"
              className="grid size-11 place-items-center rounded-lg text-white/90"
            >
              <Search size={20} />
            </button>
            <Link
              href="/login"
              aria-label="حساب کاربری"
              className="grid size-11 place-items-center rounded-lg text-white/90"
            >
              <User size={20} />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="سبد خرید"
              className="relative grid size-11 place-items-center rounded-lg text-white/90"
            >
              <ShoppingCart size={20} />
              {hydrated && cartCount > 0 ? (
                <span className="num absolute end-1 top-1.5 grid min-w-4 place-items-center rounded-full bg-[#e53935] px-1 text-[10px] font-bold text-white">
                  {toPersianDigits(cartCount)}
                </span>
              ) : null}
            </button>
          </div>

          <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto border-t border-white/8 px-3 py-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="shrink-0 rounded-lg bg-white/8 px-3 py-1.5 text-[11.5px] text-white/80"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay />
      <CartDrawer />
    </>
  );
}
