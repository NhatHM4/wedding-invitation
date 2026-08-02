"use client";

import React from "react";
import { Film, MapPin, Clock, Shirt, Navigation, Calendar, Clapperboard } from "lucide-react";

interface FamilyInfo {
  father_name?: string;
  mother_name?: string;
  address?: string;
  map_url?: string;
  time?: string;
  date?: string;
}

interface WeddingProductionSheetProps {
  eventDate?: string | null;
  groomFamily?: FamilyInfo;
  brideFamily?: FamilyInfo;
}

export default function WeddingProductionSheet({
  eventDate,
  groomFamily,
  brideFamily,
}: WeddingProductionSheetProps) {
  const gAddress = groomFamily?.address || "Trung tâm Tiệc cưới Grand Ballroom, 123 Đường Láng, Đống Đa, Hà Nội";
  const gMapUrl = groomFamily?.map_url || "https://maps.google.com";
  const gTime = groomFamily?.time || "11:00 AM";
  const gDate = groomFamily?.date || "Thứ Bảy, 10/10/2026";

  const bAddress = brideFamily?.address;
  const bMapUrl = brideFamily?.map_url;
  const bTime = brideFamily?.time;

  return (
    <section id="location" className="relative py-14 px-4 bg-[#F1E6D2] text-[#24211F] border-b border-[#3A2924]">
      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        {/* Call Sheet Header */}
        <div className="border-4 border-[#24211F] bg-[#F1E6D2] p-4 shadow-xl space-y-4 font-mono text-xs text-[#24211F]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#24211F] pb-3 gap-2">
            <div className="flex items-center gap-2">
              <Clapperboard className="w-5 h-5 text-[#A53A32]" />
              <div>
                <span className="font-bold text-sm uppercase tracking-widest block">PRODUCTION CALL SHEET</span>
                <span className="text-[10px] text-[#24211F]/70">LỊCH QUAY TRỌNG ĐẠI • WEDDING DAY</span>
              </div>
            </div>
            <div className="px-2.5 py-1 bg-[#24211F] text-[#F1E6D2] rounded font-bold text-right text-[11px]">
              DỰ ÁN: LỄ KẾT HÔN
            </div>
          </div>

          {/* Key Production Metadata Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-b border-[#24211F]/30 text-[11px]">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#24211F]/60 block">SCENE / CẢNH</span>
              <span className="font-bold">LỄ THÀNH HÔN</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#24211F]/60 block">DATE / NGÀY HỶ</span>
              <span className="font-bold text-[#A53A32]">{gDate}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#24211F]/60 block">CALL TIME / ĐÓN KHÁCH</span>
              <span className="font-bold">{gTime}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#24211F]/60 block">STATUS</span>
              <span className="font-bold text-[#59685A]">CONFIRMED</span>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A53A32]/10 border border-[#A53A32]/30 rounded-full text-[10px] font-mono tracking-widest text-[#A53A32] uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>SHOOTING LOCATIONS</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#24211F]">
            Thông Tin Lễ Cưới
          </h2>
        </div>

        {/* Location Cards Grid */}
        <div className="space-y-6">
          {/* Groom Location */}
          <div className="bg-[#121212] text-[#F1E6D2] p-5 rounded-2xl shadow-xl space-y-4 border-2 border-[#3A2924]">
            <div className="flex items-center justify-between font-mono text-xs text-[#D69C52] border-b border-[#3A2924] pb-2">
              <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#A53A32]" /> LOCATION #01 • TIỆC CƯỚI CHÍNH
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-[#A53A32] text-[#F1E6D2] rounded font-bold">
                CHÍNH THỨC
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#F1E6D2]">
                Tiệc Cưới Nhà Nam / Nhà Nữ
              </h3>

              <div className="space-y-1.5 text-xs font-serif text-[#F1E6D2]/85">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#A53A32] shrink-0 mt-0.5" />
                  <span><strong>Địa chỉ:</strong> {gAddress}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D69C52] shrink-0" />
                  <span><strong>Giờ đón khách (Call time):</strong> {gTime}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#59685A] shrink-0" />
                  <span><strong>Ngày làm lễ:</strong> {gDate}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-[#D69C52] shrink-0" />
                  <span><strong>Dress code (Trang phục):</strong> Nâu kem, Be, Đỏ rượu, Đen thanh lịch</span>
                </p>
              </div>
            </div>

            {/* Map Action Buttons */}
            <div className="pt-3 border-t border-[#3A2924] flex items-center gap-3">
              <a
                href={gMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#A53A32] hover:bg-[#A53A32]/90 text-[#F1E6D2] text-xs font-mono font-semibold rounded-xl text-center transition-colors shadow flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D69C52]"
              >
                <Navigation className="w-4 h-4" />
                <span>MỞ CHỈ ĐƯỜNG GOOGLE MAPS</span>
              </a>
            </div>
          </div>

          {/* Optional Secondary Location if available */}
          {bAddress && (
            <div className="bg-[#121212] text-[#F1E6D2] p-5 rounded-2xl shadow-xl space-y-4 border-2 border-[#3A2924]">
              <div className="flex items-center justify-between font-mono text-xs text-[#D69C52] border-b border-[#3A2924] pb-2">
                <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-[#A53A32]" /> LOCATION #02 • NHÀ GIA ĐÌNH CÔ DÂU
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#F1E6D2]">
                  Lễ Vu Quy / Lễ Cưới Nhà Nữ
                </h3>
                <div className="space-y-1.5 text-xs font-serif text-[#F1E6D2]/85">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#A53A32] shrink-0 mt-0.5" />
                    <span><strong>Địa chỉ:</strong> {bAddress}</span>
                  </p>
                  {bTime && (
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D69C52] shrink-0" />
                      <span><strong>Giờ cử hành:</strong> {bTime}</span>
                    </p>
                  )}
                </div>
              </div>

              {bMapUrl && (
                <div className="pt-3 border-t border-[#3A2924]">
                  <a
                    href={bMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#24211F] hover:bg-[#3A2924] text-[#F1E6D2] text-xs font-mono font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-[#D69C52]" />
                    <span>CHỈ ĐƯỜNG TỚI NHÀ NỮ</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
