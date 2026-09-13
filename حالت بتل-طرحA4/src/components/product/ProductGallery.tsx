"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand, Heart, Share2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store-provider";

export function ProductGallery({
  images,
  title,
  slug,
}: {
  images: string[];
  title: string;
  slug: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
  const { toggleWishlist, isWished, hydrated, toast } = useStore();
  const wished = hydrated && isWished(slug);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast("لینک محصول کپی شد", "info");
      }
    } catch {
      /* dismissed */
    }
  };

  return (
    <div className="lg:sticky lg:top-[124px]">
      <div className="flex gap-3">
        <div className="hidden w-[68px] shrink-0 flex-col gap-2 md:flex">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`تصویر ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border bg-[#fafafa] transition-colors duration-200",
                i === active ? "border-[#252525]" : "border-[#e8e8e8] hover:border-[#c9c9c9]",
              )}
            >
              <Image src={src} alt="" fill sizes="68px" className="object-cover" />
            </button>
          ))}
        </div>

        <div className="relative flex-1">
          <div
            className="relative aspect-square w-full overflow-hidden rounded-[16px] border border-[#e8e8e8] bg-white"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHover({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }}
            onMouseLeave={() => setHover(null)}
          >
            <Image
              src={images[active]}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover transition-transform duration-300 ease-out"
              style={
                hover
                  ? { transform: "scale(1.6)", transformOrigin: `${hover.x}% ${hover.y}%` }
                  : undefined
              }
            />
          </div>

          <div className="absolute end-3 top-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => toggleWishlist(slug)}
              aria-label="افزودن به علاقه‌مندی‌ها"
              aria-pressed={wished}
              className={cn(
                "grid size-10 place-items-center rounded-full border border-[#e8e8e8] bg-white/95 text-[#777] backdrop-blur transition-colors hover:text-[#202020]",
                wished && "text-[#e53935]",
              )}
            >
              <Heart size={17} className={cn(wished && "fill-[#e53935]")} />
            </button>
            <button
              type="button"
              onClick={share}
              aria-label="اشتراک‌گذاری"
              className="grid size-10 place-items-center rounded-full border border-[#e8e8e8] bg-white/95 text-[#777] backdrop-blur transition-colors hover:text-[#202020]"
            >
              <Share2 size={17} />
            </button>
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              aria-label="نمایش تمام‌صفحه"
              className="grid size-10 place-items-center rounded-full border border-[#e8e8e8] bg-white/95 text-[#777] backdrop-blur transition-colors hover:text-[#202020]"
            >
              <Expand size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto md:hidden">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`تصویر ${i + 1}`}
            className={cn(
              "relative size-16 shrink-0 overflow-hidden rounded-xl border bg-[#fafafa]",
              i === active ? "border-[#252525]" : "border-[#e8e8e8]",
            )}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      <Modal open={zoomOpen} onClose={() => setZoomOpen(false)} title={title} bare className="max-w-4xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black">
          <Image
            src={images[active]}
            alt={title}
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`تصویر ${i + 1}`}
              className={cn(
                "relative size-14 overflow-hidden rounded-lg border-2",
                i === active ? "border-white" : "border-white/25",
              )}
            >
              <Image src={src} alt="" fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
