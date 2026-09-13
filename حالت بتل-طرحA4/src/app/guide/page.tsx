import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Accordion } from "@/components/ui/Accordion";
import { ContentService } from "@/services/catalog-service";

export const metadata: Metadata = {
  title: "راهنمای خرید",
  description: "راهنمای کامل ثبت سفارش، پرداخت، ارسال و بازگشت کالا.",
  alternates: { canonical: "/guide" },
};

export default async function GuidePage() {
  const faqs = await ContentService.faqs();

  return (
    <div className="container-x pb-12">
      <Breadcrumb items={[{ title: "راهنمای خرید" }]} />
      <h1 className="mb-2 text-[18px] font-bold text-[#202020]">راهنمای خرید</h1>
      <p className="mb-5 max-w-3xl text-[12.5px] leading-8 text-[#777]">
        در این صفحه مراحل ثبت سفارش، شیوه‌های پرداخت، زمان‌بندی ارسال و رویه بازگرداندن کالا توضیح
        داده شده است. اگر پاسخ سوال خود را پیدا نکردید، با پشتیبانی تماس بگیرید.
      </p>
      <Accordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
    </div>
  );
}
