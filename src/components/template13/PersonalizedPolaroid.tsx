"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Ticket, Copy, Check, MapPin, Calendar, Share2, Sparkles, Heart } from "lucide-react";

interface PersonalizedPolaroidProps {
  guestName: string;
  groomName: string;
  brideName: string;
  eventDate?: string | null;
  eventTime?: string;
  venueAddress?: string;
  ticketCode: string;
  attending: boolean;
  mapUrl?: string;
}

export default function PersonalizedPolaroid({
  guestName,
  groomName,
  brideName,
  eventDate = "10/10/2026",
  eventTime = "11:00 AM",
  venueAddress = "Trung tâm Tiệc cưới Grand Ballroom, 123 Đường Láng, Hà Nội",
  ticketCode,
  attending,
  mapUrl = "https://maps.google.com",
}: PersonalizedPolaroidProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ticketCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!attending) {
    return (
      <div className="w-full max-w-md mx-auto my-8 p-6 bg-[#181615] border-2 border-[#3A2924] rounded-2xl text-center space-y-4 shadow-2xl text-[#F1E6D2]">
        <div className="w-12 h-12 bg-[#A53A32]/20 border border-[#A53A32] rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-6 h-6 text-[#A53A32]" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#F1E6D2]">
          Cảm Ơn Lời Chúc Của {guestName}!
        </h3>
        <p className="font-serif text-xs text-[#F1E6D2]/80 leading-relaxed italic">
          “Dù không thể trực tiếp hiện diện trong khung hình ngày hỷ, tình cảm và những lời chúc ngọt ngào của bạn luôn là món quà quý giá dành cho hai chúng mình.”
        </p>
        <p className="font-mono text-[10px] text-[#D69C52] tracking-widest uppercase">
          {groomName} ❤️ {brideName}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm mx-auto my-8 space-y-4"
    >
      {/* Polaroid Physical Card Frame */}
      <div className="bg-[#F1E6D2] p-4 sm:p-5 rounded-2xl shadow-2xl border-4 border-[#24211F] text-[#24211F] space-y-4 relative overflow-hidden">
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-[#24211F]/20 pb-2 font-mono text-[10px] text-[#A53A32]">
          <span className="font-bold uppercase tracking-widest flex items-center gap-1">
            <Ticket className="w-3.5 h-3.5" /> VIP PASS • POLAROID TICKET
          </span>
          <span className="bg-[#A53A32] text-[#F1E6D2] px-1.5 py-0.5 rounded font-bold">
            #{ticketCode}
          </span>
        </div>

        {/* Photo Container */}
        <div className="relative aspect-[4/3] w-full bg-[#121212] rounded-lg overflow-hidden border-2 border-[#24211F] shadow-inner">
          <Image
            src="/thiepmaudovang/images/cover.jpg"
            alt="Vé Polaroid tham dự"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <span className="font-mono text-[10px] text-[#F1E6D2] bg-[#121212]/80 px-2 py-0.5 rounded border border-[#D69C52]">
              PASSENGER: {guestName.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Details & QR Code */}
        <div className="flex items-start justify-between gap-3 pt-2">
          <div className="space-y-1 font-serif text-xs">
            <span className="font-mono text-[9px] text-[#A53A32] uppercase font-bold tracking-wider block">
              CHỦ TIỆC: {groomName.toUpperCase()} & {brideName.toUpperCase()}
            </span>
            <p className="font-bold text-sm text-[#24211F]">
              📅 {eventDate} • {eventTime}
            </p>
            <p className="text-[11px] text-[#24211F]/80 line-clamp-2 leading-tight">
              📍 {venueAddress}
            </p>
          </div>

          {/* Micro QR Code SVG Representation */}
          <div className="w-16 h-16 bg-[#121212] p-1.5 rounded border border-[#24211F] shrink-0 flex flex-col items-center justify-center text-center">
            <div className="w-full h-full bg-[#F1E6D2] p-1 grid grid-cols-4 gap-0.5">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-full ${i % 2 === 0 ? "bg-[#121212]" : "bg-[#A53A32]"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Handwritten Bottom Quote */}
        <div className="pt-3 border-t border-[#24211F]/20 text-center">
          <p className="font-serif text-xs italic text-[#A53A32] font-semibold">
            “Hẹn gặp bạn trong khung hình đẹp nhất của ngày chung đôi.”
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
        <button
          onClick={handleCopyCode}
          type="button"
          className="py-2.5 px-3 bg-[#24211F] hover:bg-[#3A2924] text-[#F1E6D2] rounded-xl border border-[#3A2924] transition-colors flex items-center justify-center gap-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#D69C52]" />}
          <span>{copied ? "Đã chép mã" : "Sao chép mã vé"}</span>
        </button>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 bg-[#A53A32] hover:bg-[#A53A32]/90 text-[#F1E6D2] rounded-xl font-semibold shadow transition-colors flex items-center justify-center gap-1.5"
        >
          <MapPin className="w-4 h-4 text-[#D69C52]" />
          <span>Mở Google Maps</span>
        </a>
      </div>
    </motion.div>
  );
}
