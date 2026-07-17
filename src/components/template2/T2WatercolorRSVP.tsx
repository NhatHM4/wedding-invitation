"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wish } from "@/types";
import { popUpSynth } from "./T2PopUpSynth";

interface T2WatercolorRSVPProps {
  weddingId: string;
  initialWishes: Wish[];
}

export default function T2WatercolorRSVP({ weddingId, initialWishes }: T2WatercolorRSVPProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null) {
      setMessage("Vui lòng xác nhận sự hiện diện của bạn!");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wedding_id: weddingId,
          guest_name: name,
          is_attending: attending,
          guest_count: attending ? guestCount : 0,
          content: content,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      const result = await response.json();
      if (result.success && result.data) {
        setWishes((prev) => [result.data, ...prev]);
      }

      setName("");
      setAttending(null);
      setGuestCount(1);
      setContent("");
      
      popUpSynth.playBookOpenChime();
      setMessage("Cảm ơn bạn! Thông tin đã được ghi nhận vào sổ hỷ.");
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.error(err);
      setMessage("Lỗi đường truyền. Vui lòng gửi lại lời chúc!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-6 px-6 font-serif-lux text-gray-700">
      
      {/* 1. Paper RSVP Card Frame */}
      <div 
        className="w-full bg-[#fcfcf9] border border-gray-200/60 p-6 relative rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        {/* Soft Watercolor floral accents in corners */}
        <div className="absolute top-0 left-0 w-12 h-12 bg-[#fde2e4]/20 rounded-br-full blur-md" />
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#e8f1f2]/20 rounded-tl-full blur-md" />

        <div className="text-center mb-6">
          <span className="text-[8px] tracking-[0.25em] text-[#f08080] font-bold block mb-1 uppercase font-cyber">
            * RSVP *
          </span>
          <h3 className="text-md font-bold text-gray-800 uppercase tracking-wide">Xác Nhận Tham Dự</h3>
          <div className="h-[1px] w-12 bg-[#f08080]/30 mx-auto mt-2" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          
          {/* Guest Name */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[9px] uppercase text-[#f08080] font-bold tracking-wider font-cyber">
              Họ và tên của bạn
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên khách mời..."
              className="w-full bg-[#fdfdfc] border border-gray-200/80 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:border-[#f08080] outline-none font-sans transition"
            />
          </div>

          {/* Attending selection */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[9px] uppercase text-[#f08080] font-bold tracking-wider font-cyber">
              Bạn sẽ tham dự chứ?
            </label>
            <div className="grid grid-cols-2 gap-3 font-sans">
              <button
                type="button"
                onClick={() => { popUpSynth.playPageFlip(); setAttending(true); }}
                className={`py-2.5 rounded-lg border text-[10px] font-semibold transition-all duration-200 ${
                  attending === true
                    ? "bg-[#fde2e4] border-[#f08080] text-gray-800 shadow-sm"
                    : "bg-[#fdfdfc] border-gray-200/80 text-gray-500 hover:bg-[#f6f5ee]/40"
                }`}
              >
                Sẽ tham dự
              </button>
              <button
                type="button"
                onClick={() => { popUpSynth.playPageFlip(); setAttending(false); }}
                className={`py-2.5 rounded-lg border text-[10px] font-semibold transition-all duration-200 ${
                  attending === false
                    ? "bg-gray-100 border-gray-300 text-gray-800"
                    : "bg-[#fdfdfc] border-gray-200/80 text-gray-500 hover:bg-[#f6f5ee]/40"
                }`}
              >
                Rất tiếc vắng mặt
              </button>
            </div>
          </div>

          {/* Party size count (if attending) */}
          {attending === true && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col gap-1.5 overflow-hidden text-left"
            >
              <label className="text-[9px] uppercase text-[#f08080] font-bold tracking-wider font-cyber">
                Số lượng khách đi cùng
              </label>
              <div className="flex items-center gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                  className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
                >
                  -
                </button>
                <span className="text-gray-800 font-bold text-xs min-w-4 text-center">{guestCount}</span>
                <button
                  type="button"
                  onClick={() => setGuestCount((c) => c + 1)}
                  className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
                >
                  +
                </button>
              </div>
            </motion.div>
          )}

          {/* Wish content text area */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[9px] uppercase text-[#f08080] font-bold tracking-wider font-cyber">
              Lời chúc tốt đẹp nhất
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Gửi những lời chúc yêu thương của bạn tới cô dâu & chú rể..."
              className="w-full bg-[#fdfdfc] border border-gray-200/80 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:border-[#f08080] outline-none transition resize-none font-sans"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#f08080] to-[#f4978e] hover:from-[#e56b6f] hover:to-[#ea526f] text-white font-bold uppercase tracking-wider rounded-lg py-3 shadow-[0_4px_12px_rgba(240,128,128,0.2)] transition disabled:opacity-50 font-cyber"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}
          </button>

          {/* Status feedback message */}
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[10px] font-bold text-emerald-600 mt-1"
            >
              {message}
            </motion.p>
          )}
        </form>
      </div>

      {/* 2. Scrolling wishes log */}
      <div className="w-full mt-10">
        <h4 className="text-center text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 font-cyber">
          * Lời chúc từ người thân & bạn bè *
        </h4>
        
        <div className="max-h-[300px] overflow-y-auto pr-1 flex flex-col gap-3 custom-scroll scroll-smooth">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-[#fdfdfc]/80 border border-gray-200/40 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm text-left"
              >
                <div className="flex items-center justify-between text-[9px] border-b border-gray-100 pb-1.5 font-cyber">
                  <span className="font-bold text-gray-800">
                    {wish.guest_name}
                  </span>
                  <span className="text-gray-400 text-[8px] font-sans">
                    {new Date(wish.created_at).toLocaleDateString("vi-VN", {
                      day: "numeric",
                      month: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic font-serif-lux">
                  &ldquo;{wish.content}&rdquo;
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
