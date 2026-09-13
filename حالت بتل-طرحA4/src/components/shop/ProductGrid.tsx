import type { Product } from "@/data/types";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  columns = 5,
  className,
}: {
  products: Product[];
  columns?: 4 | 5;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4",
        columns === 5 ? "lg:grid-cols-4 xl:grid-cols-5" : "lg:grid-cols-4",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
