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
    // Simulate submission delay
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
      className="w-full px-5 py-6 bg-[#fcfaf7] border-y border-[#e8e2d8] overflow-hidden"
    >
      {/* Title */}
      <div className="text-center mb-6">
        <p className="font-barlow text-[10px] font-bold tracking-[3px] text-gray-500 uppercase">
          XÁC NHẬN THAM DỰ
        </p>
        <p className="font-ephesis text-[28px] text-[#5a1212] mt-0.5" style={{ fontStyle: "italic" }}>
          RSVP
        </p>
        <div className="w-12 h-[1px] bg-[#e8ddd4] mx-auto mt-2" />
      </div>

      <div className="w-full relative min-h-[220px]">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col justify-center items-center py-8 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 14 }}
                className="text-3xl mb-3"
              >
                💌
              </motion.div>
              <p className="font-ephesis text-[24px] text-[#5a1212] italic">
                Cảm ơn bạn rất nhiều!
              </p>
              <p className="font-barlow text-[11px] text-gray-500 mt-2">
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
              <form onSubmit={handleSubmit} className="w-full bg-white border border-[#e8ddd4] rounded p-5 shadow-sm">
                {/* Name input */}
                <div className="mb-4">
                  <label className="block font-barlow text-[10.5px] font-bold text-gray-700 uppercase mb-1.5">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#fcfaf7] border border-[#d8ccc2] rounded px-3.5 py-2.5 font-barlow text-[11.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5a1212] transition-colors"
                  />
                </div>

                {/* Attendance option */}
                <div className="mb-4">
                  <label className="block font-barlow text-[10.5px] font-bold text-gray-700 uppercase mb-2">
                    Bạn sẽ tham dự chứ?
                  </label>
                  
                  <div className="flex flex-col gap-2">
                    {/* Option Yes */}
                    <label className="flex items-center gap-2.5 cursor-pointer font-barlow text-[11.5px] text-gray-700">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={attending === "yes"}
                        onChange={() => setAttending("yes")}
                        className="accent-[#5a1212] w-4 h-4 cursor-pointer"
                      />
                      <span>Có, tôi sẽ tham dự</span>
                    </label>

                    {/* Option No */}
                    <label className="flex items-center gap-2.5 cursor-pointer font-barlow text-[11.5px] text-gray-700">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={attending === "no"}
                        onChange={() => setAttending("no")}
                        className="accent-[#5a1212] w-4 h-4 cursor-pointer"
                      />
                      <span>Tôi bận, rất tiếc không thể tham dự</span>
                    </label>
                  </div>
                </div>

                {/* Guest Count Dropdown (Animated Accordion Height) */}
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
                      <div className="pt-0.5 pb-0.5">
                        <label className="block font-barlow text-[10.5px] font-bold text-gray-700 uppercase mb-1.5">
                          Số lượng người tham dự
                        </label>
                        <div className="relative">
                          <select
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            className="w-full bg-[#fcfaf7] border border-[#d8ccc2] rounded px-3.5 py-2.5 font-barlow text-[11.5px] text-gray-800 focus:outline-none focus:border-[#5a1212] transition-colors appearance-none"
                          >
                            <option value="1">1 người</option>
                            <option value="2">2 người</option>
                            <option value="3">3 người</option>
                            <option value="4">4 người hoặc hơn</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#5a1212] text-white font-barlow text-[11px] font-bold tracking-[2.5px] uppercase rounded shadow hover:bg-[#4c0d0d] transition-colors disabled:opacity-60 cursor-pointer"
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
