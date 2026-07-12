"use client";

import { useState } from "react";

interface TmdvRSVPSectionProps {
  onOpenGift: () => void;
  weddingId?: string;
  onWishSubmitted?: () => void;
}

export default function TmdvRSVPSection({ onOpenGift, weddingId, onWishSubmitted }: TmdvRSVPSectionProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [wishes, setWishes] = useState("");
  const [attendance, setAttendance] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !relationship) {
      alert("Vui lòng điền đầy đủ Tên và Quan hệ!");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!weddingId) {
        // Chế độ demo (không có weddingId)
        console.log("Demo RSVP Submission:", { name, relationship, wishes, attendance });
        setIsSubmitted(true);
        alert("Cảm ơn bạn đã gửi phản hồi và lời chúc! ");
        return;
      }

      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wedding_id: weddingId,
          guest_name: `${name} (${relationship})`,
          content: wishes || "Chúc hai bạn trăm năm hạnh phúc! " + (attendance ? `(${attendance})` : ""),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        alert("Cảm ơn bạn đã gửi phản hồi và lời chúc đến Dâu Rể!");
        setName("");
        setRelationship("");
        setWishes("");
        setAttendance("");
        if (onWishSubmitted) {
          onWishSubmitted();
        }
      } else {
        alert("Có lỗi xảy ra khi gửi: " + (result.error || "Không xác định"));
      }
    } catch (error) {
      console.error(error);
      alert("Không thể gửi phản hồi. Vui lòng kiểm tra kết nối mạng!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="w-j6a4d4fc"
      className="relative w-full h-[570px] overflow-hidden select-none bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
      }}
    >
      {/* Title block */}
      <div id="w-yj0y61d2" className="absolute top-[14.3px] left-[58px] w-[304px] h-[90px] z-10 flex flex-col items-center justify-center font-ephesis text-[30px] text-black text-center leading-none is-animation anim-fade-up-rotate">
        <span>Xác Nhận Tham Dự</span>
        <span className="text-[20px] font-sans my-1 font-bold">&</span>
        <span>Gửi Lời Chúc</span>
      </div>

      {/* Red Card Form Background */}
      <div id="w-qp7zqavj" className="absolute top-[124.5px] left-[35px] w-[350px] h-[326px] z-10 bg-[#7d1f2a] rounded-[16px] border border-gray-200 is-animation anim-zoom"></div>

      {/* Form elements wrapper */}
      <div id="w-d688ytkq" className="absolute top-[144px] left-[56.5px] w-[307px] h-[278px] z-20">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-between">
            {/* Input 1: Name */}
            <div id="w-yj3hxu4w" className="w-full h-[43px] relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn là? *"
                className="w-full h-full bg-white text-[#990000] border border-[#8e0101] rounded-[10px] px-3 font-sans text-[13px] outline-none placeholder-[#8e0101]/60"
                required
              />
            </div>

            {/* Input 2: Relationship */}
            <div id="w-qycil5et" className="w-full h-[43px] mt-[14px] relative">
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="Bạn là gì của Dâu Rể nhỉ? *"
                className="w-full h-full bg-white text-[#990000] border border-[#8e0101] rounded-[10px] px-3 font-sans text-[13px] outline-none placeholder-[#8e0101]/60"
                required
              />
            </div>

            {/* Input 3: Wishes */}
            <div id="w-81v32j1d" className="w-full h-[43px] mt-[14.5px] relative">
              <input
                type="text"
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="Gửi lời chúc đến Dâu Rể nhé!"
                className="w-full h-full bg-white text-[#990000] border border-[#8e0101] rounded-[10px] px-3 font-sans text-[13px] outline-none placeholder-[#8e0101]/60"
              />
            </div>

            {/* Dropdown 4: Attendance */}
            <div id="w-gkkgczp7" className="w-full h-[43px] mt-[10px] relative">
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full h-full bg-white text-[#990000] border border-[#8e0101] rounded-[10px] px-3 font-sans text-[13px] outline-none cursor-pointer appearance-none"
              >
                <option value="">Bạn Có Tham Dự Không? *</option>
                <option value="Có, mình sẽ đến">Có, mình sẽ đến</option>
                <option value="Tiếc quá, mình không đến được">Tiếc quá, mình không đến được</option>
              </select>
              {/* custom chevron icon */}
              <div className="absolute right-3 top-0 h-full flex items-center pointer-events-none text-[#8e0101]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="w-jsy0cioh"
              disabled={isSubmitting}
              className="w-[168px] h-[43px] mt-[24px] mx-auto flex items-center justify-center bg-white text-[#8e0101] border border-gray-200 rounded-[5px] font-sans font-bold text-[14px] uppercase tracking-wider shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#8e0101] hover:text-white transition-all cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "ĐANG GỬI..." : "GỬI NGAY"}
            </button>
          </form>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white text-center font-sans">
            <h3 className="text-[18px] font-bold mb-3">Đã gửi thành công!</h3>
            <p className="text-[14px] leading-relaxed">Cảm ơn bạn đã phản hồi.<br />Sự hiện diện của bạn là niềm vinh hạnh của gia đình chúng tôi!</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-4 py-2 bg-white text-[#7d1f2a] rounded-[5px] font-bold text-[12px]"
            >
              Gửi phản hồi khác
            </button>
          </div>
        )}
      </div>

      {/* Button "GỬI MỪNG CƯỚI" */}
      <button
        id="w-qbpa8242"
        onClick={onOpenGift}
        className="absolute top-[489.4px] left-[113px] w-[194px] h-[40px] z-10 flex items-center justify-center bg-[#7d1f2a] hover:bg-[#8e0101] text-white font-sans font-bold text-[14px] rounded-[9px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all cursor-pointer is-animation anim-bounce-up"
      >
        GỬI MỪNG CƯỚI
      </button>
    </section>
  );
}
