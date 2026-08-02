"use client";

import React, { useState } from "react";
import { Wish } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Stamp, Send, Heart, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface PolaroidGuestbookProps {
  weddingId: string;
  wishes?: Wish[];
}

const RUBBER_STAMPS = [
  { id: "st-1", title: "LOVE & JOY", color: "border-[#A53A32] text-[#A53A32] bg-[#A53A32]/10" },
  { id: "st-2", title: "HAPPY WEDDING", color: "border-[#D69C52] text-[#D69C52] bg-[#D69C52]/10" },
  { id: "st-3", title: "FOREVER TOGETHER", color: "border-[#59685A] text-[#59685A] bg-[#59685A]/10" },
  { id: "st-4", title: "BEST WISHES", color: "border-[#24211F] text-[#24211F] bg-[#24211F]/10" },
];

export default function PolaroidGuestbook({
  weddingId,
  wishes = [],
}: PolaroidGuestbookProps) {
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes);
  const [guestName, setGuestName] = useState("");
  const [content, setContent] = useState("");
  const [selectedStamp, setSelectedStamp] = useState(RUBBER_STAMPS[0]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [justSubmittedWish, setJustSubmittedWish] = useState<Wish | null>(null);

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !content.trim()) {
      setErrorMessage("Vui lòng nhập tên và lời chúc của bạn");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wedding_id: weddingId,
          guest_name: guestName.trim(),
          content: content.trim(),
        }),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Không thể gửi lời chúc.");
      }

      const newWish: Wish = resData.data || {
        id: Date.now(),
        wedding_id: weddingId,
        guest_name: guestName.trim(),
        content: content.trim(),
        created_at: new Date().toISOString(),
      };

      setJustSubmittedWish(newWish);
      setLocalWishes([newWish, ...localWishes]);
      setIsFlipped(true);
      setGuestName("");
      setContent("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Có lỗi xảy ra khi gửi lời chúc.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsFlipped(false);
    setJustSubmittedWish(null);
  };

  return (
    <section id="guestbook" className="relative py-14 px-4 bg-[#F1E6D2] text-[#24211F] border-b border-[#3A2924]">
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A53A32]/10 border border-[#A53A32]/30 rounded-full text-[10px] font-mono tracking-widest text-[#A53A32] uppercase">
            <Stamp className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>POLAROID BACKSTAGE GUESTBOOK</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#24211F]">
            Gửi Lời Chúc Mặt Sau Ảnh
          </h2>
          <p className="text-xs text-[#24211F]/70 max-w-sm mx-auto italic font-serif">
            Viết lời chúc lên mặt sau của tấm Polaroid và đóng con dấu kỷ niệm dành tặng hai bạn.
          </p>
        </div>

        {/* Polaroid Flip Input Card */}
        <div className="max-w-md mx-auto perspective-1000">
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full bg-[#121212] text-[#F1E6D2] p-6 rounded-2xl shadow-2xl border-2 border-[#3A2924] relative preserve-3d"
          >
            {/* FRONT SIDE: INPUT FORM */}
            {!isFlipped ? (
              <form onSubmit={handleSubmitWish} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#3A2924] pb-3 font-mono text-[11px] text-[#D69C52]">
                  <span>WRITE ON POLAROID BACK</span>
                  <Stamp className="w-4 h-4 text-[#A53A32]" />
                </div>

                {errorMessage && (
                  <div className="p-2.5 bg-[#A53A32]/20 border border-[#A53A32] rounded-lg text-xs font-mono text-[#F1E6D2] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#A53A32] shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="guestbook-name" className="text-xs font-mono text-[#D69C52] uppercase block">Tên của bạn (*)</label>
                  <input
                    id="guestbook-name"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ví dụ: Hoàng Nam"
                    className="w-full p-3 bg-[#181615] border border-[#3A2924] rounded-xl text-xs font-serif text-[#F1E6D2] placeholder-[#F1E6D2]/30 focus:outline-none focus:border-[#D69C52]"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="guestbook-content" className="text-xs font-mono text-[#D69C52] uppercase block">Lời chúc mừng (*)</label>
                  <textarea
                    id="guestbook-content"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Chúc hai bạn trăm năm hạnh phúc, mãi mãi đồng hành bên nhau..."
                    className="w-full p-3 bg-[#181615] border border-[#3A2924] rounded-xl text-xs font-serif text-[#F1E6D2] placeholder-[#F1E6D2]/30 focus:outline-none focus:border-[#D69C52]"
                    required
                  />
                </div>

                {/* Stamp Picker */}
                <div className="space-y-1.5">
                  <label htmlFor="guestbook-stamp-picker" className="text-xs font-mono text-[#D69C52] uppercase block">Chọn con dấu mực</label>
                  <div id="guestbook-stamp-picker" className="grid grid-cols-2 gap-2">
                    {RUBBER_STAMPS.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setSelectedStamp(st)}
                        className={`p-2 rounded-lg text-[10px] font-mono font-bold border transition-all ${st.color} ${
                          selectedStamp.id === st.id ? "ring-2 ring-[#D69C52] scale-[1.02]" : "opacity-70"
                        }`}
                      >
                        {st.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#A53A32] hover:bg-[#A53A32]/90 disabled:opacity-50 text-[#F1E6D2] font-mono text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all mt-2"
                >
                  <Send className="w-4 h-4 text-[#D69C52]" />
                  <span>{isSubmitting ? "ĐANG ÉP CON DẤU..." : "GỬI LỜI CHÚC (IN DẤU MỰC)"}</span>
                </button>
              </form>
            ) : (
              /* BACK SIDE: REVEALED FLIPPED POLAROID WISH */
              <div className="space-y-4 text-center py-4 text-[#F1E6D2]">
                <div className="flex items-center justify-between border-b border-[#3A2924] pb-2 font-mono text-[10px] text-[#D69C52]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ĐÃ GỬI LỜI CHÚC
                  </span>
                  <span>POLAROID BACK</span>
                </div>

                {/* Handwritten Style Display Card */}
                <div className="bg-[#F1E6D2] text-[#24211F] p-5 rounded-xl space-y-3 relative overflow-hidden border-2 border-[#24211F] text-left">
                  {/* Selected Rubber Stamp Visual Overlay */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded border-2 font-mono text-[9px] font-bold uppercase rotate-12 ${selectedStamp.color}`}>
                    {selectedStamp.title}
                  </div>

                  <p className="font-mono text-[10px] text-[#A53A32] font-bold uppercase">
                    FROM: {justSubmittedWish?.guest_name}
                  </p>

                  <p className="font-serif text-sm italic text-[#24211F] leading-relaxed pt-1">
                    “{justSubmittedWish?.content}”
                  </p>

                  <p className="font-mono text-[9px] text-[#24211F]/50 text-right">
                    {new Date().toLocaleDateString("vi-VN")}
                  </p>
                </div>

                <button
                  onClick={handleResetForm}
                  type="button"
                  className="px-4 py-2 bg-[#24211F] hover:bg-[#3A2924] text-[#F1E6D2] font-mono text-xs rounded-xl inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#D69C52]" /> Viết thêm lời chúc khác
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Existing Wishes Wall */}
        <div className="space-y-4 pt-6 border-t border-[#3A2924]">
          <h3 className="font-serif text-xl font-bold text-center text-[#24211F]">
            Các Lời Chúc Đã Đóng Dấu ({localWishes.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {localWishes.map((w, idx) => (
              <div
                key={w.id || idx}
                className="bg-[#121212] text-[#F1E6D2] p-4 rounded-xl border border-[#3A2924] shadow-md space-y-2 relative overflow-hidden"
              >
                <div className="flex justify-between items-center font-mono text-[10px] text-[#D69C52]">
                  <span className="font-bold uppercase text-[#A53A32]">{w.guest_name}</span>
                  <span className="text-[#F1E6D2]/50">
                    {w.created_at ? new Date(w.created_at).toLocaleDateString("vi-VN") : "Vừa xong"}
                  </span>
                </div>
                <p className="font-serif text-xs italic text-[#F1E6D2]/90 leading-relaxed">
                  “{w.content}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
