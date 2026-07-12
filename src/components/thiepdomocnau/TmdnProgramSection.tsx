"use client";

export default function TmdnProgramSection() {
  const handleOpenMap = () => {
    window.open("https://maps.app.goo.gl/rEY4BMbVBai5KmwEA", "_blank");
  };

  return (
    <div className="w-full flex flex-col bg-white select-none">

      {/* ── LỄ THÀNH HÔN ── */}
      <section className="px-6 py-5 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4 is-animation anim-fade-down">
          <span className="font-sans font-bold text-[13px] tracking-[2px] text-gray-800 uppercase">
            Lễ Thành Hôn
          </span>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

        <div className="flex justify-end flex-col items-end gap-1 is-animation anim-fade-right">
          <p className="font-sans text-[14px] text-gray-600">14:00 - Chủ Nhật</p>
          <p className="font-sans font-bold text-[15px] text-gray-800 tracking-wider">14.12.2025</p>
          <p className="font-sans italic text-[12px] text-gray-400">
            (Tức Ngày 25 Tháng 10 Năm Ất Tỵ)
          </p>
          <p className="font-sans text-[14px] text-gray-600">Tại Tư Gia Nhà Trai</p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-gray-100 mx-6" />

      {/* ── TIỆC MỪNG LỄ THÀNH HÔN ── */}
      <section className="px-6 py-5">
        <div className="flex items-center gap-3 mb-4 is-animation anim-fade-down">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <span className="font-sans font-bold text-[13px] tracking-[2px] text-gray-800 uppercase">
            Tiệc Mừng Lễ Thành Hôn
          </span>
        </div>

        <div className="flex flex-col items-end gap-1 is-animation anim-fade-right">
          <p className="font-sans text-[14px] text-gray-600">18:00 - Chủ Nhật</p>
          <p className="font-sans font-bold text-[15px] text-gray-800 tracking-wider">14.12.2025</p>
          <p className="font-sans italic text-[12px] text-gray-400">
            (Tức Ngày 25 Tháng 10 Năm Ất Tỵ)
          </p>
          <p className="font-sans text-[14px] text-gray-600">Tại Adora Center – Phú Nhuận</p>
        </div>
      </section>

      {/* ── THÁNG 12 - 2025 Calendar ── */}
      <section className="px-5 pb-5 is-animation anim-zoom">
        <div className="border border-[#c5a880] rounded-none p-3">
          {/* Calendar Title */}
          <p className="text-center font-sans font-bold text-[13px] tracking-[2px] text-gray-700 mb-3 uppercase">
            Tháng 12 – 2025
          </p>
          {/* Day headers */}
          <div className="grid grid-cols-7 text-center mb-1">
            {["T2","T3","T4","T5","T6","T7","CN"].map((d) => (
              <div key={d} className="font-sans font-semibold text-[10px] text-gray-500 py-1">{d}</div>
            ))}
          </div>
          {/* Dates - Dec 2025: starts on Monday */}
          {[
            [1,2,3,4,5,6,7],
            [8,9,10,11,12,13,14],
            [15,16,17,18,19,20,21],
            [22,23,24,25,26,27,28],
            [29,30,31,null,null,null,null],
          ].map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 text-center">
              {week.map((day, di) => (
                <div key={di} className="py-1.5">
                  {day ? (
                    day === 14 ? (
                      <span className="relative inline-flex items-center justify-center w-7 h-7">
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg viewBox="0 0 28 28" className="w-7 h-7 text-[#7d1f2a]" fill="none">
                            <path d="M14 22s-7-5.5-7-10a7 7 0 0114 0c0 4.5-7 10-7 10z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </span>
                        <span className="relative font-sans font-bold text-[12px] text-[#7d1f2a]">{day}</span>
                      </span>
                    ) : (
                      <span className={`font-sans text-[11px] ${di === 6 ? 'font-bold text-gray-700' : 'text-gray-600'}`}>{day}</span>
                    )
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── ĐỊA ĐIỂM TỔ CHỨC ── */}
      <section className="pb-5">
        {/* Dark maroon header bar */}
        <div className="bg-[#7d1f2a] py-3 px-5 flex items-center gap-2 is-animation anim-fade-down">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="font-cormorant text-white font-semibold text-[16px] tracking-wide">
            Địa Điểm Tổ Chức
          </span>
        </div>

        <div className="px-5 pt-4 text-center">
          <div className="is-animation anim-fade-up">
            <p className="font-sans font-bold text-[13px] tracking-[2px] text-gray-800 uppercase mb-1">
              ADORA CENTER – PHÚ NHUẬN
            </p>
            <p className="font-sans text-[12px] text-gray-500 mb-4">
              431 Hoàng Văn Thụ, Phường 4, TP. Hồ Chí Minh
            </p>
          </div>

          {/* Map directions button */}
          <button
            onClick={handleOpenMap}
            className="bg-[#7d1f2a] hover:bg-[#8e0101] text-white font-sans font-semibold text-[13px] px-6 py-2 rounded-full transition-colors cursor-pointer mb-4 is-animation anim-bounce-up"
          >
            Xem Chỉ Đường
          </button>

          {/* Google Maps Embed */}
          <div className="w-full h-[200px] relative border border-gray-200 is-animation anim-zoom">
            <iframe
              title="Adora Center location"
              src="https://maps.google.com/maps?q=Adora+Center+Phu+Nhuan&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
