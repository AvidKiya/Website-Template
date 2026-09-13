import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import type { Article } from "@/data/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate, toPersianDigits } from "@/lib/utils";

export function BlogSection({ articles }: { articles: Article[] }) {
  return (
    <section className="container-x section-gap" aria-label="مجله">
      <SectionHeader
        title="مجله یور برند"
        subtitle="راهنمای خرید، مراقبت از کالا و ترندهای فصل"
        href="/blog"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <article
            key={article.slug}
            className="group overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white transition-all duration-200 ease-out hover:border-[#dcdcdc] hover:shadow-[0_10px_26px_rgba(0,0,0,0.06)]"
          >
            <Link href={`/blog/${article.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-[#f7f7f7]">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.04]"
              />
            </Link>
            <div className="p-4">
              <span className="text-[11px] text-[#e53935]">{article.category}</span>
              <h3 className="mt-1.5">
                <Link
                  href={`/blog/${article.slug}`}
                  className="line-2 text-[13.5px] font-bold leading-7 text-[#202020]"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="line-2 mt-1.5 text-[12px] leading-7 text-[#888]">{article.excerpt}</p>
              <div className="mt-3 flex items-center gap-4 text-[11px] text-[#aaa]">
                <span className="flex items-center gap-1">
                  <CalendarDays size={13} /> {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {toPersianDigits(article.readingTime)} دقیقه مطالعه
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
