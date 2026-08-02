"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Music, Plane, ShieldCheck, Sparkles } from "lucide-react";

interface PassportOpeningProps {
  groomName: string;
  brideName: string;
  eventDate?: string | null;
  guestName?: string;
  onOpenPassport: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
}

export default function PassportOpening({
  groomName,
  brideName,
  eventDate,
  guestName = "",
  onOpenPassport,
  onToggleMusic,
  isMusicPlaying,
}: PassportOpeningProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    onOpenPassport();
  };

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "10.10.2026";

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center bg-[#172235] px-4 py-6 overflow-hidden select-none">
      {/* Background Vintage Travel Security Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B89B62_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#172235]/80 via-transparent to-[#172235] pointer-events-none" />

      {/* Background Seal Motifs */}
      <div className="absolute top-6 left-4 opacity-15 pointer-events-none text-[#B89B62]">
        <Compass className="w-24 h-24 animate-spin-slow" />
      </div>

      {/* Main Passport Booklet Cover Container */}
      <div className="relative w-full max-w-[420px] z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotateY: isOpened ? -140 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#172235] border-2 border-[#B89B62]/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-5 sm:p-6 flex flex-col items-center justify-between min-h-[520px] text-[#F4EBDD] overflow-hidden"
          style={{ transformOrigin: "left center" }}
        >
          {/* Gold Foil Border */}
          <div className="absolute inset-2 border border-[#B89B62]/40 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 border border-dashed border-[#B89B62]/20 rounded-lg pointer-events-none" />

          {/* Top Header */}
          <div className="flex flex-col items-center gap-2 pt-2 text-center">
            <div className="flex items-center gap-1.5 text-[#B89B62] text-[9px] font-mono tracking-[0.2em] uppercase font-bold">
              <ShieldCheck className="w-4 h-4 text-[#B89B62]" />
              <span>PASSPORT DUYÊN NỢ</span>
            </div>
            <span className="text-[9px] tracking-[0.25em] font-mono text-[#F4EBDD]/70 uppercase">
              CỘNG HÒA HẠNH PHÚC
            </span>
          </div>

          {/* Center Official Gold Seal */}
          <div className="flex flex-col items-center my-4 relative">
            <div className="w-24 h-24 rounded-full border-2 border-[#B89B62] p-1 flex items-center justify-center relative shadow-[inset_0_0_12px_rgba(184,155,98,0.2)]">
              <div className="w-full h-full rounded-full border border-dashed border-[#B89B62]/60 flex flex-col items-center justify-center p-2 text-center">
                <Plane className="w-8 h-8 text-[#B89B62] my-0.5 transform -rotate-45" />
                <span className="text-[7.5px] font-mono tracking-wider text-[#B89B62] uppercase">
                  LOVE FLIGHT 1010
                </span>
              </div>
            </div>
          </div>

          {/* Couple Titles */}
          <div className="flex flex-col items-center text-center space-y-1.5">
            <span className="text-[10px] font-mono tracking-[0.18em] text-[#B89B62] uppercase font-semibold">
              HỘ CHIẾU ĐẾN NGÀY CHUNG ĐÔI
            </span>
            <h1 className="font-serif text-2xl text-[#F4EBDD] tracking-tight font-bold">
              {groomName} <span className="text-[#A9473F] font-normal">&amp;</span> {brideName}
            </h1>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#B89B62] pt-0.5">
              <span>KHỞI HÀNH: {formattedDate}</span>
            </div>

            {/* Guest Personalization */}
            {guestName && (
              <div className="mt-2 px-3 py-1.5 bg-[#F4EBDD]/10 border border-[#B89B62]/30 rounded-full text-center">
                <span className="text-[10px] text-[#F4EBDD] font-mono">
                  Kính mời Hành khách: <strong className="text-[#B89B62] font-semibold">{guestName}</strong>
                </span>
              </div>
            )}

            <p className="text-[11px] text-[#F4EBDD]/80 italic max-w-[280px] pt-1 leading-relaxed">
              &ldquo;Một hành trình mới sắp bắt đầu. Xin vui lòng mở hộ chiếu để nhận vé lên tàu.&rdquo;
            </p>
          </div>

          {/* Action Buttons Stack */}
          <div className="w-full flex flex-col gap-2.5 pt-5 pb-1 z-20">
            <button
              type="button"
              onClick={handleOpen}
              className="w-full min-h-[48px] px-6 py-3 bg-[#B89B62] hover:bg-[#a68a52] text-[#172235] font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#172235]" />
              <span>MỞ HỘ CHIẾU</span>
            </button>

            <button
              type="button"
              onClick={onToggleMusic}
              className="w-full min-h-[44px] px-4 py-2.5 bg-[#F4EBDD]/10 hover:bg-[#F4EBDD]/20 border border-[#B89B62]/40 text-[#F4EBDD] font-mono text-[11px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Music className="w-3.5 h-3.5 text-[#B89B62]" />
              <span>{isMusicPlaying ? "Tắt Nhạc" : "Bật Nhạc Nền"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
