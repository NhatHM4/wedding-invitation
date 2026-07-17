"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function T1ScrollMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const carRef = useRef<SVGGElement | null>(null);

  const [reached, setReached] = useState(false);

  // Track the scroll of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale scroll progress slightly to complete the journey while the section is in focus
  // Map scroll progress from 0.25 (entering screen) to 0.7 (centered/exiting) into 0 to 1
  const mapProgress = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);

  useEffect(() => {
    const path = pathRef.current;
    const car = carRef.current;
    if (!path || !car) return;

    const pathLength = path.getTotalLength();

    // Listen to scroll progress changes and update car coordinates directly in DOM
    const unsubscribe = mapProgress.on("change", (latest) => {
      // Clamp progress between 0 and 1
      const progress = Math.max(0, Math.min(1, latest));

      if (progress >= 0.9) {
        setReached(true);
      } else {
        setReached(false);
      }

      const point = path.getPointAtLength(progress * pathLength);
      
      // Calculate rotation angle based on a tiny delta
      const delta = 1;
      const prevPoint = path.getPointAtLength(Math.max(0, progress * pathLength - delta));
      const nextPoint = path.getPointAtLength(Math.min(pathLength, progress * pathLength + delta));
      
      const angle = Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x) * (180 / Math.PI);

      // Directly update SVG transform attribute for 60fps smooth rendering
      car.setAttribute(
        "transform",
        `translate(${point.x}, ${point.y}) rotate(${angle}) translate(-20, -10)`
      );
    });

    // Initialize car position
    const initialPoint = path.getPointAtLength(0);
    car.setAttribute("transform", `translate(${initialPoint.x}, ${initialPoint.y}) rotate(10) translate(-20, -10)`);

    return () => unsubscribe();
  }, [mapProgress]);

  return (
    <div ref={containerRef} className="w-full py-12 px-4 bg-transparent relative">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">Hành Trình</span>
        <h2 className="text-2xl font-bold text-[#5c3c43] font-serif-lux mt-1">Bản Đồ Chỉ Đường</h2>
        <div className="w-10 h-[2px] bg-rose-400 mx-auto mt-2" />
        <p className="text-[10px] text-rose-400/60 uppercase tracking-wider mt-2">
          Cuộn màn hình để cùng di chuyển đến lễ đường
        </p>
      </div>

      {/* Interactive Map Layout Container */}
      <div className="relative w-full max-w-[320px] aspect-[3/4] mx-auto bg-[#fbfaf5] border border-rose-100 rounded-3xl p-4 shadow-[0_10px_30px_rgba(244,63,94,0.05)] overflow-hidden">
        
        {/* Soft Watercolor Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-200 rounded-3xl" />
        
        <svg viewBox="0 0 320 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Ambient Map Drawings (Mountains, Trees, Clouds) */}
          {/* Cloud 1 */}
          <path d="M 40 40 Q 50 30 60 40 Q 70 30 80 40 L 80 45 L 40 45 Z" fill="#e2e8f0" opacity="0.5" />
          {/* Cloud 2 */}
          <path d="M 240 180 Q 250 170 260 180 Q 270 170 280 180 L 280 185 L 240 185 Z" fill="#e2e8f0" opacity="0.5" />

          {/* Mountains */}
          <polygon points="20,150 40,110 60,150" fill="#cbd5e1" opacity="0.3" />
          <polygon points="40,160 65,120 90,160" fill="#cbd5e1" opacity="0.2" />

          {/* Trees */}
          <g fill="#a7f3d0" opacity="0.6">
            <circle cx="280" cy="100" r="10" />
            <polygon points="280,110 277,125 283,125" fill="#34d399" />
            <circle cx="295" cy="108" r="7" />
            <polygon points="295,115 293,125 297,125" fill="#34d399" />
          </g>
          
          <g fill="#a7f3d0" opacity="0.5">
            <circle cx="40" cy="300" r="12" />
            <polygon points="40,312 37,330 43,330" fill="#34d399" />
          </g>

          {/* Curved Dotted Road Path */}
          <path
            ref={pathRef}
            d="M 60 70 C 180 70, 260 120, 240 200 C 220 280, 50 220, 80 320 C 90 350, 160 350, 250 350"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 6"
            className="transition-all duration-300"
          />

          {/* STARTING PIN: LỄ CƯỚI */}
          <g transform="translate(60, 70)">
            <circle cx="0" cy="0" r="18" fill="rgba(244, 63, 94, 0.15)" />
            <circle cx="0" cy="0" r="6" fill="#f43f5e" className="animate-ping" />
            <circle cx="0" cy="0" r="4" fill="#f43f5e" />
            {/* Tag */}
            <rect x="-30" y="-32" width="60" height="20" rx="4" fill="#f43f5e" />
            <text x="0" y="-18" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              LỄ CƯỚI
            </text>
          </g>

          {/* DESTINATION PIN: NHÀ HÀNG */}
          <g transform="translate(250, 350)">
            <circle cx="0" cy="0" r="18" fill="rgba(239, 68, 68, 0.15)" />
            <circle cx="0" cy="0" r="6" fill="#ef4444" className="animate-ping" />
            <circle cx="0" cy="0" r="4" fill="#ef4444" />
            {/* Tag */}
            <rect x="-30" y="-32" width="60" height="20" rx="4" fill="#ef4444" />
            <text x="0" y="-18" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              NHÀ HÀNG
            </text>
          </g>

          {/* THE WEDDING CAR (Follows path) */}
          <g ref={carRef} style={{ pointerEvents: "none" }}>
            {/* Red Vintage Wedding Car body shape */}
            <path
              d="M 5 10 L 10 5 L 30 5 L 35 10 L 38 12 L 38 16 L 2 16 L 2 12 Z"
              fill="#ef4444"
            />
            {/* Windows */}
            <polygon points="12,6 20,6 20,9 12,9" fill="#e0f2fe" />
            <polygon points="22,6 28,6 28,9 22,9" fill="#e0f2fe" />
            
            {/* Wheels */}
            <circle cx="10" cy="16" r="4" fill="#1e293b" />
            <circle cx="10" cy="16" r="1.5" fill="#e2e8f0" />
            <circle cx="30" cy="16" r="4" fill="#1e293b" />
            <circle cx="30" cy="16" r="1.5" fill="#e2e8f0" />

            {/* Floating heart behind the car */}
            <path
              d="M 0 0 C -2 -4, -6 -4, -6 0 C -6 4, 0 8, 0 8 C 0 8, 6 4, 6 0 C 6 -4, 2 -4, 0 0"
              fill="#f43f5e"
              transform="translate(-6, 2) scale(0.6)"
            />
          </g>
        </svg>

        {/* Reached Destination Alert Box */}
        {reached && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 border border-rose-100 shadow-xl rounded-xl p-3 flex flex-col gap-1 items-center text-center z-15"
          >
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">
              Đã đến điểm hẹn!
            </span>
            <p className="text-[11px] font-semibold text-slate-800 leading-snug">
              Nhà Trai - 123 Đường Láng
            </p>
            <a
              href="https://maps.app.goo.gl/y56r4UqN6yM4H4s9A"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-3 py-1 bg-rose-500 text-white rounded-full text-[9px] font-bold uppercase tracking-wider hover:bg-rose-600 transition"
            >
              Chỉ đường Google Maps
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
