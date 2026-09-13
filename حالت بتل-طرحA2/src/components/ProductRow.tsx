import { useRef, type ReactNode } from "react";
import type { Product } from "../data";
import ProductCard from "./ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

type Props = {
  id?: string;
  title: ReactNode;
  products: Product[];
  wished: Set<number>;
  onWish: (id: number) => void;
  onAdd: (p: Product) => void;
};

export default function ProductRow({ id, title, products, wished, onWish, onAdd }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 470, behavior: "smooth" });

  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-[15px] font-extrabold sm:text-lg">
          <span className="h-5 w-1.5 rounded-full bg-accent" />
          {title}
        </h2>
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll(-1)}
            aria-label="قبلی"
            className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-card text-mist transition hover:border-accent/50 hover:text-accent"
          >
            <ChevronRightIcon className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="بعدی"
            className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-card text-mist transition hover:border-accent/50 hover:text-accent"
          >
            <ChevronLeftIcon className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar -mx-1 mt-4 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            p={p}
            wished={wished.has(p.id)}
            onWish={onWish}
            onAdd={onAdd}
            className="w-[158px] shrink-0 snap-start sm:w-[186px] lg:w-[210px]"
          />
        ))}
      </div>
    </section>
  );
}
