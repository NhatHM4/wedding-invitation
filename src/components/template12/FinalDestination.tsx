"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, MapPin, MessageSquare, ShieldCheck, Ticket } from "lucide-react";

interface FinalDestinationProps {
  groomName: string;
  brideName: string;
  eventDate?: string | null;
  finalImage?: string;
  hashtag?: string;
}

export default function FinalDestination({
  groomName,
  brideName,
  eventDate,
  finalImage = "/thiepmaudovang/images/cover.jpg",
  hashtag = "#LovePassport2026",
}: FinalDestinationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStamped(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "10.10.2026";

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative py-14 px-3 bg-[#F4EBDD] text-[#272521] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#172235_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-full mx-auto text-center space-y-6 relative z-10">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#172235]/10 border border-[#172235]/20 rounded-full text-[9px] font-mono tracking-widest text-[#762F3A] uppercase font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#762F3A]" />
            <span>FINAL PASSPORT LANDING</span>
          </div>
          <h2 className="font-serif text-2xl text-[#172235] font-bold">
            Điểm Đến Cuối Cùng
          </h2>
        </div>

        {/* Final Passport Card */}
        <div className="relative bg-[#FFFBF5] border-2 border-[#B89B62] rounded-2xl p-4 sm:p-5 shadow-xl space-y-5 overflow-hidden">
          {/* Animated Stamp Seal */}
          <div
            className={`absolute top-4 right-4 w-24 h-24 border-2 border-[#A9473F] rounded-full flex flex-col items-center justify-center p-1 text-center text-[#A9473F] font-mono rotate-[-12deg] pointer-events-none transition-all duration-700 ${
              stamped ? "scale-100 opacity-90" : "scale-150 opacity-0"
            }`}
          >
            <span className="text-[7px] font-bold uppercase">IMMIGRATION</span>
            <span className="text-[9px] font-extrabold uppercase">STAMPED</span>
            <span className="text-[6.5px] font-bold">ETERNAL LOVE</span>
          </div>

          {/* Couple Image */}
          <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-[#B89B62]/40 shadow-inner">
            <Image
              src={finalImage}
              alt="Hình ảnh đôi"
              fill
              sizes="(max-width: 480px) 100vw, 400px"
              className="object-cover"
            />
          </div>

          {/* Narrative */}
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#172235] font-bold">
              {groomName} <span className="text-[#A9473F]">&amp;</span> {brideName}
            </h3>
            <p className="text-[11px] text-[#272521]/80 leading-relaxed italic max-w-xs mx-auto">
              &ldquo;Cảm ơn bạn đã trở thành một phần tuyệt vời trong hành trình của chúng mình. Hẹn gặp lại bạn tại điểm đến hân hoan!&rdquo;
            </p>
            <div className="inline-block px-3 py-1 bg-[#172235] text-[#F4EBDD] font-mono text-[10px] rounded-full font-bold">
              {hashtag} • {formattedDate}
            </div>
          </div>

          {/* Action Buttons Stack for Mobile */}
          <div className="pt-3 border-t border-[#B89B62]/30 flex flex-col gap-2 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => scrollToSection("boarding-pass")}
              className="w-full min-h-[44px] py-2.5 bg-[#172235] hover:bg-[#762F3A] text-[#F4EBDD] font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5 text-[#B89B62]" />
              <span>XEM LẠI THẺ LÊN TÀU</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("destination")}
              className="w-full min-h-[44px] py-2.5 bg-[#F4EBDD] hover:bg-[#B89B62]/30 text-[#172235] border border-[#B89B62] font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#A9473F]" />
              <span>MỞ CHỈ ĐƯỜNG</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("guestbook")}
              className="w-full min-h-[44px] py-2.5 bg-[#762F3A] hover:bg-[#A9473F] text-[#F4EBDD] font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#F4EBDD]" />
              <span>GỬI LỜI CHÚC MỪNG</span>
            </button>
          </div>
        </div>

        {/* Back to Top */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#762F3A] hover:text-[#172235] font-bold transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>VỀ ĐẦU HỘ CHIẾU</span>
          </button>
        </div>
      </div>
    </section>
  );
}
