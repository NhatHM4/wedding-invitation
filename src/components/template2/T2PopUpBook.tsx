"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import Image from "next/image";
import { Wedding, Wish } from "@/types";
import { popUpSynth } from "./T2PopUpSynth";
import T2WatercolorRSVP from "./T2WatercolorRSVP";
import T2GalleryLightbox from "./T2GalleryLightbox";

interface T2PopUpBookProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onOpen: () => void;
  to: string;
  wedding: Wedding;
  wishes: Wish[];
  onGiftOpen: () => void;
}

export default function T2PopUpBook({
  currentPage,
  onPageChange,
  onOpen,
  to,
  wedding,
  wishes,
  onGiftOpen,
}: T2PopUpBookProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Smooth springs for tilt/parallax values
  const springX = useSpring(0, { stiffness: 90, damping: 20 });
  const springY = useSpring(0, { stiffness: 90, damping: 20 });

  // Handle Parallax tilting via mouse/gyroscope on Page 1
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (currentPage !== 1) return;
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 35;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 35;
      springX.set(xOffset);
      springY.set(yOffset);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (currentPage !== 1) return;
      const xOffset = e.gamma ? Math.max(-30, Math.min(30, e.gamma)) * 0.8 : 0;
      const yOffset = e.beta ? Math.max(-30, Math.min(30, e.beta - 45)) * 0.8 : 0;
      springX.set(xOffset);
      springY.set(yOffset);
    };

    window.addEventListener("mousemove", handleMouseMove);
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [currentPage, springX, springY]);

  useEffect(() => {
    const unsubscribeX = springX.on("change", (latest) => setTilt((prev) => ({ ...prev, x: latest })));
    const unsubscribeY = springY.on("change", (latest) => setTilt((prev) => ({ ...prev, y: latest })));
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springX, springY]);

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    if (!wedding.event_date) return;
    const eventTime = new Date(wedding.event_date).getTime();
    const updateCountdown = () => {
      const now = Date.now();
      const diff = eventTime - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [wedding.event_date]);

  // Click handler that turns pages based on click position
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activePhoto) {
      return;
    }
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("a") ||
      target.closest("iframe") ||
      target.closest(".interactive")
    ) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width * 0.22) {
      if (currentPage > 1) {
        popUpSynth.playPageFlip();
        onPageChange(currentPage - 1);
      }
    } else {
      if (currentPage === 0) {
        onOpen();
      } else if (currentPage < 9) {
        popUpSynth.playPageFlip();
        onPageChange(currentPage + 1);
      }
    }
  };

  // 3D corner-peeling paper curve variants
  const flipVariants: any = {
    initial: {
      rotateY: 85,
      rotateZ: 8,
      scaleX: 0.9,
      skewY: -5,
      opacity: 0,
      z: -30,
    },
    animate: {
      rotateY: 0,
      rotateZ: 0,
      scaleX: 1,
      skewY: 0,
      opacity: 1,
      z: 0,
      transition: {
        duration: 0.95,
        ease: [0.25, 1, 0.4, 1],
      },
    },
    exit: {
      rotateY: -85,
      rotateZ: -8,
      scaleX: 0.9,
      skewY: 5,
      opacity: 0,
      z: -30,
      transition: {
        duration: 0.85,
        ease: [0.25, 0, 0.7, 0],
      },
    },
  };

  // SVG Cutouts
  const CathedralLayer = () => (
    <svg className="w-56 h-36 drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)]" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 10 L108 30 H92 Z" fill="#b5c9c3" />
      <rect x="97" y="30" width="6" height="40" fill="#b5c9c3" />
      <path d="M70 70 L100 50 L130 70 Z" fill="#93a8ac" />
      <rect x="75" y="70" width="50" height="50" fill="#d2dedb" />
      <path d="M90 120 C90 105 110 105 110 120 Z" fill="#586f7c" />
      <rect x="50" y="80" width="20" height="40" fill="#cad5d2" />
      <path d="M50 80 L60 65 L70 80 Z" fill="#93a8ac" />
      <rect x="130" y="80" width="20" height="40" fill="#cad5d2" />
      <path d="M130 80 L140 65 L150 80 Z" fill="#93a8ac" />
      <circle cx="100" cy="78" r="8" fill="#586f7c" />
    </svg>
  );

  const ForestLayer = () => (
    <svg className="w-64 h-24 opacity-95 drop-shadow-[0_4px_6px_rgba(0,0,0,0.08)]" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 100 C40 60 70 50 70 30 C70 50 100 60 100 100 Z" fill="#84a98c" />
      <path d="M30 110 C30 80 55 70 55 50 C55 70 80 80 80 110 Z" fill="#52796f" opacity="0.85" />
      <path d="M220 100 C220 50 250 40 250 20 C250 40 280 50 280 100 Z" fill="#84a98c" />
      <path d="M240 110 C240 70 265 60 265 40 C265 60 290 70 290 110 Z" fill="#354f52" opacity="0.9" />
      <path d="M0 105 Q60 95 120 105 T240 105 T300 105" stroke="#84a98c" strokeWidth="3" fill="none" />
    </svg>
  );

  const CoupleArchLayer = () => (
    <svg className="w-56 h-36 drop-shadow-[0_5px_10px_rgba(0,0,0,0.12)]" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 130 C40 40 160 40 160 130" stroke="#f08080" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M45 130 C45 50 155 50 155 130" stroke="#fbc5c5" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="45" r="7" fill="#f08080" />
      <circle cx="70" cy="65" r="6" fill="#f4978e" />
      <circle cx="130" cy="65" r="6" fill="#f4978e" />
      <circle cx="52" cy="95" r="6" fill="#f08080" />
      <circle cx="148" cy="95" r="6" fill="#f08080" />
      <path d="M85 50 Q90 40 95 50 Z" fill="#84a98c" />
      <path d="M110 50 Q105 40 100 50 Z" fill="#84a98c" />
      <path d="M82 130 L82 92 C82 90 85 88 88 88 C91 88 94 90 94 92 L94 130 Z" fill="#2f3e46" />
      <circle cx="88" cy="80" r="5" fill="#2f3e46" />
      <path d="M102 130 C102 105 118 105 118 130 Z" fill="#e5989b" />
      <path d="M106 130 L108 94 C108 92 110 90 113 90 C116 90 118 92 118 94 L114 130 Z" fill="#6d597a" />
      <circle cx="113" cy="82" r="4.5" fill="#6d597a" />
      <path d="M113 85 L124 100 L118 108" stroke="#e5989b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );

  return (
    <div
      onClick={handlePageClick}
      className="relative w-full h-full min-h-[92vh] flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: "1500px" }}
    >
      {/* Side indicators */}
      {currentPage > 0 && (
        <>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/25 border border-white/40 flex items-center justify-center text-gray-500 font-sans text-xs select-none pointer-events-none opacity-40 z-40 animate-pulse">
            ‹
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/25 border border-white/40 flex items-center justify-center text-gray-500 font-sans text-xs select-none pointer-events-none opacity-40 z-40 animate-pulse">
            ›
          </div>
        </>
      )}

      {/* 3D Page Frame Wrapper */}
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic shadow overlay sweep */}
        {currentPage > 0 && (
          <motion.div
            key={`shadow-${currentPage}`}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: [0, 0.45, 0], x: ["100%", "0%", "-100%"] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/15 to-transparent pointer-events-none z-30"
          />
        )}

        <AnimatePresence mode="wait" initial={false}>

          {/* PAGE 0: SKETCHBOOK CLOSED COVER */}
          {currentPage === 0 && (
            <motion.div
              key="cover"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#5c3d2e] border-8 border-double border-[#3d251e] rounded-3xl shadow-[10px_20px_45px_rgba(0,0,0,0.6)] flex flex-col justify-between items-center p-8 py-10 text-center overflow-hidden z-20"
              style={{
                transformOrigin: "left center",
                backgroundImage: `radial-gradient(circle, rgba(110,75,56,0.98) 50%, rgba(61,37,30,1) 100%)`,
              }}
            >
              {/* Corner ornaments */}
              <div className="absolute inset-5 border-4 border-double border-yellow-600/35 rounded-xl pointer-events-none" />
              <div className="absolute top-3 left-3 w-12 h-12 border-t-4 border-l-4 border-yellow-600/50 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-12 h-12 border-t-4 border-r-4 border-yellow-600/50 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-12 h-12 border-b-4 border-l-4 border-yellow-600/50 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-12 h-12 border-b-4 border-r-4 border-yellow-600/50 rounded-br-lg" />

              {/* Header block */}
              <div className="w-full flex flex-col items-center gap-1 mt-4 z-10">
                <span className="text-[10px] uppercase tracking-[0.5em] text-yellow-400/80 font-cyber">
                  ✦ WEDDING INVITATION ✦
                </span>
                <div className="h-[1.5px] w-16 bg-yellow-600/50 my-2" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-yellow-500/70 font-cyber font-bold">
                  ★ INVITATION CARD ★
                </span>
              </div>

              {/* Central medallion with OUR LOVE */}
              <div className="relative w-52 h-52 flex items-center justify-center my-1 z-10">
                <div className="absolute inset-0 border-2 border-dashed border-yellow-600/25 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-3 border border-yellow-600/15 rounded-full" />
                <div className="absolute inset-2 bg-gradient-to-tr from-[#fbc5c5]/20 via-transparent to-[#fae588]/10 rounded-full blur-sm" />
                <div className="flex flex-col items-center gap-0">
                  <span className="text-yellow-500/60 font-cyber text-[8px] tracking-[0.4em] uppercase mb-1">Our</span>
                  <h1 className="font-serif-lux text-6xl font-extrabold text-white tracking-widest drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] leading-none">
                    LOVE
                  </h1>
                  <span className="text-yellow-500/60 font-cyber text-[8px] tracking-[0.4em] uppercase mt-1">Story</span>
                </div>
              </div>

              {/* Couple names */}
              <div className="w-full flex flex-col items-center gap-1 z-10 mb-1">
                <div className="flex items-center gap-2 w-full justify-center">
                  <div className="h-[1px] flex-1 bg-yellow-600/30" />
                  <span className="text-yellow-400/70 text-[9px] font-cyber uppercase tracking-widest px-2">Lễ Thành Hôn</span>
                  <div className="h-[1px] flex-1 bg-yellow-600/30" />
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-handwritten text-xl text-white/90 font-bold tracking-wide drop-shadow-sm">
                    {wedding.groom_name}
                  </span>
                  <span className="text-yellow-500 text-lg font-serif-lux italic">&</span>
                  <span className="font-handwritten text-xl text-white/90 font-bold tracking-wide drop-shadow-sm">
                    {wedding.bride_name}
                  </span>
                </div>
                {/* Wedding date badge */}
                <div className="flex items-center gap-2 mt-1.5 bg-yellow-600/15 border border-yellow-600/25 rounded-lg px-4 py-1.5">
                  <span className="text-yellow-400 text-[9px] font-cyber tracking-widest uppercase">📅</span>
                  <span className="text-yellow-300 font-bold text-[11px] font-cyber tracking-wider">10 . 10 . 2026</span>
                </div>
              </div>

              {/* Guest name box */}
              <div className="flex flex-col gap-1 text-[11px] text-yellow-500 bg-yellow-600/10 border-2 border-yellow-600/20 rounded-xl px-6 py-3 font-cyber z-10 w-full max-w-[270px]">
                <span className="text-yellow-600/60 uppercase tracking-widest text-[9px]">Trân trọng kính mời:</span>
                <span className="text-white font-extrabold tracking-widest text-[13px] block">{to.toUpperCase()}</span>
              </div>

              <span className="text-[9px] tracking-[0.3em] text-yellow-600/60 uppercase animate-pulse mb-1">
                - CHẠM VÀO SÁCH ĐỂ LẬT MỞ -
              </span>
            </motion.div>
          )}


          {/* PAGE 1: 3D POP-UP GREETING */}
          {currentPage === 1 && (
            <motion.div
              key="popup-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#fdfdfc] border-4 border-[#e9e6df] rounded-2xl shadow-2xl p-6 py-10 flex flex-col justify-between items-center text-center overflow-hidden"
              style={{
                transformOrigin: "left center",
                backgroundImage: `linear-gradient(to right, #f7f6f0 0%, #fdfdfc 15%, #fbfbf8 100%)`,
              }}
            >
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#fde2e4]/15 rounded-br-full blur-lg pointer-events-none" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fae588]/10 rounded-bl-full blur-lg pointer-events-none" />

              <div className="w-full mt-2 z-10 flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#f08080] font-bold font-cyber">
                  // TIN HỶ THÀNH HÔN //
                </span>
                <div className="h-[1px] w-12 bg-[#f08080]/30 mx-auto mt-1" />
              </div>

              {/* 3D Pop-Up Assembly */}
              <div
                className="relative w-full h-44 flex justify-center items-end pointer-events-none mt-2 select-none"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  style={{
                    transformOrigin: "bottom center",
                    transformStyle: "preserve-3d",
                    transform: `translate3d(${tilt.x * -0.22}px, ${tilt.y * -0.22}px, -30px) rotateX(0deg)`,
                    bottom: "20px",
                  }}
                  className="absolute z-1"
                >
                  <CathedralLayer />
                </div>
                <div
                  style={{
                    transformOrigin: "bottom center",
                    transformStyle: "preserve-3d",
                    transform: `translate3d(${tilt.x * -0.06}px, ${tilt.y * -0.06}px, -15px) rotateX(0deg)`,
                    bottom: "10px",
                  }}
                  className="absolute z-2"
                >
                  <ForestLayer />
                </div>
                <div
                  style={{
                    transformOrigin: "bottom center",
                    transformStyle: "preserve-3d",
                    transform: `translate3d(${tilt.x * 0.14}px, ${tilt.y * 0.14}px, 10px) rotateX(0deg)`,
                    bottom: "0px",
                  }}
                  className="absolute z-3"
                >
                  <CoupleArchLayer />
                </div>
              </div>

              <div className="flex flex-col gap-2.5 z-10 w-full px-2 mb-2 flex-1 justify-center">
                <span className="text-[11px] text-gray-400 tracking-widest uppercase">Trân trọng kính báo Lễ Thành Hôn của</span>

                <div className="flex flex-col gap-1.5 font-serif-lux">
                  <h2 className="text-4xl font-extrabold text-gray-800 tracking-wider">
                    {wedding.groom_name}
                  </h2>
                  <span className="text-sm italic text-[#f08080] font-bold leading-none">&</span>
                  <h2 className="text-4xl font-extrabold text-gray-800 tracking-wider">
                    {wedding.bride_name}
                  </h2>
                </div>

                <p className="text-[17px] font-handwritten italic text-gray-500 leading-relaxed max-w-[280px] mx-auto mt-4 border-t border-gray-100 pt-4">
                  &ldquo;Khi ta mở lòng đón nhận tình yêu, thế giới xung quanh sẽ tự khắc loang tràn những sắc màu rực rỡ nhất.&rdquo;
                </p>

                <div className="relative w-16 h-16 rounded-full border-2 border-[#fbc5c5] overflow-hidden shadow-md mx-auto mt-4">
                  <Image
                    src="/thiepmaudovang/images/cover.jpg"
                    alt="Couple Circle Portrait Decal"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* PAGE 2: GROOM INTRO */}
          {currentPage === 2 && (
            <motion.div
              key="groom-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#fdfdfc] border-4 border-[#e9e6df] rounded-2xl shadow-2xl flex flex-col justify-between items-center text-center overflow-hidden"
              style={{
                transformOrigin: "left center",
                backgroundImage: `linear-gradient(to right, #f7f6f0 0%, #fdfdfc 15%, #fbfbf8 100%)`,
              }}
            >
              <div className="relative w-full h-[66%] overflow-hidden border-b-4 border-[#e9e6df] shadow-md">
                <Image
                  src="/thiepmaudovang/images/gallery-2.jpg"
                  alt="Chú Rể Minh Hoàng Portrait"
                  fill
                  sizes="(max-width: 440px) 100vw, 440px"
                  className="object-cover brightness-95 saturate-[0.9]"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center items-center gap-1.5 p-6 z-10 w-full bg-[#fcfcf9] relative">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#84a98c] font-bold font-cyber">
                  // THE GROOM //
                </span>
                <h2 className="font-serif-lux text-4xl font-extrabold text-gray-800 tracking-wider">
                  {wedding.groom_name.toUpperCase()}
                </h2>
                <span className="text-[13px] font-bold text-gray-400 font-cyber">
                  12 . 04 . 1998
                </span>
                <p className="text-[18px] font-handwritten italic text-gray-600 leading-relaxed max-w-[280px] mx-auto mt-2 border-t border-gray-100 pt-2">
                  &ldquo;Anh ước mình là nét vẽ màu nước nhẹ nhàng, tô điểm thêm hạnh phúc ngọt ngào cho thế giới của em.&rdquo;
                </p>
              </div>
            </motion.div>
          )}

          {/* PAGE 3: BRIDE INTRO */}
          {currentPage === 3 && (
            <motion.div
              key="bride-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#fdfdfc] border-4 border-[#e9e6df] rounded-2xl shadow-2xl flex flex-col justify-between items-center text-center overflow-hidden"
              style={{
                transformOrigin: "left center",
                backgroundImage: `linear-gradient(to right, #f7f6f0 0%, #fdfdfc 15%, #fbfbf8 100%)`,
              }}
            >
              <div className="relative w-full h-[66%] overflow-hidden border-b-4 border-[#e9e6df] shadow-md">
                <Image
                  src="/thiepmaudovang/images/gallery-1.jpg"
                  alt="Cô Dâu Mai Hương Portrait"
                  fill
                  sizes="(max-width: 440px) 100vw, 440px"
                  className="object-cover brightness-95 saturate-[0.9]"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center items-center gap-1.5 p-6 z-10 w-full bg-[#fcfcf9] relative">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#f08080] font-bold font-cyber">
                  // THE BRIDE //
                </span>
                <h2 className="font-serif-lux text-4xl font-extrabold text-gray-800 tracking-wider">
                  {wedding.bride_name.toUpperCase()}
                </h2>
                <span className="text-[13px] font-bold text-gray-400 font-cyber">
                  20 . 08 . 2001
                </span>
                <p className="text-[18px] font-handwritten italic text-gray-600 leading-relaxed max-w-[280px] mx-auto mt-2 border-t border-gray-100 pt-2">
                  &ldquo;Gặp gỡ anh là sự sắp đặt diệu kỳ của số phận, ở bên anh là chặng đường ngọt ngào nhất cuộc đời em.&rdquo;
                </p>
              </div>
            </motion.div>
          )}

          {/* PAGE 4: LOVE STORY (ENLARGED LANDSCAPE PHOTO & HEART-CIRCLED CALENDAR GRID) */}
          {currentPage === 4 && (
            <motion.div
              key="lovestory-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full p-4 sm:p-5 flex items-center justify-center"
              style={{
                transformOrigin: "left center",
              }}
            >
              <div className="absolute inset-4 bg-[#f5f4ed] border-2 border-[#dfdbcf] rounded-2xl rotate-2 shadow-md z-0" />
              <div className="absolute inset-4 bg-[#faf9f3] border-2 border-[#e6e2d3] rounded-2xl -rotate-2 shadow-md z-1" />

              <div
                className="relative w-full h-full bg-[#fefefe] border-2 border-gray-300/80 rounded-2xl shadow-[5px_5px_25px_rgba(0,0,0,0.12)] p-5 py-7 flex flex-col justify-between items-center text-center overflow-hidden z-10 rotate-[0.5deg]"
                style={{
                  backgroundImage: "repeating-linear-gradient(#fefefe, #fefefe 27px, #eef2f5 28px)",
                  lineHeight: "28px",
                }}
              >
                <div className="absolute left-3.5 top-0 bottom-0 w-2 flex flex-col justify-around py-8 z-20 pointer-events-none">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-3.5 h-3 bg-[#f3f3eb] border border-gray-300 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.18)]"
                    />
                  ))}
                </div>

                <div className="w-full text-center z-10 flex flex-col gap-0.5 mt-1" style={{ lineHeight: "normal" }}>
                  <span className="text-[23px] font-handwritten text-[#f08080] font-bold">
                    Our Love Story
                  </span>
                  <div className="h-[2px] w-16 bg-[#f08080]/30 mx-auto mt-1" />
                </div>

                {/* 1. SIGNIFICANTLY ENLARGED LANDSCAPE PHOTO (picture 1 request) */}
                <div className="relative w-[94%] h-38 sm:h-40 rounded-xl overflow-hidden shadow-md border border-gray-200/50 mt-2 shrink-0 z-10">
                  <Image
                    src="/thiepmaudovang/images/gallery-3.jpg"
                    alt="Love Story Landscape Decor Enlarged"
                    fill
                    sizes="400px"
                    className="object-cover brightness-95 saturate-[0.85]"
                  />
                </div>

                {/* Story text */}
                <div className="flex-1 flex items-center justify-center px-2 py-1 z-10 relative mt-2">
                  <p
                    className="text-[17px] sm:text-[18px] text-gray-700 font-handwritten text-left leading-[28px] font-bold tracking-wide"
                    style={{ textIndent: "1.2rem" }}
                  >
                    Giữa muôn vàn gặp gỡ, chúng mình may mắn tìm thấy nhau. Từ những ngày đầu bỡ ngỡ, qua bao vui buồn và thử thách, tình yêu vẫn lớn dần, hóa thành sự thấu hiểu và đồng hành. Hóa ra hạnh phúc chẳng phải điều xa xôi, mà là có một người để cùng sẻ chia, cùng nắm tay đi hết chặng đường dài phía trước.
                  </p>
                </div>

                {/* 2. SIGNIFICANTLY ENLARGED CALENDAR GRID (picture 1 request) */}
                <div className="w-[94%] bg-white/70 border border-gray-200/80 rounded-xl p-3 mt-2 shadow-sm font-cyber shrink-0 flex flex-col items-center z-10" style={{ lineHeight: "normal" }}>
                  <span className="text-[10.5px] font-bold text-[#f08080] mb-1.5 font-sans tracking-wide">Tháng 10 / 2026</span>
                  <div className="grid grid-cols-7 gap-x-2.5 gap-y-1 text-[9px] text-gray-500 text-center w-full max-w-[210px] font-sans">
                    <span className="font-extrabold text-gray-400">T2</span>
                    <span className="font-extrabold text-gray-400">T3</span>
                    <span className="font-extrabold text-gray-400">T4</span>
                    <span className="font-extrabold text-gray-400">T5</span>
                    <span className="font-extrabold text-gray-400">T6</span>
                    <span className="font-extrabold text-[#f08080]">T7</span>
                    <span className="font-extrabold text-[#f08080]">CN</span>
                    <span></span><span></span><span></span>
                    {Array.from({ length: 31 }).map((_, i) => {
                      const dayNum = i + 1;
                      const isWeddingDay = dayNum === 10;
                      return (
                        <span
                          key={dayNum}
                          className={`flex items-center justify-center w-[18px] h-[18px] rounded-full font-bold relative text-[10px] ${isWeddingDay
                              ? "text-white bg-[#f08080] shadow-[0_2px_4px_rgba(240,128,128,0.55)] scale-120"
                              : "text-gray-600"
                            }`}
                        >
                          {dayNum}
                          {isWeddingDay && (
                            <span className="absolute -top-1 -right-1.5 text-[5px] text-[#f08080] animate-ping">❤</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full text-center pl-6 pr-2 z-10 mt-3 pt-2 border-t border-dashed border-gray-200" style={{ lineHeight: "normal" }}>
                  <p className="text-[15px] text-[#f08080] font-handwritten italic font-bold leading-normal">
                    &ldquo;Chúng mình đã gặp nhau giữa dòng đời hối hả như thế đó...&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* PAGE 5: PARENTS & SIDE-BY-SIDE FAMILY INFO (RESTRUCTURED TO MATCH PICTURE 2 EXACTLY + BANNER PHOTO) */}
          {currentPage === 5 && (
            <motion.div
              key="parents-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#fdfdfc] border-4 border-[#e9e6df] rounded-2xl shadow-2xl p-6 py-10 flex flex-col justify-between items-center text-center overflow-hidden"
              style={{
                transformOrigin: "left center",
                backgroundImage: `linear-gradient(to right, #f7f6f0 0%, #fdfdfc 15%, #fbfbf8 100%)`,
              }}
            >
              {/* Outer classic border line frame like picture 2 */}
              <div className="absolute inset-3.5 border border-yellow-500/20 rounded-xl pointer-events-none" />

              {/* Medallion hanging red double happiness (囍) seal at top center (like picture 2) */}
              <div className="w-full flex flex-col items-center pointer-events-none mt-2 shrink-0">
                <svg className="w-16 h-16 text-[#e63946]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="35" r="23" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="35" r="19" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="50" y1="58" x2="50" y2="82" stroke="currentColor" strokeWidth="1.2" />
                  <text x="50" y="42" fill="currentColor" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="serif">囍</text>
                  <circle cx="50" cy="65" r="3" fill="currentColor" />
                  <path d="M47 70 L50 75 L53 70 Z" fill="currentColor" />
                </svg>
              </div>

              {/* Two columns side by side columns details (like picture 2) */}
              <div className="grid grid-cols-2 gap-4 w-full text-center mt-3 z-10 px-1 shrink-0 font-sans">
                {/* Nhà Trai Column */}
                <div className="flex flex-col items-center">
                  <span className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-800 font-cyber mb-1">Nhà Trai</span>
                  <span className="font-extrabold text-gray-800 text-[15.5px] block leading-tight font-serif-lux">{wedding.location_info.groom_family?.father_name}</span>
                  <span className="font-extrabold text-gray-800 text-[15.5px] block leading-tight font-serif-lux">{wedding.location_info.groom_family?.mother_name}</span>
                  <span className="text-[10px] text-gray-400 mt-2 leading-relaxed block max-w-[150px] font-sans">
                    {wedding.location_info.groom_family?.address}
                  </span>
                </div>

                {/* Nhà Gái Column */}
                <div className="flex flex-col items-center border-l border-gray-200/50">
                  <span className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-800 font-cyber mb-1">Nhà Gái</span>
                  <span className="font-extrabold text-gray-800 text-[15.5px] block leading-tight font-serif-lux">{wedding.location_info.bride_family?.father_name}</span>
                  <span className="font-extrabold text-gray-800 text-[15.5px] block leading-tight font-serif-lux">{wedding.location_info.bride_family?.mother_name}</span>
                  <span className="text-[10px] text-gray-400 mt-2 leading-relaxed block max-w-[150px] font-sans">
                    {wedding.location_info.bride_family?.address}
                  </span>
                </div>
              </div>

              {/* Calligraphy invitation banner (like picture 2) */}
              <div className="w-full text-center mt-4 z-10 shrink-0 select-none">
                <span className="text-[12.5px] text-gray-400 tracking-[0.2em] uppercase block font-sans font-medium">Trân Trọng Báo Tin Lễ Thành Hôn Của</span>

                {/* Large handwritten couple names */}
                <div className="flex flex-col gap-1.5 mt-2.5">
                  <h2 className="text-4xl font-handwritten font-bold text-[#e63946] leading-none">Minh Hoàng</h2>
                  <span className="text-lg text-gray-400 leading-none font-serif-lux italic">&</span>
                  <h2 className="text-4xl font-handwritten font-bold text-[#e63946] leading-none">Mai Hương</h2>
                </div>
              </div>

              {/* 3. Landscape image banner in the middle to prevent gaps (request 2) */}
              <div className="relative w-[90%] h-24 sm:h-26 rounded-xl overflow-hidden shadow-sm border border-gray-200/50 my-2 shrink-0 z-10">
                <Image
                  src="/thiepmaudovang/images/gallery-4.jpg"
                  alt="Family Page Couple Portrait Banner"
                  fill
                  sizes="350px"
                  className="object-cover brightness-95 saturate-[0.85]"
                />
              </div>

              {/* Lời Mời Trân Trọng box kept exactly (request 2) */}
              <div className="bg-[#fcfcf9] border border-dashed border-gray-200/80 p-4 rounded-xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)] text-left w-full z-10 shrink-0">
                <span className="text-[9.5px] uppercase tracking-wider text-[#f08080] font-bold block mb-0.5 font-cyber">Lời Mời Trân Trọng</span>
                <p className="text-[13.5px] text-gray-600 font-handwritten leading-relaxed">
                  Sự hiện diện của quý vị là niềm vinh hạnh cho gia đình chúng tôi. Kính mời quý khách tới tham dự lễ thành hôn ấm cúng của hai con.
                </p>
              </div>

              {/* Quick dial phone buttons */}
              <div className="grid grid-cols-2 gap-3 w-full font-cyber text-[8.5px] font-bold mt-1 z-10">
                <a href="tel:0987654321" className="py-2 border border-[#f08080]/30 rounded-xl bg-white hover:bg-[#fde2e4]/20 flex items-center justify-center gap-1.5 text-gray-700 interactive">
                  📞 Liên hệ Nhà Trai
                </a>
                <a href="tel:0901234567" className="py-2 border border-[#84a98c]/30 rounded-xl bg-white hover:bg-[#e8f1f2]/20 flex items-center justify-center gap-1.5 text-gray-700 interactive">
                  📞 Liên hệ Nhà Gái
                </a>
              </div>
            </motion.div>
          )}

          {/* PAGE 6: EVENT SCHEDULE & TIMELINE */}
          {currentPage === 6 && (
            <motion.div
              key="timeline-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#fdfdfc] border-4 border-[#e9e6df] rounded-2xl shadow-2xl p-6 py-10 flex flex-col justify-between items-center text-center overflow-hidden"
              style={{
                transformOrigin: "left center",
                backgroundImage: `linear-gradient(to right, #f7f6f0 0%, #fdfdfc 15%, #fbfbf8 100%)`,
              }}
            >
              <div className="w-full mt-2 z-10 flex flex-col gap-0.5">
                <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#f08080] font-bold font-cyber">
                  // CHƯƠNG TRÌNH HÔN LỄ //
                </span>
                <div className="h-[1px] w-12 bg-[#f08080]/30 mx-auto mt-1" />
              </div>

              <div className="w-full flex-1 flex flex-col justify-between my-3 gap-4 z-10">

                {/* Countdown circles */}
                <div className="grid grid-cols-4 gap-2.5 w-full max-w-[300px] mx-auto font-cyber shadow-sm p-2 rounded-2xl bg-[#fcfcf9] border border-gray-200/40">
                  {Object.entries(timeLeft).map(([key, val]) => (
                    <div key={key} className="bg-white border border-gray-100 rounded-xl py-2.5 px-1 flex flex-col items-center shadow-inner">
                      <span className="text-2xl font-bold text-gray-800 tracking-wider leading-none">{String(val).padStart(2, "0")}</span>
                      <span className="text-[8px] uppercase tracking-widest text-[#f08080] font-extrabold mt-1">{key}</span>
                    </div>
                  ))}
                </div>

                {/* Timeline detailed Checklist (Time text size to 15px, details to 13px) */}
                <div className="w-full bg-[#fcfcf9] border border-gray-200/50 p-5 rounded-2xl shadow-sm text-left text-gray-600 flex-1 flex flex-col justify-between gap-5 relative">

                  <div className="absolute left-[33px] top-[40px] bottom-[35px] w-0.5 border-l border-dashed border-[#f08080]/40 z-0 flex flex-col justify-around items-center pointer-events-none">
                    <span className="text-[8px] bg-[#fcfcf9] py-0.5">🍃</span>
                    <span className="text-[8px] bg-[#fcfcf9] py-0.5">🍃</span>
                  </div>

                  {/* Step 1 */}
                  <div className="flex gap-4 z-10">
                    <span className="text-lg bg-white border border-gray-100 shadow-sm rounded-full w-8 h-8 flex items-center justify-center shrink-0">🌸</span>
                    <div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[15px] font-extrabold text-gray-800">11:00 AM</span>
                        <span className="text-[8px] font-bold text-[#f08080] uppercase font-cyber">// LỄ GIA TIÊN</span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-sans mt-0.5 leading-relaxed font-medium">
                        Lễ nghênh hôn rước dâu và thắp hương bái đường kính cáo tổ tiên hai họ tại tư gia nhà trai.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 z-10">
                    <span className="text-lg bg-white border border-gray-100 shadow-sm rounded-full w-8 h-8 flex items-center justify-center shrink-0">🍷</span>
                    <div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[15px] font-extrabold text-gray-800">12:00 PM</span>
                        <span className="text-[8px] font-bold text-[#84a98c] uppercase font-cyber">// TIỆC MỪNG</span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-sans mt-0.5 leading-relaxed font-medium">
                        Khai tiệc rượu mừng thành hôn chung vui chúc mừng cặp đôi, nghi lễ cắt bánh cưới, rót rượu hồng giao bôi.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 z-10">
                    <span className="text-lg bg-white border border-gray-100 shadow-sm rounded-full w-8 h-8 flex items-center justify-center shrink-0">🎵</span>
                    <div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[15px] font-extrabold text-gray-800">02:00 PM</span>
                        <span className="text-[8px] font-bold text-purple-400 uppercase font-cyber">// DƯ TIỆC</span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-sans mt-0.5 leading-relaxed font-medium">
                        Văn nghệ giao lưu ca nhạc tự do, lưu dấu những kỷ niệm đẹp đẽ bên bạn bè thân thiết.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="bg-[#fcfcf9] border border-dashed border-gray-200 p-3 rounded-xl text-center shadow-sm">
                  <p className="text-[15px] italic text-[#f08080] font-handwritten leading-normal">
                    &ldquo;Rất mong sự hiện diện của Quý khách để ngày vui của hai gia đình thêm phần trọn vẹn.&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom detail card */}
              <div className="w-full bg-[#fde2e4]/15 border border-[#fbc5c5]/50 rounded-2xl p-4 text-[11.5px] text-gray-600 font-sans text-left z-10 leading-relaxed shrink-0">
                📌 <b>Địa điểm hôn lễ:</b> {wedding.location_info.groom_family?.address}
              </div>
            </motion.div>
          )}

          {/* PAGE 7: PHOTO GALLERY ALBUM (INCREASED TO 6 SLOTS GRID COLLAGE - request 4) */}
          {currentPage === 7 && (
            <motion.div
              key="gallery-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#fdfdfc] border-4 border-[#e9e6df] rounded-2xl shadow-2xl p-6 py-10 flex flex-col justify-between items-center text-center overflow-hidden"
              style={{
                transformOrigin: "left center",
                backgroundImage: `linear-gradient(to right, #f7f6f0 0%, #fdfdfc 15%, #fbfbf8 100%)`,
              }}
            >
              <div className="w-full mt-2 z-10 flex flex-col gap-0.5">
                <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#84a98c] font-bold font-cyber">
                  // KỶ NIỆM TÌNH YÊU //
                </span>
                <div className="h-[1px] w-12 bg-[#84a98c]/30 mx-auto mt-1" />
              </div>

              {/* Grid with 6 items (2 columns, 3 rows) to display more wedding photos */}
              <div className="grid grid-cols-2 gap-3 w-full my-auto px-1 z-10">
                {[1, 2, 3, 4, 3, 2].map((num, idx) => {
                  const captions = [
                    "Ngày đầu gặp gỡ",
                    "Cái ôm ấm áp",
                    "Nắm tay đi muôn nơi",
                    "Lễ đường ước hẹn",
                    "Say đắm nụ cười",
                    "Hạnh phúc trọn đời"
                  ];
                  return (
                    <motion.div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        popUpSynth.playPageFlip();
                        setActivePhoto(`/thiepmaudovang/images/gallery-${num}.jpg`);
                      }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        rotate: idx % 2 === 0 ? -1.5 : 1.5,
                      }}
                      className="relative aspect-[3/3.3] border border-gray-200/50 rounded-xl p-1 pb-4 bg-white shadow-sm cursor-zoom-in group hover:shadow-md transition-all"
                    >
                      <div className="absolute left-1/3 -top-1.5 w-8 h-2.5 bg-yellow-200/20 border-b border-yellow-300/30 rotate-12 z-10 pointer-events-none" />

                      <div className="relative w-full h-[82%] rounded-lg overflow-hidden">
                        <Image
                          src={`/thiepmaudovang/images/gallery-${num}.jpg`}
                          alt={`Wedding Album Grid Photo Slot ${idx}`}
                          fill
                          sizes="150px"
                          className="object-cover brightness-95 saturate-[0.85] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <span className="text-[8.5px] text-gray-500 font-handwritten italic font-bold tracking-wider mt-0.5 block truncate">
                        {captions[idx]}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Calligraphy footer */}
              <div className="w-full text-center border-t border-gray-100 pt-3 z-10 flex flex-col gap-1 shrink-0 pb-1">
                <p className="text-[14.5px] italic text-gray-600 font-handwritten max-w-[280px] mx-auto leading-relaxed">
                  &ldquo;Mỗi bức ảnh cưới là một câu chuyện đẹp, ghi dấu trọn vẹn từng khoảnh khắc ngọt ngào của đôi lứa.&rdquo;
                </p>
                <span className="text-[7.5px] text-gray-400 font-cyber block animate-pulse">
                  - NHẤP VÀO ẢNH ĐỂ XEM LỚN -
                </span>
              </div>
            </motion.div>
          )}

          {/* PAGE 8: MAPS (50/50 SPLIT VERTICALLY) */}
          {currentPage === 8 && (
            <motion.div
              key="map-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#fdfdfc] border-4 border-[#e9e6df] rounded-2xl shadow-2xl p-4 py-8 flex flex-col justify-between items-center text-center overflow-hidden"
              style={{
                transformOrigin: "left center",
                backgroundImage: `linear-gradient(to right, #f7f6f0 0%, #fdfdfc 15%, #fbfbf8 100%)`,
              }}
            >
              {/* Header Title */}
              <div className="w-full mt-1 z-10 flex flex-col gap-0.5 shrink-0">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#f08080] font-bold font-cyber">
                  // BẢN ĐỒ LỄ ĐƯỜNG //
                </span>
                <div className="h-[1.5px] w-12 bg-[#f08080]/30 mx-auto mt-1" />
              </div>

              {/* Map 1: Lễ Gia Tiên (Top ~44% height) */}
              <div className="w-full h-[43.5%] bg-[#fcfcf9] border border-gray-200/50 p-3.5 rounded-2xl shadow-sm text-left flex flex-col justify-between relative overflow-hidden z-10">
                <div className="flex justify-between items-center shrink-0">
                  <span className="text-[#f08080] font-bold text-[9px] uppercase tracking-wider font-cyber">🏡 Lễ Gia Tiên (Tư Gia Nhà Trai)</span>
                </div>
                <p className="text-[10.5px] text-gray-500 font-sans font-semibold mb-1 truncate shrink-0">
                  {wedding.location_info.groom_family?.address}
                </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.588491848529!2d105.81768467595304!3d21.009126388450766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac976451e5cf%3A0x6b0df35c754d9c8!2zMTIzIMSQxrDhu51uZyBMw6FuZywgTmd1eeG7hW4gVHLDo2ksIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1721245000000!5m2!1sen!2s"
                  className="w-full flex-1 rounded-xl border border-gray-200 shadow-inner mt-1 interactive z-20"
                  allowFullScreen={false}
                  loading="lazy"
                  style={{ border: 0 }}
                ></iframe>
              </div>

              {/* Map 2: Tiệc Thành Hôn (Bottom ~44% height) */}
              <div className="w-full h-[43.5%] bg-[#fcfcf9] border border-gray-200/50 p-3.5 rounded-2xl shadow-sm text-left flex flex-col justify-between relative overflow-hidden z-10">
                <div className="flex justify-between items-center shrink-0">
                  <span className="text-[#84a98c] font-bold text-[9px] uppercase tracking-wider font-cyber">🏨 Tiệc Cưới (Khách Sạn Melia)</span>
                </div>
                <p className="text-[10.5px] text-gray-500 font-sans font-semibold mb-1 truncate shrink-0">
                  Khách Sạn Melia, 44B Lý Thường Kiệt, Hoàn Kiếm, Hà Nội
                </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1130635171746!2d105.84714157595357!3d21.028163088299863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab95973c91a3%3A0x889d71a8f9f7831d!2sMeli%C3%A1%20Hanoi!5e0!3m2!1sen!2s!4v1721245100000!5m2!1sen!2s"
                  className="w-full flex-1 rounded-xl border border-gray-200 shadow-inner mt-1 interactive z-20"
                  allowFullScreen={false}
                  loading="lazy"
                  style={{ border: 0 }}
                ></iframe>
              </div>

              {/* Footer Parking Tips Info strip */}
              <div className="w-full text-center text-[10.5px] text-gray-400 font-sans leading-none z-10 shrink-0 mt-1">
                💡 Miễn phí gửi ô tô/xe máy tại hầm khách sạn & tư gia.
              </div>
            </motion.div>
          )}

          {/* PAGE 9: RSVP & WISHING WELL */}
          {currentPage === 9 && (
            <motion.div
              key="rsvp-page"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#fdfdfc] border-4 border-[#e9e6df] rounded-2xl shadow-2xl p-6 py-10 flex flex-col justify-between items-center text-center overflow-y-auto custom-scroll"
              style={{
                transformOrigin: "left center",
                backgroundImage: `linear-gradient(to right, #f7f6f0 0%, #fdfdfc 15%, #fbfbf8 100%)`,
              }}
            >
              <div className="w-full mt-2 z-10 flex flex-col gap-0.5">
                <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#84a98c] font-bold font-cyber">
                  // XÁC NHẬN THAM GIA //
                </span>
                <div className="h-[1px] w-12 bg-[#84a98c]/30 mx-auto mt-1" />
              </div>

              <T2WatercolorRSVP weddingId={wedding.id} initialWishes={wishes} />

              <div className="w-full px-6 py-4 text-center">
                <div className="bg-[#fcfcf9] border border-dashed border-[#f08080]/30 rounded-2xl p-5 shadow-sm flex flex-col items-center">
                  <span className="text-[7.5px] font-bold text-[#f08080] uppercase tracking-widest block mb-1.5 font-cyber">
                    * WISHING_WELL *
                  </span>
                  <p className="text-[9px] text-gray-400 leading-normal mb-3">
                    Nhấp chọn nút bên dưới nếu bạn muốn gửi quà chúc mừng tới ngày cưới của hai bạn.
                  </p>
                  <button
                    onClick={onGiftOpen}
                    className="px-5 py-2.5 bg-[#fde2e4] text-[#e56b6f] border border-[#fbc5c5] font-bold uppercase tracking-widest text-[8px] rounded-lg shadow-sm hover:brightness-95 outline-none font-cyber"
                  >
                    🎁 Gửi Quà Mừng Cưới
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Full screen photo view */}
      <AnimatePresence>
        {activePhoto && (
          <T2GalleryLightbox src={activePhoto} onClose={() => setActivePhoto(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
