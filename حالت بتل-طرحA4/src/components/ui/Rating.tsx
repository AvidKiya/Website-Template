import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/utils";

export function Rating({
  value,
  size = 13,
  showValue = true,
  count,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 text-[12px] text-[#777]", className)}>
      <Star size={size} className="fill-[#f5a623] text-[#f5a623]" aria-hidden />
      {showValue ? (
        <span className="num text-[#202020]">{toPersianDigits(value.toFixed(1))}</span>
      ) : null}
      {count != null ? (
        <span className="num text-[#999]">({toPersianDigits(count)})</span>
      ) : null}
    </div>
  );
}

export function Stars({ value, size = 15 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`امتیاز ${value} از ۵`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i <= Math.round(value)
              ? "fill-[#f5a623] text-[#f5a623]"
              : "fill-[#ececec] text-[#ececec]",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
