"use client";

import Image from "next/image";

interface TmdvGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  wedding?: any;
}

export default function TmdvGiftModal({ isOpen, onClose, wedding }: TmdvGiftModalProps) {
  if (!isOpen) return null;

  const bankInfo = wedding?.location_info?.bank_info || {};
  const bankName = bankInfo.bank_name || "MBBANK";
  const accountHolder = bankInfo.account_holder || "NGUYEN TAN DAT";
  const accountNumber = bankInfo.account_number || "8838683860";
  const qrUrl = bankInfo.qr_url || "/thiepmaudovang/images/qr-modal.jpg";

  return (
    <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4">
      {/* Modal Card wrapper (#w-gjiwv76m) */}
      <div 
        id="w-gjiwv76m"
        className="relative w-full max-w-[400px] h-[400px] bg-[#7d1f2a] rounded-[16px] border-2 border-white/80 shadow-2xl flex flex-col items-center justify-between p-6 overflow-hidden select-none animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white font-bold transition-all cursor-pointer z-50"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>

        {/* Title "Gửi Mừng Cưới" */}
        <h2 
          id="w-30dwb5gn" 
          className="w-full text-center font-sans font-bold text-[22px] text-white tracking-wide mt-2"
        >
          Gửi Mừng Cưới
        </h2>

        {/* QR Code Container (#w-1lz7j7t0) and actual Image (#w-au7t3ww6) */}
        <div 
          id="w-1lz7j7t0" 
          className="w-[200px] h-[200px] relative bg-white p-1 rounded-lg shadow-inner my-2 flex items-center justify-center"
        >
          <div className="w-[185px] h-[185px] relative">
            <Image
              src={qrUrl}
              alt="QR Code Mừng Cưới"
              fill
              sizes="185px"
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Bank Account Info text block (#w-sg8qlt0w) */}
        <div 
          id="w-sg8qlt0w" 
          className="w-full text-center font-sans font-bold text-[15px] text-white/95 tracking-wide leading-relaxed uppercase mb-2"
        >
          <div>{bankName} - {accountHolder}</div>
          <div className="text-[17px] text-yellow-400 font-extrabold tracking-widest mt-0.5">{accountNumber}</div>
        </div>
      </div>
    </div>
  );
}
