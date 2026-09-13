import type { Metadata } from "next";
import { Headphones, Mail, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BRAND } from "@/data/navigation";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "راه‌های ارتباط با پشتیبانی فروشگاه یور برند.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-x pb-12">
      <Breadcrumb items={[{ title: "تماس با ما" }]} />
      <h1 className="mb-4 text-[18px] font-bold text-[#202020]">تماس با ما</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Headphones, title: "پشتیبانی تلفنی", value: BRAND.phone, note: "همه روزه ۹ تا ۲۱" },
          { icon: Mail, title: "ایمیل", value: BRAND.email, note: "پاسخ تا ۲۴ ساعت کاری" },
          { icon: MapPin, title: "نشانی دفتر", value: BRAND.address, note: "مراجعه حضوری با هماهنگی" },
        ].map(({ icon: Icon, title, value, note }) => (
          <div key={title} className="rounded-[14px] border border-[#e8e8e8] p-5">
            <span className="grid size-10 place-items-center rounded-xl bg-[#f7f7f7] text-[#555]">
              <Icon size={18} />
            </span>
            <h2 className="mt-3 text-[13px] font-bold text-[#202020]">{title}</h2>
            <p className="num mt-1 text-[12.5px] leading-7 text-[#666]">{value}</p>
            <p className="mt-0.5 text-[11.5px] text-[#aaa]">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
