export default function PromoBanners() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2">
      <div className="flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 p-6 text-white shadow-md">
        <div>
          <span className="text-xs text-indigo-100">فقط امروز</span>
          <h3 className="mt-1 text-xl font-extrabold">تا ۳۰٪ تخفیف</h3>
          <p className="mt-1 text-xs text-indigo-100">روی لوازم جانبی موبایل</p>
          <button className="mt-3 rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50">
            خرید کنید
          </button>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-3xl font-black">
          ٪۳۰
        </div>
      </div>
      <div className="flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 to-pink-500 p-6 text-white shadow-md">
        <div>
          <span className="text-xs text-rose-100">پیشنهاد هفته</span>
          <h3 className="mt-1 text-xl font-extrabold">ارسال رایگان</h3>
          <p className="mt-1 text-xs text-rose-100">برای خرید بالای ۵ میلیون تومان</p>
          <button className="mt-3 rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-50">
            بیشتر بدانید
          </button>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-3xl">
          🚚
        </div>
      </div>
    </div>
  );
}
