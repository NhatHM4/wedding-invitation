"use client";

import React, { useState } from "react";
import { Wish } from "@/types";
import { Heart, Stamp } from "lucide-react";

interface GuestStampWallProps {
  weddingId: string;
  wishes?: Wish[];
  isMusicPlaying?: boolean;
}

const STAMP_STYLES = [
  { id: "s1", bg: "bg-[#762F3A]", text: "text-[#F4EBDD]", border: "border-[#B89B62]", name: "Burgundy" },
  { id: "s2", bg: "bg-[#172235]", text: "text-[#F4EBDD]", border: "border-[#B89B62]", name: "Navy" },
  { id: "s3", bg: "bg-[#A9473F]", text: "text-[#F4EBDD]", border: "border-[#F4EBDD]", name: "Stamp Red" },
  { id: "s4", bg: "bg-[#B89B62]", text: "text-[#172235]", border: "border-[#172235]", name: "Muted Gold" },
];

export default function GuestStampWall({
  weddingId,
  wishes = [],
}: GuestStampWallProps) {
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes);
  const [guestName, setGuestName] = useState("");
  const [content, setContent] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(STAMP_STYLES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [justStampedId, setJustStampedId] = useState<number | null>(null);

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !content.trim()) {
      setErrorMessage("Vui lòng điền đầy đủ tên và lời chúc của bạn");
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

      setLocalWishes([newWish, ...localWishes]);
      setJustStampedId(newWish.id);
      setGuestName("");
      setContent("");

      setTimeout(() => setJustStampedId(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Có lỗi xảy ra khi gửi lời chúc.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="relative py-12 px-3 bg-[#172235] text-[#F4EBDD] overflow-hidden">
      {/* Background Micro Lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B89B62_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-full mx-auto space-y-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B89B62]/20 border border-[#B89B62]/40 rounded-full text-[9px] font-mono tracking-widest text-[#B89B62] uppercase font-bold">
            <Stamp className="w-3.5 h-3.5 text-[#B89B62]" />
            <span>PASSPORT STAMP WALL</span>
          </div>
          <h2 className="font-serif text-2xl text-[#F4EBDD] font-bold">
            Tường Con Dấu Lời Chúc
          </h2>
          <p className="text-[11px] text-[#F4EBDD]/75 max-w-xs mx-auto italic">
            Gửi lời chúc mừng và đóng con dấu hộ chiếu lưu lại kỷ niệm cho dâu rể.
          </p>
        </div>

        {/* Input Form Box */}
        <div className="bg-[#FFFBF5] text-[#272521] border-2 border-[#B89B62] rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
          <form onSubmit={handleSubmitWish} className="space-y-3">
            {errorMessage && (
              <div className="p-2.5 bg-[#A9473F]/10 border border-[#A9473F] text-[#A9473F] text-[11px] font-mono rounded-lg">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="wish-name" className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                TÊN CỦA BẠN *
              </label>
              <input
                id="wish-name"
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Nhập tên của bạn..."
                className="w-full px-3.5 py-2.5 bg-[#F4EBDD]/60 border border-[#B89B62] rounded-xl text-[#172235] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="wish-content" className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                NỘI DUNG LỜI CHÚC *
              </label>
              <textarea
                id="wish-content"
                rows={3}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết lời chúc ý nghĩa gửi đến cặp đôi..."
                className="w-full px-3.5 py-2.5 bg-[#F4EBDD]/60 border border-[#B89B62] rounded-xl text-[#172235] font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
              />
            </div>

            {/* Stamp Style Selector */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                CHỌN KIỂU CON DẤU PASSPORT
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {STAMP_STYLES.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStyle(st)}
                    className={`py-2 px-1 rounded-lg border text-[9px] font-mono font-bold transition-all text-center ${st.bg} ${st.text} ${
                      selectedStyle.id === st.id ? "ring-2 ring-[#762F3A] scale-105" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[44px] py-3 bg-[#762F3A] hover:bg-[#A9473F] text-[#F4EBDD] font-mono text-[11px] uppercase tracking-wider font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Stamp className="w-3.5 h-3.5 text-[#B89B62]" />
              <span>{isSubmitting ? "ĐANG ĐÓNG DẤU..." : "ĐÓNG DẤU LỜI CHÚC"}</span>
            </button>
          </form>
        </div>

        {/* Wishes Display Wall */}
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-[10px] font-mono text-[#B89B62] font-semibold">
              TỔNG CỘNG {localWishes.length} CON DẤU LỜI CHÚC ĐÃ ĐƯỢC LƯU GIỮ
            </span>
          </div>

          <div className="space-y-3">
            {localWishes.map((w) => {
              const isJustAdded = justStampedId === w.id;
              return (
                <div
                  key={w.id}
                  className={`p-4 rounded-xl border-2 shadow-md space-y-2 relative overflow-hidden transition-all duration-500 ${
                    selectedStyle.bg
                  } ${selectedStyle.text} ${selectedStyle.border} ${
                    isJustAdded ? "scale-102 ring-2 ring-[#B89B62] animate-pulse" : ""
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-current/30 pb-1.5 text-[9px] font-mono uppercase font-bold opacity-90">
                    <span className="flex items-center gap-1">
                      <Stamp className="w-3 h-3 text-[#B89B62]" />
                      <span>PASSPORT STAMP</span>
                    </span>
                    <span>
                      {w.created_at
                        ? new Date(w.created_at).toLocaleDateString("vi-VN")
                        : "Vừa xong"}
                    </span>
                  </div>

                  <p className="font-serif text-xs italic leading-relaxed">
                    &ldquo;{w.content}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-0.5 text-[11px] font-mono font-bold">
                    <span>FROM: {w.guest_name}</span>
                    <Heart className="w-3.5 h-3.5 text-[#A9473F] fill-current" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
