import { products } from "@/data/products";
import { categories, categoryBySlug } from "@/data/categories";
import { brands } from "@/data/brands";
import { articles } from "@/data/articles";
import { faqs } from "@/data/faqs";
import type { Article, Brand, Category, Faq, Product, ProductTag } from "@/data/types";

/**
 * Service layer — the UI never imports mock data directly.
 * Swapping these implementations for REST/GraphQL/Supabase calls
 * does not require any component change.
 */

export type ProductQuery = {
  category?: string;
  brands?: string[];
  tag?: ProductTag;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  onlyAvailable?: boolean;
  onlyDiscounted?: boolean;
  sort?: "newest" | "cheap" | "expensive" | "popular" | "discount";
  page?: number;
  perPage?: number;
  limit?: number;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  pageCount: number;
};

function matches(product: Product, query: ProductQuery): boolean {
  if (query.category && query.category !== "all") {
    const cat = categoryBySlug(query.category);
    const childMatch = cat?.children.some((c) => c.slug === query.category);
    if (product.categorySlug !== query.category && !childMatch) return false;
  }
  if (query.tag && !product.tags.includes(query.tag)) return false;
  if (query.brands?.length && !query.brands.includes(product.brandSlug)) return false;
  if (query.minPrice != null && product.price < query.minPrice) return false;
  if (query.maxPrice != null && product.price > query.maxPrice) return false;
  if (query.onlyAvailable && product.stock <= 0) return false;
  if (query.onlyDiscounted && !product.oldPrice) return false;
  if (query.sizes?.length && !query.sizes.some((s) => product.sizes.includes(s))) return false;
  if (query.colors?.length && !query.colors.some((c) => product.colors.some((pc) => pc.name === c)))
    return false;
  if (query.q) {
    const needle = query.q.trim().toLowerCase();
    const haystack = `${product.title} ${product.englishTitle} ${product.brandSlug} ${product.categorySlug}`.toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
}

function sortProducts(items: Product[], sort: ProductQuery["sort"]): Product[] {
  const copy = [...items];
  switch (sort) {
    case "cheap":
      return copy.sort((a, b) => a.price - b.price);
    case "expensive":
      return copy.sort((a, b) => b.price - a.price);
    case "popular":
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);
    case "discount":
      return copy.sort(
        (a, b) =>
          (b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0) -
          (a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0),
      );
    case "newest":
    default:
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

export const ProductService = {
  async list(query: ProductQuery = {}): Promise<Paginated<Product>> {
    const filtered = sortProducts(
      products.filter((p) => matches(p, query)),
      query.sort,
    );
    const perPage = query.perPage ?? query.limit ?? 20;
    const page = Math.max(1, query.page ?? 1);
    const start = (page - 1) * perPage;
    return {
      items: filtered.slice(start, start + perPage),
      total: filtered.length,
      page,
      perPage,
      pageCount: Math.max(1, Math.ceil(filtered.length / perPage)),
    };
  },

  async byTag(tag: ProductTag, limit = 10): Promise<Product[]> {
    const res = await ProductService.list({ tag, perPage: limit, sort: "popular" });
    return res.items;
  },

  async bySlug(slug: string): Promise<Product | null> {
    return products.find((p) => p.slug === slug) ?? null;
  },

  async bySlugs(slugs: string[]): Promise<Product[]> {
    return slugs
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is Product => Boolean(p));
  },

  async related(slug: string, limit = 10): Promise<Product[]> {
    const product = await ProductService.bySlug(slug);
    if (!product) return [];
    const sameCategory = products.filter(
      (p) => p.slug !== slug && p.categorySlug === product.categorySlug,
    );
    const fill = products.filter(
      (p) => p.slug !== slug && p.categorySlug !== product.categorySlug,
    );
    return [...sameCategory, ...fill].slice(0, limit);
  },

  async search(q: string, limit = 6): Promise<Product[]> {
    if (!q.trim()) return [];
    const res = await ProductService.list({ q, perPage: limit, sort: "popular" });
    return res.items;
  },

  async allSlugs(): Promise<string[]> {
    return products.map((p) => p.slug);
  },

  async facets(categorySlug?: string) {
    const scope =
      categorySlug && categorySlug !== "all"
        ? products.filter((p) => p.categorySlug === categorySlug)
        : products;
    const sizes = Array.from(new Set(scope.flatMap((p) => p.sizes)));
    const colors = Array.from(
      new Map(scope.flatMap((p) => p.colors).map((c) => [c.name, c])).values(),
    );
    const brandSlugs = Array.from(new Set(scope.map((p) => p.brandSlug)));
    const prices = scope.map((p) => p.price);
    return {
      sizes,
      colors,
      brands: brands.filter((b) => brandSlugs.includes(b.slug)),
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 10_000_000,
    };
  },
};

export const CategoryService = {
  async list(): Promise<Category[]> {
    return categories;
  },
  async bySlug(slug: string): Promise<Category | null> {
    return categoryBySlug(slug) ?? null;
  },
};

export const BrandService = {
  async list(): Promise<Brand[]> {
    return brands;
  },
  async bySlug(slug: string): Promise<Brand | null> {
    return brands.find((b) => b.slug === slug) ?? null;
  },
};

export const ArticleService = {
  async list(limit?: number): Promise<Article[]> {
    return limit ? articles.slice(0, limit) : articles;
  },
  async bySlug(slug: string): Promise<Article | null> {
    return articles.find((a) => a.slug === slug) ?? null;
  },
};

export const ContentService = {
  async faqs(): Promise<Faq[]> {
    return faqs;
  },
};
