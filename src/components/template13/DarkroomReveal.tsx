"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Eye, RefreshCw, CheckCircle2, Sliders } from "lucide-react";

interface DarkroomRevealProps {
  image?: string;
  caption?: string;
  title?: string;
}

export default function DarkroomReveal({
  image = "/thiepmaudovang/images/cover.jpg",
  caption = "Tình yêu không phải là tìm một người hoàn hảo, mà là cùng nhau tráng nên những khoảnh khắc tuyệt vời nhất qua thời gian.",
  title = "Bản Tráng Phòng Tối • Premier Print",
}: DarkroomRevealProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      const savedState = sessionStorage.getItem("darkroom_photo_revealed");
      if (savedState === "true") {
        setProgress(100);
        setIsFullyRevealed(true);
      }
    } catch {
      // Ignore sessionStorage restriction if blocked
    }
  }, []);

  // Check completion threshold
  useEffect(() => {
    if (progress >= 50 && !isFullyRevealed) {
      setProgress(100);
      setIsFullyRevealed(true);
      try {
        sessionStorage.setItem("darkroom_photo_revealed", "true");
      } catch {
        // ignore
      }
    }
  }, [progress, isFullyRevealed]);

  const handleRevealClick = () => {
    setProgress(100);
    setIsFullyRevealed(true);
    try {
      sessionStorage.setItem("darkroom_photo_revealed", "true");
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setProgress(0);
    setIsFullyRevealed(false);
    try {
      sessionStorage.removeItem("darkroom_photo_revealed");
    } catch {
      // ignore
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (isFullyRevealed) return;
    setProgress((prev) => Math.min(prev + 5, 100));
  };

  return (
    <section className="relative py-14 px-4 bg-[#121212] text-[#F1E6D2] overflow-hidden border-b border-[#3A2924]">
      {/* Background Red Safe-light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#A53A32]/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24211F] border border-[#A53A32]/40 rounded-full text-[10px] font-mono tracking-widest text-[#D69C52] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>DARKROOM PHOTO DEVELOPMENT</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F1E6D2] font-bold">
            Tráng Bức Ảnh Kỷ Niệm
          </h2>
          <p className="text-xs text-[#F1E6D2]/70 max-w-md mx-auto italic font-serif">
            Chạm, chạm vuốt ngón tay lên tấm giấy ảnh hoặc kéo thanh cuộn bên dưới để hóa chất phòng tối từ từ làm hiện rõ khuôn mặt hạnh phúc.
          </p>
        </div>

        {/* Darkroom Tray & Photo Canvas */}
        <div className="bg-[#181615] border-2 border-[#3A2924] rounded-2xl p-4 sm:p-6 shadow-2xl relative">
          {/* Photo Frame Container */}
          <div
            onMouseMove={handleTouchMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F1E6D2] border-4 border-[#F1E6D2] shadow-inner select-none cursor-pointer group"
          >
            {/* The Actual Photo with CSS Dynamic Filters */}
            <div
              className="absolute inset-0 transition-all duration-300 ease-out"
              style={{
                filter: isFullyRevealed
                  ? "none"
                  : `brightness(${0.3 + (progress / 100) * 0.7}) contrast(${0.4 + (progress / 100) * 0.6}) sepia(${(100 - progress) / 100 * 0.8})`,
                opacity: isFullyRevealed ? 1 : 0.25 + (progress / 100) * 0.75,
              }}
            >
              <Image
                src={image}
                alt="Ảnh cưới tráng phòng tối"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>

            {/* Unrevealed Mask Overlay */}
            {!isFullyRevealed && (
              <div
                className="absolute inset-0 bg-[#F1E6D2] transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center p-4 text-center"
                style={{ opacity: (100 - progress) / 100 * 0.7 }}
              >
                <div className="p-3 bg-[#A53A32]/10 border border-[#A53A32]/30 rounded-full mb-2">
                  <Eye className="w-6 h-6 text-[#A53A32] animate-pulse" />
                </div>
                <span className="font-mono text-xs text-[#24211F] font-bold uppercase tracking-wider">
                  VUỐT HOẶC CHẠM ĐỂ TRÁNG
                </span>
                <span className="text-[11px] font-mono text-[#24211F]/70">
                  {progress}% DEVELOPED
                </span>
              </div>
            )}

            {/* Fully Revealed Stamp */}
            {isFullyRevealed && (
              <motion.div
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-3 right-3 bg-[#A53A32] text-[#F1E6D2] px-2.5 py-1 rounded border border-[#F1E6D2]/40 font-mono text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                DEVELOPED
              </motion.div>
            )}
          </div>

          {/* Development Slider & Controls */}
          <div className="mt-5 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-mono text-[#D69C52]">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> TIẾN TRÌNH TRÁNG ẢNH:
                </span>
                <span className="font-bold text-[#F1E6D2]">{progress}%</span>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-2.5 bg-[#24211F] rounded-lg appearance-none cursor-pointer accent-[#A53A32] focus:outline-none focus:ring-2 focus:ring-[#D69C52]"
                aria-label="Thanh kéo tráng ảnh"
              />
            </div>

            {/* Accessible Fallback Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              {!isFullyRevealed ? (
                <button
                  onClick={handleRevealClick}
                  type="button"
                  className="flex-1 py-2.5 px-4 bg-[#A53A32] hover:bg-[#A53A32]/90 text-[#F1E6D2] text-xs font-mono font-semibold rounded-xl transition-all shadow flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>HIỆN ẢNH NGAY (QUICK REVEAL)</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  type="button"
                  className="py-2 px-3 bg-[#24211F] hover:bg-[#3A2924] text-[#F1E6D2]/80 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#D69C52]" />
                  <span>Tráng lại từ đầu</span>
                </button>
              )}
            </div>

            {/* Revealed Romantic Note */}
            {isFullyRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-[#24211F] border border-[#3A2924] rounded-xl text-center space-y-1.5"
              >
                <p className="font-mono text-[10px] text-[#D69C52] uppercase tracking-widest">
                  LỜI GHI CHÚ MẶT SAU TẤM ẢNH
                </p>
                <p className="font-serif text-sm text-[#F1E6D2] italic leading-relaxed">
                  “{caption}”
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
