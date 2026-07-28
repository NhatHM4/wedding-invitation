"use client";

import React from "react";
import { Wedding } from "@/types";

interface Section6TableProps {
  wedding: Wedding;
  onScrollToGuestbook?: () => void;
}

export default function Section6Table({ wedding, onScrollToGuestbook }: Section6TableProps) {
  const groomName = wedding.groom_name || "Chú Rể";
  const brideName = wedding.bride_name || "Cô Dâu";

  const groomFamily = wedding.location_info?.groom_family;
  const brideFamily = wedding.location_info?.bride_family;

  let eventDate = new Date("2025-11-16T12:00:00+07:00");
  if (wedding.event_date) {
    const parsed = new Date(wedding.event_date);
    if (!isNaN(parsed.getTime())) {
      eventDate = parsed;
    }
  }

  const customDateText = groomFamily?.date || brideFamily?.date;
  const formattedDateString = customDateText
    ? customDateText
    : eventDate.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const mapUrl = groomFamily?.map_url || brideFamily?.map_url || "https://maps.google.com";

  // Calendar Action helper
  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Lễ Cưới Của ${groomName} & ${brideName}`);
    const details = encodeURIComponent(`Trân trọng kính mời quý khách tham dự lễ cưới của ${groomName} & ${brideName}.`);
    const location = encodeURIComponent(groomFamily?.address || brideFamily?.address || "Địa điểm tiệc cưới");
    const startTime = eventDate.toISOString().replace(/-|:|\.\d+/g, "");
    const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);
    const endTime = endDate.toISOString().replace(/-|:|\.\d+/g, "");

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <section id="table" className="relative w-full py-28 px-6 bg-[#F3EFE7] text-[#49372F] overflow-hidden border-t border-[#D8CABB]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="font-sans text-xs tracking-widest uppercase text-[#A55D43] mb-2 block">
            SECTION 06 &middot; THE RECEPTION TABLE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#49372F] tracking-tight mb-4">
            Bàn Tiệc Ngày Chung Đôi
          </h2>
          <p className="font-serif text-lg text-[#6F7461] italic">
            Trân trọng kính mời quý khách tới tham dự ngày vui của gia đình chúng tôi
          </p>
          <div className="w-16 h-[1px] bg-[#A55D43] mx-auto mt-6" />
        </div>

        {/* Refined Overhead Table Blueprint Composition */}
        <div className="relative bg-[#F3EFE7] border-2 border-[#49372F] p-6 md:p-10 shadow-xl rounded-sm">
          {/* Blueprint Corner Accents */}
          <div className="absolute top-2 left-2 text-[9px] font-sans text-[#6F7461] tracking-widest uppercase">
            PLAN NO. 2025-TABLE
          </div>
          <div className="absolute top-2 right-2 text-[9px] font-sans text-[#6F7461] tracking-widest uppercase">
            SCALE 1:1
          </div>

          {/* Date Card Header Block */}
          <div className="text-center py-6 border-b border-dashed border-[#49372F]/40 mb-8">
            <span className="font-sans text-xs tracking-widest text-[#A55D43] uppercase block mb-1">
              THỜI GIAN CỬ HÀNH LỄ
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#49372F] font-bold capitalize">
              {formattedDateString}
            </h3>
            <p className="font-sans text-sm text-[#6F7461] mt-2">
              (Tức ngày lành tháng tốt trong năm 2025)
            </p>
          </div>

          {/* Two Families / Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Groom Family Block */}
            {groomFamily && (
              <div className="p-6 border border-[#D8CABB] bg-[#F3EFE7] rounded-sm relative">
                <span className="font-sans text-[10px] tracking-widest text-[#A55D43] uppercase block mb-2 font-semibold">
                  NHÀ CHÚ RỂ
                </span>
                <p className="text-sm text-[#49372F] mb-1">
                  Gia đình: <span className="font-artistic-name text-xl">{groomFamily.father_name || "Nguyễn Văn A"} &amp; {groomFamily.mother_name || "Trịnh Thị B"}</span>
                </p>
                <div className="mt-4 pt-3 border-t border-[#D8CABB] text-sm font-sans space-y-1 text-[#49372F]/90">
                  <p><span className="font-medium text-[#6F7461]">Thời gian:</span> {groomFamily.time || "11:30"}</p>
                  <p><span className="font-medium text-[#6F7461]">Địa điểm:</span> {groomFamily.address || "Nhà hàng tiệc cưới"}</p>
                </div>
              </div>
            )}

            {/* Bride Family Block */}
            {brideFamily && (
              <div className="p-6 border border-[#D8CABB] bg-[#F3EFE7] rounded-sm relative">
                <span className="font-sans text-[10px] tracking-widest text-[#A55D43] uppercase block mb-2 font-semibold">
                  NHÀ CÔ DÂU
                </span>
                <p className="text-sm text-[#49372F] mb-1">
                  Gia đình: <span className="font-artistic-name text-xl">{brideFamily.father_name || "Trịnh Văn C"} &amp; {brideFamily.mother_name || "Ngô Thị D"}</span>
                </p>
                <div className="mt-4 pt-3 border-t border-[#D8CABB] text-sm font-sans space-y-1 text-[#49372F]/90">
                  <p><span className="font-medium text-[#6F7461]">Thời gian:</span> {brideFamily.time || "11:30"}</p>
                  <p><span className="font-medium text-[#6F7461]">Địa điểm:</span> {brideFamily.address || "Nhà hàng tiệc cưới"}</p>
                </div>
              </div>
            )}
          </div>

          {/* Integrated Action Buttons Bar */}
          <div className="pt-6 border-t border-dashed border-[#49372F]/40 flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Map Action */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#49372F] bg-[#F3EFE7] text-[#49372F] font-sans text-xs tracking-widest uppercase transition-all hover:bg-[#49372F] hover:text-[#F3EFE7] focus:ring-2 focus:ring-[#A55D43]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              Xem bản đồ đường đi
            </a>

            {/* Calendar Action */}
            <button
              onClick={handleAddToCalendar}
              className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#A55D43] bg-[#F3EFE7] text-[#A55D43] font-sans text-xs tracking-widest uppercase transition-all hover:bg-[#A55D43] hover:text-[#F3EFE7] focus:ring-2 focus:ring-[#A55D43]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Thêm vào lịch
            </button>

            {/* RSVP Scroll Action */}
            {onScrollToGuestbook && (
              <button
                onClick={onScrollToGuestbook}
                className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#49372F] text-[#F3EFE7] font-sans text-xs tracking-widest uppercase transition-all hover:bg-[#A55D43] focus:ring-2 focus:ring-[#A55D43]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Xác nhận tham dự
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
