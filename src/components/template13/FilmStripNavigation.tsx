"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Heart, Eye } from "lucide-react";

export interface MilestoneItem {
  id: string;
  frameNo: string;
  title: string;
  date: string;
  story: string;
  image: string;
  location?: string;
}

interface FilmStripNavigationProps {
  milestones?: MilestoneItem[];
}

const DEFAULT_MILESTONES: MilestoneItem[] = [
  {
    id: "m1",
    frameNo: "01",
    title: "Chạm Mắt Lần Đầu",
    date: "15/10/2021",
    location: "Góc Cà Phê Mùa Thu - Hà Nội",
    story: "Buổi chiều thu hôm ấy, hai ánh mắt vô tình chạm nhau qua ô cửa kính rợp nắng. Một nụ cười ngập ngừng khởi đầu cho cả một chặng đường thanh xuân.",
    image: "/thiepmaudovang/images/gallery-1.jpg",
  },
  {
    id: "m2",
    frameNo: "02",
    title: "Chính Thức Chung Đôi",
    date: "24/12/2021",
    location: "Đêm Giáng Sinh Phố Cổ",
    story: "Dưới cơn mưa hoa tuyết và ánh đèn lung linh, cái nắm tay đầu tiên rụt rè nhưng ấm áp. Chúng mình biết rằng từ đây sẽ không còn đi một mình.",
    image: "/thiepmaudovang/images/gallery-2.jpg",
  },
  {
    id: "m3",
    frameNo: "03",
    title: "Chuyến Đi Đầu Tiên",
    date: "30/04/2022",
    location: "Bình Minh Trên Đỉnh Đà Lạt",
    story: "Cùng nhau săn mây trên đồi thông lạnh giá, chia nhau ly cà phê nóng. Chuyến đi ấy đã chứng minh chúng mình chính là mảnh ghép hoàn hảo của nhau.",
    image: "/thiepmaudovang/images/gallery-3.jpg",
  },
  {
    id: "m4",
    frameNo: "04",
    title: "Lời Cầu Hôn Dưới Ánh Hoàng Hôn",
    date: "14/02/2025",
    location: "Bãi Biển Bãi Dài - Phú Quốc",
    story: "Tiếng sóng biển rì rào cùng chiếc nhẫn kim cương óng ánh. Anh quỳ xuống hỏi 'Em đồng ý cùng anh đi hết cuộc đời này nhé?', và em mỉm cười gật đầu.",
    image: "/thiepmaudovang/images/cover.jpg",
  },
  {
    id: "m5",
    frameNo: "05",
    title: "Ngày Về Chung Một Nhà",
    date: "10/10/2026",
    location: "Grand Ballroom - Hà Nội",
    story: "Cuộn phim kỷ niệm tạm khép lại chặng đường hẹn hò để mở ra trang sách hôn nhân vĩnh cửu. Hẹn gặp bạn trong khung hình đẹp nhất của ngày hỷ!",
    image: "/thiepmaudovang/images/gallery-1.jpg",
  },
];

