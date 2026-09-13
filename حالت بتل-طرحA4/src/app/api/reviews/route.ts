import { NextResponse } from "next/server";
import { ReviewService } from "@/services/interaction-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("product");
  if (!slug) {
    return NextResponse.json({ error: "product slug is required" }, { status: 400 });
  }
  try {
    const items = await ReviewService.list(slug);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.productSlug || !body?.body || !body?.author) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }
    const review = await ReviewService.create({
      productSlug: String(body.productSlug),
      author: String(body.author),
      rating: Number(body.rating ?? 5),
      title: String(body.title ?? ""),
      body: String(body.body),
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "ثبت دیدگاه ناموفق بود" }, { status: 500 });
  }
}
