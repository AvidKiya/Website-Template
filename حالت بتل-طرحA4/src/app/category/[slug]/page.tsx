import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryService, ProductService } from "@/services/catalog-service";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Filters } from "@/components/shop/Filters";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Pagination } from "@/components/shop/Pagination";
import { PRICE_BUCKETS } from "@/data/filters";
import type { ProductTag } from "@/data/types";
import { toPersianDigits } from "@/lib/utils";

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await CategoryService.bySlug(slug);
  const title = category ? `خرید ${category.title}` : "همه محصولات";
  return {
    title,
    description: category?.description ?? "فهرست کامل محصولات فروشگاه با امکان فیلتر و مرتب‌سازی.",
    alternates: { canonical: `/category/${slug}` },
  };
}

const asArray = (value: string | string[] | undefined): string[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

export default async function CategoryPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const sp = await searchParams;

  const category = await CategoryService.bySlug(slug);
  const bucketIndex = typeof sp.price === "string" ? Number(sp.price) : NaN;
  const bucket = Number.isFinite(bucketIndex) ? PRICE_BUCKETS[bucketIndex] : undefined;
  const page = Number(typeof sp.page === "string" ? sp.page : 1) || 1;

  const [result, facets] = await Promise.all([
    ProductService.list({
      category: slug,
      brands: asArray(sp.brand),
      sizes: asArray(sp.size),
      colors: asArray(sp.color),
      tag: typeof sp.tag === "string" ? (sp.tag as ProductTag) : undefined,
      minPrice: bucket?.min,
      maxPrice: bucket?.max,
      onlyAvailable: sp.available === "1",
      onlyDiscounted: sp.discounted === "1",
      sort: (typeof sp.sort === "string" ? sp.sort : "newest") as "newest",
      page,
      perPage: 15,
    }),
    ProductService.facets(slug),
  ]);

  const buildHref = (p: number) => {
    const next = new URLSearchParams();
    Object.entries(sp).forEach(([key, value]) => {
      if (key === "page" || value === undefined) return;
      asArray(value).forEach((v) => next.append(key, v));
    });
    next.set("page", String(p));
    return `/category/${slug}?${next.toString()}`;
  };

  const title = category?.title ?? "همه محصولات فروشگاه";

  return (
    <div className="container-x">
      <Breadcrumb items={[{ title: "فروشگاه", href: "/category/all" }, { title }]} />

      <header className="mb-5">
        <h1 className="text-[18px] font-bold text-[#202020] md:text-[22px]">{title}</h1>
        <p className="num mt-1 text-[12px] text-[#999]">
          {toPersianDigits(result.total)} کالا در این دسته‌بندی
        </p>
        {category?.description ? (
          <p className="mt-2 max-w-3xl text-[12.5px] leading-8 text-[#777]">
            {category.description}
          </p>
        ) : null}
        {category?.children?.length ? (
          <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto">
            {category.children.map((child) => (
              <span
                key={child.slug}
                className="shrink-0 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-[12px] text-[#666]"
              >
                {child.title}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden h-fit rounded-[14px] border border-[#e8e8e8] bg-white p-4 lg:sticky lg:top-[124px] lg:block">
          <Suspense fallback={<div className="skeleton h-[520px] rounded-xl" />}>
            <Filters facets={facets} activeCategory={slug} />
          </Suspense>
        </aside>

        <div>
          <Suspense fallback={<div className="skeleton mb-4 h-14 rounded-[14px]" />}>
            <ShopToolbar total={result.total} facets={facets} activeCategory={slug} />
          </Suspense>

          {result.items.length > 0 ? (
            <>
              <ProductGrid products={result.items} columns={4} />
              <Pagination page={result.page} pageCount={result.pageCount} buildHref={buildHref} />
            </>
          ) : (
            <div className="rounded-[14px] border border-dashed border-[#e0e0e0] px-6 py-16 text-center">
              <p className="text-[13.5px] font-medium text-[#202020]">کالایی با این فیلترها پیدا نشد</p>
              <p className="mt-1.5 text-[12.5px] text-[#888]">
                می‌توانید فیلترها را حذف یا بازه قیمت را تغییر دهید.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
