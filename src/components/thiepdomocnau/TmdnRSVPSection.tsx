"use client";

import { useState } from "react";

interface TmdnRSVPSectionProps {
  onOpenGift: () => void;
  weddingId?: string;
  onWishSubmitted?: () => void;
}

export default function TmdnRSVPSection({ onOpenGift, weddingId, onWishSubmitted }: TmdnRSVPSectionProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [wishes, setWishes] = useState("");
  const [attendance, setAttendance] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      if (weddingId) {
        const response = await fetch("/api/wishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wedding_id: weddingId,
            guest_name: relationship ? `${name} (${relationship})` : name,
            content: wishes || `Chúc hai bạn trăm năm hạnh phúc! ${attendance ? `(${attendance})` : ""}`,
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
          if (onWishSubmitted) onWishSubmitted();
        } else {
          alert("Có lỗi xảy ra. Vui lòng thử lại!");
        }
      } else {
        setIsSubmitted(true);
        if (onWishSubmitted) onWishSubmitted();
      }
    } catch {
      alert("Không thể gửi phản hồi. Vui lòng kiểm tra mạng!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#7d1f2a] select-none">
      <div className="px-5 pt-6 pb-2 text-center">
        <div className="is-animation anim-fade-down">
          <h3 className="font-cormorant italic text-white text-[24px] leading-tight">
            Xác Nhận Tham Dự
          </h3>
          <p className="text-white text-[18px] my-1">&amp;</p>
          <h3 className="font-cormorant italic text-white text-[24px] leading-tight mb-5">
            Gửi Lời Chúc
          </h3>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 is-animation anim-zoom">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn là?"
              className="w-full h-[44px] bg-white/15 border border-white/30 rounded-sm px-4 font-sans text-[13px] text-white placeholder-white/60 outline-none focus:border-white/70 transition-colors"
              required
            />
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Bạn là gì của Dâu Rể nhỉ?"
              className="w-full h-[44px] bg-white/15 border border-white/30 rounded-sm px-4 font-sans text-[13px] text-white placeholder-white/60 outline-none focus:border-white/70 transition-colors"
            />
            <input
              type="text"
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              placeholder="Gửi lời chúc đến Dâu Rể nhé!"
              className="w-full h-[44px] bg-white/15 border border-white/30 rounded-sm px-4 font-sans text-[13px] text-white placeholder-white/60 outline-none focus:border-white/70 transition-colors"
            />
            <div className="relative">
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full h-[44px] bg-white/15 border border-white/30 rounded-sm px-4 font-sans text-[13px] text-white outline-none focus:border-white/70 transition-colors cursor-pointer appearance-none"
              >
                <option value="" className="text-gray-800">Bạn Có Tham Dự Không?</option>
                <option value="Có, mình sẽ đến" className="text-gray-800">Có, mình sẽ đến</option>
                <option value="Tiếc quá, mình không đến được" className="text-gray-800">Tiếc quá, mình không đến được</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[44px] bg-white hover:bg-gray-100 text-[#7d1f2a] font-sans font-bold text-[13px] tracking-[2px] uppercase rounded-sm transition-colors cursor-pointer disabled:opacity-60 mt-1"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi Ngay"}
            </button>
          </form>
        ) : (
          <div className="py-8 text-center text-white is-animation anim-zoom">
            <p className="font-cormorant italic text-[22px]">Cảm ơn bạn!</p>
            <p className="font-sans text-[13px] mt-2 opacity-80">Phản hồi của bạn đã được ghi nhận.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 text-white/60 font-sans text-[12px] underline cursor-pointer"
            >
              Gửi phản hồi khác
            </button>
          </div>
        )}

        {/* GỬI MỪNG CƯỚI button */}
        <button
          onClick={onOpenGift}
          className="w-full h-[44px] bg-white hover:bg-gray-100 text-[#7d1f2a] font-sans font-bold text-[13px] tracking-[2px] uppercase rounded-sm transition-colors cursor-pointer mt-3 mb-4 is-animation anim-bounce-up"
        >
          Gửi Mừng Cưới
        </button>
      </div>
    </section>
  );
}
