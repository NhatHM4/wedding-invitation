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
    <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-[420px] px-5 items-start pointer-events-none z-40 flex flex-col gap-2">
      {activeWishes.map((w) => (
        <div
          key={w.id}
          className="bg-[#fae6e6]/95 border border-[#fae3e3] rounded-md px-3.5 py-2 flex flex-col gap-0.5 shadow-sm animate-bubble-fade max-w-[280px]"
        >
          <p className="font-barlow text-[10.5px] font-bold text-[#5a1212]">
            {w.guest_name}:
          </p>
          <p className="font-barlow text-[11px] text-gray-700 leading-normal">
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
