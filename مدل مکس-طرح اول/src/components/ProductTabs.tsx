import { useState } from "react";
import ProductCard from "./ProductCard";
import SafeImg from "./SafeImg";
import { IconChevron } from "./Icons";
import { LOCAL, products, W, type Product } from "../data/site";
import { toFa } from "../lib/utils";

type Props = {
  onAdd: (p: Product) => void;
  onWish: (id: number) => void;
  wishlist: number[];
};

const tabs = [
  { key: "best", label: "پرفروش‌ترین‌ها" },
  { key: "new", label: "جدیدترین‌ها" },
  { key: "off", label: "بیشترین تخفیف" },
  { key: "rate", label: "بالاترین امتیاز" },
] as const;

export default function ProductTabs({ onAdd, onWish, wishlist }: Props) {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("best");

  const sorted = [...products].sort((a, b) => {
    if (tab === "best") return b.sold - a.sold;
    if (tab === "new") return b.id - a.id;
    if (tab === "off") return (b.off ?? 0) - (a.off ?? 0);
    return b.rating - a.rating;
  });

  return (
    <section className="mx-auto max-w-[1440px] px-4 lg:px-6 mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-brand-400 to-brand-700" />
          <h2 className="text-[17px] lg:text-xl font-bold text-white">محصولات فروشگاه</h2>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-2xl bg-ink-850 border border-ink-700 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 px-4 h-9 rounded-xl text-[12.5px] transition-all ${
                tab === t.key
                  ? "bg-gradient-to-l from-brand-600 to-brand-500 text-white"
                  : "text-ink-300 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4">
        {/* promo cell */}
        <a
          href="#"
          className="relative hidden xl:flex rounded-2xl overflow-hidden border border-ink-800 group"
        >
          <SafeImg
            src={W + "black-friday-banner-1024x253.webp"}
            fallbackSrc={LOCAL.hero}
            alt="بنر تخفیف"
            className="absolute inset-0 w-full h-full group-hover:scale-110 transition-transform duration-700"
            wrapClassName="absolute inset-0 w-full h-full"
            gradient={["#2b0713", "#0b0b0f"]}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/20" />
          <div className="relative p-6 flex flex-col justify-end">
            <p className="text-[11px] text-brand-400">فقط امروز</p>
            <p className="text-white font-extrabold text-xl leading-8 mt-2">
              جشنواره
              <br />
              جمعه سیاه
            </p>
            <p className="text-ink-300 text-[12px] mt-2 leading-6">
              تا ۶۰٪ تخفیف روی بیش از {toFa(340)} کالای منتخب پارس کالا
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[12px] text-white">
              ورود به جشنواره
              <IconChevron className="w-3.5 h-3.5" />
            </span>
          </div>
        </a>

        {sorted.slice(0, 14).map((p) => (
          <ProductCard
            key={p.id}
            p={p}
            onAdd={onAdd}
            onWish={onWish}
            wished={wishlist.includes(p.id)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-7">
        <button className="h-11 px-8 rounded-xl border border-ink-700 bg-ink-850 text-[13px] text-ink-100 hover:border-brand-500 hover:text-white transition-colors">
          مشاهده همه {toFa(34)} کالا
        </button>
      </div>
    </section>
  );
}
