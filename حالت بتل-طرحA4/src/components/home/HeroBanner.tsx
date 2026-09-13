import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { img } from "@/data/media";

export function HeroBanner() {
  return (
    <section className="container-x pt-5 md:pt-7" aria-label="بنر اصلی">
      <div className="mx-auto max-w-[1100px]">
        <div className="relative overflow-hidden rounded-[18px] bg-[#252525] md:rounded-[22px]">
          <div className="relative grid min-h-[220px] grid-cols-1 md:min-h-[300px] md:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10 flex flex-col justify-center gap-3 px-6 py-8 md:px-10 md:py-10">
              <span className="w-fit rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/75">
                کالکشن زمستان ۱۴۰۵
              </span>
              <h1 className="text-[20px] font-bold leading-9 text-white md:text-[27px] md:leading-[46px]">
                استایل تازه فصل،
                <br className="hidden md:block" /> با تخفیف تا ۴۰ درصد
              </h1>
              <p className="max-w-sm text-[12.5px] leading-7 text-white/60 md:text-[13px]">
                منتخبی از پوشاک، کفش و اکسسوری برندهای معتبر با ضمانت اصالت کالا و ارسال سریع به
                سراسر کشور.
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Link
                  href="/category/all?tag=amazing"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-[13px] font-medium text-[#202020] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  مشاهده کالکشن
                  <ArrowLeft size={16} />
                </Link>
                <Link
                  href="/category/womens-fashion"
                  className="inline-flex h-11 items-center rounded-xl border border-white/20 px-5 text-[13px] text-white/85 transition-colors hover:border-white/45"
                >
                  پوشاک زنانه
                </Link>
              </div>
            </div>

            <div className="relative min-h-[200px] md:min-h-full">
              <Image
                src={img(23911182, 1200)}
                alt="کالکشن جدید فصل"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-top"
              />
              <div
                className="absolute inset-0 bg-gradient-to-l from-transparent via-[#252525]/40 to-[#252525]"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            { title: "پیشنهاد شگفت‌انگیز", desc: "تا ۴۰٪ تخفیف", href: "/category/all?tag=amazing", id: 27256462 },
            { title: "تازه‌های ساعت", desc: "کالکشن جدید", href: "/category/watches", id: 8839887 },
            { title: "مراقبت پوست", desc: "برندهای منتخب", href: "/category/beauty", id: 5113052 },
          ].map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group relative flex h-[92px] items-center overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-[#f7f7f7] ${
                i === 2 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="relative z-10 px-4">
                <span className="block text-[13px] font-bold text-[#202020]">{item.title}</span>
                <span className="mt-0.5 block text-[11.5px] text-[#777]">{item.desc}</span>
              </div>
              <div className="absolute end-0 top-0 h-full w-[42%] overflow-hidden">
                <Image
                  src={img(item.id, 500)}
                  alt=""
                  aria-hidden
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
