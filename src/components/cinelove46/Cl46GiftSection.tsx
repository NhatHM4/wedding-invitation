"use client";

import Image from "next/image";

interface Cl46GiftSectionProps {
  wedding?: any;
}

export default function Cl46GiftSection({ wedding }: Cl46GiftSectionProps) {
  return (
    <section className="is-animation anim-fade-up w-full px-5 py-8 bg-white flex flex-col items-center">
      {/* Title block with dark red background */}
      <div className="w-full bg-[#5a1212] py-4 text-center rounded-t shadow-sm">
        <h3 className="font-cormorant text-[15px] tracking-[4px] text-white uppercase font-bold">
          HỘP QUÀ YÊU THƯƠNG
        </h3>
      </div>

      {/* Gift Details Container */}
      <div className="w-full border-x border-b border-[#e8e2d8] rounded-b px-5 py-6 bg-[#fcfaf7] flex flex-col items-center text-center">
        {/* Gift Box Icon */}
        <div className="text-4xl mb-4 animate-bounce" style={{ animationDuration: "2.5s" }}>
          🎁
        </div>

        {/* Info */}
        <p className="font-barlow text-[11px] text-gray-500 max-w-[280px] leading-relaxed mb-6">
          Nếu bạn muốn gửi quà mừng cưới cho chúng mình, có thể gửi trực tiếp vào tài khoản ngân hàng dưới đây:
        </p>

        {/* Bank details side-by-side or stacked */}
        <div className="w-full flex flex-col gap-5 mb-6">
          {/* Bank Account 1 */}
          <div className="bg-white border border-[#e8ddd4] rounded p-4 flex flex-col items-center shadow-sm">
            <p className="font-barlow text-[10px] font-bold tracking-[1.5px] text-[#5a1212] uppercase mb-1">
              CHÚ RỂ — MBBANK
            </p>
            <p className="font-cormorant text-[14px] font-bold text-gray-800">
              8838683860 — NGUYEN TAN DAT
            </p>
            <div className="mt-3 relative w-32 h-32 bg-gray-50 border border-gray-200 p-1 flex items-center justify-center">
              {/* QR Image placeholder or mockup */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="0" y="0" width="30" height="30" rx="2" fill="#5a1212" opacity="0.15"/>
                <rect x="5" y="5" width="20" height="20" rx="1" fill="#5a1212" opacity="0.2"/>
                <rect x="50" y="0" width="30" height="30" rx="2" fill="#5a1212" opacity="0.15"/>
                <rect x="55" y="5" width="20" height="20" rx="1" fill="#5a1212" opacity="0.2"/>
                <rect x="0" y="50" width="30" height="30" rx="2" fill="#5a1212" opacity="0.15"/>
                <rect x="5" y="55" width="20" height="20" rx="1" fill="#5a1212" opacity="0.2"/>
                <rect x="40" y="35" width="5" height="5" fill="#5a1212" opacity="0.3"/>
                <rect x="50" y="40" width="5" height="5" fill="#5a1212" opacity="0.3"/>
                <rect x="60" y="50" width="5" height="5" fill="#5a1212" opacity="0.3"/>
                <rect x="35" y="50" width="5" height="5" fill="#5a1212" opacity="0.3"/>
                <rect x="45" y="60" width="5" height="5" fill="#5a1212" opacity="0.3"/>
                <rect x="60" y="65" width="15" height="5" fill="#5a1212" opacity="0.3"/>
              </svg>
            </div>
            <p className="font-barlow text-[9px] text-gray-400 mt-1.5">Quét mã QR để mừng cưới</p>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="w-full h-[0.5px] bg-[#e8ddd4] my-3" />
        <p className="font-barlow text-[11px] text-[#5a1212] font-semibold italic leading-relaxed max-w-[280px] mt-2">
          "Cảm ơn bạn đã đồng hành và chúc phúc cho hành trình yêu thương của chúng mình. Niềm vui hôm nay trọn vẹn hơn khi có bạn cùng sẻ chia! 🌷"
        </p>

        {/* Bottom copyright watermark */}
        <p className="font-barlow text-[9px] text-gray-400 mt-6 tracking-wide select-none">
          Thiệp cưới online tạo bởi <span className="font-bold text-[#5a1212]">Cinelove</span> · cinelove.me
        </p>
      </div>
    </section>
  );
}
