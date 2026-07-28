"use client";

import React, { useState } from "react";

// Garden Color Tokens - Original Organic Botanical Garden Palette (#F3EFE4)
export const GARDEN_COLORS = {
  paper: "#F3EFE4",
  youngLeaf: "#82916D",
  deepOlive: "#56604D",
  wildflowerRose: "#B97878",
  terracottaSoil: "#A6674E",
  warmWood: "#6A4D3E",
  morningMist: "#C9D0C4",
  sunlightHoney: "#DDB36E",
  eveningGarden: "#303B35",
  moonCream: "#F8F3E8",
};

interface SVGProps {
  className?: string;
  style?: React.CSSProperties;
}

// 1. Romantic Wedding Botanical Arch Gate SVG with Song Hỷ (囍) (Closed / Open states)
export const GardenGateSVG: React.FC<SVGProps & { isOpen?: boolean }> = ({
  className = "w-44 h-40",
  isOpen = false,
}) => {
  return (
    <svg
      viewBox="0 0 220 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stone / Wooden Pillars */}
      <rect x="20" y="55" width="28" height="125" rx="5" fill="#56604D" opacity="0.2" />
      <rect x="172" y="55" width="28" height="125" rx="5" fill="#56604D" opacity="0.2" />
      <rect x="15" y="45" width="38" height="14" rx="4" fill="#6A4D3E" />
      <rect x="167" y="45" width="38" height="14" rx="4" fill="#6A4D3E" />

      {/* Climbing Rose Vines on Pillars */}
      <path
        d="M26 175 Q36 130 28 95 T34 45"
        stroke="#82916D"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="28" cy="115" r="4.5" fill="#B97878" />
      <circle cx="35" cy="80" r="4" fill="#F8F3E8" />
      <circle cx="26" cy="145" r="3.5" fill="#DDB36E" />

      <path
        d="M194 175 Q184 130 192 95 T186 45"
        stroke="#82916D"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="192" cy="115" r="4.5" fill="#B97878" />
      <circle cx="185" cy="80" r="4" fill="#F8F3E8" />
      <circle cx="194" cy="145" r="3.5" fill="#DDB36E" />

      {/* Wooden Gate Doors */}
      {/* Left Gate Panel */}
      <g
        className="transition-transform duration-1000 ease-out origin-left"
        style={{ transform: isOpen ? "rotateY(-78deg)" : "rotateY(0deg)" }}
      >
        <path
          d="M52 65 Q78 50 106 58 L106 175 L52 175 Z"
          fill="#6A4D3E"
          stroke="#56604D"
          strokeWidth="2"
        />
        {/* Decorative Vertical Wood Slats */}
        <line x1="68" y1="62" x2="68" y2="175" stroke="#56604D" strokeWidth="1.2" opacity="0.6" />
        <line x1="82" y1="58" x2="82" y2="175" stroke="#56604D" strokeWidth="1.2" opacity="0.6" />
        <line x1="96" y1="57" x2="96" y2="175" stroke="#56604D" strokeWidth="1.2" opacity="0.6" />

        {/* Chữ Hỷ (囍) Trái trên cánh cửa */}
        <circle cx="78" cy="100" r="11" fill="#B97878" opacity="0.9" />
        <text
          x="78"
          y="104"
          fill="#F8F3E8"
          fontSize="13"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          囍
        </text>

        {/* Golden Latch Half-Heart */}
        <circle cx="101" cy="130" r="6" fill="#DDB36E" />
      </g>

      {/* Right Gate Panel */}
      <g
        className="transition-transform duration-1000 ease-out origin-right"
        style={{ transform: isOpen ? "rotateY(78deg)" : "rotateY(0deg)" }}
      >
        <path
          d="M168 65 Q142 50 114 58 L114 175 L168 175 Z"
          fill="#6A4D3E"
          stroke="#56604D"
          strokeWidth="2"
        />
        {/* Decorative Vertical Wood Slats */}
        <line x1="152" y1="62" x2="152" y2="175" stroke="#56604D" strokeWidth="1.2" opacity="0.6" />
        <line x1="138" y1="58" x2="138" y2="175" stroke="#56604D" strokeWidth="1.2" opacity="0.6" />
        <line x1="124" y1="57" x2="124" y2="175" stroke="#56604D" strokeWidth="1.2" opacity="0.6" />

        {/* Chữ Hỷ (囍) Phải trên cánh cửa */}
        <circle cx="142" cy="100" r="11" fill="#B97878" opacity="0.9" />
        <text
          x="142"
          y="104"
          fill="#F8F3E8"
          fontSize="13"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          囍
        </text>

        {/* Golden Latch Half-Heart */}
        <circle cx="119" cy="130" r="6" fill="#DDB36E" />
      </g>

      {/* ── TOP WEDDING FLORAL ARCH (VÒM HOA CƯỚI) ── */}
      {/* Arch Main Branch */}
      <path
        d="M28 50 C 28 10, 192 10, 192 50"
        stroke="#56604D"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M32 45 C 32 15, 188 15, 188 45"
        stroke="#82916D"
        strokeWidth="3"
        fill="none"
      />

      {/* Lush Arch Foliage Leaves */}
      <path d="M50 25 Q60 18 70 28 Q58 35 50 25 Z" fill="#82916D" />
      <path d="M150 25 Q160 18 170 28 Q158 35 150 25 Z" fill="#82916D" />
      <path d="M90 12 Q100 5 110 12 Q100 20 90 12 Z" fill="#82916D" />

      {/* Blooming Wedding Roses on Arch */}
      <g>
        <circle cx="110" cy="16" r="13" fill="#DDB36E" stroke="#6A4D3E" strokeWidth="1.5" />
        <circle cx="110" cy="16" r="11" fill="#B97878" />
        <text
          x="110"
          y="21"
          fill="#F8F3E8"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          囍
        </text>

        <circle cx="92" cy="22" r="7" fill="#F8F3E8" />
        <circle cx="92" cy="22" r="3.5" fill="#B97878" />

        <circle cx="128" cy="22" r="7" fill="#F8F3E8" />
        <circle cx="128" cy="22" r="3.5" fill="#B97878" />
      </g>

      {/* Left Arch Rose Cluster */}
      <g>
        <circle cx="60" cy="24" r="9" fill="#B97878" />
        <circle cx="60" cy="24" r="4.5" fill="#F8F3E8" />
        <circle cx="45" cy="34" r="7.5" fill="#F8F3E8" />
        <circle cx="45" cy="34" r="3.5" fill="#DDB36E" />
      </g>

      {/* Right Arch Rose Cluster */}
      <g>
        <circle cx="160" cy="24" r="9" fill="#B97878" />
        <circle cx="160" cy="24" r="4.5" fill="#F8F3E8" />
        <circle cx="175" cy="34" r="7.5" fill="#F8F3E8" />
        <circle cx="175" cy="34" r="3.5" fill="#DDB36E" />
      </g>

      {/* Romantic Silk Ribbon Bow in Center */}
      <g transform="translate(110, 32)">
        <path d="M0 0 Q-14 -8 -16 2 Q-10 8 0 0 Z" fill="#A6674E" />
        <path d="M0 0 Q14 -8 16 2 Q10 8 0 0 Z" fill="#A6674E" />
        <circle cx="0" cy="0" r="3.5" fill="#DDB36E" />
        <path d="M-2 2 Q-8 16 -12 24" stroke="#A6674E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M2 2 Q8 16 12 24" stroke="#A6674E" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Small Glowing Hanging Honey Lanterns */}
      <g className="animate-pulse">
        <line x1="38" y1="45" x2="38" y2="58" stroke="#6A4D3E" strokeWidth="1.5" />
        <rect x="33" y="58" width="10" height="14" rx="2" fill="#F8F3E8" stroke="#56604D" strokeWidth="1" />
        <circle cx="38" cy="65" r="3" fill="#DDB36E" />

        <line x1="182" y1="45" x2="182" y2="58" stroke="#6A4D3E" strokeWidth="1.5" />
        <rect x="177" y="58" width="10" height="14" rx="2" fill="#F8F3E8" stroke="#56604D" strokeWidth="1" />
        <circle cx="182" cy="65" r="3" fill="#DDB36E" />
      </g>
    </svg>
  );
};

