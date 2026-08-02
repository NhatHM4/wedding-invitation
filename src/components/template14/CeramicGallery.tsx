"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";

interface CeramicGalleryProps {
  images?: string[];
}

const DEFAULT_GALLERY: string[] = [
  "/thiepmaudovang/images/cover.jpg",
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
  "/thiepmaudovang/images/cover.jpg",
];

export default function CeramicGallery({
  images = DEFAULT_GALLERY,
}: CeramicGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (selectedIndex !== null) {
        if (e.key === "ArrowLeft") {
          setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
        }
        if (e.key === "ArrowRight") {
          setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <section id="gallery" className="relative py-20 px-4 bg-[#FAF7F0] border-t border-[#C9A98D]/30">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B99245]">
          ALBUM KHOẢNH KHẮC • CERAMIC DISPLAY
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#252320] font-bold">
          Những Mảnh Gốm Trưng Bày
        </h2>
        <p className="text-xs sm:text-sm font-serif text-[#252320]/75">
          Vuốt ngang để thưởng thức từng khoảnh khắc được lưu giữ
        </p>
        <div className="w-12 h-0.5 bg-[#B99245] mx-auto rounded-full mt-2" />
      </div>

      {/* Gallery Horizontal Scroll Container with Snap */}
      <div className="max-w-6xl mx-auto relative">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-2 scrollbar-none scroll-smooth">
          {images.map((imgUrl, idx) => {
            // Apply varied organic frame styling based on index
            const isRound = idx % 3 === 0;
            const isWide = idx % 3 === 1;

            return (
              <div
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                tabIndex={0}
                role="button"
                aria-label={`Xem ảnh ${idx + 1}`}
                className={`snap-center shrink-0 relative cursor-pointer group transition-transform duration-300 hover:scale-[1.02] border-2 border-[#C9A98D]/40 bg-[#F3ECDD] p-2.5 shadow-md ${
                  isRound
                    ? "w-[260px] sm:w-[320px] aspect-square rounded-full overflow-hidden border-[#B99245]/60"
                    : isWide
                    ? "w-[300px] sm:w-[380px] aspect-[16/10] rounded-2xl"
                    : "w-[240px] sm:w-[280px] aspect-[4/5] rounded-3xl"
                }`}
              >
                {/* Photo Container */}
                <div className={`relative w-full h-full overflow-hidden ${isRound ? "rounded-full" : "rounded-xl"}`}>
                  <Image
                    src={imgUrl}
                    alt={`Khoảnh khắc cưới ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 80vw, 300px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                </div>

                {/* Decorative Gold Seam Accent */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#B99245] opacity-80 flex items-center justify-center text-[9px] font-mono text-[#FAF7F0]">
                  #{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll right indicator helper text for mobile */}
        <div className="text-center mt-2 text-[11px] font-mono text-[#B99245] flex items-center justify-center gap-1">
          <span>Vuốt ngang để xem thêm</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#252320]/95 backdrop-blur-md flex items-center justify-center p-4">
          
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            type="button"
            aria-label="Đóng xem ảnh"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[#FAF7F0]/20 text-white hover:bg-[#FAF7F0] hover:text-[#252320] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={() =>
              setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1))
            }
            type="button"
            aria-label="Ảnh trước"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#FAF7F0]/20 text-white hover:bg-[#FAF7F0] hover:text-[#252320] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image View */}
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <Image
              src={images[selectedIndex]}
              alt={`Ảnh phóng to ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={() =>
              setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0))
            }
            type="button"
            aria-label="Ảnh tiếp theo"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#FAF7F0]/20 text-white hover:bg-[#FAF7F0] hover:text-[#252320] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
