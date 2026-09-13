import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, toPersianDigits } from "@/lib/utils";

export function Pagination({
  page,
  pageCount,
  buildHref,
}: {
  page: number;
  pageCount: number;
  buildHref: (page: number) => string;
}) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1,
  );

  return (
    <nav aria-label="صفحه‌بندی" className="mt-8 flex items-center justify-center gap-1.5">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-label="صفحه قبل"
        aria-disabled={page === 1}
        className={cn(
          "grid size-9 place-items-center rounded-lg border border-[#e8e8e8] text-[#555] transition-colors hover:border-[#252525]",
          page === 1 && "pointer-events-none opacity-40",
        )}
      >
        <ChevronRight size={16} />
      </Link>

      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i > 0 && p - pages[i - 1] > 1 ? <span className="text-[#bbb]">…</span> : null}
          <Link
            href={buildHref(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "num grid size-9 place-items-center rounded-lg border text-[12.5px] transition-colors",
              p === page
                ? "border-[#252525] bg-[#252525] text-white"
                : "border-[#e8e8e8] text-[#555] hover:border-[#252525]",
            )}
          >
            {toPersianDigits(p)}
          </Link>
        </span>
      ))}

      <Link
        href={buildHref(Math.min(pageCount, page + 1))}
        aria-label="صفحه بعد"
        aria-disabled={page === pageCount}
        className={cn(
          "grid size-9 place-items-center rounded-lg border border-[#e8e8e8] text-[#555] transition-colors hover:border-[#252525]",
          page === pageCount && "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft size={16} />
      </Link>
    </nav>
  );
}