// 2. Soil & Sprout SVG
export const SproutSVG: React.FC<SVGProps & { isSprouted?: boolean }> = ({
  className = "w-24 h-24",
  isSprouted = false,
}) => {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Terracotta Soil Mound */}
      <path d="M20 95 C 40 85, 80 85, 100 95 C 105 105, 15 105, 20 95 Z" fill="#A6674E" />
      <ellipse cx="60" cy="94" rx="35" ry="8" fill="#6A4D3E" opacity="0.6" />

      {/* Seed in soil */}
      {!isSprouted && (
        <ellipse cx="60" cy="92" rx="6" ry="4" fill="#DDB36E" className="animate-pulse" />
      )}

      {/* Sprout Leaves */}
      {isSprouted && (
        <g className="transition-all duration-700 ease-out">
          {/* Main Stem */}
          <path d="M60 92 Q60 65 60 45" stroke="#56604D" strokeWidth="3" strokeLinecap="round" />
          {/* Left Leaf */}
          <path
            d="M60 65 C45 60, 35 48, 42 42 C52 42, 58 55, 60 65 Z"
            fill="#82916D"
            stroke="#56604D"
            strokeWidth="1"
          />
          {/* Right Leaf */}
          <path
            d="M60 55 C75 50, 85 38, 78 32 C68 32, 62 45, 60 55 Z"
            fill="#82916D"
            stroke="#56604D"
            strokeWidth="1"
          />
          {/* Small Top Bud */}
          <circle cx="60" cy="43" r="4" fill="#B97878" />
        </g>
      )}
    </svg>
  );
};

