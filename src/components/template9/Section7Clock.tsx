"use client";

import React, { useState, useEffect } from "react";

interface Section7ClockProps {
  eventDate?: string | null;
}

export default function Section7Clock({ eventDate }: Section7ClockProps) {
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

  useEffect(() => {
    let target = new Date("2025-11-16T12:00:00+07:00");
    if (eventDate) {
      const parsed = new Date(eventDate);
      if (!isNaN(parsed.getTime())) {
        target = parsed;
      }
    }

    const calculate = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section id="clock" className="relative w-full py-24 px-6 bg-[#F3EFE7] text-[#49372F] overflow-hidden border-t border-[#D8CABB]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Identifier */}
        <div className="font-sans text-xs tracking-widest uppercase text-[#6F7461] mb-3">
          SECTION 07 &middot; ARCHITECTURAL TIMING
        </div>

        {/* Subtle Architectural Clock Icon */}
        <div className="w-12 h-12 rounded-full border border-[#49372F]/40 flex items-center justify-center mx-auto mb-6 bg-[#D8CABB]/30">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A55D43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        {/* Narrative Sentence Countdown (No 4-box generic cards!) */}
        {!timeLeft.isPast ? (
          <div className="space-y-4">
            <p className="font-serif text-2xl md:text-4xl text-[#49372F] italic leading-relaxed">
              &ldquo;Chúng mình sẽ trở về chung một nhà sau&rdquo;
            </p>
            <div className="inline-block py-3 px-6 border-b-2 border-t-2 border-[#A55D43]/60 my-2">
              <span className="font-serif text-3xl md:text-5xl font-bold text-[#A55D43] tracking-tight">
                {timeLeft.days} <span className="font-sans text-lg text-[#49372F] font-normal">ngày</span> &middot; {timeLeft.hours} <span className="font-sans text-lg text-[#49372F] font-normal">giờ</span> &middot; {timeLeft.minutes} <span className="font-sans text-lg text-[#49372F] font-normal">phút</span>
              </span>
            </div>
            <p className="font-serif text-2xl md:text-4xl text-[#49372F] italic leading-relaxed">
              &ldquo;cánh cửa ngôi nhà chung sẽ chính thức mở.&rdquo;
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="font-serif text-2xl md:text-3xl text-[#A55D43] italic">
              &ldquo;Cánh cửa ngôi nhà chung đã chính thức rộng mở!&rdquo;
            </p>
            <p className="font-sans text-sm text-[#6F7461]">
              Cảm ơn tất cả quý vị đã cùng chứng kiến và sẻ chia niềm hạnh phúc.
            </p>
          </div>
        )}

        {/* Bottom subtle note */}
        <p className="mt-8 font-handwriting text-xl text-[#6F7461]">
          * đếm ngược từng khoảnh khắc chờ đón ngày đặc biệt *
        </p>
      </div>
    </section>
  );
}
