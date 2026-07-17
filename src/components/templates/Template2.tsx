"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Wedding, Wish } from "@/types";
import T2WatercolorBackground from "@/components/template2/T2WatercolorBackground";
import T2PopUpBook from "@/components/template2/T2PopUpBook";
import { popUpSynth } from "@/components/template2/T2PopUpSynth";

interface Template2Props {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

export default function Template2({ wedding, to, wishes }: Template2Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [giftTab, setGiftTab] = useState<"groom" | "bride">("groom");

  // Handle opening cover page
  const handleOpenBook = () => {
    popUpSynth.playPageFlip();
    popUpSynth.playBookOpenChime();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#fbfbf8] text-[#5c677d] relative antialiased overflow-hidden p-0 sm:p-4">
      
      {/* Import Web Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Share+Tech+Mono&display=swap"
        rel="stylesheet"
      />

      <style jsx global>{`
        .font-serif-lux {
          font-family: 'Playfair Display', serif;
        }
        .font-cyber {
          font-family: 'Share Tech Mono', monospace;
        }
        .font-handwritten {
          font-family: 'Dancing Script', cursive;
        }
        /* Custom scrollbar */
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(240, 128, 128, 0.05);
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(240, 128, 128, 0.2);
          border-radius: 10px;
        }
      `}</style>

      {/* 1. WATERCOLOR WASH BACKGROUND LAYER */}
      <T2WatercolorBackground />

      {/* 2. FULL SCREEN MOBILE SIZE WRAPPER (NO BUTTONS AT THE BOTTOM) */}
      <div className="relative flex flex-col w-full max-w-[440px] h-screen sm:h-[94vh] sm:max-h-[780px] z-10 items-center justify-center my-auto">
        
        {/* 3D POP-UP BOOK WITH SPREAD PAGES (FILLS FULL HEIGHT CONTAINER) */}
        <T2PopUpBook 
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onOpen={handleOpenBook} 
          to={to} 
          wedding={wedding} 
          wishes={wishes}
          onGiftOpen={() => setIsGiftModalOpen(true)}
        />
      </div>

      {/* WISHING WELL GIFT DIALOG */}
      <AnimatePresence>
        {isGiftModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGiftModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#fcfcf9] border border-gray-200 rounded-3xl p-6 shadow-2xl w-full max-w-[340px] z-10 text-center flex flex-col items-center text-gray-700 font-serif-lux"
            >
              {/* Close button */}
              <button
                onClick={() => setIsGiftModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm outline-none font-sans"
              >
                ✕
              </button>

              <span className="text-[8px] font-bold text-[#f08080] uppercase tracking-widest mb-1 font-cyber">
                * WISHING_WELL *
              </span>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">Quà Mừng Cưới</h4>

              {/* Tabs */}
              <div className="flex gap-2 w-full mb-4 font-cyber">
                <button
                  onClick={() => setGiftTab("groom")}
                  className={`flex-1 py-2 rounded-lg border text-[8px] font-bold uppercase transition ${
                    giftTab === "groom"
                      ? "bg-[#fde2e4] border-[#f08080] text-gray-800"
                      : "bg-white border-gray-200 text-gray-400"
                  }`}
                >
                  Nhà Trai (Chú rể)
                </button>
                <button
                  onClick={() => setGiftTab("bride")}
                  className={`flex-1 py-2 rounded-lg border text-[8px] font-bold uppercase transition ${
                    giftTab === "bride"
                      ? "bg-[#fde2e4] border-[#f08080] text-gray-800"
                      : "bg-white border-gray-200 text-gray-400"
                  }`}
                >
                  Nhà Gái (Cô dâu)
                </button>
              </div>

              {giftTab === "groom" ? (
                <div className="w-full flex flex-col items-center">
                  {/* QR Code */}
                  <div className="relative w-44 h-44 bg-white border border-gray-200 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-sm mb-4">
                    <Image
                      src="/thiepmaudovang/images/qr-groom.png"
                      alt="Mã QR Chú rể"
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full text-left bg-white border border-gray-200/60 rounded-xl p-3 text-[9px] text-gray-600 flex flex-col gap-2 font-mono">
                    <div>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-gray-400 font-cyber">Ngân hàng</span>
                      <p className="font-semibold text-gray-800 font-sans">MB Bank (Ngân hàng Quân đội)</p>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-gray-400 font-cyber">Số tài khoản</span>
                      <p className="font-semibold text-gray-800 font-mono text-sm">123456789999</p>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-gray-400 font-cyber">Chủ tài khoản</span>
                      <p className="font-semibold text-gray-800 uppercase font-sans">Nguyễn Minh Hoàng</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  {/* QR Code */}
                  <div className="relative w-44 h-44 bg-white border border-gray-200 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-sm mb-4">
                    <Image
                      src="/thiepmaudovang/images/qr-bride.png"
                      alt="Mã QR Cô dâu"
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full text-left bg-white border border-gray-200/60 rounded-xl p-3 text-[9px] text-gray-600 flex flex-col gap-2 font-mono">
                    <div>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-gray-400 font-cyber">Ngân hàng</span>
                      <p className="font-semibold text-gray-800 font-sans">Vietcombank</p>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-gray-400 font-cyber">Số tài khoản</span>
                      <p className="font-semibold text-gray-800 font-mono text-sm">987654321111</p>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-gray-400 font-cyber">Chủ tài khoản</span>
                      <p className="font-semibold text-gray-800 uppercase font-sans">Trần Mai Hương</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-[7.5px] text-[#f08080] font-medium italic mt-4 font-cyber">
                // THANK_YOU_SO_MUCH
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
