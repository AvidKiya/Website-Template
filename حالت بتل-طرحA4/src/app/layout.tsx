import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { StoreProvider } from "@/store/store-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { BRAND } from "@/data/navigation";

const siteUrl = "https://yourbrand.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} | فروشگاه اینترنتی مد، پوشاک و لایف‌استایل`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "خرید آنلاین پوشاک، کفش، کیف، ساعت و محصولات آرایشی بهداشتی با ضمانت اصالت کالا، ارسال سریع به سراسر ایران و امکان بازگشت هفت روزه.",
  keywords: ["فروشگاه اینترنتی", "خرید پوشاک", "کفش", "ساعت مچی", "لوازم آرایشی", "یور برند"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: BRAND.name,
    title: `${BRAND.name} | فروشگاه اینترنتی مد و لایف‌استایل`,
    description:
      "خرید آنلاین پوشاک، کفش، کیف، ساعت و محصولات آرایشی بهداشتی با ضمانت اصالت کالا و ارسال سریع.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#252525",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: BRAND.name,
  alternateName: BRAND.latin,
  url: siteUrl,
  telephone: BRAND.phone,
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "تهران",
    addressCountry: "IR",
    streetAddress: BRAND.address,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* fallback CDN so Persian typography stays intact if one provider is unreachable */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/vazirmatn@33.0.3/Vazirmatn-font-face.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-white text-[#202020] antialiased">
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:z-[200] focus:rounded-lg focus:bg-[#252525] focus:px-4 focus:py-2 focus:text-white"
          >
            رفتن به محتوای اصلی
          </a>
          <Header />
          <main id="main" className="pb-[58px] lg:pb-0">
            {children}
          </main>
          <Footer />
          <MobileTabBar />
        </StoreProvider>
      </body>
    </html>
  );
}
