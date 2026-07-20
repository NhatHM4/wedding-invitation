"use client";

import { useRef, useEffect, useCallback } from "react";

interface MusicControllerProps {
  musicSrc: string;
  isPlaying: boolean;
  onToggle: (playing: boolean) => void;
}

export function MusicController({ musicSrc, isPlaying, onToggle }: MusicControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(musicSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [musicSrc]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        onToggle(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, onToggle]);

  const handleToggle = useCallback(() => {
    onToggle(!isPlaying);
  }, [isPlaying, onToggle]);

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full glass flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
      aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      type="button"
    >
      {isPlaying ? (
        /* Sound wave bars animation */
        <div className="flex items-end gap-[3px] h-4">
          <span className="sound-bar" />
          <span className="sound-bar" />
          <span className="sound-bar" />
          <span className="sound-bar" />
        </div>
      ) : (
        /* Muted icon */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4AF72"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
