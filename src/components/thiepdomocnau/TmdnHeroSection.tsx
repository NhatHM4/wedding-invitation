"use client";

import Image from "next/image";

export default function TmdnHeroSection() {
  return (
    <section className="relative w-full bg-white select-none flex flex-col items-center pt-10 pb-4">
      {/* Title */}
      <p className="font-cormorant text-[14px] tracking-[4px] text-gray-500 uppercase mb-3 is-animation anim-fade-down">
        Thiệp Mời Cưới
      </p>

      {/* Couple names in cursive */}
      <h1 className="font-sloop text-[30px] text-gray-800 text-center leading-tight mb-5 px-6 is-animation anim-fade-up">
        Minh Hoàng &amp; Mai Hương
      </h1>

      {/* Main couple photo - centered, slight border */}
      <div className="w-[300px] h-[400px] relative overflow-hidden shadow-sm is-animation anim-zoom">
        <Image
          src="/thiepmaudovang/images/ceremony-photo.jpg"
          alt="Wedding Couple"
          fill
          priority
          sizes="300px"
          className="object-cover object-center"
        />
      </div>

      {/* Date */}
      <div className="mt-6 font-cormorant text-[20px] tracking-[8px] text-gray-700 font-semibold is-animation anim-fade-up">
        14&nbsp;/&nbsp;12&nbsp;/&nbsp;2025
      </div>

      {/* Chevrons / scroll hint */}
      <div className="flex flex-col items-center mt-3 gap-0.5 text-gray-300 animate-bounce">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor"><path d="M1 1l5 5 5-5"/></svg>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor"><path d="M1 1l5 5 5-5"/></svg>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor"><path d="M1 1l5 5 5-5"/></svg>
      </div>
    </section>
  );
}
