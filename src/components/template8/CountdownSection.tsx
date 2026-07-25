"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Wedding } from "@/types";

interface CountdownSectionProps {
  wedding: Wedding;
}

export default function CountdownSection({ wedding }: CountdownSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDateStr = wedding.event_date || "2025-11-16T12:00:00+07:00";

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(targetDateStr);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  const units = [
    { label: "NGÀY", value: mounted ? timeLeft.days : 0 },
    { label: "GIỜ", value: mounted ? timeLeft.hours : 0 },
    { label: "PHÚT", value: mounted ? timeLeft.minutes : 0 },
    { label: "GIÂY", value: mounted ? timeLeft.seconds : 0 },
  ];

  const signatureEase = [0.4, 0, 0.2, 1] as const;

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-rose-900 via-rose-950 to-rose-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.18),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: signatureEase }}
          className="flex items-center justify-center gap-2 text-rose-300 text-xs tracking-[0.3em] uppercase mb-2 font-medium"
        >
          <Clock className="w-4 h-4 text-rose-400" />
          <span>CÙNG ĐẾM NGƯỢC ĐẾN NGÀY TRỌNG ĐẠI</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: signatureEase }}
          className="font-serif text-3xl sm:text-4xl text-rose-100 mb-10"
        >
          SAVE THE DATE
        </motion.h2>

        {/* Timer Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {units.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: signatureEase }}
              className="flex flex-col items-center p-3 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner hover:bg-white/15 transition-colors"
            >
              <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mb-1">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-200 tracking-widest uppercase font-medium">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
