"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Wish } from "@/types";

interface T1RSVPSectionProps {
  weddingId: string;
  initialWishes: Wish[];
}

export default function T1RSVPSection({ weddingId, initialWishes }: T1RSVPSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch real-time wishes from Supabase on mount
  useEffect(() => {
    async function loadWishes() {
      if (!weddingId || weddingId.includes("preview")) return;
      try {
        const { data, error } = await supabase
          .from("wishes")
          .select("*")
          .eq("wedding_id", weddingId)
          .order("created_at", { ascending: false });

        if (!error && data) {
          setWishes(data);
        }
      } catch (err) {
        console.error("Error loading wishes from Supabase:", err);
      }
    }
    loadWishes();
  }, [weddingId]);

  // Load from localStorage for previews if any exists
  useEffect(() => {
    const cached = localStorage.getItem(`wishes_${weddingId}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Wish[];
        setWishes((prev) => {
          // Merge lists and prevent duplicates
          const combined = [...parsed, ...prev];
          const unique = combined.filter((w, index) => combined.findIndex((x) => x.id === w.id) === index);
          return unique.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [weddingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attending === null) {
      setMessage("Vui lòng điền đầy đủ tên và xác nhận tham dự!");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const newWishItem = {
      wedding_id: weddingId,
      guest_name: name.trim(),
      content: content.trim() || "Chúc hai bạn trăm năm hạnh phúc!",
      created_at: new Date().toISOString(),
    };

    try {
      let insertedWish: Wish | null = null;

      // Only attempt to write to Supabase if it's not a mock preview ID
      if (weddingId && !weddingId.includes("preview")) {
        const { data, error } = await supabase
          .from("wishes")
          .insert([newWishItem])
          .select()
          .single();

        if (!error && data) {
          insertedWish = data;
        }
      }

      // If Supabase failed or skipped, create a local fallback record
      if (!insertedWish) {
        insertedWish = {
          id: Date.now(),
          ...newWishItem,
        };
        // Persist local storage wishes for demo
        const localWishes = JSON.parse(localStorage.getItem(`wishes_${weddingId}`) || "[]");
        localStorage.setItem(`wishes_${weddingId}`, JSON.stringify([insertedWish, ...localWishes]));
      }

      // Prepend the new wish
      setWishes((prev) => [insertedWish!, ...prev]);

      // Reset form
      setName("");
      setAttending(null);
      setGuestCount(1);
      setContent("");
      setMessage("Gửi xác nhận thành công! Trân trọng cảm ơn bạn.");

      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.error(err);
      setMessage("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-12 px-6 bg-transparent relative">
      {/* RSVP Box */}
      <div className="w-full bg-white/80 border border-rose-100/50 rounded-3xl p-6 shadow-[0_10px_45px_rgba(244,63,94,0.05)] relative overflow-hidden">
        
        {/* Glow corner decorations */}
        <div className="absolute top-[-50px] right-[-50px] w-24 h-24 bg-rose-400/10 blur-2xl rounded-full pointer-events-none" />
        
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">RSVP</span>
          <h3 className="text-xl font-bold text-[#5c3c43] font-serif-lux mt-1">Xác Nhận Tham Dự</h3>
          <p className="text-[11px] text-[#6e4e55] leading-normal mt-2">
            Sự hiện diện của bạn là niềm vinh hạnh lớn cho gia đình chúng tôi!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Guest Name input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6e4e55]">Tên của bạn *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên..."
              className="w-full bg-rose-50/50 border border-rose-100/80 rounded-xl px-4 py-2.5 text-sm text-[#5c3c43] placeholder-rose-300/60 outline-none focus:border-rose-400/60 transition"
            />
          </div>

          {/* Attendance confirmation options */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#6e4e55]">Bạn sẽ tham dự chứ? *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`py-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  attending === true
                    ? "bg-rose-500 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                    : "bg-rose-50/20 border border-rose-100 text-[#6e4e55] hover:bg-rose-50/40"
                }`}
              >
                <span>👍 ĐỒNG Ý</span>
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`py-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  attending === false
                    ? "bg-rose-900/40 border border-rose-300 text-white"
                    : "bg-rose-50/20 border border-rose-100 text-[#6e4e55] hover:bg-rose-50/40"
                }`}
              >
                <span>😔 TIẾC QUÁ</span>
              </button>
            </div>
          </div>

          {/* Guest count */}
          {attending === true && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col gap-1.5 overflow-hidden"
            >
              <label className="text-xs font-semibold text-[#6e4e55]">Số lượng người tham dự</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                  className="w-10 h-10 bg-rose-50/50 border border-rose-100/60 rounded-xl flex items-center justify-center text-[#5c3c43] hover:bg-rose-100/20 font-bold"
                >
                  -
                </button>
                <span className="text-[#5c3c43] font-bold text-sm min-w-4 text-center">{guestCount}</span>
                <button
                  type="button"
                  onClick={() => setGuestCount((c) => c + 1)}
                  className="w-10 h-10 bg-rose-50/50 border border-rose-100/60 rounded-xl flex items-center justify-center text-[#5c3c43] hover:bg-rose-100/20 font-bold"
                >
                  +
                </button>
              </div>
            </motion.div>
          )}

          {/* Wish content text area */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6e4e55]">Lời chúc gửi cô dâu & chú rể</label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập lời chúc đong đầy yêu thương tại đây..."
              className="w-full bg-rose-50/50 border border-rose-100/80 rounded-xl px-4 py-2.5 text-sm text-[#5c3c43] placeholder-rose-300/60 outline-none focus:border-rose-400/60 transition resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang gửi..." : "GỬI XÁC NHẬN"}
          </button>

          {/* Status feedback message */}
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center text-xs font-semibold mt-2 ${
                message.includes("thành công") ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {message}
            </motion.p>
          )}
        </form>
      </div>

      {/* Guest Book / Wishes wall */}
      <div className="w-full mt-12">
        <h4 className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-rose-400 mb-6">
          Sổ Lưu Bút Lời Chúc
        </h4>
        
        {/* Overflow scroll container for cards */}
        <div className="max-h-[350px] overflow-y-auto pr-1 flex flex-col gap-4 custom-scroll scroll-smooth">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-white/80 border border-rose-100/60 rounded-2xl p-4 flex flex-col gap-2 relative shadow-sm text-[#5c3c43]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-500">{wish.guest_name}</span>
                  <span className="text-[9px] text-rose-400/60 font-sans">
                    {new Date(wish.created_at).toLocaleDateString("vi-VN", {
                      day: "numeric",
                      month: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-[#5c3c43]/90 leading-relaxed font-medium italic">
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
