"use client";

import React from "react";
import { MapPin, Calendar as CalendarIcon, Clock, Navigation, ExternalLink } from "lucide-react";
import { Wedding } from "@/types";

interface WeddingCeramicPlateProps {
  wedding: Wedding;
}

export default function WeddingCeramicPlate({ wedding }: WeddingCeramicPlateProps) {
  const groomFamily = wedding.location_info?.groom_family;
  const brideFamily = wedding.location_info?.bride_family;

  const handleAddToCalendar = (title: string, dateStr?: string, location?: string) => {
    const start = dateStr ? new Date(dateStr) : new Date();
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // +3 hrs

    const formatCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formatCalDate(start)}/${formatCalDate(end)}&location=${encodeURIComponent(
      location || ""
    )}&details=${encodeURIComponent("Thư mời lễ kết hôn trân trọng kính mời quý khách!")}`;

    window.open(googleCalUrl, "_blank");
  };

  return (
    <section id="ceremony" className="relative py-20 px-4 bg-[#FAF7F0] border-t border-[#C9A98D]/30">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B99245]">
          THÔNG TIN BUỔI LỄ • CERAMIC SLAB
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#252320] font-bold">
          Ngày Trọng Đại
        </h2>
        <p className="text-xs sm:text-sm font-serif text-[#252320]/75">
          Trân trọng đón tiếp quý khách đến chung vui cùng gia đình chúng tôi
        </p>
        <div className="w-12 h-0.5 bg-[#B99245] mx-auto rounded-full mt-2" />
      </div>

      {/* Main Ceremony & Reception Cards Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Groom Family Ceremony Slab */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#F3ECDD] border-2 border-[#C9A98D]/60 shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-[#6A3034] text-[#FAF7F0] text-xs font-serif tracking-wider uppercase">
              TƯ GIA NHÀ TRAI
            </div>

            {(groomFamily?.father_name || groomFamily?.mother_name) && (
              <p className="text-xs font-serif text-[#252320]/80">
                Thân phụ: <strong>{groomFamily.father_name || "—"}</strong> <br />
                Thân mẫu: <strong>{groomFamily.mother_name || "—"}</strong>
              </p>
            )}

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-[#252320]">
                <CalendarIcon className="w-5 h-5 text-[#B99245] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-[#76806B] uppercase block">Ngày tổ chức</span>
                  <p className="text-sm font-serif font-semibold">{groomFamily?.date || "Thứ Bảy, 10/10/2026"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#252320]">
                <Clock className="w-5 h-5 text-[#B99245] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-[#76806B] uppercase block">Giờ đón khách</span>
                  <p className="text-sm font-serif font-semibold">{groomFamily?.time || "11:00 AM"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#252320]">
                <MapPin className="w-5 h-5 text-[#B99245] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-[#76806B] uppercase block">Địa điểm</span>
                  <p className="text-sm font-serif font-medium leading-relaxed">
                    {groomFamily?.address || "Trung tâm Tiệc cưới Grand Ballroom"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#C9A98D]/40">
            <a
              href={groomFamily?.map_url || "https://maps.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2.5 min-h-[44px] rounded-full bg-[#6A3034] text-[#FAF7F0] font-serif text-xs font-medium border border-[#B99245] flex items-center justify-center gap-2 hover:bg-[#803D42] transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#B99245]" />
              <span>Mở bản đồ</span>
            </a>

            <button
              onClick={() =>
                handleAddToCalendar(
                  `Lễ Kết Hôn - Nhà Trai (${wedding.groom_name} & ${wedding.bride_name})`,
                  wedding.event_date || undefined,
                  groomFamily?.address
                )
              }
              type="button"
              className="flex-1 px-4 py-2.5 min-h-[44px] rounded-full bg-[#FAF7F0] text-[#252320] font-serif text-xs border border-[#C9A98D] flex items-center justify-center gap-2 hover:border-[#B99245] transition-colors"
            >
              <CalendarIcon className="w-4 h-4 text-[#6A3034]" />
              <span>Thêm vào lịch</span>
            </button>
          </div>
        </div>

        {/* Bride Family Ceremony Slab */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#F3ECDD] border-2 border-[#C9A98D]/60 shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-[#B99245] text-[#252320] text-xs font-serif tracking-wider uppercase">
              TƯ GIA NHÀ GÁI
            </div>

            {(brideFamily?.father_name || brideFamily?.mother_name) && (
              <p className="text-xs font-serif text-[#252320]/80">
                Thân phụ: <strong>{brideFamily.father_name || "—"}</strong> <br />
                Thân mẫu: <strong>{brideFamily.mother_name || "—"}</strong>
              </p>
            )}

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-[#252320]">
                <CalendarIcon className="w-5 h-5 text-[#B99245] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-[#76806B] uppercase block">Ngày tổ chức</span>
                  <p className="text-sm font-serif font-semibold">{brideFamily?.date || "Thứ Bảy, 10/10/2026"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#252320]">
                <Clock className="w-5 h-5 text-[#B99245] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-[#76806B] uppercase block">Giờ đón khách</span>
                  <p className="text-sm font-serif font-semibold">{brideFamily?.time || "11:00 AM"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#252320]">
                <MapPin className="w-5 h-5 text-[#B99245] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-[#76806B] uppercase block">Địa điểm</span>
                  <p className="text-sm font-serif font-medium leading-relaxed">
                    {brideFamily?.address || "Nhà hàng Tiệc cưới Riverside"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#C9A98D]/40">
            <a
              href={brideFamily?.map_url || "https://maps.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2.5 min-h-[44px] rounded-full bg-[#6A3034] text-[#FAF7F0] font-serif text-xs font-medium border border-[#B99245] flex items-center justify-center gap-2 hover:bg-[#803D42] transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#B99245]" />
              <span>Mở bản đồ</span>
            </a>

            <button
              onClick={() =>
                handleAddToCalendar(
                  `Lễ Kết Hôn - Nhà Gái (${wedding.groom_name} & ${wedding.bride_name})`,
                  wedding.event_date || undefined,
                  brideFamily?.address
                )
              }
              type="button"
              className="flex-1 px-4 py-2.5 min-h-[44px] rounded-full bg-[#FAF7F0] text-[#252320] font-serif text-xs border border-[#C9A98D] flex items-center justify-center gap-2 hover:border-[#B99245] transition-colors"
            >
              <CalendarIcon className="w-4 h-4 text-[#6A3034]" />
              <span>Thêm vào lịch</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
