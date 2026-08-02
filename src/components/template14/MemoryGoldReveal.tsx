"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Eye, Lock, CheckCircle2 } from "lucide-react";

interface MemoryGoldRevealProps {
  memoryImage?: string;
  quoteMessage?: string;
}

export default function MemoryGoldReveal({
  memoryImage = "/thiepmaudovang/images/cover.jpg",
  quoteMessage = "Điều quý giá không phải là chưa từng tổn thương, mà là vẫn chọn ở lại và cùng nhau chữa lành.",
}: MemoryGoldRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [revealPercent, setRevealPercent] = useState<number>(0);

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("kintsugi_memory_revealed");
      if (stored === "true") {
        setIsRevealed(true);
      }
    } catch {
      // Ignore sessionStorage issues
    }
  }, []);

  // Initialize Canvas Glaze Layer
  useEffect(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution to container size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 360;
    canvas.height = rect.height || 260;

    // Fill with warm clay ceramic glaze layer
    ctx.fillStyle = "#C9A98D";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add crack lines hints on glaze
    ctx.strokeStyle = "#B99245";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.2, canvas.height * 0.1);
    ctx.lineTo(canvas.width * 0.4, canvas.height * 0.5);
    ctx.lineTo(canvas.width * 0.7, canvas.height * 0.4);
    ctx.lineTo(canvas.width * 0.9, canvas.height * 0.9);
    ctx.stroke();

    // Draw hint text
    ctx.fillStyle = "#252320";
    ctx.font = "13px serif";
    ctx.textAlign = "center";
    ctx.fillText("Vuốt ngón tay để phủ vàng kỷ niệm", canvas.width / 2, canvas.height / 2 + 30);
  }, [isRevealed]);

  // Scratch handling
  const scratch = (x: number, y: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Estimate reveal percent
    setRevealPercent((prev) => {
      const next = prev + 4;
      if (next >= 50 && !isRevealed) {
        completeReveal();
      }
      return Math.min(100, next);
    });
  };

  const completeReveal = () => {
    setIsRevealed(true);
    try {
      sessionStorage.setItem("kintsugi_memory_revealed", "true");
    } catch {
      // Ignore
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  return (
    <section className="relative py-20 px-4 bg-[#F3ECDD] border-t border-[#C9A98D]/40">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A3034]/10 border border-[#6A3034]/30 text-[#6A3034] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#B99245]" />
            <span>TƯƠNG TÁC ĐẶC BIỆT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#252320] font-bold">
            Phủ Vàng Kỷ Niệm
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#252320]/75 max-w-md mx-auto">
            Khám phá bức ảnh kỷ niệm được lưu giữ đằng sau lớp men gốm thời gian
          </p>
        </div>

        {/* Interactive Scratch / Card Display Container */}
        <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F0] bg-[#252320]">
          
          {/* Base Photo Revealed */}
          <Image
            src={memoryImage}
            alt="Kỷ niệm được phủ vàng"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center"
          />

          {/* Golden Seam Overlay Glow when unlocked */}
          {isRevealed && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#252320]/80 via-transparent to-transparent flex items-end p-6 text-left transition-opacity duration-700">
              <div className="text-[#FAF7F0] space-y-2">
                <div className="flex items-center gap-2 text-[#B99245] text-xs font-mono uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kỷ niệm đã mở khóa</span>
                </div>
                <p className="text-sm font-serif italic leading-relaxed text-[#FAF7F0]">
                  "{quoteMessage}"
                </p>
              </div>
            </div>
          )}

          {/* Interactive Scratch Glaze Canvas */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-500"
            />
          )}
        </div>

        {/* Action Controls & Fallback */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {!isRevealed ? (
            <button
              onClick={completeReveal}
              type="button"
              className="px-6 py-2.5 min-h-[44px] rounded-full bg-[#FAF7F0] text-[#252320] font-serif text-xs border border-[#B99245] hover:bg-[#B99245] hover:text-[#FAF7F0] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Eye className="w-4 h-4 text-[#6A3034]" />
              <span>Mở kỷ niệm ngay</span>
            </button>
          ) : (
            <div className="text-xs font-serif text-[#76806B] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B99245]" />
              <span>Bức ảnh đã lưu lại trong hành trình của bạn</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
