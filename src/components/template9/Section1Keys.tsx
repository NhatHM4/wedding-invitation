"use client";

import React, { useState } from "react";

interface Section1KeysProps {
  groomName: string;
  brideName: string;
  onOpenDoor: () => void;
  isOpen: boolean;
}

export default function Section1Keys({ groomName, brideName, onOpenDoor, isOpen }: Section1KeysProps) {
  const groomInitial = groomName ? groomName.trim().charAt(0).toUpperCase() : "G";
  const brideInitial = brideName ? brideName.trim().charAt(0).toUpperCase() : "B";

  const handleClick = () => {
    onOpenDoor();
  };

  const scrollToFoundation = () => {
    const el = document.getElementById("foundation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="keys" className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-6 py-12 bg-[#F3EFE7] text-[#49372F] overflow-hidden select-none">
      {/* Editorial top micro-header */}
      <div className="w-full max-w-xl flex justify-between items-center text-xs tracking-widest uppercase opacity-70 font-sans border-b border-[#D8CABB] pb-4">
        <span>ARCHITECTURAL INVITATION</span>
        <span>NO. 09</span>
      </div>

      {/* Center artwork: Keys & Door Outline */}
      <div className="relative my-auto flex flex-col items-center justify-center text-center max-w-lg w-full">
        {/* Keys Visual Composition */}
        <div className="relative w-64 h-48 flex items-center justify-center mb-8">
          {/* Key 1: Groom */}
          <div
            className={`absolute transition-all duration-1000 ease-out transform ${
              isOpen ? "translate-x-3 rotate-6 scale-105" : "-translate-x-12 -rotate-12 hover:-translate-x-8"
            }`}
          >
            <div className="flex flex-col items-center">
              <svg width="60" height="110" viewBox="0 0 60 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Key head */}
                <circle cx="30" cy="26" r="20" stroke="#49372F" strokeWidth="2" fill="#F3EFE7" />
                <circle cx="30" cy="26" r="12" stroke="#D8CABB" strokeWidth="1.5" />
                <text x="30" y="30" textAnchor="middle" fill="#49372F" fontSize="12" fontWeight="700" fontFamily="serif">
                  {groomInitial}
                </text>
                {/* Key shaft */}
                <line x1="30" y1="46" x2="30" y2="104" stroke="#49372F" strokeWidth="2.5" strokeLinecap="round" />
                {/* Key teeth */}
                <path d="M30 80 H42 V88 H30 M30 94 H40 V100 H30" stroke="#49372F" strokeWidth="2" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>

          {/* Key 2: Bride */}
          <div
            className={`absolute transition-all duration-1000 ease-out transform ${
              isOpen ? "-translate-x-4 -rotate-6 scale-105" : "translate-x-10 rotate-12 hover:translate-x-6"
            }`}
          >
            <div className="flex flex-col items-center">
              <svg width="60" height="110" viewBox="0 0 60 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Key head */}
                <circle cx="30" cy="26" r="20" stroke="#A55D43" strokeWidth="2" fill="#F3EFE7" />
                <circle cx="30" cy="26" r="12" stroke="#D8CABB" strokeWidth="1.5" />
                <text x="30" y="30" textAnchor="middle" fill="#A55D43" fontSize="12" fontWeight="700" fontFamily="serif">
                  {brideInitial}
                </text>
                {/* Key shaft */}
                <line x1="30" y1="46" x2="30" y2="104" stroke="#A55D43" strokeWidth="2.5" strokeLinecap="round" />
                {/* Key teeth */}
                <path d="M30 76 H18 V84 H30 M30 90 H20 V96 H30" stroke="#A55D43" strokeWidth="2" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>

          {/* Architectural Door Outline Drawing effect */}
          <div
            className={`absolute inset-0 border border-dashed border-[#49372F]/40 rounded-t-full transition-all duration-1000 ${
              isOpen ? "opacity-100 scale-100" : "opacity-20 scale-95"
            }`}
          />
        </div>

        {/* Couple Names Editorial Title */}
        <h1 className="font-serif text-3xl md:text-5xl tracking-tight text-[#49372F] mb-6">
          {groomName} <span className="font-handwriting text-2xl md:text-4xl text-[#A55D43] mx-1">&amp;</span> {brideName}
        </h1>

        {/* Opening Narrative Copy */}
        <div className="space-y-2 mb-10 max-w-md mx-auto">
          <p className="font-serif text-base md:text-lg italic text-[#49372F]/90 leading-relaxed">
            &ldquo;Có những người bước vào cuộc đời ta như một vị khách.
          </p>
          <p className="font-serif text-base md:text-lg italic text-[#49372F]/90 leading-relaxed">
            Và có một người khiến ta muốn cùng xây một mái nhà.&rdquo;
          </p>
        </div>

        {/* Primary Action Button */}
        {!isOpen ? (
          <button
            onClick={handleClick}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#49372F] text-[#F3EFE7] font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#A55D43] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#A55D43] active:scale-95"
          >
            <span className="mr-2">Mở cánh cửa</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        ) : (
          <button
            onClick={scrollToFoundation}
            className="flex flex-col items-center animate-fade-in text-xs font-sans tracking-widest text-[#A55D43] uppercase hover:text-[#49372F] transition-colors focus:outline-none cursor-pointer group"
          >
            <span className="group-hover:underline">Cuộn xuống để bước vào ngôi nhà</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce mt-2 text-[#A55D43] group-hover:scale-125 transition-transform">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Editorial Footer Address Bar */}
      <div className="w-full max-w-xl flex justify-between items-center text-[11px] font-sans text-[#49372F]/60 border-t border-[#D8CABB] pt-4">
        <span>EST. 2025</span>
        <span className="font-handwriting text-sm text-[#A55D43]">The House We Built Between Us</span>
        <span>VIETNAM</span>
      </div>
    </section>
  );
}
