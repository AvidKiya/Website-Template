import type { Product } from "@/data/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductRail } from "@/components/product/ProductRail";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { cn } from "@/lib/utils";

export function ProductSection({
  title,
  subtitle,
  href,
  products,
  variant = "rail",
  dark,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  products: Product[];
  variant?: "rail" | "grid";
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  if (products.length === 0) return null;

  return (
    <section className={cn("container-x section-gap", className)} aria-label={title}>
      <SectionHeader title={title} subtitle={subtitle} href={href} dark={dark}>
        {children}
      </SectionHeader>
      {variant === "rail" ? (
        <ProductRail products={products} dark={dark} />
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}
