"use client";

import { useState } from "react";
import { ArrowDownWideNarrow, SlidersHorizontal } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Filters, useFilterParams, type Facets } from "./Filters";
import { cn, toPersianDigits } from "@/lib/utils";

const SORTS = [
  { id: "newest", title: "جدیدترین" },
  { id: "popular", title: "پربازدیدترین" },
  { id: "cheap", title: "ارزان‌ترین" },
  { id: "expensive", title: "گران‌ترین" },
  { id: "discount", title: "بیشترین تخفیف" },
];

export function ShopToolbar({
  total,
  facets,
  activeCategory,
}: {
  total: number;
  facets: Facets;
  activeCategory?: string;
}) {
  const { params, set } = useFilterParams();
  const [open, setOpen] = useState(false);
  const activeSort = params.get("sort") ?? "newest";

  return (
    <>
      <div className="mb-4 flex items-center gap-2 rounded-[14px] border border-[#e8e8e8] bg-white px-3 py-2.5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-[#f7f7f7] px-3 text-[12.5px] text-[#444] lg:hidden"
        >
          <SlidersHorizontal size={15} /> فیلترها
        </button>

        <span className="hidden items-center gap-1.5 text-[12.5px] text-[#888] lg:flex">
          <ArrowDownWideNarrow size={15} /> مرتب‌سازی:
        </span>

        <div className="hide-scrollbar flex flex-1 items-center gap-1 overflow-x-auto">
          {SORTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => set("sort", s.id)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-[12px] transition-colors duration-200",
                activeSort === s.id
                  ? "bg-[#252525] text-white"
                  : "text-[#666] hover:bg-[#f7f7f7]",
              )}
            >
              {s.title}
            </button>
          ))}
        </div>

        <span className="num hidden shrink-0 text-[12px] text-[#999] md:block">
          {toPersianDigits(total)} کالا
        </span>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="فیلتر محصولات"
        side="bottom"
        footer={
          <Button fullWidth size="lg" onClick={() => setOpen(false)}>
            نمایش {toPersianDigits(total)} کالا
          </Button>
        }
      >
        <div className="px-4 pb-4">
          <Filters facets={facets} activeCategory={activeCategory} />
        </div>
      </Drawer>
    </>
  );
}