// 3. Watering Can SVG
export const WateringCanSVG: React.FC<SVGProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="25" y="40" width="40" height="35" rx="6" fill="#A6674E" stroke="#6A4D3E" strokeWidth="2" />
      <path d="M25 45 C10 45, 10 70, 25 70" stroke="#6A4D3E" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M65 55 L85 40" stroke="#6A4D3E" strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="87" cy="38" rx="6" ry="10" fill="#DDB36E" transform="rotate(-30 87 38)" />
      <circle cx="92" cy="48" r="1.5" fill="#82916D" opacity="0.8" />
      <circle cx="96" cy="56" r="1.5" fill="#82916D" opacity="0.8" />
    </svg>
  );
};

// 4. Memory Flower SVG
export const MemoryFlowerSVG: React.FC<SVGProps & { isOpen?: boolean }> = ({
  className = "w-10 h-10",
  isOpen = false,
}) => {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g className={`transition-transform duration-500 ${isOpen ? "scale-110" : "scale-100"}`}>
        <path d="M40 75 Q42 55 40 38" stroke="#56604D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 58 Q30 52 26 46" stroke="#82916D" strokeWidth="2" strokeLinecap="round" />

        <circle cx="40" cy="24" r="10" fill={isOpen ? "#B97878" : "#C9D0C4"} opacity="0.9" />
        <circle cx="26" cy="34" r="10" fill={isOpen ? "#B97878" : "#C9D0C4"} opacity="0.8" />
        <circle cx="54" cy="34" r="10" fill={isOpen ? "#B97878" : "#C9D0C4"} opacity="0.8" />
        <circle cx="32" cy="46" r="9" fill={isOpen ? "#B97878" : "#C9D0C4"} opacity="0.75" />
        <circle cx="48" cy="46" r="9" fill={isOpen ? "#B97878" : "#C9D0C4"} opacity="0.75" />

        <circle cx="40" cy="35" r="7" fill="#DDB36E" />
      </g>
    </svg>
  );
};

// 5. Enhanced Evening Lantern SVG with Floating Glowing Particles
export const LanternSVG: React.FC<SVGProps & { isLit?: boolean }> = ({
  className = "w-16 h-16",
  isLit = false,
}) => {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Hanging Loop */}
      <path d="M50 8 C50 18, 50 24, 50 30" stroke={isLit ? "#DDB36E" : "#6A4D3E"} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="10" r="5" stroke={isLit ? "#DDB36E" : "#6A4D3E"} strokeWidth="2" fill="none" />

      {/* Roof */}
      <path d="M28 30 L72 30 L64 42 L36 42 Z" fill={isLit ? "#6A4D3E" : "#6A4D3E"} stroke={isLit ? "#DDB36E" : "none"} strokeWidth="1" />

      {/* Glass Body */}
      <rect
        x="34"
        y="42"
        width="32"
        height="46"
        rx="3"
        fill={isLit ? "#FFEDC2" : "#F8F3E8"}
        stroke={isLit ? "#DDB36E" : "#56604D"}
        strokeWidth="2"
        className="transition-colors duration-500"
      />

      {/* Base */}
      <rect x="28" y="88" width="44" height="8" rx="2" fill="#6A4D3E" />

      {/* Flame & Radiating Glowing Light Rays */}
      {isLit && (
        <g className="animate-pulse">
          {/* Flame Core */}
          <ellipse cx="50" cy="65" rx="7" ry="12" fill="#FFB703" />
          <ellipse cx="50" cy="67" rx="4" ry="7" fill="#FFF5DF" />

          {/* Floating Honey Spark Particles */}
          <circle cx="36" cy="32" r="2" fill="#FFF5DF" className="animate-bounce" />
          <circle cx="64" cy="28" r="2.5" fill="#DDB36E" className="animate-bounce" />
          <circle cx="28" cy="60" r="1.5" fill="#FFF5DF" />
          <circle cx="72" cy="62" r="2" fill="#DDB36E" />
          <circle cx="50" cy="20" r="2" fill="#FFEDC2" />
        </g>
      )}
    </svg>
  );
};

