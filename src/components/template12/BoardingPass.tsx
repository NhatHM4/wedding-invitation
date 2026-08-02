"use client";

import React, { useRef, useState } from "react";
import { Calendar, CheckCircle2, Copy, MapPin, QrCode, Share2, Ticket } from "lucide-react";

interface BoardingPassProps {
  groomName: string;
  brideName: string;
  guestName?: string;
  ticketCode?: string;
  eventDate?: string | null;
  timeStr?: string;
  address?: string;
  mapUrl?: string;
  isAttending?: boolean;
}

export default function BoardingPass({
  groomName,
  brideName,
  guestName = "Quý Khách",
  ticketCode = "PASS-101026",
  eventDate,
  timeStr = "11:00 AM",
  address = "Trung tâm Tiệc cưới & Hội nghị, 123 Đường Láng, Hà Nội",
  mapUrl = "https://maps.google.com",
  isAttending = true,
}: BoardingPassProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "10.10.2026";

  const handleCopyInfo = () => {
    const text = `LỄ CƯỚI: ${groomName} & ${brideName}\nNGÀY CƯỚI: ${formattedDate} - ${timeStr}\nĐỊA ĐIỂM: ${address}\nMÃ VÉ: ${ticketCode}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Lễ Cưới ${groomName} & ${brideName}`);
    const details = encodeURIComponent(`Mã vé: ${ticketCode} | Địa điểm: ${address}`);
    const location = encodeURIComponent(address);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gcalUrl, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Lễ Cưới ${groomName} & ${brideName}`,
          text: `Trân trọng kính mời bạn đến tham dự lễ cưới của ${groomName} & ${brideName}!`,
          url: window.location.href,
        });
      } catch {
        handleCopyInfo();
      }
    } else {
      handleCopyInfo();
    }
  };

  if (!isAttending) {
    return (
      <section className="py-12 px-3 bg-[#172235] text-[#F4EBDD] text-center">
        <div className="max-w-full bg-[#FFFBF5] text-[#272521] border-2 border-[#B89B62] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="w-12 h-12 bg-[#762F3A] text-[#F4EBDD] rounded-full flex items-center justify-center mx-auto shadow-md">
            <Ticket className="w-6 h-6 text-[#F4EBDD]" />
          </div>
          <span className="text-[9px] font-mono tracking-widest text-[#762F3A] uppercase font-bold block">
            THANK YOU POSTCARD
          </span>
          <h3 className="font-serif text-xl font-bold text-[#172235]">
            Cảm Ơn Tình Cảm Của {guestName}!
          </h3>
          <p className="text-[11px] text-[#272521]/80 leading-relaxed italic max-w-xs mx-auto">
            Dù không thể thu xếp đến dự trực tiếp, sự quan tâm và những lời chúc tốt đẹp của bạn dành cho {groomName} &amp; {brideName} vẫn luôn là món quà vô giá!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="boarding-pass" className="relative py-12 px-3 bg-[#172235] text-[#F4EBDD] overflow-hidden">
      {/* Background Micro Security Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B89B62_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-full mx-auto space-y-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B89B62]/20 border border-[#B89B62]/40 rounded-full text-[9px] font-mono tracking-widest text-[#B89B62] uppercase font-bold">
            <Ticket className="w-3.5 h-3.5 text-[#B89B62]" />
            <span>BOARDING PASS</span>
          </div>
          <h2 className="font-serif text-2xl text-[#F4EBDD] font-bold">
            Thẻ Lên Tàu Cá Nhân Hóa
          </h2>
          <p className="text-[11px] text-[#F4EBDD]/75 max-w-xs mx-auto italic">
            Thẻ lên máy bay chính thức dành riêng cho bạn. Hãy lưu vé hoặc thêm sự kiện vào lịch cá nhân.
          </p>
        </div>

        {/* Boarding Pass Ticket Container */}
        <div
          ref={cardRef}
          className="bg-[#FFFBF5] text-[#272521] border-2 border-[#B89B62] rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 relative overflow-hidden"
        >
          {/* Top Pass Header */}
          <div className="flex items-center justify-between border-b-2 border-[#B89B62]/40 pb-3 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-[#762F3A] font-bold">
              <Ticket className="w-3.5 h-3.5 text-[#A9473F]" />
              <span>PASS: LOVE FLIGHT</span>
            </div>
            <div className="flex items-center gap-1 text-[#A9473F] bg-[#A9473F]/10 px-2 py-0.5 rounded font-bold text-[9px] uppercase">
              <CheckCircle2 className="w-3 h-3 text-[#A9473F]" />
              <span>CONFIRMED</span>
            </div>
          </div>

          {/* Vertical Ticket Content Body */}
          <div className="space-y-4">
            <div className="space-y-0.5">
              <span className="text-[8px] font-mono text-[#272521]/60 uppercase tracking-wider block">
                PASSENGER NAME / HÀNH KHÁCH
              </span>
              <h3 className="font-serif text-xl font-bold text-[#172235]">
                {guestName}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div>
                <span className="text-[8px] text-[#272521]/60 uppercase block">COUPLE</span>
                <span className="font-bold text-[#762F3A]">{groomName} &amp; {brideName}</span>
              </div>
              <div>
                <span className="text-[8px] text-[#272521]/60 uppercase block">DEPARTURE</span>
                <span className="font-bold text-[#172235]">{formattedDate}</span>
              </div>
              <div>
                <span className="text-[8px] text-[#272521]/60 uppercase block">BOARDING TIME</span>
                <span className="font-bold text-[#172235]">{timeStr}</span>
              </div>
              <div>
                <span className="text-[8px] text-[#272521]/60 uppercase block">GATE</span>
                <span className="font-bold text-[#172235]">Grand Ballroom</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[8px] font-mono text-[#272521]/60 uppercase block">VENUE / ĐỊA ĐIỂM</span>
              <p className="text-[11px] font-medium text-[#172235] leading-snug">
                {address}
              </p>
            </div>

            {/* Perforated Tear Line & Bottom QR Code */}
            <div className="border-t-2 border-dashed border-[#B89B62]/50 pt-3 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-24 h-24 bg-[#172235] p-2 rounded-xl border-2 border-[#B89B62] flex flex-col items-center justify-center text-[#F4EBDD] shadow-md">
                <QrCode className="w-14 h-14 text-[#B89B62]" />
                <span className="text-[7.5px] font-mono tracking-wider text-[#F4EBDD] uppercase pt-0.5">
                  SCAN FOR ENTRY
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[8px] font-mono text-[#272521]/60 uppercase block">TICKET CODE</span>
                <span className="font-mono text-xs font-bold text-[#762F3A] tracking-wider block">
                  {ticketCode}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons 2x2 Mobile Grid */}
          <div className="pt-3 border-t border-[#B89B62]/30 grid grid-cols-2 gap-2 text-[10px] font-mono">
            <button
              type="button"
              onClick={handleCopyInfo}
              className="py-2.5 px-2 bg-[#172235] hover:bg-[#762F3A] text-[#F4EBDD] font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <Copy className="w-3 h-3 text-[#B89B62]" />
              <span>{copied ? "ĐÃ SAO CHÉP!" : "SAO CHÉP VÉ"}</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCalendar}
              className="py-2.5 px-2 bg-[#F4EBDD] hover:bg-[#B89B62]/30 text-[#172235] border border-[#B89B62] font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <Calendar className="w-3 h-3 text-[#762F3A]" />
              <span>THÊM VÀO LỊCH</span>
            </button>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 bg-[#F4EBDD] hover:bg-[#B89B62]/30 text-[#172235] border border-[#B89B62] font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#A9473F]" />
              <span>MỞ CHỈ ĐƯỜNG</span>
            </a>

            <button
              type="button"
              onClick={handleShare}
              className="py-2.5 px-2 bg-[#762F3A] hover:bg-[#A9473F] text-[#F4EBDD] font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <Share2 className="w-3 h-3 text-[#F4EBDD]" />
              <span>CHIA SẺ THIỆP</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
