import SafeImg from "./SafeImg";
import { circleCats, services, shopCats } from "../data/site";
import { toFa } from "../lib/utils";

export default function CategoryCircles() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 lg:px-6 mt-10">
      {/* circles */}
      <div className="rounded-3xl card-surface p-5 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[17px] lg:text-xl font-bold text-white">
              خرید بر اساس دسته‌بندی
            </h2>
            <p className="text-[12px] text-ink-400 mt-1">
              محبوب‌ترین دسته‌های فروشگاه پارس کالا
            </p>
          </div>
          <a href="#" className="text-[12.5px] text-brand-400 hover:text-brand-300">
            مشاهده همه دسته‌ها
          </a>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 lg:gap-6">
          {circleCats.map((c) => (
            <a key={c.fa} href="#" className="group flex flex-col items-center text-center">
              <div className="relative w-20 h-20 lg:w-[118px] lg:h-[118px] rounded-full p-[2px] bg-gradient-to-br from-ink-600 to-ink-800 group-hover:from-brand-500 group-hover:to-brand-700 transition-colors">
                <div className="w-full h-full rounded-full bg-ink-900 overflow-hidden grid place-items-center">
                  <SafeImg
                    src={c.img}
                    alt={c.fa}
                    contain
                    className="w-full h-full p-3 group-hover:scale-110 transition-transform duration-500"
                    wrapClassName="w-full h-full rounded-full"
                    fallbackText={c.fa}
                  />
                </div>
              </div>
              <p className="mt-3 text-[12.5px] text-ink-100 group-hover:text-brand-400 transition-colors">
                {c.fa}
              </p>
              <p className="text-[10px] text-ink-500 mt-0.5">{c.en}</p>
            </a>
          ))}
        </div>

        {/* chips */}
        <div className="mt-7 pt-6 border-t border-ink-800 flex flex-wrap gap-2">
          {shopCats.map((c) => (
            <a
              key={c.name}
              href="#"
              className="flex items-center gap-2 text-[12px] px-3 py-1.5 rounded-full border border-ink-700 bg-ink-850 text-ink-200 hover:border-brand-500/60 hover:text-white transition-colors"
            >
              {c.name}
              <span className="text-[10px] text-ink-500">{toFa(c.count)}</span>
            </a>
          ))}
        </div>
      </div>

      {/* services strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-4">
        {services.map((s) => (
          <div
            key={s.t}
            className="flex items-center gap-3 rounded-2xl card-surface px-4 py-4 hover:border-ink-500 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-ink-800 grid place-items-center shrink-0 overflow-hidden">
              <SafeImg
                src={s.img}
                alt={s.t}
                contain
                className="w-8 h-8"
                wrapClassName="w-12 h-12 rounded-2xl"
                fallbackText="★"
              />
            </div>
            <div>
              <p className="text-[13px] text-ink-100 font-medium">{s.t}</p>
              <p className="text-[11px] text-ink-400 mt-0.5">
                {
                  {
                    "ارسال سریع کالا": "تحویل ۲۴ ساعته",
                    "پرداخت در محل": "در تمام نقاط ایران",
                    "پشتیبانی تلفنی": "۷ روز هفته، ۲۴ ساعته",
                    "تضمین اصالت کالا": "۷ روز ضمانت بازگشت",
                  }[s.t]
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
