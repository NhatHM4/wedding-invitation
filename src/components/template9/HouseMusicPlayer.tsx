"use client";

import React, { useState, useEffect, useRef } from "react";

interface HouseMusicPlayerProps {
  musicUrl?: string;
  autoPlayTriggered?: boolean;
}

export default function HouseMusicPlayer({ musicUrl, autoPlayTriggered }: HouseMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const defaultMusic = "/template8/audio/bg-music.mp3";
  const src = musicUrl || defaultMusic;

  useEffect(() => {
    if (autoPlayTriggered && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Autoplay blocked by browser:", err);
      });
    }
  }, [autoPlayTriggered]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#49372F] text-[#F3EFE7] shadow-lg border border-[#D8CABB]/40 transition-all duration-300 hover:scale-105 hover:bg-[#A55D43] focus:outline-none focus:ring-2 focus:ring-[#A55D43]"
      >
        {/* Animated key/disc icon */}
        <div className={`transition-transform duration-700 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v3" />
          </svg>
        </div>

        {/* Soundwave bars if playing */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 flex gap-[2px] items-end h-3 bg-[#49372F] px-1 py-[2px] rounded-full border border-[#D8CABB]/30">
            <span className="w-[2px] bg-[#E2B96F] animate-bounce h-2" style={{ animationDelay: "0ms" }}></span>
            <span className="w-[2px] bg-[#E2B96F] animate-bounce h-3" style={{ animationDelay: "150ms" }}></span>
            <span className="w-[2px] bg-[#E2B96F] animate-bounce h-1.5" style={{ animationDelay: "300ms" }}></span>
          </div>
        )}
      </button>
    </div>
  );
}
