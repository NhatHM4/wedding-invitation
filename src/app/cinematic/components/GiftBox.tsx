"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import type { GiftInfo } from "../data/types";

interface GiftBoxProps {
  giftInfo: GiftInfo;
}

export function GiftBox({ giftInfo }: GiftBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(giftInfo.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = giftInfo.accountNumber;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [giftInfo.accountNumber]);

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-sm mx-auto text-center">
        <ScrollReveal>
          <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60 mb-6">
            — Hộp quà —
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2
            className="font-[family-name:var(--font-cormorant-garamond)] font-light text-[#F5F0E8] mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Mừng Cưới
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="font-[family-name:var(--font-cormorant-garamond)] italic text-[#F5F0E8]/50 text-base mb-8">
            Sự hiện diện của bạn là món quà quý giá nhất
          </p>
        </ScrollReveal>

        {/* Gift box visual */}
        <ScrollReveal delay={0.4}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative mx-auto w-32 h-32 mb-8"
            type="button"
            aria-label="Mở hộp quà mừng cưới"
          >
            {/* Box */}
            <div className="absolute inset-0 border border-[#D4AF72]/30 rounded-sm bg-[#D4AF72]/5 transition-all duration-500 group-hover:border-[#D4AF72]/60 group-hover:bg-[#D4AF72]/10">
              {/* Ribbon vertical */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-4 border-x border-[#D4AF72]/20" />
              {/* Ribbon horizontal */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-4 border-y border-[#D4AF72]/20" />
              {/* Bow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <svg
                  className="w-8 h-8 text-[#D4AF72] transition-transform duration-500 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </button>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF72]/30 rounded-sm text-[#D4AF72] font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#D4AF72]/10 hover:border-[#D4AF72]/50 active:scale-[0.98]"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            Gửi quà mừng
          </button>
        </ScrollReveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 lightbox-backdrop"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal card */}
            <motion.div
              className="relative z-10 w-full max-w-sm glass rounded-lg p-8"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#F5F0E8]/50 hover:text-[#F5F0E8] transition-colors"
                type="button"
                aria-label="Đóng"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="text-center space-y-5">
                <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-[#F5F0E8]">
                  Mừng Cưới
                </h3>

                {/* Bank info */}
                <div className="space-y-3">
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 mb-1">
                      Ngân hàng
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]">
                      {giftInfo.bankName}
                    </p>
                  </div>

                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 mb-1">
                      Chủ tài khoản
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]">
                      {giftInfo.accountHolder}
                    </p>
                  </div>

                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 mb-1">
                      Số tài khoản
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="font-[family-name:var(--font-inter)] text-lg text-[#D4AF72] tracking-wider">
                        {giftInfo.accountNumber}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="w-8 h-8 flex items-center justify-center text-[#F5F0E8]/50 hover:text-[#D4AF72] transition-colors"
                        type="button"
                        aria-label="Sao chép số tài khoản"
                      >
                        {copied ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF72" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {copied && (
                      <p className="font-[family-name:var(--font-inter)] text-[11px] text-[#D4AF72] mt-1 toast-enter">
                        Đã sao chép!
                      </p>
                    )}
                  </div>
                </div>

                {/* QR Code */}
                <div className="pt-2">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 mb-3">
                    Quét mã QR
                  </p>
                  <div className="relative w-40 h-40 mx-auto bg-white rounded-md p-2">
                    <Image
                      src={giftInfo.qrImage}
                      alt="QR Code chuyển khoản"
                      fill
                      className="object-contain p-2"
                      sizes="160px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
