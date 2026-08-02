"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Send, ShieldCheck, Ticket, UserCheck } from "lucide-react";

interface CheckInRSVPProps {
  weddingId: string;
  defaultGuestName?: string;
  onSuccessCallback?: (guestName: string, ticketCode: string, attending: boolean) => void;
}

export default function CheckInRSVP({
  weddingId,
  defaultGuestName = "",
  onSuccessCallback,
}: CheckInRSVPProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [fullName, setFullName] = useState<string>(
    defaultGuestName === "Quý khách" ? "" : defaultGuestName
  );
  const [guestCount, setGuestCount] = useState<number>(1);
  const [side, setSide] = useState<"groom" | "bride">("groom");
  const [message, setMessage] = useState<string>("");
  const [dietary, setDietary] = useState<string>("Không");
  const [shuttleNeeded, setShuttleNeeded] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [generatedTicketCode, setGeneratedTicketCode] = useState<string>("");

  const handleStep1Choice = (choice: boolean) => {
    setAttending(choice);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên của bạn");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    const ticketCode = `PASS-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const rsvpRes = await fetch("/api/cinematic/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          name: fullName.trim(),
          attending: attending === true,
          guestCount: attending ? guestCount : 0,
          side,
        }),
      });

      if (!rsvpRes.ok) {
        throw new Error("Không thể gửi dữ liệu check-in. Vui lòng thử lại!");
      }

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

      setGeneratedTicketCode(ticketCode);
      setIsSubmitted(true);
      if (onSuccessCallback) {
        onSuccessCallback(fullName.trim(), ticketCode, attending === true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi xảy ra khi check-in.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp-checkin" className="relative py-12 px-3 bg-[#F4EBDD] text-[#272521] overflow-hidden">
      <div className="max-w-full mx-auto space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#172235]/10 border border-[#172235]/20 rounded-full text-[9px] font-mono tracking-widest text-[#762F3A] uppercase font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#762F3A]" />
            <span>FLIGHT CHECK-IN PROCEDURES</span>
          </div>
          <h2 className="font-serif text-2xl text-[#172235] font-bold">
            Thủ Tục Check-In Tham Dự
          </h2>
          <p className="text-[11px] text-[#272521]/70 max-w-xs mx-auto italic">
            Xác nhận tham dự trực tuyến để nhận thẻ lên tàu cá nhân hóa cho ngày hỷ.
          </p>
        </div>

        {/* Check-In Card Box */}
        <div className="bg-[#FFFBF5] border-2 border-[#B89B62] rounded-2xl p-4 sm:p-5 shadow-xl space-y-5">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[9px] font-mono font-bold text-[#762F3A] uppercase">
              <span>BƯỚC {step}/3 — {step === 1 ? "XÁC NHẬN" : step === 2 ? "THÔNG TIN" : "XÁC NHẬN VÉ"}</span>
              <span>PROGRESS</span>
            </div>
            <div className="w-full h-1.5 bg-[#F4EBDD] rounded-full overflow-hidden border border-[#B89B62]/30">
              <div
                className="h-full bg-[#762F3A] transition-all duration-500 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {isSubmitted ? (
            <div className="p-5 bg-[#172235] text-[#F4EBDD] rounded-xl text-center space-y-3 shadow-lg border border-[#B89B62]">
              <div className="w-12 h-12 bg-[#B89B62] text-[#172235] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7 text-[#172235]" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-[#B89B62] uppercase font-bold">
                  CHECK-IN SUCCESSFUL
                </span>
                <h3 className="font-serif text-xl text-[#F4EBDD] font-bold">
                  Cảm ơn {fullName}!
                </h3>
                <p className="text-[11px] text-[#F4EBDD]/80 leading-relaxed italic max-w-xs mx-auto">
                  {attending
                    ? "Thủ tục check-in thành công. Thẻ lên tàu cá nhân hóa của bạn đã sẵn sàng bên dưới!"
                    : "Cảm ơn lời chúc chân thành từ bạn. Chúng mình vô cùng trân quý tình cảm của bạn!"}
                </p>
              </div>

              {attending && (
                <div className="p-2.5 bg-[#F4EBDD]/10 border border-[#B89B62]/40 rounded-lg font-mono text-[11px] text-[#B89B62]">
                  MÃ VÉ: <strong className="text-[#F4EBDD]">{generatedTicketCode}</strong>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-2.5 bg-[#A9473F]/10 border border-[#A9473F] text-[#A9473F] text-[11px] font-mono rounded-lg">
                  {errorMessage}
                </div>
              )}

              {/* STEP 1: ATTENDANCE SELECTION */}
              {step === 1 && (
                <div className="space-y-3">
                  <div className="text-center space-y-0.5">
                    <span className="text-[9px] font-mono text-[#762F3A] uppercase font-bold">
                      QUESTION 01
                    </span>
                    <h3 className="font-serif text-lg text-[#172235] font-bold">
                      Bạn sẽ đồng hành cùng chúng mình chứ?
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleStep1Choice(true)}
                      className="p-4 rounded-xl border-2 border-[#B89B62] bg-[#172235] text-[#F4EBDD] active:bg-[#762F3A] transition-all text-center space-y-1 shadow-md"
                    >
                      <UserCheck className="w-7 h-7 text-[#B89B62] mx-auto" />
                      <span className="font-serif text-sm font-bold block">
                        Tôi Sẽ Tham Dự Vui Vẻ
                      </span>
                      <span className="text-[9px] font-mono text-[#B89B62] block uppercase">
                        CONFIRM ATTENDANCE
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStep1Choice(false)}
                      className="p-4 rounded-xl border-2 border-[#B89B62]/40 bg-[#F4EBDD]/60 text-[#272521] active:border-[#A9473F] transition-all text-center space-y-1 shadow-sm"
                    >
                      <Ticket className="w-7 h-7 text-[#A9473F] mx-auto" />
                      <span className="font-serif text-sm font-bold block">
                        Rất Tiếc, Không Thể Đến
                      </span>
                      <span className="text-[9px] font-mono text-[#762F3A] block uppercase">
                        UNABLE TO ATTEND
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DETAILS INPUT */}
              {step === 2 && (
                <div className="space-y-3">
                  <div className="text-center space-y-0.5">
                    <span className="text-[9px] font-mono text-[#762F3A] uppercase font-bold">
                      QUESTION 02
                    </span>
                    <h3 className="font-serif text-lg text-[#172235] font-bold">
                      {attending ? "Thông Tin Hành Khách" : "Gửi Lời Chúc Mừng"}
                    </h3>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label htmlFor="checkin-name" className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                      HỌ VÀ TÊN HÀNH KHÁCH *
                    </label>
                    <input
                      id="checkin-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nhập họ và tên của bạn..."
                      className="w-full px-3.5 py-2.5 bg-[#F4EBDD]/60 border border-[#B89B62] rounded-xl text-[#172235] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
                    />
                  </div>

                  {attending && (
                    <>
                      {/* Guest Count & Side */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label htmlFor="checkin-count" className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                            SỐ LƯỢNG NGƯỜI ĐI CÙNG
                          </label>
                          <select
                            id="checkin-count"
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 bg-[#F4EBDD]/60 border border-[#B89B62] rounded-xl text-[#172235] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
                          >
                            <option value={1}>1 người (Một mình tôi)</option>
                            <option value={2}>2 người (+1 đi cùng)</option>
                            <option value={3}>3 người (Gia đình)</option>
                            <option value={4}>4 người trở lên</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="checkin-side" className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                            KHÁCH CỦA AI?
                          </label>
                          <select
                            id="checkin-side"
                            value={side}
                            onChange={(e) => setSide(e.target.value as "groom" | "bride")}
                            className="w-full px-3.5 py-2.5 bg-[#F4EBDD]/60 border border-[#B89B62] rounded-xl text-[#172235] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
                          >
                            <option value="groom">Khách Nhà Trai (Chú rể)</option>
                            <option value="bride">Khách Nhà Gái (Cô dâu)</option>
                          </select>
                        </div>
                      </div>

                      {/* Dietary & Shuttle requests */}
                      <div className="space-y-3 pt-1">
                        <div className="space-y-1">
                          <label htmlFor="checkin-dietary" className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                            YÊU CẦU ĂN UỐNG (NẾU CÓ)
                          </label>
                          <select
                            id="checkin-dietary"
                            value={dietary}
                            onChange={(e) => setDietary(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#F4EBDD]/60 border border-[#B89B62] rounded-xl text-[#172235] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
                          >
                            <option value="Không">Không có yêu cầu đặc biệt</option>
                            <option value="Ăn chay">Ăn chay / Vegetarian</option>
                            <option value="Dị ứng hải sản">Dị ứng hải sản</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                            ĐĂNG KÝ XE ĐƯA ĐÓN
                          </label>
                          <button
                            type="button"
                            onClick={() => setShuttleNeeded(!shuttleNeeded)}
                            className={`w-full py-2.5 px-3 rounded-xl border text-[11px] font-mono font-bold transition-colors ${
                              shuttleNeeded
                                ? "bg-[#762F3A] text-[#F4EBDD] border-[#762F3A]"
                                : "bg-[#F4EBDD]/60 text-[#272521] border-[#B89B62]"
                            }`}
                          >
                            {shuttleNeeded ? "✓ ĐÃ ĐĂNG KÝ XE ĐƯA ĐÓN" : "+ CẦN ĐĂNG KÝ XE ĐƯA ĐÓN"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Message wish text */}
                  <div className="space-y-1 pt-1">
                    <label htmlFor="checkin-message" className="block text-[10px] font-mono font-bold text-[#762F3A] uppercase">
                      LỜI CHÚC GỬI DÂU RỂ
                    </label>
                    <textarea
                      id="checkin-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Viết lời chúc yêu thương gửi đến cặp đôi..."
                      className="w-full px-3.5 py-2.5 bg-[#F4EBDD]/60 border border-[#B89B62] rounded-xl text-[#172235] font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-3.5 py-2 rounded-xl border border-[#B89B62] text-[#172235] font-mono text-[11px] font-bold flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>LẠI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2 bg-[#172235] text-[#F4EBDD] font-mono text-[11px] font-bold rounded-xl flex items-center gap-1"
                    >
                      <span>TIẾP TỤC</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: FINAL CONFIRMATION & SUBMIT */}
              {step === 3 && (
                <div className="space-y-3">
                  <div className="text-center space-y-0.5">
                    <span className="text-[9px] font-mono text-[#762F3A] uppercase font-bold">
                      STEP 03
                    </span>
                    <h3 className="font-serif text-lg text-[#172235] font-bold">
                      Xác Nhận &amp; Nhận Thẻ Lên Tàu
                    </h3>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3 bg-[#F4EBDD] border border-[#B89B62] rounded-xl space-y-1.5 text-[11px] font-mono text-[#272521]">
                    <div className="flex justify-between border-b border-[#B89B62]/30 pb-1">
                      <span className="text-[#762F3A] font-bold">HÀNH KHÁCH:</span>
                      <span className="font-bold text-[#172235]">{fullName || "Chưa nhập"}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#B89B62]/30 pb-1">
                      <span className="text-[#762F3A] font-bold">TRẠNG THÁI:</span>
                      <span className="font-bold text-[#172235]">
                        {attending ? "THAM DỰ" : "KHÔNG THỂ THAM DỰ"}
                      </span>
                    </div>
                    {attending && (
                      <div className="flex justify-between border-b border-[#B89B62]/30 pb-1">
                        <span className="text-[#762F3A] font-bold">SỐ LƯỢNG NGƯỜI:</span>
                        <span className="font-bold text-[#172235]">{guestCount} người</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-3.5 py-2 rounded-xl border border-[#B89B62] text-[#172235] font-mono text-[11px] font-bold flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>SỬA</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#762F3A] hover:bg-[#A9473F] text-[#F4EBDD] font-mono text-[11px] uppercase tracking-wider font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 text-[#F4EBDD]" />
                      <span>{isSubmitting ? "ĐANG CHECK-IN..." : "HOÀN TẤT CHECK-IN"}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
