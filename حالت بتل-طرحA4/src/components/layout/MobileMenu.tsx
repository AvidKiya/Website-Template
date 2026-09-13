"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Headphones, LogIn, Percent, Sparkles } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { categories } from "@/data/categories";
import { BRAND, utilityNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Drawer open={open} onClose={onClose} title={BRAND.name} side="start">
      <nav className="pb-8" aria-label="منوی موبایل">
        <div className="grid grid-cols-2 gap-2 p-4">
          <Link
            href="/category/all?tag=amazing"
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl bg-[#252525] px-3 py-3 text-[12.5px] text-white"
          >
            <Percent size={16} /> شگفت‌انگیز
          </Link>
          <Link
            href="/category/all?sort=newest"
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl bg-[#f7f7f7] px-3 py-3 text-[12.5px] text-[#202020]"
          >
            <Sparkles size={16} /> جدیدترین‌ها
          </Link>
        </div>

        <ul className="border-t border-[#f0f0f0]">
          {categories.map((cat) => {
            const isOpen = expanded === cat.slug;
            return (
              <li key={cat.slug} className="border-b border-[#f5f5f5]">
                <div className="flex items-center">
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="flex-1 px-4 py-3.5 text-[13px] text-[#202020]"
                  >
                    {cat.title}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={`زیرشاخه‌های ${cat.title}`}
                    onClick={() => setExpanded(isOpen ? null : cat.slug)}
                    className="grid size-11 place-items-center text-[#999]"
                  >
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </button>
                </div>
                {isOpen ? (
                  <ul className="bg-[#fafafa] px-4 py-1">
                    {cat.children.map((child) => (
                      <li key={child.slug}>
                        <Link
                          href={`/category/${cat.slug}?sub=${child.slug}`}
                          onClick={onClose}
                          className="block py-2.5 text-[12.5px] text-[#666]"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        <ul className="mt-2 px-4 py-2">
          {utilityNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-2.5 text-[12.5px] text-[#666]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-4 mt-2 space-y-2 rounded-xl bg-[#f7f7f7] p-4">
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-2 text-[12.5px] text-[#202020]"
          >
            <LogIn size={16} /> ورود یا ثبت‌نام
          </Link>
          <p className="num flex items-center gap-2 text-[12.5px] text-[#666]">
            <Headphones size={16} /> پشتیبانی {BRAND.phone}
          </p>
        </div>
      </nav>
    </Drawer>
  );
}
