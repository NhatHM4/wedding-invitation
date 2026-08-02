"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface DarkroomGalleryProps {
  images?: string[];
}

const DEFAULT_GALLERY_IMAGES = [
  "/thiepmaudovang/images/cover.jpg",
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
];

export default function DarkroomGallery({ images = DEFAULT_GALLERY_IMAGES }: DarkroomGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const galleryList = images.length > 0 ? images : DEFAULT_GALLERY_IMAGES;

  const handleOpenLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : galleryList.length - 1));
  }, [selectedIndex, galleryList.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < galleryList.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex, galleryList.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleCloseLightbox, handlePrev, handleNext]);

  return (
    <section className="relative py-14 px-4 bg-[#121212] text-[#F1E6D2] border-b border-[#3A2924] overflow-hidden">
      {/* Background Photo Hanging Rope Lines */}
      <div className="absolute top-16 left-0 right-0 h-0.5 bg-[#3A2924] pointer-events-none hidden sm:block" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24211F] border border-[#3A2924] rounded-full text-[10px] font-mono tracking-widest text-[#D69C52] uppercase">
            <Camera className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>DARKROOM PHOTO DRYING RACK</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#F1E6D2]">
            Bàn Phơi Ảnh Cưới
          </h2>
          <p className="text-xs text-[#F1E6D2]/70 max-w-sm mx-auto italic font-serif">
            Những khoảnh khắc đẹp nhất đang được phơi mình dưới ánh đèn an toàn phòng tối.
          </p>
        </div>

        {/* Gallery Horizontal Scroll Container with Peg Clips */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-6 px-2 no-scrollbar scroll-smooth">
          {galleryList.map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleOpenLightbox(idx)}
              aria-label={`Xem ảnh ${idx + 1}`}
              className="flex-none w-[200px] sm:w-[240px] snap-center bg-[#F1E6D2] text-[#24211F] p-3 rounded-xl shadow-2xl border-2 border-[#24211F] cursor-pointer group relative transition-transform hover:-translate-y-1"
            >
              {/* Wooden Peg / Clip Graphic Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#3A2924] rounded-sm border border-[#D69C52] z-10 shadow-md" />

              {/* Photo Frame */}
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#121212] mb-2 border border-[#24211F]/20">
                <Image
                  src={img}
                  alt={`Ảnh cưới ${idx + 1}`}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 200px, 240px"
                />
                <div className="absolute inset-0 bg-[#121212]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 bg-[#A53A32] rounded-full text-[#F1E6D2]">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Frame Label */}
              <div className="flex justify-between items-center font-mono text-[9px] text-[#A53A32] font-bold uppercase tracking-wider">
                <span>PROOF #{String(idx + 1).padStart(2, "0")}</span>
                <span>35MM</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/95 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#181615] border-2 border-[#3A2924] rounded-2xl p-4 sm:p-6 text-[#F1E6D2] space-y-4"
            >
              {/* Modal Bar */}
              <div className="flex items-center justify-between font-mono text-xs text-[#D69C52] border-b border-[#3A2924] pb-3">
                <span>PHOTO #{selectedIndex + 1} / {galleryList.length}</span>
                <button
                  onClick={handleCloseLightbox}
                  type="button"
                  aria-label="Đóng ảnh"
                  className="p-1 rounded-full hover:bg-[#3A2924] text-[#F1E6D2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image Frame */}
              <div className="relative aspect-[4/3] w-full bg-[#121212] rounded-xl overflow-hidden border border-[#3A2924]">
                <Image
                  src={galleryList[selectedIndex]}
                  alt={`Phóng to ảnh cưới ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-2 font-mono text-xs">
                <button
                  onClick={handlePrev}
                  type="button"
                  className="px-3 py-2 bg-[#24211F] hover:bg-[#3A2924] rounded-lg text-[#F1E6D2] flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4 text-[#D69C52]" /> Ảnh trước
                </button>
                <span className="text-[#F1E6D2]/50">VUỐT HOẶC DÙNG MŨI TÊN</span>
                <button
                  onClick={handleNext}
                  type="button"
                  className="px-3 py-2 bg-[#24211F] hover:bg-[#3A2924] rounded-lg text-[#F1E6D2] flex items-center gap-1"
                >
                  Ảnh sau <ChevronRight className="w-4 h-4 text-[#D69C52]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
