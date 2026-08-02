"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc, Play, Pause, Sparkles, Film, ArrowDown } from "lucide-react";

interface FilmBoxOpeningProps {
  groomName: string;
  brideName: string;
  eventDate?: string | null;
  guestName?: string;
  musicUrl?: string;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenFilm: () => void;
}

export default function FilmBoxOpening({
  groomName,
  brideName,
  eventDate,
  guestName,
  isPlayingMusic,
  onToggleMusic,
  onOpenFilm,
}: FilmBoxOpeningProps) {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);

  const handleOpenClick = () => {
    setIsOpenAnimation(true);
    setTimeout(() => {
      onOpenFilm();
    }, 1200);
  };

  const displayGuest = guestName && guestName.trim() !== "Quý khách" ? guestName.trim() : null;

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#121212] text-[#F1E6D2] flex flex-col justify-between items-center p-4 overflow-hidden font-sans selection:bg-[#A53A32] selection:text-[#F1E6D2]">
      {/* Darkroom Red Safelight Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-radial from-[#A53A32]/25 via-[#D69C52]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#F1E6D2_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Header Tag */}
      <div className="w-full max-w-sm flex items-center justify-between pt-4 px-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#24211F] border border-[#3A2924] rounded-full text-[10px] font-mono tracking-widest text-[#D69C52] uppercase">
          <Film className="w-3.5 h-3.5 text-[#A53A32] animate-pulse" />
          <span>DARKROOM LAB • 35MM</span>
        </div>
        
        {/* Quick Music Toggle */}
        <button
          onClick={onToggleMusic}
          type="button"
          aria-label={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3A2924]/60 hover:bg-[#3A2924] border border-[#D69C52]/30 rounded-full text-xs font-medium text-[#F1E6D2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D69C52]"
        >
          <Disc className={`w-3.5 h-3.5 text-[#D69C52] ${isPlayingMusic ? "animate-spin" : ""}`} />
          <span>{isPlayingMusic ? "Đang phát" : "Bật nhạc"}</span>
        </button>
      </div>

      {/* Central Film Canister / Box Visual */}
      <div className="my-auto w-full max-w-sm flex flex-col items-center justify-center relative z-10 py-6">
        <AnimatePresence mode="wait">
          {!isOpenAnimation ? (
            <motion.div
              key="film-box"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.05, opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#181615] border-2 border-[#3A2924] rounded-2xl p-6 shadow-2xl relative overflow-hidden group"
            >
              {/* Film Sprocket Edge Pattern Top & Bottom */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-[#24211F] flex items-center justify-between px-3 border-b border-[#3A2924]">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2.5 h-1.5 bg-[#121212] rounded-xs" />
                ))}
              </div>

              {/* Box Brand & Roll Info Header */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#D69C52] uppercase tracking-wider">
                <span>ROLL #LOVE-2026</span>
                <span className="px-1.5 py-0.5 bg-[#A53A32]/20 text-[#A53A32] rounded border border-[#A53A32]/40 font-bold">ISO 400</span>
              </div>

              {/* Box Title & Personalization */}
              <div className="my-6 text-center space-y-3">
                <p className="text-[11px] uppercase tracking-widest text-[#D69C52]/80 font-mono">
                  SPECIAL EDITION FILM CANISTER
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#F1E6D2] font-bold tracking-tight leading-tight">
                  {groomName} <span className="text-[#A53A32] font-sans font-light">&</span> {brideName}
                </h1>
                
                {eventDate && (
                  <p className="text-xs font-mono text-[#F1E6D2]/70 tracking-widest">
                    {eventDate.split("T")[0]}
                  </p>
                )}

                {displayGuest && (
                  <div className="mt-4 pt-4 border-t border-[#3A2924] inline-block w-full">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D69C52] block mb-1">
                      KÍNH MỜI KHÁCH QUÝ
                    </span>
                    <p className="text-lg font-serif text-[#F1E6D2] font-semibold">
                      {displayGuest}
                    </p>
                  </div>
                )}
              </div>

              {/* Sub-text quote */}
              <p className="text-xs text-center text-[#F1E6D2]/60 italic font-serif leading-relaxed mb-6">
                “Một cuộn phim mới sắp được bắt đầu. Tráng từng tấm ảnh để cùng nhau sống lại từng khoảnh khắc ngọt ngào.”
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleOpenClick}
                  type="button"
                  className="w-full min-h-[48px] py-3.5 px-6 bg-[#A53A32] hover:bg-[#A53A32]/90 text-[#F1E6D2] font-medium rounded-xl shadow-lg shadow-[#A53A32]/20 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#D69C52]"
                >
                  <Sparkles className="w-4 h-4 text-[#D69C52]" />
                  <span className="tracking-wide font-semibold text-sm">LẤY CUỘN PHIM</span>
                </button>

                <div className="flex justify-center">
                  <button
                    onClick={onToggleMusic}
                    type="button"
                    className="text-xs text-[#D69C52] hover:underline flex items-center gap-1.5 py-1 px-3"
                  >
                    {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingMusic ? "Tạm dừng nhạc" : "Phát nhạc nền phòng tối"}</span>
                  </button>
                </div>
              </div>

              {/* Film Sprocket Edge Pattern Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#24211F] flex items-center justify-between px-3 border-t border-[#3A2924]">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2.5 h-1.5 bg-[#121212] rounded-xs" />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="film-unrolling"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#A53A32]/20 border-2 border-[#A53A32] flex items-center justify-center mx-auto animate-bounce">
                <Film className="w-8 h-8 text-[#D69C52]" />
              </div>
              <p className="font-serif text-lg text-[#F1E6D2]">Đang rút cuộn phim vào phòng tráng...</p>
              <p className="text-xs font-mono text-[#D69C52]">DEVELOPMENT IN PROGRESS</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Hint */}
      <div className="w-full max-w-sm text-center pb-4 relative z-10">
        <p className="text-[11px] font-mono text-[#F1E6D2]/40 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <span>CUỘN PHIM ANANLOG HỘI NGỌC & PHƯƠNG THẢO</span>
          <ArrowDown className="w-3 h-3 text-[#A53A32]" />
        </p>
      </div>
    </div>
  );
}
