"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "./motion-presets";

interface Cl46InvitationSectionProps {
  wedding?: any;
}

export default function Cl46InvitationSection({ wedding }: Cl46InvitationSectionProps) {
  return (
    <section className="w-full px-5 py-6 bg-white flex flex-col items-center overflow-hidden">
      {/* Parents host columns */}
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full grid grid-cols-2 gap-6 text-center mb-8 border-b border-[#e8ddd4] pb-6"
      >
        <motion.div variants={fadeInUp}>
          <p className="font-barlow text-[10px] font-bold tracking-[2px] text-[#5a1212] uppercase mb-1.5">
            Nhà Trai
          </p>
          <p className="font-barlow text-[12px] font-bold text-gray-800 leading-relaxed">
            Ông: Tống Đình Quý
            <br />
            Bà: Vũ Thị Hoài Vân
          </p>
          <p className="font-barlow text-[10.5px] text-gray-500 mt-1 leading-normal">
            10 Lê Lợi - Đề Thám
            <br />
            TP. Thái Bình
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <p className="font-barlow text-[10px] font-bold tracking-[2px] text-[#5a1212] uppercase mb-1.5">
            Nhà Gái
          </p>
          <p className="font-barlow text-[12px] font-bold text-gray-800 leading-relaxed">
            Ông: Nguyễn Đình Quý
            <br />
            Bà: Vũ Thị Hoài Vân
          </p>
          <p className="font-barlow text-[10.5px] text-gray-500 mt-1 leading-normal">
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
        <p className="font-ephesis text-[24px] text-gray-500 font-semibold mb-2" style={{ fontStyle: "italic" }}>
          Thư Mời
        </p>
        <p className="font-barlow text-[11px] font-bold tracking-[2px] text-gray-800 uppercase mb-4">
          Tham dự lễ Thành Hôn của CHÚNG MÌNH
        </p>

        <div className="bg-[#fcfaf7] border border-[#e8e2d8] rounded px-4 py-5 shadow-sm">
          <p className="font-barlow text-[11px] tracking-[1.5px] text-[#5a1212] uppercase font-bold mb-1">
            LỄ THÀNH HÔN CHÍNH THỨC
          </p>
          <p className="font-barlow text-[13px] font-semibold text-gray-800">
            12:00, Chủ Nhật - Ngày 06.12.2025
          </p>
          <p className="font-barlow text-[10px] italic text-gray-500 mt-0.5">
            (Tức ngày 12 tháng 11 năm Ất Tỵ)
          </p>
          <p className="font-barlow text-[12px] text-gray-700 font-semibold mt-3">
            TẠI TƯ GIA NHÀ TRAI
          </p>
          <p className="font-barlow text-[11px] text-gray-500 mt-1">
            10 Lê Lợi - Đề Thám - TP. Thái Bình
          </p>
          
          <a
            href="https://maps.google.com/?q=10+Le+Loi+De+Tham+Thai+Binh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-4 px-5 py-2 bg-[#5a1212] hover:bg-[#4c0d0d] text-white font-barlow text-[10.5px] font-bold tracking-widest uppercase rounded-full shadow-sm transition-colors"
          >
            Chỉ đường
          </a>
        </div>
      </motion.div>

      {/* Detail Ceremony and Party Cards side-by-side */}
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full grid grid-cols-2 gap-4"
      >
        {/* Card 1 */}
        <motion.div 
          variants={fadeInUp}
          className="bg-[#fcfaf7] border border-[#e8e2d8] rounded p-3.5 text-center flex flex-col justify-between shadow-sm"
        >
          <div>
            <p className="font-barlow text-[10px] font-bold tracking-[1.5px] text-[#5a1212] uppercase mb-1">
              Tiệc Nhà Trai
            </p>
            <p className="font-barlow text-[11px] font-bold text-gray-800">
              16:30 - Thứ Bảy
              <br />
              05 . 12 . 2025
            </p>
            <p className="font-barlow text-[9px] text-gray-500 italic mt-0.5">
              (11/11 âm lịch)
            </p>
            <p className="font-barlow text-[10px] text-gray-600 mt-2 font-semibold leading-snug">
              Tại Tư Gia Nhà Trai
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=10+Le+Loi+De+Tham+Thai+Binh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-3 py-1.5 border border-[#5a1212] text-[#5a1212] font-barlow text-[9.5px] font-bold tracking-wider uppercase rounded-full hover:bg-[#5a1212] hover:text-white transition-colors"
          >
            Chỉ đường
          </a>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          variants={fadeInUp}
          className="bg-[#fcfaf7] border border-[#e8e2d8] rounded p-3.5 text-center flex flex-col justify-between shadow-sm"
        >
          <div>
            <p className="font-barlow text-[10px] font-bold tracking-[1.5px] text-[#5a1212] uppercase mb-1">
              Tiệc Nhà Gái
            </p>
            <p className="font-barlow text-[11px] font-bold text-gray-800">
              18:00 - Thứ Bảy
              <br />
              06 . 12 . 2025
            </p>
            <p className="font-barlow text-[9px] text-gray-500 italic mt-0.5">
              (11/11 âm lịch)
            </p>
            <p className="font-barlow text-[10px] text-gray-600 mt-2 font-semibold leading-snug">
              Tại Khách sạn Cinelove
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Khach+san+Cinelove+Da+Nang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-3 py-1.5 border border-[#5a1212] text-[#5a1212] font-barlow text-[9.5px] font-bold tracking-wider uppercase rounded-full hover:bg-[#5a1212] hover:text-white transition-colors"
          >
            Chỉ đường
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
