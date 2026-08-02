"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, HeartHandshake, MapPin, ShieldCheck } from "lucide-react";

interface PassportProfileProps {
  groomName: string;
  brideName: string;
  groomImage?: string;
  brideImage?: string;
  eventDate?: string | null;
  groomStory?: string;
  brideStory?: string;
}

export default function PassportProfile({
  groomName,
  brideName,
  groomImage = "/thiepmaudovang/images/cover.jpg",
  brideImage = "/thiepmaudovang/images/gallery-1.jpg",
  eventDate,
  groomStory = "Một chàng trai điềm tĩnh, ấm áp, luôn sẵn sàng làm chỗ dựa vững chắc cho người mình yêu.",
  brideStory = "Một cô gái ngọt ngào, giàu tình cảm, luôn mang lại nụ cười rạng rỡ và sự bình yên.",
}: PassportProfileProps) {
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "10.10.2026";

  return (
    <section id="passport-profile" className="relative py-12 px-3 bg-[#F4EBDD] text-[#272521] overflow-hidden">
      {/* Background Guilloche Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#172235_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-full mx-auto space-y-6">
        {/* Section Header Title */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#172235]/10 border border-[#172235]/20 rounded-full text-[9px] font-mono tracking-widest text-[#762F3A] uppercase font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#762F3A]" />
            <span>OFFICIAL PASSENGER PROFILE</span>
          </div>
          <h2 className="font-serif text-2xl text-[#172235] font-bold">
            Hồ Sơ Hộ Chiếu Đôi
          </h2>
          <p className="text-[11px] text-[#272521]/70 max-w-xs mx-auto italic">
            Thông tin hai hành khách chính trên chuyến bay Hạnh Phúc.
          </p>
        </div>

        {/* Passport Page Container */}
        <div className="relative bg-[#FFFBF5] border-2 border-[#B89B62]/50 rounded-2xl p-4 sm:p-5 shadow-xl space-y-6 overflow-hidden">
          {/* Top Bar Serial & Security Strip */}
          <div className="flex items-center justify-between border-b border-[#B89B62]/30 pb-3 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-[#762F3A]">
              <span className="font-bold">PASSPORT NO:</span>
              <span className="tracking-wider bg-[#762F3A]/10 px-1.5 py-0.5 rounded font-bold">
                LP-2026
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#A9473F]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#A9473F]" />
              <span className="uppercase text-[9px] font-semibold">APPROVED</span>
            </div>
          </div>

          {/* Passenger Profiles Vertical Stack for Mobile */}
          <div className="space-y-4">
            {/* Passenger 01: Groom */}
            <div className="bg-[#F4EBDD]/60 border border-[#B89B62]/30 rounded-xl p-3.5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#B89B62]/20 pb-1.5">
                <span className="text-[9px] font-mono text-[#762F3A] font-bold tracking-wider uppercase">
                  PASSENGER 01 — CHÚ RỂ
                </span>
                <span className="text-[9px] font-mono text-[#272521]/60">P/VN/GROOM</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="relative w-20 h-28 rounded-lg overflow-hidden border-2 border-[#B89B62] shrink-0 shadow-sm">
                  <Image
                    src={groomImage}
                    alt={groomName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0.5 right-0.5 bg-[#172235] text-[#F4EBDD] text-[7.5px] font-mono px-1 py-0.2 rounded">
                    GROOM
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  <div>
                    <span className="text-[8px] font-mono text-[#272521]/60 uppercase tracking-wider block">
                      FULL NAME
                    </span>
                    <h3 className="font-serif text-lg text-[#172235] font-bold leading-tight">
                      {groomName}
                    </h3>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-[#272521]/60 uppercase tracking-wider block">
                      CHARACTER
                    </span>
                    <p className="text-[11px] text-[#272521]/80 leading-relaxed italic line-clamp-3">
                      {groomStory}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger 02: Bride */}
            <div className="bg-[#F4EBDD]/60 border border-[#B89B62]/30 rounded-xl p-3.5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#B89B62]/20 pb-1.5">
                <span className="text-[9px] font-mono text-[#762F3A] font-bold tracking-wider uppercase">
                  PASSENGER 02 — CÔ DÂU
                </span>
                <span className="text-[9px] font-mono text-[#272521]/60">P/VN/BRIDE</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="relative w-20 h-28 rounded-lg overflow-hidden border-2 border-[#B89B62] shrink-0 shadow-sm">
                  <Image
                    src={brideImage}
                    alt={brideName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0.5 right-0.5 bg-[#762F3A] text-[#F4EBDD] text-[7.5px] font-mono px-1 py-0.2 rounded">
                    BRIDE
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  <div>
                    <span className="text-[8px] font-mono text-[#272521]/60 uppercase tracking-wider block">
                      FULL NAME
                    </span>
                    <h3 className="font-serif text-lg text-[#172235] font-bold leading-tight">
                      {brideName}
                    </h3>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-[#272521]/60 uppercase tracking-wider block">
                      CHARACTER
                    </span>
                    <p className="text-[11px] text-[#272521]/80 leading-relaxed italic line-clamp-3">
                      {brideStory}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Love Dates Timeline Summary */}
          <div className="pt-3 border-t border-[#B89B62]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest text-[#762F3A] uppercase font-bold flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-[#A9473F]" />
                FLIGHT MILESTONES
              </span>
              <span className="text-[9px] font-mono text-[#B89B62] font-semibold">
                DESTINATION: FOREVER
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2 bg-[#F4EBDD]/60 border border-[#B89B62]/20 rounded-lg space-y-0.5">
                <span className="text-[8px] text-[#272521]/60 uppercase block">LẦN ĐẦU GẶP</span>
                <span className="text-[11px] font-bold text-[#172235]">15.02.2022</span>
              </div>
              <div className="p-2 bg-[#F4EBDD]/60 border border-[#B89B62]/20 rounded-lg space-y-0.5">
                <span className="text-[8px] text-[#272521]/60 uppercase block">BẮT ĐẦU YÊU</span>
                <span className="text-[11px] font-bold text-[#172235]">20.10.2022</span>
              </div>
              <div className="p-2 bg-[#F4EBDD]/60 border border-[#B89B62]/20 rounded-lg space-y-0.5">
                <span className="text-[8px] text-[#272521]/60 uppercase block">CẦU HÔN</span>
                <span className="text-[11px] font-bold text-[#762F3A]">14.02.2026</span>
              </div>
              <div className="p-2 bg-[#762F3A] text-[#F4EBDD] rounded-lg space-y-0.5 shadow-sm">
                <span className="text-[8px] text-[#F4EBDD]/80 uppercase block">NGÀY CƯỚI</span>
                <span className="text-[11px] font-bold">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Stamp Impression Badge */}
          <div className="pt-1 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 text-[9px] font-mono text-[#A9473F] border border-[#A9473F]/40 px-2.5 py-1 rounded rotate-[-1deg] font-bold text-center">
              <MapPin className="w-3 h-3 text-[#A9473F]" />
              <span>APPROVED FOR ETERNAL HAPPINESS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
