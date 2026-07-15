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

  // Month data
  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  // Grid dates calculation
  const firstDay = new Date(year, month - 1, 1).getDay(); // Sun = 0
  const daysInMonth = new Date(year, month, 0).getDate();
  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Align to Mon start

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
      className="w-full px-5 py-8 bg-[#fdfcf7] flex flex-col items-center overflow-hidden border-b border-[#e8e2d8]"
    >
      {/* Month Header Banner */}
      <div className="w-full text-center pb-4 pt-2">
        <span className="font-sans-clean text-[9px] tracking-[3px] text-[#6b645f] uppercase font-bold">
          CALENDAR
        </span>
        <h3 className="font-serif-display text-[22px] tracking-[3px] text-[#5c161e] uppercase font-light mt-1">
          {monthNames[month - 1]}
        </h3>
        <div className="w-12 h-[0.5px] bg-[#c5a880] mx-auto mt-2" />
      </div>

      {/* Calendar Grid Box */}
      <div className="w-full border border-[#e8e2d8] rounded px-4 py-6 bg-[#fdfcf7] relative">
        {/* Subtle inner gold frame */}
        <div className="absolute inset-1.5 border border-[#c5a880]/15 pointer-events-none rounded-sm" />

        <div className="grid grid-cols-7 gap-y-3.5 gap-x-1 text-center relative z-10">
          {/* Weekday headers */}
          {weekdays.map((w) => (
            <div key={w} className="font-sans-clean text-[9.5px] font-bold text-[#b8986c] uppercase py-1">
              {w}
            </div>
          ))}

          {/* Days */}
          {cells.map((cell, idx) => {
            if (cell === null) return <div key={`empty-${idx}`} />;
            
            const isGroomDay = cell === dayGroom;
            const isBrideDay = cell === dayBride;

            return (
              <div key={cell} className="relative flex items-center justify-center h-8">
                {isGroomDay ? (
                  // Day 5 with heart outline drawing
                  <div className="relative flex items-center justify-center w-8 h-8">
                    {/* SVG Heart stroke */}
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
                  // Day 6 with fingerprint or heart background color
                  <div className="relative flex items-center justify-center w-8 h-8">
                    {/* Fingerprint red stain simulation */}
                    <motion.span 
                      className="absolute inset-0.5 rounded-full"
                      style={{
                        background: "radial-gradient(circle at center, #8b1a1a, #5c161e)",
                        borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%"
                      }}
                      initial={shouldReduceMotion ? { scale: 1, opacity: 0.8 } : { scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 0.8 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 20, delay: 0.7 }}
                    />
                    <span className="font-serif-display text-[12px] font-bold text-white z-10">{cell}</span>
                  </div>
                ) : (
                  <span className="font-serif-display text-[12px] text-[#3a3430]">{cell}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
