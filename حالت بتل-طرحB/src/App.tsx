import { RouterProvider, useRoute } from "./lib/router";
import { ShopProvider } from "./lib/store";
import { Header, BottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer, AuthModal, Toasts, UserFab } from "./components/Overlays";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import { Faq, Track, Contact } from "./pages/Static";

function Body() {
  const route = useRoute();
  const [first, second] = route.segments;

  let page: React.ReactNode;
  if (!first) page = <Home />;
  else if (first === "shop") page = <Shop />;
  else if (first === "product") page = <ProductPage id={second || ""} />;
  else if (first === "cart") page = <CartPage />;
  else if (first === "faq") page = <Faq />;
  else if (first === "track") page = <Track />;
  else if (first === "contact") page = <Contact />;
  else
    page = (
      <div className="mx-auto grid max-w-lg place-items-center gap-4 px-4 py-24 text-center">
        <span className="num text-6xl font-black text-pk">۴۰۴</span>
        <p className="text-[14px] font-black text-white">صفحه مورد نظر پیدا نشد</p>
        <a
          href="#/"
          className="rounded-2xl bg-pk px-6 py-3 text-[13px] font-black text-white"
        >
          بازگشت به خانه
        </a>
      </div>
    );

  return (
    <div className="min-h-screen bg-ink pb-16 sm:pb-0">
      <Header />
      <main key={route.path}>{page}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <RouterProvider>
        <Body />
        <CartDrawer />
        <AuthModal />
        <UserFab />
        <Toasts />
      </RouterProvider>
    </ShopProvider>
  );
}
