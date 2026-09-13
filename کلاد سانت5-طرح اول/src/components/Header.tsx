import { Search, User, Heart, ShoppingCart, Menu } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6">
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <a href="#" className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-500 text-lg font-black text-white shadow-md shadow-red-200">
            پ
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-lg font-extrabold text-gray-800">پارس کالا</span>
            <span className="text-[10px] text-gray-400">فروشگاه اینترنتی</span>
          </div>
        </a>

        <div className="relative hidden flex-1 items-center md:flex">
          <input
            type="text"
            placeholder="جستجو در پارس کالا..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-11 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
          />
          <Search className="pointer-events-none absolute right-3.5 text-gray-400" size={18} />
          <button className="absolute left-1.5 rounded-lg bg-red-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-red-700">
            جستجو
          </button>
        </div>

        <div className="mr-auto flex items-center gap-1 sm:gap-2">
          <button className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 sm:flex">
            <User size={20} />
            <span className="hidden flex-col items-start leading-tight lg:flex">
              <span className="text-[11px] text-gray-400">ورود / عضویت</span>
              <span className="text-xs font-bold">حساب کاربری</span>
            </span>
          </button>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-50">
            <Heart size={20} />
            <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
              ۳
            </span>
          </button>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-50">
            <ShoppingCart size={20} />
            <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
              ۲
            </span>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 pb-3 pt-1 md:hidden">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="جستجو در پارس کالا..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-11 text-sm outline-none focus:border-red-400"
          />
          <Search className="pointer-events-none absolute right-3.5 text-gray-400" size={18} />
        </div>
      </div>
    </header>
  );
}
