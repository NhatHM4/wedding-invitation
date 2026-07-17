"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, editorialSlide } from "./motion-presets";

interface Cl46InvitationSectionProps {
  wedding?: any;
}

export default function Cl46InvitationSection({ wedding }: Cl46InvitationSectionProps) {
  return (
    <section className="w-full px-5 py-10 bg-[#fdfcf7] flex flex-col items-center overflow-hidden border-b border-[#e8e2d8] relative">

      {/* Vertical decorative rule — left edge */}
      <div className="absolute left-5 top-10 bottom-10 w-[0.5px] bg-gradient-to-b from-transparent via-[#c5a880]/30 to-transparent pointer-events-none" />

      {/* ── Family columns ── */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full grid grid-cols-2 gap-0 text-center mb-9 pb-7 relative"
      >
        {/* Center gold divider between columns */}
        <div className="absolute left-1/2 top-2 bottom-2 w-[0.5px] bg-gradient-to-b from-transparent via-[#c5a880]/40 to-transparent pointer-events-none -translate-x-1/2" />

        {/* Nhà Trai */}
        <motion.div variants={editorialSlide} className="pr-4">
          <p className="font-script-accent text-[26px] text-[#b8986c] leading-none mb-2">
            Nhà Trai
          </p>
          <p className="font-serif-display text-[13.5px] font-medium text-[#3a3430] leading-relaxed mt-2">
            Ông: <span className="font-semibold text-[#5c161e]">Tống Đình Quý</span>
            <br />
            Bà: <span className="font-semibold text-[#5c161e]">Vũ Thị Hoài Vân</span>
          </p>
          <p className="font-sans-clean text-[10px] text-[#6b645f] mt-2 leading-relaxed tracking-wide">
            10 Lê Lợi — Đề Thám
            <br />
            TP. Thái Bình
          </p>
        </motion.div>

        {/* Nhà Gái */}
        <motion.div variants={editorialSlide} className="pl-4">
          <p className="font-script-accent text-[26px] text-[#b8986c] leading-none mb-2">
            Nhà Gái
          </p>
          <p className="font-serif-display text-[13.5px] font-medium text-[#3a3430] leading-relaxed mt-2">
            Ông: <span className="font-semibold text-[#5c161e]">Nguyễn Đình Quý</span>
            <br />
            Bà: <span className="font-semibold text-[#5c161e]">Vũ Thị Hoài Vân</span>
          </p>
          <p className="font-sans-clean text-[10px] text-[#6b645f] mt-2 leading-relaxed tracking-wide">
            Vĩnh An Nam — Tam Xuân
            <br />
            Đà Nẵng
          </p>
        </motion.div>
      </motion.div>

      {/* Asymmetric gold contour line */}
      <div className="contour-line mb-8 w-full" />

      {/* ── "Thư Mời" main invitation heading ── */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="w-full text-center mb-7 relative"
      >
        {/* Decorative large initial letter — clipped left */}
        <div
          className="absolute -left-1 top-0 font-serif-display text-[80px] font-extralight text-[#5c161e]/08 leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          T
        </div>

        <p className="font-script-accent text-[40px] text-[#b8986c] relative z-10" style={{ fontStyle: "normal" }}>
          Thư Mời
        </p>
        <p className="font-sans-clean text-[9.5px] font-bold tracking-[2.5px] text-[#3a3430] uppercase mt-1 relative z-10">
          Tham dự Lễ Thành Hôn của chúng mình
        </p>
      </motion.div>

      {/* ── Main ceremony details — editorial block, no boxed card ── */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="w-full mb-7"
      >
        {/* Editorial date block */}
        <div className="flex items-baseline gap-4 mb-4">
          <span className="editorial-date">06</span>
          <div className="flex-1">
            <p className="font-sans-clean text-[9px] tracking-[3px] text-[#c5a880] uppercase font-bold">
              LỄ THÀNH HÔN CHÍNH THỨC
            </p>
            <p className="font-serif-display text-[17px] font-medium text-[#3a3430] tracking-wide mt-1 leading-snug">
              12:00, Chủ Nhật
              <br />
              <span className="font-light text-[15px]">Ngày 06 tháng 12, 2025</span>
            </p>
            <p className="font-sans-clean text-[10px] italic text-[#6b645f] mt-1">
              (Tức ngày 12 tháng 11 năm Ất Tỵ)
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="pl-0 border-l-2 border-[#c5a880]/40 pl-4 mt-4">
          <p className="font-sans-clean text-[9px] tracking-[2px] text-[#5c161e] uppercase font-bold mb-1">
            Địa điểm
          </p>
          <p className="font-serif-display text-[14px] text-[#5c161e] font-semibold">
            Tại Tư Gia Nhà Trai
          </p>
          <p className="font-sans-clean text-[11px] text-[#6b645f] mt-1 leading-relaxed">
            10 Lê Lợi — Đề Thám — TP. Thái Bình
          </p>
          <a
            href="https://maps.google.com/?q=10+Le+Loi+De+Tham+Thai+Binh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 font-sans-clean text-[10px] font-bold tracking-[2px] text-[#5c161e] uppercase border-b border-[#c5a880] pb-px hover:border-[#5c161e] transition-colors"
          >
            Chỉ đường →
          </a>
        </div>
      </motion.div>

      {/* ── Sub-events — two editorial columns ── */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full grid grid-cols-2 gap-5"
      >
        {/* Event 1 */}
        <motion.div
          variants={fadeInUp}
          className="border-t border-[#c5a880]/40 pt-4"
        >
          <p className="font-sans-clean text-[8.5px] font-bold tracking-[2px] text-[#5c161e] uppercase mb-2">
            Tiệc Nhà Trai
          </p>
          <p className="font-serif-display text-[22px] font-light text-[#3a3430] leading-none">05</p>
          <p className="font-sans-clean text-[10px] text-[#6b645f] mt-1">
            16:30 · Thứ Bảy
          </p>
          <p className="font-sans-clean text-[9px] italic text-[#a09790] mt-0.5">11/11 âm lịch</p>
          <p className="font-serif-display text-[12px] text-[#6b645f] font-medium mt-2 leading-snug">
            Tại Tư Gia Nhà Trai
          </p>
          <a
            href="https://maps.google.com/?q=10+Le+Loi+De+Tham+Thai+Binh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 font-sans-clean text-[9px] font-bold tracking-[2px] text-[#5c161e] uppercase border-b border-[#c5a880]/60 pb-px hover:border-[#5c161e] transition-colors"
          >
            Chỉ đường →
          </a>
        </motion.div>

        {/* Event 2 */}
        <motion.div
          variants={fadeInUp}
          className="border-t border-[#c5a880]/40 pt-4"
        >
          <p className="font-sans-clean text-[8.5px] font-bold tracking-[2px] text-[#5c161e] uppercase mb-2">
            Tiệc Nhà Gái
          </p>
          <p className="font-serif-display text-[22px] font-light text-[#3a3430] leading-none">06</p>
          <p className="font-sans-clean text-[10px] text-[#6b645f] mt-1">
            18:00 · Thứ Bảy
          </p>
          <p className="font-sans-clean text-[9px] italic text-[#a09790] mt-0.5">11/11 âm lịch</p>
          <p className="font-serif-display text-[12px] text-[#6b645f] font-medium mt-2 leading-snug">
            Tại Khách sạn Cinelove
          </p>
          <a
            href="https://maps.google.com/?q=Khach+san+Cinelove+Da+Nang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 font-sans-clean text-[9px] font-bold tracking-[2px] text-[#5c161e] uppercase border-b border-[#c5a880]/60 pb-px hover:border-[#5c161e] transition-colors"
          >
            Chỉ đường →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
