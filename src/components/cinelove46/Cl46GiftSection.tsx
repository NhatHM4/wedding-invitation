"use client";

import { useState } from "react";

interface Cl46GiftSectionProps {
  wedding?: any;
}

// Elegant SVG gift ornament — drawn in fine burgundy lines
const GiftOrnament = () => (
  <svg width="56" height="62" viewBox="0 0 56 62" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-5">
    {/* Box body */}
    <rect x="8" y="28" width="40" height="28" rx="1" stroke="#5c161e" strokeWidth="1" fill="none" />
    {/* Box lid */}
    <rect x="4" y="20" width="48" height="10" rx="1" stroke="#5c161e" strokeWidth="1" fill="none" />
    {/* Ribbon vertical */}
    <line x1="28" y1="20" x2="28" y2="56" stroke="#c5a880" strokeWidth="0.75" />
    {/* Ribbon horizontal */}
    <line x1="4" y1="25" x2="52" y2="25" stroke="#c5a880" strokeWidth="0.75" />
    {/* Bow — left loop */}
    <path d="M28 20 C22 14, 14 14, 14 18 C14 22, 22 20, 28 20Z" stroke="#5c161e" strokeWidth="1" fill="rgba(92,22,30,0.06)" />
    {/* Bow — right loop */}
    <path d="M28 20 C34 14, 42 14, 42 18 C42 22, 34 20, 28 20Z" stroke="#5c161e" strokeWidth="1" fill="rgba(92,22,30,0.06)" />
    {/* Bow center knot */}
    <circle cx="28" cy="20" r="2.5" stroke="#c5a880" strokeWidth="0.75" fill="rgba(197,168,128,0.2)" />
    {/* Hanging ribbons */}
    <path d="M22 20 C20 16, 18 10, 20 6" stroke="#c5a880" strokeWidth="0.75" strokeLinecap="round" />
    <path d="M34 20 C36 16, 38 10, 36 6" stroke="#c5a880" strokeWidth="0.75" strokeLinecap="round" />
  </svg>
);

export default function Cl46GiftSection({ wedding }: Cl46GiftSectionProps) {
  const [copied, setCopied] = useState(false);

  const fallbackCopy = (text: string) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
    } catch {}
  };

  const handleCopy = () => {
    const text = "8838683860";
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
          .catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    } catch { fallbackCopy(text); }
  };

  return (
    <section className="is-animation anim-fade-up w-full px-5 py-10 bg-[#fdfcf7] flex flex-col items-center border-b border-[#e8e2d8] relative overflow-hidden">

      {/* Title */}
      <div className="text-center mb-6 w-full relative z-10">
        <p className="section-label mb-1">QUÀ MỪNG CƯỚI</p>
        <p className="font-script-accent text-[40px] text-[#5c161e] mt-0.5" style={{ fontStyle: "normal" }}>
          Hộp quà yêu thương
        </p>
        <div className="contour-line mt-2" />
      </div>

      {/* SVG gift ornament */}
      <GiftOrnament />

      {/* Intro text */}
      <p className="font-serif-display text-[13.5px] text-[#6b645f] max-w-[290px] leading-relaxed mb-7 text-center">
        Nếu bạn muốn gửi quà mừng cưới cho chúng mình, có thể gửi trực tiếp vào tài khoản ngân hàng dưới đây:
      </p>

      {/* Bank card — editorial horizontal layout */}
      <div className="w-full mb-6">
        <div className="rsvp-form-surface">
          {/* Bank name */}
          <p className="section-label mb-3">CHÚ RỂ — MBBANK</p>

          {/* Account number row */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="font-serif-display text-[20px] font-medium text-[#3a3430] tracking-wide">
              8838 6838 60
            </span>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 px-3 py-1 border border-[#c5a880] text-[#b8986c] hover:bg-[#5c161e] hover:text-white text-[9px] font-sans-clean uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              {copied ? "Đã chép ✓" : "Sao chép"}
            </button>
          </div>

          {/* Account name */}
          <p className="font-sans-clean text-[10px] tracking-[2px] text-[#6b645f] uppercase font-bold">
            NGUYEN TAN DAT
          </p>
        </div>
      </div>

      {/* QR frame */}
      <div className="mt-1 mb-6 relative w-[130px] h-[130px] flex items-center justify-center double-gold-frame">
        <svg width="88" height="88" viewBox="0 0 80 80" fill="none">
          <rect x="0" y="0" width="30" height="30" rx="2" fill="#5c161e" opacity="0.15"/>
          <rect x="5" y="5" width="20" height="20" rx="1" fill="#5c161e" opacity="0.2"/>
          <rect x="50" y="0" width="30" height="30" rx="2" fill="#5c161e" opacity="0.15"/>
          <rect x="55" y="5" width="20" height="20" rx="1" fill="#5c161e" opacity="0.2"/>
          <rect x="0" y="50" width="30" height="30" rx="2" fill="#5c161e" opacity="0.15"/>
          <rect x="5" y="55" width="20" height="20" rx="1" fill="#5c161e" opacity="0.2"/>
          <rect x="40" y="35" width="5" height="5" fill="#5c161e" opacity="0.3"/>
          <rect x="50" y="40" width="5" height="5" fill="#5c161e" opacity="0.3"/>
          <rect x="60" y="50" width="5" height="5" fill="#5c161e" opacity="0.3"/>
          <rect x="35" y="50" width="5" height="5" fill="#5c161e" opacity="0.3"/>
          <rect x="45" y="60" width="5" height="5" fill="#5c161e" opacity="0.3"/>
          <rect x="60" y="65" width="15" height="5" fill="#5c161e" opacity="0.3"/>
        </svg>
      </div>
      <p className="font-sans-clean text-[9px] text-[#6b645f] tracking-wider uppercase font-bold mb-7">
        Quét mã QR để mừng cưới
      </p>

      {/* Thank you note */}
      <div className="border-l-2 border-[#c5a880]/50 pl-4 mb-7">
        <p className="font-serif-display text-[14px] text-[#5c161e] font-medium italic leading-relaxed max-w-[280px]">
          &ldquo;Cảm ơn bạn đã đồng hành và chúc phúc cho hành trình yêu thương của chúng mình. Niềm vui hôm nay trọn vẹn hơn khi có bạn cùng sẻ chia!&rdquo;
        </p>
      </div>

      {/* Watermark */}
      <p className="font-sans-clean text-[9px] text-[#a09790] tracking-wider uppercase select-none">
        Thiệp cưới online tạo bởi <span className="font-bold text-[#5c161e]">Cinelove</span> · cinelove.me
      </p>
    </section>
  );
}
