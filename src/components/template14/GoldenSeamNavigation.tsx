"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export interface NavigationSection {
  id: string;
  label: string;
}

const SECTIONS: NavigationSection[] = [
  { id: "invitation", label: "Lời mời" },
  { id: "couple", label: "Chúng mình" },
  { id: "love-story", label: "Chuyện tình" },
  { id: "gallery", label: "Khoảnh khắc" },
  { id: "ceremony", label: "Ngày trọng đại" },
  { id: "rsvp", label: "Xác nhận" },
  { id: "guestbook", label: "Lời chúc" },
];

interface GoldenSeamNavigationProps {
  assembledCount: number;
  totalFragments: number;
}

export default function GoldenSeamNavigation({
  assembledCount,
  totalFragments,
}: GoldenSeamNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("invitation");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const progressPercent = Math.min(100, Math.round((assembledCount / totalFragments) * 100));

  return (
    <nav
      aria-label="Kintsugi Golden Navigation"
      className="fixed left-2 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center py-3 px-1 rounded-full bg-[#252320]/80 backdrop-blur-md border border-[#B99245]/40 shadow-xl transition-all duration-300 pointer-events-auto max-h-[80vh]"
    >
      {/* Golden Seam Line background */}
      <div className="absolute top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#B99245]/20 via-[#B99245] to-[#B99245]/20" />

      {/* Progress top indicator */}
      <div
        className="mb-2 text-[10px] font-mono text-[#B99245] font-semibold flex items-center justify-center gap-0.5 px-1 py-0.5 rounded bg-[#FAF7F0]/10 border border-[#B99245]/30"
        title={`Tiến trình ghép mảnh: ${progressPercent}%`}
      >
        <Sparkles className="w-2.5 h-2.5 text-[#B99245] animate-pulse" />
        <span>{progressPercent}%</span>
      </div>

      <div className="flex flex-col items-center space-y-3.5 relative z-10 my-1">
        {SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id;
          const isCompleted = idx < assembledCount || assembledCount === totalFragments;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              type="button"
              aria-label={`Chuyển đến phần ${section.label}`}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
            >
              {/* Tooltip on hover/focus */}
              <span className="absolute left-full ml-3 px-2 py-0.5 text-xs font-serif text-[#FAF7F0] bg-[#252320] rounded border border-[#B99245]/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md hidden sm:block">
                {section.label}
              </span>

              {/* Node indicator */}
              <span
                className={`relative rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-4 h-4 bg-[#B99245] shadow-[0_0_8px_#B99245] border-2 border-[#FAF7F0]"
                    : isCompleted
                    ? "w-2.5 h-2.5 bg-[#B99245]/80 border border-[#FAF7F0]/60"
                    : "w-2 h-2 bg-[#C9A98D]/40 border border-[#C9A98D]/20 group-hover:bg-[#B99245]/60"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
