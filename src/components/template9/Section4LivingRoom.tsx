"use client";

import React from "react";
import Image from "next/image";

interface Section4LivingRoomProps {
  images?: string[];
}

export default function Section4LivingRoom({ images }: Section4LivingRoomProps) {
  const defaultList = [
    "/template8/images/gallery-1.jpg",
    "/template8/images/gallery-2.jpg",
    "/template8/images/gallery-3.jpg",
    "/template8/images/gallery-4.jpg",
    "/template8/images/gallery-5.jpg",
    "/template8/images/gallery-6.jpg",
  ];

  const gallery = images && images.length > 0 ? images : defaultList;

  const img1 = gallery[0] || defaultList[0];
  const img2 = gallery[1] || defaultList[1];
  const img3 = gallery[2] || defaultList[2];
  const img4 = gallery[3] || defaultList[3];
  const img5 = gallery[4] || defaultList[4];

  return (
    <section id="living-room" className="relative w-full py-28 px-6 bg-[#F3EFE7] text-[#49372F] overflow-hidden border-t border-[#D8CABB]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="font-sans text-xs tracking-widest uppercase text-[#A55D43] mb-2 block">
            SECTION 04 &middot; THE LIVING ROOM
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#49372F] tracking-tight mb-6">
            Góc Kỷ Niệm Thường Ngày
          </h2>
          <p className="font-serif text-xl text-[#49372F]/90 italic leading-relaxed">
            &ldquo;Chúng mình không nhớ hết những ngày đặc biệt. Nhưng lại nhớ rất rõ cảm giác của những ngày bình thường có nhau.&rdquo;
          </p>
          <div className="w-16 h-[1px] bg-[#A55D43] mx-auto mt-6" />
        </div>

        {/* Curated Wall Composition (Editorial Layout) */}
        <div className="space-y-16">
          {/* Row 1: Large Framed Photo + Handwritten Marginal Note */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Main Framed Photo */}
            <div className="md:col-span-8 relative">
              {/* Architectural Frame outline */}
              <div className="absolute -inset-3 border border-[#49372F]/30 -z-10 rounded-sm" />
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm shadow-md bg-[#D8CABB]">
                <Image
                  src={img1}
                  alt="Living room memory 1"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
              <div className="mt-2 flex justify-between items-center text-xs font-sans text-[#6F7461]">
                <span>FRAME NO. 01 &middot; PERSPECTIVE</span>
                <span className="font-handwriting text-sm text-[#A55D43]">bữa sáng cùng nhau</span>
              </div>
            </div>

            {/* Handwritten Note Column */}
            <div className="md:col-span-4 flex flex-col justify-center p-6 bg-[#D8CABB]/30 border border-[#D8CABB] rounded-sm relative">
              <span className="font-sans text-[10px] tracking-widest text-[#6F7461] uppercase mb-2">
                ARCHIVAL MEMO
              </span>
              <p className="font-handwriting text-2xl text-[#49372F] leading-snug">
                Những chiều mưa cùng che chung một chiếc ô, những tách cà phê thơm lừng và những câu chuyện không hồi kết...
              </p>
              <div className="mt-4 pt-4 border-t border-[#49372F]/20 text-right">
                <span className="font-serif italic text-xs text-[#A55D43]">~ Ký ký ức ngày thường</span>
              </div>
            </div>
          </div>

          {/* Row 2: Two Offset Photos + Architectural Line Frame */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Photo A (Left Offset) */}
            <div className="md:col-span-5 md:mt-8">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border-4 border-[#F3EFE7] shadow-lg bg-[#D8CABB]">
                <Image
                  src={img2}
                  alt="Living room memory 2"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <p className="mt-2 font-handwriting text-lg text-[#6F7461] text-center">
                chuyến đi xa đầu tiên
              </p>
            </div>

            {/* Photo B (Right Offset with partial line frame) */}
            <div className="md:col-span-7 relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-t border-l border-[#A55D43]/40 pointer-events-none" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border-4 border-[#F3EFE7] shadow-lg bg-[#D8CABB]">
                <Image
                  src={img3}
                  alt="Living room memory 3"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
              </div>
              <p className="mt-2 font-handwriting text-lg text-[#A55D43] text-right">
                bình yên bên nhành hoa chiều
              </p>
            </div>
          </div>

          {/* Row 3: Film Strip Sequence (Quiet Full-Width Memory) */}
          <div className="relative pt-6 border-t border-b border-[#D8CABB] py-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-sans text-xs tracking-widest uppercase text-[#6F7461]">
                SEQUENCE 35MM &middot; ORDINARY RITUALS
              </span>
              <span className="font-handwriting text-base text-[#A55D43]">những nụ cười tự nhiên nhất</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[img1, img2, img4, img5].map((img, idx) => (
                <div key={idx} className="relative aspect-[3/2] w-full overflow-hidden rounded-sm border border-[#49372F]/20 bg-[#D8CABB]">
                  <Image
                    src={img}
                    alt={`Film frame ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 250px"
                  />
                  <div className="absolute bottom-1 left-2 font-sans text-[9px] text-[#F3EFE7] bg-[#242323]/60 px-1 py-0.5 rounded">
                    0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
