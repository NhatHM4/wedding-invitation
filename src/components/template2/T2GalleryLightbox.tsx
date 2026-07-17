"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface T2GalleryLightboxProps {
  src: string;
  onClose: () => void;
}

export default function T2GalleryLightbox({ src, onClose }: T2GalleryLightboxProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.stopPropagation()} // Stop any outer bubble on wrapper
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
      />

      {/* Main Lightbox Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()} // Stop click on modal body from bubbling
        className="relative w-full max-w-[480px] aspect-[3/4] z-10 bg-[#fbfbf8] border-4 border-[#e9e6df] rounded-2xl overflow-hidden p-1.5 shadow-2xl"
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={src}
            alt="Wedding Photo Large View"
            fill
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover brightness-95 saturate-[0.9]"
          />
        </div>

        {/* Close Button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-lg transition duration-200 outline-none shadow-md interactive"
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
}
