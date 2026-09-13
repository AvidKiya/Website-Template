import type { Brand } from "./types";

export const brands: Brand[] = [
  { id: "b1", slug: "aria-mode", title: "آریا مد", latin: "ARIA", productCount: 248 },
  { id: "b2", slug: "nordika", title: "نوردیکا", latin: "NORDIKA", productCount: 186 },
  { id: "b3", slug: "urbanline", title: "اربن لاین", latin: "URBANLINE", productCount: 312 },
  { id: "b4", slug: "kimia", title: "کیمیا", latin: "KIMIA", productCount: 154 },
  { id: "b5", slug: "sevin", title: "سِوین", latin: "SEVIN", productCount: 97 },
  { id: "b6", slug: "monolab", title: "مونولب", latin: "MONOLAB", productCount: 143 },
  { id: "b7", slug: "atlas-co", title: "اطلس", latin: "ATLAS CO", productCount: 205 },
  { id: "b8", slug: "verdo", title: "وردو", latin: "VERDO", productCount: 88 },
  { id: "b9", slug: "pardis", title: "پردیس", latin: "PARDIS", productCount: 121 },
  { id: "b10", slug: "lumen", title: "لومن", latin: "LUMEN", productCount: 76 },
];

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);
