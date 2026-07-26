"use client";

import React from "react";

export default function Section2Foundation() {
  const foundationStatements = [
    {
      number: "01",
      code: "EL-01 / FOUNDATION",
      title: "Là chính mình",
      content: "Ở bên nhau, chúng mình được là chính mình.",
      annotation: "bình yên trong từng khoảnh khắc",
    },
    {
      number: "02",
      code: "EL-02 / ALIGNMENT",
      title: "Cùng một hướng",
      content: "Chúng mình không giống nhau, nhưng luôn nhìn về cùng một phía.",
      annotation: "tôn trọng và thấu hiểu",
    },
    {
      number: "03",
      code: "EL-03 / MEMORIES",
      title: "Giá trị thời gian",
      content: "Tình yêu không làm mọi ngày hoàn hảo, nhưng làm mọi ngày trở nên đáng nhớ.",
      annotation: "mỗi ngày là một viên gạch nhỏ",
    },
  ];

  return (
    <section id="foundation" className="relative w-full py-24 px-6 bg-[#F3EFE7] text-[#49372F] overflow-hidden border-t border-[#D8CABB]">
      {/* Architectural blueprint lines background */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="w-full h-full max-w-4xl mx-auto border-x border-dashed border-[#49372F] grid grid-cols-3">
          <div className="border-r border-dashed border-[#49372F]" />
          <div className="border-r border-dashed border-[#49372F]" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="inline-block font-sans text-xs tracking-widest uppercase text-[#A55D43] mb-2">
            SECTION 02 &middot; ARCHITECTURAL ELEVATION
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#49372F] tracking-tight">
            Nền Móng Của Ngôi Nhà
          </h2>
          <div className="w-16 h-[1px] bg-[#A55D43] mx-auto mt-4" />
        </div>

        {/* Foundation Statements (No Cards — Pure Architectural Text & Spacing) */}
        <div className="space-y-24">
          {foundationStatements.map((item, idx) => (
            <div
              key={item.number}
              className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${
                idx % 2 === 1 ? "md:flex-row-reverse text-right md:text-right" : "text-left"
              }`}
            >
              {/* Left/Right Elevation Code */}
              <div className="w-full md:w-1/3 flex flex-col">
                <span className="font-sans text-xs text-[#6F7461] tracking-widest uppercase font-semibold">
                  {item.code}
                </span>
                <span className="font-serif text-4xl text-[#D8CABB] font-light mt-1">
                  #{item.number}
                </span>
              </div>

              {/* Center Content & Fine Hairline */}
              <div className="w-full md:w-2/3 border-l-2 border-[#A55D43]/40 pl-6 py-1">
                <p className="font-serif text-xl md:text-2xl text-[#49372F] leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-handwriting text-lg text-[#A55D43]">
                    ~ {item.annotation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Foundation Architectural Beam Line */}
        <div className="mt-24 pt-8 border-t border-[#49372F]/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#6F7461]">
          <span>FOUNDATION COMPLETE</span>
          <span className="md:text-center">STRUCTURAL INTEGRITY: UNCONDITIONAL</span>
          <span className="md:text-right">SCALE 1:1 &middot; EST. 2025</span>
        </div>
      </div>
    </section>
  );
}
