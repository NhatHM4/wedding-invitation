"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, MapPin, Stamp, X } from "lucide-react";

export interface JourneyMilestone {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  stampCode: string;
}

interface JourneyMapProps {
  milestones?: JourneyMilestone[];
}

const DEFAULT_MILESTONES: JourneyMilestone[] = [
  {
    id: "m1",
    title: "Lần Đầu Gặp Nhau",
    date: "15/02/2022",
    location: "Quán cà phê nhỏ góc phố Hà Nội",
    image: "/thiepmaudovang/images/cover.jpg",
    description: "Một buổi chiều thu nhẹ nhàng, hai ánh mắt vô tình chạm nhau. Một tách cappuccino và nụ cười ngượng ngùng đã mở đầu cho tất cả.",
    stampCode: "STAMP #01 — FIRST MET",
  },
  {
    id: "m2",
    title: "Buổi Hẹn Đầu Tiên",
    date: "28/02/2022",
    location: "Rạp chiếu phim & dạo phố đêm",
    image: "/thiepmaudovang/images/gallery-1.jpg",
    description: "Cùng xem một bộ phim lãng mạn, đi dạo dưới ánh đèn đường lung linh và những cái nắm tay ngập ngừng nhen nhóm tình yêu.",
    stampCode: "STAMP #02 — FIRST DATE",
  },
  {
    id: "m3",
    title: "Chuyến Đi Đáng Nhớ",
    date: "10/08/2023",
    location: "Bờ biển Đà Lạt & bình minh mây",
    image: "/thiepmaudovang/images/gallery-2.jpg",
    description: "Cùng nhau săn mây lúc 5 giờ sáng, sẻ chia từng ly trà nóng và nhận ra rằng hành trình nào có đối phương cũng trở nên tươi đẹp.",
    stampCode: "STAMP #03 — MEMORABLE TRIP",
  },
  {
    id: "m4",
    title: "Ngày Cầu Hôn",
    date: "14/02/2026",
    location: "Hoàng hôn bên hoàng thành cổ kính",
    image: "/thiepmaudovang/images/gallery-3.jpg",
    description: "Anh quỳ xuống dưới ánh hoàng hôn rực rỡ, trao chiếc nhẫn nhỏ cùng lời hứa đi cùng nhau suốt cuộc đời. Và em đã mỉm cười 'Em đồng ý!'",
    stampCode: "STAMP #04 — PROPOSAL",
  },
  {
    id: "m5",
    title: "Ngày Cưới — Chung Đôi",
    date: "10/10/2026",
    location: "Trung tâm Tiệc cưới & Hội nghị",
    image: "/thiepmaudovang/images/cover.jpg",
    description: "Cùng nhau bước vào lễ đường trước sự chứng kiến và chúc phúc của hai gia đình và bạn bè thân yêu. Điểm đến vĩnh cửu!",
    stampCode: "STAMP #05 — WEDDING DAY",
  },
];

