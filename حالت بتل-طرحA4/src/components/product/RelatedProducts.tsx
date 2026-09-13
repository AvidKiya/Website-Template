import type { Product } from "@/data/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductRail } from "./ProductRail";

export function RelatedProducts({
  products,
  title = "محصولات مرتبط",
  subtitle,
}: {
  products: Product[];
  title?: string;
  subtitle?: string;
}) {
  if (products.length === 0) return null;
  return (
    <section className="section-gap" aria-label={title}>
      <SectionHeader title={title} subtitle={subtitle} />
      <ProductRail products={products} />
    </section>
  );
}
