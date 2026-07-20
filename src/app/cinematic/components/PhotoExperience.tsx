"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

interface PhotoExperienceProps {
  images: string[];
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 lightbox-backdrop bg-black/90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-60 w-11 h-11 flex items-center justify-center text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors"
        onClick={onClose}
        aria-label="Đóng"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation arrows */}
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 z-60 w-11 h-11 flex items-center justify-center text-[#F5F0E8]/50 hover:text-[#F5F0E8] transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Ảnh trước"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 z-60 w-11 h-11 flex items-center justify-center text-[#F5F0E8]/50 hover:text-[#F5F0E8] transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Ảnh sau"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={currentIndex}
        className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[85vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Ảnh cưới ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </motion.div>

      {/* Counter */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-[family-name:var(--font-inter)] text-[11px] text-[#F5F0E8]/40 tracking-wider">
        {currentIndex + 1} / {images.length}
      </p>
    </motion.div>
  );
}

export function PhotoExperience({ images }: PhotoExperienceProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  // Heights for masonry effect on desktop
  const heights = ["h-[400px]", "h-[500px]", "h-[350px]", "h-[450px]", "h-[380px]", "h-[480px]"];

  return (
    <section className="py-16 md:py-24">
      {/* Section header */}
      <div className="text-center px-6 mb-10 md:mb-16">
        <ScrollReveal>
          <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60 mb-6">
            — Khoảnh khắc —
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2
            className="font-[family-name:var(--font-cormorant-garamond)] font-light text-[#F5F0E8]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Our Moments
          </h2>
        </ScrollReveal>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden">
        <div className="gallery-scroll flex gap-4 px-6 overflow-x-auto pb-4">
          {images.map((src, i) => (
            <button
              key={i}
              className="gallery-scroll-item flex-shrink-0 w-[80vw] h-[60vh] relative rounded-sm overflow-hidden"
              onClick={() => openLightbox(i)}
              type="button"
              aria-label={`Xem ảnh ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Ảnh cưới ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="80vw"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Masonry grid */}
      <div className="hidden md:block px-6 md:px-12 lg:px-20">
        <div className="columns-2 gap-4 lg:gap-6">
          {images.map((src, i) => (
            <ScrollReveal
              key={i}
              direction="up"
              delay={0.1 * (i % 3)}
              className="mb-4 lg:mb-6 break-inside-avoid"
            >
              <button
                className={`relative w-full ${heights[i % heights.length]} overflow-hidden rounded-sm cursor-pointer group`}
                onClick={() => openLightbox(i)}
                type="button"
                aria-label={`Xem ảnh ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`Ảnh cưới ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
