"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import type { Brand, ColorOption } from "@/data/types";
import { categories } from "@/data/categories";
import { cn, formatPrice, toPersianDigits } from "@/lib/utils";

export type Facets = {
  sizes: string[];
  colors: ColorOption[];
  brands: Brand[];
  minPrice: number;
  maxPrice: number;
};

import { PRICE_BUCKETS } from "@/data/filters";

export function useFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const toggle = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      const current = next.getAll(key);
      if (current.includes(value)) {
        next.delete(key);
        current.filter((v) => v !== value).forEach((v) => next.append(key, v));
      } else {
        next.append(key, value);
      }
      next.delete("page");
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const set = useCallback(
    (key: string, value?: string) => {
      const next = new URLSearchParams(params.toString());
      if (!value) next.delete(key);
      else next.set(key, value);
      next.delete("page");
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const clearAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return { params, toggle, set, clearAll };
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-[#f0f0f0] py-4 last:border-0">
      <h3 className="mb-3 text-[12.5px] font-bold text-[#202020]">{title}</h3>
      {children}
    </section>
  );
}

export function Filters({ facets, activeCategory }: { facets: Facets; activeCategory?: string }) {
  const { params, toggle, set, clearAll } = useFilterParams();
  const selectedBrands = params.getAll("brand");
  const selectedSizes = params.getAll("size");
  const selectedColors = params.getAll("color");
  const activeBucket = params.get("price");
  const hasFilters = Array.from(params.keys()).some((k) => k !== "sort" && k !== "page");

  return (
    <div className="text-[#202020]">
      <div className="flex items-center justify-between pb-2">
        <span className="text-[13px] font-bold">فیلترها</span>
        {hasFilters ? (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 text-[11.5px] text-[#e53935]"
          >
            <X size={13} /> حذف همه
          </button>
        ) : null}
      </div>

      <Group title="دسته‌بندی">
        <ul className="space-y-1.5">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <a
                href={`/category/${cat.slug}`}
                className={cn(
                  "block rounded-lg px-2 py-1.5 text-[12.5px] transition-colors",
                  activeCategory === cat.slug
                    ? "bg-[#f7f7f7] font-medium text-[#202020]"
                    : "text-[#777] hover:bg-[#fafafa]",
                )}
              >
                {cat.title}
              </a>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="محدوده قیمت">
        <ul className="space-y-2">
          {PRICE_BUCKETS.map((bucket, i) => (
            <li key={bucket.label}>
              <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-[#666]">
                <input
                  type="radio"
                  name="price"
                  checked={activeBucket === String(i)}
                  onChange={() => set("price", activeBucket === String(i) ? undefined : String(i))}
                  className="size-4 accent-[#252525]"
                />
                {bucket.label}
              </label>
            </li>
          ))}
        </ul>
        <p className="num mt-3 text-[11px] text-[#aaa]">
          بازه موجود: {formatPrice(facets.minPrice)} تا {formatPrice(facets.maxPrice)} تومان
        </p>
      </Group>

      {facets.brands.length > 0 ? (
        <Group title="برند">
          <ul className="max-h-[190px] space-y-2 overflow-y-auto pe-1">
            {facets.brands.map((brand) => (
              <li key={brand.slug}>
                <label className="flex cursor-pointer items-center justify-between gap-2 text-[12.5px] text-[#666]">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.slug)}
                      onChange={() => toggle("brand", brand.slug)}
                      className="size-4 accent-[#252525]"
                    />
                    {brand.title}
                  </span>
                  <span className="num text-[10.5px] text-[#bbb]">
                    {toPersianDigits(brand.productCount)}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Group>
      ) : null}

      {facets.sizes.length > 0 ? (
        <Group title="سایز">
          <div className="flex flex-wrap gap-2">
            {facets.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggle("size", size)}
                aria-pressed={selectedSizes.includes(size)}
                className={cn(
                  "num min-w-[46px] rounded-lg border px-2.5 py-1.5 text-[12px] transition-colors",
                  selectedSizes.includes(size)
                    ? "border-[#252525] bg-[#252525] text-white"
                    : "border-[#e8e8e8] text-[#666] hover:border-[#c9c9c9]",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </Group>
      ) : null}

      {facets.colors.length > 0 ? (
        <Group title="رنگ">
          <div className="flex flex-wrap gap-2">
            {facets.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => toggle("color", color.name)}
                aria-pressed={selectedColors.includes(color.name)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] transition-colors",
                  selectedColors.includes(color.name)
                    ? "border-[#252525] text-[#202020]"
                    : "border-[#e8e8e8] text-[#777]",
                )}
              >
                <span
                  className="size-3.5 rounded-full ring-1 ring-[#e0e0e0]"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            ))}
          </div>
        </Group>
      ) : null}

      <Group title="سایر فیلترها">
        <div className="space-y-2.5">
          <label className="flex cursor-pointer items-center justify-between text-[12.5px] text-[#666]">
            فقط کالاهای موجود
            <input
              type="checkbox"
              checked={params.get("available") === "1"}
              onChange={() => set("available", params.get("available") === "1" ? undefined : "1")}
              className="size-4 accent-[#252525]"
            />
          </label>
          <label className="flex cursor-pointer items-center justify-between text-[12.5px] text-[#666]">
            فقط کالاهای تخفیف‌دار
            <input
              type="checkbox"
              checked={params.get("discounted") === "1"}
              onChange={() =>
                set("discounted", params.get("discounted") === "1" ? undefined : "1")
              }
              className="size-4 accent-[#252525]"
            />
          </label>
        </div>
      </Group>
    </div>
  );
}


