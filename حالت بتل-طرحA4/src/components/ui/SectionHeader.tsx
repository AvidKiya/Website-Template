import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "مشاهده همه",
  dark,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4 md:mb-5", className)}>
      <div className="min-w-0">
        <h2
          className={cn(
            "text-[16px] font-bold leading-7 md:text-[19px]",
            dark ? "text-white" : "text-[#202020]",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={cn("mt-0.5 text-[12.5px]", dark ? "text-white/60" : "text-[#888]")}>
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {children}
        {href ? (
          <Link
            href={href}
            className={cn(
              "inline-flex items-center gap-1 text-[12.5px] font-medium transition-colors",
              dark ? "text-white/80 hover:text-white" : "text-[#555] hover:text-[#202020]",
            )}
          >
            {linkLabel}
            <ChevronLeft size={15} />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
