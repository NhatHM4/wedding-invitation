"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { Wish } from "@/types";

interface CeramicGuestbookProps {
  weddingId: string;
  wishes?: Wish[];
}

const TILE_SHAPES = [
  { id: "ivory", label: "Mảnh sứ sáng", bg: "bg-[#FAF7F0]", border: "border-[#B99245]" },
  { id: "clay", label: "Mảnh đất nung", bg: "bg-[#E0C9B3]", border: "border-[#C9A98D]" },
  { id: "burgundy", label: "Mảnh men đỏ", bg: "bg-[#6A3034]", border: "border-[#B99245]", textColor: "text-[#FAF7F0]" },
  { id: "sage", label: "Mảnh men ngọc", bg: "bg-[#76806B]", border: "border-[#FAF7F0]", textColor: "text-[#FAF7F0]" },
];

export default function CeramicGuestbook({
  weddingId,
  wishes = [],
}: CeramicGuestbookProps) {
  const [wishList, setWishList] = useState<Wish[]>(wishes);
  const [guestName, setGuestName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedShape, setSelectedShape] = useState<string>("ivory");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !content.trim()) {
      setErrorMessage("Vui lòng nhập tên và lời chúc của bạn.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

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

      if (!res.ok) {
        throw new Error("Không thể gửi lời chúc. Vui lòng thử lại!");
      }

      const json = await res.json();
      const newWish: Wish = json.data || {
        id: Date.now(),
        wedding_id: weddingId,
        guest_name: guestName.trim(),
        content: content.trim(),
        created_at: new Date().toISOString(),
      };

      setWishList([newWish, ...wishList]);
      setGuestName("");
      setContent("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi xảy ra khi gửi lời chúc.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="relative py-20 px-4 bg-[#FAF7F0] border-t border-[#C9A98D]/30">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B99245]">
          SỔ LƯU BÚT • CERAMIC ETCHINGS
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#252320] font-bold">
          Khắc Lời Chúc Lên Gốm
        </h2>
        <p className="text-xs sm:text-sm font-serif text-[#252320]/75">
          Gửi gắm những tình cảm chân thành nhất dành tặng cho hai bạn
        </p>
        <div className="w-12 h-0.5 bg-[#B99245] mx-auto rounded-full mt-2" />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Form Column (5 cols) */}
        <div className="md:col-span-5 bg-[#F3ECDD] rounded-3xl p-6 sm:p-8 border border-[#C9A98D] shadow-lg space-y-4">
          <h3 className="text-lg font-serif text-[#252320] font-bold flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#B99245]" />
            <span>Gửi Lời Chúc Mới</span>
          </h3>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmitWish} className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-[#252320] font-medium mb-1">
                Tên của bạn <span className="text-[#6A3034]">*</span>
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Nhập tên của bạn"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#C9A98D] text-sm text-[#252320] focus:outline-none focus:border-[#B99245] min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-serif text-[#252320] font-medium mb-1">
                Lời chúc gửi dâu rể <span className="text-[#6A3034]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Chúc hai bạn trăm năm hạnh phúc..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#C9A98D] text-sm text-[#252320] focus:outline-none focus:border-[#B99245]"
              />
            </div>

            {/* Ceramic Tile Shape Selector */}
            <div>
              <label className="block text-xs font-serif text-[#252320] font-medium mb-2">
                Chọn kiểu mảnh gốm khắc chữ
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TILE_SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    type="button"
                    onClick={() => setSelectedShape(shape.id)}
                    className={`p-2 rounded-xl text-xs font-serif border transition-all flex items-center gap-2 ${
                      shape.bg
                    } ${shape.border} ${shape.textColor || "text-[#252320]"} ${
                      selectedShape === shape.id ? "ring-2 ring-[#B99245] shadow-sm" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-current shrink-0" />
                    <span className="truncate">{shape.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-[#6A3034] text-[#FAF7F0] font-serif text-xs font-medium border border-[#B99245] flex items-center justify-center gap-2 hover:bg-[#803D42] disabled:opacity-50 min-h-[44px] shadow-md transition-all"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 text-[#FAF7F0] animate-spin" />
                  <span>Đang khắc lên gốm...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#B99245]" />
                  <span>Gửi lời chúc ngay</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Wishes List Column (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-lg font-serif text-[#252320] font-bold flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#B99245]" />
            <span>Những Mảnh Lời Chúc ({wishList.length})</span>
          </h3>

          {wishList.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[#F3ECDD] border border-[#C9A98D]/40 text-center text-xs font-serif text-[#76806B] space-y-2">
              <MessageSquare className="w-8 h-8 text-[#C9A98D] mx-auto opacity-60" />
              <p>Chưa có lời chúc nào. Hãy là người đầu tiên khắc lời chúc lên gốm nhé!</p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {wishList.map((w, idx) => {
                const shape = TILE_SHAPES[idx % TILE_SHAPES.length];

                return (
                  <div
                    key={w.id || idx}
                    className={`p-4 sm:p-5 rounded-2xl border shadow-sm relative group transition-transform duration-300 hover:-translate-y-0.5 ${
                      shape.bg
                    } ${shape.border} ${shape.textColor || "text-[#252320]"}`}
                  >
                    {/* Gold Seam Edge Line */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-[#B99245]/60 rounded-full" />

                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-serif font-bold text-sm tracking-wide">
                        {w.guest_name}
                      </h4>
                      <span className="text-[10px] font-mono opacity-70">
                        {w.created_at ? new Date(w.created_at).toLocaleDateString("vi-VN") : "Vừa xong"}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-serif leading-relaxed italic opacity-95">
                      "{w.content}"
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
