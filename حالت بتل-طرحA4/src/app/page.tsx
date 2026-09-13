import {
  ArticleService,
  CategoryService,
  ContentService,
  ProductService,
} from "@/services/catalog-service";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryNavigation } from "@/components/home/CategoryNavigation";
import { ProductSection } from "@/components/home/ProductSection";
import { EditorialCards } from "@/components/home/EditorialCards";
import { PromotionalBanner } from "@/components/home/PromotionalBanner";
import { DarkShowcase } from "@/components/home/DarkShowcase";
import { BrandSection } from "@/components/home/BrandSection";
import { BlogSection } from "@/components/home/BlogSection";
import { SeoSection } from "@/components/home/SeoSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Newsletter } from "@/components/home/Newsletter";
import { TrendingTabs } from "@/components/home/TrendingTabs";

export default async function HomePage() {
  const [bestsellers, amazing, featured, newest, articles, faqs, categories] = await Promise.all([
    ProductService.byTag("bestseller", 10),
    ProductService.byTag("amazing", 10),
    ProductService.byTag("featured", 10),
    ProductService.list({ sort: "newest", perPage: 20 }),
    ArticleService.list(3),
    ContentService.faqs(),
    CategoryService.list(),
  ]);

  const railOne = [...featured, ...bestsellers].slice(0, 12);

  return (
    <>
      <HeroBanner />
      <CategoryNavigation />

      <ProductSection
        title="پرفروش‌ترین کالاها"
        subtitle="انتخاب مشتریان در سی روز گذشته"
        href="/category/all?tag=bestseller"
        products={railOne}
      />

      <EditorialCards />

      <ProductSection
        title="منتخب فروشگاه"
        subtitle="کالاهای پیشنهادی تیم کارشناسی"
        href="/category/all"
        products={featured.slice(0, 10)}
        variant="grid"
      />

      <PromotionalBanner />

      <DarkShowcase products={amazing.length >= 4 ? amazing : railOne} />

      <TrendingTabs
        products={newest.items}
        filters={categories.slice(0, 5).map((c) => ({ slug: c.slug, title: c.title }))}
      />

      <BrandSection />
      <BlogSection articles={articles} />
      <SeoSection />
      <FaqSection faqs={faqs} />
      <Newsletter />
    </>
  );
}
