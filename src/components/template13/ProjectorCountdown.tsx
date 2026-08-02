"use client";

import React, { useState, useEffect } from "react";
import { Film, Play, Sparkles, Clock } from "lucide-react";

interface ProjectorCountdownProps {
  targetDate?: string | null;
}

export default function ProjectorCountdown({ targetDate }: ProjectorCountdownProps) {
  const [isProjecting, setIsProjecting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const destination = targetDate ? new Date(targetDate).getTime() : new Date("2026-10-10T11:00:00+07:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = destination - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <section className="py-10 bg-[#121212] text-[#F1E6D2] text-center border-b border-[#3A2924]">
        <div className="max-w-md mx-auto p-6 bg-[#181615] rounded-2xl border border-[#3A2924] font-mono text-xs text-[#D69C52]">
          ĐANG TẢI MÁY CHIẾU ĐẾM NGƯỢC...
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-14 px-4 bg-[#121212] text-[#F1E6D2] border-b border-[#3A2924] overflow-hidden">
      {/* Light Cone beam when projecting */}
      {isProjecting && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-full bg-gradient-to-b from-[#D69C52]/20 via-[#A53A32]/10 to-transparent blur-xl pointer-events-none animate-pulse" />
      )}

      <div className="max-w-xl mx-auto space-y-6 relative z-10 text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24211F] border border-[#3A2924] rounded-full text-[10px] font-mono tracking-widest text-[#D69C52] uppercase">
            <Film className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>INTERACTIVE COUNTDOWN PROJECTOR</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F1E6D2] font-bold">
            Máy Chiếu Đếm Ngược Ngày Hỷ
          </h2>
          <p className="text-xs text-[#F1E6D2]/70 max-w-sm mx-auto italic font-serif">
            Chạm vào nút khởi động máy chiếu để đưa số ngày giờ đếm ngược chiếu lên phông nền phòng tối.
          </p>
        </div>

        {/* Projector Trigger & Screen Unit */}
        <div className="bg-[#181615] border-2 border-[#3A2924] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6 relative">
          {/* Projector Control Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsProjecting(!isProjecting)}
              type="button"
              className={`px-5 py-3 rounded-full font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D69C52] ${
                isProjecting
                  ? "bg-[#A53A32] text-[#F1E6D2] shadow-[#A53A32]/40"
                  : "bg-[#24211F] text-[#D69C52] border border-[#3A2924] hover:bg-[#3A2924]"
              }`}
            >
              <Play className={`w-4 h-4 ${isProjecting ? "animate-spin" : ""}`} />
              <span>{isProjecting ? "BẬT MÁY CHIẾU (ON)" : "CHẠM ĐỂ BẬT MÁY CHIẾU"}</span>
            </button>
          </div>

          {/* Projection Screen Screen */}
          <div
            className={`p-6 rounded-xl border-2 transition-all duration-500 bg-[#121212] ${
              isProjecting
                ? "border-[#D69C52] shadow-[0_0_30px_rgba(214,156,82,0.25)]"
                : "border-[#3A2924] opacity-80"
            }`}
          >
            {timeLeft.isPast ? (
              <div className="py-4 space-y-2">
                <Sparkles className="w-8 h-8 text-[#D69C52] mx-auto animate-bounce" />
                <h3 className="font-serif text-2xl text-[#F1E6D2] font-bold">
                  Lễ Cưới Đã Diễn Ra Ngập Tràn Hạnh Phúc!
                </h3>
                <p className="text-xs font-mono text-[#D69C52]">
                  CẢM ƠN BẠN ĐÃ LÀ MỘT PHẦN TRONG KHUNG HÌNH KỶ NIỆM.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center font-mono">
                {/* Days */}
                <div className="bg-[#24211F] p-3 rounded-lg border border-[#3A2924]">
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-[#F1E6D2] block">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-[#D69C52] uppercase tracking-wider block mt-1">
                    NGÀY
                  </span>
                </div>

                {/* Hours */}
                <div className="bg-[#24211F] p-3 rounded-lg border border-[#3A2924]">
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-[#F1E6D2] block">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-[#D69C52] uppercase tracking-wider block mt-1">
                    GIỜ
                  </span>
                </div>

                {/* Minutes */}
                <div className="bg-[#24211F] p-3 rounded-lg border border-[#3A2924]">
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-[#F1E6D2] block">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-[#D69C52] uppercase tracking-wider block mt-1">
                    PHÚT
                  </span>
                </div>

                {/* Seconds */}
                <div className="bg-[#24211F] p-3 rounded-lg border border-[#3A2924]">
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-[#A53A32] block">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-[#D69C52] uppercase tracking-wider block mt-1">
                    GIÂY
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
