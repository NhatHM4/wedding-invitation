"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Section5WindowProps {
  windowImage?: string;
}

export default function Section5Window({ windowImage }: Section5WindowProps) {
  const [atmosphereMode, setAtmosphereMode] = useState<"sunset" | "twilight" | "dawn">("sunset");
  const [showPhotoReveal, setShowPhotoReveal] = useState(false);

  const defaultPhoto = "/template8/images/gallery-5.jpg";
  const displayPhoto = windowImage || defaultPhoto;

  // Atmosphere Sky Gradients & Themes
  const modeStyles = {
    sunset: {
      name: "Hoàng Hôn Ấm Áp",
      bg: "from-[#D87040] via-[#E2B96F] to-[#F3EFE7]",
      sunColor: "bg-[#E2B96F]",
      textColor: "text-[#A55D43]",
    },
    twilight: {
      name: "Đêm Đầy Sao",
      bg: "from-[#242323] via-[#3B3838] to-[#6F7461]",
      sunColor: "bg-[#E2B96F]/30",
      textColor: "text-[#E2B96F]",
    },
    dawn: {
      name: "Nắng Sớm Bình Minh",
      bg: "from-[#E2B96F] via-[#F3EFE7] to-[#D8CABB]",
      sunColor: "bg-[#F3EFE7]",
      textColor: "text-[#6F7461]",
    },
  };

  const currentMode = modeStyles[atmosphereMode];

  return (
    <section id="window" className="relative w-full py-28 px-6 bg-[#F3EFE7] text-[#49372F] overflow-hidden border-t border-[#D8CABB]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Section Identifier */}
        <div className="font-sans text-xs tracking-widest uppercase text-[#6F7461] mb-3">
          SECTION 05 &middot; THE WINDOW TO THE FUTURE
        </div>

        {/* Section Title */}
        <h2 className="font-serif text-3xl md:text-5xl text-[#49372F] tracking-tight mb-6">
          Khung Cửa Tương Lai
        </h2>

        {/* Narrative Copy */}
        <div className="max-w-xl mx-auto mb-10 space-y-3">
          <p className="font-serif text-xl md:text-2xl text-[#49372F] italic leading-relaxed">
            &ldquo;Chúng mình không biết phía trước sẽ có những ngày như thế nào.
          </p>
          <p className="font-serif text-xl md:text-2xl text-[#A55D43] italic leading-relaxed font-medium">
            Chỉ biết trong mọi khung cảnh tương lai, đều muốn nhìn thấy người kia.&rdquo;
          </p>
        </div>

        {/* Atmosphere Time-of-Day Switcher Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(["sunset", "twilight", "dawn"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setAtmosphereMode(mode)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all duration-300 ${
                atmosphereMode === mode
                  ? "bg-[#49372F] text-[#F3EFE7] shadow-sm font-semibold"
                  : "bg-[#D8CABB]/40 text-[#49372F] hover:bg-[#D8CABB]"
              }`}
            >
              {modeStyles[mode].name}
            </button>
          ))}
        </div>

        {/* Architectural Window Frame with Rich Live Atmosphere */}
        <div className="relative w-full max-w-md aspect-[4/3] rounded-t-full border-4 border-[#49372F] bg-[#49372F] p-2 shadow-2xl overflow-hidden group select-none">
          {/* Inner Window Arch Canvas */}
          <div
            className={`relative w-full h-full rounded-t-full overflow-hidden bg-gradient-to-b ${currentMode.bg} transition-all duration-1000 flex flex-col justify-end p-6`}
          >
            {/* Sun/Moon Radiant Glow */}
            <div
              className={`absolute top-6 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full ${currentMode.sunColor} blur-2xl transition-all duration-1000 animate-pulse`}
              style={{ animationDuration: "6s" }}
            />

            {/* Drifting Clouds Vector Layer */}
            <div className="absolute top-10 inset-x-0 pointer-events-none opacity-40">
              <svg width="300" height="60" viewBox="0 0 300 60" fill="none" className="w-full animate-pulse" style={{ animationDuration: "12s" }}>
                <path d="M10 40 Q 30 20, 60 40 Q 90 20, 120 40 Q 150 25, 180 40 Q 210 20, 240 40 H 10 Z" fill="#F3EFE7" fillOpacity="0.5" />
              </svg>
            </div>

            {/* Distant Mountains & Horizon Silhouette */}
            <div className="absolute bottom-10 inset-x-0 pointer-events-none opacity-60">
              <svg width="400" height="90" viewBox="0 0 400 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0 90 L60 35 L120 70 L200 20 L280 65 L360 30 L400 90 Z" fill="#49372F" fillOpacity="0.4" />
                <path d="M0 90 L90 45 L180 80 L270 35 L360 75 L400 90 Z" fill="#49372F" fillOpacity="0.7" />
              </svg>
            </div>

            {/* Couple Silhouette or Photo Reveal Layer */}
            {showPhotoReveal ? (
              <div className="absolute inset-0 z-20 animate-fade-in">
                <Image src={displayPhoto} alt="Future memory reveal" fill className="object-cover" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242323]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-0 text-center text-[#F3EFE7] font-handwriting text-2xl">
                  &ldquo;cùng nhau đi qua mọi khung cảnh cuộc đời&rdquo;
                </div>
              </div>
            ) : (
              /* Couple Silhouette by windowsill */
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-85">
                <svg width="80" height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Person 1 (Left) */}
                  <circle cx="32" cy="18" r="8" fill="#49372F" />
                  <path d="M22 70 Q 22 35, 32 35 Q 42 35, 42 70 Z" fill="#49372F" />
                  {/* Person 2 (Right - leaning together) */}
                  <circle cx="48" cy="20" r="7.5" fill="#49372F" />
                  <path d="M38 70 Q 38 38, 48 38 Q 58 38, 58 70 Z" fill="#49372F" />
                </svg>
              </div>
            )}

            {/* Window Glass Panes (Architectural Muntins) */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-collapse pointer-events-none z-20">
              <div className="border-r-2 border-b-2 border-[#49372F]/60" />
              <div className="border-b-2 border-[#49372F]/60" />
              <div className="border-r-2 border-[#49372F]/60" />
              <div className="" />
            </div>

            {/* Foreground windowsill plants */}
            <div className="relative z-30 flex justify-between items-end opacity-90 pointer-events-none">
              <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 50 Q 20 10, 45 50 M35 50 Q 55 5, 75 50 M65 50 Q 85 20, 95 50" stroke="#49372F" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <svg width="80" height="45" viewBox="0 0 80 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 45 Q 25 10, 45 45 M35 45 Q 60 5, 75 45" stroke="#49372F" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Interactive Photo Reveal Toggle Button */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={() => setShowPhotoReveal(!showPhotoReveal)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#49372F]/40 text-xs font-sans uppercase tracking-widest text-[#49372F] bg-[#F3EFE7] hover:bg-[#49372F] hover:text-[#F3EFE7] transition-all shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {showPhotoReveal ? "Ẩn bức ảnh tương lai" : "Chạm để nhìn thấy người kia"}
          </button>
          <p className="font-handwriting text-lg text-[#A55D43]">
            * chọn mốc thời gian hoặc chạm vào nút trên để khám phá *
          </p>
        </div>
      </div>
    </section>
  );
}
