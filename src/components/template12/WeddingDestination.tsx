"use client";

import React from "react";
import { Clock, Compass, ExternalLink, MapPin, Navigation, Plane, Shirt, Ticket } from "lucide-react";
import WeddingCountdown from "./WeddingCountdown";

interface LocationDetails {
  father_name?: string;
  mother_name?: string;
  address?: string;
  map_url?: string;
  time?: string;
  date?: string;
}

interface WeddingDestinationProps {
  eventDate?: string | null;
  groomFamily?: LocationDetails;
  brideFamily?: LocationDetails;
}

export default function WeddingDestination({
  eventDate,
  groomFamily,
  brideFamily,
}: WeddingDestinationProps) {
  const address = groomFamily?.address || brideFamily?.address || "Trung tâm Tiệc cưới & Hội nghị, 123 Đường Láng, Hà Nội";
  const mapUrl = groomFamily?.map_url || brideFamily?.map_url || "https://maps.google.com";
  const timeStr = groomFamily?.time || brideFamily?.time || "11:00 AM";

  return (
    <section id="destination" className="relative py-12 px-3 bg-[#172235] text-[#F4EBDD] overflow-hidden">
      {/* Background Flight Security Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B89B62_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-full mx-auto space-y-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B89B62]/20 border border-[#B89B62]/40 rounded-full text-[9px] font-mono tracking-widest text-[#B89B62] uppercase font-bold">
            <Plane className="w-3.5 h-3.5 text-[#B89B62]" />
            <span>DESTINATION INFORMATION</span>
          </div>
          <h2 className="font-serif text-2xl text-[#F4EBDD] font-bold">
            Điểm Đến Tiệc Cưới
          </h2>
          <p className="text-[11px] text-[#F4EBDD]/75 max-w-xs mx-auto italic">
            Thông tin chi tiết chuyến bay, giờ đón khách và địa điểm hôn lễ.
          </p>
        </div>

        {/* Flight Info Travel Board Card */}
        <div className="bg-[#FFFBF5] text-[#272521] border-2 border-[#B89B62] rounded-2xl p-4 sm:p-5 shadow-2xl space-y-5 overflow-hidden">
          {/* Top Flight Ticket Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#B89B62]/40 pb-3 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-[#762F3A] font-bold">
              <Ticket className="w-3.5 h-3.5 text-[#762F3A]" />
              <span>FLIGHT: LOVE-1010</span>
            </div>
            <div className="text-[9px] text-[#272521]/60 font-semibold uppercase">
              DESTINATION: ETERNAL
            </div>
          </div>

          {/* Info Items List for Mobile */}
          <div className="space-y-3 text-xs">
            {/* Info Item 1: Boarding Time */}
            <div className="p-3 bg-[#F4EBDD]/60 border border-[#B89B62]/30 rounded-xl space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-[#762F3A] font-mono text-[10px] font-bold uppercase">
                <Clock className="w-3.5 h-3.5 text-[#A9473F]" />
                <span>GIỜ ĐÓN KHÁCH — BOARDING TIME</span>
              </div>
              <p className="font-mono text-base font-bold text-[#172235]">
                {timeStr}
              </p>
              <p className="text-[10px] text-[#272521]/70">
                Xin quý khách vui lòng có mặt đúng giờ để đón buổi lễ trọn vẹn.
              </p>
            </div>

            {/* Info Item 2: Gate / Venue */}
            <div className="p-3 bg-[#F4EBDD]/60 border border-[#B89B62]/30 rounded-xl space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-[#762F3A] font-mono text-[10px] font-bold uppercase">
                <Compass className="w-3.5 h-3.5 text-[#A9473F]" />
                <span>SẢNH TIỆC — GATE</span>
              </div>
              <p className="font-serif text-sm font-bold text-[#172235]">
                Sảnh Grand Ballroom — Tầng 2
              </p>
              <p className="text-[10px] text-[#272521]/70">
                Lối vào chính được trang trí cổng hoa đón tiếp quý khách.
              </p>
            </div>

            {/* Info Item 3: Dress Code */}
            <div className="p-3 bg-[#F4EBDD]/60 border border-[#B89B62]/30 rounded-xl space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-[#762F3A] font-mono text-[10px] font-bold uppercase">
                <Shirt className="w-3.5 h-3.5 text-[#A9473F]" />
                <span>TRANG PHỤC — DRESS CODE</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#172235] border border-gray-400 inline-block" title="Navy" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#762F3A] border border-gray-400 inline-block" title="Burgundy" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#F4EBDD] border border-gray-400 inline-block" title="Ivory" />
                <span className="text-[11px] font-mono text-[#172235] font-semibold">
                  Navy, Burgundy, Cream
                </span>
              </div>
            </div>
          </div>

          {/* Venue Location Address & Directions */}
          <div className="p-4 bg-[#172235] text-[#F4EBDD] rounded-xl space-y-3 shadow-md">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-[#B89B62] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono tracking-wider text-[#B89B62] uppercase font-bold block">
                  ĐỊA ĐIỂM TỔ CHỨC — VENUE
                </span>
                <h3 className="font-serif text-sm font-bold text-[#F4EBDD] leading-snug">
                  {address}
                </h3>
              </div>
            </div>

            <div className="pt-1">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-2.5 bg-[#B89B62] hover:bg-[#a68a52] text-[#172235] font-mono text-[11px] uppercase tracking-wider font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-[#172235]" />
                <span>MỞ CHỈ ĐƯỜNG GOOGLE MAPS</span>
                <ExternalLink className="w-3 h-3 text-[#172235]" />
              </a>
            </div>
          </div>

          {/* Countdown Section inside Card */}
          <div className="pt-3 border-t-2 border-dashed border-[#B89B62]/40 space-y-3">
            <div className="text-center space-y-0.5">
              <span className="text-[9px] font-mono tracking-wider text-[#762F3A] uppercase font-bold">
                COUNTDOWN TO DEPARTURE
              </span>
              <h3 className="font-serif text-lg font-bold text-[#172235]">
                Đếm Ngược Đến Giờ Khởi Hành
              </h3>
            </div>

            <WeddingCountdown targetDate={eventDate} />
          </div>
        </div>
      </div>
    </section>
  );
}
