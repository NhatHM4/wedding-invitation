"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatShortDate } from "../utils/date";

interface OpeningCoverProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
  coverImage: string;
  onOpen: () => void;
  to?: string;
}

export function OpeningCover({
  brideName,
  groomName,
  weddingDate,
  coverImage,
  onOpen,
  to = "",
}: OpeningCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const formattedDate = formatShortDate(weddingDate);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Delay to let the animation play before calling onOpen
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpening || true ? (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center cursor-pointer overflow-hidden cover-closing ${
            isOpening ? "cover-open" : ""
          }`}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label="Chạm để mở thiệp cưới"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpen();
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={coverImage}
              alt="Wedding cover"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

          {/* Film grain texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            {/* Thin top line */}
            <motion.div
              className="w-12 h-px bg-[#D4AF72] mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />

            {/* "The Wedding of" */}
            <motion.p
              className="font-[family-name:var(--font-inter)] text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D4AF72] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              The Wedding of
            </motion.p>

            {/* Groom Name */}
            <motion.h1
              className="font-[family-name:var(--font-cormorant-garamond)] text-4xl md:text-6xl lg:text-7xl font-light text-[#F5F0E8] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {groomName}
            </motion.h1>

            {/* Ampersand */}
            <motion.p
              className="font-[family-name:var(--font-alexbrush)] text-5xl md:text-7xl text-[#D4AF72] my-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              &
            </motion.p>

            {/* Bride Name */}
            <motion.h1
              className="font-[family-name:var(--font-cormorant-garamond)] text-4xl md:text-6xl lg:text-7xl font-light text-[#F5F0E8] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {brideName}
            </motion.h1>

            {/* Date */}
            <motion.p
              className="font-[family-name:var(--font-inter)] text-[11px] md:text-sm uppercase tracking-[0.3em] text-[#F5F0E8]/70 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {formattedDate}
            </motion.p>

            {to && (
              <motion.p
                className="font-[family-name:var(--font-cormorant-garamond)] text-lg md:text-xl text-[#D4AF72] mt-6 italic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                Kính mời: {to}
              </motion.p>
            )}

            {/* Bottom line */}
            <motion.div
              className="w-12 h-px bg-[#D4AF72] mx-auto mt-8 mb-10"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
            />

            {/* Tap to open */}
            <motion.div
              className="animate-cinematic-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <p className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.25em] text-[#F5F0E8]/50">
                Chạm để mở thiệp
              </p>
              {/* Small chevron down */}
              <svg
                className="w-4 h-4 mx-auto mt-2 text-[#F5F0E8]/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
