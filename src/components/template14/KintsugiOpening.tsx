"use client";

import React from "react";
import { Sparkles, ArrowDown, Play, Music } from "lucide-react";
import CeramicAssembly, { CeramicFragmentData } from "./CeramicAssembly";

interface KintsugiOpeningProps {
  groomName: string;
  brideName: string;
  eventDate: string | null;
  guestName: string;
  fragments: CeramicFragmentData[];
  onAssembleFragment: (id: number) => void;
  onAssembleAll: () => void;
  onSkipOpening: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  hasMusic: boolean;
}

export default function KintsugiOpening({
  groomName,
  brideName,
  eventDate,
  guestName,
  fragments,
  onAssembleFragment,
  onAssembleAll,
  onSkipOpening,
  isPlayingMusic,
  onToggleMusic,
  hasMusic,
}: KintsugiOpeningProps) {
  // Format Date gracefully
  const formattedDate = React.useMemo(() => {
    if (!eventDate) return "10 • 10 • 2026";
    try {
      const d = new Date(eventDate);
      if (isNaN(d.getTime())) return eventDate;
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day} • ${month} • ${year}`;
    } catch {
      return eventDate;
    }
  }, [eventDate]);

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#FAF7F0] flex flex-col items-center justify-between py-10 px-4 overflow-hidden border-b border-[#C9A98D]/30">
      {/* Background Subtle Pottery Texture Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#252320_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Decorative Gold Seam Traces Top/Bottom */}
      <svg className="absolute top-0 left-0 w-full h-12 text-[#B99245]/20 pointer-events-none" viewBox="0 0 1200 48" fill="none">
        <path d="M0 24C150 12 300 36 450 24C600 12 750 36 900 24C1050 12 1200 24 1200 24" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      </svg>

      {/* Top Header & Guest Personalization */}
      <div className="relative z-10 text-center max-w-md mx-auto pt-4 space-y-3">
        <div className="inline-block px-4 py-1 rounded-full bg-[#6A3034]/10 border border-[#6A3034]/30 text-[#6A3034] text-xs font-serif tracking-widest uppercase">
          Trân Trọng Kính Mời
        </div>

        {guestName && guestName !== "Quý khách" && (
          <h2 className="text-xl sm:text-2xl font-serif text-[#252320] font-semibold tracking-wide">
            {guestName}
          </h2>
        )}

        <div className="flex items-center justify-center gap-3 py-1">
          <span className="h-px w-10 bg-[#B99245]/50" />
          <span className="text-xs font-mono tracking-widest text-[#B99245] uppercase">SAVE THE DATE</span>
          <span className="h-px w-10 bg-[#B99245]/50" />
        </div>
      </div>

      {/* Couple Names Banner */}
      <div className="relative z-10 text-center my-4">
        <h1 className="text-3xl sm:text-5xl font-serif text-[#252320] font-bold tracking-tight">
          {groomName} <span className="text-[#B99245] font-light">&</span> {brideName}
        </h1>
        <p className="mt-2 text-sm font-mono text-[#76806B] tracking-wider">
          {formattedDate}
        </p>
      </div>

      {/* Interactive Ceramic Assembly Widget */}
      <div className="relative z-10 w-full my-2">
        <CeramicAssembly
          fragments={fragments}
          onAssembleFragment={onAssembleFragment}
          onAssembleAll={onAssembleAll}
          onStartAssembly={() => {
            const firstUnassembled = fragments.find((f) => !f.assembled);
            if (firstUnassembled) {
              onAssembleFragment(firstUnassembled.id);
            }
          }}
        />
      </div>

      {/* Opening Quote Message */}
      <div className="relative z-10 text-center max-w-md px-6 my-4">
        <p className="text-sm sm:text-base font-serif italic text-[#252320]/80 leading-relaxed">
          “Tình yêu không cần hoàn hảo. Điều đẹp nhất là hai người đã chọn cùng nhau hoàn thiện một cuộc đời.”
        </p>
      </div>

      {/* Control Buttons */}
      <div className="relative z-10 w-full max-w-md px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Main Action Button */}
        <button
          onClick={() => {
            const first = fragments.find((f) => !f.assembled);
            if (first) onAssembleFragment(first.id);
            const el = document.getElementById("invitation");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          type="button"
          className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-full bg-[#6A3034] text-[#FAF7F0] font-serif text-sm font-medium border border-[#B99245] shadow-lg hover:bg-[#803D42] transition-all flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4 text-[#B99245] group-hover:rotate-12 transition-transform" />
          <span>Ghép mảnh đầu tiên</span>
        </button>

        {/* Secondary Action Button - Skip */}
        <button
          onClick={onSkipOpening}
          type="button"
          className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-full bg-[#F3ECDD] text-[#252320] font-serif text-sm border border-[#C9A98D]/60 hover:border-[#B99245] transition-all flex items-center justify-center gap-2"
        >
          <span>Xem thiệp ngay</span>
          <ArrowDown className="w-4 h-4 text-[#6A3034]" />
        </button>

        {/* Sound Toggle Button if present */}
        {hasMusic && (
          <button
            onClick={onToggleMusic}
            type="button"
            className="w-full sm:w-auto px-4 py-3 min-h-[44px] rounded-full bg-[#FAF7F0] text-[#252320] font-serif text-xs border border-[#C9A98D]/40 hover:border-[#B99245] transition-all flex items-center justify-center gap-2"
          >
            <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? "text-[#B99245] animate-pulse" : "text-[#6A3034]"}`} />
            <span>{isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}</span>
          </button>
        )}
      </div>
    </section>
  );
}
