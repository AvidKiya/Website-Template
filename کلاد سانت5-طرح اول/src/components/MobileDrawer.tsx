import { X, User, Phone } from "lucide-react";
import {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Tablet,
  Camera,
  Speaker,
  Gamepad2,
  Refrigerator,
  Briefcase,
} from "lucide-react";
import { categories } from "../data/store";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Tablet,
  Camera,
  Speaker,
  Gamepad2,
  Refrigerator,
  Briefcase,
};

export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute right-0 top-0 h-full w-72 max-w-[85%] transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-gradient-to-l from-red-600 to-orange-500 p-4 text-white">
          <div className="flex items-center gap-2">
            <User size={22} />
            <span className="text-sm font-bold">ورود / عضویت</span>
          </div>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
            <Phone size={16} className="text-red-500" />
            پشتیبانی ۲۴ ساعته: ۰۲۱-۹۱۰۵۰۰۰۰
          </div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">دسته‌بندی کالاها</h4>
          <ul className="divide-y divide-gray-100">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <li key={cat.id}>
                  <a
                    href="#"
                    className="flex items-center gap-3 py-3 text-sm text-gray-600 transition hover:text-red-600"
                  >
                    {Icon ? <Icon size={18} className="text-red-500" /> : null}
                    {cat.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
