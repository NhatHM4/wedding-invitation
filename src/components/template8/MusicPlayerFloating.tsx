"use client";

import React, { useState, useRef, useEffect } from "react";
import { VolumeX, Disc } from "lucide-react";

interface MusicPlayerFloatingProps {
  musicUrl?: string;
}

export default function MusicPlayerFloating({ musicUrl }: MusicPlayerFloatingProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const src = musicUrl || "/template8/audio/bg-music.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    // Attempt playback on first user interaction cleanly
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <audio ref={audioRef} src={src} loop preload="auto" />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        className={`w-12 h-12 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-all ${
          isPlaying
            ? "bg-rose-600 text-white shadow-rose-400/50 scale-105"
            : "bg-gray-900/80 text-gray-300 backdrop-blur-md hover:bg-gray-900"
        }`}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc nền"}
      >
        {isPlaying ? (
          <Disc className="w-6 h-6 animate-spin" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>

      {isPlaying && (
        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-rose-800 shadow-md border border-rose-100 animate-pulse hidden sm:inline-block">
          Playing Music 🎵
        </span>
      )}
    </div>
  );
}
