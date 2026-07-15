"use client";

import { useState } from "react";
import Image from "next/image";

interface Cl46GiftSectionProps {
  wedding?: any;
}

export default function Cl46GiftSection({ wedding }: Cl46GiftSectionProps) {
  const [copied, setCopied] = useState(false);

  const fallbackCopy = (text: string) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
  };

  const handleCopy = () => {
    const text = "8838683860";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(() => {
            fallbackCopy(text);
          });
      } else {
        fallbackCopy(text);
      }
    } catch (e) {
      fallbackCopy(text);
    }
  };

  return (
    <section className="is-animation anim-fade-up w-full px-5 py-8 bg-[#fdfcf7] flex flex-col items-center border-b border-[#e8e2d8]">
      {/* Title */}
      <div className="text-center mb-6">
        <p className="font-sans-clean text-[9px] tracking-[3px] text-[#6b645f] uppercase font-bold">
          QUÀ MỪNG CƯỚI
        </p>
        <p className="font-script-accent text-[34px] text-[#5c161e] mt-1" style={{ fontStyle: "normal" }}>
          Hộp quà yêu thương
        </p>
        <div className="w-12 h-[0.5px] bg-[#c5a880] mx-auto mt-2" />
      </div>

      {/* Gift Details Container */}
      <div className="w-full px-1 py-2 flex flex-col items-center text-center">
        {/* Gift Box Icon */}
        <div className="text-3xl mb-4 animate-bounce" style={{ animationDuration: "2.5s" }}>
          🎁
        </div>

        {/* Info */}
        <p className="font-serif-display text-[13px] text-[#6b645f] max-w-[280px] leading-relaxed mb-6">
          Nếu bạn muốn gửi quà mừng cưới cho chúng mình, có thể gửi trực tiếp vào tài khoản ngân hàng dưới đây:
        </p>

        {/* Bank details stacked */}
        <div className="w-full flex flex-col gap-5 mb-6">
          {/* Bank Account 1 */}
          <div className="bg-[#fdfcf7] border border-[#e8e2d8] rounded p-5 flex flex-col items-center shadow-sm relative">
            <div className="absolute inset-1.5 border border-[#c5a880]/15 pointer-events-none rounded-sm" />
            <p className="font-sans-clean text-[10px] font-bold tracking-[1.5px] text-[#5c161e] uppercase mb-1.5 z-10">
              CHÚ RỂ — MBBANK
            </p>
            <div className="flex items-center gap-2.5 z-10">
              <span className="font-serif-display text-[15.5px] font-bold text-[#3a3430] tracking-wide">
                8838683860
              </span>
              <button
                onClick={handleCopy}
                className="px-2 py-0.5 border border-[#c5a880] text-[#b8986c] hover:bg-[#5c161e] hover:text-white rounded text-[9px] font-sans-clean uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                {copied ? "Đã chép" : "Sao chép"}
              </button>
            </div>
            <p className="font-serif-display text-[13px] text-[#6b645f] mt-1.5 z-10 font-medium">
              NGUYEN TAN DAT
            </p>
            <div className="mt-4 relative w-32 h-32 bg-[#fdfcf7] p-1 flex items-center justify-center z-10 double-gold-frame">
              {/* QR Image SVG */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
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
            <p className="font-sans-clean text-[9px] text-[#6b645f] mt-2.5 tracking-wider uppercase z-10 font-bold">Quét mã QR để mừng cưới</p>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="w-12 h-[0.5px] bg-[#c5a880]/50 my-4" />
        <p className="font-serif-display text-[14px] text-[#5c161e] font-semibold italic leading-relaxed max-w-[280px] mt-1">
          "Cảm ơn bạn đã đồng hành và chúc phúc cho hành trình yêu thương của chúng mình. Niềm vui hôm nay trọn vẹn hơn khi có bạn cùng sẻ chia! 🌷"
        </p>

        {/* Bottom copyright watermark */}
        <p className="font-sans-clean text-[9px] text-[#a09790] mt-8 tracking-wider uppercase select-none">
          Thiệp cưới online tạo bởi <span className="font-bold text-[#5c161e]">Cinelove</span> · cinelove.me
        </p>
      </div>
    </section>
  );
}
