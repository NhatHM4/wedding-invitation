"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Film, Sparkles, Heart, Clock } from "lucide-react";

export interface StoryFrame {
  frameNo: number;
  date: string;
  title: string;
  story: string;
  image?: string;
}

interface LoveStoryFilmProps {
  frames?: StoryFrame[];
}

const DEFAULT_STORY_FRAMES: StoryFrame[] = [
  {
    frameNo: 1,
    date: "THÁNG 10, 2021",
    title: "Khởi Đầu Bất Ngờ",
    story: "Cả hai gặp nhau lần đầu tại một workshop chụp ảnh analog. Cuộc trò chuyện xoay quanh cuộn phim Kodacolor 200 đã vô tình kéo hai trái tim xích lại gần nhau hơn.",
    image: "/thiepmaudovang/images/gallery-1.jpg",
  },
  {
    frameNo: 2,
    date: "THÁNG 05, 2022",
    title: "Vượt Qua Khoảng Cách",
    story: "Những chuyến xe chạy giữa Hà Nội và Hải Phòng cuối tuần. Khoảng cách địa lý không làm vạt nắng bớt ấm, mà càng làm nỗi nhớ thêm đậm sâu.",
    image: "/thiepmaudovang/images/gallery-2.jpg",
  },
  {
    frameNo: 3,
    date: "THÁNG 11, 2023",
    title: "Chuyến Du Lịch Xa Đầu Tiên",
    story: "Cùng nhau đặt chân đến Kyoto mùa lá đỏ. Giữa không gian lãng mạn ấy, chúng mình tự hứa sẽ đi cùng nhau qua mọi mùa thu trong đời.",
    image: "/thiepmaudovang/images/gallery-3.jpg",
  },
  {
    frameNo: 4,
    date: "THÁNG 02, 2025",
    title: "Khung Hình Vĩnh Cửu",
    story: "Dưới ánh hoàng hôn bên bờ biển, câu trả lời 'Em đồng ý' đã đánh dấu cột mốc quan trọng nhất. Cuộn phim tình yêu chính thức bước sang chương mới.",
    image: "/thiepmaudovang/images/cover.jpg",
  },
];

export default function LoveStoryFilm({ frames = DEFAULT_STORY_FRAMES }: LoveStoryFilmProps) {
  const [activeFrame, setActiveFrame] = useState<number>(1);
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const list = frames.length > 0 ? frames : DEFAULT_STORY_FRAMES;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    storyRefs.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveFrame(list[idx].frameNo);
            }
          });
        },
        { threshold: 0.6 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [list]);

  return (
    <section className="relative py-16 px-4 bg-[#181615] text-[#F1E6D2] border-b border-[#3A2924] overflow-hidden">
      {/* Light Beam Background Effect from Projector */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[600px] bg-gradient-to-b from-[#D69C52]/10 via-[#A53A32]/5 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-10 relative z-10">
        {/* Header Projector Bar */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#24211F] border border-[#3A2924] rounded-full text-[10px] font-mono tracking-widest text-[#D69C52] uppercase">
            <Film className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>PROJECTOR STORY REEL • FRAME #{activeFrame}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F1E6D2] font-bold">
            Thước Phim Hành Trình
          </h2>
          <p className="text-xs text-[#F1E6D2]/70 max-w-sm mx-auto italic font-serif">
            Mỗi khoảng thời gian trôi qua là một khung hình ánh sáng rực rỡ lưu giữ ngọn lửa tình yêu.
          </p>
        </div>

        {/* Central Vertical Film Strip Channel */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-dashed border-[#3A2924] space-y-12">
          {list.map((frame, index) => {
            const isActive = activeFrame === frame.frameNo;

            return (
              <div
                key={frame.frameNo}
                ref={(el) => { storyRefs.current[index] = el; }}
                className={`relative transition-all duration-500 ${
                  isActive ? "opacity-100 scale-100" : "opacity-60 scale-95"
                }`}
              >
                {/* Timeline Node Hole */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-[#A53A32] border-[#D69C52] shadow-lg shadow-[#A53A32]/50 text-[#F1E6D2]"
                      : "bg-[#24211F] border-[#3A2924] text-[#F1E6D2]/40"
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold">{frame.frameNo}</span>
                </div>

                {/* Story Frame Card */}
                <div
                  className={`bg-[#24211F] border-2 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 transition-all ${
                    isActive ? "border-[#D69C52] bg-[#24211F]" : "border-[#3A2924]"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#D69C52] border-b border-[#3A2924] pb-2 uppercase">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#A53A32]" /> {frame.date}
                    </span>
                    <span>FRAME #{String(frame.frameNo).padStart(2, "0")}</span>
                  </div>

                  {/* Photo or Typography Placeholder */}
                  {frame.image ? (
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#121212] border border-[#3A2924]">
                      <Image
                        src={frame.image}
                        alt={frame.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 540px"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full rounded-xl bg-[#181615] border border-[#3A2924] p-6 flex flex-col items-center justify-center text-center space-y-2">
                      <Heart className="w-8 h-8 text-[#A53A32]/60" />
                      <p className="font-serif text-sm italic text-[#D69C52]">
                        “Khoảnh khắc trọn vẹn không nằm ở tấm ảnh, mà ở cảm xúc lúc ấy.”
                      </p>
                    </div>
                  )}

                  {/* Story Text */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl text-[#F1E6D2] font-bold">
                      {frame.title}
                    </h3>
                    <p className="font-serif text-xs sm:text-sm text-[#F1E6D2]/85 leading-relaxed">
                      {frame.story}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
