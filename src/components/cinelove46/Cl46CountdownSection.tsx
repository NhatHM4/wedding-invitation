"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Cl46CountdownSectionProps {
  wedding?: any;
}

export default function Cl46CountdownSection({ wedding }: Cl46CountdownSectionProps) {
  const targetDateStr = wedding?.event_date || "2025-12-06T12:00:00";
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();
    
    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  return (
    <section className="is-animation anim-fade-up w-full px-5 py-6 bg-white flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-6">
        <p className="font-barlow text-[10px] font-bold tracking-[3px] text-gray-500 uppercase">
          COUNTDOWN
        </p>
        <p className="font-ephesis text-[28px] text-[#5a1212] mt-0.5" style={{ fontStyle: "italic" }}>
          Đếm ngược ngày cưới
        </p>
        <div className="w-12 h-[1px] bg-[#e8ddd4] mx-auto mt-2" />
      </div>

      {/* Main photo & Countdown tags container */}
      <div className="relative w-full flex items-stretch gap-4 justify-between h-[360px]">
        {/* Large photo on the left */}
        <div className="relative flex-1 rounded border border-gray-100 overflow-hidden shadow-sm">
          <Image
            src="/thiepmaudovang/images/cover.jpg"
            alt="Countdown backdrop"
            fill
            sizes="250px"
            className="object-cover object-center"
          />
          {/* Vertical text banner inside picture */}
          <div className="absolute left-3 bottom-4 text-white/40 font-cormorant font-bold uppercase tracking-[4px] text-[18px] [writing-mode:vertical-lr] select-none">
            LOVE ALWAYS
          </div>
        </div>

        {/* Stacked countdown columns on the right */}
        <div className="w-[85px] flex flex-col justify-between">
          {/* Days */}
          <div className="bg-[#5a1212] rounded p-2.5 text-center text-white shadow-sm flex flex-col justify-center flex-1 mb-2.5">
            <span className="font-cormorant text-[20px] font-bold leading-none">{timeLeft.days}</span>
            <span className="font-barlow text-[9px] uppercase tracking-[1px] text-white/70 mt-1">ngày</span>
          </div>

          {/* Hours */}
          <div className="bg-[#5a1212] rounded p-2.5 text-center text-white shadow-sm flex flex-col justify-center flex-1 mb-2.5">
            <span className="font-cormorant text-[20px] font-bold leading-none">{timeLeft.hours}</span>
            <span className="font-barlow text-[9px] uppercase tracking-[1px] text-white/70 mt-1">giờ</span>
          </div>

          {/* Minutes */}
          <div className="bg-[#5a1212] rounded p-2.5 text-center text-white shadow-sm flex flex-col justify-center flex-1 mb-2.5">
            <span className="font-cormorant text-[20px] font-bold leading-none">{timeLeft.minutes}</span>
            <span className="font-barlow text-[9px] uppercase tracking-[1px] text-white/70 mt-1">phút</span>
          </div>

          {/* Seconds */}
          <div className="bg-[#5a1212] rounded p-2.5 text-center text-white shadow-sm flex flex-col justify-center flex-1">
            <span className="font-cormorant text-[20px] font-bold leading-none">{timeLeft.seconds}</span>
            <span className="font-barlow text-[9px] uppercase tracking-[1px] text-white/70 mt-1">giây</span>
          </div>
        </div>
      </div>
    </section>
  );
}
