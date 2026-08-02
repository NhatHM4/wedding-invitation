"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface CeramicAudioControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  hasMusic: boolean;
}

export default function CeramicAudioControl({
  isPlaying,
  onToggle,
  hasMusic,
}: CeramicAudioControlProps) {
  if (!hasMusic) return null;

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-auto">
      <button
        onClick={onToggle}
        type="button"
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        className={`relative group min-w-[44px] min-h-[44px] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
          isPlaying
            ? "bg-[#6A3034] text-[#FAF7F0] border-2 border-[#B99245] shadow-[#B99245]/20"
            : "bg-[#F3ECDD] text-[#252320] border border-[#C9A98D]/60 hover:border-[#B99245]"
        }`}
      >
        {/* Organic ceramic rim ring */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-[#B99245]/30 pointer-events-none" />

        {/* Dynamic audio pulse ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-[#B99245]/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        )}

        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#FAF7F0] animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-[#6A3034]" />
          )}
        </div>

        {/* Tooltip / Label */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-serif rounded bg-[#252320] text-[#FAF7F0] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#B99245]/30 shadow-sm hidden sm:block">
          {isPlaying ? "Tắt âm thanh" : "Bật âm thanh"}
        </span>
      </button>
    </div>
  );
}
