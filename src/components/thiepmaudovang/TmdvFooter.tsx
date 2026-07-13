"use client";

import Image from "next/image";

interface TmdvFooterProps {
  wedding: any;
}

export default function TmdvFooter({ wedding }: TmdvFooterProps) {
  return (
    <div className="w-full flex flex-col">
      {/* Greeting Subsection (#w-hcf6fbgo) */}
      <section
        id="w-hcf6fbgo"
        className="relative w-full h-[630px] overflow-hidden select-none"
      >
        {/* Main Background Image (gallery-10.jpg) */}
        <div id="w-l2pipleo" className="absolute inset-0 z-0">
          <Image
            src="/thiepmaudovang/images/gallery-10.jpg"
            alt="Couple Ending Portrait"
            fill
            sizes="420px"
            className="object-cover object-center"
          />
        </div>

        {/* Decorative Overlay Card at bottom */}
        <div
          id="w-sram9ddz"
          className="absolute bottom-[20px] left-[11px] w-[397px] h-[155px] z-10 flex flex-col items-center justify-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/thiepmaudovang/images/footer-bg.png')"
          }}
        >
          {/* Greeting Text */}
          <div
            id="w-diquci3b"
            className="w-full text-center font-ephesis text-[24px] text-[#7d1f2a] tracking-wide mt-12"
          >
            Rất hân hạnh được đón tiếp!
          </div>
        </div>
      </section>

      {/* Copyright & Social/QR Subsection (#w-ypnwoxuo) */}
      <footer
        id="w-ypnwoxuo"
        className="relative w-full h-[120px] overflow-hidden bg-[#7d1f2a] text-white flex flex-col items-center justify-between py-4 select-none"
      >
        {/* Logo Deco */}
        <div className="w-[30px] h-[30px] relative">
          <Image
            src="/thiepmaudovang/images/logo-deco.png"
            alt="Logo Deco"
            fill
            sizes="30px"
            className="object-contain filter invert"
          />
        </div>

        {/* QR Codes for Groom and Bride */}
        <div className="flex items-center gap-6 my-1">
          {/* Groom QR */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-[36px] h-[36px] bg-white p-0.5 rounded shadow-sm relative">
              <Image
                src="/thiepmaudovang/images/qr-groom.png"
                alt="Groom QR"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="text-[9px] opacity-80">Chú Rể</span>
          </div>

          {/* Bride QR */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-[36px] h-[36px] bg-white p-0.5 rounded shadow-sm relative">
              <Image
                src="/thiepmaudovang/images/qr-bride.png"
                alt="Bride QR"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="text-[9px] opacity-80">Cô Dâu</span>
          </div>
        </div>

        {/* Copyright Text */}
        <div
          id="w-223ghpu1"
          className="text-center font-sans text-[10px] opacity-60 tracking-wider font-medium uppercase"
        >
          THIỆP CƯỚI ONLINE HẠNH PHÚC
        </div>
      </footer>
    </div>
  );
}
