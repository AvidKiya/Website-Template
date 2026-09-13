import { Star, Heart, ShoppingCart } from "lucide-react";
import { Product } from "../data/store";

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex w-full shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {product.discount ? (
        <span className="absolute right-3 top-3 z-10 rounded-lg bg-red-600 px-2 py-1 text-xs font-bold text-white">
          {product.discount}٪
        </span>
      ) : null}
      <button className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 opacity-0 shadow transition hover:text-red-600 group-hover:opacity-100">
        <Heart size={16} />
      </button>
      {product.badge ? (
        <span className="absolute bottom-3 right-3 z-10 rounded-md bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-600">
          {product.badge}
        </span>
      ) : null}
      <div className="relative mb-3 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-44">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-1">
        <span className="text-[11px] font-medium text-gray-400">{product.brand}</span>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-700">
          {product.title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-amber-500">
          <Star size={14} fill="currentColor" strokeWidth={0} />
          <span className="text-xs font-bold text-gray-600">{product.rating}</span>
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>
        {product.installment ? (
          <span className="w-fit rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-bold text-teal-600">
            قابل خرید اقساطی
          </span>
        ) : null}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col items-start gap-1">
            {product.oldPrice ? (
              <span className="text-[11px] text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            ) : null}
            <span className="flex items-baseline gap-1 text-sm font-extrabold text-gray-800">
              {formatPrice(product.price)}
              <span className="text-[11px] font-normal text-gray-400">تومان</span>
            </span>
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
