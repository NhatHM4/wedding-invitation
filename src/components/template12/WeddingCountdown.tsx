"use client";

import React, { useEffect, useState } from "react";

interface WeddingCountdownProps {
  targetDate?: string | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function WeddingCountdown({
  targetDate,
}: WeddingCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const date = targetDate ? new Date(targetDate).getTime() : new Date("2026-10-10T11:00:00+07:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = date - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto text-center font-mono">
        {["NGÀY", "GIỜ", "PHÚT", "GIÂY"].map((label) => (
          <div key={label} className="p-3 bg-[#172235] text-[#F4EBDD] rounded-xl border border-[#B89B62]/40">
            <span className="text-xl font-bold block">00</span>
            <span className="text-[9px] text-[#B89B62] font-semibold">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div className="p-4 bg-[#762F3A] text-[#F4EBDD] rounded-2xl text-center font-mono space-y-1 shadow-md">
        <span className="text-sm font-bold uppercase tracking-widest block">
          LỄ CƯỚI ĐÃ DIỄN RA RỰC RỠ HẠNH PHÚC
        </span>
        <span className="text-xs text-[#F4EBDD]/80">
          Cảm ơn bạn đã luôn đồng hành cùng hai gia đình!
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto text-center font-mono">
      <div className="p-3 bg-[#172235] text-[#F4EBDD] rounded-xl border border-[#B89B62]/40 shadow-md">
        <span className="text-xl sm:text-2xl font-bold block text-[#F4EBDD]">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        <span className="text-[9px] text-[#B89B62] font-semibold tracking-wider block">
          NGÀY / DAYS
        </span>
      </div>

      <div className="p-3 bg-[#172235] text-[#F4EBDD] rounded-xl border border-[#B89B62]/40 shadow-md">
        <span className="text-xl sm:text-2xl font-bold block text-[#F4EBDD]">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-[9px] text-[#B89B62] font-semibold tracking-wider block">
          GIỜ / HOURS
        </span>
      </div>

      <div className="p-3 bg-[#172235] text-[#F4EBDD] rounded-xl border border-[#B89B62]/40 shadow-md">
        <span className="text-xl sm:text-2xl font-bold block text-[#F4EBDD]">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-[9px] text-[#B89B62] font-semibold tracking-wider block">
          PHÚT / MINS
        </span>
      </div>

      <div className="p-3 bg-[#172235] text-[#F4EBDD] rounded-xl border border-[#B89B62]/40 shadow-md">
        <span className="text-xl sm:text-2xl font-bold block text-[#A9473F] animate-pulse">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-[9px] text-[#B89B62] font-semibold tracking-wider block">
          GIÂY / SECS
        </span>
      </div>
    </div>
  );
}
