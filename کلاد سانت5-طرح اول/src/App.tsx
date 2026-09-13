import { useState } from "react";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import MobileDrawer from "./components/MobileDrawer";
import HeroSlider from "./components/HeroSlider";
import QuickCategories from "./components/QuickCategories";
import ProductSection from "./components/ProductSection";
import PromoBanners from "./components/PromoBanners";
import TrustBadges from "./components/TrustBadges";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { products } from "./data/store";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const flashProducts = [...products].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews);
  const newest = [...products].reverse();

  return (
    <div className="min-h-screen bg-[#f4f5f7]" dir="rtl">
      <TopBar />
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <CategoryNav />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main>
        <HeroSlider />
        <QuickCategories />
        <ProductSection
          title="پیشنهاد شگفت‌انگیز"
          subtitle="فقط تا پایان امروز"
          products={flashProducts}
          variant="flash"
        />
        <PromoBanners />
        <ProductSection
          title="پرفروش‌ترین‌ها"
          subtitle="بر اساس نظر خریداران"
          products={bestSellers}
        />
        <TrustBadges />
        <ProductSection
          title="تازه‌های پارس کالا"
          subtitle="جدیدترین محصولات"
          products={newest}
        />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
