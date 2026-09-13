import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, BadgeCheck, Headset, ArrowLeft, Timer } from "lucide-react";
import { heroSlides } from "../data";

export function Hero({ onShop }: { onShop: () => void }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const s = heroSlides[idx];

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-4">
      <div className="grid lg:grid-cols-3 gap-4">
        {/* main slider */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={`lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[340px] md:min-h-[400px] bg-gradient-to-l ${s.bg} border border-white/[0.07] transition-all duration-700`}
        >
          {/* glow blobs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[100px] opacity-30 transition-colors duration-700" style={{ background: s.accent }} />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-[#ef394e]/20 blur-[90px]" />

          <div className="relative z-10 grid md:grid-cols-2 h-full">
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <span key={`tag-${s.id}`} className="animate-ticker w-fit text-[12px] font-bold px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: s.accent }} /> {s.tag}
              </span>
              <h1 key={`t-${s.id}`} className="animate-ticker mt-4 text-[28px] md:text-[42px] font-black leading-[1.25]" style={{ animationDelay: ".06s" }}>
                {s.title}
                <span className="block text-[16px] md:text-[20px] font-bold text-zinc-300 mt-1">{s.subtitle}</span>
              </h1>
              <p key={`d-${s.id}`} className="animate-ticker mt-3 text-[13px] md:text-[14px] text-zinc-400 leading-7" style={{ animationDelay: ".12s" }}>{s.desc}</p>
              <div className="mt-5 flex items-center gap-4 flex-wrap">
                <button onClick={onShop} className="h-[46px] px-7 rounded-2xl font-bold text-[14px] text-white flex items-center gap-2 hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg" style={{ background: `linear-gradient(135deg, ${s.accent}, #ef394e)`, boxShadow: `0 12px 30px -8px ${s.accent}66` }}>
                  {s.cta} <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <p className="text-[11px] text-zinc-400">قیمت ویژه امروز</p>
                  <p className="text-[18px] font-black text-white">{s.price}</p>
                </div>
              </div>
              {/* dots */}
              <div className="mt-7 flex items-center gap-2">
                {heroSlides.map((sl, i) => (
                  <button key={sl.id} onClick={() => setIdx(i)} className={`hero-dot h-2 rounded-full ${i === idx ? "active bg-[#ef394e]" : "w-2 bg-white/20 hover:bg-white/40"}`} />
                ))}
                <span className="mr-3 text-[11px] text-zinc-500 flex items-center gap-1"><Timer className="w-3.5 h-3.5" /> اسلایدر خودکار</span>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div key={s.id} className="absolute inset-6 rounded-3xl overflow-hidden border border-white/15 shadow-2xl animate-pop-in">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 glass rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-bold">ارسال فوری به سراسر کشور</p>
                    <p className="text-[11px] text-zinc-400">پرداخت در محل فعال است</p>
                  </div>
                  <span className="text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg">موجود</span>
                </div>
              </div>
              {/* floating discount */}
              <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-[#ef394e] grid place-items-center rotate-[-12deg] shadow-[0_10px_30px_-5px_rgba(239,57,78,.7)] animate-[float-slow_3s_ease-in-out_infinite] z-10">
                <div className="text-center leading-tight">
                  <p className="text-[18px] font-black">٪۲۵</p>
                  <p className="text-[10px] font-bold">تخفیف</p>
                </div>
              </div>
            </div>
          </div>

          {/* arrows */}
          <button onClick={() => setIdx((idx + 1) % heroSlides.length)} className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-full glass border border-white/15 grid place-items-center hover:bg-[#ef394e] transition z-20"><ChevronRight className="w-5 h-5" /></button>
          <button onClick={() => setIdx((idx + heroSlides.length - 1) % heroSlides.length)} className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 rounded-full glass border border-white/15 grid place-items-center hover:bg-[#ef394e] transition z-20"><ChevronLeft className="w-5 h-5" /></button>
        </div>

        {/* side banners */}
        <div className="grid grid-rows-2 gap-4">
          <a href="#amazing" className="card-shine group relative rounded-3xl overflow-hidden border border-white/[0.07] min-h-[160px]">
            <img src="https://images.pexels.com/photos/1619655/pexels-photo-1619655.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="بنر تبلیغاتی 1" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/30 to-transparent" />
            <div className="relative p-5 h-full flex flex-col justify-center">
              <span className="text-[11px] font-bold text-[#ffab00]">بنر تبلیغاتی ۱</span>
              <p className="text-[18px] font-black mt-1">اکسسوری چرم مردانه</p>
              <p className="text-[12px] text-zinc-300 mt-1">تا ۳۰٪ تخفیف + ارسال رایگان</p>
              <span className="mt-3 w-fit text-[12px] font-bold px-4 py-2 rounded-xl bg-white text-black group-hover:bg-[#ef394e] group-hover:text-white transition">مشاهده و خرید</span>
            </div>
          </a>
          <a href="#mens" className="card-shine group relative rounded-3xl overflow-hidden border border-white/[0.07] min-h-[160px]">
            <img src="https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="بنر تبلیغاتی 2" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#1a0f3a]/90 via-black/40 to-transparent" />
            <div className="relative p-5 h-full flex flex-col justify-center">
              <span className="text-[11px] font-bold text-violet-300">بنر تبلیغاتی ۲</span>
              <p className="text-[18px] font-black mt-1">لپ‌تاپ و دنیای دیجیتال</p>
              <p className="text-[12px] text-zinc-300 mt-1">قسطی بدون بهره با ضمانت شرکتی</p>
              <span className="mt-3 w-fit text-[12px] font-bold px-4 py-2 rounded-xl bg-[#8b5cf6] text-white group-hover:bg-white group-hover:text-black transition">همین حالا ببین</span>
            </div>
          </a>
        </div>
      </div>

      {/* features */}
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Truck, t: "ارسال سریع سراسری", d: "پرداخت در محل", c: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
          { icon: ShieldCheck, t: "۷ روز ضمانت بازگشت", d: "بدون قید و شرط", c: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
          { icon: BadgeCheck, t: "تضمین اصل بودن کالا", d: "گارانتی معتبر شرکتی", c: "text-[#ffab00] bg-amber-500/10 border-amber-500/20" },
          { icon: Headset, t: "پشتیبانی ۲۴/۷", d: "هفت روز هفته پاسخگو", c: "text-[#ff6b7e] bg-rose-500/10 border-rose-500/20" },
        ].map((f) => (
          <div key={f.t} className="flex items-center gap-3 bg-[#14141c] border border-white/[0.07] rounded-2xl px-4 py-3.5 hover:border-white/20 hover:-translate-y-0.5 transition-all">
            <span className={`w-11 h-11 rounded-xl border grid place-items-center shrink-0 ${f.c}`}><f.icon className="w-5 h-5" /></span>
            <span><span className="block text-[13px] font-bold">{f.t}</span><span className="block text-[11.5px] text-zinc-500">{f.d}</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}
