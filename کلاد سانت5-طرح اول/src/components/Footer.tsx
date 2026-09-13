import {
  Camera,
  Send as Telegram,
  MessageCircle,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const footerCols = [
  {
    title: "خدمات مشتریان",
    links: ["تماس با پارس کالا", "پیگیری سفارش", "راهنمای خرید", "شرایط بازگشت کالا", "سوالات متداول"],
  },
  {
    title: "همکاری با ما",
    links: ["فروش در پارس کالا", "تبلیغات", "استخدام", "درباره ما"],
  },
  {
    title: "دسته‌بندی‌ها",
    links: ["گوشی موبایل", "لپ‌تاپ", "ساعت هوشمند", "لوازم خانگی", "کیف و کوله"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-4 border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-500 text-lg font-black text-white">
              پ
            </div>
            <span className="text-lg font-extrabold text-gray-800">پارس کالا</span>
          </div>
          <p className="text-xs leading-6 text-gray-500">
            پارس کالا به عنوان یکی از قدیمی‌ترین فروشگاه‌های اینترنتی با بیش از یک دهه تجربه، با
            پایبندی به سه اصل پرداخت در محل، ۷ روز ضمانت بازگشت کالا و تضمین اصل‌بودن کالا، موفق
            شده تا همگام با فروشگاه‌های معتبر جهان، به یکی از بزرگ‌ترین فروشگاه‌های اینترنتی ایران
            تبدیل شود.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-600 hover:text-white">
              <Camera size={16} />
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-600 hover:text-white">
              <Telegram size={16} />
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-600 hover:text-white">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-bold text-gray-800">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-gray-500 transition hover:text-red-600">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">نماد‌های اعتماد</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-100 px-3 py-2 text-[11px] text-gray-500">
              <ShieldCheck size={18} className="text-emerald-500" />
              نماد اعتماد الکترونیکی
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-gray-100 px-3 py-2 text-[11px] text-gray-500">
              <BadgeCheck size={18} className="text-blue-500" />
              ساماندهی کسب و کار
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 text-center text-[11px] text-gray-400">
        کلیه حقوق مادی و معنوی این وب‌سایت متعلق به فروشگاه اینترنتی پارس کالا می‌باشد.
      </div>
    </footer>
  );
}
