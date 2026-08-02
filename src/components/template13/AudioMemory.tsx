"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Volume2, VolumeX, Radio } from "lucide-react";

interface AudioMemoryProps {
  musicUrl?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function AudioMemory({
  musicUrl = "/thiepmaudovang/audio/bg-music.mp3",
  isPlaying,
  onTogglePlay,
}: AudioMemoryProps) {
  if (!musicUrl) return null;

  return (
    <section className="relative py-8 px-4 bg-[#121212] border-b border-[#3A2924] text-[#F1E6D2]">
      <div className="max-w-md mx-auto bg-[#181615] border-2 border-[#3A2924] rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4">
        {/* Cassette Tape Reel Icon Visual */}
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl bg-[#24211F] border border-[#3A2924] flex items-center justify-center relative overflow-hidden ${
              isPlaying ? "border-[#A53A32]" : ""
            }`}
          >
            <Radio
              className={`w-6 h-6 text-[#D69C52] ${isPlaying ? "animate-pulse" : "opacity-60"}`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-[#A53A32]/10 animate-ping pointer-events-none rounded-xl" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#D69C52] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A53A32] animate-ping" />
              <span>ANALOG AUDIO TAPE</span>
            </div>
            <h4 className="font-serif text-sm text-[#F1E6D2] font-semibold">
              Nhạc Nền Phòng Tráng Phim
            </h4>
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          type="button"
          aria-label={isPlaying ? "Dừng nhạc" : "Phát nhạc"}
          className="w-11 h-11 rounded-full bg-[#A53A32] hover:bg-[#A53A32]/90 text-[#F1E6D2] flex items-center justify-center transition-transform active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D69C52]"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
      </div>
    </section>
  );
}
