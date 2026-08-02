"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, ChevronRight, Check } from "lucide-react";

export interface StoryMilestone {
  id: number;
  date: string;
  title: string;
  content: string;
  image?: string;
  symbol?: string;
}

interface GoldenLoveStoryProps {
  milestones?: StoryMilestone[];
}

const DEFAULT_MILESTONES: StoryMilestone[] = [
  {
    id: 1,
    date: "15 • 10 • 2021",
    title: "Mảnh ghé đầu tiên — Lần đầu gặp gỡ",
    content: "Một ánh nhìn ngẫu nhiên tại tiệm cà phê nhỏ, nơi câu chuyện tình yêu bắt đầu bằng một nụ cười hiền lành và cuộc trò chuyện kéo dài hàng giờ.",
    image: "/thiepmaudovang/images/gallery-1.jpg",
    symbol: "🌱",
  },
  {
    id: 2,
    date: "14 • 02 • 2022",
    title: "Chính thức đồng hành",
    content: "Sau những buổi hẹn ngọt ngào, hai trái tim nhận ra sự đồng điệu sâu sắc và quyết định nắm tay nhau bước vào chặng đường tình yêu dài lâu.",
    image: "/thiepmaudovang/images/gallery-2.jpg",
    symbol: "💌",
  },
  {
    id: 3,
    date: "20 • 11 • 2023",
    title: "Chuyến đi chữa lành",
    content: "Cùng nhau vượt qua những thử thách đầu tiên, đi qua những vùng đất mới, chọn ở lại bên nhau và tôn trọng mọi mảnh khuyết của đối phương.",
    image: "/thiepmaudovang/images/gallery-3.jpg",
    symbol: "🌊",
  },
  {
    id: 4,
    date: "24 • 12 • 2025",
    title: "Lời cầu hôn dưới ánh đèn",
    content: "Chiếc nhẫn nhỏ trao tay cùng câu nói giản dị: 'Hãy cùng anh hoàn thiện một cuộc đời'. Và một tiếng 'Đồng ý' đong đầy hạnh phúc.",
    image: "/thiepmaudovang/images/cover.jpg",
    symbol: "💍",
  },
  {
    id: 5,
    date: "10 • 10 • 2026",
    title: "Ngày chung đôi — Vàng gắn vết nứt",
    content: "Hôm nay, hai mảnh gốm chính thức nối liền bằng đường chỉ vàng Kintsugi vĩnh cửu trước sự chứng kiến của gia đình và bạn bè thân thương.",
    image: "/thiepmaudovang/images/gallery-1.jpg",
    symbol: "🕊️",
  },
];

export default function GoldenLoveStory({
  milestones = DEFAULT_MILESTONES,
}: GoldenLoveStoryProps) {
  const [revealedIds, setRevealedIds] = useState<number[]>([1]); // First unlocked by default
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleReveal = (id: number) => {
    if (!revealedIds.includes(id)) {
      setRevealedIds((prev) => [...prev, id]);
    }
    setActiveTab(id);
  };

  const activeMilestone = milestones.find((m) => m.id === activeTab) || milestones[0];

  return (
    <section id="love-story" className="relative py-20 px-4 bg-[#FAF7F0] border-t border-[#C9A98D]/30">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B99245]">
          CHUYỆN TÌNH YÊU • KINTSUGI CRACKS
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#252320] font-bold">
          Những Đường Nứt Hóa Vàng
        </h2>
        <p className="text-xs sm:text-sm font-serif text-[#252320]/70 italic mt-1">
          Chạm vào từng mốc thời gian để vẽ nên đường vàng tình yêu
        </p>
        <div className="w-12 h-0.5 bg-[#B99245] mx-auto rounded-full mt-2" />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Timeline Crack Line Navigation (4 cols) */}
        <div className="md:col-span-5 space-y-3 relative">
          {/* Vertical Golden Crack Line background */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-[#C9A98D]/30 -z-0" />

          {milestones.map((ms) => {
            const isRevealed = revealedIds.includes(ms.id);
            const isActive = activeTab === ms.id;

            return (
              <button
                key={ms.id}
                onClick={() => handleReveal(ms.id)}
                type="button"
                className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 flex items-center gap-3 relative z-10 border ${
                  isActive
                    ? "bg-[#6A3034] text-[#FAF7F0] border-[#B99245] shadow-md transform translate-x-1"
                    : isRevealed
                    ? "bg-[#F3ECDD] text-[#252320] border-[#B99245]/50 hover:border-[#B99245]"
                    : "bg-[#FAF7F0] text-[#252320]/70 border-[#C9A98D]/30 hover:border-[#C9A98D]"
                }`}
              >
                {/* Node icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif shrink-0 border ${
                    isActive
                      ? "bg-[#B99245] text-[#252320] border-[#FAF7F0]"
                      : isRevealed
                      ? "bg-[#B99245]/20 text-[#B99245] border-[#B99245]"
                      : "bg-[#EAE0CD] text-[#76806B] border-[#C9A98D]"
                  }`}
                >
                  {ms.symbol || ms.id}
                </div>

                {/* Milestone summary text */}
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-[#B99245] tracking-widest block">
                    {ms.date}
                  </span>
                  <p className="text-xs sm:text-sm font-serif font-medium truncate">
                    {ms.title}
                  </p>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "rotate-90 text-[#B99245]" : "text-[#C9A98D]"}`} />
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Display Card (7 cols) */}
        <div className="md:col-span-7 bg-[#F3ECDD] rounded-3xl p-6 sm:p-8 border border-[#B99245]/40 shadow-lg relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          
          {/* Top Decorative Gold Seam Curve */}
          <svg className="absolute top-0 right-0 w-32 h-32 text-[#B99245]/20 pointer-events-none" viewBox="0 0 100 100" fill="none">
            <path d="M0 0 C40 20, 80 60, 100 100" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          </svg>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#6A3034] text-[#FAF7F0] text-[10px] font-mono tracking-widest">
                {activeMilestone.date}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#B99245]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-[#252320] font-bold mb-4">
              {activeMilestone.title}
            </h3>

            <p className="text-sm sm:text-base font-serif text-[#252320]/85 leading-relaxed mb-6">
              {activeMilestone.content}
            </p>
          </div>

          {/* Optional Milestone Image with Gold Frame */}
          {activeMilestone.image && (
            <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#B99245]/40 shadow-sm mt-2">
              <Image
                src={activeMilestone.image}
                alt={activeMilestone.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252320]/40 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
