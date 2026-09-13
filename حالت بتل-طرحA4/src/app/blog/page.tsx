import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { ArticleService } from "@/services/catalog-service";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "مجله",
  description: "مقالات آموزشی درباره استایل، مراقبت از کالا و راهنمای خرید.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const articles = await ArticleService.list();

  return (
    <div className="container-x pb-10">
      <Breadcrumb items={[{ title: "مجله" }]} />
      <h1 className="text-[18px] font-bold text-[#202020] md:text-[22px]">مجله یور برند</h1>
      <p className="mb-5 mt-1 text-[12.5px] text-[#888]">
        راهنمای خرید، نکات مراقبت از کالا و ترندهای فصل
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="group overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white transition-all duration-200 hover:shadow-[0_10px_26px_rgba(0,0,0,0.06)]"
          >
            <Link
              href={`/blog/${article.slug}`}
              className="relative block aspect-[16/9] overflow-hidden bg-[#f7f7f7]"
            >
              <Image
                src={article.cover}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-400 group-hover:scale-[1.04]"
              />
            </Link>
            <div className="p-4">
              <span className="text-[11px] text-[#e53935]">{article.category}</span>
              <h2 className="mt-1.5">
                <Link
                  href={`/blog/${article.slug}`}
                  className="line-2 text-[13.5px] font-bold leading-7 text-[#202020]"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="line-3 mt-1.5 text-[12px] leading-7 text-[#888]">{article.excerpt}</p>
              <span className="mt-3 flex items-center gap-1 text-[11px] text-[#aaa]">
                <CalendarDays size={13} /> {formatDate(article.date)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
