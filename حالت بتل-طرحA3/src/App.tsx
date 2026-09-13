import { CartProvider } from "./cart";
import HeaderGroup from "./components/Header";
import Hero from "./components/Hero";
import { QuickView } from "./components/Product";
import {
  AboutText,
  AmazingOffers,
  BestSellers,
  Blog,
  Brands,
  Features,
  Newsletter,
  PromoBanners,
  Showcases,
  TrendingRail,
} from "./components/Sections";
import Footer, { BackToTop } from "./components/Footer";
import { CartDrawer, Toasts } from "./components/CartDrawer";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen overflow-x-clip">
        <HeaderGroup />
        <main>
          <Hero />
          <AmazingOffers />
          <PromoBanners />
          <BestSellers />
          <TrendingRail />
          <Showcases />
          <Brands />
          <Blog />
          <AboutText />
          <Features />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
        <QuickView />
        <Toasts />
        <BackToTop />
      </div>
    </CartProvider>
  );
}
