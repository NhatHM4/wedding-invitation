"use client";

import React, { useState } from "react";

interface GardenRSVPProps {
  weddingId: string;
  defaultGuestName?: string;
  onSuccessCallback?: (guestName: string, wishMessage?: string) => void;
}

export default function GardenRSVP({
  weddingId,
  defaultGuestName = "",
  onSuccessCallback,
}: GardenRSVPProps) {
  const [fullName, setFullName] = useState(defaultGuestName === "Quý khách" ? "" : defaultGuestName);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [side, setSide] = useState<"groom" | "bride">("groom");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Vui lòng nhập tên của bạn");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      // 1. Submit RSVP
      const rsvpRes = await fetch("/api/cinematic/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          name: fullName,
          attending: attending === "yes",
          guestCount: attending === "yes" ? guestCount : 0,
          side,
        }),
      });

      if (!rsvpRes.ok) {
        throw new Error("Lỗi khi gửi xác nhận tham dự");
      }

      // 2. Submit Wish message if provided
      if (message.trim()) {
        await fetch("/api/wishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wedding_id: weddingId,
            guest_name: fullName,
            content: message,
          }),
        });
      }

      setIsSubmitted(true);
      if (onSuccessCallback) {
        onSuccessCallback(fullName, message);
      }
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : "Đã có lỗi xảy ra. Vui lòng thử lại!";
      setErrorMsg(errorStr);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-[#F8F3E8] border border-[#C9D0C4] p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#A6674E] font-semibold">
          Phúc Đáp Với Hai Gia Đình
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-[#56604D] font-bold">
          Xác Nhận Tham Dự
        </h3>
        <p className="text-xs text-[#6A4D3E]">
          Sự có mặt của bạn là niềm hân hoan và động viên lớn nhất đối với chúng mình.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-6 bg-[#82916D]/15 border border-[#82916D] rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 bg-[#82916D] text-[#F8F3E8] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h4 className="font-serif text-xl font-semibold text-[#56604D]">
            Cảm ơn bạn {fullName}!
          </h4>
          <p className="text-xs text-[#6A4D3E] leading-relaxed">
            Chúng mình đã nhận được xác nhận phước lành từ bạn. Bông hoa mang tên bạn đã được gieo nở rực rỡ trong khu vườn ngày cưới!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#56604D]">
          {errorMsg && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="rsvp-fullname" className="block text-xs font-semibold text-[#A6674E] uppercase tracking-wider">
              Họ và tên quý khách *
            </label>
            <input
              id="rsvp-fullname"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ và tên của bạn"
              className="w-full px-4 py-2.5 bg-[#F3EFE4] border border-[#C9D0C4] rounded-xl text-[#56604D] placeholder-[#6A4D3E]/50 focus:outline-none focus:ring-2 focus:ring-[#82916D]"
            />
          </div>

          {/* Attending Options */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#A6674E] uppercase tracking-wider">
              Bạn sẽ đến chung vui chứ? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending("yes")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                  attending === "yes"
                    ? "bg-[#82916D] text-[#F8F3E8] border-[#82916D] shadow-sm"
                    : "bg-[#F3EFE4] text-[#56604D] border-[#C9D0C4] hover:border-[#82916D]"
                }`}
              >
                Sẽ tham dự vui vẻ
              </button>
              <button
                type="button"
                onClick={() => setAttending("no")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                  attending === "no"
                    ? "bg-[#A6674E] text-[#F8F3E8] border-[#A6674E] shadow-sm"
                    : "bg-[#F3EFE4] text-[#56604D] border-[#C9D0C4] hover:border-[#A6674E]"
                }`}
              >
                Tiếc là không thể đến
              </button>
            </div>
          </div>

          {/* Guest Count & Side */}
          {attending === "yes" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="rsvp-guestcount" className="block text-xs font-semibold text-[#A6674E] uppercase tracking-wider">
                  Đi cùng bao nhiêu người?
                </label>
                <select
                  id="rsvp-guestcount"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-[#F3EFE4] border border-[#C9D0C4] rounded-xl text-[#56604D] focus:outline-none focus:ring-2 focus:ring-[#82916D]"
                >
                  <option value={1}>1 người (Mình tôi)</option>
                  <option value={2}>2 người (+1 đi kèm)</option>
                  <option value={3}>3 người (Gia đình nhỏ)</option>
                  <option value={4}>4 người trở lên</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="rsvp-side" className="block text-xs font-semibold text-[#A6674E] uppercase tracking-wider">
                  Bạn là khách nhà ai?
                </label>
                <select
                  id="rsvp-side"
                  value={side}
                  onChange={(e) => setSide(e.target.value as "groom" | "bride")}
                  className="w-full px-4 py-2.5 bg-[#F3EFE4] border border-[#C9D0C4] rounded-xl text-[#56604D] focus:outline-none focus:ring-2 focus:ring-[#82916D]"
                >
                  <option value="groom">Khách Nhà Trai (Chú rể)</option>
                  <option value="bride">Khách Nhà Gái (Cô dâu)</option>
                </select>
              </div>
            </div>
          )}

          {/* Message Wish */}
          <div className="space-y-1 pt-1">
            <label htmlFor="rsvp-message" className="block text-xs font-semibold text-[#A6674E] uppercase tracking-wider">
              Lời chúc gửi tới dâu rể (Gieo bông hoa kỷ niệm)
            </label>
            <textarea
              id="rsvp-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Gửi lời chúc ấm áp cho khu vườn gia đình nhỏ..."
              className="w-full px-4 py-2.5 bg-[#F3EFE4] border border-[#C9D0C4] rounded-xl text-[#56604D] placeholder-[#6A4D3E]/50 focus:outline-none focus:ring-2 focus:ring-[#82916D]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#56604D] hover:bg-[#303B35] text-[#F8F3E8] text-sm font-semibold rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#82916D] disabled:opacity-50"
          >
            {isSubmitting ? "Đang gửi phúc đáp..." : "Gửi Xác Nhận Tham Dự"}
          </button>
        </form>
      )}
    </div>
  );
}
