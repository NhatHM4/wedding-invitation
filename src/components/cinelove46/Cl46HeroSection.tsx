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
      className="relative w-full flex flex-col items-center bg-white overflow-hidden"
    >
      {/* Dark red top block */}
      <div className="w-full bg-[#5a1212] px-5 pt-8 pb-10 flex flex-col items-center">
        {/* Title */}
        <motion.h2 
          variants={fadeInUp}
          className="font-cormorant text-[15px] tracking-[5px] text-white/90 uppercase font-semibold mb-8"
        >
          SAVE THE DATE
        </motion.h2>

        {/* Arch Frame & Schedule Info Block */}
        <div className="w-full flex items-start gap-4 justify-between">
          {/* Arched Photo Frame */}
          <motion.div 
            variants={archTransition}
            className="relative w-[190px] aspect-[5/8] border-[3px] border-white/95 rounded-t-full overflow-hidden shadow-lg flex-shrink-0"
          >
            {/* Arched Text: "I LOVE YOU" */}
            <motion.div 
              variants={textCurveTransition}
              className="absolute inset-x-0 top-3 z-10 flex justify-center pointer-events-none"
            >
              <svg viewBox="0 0 100 35" className="w-[120px] fill-white/80 font-cormorant font-bold uppercase tracking-[1.5px] text-[7.5px]">
                <path id="curve" d="M 10 30 A 40 40 0 0 1 90 30" fill="transparent" />
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
              <p className="font-barlow text-[10px] tracking-[2.5px] text-white/70 uppercase font-bold">
                THƯ MỜI TIỆC CƯỚI
              </p>
              <div className="w-8 h-[1px] bg-white/40 ml-auto my-1.5" />
              <p className="font-barlow text-[12px] font-semibold">THỨ BẢY - 16:30</p>
              <p className="font-cormorant text-[16px] font-bold tracking-wider mt-0.5">05 . 12 . 2025</p>
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
              <p className="font-barlow text-[10px] tracking-[2.5px] text-white/70 uppercase font-bold">
                LỄ THÀNH HÔN
              </p>
              <div className="w-8 h-[1px] bg-white/40 ml-auto my-1.5" />
              <p className="font-barlow text-[12px] font-semibold">CHỦ NHẬT - 12:00</p>
              <p className="font-cormorant text-[16px] font-bold tracking-wider mt-0.5">06 . 12 . 2025</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Styled "WEDDING" Section Header right below the banner */}
      <div className="w-full py-8 text-center bg-white relative flex flex-col items-center">
        <motion.h1 
          variants={{
            initial: { opacity: 0, y: 20, letterSpacing: "2px" },
            animate: { 
              opacity: 0.9, 
              y: 0, 
              letterSpacing: "8px", 
              transition: { type: "spring", stiffness: 150, damping: 20 } 
            }
          }}
          className="font-cormorant text-[42px] tracking-[8px] text-[#5a1212]/90 uppercase font-light relative select-none"
        >
          WEDD<span className="relative">I<span className="absolute -top-1 left-[1px] text-[18px]">✿</span></span>NG
        </motion.h1>
        
        <motion.p 
          variants={staggerContainer}
          className="font-ephesis text-[24px] text-gray-500 font-medium leading-none -mt-2 flex items-center justify-center gap-1.5"
        >
          <motion.span variants={fadeInUp}>{groomName}</motion.span>
          <motion.span variants={fadeInUp} className="text-[#5a1212]">&amp;</motion.span>
          <motion.span variants={fadeInUp}>{brideName}</motion.span>
        </motion.p>
      </div>
    </motion.section>
  );
}
