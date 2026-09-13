import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { img } from "@/data/media";

export function PromotionalBanner() {
  return (
    <section className="container-x section-gap" aria-label="بنر تبلیغاتی">
      <div className="relative overflow-hidden rounded-[18px] bg-[#f7c948]">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_0.9fr]">
          <div className="px-6 py-7 md:px-10 md:py-9">
            <span className="inline-block rounded-md bg-[#252525] px-2.5 py-1 text-[11px] text-white">
              فروش ویژه پایان فصل
            </span>
            <h2 className="mt-3 text-[19px] font-bold leading-9 text-[#2b2000] md:text-[24px] md:leading-[44px]">
              خرید دوم ۵۰٪ تخفیف
            </h2>
            <p className="mt-1 max-w-md text-[12.5px] leading-7 text-[#5a4a12]">
              با خرید هر دو کالا از دسته‌های منتخب، کالای دوم را با نصف قیمت دریافت کنید. این
              پیشنهاد تا پایان هفته معتبر است.
            </p>
            <Link
              href="/category/all?tag=amazing"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-[#252525] px-5 text-[13px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              مشاهده کالاهای تخفیف‌دار
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="relative h-[180px] md:h-[240px]">
            <Image
              src={img(4458521, 900)}
              alt="کالاهای تخفیف‌دار"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-l from-transparent to-[#f7c948]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
