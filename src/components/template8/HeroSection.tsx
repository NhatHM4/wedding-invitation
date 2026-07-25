"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart } from "lucide-react";
import { Wedding } from "@/types";

interface HeroSectionProps {
  wedding: Wedding;
  to?: string;
}

export default function HeroSection({ wedding, to }: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const formattedDate = "16.11.2025";
  const guestName = to || "Quý khách";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const signatureEase = [0.4, 0, 0.2, 1] as const;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center bg-gradient-to-b from-[#FDF8F5] via-[#FFF5F2] to-[#FDF8F5] overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Top Border Frame */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: signatureEase }}
        className="w-full max-w-md flex justify-center mb-4"
      >
        <img
          src="/template8/images/divider-top.png"
          alt="Decorative Frame Top"
          className="w-44 sm:w-52 h-auto object-contain opacity-80"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = "none";
          }}
        />
      </motion.div>

      {/* Guest Invitation Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: signatureEase }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/85 backdrop-blur-sm border border-rose-200 shadow-sm text-rose-700 text-sm font-medium mb-6 hover:shadow-md transition-shadow"
      >
        <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
        <span>Kính mời: <strong className="font-semibold text-rose-900">{isMounted ? guestName : "Quý khách"}</strong></span>
      </motion.div>

      {/* Main Card Frame */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: signatureEase }}
        className="relative w-full max-w-lg p-8 sm:p-12 rounded-3xl bg-white/75 backdrop-blur-md border border-rose-150 shadow-xl shadow-rose-100/50 flex flex-col items-center"
      >
        {/* Subtitle */}
        <p className="text-xs uppercase tracking-[0.3em] font-medium text-rose-500 mb-3">
          SAVE OUR DATE • WEDDING INVITATION
        </p>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl text-gray-800 tracking-wide font-light mb-6">
          THIỆP CƯỚI
        </h2>

        {/* Main Photo Banner */}
        <div className="relative w-48 h-64 sm:w-56 sm:h-72 my-4 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-rose-200/50 group">
          <img
            src={wedding.images?.[0] || "/template8/images/hero.jpg"}
            alt={`${wedding.groom_name} & ${wedding.bride_name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/template8/images/hero.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Couple Names */}
        <div className="my-6 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-900 font-normal leading-tight">
            {wedding.groom_name}
          </h1>
          <div className="my-2 flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 bg-rose-300" />
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
            <span className="h-[1px] w-10 bg-rose-300" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-900 font-normal leading-tight">
            {wedding.bride_name}
          </h1>
        </div>

        {/* Wedding Date Display */}
        <div className="mt-4 pt-6 border-t border-rose-100/80 w-full flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-rose-800 font-serif text-lg tracking-widest">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>{formattedDate}</span>
          </div>
          <p className="text-xs text-gray-500 tracking-wider">
            CHỦ NHẬT, NGHĨA LÀ NGÀY 16 THÁNG 11 NĂM 2025
          </p>
        </div>
      </motion.div>

      {/* Decorative Bottom Frame */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: signatureEase }}
        className="w-full max-w-md flex justify-center mt-6"
      >
        <img
          src="/template8/images/divider-bottom.png"
          alt="Decorative Frame Bottom"
          className="w-44 sm:w-52 h-auto object-contain opacity-80"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = "none";
          }}
        />
      </motion.div>
    </section>
  );
}