export default function JourneyMap({
  milestones = DEFAULT_MILESTONES,
}: JourneyMapProps) {
  const [stampedIds, setStampedIds] = useState<Record<string, boolean>>({});
  const [activeMilestone, setActiveMilestone] = useState<JourneyMilestone | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("passport_stamped_ids");
      if (saved) {
        setStampedIds(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const openMilestone = (milestone: JourneyMilestone) => {
    setActiveMilestone(milestone);
    const updated = { ...stampedIds, [milestone.id]: true };
    setStampedIds(updated);
    try {
      sessionStorage.setItem("passport_stamped_ids", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleNext = () => {
    if (!activeMilestone) return;
    const currentIndex = milestones.findIndex((m) => m.id === activeMilestone.id);
    if (currentIndex < milestones.length - 1) {
      openMilestone(milestones[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!activeMilestone) return;
    const currentIndex = milestones.findIndex((m) => m.id === activeMilestone.id);
    if (currentIndex > 0) {
      openMilestone(milestones[currentIndex - 1]);
    }
  };

  return (
    <section className="relative py-12 px-3 bg-[#172235] text-[#F4EBDD] overflow-hidden">
      {/* Background Passport Map Lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B89B62_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />

      <div className="max-w-full mx-auto space-y-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B89B62]/20 border border-[#B89B62]/40 rounded-full text-[9px] font-mono tracking-widest text-[#B89B62] uppercase font-bold">
            <Stamp className="w-3.5 h-3.5 text-[#B89B62]" />
            <span>INTERACTIVE LOVE MAP</span>
          </div>
          <h2 className="font-serif text-2xl text-[#F4EBDD] font-bold">
            Bản Đồ Hành Trình Tình Yêu
          </h2>
          <p className="text-[11px] text-[#F4EBDD]/75 max-w-xs mx-auto italic">
            Chạm vào từng con dấu passport để khám phá bưu thiếp kỷ niệm qua từng cột mốc.
          </p>
        </div>

        {/* 2-Column Stamp Path Grid for Mobile Screens */}
        <div className="grid grid-cols-2 gap-4 relative pt-2">
          {milestones.map((m, idx) => {
            const isStamped = !!stampedIds[m.id];
            const isFullWidth = idx === milestones.length - 1 && milestones.length % 2 !== 0;

            return (
              <div
                key={m.id}
                className={`flex flex-col items-center text-center space-y-2 relative ${
                  isFullWidth ? "col-span-2" : ""
                }`}
              >
                {/* Stamp Circle Button */}
                <button
                  type="button"
                  onClick={() => openMilestone(m)}
                  className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 transition-all duration-300 flex flex-col items-center justify-center p-1.5 shadow-lg ${
                    isStamped
                      ? "bg-[#A9473F] border-[#B89B62] text-[#F4EBDD] scale-105 shadow-[#A9473F]/40"
                      : "bg-[#172235] border-[#B89B62]/60 text-[#B89B62] active:scale-95"
                  }`}
                >
                  <div className="w-full h-full rounded-full border border-dashed border-current/40 flex flex-col items-center justify-center p-1 text-center">
                    <span className="text-[7.5px] font-mono tracking-wider uppercase font-bold opacity-80">
                      {m.date}
                    </span>
                    <span className="font-serif text-[11px] font-bold my-0.5 line-clamp-1 leading-tight">
                      {m.title}
                    </span>
                    {isStamped ? (
                      <div className="flex items-center gap-0.5 text-[8px] font-mono font-bold bg-[#172235]/70 px-1 py-0.2 rounded text-[#F4EBDD]">
                        <Check className="w-2.5 h-2.5 text-[#B89B62]" />
                        <span>ĐÃ ĐÓNG</span>
                      </div>
                    ) : (
                      <span className="text-[7.5px] font-mono text-[#B89B62] underline">
                        CHẠM MỞ
                      </span>
                    )}
                  </div>
                </button>

                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-[#B89B62] font-semibold block">
                    STAMP 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xs font-semibold text-[#F4EBDD] leading-tight">
                    {m.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Hint */}
        <div className="text-center text-[10px] font-mono text-[#B89B62]/80">
          <span>
            Đã mở {Object.keys(stampedIds).length}/{milestones.length} con dấu kỷ niệm
          </span>
        </div>
      </div>

      {/* Postcard Modal Window */}
      {activeMilestone && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3"
          onClick={() => setActiveMilestone(null)}
        >
          <div
            className="relative w-full max-w-sm bg-[#F4EBDD] text-[#272521] border-2 border-[#B89B62] rounded-2xl p-5 shadow-2xl space-y-4 overflow-hidden animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveMilestone(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#172235] text-[#F4EBDD] flex items-center justify-center hover:bg-[#762F3A] transition-colors shadow-md z-10"
              aria-label="Đóng bưu thiếp"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Postcard Header */}
            <div className="flex items-center justify-between border-b border-[#B89B62]/30 pb-2 pr-8">
              <span className="text-[9px] font-mono tracking-wider text-[#762F3A] uppercase font-bold">
                {activeMilestone.stampCode}
              </span>
              <span className="text-[10px] font-mono font-bold text-[#A9473F]">
                {activeMilestone.date}
              </span>
            </div>

            {/* Postcard Photo */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-[#B89B62]/40 shadow-inner">
              <Image
                src={activeMilestone.image}
                alt={activeMilestone.title}
                fill
                sizes="(max-width: 480px) 100vw, 400px"
                className="object-cover"
              />
              <div className="absolute bottom-1.5 left-1.5 bg-[#172235]/90 text-[#F4EBDD] text-[9px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#B89B62]" />
                <span className="truncate max-w-[200px]">{activeMilestone.location}</span>
              </div>
            </div>

            {/* Postcard Narrative */}
            <div className="space-y-1">
              <h3 className="font-serif text-xl text-[#172235] font-bold leading-snug">
                {activeMilestone.title}
              </h3>
              <p className="text-[11px] text-[#272521]/80 leading-relaxed italic">
                &ldquo;{activeMilestone.description}&rdquo;
              </p>
            </div>

            {/* Modal Navigation Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#B89B62]/30 text-[11px] font-mono">
              <button
                type="button"
                onClick={handlePrev}
                disabled={milestones.findIndex((m) => m.id === activeMilestone.id) === 0}
                className="px-2.5 py-1 rounded bg-[#172235]/10 text-[#172235] disabled:opacity-30 flex items-center gap-0.5 font-semibold"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Trước</span>
              </button>

              <span className="text-[9px] text-[#762F3A] font-bold uppercase">
                POSTCARD JOURNAL
              </span>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  milestones.findIndex((m) => m.id === activeMilestone.id) ===
                  milestones.length - 1
                }
                className="px-2.5 py-1 rounded bg-[#172235] text-[#F4EBDD] disabled:opacity-30 flex items-center gap-0.5 font-semibold"
              >
                <span>Tiếp</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
