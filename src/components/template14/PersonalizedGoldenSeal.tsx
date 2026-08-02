"use client";

import React, { useRef, useState } from "react";
import { Sparkles, Download, Copy, Navigation, Calendar, Check, Share2 } from "lucide-react";
import { RsvpSuccessData } from "./FinalFragmentRSVP";

interface PersonalizedGoldenSealProps {
  data: RsvpSuccessData;
  groomName: string;
  brideName: string;
  eventDate?: string | null;
  venueAddress?: string;
  mapUrl?: string;
  onReset?: () => void;
}

export default function PersonalizedGoldenSeal({
  data,
  groomName,
  brideName,
  eventDate = "10 • 10 • 2026",
  venueAddress = "Trung tâm Tiệc cưới Grand Ballroom",
  mapUrl = "https://maps.google.com",
}: PersonalizedGoldenSealProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleCopyInfo = () => {
    const text = `ẤN VÀNG NGÀY CHUNG ĐÔI\nKhách mời: ${data.guestName}\nChú rể: ${groomName} & Cô dâu: ${brideName}\nNgày: ${eventDate}\nĐịa điểm: ${venueAddress}\nMã khách mời: ${data.ticketCode}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveCard = () => {
    // Simple light SVG/Card print trigger or copy fallback
    window.print();
  };

  return (
    <section className="relative py-16 px-4 bg-[#F3ECDD] border-t border-[#C9A98D]/40">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Personalized Golden Seal Ticket Container */}
        <div
          ref={cardRef}
          className="relative p-6 sm:p-8 rounded-3xl bg-[#FAF7F0] border-2 border-[#B99245] shadow-2xl overflow-hidden text-center space-y-5"
        >
          {/* Gold Seam Stroke across ticket background */}
          <svg className="absolute inset-0 w-full h-full text-[#B99245]/15 pointer-events-none" viewBox="0 0 400 500" fill="none">
            <path d="M-20 80 C 100 20, 250 150, 420 60" stroke="currentColor" strokeWidth="4" />
            <path d="M-20 380 C 150 450, 300 300, 420 400" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" />
          </svg>

          {/* Top Ceremonial Stamp */}
          <div className="w-16 h-16 rounded-full bg-[#6A3034] border-2 border-[#B99245] mx-auto flex items-center justify-center shadow-md relative z-10">
            <Sparkles className="w-8 h-8 text-[#B99245]" />
          </div>

          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-mono text-[#B99245] uppercase tracking-widest block">
              THẺ XÁC NHẬN CÁ NHÂN HÓA
            </span>
            <h3 className="text-2xl font-serif text-[#252320] font-bold">
              Ấn Vàng Ngày Chung Đôi
            </h3>
          </div>

          {/* Guest Name Callout */}
          <div className="relative z-10 py-3 px-4 rounded-2xl bg-[#F3ECDD] border border-[#C9A98D]/50 space-y-1">
            <span className="text-xs font-serif text-[#76806B]">Kính gửi quý khách</span>
            <p className="text-xl font-serif font-bold text-[#6A3034]">
              {data.guestName}
            </p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#6A3034] text-[#FAF7F0] text-[10px] font-mono">
              Mã: {data.ticketCode}
            </span>
          </div>

          {/* Details list */}
          <div className="relative z-10 text-xs font-serif text-[#252320]/80 space-y-2 text-left bg-[#FAF7F0]/80 p-4 rounded-xl border border-[#C9A98D]/30">
            <p>
              <strong>Lễ Cưới Của:</strong> {groomName} & {brideName}
            </p>
            <p>
              <strong>Ngày cử hành:</strong> {eventDate}
            </p>
            <p>
              <strong>Địa điểm:</strong> {venueAddress}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {data.attending ? (
                <span className="text-[#6A3034] font-semibold">Đã xác nhận tham dự</span>
              ) : (
                <span className="text-[#76806B]">Gửi lời chúc mừng xa</span>
              )}
            </p>
          </div>

          {/* Emotional closing message */}
          <p className="relative z-10 text-xs font-serif italic text-[#252320]/80 leading-relaxed pt-1">
            “Cảm ơn bạn đã trở thành một mảnh ghép trong ngày hạnh phúc của chúng mình.”
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <button
            onClick={handleCopyInfo}
            type="button"
            className="px-4 py-2.5 min-h-[44px] rounded-full bg-[#FAF7F0] text-[#252320] font-serif text-xs border border-[#C9A98D] hover:border-[#B99245] flex items-center justify-center gap-1.5 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#B99245]" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#6A3034]" />
                <span>Sao chép thông tin</span>
              </>
            )}
          </button>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 min-h-[44px] rounded-full bg-[#6A3034] text-[#FAF7F0] font-serif text-xs font-medium border border-[#B99245] flex items-center justify-center gap-1.5 shadow-md hover:bg-[#803D42]"
          >
            <Navigation className="w-4 h-4 text-[#B99245]" />
            <span>Mở chỉ đường</span>
          </a>
        </div>
      </div>
    </section>
  );
}
