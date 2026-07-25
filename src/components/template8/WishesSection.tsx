"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Heart, User } from "lucide-react";
import { Wish } from "@/types";

interface WishesSectionProps {
  wishes: Wish[];
  weddingId: string;
}

export default function WishesSection({ wishes: initialWishes, weddingId }: WishesSectionProps) {
  const [wishesList, setWishesList] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWishesList(initialWishes || []);
    setMounted(true);
  }, [initialWishes]);

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);

    const newWish: Wish = {
      id: Date.now(),
      wedding_id: weddingId,
      guest_name: name.trim(),
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    setTimeout(() => {
      setWishesList((prev) => [newWish, ...prev]);
      setName("");
      setContent("");
      setIsSubmitting(false);
    }, 400);
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
            <MessageSquare className="w-4 h-4 text-rose-400" />
            <span>GUESTBOOK • WISHES</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mt-2">
            SỔ LƯU BÚT & LỜI CHÚC
          </h2>
          <p className="text-sm text-gray-600 mt-3 max-w-md mx-auto">
            Hãy gửi những lời chúc tốt đẹp nhất tới Thanh Huy & Phương Thúy nhé!
          </p>
          <div className="w-16 h-[2px] bg-rose-300 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wish Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: signatureEase }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-100 shadow-xl shadow-rose-100/50"
          >
            <h3 className="font-serif text-xl text-rose-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Gửi lời chúc mừng</span>
            </h3>

            <form onSubmit={handleSendWish} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Tên của bạn <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-rose-50/50 border border-rose-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Lời chúc <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Viết lời chúc ý nghĩa..."
                  className="w-full p-3 rounded-2xl bg-rose-50/50 border border-rose-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}</span>
              </button>
            </form>
          </motion.div>

          {/* Wishes List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: signatureEase }}
            className="lg:col-span-7 space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {!mounted || wishesList.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white/60 border border-rose-100 text-center text-gray-500 text-sm">
                Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
              </div>
            ) : (
              wishesList.map((wish) => (
                <div
                  key={wish.id}
                  className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 shadow-md shadow-rose-100/30 flex flex-col gap-1.5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-rose-900 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      {wish.guest_name}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {mounted && wish.created_at ? new Date(wish.created_at).toLocaleDateString("vi-VN") : ""}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed pl-5">
                    {wish.content}
                  </p>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
