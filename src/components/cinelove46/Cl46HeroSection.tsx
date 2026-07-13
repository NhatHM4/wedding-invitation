"use client";

import Image from "next/image";

interface Cl46HeroSectionProps {
  wedding?: any;
}

export default function Cl46HeroSection({ wedding }: Cl46HeroSectionProps) {
  const groomName = wedding?.groom_name || "Tuấn Linh";
  const brideName = wedding?.bride_name || "Nguyễn Phượng";

  return (
    <section className="relative w-full flex flex-col items-center bg-white">
      {/* Dark red top block */}
      <div className="w-full bg-[#5a1212] px-5 pt-8 pb-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-cormorant text-[15px] tracking-[5px] text-white/90 uppercase font-semibold mb-8">
          SAVE THE DATE
        </h2>

        {/* Arch Frame & Schedule Info Block */}
        <div className="w-full flex items-start gap-4 justify-between">
          {/* Arched Photo Frame */}
          <div className="relative w-[190px] aspect-[5/8] border-[3px] border-white/95 rounded-t-full overflow-hidden shadow-lg flex-shrink-0">
            {/* Arched Text: "I LOVE YOU" */}
            <div className="absolute inset-x-0 top-3 z-10 flex justify-center pointer-events-none">
              <svg viewBox="0 0 100 35" className="w-[120px] fill-white/80 font-cormorant font-bold uppercase tracking-[1.5px] text-[7.5px]">
                <path id="curve" d="M 10 30 A 40 40 0 0 1 90 30" fill="transparent" />
                <text className="text-center">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    I LOVE YOU
                  </textPath>
                </text>
              </svg>
            </div>

            <Image
              src="/thiepmaudovang/images/cover.jpg"
              alt="Arch Wedding Photo"
              fill
              priority
              sizes="190px"
              className="object-cover object-center"
            />
          </div>

          {/* Schedule Info */}
          <div className="flex-1 flex flex-col text-white pl-1 pr-1 pt-6 text-right">
            {/* Event 1 */}
            <div className="mb-6">
              <p className="font-barlow text-[10px] tracking-[2.5px] text-white/70 uppercase font-bold">
                THƯ MỜI TIỆC CƯỚI
              </p>
              <div className="w-8 h-[1px] bg-white/40 ml-auto my-1.5" />
              <p className="font-barlow text-[12px] font-semibold">THỨ BẢY - 16:30</p>
              <p className="font-cormorant text-[16px] font-bold tracking-wider mt-0.5">05 . 12 . 2025</p>
            </div>

            {/* Separator line */}
            <div className="w-full h-[0.5px] bg-white/20 my-2" />

            {/* Event 2 */}
            <div className="mt-4">
              <p className="font-barlow text-[10px] tracking-[2.5px] text-white/70 uppercase font-bold">
                LỄ THÀNH HÔN
              </p>
              <div className="w-8 h-[1px] bg-white/40 ml-auto my-1.5" />
              <p className="font-barlow text-[12px] font-semibold">CHỦ NHẬT - 12:00</p>
              <p className="font-cormorant text-[16px] font-bold tracking-wider mt-0.5">06 . 12 . 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Styled "WEDDING" Section Header right below the banner */}
      <div className="w-full py-8 text-center bg-white relative">
        <h1 className="font-cormorant text-[42px] tracking-[8px] text-[#5a1212]/90 uppercase font-light relative select-none">
          WEDD<span className="relative">I<span className="absolute -top-1 left-[1px] text-[18px]">✿</span></span>NG
        </h1>
        <p className="font-ephesis text-[24px] text-gray-500 font-medium leading-none -mt-2">
          {groomName} &amp; {brideName}
        </p>
      </div>
    </section>
  );
}
