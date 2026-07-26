"use client";

import React, { useState } from "react";
import { Wish } from "@/types";

interface Section8GuestbookProps {
  weddingId: string;
  wishes: Wish[];
  onWishSubmitted?: () => void;
}

export default function Section8Guestbook({ weddingId, wishes: initialWishes, onWishSubmitted }: Section8GuestbookProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("bạn chú rể");
  const [attendance, setAttendance] = useState("Sẽ tham dự");
  const [content, setContent] = useState("");
  const [guestCount, setGuestCount] = useState("1");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [wishesList, setWishesList] = useState<Wish[]>(initialWishes || []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Vui lòng nhập tên của bạn.");
      return;
    }

    setIsSubmitting(true);

    try {
      const wishText = content.trim() || "Chúc hai bạn trăm năm hạnh phúc, gia đình êm ấm ngập tràn niềm vui!";
      const fullGuestName = `${name.trim()} (${relationship} · ${attendance} ${guestCount ? `· ${guestCount} người` : ""})`;
      const targetWeddingId = weddingId || "preview-template9-id";

      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wedding_id: targetWeddingId,
          guest_name: fullGuestName,
          content: wishText,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        const newWishObj: Wish = {
          id: data.data?.id || Date.now(),
          wedding_id: weddingId,
          guest_name: fullGuestName,
          content: wishText,
          created_at: new Date().toISOString(),
        };
        setWishesList([newWishObj, ...wishesList]);

        setName("");
        setContent("");

        if (onWishSubmitted) {
          onWishSubmitted();
        }
      } else {
        setErrorMessage(data.error || "Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Guestbook submission error:", err);
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="relative w-full py-28 px-6 bg-[#F3EFE7] text-[#49372F] overflow-hidden border-t border-[#D8CABB]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="font-sans text-xs tracking-widest uppercase text-[#A55D43] mb-2 block">
            SECTION 08 &middot; THE ENTRANCE GUESTBOOK
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#49372F] tracking-tight mb-4">
            Sổ Lưu Bút Trước Sảnh
          </h2>
          <p className="font-serif text-xl text-[#49372F]/90 italic leading-relaxed max-w-xl mx-auto">
            &ldquo;Ngôi nhà này sẽ ấm áp hơn khi có bạn ghé thăm.&rdquo;
          </p>
          <div className="w-16 h-[1px] bg-[#A55D43] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Guestbook RSVP Form Block */}
          <div className="md:col-span-7 p-6 md:p-8 bg-[#F3EFE7] border-2 border-[#49372F] shadow-lg rounded-sm relative">
            <span className="font-sans text-[10px] tracking-widest text-[#6F7461] uppercase block mb-4 border-b border-[#D8CABB] pb-2">
              XÁC NHẬN THAM DỰ &amp; GỬI LỜI CHÚC
            </span>

            {isSuccess ? (
              <div className="py-10 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#A55D43]/10 border border-[#A55D43] flex items-center justify-center mx-auto text-[#A55D43]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-[#49372F] font-bold">Cảm ơn bạn rất nhiều!</h3>
                <p className="font-serif text-lg text-[#A55D43] italic">
                  &ldquo;Tên của bạn đã được ghi vào ngày đặc biệt của chúng mình.&rdquo;
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2 rounded-full border border-[#49372F] text-xs font-sans uppercase tracking-widest text-[#49372F] hover:bg-[#49372F] hover:text-[#F3EFE7] transition-all"
                >
                  Gửi lời chúc khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3 bg-[#A55D43]/10 border border-[#A55D43] text-xs text-[#A55D43] font-sans rounded-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Name field */}
                <div>
                  <label htmlFor="guest-name" className="block font-sans text-xs uppercase tracking-wider text-[#49372F] font-semibold mb-1">
                    Họ và Tên quý khách <span className="text-[#A55D43]">*</span>
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn Ánh"
                    className="w-full px-4 py-2.5 bg-[#F3EFE7] border border-[#49372F]/40 text-[#49372F] font-sans text-sm focus:outline-none focus:border-[#A55D43] focus:ring-1 focus:ring-[#A55D43] rounded-sm"
                  />
                </div>

                {/* Relationship / Side & Attendance Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="guest-relation" className="block font-sans text-xs uppercase tracking-wider text-[#49372F] font-semibold mb-1">
                      Mối quan hệ
                    </label>
                    <select
                      id="guest-relation"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#F3EFE7] border border-[#49372F]/40 text-[#49372F] font-sans text-sm focus:outline-none focus:border-[#A55D43] rounded-sm"
                    >
                      <option value="Bạn chú rể">Bạn chú rể</option>
                      <option value="Bạn cô dâu">Bạn cô dâu</option>
                      <option value="Họ hàng chú rể">Họ hàng chú rể</option>
                      <option value="Họ hàng cô dâu">Họ hàng cô dâu</option>
                      <option value="Đồng nghiệp">Đồng nghiệp</option>
                      <option value="Bạn chung">Bạn chung hai người</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="guest-attendance" className="block font-sans text-xs uppercase tracking-wider text-[#49372F] font-semibold mb-1">
                      Xác nhận tham dự
                    </label>
                    <select
                      id="guest-attendance"
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#F3EFE7] border border-[#49372F]/40 text-[#49372F] font-sans text-sm focus:outline-none focus:border-[#A55D43] rounded-sm"
                    >
                      <option value="Sẽ tham dự">Sẽ tham dự</option>
                      <option value="Rất tiếc vắng mặt">Rất tiếc vắng mặt</option>
                      <option value="Chưa chắc chắn">Chưa chắc chắn</option>
                    </select>
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <label htmlFor="guest-count" className="block font-sans text-xs uppercase tracking-wider text-[#49372F] font-semibold mb-1">
                    Số người tham dự
                  </label>
                  <select
                    id="guest-count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F3EFE7] border border-[#49372F]/40 text-[#49372F] font-sans text-sm focus:outline-none focus:border-[#A55D43] rounded-sm"
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người (đi cùng người thương)</option>
                    <option value="3">Gia đình (3-4 người)</option>
                  </select>
                </div>

                {/* Wishes Content */}
                <div>
                  <label htmlFor="guest-wishes" className="block font-sans text-xs uppercase tracking-wider text-[#49372F] font-semibold mb-1">
                    Lời chúc gửi đến Cô Dâu &amp; Chú Rể
                  </label>
                  <textarea
                    id="guest-wishes"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Viết lời chúc ấm áp của bạn tại đây..."
                    className="w-full px-4 py-2.5 bg-[#F3EFE7] border border-[#49372F]/40 text-[#49372F] font-sans text-sm focus:outline-none focus:border-[#A55D43] focus:ring-1 focus:ring-[#A55D43] rounded-sm"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#49372F] text-[#F3EFE7] font-sans text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#A55D43] focus:ring-2 focus:ring-[#A55D43] active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? "Đang ghi sổ..." : "Gửi lời hồi đáp"}
                </button>
              </form>
            )}
          </div>

          {/* Wishes Feed Column */}
          <div className="md:col-span-5 flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-[#D8CABB] pb-3 mb-6">
                <span className="font-sans text-xs tracking-widest text-[#A55D43] uppercase font-semibold">
                  LỜI CHÚC TỪ KHÁCH MỜI ({wishesList.length})
                </span>
                <span className="font-handwriting text-base text-[#6F7461]">sổ lưu bút</span>
              </div>

              {/* Wishes Scrollable List */}
              <div className="space-y-4 max-h-[460px] overflow-y-auto custom-scrollbar pr-2">
                {wishesList.length === 0 ? (
                  <p className="font-serif italic text-sm text-[#6F7461] text-center py-8">
                    Chưa có lời chúc nào. Hãy là người đầu tiên ghi lời chúc nhé!
                  </p>
                ) : (
                  wishesList.map((wishItem) => (
                    <div key={wishItem.id} className="p-4 bg-[#D8CABB]/20 border border-[#D8CABB] rounded-sm relative">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="font-serif text-sm font-semibold text-[#49372F]">
                          {wishItem.guest_name}
                        </span>
                        <span className="font-sans text-[10px] text-[#6F7461]">
                          {new Date(wishItem.created_at).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <p className="font-serif italic text-xs text-[#49372F]/90 leading-relaxed">
                        &ldquo;{wishItem.content}&rdquo;
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-8 pt-4 border-t border-[#D8CABB] text-center font-handwriting text-lg text-[#A55D43]">
              trân trọng từng lời thương đáp của bạn
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
