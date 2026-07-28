"use client";

import React from "react";

interface Section10HomeProps {
  groomName: string;
  brideName: string;
  weddingDate?: string | null;
  onReplay?: () => void;
}

export default function Section10Home({ groomName, brideName, weddingDate, onReplay }: Section10HomeProps) {
  const eventYear = weddingDate ? new Date(weddingDate).getFullYear() : 2025;
  const formattedDate = weddingDate
    ? new Date(weddingDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "16.11.2025";

  return (
    <section id="home" className="relative w-full py-28 px-6 bg-[#F3EFE7] text-[#49372F] overflow-hidden border-t border-[#D8CABB]">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Section Identifier */}
        <div className="font-sans text-xs tracking-widest uppercase text-[#6F7461] mb-3">
          SECTION 10 &middot; THE HOME REVEAL
        </div>

        {/* Complete Symbolic House Vector & United Keys */}
        <div className="relative w-64 h-56 my-6 flex flex-col items-center justify-center">
          {/* Architectural Line House Drawing */}
          <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#49372F]">
            {/* Chimney */}
            <rect x="155" y="30" width="16" height="35" stroke="currentColor" strokeWidth="1.5" fill="#F3EFE7" />
            <path d="M150 25 Q 163 15, 176 25" stroke="#A55D43" strokeWidth="1.5" fill="none" />

            {/* Main Roof */}
            <path d="M20 80 L110 20 L200 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M35 70 L110 20 L185 70" stroke="#A55D43" strokeWidth="1" strokeDasharray="3 3" />

            {/* Walls */}
            <rect x="40" y="80" width="140" height="70" stroke="currentColor" strokeWidth="2" fill="none" />

            {/* Door */}
            <rect x="95" y="110" width="30" height="40" stroke="#A55D43" strokeWidth="2" fill="#F3EFE7" />
            <circle cx="102" cy="130" r="2" fill="#A55D43" />

            {/* Left Window */}
            <rect x="55" y="95" width="25" height="25" stroke="currentColor" strokeWidth="1.5" fill="#E2B96F" fillOpacity="0.4" />
            <line x1="67.5" y1="95" x2="67.5" y2="120" stroke="currentColor" strokeWidth="1" />
            <line x1="55" y1="107.5" x2="80" y2="107.5" stroke="currentColor" strokeWidth="1" />

            {/* Right Window */}
            <rect x="140" y="95" width="25" height="25" stroke="currentColor" strokeWidth="1.5" fill="#E2B96F" fillOpacity="0.4" />
            <line x1="152.5" y1="95" x2="152.5" y2="120" stroke="currentColor" strokeWidth="1" />
            <line x1="140" y1="107.5" x2="165" y2="107.5" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* United Keys Overlay below house */}
          <div className="absolute -bottom-2 flex items-center justify-center gap-1 bg-[#F3EFE7] px-3 py-1 border border-[#D8CABB] rounded-full shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#49372F" strokeWidth="2">
              <circle cx="8" cy="8" r="5" />
              <line x1="8" y1="13" x2="8" y2="21" />
              <path d="M8 17h4M8 19h3" />
            </svg>
            <span className="font-handwriting text-sm text-[#A55D43]">&amp;</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A55D43" strokeWidth="2">
              <circle cx="16" cy="8" r="5" />
              <line x1="16" y1="13" x2="16" y2="21" />
              <path d="M16 17h-4M16 19h-3" />
            </svg>
          </div>
        </div>

        {/* House Plaque */}
        <div className="my-8 px-8 py-5 border-2 border-[#49372F] bg-[#F3EFE7] shadow-md rounded-sm max-w-md w-full">
          <span className="font-sans text-[10px] tracking-widest text-[#6F7461] uppercase block mb-1">
            HOUSE PLAQUE
          </span>
          <h3 className="text-[#49372F]">
            <span className="block font-serif text-base md:text-lg italic opacity-70">The Home of</span>
            <span className="font-artistic-name block text-2xl md:text-4xl tracking-tight mt-1">{groomName} &amp; {brideName}</span>
          </h3>
          <p className="font-sans text-xs text-[#A55D43] uppercase tracking-widest mt-2 font-semibold">
            SINCE {eventYear} &middot; {formattedDate}
          </p>
        </div>

        {/* Closing Narrative Lines */}
        <div className="max-w-xl mx-auto my-6 space-y-3">
          <p className="font-serif text-xl md:text-2xl text-[#49372F] italic leading-relaxed">
            &ldquo;Nhà không phải là một nơi. Nhà là khi chúng mình tìm thấy nhau.&rdquo;
          </p>
          <p className="font-serif text-lg text-[#6F7461] italic leading-relaxed">
            Ngày hôm ấy, chúng mình không chỉ tổ chức một lễ cưới. Chúng mình bắt đầu gọi cùng một nơi là nhà.
          </p>
        </div>

        {/* Replay Action */}
        {onReplay && (
          <button
            onClick={onReplay}
            className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#49372F]/40 text-[#49372F] font-sans text-xs tracking-widest uppercase transition-all hover:bg-[#49372F] hover:text-[#F3EFE7] focus:ring-2 focus:ring-[#A55D43]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Mở lại từ đầu
          </button>
        )}

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-[#D8CABB] w-full flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-[#6F7461] gap-2">
          <span>
            <span className="font-artistic-name block text-lg leading-tight">{groomName} &amp; {brideName}</span>
            <span className="block mt-1 tracking-wider uppercase text-[9px]">Wedding Invitation</span>
          </span>
          <span className="font-handwriting text-base text-[#A55D43]">Made with love &amp; quiet joy</span>
          <span>SaveTheDate.io.vn &copy; {eventYear}</span>
        </div>
      </div>
    </section>
  );
}
