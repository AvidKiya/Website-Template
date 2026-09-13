import { useState, useRef, useEffect } from "react";
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown,
  Phone, Mail, MapPin, Flame, Truck, ShieldCheck,
  Smartphone, Laptop, Watch, Headphones, Shirt, Lamp, Sparkles, Dumbbell,
  BadgePercent, House, Store, Newspaper, Headset
} from "lucide-react";
import { megaMenu, searchTrends } from "../data";

const iconMap: Record<string, any> = { Smartphone, Laptop, Watch, Headphones, Shirt, Lamp, Sparkles, Dumbbell };

export function TopBar() {
  return (
    <div className="bg-[#ef394e] text-white text-[12px] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-medium">
          <Truck className="w-4 h-4 shrink-0" />
          <span className="truncate">ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان | ۷ روز ضمانت بازگشت کالا</span>
        </div>
        <div className="hidden md:flex items-center gap-5 text-white/90">
          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> ۰۶۱-۵۳۵-۱۰۲۲۵</span>
          <span className="hidden lg:flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> info@parskala.com</span>
          <span className="hidden lg:flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> پیگیری سفارش</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: "radial-gradient(600px 40px at 20% 50%, white, transparent)" }} />
    </div>
  );
}

type HeaderProps = {
  cartCount: number;
  wishCount: number;
  query: string;
  setQuery: (q: string) => void;
  onCart: () => void;
  onLogin: () => void;
  onSearchSubmit: (q: string) => void;
};

