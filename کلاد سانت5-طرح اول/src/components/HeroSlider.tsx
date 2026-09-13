import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../data/store";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goto = (i: number) => setIndex((i + heroSlides.length) % heroSlides.length);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pt-4 lg:grid-cols-4">
      <div className="relative col-span-1 h-56 overflow-hidden rounded-2xl shadow-md sm:h-72 lg:col-span-3 lg:h-96">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 right-6 max-w-sm text-white sm:bottom-10 sm:right-10">
              <h2 className="mb-2 text-xl font-extrabold sm:text-3xl">{slide.title}</h2>
              <p className="mb-4 text-xs text-gray-200 sm:text-sm">{slide.subtitle}</p>
              <button className="rounded-lg bg-red-600 px-5 py-2 text-xs font-bold transition hover:bg-red-700 sm:text-sm">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => goto(index - 1)}
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow transition hover:bg-white"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => goto(index + 1)}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow transition hover:bg-white"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="col-span-1 grid grid-cols-2 gap-4 lg:grid-cols-1">
        <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-5 text-white shadow-md">
          <span className="text-xs text-gray-300">دانلود اپلیکیشن</span>
          <h3 className="mt-1 text-lg font-extrabold">پارس کالا</h3>
          <p className="mt-1 text-[11px] text-gray-400">
            خرید راحت‌تر با تخفیف ویژه اپلیکیشن
          </p>
          <button className="mt-3 w-fit rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-white/20">
            دریافت لینک دانلود
          </button>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-5 text-white shadow-md">
          <span className="text-xs text-teal-100">فروش اقساطی</span>
          <h3 className="mt-1 text-lg font-extrabold">بدون ضامن</h3>
          <p className="mt-1 text-[11px] text-teal-50">
            تا ۳۶ ماهه با کارمزد کم
          </p>
          <button className="mt-3 w-fit rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-white/25">
            بیشتر بدانید
          </button>
        </div>
      </div>
    </div>
  );
}
