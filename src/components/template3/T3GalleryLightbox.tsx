"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface T3GalleryLightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function T3GalleryLightbox({ images, initialIndex, onClose }: T3GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex < images.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Handle Drag / Swipe gestures
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; // pixels
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Top Header Overlay */}
      <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-10 font-barlow text-white">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C5A880]">
          Album ảnh cưới
        </span>
        <span className="text-xs font-mono font-bold tracking-widest bg-stone-900/60 border border-stone-800 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-9 h-9 bg-stone-900/60 hover:bg-stone-800 text-white rounded-full flex items-center justify-center transition border border-stone-800 cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Slider Wrapper */}
      <div 
        className="relative w-full max-w-[420px] aspect-[3/4] flex items-center justify-center overflow-hidden z-0 rounded-2xl border border-stone-800 bg-stone-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing p-1.5"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden select-none pointer-events-none">
              <Image
                src={images[currentIndex]}
                alt={`Wedding Photo ${currentIndex + 1}`}
                fill
                priority
                sizes="(max-width: 420px) 100vw, 420px"
                className="object-cover pointer-events-none brightness-95"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Swipe Hint overlay (appears for a brief moment) */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-[9px] uppercase tracking-widest font-bold text-[#C5A880]/60 pointer-events-none font-barlow">
          ← Vuốt ngang để chuyển ảnh →
        </div>
      </div>

      {/* Bottom Navigation Buttons (Desktop view helpers) */}
      <div 
        className="flex gap-4 mt-6 z-10 font-barlow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition shadow-lg cursor-pointer ${
            currentIndex === 0 
              ? "bg-stone-900/30 text-stone-600 border border-stone-850 cursor-not-allowed" 
              : "bg-stone-900 border border-stone-800 text-white hover:bg-stone-800"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition shadow-lg cursor-pointer ${
            currentIndex === images.length - 1 
              ? "bg-stone-900/30 text-stone-600 border border-stone-850 cursor-not-allowed" 
              : "bg-stone-900 border border-stone-800 text-white hover:bg-stone-800"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
