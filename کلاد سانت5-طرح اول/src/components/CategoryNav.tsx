import { useState } from "react";
import {
  Menu,
  ChevronDown,
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
  Percent,
  Truck,
} from "lucide-react";
import { categories, megaMenu } from "../data/store";

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

export default function CategoryNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative hidden border-b border-gray-100 bg-white lg:block">
      <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button className="flex items-center gap-2 rounded-t-lg bg-red-600 px-4 py-3 text-sm font-bold text-white">
            <Menu size={18} />
            همه دسته‌بندی‌ها
            <ChevronDown size={14} />
          </button>

          {open && (
            <div className="absolute right-0 top-full z-30 flex w-[720px] gap-6 rounded-b-xl rounded-tl-xl border border-gray-100 bg-white p-6 shadow-2xl">
              {megaMenu.map((col) => (
                <div key={col.title} className="flex-1">
                  <h4 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-gray-800">
                    {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-xs text-gray-500 transition hover:text-red-600"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {categories.slice(0, 7).map((cat) => {
          const Icon = iconMap[cat.icon];
          return (
            <a
              key={cat.id}
              href="#"
              className="flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-600 transition hover:text-red-600"
            >
              {Icon ? <Icon size={15} /> : null}
              {cat.title}
            </a>
          );
        })}

        <div className="mr-auto flex items-center gap-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1.5">
            <Percent size={14} className="text-red-500" />
            تخفیف‌های ویژه
          </span>
          <span className="flex items-center gap-1.5">
            <Truck size={14} className="text-red-500" />
            ارسال رایگان
          </span>
        </div>
      </div>
    </nav>
  );
}
