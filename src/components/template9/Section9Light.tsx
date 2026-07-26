"use client";

import React from "react";

export default function Section9Light() {
  return (
    <section id="light" className="relative w-full py-36 px-6 bg-[#242323] text-[#F3EFE7] overflow-hidden transition-colors duration-1000">
      {/* Subtle Warm Window Illumination Effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(226, 185, 111, 0.2) 0%, transparent 70%)" }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Section Identifier */}
        <div className="font-sans text-xs tracking-widest uppercase text-[#E2B96F] mb-6">
          SECTION 09 &middot; THE COMMITMENT ILLUMINATION
        </div>

        {/* Minimal House Silhouette with Glowing Window */}
        <div className="w-48 h-40 mx-auto mb-12 relative flex items-end justify-center">
          {/* Architectural Line House Outline in Night */}
          <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Roof */}
            <path d="M20 70 L90 15 L160 70" stroke="#F3EFE7" strokeWidth="2" strokeLinecap="round" />
            {/* Body */}
            <rect x="35" y="70" width="110" height="60" stroke="#F3EFE7" strokeWidth="1.5" fill="none" />
            {/* Door */}
            <rect x="80" y="95" width="20" height="35" stroke="#F3EFE7" strokeWidth="1.5" fill="none" />
            {/* Glowing Window 1 (Left) */}
            <rect x="50" y="80" width="20" height="20" stroke="#E2B96F" strokeWidth="1.5" fill="#E2B96F" fillOpacity="0.8" className="animate-pulse" />
            {/* Glowing Window 2 (Right) */}
            <rect x="110" y="80" width="20" height="20" stroke="#E2B96F" strokeWidth="1.5" fill="#E2B96F" fillOpacity="0.8" className="animate-pulse" style={{ animationDelay: "1s" }} />
          </svg>
        </div>

        {/* Climax Narrative Statements */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <p className="font-serif text-3xl md:text-5xl text-[#F3EFE7] italic leading-tight font-light">
            &ldquo;Chúng mình không hứa ngôi nhà này sẽ luôn đầy nắng.
          </p>
          <p className="font-serif text-3xl md:text-5xl text-[#E2B96F] italic leading-tight font-normal">
            Nhưng hứa rằng trong những ngày giông bão, sẽ không ai phải đứng ngoài cánh cửa một mình.&rdquo;
          </p>
        </div>

        {/* Quiet Footnote */}
        <div className="mt-14 font-handwriting text-2xl text-[#D8CABB]/80">
          ~ lời hứa dịu dàng của hai trái tim ~
        </div>
      </div>
    </section>
  );
}
