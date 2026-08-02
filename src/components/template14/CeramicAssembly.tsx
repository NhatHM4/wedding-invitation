"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export interface CeramicFragmentData {
  id: number;
  title: string;
  sectionId: string;
  subtitle: string;
  pathD: string; // SVG path shape for fragment
  assembled: boolean;
  color: string;
}

interface CeramicAssemblyProps {
  fragments: CeramicFragmentData[];
  onAssembleFragment: (id: number) => void;
  onAssembleAll: () => void;
  onStartAssembly: () => void;
}

export default function CeramicAssembly({
  fragments,
  onAssembleFragment,
  onAssembleAll,
}: CeramicAssemblyProps) {
  const [activeFragment, setActiveFragment] = useState<number | null>(null);

  const assembledCount = fragments.filter((f) => f.assembled).length;
  const totalCount = fragments.length;
  const isFullyAssembled = assembledCount === totalCount;

  return (
    <div className="relative w-full max-w-xl mx-auto py-6 px-4 flex flex-col items-center">
      {/* Instructions & Status */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#B99245]/30 shadow-sm text-xs font-serif text-[#252320]">
          <Sparkles className="w-3.5 h-3.5 text-[#B99245]" />
          <span>
            {isFullyAssembled
              ? "Chiếc đĩa gốm đã hoàn thiện trọn vẹn"
              : `Chạm vào từng mảnh để ghép (${assembledCount}/${totalCount})`}
          </span>
        </div>
      </div>

      {/* Ceramic Plate SVG Canvas Container */}
      <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[400px] flex items-center justify-center p-2 rounded-full bg-gradient-to-b from-[#F3ECDD] to-[#EAE0CD] shadow-[inset_0_2px_10px_rgba(0,0,0,0.08),0_15px_35px_rgba(37,35,32,0.12)] border border-[#C9A98D]/40">
        
        {/* Organic Outer Rim */}
        <div className="absolute inset-2 rounded-full border border-dashed border-[#B99245]/40 pointer-events-none" />

        {/* SVG Ceramic Assembly */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-md transition-all duration-700"
        >
          <defs>
            {/* Gold Seam Glow Filter */}
            <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Ceramic Clay Textures & Gradients */}
            <linearGradient id="porcelain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF7F0" />
              <stop offset="100%" stopColor="#F3ECDD" />
            </linearGradient>

            <linearGradient id="clay-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0C9B3" />
              <stop offset="100%" stopColor="#C9A98D" />
            </linearGradient>

            <linearGradient id="burgundy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#803D42" />
              <stop offset="100%" stopColor="#6A3034" />
            </linearGradient>

            {/* Gold Seam Stroke Gradient */}
            <linearGradient id="kintsugi-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6C265" />
              <stop offset="50%" stopColor="#B99245" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>

          {/* Plate Base Circle Outline */}
          <circle cx="200" cy="200" r="185" fill="#FAF7F0" stroke="#C9A98D" strokeWidth="2" opacity="0.6" />

          {/* Render Fragments */}
          {fragments.map((frag) => {
            const isAssembled = frag.assembled;
            const isSelected = activeFragment === frag.id;

            return (
              <g
                key={frag.id}
                onClick={() => {
                  setActiveFragment(frag.id);
                  onAssembleFragment(frag.id);
                }}
                className="cursor-pointer group transition-all duration-500"
              >
                {/* SVG Path Fragment */}
                <path
                  d={frag.pathD}
                  fill={`url(#${frag.color})`}
                  stroke={isAssembled ? "url(#kintsugi-gold-grad)" : "#C9A98D"}
                  strokeWidth={isAssembled ? "4" : "1.5"}
                  strokeDasharray={isAssembled ? "none" : "3,3"}
                  filter={isAssembled ? "url(#gold-glow)" : undefined}
                  className={`transition-all duration-700 ease-out transform origin-center ${
                    isAssembled
                      ? "translate-x-0 translate-y-0 scale-100 opacity-100"
                      : isSelected
                      ? "scale-105 opacity-90 stroke-[#B99245]"
                      : "translate-x-2 -translate-y-2 scale-95 opacity-80 hover:opacity-100"
                  }`}
                />

                {/* Golden Crack Line when assembled */}
                {isAssembled && (
                  <path
                    d={frag.pathD}
                    fill="none"
                    stroke="#FFDF00"
                    strokeWidth="1.5"
                    className="animate-pulse"
                    style={{ animationDuration: '2s' }}
                  />
                )}
              </g>
            );
          })}

          {/* Center Seal Stamp */}
          <circle cx="200" cy="200" r="38" fill="#6A3034" stroke="#B99245" strokeWidth="2" />
          <circle cx="200" cy="200" r="34" fill="none" stroke="#FAF7F0" strokeWidth="1" strokeDasharray="2,2" />
          <text
            x="200"
            y="196"
            textAnchor="middle"
            fill="#FAF7F0"
            className="font-serif text-[10px] tracking-widest font-semibold uppercase"
          >
            KINTSUGI
          </text>
          <text
            x="200"
            y="210"
            textAnchor="middle"
            fill="#B99245"
            className="font-serif text-[9px] tracking-wider"
          >
            LOVE
          </text>
        </svg>

        {/* Floating Sparkles when complete */}
        {isFullyAssembled && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-full h-full rounded-full border-2 border-[#B99245] animate-ping opacity-25" style={{ animationDuration: '3s' }} />
          </div>
        )}
      </div>

      {/* List of fragments as interactive buttons for touch & accessibility */}
      <div className="w-full mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {fragments.map((frag) => (
          <button
            key={frag.id}
            onClick={() => onAssembleFragment(frag.id)}
            type="button"
            className={`p-2.5 rounded-lg text-left transition-all duration-300 flex items-center justify-between border ${
              frag.assembled
                ? "bg-[#6A3034]/10 border-[#B99245] text-[#252320]"
                : "bg-[#FAF7F0] border-[#C9A98D]/40 text-[#252320]/80 hover:border-[#B99245]"
            }`}
          >
            <div className="min-w-0 pr-1">
              <p className="text-xs font-serif font-medium truncate">{frag.title}</p>
              <p className="text-[10px] font-sans text-[#76806B] truncate">{frag.subtitle}</p>
            </div>
            {frag.assembled ? (
              <CheckCircle2 className="w-4 h-4 text-[#B99245] shrink-0" />
            ) : (
              <div className="w-3.5 h-3.5 rounded-full border border-[#C9A98D] shrink-0 group-hover:border-[#B99245]" />
            )}
          </button>
        ))}
      </div>

      {/* Accessibility & Auto-Assemble Fallback Button */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {!isFullyAssembled && (
          <button
            onClick={onAssembleAll}
            type="button"
            className="px-4 py-2 text-xs font-serif text-[#6A3034] underline underline-offset-4 hover:text-[#B99245] transition-colors focus:outline-none"
          >
            Tự ghép mảnh này (Ghép toàn bộ)
          </button>
        )}
      </div>
    </div>
  );
}
