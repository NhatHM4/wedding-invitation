"use client";

import Image from "next/image";

export default function TmdnAnnouncementSection() {
  return (
    <section className="relative w-full bg-white select-none px-5 pt-4 pb-2">
      {/* Top row: left text column + right red tag */}
      <div className="flex items-start justify-between">
        {/* Left: vertical line + family info */}
        <div className="flex gap-2 flex-1 is-animation anim-fade-left">
          <div className="w-[2px] bg-gray-300 self-stretch" />
          <div className="flex flex-col gap-3 py-1">
            {/* Nhà Trai */}
            <div>
              <p className="font-sans font-bold text-[10px] tracking-[2px] uppercase text-gray-600 mb-0.5">
                Nhà Trai
              </p>
              <p className="font-sans font-bold text-[11px] text-gray-800">ÔNG TRẦN QUỐC TUẤN</p>
              <p className="font-sans font-bold text-[11px] text-gray-800">BÀ LÊ THỊ MỸ DUYÊN</p>
              <p className="font-sans text-[10px] text-gray-500">Quận 4, TP. Hồ Chí Minh</p>
            </div>
            {/* Nhà Gái */}
            <div>
              <p className="font-sans font-bold text-[10px] tracking-[2px] uppercase text-gray-600 mb-0.5">
                Nhà Gái
              </p>
              <p className="font-sans font-bold text-[11px] text-gray-800">ÔNG PHẠM GIA LONG</p>
              <p className="font-sans font-bold text-[11px] text-gray-800">BÀ NGUYỄN THỊ NGỌC HẠNH</p>
              <p className="font-sans text-[10px] text-gray-500">Quận 8, TP. Hồ Chí Minh</p>
            </div>
          </div>
        </div>

        {/* Right: red hanging tag with 囍 */}
        <div className="flex flex-col items-center ml-3 mt-0 is-animation anim-fade-down">
          <div className="w-[70px] bg-[#7d1f2a] rounded-b-sm relative flex flex-col items-center pt-5 pb-4">
            {/* Tag hole */}
            <div className="absolute top-2 w-3 h-3 rounded-full bg-white/30 border border-white/60" />
            {/* 囍 character */}
            <span className="text-white text-[28px] leading-none font-sans font-bold">囍</span>
          </div>
        </div>
      </div>

      {/* Couple headline */}
      <div className="mt-6 text-center">
        <p className="font-sans text-[12px] tracking-wide text-gray-500 mb-2 is-animation anim-fade-up">
          Trân Trọng Báo Tin Lễ Thành Hôn Của
        </p>
        <h2 className="font-sloop text-[36px] text-gray-800 leading-tight is-animation anim-fade-left">Trần Minh Hoàng</h2>
        <p className="font-cormorant italic text-[20px] text-gray-400 my-1 is-animation anim-zoom">and</p>
        <h2 className="font-sloop text-[36px] text-gray-800 leading-tight is-animation anim-fade-right">Phạm Mai Hương</h2>
      </div>

      {/* Couple photo */}
      <div className="mt-5 w-full h-[250px] relative overflow-hidden is-animation anim-zoom">
        <Image
          src="/thiepmaudovang/images/gallery-1.jpg"
          alt="Couple Together"
          fill
          sizes="420px"
          className="object-cover object-top"
        />
        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-2 text-center">
          <p className="font-sans font-bold text-[10px] tracking-[3px] text-gray-700 uppercase">
            Thiệp Mời Tham Dự
          </p>
        </div>
      </div>
    </section>
  );
}
