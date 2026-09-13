import { useState } from "react";
import { Phone, Clock, Send, Store, ShieldCheck, Truck, BadgeCheck, ChevronUp, MapPin, CreditCard, Globe, MessageCircle, Share2 } from "lucide-react";

export function Newsletter({ onToast }: { onToast: (msg: string, ok: boolean) => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    const v = val.trim();
    const mobile = /^09\d{9}$/.test(v.replace(/[\s-]/g, "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))));
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!mobile && !email) {
      setErr("شماره موبایل یا ایمیل نامعتبر است");
      return;
    }
    setErr("");
    onToast("عضویت شما با موفقیت ثبت شد! کد تخفیف پیامک شد.", true);
    setVal("");
  };
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-l from-[#ef394e] via-[#c81e3a] to-[#4c0f22] p-7 md:p-10">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="relative grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-[20px] md:text-[24px] font-black leading-snug">شماره همراه خود را وارد کنید تا آخرین تخفیفات سایت در لحظه پیامک شود.</h3>
            <p className="text-[13px] text-white/80 mt-2">عضویت در باشگاه مشتریان + ۱۵۰ هزار تومان بن خرید هدیه</p>
          </div>
          <div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur border border-white/20 rounded-2xl p-1.5">
              <input
                value={val}
                onChange={(e) => { setVal(e.target.value); setErr(""); }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="شماره موبایل یا ایمیل شما..."
                className="flex-1 bg-transparent px-4 h-[46px] text-[14px] outline-none placeholder:text-white/50 text-white"
              />
              <button onClick={submit} className="h-[46px] px-6 rounded-xl bg-white text-black text-[13.5px] font-black flex items-center gap-2 hover:bg-black hover:text-white transition shrink-0">
                <Send className="w-4 h-4" /> عضویت
              </button>
            </div>
            {err ? (
              <p className="mt-2 text-[12.5px] font-bold bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-white animate-pop-in">⚠ {err}</p>
            ) : (
              <p className="mt-2 text-[11.5px] text-white/60">با عضویت، قوانین و حریم خصوصی پارس کالا را می‌پذیرید.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ onTop }: { onTop: () => void }) {
  return (
    <footer className="mt-10 border-t border-white/[0.07] bg-[#0e0e14]">
      {/* support strip */}
      <div className="max-w-[1400px] mx-auto px-4 py-8 grid md:grid-cols-4 gap-6 border-b border-white/[0.06]">
        <div>
          <p className="font-black text-[15px] flex items-center gap-2"><span className="w-8 h-8 rounded-xl bg-[#ef394e]/15 text-[#ff6b7e] grid place-items-center"><Phone className="w-4 h-4" /></span> پاسخگوی شما هستیم</p>
          <p className="text-[12.5px] text-zinc-400 mt-3 leading-7">هفت روز هفته، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم. از جدیدترین تخفیفات ما خبردار شوید...</p>
          <p className="mt-3 text-[13px] font-bold" dir="ltr">۰۶۱-۵۳۵-۱۰۲۲۵</p>
          <p className="text-[12.5px] text-zinc-400 mt-1" dir="ltr">info@parskala.com</p>
        </div>
        <div>
          <p className="font-black text-[14px] mb-3">فروشگاه پارس کالا</p>
          <ul className="space-y-2.5 text-[12.5px] text-zinc-400">
            {["درباره ما", "فرصت‌های شغلی", "تماس با ما", "وبلاگ پارس کالا", "فروشنده شوید", "قوانین و مقررات"].map((l) => (
              <li key={l}><a href="#" className="hover:text-[#ff6b7e] hover:pr-1 transition-all">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-black text-[14px] mb-3">پشتیبانی</p>
          <ul className="space-y-2.5 text-[12.5px] text-zinc-400">
            {["پیگیری سفارش", "رویه بازگرداندن کالا", "شرایط گارانتی", "پاسخ به پرسش‌های متداول", "شرایط ارسال", "حریم خصوصی"].map((l) => (
              <li key={l}><a href="#" className="hover:text-[#ff6b7e] hover:pr-1 transition-all">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-black text-[14px] mb-3">دانلود اپلیکیشن</p>
          <div className="grid grid-cols-2 gap-2">
            {["گوگل‌پلی", "کافه‌بازار", "مایکت", "اپ‌استور"].map((s) => (
              <button key={s} className="h-11 rounded-xl bg-white/[0.06] border border-white/10 text-[12px] font-bold hover:bg-white hover:text-black transition flex items-center justify-center gap-1.5">⬇ {s}</button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            {[Globe, MessageCircle, Share2].map((Icon, i) => (
              <button key={i} className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 grid place-items-center hover:bg-[#ef394e] hover:border-[#ef394e] transition"><Icon className="w-5 h-5" /></button>
            ))}
          </div>
        </div>
      </div>

      {/* trust */}
      <div className="max-w-[1400px] mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Truck, t: "امکان تحویل اکسپرس" },
          { icon: CreditCard, t: "امکان پرداخت در محل" },
          { icon: ShieldCheck, t: "۷ روز ضمانت بازگشت کالا" },
          { icon: BadgeCheck, t: "تضمین اصل بودن کالا" },
        ].map((f) => (
          <div key={f.t} className="flex items-center justify-center gap-2 text-[12.5px] text-zinc-300 bg-white/[0.03] border border-white/[0.06] rounded-2xl py-3.5"><f.icon className="w-5 h-5 text-zinc-500" /> {f.t}</div>
        ))}
      </div>

      {/* about */}
      <div className="max-w-[1400px] mx-auto px-4 pb-6">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 grid md:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <p className="font-black text-[14px] flex items-center gap-2"><Store className="w-5 h-5 text-[#ef394e]" /> فروشگاه اینترنتی پارس کالا، بررسی، انتخاب و خرید آنلاین</p>
            <p className="text-[12px] text-zinc-500 leading-7 mt-2">پارس کالا به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی با بیش از یک دهه تجربه، با پایبندی به سه اصل، پرداخت در محل، ۷ روز ضمانت بازگشت کالا و تضمین اصل‌بودن کالا موفق شده تا همگام با فروشگاه‌های معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی ایران تبدیل شود.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <span className="w-[74px] h-[74px] rounded-2xl bg-white/[0.05] border border-white/10 grid place-items-center text-[10px] text-zinc-500 text-center leading-4">نماد<br />اعتماد</span>
            <span className="w-[74px] h-[74px] rounded-2xl bg-white/[0.05] border border-white/10 grid place-items-center text-[10px] text-zinc-500 text-center leading-4">ساماندهی<br />رسانه</span>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-wrap items-center gap-3 text-[12px] text-zinc-500">
          <span>© ۱۴۰۳ فروشگاه پارس کالا — تمامی حقوق محفوظ است.</span>
          <span className="mr-auto flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> هفت روز هفته، ۲۴ ساعته پاسخگوییم <MapPin className="w-3.5 h-3.5" /> تهران، خیابان ولیعصر</span>
          <button onClick={onTop} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-[#ef394e] hover:text-white hover:border-[#ef394e] transition font-bold text-zinc-300"><ChevronUp className="w-4 h-4" /> بازگشت به بالا</button>
        </div>
      </div>
    </footer>
  );
}
