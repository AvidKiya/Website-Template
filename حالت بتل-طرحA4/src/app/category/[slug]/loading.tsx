import { ProductCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="container-x">
      <Skeleton className="my-4 h-4 w-52" />
      <Skeleton className="h-6 w-64" />
      <Skeleton className="mt-2 h-3 w-40" />

      <div className="mt-5 grid gap-6 lg:grid-cols-[248px_minmax(0,1fr)]">
        <Skeleton className="hidden h-[520px] rounded-[14px] lg:block" />
        <div>
          <Skeleton className="mb-4 h-14 rounded-[14px]" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
