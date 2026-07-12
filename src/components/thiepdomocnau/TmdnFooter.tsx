"use client";

import Image from "next/image";

export default function TmdnFooter() {
  return (
    <footer className="w-full bg-white select-none">
      {/* Full-width final couple photo */}
      <div className="w-full h-[450px] relative is-animation anim-zoom">
        <Image
          src="/thiepmaudovang/images/gallery-10.jpg"
          alt="Couple Final Portrait"
          fill
          sizes="420px"
          className="object-cover object-top"
        />
      </div>

      {/* Closing text */}
      <div className="px-6 py-6 text-center border-t border-gray-100 is-animation anim-fade-up">
        <p className="font-sans text-[13px] text-gray-500 mb-2">
          Rất hân hạnh được đón tiếp!
        </p>
        <p className="font-sloop text-[40px] text-gray-700 leading-none">Thank You</p>

        {/* Divider */}
        <div className="h-[1px] bg-gray-200 my-4" />

        {/* Attribution */}
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <span className="font-sans text-[10px] tracking-wider uppercase">
            | THIỆP CƯỚI ONLINE LONG THỊNH
          </span>
        </div>
      </div>
    </footer>
  );
}
