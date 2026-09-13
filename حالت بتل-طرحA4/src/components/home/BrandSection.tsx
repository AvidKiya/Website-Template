import Link from "next/link";
import { brands } from "@/data/brands";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { toPersianDigits } from "@/lib/utils";

export function BrandSection() {
  return (
    <section className="container-x section-gap" aria-label="برندها">
      <SectionHeader
        title="خرید بر اساس برند"
        subtitle="برندهای منتخب با ضمانت اصالت کالا"
        href="/category/all"
      />
      <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-5 md:overflow-visible">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/category/all?brand=${brand.slug}`}
            className="flex w-[150px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-[14px] border border-[#e8e8e8] bg-white px-4 py-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#dcdcdc] hover:shadow-[0_8px_22px_rgba(0,0,0,0.06)] md:w-auto"
          >
            <span className="text-[15px] font-black tracking-tight text-[#202020]">
              {brand.latin}
            </span>
            <span className="text-[11.5px] text-[#888]">{brand.title}</span>
            <span className="num text-[10.5px] text-[#b3b3b3]">
              {toPersianDigits(brand.productCount)} کالا
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
