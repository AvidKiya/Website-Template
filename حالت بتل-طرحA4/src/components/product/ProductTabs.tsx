"use client";

import type { Product } from "@/data/types";
import { Tabs } from "@/components/ui/Tabs";
import { Reviews } from "./Reviews";
import { Questions } from "./Questions";

export function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs
      items={[
        {
          id: "specs",
          label: "مشخصات",
          content: (
            <div className="overflow-hidden rounded-[14px] border border-[#e8e8e8]">
              <table className="w-full text-start">
                <caption className="sr-only">مشخصات فنی {product.title}</caption>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {product.specifications.map((spec) => (
                    <tr key={spec.label} className="even:bg-[#fafafa]">
                      <th
                        scope="row"
                        className="w-[180px] px-4 py-3 text-start text-[12.5px] font-medium text-[#777]"
                      >
                        {spec.label}
                      </th>
                      <td className="px-4 py-3 text-[12.5px] text-[#202020]">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "description",
          label: "توضیحات",
          content: (
            <div className="rounded-[14px] border border-[#e8e8e8] p-5">
              <p className="text-[13px] leading-8 text-[#666]">{product.description}</p>
              <h3 className="mt-5 text-[13.5px] font-bold text-[#202020]">نکات مهم درباره کالا</h3>
              <ul className="mt-2 space-y-2">
                {product.highlights.map((h) => (
                  <li key={h} className="text-[12.5px] leading-8 text-[#777]">
                    – {h}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[12.5px] leading-8 text-[#888]">
                در صورت نیاز به مشاوره پیش از خرید، می‌توانید از بخش پرسش‌ها سوال خود را ثبت کنید یا
                با پشتیبانی فروشگاه تماس بگیرید.
              </p>
            </div>
          ),
        },
        {
          id: "reviews",
          label: "دیدگاه‌ها",
          badge: product.reviewCount,
          content: <Reviews productSlug={product.slug} rating={product.rating} />,
        },
        {
          id: "questions",
          label: "پرسش‌ها",
          content: <Questions productSlug={product.slug} />,
        },
      ]}
    />
  );
}
