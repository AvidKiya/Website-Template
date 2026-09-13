export type ColorOption = {
  name: string;
  hex: string;
};

export type Seller = {
  name: string;
  rating: number;
  sales: number;
  badge?: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  englishTitle: string;
  categorySlug: string;
  brandSlug: string;
  images: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  colors: ColorOption[];
  sizes: string[];
  seller: Seller;
  warranty: string;
  shipping: string;
  description: string;
  highlights: string[];
  specifications: { label: string; value: string }[];
  tags: ProductTag[];
  createdAt: string;
};

export type ProductTag = "new" | "bestseller" | "amazing" | "featured" | "trending";

export type Category = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  children: { title: string; slug: string }[];
  description: string;
};

export type Brand = {
  id: string;
  slug: string;
  title: string;
  latin: string;
  productCount: number;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  cover: string;
  date: string;
  readingTime: number;
  excerpt: string;
  body: string[];
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type NavItem = {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
};

export type Review = {
  id: number | string;
  productSlug: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  helpful?: number;
};

export type Question = {
  id: number | string;
  productSlug: string;
  author: string;
  body: string;
  answer?: string | null;
  createdAt: string;
  helpful?: number;
};
