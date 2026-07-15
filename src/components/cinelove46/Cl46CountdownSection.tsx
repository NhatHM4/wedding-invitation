"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from "./motion-presets";

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
    <section className="w-full px-5 py-8 bg-[#fdfcf7] flex flex-col items-center overflow-hidden border-b border-[#e8e2d8]">
      {/* Title */}
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="text-center mb-6"
      >
        <p className="font-sans-clean text-[9px] tracking-[3px] text-[#6b645f] uppercase font-bold">
          COUNTDOWN
        </p>
        <p className="font-script-accent text-[34px] text-[#5c161e] mt-1" style={{ fontStyle: "normal" }}>
          Đếm ngược ngày cưới
        </p>
        <div className="w-12 h-[0.5px] bg-[#c5a880] mx-auto mt-2" />
      </motion.div>

      {/* Main photo & Countdown tags container */}
      <div className="relative w-full flex items-stretch gap-4 justify-between h-[360px]">
        {/* Large photo on the left (anim-fade-left) */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInLeft}
          className="relative flex-1 rounded border border-[#e8e2d8] overflow-hidden shadow-sm bg-white p-1"
        >
          <div className="relative w-full h-full rounded-sm overflow-hidden">
            <Image
              src="/thiepmaudovang/images/cover.jpg"
              alt="Countdown backdrop"
              fill
              priority
              sizes="250px"
              className="object-cover object-center"
            />
          </div>
          {/* Vertical text banner inside picture */}
          <div className="absolute left-4 bottom-5 text-[#fdfcf7]/40 font-serif-display font-medium uppercase tracking-[4px] text-[18px] [writing-mode:vertical-lr] select-none z-10">
            LOVE ALWAYS
          </div>
        </motion.div>

        {/* Stacked countdown columns on the right */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="w-[85px] flex flex-col justify-between"
        >
          {/* Days */}
          <motion.div variants={fadeInRight} className="bg-[#faf6f0] border border-[#e8e2d8] rounded p-2 text-center text-[#5c161e] shadow-sm flex flex-col justify-center flex-1 mb-2.5 relative">
            <div className="absolute inset-0.5 border border-[#c5a880]/15 pointer-events-none rounded-sm" />
            <span className="font-serif-display text-[22px] font-medium leading-none z-10">{timeLeft.days}</span>
            <span className="font-sans-clean text-[9px] uppercase tracking-[1px] text-[#6b645f] mt-1 z-10 font-bold">ngày</span>
          </motion.div>

          {/* Hours */}
          <motion.div variants={fadeInRight} className="bg-[#faf6f0] border border-[#e8e2d8] rounded p-2 text-center text-[#5c161e] shadow-sm flex flex-col justify-center flex-1 mb-2.5 relative">
            <div className="absolute inset-0.5 border border-[#c5a880]/15 pointer-events-none rounded-sm" />
            <span className="font-serif-display text-[22px] font-medium leading-none z-10">{timeLeft.hours}</span>
            <span className="font-sans-clean text-[9px] uppercase tracking-[1px] text-[#6b645f] mt-1 z-10 font-bold">giờ</span>
          </motion.div>

          {/* Minutes */}
          <motion.div variants={fadeInRight} className="bg-[#faf6f0] border border-[#e8e2d8] rounded p-2 text-center text-[#5c161e] shadow-sm flex flex-col justify-center flex-1 mb-2.5 relative">
            <div className="absolute inset-0.5 border border-[#c5a880]/15 pointer-events-none rounded-sm" />
            <span className="font-serif-display text-[22px] font-medium leading-none z-10">{timeLeft.minutes}</span>
            <span className="font-sans-clean text-[9px] uppercase tracking-[1px] text-[#6b645f] mt-1 z-10 font-bold">phút</span>
          </motion.div>

          {/* Seconds */}
          <motion.div variants={fadeInRight} className="bg-[#faf6f0] border border-[#e8e2d8] rounded p-2 text-center text-[#5c161e] shadow-sm flex flex-col justify-center flex-1 relative">
            <div className="absolute inset-0.5 border border-[#c5a880]/15 pointer-events-none rounded-sm" />
            <span className="font-serif-display text-[22px] font-medium leading-none z-10">{timeLeft.seconds}</span>
            <span className="font-sans-clean text-[9px] uppercase tracking-[1px] text-[#6b645f] mt-1 z-10 font-bold">giây</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
