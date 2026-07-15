"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { staggerContainer, fadeInUp, fadeInRight } from "./motion-presets";

interface Cl46HeroSectionProps {
  wedding?: any;
}

export default function Cl46HeroSection({ wedding }: Cl46HeroSectionProps) {
  const groomName = wedding?.groom_name || "Tuấn Linh";
  const brideName = wedding?.bride_name || "Nguyễn Phượng";

  const heroStagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };

  const archTransition: Variants = {
    initial: { opacity: 0, y: 30, rotate: -2 },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotate: 0, 
      transition: { type: "spring", stiffness: 180, damping: 20 } 
    }
  };

  const textCurveTransition: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 0.8, 
      scale: 1, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 } 
    }
  };

  const scheduleStagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <motion.section 
      initial="initial"
      animate="animate"
      variants={heroStagger}
      className="relative w-full flex flex-col items-center bg-[#fdfcf7] overflow-hidden"
    >
      {/* Dark red top block */}
      <div className="w-full bg-gradient-to-b from-[#5c161e] to-[#420f14] px-5 pt-9 pb-10 flex flex-col items-center relative">
        {/* Subtle gold line framing */}
        <div className="absolute inset-4 border border-[#c5a880]/30 pointer-events-none rounded-sm" />

        {/* Title */}
        <motion.h2 
          variants={fadeInUp}
          className="font-serif-display text-[13px] tracking-[6px] text-[#c5a880] uppercase font-medium mb-8 z-10"
        >
          SAVE THE DATE
        </motion.h2>
 
        {/* Arch Frame & Schedule Info Block */}
        <div className="w-full flex items-start gap-4 justify-between z-10">
          {/* Arched Photo Frame */}
          <motion.div 
            variants={archTransition}
            className="relative w-[185px] aspect-[5/8] border-[3px] border-[#fdfcf7] rounded-t-full overflow-hidden shadow-md flex-shrink-0"
            style={{
              outline: "1px solid rgba(197, 168, 128, 0.4)",
              outlineOffset: "-4px",
            }}
          >
            {/* Arched Text: "I LOVE YOU" */}
            <motion.div 
              variants={textCurveTransition}
              className="absolute inset-x-0 top-3.5 z-10 flex justify-center pointer-events-none"
            >
              <svg viewBox="0 0 100 35" className="w-[110px] fill-[#fdfcf7] font-serif-display font-medium uppercase tracking-[2px] text-[7.5px]">
                <path id="curve" d="M 12 30 A 38 38 0 0 1 88 30" fill="transparent" />
                <text className="text-center">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    I LOVE YOU
                  </textPath>
                </text>
              </svg>
            </motion.div>
 
            <Image
              src="/thiepmaudovang/images/cover.jpg"
              alt="Arch Wedding Photo"
              fill
              priority
              sizes="190px"
              className="object-cover object-center"
            />
          </motion.div>
 
          {/* Schedule Info */}
          <motion.div 
            variants={scheduleStagger}
            className="flex-1 flex flex-col text-white pl-1 pr-1 pt-6 text-right"
          >
            {/* Event 1 */}
            <motion.div variants={fadeInRight} className="mb-6">
              <p className="font-sans-clean text-[9px] tracking-[3px] text-[#c5a880] uppercase font-bold">
                THƯ MỜI TIỆC CƯỚI
              </p>
              <div className="w-6 h-[0.5px] bg-[#c5a880]/50 ml-auto my-2" />
              <p className="font-sans-clean text-[10.5px] tracking-wide text-white/95">THỨ BẢY - 16:30</p>
              <p className="font-serif-display text-[18px] font-medium tracking-[1.5px] text-[#fdfcf7] mt-0.5">05 . 12 . 2025</p>
            </motion.div>
 
            {/* Separator line */}
            <motion.div 
              variants={{
                initial: { width: "0%", opacity: 0 },
                animate: { width: "100%", opacity: 0.2, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="w-full h-[0.5px] bg-white/20 my-2" 
            />
 
            {/* Event 2 */}
            <motion.div variants={fadeInRight} className="mt-4">
              <p className="font-sans-clean text-[9px] tracking-[3px] text-[#c5a880] uppercase font-bold">
                LỄ THÀNH HÔN
              </p>
              <div className="w-6 h-[0.5px] bg-[#c5a880]/50 ml-auto my-2" />
              <p className="font-sans-clean text-[10.5px] tracking-wide text-white/95">CHỦ NHẬT - 12:00</p>
              <p className="font-serif-display text-[18px] font-medium tracking-[1.5px] text-[#fdfcf7] mt-0.5">06 . 12 . 2025</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
 
      {/* Styled "WEDDING" Section Header right below the banner */}
      <div className="w-full py-10 text-center bg-[#fdfcf7] relative flex flex-col items-center border-b border-[#e8e2d8]">
        {/* Subtle background monogram or flourish */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[90px] font-serif-display text-[#c5a880]/10 font-light pointer-events-none select-none z-0">
          W
        </div>

        <motion.h1 
          variants={{
            initial: { opacity: 0, y: 15, letterSpacing: "2px" },
            animate: { 
              opacity: 0.95, 
              y: 0, 
              letterSpacing: "10px", 
              transition: { type: "spring", stiffness: 150, damping: 20, delay: 0.2 } 
            }
          }}
          className="font-serif-display text-[38px] tracking-[10px] text-[#5c161e] uppercase font-extralight relative select-none z-10"
        >
          WEDD<span className="relative">I<span className="absolute -top-1 left-[1px] text-[16px] text-[#c5a880]">✿</span></span>NG
        </motion.h1>
        
        <motion.div 
          variants={staggerContainer}
          className="flex flex-col items-center mt-4 z-10 w-full"
        >
          <motion.span 
            variants={fadeInUp}
            className="font-serif-display text-[32px] font-light text-[#3a3430] uppercase tracking-[2px] leading-tight"
          >
            {groomName}
          </motion.span>
          <motion.span 
            variants={fadeInUp}
            className="font-script-accent text-[38px] text-[#b8986c] my-1.5 leading-none"
          >
            &
          </motion.span>
          <motion.span 
            variants={fadeInUp}
            className="font-serif-display text-[32px] font-light text-[#3a3430] uppercase tracking-[2px] leading-tight"
          >
            {brideName}
          </motion.span>
          
          <div className="w-8 h-[0.5px] bg-[#c5a880] my-4" />
          
          <motion.p 
            variants={fadeInUp}
            className="font-sans-clean text-[9px] tracking-[4px] text-[#6b645f] uppercase font-bold"
          >
            LỄ THÀNH HÔN · 06.12.2025
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
