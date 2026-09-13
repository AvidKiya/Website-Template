import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export type Crumb = { title: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ title: "خانه", href: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      item: item.href ? `https://yourbrand.example${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="مسیر صفحه" className="py-3">
      <ol className="hide-scrollbar flex items-center gap-1 overflow-x-auto text-[11.5px] text-[#999]">
        <li className="shrink-0">
          <Link href="/" className="transition-colors hover:text-[#202020]">
            خانه
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex shrink-0 items-center gap-1">
            <ChevronLeft size={13} className="text-[#ccc]" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-[#202020]">
                {item.title}
              </Link>
            ) : (
              <span className="text-[#555]">{item.title}</span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </nav>
  );
}
