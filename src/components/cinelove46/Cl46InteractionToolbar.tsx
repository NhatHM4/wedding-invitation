"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift } from "lucide-react";

interface Cl46InteractionToolbarProps {
  onWishSubmitted?: (name: string, content: string) => void;
  likesCount?: number;
  onLikeTriggered?: () => void;
  onGiftTriggered?: () => void;
}

export default function Cl46InteractionToolbar({
  onWishSubmitted,
  likesCount = 117,
  onLikeTriggered,
  onGiftTriggered
}: Cl46InteractionToolbarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    if (onWishSubmitted) onWishSubmitted(name, content);
    setName("");
    setContent("");
    setModalOpen(false);
  };

  return (
    <>
      {/* Floating bottom toolbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] w-full max-w-[390px] px-3">
        <div className="bg-[#fdfcf7]/96 backdrop-blur border border-[#c5a880]/30 rounded-full px-3.5 py-2 flex items-center justify-between shadow-[0_6px_30px_rgba(92,22,30,0.12)] gap-2">

          {/* Wish input trigger */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalOpen(true)}
            className="flex-1 bg-[#faf6f0] border border-[#e8e2d8] rounded-full px-4 py-2 text-left font-serif-display text-[12px] text-[#6b645f] hover:bg-[#f0e8e0]/40 transition-all focus-visible:outline-2 focus-visible:outline-[#5c161e] focus-visible:outline-offset-1 cursor-pointer italic"
          >
            Gửi lời chúc...
          </motion.button>

          {/* Action icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Heart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={onLikeTriggered}
              className="w-9 h-9 rounded-full bg-[#faf6f0] hover:bg-[#e2d1cb]/40 border border-[#e8e2d8] flex items-center justify-center text-[#5c161e] transition-colors focus-visible:outline-2 focus-visible:outline-[#5c161e] focus-visible:outline-offset-1 cursor-pointer"
              title="Bắn tim"
              aria-label="Bắn tim"
            >
              <Heart size={14} strokeWidth={1.5} />
            </motion.button>

            {/* Gift */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={onGiftTriggered}
              className="w-9 h-9 rounded-full bg-[#faf6f0] hover:bg-[#e2d1cb]/40 border border-[#e8e2d8] flex items-center justify-center text-[#5c161e] transition-colors focus-visible:outline-2 focus-visible:outline-[#5c161e] focus-visible:outline-offset-1 cursor-pointer"
              title="Hộp quà"
              aria-label="Hộp quà"
            >
              <Gift size={14} strokeWidth={1.5} />
            </motion.button>

            {/* Likes counter */}
            <div className="bg-[#5c161e] text-[#fdfcf7] font-serif-display text-[13px] font-light px-2.5 py-0.5 rounded-full min-w-[32px] text-center select-none shadow-sm tracking-wide">
              {likesCount}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-up wish modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-[420px] bg-[#fdfcf7] rounded-t-2xl px-6 pt-5 pb-8 flex flex-col gap-4 shadow-2xl relative"
              style={{ borderTop: "1px solid rgba(197,168,128,0.35)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#c5a880]/30 rounded-full" />

              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-[#e8e2d8] mt-3">
                <div>
                  <p className="section-label mb-0.5">Lời chúc của bạn</p>
                  <span className="font-script-accent text-[24px] text-[#5c161e]" style={{ fontStyle: "normal" }}>
                    Gửi yêu thương
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-[#faf6f0] border border-[#e8e2d8] flex items-center justify-center text-[#6b645f] text-xs cursor-pointer transition-colors"
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">
                <div>
                  <label className="block font-sans-clean text-[9px] font-bold text-[#5c161e] uppercase tracking-[2.5px] mb-1.5">
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-sans-clean text-[9px] font-bold text-[#5c161e] uppercase tracking-[2.5px] mb-1.5">
                    Lời chúc
                  </label>
                  <textarea
                    placeholder="Viết lời chúc của bạn..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={3}
                    className="focus:outline-none resize-none"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 stationery-btn-primary disabled:opacity-60"
                >
                  {submitting ? "Đang gửi..." : "Gửi chúc mừng"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
