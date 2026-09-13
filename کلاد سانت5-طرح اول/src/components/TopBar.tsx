import { Smartphone, Headphones, MapPin } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden bg-gray-900 text-gray-300 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Headphones size={14} className="text-red-500" />
            پشتیبانی ۲۴ ساعته: ۰۲۱-۹۱۰۵۰۰۰۰
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-red-500" />
            پیگیری سفارش
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="flex items-center gap-1.5 transition hover:text-white">
            <Smartphone size={14} className="text-red-500" />
            دانلود اپلیکیشن پارس کالا
          </a>
          <a href="#" className="transition hover:text-white">
            فروشندگان پارس کالا
          </a>
          <a href="#" className="transition hover:text-white">
            تماس با ما
          </a>
        </div>
      </div>
    </div>
  );
}
