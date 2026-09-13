"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/types";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export function TrendingTabs({
  products,
  filters,
}: {
  products: Product[];
  filters: { slug: string; title: string }[];
}) {
  const [active, setActive] = useState("all");

  const visible = useMemo(() => {
    const list =
      active === "all" ? products : products.filter((p) => p.categorySlug === active);
    return list.slice(0, 10);
  }, [active, products]);

  return (
    <section className="container-x section-gap" aria-label="جدیدترین محصولات">
      <SectionHeader
        title="جدیدترین محصولات"
        subtitle="تازه‌ترین کالاهای اضافه‌شده به فروشگاه"
        href="/category/all?sort=newest"
      >
        <div className="hide-scrollbar hidden max-w-[420px] items-center gap-1 overflow-x-auto md:flex">
          {[{ slug: "all", title: "همه" }, ...filters].map((f) => (
            <button
              key={f.slug}
              type="button"
              onClick={() => setActive(f.slug)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-[12px] transition-colors duration-200",
                active === f.slug
                  ? "bg-[#252525] text-white"
                  : "bg-[#f7f7f7] text-[#666] hover:bg-[#eee]",
              )}
            >
              {f.title}
            </button>
          ))}
        </div>
      </SectionHeader>

      <div className="hide-scrollbar mb-3 flex items-center gap-1 overflow-x-auto md:hidden">
        {[{ slug: "all", title: "همه" }, ...filters].map((f) => (
          <button
            key={f.slug}
            type="button"
            onClick={() => setActive(f.slug)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-[12px] transition-colors",
              active === f.slug ? "bg-[#252525] text-white" : "bg-[#f7f7f7] text-[#666]",
            )}
          >
            {f.title}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <p className="rounded-[14px] border border-[#e8e8e8] p-8 text-center text-[13px] text-[#888]">
          کالایی در این دسته یافت نشد.
        </p>
      )}
    </section>
  );
}
