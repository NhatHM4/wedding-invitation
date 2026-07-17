"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  heroStagger,
  fadeInUp,
  editorialSlide,
  botanicalIn,
  heroNameReveal,
  cinematicReveal,
} from "./motion-presets";

interface Cl46HeroSectionProps {
  wedding?: any;
}

// Botanical ink SVG motif — appears once in hero
const BotanicalStroke = () => (
  <svg
    width="52"
    height="72"
    viewBox="0 0 52 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-40"
  >
    {/* Main stem */}
    <path
      d="M26 70 C26 50, 26 30, 26 4"
      stroke="#2e4a3f"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Leaf 1 — left */}
    <path
      d="M26 52 C18 46, 14 38, 18 34 C22 38, 24 46, 26 52Z"
      fill="#2e4a3f"
      opacity="0.7"
    />
    {/* Leaf 2 — right */}
    <path
      d="M26 40 C34 34, 38 26, 34 22 C30 26, 28 34, 26 40Z"
      fill="#2e4a3f"
      opacity="0.7"
    />
    {/* Leaf 3 — left small */}
    <path
      d="M26 28 C20 24, 17 18, 20 15 C23 18, 24 24, 26 28Z"
      fill="#2e4a3f"
      opacity="0.5"
    />
    {/* Leaf 4 — right small */}
    <path
      d="M26 18 C31 14, 34 9, 32 6 C29 9, 27 14, 26 18Z"
      fill="#2e4a3f"
      opacity="0.5"
    />
  </svg>
);

