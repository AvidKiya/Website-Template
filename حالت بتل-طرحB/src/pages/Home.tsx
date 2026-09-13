import { HeroSlider, BannerStrip, CategoryCircles } from "../components/Hero";
import {
  AmazingOffers,
  PromoGrid,
  TabbedProducts,
  BestTwoCol,
  DealOfDay,
  Services,
  BrandsMarquee,
  SmsBanner,
  Blog,
  AppDownload,
} from "../components/HomeSections";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1320px] space-y-8 px-3 py-4 sm:px-5 sm:py-6">
      <HeroSlider />
      <BannerStrip />
      <Services />
      <section>
        <h2 className="mb-3.5 flex items-center gap-2 text-lg font-extrabold text-white sm:text-xl">
          <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-pk to-transparent" />
          خرید بر اساس دسته‌بندی
        </h2>
        <CategoryCircles />
      </section>
      <AmazingOffers />
      <PromoGrid />
      <TabbedProducts />
      <DealOfDay />
      <BestTwoCol />
      <BrandsMarquee />
      <AppDownload />
      <SmsBanner />
      <Blog />
    </div>
  );
}
