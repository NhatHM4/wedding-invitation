"use client";

import { useState } from "react";

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
    <section className="is-animation anim-fade-up w-full px-5 py-6 bg-[#fcfaf7] border-y border-[#e8e2d8]">
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

      {success ? (
        <div className="text-center py-8">
          <div className="text-3xl mb-3">💌</div>
          <p className="font-ephesis text-[24px] text-[#5a1212] italic">
            Cảm ơn bạn rất nhiều!
          </p>
          <p className="font-barlow text-[11px] text-gray-500 mt-2">
            Phản hồi xác nhận tham dự của bạn đã được gửi.
          </p>
        </div>
      ) : (
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

          {/* Guest Count Dropdown */}
          {attending === "yes" && (
            <div className="mb-5">
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
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#5a1212] text-white font-barlow text-[11px] font-bold tracking-[2.5px] uppercase rounded shadow hover:bg-[#4c0d0d] transition-colors disabled:opacity-60"
          >
            {submitting ? "Đang gửi..." : "Gửi xác nhận"}
          </button>
        </form>
      )}
    </section>
  );
}
