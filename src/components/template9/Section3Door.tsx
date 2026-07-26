"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Section3DoorProps {
  coverImage?: string;
  meetingDate?: string;
}

export default function Section3Door({ coverImage, meetingDate }: Section3DoorProps) {
  const [isDoorHovered, setIsDoorHovered] = useState(false);

  const defaultImage = "/template8/images/hero.jpg";
  const displayImage = coverImage || defaultImage;
  const displayAddressDate = meetingDate || "NO. 16112025";

  return (
    <section id="door" className="relative w-full py-28 px-6 bg-[#F3EFE7] text-[#49372F] overflow-hidden border-t border-[#D8CABB]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Section Identifier */}
        <div className="font-sans text-xs tracking-widest uppercase text-[#6F7461] mb-3">
          SECTION 03 &middot; THE ENTRANCE DOOR
        </div>

        {/* Address Plate / House Number */}
        <div className="inline-flex items-center gap-3 px-5 py-2 border border-[#49372F]/30 bg-[#F3EFE7] shadow-sm mb-12">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A55D43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-serif text-sm tracking-wider font-semibold text-[#49372F]">
            ADDRESS: {displayAddressDate}
          </span>
        </div>

        {/* Copy */}
        <div className="max-w-xl mx-auto mb-14">
          <p className="font-serif text-2xl md:text-3xl text-[#49372F] italic leading-relaxed">
            &ldquo;Ngày ấy, chúng mình chỉ nghĩ rằng đã gặp thêm một người.
          </p>
          <p className="font-serif text-2xl md:text-3xl text-[#A55D43] italic leading-relaxed mt-2 font-medium">
            Không ai biết đó là người sẽ ở lại.&rdquo;
          </p>
        </div>

        {/* Symbolic Doorway Frame & Light Reveal */}
        <div
          onClick={() => setIsDoorHovered(!isDoorHovered)}
          onTouchEnd={() => setIsDoorHovered(!isDoorHovered)}
          onMouseEnter={() => setIsDoorHovered(true)}
          onMouseLeave={() => setIsDoorHovered(false)}
          className="relative w-full max-w-sm h-[480px] rounded-t-full border-2 border-[#49372F] p-3 bg-[#D8CABB]/20 overflow-hidden shadow-xl cursor-pointer group"
        >
          {/* Warm Window Light Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#E2B96F]/30 via-transparent to-[#A55D43]/20 pointer-events-none z-10" />

          {/* Reveal Container */}
          <div className="relative w-full h-full rounded-t-full overflow-hidden border border-[#49372F]/40">
            {/* Reveal Image inside Door */}
            <Image
              src={displayImage}
              alt="First meeting photo reveal"
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />

            {/* Left Door Leaf Overlay */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full bg-[#49372F] border-r border-[#D8CABB]/40 transition-transform duration-1000 ease-in-out z-20 flex items-center justify-end pr-2 ${
                isDoorHovered ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              <div className="w-2 h-12 rounded-full bg-[#E2B96F] shadow-inner" />
            </div>

            {/* Right Door Leaf Overlay */}
            <div
              className={`absolute top-0 right-0 w-1/2 h-full bg-[#49372F] border-l border-[#D8CABB]/40 transition-transform duration-1000 ease-in-out z-20 flex items-center justify-start pl-2 ${
                isDoorHovered ? "translate-x-full" : "translate-x-0"
              }`}
            >
              <div className="w-2 h-12 rounded-full bg-[#E2B96F] shadow-inner" />
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="mt-6 font-handwriting text-xl text-[#6F7461]">
          * Rê chuột hoặc chạm vào cánh cửa để mở và đón ánh sáng *
        </p>
      </div>
    </section>
  );
}
