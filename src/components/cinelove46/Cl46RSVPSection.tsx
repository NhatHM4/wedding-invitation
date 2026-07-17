"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "./motion-presets";

interface Cl46RSVPSectionProps {
  weddingId?: string;
  onWishSubmitted?: () => void;
}

export default function Cl46RSVPSection({ weddingId, onWishSubmitted }: Cl46RSVPSectionProps) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [count, setCount] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSuccess(true);
    if (onWishSubmitted) onWishSubmitted();
  };

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className="w-full px-5 py-10 bg-[#fdfcf7] border-b border-[#e8e2d8] overflow-hidden relative"
    >
      {/* Decorative large "R" — depth layer */}
      <div
        className="absolute right-4 top-6 font-serif-display text-[90px] font-extralight text-[#5c161e]/06 leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        R
      </div>

      {/* Title */}
      <div className="mb-7 relative z-10">
        <p className="section-label mb-1">XÁC NHẬN THAM DỰ</p>
        <p
          className="font-script-accent text-[42px] text-[#5c161e] mt-0.5"
          style={{ fontStyle: "normal" }}
        >
          RSVP
        </p>
        <div className="contour-line mt-2" />
      </div>

      {/* Form surface */}
      <div className="w-full relative min-h-[220px] z-10">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col justify-center items-center py-10 text-center"
            >
              {/* Botanical check mark ornament */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 250, damping: 16 }}
                className="mb-4"
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#c5a880" strokeWidth="1" opacity="0.5" />
                  <path d="M14 24 L21 31 L34 17" stroke="#5c161e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <p className="font-script-accent text-[30px] text-[#5c161e]">
                Cảm ơn bạn rất nhiều!
              </p>
              <p className="font-sans-clean text-[11px] text-[#6b645f] mt-2 max-w-[250px] leading-relaxed">
                Phản hồi xác nhận tham dự của bạn đã được gửi.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={handleSubmit} className="rsvp-form-surface w-full">

                {/* Name input */}
                <div className="mb-6">
                  <label className="block font-sans-clean text-[9px] font-bold text-[#5c161e] uppercase tracking-[2.5px] mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="focus:outline-none"
                  />
                </div>

                {/* Attendance */}
                <div className="mb-5">
                  <label className="block font-sans-clean text-[9px] font-bold text-[#5c161e] uppercase tracking-[2.5px] mb-3">
                    Bạn sẽ tham dự chứ?
                  </label>
                  <div className="flex flex-col gap-2.5">
                    <label className="flex items-center gap-3 cursor-pointer font-serif-display text-[14px] text-[#3a3430]">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={attending === "yes"}
                        onChange={() => setAttending("yes")}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>Có, tôi sẽ tham dự</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer font-serif-display text-[14px] text-[#3a3430]">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={attending === "no"}
                        onChange={() => setAttending("no")}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>Tôi bận, rất tiếc không thể tham dự</span>
                    </label>
                  </div>
                </div>

                {/* Guest count — accordion */}
                <AnimatePresence initial={false}>
                  {attending === "yes" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                      animate={{ height: "auto", opacity: 1, marginBottom: 20 }}
                      exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                      transition={{
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.15 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-0.5">
                        <label className="block font-sans-clean text-[9px] font-bold text-[#5c161e] uppercase tracking-[2.5px] mb-2">
                          Số lượng người tham dự
                        </label>
                        <select
                          value={count}
                          onChange={(e) => setCount(e.target.value)}
                          className="focus:outline-none"
                        >
                          <option value="1">1 người</option>
                          <option value="2">2 người</option>
                          <option value="3">3 người</option>
                          <option value="4">4 người hoặc hơn</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 stationery-btn-primary disabled:opacity-60"
                >
                  {submitting ? "Đang gửi..." : "Gửi xác nhận"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
