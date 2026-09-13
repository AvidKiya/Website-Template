import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgePercent, Clock4, Flame } from "lucide-react";
import type { Product } from "@/data/types";
import { ProductRail } from "@/components/product/ProductRail";
import { img } from "@/data/media";
import { toPersianDigits } from "@/lib/utils";

export function DarkShowcase({ products }: { products: Product[] }) {
  return (
    <section
      className="curve-top curve-bottom section-gap bg-[#252525] py-10 md:py-14"
      aria-label="پیشنهاد شگفت‌انگیز"
    >
      <div className="container-x">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-[#e53935] text-white">
              <Flame size={20} />
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-white md:text-[20px]">پیشنهاد شگفت‌انگیز</h2>
              <p className="mt-0.5 text-[12px] text-white/55">
                تخفیف‌های محدود روی منتخبی از کالاهای پرفروش
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/12 px-3 py-2 text-white/80">
              <Clock4 size={15} />
              <span className="num text-[13px] tracking-wide">
                {toPersianDigits("08")}:{toPersianDigits("42")}:{toPersianDigits("15")}
              </span>
            </div>
            <Link
              href="/category/all?tag=amazing"
              className="inline-flex items-center gap-1 text-[12.5px] text-white/75 transition-colors hover:text-white"
            >
              مشاهده همه
              <ArrowLeft size={15} />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[250px_1fr]">
          <Link
            href="/category/all?tag=amazing"
            className="group relative hidden overflow-hidden rounded-[16px] bg-[#1b1b1b] lg:block"
          >
            <Image
              src={img(30713507, 700)}
              alt="پیشنهاد ویژه"
              fill
              sizes="250px"
              className="object-cover opacity-60 transition-transform duration-400 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" aria-hidden />
            <span className="absolute start-0 end-0 bottom-0 p-5">
              <span className="flex items-center gap-1.5 text-[11.5px] text-white/70">
                <BadgePercent size={15} /> تا ۴۰٪ تخفیف
              </span>
              <span className="mt-1.5 block text-[16px] font-bold text-white">
                فرصت محدود خرید
              </span>
              <span className="mt-1 block text-[11.5px] leading-6 text-white/55">
                قیمت‌ها پس از پایان زمان‌بندی به حالت عادی بازمی‌گردند.
              </span>
            </span>
          </Link>

          <ProductRail products={products} dark />
        </div>
      </div>
    </section>
  );
}
