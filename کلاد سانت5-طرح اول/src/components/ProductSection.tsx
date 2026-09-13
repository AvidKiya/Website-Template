import { ChevronLeft } from "lucide-react";
import { Product } from "../data/store";
import ProductCard from "./ProductCard";
import CountdownTimer from "./CountdownTimer";

export default function ProductSection({
  title,
  subtitle,
  products,
  variant = "default",
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  variant?: "default" | "flash";
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div
        className={`mb-4 flex items-center justify-between rounded-t-2xl px-4 py-3 ${
          variant === "flash"
            ? "bg-gradient-to-l from-red-600 to-orange-500 text-white"
            : "bg-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <h2 className={`text-base font-extrabold sm:text-lg ${variant === "flash" ? "text-white" : "text-gray-800"}`}>
            {title}
          </h2>
          {subtitle ? (
            <span className={`text-xs ${variant === "flash" ? "text-white/80" : "text-gray-400"}`}>
              {subtitle}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          {variant === "flash" ? <CountdownTimer /> : null}
          <button
            className={`flex items-center gap-1 text-xs font-bold transition ${
              variant === "flash" ? "text-white" : "text-red-600 hover:text-red-700"
            }`}
          >
            مشاهده همه
            <ChevronLeft size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
