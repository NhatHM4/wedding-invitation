"use client";

import { useEffect, useState } from "react";

interface Wish {
  id: string;
  guest_name: string;
  content: string;
}

interface Cl46WishesOverlayProps {
  wishes?: Wish[];
}

const mockWishes = [
  { id: "mock-1", guest_name: "Linh", content: "❤️ ❤️ Chúc hai bạn trăm năm hạnh phúc!" },
  { id: "mock-2", guest_name: "Erik", content: "❤️ ❤️ Chúc hai bạn trăm năm hạnh phúc!" },
  { id: "mock-3", guest_name: "Huy", content: "❤️ ❤️ Chúc hai bạn trăm năm hạnh phúc!" },
  { id: "mock-4", guest_name: "Mai", content: "💍 Chúc cho tình yêu của hai bạn mỗi ngày một lớn mạnh!" },
  { id: "mock-5", guest_name: "Hoàng", content: "💝 Mong tình yêu của hai bạn mãi vĩnh cửu!" }
];

export default function Cl46WishesOverlay({ wishes = [] }: Cl46WishesOverlayProps) {
  const [activeWishes, setActiveWishes] = useState<Wish[]>([]);

  // Periodically rotate wishes
  useEffect(() => {
    const list = wishes.length > 0 ? wishes : mockWishes;
    let index = 0;

    const interval = setInterval(() => {
      const nextWish = list[index % list.length];
      setActiveWishes((prev) => {
        // Keep maximum of 4 floating bubbles at a time
        const clean = prev.slice(-3);
        return [...clean, { ...nextWish, id: `${nextWish.id}-${Date.now()}` }];
      });
      index++;
    }, 4500);

    // Initial load first wish
    setActiveWishes([{ ...list[0], id: `${list[0].id}-${Date.now()}` }]);

    return () => clearInterval(interval);
  }, [wishes]);

  return (
    <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 w-full max-w-[420px] px-5 items-start pointer-events-none z-40 flex flex-col gap-2">
      {activeWishes.map((w) => (
        <div
          key={w.id}
          className="bg-[#fdfcf7]/95 border border-[#c5a880]/30 rounded px-4 py-3 flex flex-col gap-1 shadow-md animate-bubble-fade max-w-[280px] relative"
          style={{
            outline: "1px double rgba(197, 168, 128, 0.25)",
            outlineOffset: "-3px"
          }}
        >
          <p className="font-serif-display text-[12px] font-bold text-[#5c161e] tracking-wide relative z-10">
            {w.guest_name}:
          </p>
          <p className="font-serif-display text-[12px] text-[#3a3430] italic leading-normal relative z-10">
            {w.content}
          </p>
        </div>
      ))}

      <style>{`
        @keyframes bubble-fade {
          0% { transform: translateY(6px) scale(0.98); opacity: 0; }
          10% { transform: translateY(0) scale(1); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-6px) scale(0.99); opacity: 0; }
        }
        .animate-bubble-fade {
          animation: bubble-fade 7.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bubble-fade {
            animation: none !important;
            opacity: 0.95 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
