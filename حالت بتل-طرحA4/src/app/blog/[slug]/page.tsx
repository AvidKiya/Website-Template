import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import { ArticleService, ProductService } from "@/services/catalog-service";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { formatDate, toPersianDigits } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await ArticleService.list();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await ArticleService.bySlug(slug);
  if (!article) return { title: "مقاله یافت نشد" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { type: "article", title: article.title, images: [{ url: article.cover }] },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await ArticleService.bySlug(slug);
  if (!article) notFound();

  const suggestions = await ProductService.byTag("featured", 10);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: [article.cover],
    datePublished: article.date,
    articleSection: article.category,
    author: { "@type": "Organization", name: "یور برند" },
  };

  return (
    <div className="container-x pb-10">
      <Breadcrumb items={[{ title: "مجله", href: "/blog" }, { title: article.title }]} />

      <article className="mx-auto max-w-3xl">
        <span className="text-[11.5px] text-[#e53935]">{article.category}</span>
        <h1 className="mt-2 text-[20px] font-bold leading-10 text-[#202020] md:text-[25px]">
          {article.title}
        </h1>
        <div className="mt-2 flex items-center gap-4 text-[11.5px] text-[#aaa]">
          <span className="flex items-center gap-1">
            <CalendarDays size={13} /> {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {toPersianDigits(article.readingTime)} دقیقه مطالعه
          </span>
        </div>

        <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-[16px] bg-[#f7f7f7]">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-[13.5px] font-medium leading-9 text-[#444]">{article.excerpt}</p>
          {article.body.map((p, i) => (
            <p key={i} className="text-[13px] leading-9 text-[#666]">
              {p}
            </p>
          ))}
        </div>
      </article>

      <RelatedProducts products={suggestions} title="کالاهای مرتبط با این مطلب" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