export function Header({ cartCount, wishCount, query, setQuery, onCart, onLogin, onSearchSubmit }: HeaderProps) {
  const [focused, setFocused] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setFocused(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = searchTrends.filter((t) => !query || t.includes(query));

  return (
    <header className="sticky top-0 z-40">
      {/* main header */}
      <div className="bg-[#101016]/95 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-[1400px] mx-auto px-4 py-3.5 flex items-center gap-3 lg:gap-8">
          {/* mobile hamburger */}
          <button onClick={() => setMobileMenu(true)} className="lg:hidden w-10 h-10 grid place-items-center rounded-xl bg-white/[0.06] border border-white/10">
            <Menu className="w-5 h-5" />
          </button>

          {/* logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <span className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ef394e] to-[#ff6a3d] grid place-items-center shadow-[0_8px_24px_-6px_rgba(239,57,78,.6)] group-hover:scale-105 transition">
              <Store className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-[#ffab00] rounded-full border-2 border-[#101016]" />
            </span>
            <span className="leading-tight">
              <span className="block text-[20px] font-black tracking-tight">پارس <span className="text-[#ef394e]">کالا</span></span>
              <span className="block text-[10.5px] text-zinc-400 font-medium">بررسی، انتخاب و خرید آنلاین</span>
            </span>
          </a>

          {/* search */}
          <div ref={boxRef} className="flex-1 max-w-[640px] relative hidden sm:block">
            <div className={`flex items-center bg-[#1a1a24] border rounded-2xl overflow-hidden transition-all ${focused ? "border-[#ef394e]/60 shadow-[0_0_0_4px_rgba(239,57,78,.12)]" : "border-white/10"}`}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onKeyDown={(e) => { if (e.key === "Enter") { onSearchSubmit(query); setFocused(false); } }}
                placeholder="جستجو... آیفون، اپل واچ، کفش مردانه و..."
                className="flex-1 bg-transparent px-5 h-[46px] text-[14px] outline-none placeholder:text-zinc-500"
              />
              {query && (
                <button onClick={() => setQuery("")} className="p-1.5 mr-1 rounded-full hover:bg-white/10"><X className="w-4 h-4 text-zinc-400" /></button>
              )}
              <button onClick={() => onSearchSubmit(query)} className="m-1.5 h-[36px] px-5 rounded-xl bg-[#ef394e] hover:bg-[#d92d42] text-white text-[13px] font-bold flex items-center gap-2 transition">
                <Search className="w-4 h-4" /> <span className="hidden md:inline">جستجو</span>
              </button>
            </div>
            {focused && (
              <div className="absolute top-[54px] right-0 left-0 bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-3 animate-pop-in z-50">
                <p className="text-[12px] text-zinc-400 px-2 pb-2 flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-[#ffab00]" /> جستجوهای پرطرفدار</p>
                <div className="flex flex-wrap gap-2">
                  {filtered.map((t) => (
                    <button key={t} onClick={() => { setQuery(t); onSearchSubmit(t); setFocused(false); }} className="text-[12.5px] px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 hover:border-[#ef394e]/50 hover:text-white text-zinc-300 transition">
                      {t}
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.07] space-y-1">
                  {["ساعت هوشمند اپل واچ سری 7", "گوشی موبایل سامسونگ مدل Galaxy S23 Plus"].map((s) => (
                    <button key={s} onClick={() => { setQuery(s); onSearchSubmit(s); setFocused(false); }} className="w-full text-right px-3 py-2 rounded-xl hover:bg-white/[0.05] text-[13px] text-zinc-300 flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-zinc-500" /> {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* actions */}
          <div className="flex items-center gap-2 mr-auto">
            <button onClick={onLogin} className="hidden md:flex items-center gap-2 h-[46px] px-5 rounded-2xl border border-white/12 bg-white/[0.04] hover:bg-white/[0.08] text-[13px] font-bold transition">
              <User className="w-[18px] h-[18px]" /> ورود | ثبت‌نام
            </button>
            <button className="relative w-[46px] h-[46px] grid place-items-center rounded-2xl border border-white/12 bg-white/[0.04] hover:bg-white/[0.08] transition">
              <Heart className="w-5 h-5" />
              {wishCount > 0 && <span className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#8b5cf6] text-[11px] font-bold grid place-items-center">{wishCount}</span>}
            </button>
            <button onClick={onCart} className="relative h-[46px] px-4 flex items-center gap-2 rounded-2xl bg-[#ef394e] hover:bg-[#d92d42] shadow-[0_8px_20px_-6px_rgba(239,57,78,.55)] transition font-bold text-[13px]">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden xl:inline">سبد خرید</span>
              {cartCount > 0 && <span className="absolute -top-2 -left-2 min-w-[22px] h-[22px] px-1 rounded-full bg-[#ffab00] text-black text-[12px] font-black grid place-items-center border-2 border-[#101016]">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <div className="flex items-center bg-[#1a1a24] border border-white/10 rounded-xl overflow-hidden">
            <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearchSubmit(query)} placeholder="جستجو در پارس کالا..." className="flex-1 bg-transparent px-4 h-[42px] text-[13px] outline-none" />
            <button onClick={() => onSearchSubmit(query)} className="m-1 w-9 h-9 grid place-items-center rounded-lg bg-[#ef394e]"><Search className="w-4 h-4 text-white" /></button>
          </div>
        </div>
      </div>

      {/* nav */}
      <nav className="hidden lg:block bg-[#14141c]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-1 h-[52px] text-[13.5px] font-medium">
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className={`flex items-center gap-2 px-4 h-10 rounded-xl font-bold transition ${megaOpen ? "bg-[#ef394e] text-white" : "bg-white/[0.06] hover:bg-white/[0.1]"}`}>
              <Menu className="w-4.5 h-4.5 w-5 h-5" /> دسته‌بندی کالاها <ChevronDown className={`w-4 h-4 transition ${megaOpen ? "rotate-180" : ""}`} />
            </button>
            {megaOpen && (
              <div className="absolute top-[46px] right-0 w-[640px] bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl shadow-black/70 p-5 grid grid-cols-3 gap-5 animate-pop-in z-50">
                {megaMenu.map((m) => {
                  const Icon = iconMap[m.icon] || Smartphone;
                  return (
                    <div key={m.title}>
                      <p className="flex items-center gap-2 text-[13px] font-bold text-white mb-2.5 pb-2 border-b border-white/[0.08]"><span className="w-7 h-7 rounded-lg bg-[#ef394e]/15 text-[#ff6b7e] grid place-items-center"><Icon className="w-4 h-4" /></span>{m.title}</p>
                      <ul className="space-y-1.5">
                        {m.subs.map((s) => (
                          <li key={s}><a href="#products" className="text-[12.5px] text-zinc-400 hover:text-[#ef394e] hover:pr-1 transition-all">{s}</a></li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                <div className="col-span-3 mt-1 rounded-xl bg-gradient-to-l from-[#ef394e]/15 to-[#8b5cf6]/15 border border-white/10 p-3 flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2"><BadgePercent className="w-4 h-4 text-[#ffab00]" /> جشنواره تابستانه تا ۴۰٪ تخفیف روی همه دسته‌ها</span>
                  <span className="text-[#ef394e] font-bold">مشاهده همه ←</span>
                </div>
              </div>
            )}
          </div>
          <span className="w-px h-6 bg-white/10 mx-2" />
          {[
            { t: "خانه", icon: House },
            { t: "فروشگاه", icon: Store },
            { t: "پیشنهاد شگفت‌انگیز", icon: Flame, hot: true },
            { t: "پرفروش‌ترین‌ها", icon: BadgePercent },
            { t: "وبلاگ", icon: Newspaper },
            { t: "تماس با ما", icon: Headset },
          ].map((l) => (
            <a key={l.t} href="#products" className={`flex items-center gap-1.5 px-3.5 h-10 rounded-xl transition whitespace-nowrap ${l.hot ? "text-[#ff6b7e] font-bold hover:bg-[#ef394e]/10" : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"}`}>
              <l.icon className="w-4 h-4" /> {l.t}
              {l.hot && <span className="text-[10px] bg-[#ef394e] text-white px-1.5 py-0.5 rounded-md font-bold">داغ</span>}
            </a>
          ))}
          <span className="mr-auto flex items-center gap-2 text-zinc-400 text-[12.5px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> تضمین اصالت و سلامت کالا
          </span>
        </div>
      </nav>

      {/* mobile drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-[300px] bg-[#14141c] border-l border-white/10 p-5 overflow-y-auto animate-pop-in">
            <div className="flex items-center justify-between mb-5">
              <span className="font-black text-lg">پارس <span className="text-[#ef394e]">کالا</span></span>
              <button onClick={() => setMobileMenu(false)} className="w-9 h-9 grid place-items-center rounded-xl bg-white/[0.06]"><X className="w-5 h-5" /></button>
            </div>
            <button onClick={() => { setMobileMenu(false); onLogin(); }} className="w-full h-11 rounded-xl bg-[#ef394e] font-bold text-[13px] mb-4">ورود | ثبت‌نام</button>
            <div className="space-y-1">
              {["خانه", "فروشگاه", "پیشنهاد شگفت‌انگیز", "پرفروش‌ترین‌ها", "وبلاگ", "تماس با ما"].map((t) => (
                <a key={t} href="#products" onClick={() => setMobileMenu(false)} className="block px-3 py-2.5 rounded-xl text-[13.5px] text-zinc-200 hover:bg-white/[0.06]">{t}</a>
              ))}
            </div>
            <p className="text-[12px] text-zinc-500 font-bold mt-5 mb-2">دسته‌بندی‌ها</p>
            <div className="space-y-1">
              {megaMenu.map((m) => (
                <div key={m.title} className="px-3 py-2.5 rounded-xl bg-white/[0.04] text-[13px]">{m.title}</div>
              ))}
            </div>
            <div className="mt-5 text-[12px] text-zinc-400 space-y-2 border-t border-white/10 pt-4">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> ۰۶۱-۵۳۵-۱۰۲۲۵</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@parskala.com</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
