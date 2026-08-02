"use client";

import React from "react";
import Image from "next/image";
import { Film, Ticket, Heart, Navigation, ArrowUp, Sparkles } from "lucide-react";

interface FinalFilmFrameProps {
  groomName: string;
  brideName: string;
  eventDate?: string | null;
  mapUrl?: string;
}

export default function FinalFilmFrame({
  groomName,
  brideName,
  eventDate = "10/10/2026",
  mapUrl = "https://maps.google.com",
}: FinalFilmFrameProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative py-16 px-4 bg-[#121212] text-[#F1E6D2] border-t-2 border-[#3A2924] overflow-hidden">
      {/* Light Leak Flame Overlay Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#A53A32]/30 via-[#D69C52]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto space-y-8 relative z-10 text-center">
        {/* Frame Outer */}
        <div className="bg-[#181615] border-2 border-[#3A2924] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Top Sprocket */}
          <div className="h-4 bg-[#24211F] flex items-center justify-between px-3 rounded-xs border-b border-[#3A2924]">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 bg-[#121212]" />
            ))}
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-[#D69C52] uppercase">
            <span>END OF ROLL • EXP #24</span>
            <span className="px-2 py-0.5 bg-[#A53A32] text-[#F1E6D2] rounded font-bold">FINE</span>
          </div>

          {/* Final Photo */}
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#121212] border border-[#3A2924]">
            <Image
              src="/thiepmaudovang/images/cover.jpg"
              alt="Khung phim cuối cùng"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="font-mono text-xs text-[#D69C52] tracking-widest uppercase block mb-1">
                HASHTAG CHÍNH THỨC
              </span>
              <span className="font-serif text-lg font-bold text-[#F1E6D2] bg-[#A53A32]/80 px-3 py-1 rounded-full border border-[#F1E6D2]/30">
                #{groomName.replace(/\s+/g, "")}And{brideName.replace(/\s+/g, "")}2026
              </span>
            </div>
          </div>

          {/* Quote */}
          <div className="space-y-2">
            <h2 className="font-serif text-3xl text-[#F1E6D2] font-bold">
              {groomName} & {brideName}
            </h2>
            <p className="font-serif text-sm text-[#F1E6D2]/90 italic max-w-sm mx-auto leading-relaxed">
              “Cuộn phim tình yêu này sẽ thật sự trọn vẹn và đẹp đẽ nhất khi có sự hiện diện ngọt ngào của bạn.”
            </p>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#3A2924] font-mono text-xs">
            <button
              onClick={() => scrollToSection("rsvp")}
              type="button"
              className="py-3 px-3 bg-[#A53A32] hover:bg-[#A53A32]/90 text-[#F1E6D2] font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-4 h-4 text-[#D69C52]" />
              <span>Xem vé tham dự</span>
            </button>

            <button
              onClick={() => scrollToSection("guestbook")}
              type="button"
              className="py-3 px-3 bg-[#24211F] hover:bg-[#3A2924] text-[#F1E6D2] rounded-xl border border-[#3A2924] transition-colors flex items-center justify-center gap-1.5"
            >
              <Heart className="w-4 h-4 text-[#A53A32]" />
              <span>Gửi lời chúc</span>
            </button>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3 bg-[#24211F] hover:bg-[#3A2924] text-[#F1E6D2] rounded-xl border border-[#3A2924] transition-colors flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-4 h-4 text-[#D69C52]" />
              <span>Mở chỉ đường</span>
            </a>

            <button
              onClick={scrollToTop}
              type="button"
              className="py-3 px-3 bg-[#24211F] hover:bg-[#3A2924] text-[#F1E6D2] rounded-xl border border-[#3A2924] transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowUp className="w-4 h-4 text-[#D69C52]" />
              <span>Xem từ đầu</span>
            </button>
          </div>

          {/* Bottom Sprocket */}
          <div className="h-4 bg-[#24211F] flex items-center justify-between px-3 rounded-xs border-t border-[#3A2924]">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 bg-[#121212]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
