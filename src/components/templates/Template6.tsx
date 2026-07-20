"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { Wedding, Wish } from "@/types";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Volume2,
  VolumeX,
  Send,
  Gift,
  ExternalLink,
  User,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { T6CanvasHearts, T6CanvasHeartsRef } from "../template6/T6CanvasHearts";
import T6FloralFalling from "../template6/T6FloralFalling";

// ── Types ──────────────────────────────────────────────────────────────────
interface Template6Props {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

// ── FadeSection Helper ─────────────────────────────────────────────────────
function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function Template6({ wedding, to, wishes }: Template6Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes);
  
  // RSVP states
  const [formName, setFormName] = useState("");
  const [formSide, setFormSide] = useState<"groom" | "bride">("groom");
  const [formAttending, setFormAttending] = useState<boolean | null>(null);
  const [formGuestCount, setFormGuestCount] = useState(1);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rsvpFeedback, setRsvpFeedback] = useState("");

  // Wish form states (separate or integrated)
  const [wishName, setWishName] = useState("");
  const [wishContent, setWishContent] = useState("");
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [wishFeedback, setWishFeedback] = useState("");

  // Bank Info modal
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [bankTab, setBankTab] = useState<"groom" | "bride">("groom");
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  // Photo lightbox
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Countdown timer
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasHeartsRef = useRef<T6CanvasHeartsRef>(null);
  
  // Target sections for scroll
  const sectionRsvpRef = useRef<HTMLDivElement>(null);
  const sectionWishesRef = useRef<HTMLDivElement>(null);
  const sectionEventsRef = useRef<HTMLDivElement>(null);

  // Initialize and update countdown
  useEffect(() => {
    if (!wedding.event_date) return;
    const targetDate = new Date(wedding.event_date).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, mins, secs });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [wedding.event_date]);

  // Audio setup
  useEffect(() => {
    if (wedding.music_url) {
      audioRef.current = new Audio(wedding.music_url);
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [wedding.music_url]);

  // Handle Mở Thiệp
  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay was blocked by browser. Music will start on interaction.", err);
        setIsPlaying(false);
      });
    }
  };

  // Toggle play/pause
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Copy to clipboard
  const handleCopy = (text: string, type: "groom" | "bride") => {
    navigator.clipboard.writeText(text);
    if (type === "groom") {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  // Emit canvas heart burst on click
  const handleHeartReact = (e: React.MouseEvent) => {
    if (canvasHeartsRef.current) {
      canvasHeartsRef.current.emit(e.clientX, e.clientY);
    }
  };

  // Handle RSVP Submit
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setRsvpFeedback("Vui lòng nhập tên của bạn!");
      return;
    }
    if (formAttending === null) {
      setRsvpFeedback("Vui lòng chọn trạng thái tham dự!");
      return;
    }

    setIsSubmitting(true);
    setRsvpFeedback("");

    // Build stylized content indicating RSVP status
    const rsvpStatus = formAttending
      ? `[Xác nhận: THAM DỰ - Đi cùng: ${formGuestCount} người - Bên ${formSide === "groom" ? "Nhà Trai" : "Nhà Gái"}]`
      : `[Xác nhận: TIẾC TIẾC VẮNG MẶT - Bên ${formSide === "groom" ? "Nhà Trai" : "Nhà Gái"}]`;
    
    const contentPayload = `${rsvpStatus} ${formMessage.trim() || "Chúc hai bạn trăm năm hạnh phúc!"}`;

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wedding_id: wedding.id,
          guest_name: formName.trim(),
          content: contentPayload,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        const addedWish: Wish = result.data || {
          id: Date.now(),
          wedding_id: wedding.id,
          guest_name: formName.trim(),
          content: contentPayload,
          created_at: new Date().toISOString(),
        };

        setLocalWishes((prev) => [addedWish, ...prev]);
        setIsSubmitted(true);
        setFormName("");
        setFormMessage("");
        setFormAttending(null);
        setFormGuestCount(1);
        setRsvpFeedback("Cảm ơn bạn đã phản hồi hỷ sự!");
      } else {
        setRsvpFeedback("Không thể kết nối. Vui lòng thử lại sau.");
      }
    } catch {
      setRsvpFeedback("Gửi thông tin thất bại. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle separate wishes form
  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishContent.trim()) {
      setWishFeedback("Vui lòng điền đủ tên và lời chúc!");
      return;
    }
    setIsSubmittingWish(true);
    setWishFeedback("");

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wedding_id: wedding.id,
          guest_name: wishName.trim(),
          content: wishContent.trim(),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        const addedWish: Wish = result.data || {
          id: Date.now(),
          wedding_id: wedding.id,
          guest_name: wishName.trim(),
          content: wishContent.trim(),
          created_at: new Date().toISOString(),
        };
        setLocalWishes((prev) => [addedWish, ...prev]);
        setWishName("");
        setWishContent("");
        setWishFeedback("Gửi lời chúc thành công! Cảm ơn bạn.");
        setTimeout(() => setWishFeedback(""), 4000);
      } else {
        setWishFeedback("Gửi thất bại. Hãy thử lại!");
      }
    } catch {
      setWishFeedback("Lỗi mạng. Hãy thử lại!");
    } finally {
      setIsSubmittingWish(false);
    }
  };

  const groomFamily = wedding.location_info?.groom_family;
  const brideFamily = wedding.location_info?.bride_family;
  
  // Format long date strings to readable local formats
  const displayEventDate = wedding.event_date
    ? new Date(wedding.event_date).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Đang cập nhật";

  const weddingImages = wedding.images && wedding.images.length > 0
    ? wedding.images
    : [
        "/thiepmaudovang/images/cover.jpg",
        "/thiepmaudovang/images/gallery-1.jpg",
        "/thiepmaudovang/images/gallery-2.jpg",
        "/thiepmaudovang/images/gallery-3.jpg",
        "/thiepmaudovang/images/gallery-4.jpg",
      ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % weddingImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + weddingImages.length) % weddingImages.length);
  };

  // Scroll to helper
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Calendar dates generation helper
  const renderCalendar = () => {
    // Generate dates for calendar of Wedding month
    // Let's assume the wedding date is Dec 12, 2026 for mock, or extract from wedding.event_date
    const dateObj = wedding.event_date ? new Date(wedding.event_date) : new Date("2026-12-12");
    const weddingDay = dateObj.getDate();
    
    // We render a generic grid of Dec 2026 or similar based on wedding date
    const daysInMonth = 31;
    const startOffset = 2; // Dec 2026 starts on Tuesday (offset 2)
    const days = [];
    
    // Empty cells
    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8 flex items-center justify-center text-transparent text-[10px]">.</div>);
    }
    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = d === weddingDay;
      days.push(
        <div
          key={`day-${d}`}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold relative transition ${
            isSelected
              ? "bg-[#8E4A49] text-[#FAF6F0] shadow-md font-bold scale-110"
              : "text-[#2B2D42] hover:bg-gray-100/60"
          }`}
        >
          {d}
          {isSelected && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[6px] text-[#8E4A49] font-bold">
              ❤
            </span>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#1E1E24]/90 sm:bg-[#121214] text-[#2B2D42] font-sans antialiased overflow-x-hidden relative">
      
      {/* Import Web Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style jsx global>{`
        .font-serif-luxury {
          font-family: 'Playfair Display', serif;
        }
        .font-handwritten-fancy {
          font-family: 'Great Vibes', cursive;
        }
        .font-sans-title {
          font-family: 'Montserrat', sans-serif;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(250, 246, 240, 0.2);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(142, 74, 73, 0.4);
          border-radius: 10px;
        }
        
        /* Glassmorphism utility */
        .glass-panel {
          background: rgba(250, 246, 240, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── 1. PORTAL GATE (SPLASH PAGE) ────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100vh" }}
            transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 w-full h-full flex flex-col justify-between items-center z-50 overflow-hidden bg-[#FAF6F0]"
          >
            {/* Elegant Background Image with Soft Blurring */}
            <div className="absolute inset-0 z-0">
              <Image
                src={weddingImages[0]}
                alt="Wedding Portal Cover"
                fill
                priority
                sizes="100vw"
                className="object-cover brightness-[0.9] blur-[2px] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-black/30 to-black/40" />
            </div>

            {/* Falling Floral Particles inside Cover */}
            <T6FloralFalling />

            {/* Content Top */}
            <div className="relative z-10 text-center pt-16 px-4">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-[10px] uppercase tracking-[0.3em] font-sans-title font-semibold text-[#FAF6F0]/90 text-shadow-sm"
              >
                Wedding Invitation
              </motion.span>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.0 }}
                className="w-16 h-[1px] bg-[#C5A880] mx-auto my-4 shadow-sm"
              />
            </div>

            {/* Couples Names (Cursive Signature) */}
            <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.0 }}
                className="font-handwritten-fancy text-6xl md:text-7xl text-[#FAF6F0] drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)] leading-tight"
              >
                {wedding.groom_name}
              </motion.h1>
              
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-serif-luxury text-2xl text-[#C5A880] italic my-2 drop-shadow-md"
              >
                &
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1.0 }}
                className="font-handwritten-fancy text-6xl md:text-7xl text-[#FAF6F0] drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)] leading-tight"
              >
                {wedding.bride_name}
              </motion.h1>
            </div>

            {/* Button bottom */}
            <div className="relative z-10 text-center pb-20 px-6 flex flex-col items-center gap-6 w-full">
              {to && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  className="bg-white/15 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-sm"
                >
                  <p className="text-[11px] font-sans-title tracking-wider text-[#FAF6F0]">
                    Kính gửi: <span className="font-bold text-[#C5A880]">{to}</span>
                  </p>
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                onClick={handleOpen}
                className="px-8 py-3.5 bg-gradient-to-r from-[#8E4A49] to-[#b06160] text-[#FAF6F0] rounded-full text-xs font-sans-title font-semibold uppercase tracking-[0.25em] shadow-[0_10px_30px_rgba(142,74,73,0.35)] border border-[#FAF6F0]/20 hover:scale-105 transition-all duration-300 relative group overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                Mở Thiệp Cưới
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. MAIN SCROLL CONTAINER (MOBILE VIEWPORT EMULATOR) ──────────────────── */}
      {isOpen && (
        <div className="w-full max-w-[480px] bg-[#FAF6F0] min-h-screen shadow-2xl relative flex flex-col pb-24 z-20">
          
          {/* Canvas particles layered beneath content but above base page */}
          <T6CanvasHearts ref={canvasHeartsRef} />
          <T6FloralFalling />

          {/* ── MUSIC & ACTIONS CONTROLS (FLOATERS) ── */}
          <div className="fixed top-4 right-4 z-40 flex flex-col gap-3">
            {/* Music Toggle Disc */}
            <button
              onClick={toggleMusic}
              className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/30 text-white shadow-lg transition-all duration-500 overflow-hidden relative ${
                isPlaying ? "bg-[#8E4A49] rotate-spin" : "bg-gray-600/90"
              }`}
              style={{
                animation: isPlaying ? "spin 6s linear infinite" : "none",
              }}
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            {/* Vinyl record spinning animation CSS injected inline */}
          </div>

          {/* ── SECTION: HERO SCROLL SHOWCASE ── */}
          <div className="relative w-full h-[85vh] overflow-hidden flex flex-col justify-end items-center p-6 text-center text-white">
            <div className="absolute inset-0 z-0">
              <Image
                src={weddingImages[0]}
                alt="Couple Main Hero"
                fill
                priority
                sizes="(max-width: 480px) 100vw, 480px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-black/30" />
            </div>

            <div className="relative z-10 w-full glass-panel rounded-3xl p-6 shadow-xl mb-4 border-white/40 flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-[0.25em] font-sans-title font-bold text-[#8E4A49] mb-1">
                Save the Date
              </span>
              <h2 className="font-handwritten-fancy text-4xl text-[#8E4A49] leading-tight my-1">
                {wedding.groom_name} & {wedding.bride_name}
              </h2>
              <div className="w-10 h-[1px] bg-[#C5A880]/70 my-3" />
              <p className="font-serif-luxury text-[13px] text-[#2B2D42] italic">
                {displayEventDate}
              </p>
              <div className="animate-bounce mt-4 text-[#8E4A49] cursor-pointer">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* ── SECTION: WELCOME & QUOTE ── */}
          <div className="px-6 py-12 text-center flex flex-col items-center bg-[#FAF6F0] relative z-10">
            <FadeSection className="flex flex-col items-center">
              <div className="text-[#8E4A49] opacity-40 mb-3">
                <Heart size={20} fill="#8E4A49" />
              </div>
              <h3 className="font-serif-luxury text-xl font-semibold tracking-wider text-[#2B2D42] uppercase mb-4">
                Lời Ngỏ
              </h3>
              <p className="font-serif-luxury text-sm leading-relaxed text-[#2B2D42]/80 italic max-w-[300px]">
                &ldquo;Được gặp nhau là duyên, cùng bước đi bên nhau là sự lựa chọn. 
                Cảm ơn đời đã cho chúng ta tìm thấy nhau giữa hàng triệu người.&rdquo;
              </p>
              <div className="w-12 h-[1px] bg-[#C5A880]/60 my-6" />
              <p className="text-xs text-[#2B2D42]/70 leading-relaxed font-sans max-w-[320px]">
                Hôn lễ là sự kiện thiêng liêng nhất cuộc đời. Chúng tôi rất vinh hạnh 
                kính mời Quý khách đến chia vui cùng gia đình chúng tôi tại buổi tiệc thân mật này.
              </p>
            </FadeSection>
          </div>

          {/* ── SECTION: FAMILY PARENTS ── */}
          <div className="px-6 py-10 bg-[#FAF6F0] relative z-10">
            <FadeSection className="glass-panel border-gray-200/50 rounded-3xl p-6 shadow-md flex flex-col gap-8 relative overflow-hidden">
              {/* Subtle decorative floral stamp in background */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#8E4A49]/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="text-center">
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans-title font-semibold text-[#8E4A49]">
                  Gia Đình Hai Bên
                </span>
                <h3 className="font-serif-luxury text-lg font-bold text-[#2B2D42] mt-1">Tin Vui Từ Ban Đại Diện</h3>
                <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2" />
              </div>

              {/* Grid 2 Columns for Groom & Bride Side */}
              <div className="grid grid-cols-2 gap-4 divide-x divide-gray-200/60 text-xs">
                
                {/* Groom Family */}
                <div className="pr-2 flex flex-col items-center text-center">
                  <span className="px-3 py-1 bg-[#8E4A49]/10 text-[#8E4A49] rounded-full text-[9px] font-bold uppercase tracking-wider mb-3">
                    Nhà Trai
                  </span>
                  {groomFamily ? (
                    <div className="flex flex-col gap-1 text-[#2B2D42]/80">
                      <p className="font-bold text-gray-800 text-[11px] mb-1">Ông: {groomFamily.father_name || "Nguyễn Văn Hùng"}</p>
                      <p className="font-bold text-gray-800 text-[11px] mb-2">Bà: {groomFamily.mother_name || "Lê Thị Lan"}</p>
                      <span className="text-[10px] text-[#C5A880] italic">Trú tại:</span>
                      <p className="text-[10px] leading-tight text-[#2B2D42]/70 font-medium">
                        {groomFamily.address || "Quận Hoàn Kiếm, Hà Nội"}
                      </p>
                    </div>
                  ) : (
                    <div className="text-[10px] text-gray-400 italic">Đang cập nhật...</div>
                  )}
                </div>

                {/* Bride Family */}
                <div className="pl-3 flex flex-col items-center text-center">
                  <span className="px-3 py-1 bg-[#8E4A49]/10 text-[#8E4A49] rounded-full text-[9px] font-bold uppercase tracking-wider mb-3">
                    Nhà Gái
                  </span>
                  {brideFamily ? (
                    <div className="flex flex-col gap-1 text-[#2B2D42]/80">
                      <p className="font-bold text-gray-800 text-[11px] mb-1">Ông: {brideFamily.father_name || "Trần Văn Minh"}</p>
                      <p className="font-bold text-gray-800 text-[11px] mb-2">Bà: {brideFamily.mother_name || "Phạm Thị Hoa"}</p>
                      <span className="text-[10px] text-[#C5A880] italic">Trú tại:</span>
                      <p className="text-[10px] leading-tight text-[#2B2D42]/70 font-medium">
                        {brideFamily.address || "Quận Phú Nhuận, TP. HCM"}
                      </p>
                    </div>
                  ) : (
                    <div className="text-[10px] text-gray-400 italic">Đang cập nhật...</div>
                  )}
                </div>

              </div>
            </FadeSection>
          </div>

          {/* ── SECTION: BRIDE & GROOM PROFILES ── */}
          <div className="px-6 py-6 bg-[#FAF6F0] relative z-10">
            <FadeSection className="glass-panel border-gray-200/50 rounded-3xl p-6 shadow-md flex flex-col gap-6 relative overflow-hidden">
              <div className="text-center">
                <span className="text-[9px] uppercase tracking-[0.25em] font-sans-title font-semibold text-[#8E4A49]">
                  Giới Thiệu
                </span>
                <h3 className="font-serif-luxury text-lg font-bold text-[#2B2D42] mt-1">Cô Dâu & Chú Rể</h3>
                <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2" />
              </div>

              <div className="flex flex-col gap-6 w-full font-sans">
                {/* Chú rể */}
                <div className="flex flex-col gap-3 p-4 bg-white/40 rounded-2xl border border-white/60 shadow-sm">
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-[#C5A880] relative flex-shrink-0 shadow-sm">
                      <Image
                        src="/thiepmaudovang/images/gallery-2.jpg"
                        alt="Chú rể"
                        fill
                        sizes="80px"
                        className="object-cover grayscale"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-[#8E4A49] uppercase tracking-wider block">Chú rể</span>
                      <h4 className="font-serif-luxury text-base font-bold text-[#2B2D42] mt-0.5">{wedding.groom_name}</h4>
                      {groomFamily && (
                        <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                          Con ông: {groomFamily.father_name} <br/> Con bà: {groomFamily.mother_name}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#2B2D42]/80 italic leading-relaxed border-t border-gray-200/50 pt-2 px-1">
                    &ldquo;Là một chàng trai điềm đạm, ấm áp và luôn tràn đầy hoài bão. Đối với anh, tình yêu là cùng nhau đi qua mọi hành trình cuộc sống.&rdquo;
                  </p>
                </div>

                {/* Cô dâu */}
                <div className="flex flex-col gap-3 p-4 bg-white/40 rounded-2xl border border-white/60 shadow-sm">
                  <div className="flex gap-4 items-center flex-row-reverse text-right">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-[#C5A880] relative flex-shrink-0 shadow-sm">
                      <Image
                        src="/thiepmaudovang/images/gallery-1.jpg"
                        alt="Cô dâu"
                        fill
                        sizes="80px"
                        className="object-cover grayscale"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-[#8E4A49] uppercase tracking-wider block">Cô dâu</span>
                      <h4 className="font-serif-luxury text-base font-bold text-[#2B2D42] mt-0.5">{wedding.bride_name}</h4>
                      {brideFamily && (
                        <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                          Con ông: {brideFamily.father_name} <br/> Con bà: {brideFamily.mother_name}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#2B2D42]/80 italic leading-relaxed border-t border-gray-200/50 pt-2 px-1 text-right">
                    &ldquo;Một cô gái dịu dàng, tinh tế và luôn tràn đầy năng lượng tích cực. Cô tin rằng hạnh phúc là khi hai trái tim luôn đập cùng một nhịp.&rdquo;
                  </p>
                </div>
              </div>
            </FadeSection>
          </div>

          {/* ── SECTION: EVENTS & MAPS ── */}
          <div ref={sectionEventsRef} className="px-6 py-10 bg-[#FAF6F0] relative z-10 flex flex-col gap-6">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans-title font-semibold text-[#8E4A49]">
                Lễ Cưới & Tiệc Hỷ
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-[#2B2D42] mt-1">Thông Tin Sự Kiện</h3>
              <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2" />
            </div>

            {/* Groom side Event */}
            {groomFamily && (
              <FadeSection>
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#8E4A49]/5 rounded-bl-full pointer-events-none" />
                  
                  <span className="text-[10px] font-bold text-[#8E4A49] uppercase tracking-wider mb-2 font-sans-title">
                    Hôn Lễ Nhà Trai
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#8E4A49] mb-4">
                    <Heart size={16} fill="#8E4A49" />
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs text-[#2B2D42]/90 w-full">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar size={14} className="text-[#C5A880]" />
                      <span className="font-semibold">{groomFamily.date || "Thứ Bảy, 10/10/2026"}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock size={14} className="text-[#C5A880]" />
                      <span className="font-semibold">Vào lúc: {groomFamily.time || "11:00 AM"}</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 border-t border-gray-100 pt-3 mt-1 text-center justify-center">
                      <MapPin size={14} className="text-[#C5A880] shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-[11px] max-w-[240px]">
                        {groomFamily.address || "Khách sạn Melia, 44B Lý Thường Kiệt, Hoàn Kiếm, Hà Nội"}
                      </span>
                    </div>

                    {groomFamily.map_url && (
                      <a
                        href={groomFamily.map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FAF6F0] border border-[#8E4A49]/20 hover:border-[#8E4A49] text-[#8E4A49] rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        <ExternalLink size={12} />
                        Xem Đường Đi (Google Maps)
                      </a>
                    )}
                  </div>
                </div>
              </FadeSection>
            )}

            {/* Bride side Event */}
            {brideFamily && (
              <FadeSection>
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-[#8E4A49]/5 rounded-br-full pointer-events-none" />

                  <span className="text-[10px] font-bold text-[#8E4A49] uppercase tracking-wider mb-2 font-sans-title">
                    Hôn Lễ Nhà Gái
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#8E4A49] mb-4">
                    <Heart size={16} fill="#8E4A49" />
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs text-[#2B2D42]/90 w-full">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar size={14} className="text-[#C5A880]" />
                      <span className="font-semibold">{brideFamily.date || "Thứ Bảy, 10/10/2026"}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock size={14} className="text-[#C5A880]" />
                      <span className="font-semibold">Vào lúc: {brideFamily.time || "11:00 AM"}</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 border-t border-gray-100 pt-3 mt-1 text-center justify-center">
                      <MapPin size={14} className="text-[#C5A880] shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-[11px] max-w-[240px]">
                        {brideFamily.address || "White Palace, Phú Nhuận, TP. Hồ Chí Minh"}
                      </span>
                    </div>

                    {brideFamily.map_url && (
                      <a
                        href={brideFamily.map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FAF6F0] border border-[#8E4A49]/20 hover:border-[#8E4A49] text-[#8E4A49] rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        <ExternalLink size={12} />
                        Xem Đường Đi (Google Maps)
                      </a>
                    )}
                  </div>
                </div>
              </FadeSection>
            )}
          </div>

          {/* ── SECTION: COUNTDOWN & CALENDAR ── */}
          <div className="px-6 py-10 bg-[#FAF6F0] relative z-10 flex flex-col gap-6">
            <FadeSection>
              <div className="bg-[#8E4A49] text-[#FAF6F0] rounded-3xl p-6 shadow-lg text-center flex flex-col items-center relative overflow-hidden">
                {/* Background graphic accents */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                
                <h4 className="font-serif-luxury text-sm tracking-wider uppercase text-[#C5A880] mb-4">
                  Đếm Ngược Ngày Hỷ
                </h4>

                {/* Countdown display */}
                <div className="flex gap-4 items-center justify-center w-full max-w-[280px]">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold font-serif-luxury text-[#FAF6F0]">{countdown.days}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#C5A880] mt-1">Ngày</span>
                  </div>
                  <span className="text-xl font-serif-luxury text-[#C5A880]/70 mb-5">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold font-serif-luxury text-[#FAF6F0]">{countdown.hours}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#C5A880] mt-1">Giờ</span>
                  </div>
                  <span className="text-xl font-serif-luxury text-[#C5A880]/70 mb-5">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold font-serif-luxury text-[#FAF6F0]">{countdown.mins}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#C5A880] mt-1">Phút</span>
                  </div>
                  <span className="text-xl font-serif-luxury text-[#C5A880]/70 mb-5">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold font-serif-luxury text-[#FAF6F0]">{countdown.secs}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#C5A880] mt-1">Giây</span>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#C5A880]/50 my-6" />

                {/* Mini Calendar */}
                <div className="w-full flex flex-col items-center bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-xs font-bold font-serif-luxury text-[#FAF6F0] uppercase tracking-widest mb-3">
                    {wedding.event_date
                      ? new Date(wedding.event_date).toLocaleDateString("vi-VN", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Tháng 12 Năm 2026"}
                  </div>
                  
                  {/* Calendar Grid Header */}
                  <div className="grid grid-cols-7 gap-2 text-[9px] text-[#C5A880] font-bold uppercase tracking-wider w-full text-center border-b border-white/10 pb-1.5 mb-2">
                    <div>T2</div>
                    <div>T3</div>
                    <div>T4</div>
                    <div>T5</div>
                    <div>T6</div>
                    <div>T7</div>
                    <div className="text-red-300">CN</div>
                  </div>

                  {/* Calendar Grid Days */}
                  <div className="grid grid-cols-7 gap-2 w-full text-center">
                    {renderCalendar()}
                  </div>
                </div>
              </div>
            </FadeSection>
          </div>

          {/* ── SECTION: PHOTO GALLERY ── */}
          <div className="px-6 py-10 bg-[#FAF6F0] relative z-10 flex flex-col gap-6">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans-title font-semibold text-[#8E4A49]">
                Kỷ Niệm Tình Yêu
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-[#2B2D42] mt-1">Album Ảnh Cưới</h3>
              <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2" />
            </div>

            {/* Carousel display with gestures */}
            <FadeSection>
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-md group">
                <Image
                  src={weddingImages[currentSlide]}
                  alt={`Album slide ${currentSlide}`}
                  fill
                  sizes="(max-width: 480px) 100vw, 480px"
                  className="object-cover"
                  onClick={() => setActivePhoto(weddingImages[currentSlide])}
                />
                
                {/* Bottom slide index info overlay */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-white text-[10px] font-bold font-mono">
                  {currentSlide + 1} / {weddingImages.length}
                </div>

                {/* Left/Right Buttons */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow hover:bg-white/40 transition active:scale-95"
                >
                  ‹
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow hover:bg-white/40 transition active:scale-95"
                >
                  ›
                </button>
              </div>

              {/* Carousel Thumbnail previews */}
              <div className="flex gap-2 overflow-x-auto py-3 max-w-full custom-scroll scroll-smooth mt-1">
                {weddingImages.map((img, idx) => (
                  <div
                    key={`thumb-${idx}`}
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 cursor-pointer border-2 transition ${
                      idx === currentSlide
                        ? "border-[#8E4A49] scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt="thumbnail"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>

          {/* ── SECTION: RSVP (XÁC NHẬN THAM DỰ) ── */}
          <div ref={sectionRsvpRef} className="px-6 py-10 bg-[#FAF6F0] relative z-10">
            <FadeSection>
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#8E4A49]/5 rounded-bl-full pointer-events-none" />
                
                <div className="text-center mb-6">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-sans-title font-semibold text-[#8E4A49]">
                    RSVP
                  </span>
                  <h3 className="font-serif-luxury text-lg font-bold text-[#2B2D42] mt-1">
                    Xác Nhận Tham Dự
                  </h3>
                  <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2" />
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 flex flex-col items-center gap-3 text-xs"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Check size={24} />
                    </div>
                    <p className="font-bold text-gray-800">Cảm ơn bạn rất nhiều!</p>
                    <p className="text-gray-500 max-w-[240px] leading-relaxed">
                      Phản hồi của bạn đã được ghi nhận. Sự hiện diện của bạn là niềm vinh hạnh của gia đình chúng tôi!
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 px-4 py-2 border border-gray-200 text-gray-500 rounded-full text-[10px] font-bold uppercase transition hover:bg-gray-50"
                    >
                      Gửi phản hồi khác
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-4 text-xs">
                    
                    {/* Guest Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#2B2D42]/80 uppercase tracking-wider font-sans-title">
                        Họ & Tên khách mời
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Văn A..."
                        className="w-full bg-[#FAF6F0] border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-[#8E4A49] outline-none transition"
                      />
                    </div>

                    {/* Choose Side */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#2B2D42]/80 uppercase tracking-wider font-sans-title">
                        Khách bên nhà nào?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormSide("groom")}
                          className={`py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-wider transition ${
                            formSide === "groom"
                              ? "bg-[#8E4A49] border-[#8E4A49] text-white shadow-sm"
                              : "bg-[#FAF6F0] border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          Nhà Trai (Chú rể)
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormSide("bride")}
                          className={`py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-wider transition ${
                            formSide === "bride"
                              ? "bg-[#8E4A49] border-[#8E4A49] text-white shadow-sm"
                              : "bg-[#FAF6F0] border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          Nhà Gái (Cô dâu)
                        </button>
                      </div>
                    </div>

                    {/* Attending selection */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#2B2D42]/80 uppercase tracking-wider font-sans-title">
                        Bạn có tham dự không?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormAttending(true)}
                          className={`py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-wider transition ${
                            formAttending === true
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                              : "bg-[#FAF6F0] border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          Có, tôi sẽ đến!
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormAttending(false)}
                          className={`py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-wider transition ${
                            formAttending === false
                              ? "bg-rose-700 border-rose-700 text-white shadow-sm"
                              : "bg-[#FAF6F0] border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          Rất tiếc vắng mặt
                        </button>
                      </div>
                    </div>

                    {/* Party size count (if attending) */}
                    <AnimatePresence>
                      {formAttending === true && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col gap-1.5 overflow-hidden"
                        >
                          <label className="text-[10px] font-bold text-[#2B2D42]/80 uppercase tracking-wider font-sans-title">
                            Số lượng khách đi cùng
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setFormGuestCount((c) => Math.max(1, c - 1))}
                              className="w-10 h-10 bg-[#FAF6F0] border border-gray-200 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                            >
                              -
                            </button>
                            <span className="text-gray-800 font-bold text-sm min-w-[20px] text-center">
                              {formGuestCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFormGuestCount((c) => c + 1)}
                              className="w-10 h-10 bg-[#FAF6F0] border border-gray-200 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Wish text area */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#2B2D42]/80 uppercase tracking-wider font-sans-title">
                        Lời chúc gửi cô dâu & chú rể
                      </label>
                      <textarea
                        rows={3}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Hãy gửi những lời chúc yêu thương tốt đẹp nhất..."
                        className="w-full bg-[#FAF6F0] border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-[#8E4A49] outline-none transition resize-none"
                      />
                    </div>

                    {/* RSVP Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 bg-gradient-to-r from-[#8E4A49] to-[#b06160] hover:from-[#723b3a] hover:to-[#8E4A49] text-[#FAF6F0] font-bold uppercase tracking-wider rounded-2xl py-3.5 shadow-md transition disabled:opacity-50 font-sans-title text-[10px]"
                    >
                      {isSubmitting ? "Đang gửi..." : "Xác Nhận Tham Dự"}
                    </button>

                    {/* Status message */}
                    {rsvpFeedback && (
                      <p className="text-center font-semibold text-emerald-600 mt-1">
                        {rsvpFeedback}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </FadeSection>
          </div>

          {/* ── SECTION: SEND WISHES ── */}
          <div ref={sectionWishesRef} className="px-6 py-10 bg-[#FAF6F0] relative z-10 flex flex-col gap-6">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans-title font-semibold text-[#8E4A49]">
                Lời Chúc
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-[#2B2D42] mt-1">Gửi Lời Chúc Yêu Thương</h3>
              <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2" />
            </div>

            {/* Quick Wish form */}
            <FadeSection>
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-xs">
                <form onSubmit={handleWishSubmit} className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      required
                      value={wishName}
                      onChange={(e) => setWishName(e.target.value)}
                      placeholder="Tên của bạn..."
                      className="w-full bg-[#FAF6F0] border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 outline-none focus:border-[#8E4A49]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <textarea
                      rows={3}
                      required
                      value={wishContent}
                      onChange={(e) => setWishContent(e.target.value)}
                      placeholder="Nhập lời chúc tốt đẹp nhất gửi đôi uyên ương..."
                      className="w-full bg-[#FAF6F0] border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 outline-none focus:border-[#8E4A49] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingWish}
                    className="w-full bg-[#8E4A49] text-white font-bold uppercase tracking-widest rounded-2xl py-3 hover:bg-[#723b3a] transition disabled:opacity-50"
                  >
                    {isSubmittingWish ? "Đang gửi..." : "Gửi Lời Chúc"}
                  </button>

                  {wishFeedback && (
                    <p className="text-center text-emerald-600 font-semibold text-[10px]">
                      {wishFeedback}
                    </p>
                  )}
                </form>
              </div>
            </FadeSection>

            {/* Wishes Marquee */}
            {localWishes.length > 0 && (
              <div className="w-full mt-4 overflow-hidden relative py-4">
                {/* Horizontal scroll panel container */}
                <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-1">
                  {localWishes.map((wish) => (
                    <div
                      key={wish.id}
                      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-left flex flex-col gap-1.5"
                    >
                      <div className="flex justify-between items-center border-b border-gray-50 pb-1 text-[10px]">
                        <span className="font-bold text-[#8E4A49]">{wish.guest_name}</span>
                        <span className="text-gray-400 font-mono">
                          {new Date(wish.created_at).toLocaleDateString("vi-VN", {
                            day: "numeric",
                            month: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-[#2B2D42]/90 leading-relaxed italic font-serif-luxury">
                        &ldquo;{wish.content}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── FOOTER THANK YOU ── */}
          <div className="px-6 py-16 bg-[#FAF6F0] relative z-10 text-center flex flex-col items-center justify-center">
            <div className="w-10 h-[1px] bg-[#C5A880] my-4" />
            <h2 className="font-handwritten-fancy text-5xl text-[#8E4A49] my-2">
              Thank You!
            </h2>
            <p className="font-serif-luxury text-xs text-[#2B2D42]/70 italic tracking-wider">
              Sự hiện diện của quý vị là niềm hạnh phúc lớn nhất của chúng tôi.
            </p>
            <div className="w-10 h-[1px] bg-[#C5A880] my-4" />
          </div>

          {/* ── 3. BOTTOM FLOATING ACTION BAR ────────────────────────────────────────── */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[430px] bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50 py-2.5 px-6 flex justify-between items-center gap-1">
            <button
              onClick={() => scrollTo(sectionEventsRef)}
              className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-[#8E4A49] active:scale-95 transition"
            >
              <Calendar size={16} />
              <span className="text-[8px] font-sans-title font-semibold uppercase tracking-wider">Sự Kiện</span>
            </button>
            
            <button
              onClick={() => scrollTo(sectionRsvpRef)}
              className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-[#8E4A49] active:scale-95 transition"
            >
              <User size={16} />
              <span className="text-[8px] font-sans-title font-semibold uppercase tracking-wider">RSVP</span>
            </button>

            {/* Heart Burst Clicker */}
            <button
              onClick={handleHeartReact}
              className="w-11 h-11 bg-gradient-to-r from-[#8E4A49] to-[#b06160] rounded-full flex items-center justify-center text-[#FAF6F0] shadow-md border-2 border-white hover:scale-105 active:scale-95 transition"
            >
              <Heart size={18} fill="#FAF6F0" />
            </button>

            <button
              onClick={() => scrollTo(sectionWishesRef)}
              className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-[#8E4A49] active:scale-95 transition"
            >
              <Send size={16} />
              <span className="text-[8px] font-sans-title font-semibold uppercase tracking-wider">Lời Chúc</span>
            </button>

            <button
              onClick={() => setIsBankOpen(true)}
              className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-[#8E4A49] active:scale-95 transition"
            >
              <Gift size={16} />
              <span className="text-[8px] font-sans-title font-semibold uppercase tracking-wider">Mừng Cưới</span>
            </button>
          </div>

          {/* ── 4. BANK TRANSFER MODAL ────────────────────────────────────────────── */}
          <AnimatePresence>
            {isBankOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsBankOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-[340px] bg-[#FAF6F0] border border-gray-100 rounded-3xl p-6 shadow-2xl z-10 flex flex-col items-center"
                >
                  <button
                    onClick={() => setIsBankOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xs font-semibold"
                  >
                    ✕
                  </button>

                  <span className="text-[8px] font-bold text-[#8E4A49] uppercase tracking-[0.25em] mb-1 font-sans-title">
                    Wishing Well
                  </span>
                  <h4 className="font-serif-luxury text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                    Hộp Thư Mừng Cưới
                  </h4>

                  {/* Tabs */}
                  <div className="flex gap-2 w-full mb-4">
                    <button
                      onClick={() => setBankTab("groom")}
                      className={`flex-1 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition ${
                        bankTab === "groom"
                          ? "bg-[#8E4A49] border-[#8E4A49] text-[#FAF6F0] shadow-sm"
                          : "bg-white border-gray-200 text-gray-400"
                      }`}
                    >
                      Nhà Trai
                    </button>
                    <button
                      onClick={() => setBankTab("bride")}
                      className={`flex-1 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition ${
                        bankTab === "bride"
                          ? "bg-[#8E4A49] border-[#8E4A49] text-[#FAF6F0] shadow-sm"
                          : "bg-white border-gray-200 text-gray-400"
                      }`}
                    >
                      Nhà Gái
                    </button>
                  </div>

                  {/* Groom Account info */}
                  {bankTab === "groom" ? (
                    <div className="w-full flex flex-col items-center animate-fadeIn">
                      <div className="relative w-40 h-40 bg-white border border-gray-100 rounded-2xl p-2 flex items-center justify-center shadow-sm mb-4">
                        <Image
                          src="/thiepmaudovang/images/qr-groom.png"
                          alt="QR Groom"
                          width={140}
                          height={140}
                          className="object-contain"
                        />
                      </div>
                      <div className="w-full text-left bg-white rounded-2xl p-4 text-[10px] text-gray-600 border border-gray-100 flex flex-col gap-2.5 font-sans relative">
                        <div>
                          <span className="text-[7.5px] font-bold uppercase text-gray-400 tracking-wider">Ngân hàng</span>
                          <p className="font-bold text-gray-800">MB Bank (Ngân hàng Quân đội)</p>
                        </div>
                        <div>
                          <span className="text-[7.5px] font-bold uppercase text-gray-400 tracking-wider">Số tài khoản</span>
                          <div className="flex justify-between items-center gap-2">
                            <p className="font-bold text-gray-800 font-mono text-xs">123456789999</p>
                            <button
                              onClick={() => handleCopy("123456789999", "groom")}
                              className="text-[#8E4A49] hover:underline flex items-center gap-1 font-semibold"
                            >
                              {copiedGroom ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                              {copiedGroom ? "Đã chép" : "Sao chép"}
                            </button>
                          </div>
                        </div>
                        <div>
                          <span className="text-[7.5px] font-bold uppercase text-gray-400 tracking-wider">Chủ tài khoản</span>
                          <p className="font-bold text-gray-800 uppercase">{wedding.groom_name}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Bride Account info
                    <div className="w-full flex flex-col items-center animate-fadeIn">
                      <div className="relative w-40 h-40 bg-white border border-gray-100 rounded-2xl p-2 flex items-center justify-center shadow-sm mb-4">
                        <Image
                          src="/thiepmaudovang/images/qr-bride.png"
                          alt="QR Bride"
                          width={140}
                          height={140}
                          className="object-contain"
                        />
                      </div>
                      <div className="w-full text-left bg-white rounded-2xl p-4 text-[10px] text-gray-600 border border-gray-100 flex flex-col gap-2.5 font-sans relative">
                        <div>
                          <span className="text-[7.5px] font-bold uppercase text-gray-400 tracking-wider">Ngân hàng</span>
                          <p className="font-bold text-gray-800">Vietcombank</p>
                        </div>
                        <div>
                          <span className="text-[7.5px] font-bold uppercase text-gray-400 tracking-wider">Số tài khoản</span>
                          <div className="flex justify-between items-center gap-2">
                            <p className="font-bold text-gray-800 font-mono text-xs">987654321111</p>
                            <button
                              onClick={() => handleCopy("987654321111", "bride")}
                              className="text-[#8E4A49] hover:underline flex items-center gap-1 font-semibold"
                            >
                              {copiedBride ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                              {copiedBride ? "Đã chép" : "Sao chép"}
                            </button>
                          </div>
                        </div>
                        <div>
                          <span className="text-[7.5px] font-bold uppercase text-gray-400 tracking-wider">Chủ tài khoản</span>
                          <p className="font-bold text-gray-800 uppercase">{wedding.bride_name}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-[8px] text-[#8E4A49] font-medium italic mt-4 font-sans-title">
                    Thank you so much!
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* ── 5. FULLSCREEN IMAGE LIGHTBOX ───────────────────────────────────────── */}
          <AnimatePresence>
            {activePhoto && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-6 right-6 text-white text-2xl font-bold bg-white/10 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 active:scale-90 transition"
                >
                  ✕
                </button>
                <div className="relative w-[90%] max-w-[600px] h-[75vh]">
                  <Image
                    src={activePhoto}
                    alt="Lightbox zoom"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
}
