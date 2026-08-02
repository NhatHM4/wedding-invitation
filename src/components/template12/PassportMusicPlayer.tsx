"use client";

import React, { useEffect, useRef, useState } from "react";
import { Disc, Volume2, VolumeX } from "lucide-react";

interface PassportMusicPlayerProps {
  musicUrl?: string;
  autoPlayRequested?: boolean;
}

export default function PassportMusicPlayer({
  musicUrl = "/thiepmaudovang/audio/bg-music.mp3",
  autoPlayRequested = false,
}: PassportMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (autoPlayRequested && !hasInteracted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setIsPlaying(false);
        });
    }
  }, [autoPlayRequested, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play error:", err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border shadow-xl transition-all duration-300 ${
          isPlaying
            ? "bg-[#172235] border-[#B89B62] text-[#F4EBDD] shadow-[#172235]/40 scale-105"
            : "bg-[#F4EBDD] border-[#762F3A]/40 text-[#272521] shadow-black/10 hover:border-[#762F3A]"
        }`}
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <Disc
            className={`w-5 h-5 transition-transform duration-700 ${
              isPlaying ? "animate-spin text-[#B89B62]" : "text-[#762F3A]"
            }`}
          />
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase font-semibold pr-1">
          {isPlaying ? "PASSPORT SOUNDS" : "BẬT NHẠC"}
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#B89B62] animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#A9473F]" />
        )}
      </button>
    </div>
  );
}