// 6. Two Roots SVG (Family Roots)
export const RootSystemSVG: React.FC<SVGProps> = ({ className = "w-full h-32" }) => {
  return (
    <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M80 10 Q100 40 120 70 T170 110" stroke="#A6674E" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 40 Q130 55 150 90" stroke="#A6674E" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 25 Q90 50 110 95" stroke="#A6674E" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

      <path d="M320 10 Q300 40 280 70 T230 110" stroke="#A6674E" strokeWidth="3" strokeLinecap="round" />
      <path d="M300 40 Q270 55 250 90" stroke="#A6674E" strokeWidth="2" strokeLinecap="round" />
      <path d="M340 25 Q310 50 290 95" stroke="#A6674E" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

      <path d="M170 110 C 190 118, 210 118, 230 110 C 210 90, 190 90, 170 110 Z" fill="#56604D" />
      <path d="M200 115 L200 70" stroke="#56604D" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

// 7. Enhanced Guest Flower Blooming Element with Interactive Popover Tooltip
export const GuestFlowerSVG: React.FC<SVGProps & { name?: string; content?: string }> = ({
  className = "w-12 h-12",
  name,
  content,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setShowTooltip((prev) => !prev);
        }
      }}
    >
      <div className="transform transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-1">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="32" fill="#DDB36E" opacity="0.25" className="animate-pulse" />
          <path d="M40 76 Q42 60 40 45" stroke="#56604D" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 64 C32 58, 24 54, 28 48 C36 48, 38 58, 40 64 Z" fill="#82916D" />
          <path d="M40 58 C48 52, 56 48, 52 42 C44 42, 42 52, 40 58 Z" fill="#82916D" />

          <circle cx="40" cy="22" r="13" fill="#B97878" opacity="0.9" />
          <circle cx="22" cy="32" r="13" fill="#B97878" opacity="0.9" />
          <circle cx="58" cy="32" r="13" fill="#B97878" opacity="0.9" />
          <circle cx="28" cy="50" r="12" fill="#B97878" opacity="0.85" />
          <circle cx="52" cy="50" r="12" fill="#B97878" opacity="0.85" />

          <circle cx="40" cy="26" r="8" fill="#F8F3E8" opacity="0.95" />
          <circle cx="28" cy="35" r="8" fill="#F8F3E8" opacity="0.95" />
          <circle cx="52" cy="35" r="8" fill="#F8F3E8" opacity="0.95" />
          <circle cx="33" cy="46" r="7" fill="#F8F3E8" opacity="0.9" />
          <circle cx="47" cy="46" r="7" fill="#F8F3E8" opacity="0.9" />

          <circle cx="40" cy="38" r="9" fill="#DDB36E" />
          <circle cx="40" cy="38" r="4" fill="#6A4D3E" opacity="0.7" />
        </svg>
      </div>

      {name && (
        <span className="mt-1 text-xs font-semibold text-[#56604D] bg-[#F8F3E8] px-2.5 py-1 rounded-full border border-[#C9D0C4] shadow-sm transition-colors group-hover:bg-[#82916D] group-hover:text-[#F8F3E8] group-hover:border-[#82916D]">
          {name}
        </span>
      )}

      {showTooltip && (
        <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 w-64 bg-[#F8F3E8] border border-[#82916D] p-3.5 rounded-2xl shadow-xl z-30 pointer-events-none text-left space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#C9D0C4] pb-1.5">
            <span className="font-serif text-sm font-semibold text-[#56604D]">
              {name}
            </span>
            <span className="text-[10px] text-[#A6674E] uppercase tracking-wider font-mono">
              Hoa Hạt Giống
            </span>
          </div>
          {content ? (
            <p className="text-xs text-[#6A4D3E] italic leading-relaxed">
              &quot;{content}&quot;
            </p>
          ) : (
            <p className="text-[11px] text-[#82916D]">
              Đã gieo một bông hoa chúc mừng vào khu vườn ngày cưới!
            </p>
          )}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-[#F8F3E8]" />
        </div>
      )}
    </div>
  );
};
