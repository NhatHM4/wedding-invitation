"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Unlock } from "lucide-react";

interface ScratchPostcardProps {
  hiddenQuote?: string;
  secretImage?: string;
}

export default function ScratchPostcard({
  hiddenQuote = "Điểm đến đẹp nhất không nằm trên bản đồ, mà là nơi chúng mình có nhau.",
  secretImage = "/thiepmaudovang/images/cover.jpg",
}: ScratchPostcardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("passport_postcard_scratched");
      if (saved === "true") {
        setIsRevealed(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = "#172235";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#B89B62";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

    ctx.fillStyle = "#F4EBDD";
    ctx.font = "bold 13px font-mono, monospace";
    ctx.textAlign = "center";
    ctx.fillText("SECRET LOVE POSTCARD", canvas.width / 2, canvas.height / 2 - 12);

    ctx.fillStyle = "#B89B62";
    ctx.font = "11px sans-serif";
    ctx.fillText("✦ CÀO NHẸ ĐỂ KHÁM PHÁ ✦", canvas.width / 2, canvas.height / 2 + 15);
  }, [inView, isRevealed]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percentage = (transparentCount / (pixels.length / 4)) * 100;
    if (percentage >= 45) {
      revealFully();
    }
  };

  const revealFully = () => {
    setIsRevealed(true);
    try {
      sessionStorage.setItem("passport_postcard_scratched", "true");
    } catch {
      // Ignore
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  return (
    <section ref={containerRef} className="relative py-12 px-3 bg-[#F4EBDD] text-[#272521] overflow-hidden">
      <div className="max-w-full mx-auto space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#172235]/10 border border-[#172235]/20 rounded-full text-[9px] font-mono tracking-widest text-[#762F3A] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#762F3A]" />
            <span>INTERACTIVE SCRATCH POSTCARD</span>
          </div>
          <h2 className="font-serif text-2xl text-[#172235] font-bold">
            Bưu Thiếp Bí Mật
          </h2>
          <p className="text-[11px] text-[#272521]/70 max-w-xs mx-auto italic">
            Dùng ngón tay cào nhẹ lớp phủ để khám phá thông điệp bí mật dành cho bạn.
          </p>
        </div>

        {/* Scratch Postcard Container */}
        <div className="relative bg-[#FFFBF5] border-2 border-[#B89B62] rounded-2xl p-4 shadow-xl space-y-4 max-w-[400px] mx-auto overflow-hidden">
          {/* Underlying Secret Content */}
          <div className="relative space-y-3 text-center">
            <div className="relative w-full h-56 rounded-xl overflow-hidden border-2 border-[#B89B62]/40 shadow-inner">
              <Image
                src={secretImage}
                alt="Bưu thiếp bí mật"
                fill
                sizes="(max-width: 480px) 100vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172235]/95 via-[#172235]/50 to-transparent flex flex-col items-center justify-end p-4 text-[#F4EBDD] text-center space-y-1.5">
                <span className="text-[9px] font-mono tracking-widest text-[#B89B62] uppercase font-bold">
                  LOVE MESSAGE
                </span>
                <p className="font-serif text-sm sm:text-base italic font-bold leading-relaxed">
                  &ldquo;{hiddenQuote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Canvas Scratch Overlay */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer touch-none z-20"
            />
          )}

          {/* Quick Reveal Button */}
          <div className="flex justify-center pt-1 relative z-30">
            <button
              type="button"
              onClick={revealFully}
              className="w-full py-2.5 bg-[#172235] hover:bg-[#762F3A] text-[#F4EBDD] text-[11px] font-mono tracking-wider uppercase font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5 text-[#B89B62]" />
              <span>{isRevealed ? "ĐÃ MỞ HOÀN TOÀN" : "MỞ NHANH BƯU THIẾP"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
