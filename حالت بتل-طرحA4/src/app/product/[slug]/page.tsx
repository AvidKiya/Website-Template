import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductService, CategoryService } from "@/services/catalog-service";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await ProductService.allSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await ProductService.bySlug(slug);
  if (!product) return { title: "کالا یافت نشد" };
  return {
    title: product.title,
    description: product.description.slice(0, 155),
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.title,
      description: product.description.slice(0, 155),
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await ProductService.bySlug(slug);
  if (!product) notFound();

  const [category, related] = await Promise.all([
    CategoryService.bySlug(product.categorySlug),
    ProductService.related(product.slug, 12),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brandSlug },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: product.price * 10,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://yourbrand.example/product/${product.slug}`,
    },
  };

  return (
    <div className="container-x pb-24 lg:pb-0">
      <Breadcrumb
        items={[
          ...(category ? [{ title: category.title, href: `/category/${category.slug}` }] : []),
          { title: product.title },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)_310px] lg:gap-8">
        <ProductGallery images={product.images} title={product.title} slug={product.slug} />
        <ProductPurchase product={product} />
      </div>

      <div className="section-gap">
        <ProductTabs product={product} />
      </div>

      <RelatedProducts products={related} subtitle="کالاهایی با سبک و کاربرد مشابه" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
