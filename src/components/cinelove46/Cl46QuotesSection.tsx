"use client";

import Image from "next/image";

const block1Images = [
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
  "/thiepmaudovang/images/gallery-4.jpg",
  "/thiepmaudovang/images/gallery-5.jpg",
  "/thiepmaudovang/images/gallery-6.jpg"
];

export default function Cl46QuotesSection() {
  return (
    <section className="is-animation anim-fade-up w-full px-5 py-6 bg-white flex flex-col gap-8">
      {/* Quote Block 1: Side-by-side vertical split */}
      <div className="w-full flex items-stretch gap-3">
        {/* Left image */}
        <div className="relative w-1/2 aspect-[3/4] border border-gray-100 rounded overflow-hidden shadow-sm">
          <Image
            src={block1Images[0]}
            alt="Wedding portrait"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>

        {/* Right Quote card with dark red background */}
        <div className="w-1/2 bg-[#5a1212] rounded p-4 text-white flex flex-col justify-between shadow-sm">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded mb-3">
            <Image
              src={block1Images[1]}
              alt="Wedding portrait mini"
              fill
              sizes="150px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="font-barlow text-[10.5px] uppercase tracking-wider text-white/70 font-semibold mb-1">
              Dear Love
            </p>
            <h4 className="font-cormorant text-[15px] font-bold italic tracking-wide leading-snug">
              I love you all I can
            </h4>
          </div>
        </div>
      </div>

      {/* English small quote row */}
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 border-t border-[#e8ddd4]" />
        <p className="font-barlow text-[10.5px] italic text-gray-500 max-w-[280px] text-center leading-relaxed">
          "If I know what love is, it is because of you."
        </p>
        <div className="flex-1 border-t border-[#e8ddd4]" />
      </div>

      {/* Quote Block 2: Vietnamese quotation section header + 4 square cards grid */}
      <div className="w-full bg-[#5a1212] rounded p-5 text-white flex flex-col items-center shadow-sm">
        <span className="text-xl">❝</span>
        <p className="font-kechuyen text-[15px] tracking-wide leading-relaxed text-center italic max-w-[320px]">
          Hôn nhân là chuyện cả đời.
          <br />
          Yêu người vừa ý, Cưới người Mình thương.
        </p>
        <span className="text-xl mt-1">❞</span>
      </div>

      {/* 4 Square photos grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {block1Images.slice(2, 6).map((img, idx) => (
          <div key={idx} className="relative w-full aspect-square border border-gray-100 rounded overflow-hidden shadow-sm">
            <Image
              src={img}
              alt={`Couples gallery ${idx}`}
              fill
              sizes="180px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* With You Quote row */}
      <div className="w-full text-center py-4 relative flex flex-col items-center">
        <h3 className="font-cormorant text-[28px] tracking-[6px] text-[#5a1212]/80 uppercase font-light">
          WITH YOU
        </h3>
        <p className="font-barlow text-[11px] text-gray-500 max-w-[300px] leading-relaxed mt-2 select-none">
          Every moment of each day, loving and missing you dominates every inch of my brain.
        </p>
      </div>

      {/* Bottom Quote Banner */}
      <div className="w-full bg-[#5a1212] rounded p-4 text-white text-center shadow-sm flex flex-col items-center">
        <p className="font-barlow text-[11px] italic tracking-wide text-white/90">
          "You make me want to be a better man."
        </p>
        <p className="font-barlow text-[10px] text-white/70 uppercase tracking-[1.5px] mt-2.5">
          Em khiến anh muốn trở thành phiên bản tốt nhất của chính mình.
        </p>
      </div>
    </section>
  );
}
