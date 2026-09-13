import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft, Star, Heart, ShoppingCart, Eye, Flame, ArrowLeft,
  Smartphone, Laptop, Watch, Headphones, Footprints, Briefcase, Shirt, Refrigerator,
  Timer, BadgePercent, Truck
} from "lucide-react";
import { products, categories, faNum, type Product } from "../data";

const catIcons: Record<string, any> = { Smartphone, Laptop, Watch, Headphones, Footprints, Briefcase, Shirt, Refrigerator };

/* ---------- countdown ---------- */
function useCountdown() {
  const [t, setT] = useState({ h: 14, m: 22, s: 45 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        let { h, m, s } = p;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return [pad(t.h), pad(t.m), pad(t.s)];
}

/* ---------- product card ---------- */
export function ProductCard({
  p, onAdd, onQuick, wished, onWish,
}: {
  p: Product; onAdd: (p: Product) => void; onQuick: (p: Product) => void;
  wished: boolean; onWish: (id: number) => void;
}) {
  return (
    <div className="group relative bg-[#1a1a24] border border-white/[0.07] hover:border-[#ef394e]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,.7)] flex flex-col">
      {/* image */}
      <div className="relative aspect-square overflow-hidden bg-[#20202c]">
        <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition" />
        {p.discount && (
          <span className="absolute top-2.5 right-2.5 text-[11px] font-black bg-[#ef394e] text-white px-2 py-1 rounded-lg shadow-lg">٪{faNum(p.discount)} تخفیف</span>
        )}
        {p.badge && (
          <span className="absolute top-2.5 left-2.5 text-[10.5px] font-bold bg-black/60 backdrop-blur border border-white/15 text-white px-2 py-1 rounded-lg">{p.badge}</span>
        )}
        <button onClick={() => onWish(p.id)} className={`absolute bottom-2.5 left-2.5 w-9 h-9 rounded-xl grid place-items-center backdrop-blur border transition ${wished ? "bg-[#ef394e] border-[#ef394e] text-white" : "bg-black/50 border-white/15 text-white hover:bg-[#ef394e]"}`}>
          <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
        </button>
        <button onClick={() => onQuick(p)} className="absolute bottom-2.5 right-2.5 h-9 px-3 rounded-xl bg-black/50 backdrop-blur border border-white/15 text-white text-[11.5px] font-bold hidden group-hover:flex items-center gap-1.5 hover:bg-white hover:text-black transition">
          <Eye className="w-4 h-4" /> مشاهده سریع
        </button>
      </div>
      {/* body */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[11px] text-zinc-500 font-medium">{p.brand}</p>
        <h3 onClick={() => onQuick(p)} className="text-[12.5px] leading-6 text-zinc-200 font-medium line-clamp-2 min-h-[48px] cursor-pointer hover:text-white transition">{p.title}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <Star className="w-3.5 h-3.5 fill-[#ffab00] text-[#ffab00]" />
          <span className="text-[11.5px] font-bold">{faNum(p.rating.toFixed(1))}</span>
          <span className="text-[11px] text-zinc-500">({faNum(p.comments)} دیدگاه)</span>
          {p.colors && (
            <span className="mr-auto flex items-center gap-1">
              {p.colors.slice(0, 3).map((c) => (
                <span key={c} className="w-3.5 h-3.5 rounded-full border border-white/25" style={{ background: c }} />
              ))}
            </span>
          )}
        </div>
        <div className="mt-auto pt-3 flex items-end justify-between gap-2">
          <div>
            {p.oldPrice && <p className="text-[11.5px] text-zinc-500 line-through">{faNum(p.oldPrice)} تومان</p>}
            <p className="text-[15px] font-black text-white">{faNum(p.price)} <span className="text-[11px] font-medium text-zinc-400">تومان</span></p>
          </div>
          <button onClick={() => onAdd(p)} className="w-10 h-10 rounded-xl bg-[#ef394e]/12 border border-[#ef394e]/25 text-[#ff6b7e] grid place-items-center hover:bg-[#ef394e] hover:text-white hover:shadow-[0_8px_20px_-6px_rgba(239,57,78,.6)] active:scale-90 transition-all">
            <ShoppingCart className="w-[18px] h-[18px]" />
          </button>
        </div>
        {p.soldPercent !== undefined && (
          <div className="mt-2.5">
            <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-l from-[#ef394e] to-[#ffab00]" style={{ width: `${p.soldPercent}%` }} />
            </div>
            <p className="text-[10.5px] text-zinc-500 mt-1">٪{faNum(p.soldPercent)} فروخته شده</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function SectionHead({ title, sub, link, hot }: { title: string; sub?: string; link?: string; hot?: boolean }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <span className={`w-1.5 h-9 rounded-full ${hot ? "bg-gradient-to-b from-[#ef394e] to-[#ffab00]" : "bg-gradient-to-b from-[#8b5cf6] to-[#3b82f6]"}`} />
        <div>
          <h2 className="text-[17px] md:text-[20px] font-black flex items-center gap-2">{hot && <Flame className="w-5 h-5 text-[#ef394e]" />} {title}</h2>
          {sub && <p className="text-[12px] text-zinc-500 mt-0.5">{sub}</p>}
        </div>
      </div>
      {link && (
        <a href="#products" className="text-[12.5px] font-bold text-zinc-300 hover:text-[#ef394e] flex items-center gap-1.5 border border-white/10 hover:border-[#ef394e]/40 rounded-xl px-3.5 py-2 transition bg-white/[0.03]">
          {link} <ArrowLeft className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

/* ---------- main sections ---------- */
type SecProps = {
  onAdd: (p: Product) => void;
  onQuick: (p: Product) => void;
  wishlist: number[];
  onWish: (id: number) => void;
};

export function TopSellers({ onQuick }: { onQuick: (p: Product) => void }) {
  const top = [...products].sort((a, b) => b.comments - a.comments).slice(0, 8);
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-8">
      <div className="bg-[#14141c] border border-white/[0.07] rounded-3xl p-5 md:p-6">
        <SectionHead title="پر فروش ترین محصولات" sub="بیشترین فروش در ۷ روز گذشته" link="مشاهده همه" hot />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
          {top.map((p, i) => (
            <button key={p.id} onClick={() => onQuick(p)} className="group flex items-center gap-3 text-right">
              <span className="text-[42px] md:text-[52px] font-black leading-none text-stroke group-hover:text-[#ef394e] transition-all shrink-0" style={{ WebkitTextStroke: "1.5px rgba(239,57,78,.55)" }}>{["۱","۲","۳","۴","۵","۶","۷","۸"][i]}</span>
              <img src={p.image} alt={p.title} className="w-[72px] h-[72px] rounded-2xl object-cover border border-white/10 shrink-0 group-hover:border-[#ef394e]/50 transition" />
              <span className="min-w-0">
                <span className="block text-[12px] leading-5 line-clamp-2 text-zinc-300 group-hover:text-white transition">{p.title}</span>
                <span className="block text-[12px] font-black mt-1">{faNum(p.price)} <span className="font-medium text-zinc-500 text-[10px]">تومان</span></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-8">
      <SectionHead title="دسته‌بندی‌های پارس کالا" sub="بیش از ۸٬۰۰۰ کالا در ۱۲۰ دسته‌بندی تخصصی" link="مشاهده همه" />
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {categories.map((c) => {
          const Icon = catIcons[c.icon] || Smartphone;
          return (
            <a key={c.id} href="#products" className="group flex flex-col items-center gap-2.5 p-3 rounded-2xl bg-[#14141c] border border-white/[0.07] hover:border-[#ef394e]/40 hover:-translate-y-1 transition-all">
              <span className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl overflow-hidden border border-white/10">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <span className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition" />
              </span>
              <span className="text-center"><span className="block text-[12px] md:text-[12.5px] font-bold group-hover:text-[#ff6b7e] transition">{c.title}</span><span className="hidden md:flex items-center justify-center gap-1 text-[10.5px] text-zinc-500 mt-0.5"><Icon className="w-3 h-3" /> {c.count}</span></span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function Amazing({ onAdd, onQuick, wishlist, onWish }: SecProps) {
  const [h, m, s] = useCountdown();
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * -560, behavior: "smooth" });
  const amazing = products.filter((p) => p.discount && p.discount >= 7).slice(0, 10);

  return (
    <section id="amazing" className="max-w-[1400px] mx-auto px-4 mt-8">
      <div className="relative rounded-3xl overflow-hidden border border-[#ef394e]/25 bg-gradient-to-l from-[#2b0a14] via-[#1a0f22] to-[#14141c] p-5 md:p-7">
        <div className="absolute -top-20 right-10 w-72 h-72 bg-[#ef394e]/20 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 left-10 w-72 h-72 bg-[#8b5cf6]/20 blur-[90px] rounded-full pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row gap-6">
          {/* countdown side */}
          <div className="lg:w-[260px] shrink-0 flex lg:flex-col items-center lg:items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[13px] font-bold text-[#ff8a9a]"><Flame className="w-5 h-5 text-[#ef394e]" /> پیشنهاد شگفت‌انگیز</p>
              <h2 className="text-[24px] md:text-[28px] font-black mt-2 leading-snug">تخفیف‌های باورنکردنی<br />پارس کالا</h2>
              <p className="text-[12.5px] text-zinc-400 mt-2">هر روز ساعت ۱۲ شب تمدید می‌شود</p>
            </div>
            <div>
              <p className="text-[12px] text-zinc-400 font-bold mb-2 flex items-center gap-1.5"><Timer className="w-4 h-4" /> زمان باقی مانده</p>
              <div className="flex items-center gap-2" dir="ltr">
                {[s, m, h].map((v, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-[54px] h-[60px] rounded-2xl bg-black/50 border border-white/12 grid place-items-center">
                      <div className="text-center"><p className="text-[22px] font-black tabular-nums leading-none">{v}</p><p className="text-[10px] text-zinc-500 mt-1">{["ثانیه", "دقیقه", "ساعت"][i]}</p></div>
                    </div>
                    {i < 2 && <span className="text-[20px] font-black text-[#ef394e]">:</span>}
                  </div>
                ))}
              </div>
              <div className="mt-4 hidden lg:flex items-center gap-2">
                <button onClick={() => scroll(1)} className="w-10 h-10 rounded-xl bg-white/[0.07] border border-white/12 grid place-items-center hover:bg-[#ef394e] transition"><ChevronLeft className="w-5 h-5 rotate-180" /></button>
                <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-xl bg-white/[0.07] border border-white/12 grid place-items-center hover:bg-[#ef394e] transition"><ChevronLeft className="w-5 h-5" /></button>
                <a href="#products" className="mr-2 text-[12.5px] font-bold text-white flex items-center gap-1 hover:text-[#ff8a9a]">مشاهده همه <ArrowLeft className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
          {/* carousel */}
          <div ref={ref} className="flex-1 flex gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 -mx-1 px-1">
            {amazing.map((p) => (
              <div key={p.id} className="min-w-[210px] md:min-w-[230px] max-w-[230px] snap-start">
                <ProductCard p={p} onAdd={onAdd} onQuick={onQuick} wished={wishlist.includes(p.id)} onWish={onWish} />
              </div>
            ))}
            <a href="#products" className="min-w-[150px] grid place-items-center rounded-2xl border-2 border-dashed border-white/15 text-zinc-300 hover:text-white hover:border-[#ef394e]/50 transition snap-start">
              <span className="text-center"><span className="w-12 h-12 mx-auto rounded-full bg-white/[0.07] grid place-items-center mb-2"><ArrowLeft className="w-5 h-5" /></span><span className="text-[13px] font-bold">مشاهده همه</span></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TripleBanners() {
  const items = [
    { tag: "بنر تبلیغاتی ۱", title: "موبایل قسطی بدون ضامن", desc: "پیش‌پرداخت ۳۰٪ + ۱۲ قسط", img: products[12].image, grad: "from-black/85 via-black/35 to-transparent", btn: "خرید قسطی" },
    { tag: "بنر تبلیغاتی ۲", title: "ساعت هوشمند سری ۹", desc: "ارسال رایگان امروز", img: products[2].image, grad: "from-[#2a0a3a]/90 via-black/40 to-transparent", btn: "مشاهده" },
    { tag: "بنر تبلیغاتی ۳", title: "هدفون حرفه‌ای سونی", desc: "حذف نویز + گارانتی", img: products[3].image, grad: "from-[#0a2a2a]/90 via-black/40 to-transparent", btn: "خرید حالا" },
  ];
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-8 grid md:grid-cols-3 gap-4">
      {items.map((b) => (
        <a key={b.title} href="#products" className="card-shine group relative rounded-3xl overflow-hidden border border-white/[0.07] h-[170px]">
          <img src={b.img} alt={b.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className={`absolute inset-0 bg-gradient-to-l ${b.grad}`} />
          <div className="relative p-5 h-full flex flex-col justify-center">
            <span className="text-[11px] font-bold text-zinc-300">{b.tag}</span>
            <p className="text-[17px] font-black mt-1">{b.title}</p>
            <p className="text-[12px] text-zinc-400">{b.desc}</p>
            <span className="mt-2.5 w-fit text-[11.5px] font-bold px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur border border-white/20 group-hover:bg-[#ef394e] group-hover:border-[#ef394e] transition">{b.btn}</span>
          </div>
        </a>
      ))}
    </section>
  );
}

export function BestSellers({ onAdd, onQuick, wishlist, onWish }: SecProps) {
  const [tab, setTab] = useState("all");
  const tabs = [
    { id: "all", t: "همه" },
    { id: "mobile", t: "موبایل" },
    { id: "audio", t: "صوتی" },
    { id: "shoes", t: "کفش" },
  ];
  const list = (tab === "all" ? products : products.filter((p) => p.category === tab)).slice(0, 10);
  return (
    <section id="products" className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-9 rounded-full bg-gradient-to-b from-[#ef394e] to-[#ffab00]" />
          <div>
            <h2 className="text-[17px] md:text-[20px] font-black flex items-center gap-2"><BadgePercent className="w-5 h-5 text-[#ffab00]" /> پر فروش ترین محصولات پارس کالا</h2>
            <p className="text-[12px] text-zinc-500 mt-0.5">انتخاب اول هزاران خریدار در هفته گذشته</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#14141c] border border-white/[0.07] rounded-2xl p-1.5">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`text-[12.5px] font-bold px-4 py-2 rounded-xl transition ${tab === t.id ? "bg-[#ef394e] text-white shadow" : "text-zinc-400 hover:text-white"}`}>{t.t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} onAdd={onAdd} onQuick={onQuick} wished={wishlist.includes(p.id)} onWish={onWish} />
        ))}
      </div>
    </section>
  );
}

export function WideBanner() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-8">
      <div className="card-shine relative rounded-3xl overflow-hidden border border-white/[0.07] min-h-[180px] md:min-h-[210px] grid md:grid-cols-2">
        <img src="https://images.pexels.com/photos/2047910/pexels-photo-2047910.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" className="absolute inset-0 w-full h-full object-cover" alt="بنر تبلیغاتی" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/55 to-black/10" />
        <div className="relative p-7 md:p-10 flex flex-col justify-center">
          <span className="text-[12px] font-bold text-[#ffab00]">بنر تبلیغاتی • فروش ویژه لپ‌تاپ</span>
          <p className="text-[22px] md:text-[30px] font-black mt-2">کارایی بهتر در اپلیکیشن پارس کالا</p>
          <p className="text-[13px] text-zinc-300 mt-2 leading-7">با نصب اپلیکیشن، ۲۰۰ هزار تومان تخفیف اولین خرید + ارسال رایگان بگیرید</p>
          <div className="mt-4 flex gap-2.5 flex-wrap">
            <button className="h-11 px-5 rounded-xl bg-white text-black text-[13px] font-bold flex items-center gap-2 hover:bg-[#ef394e] hover:text-white transition"><Smartphone className="w-4 h-4" /> دانلود اپلیکیشن</button>
            <button className="h-11 px-5 rounded-xl border border-white/25 text-[13px] font-bold hover:bg-white/10 transition flex items-center gap-2"><Truck className="w-4 h-4" /> شرایط ارسال</button>
          </div>
        </div>
        <div className="relative hidden md:flex items-center justify-center p-8">
          <div className="glass border border-white/15 rounded-3xl p-5 w-[280px] rotate-3 hover:rotate-0 transition duration-500">
            <img src={products[5].image} className="rounded-2xl h-40 w-full object-cover" alt="macbook" />
            <p className="text-[13px] font-bold mt-3">مک‌بوک پرو M3 با ۵٪ تخفیف</p>
            <p className="text-[12px] text-zinc-400 mt-1">فقط تا پایان امروز</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MensSection({ onAdd, onQuick, wishlist, onWish }: SecProps) {
  const [tab, setTab] = useState<"shoes" | "jacket" | "bag">("shoes");
  const meta = {
    shoes: { title: "کفش مردانه", img: "https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    jacket: { title: "ژاکت مردانه", img: "https://images.pexels.com/photos/7653833/pexels-photo-7653833.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
    bag: { title: "کیف مردانه", img: "https://images.pexels.com/photos/26965828/pexels-photo-26965828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  };
  const list = products.filter((p) => p.category === tab);
  const filled = [...list];
  while (filled.length < 4) filled.push(products[filled.length % products.length]);

  return (
    <section id="mens" className="max-w-[1400px] mx-auto px-4 mt-10">
      <SectionHead title="جدیدترین‌های مردانه" sub="کالکشن پاییزه با ضمانت مرجوعی ۷ روزه" link="مشاهده همه" />
      {/* tabs banner */}
      <div className="grid md:grid-cols-3 gap-4 mb-5">
        {(Object.keys(meta) as (keyof typeof meta)[]).map((k) => (
          <button key={k} onClick={() => setTab(k)} className={`group relative rounded-3xl overflow-hidden border h-[150px] text-right transition-all ${tab === k ? "border-[#ef394e]/60 shadow-[0_12px_30px_-10px_rgba(239,57,78,.5)]" : "border-white/[0.07] hover:border-white/20"}`}>
            <img src={meta[k].img} alt={meta[k].title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            <div className={`absolute inset-0 ${tab === k ? "bg-gradient-to-l from-[#ef394e]/70 via-black/50 to-black/20" : "bg-gradient-to-l from-black/80 via-black/40 to-transparent"}`} />
            <span className="relative p-5 h-full flex flex-col justify-center">
              <span className={`text-[15px] font-black ${tab === k ? "text-white" : "text-zinc-100"}`}>{meta[k].title}</span>
              <span className={`mt-2 w-fit text-[11.5px] font-bold px-3.5 py-1.5 rounded-lg transition ${tab === k ? "bg-white text-black" : "bg-white/15 backdrop-blur border border-white/20"}`}>{tab === k ? "✓ انتخاب شده" : "مشاهده کالکشن"}</span>
            </span>
          </button>
        ))}
      </div>
      <div key={tab} className="grid grid-cols-2 md:grid-cols-4 gap-3.5 animate-pop-in">
        {filled.slice(0, 4).map((p) => (
          <ProductCard key={`${tab}-${p.id}`} p={p} onAdd={onAdd} onQuick={onQuick} wished={wishlist.includes(p.id)} onWish={onWish} />
        ))}
      </div>
    </section>
  );
}

export function BrandStrip() {
  const row = [...useRef([]).current as never[]];
  void row;
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="bg-[#14141c] border border-white/[0.07] rounded-3xl p-5 overflow-hidden">
        <p className="text-[13px] font-bold text-zinc-300 mb-4 text-center">خرید از محبوب‌ترین برندها با ضمانت اصالت</p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar justify-start md:justify-center pb-1">
          {["سامسونگ", "اپل", "شیائومی", "سونی", "نایک", "آدیداس", "هواوی", "لنوو", "ایسوس", "جی‌بی‌ال"].map((b, i) => (
            <span key={b} className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#ef394e]/40 hover:bg-[#ef394e]/10 transition cursor-pointer text-[13px] font-bold">
              <span className="w-8 h-8 rounded-xl grid place-items-center text-[15px] font-black" style={{ background: `hsl(${(i * 37) % 360} 70% 50% / .18)`, color: `hsl(${(i * 37) % 360} 80% 70%)` }}>{b[0]}</span>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
