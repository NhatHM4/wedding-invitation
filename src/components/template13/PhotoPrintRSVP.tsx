"use client";

import React, { useState } from "react";
import { Printer, Check, ChevronLeft, ChevronRight, AlertCircle, Heart, UserCheck } from "lucide-react";

interface PhotoPrintRSVPProps {
  weddingId: string;
  defaultGuestName?: string;
  onRsvpSuccess: (data: {
    guestName: string;
    attending: boolean;
    guestCount: number;
    side: "groom" | "bride";
    ticketCode: string;
  }) => void;
}

export default function PhotoPrintRSVP({
  weddingId,
  defaultGuestName = "",
  onRsvpSuccess,
}: PhotoPrintRSVPProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [attending, setAttending] = useState<boolean | null>(null);

  const initialName = defaultGuestName && defaultGuestName !== "Quý khách" ? defaultGuestName : "";
  const [fullName, setFullName] = useState<string>(initialName);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [side, setSide] = useState<"groom" | "bride">("groom");
  const [message, setMessage] = useState<string>("");
  const [dietary, setDietary] = useState<string>("Không");
  const [shuttleNeeded, setShuttleNeeded] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChoice = (choice: boolean) => {
    setAttending(choice);
    setStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage("Vui lòng điền họ và tên của bạn");
      return;
    }
    setErrorMessage("");
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    const ticketCode = `FILM-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 1. POST to RSVP API
      const rsvpRes = await fetch("/api/cinematic/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          fullName: fullName.trim(),
          attending: attending ? "yes" : "no",
          guestCount: attending ? guestCount : 1,
          side,
          message: message.trim(),
        }),
      });

      if (!rsvpRes.ok) {
        throw new Error("Không thể kết nối đến phòng in vé. Vui lòng thử lại!");
      }

      // 2. If message provided, also POST to wishes API
      if (message.trim()) {
        await fetch("/api/wishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wedding_id: weddingId,
            guest_name: fullName.trim(),
            content: message.trim(),
          }),
        });
      }

      // Trigger success callback to show personalized Polaroid
      onRsvpSuccess({
        guestName: fullName.trim(),
        attending: attending === true,
        guestCount: attending ? guestCount : 0,
        side,
        ticketCode,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi xảy ra khi in vé.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-14 px-4 bg-[#F1E6D2] text-[#24211F] border-b border-[#3A2924]">
      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A53A32]/10 border border-[#A53A32]/30 rounded-full text-[10px] font-mono tracking-widest text-[#A53A32] uppercase">
            <Printer className="w-3.5 h-3.5 text-[#A53A32]" />
            <span>PHOTO LAB PRINTING ROOM • RSVP</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#24211F]">
            Xác Nhận Tham Dự Lễ Cưới
          </h2>
          <p className="text-xs text-[#24211F]/70 max-w-sm mx-auto italic font-serif">
            Điền thông tin để phòng ảnh in cho bạn tấm vé Polaroid cá nhân hóa đặc biệt làm vé mời chính thức.
          </p>
        </div>

        {/* Step Wizard Container */}
        <div className="bg-[#121212] text-[#F1E6D2] p-6 rounded-2xl shadow-2xl border-2 border-[#3A2924] space-y-6">
          {/* Step Progress Bar Header */}
          <div className="flex items-center justify-between font-mono text-[11px] border-b border-[#3A2924] pb-3 text-[#D69C52]">
            <span>PRINTING STEP {step} / 3</span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? "bg-[#A53A32]" : "bg-[#24211F]"}`} />
              <span className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? "bg-[#A53A32]" : "bg-[#24211F]"}`} />
              <span className={`w-2.5 h-2.5 rounded-full ${step >= 3 ? "bg-[#A53A32]" : "bg-[#24211F]"}`} />
            </div>
          </div>

          {/* STEP 1: ATTENDANCE SELECTION */}
          {step === 1 && (
            <div className="space-y-6 text-center">
              <h3 className="font-serif text-xl font-bold text-[#F1E6D2]">
                “Bạn có xuất hiện trong khung hình ngày hôm ấy không?”
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleChoice(true)}
                  type="button"
                  className="p-5 rounded-xl bg-[#24211F] hover:bg-[#3A2924] border-2 border-[#A53A32] text-left transition-all group focus:outline-none focus:ring-2 focus:ring-[#D69C52]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <UserCheck className="w-6 h-6 text-[#A53A32]" />
                    <span className="font-mono text-[10px] text-[#D69C52] uppercase">OPTION A</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#F1E6D2] group-hover:text-[#D69C52]">
                    Tôi sẽ tham dự
                  </h4>
                  <p className="text-xs font-serif text-[#F1E6D2]/70 mt-1">
                    Sẵn sàng diện trang phục đẹp nhất đến chúc mừng hai bạn!
                  </p>
                </button>

                <button
                  onClick={() => handleChoice(false)}
                  type="button"
                  className="p-5 rounded-xl bg-[#24211F] hover:bg-[#3A2924] border-2 border-[#3A2924] text-left transition-all group focus:outline-none focus:ring-2 focus:ring-[#D69C52]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-6 h-6 text-[#D69C52]" />
                    <span className="font-mono text-[10px] text-[#D69C52] uppercase">OPTION B</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#F1E6D2] group-hover:text-[#D69C52]">
                    Rất tiếc, tôi không thể tham dự
                  </h4>
                  <p className="text-xs font-serif text-[#F1E6D2]/70 mt-1">
                    Gửi lời chúc mừng chân thành từ xa đến dâu rể!
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {step === 2 && (
            <form onSubmit={handleStep2Next} className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#F1E6D2]">
                {attending ? "Thông Tin Khách Mời Tham Dự" : "Gửi Lời Chúc Mừng Chân Thành"}
              </h3>

              {errorMessage && (
                <div className="p-3 bg-[#A53A32]/20 border border-[#A53A32] rounded-lg text-xs font-mono text-[#F1E6D2] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#A53A32] shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="rsvp-fullname" className="text-xs font-mono text-[#D69C52] uppercase block">Họ và tên của bạn (*)</label>
                <input
                  id="rsvp-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Minh Nhật"
                  className="w-full p-3 bg-[#181615] border border-[#3A2924] rounded-xl text-sm font-serif text-[#F1E6D2] placeholder-[#F1E6D2]/30 focus:outline-none focus:border-[#D69C52]"
                  required
                />
              </div>

              {/* Side & Count if attending */}
              {attending && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="rsvp-side" className="text-xs font-mono text-[#D69C52] uppercase block">Bạn là khách của</label>
                      <select
                        id="rsvp-side"
                        value={side}
                        onChange={(e) => setSide(e.target.value as "groom" | "bride")}
                        className="w-full p-3 bg-[#181615] border border-[#3A2924] rounded-xl text-xs font-serif text-[#F1E6D2] focus:outline-none focus:border-[#D69C52]"
                      >
                        <option value="groom">Nhà Chú Rể</option>
                        <option value="bride">Nhà Cô Dâu</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="rsvp-guestcount" className="text-xs font-mono text-[#D69C52] uppercase block">Số lượng người</label>
                      <select
                        id="rsvp-guestcount"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full p-3 bg-[#181615] border border-[#3A2924] rounded-xl text-xs font-serif text-[#F1E6D2] focus:outline-none focus:border-[#D69C52]"
                      >
                        <option value={1}>1 người (Chỉ mình tôi)</option>
                        <option value={2}>2 người (Đi cùng người thương)</option>
                        <option value={3}>3 người</option>
                        <option value={4}>4 người (Gia đình)</option>
                      </select>
                    </div>
                  </div>

                  {/* Dietary Note */}
                  <div className="space-y-1">
                    <label htmlFor="rsvp-dietary" className="text-xs font-mono text-[#D69C52] uppercase block">Yêu cầu ăn uống (Ăn chay / Dị ứng)</label>
                    <input
                      id="rsvp-dietary"
                      type="text"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      placeholder="Không có hoặc ghi chú đặc biệt..."
                      className="w-full p-3 bg-[#181615] border border-[#3A2924] rounded-xl text-xs font-serif text-[#F1E6D2] focus:outline-none focus:border-[#D69C52]"
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="rsvp-message" className="text-xs font-mono text-[#D69C52] uppercase block">Lời nhắn gửi tới Cô dâu & Chú rể</label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Viết lời chúc ngọt ngào nhất..."
                  className="w-full p-3 bg-[#181615] border border-[#3A2924] rounded-xl text-xs font-serif text-[#F1E6D2] placeholder-[#F1E6D2]/30 focus:outline-none focus:border-[#D69C52]"
                />
              </div>

              {/* Action Nav */}
              <div className="flex items-center justify-between pt-4 border-t border-[#3A2924]">
                <button
                  onClick={() => setStep(1)}
                  type="button"
                  className="px-4 py-2.5 bg-[#24211F] hover:bg-[#3A2924] rounded-xl text-xs font-mono text-[#F1E6D2] flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4 text-[#D69C52]" /> quay lại
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#A53A32] hover:bg-[#A53A32]/90 rounded-xl text-xs font-mono font-bold text-[#F1E6D2] flex items-center gap-1 shadow"
                >
                  tiếp tục <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: CONFIRM & PRINT TICKET */}
          {step === 3 && (
            <div className="space-y-5 text-center">
              <h3 className="font-serif text-xl font-bold text-[#F1E6D2]">
                Kiểm Tra Thông Tin Trước Khi In Vé
              </h3>

              <div className="bg-[#181615] border border-[#3A2924] rounded-xl p-4 text-left font-serif text-xs space-y-2 text-[#F1E6D2]/90">
                <p><strong>Khách mời:</strong> {fullName}</p>
                <p><strong>Trạng thái:</strong> {attending ? `Sẽ tham dự (${guestCount} người)` : "Không thể tham dự"}</p>
                {attending && <p><strong>Phía đại diện:</strong> {side === "groom" ? "Nhà Chú Rể" : "Nhà Cô Dâu"}</p>}
                {message && <p className="italic text-[#D69C52]">“{message}”</p>}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  type="button"
                  className="px-4 py-2.5 bg-[#24211F] hover:bg-[#3A2924] rounded-xl text-xs font-mono text-[#F1E6D2] flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4 text-[#D69C52]" /> chỉnh sửa
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  type="button"
                  className="px-6 py-3 bg-[#A53A32] hover:bg-[#A53A32]/90 disabled:opacity-50 text-[#F1E6D2] font-mono text-xs font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#D69C52]" />
                  <span>{isSubmitting ? "ĐANG IN VÉ POLAROID..." : "IN VÉ THAM DỰ POLAROID"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
