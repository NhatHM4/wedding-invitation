"use client";

import React, { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";

interface KilnCountdownProps {
  targetDate: string | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function KilnCountdown({ targetDate }: KilnCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTime = (): TimeLeft => {
      const target = targetDate ? new Date(targetDate).getTime() : new Date("2026-10-10T11:00:00+07:00").getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isPast: false,
      };
    };

    // Calculate immediately on mount to prevent SSR mismatch
    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    // Initial skeleton placeholder to avoid layout shift
    return (
      <div className="w-full py-12 px-4 bg-[#F3ECDD] flex items-center justify-center min-h-[160px]">
        <div className="w-6 h-6 rounded-full border-2 border-[#B99245] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <section className="relative py-16 px-4 bg-[#F3ECDD] border-t border-[#C9A98D]/40">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        
        {/* Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#B99245]/30 text-xs font-mono text-[#B99245]">
            <Clock className="w-3.5 h-3.5" />
            <span>THỜI GIAN MEN GỐM HOÀN THIỆN</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#252320] font-bold">
            Đếm Nguồn Hạnh Phúc
          </h3>
        </div>

        {timeLeft.isPast ? (
          <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#B99245]/40 text-center max-w-md mx-auto shadow-sm">
            <Sparkles className="w-6 h-6 text-[#B99245] mx-auto mb-2" />
            <p className="text-base font-serif italic text-[#6A3034] font-medium">
              “Ngày đẹp nhất đã trở thành một phần ký ức của chúng mình.”
            </p>
          </div>
        ) : (
          /* Kiln Timer Grid */
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            {[
              { label: "Ngày", value: timeLeft.days },
              { label: "Giờ", value: timeLeft.hours },
              { label: "Phút", value: timeLeft.minutes },
              { label: "Giây", value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#FAF7F0] border border-[#C9A98D]/50 shadow-sm relative group hover:border-[#B99245] transition-colors"
              >
                {/* Gold seam top edge */}
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-[#B99245] rounded-full" />
                
                <span className="text-2xl sm:text-4xl font-mono text-[#252320] font-bold tracking-tight">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[11px] sm:text-xs font-serif text-[#76806B] uppercase tracking-wider mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
