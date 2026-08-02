"use client";

import React from "react";
import Image from "next/image";
import { Camera, Sparkles, Heart } from "lucide-react";

interface CoupleContactSheetProps {
  groomName: string;
  brideName: string;
  groomDesc?: string;
  brideDesc?: string;
  groomQuote?: string;
  brideQuote?: string;
  groomImage?: string;
  brideImage?: string;
  groomFather?: string;
  groomMother?: string;
  brideFather?: string;
  brideMother?: string;
}

export default function CoupleContactSheet({
  groomName,
  brideName,
  groomDesc = "Một chàng trai đam mê nhiếp ảnh, thích ghi lại từng khoảnh khắc giản dị của cuộc sống và luôn tin rằng hạnh phúc đến từ những điều chân thành nhất.",
  brideDesc = "Một cô gái nhẹ nhàng yêu nghệ thuật, thích hoa và những chuyến đi. Luôn mang năng lượng ấm áp làm bừng sáng mọi không gian.",
  groomQuote = "Vũ trụ có muôn vàn vì sao, nhưng anh chỉ chọn duy nhất một ánh sáng dẫn đường.",
  brideQuote = "Hành trình đẹp nhất cuộc đời là cùng người mình yêu khám phá thế giới.",
  groomImage = "/thiepmaudovang/images/gallery-2.jpg",
  brideImage = "/thiepmaudovang/images/gallery-3.jpg",
  groomFather,
  groomMother,
  brideFather,
  brideMother,
}: CoupleContactSheetProps) {
  return (
    <section className="relative py-14 px-4 bg-[#F1E6D2] text-[#24211F] border-b border-[#3A2924]">
      {/* Background Subtle Film Grain / Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#24211F_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        {/* Contact Sheet Header */}
        <div className="border-2 border-[#24211F] p-4 bg-[#F1E6D2] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#24211F]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#A53A32]" />
            <span className="font-bold tracking-widest uppercase">LAB CONTACT SHEET • PROOF #2026</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#24211F]/70">
            <span>KÍCH THƯỚC: 35MM</span>
            <span>•</span>
            <span>MÀU: ANALOG WARM</span>
          </div>
        </div>

        {/* Section Main Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A53A32]/10 border border-[#A53A32]/30 rounded-full text-[10px] font-mono tracking-widest text-[#A53A32] uppercase">
            <Heart className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>THE BRIDE & GROOM PROOFS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#24211F]">
            Nhân Vật Chính Cuộn Phim
          </h2>
        </div>

        {/* Contact Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Groom Proof Frame */}
          <div className="bg-[#121212] text-[#F1E6D2] p-4 sm:p-5 rounded-2xl shadow-xl relative border-2 border-[#3A2924]">
            {/* Sprocket Top */}
            <div className="h-4 bg-[#24211F] flex items-center justify-between px-2 mb-3 rounded-xs border-b border-[#3A2924]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-1 bg-[#121212]" />
              ))}
            </div>

            {/* Frame Metadata */}
            <div className="flex justify-between items-center font-mono text-[10px] text-[#D69C52] mb-2 uppercase">
              <span>FRAME #01A • CHÚ RỂ</span>
              <span>KIM MÃ - HÀ NỘI</span>
            </div>

            {/* Groom Photo with Crop Marks */}
            <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#181615] border border-[#3A2924] mb-4 group">
              <Image
                src={groomImage}
                alt={`Chú rể ${groomName}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 340px"
              />
              {/* Corner Crop Marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D69C52]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D69C52]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D69C52]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D69C52]" />
            </div>

            {/* Groom Details */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D69C52]">GROOM</span>
                <h3 className="font-serif text-2xl font-bold text-[#F1E6D2]">
                  {groomName}
                </h3>
                {(groomFather || groomMother) && (
                  <p className="text-[11px] font-mono text-[#F1E6D2]/60 mt-0.5">
                    Trưởng nam nhà {groomFather ? `ông ${groomFather}` : ''} {groomMother ? `& bà ${groomMother}` : ''}
                  </p>
                )}
              </div>

              <p className="text-xs font-serif text-[#F1E6D2]/80 leading-relaxed pt-2 border-t border-[#3A2924]">
                {groomDesc}
              </p>

              <blockquote className="p-3 bg-[#181615] border-l-2 border-[#A53A32] text-xs font-serif italic text-[#D69C52]">
                “{groomQuote}”
              </blockquote>
            </div>

            {/* Sprocket Bottom */}
            <div className="h-4 bg-[#24211F] flex items-center justify-between px-2 mt-4 rounded-xs border-t border-[#3A2924]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-1 bg-[#121212]" />
              ))}
            </div>
          </div>

          {/* Bride Proof Frame */}
          <div className="bg-[#121212] text-[#F1E6D2] p-4 sm:p-5 rounded-2xl shadow-xl relative border-2 border-[#3A2924]">
            {/* Sprocket Top */}
            <div className="h-4 bg-[#24211F] flex items-center justify-between px-2 mb-3 rounded-xs border-b border-[#3A2924]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-1 bg-[#121212]" />
              ))}
            </div>

            {/* Frame Metadata */}
            <div className="flex justify-between items-center font-mono text-[10px] text-[#D69C52] mb-2 uppercase">
              <span>FRAME #01B • CÔ DÂU</span>
              <span>HOÀN KIẾM - HÀ NỘI</span>
            </div>

            {/* Bride Photo with Crop Marks */}
            <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#181615] border border-[#3A2924] mb-4 group">
              <Image
                src={brideImage}
                alt={`Cô dâu ${brideName}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 340px"
              />
              {/* Corner Crop Marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D69C52]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D69C52]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D69C52]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D69C52]" />
            </div>

            {/* Bride Details */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D69C52]">BRIDE</span>
                <h3 className="font-serif text-2xl font-bold text-[#F1E6D2]">
                  {brideName}
                </h3>
                {(brideFather || brideMother) && (
                  <p className="text-[11px] font-mono text-[#F1E6D2]/60 mt-0.5">
                    Á nữ nhà {brideFather ? `ông ${brideFather}` : ''} {brideMother ? `& bà ${brideMother}` : ''}
                  </p>
                )}
              </div>

              <p className="text-xs font-serif text-[#F1E6D2]/80 leading-relaxed pt-2 border-t border-[#3A2924]">
                {brideDesc}
              </p>

              <blockquote className="p-3 bg-[#181615] border-l-2 border-[#A53A32] text-xs font-serif italic text-[#D69C52]">
                “{brideQuote}”
              </blockquote>
            </div>

            {/* Sprocket Bottom */}
            <div className="h-4 bg-[#24211F] flex items-center justify-between px-2 mt-4 rounded-xs border-t border-[#3A2924]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-1 bg-[#121212]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
