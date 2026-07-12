"use client";

import Image from "next/image";

interface TmdvHeroSectionProps {
  wedding: any;
  to?: string;
  animate?: boolean;
}

export default function TmdvHeroSection({ wedding, to, animate = true }: TmdvHeroSectionProps) {
  const groomName = wedding?.groom_name || "Minh Hoàng";
  const brideName = wedding?.bride_name || "Mai Hương";

  // Parse dynamic date & time
  let formattedTime = "18:00 - Chủ Nhật";
  let formattedDate = "14.12.2025";

  if (wedding?.event_date) {
    const d = new Date(wedding.event_date);
    formattedDate = d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).replace(/\//g, ".");

    const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
    const time = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    formattedTime = `${time} - ${weekday}`;
  }

  return (
    <section 
      id="w-20t4ngj1" 
      className="relative w-full h-[840px] overflow-hidden select-none bg-[length:100%_100%] bg-no-repeat"
      style={{
        backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
      }}
    >
      {/* Main Cover Picture */}
      <div 
        id="w-naxe79ho" 
        className="absolute top-[301px] left-[58px] w-[304px] h-[456px] z-10 border-[7px] border-[#8e0101] shadow-lg overflow-hidden"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1) rotate(0deg)" : "scale(0.9) rotate(-1.5deg)",
          transition: "opacity 1800ms cubic-bezier(0.16, 1, 0.3, 1), transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "200ms",
        }}
      >
        <Image
          src="/thiepmaudovang/images/cover.jpg"
          alt="Wedding Cover"
          fill
          priority
          sizes="300px"
          className="object-cover object-center"
        />
      </div>

      {/* Decorative Ornaments */}
      {/* Double Happiness Logo */}
      <div 
        id="w-lf6hdy88" 
        className="absolute top-[135px] left-[166.5px] w-[87px] h-[87px] z-10"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1)" : "scale(0.4)",
          transition: "opacity 1500ms cubic-bezier(0.16, 1, 0.3, 1), transform 1500ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "150ms",
        }}
      >
        <Image
          src="/thiepmaudovang/images/double-happiness.png"
          alt="Double Happiness"
          fill
          sizes="87px"
          className="object-contain"
        />
      </div>

      {/* Knot Deco Left */}
      <div 
        id="w-xvsp4zia" 
        className="absolute top-[178.75px] left-[19px] w-[87px] h-[87px] z-10"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateX(0) rotate(0deg)" : "translateX(-20px) rotate(-30deg)",
          transition: "opacity 1600ms cubic-bezier(0.16, 1, 0.3, 1), transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "300ms",
        }}
      >
        <Image
          src="/thiepmaudovang/images/knot-deco.png"
          alt="Knot Deco Left"
          fill
          sizes="87px"
          className="object-contain"
        />
      </div>

      {/* Knot Deco Right */}
      <div 
        id="w-7r4uk9mb" 
        className="absolute top-[178.75px] left-[312px] w-[87px] h-[87px] z-10"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateX(0) rotate(0deg)" : "translateX(20px) rotate(30deg)",
          transition: "opacity 1600ms cubic-bezier(0.16, 1, 0.3, 1), transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "300ms",
        }}
      >
        <Image
          src="/thiepmaudovang/images/knot-deco.png"
          alt="Knot Deco Right"
          fill
          sizes="87px"
          className="object-contain"
        />
      </div>

      {/* Cloud Corner bottom right */}
      <div 
        id="w-eyyclpyr" 
        className="absolute top-[723px] left-[303.5px] w-[117px] h-[117px] z-10"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1)" : "scale(0.5)",
          transition: "opacity 1800ms cubic-bezier(0.16, 1, 0.3, 1), transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "450ms",
        }}
      >
        <Image
          src="/thiepmaudovang/images/cloud-corner.png"
          alt="Cloud Corner"
          fill
          sizes="117px"
          className="object-contain"
        />
      </div>

      {/* Text Blocks */}
      {/* Title "THIỆP MỜI" */}
      <div 
        id="w-i3tjofn6" 
        className="absolute top-[41.5px] left-[83px] w-[254px] h-[30px] z-10 flex items-center justify-center font-cormorant text-[20px] tracking-[3px] text-black font-bold uppercase"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(-15px)",
          transition: "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), transform 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "100ms",
        }}
      >
        THIỆP MỜI
      </div>

      {/* Couple Name "Anh Tú - Diệu Nhi" */}
      <div 
        id="w-kb6stlwe" 
        className="absolute top-[80px] left-[17.5px] w-[385px] h-[60px] z-10 flex items-center justify-center font-sloop text-[40px] text-black text-center"
        style={{
          textShadow: "0px 4px 4px rgba(255, 255, 255, 1)",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 1800ms cubic-bezier(0.16, 1, 0.3, 1), transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "200ms",
        }}
      >
        {groomName} & {brideName}
      </div>

      {/* Time "18:00 - Chủ Nhật" */}
      <div 
        id="w-b38gb1ay" 
        className="absolute top-[222px] left-[83px] w-[254px] h-[22.5px] z-10 flex items-center justify-center font-sans text-[15px] text-black font-semibold tracking-wider text-center"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 1600ms cubic-bezier(0.16, 1, 0.3, 1), transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "300ms",
        }}
      >
        {formattedTime}
      </div>

      {/* Date "14.12.2025" */}
      <div 
        id="w-kcf30pvx" 
        className="absolute top-[244.5px] left-[83px] w-[254px] h-[33px] z-10 flex items-center justify-center font-sans text-[22px] font-bold text-black tracking-[7px] text-center"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 1600ms cubic-bezier(0.16, 1, 0.3, 1), transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "350ms",
        }}
      >
        {formattedDate}
      </div>

      {/* Invitation banner marquee or block */}
      <div 
        id="w-br89c4m5" 
        className="absolute top-[780px] left-[19px] w-[382px] h-[40px] z-10 flex flex-col items-center justify-center"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 1800ms cubic-bezier(0.16, 1, 0.3, 1), transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "500ms",
        }}
      >
        <div id="w-pq910b19" className="font-mightiest text-[22px] text-black leading-tight text-center">
          Trân Trọng Kính Mời: {to || "Quý Khách"}
        </div>
      </div>
    </section>
  );
}
