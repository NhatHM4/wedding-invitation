"use client";

import { useEffect, useRef, useState } from "react";

export default function TmdnAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Use the existing thiepmaudovang audio if dotraucau doesn't have one yet
    const sources = [
      "/dotraucau/audio/bg-music.mp3",
    ];
    
    audioRef.current = new Audio(sources[0]);
    audioRef.current.loop = true;

    const tryAutoplay = () => {
      audioRef.current?.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    tryAutoplay();
    document.addEventListener("click", tryAutoplay, { once: true });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      document.removeEventListener("click", tryAutoplay);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      id="tmdn-audio-btn"
      onClick={toggle}
      aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      className={`fixed bottom-4 left-4 z-[99999] w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
        isPlaying ? "" : ""
      }`}
    >
      {isPlaying ? (
        /* Music note icon - playing state */
        <svg className="w-5 h-5 text-[#7d1f2a]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      ) : (
        /* Crossed music note - muted state */
        <span className="relative w-5 h-5 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-6 h-[1.5px] bg-gray-400 rotate-45 rounded-full block" />
          </span>
        </span>
      )}
    </button>
  );
}
