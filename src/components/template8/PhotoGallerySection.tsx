"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Wedding } from "@/types";

interface PhotoGallerySectionProps {
  wedding: Wedding;
}

export default function PhotoGallerySection({ wedding }: PhotoGallerySectionProps) {
  const defaultImages = [
    "/template8/images/gallery-1.jpg",
    "/template8/images/gallery-2.jpg",
    "/template8/images/gallery-3.jpg",
    "/template8/images/gallery-4.jpg",
    "/template8/images/gallery-5.jpg",
    "/template8/images/gallery-6.jpg",
  ];

  const images = wedding.images && wedding.images.length > 0 ? wedding.images : defaultImages;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const signatureEase = [0.4, 0, 0.2, 1] as const;

  return (
    <section className="py-20 px-4 bg-[#FDF8F5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: signatureEase }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-medium flex items-center justify-center gap-1.5">
            <Camera className="w-4 h-4 text-rose-400" />
            <span>ALBUM GALLERY</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mt-2">
            ALBUM HÌNH ẢNH
          </h2>
          <div className="w-16 h-[2px] bg-rose-300 mx-auto mt-4" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {images.map((imgSrc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: signatureEase }}
              onClick={() => setSelectedIndex(idx)}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-md group border-2 border-white"
            >
              <img
                src={imgSrc}
                alt={`Wedding Photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/template8/images/hero.jpg";
                }}
              />
              <div className="absolute inset-0 bg-rose-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-white/90 text-rose-900 text-xs font-semibold shadow-lg scale-95 group-hover:scale-100 transition-transform">
                  Xem ảnh
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Đóng ảnh"
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              aria-label="Ảnh trước"
              className="absolute left-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Ảnh tiếp theo"
              className="absolute right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: signatureEase }}
              className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl"
            >
              <img
                src={images[selectedIndex]}
                alt="Enlarged Wedding Photo"
                className="w-full h-full object-contain max-h-[80vh]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/template8/images/hero.jpg";
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
