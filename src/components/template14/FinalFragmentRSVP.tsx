"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Send, AlertCircle } from "lucide-react";

export interface RsvpSuccessData {
  guestName: string;
  attending: boolean;
  guestCount: number;
  side: "groom" | "bride";
  ticketCode: string;
  message?: string;
}

interface FinalFragmentRSVPProps {
  weddingId: string;
  defaultGuestName?: string;
  onRsvpSuccess: (data: RsvpSuccessData) => void;
}

export default function FinalFragmentRSVP({
  weddingId,
  defaultGuestName = "",
  onRsvpSuccess,
}: FinalFragmentRSVPProps) {
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

    const ticketCode = `KINTSUGI-${Math.floor(100000 + Math.random() * 900000)}`;

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
        throw new Error("Không thể kết nối máy chủ xác nhận. Vui lòng thử lại!");
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

      // Trigger success callback
      onRsvpSuccess({
        guestName: fullName.trim(),
        attending: attending === true,
        guestCount: attending ? guestCount : 0,
        side,
        ticketCode,
        message: message.trim(),
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi xảy ra khi xác nhận.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-20 px-4 bg-[#F3ECDD] border-t border-[#C9A98D]/40">
      <div className="max-w-xl mx-auto bg-[#FAF7F0] rounded-3xl p-6 sm:p-10 border-2 border-[#B99245]/40 shadow-xl relative overflow-hidden">
        
        {/* Top Gold Seam Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B99245] via-[#E6C265] to-[#B99245]" />

        {/* Section Title */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A3034]/10 text-[#6A3034] text-xs font-serif uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#B99245]" />
            <span>MẢNH GHÉP CUỐI CÙNG</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#252320] font-bold">
            Xác Nhận Tham Dự
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#252320]/75">
            “Bạn có muốn trở thành mảnh ghép trong ngày vui của chúng mình không?”
          </p>
        </div>

        {/* Progress Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif transition-colors ${
                  step === s
                    ? "bg-[#6A3034] text-[#FAF7F0] font-bold"
                    : step > s
                    ? "bg-[#B99245] text-[#252320]"
                    : "bg-[#EAE0CD] text-[#76806B]"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-[#B99245]" : "bg-[#C9A98D]/30"}`} />}
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Choice */}
        {step === 1 && (
          <div className="space-y-4">
            <button
              onClick={() => handleChoice(true)}
              type="button"
              className="w-full p-4 rounded-2xl bg-[#6A3034] text-[#FAF7F0] border border-[#B99245] hover:bg-[#803D42] transition-colors flex items-center justify-between shadow-md group min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B99245] shrink-0" />
                <span className="font-serif text-sm font-medium">Tôi sẽ tham dự ngày vui</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#B99245] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleChoice(false)}
              type="button"
              className="w-full p-4 rounded-2xl bg-[#F3ECDD] text-[#252320] border border-[#C9A98D]/60 hover:border-[#B99245] transition-colors flex items-center justify-between shadow-sm group min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-[#76806B] shrink-0" />
                <span className="font-serif text-sm">Rất tiếc, tôi không thể tham dự</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#76806B] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* STEP 2: Input Form */}
        {step === 2 && (
          <form onSubmit={handleStep2Next} className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-[#252320] font-medium mb-1">
                Họ và tên của bạn <span className="text-[#6A3034]">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn Ánh"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F3ECDD]/60 border border-[#C9A98D] text-sm text-[#252320] focus:outline-none focus:border-[#B99245] min-h-[44px]"
              />
            </div>

            {attending && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-serif text-[#252320] font-medium mb-1">
                      Số người tham dự
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F3ECDD]/60 border border-[#C9A98D] text-sm text-[#252320] focus:outline-none focus:border-[#B99245] min-h-[44px]"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} người
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif text-[#252320] font-medium mb-1">
                      Bạn là khách nhà
                    </label>
                    <select
                      value={side}
                      onChange={(e) => setSide(e.target.value as "groom" | "bride")}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F3ECDD]/60 border border-[#C9A98D] text-sm text-[#252320] focus:outline-none focus:border-[#B99245] min-h-[44px]"
                    >
                      <option value="groom">Nhà Trai (Chú rể)</option>
                      <option value="bride">Nhà Gái (Cô dâu)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif text-[#252320] font-medium mb-1">
                    Yêu cầu ăn uống (nếu có)
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="Ăn chay, dị ứng..."
                    className="w-full px-4 py-2 rounded-xl bg-[#F3ECDD]/60 border border-[#C9A98D] text-sm text-[#252320] focus:outline-none focus:border-[#B99245] min-h-[44px]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-serif text-[#252320] font-medium mb-1">
                Lời nhắn chúc mừng
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi lời chúc yêu thương đến dâu rể..."
                className="w-full px-4 py-2 rounded-xl bg-[#F3ECDD]/60 border border-[#C9A98D] text-sm text-[#252320] focus:outline-none focus:border-[#B99245]"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-serif text-[#76806B] flex items-center gap-1 hover:text-[#252320] min-h-[44px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#6A3034] text-[#FAF7F0] text-xs font-serif font-medium border border-[#B99245] flex items-center gap-1.5 hover:bg-[#803D42] min-h-[44px]"
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Confirmation Summary & Final Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#F3ECDD] border border-[#C9A98D]/60 space-y-2 text-sm font-serif">
              <p>
                <strong>Họ tên:</strong> {fullName}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {attending ? (
                  <span className="text-[#6A3034] font-semibold">Tham dự ({guestCount} người)</span>
                ) : (
                  <span className="text-[#76806B]">Không thể tham dự</span>
                )}
              </p>
              {attending && (
                <p>
                  <strong>Khách phía:</strong> {side === "groom" ? "Nhà Trai" : "Nhà Gái"}
                </p>
              )}
              {message && (
                <p className="italic text-xs text-[#252320]/80">
                  "{message}"
                </p>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-serif text-[#76806B] flex items-center gap-1 hover:text-[#252320] min-h-[44px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sửa lại</span>
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-full bg-[#6A3034] text-[#FAF7F0] font-serif text-xs font-semibold border border-[#B99245] shadow-lg flex items-center gap-2 hover:bg-[#803D42] disabled:opacity-50 min-h-[44px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#FAF7F0] border-t-transparent animate-spin" />
                    <span>Đang hoàn tất...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#B99245]" />
                    <span>Ghép mảnh cuối cùng</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
