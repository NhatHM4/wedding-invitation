"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check } from "lucide-react";
import { Wedding } from "@/types";

interface GiftBoxSectionProps {
  wedding: Wedding;
}

export default function GiftBoxSection({ wedding }: GiftBoxSectionProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const groomBank = {
    owner: wedding.groom_name,
    bankName: "MB BANK (Ngân hàng Quân Đội)",
    accountNumber: "999988886666",
    qrUrl: "/template8/images/qr-groom.png",
  };

  const brideBank = {
    owner: wedding.bride_name,
    bankName: "VIETCOMBANK",
    accountNumber: "666688889999",
    qrUrl: "/template8/images/qr-bride.png",
  };

  const handleCopy = (accNumber: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(accNumber);
    }
    setCopiedAccount(accNumber);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const signatureEase = [0.4, 0, 0.2, 1] as const;

  return (
    <section className="py-20 px-4 bg-[#FFF5F2] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: signatureEase }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-medium flex items-center justify-center gap-1.5">
            <Gift className="w-4 h-4 text-rose-400" />
            <span>WEDDING GIFT</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mt-2">
            HỘP MỪNG CƯỚI
          </h2>
          <p className="text-sm text-gray-600 mt-3 max-w-md mx-auto">
            Sự hiện diện và lời chúc mừng của quý vị là món quà vô giá nhất đối với chúng tôi.
          </p>
          <div className="w-16 h-[2px] bg-rose-300 mx-auto mt-4" />
        </motion.div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Groom Bank Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: signatureEase }}
            className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-100 shadow-xl shadow-rose-100/50 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-rose-100 transition-all duration-300"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 px-3 py-1 bg-rose-50 rounded-full mb-4">
              MỪNG CƯỚI CHÚ RỂ
            </span>

            <div className="w-40 h-40 p-2 rounded-2xl bg-white border border-rose-100 shadow-inner mb-4 flex items-center justify-center">
              <img
                src={groomBank.qrUrl}
                alt="QR Groom"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/template8/images/qr-placeholder.png";
                }}
              />
            </div>

            <h3 className="font-artistic-name text-2xl text-gray-900 mb-1">
              {groomBank.owner}
            </h3>
            <p className="text-xs text-rose-600 font-medium mb-3">
              {groomBank.bankName}
            </p>

            <div className="w-full p-3 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between gap-2">
              <span className="font-mono text-sm font-semibold text-gray-800 tracking-wider">
                {groomBank.accountNumber}
              </span>
              <button
                onClick={() => handleCopy(groomBank.accountNumber)}
                aria-label="Sao chép số tài khoản chú rể"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 active:scale-95 transition-all shadow-sm"
              >
                {copiedAccount === groomBank.accountNumber ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Bride Bank Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: signatureEase }}
            className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-100 shadow-xl shadow-rose-100/50 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-rose-100 transition-all duration-300"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 px-3 py-1 bg-rose-50 rounded-full mb-4">
              MỪNG CƯỚI CÔ DÂU
            </span>

            <div className="w-40 h-40 p-2 rounded-2xl bg-white border border-rose-100 shadow-inner mb-4 flex items-center justify-center">
              <img
                src={brideBank.qrUrl}
                alt="QR Bride"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/template8/images/qr-placeholder.png";
                }}
              />
            </div>

            <h3 className="font-artistic-name text-2xl text-gray-900 mb-1">
              {brideBank.owner}
            </h3>
            <p className="text-xs text-rose-600 font-medium mb-3">
              {brideBank.bankName}
            </p>

            <div className="w-full p-3 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between gap-2">
              <span className="font-mono text-sm font-semibold text-gray-800 tracking-wider">
                {brideBank.accountNumber}
              </span>
              <button
                onClick={() => handleCopy(brideBank.accountNumber)}
                aria-label="Sao chép số tài khoản cô dâu"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 active:scale-95 transition-all shadow-sm"
              >
                {copiedAccount === brideBank.accountNumber ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
