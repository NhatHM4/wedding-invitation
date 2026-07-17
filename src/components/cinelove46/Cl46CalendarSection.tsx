"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "./motion-presets";

interface Cl46CalendarSectionProps {
  wedding?: any;
}

export default function Cl46CalendarSection({ wedding }: Cl46CalendarSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  let dayGroom = 5;
  let dayBride = 6;
  let month = 12;
  let year = 2025;

  if (wedding?.event_date) {
    const d = new Date(wedding.event_date);
    dayBride = d.getDate();
    dayGroom = dayBride - 1;
    month = d.getMonth() + 1;
    year = d.getFullYear();
  }

  const monthNames = [
    "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
    "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"
  ];

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const weekdays = ["T2","T3","T4","T5","T6","T7","CN"];
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className="w-full px-5 py-10 bg-[#fdfcf7] flex flex-col items-center overflow-hidden border-b border-[#e8e2d8]"
    >
      {/* Month header — large editorial */}
      <div className="w-full flex items-baseline gap-4 mb-6">
        <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent to-[#c5a880]/40" />
        <div className="text-center px-2">
          <h3 className="font-serif-display text-[42px] font-extralight tracking-[6px] text-[#5c161e] uppercase leading-none">
            THÁNG&nbsp;{month.toString().padStart(2, "0")}
          </h3>
          <p className="font-sans-clean text-[9px] tracking-[4px] text-[#a09790] uppercase font-bold mt-1">
            {year}
          </p>
        </div>
        <div className="flex-1 h-[0.5px] bg-gradient-to-l from-transparent to-[#c5a880]/40" />
      </div>

      {/* Asymmetric contour line */}
      <div className="contour-line mb-6 w-full" />

      {/* Calendar grid */}
      <div className="w-full relative">
        {/* Subtle inner frame */}
        <div className="absolute inset-0 border border-[#c5a880]/12 pointer-events-none" />

        <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center px-2 py-4 relative z-10">
          {/* Weekday headers */}
          {weekdays.map((w) => (
            <div key={w} className="font-sans-clean text-[9px] font-bold text-[#b8986c] uppercase py-1 tracking-wider">
              {w}
            </div>
          ))}

          {/* Day cells */}
          {cells.map((cell, idx) => {
            if (cell === null) return <div key={`empty-${idx}`} />;
            const isGroomDay = cell === dayGroom;
            const isBrideDay = cell === dayBride;

            return (
              <div key={cell} className="relative flex items-center justify-center h-8">
                {isGroomDay ? (
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <svg viewBox="0 0 24 24" className="absolute w-[30px] h-[30px] text-[#5c161e] fill-none stroke-current stroke-[1.5]">
                      <motion.path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                      />
                    </svg>
                    <span className="font-serif-display text-[12px] font-bold text-[#5c161e] z-10">{cell}</span>
                  </div>
                ) : isBrideDay ? (
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <motion.span
                      className="absolute inset-0.5 rounded-full"
                      style={{ background: "radial-gradient(circle at center, #8b1a1a, #5c161e)", borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%" }}
                      initial={shouldReduceMotion ? { scale: 1, opacity: 0.85 } : { scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 0.85 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 20, delay: 0.7 }}
                    />
                    <span className="font-serif-display text-[12px] font-bold text-white z-10">{cell}</span>
                  </div>
                ) : (
                  <span className="font-serif-display text-[13px] text-[#3a3430]">{cell}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-5">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#5c161e] fill-none stroke-current stroke-[1.5]">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="font-sans-clean text-[9px] text-[#6b645f] tracking-wider uppercase">Tiệc cưới</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full inline-block" style={{ background: "radial-gradient(circle at center, #8b1a1a, #5c161e)", borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%" }} />
          <span className="font-sans-clean text-[9px] text-[#6b645f] tracking-wider uppercase">Thành hôn</span>
        </div>
      </div>
    </motion.section>
  );
}
