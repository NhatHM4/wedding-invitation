"use client";

import Image from "next/image";

interface TmdnGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TmdnGiftModal({ isOpen, onClose }: TmdnGiftModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/60 p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[360px] bg-white rounded-lg shadow-2xl flex flex-col items-center py-6 px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
          aria-label="Đóng"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="font-sloop text-[28px] text-gray-800 mb-4">Gửi Mừng Cưới</h2>

        {/* QR Code with red border */}
        <div className="border-4 border-[#7d1f2a] p-2 rounded-sm">
          <div className="w-[200px] h-[200px] relative">
            <Image
              src="/thiepmaudovang/images/qr-modal.jpg"
              alt="QR Code Mừng Cưới"
              fill
              sizes="200px"
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Bank info */}
        <div className="mt-4 text-center">
          <p className="font-sans font-bold text-[13px] text-gray-800 uppercase tracking-wide">
            MBBANK - NGUYEN TAN DAT
          </p>
          <p className="font-sans font-bold text-[16px] text-gray-900 tracking-widest mt-0.5">
            8838683860
          </p>
        </div>
      </div>
    </div>
  );
}
