import { NextResponse } from "next/server";
import { OrderService } from "@/services/interaction-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    if (!body?.customerName || !body?.phone || !body?.address || items.length === 0) {
      return NextResponse.json({ error: "اطلاعات سفارش کامل نیست" }, { status: 400 });
    }
    const order = await OrderService.create({
      customerName: String(body.customerName),
      phone: String(body.phone),
      address: String(body.address),
      note: body.note ? String(body.note) : undefined,
      items,
      subtotal: Number(body.subtotal ?? 0),
      discount: Number(body.discount ?? 0),
      shipping: Number(body.shipping ?? 0),
      total: Number(body.total ?? 0),
    });
    return NextResponse.json({ code: order.code }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "ثبت سفارش ناموفق بود" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) return NextResponse.json({ error: "code is required" }, { status: 400 });
  const order = await OrderService.byCode(code);
  if (!order) return NextResponse.json({ error: "سفارشی یافت نشد" }, { status: 404 });
  return NextResponse.json({ order });
}
