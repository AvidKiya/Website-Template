import type { Metadata } from "next";
import { ProductService } from "@/services/catalog-service";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { toPersianDigits } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "جستجو",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const result = await ProductService.list({ q, perPage: 30, sort: "popular" });

  return (
    <div className="container-x pb-10">
      <Breadcrumb items={[{ title: "نتایج جستجو" }]} />
      <h1 className="text-[17px] font-bold text-[#202020] md:text-[20px]">
        نتایج جستجو برای «{q}»
      </h1>
      <p className="num mb-5 mt-1 text-[12px] text-[#999]">
        {toPersianDigits(result.total)} کالا پیدا شد
      </p>

      {result.items.length > 0 ? (
        <ProductGrid products={result.items} />
      ) : (
        <div className="rounded-[16px] border border-dashed border-[#e0e0e0] px-6 py-16 text-center">
          <p className="text-[13.5px] font-medium text-[#202020]">نتیجه‌ای پیدا نشد</p>
          <p className="mx-auto mt-1.5 max-w-md text-[12.5px] leading-7 text-[#888]">
            املای عبارت را بررسی کنید یا از کلمات کلی‌تری استفاده کنید. همچنین می‌توانید از
            دسته‌بندی‌ها کالای مورد نظر را پیدا کنید.
          </p>
          <ButtonLink href="/category/all" className="mt-4">
            مشاهده همه محصولات
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
