"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Cl46AudioPlayerProps {
  audioSrc?: string;
}

export default function Cl46AudioPlayer({ audioSrc }: Cl46AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const src = audioSrc || "/thiepmaudovang/audio/bg-music.mp3";

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [src]);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        setLoading(true);
        await audioRef.current.play();
        setPlaying(true);
      } catch (e) {
        // autoplay blocked
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={toggle}
      className={`fixed top-4 right-4 z-[99] w-9.5 h-9.5 rounded-full flex items-center justify-center shadow-lg border border-[#c5a880]/30 transition-colors focus-visible:outline-2 focus-visible:outline-[#5c161e] focus-visible:outline-offset-1 ${
        playing ? "animate-spin-slow-custom bg-[#5c161e] text-[#fdfcf7]" : "animate-spin-slow-custom paused bg-[#fdfcf7] text-[#5c161e]"
      }`}
      style={{
        boxShadow: "0 4px 15px rgba(92, 52, 45, 0.12)"
      }}
      title={playing ? "Tắt nhạc" : "Bật nhạc"}
      aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
    >
      {loading ? (
        <div className={`w-3.5 h-3.5 border-2 rounded-full animate-spin ${playing ? "border-[#fdfcf7]" : "border-[#5c161e]"} border-top-color-transparent`} />
      ) : playing ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="animate-pulse">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}
    </motion.button>
  );
}
