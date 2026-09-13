import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BRAND } from "@/data/navigation";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "درباره فروشگاه اینترنتی یور برند، ماموریت و خدمات ما.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-x pb-12">
      <Breadcrumb items={[{ title: "درباره ما" }]} />
      <div className="mx-auto max-w-3xl rounded-[16px] border border-[#e8e8e8] p-6 md:p-8">
        <h1 className="text-[18px] font-bold text-[#202020]">درباره {BRAND.name}</h1>
        <div className="mt-3 space-y-3 text-[13px] leading-9 text-[#666]">
          <p>
            {BRAND.name} یک پلتفرم خرید آنلاین در حوزه مد و لایف‌استایل است که با هدف ارائه تجربه‌ای
            شفاف، سریع و قابل اعتماد برای خریداران ایرانی طراحی شده است. ما بر کیفیت کالا، صداقت در
            توضیحات محصول و پشتیبانی پاسخگو تمرکز داریم.
          </p>
          <p>
            تیم ما از کارشناسان خرید، تیم کنترل کیفیت، توسعه‌دهندگان و پشتیبانان تشکیل شده است. هر
            کالا پیش از عرضه از نظر اصالت، سلامت فیزیکی و مطابقت با توضیحات بررسی می‌شود.
          </p>
          <p>
            اگر فروشنده هستید و می‌خواهید کالاهای خود را در {BRAND.name} عرضه کنید، از طریق صفحه تماس
            درخواست همکاری ثبت کنید. پس از بررسی مدارک، پنل فروشندگان برای شما فعال می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}
