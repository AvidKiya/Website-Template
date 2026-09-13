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

export default function QuickCategories() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="no-scrollbar flex gap-4 overflow-x-auto sm:grid sm:grid-cols-5 lg:grid-cols-10">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon];
          return (
            <a
              href="#"
              key={cat.id}
              className="flex w-20 shrink-0 flex-col items-center gap-2 rounded-2xl border border-transparent bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:border-red-100 hover:shadow-md sm:w-auto"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                {Icon ? <Icon size={22} /> : null}
              </div>
              <span className="text-[11px] font-medium leading-tight text-gray-600">
                {cat.title}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
