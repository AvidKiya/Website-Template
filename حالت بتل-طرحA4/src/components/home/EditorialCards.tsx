import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { img } from "@/data/media";

const items = [
  { label: "کالکشن ویژه", title: "استایل شب", href: "/category/womens-fashion", id: 28863302 },
  { label: "منتخب سردبیر", title: "مینیمال روزمره", href: "/category/mens-fashion", id: 23911182 },
  { label: "تازه رسیده", title: "چرم و بافت", href: "/category/shoes", id: 15051712 },
  { label: "پیشنهاد فصل", title: "لایه‌های گرم", href: "/category/accessories", id: 8342914 },
];

export function EditorialCards() {
  return (
    <section className="container-x section-gap" aria-label="کالکشن‌های منتخب">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group relative block aspect-[3/4] overflow-hidden rounded-[16px] bg-[#252525]"
          >
            <Image
              src={img(item.id, 800)}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 46vw, 23vw"
              className="object-cover opacity-85 transition-transform duration-400 ease-out group-hover:scale-[1.04]"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              aria-hidden
            />
            <span className="absolute start-0 end-0 bottom-0 flex flex-col gap-1 p-4">
              <span className="text-[11px] text-white/65">{item.label}</span>
              <span className="flex items-center justify-between text-[14px] font-bold text-white">
                {item.title}
                <ArrowLeft
                  size={16}
                  className="-translate-x-1 opacity-0 transition-all duration-250 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
