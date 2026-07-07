"use client";

import Image from "next/image";

export default function TmdvAnnouncementSection() {
  return (
    <section 
      id="w-9wu79djo" 
      className="relative w-full h-[714px] overflow-hidden select-none bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
      }}
    >
      {/* Ornaments */}
      {/* Happiness Header Decors */}
      <div id="w-zp11tpir" className="absolute top-[0px] left-[167px] w-[86px] h-[86px] z-10 is-animation anim-fade-down">
        <Image
          src="/thiepmaudovang/images/happiness-header.png"
          alt="Happiness Header"
          fill
          sizes="86px"
          className="object-contain"
        />
      </div>

      {/* Knot Deco */}
      <div id="w-dsdbdzxr" className="absolute top-[65px] left-[176px] w-[68px] h-[68px] z-10 is-animation anim-zoom">
        <Image
          src="/thiepmaudovang/images/knot-deco.png"
          alt="Knot Deco"
          fill
          sizes="68px"
          className="object-contain"
        />
      </div>

      {/* Nhà Trai info */}
      <div id="w-aqbkkztv" className="absolute top-[99px] left-[20px] w-[170px] h-[24px] z-10 flex items-center justify-center font-cafeta text-[16px] text-black text-center font-semibold is-animation anim-fade-left">
        NHÀ TRAI
      </div>

      <div id="w-vq47tj4t" className="absolute top-[123px] left-[20px] w-[170px] h-[48px] z-10 flex flex-col items-center justify-center font-cafeta text-[16px] text-black text-center leading-tight is-animation anim-fade-left">
        <span>ÔNG TRẦN QUỐC TUẤN</span>
        <span>BÀ LÊ THỊ MỸ DUYÊN</span>
      </div>

      <div id="w-y1s24e6p" className="absolute top-[171px] left-[20px] w-[170px] h-[19.5px] z-10 flex items-center justify-center font-sans text-[13px] text-black text-center is-animation anim-fade-left">
        Quận 4, TP. Hồ Chí Minh
      </div>

      {/* Nhà Gái info */}
      <div id="w-oj3482xm" className="absolute top-[99px] left-[230px] w-[170px] h-[24px] z-10 flex items-center justify-center font-cafeta text-[16px] text-black text-center font-semibold is-animation anim-fade-right">
        NHÀ GÁI
      </div>

      <div id="w-fynwgspj" className="absolute top-[122.98px] left-[230px] w-[170px] h-[48px] z-10 flex flex-col items-center justify-center font-cafeta text-[16px] text-black text-center leading-tight is-animation anim-fade-right">
        <span>ÔNG PHẠM GIA LONG</span>
        <span>BÀ NGUYỄN THỊ NGỌC HẠNH</span>
      </div>

      <div id="w-2wvcu7z3" className="absolute top-[171.48px] left-[230px] w-[170px] h-[19.5px] z-10 flex items-center justify-center font-sans text-[13px] text-black text-center is-animation anim-fade-right">
        Quận 8, TP. Hồ Chí Minh
      </div>

      {/* Announcement Headline */}
      <div id="w-7sjvq3be" className="absolute top-[243.5px] left-[29.5px] w-[361px] h-[25.5px] z-10 flex items-center justify-center font-mightiest text-[17px] text-black text-center is-animation anim-fade-up-rotate">
        Trân Trọng Báo Tin Lễ Thành Hôn Của
      </div>

      {/* Groom & Bride Calligraphy */}
      <div 
        id="w-mz04c43b" 
        className="absolute top-[273.5px] left-[20px] w-[380px] h-[60px] z-10 flex items-center justify-center font-sloop text-[40px] text-black text-center is-animation anim-bounce-up"
        style={{ textShadow: "0px 4px 4px rgba(255, 255, 255, 1)" }}
      >
        Trần Minh Hoàng
      </div>

      <div 
        id="w-ejxhihol" 
        className="absolute top-[326px] left-[141.5px] w-[137px] h-[43.5px] z-10 flex items-center justify-center font-cormorant text-[29px] text-black text-center is-animation anim-zoom"
        style={{ textShadow: "0px 4px 4px rgba(255, 255, 255, 1)" }}
      >
        &
      </div>

      <div 
        id="w-0vqn3fzh" 
        className="absolute top-[355px] left-[23.5px] w-[373px] h-[60px] z-10 flex items-center justify-center font-sloop text-[40px] text-black text-center is-animation anim-bounce-up"
        style={{ textShadow: "0px 4px 4px rgba(255, 255, 255, 1)" }}
      >
        Phạm Mai Hương
      </div>

      {/* Ceremony Photo */}
      <div id="w-bamvvrik" className="absolute top-[424.3px] left-[33px] w-[354px] h-[264px] z-10 border-[7px] border-[#8e0101] overflow-hidden shadow-md is-animation anim-zoom-rotate">
        <Image
          src="/thiepmaudovang/images/ceremony-photo.jpg"
          alt="Ceremony Portrait"
          fill
          sizes="350px"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
