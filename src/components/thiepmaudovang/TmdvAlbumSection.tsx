"use client";

import Image from "next/image";

export default function TmdvAlbumSection() {
  return (
    <div className="w-full flex flex-col">
      {/* Subsection 1 (#w-4vfmj0g5) */}
      <section 
        id="w-4vfmj0g5" 
        className="relative w-full h-[344px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        {/* Title "Album hình cưới" */}
        <div id="w-8job6w7j" className="absolute top-[0px] left-[20.5px] w-[185px] h-[48px] z-10 flex items-center justify-center font-ephesis text-[28px] text-black is-animation anim-fade-up">
          Album hình cưới
        </div>

        {/* Ribbon divider */}
        <div id="w-y4blj2tv" className="absolute top-[6.5px] left-[214.5px] w-[165px] h-[35px] z-10 overflow-hidden is-animation anim-fade-down">
          <div className="relative w-full h-[166px] top-[-63px]">
            <Image
              src="/thiepmaudovang/images/ribbon-divider.png"
              alt="Ribbon Divider"
              fill
              sizes="165px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Gallery Image 1 */}
        <div id="w-6lu0wbie" className="absolute top-[54px] left-[20px] w-[187px] h-[280px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-left">
          <Image
            src="/thiepmaudovang/images/gallery-1.jpg"
            alt="Gallery 1"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>

        {/* Gallery Image 2 */}
        <div id="w-72dy145n" className="absolute top-[54px] left-[212.5px] w-[187px] h-[280px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-right">
          <Image
            src="/thiepmaudovang/images/gallery-2.jpg"
            alt="Gallery 2"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Subsection 2 (#w-ygrcn8t3) */}
      <section 
        id="w-ygrcn8t3" 
        className="relative w-full h-[281px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        {/* Gallery Image 3 (Left) */}
        <div id="w-xwi8ol3i" className="absolute top-[0.5px] left-[20px] w-[187px] h-[280px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-left">
          <Image
            src="/thiepmaudovang/images/gallery-3.jpg"
            alt="Gallery 3"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>

        {/* Gallery Image 4 (Right Top) */}
        <div id="w-cmhlzttx" className="absolute top-[16px] left-[212px] w-[187px] h-[121px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-right">
          <Image
            src="/thiepmaudovang/images/gallery-4.jpg"
            alt="Gallery 4"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>

        {/* Gallery Image 5 (Right Bottom) */}
        <div id="w-ckr5z4rp" className="absolute top-[144px] left-[212px] w-[187px] h-[121px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-right">
          <Image
            src="/thiepmaudovang/images/gallery-5.jpg"
            alt="Gallery 5"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Subsection 3 (#w-cc4bj8rx) */}
      <section 
        id="w-cc4bj8rx" 
        className="relative w-full h-[284px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        {/* Gallery Image 6 */}
        <div id="w-jz06t4of" className="absolute top-[2px] left-[20px] w-[187px] h-[280px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-left">
          <Image
            src="/thiepmaudovang/images/gallery-6.jpg"
            alt="Gallery 6"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>

        {/* Gallery Image 7 */}
        <div id="w-t2d2w5ro" className="absolute top-[0.5px] left-[212.5px] w-[187px] h-[280px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-right">
          <Image
            src="/thiepmaudovang/images/gallery-7.jpg"
            alt="Gallery 7"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Subsection 4 (#w-o51lkyoy) */}
      <section 
        id="w-o51lkyoy" 
        className="relative w-full h-[284px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        {/* Gallery Image 8 */}
        <div id="w-o7ncho16" className="absolute top-[2px] left-[20px] w-[187px] h-[280px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-left">
          <Image
            src="/thiepmaudovang/images/gallery-8.jpg"
            alt="Gallery 8"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>

        {/* Gallery Image 9 */}
        <div id="w-u4yp1226" className="absolute top-[0.5px] left-[212.5px] w-[187px] h-[280px] z-10 overflow-hidden shadow-sm border border-gray-100 is-animation anim-fade-right">
          <Image
            src="/thiepmaudovang/images/gallery-9.jpg"
            alt="Gallery 9"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
