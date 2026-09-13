import Link from "next/link";
import {
  Camera,
  Globe,
  Headphones,
  Lock,
  Mail,
  MapPin,
  RotateCcw,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { BRAND, footerColumns } from "@/data/navigation";

const trust = [
  { icon: ShieldCheck, title: "ضمانت اصالت کالا" },
  { icon: RotateCcw, title: "۷ روز ضمانت بازگشت" },
  { icon: Truck, title: "ارسال به سراسر کشور" },
  { icon: Lock, title: "پرداخت امن" },
  { icon: Headphones, title: "پشتیبانی ۲۴ ساعته" },
];

export function Footer() {
  return (
    <footer className="dark-scope mt-16 bg-[#252525] text-white/80">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-4 border-b border-white/8 py-7 md:grid-cols-5">
          {trust.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-2.5 text-[12px] text-white/70">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/12">
                <Icon size={17} />
              </span>
              {title}
            </div>
          ))}
        </div>

        <div className="grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-lg bg-white text-[15px] font-black text-[#252525]">
                Y
              </span>
              <span className="leading-4">
                <span className="block text-[14px] font-bold text-white">{BRAND.latin}</span>
                <span className="block text-[10.5px] text-white/50">{BRAND.name}</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[12.5px] leading-7 text-white/55">
              {BRAND.tagline}؛ مرجع خرید آنلاین پوشاک، کفش، ساعت و محصولات مراقبت شخصی با ضمانت
              اصالت کالا و امکان بازگشت هفت روزه.
            </p>
            <ul className="mt-5 space-y-2.5 text-[12.5px] text-white/60">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0" />
                {BRAND.address}
              </li>
              <li className="num flex items-center gap-2">
                <Headphones size={16} /> {BRAND.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> {BRAND.email}
              </li>
            </ul>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-3.5 text-[13px] font-bold text-white">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-[12.5px] text-white/55 transition-colors hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-white/8 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            {[Camera, Send, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="شبکه اجتماعی"
                className="grid size-9 place-items-center rounded-full border border-white/12 text-white/70 transition-colors hover:border-white/35 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {["نماد اعتماد", "ساماندهی", "اتحادیه"].map((item) => (
              <span
                key={item}
                className="grid h-14 w-16 place-items-center rounded-lg border border-white/10 bg-white/5 text-center text-[10px] leading-4 text-white/45"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="border-t border-white/8 py-5 text-center text-[11.5px] text-white/40">
          تمامی حقوق مادی و معنوی این وب‌سایت متعلق به {BRAND.name} است. © ۱۴۰۵
        </p>
      </div>
    </footer>
  );
}
