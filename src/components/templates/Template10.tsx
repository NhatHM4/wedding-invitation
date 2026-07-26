"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wedding, Wish } from "@/types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import FloatingHearts from "@/components/common/FloatingHearts";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Volume2, 
  VolumeX, 
  Heart, 
  Send, 
  CheckCircle2, 
  X, 
  Sparkles,
  Camera,
  Compass
} from "lucide-react";

interface Template10Props {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

export default function Template10({ wedding, to, wishes: initialWishes }: Template10Props) {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Wishes & RSVP State
  const [wishesList, setWishesList] = useState<Wish[]>(initialWishes || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [rsvpForm, setRsvpForm] = useState({
    fullName: to && to !== "Quý khách" ? to : "",
    attending: "yes" as "yes" | "no",
    guestCount: 1,
    side: "groom" as "groom" | "bride",
    message: "",
  });

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Groom & Bride Names & Data Fallbacks
  const groomName = wedding.groom_name || "Minh Hoàng";
  const brideName = wedding.bride_name || "Mai Hương";
  const eventDateStr = wedding.event_date || "2026-10-10T11:00:00+07:00";
  const musicUrl = wedding.music_url || "/thiepmaudovang/audio/bg-music.mp3";

  // Gallery Images Fallback
  const galleryImages = (wedding.images && wedding.images.length > 0)
    ? wedding.images
    : [
        "/thiepmaudovang/images/cover.jpg",
        "/thiepmaudovang/images/gallery-1.jpg",
        "/thiepmaudovang/images/gallery-2.jpg",
        "/thiepmaudovang/images/gallery-3.jpg",
      ];

  // Countdown calculation
  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(eventDateStr) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [eventDateStr]);

  // Audio setup
  useEffect(() => {
    if (musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [musicUrl]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  // Submit RSVP Form
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.fullName.trim()) {
      setSubmitError("Vui lòng nhập họ và tên của bạn");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Submit to Cinematic RSVP API
      await fetch("/api/cinematic/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: rsvpForm.fullName,
          attending: rsvpForm.attending,
          guestCount: Number(rsvpForm.guestCount),
          side: rsvpForm.side,
          message: rsvpForm.message,
        }),
      });

      // 2. Submit Wish to Wishes API if message exists
      if (rsvpForm.message.trim()) {
        const wishRes = await fetch("/api/wishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wedding_id: wedding.id,
            guest_name: rsvpForm.fullName,
            content: rsvpForm.message,
          }),
        });

        const wishData = await wishRes.json();
        if (wishData.success && wishData.data) {
          setWishesList((prev) => [wishData.data, ...prev]);
        }
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error("RSVP Submission Error:", err);
      setSubmitError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar Link Generator
  const generateGoogleCalendarUrl = (isGroom: boolean) => {
    const info = isGroom ? wedding.location_info?.groom_family : wedding.location_info?.bride_family;
    const title = encodeURIComponent(`Lễ Cưới Của ${groomName} & ${brideName}`);
    const details = encodeURIComponent(`Trân trọng kính mời quý khách đến tham dự tiệc cưới của ${groomName} & ${brideName}.`);
    const location = encodeURIComponent(info?.address || "Địa điểm tiệc cưới");
    const startTime = new Date(eventDateStr).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endTime = new Date(new Date(eventDateStr).getTime() + 3 * 3600000).toISOString().replace(/-|:|\.\d\d\d/g, "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#F4EFE7] text-[#332A27] font-sans antialiased selection:bg-[#642F35] selection:text-[#F4EFE7] relative overflow-x-hidden">
      
      {/* Falling Hearts Vector Particles Layer */}
      <FloatingHearts 
        count={36} 
        colors={[
          "rgba(100, 47, 53, ",  // Deep Burgundy
          "rgba(180, 149, 103, ", // Oxidized Gold
          "rgba(163, 62, 73, ",  // Soft Crimson
          "rgba(212, 175, 122, ", // Warm Amber Gold
        ]} 
      />

      {/* Background Subtle Texture & Fine Rules */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 z-0 bg-repeat" 
        style={{ backgroundImage: `radial-gradient(#B49567 0.6px, transparent 0.6px)`, backgroundSize: "28px 28px" }} 
      />

      {/* Floating Animated Golden Particles / Petals Ambient Effect */}
      {!shouldReduceMotion && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-tr from-[#B49567]/30 to-[#642F35]/20 blur-[1px]"
              style={{
                width: 8 + (i * 3) % 8,
                height: 8 + (i * 5) % 8,
                left: `${(i * 12 + 5) % 95}%`,
                top: `${(i * 15 + 10) % 90}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Audio Toggle Button with Audio Equalizer Effect */}
      <button
        onClick={toggleMusic}
        aria-label="Tắt hoặc bật nhạc nền"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#642F35] text-[#F4EFE7] shadow-xl border border-[#B49567]/50 hover:bg-[#4E2429] transition-all duration-300 group"
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-[2px] h-4">
              <motion.span animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-[#B49567] rounded-full" />
              <motion.span animate={{ height: ["60%", "30%", "90%", "20%", "60%"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-[#B49567] rounded-full" />
              <motion.span animate={{ height: ["40%", "80%", "20%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-[2px] bg-[#B49567] rounded-full" />
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase hidden sm:inline text-[#E8DDCF]">Âm Nhạc</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#E8DDCF]" />
            <span className="text-[11px] font-mono tracking-wider uppercase hidden sm:inline text-[#E8DDCF]">Phát Nhạc</span>
          </>
        )}
      </button>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-[680px] mx-auto min-h-screen bg-[#F4EFE7] shadow-[0_0_60px_rgba(51,42,39,0.09)] border-x border-[#E8DDCF]">
        
        {/* SECTION 1: OPENING — TWO SEPARATE LIVES */}
        <section className="min-h-[100dvh] flex flex-col justify-between items-center text-center px-6 py-12 relative border-b border-[#B49567]/20">
          
          {/* Top Editorial Eyebrow */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="pt-6"
          >
            <span className="text-[11px] font-mono tracking-[0.28em] text-[#B49567] uppercase block mb-2">
              — Chương 01: Khởi Đầu —
            </span>
            <span className="font-[family-name:var(--font-cormorant-garamond)] text-xs italic text-[#69717A] tracking-widest block">
              When Two Timelines Became One
            </span>
          </motion.div>

          {/* Central Names & Dual Lines Visual */}
          <div className="w-full my-auto py-8">
            {/* Groom Track */}
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#69717A] block mb-1">Dòng Thời Gian A</span>
              <h1 className="font-[family-name:var(--font-cormorant-garamond)] text-4xl sm:text-6xl font-light text-[#642F35] tracking-tight">
                {groomName}
              </h1>
            </motion.div>

            {/* Visual Parallel Line Break */}
            <div className="relative w-full max-w-[280px] mx-auto h-28 my-4 flex justify-between items-center px-8">
              {/* Left Line (Groom) */}
              <motion.div 
                animate={{ height: ["60%", "100%", "60%"] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-[1.5px] bg-gradient-to-b from-[#642F35] via-[#B49567] to-transparent rounded-full opacity-70" 
              />
              
              {/* Center Poetic Symbol */}
              <div className="px-4 text-center">
                <span className="font-[family-name:var(--font-alexbrush)] text-3xl text-[#642F35] block">
                  &amp;
                </span>
              </div>

              {/* Right Line (Bride) */}
              <motion.div 
                animate={{ height: ["100%", "60%", "100%"] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-[1.5px] bg-gradient-to-b from-transparent via-[#B49567] to-[#642F35] rounded-full opacity-70" 
              />
            </div>

            {/* Bride Track */}
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#69717A] block mb-1">Dòng Thời Gian B</span>
              <h1 className="font-[family-name:var(--font-cormorant-garamond)] text-4xl sm:text-6xl font-light text-[#642F35] tracking-tight">
                {brideName}
              </h1>
            </motion.div>

            {/* Opening Poetic Quote */}
            <motion.p 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 text-sm sm:text-base text-[#332A27]/90 leading-relaxed font-light max-w-[420px] mx-auto px-4 italic"
            >
              &ldquo;Trước khi gặp nhau, chúng mình đã đi qua hai hành trình rất khác.&rdquo;
            </motion.p>
          </div>

          {/* Interactive Trigger Button to Scroll */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pb-8"
          >
            <button
              onClick={() => {
                const section = document.getElementById("profiles-section");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex flex-col items-center gap-2 text-[#642F35] hover:text-[#B49567] transition-colors duration-300"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.2em]">Khám Phá Nhân Vật Chính</span>
              <div className="w-5 h-8 border border-[#B49567]/50 rounded-full flex items-start justify-center p-1">
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="w-1 h-2 bg-[#642F35] rounded-full"
                />
              </div>
            </button>
          </motion.div>

        </section>

        {/* SECTION: DETAILED GROOM & BRIDE PROFILES WITH SLOW & ELEGANT SCROLL COLOR REVEAL */}
        <section id="profiles-section" className="py-20 px-6 sm:px-10 border-b border-[#B49567]/20 relative bg-[#E8DDCF]/20">
          
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#B49567] uppercase block mb-2">
              — Chân Dung Hai Nhân Vật —
            </span>
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl sm:text-4xl text-[#642F35] font-light">
              Chú Rể &amp; Cô Dâu
            </h2>
            <div className="w-12 h-[1px] bg-[#B49567] mx-auto mt-4" />
          </div>

          {/* Dual Profile Layout */}
          <div className="space-y-16">
            
            {/* Groom Profile */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="bg-[#F4EFE7] border border-[#B49567]/40 p-6 sm:p-8 rounded-lg shadow-sm relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Groom Portrait Frame with Slow Scroll Color Reveal */}
                <motion.div 
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  className="sm:col-span-5 relative aspect-[3/4] w-full rounded border-2 border-[#B49567]/40 overflow-hidden shadow-md group"
                >
                  <Image
                    src={galleryImages[0]}
                    alt={`Chú Rể ${groomName}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#642F35]/40 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[#F4EFE7] bg-[#642F35]/80 px-2.5 py-1 rounded tracking-wider uppercase">
                    Chú Rể
                  </span>
                </motion.div>

                {/* Groom Info Text */}
                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B49567] block mb-1">Architect &amp; Explorer</span>
                    <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-[#642F35]">
                      {groomName}
                    </h3>
                  </div>

                  <p className="text-xs text-[#332A27]/85 leading-relaxed font-light">
                    Một chàng trai điềm tĩnh, yêu thích không gian kiến trúc, sự tỉ mỉ và những bản nhạc cổ điển. Luôn tin rằng mỗi người chúng ta là một mảnh ghép kiến tạo nên vẻ đẹp của cuộc sống.
                  </p>

                  <div className="pt-2 border-t border-[#E8DDCF] space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#69717A]">
                      <Compass className="w-3.5 h-3.5 text-[#B49567]" />
                      <span>Sở thích: Đọc sách, cà phê chiều &amp; du lịch nhiếp ảnh</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#69717A]">
                      <Heart className="w-3.5 h-3.5 text-[#642F35]" />
                      <span className="italic font-[family-name:var(--font-cormorant-garamond)] text-sm text-[#642F35]">
                        &ldquo;Bên em, mọi bão giông dừng lại ngoài cánh cửa.&rdquo;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bride Profile */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#F4EFE7] border border-[#B49567]/40 p-6 sm:p-8 rounded-lg shadow-sm relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Bride Info Text (Left on Desktop) */}
                <div className="sm:col-span-7 space-y-4 order-2 sm:order-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B49567] block mb-1">Artist &amp; Storyteller</span>
                    <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-[#642F35]">
                      {brideName}
                    </h3>
                  </div>

                  <p className="text-xs text-[#332A27]/85 leading-relaxed font-light">
                    Cô gái mang tâm hồn tự do, giàu lòng trắc ẩn và nét dịu dàng mộc mạc. Yêu những sắc màu hội họa, hoa cỏ thiên nhiên và ước mơ cùng người thương đi qua muôn ngàn dặm đường.
                  </p>

                  <div className="pt-2 border-t border-[#E8DDCF] space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#69717A]">
                      <Camera className="w-3.5 h-3.5 text-[#B49567]" />
                      <span>Sở thích: Vẽ tranh, trồng hoa &amp; ghi chép nhật ký</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#69717A]">
                      <Heart className="w-3.5 h-3.5 text-[#642F35]" />
                      <span className="italic font-[family-name:var(--font-cormorant-garamond)] text-sm text-[#642F35]">
                        &ldquo;Gặp anh là điều bình yên nhất đời em.&rdquo;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bride Portrait Frame with Slow Scroll Color Reveal */}
                <motion.div 
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  className="sm:col-span-5 relative aspect-[3/4] w-full rounded border-2 border-[#B49567]/40 overflow-hidden shadow-md group order-1 sm:order-2"
                >
                  <Image
                    src={galleryImages[1] || galleryImages[0]}
                    alt={`Cô Dâu ${brideName}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#642F35]/40 via-transparent to-transparent" />
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[#F4EFE7] bg-[#642F35]/80 px-2.5 py-1 rounded tracking-wider uppercase">
                    Cô Dâu
                  </span>
                </motion.div>
              </div>
            </motion.div>

          </div>

        </section>

        {/* SECTION 2: TWO TIMELINES (PARALLEL MILESTONES WITH SLOW SCROLL COLOR REVEAL) */}
        <section id="timeline-section" className="py-20 px-6 sm:px-10 border-b border-[#B49567]/20 relative">
          
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#B49567] uppercase block mb-2">
              — Chương 02: Hai Đường Thẳng Song Song —
            </span>
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl sm:text-4xl text-[#642F35] font-light">
              Ký Ức Độc Bản
            </h2>
            <div className="w-12 h-[1px] bg-[#B49567] mx-auto mt-4" />
          </div>

          {/* Dual Parallel Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
            {/* Center Vertical Separator for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#B49567]/30 -translate-x-1/2" />

            {/* Groom's Milestones Track */}
            <div className="space-y-10">
              <div className="border-b border-[#642F35]/20 pb-3 mb-6 flex items-center justify-between">
                <span className="font-[family-name:var(--font-cormorant-garamond)] text-xl text-[#642F35] font-medium">
                  {groomName}
                </span>
                <span className="text-[10px] font-mono text-[#69717A] uppercase tracking-wider">Hành Trình A</span>
              </div>

              {/* Milestone 1 */}
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="bg-[#E8DDCF]/40 p-5 rounded border-l-2 border-[#642F35] hover:bg-[#E8DDCF]/60 transition-colors group"
              >
                <span className="text-xs font-mono text-[#B49567] block mb-1">1998 — Quê Hương</span>
                <h4 className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#332A27] mb-2 font-medium">
                  Những Bước Chân Đầu Tiên
                </h4>
                <p className="text-xs text-[#332A27]/80 leading-relaxed font-light mb-3">
                  Những năm tháng tuổi thơ gắn liền với góc phố bình yên, nuôi dưỡng ước mơ và hoài vọng trưởng thành.
                </p>

                {/* Archival Photo Insert with Slow Scroll Color Reveal */}
                <motion.div 
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  className="relative w-full aspect-[16/9] overflow-hidden rounded border border-[#B49567]/30 mt-2 shadow-sm"
                >
                  <Image
                    src={galleryImages[0]}
                    alt="Ký ức tuổi thơ chú rể"
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </motion.div>

              {/* Milestone 2 */}
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="bg-[#E8DDCF]/40 p-5 rounded border-l-2 border-[#642F35] hover:bg-[#E8DDCF]/60 transition-colors group"
              >
                <span className="text-xs font-mono text-[#B49567] block mb-1">2018 — Trải Nghiệm &amp; Học Hỏi</span>
                <h4 className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#332A27] mb-2 font-medium">
                  Tự Lập Và Khát Vọng
                </h4>
                <p className="text-xs text-[#332A27]/80 leading-relaxed font-light mb-3">
                  Bước vào cuộc sống tự lập, vượt qua từng thử thách để khẳng định bản thân và kiên trì với đam mê.
                </p>

                <motion.div 
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  className="relative w-full aspect-[16/9] overflow-hidden rounded border border-[#B49567]/30 mt-2 shadow-sm"
                >
                  <Image
                    src={galleryImages[1] || galleryImages[0]}
                    alt="Tự lập và khát vọng"
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </motion.div>

              {/* Milestone 3 */}
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-[#E8DDCF]/40 p-5 rounded border-l-2 border-[#642F35] hover:bg-[#E8DDCF]/60 transition-colors group"
              >
                <span className="text-xs font-mono text-[#B49567] block mb-1">2022 — Sẵn Sàng</span>
                <h4 className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#332A27] mb-2 font-medium">
                  Góp Nhặt Mảnh Ghép
                </h4>
                <p className="text-xs text-[#332A27]/80 leading-relaxed font-light mb-3">
                  Xây dựng sự nghiệp vững vàng, kiên nhẫn chờ đợi một mảnh ghép trọn vẹn dành riêng cho mình.
                </p>

                <motion.div 
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  className="relative w-full aspect-[16/9] overflow-hidden rounded border border-[#B49567]/30 mt-2 shadow-sm"
                >
                  <Image
                    src={galleryImages[2] || galleryImages[0]}
                    alt="Sẵn sàng chờ đợi"
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Bride's Milestones Track */}
            <div className="space-y-10">
              <div className="border-b border-[#642F35]/20 pb-3 mb-6 flex items-center justify-between">
                <span className="font-[family-name:var(--font-cormorant-garamond)] text-xl text-[#642F35] font-medium">
                  {brideName}
                </span>
                <span className="text-[10px] font-mono text-[#69717A] uppercase tracking-wider">Hành Trình B</span>
              </div>

              {/* Milestone 1 */}
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="bg-[#E8DDCF]/40 p-5 rounded border-r-2 border-[#B49567] text-right hover:bg-[#E8DDCF]/60 transition-colors group"
              >
                <span className="text-xs font-mono text-[#B49567] block mb-1">2000 — Ký Ức Nhỏ</span>
                <h4 className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#332A27] mb-2 font-medium">
                  Nụ Cười Trong Trẻo
                </h4>
                <p className="text-xs text-[#332A27]/80 leading-relaxed font-light mb-3">
                  Lớn lên trong tình yêu thương của gia đình, mang tâm hồn tự do và trái tim ấm áp yêu thương nghệ thuật.
                </p>

                <motion.div 
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  className="relative w-full aspect-[16/9] overflow-hidden rounded border border-[#B49567]/30 mt-2 shadow-sm"
                >
                  <Image
                    src={galleryImages[1] || galleryImages[0]}
                    alt="Ký ức nhỏ cô dâu"
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </motion.div>

              {/* Milestone 2 */}
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="bg-[#E8DDCF]/40 p-5 rounded border-r-2 border-[#B49567] text-right hover:bg-[#E8DDCF]/60 transition-colors group"
              >
                <span className="text-xs font-mono text-[#B49567] block mb-1">2020 — Những Chuyến Đi</span>
                <h4 className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#332A27] mb-2 font-medium">
                  Lưu Giữ Khoảnh Khắc
                </h4>
                <p className="text-xs text-[#332A27]/80 leading-relaxed font-light mb-3">
                  Khám phá những miền đất mới, ghi chép lại cảm xúc qua ống kính và những dòng nhật ký dịu dàng.
                </p>

                <motion.div 
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  className="relative w-full aspect-[16/9] overflow-hidden rounded border border-[#B49567]/30 mt-2 shadow-sm"
                >
                  <Image
                    src={galleryImages[2] || galleryImages[0]}
                    alt="Khám phá miền đất mới"
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </motion.div>

              {/* Milestone 3 */}
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-[#E8DDCF]/40 p-5 rounded border-r-2 border-[#B49567] text-right hover:bg-[#E8DDCF]/60 transition-colors group"
              >
                <span className="text-xs font-mono text-[#B49567] block mb-1">2022 — Mở Trái Tim</span>
                <h4 className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#332A27] mb-2 font-medium">
                  Lắng Nghe Nhịp Đập
                </h4>
                <p className="text-xs text-[#332A27]/80 leading-relaxed font-light mb-3">
                  Hoàn thiện bản thân mỗi ngày, sẵn sàng dang rộng vòng tay đón nhận duyên số định mệnh.
                </p>

                <motion.div 
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  className="relative w-full aspect-[16/9] overflow-hidden rounded border border-[#B49567]/30 mt-2 shadow-sm"
                >
                  <Image
                    src={galleryImages[3] || galleryImages[0]}
                    alt="Đón nhận duyên số"
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

        </section>

        {/* SECTION 3: THE CROSSING (INTERSECTION MOMENT WITH MOTION) */}
        <section className="py-24 px-6 text-center bg-gradient-to-b from-[#F4EFE7] via-[#E8DDCF]/50 to-[#F4EFE7] border-b border-[#B49567]/20 relative overflow-hidden">
          
          {/* Animated Converging Lines */}
          <div className="w-full max-w-[320px] mx-auto h-32 relative mb-8 flex justify-center items-center">
            {/* SVG Converging Paths */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 320 128" fill="none">
              <path 
                d="M 20 0 Q 20 64 160 64" 
                stroke="#642F35" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
              />
              <path 
                d="M 300 0 Q 300 64 160 64" 
                stroke="#B49567" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
              />
              <path 
                d="M 160 64 L 160 128" 
                stroke="#642F35" 
                strokeWidth="2"
              />
            </svg>

            {/* Glowing Intersection Point */}
            <motion.div 
              animate={{ scale: [1, 1.25, 1], boxShadow: ["0 0 10px rgba(100,47,53,0.4)", "0 0 25px rgba(180,149,103,0.8)", "0 0 10px rgba(100,47,53,0.4)"] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="relative z-10 w-9 h-9 rounded-full bg-[#642F35] flex items-center justify-center border-2 border-[#B49567]"
            >
              <Sparkles className="w-4 h-4 text-[#B49567]" />
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#B49567] uppercase block mb-3">
              — Chương 03: Giao Thoa —
            </span>

            <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl sm:text-3xl text-[#642F35] font-light leading-relaxed max-w-[480px] mx-auto px-4 italic mb-6">
              &ldquo;Giữa hàng triệu khoảnh khắc có thể xảy ra, chúng mình đã gặp nhau đúng vào ngày ấy.&rdquo;
            </h3>

            <p className="text-xs text-[#69717A] max-w-[380px] mx-auto font-light leading-relaxed">
              Hai hành trình riêng biệt khép lại, nhường chỗ cho một chương mới ấm áp và đong đầy yêu thương.
            </p>
          </motion.div>

        </section>

        {/* SECTION 4: OUR SHARED STORY (UNIFIED TIMELINE WITH SLOW SCROLL COLOR REVEAL) */}
        <section className="py-20 px-6 sm:px-10 border-b border-[#B49567]/20">
          
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#B49567] uppercase block mb-2">
              — Chương 04: Hành Trình Chung —
            </span>
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl sm:text-4xl text-[#642F35] font-light">
              Một Dòng Thời Gian
            </h2>
            <div className="w-12 h-[1px] bg-[#B49567] mx-auto mt-4" />
          </div>

          {/* Vertical Unified Timeline Track */}
          <div className="relative border-l border-[#642F35]/40 pl-6 sm:pl-8 space-y-16 ml-2 sm:ml-4">
            
            {/* Event 1: First Meeting */}
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#F4EFE7] border-2 border-[#642F35] group-hover:bg-[#642F35] transition-colors" />
              
              <span className="text-xs font-mono text-[#B49567] block mb-1">Mùa Thu 2023</span>
              <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-[#642F35] mb-2 font-medium">
                Cuộc Gặp Định Mệnh
              </h3>
              <p className="text-xs sm:text-sm text-[#332A27]/80 leading-relaxed font-light mb-4 max-w-[460px]">
                Một tách cà phê chiều nghiút khói, cuộc trò chuyện kéo dài liên tục từ hoàng hôn cho đến khi phố đã lên đèn.
              </p>

              {/* Editorial Frame Image with Slow Scroll Color Reveal */}
              <motion.div 
                initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                onClick={() => setActiveImageIndex(0)}
                className="relative w-full aspect-[16/10] overflow-hidden rounded border border-[#B49567]/30 p-1.5 bg-[#E8DDCF]/50 shadow-sm cursor-pointer group-hover:shadow-md transition-shadow"
              >
                <Image
                  src={galleryImages[0]}
                  alt="Cuộc gặp định mệnh"
                  fill
                  sizes="(max-width: 680px) 100vw, 640px"
                  className="object-cover rounded-sm group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>

            {/* Event 2: First Trip */}
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#F4EFE7] border-2 border-[#B49567] group-hover:bg-[#B49567] transition-colors" />
              
              <span className="text-xs font-mono text-[#B49567] block mb-1">Đông 2024</span>
              <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-[#642F35] mb-2 font-medium">
                Chuyến Đi Đầu Tiên
              </h3>
              <p className="text-xs sm:text-sm text-[#332A27]/80 leading-relaxed font-light mb-4 max-w-[460px]">
                Cùng nhau đón bình minh trên ngọn đồi sương mờ, nhận ra rằng đi đâu không quan trọng bằng việc đi cùng ai.
              </p>

              <motion.div 
                initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                onClick={() => setActiveImageIndex(1)}
                className="relative w-full aspect-[16/10] overflow-hidden rounded border border-[#B49567]/30 p-1.5 bg-[#E8DDCF]/50 shadow-sm cursor-pointer group-hover:shadow-md transition-shadow"
              >
                <Image
                  src={galleryImages[1] || galleryImages[0]}
                  alt="Chuyến đi đầu tiên"
                  fill
                  sizes="(max-width: 680px) 100vw, 640px"
                  className="object-cover rounded-sm group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>

            {/* Event 3: Proposal */}
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#642F35] border-2 border-[#B49567]" />
              
              <span className="text-xs font-mono text-[#B49567] block mb-1">Xuân 2025</span>
              <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-[#642F35] mb-2 font-medium">
                Lời Hứa Trọn Đời
              </h3>
              <p className="text-xs sm:text-sm text-[#332A27]/80 leading-relaxed font-light mb-4 max-w-[460px]">
                Dưới ánh hoàng hôn bên bờ biển, chiếc nhẫn được trao cùng câu trả lời &ldquo;Em đồng ý&rdquo; nghẹn ngào hạnh phúc.
              </p>

              <motion.div 
                initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                onClick={() => setActiveImageIndex(2)}
                className="relative w-full aspect-[16/10] overflow-hidden rounded border border-[#B49567]/30 p-1.5 bg-[#E8DDCF]/50 shadow-sm cursor-pointer group-hover:shadow-md transition-shadow"
              >
                <Image
                  src={galleryImages[2] || galleryImages[0]}
                  alt="Lời hứa trọn đời"
                  fill
                  sizes="(max-width: 680px) 100vw, 640px"
                  className="object-cover rounded-sm group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>

          </div>

        </section>

        {/* SECTION 5: THE PROMISE (RESTRAINED NEGATIVE SPACE WITH MOTION) */}
        <section className="py-28 px-6 text-center border-b border-[#B49567]/20 relative">
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-[460px] mx-auto space-y-6"
          >
            <Heart className="w-6 h-6 text-[#642F35] mx-auto stroke-1 animate-pulse" />
            
            <p className="font-[family-name:var(--font-cormorant-garamond)] text-2xl sm:text-3xl text-[#332A27] font-light leading-relaxed italic">
              &ldquo;Anh không hứa mọi ngày đều hoàn hảo.<br />
              Nhưng anh hứa sẽ cùng em đi qua tất cả những ngày ấy.&rdquo;
            </p>

            <span className="font-[family-name:var(--font-alexbrush)] text-4xl text-[#642F35] block pt-4">
              {groomName} &amp; {brideName}
            </span>
          </motion.div>
        </section>

        {/* SECTION 6: WEDDING REVEAL & POETIC COUNTDOWN */}
        <section className="py-20 px-6 sm:px-10 border-b border-[#B49567]/20 bg-[#E8DDCF]/30">
          
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#B49567] uppercase block mb-2">
              — Chương 06: Ngày Chung Đôi —
            </span>
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl sm:text-4xl text-[#642F35] font-light">
              Thông Tin Lễ Cưới
            </h2>
            <div className="w-12 h-[1px] bg-[#B49567] mx-auto mt-4" />
          </div>

          {/* Poetic Sentence Countdown */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F4EFE7] border border-[#B49567]/40 p-6 rounded-lg text-center shadow-sm mb-12"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-[#69717A] block mb-2">
              Đếm Ngược Thời Gian
            </span>
            <p className="font-[family-name:var(--font-cormorant-garamond)] text-xl sm:text-2xl text-[#642F35]">
              Còn <span className="font-semibold text-[#642F35] text-2xl">{timeLeft.days}</span> ngày,{" "}
              <span className="font-semibold text-[#642F35] text-2xl">{timeLeft.hours}</span> giờ và{" "}
              <span className="font-semibold text-[#642F35] text-2xl">{timeLeft.minutes}</span> phút để bắt đầu chương mới.
            </p>
          </motion.div>

          {/* Family Location Tabs (Groom / Bride) */}
          <div className="flex justify-center mb-8 gap-4">
            <button
              onClick={() => setActiveTab("groom")}
              className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeTab === "groom"
                  ? "bg-[#642F35] text-[#F4EFE7] shadow"
                  : "bg-[#E8DDCF] text-[#332A27] hover:bg-[#D5C6B3]"
              }`}
            >
              Nhà Trai (Chú Rể)
            </button>
            <button
              onClick={() => setActiveTab("bride")}
              className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeTab === "bride"
                  ? "bg-[#642F35] text-[#F4EFE7] shadow"
                  : "bg-[#E8DDCF] text-[#332A27] hover:bg-[#D5C6B3]"
              }`}
            >
              Nhà Gái (Cô Dâu)
            </button>
          </div>

          {/* Location Content */}
          <AnimatePresence mode="wait">
            {activeTab === "groom" ? (
              <motion.div
                key="groom-info"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-[#F4EFE7] border border-[#B49567]/30 p-6 sm:p-8 rounded-lg shadow-sm space-y-6"
              >
                <div className="text-center border-b border-[#E8DDCF] pb-4">
                  <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-[#642F35]">
                    Lễ Thành Hôn — Tiệc Nhà Trai
                  </h3>
                  <p className="text-xs text-[#69717A] mt-1">
                    Thân phụ: {wedding.location_info?.groom_family?.father_name || "Nguyễn Văn A"}<br />
                    Thân mẫu: {wedding.location_info?.groom_family?.mother_name || "Lê Thị B"}
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#332A27]">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#B49567] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[#642F35]">Thời Gian</span>
                      <span>{wedding.location_info?.groom_family?.time || "11:00"} — {wedding.location_info?.groom_family?.date || "Thứ Bảy, ngày 10/10/2026"}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#B49567] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[#642F35]">Địa Điểm</span>
                      <span>{wedding.location_info?.groom_family?.address || "123 Đường Láng, Đống Đa, Hà Nội"}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E8DDCF]">
                  <a
                    href={wedding.location_info?.groom_family?.map_url || "https://maps.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#642F35] text-[#F4EFE7] rounded text-xs font-mono uppercase tracking-wider hover:bg-[#4E2429] transition-colors"
                  >
                    <MapPin className="w-4 h-4" /> Xem Bản Đồ
                  </a>
                  <a
                    href={generateGoogleCalendarUrl(true)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-[#642F35] text-[#642F35] rounded text-xs font-mono uppercase tracking-wider hover:bg-[#642F35] hover:text-[#F4EFE7] transition-colors"
                  >
                    <Calendar className="w-4 h-4" /> Thêm Vào Lịch
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="bride-info"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-[#F4EFE7] border border-[#B49567]/30 p-6 sm:p-8 rounded-lg shadow-sm space-y-6"
              >
                <div className="text-center border-b border-[#E8DDCF] pb-4">
                  <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-[#642F35]">
                    Lễ Vu Quy — Tiệc Nhà Gái
                  </h3>
                  <p className="text-xs text-[#69717A] mt-1">
                    Thân phụ: {wedding.location_info?.bride_family?.father_name || "Trần Văn C"}<br />
                    Thân mẫu: {wedding.location_info?.bride_family?.mother_name || "Phạm Thị D"}
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#332A27]">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#B49567] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[#642F35]">Thời Gian</span>
                      <span>{wedding.location_info?.bride_family?.time || "11:00"} — {wedding.location_info?.bride_family?.date || "Thứ Bảy, ngày 10/10/2026"}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#B49567] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[#642F35]">Địa Điểm</span>
                      <span>{wedding.location_info?.bride_family?.address || "456 Nguyễn Huệ, Quận 1, TP. HCM"}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E8DDCF]">
                  <a
                    href={wedding.location_info?.bride_family?.map_url || "https://maps.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#642F35] text-[#F4EFE7] rounded text-xs font-mono uppercase tracking-wider hover:bg-[#4E2429] transition-colors"
                  >
                    <MapPin className="w-4 h-4" /> Xem Bản Đồ
                  </a>
                  <a
                    href={generateGoogleCalendarUrl(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-[#642F35] text-[#642F35] rounded text-xs font-mono uppercase tracking-wider hover:bg-[#642F35] hover:text-[#F4EFE7] transition-colors"
                  >
                    <Calendar className="w-4 h-4" /> Thêm Vào Lịch
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </section>

        {/* SECTION 7: INVITATION & LETTER-STYLE RSVP */}
        <section className="py-20 px-6 sm:px-10 border-b border-[#B49567]/20">
          
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#B49567] uppercase block mb-2">
              — Chương 07: Xác Nhận Tham Dự —
            </span>
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl sm:text-4xl text-[#642F35] font-light mb-3">
              Gửi Lời Hồi Đáp
            </h2>
            <p className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#332A27]/80 italic max-w-[420px] mx-auto">
              &ldquo;Câu chuyện này sẽ trọn vẹn hơn khi có bạn ở đó.&rdquo;
            </p>
          </div>

          {/* RSVP Letter Box */}
          <div className="bg-[#E8DDCF]/40 border border-[#B49567]/40 p-6 sm:p-8 rounded-lg shadow-sm relative">
            
            {submitSuccess ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#642F35] mx-auto stroke-1" />
                <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-[#642F35]">
                  Cảm Ơn Bạn Đã Xác Nhận!
                </h3>
                <p className="text-xs text-[#332A27]/80 max-w-[360px] mx-auto">
                  Thông tin tham dự và lời chúc của bạn đã được ghi nhận. Chúng mình rất mong chờ được đón tiếp bạn trong ngày vui!
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 px-6 py-2 border border-[#642F35] text-[#642F35] rounded text-xs font-mono uppercase tracking-wider hover:bg-[#642F35] hover:text-[#F4EFE7] transition-colors"
                >
                  Gửi Phản Hồi Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-6">
                
                {submitError && (
                  <div className="p-3 bg-[#642F35]/10 border border-[#642F35]/30 text-[#642F35] text-xs rounded text-center">
                    {submitError}
                  </div>
                )}

                {/* Full Name Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#642F35] mb-1.5">
                    Họ Và Tên Của Bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.fullName}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, fullName: e.target.value })}
                    placeholder="Nhập họ và tên..."
                    className="w-full px-4 py-2.5 bg-[#F4EFE7] border border-[#B49567]/50 rounded text-xs text-[#332A27] focus:outline-none focus:border-[#642F35] transition-colors"
                  />
                </div>

                {/* Attending Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <label 
                    className={`flex items-center justify-center gap-2 p-3 rounded border text-xs font-mono cursor-pointer transition-all ${
                      rsvpForm.attending === "yes"
                        ? "bg-[#642F35] text-[#F4EFE7] border-[#642F35]"
                        : "bg-[#F4EFE7] border-[#B49567]/40 text-[#332A27]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={rsvpForm.attending === "yes"}
                      onChange={() => setRsvpForm({ ...rsvpForm, attending: "yes" })}
                      className="sr-only"
                    />
                    Sẽ Sắp Xếp Đến Dự
                  </label>

                  <label 
                    className={`flex items-center justify-center gap-2 p-3 rounded border text-xs font-mono cursor-pointer transition-all ${
                      rsvpForm.attending === "no"
                        ? "bg-[#642F35] text-[#F4EFE7] border-[#642F35]"
                        : "bg-[#F4EFE7] border-[#B49567]/40 text-[#332A27]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={rsvpForm.attending === "no"}
                      onChange={() => setRsvpForm({ ...rsvpForm, attending: "no" })}
                      className="sr-only"
                    />
                    Rất Tiếc Không Thể Đến
                  </label>
                </div>

                {/* Guest Count & Side Selection */}
                {rsvpForm.attending === "yes" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#642F35] mb-1.5">
                        Số Người Đi Cùng
                      </label>
                      <select
                        value={rsvpForm.guestCount}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, guestCount: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 bg-[#F4EFE7] border border-[#B49567]/50 rounded text-xs text-[#332A27] focus:outline-none focus:border-[#642F35]"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>{num} người</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#642F35] mb-1.5">
                        Khách Mời Của Ai
                      </label>
                      <select
                        value={rsvpForm.side}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, side: e.target.value as "groom" | "bride" })}
                        className="w-full px-4 py-2.5 bg-[#F4EFE7] border border-[#B49567]/50 rounded text-xs text-[#332A27] focus:outline-none focus:border-[#642F35]"
                      >
                        <option value="groom">Khách Nhà Trai ({groomName})</option>
                        <option value="bride">Khách Nhà Gái ({brideName})</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Personal Message Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#642F35] mb-1.5">
                    Lời Chúc Độc Bản
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    placeholder="Gửi lời chúc yêu thương đến hai bạn..."
                    className="w-full px-4 py-2.5 bg-[#F4EFE7] border border-[#B49567]/50 rounded text-xs text-[#332A27] focus:outline-none focus:border-[#642F35] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#642F35] text-[#F4EFE7] rounded text-xs font-mono uppercase tracking-widest hover:bg-[#4E2429] transition-all flex items-center justify-center gap-2 shadow"
                >
                  {isSubmitting ? (
                    "Đang Gửi Phản Hồi..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Xác Nhận Tham Dự
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Wishes List Board */}
          {wishesList.length > 0 && (
            <div className="mt-12 space-y-4">
              <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-xl text-[#642F35] text-center mb-6">
                Lời Chúc Yêu Thương ({wishesList.length})
              </h3>
              
              <div className="max-h-[360px] overflow-y-auto space-y-3 pr-1">
                {wishesList.map((w, idx) => (
                  <div key={w.id || idx} className="bg-[#F4EFE7] border border-[#B49567]/30 p-4 rounded text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-[#642F35]">{w.guest_name}</span>
                      <span className="text-[10px] font-mono text-[#69717A]">
                        {w.created_at ? new Date(w.created_at).toLocaleDateString('vi-VN') : 'Mới đây'}
                      </span>
                    </div>
                    <p className="text-[#332A27]/80 font-light italic leading-relaxed">
                      &ldquo;{w.content}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* SECTION 8: CURATED EDITORIAL GALLERY WITH SLOW SCROLL COLOR REVEAL */}
        <section className="py-20 px-6 sm:px-10 border-b border-[#B49567]/20">
          
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#B49567] uppercase block mb-2">
              — Chương 08: Bộ Ảnh Kỷ Niệm —
            </span>
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl sm:text-4xl text-[#642F35] font-light">
              Album Nghệ Thuật
            </h2>
            <div className="w-12 h-[1px] bg-[#B49567] mx-auto mt-4" />
          </div>

          {/* Editorial Photo Sequence */}
          <div className="space-y-6">
            {/* 1. Main Immersive Full-Bleed Photograph */}
            <motion.div 
              initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
              whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImageIndex(0)}
              className="relative w-full aspect-[4/3] rounded overflow-hidden border border-[#B49567]/30 bg-[#E8DDCF] shadow-sm cursor-pointer group"
            >
              <Image
                src={galleryImages[0]}
                alt="Hình ảnh kỷ niệm 1"
                fill
                sizes="(max-width: 680px) 100vw, 640px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#642F35]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs font-mono text-[#F4EFE7] bg-[#642F35]/80 px-3 py-1.5 rounded">Xem Chi Tiết</span>
              </div>
            </motion.div>

            {/* 2. Paired Smaller Photographs */}
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.slice(1, 3).map((imgUrl, i) => (
                <motion.div 
                  key={i}
                  initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: "easeInOut" }}
                  onClick={() => setActiveImageIndex(i + 1)}
                  className="relative aspect-square rounded overflow-hidden border border-[#B49567]/30 bg-[#E8DDCF] shadow-sm cursor-pointer group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Hình ảnh kỷ niệm ${i + 2}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>

            {/* 3. Film Strip Moments */}
            {galleryImages.length > 3 && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                {galleryImages.slice(3).map((imgUrl, i) => (
                  <motion.div 
                    key={i}
                    initial={shouldReduceMotion ? false : { filter: "grayscale(100%)", opacity: 0.85 }}
                    whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: "easeInOut" }}
                    onClick={() => setActiveImageIndex(i + 3)}
                    className="relative aspect-[3/4] rounded overflow-hidden border border-[#B49567]/30 bg-[#E8DDCF] shadow-sm cursor-pointer group"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Hình ảnh kỷ niệm ${i + 4}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {activeImageIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveImageIndex(null)}
                className="fixed inset-0 z-50 bg-[#332A27]/90 backdrop-blur-sm p-4 flex items-center justify-center"
              >
                <div className="relative max-w-[90vw] max-h-[85vh] aspect-[3/4]">
                  <Image
                    src={galleryImages[activeImageIndex]}
                    alt="Xem ảnh lớn"
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                  <button
                    onClick={() => setActiveImageIndex(null)}
                    aria-label="Đóng ảnh lớn"
                    className="absolute -top-10 right-0 text-[#F4EFE7] hover:text-[#B49567]"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </section>

        {/* SECTION 9: CLOSING — CONTINUOUS UNENDING TIMELINE */}
        <section className="py-24 px-6 text-center relative overflow-hidden">
          
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#B49567] uppercase block mb-4">
            — Lời Kết —
          </span>

          <p className="font-[family-name:var(--font-cormorant-garamond)] text-2xl sm:text-3xl text-[#642F35] font-light leading-relaxed max-w-[480px] mx-auto italic mb-8">
            &ldquo;Ngày cưới không phải là kết thúc của câu chuyện.<br />
            Đó là ngày chúng mình bắt đầu viết tiếp<br />
            trên cùng một dòng thời gian.&rdquo;
          </p>

          <div className="space-y-1 mb-12">
            <span className="font-[family-name:var(--font-alexbrush)] text-4xl text-[#642F35] block">
              {groomName} &amp; {brideName}
            </span>
            <span className="text-xs font-mono text-[#B49567] tracking-widest uppercase block">
              10 . 10 . 2026
            </span>
          </div>

          {/* Continuing Line Exiting Page */}
          <div className="w-[1.5px] h-20 bg-gradient-to-b from-[#642F35] via-[#B49567] to-transparent mx-auto rounded-full" />

        </section>

      </div>
    </div>
  );
}
