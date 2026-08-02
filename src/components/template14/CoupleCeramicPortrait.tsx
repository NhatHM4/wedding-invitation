"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

interface CoupleCeramicPortraitProps {
  groomName: string;
  brideName: string;
  groomImage?: string;
  brideImage?: string;
  groomStory?: string;
  brideStory?: string;
  metDate?: string;
}

export default function CoupleCeramicPortrait({
  groomName,
  brideName,
  groomImage = "/thiepmaudovang/images/cover.jpg",
  brideImage = "/thiepmaudovang/images/gallery-1.jpg",
  groomStory = "Một người điềm tĩnh, ấm áp và luôn dành sự kiên nhẫn trọn vẹn cho người mình yêu.",
  brideStory = "Một cô gái giàu năng lượng, tinh tế và luôn mang tiếng cười đến mọi khoảnh khắc.",
  metDate = "Tháng 10, 2021",
}: CoupleCeramicPortraitProps) {
  return (
    <section id="couple" className="relative py-20 px-4 bg-[#F3ECDD] overflow-hidden">
      {/* Background Section Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B99245]">
          CHÚNG MÌNH • HAI MẢNH GỐM
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#252320] font-bold">
          Dâu & Rể
        </h2>
        <div className="w-12 h-0.5 bg-[#B99245] mx-auto rounded-full mt-2" />
      </div>

      {/* Main Container - Staggered Ceramic Shapes */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
        
        {/* Golden Seam Connection SVG Line across middle */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 z-20 pointer-events-none">
          <svg viewBox="0 0 120 40" className="w-full text-[#B99245]">
            <path
              d="M0 20 C30 5, 60 35, 120 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="4 2"
              className="animate-pulse"
            />
            <circle cx="60" cy="20" r="4" fill="#B99245" />
          </svg>
        </div>

        {/* Groom Ceramic Piece - Warm Clay Base */}
        <div className="relative group p-6 rounded-3xl bg-[#E0C9B3]/40 border border-[#C9A98D] shadow-lg transition-transform duration-500 hover:-translate-y-1">
          {/* Ceramic Shape Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#6A3034] text-[#FAF7F0] text-[10px] font-mono tracking-widest uppercase shadow-sm">
            CHÚ RỂ
          </div>

          {/* Photo Mask Container */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 border-2 border-[#FAF7F0] shadow-md">
            <Image
              src={groomImage}
              alt={`Chú rể ${groomName}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252320]/60 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-2xl font-serif font-bold tracking-wide">{groomName}</h3>
            </div>
          </div>

          <p className="text-sm font-serif text-[#252320]/90 leading-relaxed italic">
            "{groomStory}"
          </p>
        </div>

        {/* Bride Ceramic Piece - Porcelain Ivory Base */}
        <div className="relative group p-6 rounded-3xl bg-[#FAF7F0] border border-[#B99245]/40 shadow-lg transition-transform duration-500 hover:-translate-y-1">
          {/* Ceramic Shape Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#B99245] text-[#252320] text-[10px] font-mono tracking-widest uppercase shadow-sm">
            CÔ DÂU
          </div>

          {/* Photo Mask Container */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 border-2 border-[#C9A98D]/60 shadow-md">
            <Image
              src={brideImage}
              alt={`Cô dâu ${brideName}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252320]/60 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-2xl font-serif font-bold tracking-wide">{brideName}</h3>
            </div>
          </div>

          <p className="text-sm font-serif text-[#252320]/90 leading-relaxed italic">
            "{brideStory}"
          </p>
        </div>
      </div>

      {/* Meeting Date Stamp Footer */}
      {metDate && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#252320] text-[#FAF7F0] border border-[#B99245]/40 text-xs font-serif shadow-sm">
            <Heart className="w-3.5 h-3.5 text-[#B99245] fill-[#B99245]" />
            <span>Ngày đầu gặp gỡ: <strong className="text-[#B99245]">{metDate}</strong></span>
          </div>
        </div>
      )}
    </section>
  );
}
