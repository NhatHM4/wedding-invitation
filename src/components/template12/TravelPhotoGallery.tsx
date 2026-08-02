"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Maximize2, Stamp, X } from "lucide-react";

interface TravelPhotoGalleryProps {
  images?: string[];
}

const DEFAULT_IMAGES = [
  "/thiepmaudovang/images/cover.jpg",
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
];

export default function TravelPhotoGallery({
  images = DEFAULT_IMAGES,
}: TravelPhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <section className="relative py-12 px-3 bg-[#F4EBDD] text-[#272521] overflow-hidden">
      <div className="max-w-full mx-auto space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#172235]/10 border border-[#172235]/20 rounded-full text-[9px] font-mono tracking-widest text-[#762F3A] uppercase font-bold">
            <Camera className="w-3.5 h-3.5 text-[#762F3A]" />
            <span>LUGGAGE PHOTO ALBUM</span>
          </div>
          <h2 className="font-serif text-2xl text-[#172235] font-bold">
            Bưu Thiếp &amp; Album Kỷ Niệm
          </h2>
          <p className="text-[11px] text-[#272521]/70 max-w-xs mx-auto italic">
            Những khoảnh khắc rạng rỡ trên hành trình tình yêu được lưu giữ dạng bưu thiếp.
          </p>
        </div>

        {/* Postcard 2-Column Mobile Photo Grid */}
        <div className="grid grid-cols-2 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative bg-[#FFFBF5] border-2 border-[#B89B62]/50 rounded-xl p-2 shadow-md active:scale-98 transition-all cursor-pointer overflow-hidden flex flex-col space-y-1.5"
            >
              {/* Top Tag Header */}
              <div className="flex items-center justify-between text-[8px] font-mono text-[#762F3A] border-b border-[#B89B62]/30 pb-1 font-bold">
                <span>TAG #{String(idx + 1).padStart(2, "0")}</span>
                <span className="text-[#B89B62]">LUGGAGE</span>
              </div>

              {/* Photo Frame */}
              <div className="relative w-full h-44 rounded-lg overflow-hidden border border-[#B89B62]/30">
                <Image
                  src={img}
                  alt={`Album ảnh cưới ${idx + 1}`}
                  fill
                  sizes="(max-width: 480px) 50vw, 240px"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F4EBDD]">
                  <div className="p-1.5 bg-[#172235]/80 rounded-full">
                    <Maximize2 className="w-4 h-4 text-[#B89B62]" />
                  </div>
                </div>
              </div>

              {/* Bottom Stamp Badge */}
              <div className="flex items-center justify-between text-[7.5px] font-mono text-[#272521]/70">
                <span>STAMPED</span>
                <Stamp className="w-2.5 h-2.5 text-[#A9473F]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-sm h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-[#F4EBDD] text-[#172235] flex items-center justify-center font-bold text-sm shadow-lg z-20"
              aria-label="Đóng ảnh"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1))
              }
              className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#172235]/80 text-[#F4EBDD] flex items-center justify-center shadow-lg z-20"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-[#B89B62]">
              <Image
                src={images[selectedIndex]}
                alt={`Album ảnh cưới ${selectedIndex + 1}`}
                fill
                sizes="(max-width: 480px) 100vw, 600px"
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#172235]/80 text-[#F4EBDD] flex items-center justify-center shadow-lg z-20"
              aria-label="Ảnh tiếp"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
