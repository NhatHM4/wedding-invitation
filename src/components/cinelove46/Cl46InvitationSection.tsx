"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "./motion-presets";

interface Cl46InvitationSectionProps {
  wedding?: any;
}

export default function Cl46InvitationSection({ wedding }: Cl46InvitationSectionProps) {
  return (
    <section className="w-full px-5 py-8 bg-[#fdfcf7] flex flex-col items-center overflow-hidden border-b border-[#e8e2d8]">
      {/* Parents host columns */}
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full grid grid-cols-2 gap-6 text-center mb-8 pb-6 border-b border-[#e8e2d8]"
      >
        <motion.div variants={fadeInUp}>
          <p className="font-script-accent text-[28px] text-[#b8986c] leading-none mb-1">
            Nhà Trai
          </p>
          <p className="font-serif-display text-[14.5px] font-medium text-[#3a3430] leading-relaxed mt-2.5">
            Ông: <span className="font-semibold text-[#5c161e]">Tống Đình Quý</span>
            <br />
            Bà: <span className="font-semibold text-[#5c161e]">Vũ Thị Hoài Vân</span>
          </p>
          <p className="font-sans-clean text-[11px] text-[#6b645f] mt-2 leading-normal">
            10 Lê Lợi - Đề Thám
            <br />
            TP. Thái Bình
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <p className="font-script-accent text-[28px] text-[#b8986c] leading-none mb-1">
            Nhà Gái
          </p>
          <p className="font-serif-display text-[14.5px] font-medium text-[#3a3430] leading-relaxed mt-2.5">
            Ông: <span className="font-semibold text-[#5c161e]">Nguyễn Đình Quý</span>
            <br />
            Bà: <span className="font-semibold text-[#5c161e]">Vũ Thị Hoài Vân</span>
          </p>
          <p className="font-sans-clean text-[11px] text-[#6b645f] mt-2 leading-normal">
            Vĩnh An Nam - Tam Xuân
            <br />
            Đà Nẵng
          </p>
        </motion.div>
      </motion.div>

      {/* Main Official Invitation details */}
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="w-full text-center mb-8"
      >
        <p className="font-script-accent text-[34px] text-[#b8986c] mb-1" style={{ fontStyle: "normal" }}>
          Thư Mời
        </p>
        <p className="font-serif-display text-[11px] font-bold tracking-[2.5px] text-[#3a3430] uppercase mb-5">
          Tham dự lễ Thành Hôn của CHÚNG MÌNH
        </p>

        <div className="stationery-card w-full px-5 py-6">
          <p className="font-sans-clean text-[10px] tracking-[2.5px] text-[#5c161e] uppercase font-bold mb-2">
            LỄ THÀNH HÔN CHÍNH THỨC
          </p>
          <p className="font-serif-display text-[15.5px] font-bold text-[#3a3430] tracking-wide">
            12:00, Chủ Nhật - Ngày 06.12.2025
          </p>
          <p className="font-sans-clean text-[10.5px] italic text-[#6b645f] mt-1.5">
            (Tức ngày 12 tháng 11 năm Ất Tỵ)
          </p>
          <div className="w-8 h-[0.5px] bg-[#c5a880]/60 mx-auto my-3" />
          <p className="font-serif-display text-[13.5px] text-[#5c161e] font-semibold tracking-wider">
            TẠI TƯ GIA NHÀ TRAI
          </p>
          <p className="font-sans-clean text-[11px] text-[#6b645f] mt-2.5 leading-relaxed">
            10 Lê Lợi - Đề Thám - TP. Thái Bình
          </p>
          
          <a
            href="https://maps.google.com/?q=10+Le+Loi+De+Tham+Thai+Binh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-4 px-6 py-2.5 stationery-btn-primary"
          >
            Chỉ đường
          </a>
        </div>
      </motion.div>

      {/* Detail Ceremony and Party Cards side-by-side (flex-column on mobile) */}
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full schedule-grid-wrap"
      >
        {/* Card 1 */}
        <motion.div 
          variants={fadeInUp}
          className="flex-1 stationery-card p-5 text-center flex flex-col justify-between"
        >
          <div>
            <p className="font-sans-clean text-[9.5px] font-bold tracking-[2px] text-[#5c161e] uppercase mb-1.5">
              Tiệc Nhà Trai
            </p>
            <p className="font-serif-display text-[13.5px] font-bold text-[#3a3430] leading-relaxed">
              16:30 - Thứ Bảy
              <br />
              05 . 12 . 2025
            </p>
            <p className="font-sans-clean text-[9.5px] text-[#6b645f] italic mt-1.5">
              (11/11 âm lịch)
            </p>
            <div className="w-6 h-[0.5px] bg-[#c5a880]/60 mx-auto my-3" />
            <p className="font-serif-display text-[11.5px] text-[#6b645f] font-semibold leading-snug">
              Tại Tư Gia Nhà Trai
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=10+Le+Loi+De+Tham+Thai+Binh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2.5 stationery-btn-outline"
          >
            Chỉ đường
          </a>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          variants={fadeInUp}
          className="flex-1 stationery-card p-5 text-center flex flex-col justify-between"
        >
          <div>
            <p className="font-sans-clean text-[9.5px] font-bold tracking-[2px] text-[#5c161e] uppercase mb-1.5">
              Tiệc Nhà Gái
            </p>
            <p className="font-serif-display text-[13.5px] font-bold text-[#3a3430] leading-relaxed">
              18:00 - Thứ Bảy
              <br />
              06 . 12 . 2025
            </p>
            <p className="font-sans-clean text-[9.5px] text-[#6b645f] italic mt-1.5">
              (11/11 âm lịch)
            </p>
            <div className="w-6 h-[0.5px] bg-[#c5a880]/60 mx-auto my-3" />
            <p className="font-serif-display text-[11.5px] text-[#6b645f] font-semibold leading-snug">
              Tại Khách sạn Cinelove
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Khach+san+Cinelove+Da+Nang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2.5 stationery-btn-outline"
          >
            Chỉ đường
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
