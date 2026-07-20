"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Wedding, Wish } from "@/types";
import { 
  Heart, 
  MapPin, 
  Music, 
  Gift, 
  Phone, 
  User, 
  Users, 
  Check, 
  X, 
  Calendar,
  Volume2,
  VolumeX,
  Sparkles
} from "lucide-react";
import T3Envelope from "@/components/template3/T3Envelope";
import T3GalleryLightbox from "@/components/template3/T3GalleryLightbox";

interface Template3Props {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

// 8 Wedding gallery images for the swipeable lightbox
const galleryImages = [
  "/thiepmaudovang/images/cover.jpg",
  "/thiepmaudovang/images/couple-small-1.jpg",
  "/thiepmaudovang/images/couple-small-2.jpg",
  "/thiepmaudovang/images/couple-small-3.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/gallery-4.jpg",
];

function FallingHearts() {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    x: number;
    size: number;
    delay: number;
    duration: number;
    color: string;
    spin: number;
  }>>([]);

  useEffect(() => {
    const colors = [
      "rgba(197, 168, 128, 0.45)", // Warm gold
      "rgba(220, 38, 38, 0.35)",   // Soft Crimson red
      "rgba(244, 63, 94, 0.35)",   // Rose pink
      "rgba(251, 113, 133, 0.35)", // Soft rose
    ];

    const heartsArray = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      spin: Math.random() * 360 - 180,
    }));

    setHearts(heartsArray);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "-10%", x: `${heart.x}%`, rotate: 0, opacity: 0 }}
          animate={{
            y: "110%",
            x: [
              `${heart.x}%`,
              `${heart.x + (Math.random() * 8 - 4)}%`,
              `${heart.x}%`
            ],
            rotate: [0, heart.spin / 2, heart.spin],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{
            width: heart.size,
            height: heart.size,
            color: heart.color,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default function Template3({ wedding, to, wishes }: Template3Props) {
  // Envelope and Lightbox states
  const [isOpened, setIsOpened] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // General States
  const [isPlaying, setIsPlaying] = useState(false);
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [giftTab, setGiftTab] = useState<"groom" | "bride">("groom");

  // Countdown timer states
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // RSVP Form States
  const [formName, setFormName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Audio references
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown Calculation
  useEffect(() => {
    const targetDate = wedding.event_date ? new Date(wedding.event_date) : new Date("2026-10-10T11:00:00");
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [wedding.event_date]);

  // Audio Toggle
  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play error: ", err));
    }
    setIsPlaying(!isPlaying);
  };

  // Open envelope and trigger music
  const handleOpenEnvelope = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay blocked/suspended:", err));
    }
  };

  // Open Lightbox at specific index
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Submit RSVP Form
  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newWish: Wish = {
        id: localWishes.length + 1,
        wedding_id: wedding.id,
        guest_name: formName,
        content: formMessage || "Chúc trăm năm hạnh phúc!",
        created_at: new Date().toISOString()
      };

      setLocalWishes([newWish, ...localWishes]);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form fields
      setFormName("");
      setFormMessage("");
      
      // Close overlay after 2 seconds
      setTimeout(() => {
        setIsRsvpOpen(false);
        setIsSubmitted(false);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="relative w-full h-full">
      {/* Embedded audio component - always mounted so ref is persistent */}
      <audio
        ref={audioRef}
        src={wedding.music_url || "/thiepmaudovang/audio/bg-music.mp3"}
        loop
      />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <T3Envelope key="envelope" to={to} onOpen={handleOpenEnvelope} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-screen w-screen relative bg-[#F5F3EF] text-[#1C1917] antialiased select-none overflow-hidden flex justify-center items-center"
          >
            {/* Background elegant grid texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-15 pointer-events-none z-0" />
            
            {/* Subtle overlay paper noise */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587080266227-677cd237c267?q=80&w=300')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            {/* Falling Hearts Effect */}
            <FallingHearts />

            {/* Styled font variables block */}
            <style jsx global>{`
              .custom-scroll {
                -webkit-overflow-scrolling: touch;
              }
              .custom-scroll::-webkit-scrollbar {
                width: 0px;
                display: none;
              }
              .text-glow {
                text-shadow: 0 0 10px rgba(197, 168, 128, 0.3);
              }
              .glass-card {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                border: 1px solid rgba(197, 168, 128, 0.18);
              }
              .shadow-premium {
                box-shadow: 0 10px 30px -10px rgba(28, 25, 23, 0.04), 0 1px 3px rgba(197, 168, 128, 0.1);
              }
              .will-animate {
                will-change: transform, opacity;
              }
            `}</style>

            {/* MAIN WRAPPER (MOBILE ONLY VIEWPORT GUARDRAIL - max-w-[430px]) */}
            <div className="w-full max-w-[430px] h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative z-10 flex flex-col custom-scroll">
              
              {/* =========================================================
                  SCREEN 1: THE WELCOME DECK
                  ========================================================= */}
              <section className="w-full h-full snap-start snap-always flex-shrink-0 flex flex-col justify-between p-4 relative overflow-hidden">
                <WelcomeDeck 
                  wedding={wedding} 
                  to={to} 
                  timeLeft={timeLeft} 
                  isPlaying={isPlaying} 
                  handleToggleAudio={handleToggleAudio} 
                  onImageClick={handleOpenLightbox}
                />
              </section>

              {/* =========================================================
                  SCREEN 1.5: THE COUPLE PROFILE
                  ========================================================= */}
              <section className="w-full h-full snap-start snap-always flex-shrink-0 flex flex-col justify-between p-4 relative overflow-hidden">
                <CoupleProfile wedding={wedding} />
              </section>

              {/* =========================================================
                  SCREEN 2: THE LOVE ODYSSEY (5-BENTO IMAGES LAYOUT)
                  ========================================================= */}
              <section className="w-full h-full snap-start snap-always flex-shrink-0 flex flex-col justify-between p-4 relative overflow-hidden">
                <LoveOdyssey onImageClick={handleOpenLightbox} />
              </section>

              {/* =========================================================
                  SCREEN 3: LOGISTICS & RSVP GATE & LIVE WISHES
                  ========================================================= */}
              <section className="w-full h-full snap-start snap-always flex-shrink-0 flex flex-col justify-between p-4 relative overflow-hidden">
                <LogisticsAndRsvp 
                  wedding={wedding}
                  isRsvpOpen={isRsvpOpen}
                  setIsRsvpOpen={setIsRsvpOpen}
                  setIsGiftOpen={setIsGiftOpen}
                  wishes={localWishes}
                />
              </section>

            </div>

            {/* Floating Gift / Wishing Well button (appears unobtrusively at the bottom) */}
            <motion.button
              onClick={() => setIsGiftOpen(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#C5A880] text-white flex items-center justify-center shadow-lg cursor-pointer border border-[#E6D5C3]"
              style={{ willChange: "transform, opacity" }}
            >
              <Gift className="w-5 h-5 animate-pulse" />
            </motion.button>

            {/* =========================================================
                INTERACTIVE OVERLAYS
                ========================================================= */}

            {/* RSVP MORPHING CONTAINER OVERLAY */}
            <AnimatePresence>
              {isRsvpOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsRsvpOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-md"
                  />

                  {/* Morphing Form Card */}
                  <motion.div
                    layoutId="rsvp-card-overlay"
                    className="w-full max-w-[370px] bg-[#FAF9F6] border border-[#C5A880]/30 rounded-3xl p-6 shadow-2xl relative z-10 font-barlow flex flex-col max-h-[85vh] overflow-y-auto custom-scroll text-[#1C1917]"
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsRsvpOpen(false)}
                      className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 transition-colors w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100/50 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="text-center mb-6">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] font-barlow">
                        Xác Nhận Tham Dự
                      </span>
                      <h3 className="text-2xl font-bold font-cormorant mt-1 tracking-wider">
                        RSVP GATEWAY
                      </h3>
                      <p className="text-xs text-neutral-500 font-cormorant italic mt-1">
                        Sự hiện diện của bạn là niềm vinh hạnh lớn của chúng tôi!
                      </p>
                    </div>

                    {isSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-8 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
                          <Check className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold font-cormorant text-emerald-800">
                          XÁC NHẬN THÀNH CÔNG!
                        </h4>
                        <p className="text-xs text-neutral-500 max-w-[200px] mt-2 font-barlow">
                          Cảm ơn bạn đã xác nhận. Lời chúc của bạn đã được lưu!
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmitRsvp} className="space-y-4 font-barlow text-sm">
                        {/* Name field */}
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block mb-1">
                            Tên của bạn *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 w-4 h-4 text-[#C5A880]" />
                            <input
                              type="text"
                              required
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="Nhập họ và tên..."
                              className="w-full bg-white border border-[#C5A880]/20 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-[#C5A880] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Wishes Content */}
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block mb-1">
                            Lời chúc của bạn
                          </label>
                          <textarea
                            rows={3}
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            placeholder="Gửi những lời chúc yêu thương nhất..."
                            className="w-full bg-white border border-[#C5A880]/20 rounded-xl p-3 text-xs focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#C5A880] text-white hover:bg-[#8C7355] py-3 rounded-xl text-xs uppercase font-bold tracking-widest transition-colors shadow-lg cursor-pointer flex items-center justify-center font-barlow"
                        >
                          {isSubmitting ? (
                            <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                          ) : (
                            "Gửi Xác Nhận"
                          )}
                        </button>
                      </form>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* WISHING WELL (GIFT MODAL) */}
            <AnimatePresence>
              {isGiftOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsGiftOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-md"
                  />

                  {/* Modal Box */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-[340px] bg-[#FAF9F6] border border-[#C5A880]/30 rounded-3xl p-6 shadow-2xl relative z-10 text-center flex flex-col items-center"
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setIsGiftOpen(false)}
                      className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 text-xs w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center cursor-pointer"
                    >
                      ✕
                    </button>

                    <span className="text-[9px] font-bold text-[#C5A880] uppercase tracking-widest mb-1 font-barlow">
                      // WISHING_WELL //
                    </span>
                    <h4 className="text-lg font-bold text-stone-800 uppercase tracking-wider mb-4 font-cormorant">
                      Quà Mừng Cưới
                    </h4>

                    {/* Tabs */}
                    <div className="flex gap-2 w-full mb-4 font-barlow">
                      <button
                        onClick={() => setGiftTab("groom")}
                        className={`flex-1 py-2 rounded-xl border text-[10px] font-bold uppercase transition cursor-pointer ${
                          giftTab === "groom"
                            ? "bg-[#C5A880] border-[#C5A880] text-white"
                            : "bg-white border-neutral-200 text-neutral-400"
                        }`}
                      >
                        Nhà Trai (Chú rể)
                      </button>
                      <button
                        onClick={() => setGiftTab("bride")}
                        className={`flex-1 py-2 rounded-xl border text-[10px] font-bold uppercase transition cursor-pointer ${
                          giftTab === "bride"
                            ? "bg-[#C5A880] border-[#C5A880] text-white"
                            : "bg-white border-neutral-200 text-neutral-400"
                        }`}
                      >
                        Nhà Gái (Cô dâu)
                      </button>
                    </div>

                    {giftTab === "groom" ? (
                      <div className="w-full flex flex-col items-center font-barlow">
                        {/* QR Code */}
                        <div className="relative w-40 h-40 bg-white border border-[#C5A880]/20 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-inner mb-4">
                          <Image
                            src="/thiepmaudovang/images/qr-groom.png"
                            alt="Mã QR Chú rể"
                            width={150}
                            height={150}
                            className="object-contain pointer-events-none"
                          />
                        </div>
                        <div className="w-full text-left bg-white border border-neutral-200/50 rounded-xl p-3 text-xs text-neutral-600 flex flex-col gap-2 font-mono">
                          <div>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[#C5A880] block">Ngân hàng</span>
                            <p className="font-semibold text-stone-800 font-barlow">MB Bank (Ngân hàng Quân đội)</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[#C5A880] block">Số tài khoản</span>
                            <p className="font-semibold text-stone-800 font-mono text-sm tracking-wider">123456789999</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[#C5A880] block">Chủ tài khoản</span>
                            <p className="font-semibold text-stone-800 uppercase font-barlow">Nguyễn Minh Hoàng</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col items-center font-barlow">
                        {/* QR Code */}
                        <div className="relative w-40 h-40 bg-white border border-[#C5A880]/20 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-inner mb-4">
                          <Image
                            src="/thiepmaudovang/images/qr-bride.png"
                            alt="Mã QR Cô dâu"
                            width={150}
                            height={150}
                            className="object-contain pointer-events-none"
                          />
                        </div>
                        <div className="w-full text-left bg-white border border-neutral-200/50 rounded-xl p-3 text-xs text-neutral-600 flex flex-col gap-2 font-mono">
                          <div>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[#C5A880] block">Ngân hàng</span>
                            <p className="font-semibold text-stone-800 font-barlow">Vietcombank</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[#C5A880] block">Số tài khoản</span>
                            <p className="font-semibold text-stone-800 font-mono text-sm tracking-wider">987654321111</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[#C5A880] block">Chủ tài khoản</span>
                            <p className="font-semibold text-stone-800 uppercase font-barlow">Trần Mai Hương</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <p className="text-[9px] text-[#C5A880] font-medium italic mt-4 font-barlow uppercase tracking-wider">
                      Chúng tôi chân thành cảm ơn!
                    </p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

      {/* MULTI-IMAGE GALLERY LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && (
          <T3GalleryLightbox
            images={galleryImages}
            initialIndex={lightboxIndex}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT: SCREEN 1.5 COUPLE PROFILE
   ========================================================================= */
interface CoupleProfileProps {
  wedding: Wedding;
}

function CoupleProfile({ wedding }: CoupleProfileProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  return (
    <div ref={containerRef} className="h-full flex flex-col justify-between py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 font-sans"
      >
        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#8C7355]">
          Introducing
        </span>
        <h2 className="text-3xl font-artistic font-bold text-[#dc2626] mt-1">
          Cô Dâu & Chú Rể
        </h2>
      </motion.div>

      {/* Profile cards */}
      <div className="flex-1 flex flex-col justify-center gap-4 z-10 my-2">
        {/* Chú rể */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm border border-[#C5A880]/30 p-4 rounded-2xl shadow-sm"
        >
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A880]/40 relative flex-shrink-0 shadow-sm">
              <Image
                src="/thiepmaudovang/images/gallery-2.jpg"
                alt="Chú rể"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-[#8C7355] uppercase tracking-wider block font-sans">Chú rể</span>
              <h3 className="font-serif-lux text-base font-bold text-stone-850 leading-snug">{wedding.groom_name}</h3>
              {wedding.location_info?.groom_family && (
                <div className="text-[10px] text-stone-500 font-sans space-y-0.5 mt-0.5">
                  {wedding.location_info.groom_family.father_name && <p>Con ông: {wedding.location_info.groom_family.father_name}</p>}
                  {wedding.location_info.groom_family.mother_name && <p>Con bà: {wedding.location_info.groom_family.mother_name}</p>}
                </div>
              )}
            </div>
          </div>
          <p className="text-[10px] text-stone-600 italic leading-relaxed border-t border-stone-100 pt-1.5 font-sans px-1">
            &ldquo;Là một chàng trai điềm đạm, ấm áp và luôn tràn đầy hoài bão. Đối với anh, tình yêu là cùng nhau đi qua mọi hành trình cuộc sống.&rdquo;
          </p>
        </motion.div>

        {/* Cô dâu */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm border border-[#C5A880]/30 p-4 rounded-2xl shadow-sm"
        >
          <div className="flex gap-4 items-center flex-row-reverse text-right">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A880]/40 relative flex-shrink-0 shadow-sm">
              <Image
                src="/thiepmaudovang/images/gallery-1.jpg"
                alt="Cô dâu"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-[#8C7355] uppercase tracking-wider block font-sans">Cô dâu</span>
              <h3 className="font-serif-lux text-base font-bold text-stone-850 leading-snug">{wedding.bride_name}</h3>
              {wedding.location_info?.bride_family && (
                <div className="text-[10px] text-stone-500 font-sans space-y-0.5 mt-0.5">
                  {wedding.location_info.bride_family.father_name && <p>Con ông: {wedding.location_info.bride_family.father_name}</p>}
                  {wedding.location_info.bride_family.mother_name && <p>Con bà: {wedding.location_info.bride_family.mother_name}</p>}
                </div>
              )}
            </div>
          </div>
          <p className="text-[10px] text-stone-600 italic leading-relaxed border-t border-stone-100 pt-1.5 font-sans px-1 text-right">
            &ldquo;Một cô gái dịu dàng, tinh tế và luôn tràn đầy năng lượng tích cực. Cô tin rằng hạnh phúc là khi hai trái tim luôn hướng về nhau.&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Decorative footer line */}
      <div className="text-center text-xs text-[#8C7355]/40 select-none">
        ❀ ❀ ❀
      </div>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT: SCREEN 1 WELCOME DECK
   ========================================================================= */
interface WelcomeDeckProps {
  wedding: Wedding;
  to: string;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  isPlaying: boolean;
  handleToggleAudio: () => void;
  onImageClick: (index: number) => void;
}

function WelcomeDeck({ wedding, to, timeLeft, isPlaying, handleToggleAudio, onImageClick }: WelcomeDeckProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Grid box animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col justify-between py-6">
      
      {/* Eyebrow Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 font-barlow"
      >
        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#8C7355]">
          Digital Invitation
        </span>
        <h4 className="text-[12px] uppercase tracking-[0.1em] font-medium text-neutral-400 mt-0.5">
          Gửi tới: <span className="text-stone-800 font-bold border-b border-[#C5A880]/30 pb-0.5 px-1">{to}</span>
        </h4>
      </motion.div>

      {/* Main Bento Grid layout: 2 cols, custom rows (increased heights to fill empty spaces) */}
      <div className="grid grid-cols-2 gap-3.5 my-auto max-h-[75vh] flex-grow mt-4">
        
        {/* CARD A: Cinematic High-Fashion Photo Cover (Col span 2) */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onClick={() => onImageClick(0)}
          className="col-span-2 relative h-[42vh] rounded-3xl overflow-hidden shadow-premium border border-[#C5A880]/20 flex flex-col justify-end p-5 select-none will-animate cursor-zoom-in group/cover"
        >
          {/* Ambient Cinematic Photo Zoom Effect */}
          <motion.div
            animate={isInView ? {
              scale: [1.02, 1.07, 1.02],
            } : { scale: 1 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 z-0 pointer-events-none group-hover/cover:scale-105 transition-transform duration-700"
          >
            <Image
              src="/thiepmaudovang/images/cover.jpg"
              alt="Minh Hoàng & Mai Hương Cover"
              fill
              priority
              sizes="(max-width: 430px) 100vw, 430px"
              className="object-cover pointer-events-none"
            />
          </motion.div>

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

          {/* Cursive Decorative Accent */}
          <span className="absolute top-5 right-6 z-20 text-3xl font-pinyon text-[#C5A880]/80 font-handwritten select-none">
            The Wedding Day
          </span>

          {/* Text Content Overlay */}
          <div className="relative z-20 text-white font-barlow">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#E6D5C3]/90 block mb-1">
              Save Our Date
            </span>
            <h1 className="text-3xl font-normal font-cormorant tracking-widest leading-none">
              M.HOÀNG & M.HƯƠNG
            </h1>
            <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-neutral-300 tracking-wider">
              <span>OCTOBER 10, 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span>HÀ NỘI, VIỆT NAM</span>
            </div>
          </div>
        </motion.div>

        {/* CARD B: Asymmetric Left - Dynamic Countdown Card */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
          className="col-span-1 glass-card rounded-3xl p-4 flex flex-col justify-center items-center text-center shadow-premium relative overflow-hidden group will-animate h-[22vh]"
        >
          {/* Subtle background pulse */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E6D5C3]/10 to-transparent pointer-events-none" />
          
          <span className="text-[8px] uppercase tracking-widest font-bold text-neutral-400 block mb-3 font-barlow">
            COUNTDOWN
          </span>

          <div className="grid grid-cols-2 gap-x-3 gap-y-2 font-barlow">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-cormorant text-stone-800 leading-none">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[7.5px] uppercase tracking-wider text-neutral-400 mt-1">Ngày</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-cormorant text-stone-800 leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[7.5px] uppercase tracking-wider text-neutral-400 mt-1">Giờ</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-cormorant text-stone-800 leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[7.5px] uppercase tracking-wider text-neutral-400 mt-1">Phút</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-cormorant text-stone-800 leading-none animate-pulse">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[7.5px] uppercase tracking-wider text-neutral-400 mt-1">Giây</span>
            </div>
          </div>
        </motion.div>

        {/* CARD C: Asymmetric Right - Glowing Audio-Toggle Vinyl Widget */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.25 }}
          className="col-span-1 glass-card rounded-3xl p-4 flex flex-col justify-center items-center text-center shadow-premium relative overflow-hidden group cursor-pointer will-animate font-barlow h-[22vh]"
          onClick={handleToggleAudio}
        >
          {/* Ambient Glowing Effect */}
          <div className={`absolute inset-0 bg-[#C5A880]/5 transition-opacity duration-500 pointer-events-none ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`} />

          {/* Vinyl Record Visual */}
          <div className="relative w-20 h-20 flex items-center justify-center mt-1 mb-2">
            
            {/* Outer vinyl circle */}
            <div className={`w-full h-full rounded-full bg-stone-900 flex items-center justify-center border-2 border-stone-800 shadow-md ${
              isPlaying ? "animate-spin-slow-custom" : "animate-spin-slow-custom paused"
            }`}>
              {/* Grooves (concentric lines) */}
              <div className="w-16 h-16 rounded-full border border-stone-800/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-stone-800/50 flex items-center justify-center">
                  
                  {/* Inner Label */}
                  <div className="w-8 h-8 rounded-full bg-[#E6D5C3] border border-stone-950/20 relative overflow-hidden flex items-center justify-center">
                    <Image
                      src="/thiepmaudovang/images/logo-deco.png"
                      alt="Vinyl label"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    
                    {/* Small center hole */}
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-stone-900 border border-[#FAF9F6] z-10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tonearm (Needle arm) pivot */}
            <div className="absolute -top-1 right-2 w-10 h-10 pointer-events-none z-20 origin-top-left transition-transform duration-700 ease-out"
                 style={{
                   transform: isPlaying ? "rotate(18deg)" : "rotate(-12deg)",
                 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                {/* Arm base */}
                <circle cx="30" cy="8" r="4" fill="#C5A880" stroke="#FAF9F6" strokeWidth="1.5" />
                {/* Tone arm line */}
                <path d="M30 8L12 32L8 31" stroke="#8C7355" strokeWidth="2" strokeLinecap="round" />
                {/* Cartridge/needle */}
                <rect x="5" y="28" width="6" height="4" rx="1" fill="#C5A880" transform="rotate(-15 5 28)" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-1.5 z-10">
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-[#C5A880] animate-bounce" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            )}
            <span className="text-[8px] uppercase tracking-wider font-bold text-neutral-500">
              {isPlaying ? "Music Playing" : "Tap To Play"}
            </span>
          </div>
        </motion.div>

      </div>

      {/* Floating Scroll Indicator Accent */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
        className="text-center z-10 animate-bounce flex flex-col items-center font-barlow"
      >
        <span className="text-[7.5px] uppercase tracking-widest text-neutral-400">Cuộn xem thiệp</span>
        <svg className="w-4 h-4 text-[#C5A880] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>

    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT: SCREEN 2 THE LOVE ODYSSEY (5-BENTO IMAGES LAYOUT)
   ========================================================================= */
interface LoveOdysseyProps {
  onImageClick: (index: number) => void;
}

function LoveOdyssey({ onImageClick }: LoveOdysseyProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Spring animations for Screen 2 bento grid stagger
  const cardSpringConfig = { stiffness: 120, damping: 14 } as const;

  const child1Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, ...cardSpringConfig, delay: 0.05 } }
  };

  const child2Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, ...cardSpringConfig, delay: 0.12 } }
  };

  const child3Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, ...cardSpringConfig, delay: 0.2 } }
  };

  const child4Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, ...cardSpringConfig, delay: 0.28 } }
  };

  const child5Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, ...cardSpringConfig, delay: 0.36 } }
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col justify-between py-6">
      
      {/* Screen Title */}
      <div className="text-center z-10 font-barlow">
        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#8C7355]">
          Our Story Timeline
        </span>
        <h2 className="text-2xl font-bold font-cormorant tracking-widest text-stone-800 mt-0.5">
          THE LOVE ODYSSEY
        </h2>
      </div>

      {/* Bento Grid: 2 columns, 3 rows asymmetrical layout (increased height to fill empty space) */}
      <div className="grid grid-cols-2 grid-rows-[1.1fr_1.3fr_1.1fr] gap-3 my-auto max-h-[76vh] flex-grow mt-3">
        
        {/* CARD 1: Lần Đầu Gặp Gỡ */}
        <motion.div
          variants={child1Variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onClick={() => onImageClick(1)}
          className="col-span-1 relative rounded-3xl overflow-hidden shadow-premium border border-[#C5A880]/20 flex flex-col justify-end p-3.5 select-none will-animate cursor-zoom-in group/card1"
        >
          <div className="absolute inset-0 z-0 pointer-events-none group-hover/card1:scale-105 transition-transform duration-700">
            <Image
              src="/thiepmaudovang/images/couple-small-1.jpg"
              alt="Lần Đầu Gặp Gỡ"
              fill
              sizes="(max-width: 430px) 50vw, 215px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="relative z-20 text-white font-barlow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[#E6D5C3]">01</span>
              <span className="text-[7px] tracking-wider text-neutral-300 font-mono">14.02.2021</span>
            </div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#E6D5C3]">
              Lần Đầu Gặp Gỡ
            </h3>
            <p className="text-[8px] text-neutral-300 font-cormorant italic leading-tight mt-0.5 font-medium line-clamp-2">
              Ánh mắt chạm nhau giữa ngày thu Hà Nội thơ mộng.
            </p>
          </div>
        </motion.div>

        {/* CARD 2: Lời Tỏ Tình Chân Thành */}
        <motion.div
          variants={child2Variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onClick={() => onImageClick(2)}
          className="col-span-1 relative rounded-3xl overflow-hidden shadow-premium border border-[#C5A880]/20 flex flex-col justify-end p-3.5 select-none will-animate cursor-zoom-in group/card2"
        >
          <div className="absolute inset-0 z-0 pointer-events-none group-hover/card2:scale-105 transition-transform duration-700">
            <Image
              src="/thiepmaudovang/images/couple-small-2.jpg"
              alt="Lời Tỏ Tình Chân Thành"
              fill
              sizes="(max-width: 430px) 50vw, 215px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="relative z-20 text-white font-barlow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[#E6D5C3]">02</span>
              <span className="text-[7px] tracking-wider text-neutral-300 font-mono">20.10.2021</span>
            </div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#E6D5C3]">
              Lời Tỏ Tình
            </h3>
            <p className="text-[8px] text-neutral-300 font-cormorant italic leading-tight mt-0.5 font-medium line-clamp-2">
              Lời đồng ý ngọt ngào bắt đầu chương hạnh phúc mới.
            </p>
          </div>
        </motion.div>

        {/* CARD 3: Hẹn Hò Đầu Tiên (Tall spans rows 2 & 3) */}
        <motion.div
          variants={child3Variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onClick={() => onImageClick(3)}
          className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden shadow-premium border border-[#C5A880]/20 flex flex-col justify-end p-4 select-none will-animate cursor-zoom-in group/card3"
        >
          <div className="absolute inset-0 z-0 pointer-events-none group-hover/card3:scale-105 transition-transform duration-700">
            <Image
              src="/thiepmaudovang/images/couple-small-3.jpg"
              alt="Hẹn hò đầu tiên"
              fill
              sizes="(max-width: 430px) 50vw, 215px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="relative z-20 text-white font-barlow">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-[#E6D5C3]">03</span>
              <span className="text-[7px] tracking-wider text-neutral-300 font-mono">08.05.2022</span>
            </div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#E6D5C3]">
              Hẹn Hò Đầu Tiên
            </h3>
            <p className="text-[8.5px] text-neutral-300 font-cormorant italic leading-relaxed mt-1 font-medium">
              Buổi hẹn hò đầu tiên bên hương cà phê sữa ấm áp gần hồ Gươm lộng gió.
            </p>
          </div>
        </motion.div>

        {/* CARD 4: Lời Cầu Hôn Ngọt Ngào */}
        <motion.div
          variants={child4Variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onClick={() => onImageClick(4)}
          className="col-span-1 relative rounded-3xl overflow-hidden shadow-premium border border-[#C5A880]/20 flex flex-col justify-end p-3.5 select-none will-animate cursor-zoom-in group/card4"
        >
          <div className="absolute inset-0 z-0 pointer-events-none group-hover/card4:scale-105 transition-transform duration-700">
            <Image
              src="/thiepmaudovang/images/gallery-2.jpg"
              alt="Lời Cầu Hôn Ngọt Ngào"
              fill
              sizes="(max-width: 430px) 50vw, 215px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="relative z-20 text-white font-barlow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[#E6D5C3]">04</span>
              <span className="text-[7px] tracking-wider text-neutral-300 font-mono">24.12.2024</span>
            </div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#E6D5C3]">
              Lời Cầu Hôn
            </h3>
            <p className="text-[8px] text-neutral-300 font-cormorant italic leading-tight mt-0.5 font-medium line-clamp-2">
              "Em đồng ý" trong không khí Giáng Sinh lung linh ấm áp.
            </p>
          </div>
        </motion.div>

        {/* CARD 5: Lễ Cưới Trọng Đại */}
        <motion.div
          variants={child5Variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onClick={() => onImageClick(5)}
          className="col-span-1 relative rounded-3xl overflow-hidden shadow-premium border border-[#C5A880]/20 flex flex-col justify-end p-3.5 select-none will-animate cursor-zoom-in group/card5"
        >
          <div className="absolute inset-0 z-0 pointer-events-none group-hover/card5:scale-105 transition-transform duration-700">
            <Image
              src="/thiepmaudovang/images/gallery-3.jpg"
              alt="Lễ Cưới Trọng Đại"
              fill
              sizes="(max-width: 430px) 50vw, 215px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="relative z-20 text-white font-barlow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[#E6D5C3]">05</span>
              <span className="text-[7px] tracking-wider text-neutral-300 font-mono">10.10.2026</span>
            </div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#E6D5C3]">
              Lễ Cưới Trọng Đại
            </h3>
            <p className="text-[8px] text-neutral-300 font-cormorant italic leading-tight mt-0.5 font-medium line-clamp-2">
              Hành trình hạnh phúc viên mãn bắt đầu từ hôm nay.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Floating indicator */}
      <div className="text-center z-10 opacity-40 flex flex-col items-center">
        <svg className="w-4 h-4 text-[#C5A880] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT: SCREEN 3 LOGISTICS & RSVP GATE & LIVE WISHES
   ========================================================================= */
interface LogisticsAndRsvpProps {
  wedding: Wedding;
  isRsvpOpen: boolean;
  setIsRsvpOpen: (open: boolean) => void;
  setIsGiftOpen: (open: boolean) => void;
  wishes: Wish[];
}

function LogisticsAndRsvp({ wedding, isRsvpOpen, setIsRsvpOpen, setIsGiftOpen, wishes }: LogisticsAndRsvpProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Grid box entrance animation
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col justify-between py-6">
      
      {/* Title */}
      <div className="text-center z-10 font-barlow">
        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#8C7355]">
          Logistics & RSVP
        </span>
        <h2 className="text-2xl font-bold font-cormorant tracking-widest text-stone-800 mt-0.5">
          TIME & LOCATION
        </h2>
      </div>

      {/* Bento Grid: 2 columns, custom row distributions (fills screen space more) */}
      <div className="grid grid-cols-2 gap-3.5 my-auto max-h-[75vh] flex-grow mt-4">
        
        {/* CARD A: Detailed Location Information (Full Width) */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="col-span-2 glass-card rounded-3xl p-5 shadow-premium border border-[#C5A880]/15 flex flex-col justify-between max-h-[38vh] overflow-y-auto custom-scroll will-animate"
        >
          <div className="font-barlow h-full flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#C5A880] mb-3">
              <Calendar className="w-4 h-4" />
              <span className="text-[9px] uppercase font-bold tracking-widest">Lịch Trình Chi Tiết</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 divide-x divide-[#C5A880]/20 text-[#1C1917] flex-grow items-stretch">
              {/* Groom's Family detail */}
              {wedding.location_info.groom_family && (
                <div className="pr-2 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[8.5px] uppercase font-bold text-[#8C7355] tracking-wider block mb-1">
                      NHÀ TRAI
                    </span>
                    <p className="text-xs font-bold text-stone-800">
                      Lễ Vu Quy & Tiệc Cưới
                    </p>
                    <p className="text-[9px] text-[#C5A880] font-bold mt-1">
                      {wedding.location_info.groom_family.time} - {wedding.location_info.groom_family.date}
                    </p>
                    <p className="text-[9px] text-neutral-500 mt-1.5 leading-relaxed">
                      {wedding.location_info.groom_family.address}
                    </p>
                  </div>
                  
                  {/* Groom Chibi Map Embedded */}
                  {wedding.location_info.groom_family.map_url && (
                    <a
                      href={wedding.location_info.groom_family.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full h-[76px] my-2 bg-stone-100 rounded-2xl overflow-hidden border border-[#C5A880]/15 block shadow-inner group/groomMap cursor-pointer"
                    >
                      <Image
                        src="/thiepmaudovang/images/map-groom.png"
                        alt="Bản đồ Nhà Trai"
                        fill
                        sizes="(max-width: 430px) 50vw, 215px"
                        className="object-cover group-hover/groomMap:scale-105 transition-transform duration-500"
                      />
                    </a>
                  )}

                  {wedding.location_info.groom_family.map_url && (
                    <a
                      href={wedding.location_info.groom_family.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider text-[#C5A880] hover:text-[#8C7355] transition-colors border border-[#C5A880]/30 rounded-full px-3 py-1 w-fit cursor-pointer"
                    >
                      <MapPin className="w-2.5 h-2.5" />
                      Bản đồ ↗
                    </a>
                  )}
                </div>
              )}

              {/* Bride's Family detail */}
              {wedding.location_info.bride_family && (
                <div className="pl-3.5 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[8.5px] uppercase font-bold text-[#8C7355] tracking-wider block mb-1">
                      NHÀ GÁI
                    </span>
                    <p className="text-xs font-bold text-stone-800">
                      Lễ Tân Hôn & Tiệc Cưới
                    </p>
                    <p className="text-[9px] text-[#C5A880] font-bold mt-1">
                      {wedding.location_info.bride_family.time} - {wedding.location_info.bride_family.date}
                    </p>
                    <p className="text-[9px] text-neutral-500 mt-1.5 leading-relaxed">
                      {wedding.location_info.bride_family.address}
                    </p>
                  </div>

                  {/* Bride Chibi Map Embedded */}
                  {wedding.location_info.bride_family.map_url && (
                    <a
                      href={wedding.location_info.bride_family.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full h-[76px] my-2 bg-stone-100 rounded-2xl overflow-hidden border border-[#C5A880]/15 block shadow-inner group/brideMap cursor-pointer"
                    >
                      <Image
                        src="/thiepmaudovang/images/map-bride.png"
                        alt="Bản đồ Nhà Gái"
                        fill
                        sizes="(max-width: 430px) 50vw, 215px"
                        className="object-cover group-hover/brideMap:scale-105 transition-transform duration-500"
                      />
                    </a>
                  )}

                  {wedding.location_info.bride_family.map_url && (
                    <a
                      href={wedding.location_info.bride_family.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider text-[#C5A880] hover:text-[#8C7355] transition-colors border border-[#C5A880]/30 rounded-full px-3 py-1 w-fit cursor-pointer"
                    >
                      <MapPin className="w-2.5 h-2.5" />
                      Bản đồ ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-[#C5A880]/15 pt-3 mt-3 flex justify-between items-center text-[9px] text-neutral-400 font-barlow">
            <span className="italic">// Hân hạnh được đón tiếp Quý khách!</span>
          </div>
        </motion.div>

        {/* CARD B: Dynamic Wishes List Feed */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
          className="col-span-1 glass-card rounded-3xl p-4 flex flex-col justify-between shadow-premium border border-[#C5A880]/15 will-animate h-[28vh]"
        >
          <div className="flex flex-col h-full w-full">
            <div className="flex items-center gap-1.5 text-[#C5A880] mb-2 font-barlow">
              <Heart className="w-3.5 h-3.5 fill-[#C5A880]/20" />
              <span className="text-[9px] uppercase font-bold tracking-wider">Lời Chúc Khách Mời</span>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scroll space-y-2 pr-0.5 max-h-[19vh] min-h-[14vh]">
              {wishes.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center py-4">
                  <p className="text-[8px] italic text-neutral-400 font-barlow">
                    Chưa có lời chúc nào. Hãy chúc phúc đầu tiên nhé!
                  </p>
                </div>
              ) : (
                wishes.map((wish) => (
                  <div key={wish.id} className="border-b border-[#C5A880]/10 pb-1.5 last:border-b-0">
                    <span className="text-[8.5px] font-bold text-stone-800 font-barlow uppercase block tracking-wider">
                      {wish.guest_name}
                    </span>
                    <p className="text-[9px] text-neutral-500 font-cormorant italic leading-tight mt-0.5 break-words font-medium">
                      "{wish.content}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* CARD C: RSVP prominent gateway */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.25 }}
          layoutId="rsvp-card-overlay"
          onClick={() => setIsRsvpOpen(true)}
          className="col-span-1 bg-stone-900 border border-stone-850 rounded-3xl p-4 flex flex-col justify-center items-center text-center shadow-premium cursor-pointer relative group overflow-hidden will-animate h-[28vh]"
        >
          {/* Glowing pulse ring in background */}
          <div className="absolute w-20 h-20 rounded-full bg-white/5 blur-xl animate-pulse pointer-events-none" />
          
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2.5 transition-transform duration-500 group-hover:scale-110">
            <Check className="w-5 h-5 text-[#C5A880]" />
          </div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#E6D5C3] block mb-1 font-barlow">
            Xác Nhận RSVP
          </span>
          <p className="text-[8.5px] text-neutral-300 font-cormorant leading-relaxed font-semibold">
            Gửi lời xác nhận tham dự đám cưới nhanh chóng
          </p>
        </motion.div>

      </div>

      {/* Small Editorial Accent Footer */}
      <div className="text-center z-10 font-barlow opacity-45 text-[8.5px] uppercase tracking-widest">
        © 2026 Minh Hoàng & Mai Hương • Made with Love
      </div>

    </div>
  );
}
