"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TmdvAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Use a ref to track hasStarted inside closures (avoid stale closure + effect re-run)
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Initialize audio element once
    const audio = new Audio("/thiepmaudovang/audio/bg-music.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    // Track playback state via native events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Auto-play on first user interaction anywhere on the page
    const handleAutoPlay = () => {
      if (hasStartedRef.current) return;
      audio.play()
        .then(() => {
          hasStartedRef.current = true;
          setIsPlaying(true);
        })
        .catch(() => {
          console.log("Autoplay blocked by browser policy.");
        });
      document.body.removeEventListener("click", handleAutoPlay);
      document.body.removeEventListener("touchstart", handleAutoPlay);
    };

    // Play triggered by "Mở Thiệp" button via custom event
    const playMusicListener = () => {
      if (hasStartedRef.current) return;
      audio.play()
        .then(() => {
          hasStartedRef.current = true;
          setIsPlaying(true);
        })
        .catch((err) => console.log("Play trigger error:", err));
    };

    document.body.addEventListener("click", handleAutoPlay);
    document.body.addEventListener("touchstart", handleAutoPlay, { passive: true });
    window.addEventListener("play-wedding-music", playMusicListener);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      document.body.removeEventListener("click", handleAutoPlay);
      document.body.removeEventListener("touchstart", handleAutoPlay);
      window.removeEventListener("play-wedding-music", playMusicListener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          hasStartedRef.current = true;
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  return (
    <div 
      onClick={togglePlay}
      id="music-toggle"
      title="Bật / Tắt nhạc"
      aria-label="Bật / Tắt nhạc"
      className={`fixed left-4 md:left-[calc((100vw-420px)/2+14px)] bottom-4 z-[99999] w-[56px] h-[56px] rounded-full bg-white/30 backdrop-blur-[4px] grid place-items-center cursor-pointer select-none transition-all duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:translate-y-[-1px] hover:scale-[1.03] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] ${
        isPlaying ? "vibrating animate-pulse" : ""
      }`}
    >
      {/* PNG when music is PAUSED */}
      <div className={`relative w-[44px] h-[44px] ${isPlaying ? "hidden" : "block"}`}>
        <Image
          src="/thiepmaudovang/images/music-play.png"
          alt="Play Icon"
          fill
          sizes="44px"
          priority
          className="object-contain"
        />
      </div>

      {/* GIF when music is PLAYING */}
      <div className={`relative w-[44px] h-[44px] ${isPlaying ? "block" : "hidden"}`}>
        <Image
          src="/thiepmaudovang/images/music-pause.gif"
          alt="Pause Icon"
          fill
          sizes="44px"
          priority
          unoptimized
          className="object-contain"
        />
      </div>
    </div>
  );
}