export default function FilmStripNavigation({ milestones = DEFAULT_MILESTONES }: FilmStripNavigationProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const items = milestones.length > 0 ? milestones : DEFAULT_MILESTONES;

  const handleOpenModal = (index: number) => {
    setCurrentIndex(index);
    setSelectedMilestone(items[index]);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedMilestone(null);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev > 0 ? prev - 1 : items.length - 1;
      setSelectedMilestone(items[nextIndex]);
      return nextIndex;
    });
  }, [items]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev < items.length - 1 ? prev + 1 : 0;
      setSelectedMilestone(items[nextIndex]);
      return nextIndex;
    });
  }, [items]);

  // Handle keyboard shortcuts (Arrow left/right, Escape)
  useEffect(() => {
    if (!selectedMilestone) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMilestone, handleCloseModal, handlePrev, handleNext]);

  return (
    <section className="relative py-12 px-3 bg-[#181615] border-y border-[#3A2924] text-[#F1E6D2] overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A53A32]/20 border border-[#A53A32]/40 rounded-full text-[10px] font-mono tracking-widest text-[#D69C52] uppercase">
            <Heart className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>35MM FILM STRIP TIMELINE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F1E6D2] font-bold">
            Dải Phim Kỷ Niệm
          </h2>
          <p className="text-xs text-[#F1E6D2]/70 max-w-sm mx-auto italic font-serif">
            Vuốt ngang cuộn phim để lật giở từng cột mốc đáng nhớ. Chạm vào ô ảnh để phóng to chi tiết.
          </p>
        </div>

        {/* Film Strip Horizontal Scroll Outer */}
        <div className="relative">
          {/* Right scroll gradient hint */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#181615] to-transparent z-10 pointer-events-none sm:hidden" />

          {/* Film Strip Container */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-2 no-scrollbar scroll-smooth">
            {items.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenModal(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleOpenModal(index)}
                aria-label={`Xem kỷ niệm ${item.title}`}
                className="flex-none w-[220px] sm:w-[260px] snap-center bg-[#24211F] border-2 border-[#3A2924] rounded-xl overflow-hidden shadow-lg hover:border-[#D69C52] transition-all cursor-pointer group relative"
              >
                {/* Top Sprocket Perforations */}
                <div className="h-5 bg-[#121212] flex items-center justify-between px-2 border-b border-[#3A2924]">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2.5 h-1.5 bg-[#24211F] rounded-xs" />
                  ))}
                </div>

                {/* Frame Header */}
                <div className="px-3 py-1.5 flex items-center justify-between font-mono text-[10px] text-[#D69C52] bg-[#181615]/80 border-b border-[#3A2924]">
                  <span>EXP #{item.frameNo}</span>
                  <span className="text-[#F1E6D2]/60">{item.date}</span>
                </div>

                {/* Photo Frame */}
                <div className="relative aspect-[4/3] w-full bg-[#121212] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 220px, 260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#121212]/40 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A53A32] text-[#F1E6D2] text-xs font-mono rounded-full font-semibold shadow-md">
                      <Eye className="w-3.5 h-3.5" /> Xem chi tiết
                    </span>
                  </div>
                </div>

                {/* Frame Info */}
                <div className="p-3 space-y-1 bg-[#24211F]">
                  <h3 className="font-serif text-sm text-[#F1E6D2] font-semibold line-clamp-1 group-hover:text-[#D69C52] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#F1E6D2]/70 font-serif line-clamp-2 leading-relaxed">
                    {item.story}
                  </p>
                </div>

                {/* Bottom Sprocket Perforations */}
                <div className="h-5 bg-[#121212] flex items-center justify-between px-2 border-t border-[#3A2924]">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2.5 h-1.5 bg-[#24211F] rounded-xs" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Frame Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-[#181615] border-2 border-[#D69C52]/40 rounded-2xl overflow-hidden shadow-2xl text-[#F1E6D2] p-4 sm:p-6"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-[#3A2924] pb-3 mb-4 font-mono text-xs text-[#D69C52]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#A53A32] text-[#F1E6D2] rounded font-bold">FRAME #{selectedMilestone.frameNo}</span>
                  <span>KỶ NIỆM VÀNG</span>
                </div>
                <button
                  onClick={handleCloseModal}
                  type="button"
                  aria-label="Đóng cửa sổ"
                  className="p-1.5 rounded-full hover:bg-[#3A2924] text-[#F1E6D2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D69C52]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image Frame */}
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#3A2924] mb-4">
                <Image
                  src={selectedMilestone.image}
                  alt={selectedMilestone.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 440px"
                />
              </div>

              {/* Story Content */}
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-serif text-xl font-bold text-[#F1E6D2]">
                    {selectedMilestone.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[#D69C52]">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedMilestone.date}
                  </span>
                </div>

                {selectedMilestone.location && (
                  <p className="text-xs font-mono text-[#A53A32] tracking-wide">
                    📍 {selectedMilestone.location}
                  </p>
                )}

                <p className="text-sm font-serif text-[#F1E6D2]/90 leading-relaxed pt-2 border-t border-[#3A2924]">
                  {selectedMilestone.story}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="mt-6 pt-4 border-t border-[#3A2924] flex items-center justify-between text-xs font-mono">
                <button
                  onClick={handlePrev}
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-2 bg-[#24211F] hover:bg-[#3A2924] rounded-lg text-[#F1E6D2] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-[#D69C52]" />
                  <span>Trúng trước</span>
                </button>
                <span className="text-[#F1E6D2]/50">
                  {currentIndex + 1} / {items.length}
                </span>
                <button
                  onClick={handleNext}
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-2 bg-[#24211F] hover:bg-[#3A2924] rounded-lg text-[#F1E6D2] transition-colors"
                >
                  <span>Tiếp theo</span>
                  <ChevronRight className="w-4 h-4 text-[#D69C52]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
