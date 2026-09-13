import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-lg", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-[14px] border border-[#e8e8e8] bg-white p-2.5">
      <Skeleton className="aspect-square w-full rounded-[10px]" />
      <div className="space-y-2 p-2">
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
