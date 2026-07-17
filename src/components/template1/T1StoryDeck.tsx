"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CardData {
  id: number;
  image: string;
  story: string;
}

const defaultCards: CardData[] = [
  { id: 1, image: "/thiepmaudovang/images/gallery-1.jpg", story: "Lần đầu gặp gỡ tại một quán cà phê nhỏ vào buổi chiều mưa..." },
  { id: 2, image: "/thiepmaudovang/images/gallery-2.jpg", story: "Chuyến đi xa cùng nhau đầu tiên, cùng ngắm hoàng hôn trên bãi biển..." },
  { id: 3, image: "/thiepmaudovang/images/gallery-3.jpg", story: "Và rồi, lời cầu hôn ngọt ngào dưới ánh nến lung linh..." },
  { id: 4, image: "/thiepmaudovang/images/cover.jpg", story: "Chúng mình cùng ký tên vào cuốn sổ hạnh phúc và bắt đầu hành trình mới!" },
];

export default function T1StoryDeck() {
  const [cards, setCards] = useState<CardData[]>(defaultCards);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeCard = cards[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    // Increment index to show next card
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop deck for preview continuity
      setCurrentIndex(0);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 bg-transparent">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">Album Kỷ Niệm</span>
        <h2 className="text-2xl font-bold text-[#5c3c43] font-serif-lux mt-1">Câu Chuyện Của Chúng Tôi</h2>
        <div className="w-10 h-[2px] bg-rose-400 mx-auto mt-2" />
      </div>

      {/* Card Stack Area */}
      <div className="relative w-[280px] h-[360px] flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card, index) => {
            // Only render cards from currentIndex up to currentIndex + 2 (max 3 visible cards)
            if (index < currentIndex || index > currentIndex + 2) return null;

            const isTop = index === currentIndex;
            const position = index - currentIndex; // 0 (top), 1, 2

            return (
              <TinderCard
                key={card.id}
                card={card}
                isTop={isTop}
                position={position}
                onSwipe={handleSwipe}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Story Description Text Area */}
      <div className="mt-8 min-h-[70px] w-full max-w-[280px] text-center px-2 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-[#6e4e55] text-sm font-sans font-medium leading-relaxed italic"
          >
            {activeCard?.story}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <p className="text-[10px] text-rose-400/60 uppercase tracking-widest mt-4">
        ← Vuốt trái hoặc phải để xem tiếp →
      </p>
    </div>
  );
}

interface TinderCardProps {
  card: CardData;
  isTop: boolean;
  position: number;
  onSwipe: (direction: "left" | "right") => void;
}

function TinderCard({ card, isTop, position, onSwipe }: TinderCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Rotation and opacity based on horizontal swipe position
  const rotate = useTransform(x, [-180, 180], [-18, 18]);
  const opacity = useTransform(x, [-150, -100, 0, 100, 150], [0.6, 1, 1, 1, 0.6]);

  const handleDragEnd = async (event: any, info: any) => {
    const swipeThreshold = 100;
    const swipeVelocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset > swipeThreshold || swipeVelocity > 500) {
      // Swipe Right
      await controls.start({
        x: 400,
        y: info.offset.y,
        rotate: 30,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      onSwipe("right");
    } else if (offset < -swipeThreshold || swipeVelocity < -500) {
      // Swipe Left
      await controls.start({
        x: -400,
        y: info.offset.y,
        rotate: -30,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      onSwipe("left");
    } else {
      // Snap back to center
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  // Stack styling offsets for cards below
  // Card 0 (top): scale 1, y 0, rotate 0
  // Card 1: scale 0.94, y 15, rotate -2
  // Card 2: scale 0.88, y 30, rotate 3
  const targetScale = 1 - position * 0.06;
  const targetY = position * 15;
  const targetRotate = position === 1 ? -2 : position === 2 ? 3 : 0;

  return (
    <motion.div
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.4}
      onDragEnd={handleDragEnd}
      animate={isTop ? controls : { scale: targetScale, y: targetY, rotate: targetRotate }}
      transition={isTop ? undefined : { type: "spring", stiffness: 200, damping: 25 }}
      className={`absolute w-full h-full bg-white border border-rose-100 rounded-2xl shadow-xl overflow-hidden p-3 flex flex-col justify-between ${
        isTop ? "z-10 cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
      style={{
        ...(isTop
          ? { x, y, rotate, opacity }
          : { scale: targetScale, y: targetY, rotate: targetRotate, opacity: 0.9 - position * 0.2 }),
        transformOrigin: "center bottom",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Decorative inner gold border */}
      <div className="relative flex-1 w-full h-full border border-rose-100 rounded-xl overflow-hidden flex flex-col">
        {/* Photo Container */}
        <div className="relative flex-1 w-full bg-stone-100 overflow-hidden">
          <Image
            src={card.image}
            alt="Wedding Story"
            fill
            sizes="280px"
            className="object-cover"
            priority={isTop}
          />
        </div>

        {/* Card Footer (Polaroid Style) */}
        <div className="h-12 bg-white flex items-center justify-center border-t border-rose-100/50">
          <span className="font-['Alex_Brush'] text-2xl text-[#8B1A1A] font-semibold">
            Our Love Story
          </span>
        </div>
      </div>
    </motion.div>
  );
}