export default function Cl46HeroSection({ wedding }: Cl46HeroSectionProps) {
  const groomName = wedding?.groom_name || "Tuấn Linh";
  const brideName = wedding?.bride_name || "Nguyễn Phượng";

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={heroStagger}
      className="relative w-full flex flex-col items-center bg-[#fdfcf7] overflow-hidden"
    >
      {/* ── Dark burgundy hero banner ── */}
      <div
        className="w-full flex flex-col items-center relative overflow-hidden"
        style={{ background: "linear-gradient(165deg, #5c161e 0%, #420f14 55%, #2a0a0d 100%)" }}
      >
        {/* Inner gold border frame */}
        <div className="absolute inset-4 border border-[#c5a880]/25 pointer-events-none z-10" />

        {/* SAVE THE DATE label */}
        <motion.p
          variants={fadeInUp}
          className="font-sans-clean text-[9px] tracking-[7px] text-[#c5a880]/80 uppercase font-bold mt-8 mb-6 z-10"
        >
          SAVE THE DATE
        </motion.p>

        {/* Arch photo — centered, larger */}
        <motion.div
          variants={cinematicReveal}
          className="relative w-[220px] aspect-[5/7] border-[3px] border-[#fdfcf7] rounded-t-full overflow-hidden shadow-lg z-10 film-frame"
          style={{
            outline: "1px solid rgba(197, 168, 128, 0.4)",
            outlineOffset: "-4px",
          }}
        >
          {/* Arched curve text */}
          <div className="absolute inset-x-0 top-3 z-20 flex justify-center pointer-events-none">
            <svg viewBox="0 0 100 35" className="w-[120px] fill-[#fdfcf7]/70 font-sans-clean uppercase text-[7px]">
              <path id="cl46-curve" d="M 10 30 A 40 40 0 0 1 90 30" fill="transparent" />
              <text>
                <textPath href="#cl46-curve" startOffset="50%" textAnchor="middle" style={{ fontSize: "7px", letterSpacing: "2px" }}>
                  I LOVE YOU
                </textPath>
              </text>
            </svg>
          </div>

          <Image
            src="/thiepmaudovang/images/cover.jpg"
            alt="Wedding couple portrait"
            fill
            priority
            sizes="240px"
            className="object-cover object-center"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a0d]/30 via-transparent to-transparent pointer-events-none z-10" />
        </motion.div>

        {/* Botanical ornament — bottom right of banner */}
        <motion.div
          variants={botanicalIn}
          className="absolute bottom-0 right-4 z-10 pointer-events-none"
        >
          <BotanicalStroke />
        </motion.div>

        {/* Event schedule — stacked below photo */}
        <motion.div
          variants={fadeInUp}
          className="w-full px-8 pt-8 pb-6 z-10 flex flex-col gap-0"
        >
          {/* Gold contour line — drawn in */}
          <motion.div
            variants={{ initial: { scaleX: 0 }, animate: { scaleX: 1, transition: { duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.5 } } }}
            style={{ transformOrigin: "left center" }}
            className="w-[65%] h-[0.5px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent opacity-50 mb-6"
          />

          {/* Event 1 */}
          <motion.div variants={editorialSlide} className="flex items-baseline justify-between mb-5">
            <div>
              <p className="font-sans-clean text-[8px] tracking-[3px] text-[#c5a880]/80 uppercase font-bold">
                THƯ MỜI TIỆC CƯỚI
              </p>
              <p className="font-sans-clean text-[10px] tracking-wide text-white/70 mt-1">
                THỨ BẢY · 16:30
              </p>
            </div>
            <p className="font-serif-display text-[20px] font-light tracking-[1px] text-[#fdfcf7]">
              05.12
            </p>
          </motion.div>

          {/* Separator */}
          <div className="w-full h-[0.5px] bg-white/10 mb-5" />

          {/* Event 2 */}
          <motion.div variants={editorialSlide} className="flex items-baseline justify-between">
            <div>
              <p className="font-sans-clean text-[8px] tracking-[3px] text-[#c5a880]/80 uppercase font-bold">
                LỄ THÀNH HÔN
              </p>
              <p className="font-sans-clean text-[10px] tracking-wide text-white/70 mt-1">
                CHỦ NHẬT · 12:00
              </p>
            </div>
            <p className="font-serif-display text-[20px] font-light tracking-[1px] text-[#fdfcf7]">
              06.12
            </p>
          </motion.div>

          {/* Year */}
          <p className="font-sans-clean text-[9px] tracking-[4px] text-[#c5a880]/60 uppercase mt-6 text-right">
            2025
          </p>
        </motion.div>
      </div>

      {/* ── Couple name block ── */}
      <div className="w-full py-10 text-center bg-[#fdfcf7] relative flex flex-col items-center overflow-hidden border-b border-[#e8e2d8]">

        {/* Background oversized date numeral — editorial depth layer */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none editorial-date"
          aria-hidden="true"
        >
          06
        </div>

        {/* Small vertical rule left */}
        <div className="absolute left-5 top-8 bottom-8 w-[0.5px] bg-gradient-to-b from-transparent via-[#c5a880]/30 to-transparent" />

        {/* Couple names */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
          className="flex flex-col items-center relative z-10"
        >
          <motion.span
            variants={heroNameReveal}
            className="font-serif-display text-[36px] font-extralight text-[#3a3430] uppercase tracking-[4px] leading-tight"
          >
            {groomName}
          </motion.span>

          <motion.span
            variants={fadeInUp}
            className="font-script-accent text-[44px] text-[#b8986c] my-1 leading-none"
          >
            &amp;
          </motion.span>

          <motion.span
            variants={heroNameReveal}
            className="font-serif-display text-[36px] font-extralight text-[#3a3430] uppercase tracking-[4px] leading-tight"
          >
            {brideName}
          </motion.span>
        </motion.div>

        {/* Asymmetric gold contour line */}
        <div className="contour-line mt-5 mx-6" />

        {/* Date caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans-clean text-[9px] tracking-[4px] text-[#6b645f] uppercase font-bold mt-2 z-10"
        >
          LỄ THÀNH HÔN · 06.12.2025
        </motion.p>
      </div>
    </motion.section>
  );
}
