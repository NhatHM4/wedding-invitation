"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      {/* Floating Bottom Toolbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] w-full max-w-[390px] px-3">
        <div className="bg-white/95 backdrop-blur border border-[#e8ddd4] rounded-full px-3 py-2 flex items-center justify-between shadow-[0_4px_20px_rgba(90,18,18,0.15)] gap-2">
          {/* Wish Input Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalOpen(true)}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-left font-barlow text-[11.5px] text-gray-500 hover:bg-gray-200/75 transition-all focus-visible:outline-2 focus-visible:outline-[#5a1212] focus-visible:outline-offset-1 cursor-pointer"
          >
            Gửi lời chúc...
          </motion.button>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Heart Like Trigger */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={onLikeTriggered}
              className="w-8.5 h-8.5 rounded-full bg-[#fcf5f5] hover:bg-[#fae3e3] border border-[#fae3e3] flex items-center justify-center text-[#5a1212] transition-colors focus-visible:outline-2 focus-visible:outline-[#5a1212] focus-visible:outline-offset-1 cursor-pointer"
              title="Bắn tim"
            >
              💕
            </motion.button>

            {/* Gift Box shortcut */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={onGiftTriggered}
              className="w-8.5 h-8.5 rounded-full bg-[#fcf5f5] hover:bg-[#fae3e3] border border-[#fae3e3] flex items-center justify-center text-[#5a1212] transition-colors focus-visible:outline-2 focus-visible:outline-[#5a1212] focus-visible:outline-offset-1 cursor-pointer"
              title="Hộp quà"
            >
              🎁
            </motion.button>

            {/* Likes count indicator overlay */}
            <div className="bg-[#5a1212] text-white font-barlow text-[9px] font-bold px-2 py-0.5 rounded-full min-w-[28px] text-center select-none shadow-sm">
              {likesCount}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-up wishes form modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-xs"
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalOpen(false);
            }}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-[420px] bg-white rounded-t-2xl px-6 pt-5 pb-8 flex flex-col gap-4 shadow-2xl border-t border-[#e8ddd4]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-barlow text-[12.5px] font-bold text-gray-800 uppercase tracking-wider">
                  Gửi lời chúc của bạn
                </span>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5a1212] focus-visible:outline-offset-1"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div>
                  <input
                    type="text"
                    placeholder="Tên của bạn..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#fcfaf7] border border-[#d8ccc2] rounded-md px-3.5 py-2.5 font-barlow text-[12px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5a1212] transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Viết lời chúc của bạn..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={3}
                    className="w-full bg-[#fcfaf7] border border-[#d8ccc2] rounded-md px-3.5 py-2.5 font-barlow text-[12px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5a1212] transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#5a1212] text-white font-barlow text-[11.5px] font-bold tracking-[2px] uppercase rounded-md shadow hover:bg-[#4c0d0d] transition-colors disabled:opacity-60 cursor-pointer"
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
