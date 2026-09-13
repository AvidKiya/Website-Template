import { NextResponse } from "next/server";
import { ProductService } from "@/services/catalog-service";
import type { ProductTag } from "@/data/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await ProductService.list({
    q: searchParams.get("q") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    tag: (searchParams.get("tag") as ProductTag | null) ?? undefined,
    sort: (searchParams.get("sort") as "newest" | "cheap" | "expensive" | "popular" | null) ?? undefined,
    perPage: Number(searchParams.get("perPage") ?? 12),
    page: Number(searchParams.get("page") ?? 1),
  });
  return NextResponse.json(result);
}
