import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

export function CategoryNavigation() {
  return (
    <section className="container-x section-gap" aria-label="دسته‌بندی‌ها">
      <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-8 md:gap-4 md:overflow-visible">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group flex w-[88px] shrink-0 flex-col items-center gap-2 md:w-auto"
          >
            <span className="relative size-[74px] overflow-hidden rounded-full border border-[#e8e8e8] bg-[#f7f7f7] transition-all duration-250 ease-out group-hover:border-[#cfcfcf] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.07)] md:size-[88px]">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="88px"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </span>
            <span className="text-center text-[11.5px] font-medium leading-5 text-[#3d3d3d] md:text-[12.5px]">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
