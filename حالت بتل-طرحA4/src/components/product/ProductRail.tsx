"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

export function ProductRail({
  products,
  className,
  dark,
}: {
  products: Product[];
  className?: string;
  dark?: boolean;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div ref={railRef} className="rail hide-scrollbar -mx-1 px-1 pb-1">
        {products.map((product) => (
          <div
            key={product.slug}
            className="w-[46vw] max-w-[220px] min-w-[150px] sm:w-[31vw] md:w-[23vw] lg:w-[19%] xl:w-[15.6%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 -inset-x-2 hidden items-center justify-between lg:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="بعدی"
          className={cn(
            "pointer-events-auto grid size-9 translate-x-1 place-items-center rounded-full border border-[#e8e8e8] bg-white text-[#555] shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-colors hover:text-[#111]",
            dark && "border-white/15 bg-[#2f2f2f] text-white/80 hover:text-white",
          )}
        >
          <ChevronRight size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="قبلی"
          className={cn(
            "pointer-events-auto grid size-9 -translate-x-1 place-items-center rounded-full border border-[#e8e8e8] bg-white text-[#555] shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-colors hover:text-[#111]",
            dark && "border-white/15 bg-[#2f2f2f] text-white/80 hover:text-white",
          )}
        >
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
}
