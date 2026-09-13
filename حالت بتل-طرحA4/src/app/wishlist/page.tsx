"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/data/types";
import { useStore } from "@/store/store-provider";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (wishlist.length === 0) {
      setItems([]);
      return;
    }
    fetch(`/api/products?perPage=100`)
      .then((r) => r.json())
      .then((d) => setItems((d.items ?? []).filter((p: Product) => wishlist.includes(p.slug))))
      .catch(() => setItems([]));
  }, [hydrated, wishlist]);

  return (
    <div className="container-x pb-10">
      <Breadcrumb items={[{ title: "علاقه‌مندی‌ها" }]} />
      <h1 className="mb-4 text-[18px] font-bold text-[#202020]">لیست علاقه‌مندی‌ها</h1>

      {items === null ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[16px] border border-dashed border-[#e0e0e0] px-6 py-20 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-[#f7f7f7] text-[#bbb]">
            <Heart size={26} />
          </span>
          <p className="text-[14px] font-medium text-[#202020]">هنوز کالایی ذخیره نکرده‌اید</p>
          <p className="max-w-sm text-[12.5px] leading-7 text-[#888]">
            با زدن آیکون قلب روی هر کالا، آن را برای مرور بعدی ذخیره کنید.
          </p>
          <ButtonLink href="/category/all" className="mt-2">
            مشاهده محصولات
          </ButtonLink>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
