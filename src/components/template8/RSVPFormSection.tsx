"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, User, Users, HeartHandshake } from "lucide-react";

interface RSVPFormSectionProps {
  weddingId: string;
}

export default function RSVPFormSection({ weddingId }: RSVPFormSectionProps) {
  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestsCount, setGuestsCount] = useState("1");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setSubmitted(true);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#FDF8F5] via-[#FFF0ED] to-[#FDF8F5] relative overflow-hidden">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-medium">
            RSVP • ATTENDANCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mt-2">
            XÁC NHẬN THAM DỰ
          </h2>
          <p className="text-sm text-gray-600 mt-3 max-w-md mx-auto">
            Sự hiện diện của bạn là niềm vinh hạnh lớn nhất đối với gia đình chúng tôi!
          </p>
          <div className="w-16 h-[2px] bg-rose-300 mx-auto mt-4" />
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-100 shadow-xl shadow-rose-100/50"
        >
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="font-serif text-2xl text-rose-900">
                Cảm ơn {guestName} đã xác nhận!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {attending === "yes"
                  ? `Chúng tôi rất hân hạnh được đón tiếp bạn (${guestsCount} người) trong ngày trọng đại!`
                  : "Cảm ơn bạn đã gửi lời chúc tốt đẹp tới cô dâu & chú rể!"}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                Xác nhận lại
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-2">
                  Họ và tên của bạn <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-gray-800"
                  />
                </div>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-2">
                  Bạn sẽ tham dự chứ?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`py-3 px-4 rounded-2xl text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                      attending === "yes"
                        ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200"
                        : "bg-white text-gray-700 border-rose-200 hover:bg-rose-50"
                    }`}
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Sẽ tham dự</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`py-3 px-4 rounded-2xl text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                      attending === "no"
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white text-gray-700 border-rose-200 hover:bg-rose-50"
                    }`}
                  >
                    <span>Rất tiếc không thể đến</span>
                  </button>
                </div>
              </div>

              {/* Number of Guests */}
              {attending === "yes" && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-2">
                    Số người tham dự
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-gray-800 appearance-none"
                    >
                      <option value="1">Đi 1 mình</option>
                      <option value="2">Đi cùng 1 người thân (2 người)</option>
                      <option value="3">Đi cùng 2 người thân (3 người)</option>
                      <option value="4">Đi cùng gia đình (4+ người)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Note / Message */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-2">
                  Lời nhắn / Lời chúc
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Gửi lời chúc tốt đẹp đến cặp đôi..."
                  className="w-full px-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-gray-800"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-200 transition-all active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Gửi xác nhận</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
