"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Wedding, Wish } from "@/types";
import {
  GardenGateSVG,
  SproutSVG,
  WateringCanSVG,
  MemoryFlowerSVG,
  LanternSVG,
  RootSystemSVG,
  GuestFlowerSVG,
} from "./BotanicalAssets";
import GardenRSVP from "./GardenRSVP";

interface GardenTemplateProps {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

// 6 Memory items with theme album photo arrays
interface MemoryItem {
  id: number;
  title: string;
  date: string;
  season: string;
  caption: string;
  images: string[];
}

export default function GardenTemplate({ wedding, to, wishes }: GardenTemplateProps) {
  const shouldReduceMotion = useReducedMotion();

  // State Arc Management
  const [isGateOpen, setIsGateOpen] = useState(shouldReduceMotion ? true : false);
  const [isSeedPlanted, setIsSeedPlanted] = useState(shouldReduceMotion ? true : false);
  const [isMemoryWatered, setIsMemoryWatered] = useState(false);
  const [isLanternLit, setIsLanternLit] = useState(false);

  // Full-Page Night Mode state (Triggered by lantern or toggle)
  const isNightMode = isLanternLit;

  // Album Modal state
  const [activeFlowerId, setActiveFlowerId] = useState<number | null>(null);
  const [selectedAlbumImageIndex, setSelectedAlbumImageIndex] = useState<number>(0);

  // Audio Control
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Guest Flowers state (from wishes + current user bloom)
  const [guestFlowers, setGuestFlowers] = useState<{ name: string; id: string | number; content?: string }[]>(
    wishes.map((w) => ({ name: w.guest_name, id: w.id, content: w.content }))
  );

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Real photos for Groom & Bride (Used in Section 6 Family Tree Cards)
  const groomRealPhoto = wedding.images?.[1] || "/thiepmaudovang/images/couple-small-1.jpg";
  const brideRealPhoto = wedding.images?.[2] || "/thiepmaudovang/images/couple-small-2.jpg";

  // 6 Symmetrical Memory Theme Albums matched with thematic photos
  const memoryItems: MemoryItem[] = [
    {
      id: 1,
      title: "Cuộc gặp đầu tiên",
      date: "15.03.2021",
      season: "Mùa Xoan",
      caption: "Ngày ấy, chúng mình chưa biết một cuộc gặp nhỏ sẽ lớn lên thành cả một tương lai.",
      images: [
        "/template11/memory-1.png",
        wedding.images?.[0] || "/thiepmaudovang/images/cover.jpg",
      ],
    },
    {
      id: 2,
      title: "Chuyến đi xa đầu tiên",
      date: "10.08.2021",
      season: "Mùa Hạ",
      caption: "Cùng nhau qua những đoạn đường nắng cháy, nhận ra bàn tay này thực sự muốn nắm chặt.",
      images: [
        "/template11/memory-2.png",
        wedding.images?.[1] || "/thiepmaudovang/images/gallery-1.jpg",
      ],
    },
    {
      id: 3,
      title: "Gặp gỡ hai gia đình",
      date: "20.11.2022",
      season: "Mùa Thu",
      caption: "Lời thưa chuyện dịu dàng dưới mái hiên ấm áp của hai nhà.",
      images: [
        "/template11/memory-3.png",
        wedding.images?.[2] || "/thiepmaudovang/images/gallery-2.jpg",
      ],
    },
    {
      id: 4,
      title: "Những ngày giông gió",
      date: "14.02.2023",
      season: "Mùa Đông",
      caption: "Lắng nghe, tha thứ và chọn ở lại sau những bất đồng.",
      images: [
        "/template11/memory-4.png",
        wedding.images?.[3] || "/thiepmaudovang/images/gallery-3.jpg",
      ],
    },
    {
      id: 5,
      title: "Đăng ký kết hôn",
      date: "08.08.2025",
      season: "Mùa Thu",
      caption: "Ngày hai cái tên chính thức đứng chung dưới một mái nhà và một tờ giấy hẹn ước.",
      images: [
        "/template11/memory-5.png",
        wedding.images?.[1] || "/thiepmaudovang/images/gallery-1.jpg",
      ],
    },
    {
      id: 6,
      title: "Lời cầu hôn",
      date: "25.12.2025",
      season: "Mùa Hoa Mới",
      caption: "Dưới chiếc đèn lồng ấm áp, anh hỏi: 'Em có muốn cùng anh vun trồng một mái nhà?'",
      images: [
        "/template11/memory-6.png",
        wedding.images?.[0] || "/thiepmaudovang/images/cover.jpg",
      ],
    },
  ];

  // Initialize music audio element
  useEffect(() => {
    if (wedding.music_url) {
      const audio = new Audio(wedding.music_url);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [wedding.music_url]);

  // Audio Toggle
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Open Gate Handler
  const handleOpenGate = () => {
    setIsGateOpen(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Countdown timer calculation
  useEffect(() => {
    const targetDate = wedding.event_date ? new Date(wedding.event_date).getTime() : Date.now() + 8640000000;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [wedding.event_date]);

  // Calendar Link Generator
  const generateGoogleCalendarUrl = () => {
    const startDate = wedding.event_date ? new Date(wedding.event_date) : new Date();
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

    const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, "");

    const title = encodeURIComponent(`Lễ Thành Hôn: ${wedding.groom_name} & ${wedding.bride_name}`);
    const details = encodeURIComponent("Trân trọng kính mời bạn đến dự lễ thành hôn của chúng mình!");
    const location = encodeURIComponent(wedding.location_info.groom_family?.address || "Hà Nội");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatTime(
      startDate
    )}/${formatTime(endDate)}&details=${details}&location=${location}`;
  };

  // Handle guest flower bloom on RSVP confirmation
  const handleRSVPSuccess = (guestName: string, wishMessage?: string) => {
    setGuestFlowers((prev) => [
      ...prev,
      { name: guestName, id: `guest-${Date.now()}`, content: wishMessage },
    ]);
  };

  // Open Album Modal
  const openAlbumModal = (itemId: number) => {
    setActiveFlowerId(itemId);
    setSelectedAlbumImageIndex(0);
  };

  // Toggle water memories
  const handleToggleWater = () => {
    const newWateredState = !isMemoryWatered;
    setIsMemoryWatered(newWateredState);
    if (newWateredState) {
      openAlbumModal(1);
    }
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-1000 relative overflow-x-hidden antialiased selection:bg-[#B97878]/20 ${
        isNightMode
          ? "bg-[#121A15] text-[#F8F3E8]"
          : "bg-[#F3EFE4] text-[#56604D]"
      }`}
    >
      {/* ── FULL-PAGE FLOATING FIREFLIES PARTICLES (NIGHT MODE) ── */}
      <AnimatePresence>
        {isNightMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
          >
            <div className="w-2 h-2 rounded-full bg-[#FFF5DF] absolute top-[15%] left-[20%] animate-bounce shadow-[0_0_12px_#DDB36E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#DDB36E] absolute top-[35%] right-[25%] animate-pulse shadow-[0_0_15px_#DDB36E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFF5DF] absolute top-[60%] left-[15%] animate-bounce shadow-[0_0_10px_#FFF5DF]" />
            <div className="w-2 h-2 rounded-full bg-[#DDB36E] absolute top-[80%] right-[20%] animate-pulse shadow-[0_0_12px_#DDB36E]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PERSISTENT TOP RIGHT CONTROLS: NIGHT/DAY MODE & MUSIC ── */}
      <div className="fixed top-5 right-5 z-50 flex items-center space-x-3">
        {/* Full-Page Night/Day Mode Toggle Button */}
        <button
          onClick={() => setIsLanternLit(!isLanternLit)}
          aria-label={isNightMode ? "Chuyển sang Khu Vườn Ban Ngày" : "Chuyển sang Khu Vườn Đêm Thắp Sáng"}
          className={`px-3.5 py-2.5 rounded-full border shadow-md flex items-center space-x-2 text-xs font-semibold transition-all ${
            isNightMode
              ? "bg-[#DDB36E] text-[#121A15] border-[#DDB36E] hover:bg-[#FFF5DF]"
              : "bg-[#F8F3E8] text-[#56604D] border-[#C9D0C4] hover:bg-[#82916D] hover:text-[#F8F3E8]"
          }`}
        >
          <span>{isNightMode ? "☀️ Ban Ngày" : "🌙 Đêm Đèn Lồng"}</span>
        </button>

        {/* Music Control Button */}
        {wedding.music_url && (
          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
            className={`w-10 h-10 rounded-full border shadow-md flex items-center justify-center transition-colors ${
              isNightMode
                ? "bg-[#1C2820] text-[#DDB36E] border-[#DDB36E]/40 hover:bg-[#DDB36E] hover:text-[#121A15]"
                : "bg-[#F8F3E8] text-[#56604D] border-[#C9D0C4] hover:bg-[#82916D] hover:text-[#F8F3E8]"
            }`}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>
        )}
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16 space-y-16 md:space-y-24 relative z-10">
        {/* ── 1. CLOSED GARDEN GATE WITH PROPORTIONAL V3 CHIBI CUTOUTS ── */}
        <section className={`min-h-[80vh] flex flex-col items-center justify-center text-center py-8 relative border-b ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]/60"}`}>
          <div className="space-y-4 max-w-xl mx-auto mb-6">
            <span className={`text-xs uppercase tracking-[0.2em] font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
              Thiệp Cưới Gia Đình
            </span>
            <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl leading-tight font-medium ${isNightMode ? "text-[#FFF5DF] drop-shadow" : "text-[#56604D]"}`}>
              &quot;The Garden We Grow Together&quot;
            </h1>
            <p className={`font-serif italic text-lg sm:text-xl ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
              Khu Vườn Chúng Mình Cùng Vun Trồng
            </p>
            <p className={`text-base max-w-md mx-auto leading-relaxed pt-2 ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>
              Có một khu vườn được lớn lên từ những ngày chúng mình chọn ở bên nhau.
            </p>
            {to && to !== "Quý khách" && (
              <p className={`text-sm font-medium px-4 py-1.5 rounded-full inline-block border ${isNightMode ? "bg-[#1C2820] text-[#DDB36E] border-[#DDB36E]/40" : "bg-[#F8F3E8] text-[#56604D] border-[#C9D0C4]"}`}>
                Thân mời: <span className="font-semibold">{to}</span>
              </p>
            )}
          </div>

          {/* Gate Graphic flanked by Proportional V3 Chibi Cutouts with Name Badges */}
          <div className="my-6 flex items-end justify-center gap-3 sm:gap-8">
            {/* Chibi Groom Left */}
            <div className="flex flex-col items-center group">
              <div className="relative w-28 h-40 sm:w-40 sm:h-52 md:w-48 md:h-64 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/template11/chibi-groom-v3.png"
                  alt={`Chú rể ${wedding.groom_name}`}
                  fill
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 160px, 192px"
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
              <span className={`mt-2 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full border shadow-sm ${isNightMode ? "bg-[#1C2820] text-[#FFF5DF] border-[#DDB36E]/40" : "bg-[#F8F3E8] text-[#56604D] border-[#C9D0C4]"}`}>
                {wedding.groom_name}
              </span>
            </div>

            {/* Center Gate */}
            <GardenGateSVG isOpen={isGateOpen} className="w-36 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64" />

            {/* Chibi Bride Right */}
            <div className="flex flex-col items-center group">
              <div className="relative w-28 h-40 sm:w-40 sm:h-52 md:w-48 md:h-64 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/template11/chibi-bride-v3.png"
                  alt={`Cô dâu ${wedding.bride_name}`}
                  fill
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 160px, 192px"
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
              <span className={`mt-2 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full border shadow-sm ${isNightMode ? "bg-[#1C2820] text-[#FFF5DF] border-[#DDB36E]/40" : "bg-[#F8F3E8] text-[#56604D] border-[#C9D0C4]"}`}>
                {wedding.bride_name}
              </span>
            </div>
          </div>

          {/* Primary Action */}
          {!isGateOpen ? (
            <button
              onClick={handleOpenGate}
              className={`mt-4 px-8 py-3.5 font-medium text-base rounded-full shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 ${
                isNightMode
                  ? "bg-[#DDB36E] text-[#121A15] hover:bg-[#FFF5DF] ring-[#DDB36E]"
                  : "bg-[#56604D] text-[#F8F3E8] hover:bg-[#303B35] ring-[#82916D]"
              }`}
            >
              Mở cổng vào vườn
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-2"
            >
              <h2 className={`font-serif text-2xl md:text-3xl font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                {wedding.groom_name} &amp; {wedding.bride_name}
              </h2>
              <p className={`text-sm tracking-widest uppercase ${isNightMode ? "text-[#FFF5DF]/80" : "text-[#82916D]"}`}>
                Chào mừng bạn bước vào khu vườn ngày cưới
              </p>
            </motion.div>
          )}
        </section>

        {/* ── Central Copy Block ── */}
        <section className={`text-center py-6 max-w-2xl mx-auto px-4 rounded-2xl border shadow-sm transition-colors duration-700 ${
          isNightMode ? "bg-[#1C2820]/90 border-[#DDB36E]/30 text-[#FFF5DF]" : "bg-[#F8F3E8] border-[#C9D0C4] text-[#56604D]"
        }`}>
          <p className="font-serif italic text-lg md:text-xl leading-relaxed">
            &quot;Tình yêu không tự nhiên nở hoa.<br />
            Nó lớn lên từ những ngày<br />
            chúng mình chọn cùng nhau vun trồng.&quot;
          </p>
        </section>

        {/* ── 2. PLANT THE FIRST SEED ── */}
        <section className={`py-8 border-b text-center space-y-6 ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]/60"}`}>
          <div className="max-w-md mx-auto space-y-2">
            <span className={`text-xs uppercase tracking-widest font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
              Khởi Đầu
            </span>
            <h2 className={`font-serif text-2xl md:text-3xl font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
              Hạt Giống Đầu Tiên
            </h2>
            <p className={`text-sm ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>
              Chạm vào ô đất để gieo mầm kỷ niệm đầu tiên của hai đứa.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <SproutSVG isSprouted={isSeedPlanted} className="w-28 h-28 md:w-36 md:h-36 cursor-pointer" />

            {!isSeedPlanted && (
              <button
                onClick={() => setIsSeedPlanted(true)}
                className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-colors shadow ${
                  isNightMode ? "bg-[#DDB36E] text-[#121A15] hover:bg-[#FFF5DF]" : "bg-[#A6674E] text-[#F8F3E8] hover:bg-[#8A533E]"
                }`}
              >
                Gieo hạt giống
              </button>
            )}
          </div>

          {isSeedPlanted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`max-w-lg mx-auto p-6 rounded-2xl text-left space-y-4 border shadow-sm transition-colors ${
                isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30" : "bg-[#F8F3E8] border-[#C9D0C4]"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}>{memoryItems[0].date}</span>
                <span className={`px-2 py-0.5 rounded font-sans font-medium ${isNightMode ? "bg-[#DDB36E]/20 text-[#FFF5DF]" : "bg-[#82916D]/20 text-[#56604D]"}`}>
                  {memoryItems[0].season}
                </span>
              </div>
              <p className={`font-serif text-base leading-relaxed ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
                &quot;{memoryItems[0].caption}&quot;
              </p>
              {memoryItems[0].images[0] && (
                <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden border border-[#C9D0C4]/60">
                  <Image
                    src={memoryItems[0].images[0]}
                    alt="Kỷ niệm đầu tiên"
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
          )}
        </section>

        {/* ── 3 & 4. SEASONS OF LOVE & MEMORY FLOWERS (6 EVEN SYMMETRICAL ALBUMS) ── */}
        <section className={`py-8 border-b space-y-8 ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]/60"}`}>
          <div className="text-center max-w-lg mx-auto space-y-2">
            <span className={`text-xs uppercase tracking-widest font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
              Hành Trình Mấy Mùa Mưa Nắng
            </span>
            <h2 className={`font-serif text-2xl md:text-3xl font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
              Những Mùa Yêu Thương
            </h2>
            <p className={`text-sm ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>
              Nhấn vào từng chủ đề kỷ niệm để mở album hình ảnh tương ứng.
            </p>
          </div>

          {/* Water memory interaction button */}
          <div className="flex justify-center">
            <button
              onClick={handleToggleWater}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all shadow ${
                isNightMode ? "bg-[#DDB36E] text-[#121A15] hover:bg-[#FFF5DF]" : "bg-[#82916D] text-[#F8F3E8] hover:bg-[#6B7A57]"
              }`}
            >
              <WateringCanSVG className="w-5 h-5" />
              <span>{isMemoryWatered ? "Đóng album kỷ niệm" : "Đánh thức album kỷ niệm"}</span>
            </button>
          </div>

          {/* Symmetrical 6-Card Grid (2 columns on mobile, 3 columns on tablet/desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {memoryItems.map((item) => {
              const isSelected = activeFlowerId === item.id;
              const isOpen = isSelected || isMemoryWatered;
              return (
                <div
                  key={item.id}
                  onClick={() => openAlbumModal(item.id)}
                  aria-expanded={isOpen}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      openAlbumModal(item.id);
                    }
                  }}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isNightMode
                      ? isSelected
                        ? "bg-[#1C2820] border-[#DDB36E] ring-2 ring-[#DDB36E] shadow-lg scale-105 text-[#FFF5DF]"
                        : "bg-[#1C2820]/90 border-[#DDB36E]/30 hover:border-[#DDB36E] hover:scale-102 hover:shadow text-[#FFF5DF]"
                      : isSelected
                      ? "bg-[#F8F3E8] border-[#82916D] ring-2 ring-[#82916D] shadow-md scale-105 text-[#56604D]"
                      : "bg-[#F8F3E8]/80 border-[#C9D0C4] hover:border-[#82916D] hover:scale-102 hover:shadow text-[#56604D]"
                  }`}
                >
                  {/* Photo Thumbnail Badge Preview */}
                  <div className="relative w-full h-28 mb-3 rounded-xl overflow-hidden border border-[#C9D0C4]">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                      className={`object-cover transition-transform duration-500 ${
                        isSelected ? "scale-110" : "group-hover:scale-105"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute top-2 right-2 text-[10px] font-mono text-white bg-[#A6674E]/90 px-2 py-0.5 rounded-full shadow-sm">
                      {item.images.length} Ảnh
                    </span>
                    <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white/90">
                      {item.season}
                    </span>
                  </div>

                  <MemoryFlowerSVG isOpen={isOpen} className="w-7 h-7 mb-1.5" />
                  <span className="text-xs font-semibold line-clamp-1">{item.title}</span>
                  <span className={`text-[11px] font-mono mt-0.5 ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>{item.date}</span>
                </div>
              );
            })}
          </div>

          {/* Interactive Topic Album Viewer Modal Overlay */}
          <AnimatePresence>
            {activeFlowerId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setActiveFlowerId(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border ${
                    isNightMode ? "bg-[#18231C] border-[#DDB36E]/50 text-[#FFF5DF]" : "bg-[#F8F3E8] border-[#82916D] text-[#56604D]"
                  }`}
                >
                  {(() => {
                    const selected = memoryItems.find((m) => m.id === activeFlowerId);
                    if (!selected) return null;
                    const currentImg = selected.images[selectedAlbumImageIndex] || selected.images[0];

                    return (
                      <>
                        {/* Album Header */}
                        <div className={`flex items-center justify-between border-b pb-3 ${isNightMode ? "border-[#DDB36E]/30" : "border-[#C9D0C4]"}`}>
                          <div className="space-y-0.5">
                            <span className={`text-xs font-semibold uppercase tracking-wider ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                              Album Kỷ Niệm · {selected.season}
                            </span>
                            <h3 className="font-serif text-2xl font-bold">
                              {selected.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => setActiveFlowerId(null)}
                            aria-label="Đóng Album"
                            className={`w-9 h-9 rounded-full transition-colors flex items-center justify-center font-bold text-lg border ${
                              isNightMode ? "bg-[#1C2820] text-[#FFF5DF] border-[#DDB36E]/40 hover:bg-[#DDB36E] hover:text-[#121A15]" : "bg-[#F3EFE4] text-[#56604D] border-[#C9D0C4] hover:bg-[#82916D] hover:text-white"
                            }`}
                          >
                            ✕
                          </button>
                        </div>

                        {/* Main Selected Album Image Display */}
                        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-[#C9D0C4] shadow-inner bg-black/10">
                          <Image
                            src={currentImg}
                            alt={`${selected.title} - Ảnh ${selectedAlbumImageIndex + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 672px"
                            className="object-cover transition-opacity duration-300"
                            priority
                          />
                        </div>

                        {/* Album Image Thumbnails (if > 1 image) */}
                        {selected.images.length > 1 && (
                          <div className="flex justify-center items-center gap-3 pt-1">
                            {selected.images.map((imgUrl, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedAlbumImageIndex(idx)}
                                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                  selectedAlbumImageIndex === idx
                                    ? "border-[#DDB36E] scale-105 shadow"
                                    : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                              >
                                <Image
                                  src={imgUrl}
                                  alt={`Thumbnail ${idx + 1}`}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Story Caption */}
                        <p className={`font-serif italic text-base md:text-lg leading-relaxed text-center px-4 py-3.5 rounded-xl border ${
                          isNightMode ? "bg-[#1C2820] border-[#DDB36E]/20 text-[#FFF5DF]" : "bg-[#F3EFE4] border-[#C9D0C4]/60 text-[#56604D]"
                        }`}>
                          &quot;{selected.caption}&quot;
                        </p>

                        {/* Modal Footer Navigation */}
                        <div className={`flex justify-between items-center pt-2 border-t ${isNightMode ? "border-[#DDB36E]/30" : "border-[#C9D0C4]"}`}>
                          <button
                            onClick={() => {
                              const prevId = activeFlowerId > 1 ? activeFlowerId - 1 : memoryItems.length;
                              openAlbumModal(prevId);
                            }}
                            className={`px-4 py-2 text-xs font-medium rounded-xl border transition-colors ${
                              isNightMode ? "bg-[#1C2820] text-[#FFF5DF] border-[#DDB36E]/40 hover:bg-[#DDB36E] hover:text-[#121A15]" : "bg-[#F3EFE4] text-[#56604D] border-[#C9D0C4] hover:bg-[#82916D] hover:text-white"
                            }`}
                          >
                            ← Album trước
                          </button>
                          <span className={`text-xs font-mono ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                            Chủ đề {selected.id} / {memoryItems.length}
                          </span>
                          <button
                            onClick={() => {
                              const nextId = activeFlowerId < memoryItems.length ? activeFlowerId + 1 : 1;
                              openAlbumModal(nextId);
                            }}
                            className={`px-4 py-2 text-xs font-medium rounded-xl border transition-colors ${
                              isNightMode ? "bg-[#1C2820] text-[#FFF5DF] border-[#DDB36E]/40 hover:bg-[#DDB36E] hover:text-[#121A15]" : "bg-[#F3EFE4] text-[#56604D] border-[#C9D0C4] hover:bg-[#82916D] hover:text-white"
                            }`}
                          >
                            Album tiếp →
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── 5. MEMORY GARDEN (GALLERY) ── */}
        <section className={`py-8 border-b space-y-6 ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]/60"}`}>
          <div className="text-center max-w-lg mx-auto space-y-2">
            <span className={`text-xs uppercase tracking-widest font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
              Lưu Bút Cây Lá
            </span>
            <h2 className={`font-serif text-2xl md:text-3xl font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
              Khu Vườn Kỷ Niệm
            </h2>
            <p className={`text-sm ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>
              Những khoảnh khắc dung dị chụp dưới ánh nắng ngày bình thường.
            </p>
          </div>

          {/* Botanical Photo Archive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* Dominant Main Photo */}
            {wedding.images?.[0] && (
              <div className={`md:col-span-7 p-3 rounded-2xl border flex flex-col ${isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30" : "bg-[#F8F3E8] border-[#C9D0C4]"}`}>
                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
                  <Image
                    src={wedding.images[0]}
                    alt="Ảnh kỷ niệm 1"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="pt-3 px-2 flex justify-between items-center text-xs">
                  <span className={`font-serif italic text-sm ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>&quot;Ánh chiều trong vườn&quot;</span>
                  <span className={`font-mono ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>Mã số lá #01</span>
                </div>
              </div>
            )}

            {/* Side Cluster Photos */}
            <div className="md:col-span-5 flex flex-col gap-4 justify-between">
              {wedding.images?.[1] && (
                <div className={`p-3 rounded-2xl border ${isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30" : "bg-[#F8F3E8] border-[#C9D0C4]"}`}>
                  <div className="relative w-full h-36 rounded-xl overflow-hidden">
                    <Image
                      src={wedding.images[1]}
                      alt="Ảnh kỷ niệm 2"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className={`text-xs pt-2 font-mono text-right ${isNightMode ? "text-[#E2DACB]" : "text-[#56604D]"}`}>Thu 2022</p>
                </div>
              )}

              {wedding.images?.[2] && (
                <div className={`p-3 rounded-2xl border ${isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30" : "bg-[#F8F3E8] border-[#C9D0C4]"}`}>
                  <div className="relative w-full h-36 rounded-xl overflow-hidden">
                    <Image
                      src={wedding.images[2]}
                      alt="Ảnh kỷ niệm 3"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className={`text-xs pt-2 font-mono text-right ${isNightMode ? "text-[#E2DACB]" : "text-[#56604D]"}`}>Mùa Hoa Nở</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 6. TWO ROOTS (FAMILY TREE WITH REAL COUPLE PORTRAITS) ── */}
        <section className={`py-8 border-b text-center space-y-6 ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]/60"}`}>
          <div className="max-w-lg mx-auto space-y-3">
            <span className={`text-xs uppercase tracking-widest font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
              Gia Đình Hai Bên
            </span>
            <h2 className={`font-serif text-2xl md:text-3xl font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
              Hai Cội Rễ Yêu Thương
            </h2>
            <p className={`text-sm italic font-serif leading-relaxed px-4 ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>
              &quot;Chúng mình không rời khỏi nơi mình đã lớn lên.<br />
              Từ hai gốc rễ yêu thương, chúng mình bắt đầu vun trồng một mái ấm mới.&quot;
            </p>
          </div>

          <RootSystemSVG className="w-full max-w-md mx-auto h-28 my-2" />

          {/* Groom & Bride Family Cards featuring Real Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
            {/* Groom Family */}
            <div className={`p-5 rounded-2xl space-y-3 relative overflow-hidden flex flex-col justify-between border shadow-sm ${
              isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30 text-[#FFF5DF]" : "bg-[#F8F3E8] border-[#C9D0C4] text-[#56604D]"
            }`}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                    Nhà Trai
                  </span>
                  <h3 className="font-serif text-xl font-semibold">
                    Chú Rể: {wedding.groom_name}
                  </h3>
                </div>
                {/* Real Groom Photo Avatar */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#DDB36E] shrink-0 shadow-md">
                  <Image
                    src={groomRealPhoto}
                    alt={`Chú rể ${wedding.groom_name}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </div>

              {wedding.location_info.groom_family && (
                <div className={`text-xs space-y-1 pt-2 border-t ${isNightMode ? "border-[#DDB36E]/20 text-[#E2DACB]" : "border-[#C9D0C4]/60 text-[#6A4D3E]"}`}>
                  <p>
                    <span className={`font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>Thân phụ:</span>{" "}
                    {wedding.location_info.groom_family.father_name || "Nguyễn Văn A"}
                  </p>
                  <p>
                    <span className={`font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>Thân mẫu:</span>{" "}
                    {wedding.location_info.groom_family.mother_name || "Lê Thị B"}
                  </p>
                  <p className="text-xs pt-1 opacity-80">
                    {wedding.location_info.groom_family.address}
                  </p>
                </div>
              )}
            </div>

            {/* Bride Family */}
            <div className={`p-5 rounded-2xl space-y-3 relative overflow-hidden flex flex-col justify-between border shadow-sm ${
              isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30 text-[#FFF5DF]" : "bg-[#F8F3E8] border-[#C9D0C4] text-[#56604D]"
            }`}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                    Nhà Gái
                  </span>
                  <h3 className="font-serif text-xl font-semibold">
                    Cô Dâu: {wedding.bride_name}
                  </h3>
                </div>
                {/* Real Bride Photo Avatar */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#DDB36E] shrink-0 shadow-md">
                  <Image
                    src={brideRealPhoto}
                    alt={`Cô dâu ${wedding.bride_name}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </div>

              {wedding.location_info.bride_family && (
                <div className={`text-xs space-y-1 pt-2 border-t ${isNightMode ? "border-[#DDB36E]/20 text-[#E2DACB]" : "border-[#C9D0C4]/60 text-[#6A4D3E]"}`}>
                  <p>
                    <span className={`font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>Thân phụ:</span>{" "}
                    {wedding.location_info.bride_family.father_name || "Trần Văn C"}
                  </p>
                  <p>
                    <span className={`font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>Thân mẫu:</span>{" "}
                    {wedding.location_info.bride_family.mother_name || "Phạm Thị D"}
                  </p>
                  <p className="text-xs pt-1 opacity-80">
                    {wedding.location_info.bride_family.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 7. THE DIFFICULT SEASON (RESILIENCE) ── */}
        <section className="py-12 border-b border-[#DDB36E]/30 text-center bg-[#1A261E] text-[#F8F3E8] rounded-3xl p-8 shadow-inner space-y-4 border">
          <span className="text-xs uppercase tracking-widest text-[#DDB36E] font-semibold">
            Mùa Chăm Đất
          </span>
          <div className="max-w-xl mx-auto space-y-4">
            <p className="font-serif italic text-lg md:text-xl text-[#FFF5DF]">
              &quot;Có mùa cây đầy hoa.<br />
              Có mùa chỉ còn những cành khẳng khiu.&quot;
            </p>
            <div className="w-12 h-0.5 bg-[#DDB36E] mx-auto opacity-60"></div>
            <p className="text-sm md:text-base leading-relaxed text-[#E2DACB] font-light">
              Yêu một người không chỉ là ngắm hoa nở. Mà còn là cùng chăm đất trong những ngày chưa nhìn thấy một mầm xanh nào.
            </p>
          </div>
        </section>

        {/* ── 8. THE WEDDING BLOOM & UNBOUNDED EVENING LANTERN PROMISE ── */}
        <section className={`py-8 border-b space-y-8 relative ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]/60"}`}>
          {/* Lantern promise card without overflow-hidden so the lantern glow radiates OUTSIDE the card */}
          <div
            className={`p-6 md:p-10 rounded-3xl transition-all duration-1000 text-center space-y-5 shadow-lg relative ${
              isNightMode
                ? "bg-[#1C2820]/80 backdrop-blur-sm text-[#F8F3E8] border border-[#DDB36E]/50"
                : "bg-[#F8F3E8] text-[#56604D] border border-[#C9D0C4]"
            }`}
          >
            {/* Radial Light Glow Radiating DIRECTLY from the Lantern Icon OUTWARDS BEYOND THE CARD */}
            <AnimatePresence>
              {isLanternLit && (
                <motion.div
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={{
                    scale: [0.2, 1.2, 1.1],
                    opacity: [0, 1, 0.95],
                  }}
                  exit={{ scale: 0.1, opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                >
                  {/* 1200px Unbounded Light Halo centered on Lantern radiating past card borders */}
                  <div className="w-[1200px] h-[1200px] rounded-full bg-[radial-gradient(circle,_rgba(221,179,110,0.5)_0%,_rgba(221,179,110,0.22)_30%,_rgba(221,179,110,0.08)_50%,_rgba(18,26,21,0)_70%)] animate-pulse" />
                  <div className="absolute inset-0 m-auto w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(255,245,223,0.65)_0%,_rgba(221,179,110,0.25)_45%,_rgba(18,26,21,0)_80%)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lantern Icon & Content */}
            <div className="relative z-10 space-y-4">
              <div className="flex justify-center">
                <button
                  onClick={() => setIsLanternLit(!isLanternLit)}
                  aria-label={isLanternLit ? "Tắt đèn lồng" : "Thắp sáng đèn lồng"}
                  className="focus:outline-none focus:ring-2 focus:ring-[#DDB36E] rounded-full p-2 transition-transform duration-300 hover:scale-110"
                >
                  <LanternSVG isLit={isLanternLit} className="w-20 h-24" />
                </button>
              </div>

              <div>
                <button
                  onClick={() => setIsLanternLit(!isLanternLit)}
                  className={`px-7 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-md focus:outline-none focus:ring-2 ${
                    isNightMode
                      ? "bg-[#DDB36E] text-[#121A15] border border-[#DDB36E] hover:bg-[#FFF5DF] ring-[#DDB36E]"
                      : "bg-[#82916D] text-[#F8F3E8] border border-[#82916D] hover:bg-[#56604D] ring-[#82916D]"
                  }`}
                >
                  {isNightMode ? "Chuyển về ban ngày" : "Thắp sáng lời hứa (Đêm Đèn Lồng)"}
                </button>
              </div>

              <div className="max-w-lg mx-auto space-y-3 pt-2">
                <p
                  className={`font-serif italic text-base md:text-xl leading-relaxed transition-colors duration-500 ${
                    isNightMode ? "text-[#FFF5DF] drop-shadow-sm" : "text-[#56604D]"
                  }`}
                >
                  &quot;Chúng mình không hứa khu vườn này sẽ luôn đầy nắng.<br />
                  Nhưng hứa rằng sau mỗi mùa giông gió,<br />
                  vẫn sẽ cùng nhau gieo lại những điều tốt đẹp.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Real Wedding Bloom Info Details */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className={`text-xs uppercase tracking-widest font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
              Mùa Hoa Đầu Tiên
            </span>
            <h2 className={`font-serif text-3xl md:text-4xl font-semibold ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
              Lễ Thành Hôn
            </h2>
            <p className={`text-sm leading-relaxed ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>
              Sau những mùa đã cùng đi qua, chúng mình trân trọng mời bạn đến chứng kiến mùa hoa đầu tiên của gia đình nhỏ.
            </p>
          </div>

          {/* Venue & Event Details Card */}
          <div className={`max-w-2xl mx-auto rounded-2xl p-6 md:p-8 space-y-6 shadow-sm border ${
            isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30 text-[#FFF5DF]" : "bg-[#F8F3E8] border-[#C9D0C4] text-[#56604D]"
          }`}>
            <div className={`text-center border-b pb-6 space-y-2 ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]"}`}>
              <p className={`text-sm uppercase tracking-wider font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                Thời gian cử hành
              </p>
              <p className="font-serif text-2xl md:text-3xl font-bold">
                {wedding.location_info.groom_family?.date || "Thứ Bảy, ngày 10 tháng 10 năm 2026"}
              </p>
              <p className={`text-base font-medium ${isNightMode ? "text-[#DDB36E]" : "text-[#82916D]"}`}>
                Vào lúc {wedding.location_info.groom_family?.time || "11:00 AM"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1">
                <span className={`text-xs uppercase tracking-wider font-semibold block ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                  Địa điểm tiệc cưới
                </span>
                <p className="font-semibold text-base">Trung tâm Tiệc cưới &amp; Hội nghị</p>
                <p className={`text-xs ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>
                  {wedding.location_info.groom_family?.address || "123 Đường Láng, Đống Đa, Hà Nội"}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`text-xs uppercase tracking-wider font-semibold block ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                  Trang phục (Dress code)
                </span>
                <p className="font-semibold text-base">Trang nhã / Lịch sự</p>
                <p className={`text-xs ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>Ưu tiên tone Be, Olive, Nâu đất, Hồng nhạt</p>
              </div>
            </div>

            {/* Action Buttons: Google Maps & Add to Calendar */}
            <div className={`flex flex-wrap gap-3 pt-4 border-t ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]"}`}>
              {wedding.location_info.groom_family?.map_url && (
                <a
                  href={wedding.location_info.groom_family.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 min-w-[140px] text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow ${
                    isNightMode ? "bg-[#DDB36E] text-[#121A15] hover:bg-[#FFF5DF]" : "bg-[#82916D] text-[#F8F3E8] hover:bg-[#6B7A57]"
                  }`}
                >
                  Xem bản đồ Map
                </a>
              )}
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 min-w-[140px] text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow ${
                  isNightMode ? "bg-[#A6674E] text-[#F8F3E8] hover:bg-[#8A533E]" : "bg-[#A6674E] text-[#F8F3E8] hover:bg-[#8A533E]"
                }`}
              >
                Thêm vào Lịch
              </a>
            </div>
          </div>
        </section>

        {/* ── 9. COUNTDOWN ── */}
        <section className={`py-8 border-b text-center space-y-6 ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]/60"}`}>
          <div className="space-y-2 max-w-lg mx-auto">
            <span className={`text-xs uppercase tracking-widest font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
              Đếm Nắng Chờ Ngày
            </span>
            <h2 className={`font-serif text-2xl md:text-3xl font-medium ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
              Còn {timeLeft.days} buổi sớm
            </h2>
            <p className={`text-sm ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>trước khi khu vườn ngày cưới nở hoa.</p>
          </div>

          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            <div className={`p-3 rounded-2xl border ${isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30" : "bg-[#F8F3E8] border-[#C9D0C4]"}`}>
              <span className={`block font-serif text-2xl md:text-3xl font-bold ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
                {timeLeft.days}
              </span>
              <span className={`text-[11px] uppercase tracking-wider font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                Ngày
              </span>
            </div>
            <div className={`p-3 rounded-2xl border ${isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30" : "bg-[#F8F3E8] border-[#C9D0C4]"}`}>
              <span className={`block font-serif text-2xl md:text-3xl font-bold ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
                {timeLeft.hours}
              </span>
              <span className={`text-[11px] uppercase tracking-wider font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                Giờ
              </span>
            </div>
            <div className={`p-3 rounded-2xl border ${isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30" : "bg-[#F8F3E8] border-[#C9D0C4]"}`}>
              <span className={`block font-serif text-2xl md:text-3xl font-bold ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
                {timeLeft.minutes}
              </span>
              <span className={`text-[11px] uppercase tracking-wider font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                Phút
              </span>
            </div>
            <div className={`p-3 rounded-2xl border ${isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30" : "bg-[#F8F3E8] border-[#C9D0C4]"}`}>
              <span className={`block font-serif text-2xl md:text-3xl font-bold ${isNightMode ? "text-[#FFF5DF]" : "text-[#56604D]"}`}>
                {timeLeft.seconds}
              </span>
              <span className={`text-[11px] uppercase tracking-wider font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                Giây
              </span>
            </div>
          </div>
        </section>

        {/* ── 10. RSVP AND GUEST FLOWER ── */}
        <section className={`py-8 border-b space-y-8 ${isNightMode ? "border-[#DDB36E]/20" : "border-[#C9D0C4]/60"}`}>
          <GardenRSVP
            weddingId={wedding.id}
            defaultGuestName={to}
            onSuccessCallback={handleRSVPSuccess}
          />

          {/* Shared Guest Flower Cluster Card */}
          <div className={`max-w-2xl mx-auto text-center space-y-6 p-6 md:p-8 rounded-3xl shadow-sm border ${
            isNightMode ? "bg-[#1C2820] border-[#DDB36E]/30 text-[#FFF5DF]" : "bg-[#F8F3E8] border-[#C9D0C4] text-[#56604D]"
          }`}>
            <div className="space-y-1">
              <h4 className={`text-xs uppercase tracking-[0.2em] font-semibold ${isNightMode ? "text-[#DDB36E]" : "text-[#A6674E]"}`}>
                Khu Vườn Của Những Người Thương
              </h4>
              <p className={`text-xs ${isNightMode ? "text-[#E2DACB]" : "text-[#6A4D3E]"}`}>
                Chạm vào từng bông hoa để xem tên và lời chúc từ người thương
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-2">
              {guestFlowers.map((gf) => (
                <GuestFlowerSVG
                  key={gf.id}
                  name={gf.name}
                  content={gf.content}
                  className="w-14 h-14"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. THE FAMILY GARDEN (FOOTER CONCLUSION) ── */}
        <section className={`py-12 text-center space-y-6 rounded-3xl p-8 shadow-lg border ${
          isNightMode ? "bg-[#0E1511] text-[#F8F3E8] border-[#DDB36E]/30" : "bg-[#303B35] text-[#F8F3E8] border-[#C9D0C4]"
        }`}>
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl text-[#DDB36E] font-medium">
              Gia Đình
            </h2>
            <p className="font-serif italic text-base md:text-lg leading-relaxed text-[#F8F3E8]/90">
              &quot;Ngày cưới không phải lúc khu vườn hoàn thành.<br />
              Đó là ngày chúng mình bắt đầu chăm sóc nó dưới một cái tên mới:<br />
              <strong className="font-semibold text-[#DDB36E] font-sans not-italic">Gia đình.</strong>&quot;
            </p>
            <div className="pt-4 border-t border-[#F8F3E8]/20 space-y-1 text-xs text-[#C9D0C4]">
              <p className="font-semibold text-sm text-[#F8F3E8]">
                {wedding.groom_name} &amp; {wedding.bride_name}
              </p>
              <p className="font-mono">10 · 10 · 2026</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
