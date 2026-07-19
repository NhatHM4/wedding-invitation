"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence, animate } from "framer-motion";
import { 
  Heart, Calendar, MapPin, Music, Play, Pause, Unlock, Lock, 
  ChevronDown, Send, Users, Clock, Image as ImageIcon, 
  Phone, Copy, Check, Sun, Moon, Volume2, VolumeX, Compass
} from "lucide-react";
import { Wedding, Wish } from "@/types";

// ==============================================================================
// DIRECTIVE 2: TACTILE BUTTONS ENGINE
// ==============================================================================
interface TactileButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "raised" | "sunken";
  isPressed?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
}

const TactileButton = ({
  children,
  className = "",
  variant = "raised",
  isPressed = false,
  onClick,
  type = "button",
  disabled = false,
  title
}: TactileButtonProps) => {
  const isSunken = variant === "sunken" || isPressed;
  
  return (
    <motion.button
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.15
      }}
      className={`
        neomorph-transition rounded-2xl flex items-center justify-center p-3 select-none outline-none
        ${isSunken ? "neomorph-sunken text-slate-800" : "neomorph-raised text-slate-700"}
        ${className}
      `}
      style={{
        willChange: "transform, box-shadow",
      }}
    >
      {/* Inner wrapper downscales subtly and simulates ambient occlusion */}
      <motion.div 
        whileTap={{ scale: 0.97 }}
        className="w-full h-full flex items-center justify-center gap-2"
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

// ==============================================================================
// ==============================================================================
// DIRECTIVE 4: PHYSICAL DYNAMIC POLAROID LOOKBOOK DECK
// ==============================================================================
interface PolaroidCardProps {
  image: string;
  index: number;
  cardIndex: number;
  total: number;
  caption: string;
  isTop: boolean;
  offset: { x: number; y: number; rotate: number };
  onSwipe: () => void;
}

const PolaroidCard = ({
  image,
  index,
  cardIndex,
  total,
  caption,
  isTop,
  offset,
  onSwipe
}: PolaroidCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Map horizontal displacement to rotation: -300px to 300px maps to -20deg to 20deg
  const cardRotation = useTransform(x, [-300, 300], [-20 + offset.rotate, 20 + offset.rotate]);
  // Fade card opacity slightly when swiped far
  const opacity = useTransform(x, [-200, -300, 300, 200], [1, 0.1, 0.1, 1]);

  const handleDragEnd = async (event: any, info: any) => {
    if (!isTop) return;
    const velocityX = info.velocity.x;
    const currentX = x.get();

    // High velocity or high offset triggers throwing off screen
    if (velocityX > 600 || currentX > 140) {
      await controls.start({ 
        x: 450, 
        y: y.get() + info.offset.y,
        opacity: 0,
        transition: { duration: 0.25, ease: "easeOut" } 
      });
      onSwipe();
    } else if (velocityX < -600 || currentX < -140) {
      await controls.start({ 
        x: -450, 
        y: y.get() + info.offset.y,
        opacity: 0,
        transition: { duration: 0.25, ease: "easeOut" } 
      });
      onSwipe();
    } else {
      // Snap back with rigid spring physics
      controls.start({ 
        x: 0, 
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 350, damping: 22 } 
      });
    }
  };

  return (
    <motion.div
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{
        x,
        y,
        rotate: isTop ? cardRotation : offset.rotate,
        opacity: isTop ? opacity : 0.95 - (index * 0.08),
        scale: isTop ? 1 : 0.96 - (index * 0.02),
        zIndex: total - index,
        willChange: "transform, opacity",
      }}
      className={`
        absolute w-[290px] h-[370px] bg-white p-4 rounded-md polaroid-drop-shadow
        border-t-2 border-l-2 border-slate-50 flex flex-col justify-between
        ${isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}
      `}
    >
      {/* Photo area */}
      <div className="relative w-full aspect-square bg-[#F3F4F6] overflow-hidden rounded border border-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={image} 
          alt="Wedding Lookbook" 
          className="w-full h-full object-cover select-none pointer-events-none" 
        />
        {isTop && (
          <div className="absolute inset-0 bg-radial-gradient(from 10% 10%, rgba(255,255,255,0.15) 0%, transparent 80%) pointer-events-none" />
        )}
      </div>

      {/* Write-in area */}
      <div className="flex flex-col items-center justify-center flex-grow pt-4 pb-2">
        <p className="font-pinyon text-3xl text-neutral-800 tracking-wide text-center">
          {caption}
        </p>
        <span className="text-[10px] text-gray-400 font-mono tracking-widest mt-1 uppercase">
          {cardIndex + 1} / {total}
        </span>
      </div>
    </motion.div>
  );
};

const PolaroidStackDeck = ({ images }: { images: string[] }) => {
  const [deck, setDeck] = useState<string[]>(images || []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const captions = [
    "Chúng mình bắt đầu...",
    "Nụ cười của sự gắn kết",
    "Ngày chung đôi hạnh phúc",
    "Hành trình yêu thương",
    "Hẹn ước trăm năm",
    "Đồng hành trọn đời",
    "Khoảnh khắc ngọt ngào",
    "Mãi mãi bên nhau"
  ];

  // Random offsets generated once
  const offsets = useMemo(() => {
    return images.map((_, i) => ({
      rotate: ((i * 37) % 7) - 3, // Deterministic random -3 to +3
      x: ((i * 13) % 17) - 8,    // -8 to +8
      y: ((i * 29) % 17) - 8     // -8 to +8
    }));
  }, [images]);

  const handleSwipe = () => {
    // Put swiped card at the bottom of the stack to loop forever
    setDeck((prev) => {
      const next = [...prev];
      const shifted = next.shift();
      if (shifted) next.push(shifted);
      return next;
    });
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center select-none overflow-visible">
      <AnimatePresence initial={false}>
        {deck.slice(0, 3).map((img, idx) => {
          // Map dynamic index back to static offsets based on the original image index
          const originalIndex = images.indexOf(img);
          const offset = offsets[originalIndex] || { x: 0, y: 0, rotate: 0 };
          return (
            <PolaroidCard
              key={img}
              image={img}
              index={idx}
              cardIndex={originalIndex}
              total={images.length}
              caption={captions[originalIndex % captions.length]}
              isTop={idx === 0}
              offset={offset}
              onSwipe={handleSwipe}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// ==============================================================================
// MAIN COMPONENT & LAYOUT WRAPPER
// ==============================================================================
interface Template7Props {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

export default function Template7({ wedding, to, wishes }: Template7Props) {
  // OS System States
  const [isLocked, setIsLocked] = useState(true);
  const [theme, setTheme] = useState<"clay" | "sage">("clay");
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  
  // Time state for Lock Screen / Status Bar
  const [systemTime, setSystemTime] = useState("12:00");
  const [systemDate, setSystemDate] = useState("Thứ Bảy, 12 Tháng 12");

  // Audio Playback
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // RSVP Form States
  const [formName, setFormName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formAttending, setFormAttending] = useState<boolean | null>(null);
  const [formGuestCount, setFormGuestCount] = useState(1);
  const [formSide, setFormSide] = useState<"groom" | "bride">("groom");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rsvpFeedback, setRsvpFeedback] = useState("");
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes || []);
  
  // Banking clipboard feedback
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setSystemTime(`${hrs}:${mins}`);

      // Format Vietnamese date
      const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
      const dayName = days[now.getDay()];
      const day = now.getDate();
      const month = now.getMonth() + 1;
      setSystemDate(`${dayName}, ngày ${day} tháng ${month}`);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Unlock Trigger
  const dragUnlockX = useMotionValue(0);
  const unlockThreshold = 180;
  const slideTextOpacity = useTransform(dragUnlockX, [0, unlockThreshold], [1, 0.1]);

  const handleUnlockDragEnd = () => {
    if (dragUnlockX.get() >= unlockThreshold) {
      triggerUnlock();
    } else {
      animate(dragUnlockX, 0, { type: "spring", stiffness: 300, damping: 20 });
    }
  };

  const triggerUnlock = () => {
    setIsLocked(false);
    // Play music on user interaction
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay prevented", err));
    }
  };

  // Toggle Audio
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log(err));
    }
  };

  // ==============================================================================
  // DIRECTIVE 3: PULL-TO-REVEAL NOTIFICATION DRAWER MECHANICS
  // ==============================================================================
  const drawerHeight = 540;
  const closedDrawerY = -500; // Leaves 40px tab handle visible at the top
  const openDrawerY = 0;
  const drawerDragY = useMotionValue(closedDrawerY);

  // Applying custom logarithmic friction formula for elastic rubber banding
  const drawerDisplayY = useTransform(drawerDragY, (latest) => {
    if (latest > openDrawerY) {
      // Pulling past bottom threshold (Drawer fully open)
      const overflow = latest - openDrawerY;
      const modifier = 22;
      return openDrawerY + Math.log(1 + overflow) * modifier;
    } else if (latest < closedDrawerY) {
      // Pulling above top threshold (Drawer fully closed)
      const overflow = closedDrawerY - latest;
      const modifier = 22;
      return closedDrawerY - Math.log(1 + overflow) * modifier;
    }
    return latest;
  });

  const handleDrawerDragEnd = (event: any, info: any) => {
    const currentY = drawerDragY.get();
    const velocityY = info.velocity.y;

    let target = closedDrawerY;

    // Velocity-based snapping
    if (velocityY > 400) {
      target = openDrawerY;
    } else if (velocityY < -400) {
      target = closedDrawerY;
    } else {
      // Snap to closest boundary based on current position midpoint
      const midpoint = (closedDrawerY + openDrawerY) / 2;
      if (currentY > midpoint) {
        target = openDrawerY;
      } else {
        target = closedDrawerY;
      }
    }

    animate(drawerDragY, target, {
      type: "spring",
      bounce: 0.18,
      duration: 0.65
    });
  };

  // Triggering drawer programmatically
  const openDrawer = () => {
    animate(drawerDragY, openDrawerY, { type: "spring", bounce: 0.15, duration: 0.6 });
  };
  const closeDrawer = () => {
    animate(drawerDragY, closedDrawerY, { type: "spring", bounce: 0.15, duration: 0.6 });
  };

  // Copy Clipboard Helper
  const handleCopyAccount = (number: string, type: "groom" | "bride") => {
    navigator.clipboard.writeText(number);
    if (type === "groom") {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  // RSVP Form handler
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setRsvpFeedback("Vui lòng nhập tên của bạn");
      return;
    }
    if (formAttending === null) {
      setRsvpFeedback("Vui lòng xác nhận sự tham dự");
      return;
    }

    setIsSubmitting(true);
    setRsvpFeedback("");

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
        setRsvpFeedback("Xác nhận thông tin thành công. Cảm ơn bạn!");
      } else {
        setRsvpFeedback("Không thể gửi thông tin. Vui lòng thử lại.");
      }
    } catch (err) {
      setRsvpFeedback("Lỗi kết nối. Vui lòng kiểm tra internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Date countdown math
  const countdown = useMemo(() => {
    if (!wedding.event_date) return { days: 0, hours: 0, mins: 0 };
    const eventTime = new Date(wedding.event_date).getTime();
    const now = new Date().getTime();
    const diff = eventTime - now;
    if (diff <= 0) return { days: 0, hours: 0, mins: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, mins };
  }, [wedding.event_date]);

  return (
    <div 
      data-theme={theme}
      className="w-full min-h-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden select-none font-inter text-slate-800"
    >
      {/* Embedded audio */}
      <audio ref={audioRef} src={wedding.music_url || "/thiepmaudovang/audio/bg-music.mp3"} loop />

      {/* Floating animations style injection (Direct style rule to prevent layout thrash) */}
      <style>{`
        @keyframes rotateDisk {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .disk-spin {
          animation: rotateDisk 12s linear infinite;
        }
        @keyframes floatMusicNote {
          0% { transform: translateY(0) scale(0.6) rotate(0deg); opacity: 0; }
          40% { opacity: 0.8; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-50px) translateX(var(--note-x, 15px)) scale(1.1) rotate(15deg); opacity: 0; }
        }
        .music-note-anim {
          animation: floatMusicNote 2.4s infinite ease-out;
        }
      `}</style>

      {/* Simulated Smartphone viewport */}
      <div 
        className="
          relative w-full max-w-[425px] h-screen sm:h-[840px] 
          sm:rounded-[40px] sm:border-[10px] sm:border-slate-800 
          shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden 
          flex flex-col neomorph-bg select-none
        "
        style={{
          transform: "translate3d(0,0,0)" // hardware layers composition lock
        }}
      >
        {/* TOP STATUS BAR */}
        <div className="absolute top-0 left-0 w-full h-11 bg-transparent px-6 flex justify-between items-center z-50 pointer-events-none">
          <span className="text-xs font-semibold text-slate-600 font-sans tracking-wide">
            {systemTime}
          </span>
          {/* Speaker pill notch */}
          <div className="w-[110px] h-[22px] bg-slate-800 rounded-full flex items-center justify-center shadow-inner pointer-events-auto border-t border-slate-700">
            <div className="w-14 h-1.5 bg-slate-700 rounded-full shadow-inner" />
          </div>
          {/* Signal and battery symbols */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.78-1.78C9.07 19.64 10.48 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
            </svg>
            <div className="w-5.5 h-3 border border-slate-500 rounded-sm p-0.5 flex items-center justify-start">
              <div className="h-full w-4/5 bg-slate-600 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* SYSTEM APP SHEETS (ANIME LAYOUT) */}
        <AnimatePresence>
          {activeApp && (
            <motion.div
              initial={{ y: "100%", filter: "blur(6px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              exit={{ y: "100%", filter: "blur(6px)" }}
              transition={{ type: "spring", bounce: 0.08, duration: 0.55 }}
              className="absolute inset-0 z-35 neomorph-bg flex flex-col pt-12 pb-6 px-4"
              style={{ willChange: "transform, filter" }}
            >
              {/* App Navigation Bar */}
              <div className="flex items-center justify-between mb-5 px-1">
                <TactileButton 
                  onClick={() => {
                    setActiveApp(null);
                    setSelectedAlbum(null);
                  }}
                  className="w-11 h-11 !rounded-full !p-0"
                >
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </TactileButton>
                <h2 className="text-md font-bold text-slate-700 font-sans tracking-wide uppercase">
                  {activeApp === "invite" && "Thư Mời Hỷ Sự"}
                  {activeApp === "album" && "Album Kỷ Niệm"}
                  {activeApp === "rsvp" && "Phản Hồi & Lời Chúc"}
                  {activeApp === "map" && "Bản Đồ & Mừng Cưới"}
                </h2>
                <div className="w-11" /> {/* Layout balancer */}
              </div>

              {/* App Viewports */}
              <div className="flex-grow overflow-y-auto px-1 custom-scroll pb-12">
                {/* 1. THƯ MỜI APP */}
                {activeApp === "invite" && (
                  <div className="space-y-5">
                    {/* Personalized Guest Box */}
                    <div className="neomorph-raised rounded-3xl p-6 text-center border-t border-white/50">
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-sans font-semibold mb-1">
                        Thân Gửi Quý Khách
                      </p>
                      <h3 className="font-pinyon text-4xl text-slate-800 my-2">
                        {to}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[280px] mx-auto mt-2">
                        Sự hiện diện của quý vị là niềm vinh hạnh lớn cho gia đình chúng tôi để cùng chúc mừng hạnh phúc trăm năm.
                      </p>
                    </div>

                    {/* Couple Portrait Card */}
                    <div className="neomorph-raised rounded-3xl p-4 flex flex-col items-center">
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner relative border border-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src="/thiepmaudovang/images/cover.jpg" 
                          alt="Wedding Cover" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute bottom-4 left-4 text-white text-xs font-mono tracking-widest uppercase">
                          SAVE THE DATE
                        </span>
                      </div>
                      <div className="text-center py-4">
                        <h4 className="font-cormorant text-2xl font-bold text-slate-700 tracking-wide">
                          Vinh Quang & Thúy Vân
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">
                          12 . 12 . 2026
                        </p>
                      </div>
                    </div>

                    {/* Parents & Families Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Groom Side */}
                      <div className="neomorph-raised rounded-3xl p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-sky-600 bg-sky-50 font-bold px-2 py-0.5 rounded-full border border-sky-100 uppercase tracking-wider">
                            Nhà Trai
                          </span>
                          <div className="mt-3 text-slate-600 text-xs space-y-1">
                            <p className="font-semibold text-slate-700">Ông: {wedding.location_info.groom_family?.father_name}</p>
                            <p className="font-semibold text-slate-700">Bà: {wedding.location_info.groom_family?.mother_name}</p>
                            <p className="text-[10px] text-slate-400 italic pt-1">Hà Nội</p>
                          </div>
                        </div>
                        <div className="mt-4 border-t border-slate-200/50 pt-3">
                          <p className="text-[11px] font-bold text-slate-700">Chú Rể</p>
                          <p className="font-cormorant text-lg font-bold text-slate-800">{wedding.groom_name}</p>
                        </div>
                      </div>

                      {/* Bride Side */}
                      <div className="neomorph-raised rounded-3xl p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-rose-600 bg-rose-50 font-bold px-2 py-0.5 rounded-full border border-rose-100 uppercase tracking-wider">
                            Nhà Gái
                          </span>
                          <div className="mt-3 text-slate-600 text-xs space-y-1">
                            <p className="font-semibold text-slate-700">Ông: {wedding.location_info.bride_family?.father_name}</p>
                            <p className="font-semibold text-slate-700">Bà: {wedding.location_info.bride_family?.mother_name}</p>
                            <p className="text-[10px] text-slate-400 italic pt-1">TP. Hồ Chí Minh</p>
                          </div>
                        </div>
                        <div className="mt-4 border-t border-slate-200/50 pt-3">
                          <p className="text-[11px] font-bold text-slate-700">Cô Dâu</p>
                          <p className="font-cormorant text-lg font-bold text-slate-800">{wedding.bride_name}</p>
                        </div>
                      </div>
                    </div>

                    {/* Thank You Note */}
                    <div className="neomorph-raised rounded-3xl p-6 text-center">
                      <Heart className="w-6 h-6 text-rose-500 mx-auto animate-pulse mb-3" />
                      <p className="font-cormorant text-lg italic text-slate-600 leading-relaxed">
                        &quot;Tình yêu không phải là tìm thấy một ai đó hoàn hảo, mà là học cách nhìn thấy những điều tuyệt vời từ một người không hoàn hảo.&quot;
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. ALBUM APP */}
                {activeApp === "album" && (
                  <div className="flex flex-col space-y-4">
                    {selectedAlbum === null ? (
                      <div className="space-y-4">
                        <div className="text-left mb-2 px-1">
                          <h3 className="text-2xl font-bold text-slate-800 font-sans">
                            Albums
                          </h3>
                          <p className="text-xs text-slate-400 font-sans">Chia sẻ khoảnh khắc ngọt ngào</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            {
                              id: "met",
                              title: "Ngày mới quen",
                              cover: "/thiepmaudovang/images/couple-small-1.jpg",
                              count: 3,
                              desc: "Những rung động đầu tiên đầy bỡ ngỡ..."
                            },
                            {
                              id: "proposal",
                              title: "Lời tỏ tình",
                              cover: "/thiepmaudovang/images/couple-small-2.jpg",
                              count: 3,
                              desc: "Lời ngỏ ý chân thành, cái gật đầu hạnh phúc."
                            },
                            {
                              id: "journey",
                              title: "Hành trình yêu",
                              cover: "/thiepmaudovang/images/couple-small-3.jpg",
                              count: 3,
                              desc: "Cùng nhau đi qua những năm tháng thanh xuân."
                            },
                            {
                              id: "wedding",
                              title: "Ngày chung đôi",
                              cover: "/thiepmaudovang/images/ceremony-photo.jpg",
                              count: 3,
                              desc: "Hẹn ước trăm năm, trọn đời bên nhau."
                            }
                          ].map((album) => (
                            <TactileButton
                              key={album.id}
                              onClick={() => setSelectedAlbum(album.id)}
                              className="w-full flex-col !p-3 !items-start text-left rounded-3xl"
                            >
                              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md mb-2 border border-slate-100/50">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={album.cover} 
                                  alt={album.title} 
                                  className="w-full h-full object-cover select-none pointer-events-none" 
                                />
                              </div>
                              <div className="px-1 text-slate-700 w-full">
                                <h4 className="text-xs font-bold truncate w-full font-sans">{album.title}</h4>
                                <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wide">
                                  {album.count} Ảnh
                                </span>
                              </div>
                            </TactileButton>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="flex justify-between items-center w-full px-1 mb-1">
                          <button
                            onClick={() => setSelectedAlbum(null)}
                            className="flex items-center gap-1 text-xs text-sky-500 font-sans font-bold cursor-pointer hover:text-sky-600"
                          >
                            <span>&larr; Albums</span>
                          </button>
                          <span className="text-xs text-slate-500 font-bold font-sans">
                            {selectedAlbum === "met" && "Ngày mới quen"}
                            {selectedAlbum === "proposal" && "Lời tỏ tình"}
                            {selectedAlbum === "journey" && "Hành trình yêu"}
                            {selectedAlbum === "wedding" && "Ngày chung đôi"}
                          </span>
                          <div className="w-12" />
                        </div>

                        <p className="text-[11px] text-slate-500 font-sans text-center italic max-w-[280px]">
                          {selectedAlbum === "met" && "\"Những rung động đầu tiên đầy bỡ ngỡ...\""}
                          {selectedAlbum === "proposal" && "\"Lời ngỏ ý chân thành, cái gật đầu hạnh phúc.\""}
                          {selectedAlbum === "journey" && "\"Cùng nhau đi qua những năm tháng thanh xuân.\""}
                          {selectedAlbum === "wedding" && "\"Hẹn ước trăm năm, trọn đời bên nhau.\""}
                        </p>

                        <div className="w-full flex items-center justify-center animate-fadeIn">
                          <PolaroidStackDeck 
                            key={selectedAlbum} 
                            images={
                              selectedAlbum === "met" ? [
                                "/thiepmaudovang/images/cover.jpg",
                                "/thiepmaudovang/images/gallery-1.jpg",
                                "/thiepmaudovang/images/gallery-2.jpg",
                              ] : selectedAlbum === "proposal" ? [
                                "/thiepmaudovang/images/gallery-3.jpg",
                                "/thiepmaudovang/images/gallery-4.jpg",
                                "/thiepmaudovang/images/gallery-5.jpg",
                              ] : selectedAlbum === "journey" ? [
                                "/thiepmaudovang/images/gallery-6.jpg",
                                "/thiepmaudovang/images/gallery-7.jpg",
                                "/thiepmaudovang/images/gallery-8.jpg",
                              ] : [
                                "/thiepmaudovang/images/gallery-9.jpg",
                                "/thiepmaudovang/images/gallery-10.jpg",
                                "/thiepmaudovang/images/cover.jpg",
                              ]
                            } 
                          />
                        </div>

                        <div className="neomorph-raised rounded-2xl p-4 w-full text-center max-w-[320px] mx-auto border-t border-white/20">
                          <p className="text-xs text-slate-500 font-sans tracking-wide">
                            💡 Thử dùng ngón tay vuốt ngang tấm ảnh sang trái/phải để chuyển sang ảnh tiếp theo với hiệu ứng ném vật lý.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. PHẢN HỒI APP */}
                {activeApp === "rsvp" && (
                  <div className="space-y-6">
                    {/* RSVP Form Card */}
                    <div className="neomorph-raised rounded-3xl p-6">
                      <h3 className="text-md font-bold text-slate-700 font-sans mb-4 text-center tracking-wide uppercase">
                        Xác Nhận Tham Dự (RSVP)
                      </h3>

                      {isSubmitted ? (
                        <div className="text-center py-6 space-y-3">
                          <div className="w-12 h-12 bg-green-50 border border-green-150 rounded-full flex items-center justify-center mx-auto text-green-500 neomorph-raised-sm">
                            <Check className="w-6 h-6" />
                          </div>
                          <h4 className="font-sans text-md font-bold text-slate-700">Gửi phản hồi thành công!</h4>
                          <p className="text-xs text-slate-500">Gia đình hai bên xin chân thành cảm ơn phản hồi của quý khách.</p>
                          <TactileButton 
                            onClick={() => setIsSubmitted(false)}
                            className="text-xs py-2 px-4 mx-auto mt-4 !rounded-xl"
                          >
                            Gửi Lại Phản Hồi Khác
                          </TactileButton>
                        </div>
                      ) : (
                        <form onSubmit={handleRsvpSubmit} className="space-y-4">
                          {/* Name Input */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 font-sans px-1">
                              Họ & Tên Khách Mời <span className="text-rose-500">*</span>
                            </label>
                            <input 
                              type="text" 
                              required
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="Nhập tên của bạn..."
                              className="
                                w-full h-11 px-4 text-sm rounded-xl neomorph-raised-sm 
                                border-none outline-none focus:ring-1 focus:ring-slate-400/30 
                                transition-all bg-transparent text-slate-700
                              "
                            />
                          </div>

                          {/* Attendance Checkbox */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 font-sans px-1">
                              Xác Nhận Tham Dự <span className="text-rose-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              <TactileButton
                                type="button"
                                isPressed={formAttending === true}
                                onClick={() => setFormAttending(true)}
                                className="h-11 !rounded-xl"
                              >
                                Tham Dự
                              </TactileButton>
                              <TactileButton
                                type="button"
                                isPressed={formAttending === false}
                                onClick={() => setFormAttending(false)}
                                className="h-11 !rounded-xl"
                              >
                                Tiếc, Không Thể Đi
                              </TactileButton>
                            </div>
                          </div>

                          {formAttending === true && (
                            <div className="grid grid-cols-2 gap-4">
                              {/* Guest Count */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 font-sans px-1">
                                  Số Lượng Đi Cùng
                                </label>
                                <select 
                                  value={formGuestCount}
                                  onChange={(e) => setFormGuestCount(Number(e.target.value))}
                                  className="
                                    w-full h-11 px-3 text-sm rounded-xl neomorph-raised-sm 
                                    border-none outline-none focus:ring-1 focus:ring-slate-400/30
                                    bg-transparent text-slate-700 font-sans
                                  "
                                >
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num} className="bg-slate-100">
                                      {num} người
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Guest Side */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 font-sans px-1">
                                  Bên Khách Mời
                                </label>
                                <select 
                                  value={formSide}
                                  onChange={(e) => setFormSide(e.target.value as "groom" | "bride")}
                                  className="
                                    w-full h-11 px-3 text-sm rounded-xl neomorph-raised-sm 
                                    border-none outline-none focus:ring-1 focus:ring-slate-400/30
                                    bg-transparent text-slate-700 font-sans
                                  "
                                >
                                  <option value="groom" className="bg-slate-100">Nhà Trai (Groom)</option>
                                  <option value="bride" className="bg-slate-100 font-sans">Nhà Gái (Bride)</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {/* Wishing Message */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 font-sans px-1">
                              Lời Chúc Gửi Đến Cô Dâu & Chú Rể
                            </label>
                            <textarea 
                              rows={3}
                              value={formMessage}
                              onChange={(e) => setFormMessage(e.target.value)}
                              placeholder="Nhập lời chúc tốt đẹp nhất của bạn..."
                              className="
                                w-full p-3 text-sm rounded-xl neomorph-raised-sm 
                                border-none outline-none focus:ring-1 focus:ring-slate-400/30 
                                transition-all bg-transparent text-slate-700 resize-none
                              "
                            />
                          </div>

                          {rsvpFeedback && (
                            <p className="text-xs text-rose-500 text-center font-sans">
                              {rsvpFeedback}
                            </p>
                          )}

                          {/* Submit Button */}
                          <TactileButton 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full h-12 !rounded-xl !bg-rose-500/10 !text-rose-600 font-bold border border-rose-200/20 active:bg-rose-500/20"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Xác Nhận & Gửi Lời Chúc
                              </>
                            )}
                          </TactileButton>
                        </form>
                      )}
                    </div>

                    {/* Wishes Feed list */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 font-sans px-1 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> Lời chúc gần đây ({localWishes.length})
                      </h4>
                      
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scroll">
                        {localWishes.map((wish) => (
                          <div 
                            key={wish.id} 
                            className="neomorph-raised-sm rounded-2xl p-4 border-t border-white/40 text-xs space-y-1.5"
                          >
                            <div className="flex justify-between items-center text-[10px] text-slate-400">
                              <span className="font-bold text-slate-600">{wish.guest_name}</span>
                              <span>{new Date(wish.created_at).toLocaleDateString("vi-VN")}</span>
                            </div>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                              {wish.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. BẢN ĐỒ APP */}
                {activeApp === "map" && (
                  <div className="space-y-6">
                    {/* Location 1: Groom family */}
                    <div className="neomorph-raised rounded-3xl p-5 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 neomorph-raised-sm flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="text-xs space-y-1">
                          <span className="text-[10px] text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 uppercase tracking-wider">
                            Tiệc Nhà Trai
                          </span>
                          <h4 className="font-bold text-slate-700 text-sm pt-1">Địa điểm tiệc cưới</h4>
                          <p className="text-slate-500 leading-relaxed font-sans">
                            {wedding.location_info.groom_family?.address}
                          </p>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {wedding.location_info.groom_family?.time} ngày {wedding.location_info.groom_family?.date}
                          </div>
                        </div>
                      </div>
                      
                      <TactileButton 
                        onClick={() => window.open(wedding.location_info.groom_family?.map_url, "_blank")}
                        className="w-full h-11 !rounded-xl !bg-sky-500/10 !text-sky-600 border border-sky-200/20 active:bg-sky-500/20"
                      >
                        <Compass className="w-4 h-4" /> Chỉ Đường Google Maps
                      </TactileButton>
                    </div>

                    {/* Location 2: Bride family */}
                    <div className="neomorph-raised rounded-3xl p-5 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 neomorph-raised-sm flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="text-xs space-y-1">
                          <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 uppercase tracking-wider">
                            Tiệc Nhà Gái
                          </span>
                          <h4 className="font-bold text-slate-700 text-sm pt-1">Địa điểm tiệc cưới</h4>
                          <p className="text-slate-500 leading-relaxed font-sans">
                            {wedding.location_info.bride_family?.address}
                          </p>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {wedding.location_info.bride_family?.time} ngày {wedding.location_info.bride_family?.date}
                          </div>
                        </div>
                      </div>
                      
                      <TactileButton 
                        onClick={() => window.open(wedding.location_info.bride_family?.map_url, "_blank")}
                        className="w-full h-11 !rounded-xl !bg-rose-500/10 !text-rose-600 border border-rose-200/20 active:bg-rose-500/20"
                      >
                        <Compass className="w-4 h-4" /> Chỉ Đường Google Maps
                      </TactileButton>
                    </div>

                    {/* Mừng cưới blessings details */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 font-sans px-1 uppercase tracking-wider text-center">
                        Hộp Mừng Cưới & Chúc Phúc
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Groom Gift */}
                        <div className="neomorph-raised rounded-3xl p-4 flex flex-col items-center text-center space-y-3">
                          <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider font-sans">Nhà Trai</span>
                          <div className="w-24 h-24 bg-white p-1 rounded-xl shadow-inner border border-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src="/thiepmaudovang/images/qr-groom.png" 
                              alt="Groom Bank QR" 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                          <div className="text-[10px] text-slate-500 space-y-0.5 font-sans">
                            <p className="font-bold text-slate-700">Techcombank</p>
                            <p>STK: 1903567890123</p>
                            <p>Nguyễn Vinh Quang</p>
                          </div>
                          <TactileButton 
                            onClick={() => handleCopyAccount("1903567890123", "groom")}
                            className="w-full h-9 !rounded-xl !p-0 !text-[11px]"
                          >
                            <AnimatePresence mode="wait">
                              {copiedGroom ? (
                                <motion.div 
                                  key="check" 
                                  initial={{ scale: 0.8, opacity: 0 }} 
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="flex items-center gap-1 text-green-600 font-semibold"
                                >
                                  <Check className="w-3.5 h-3.5" /> Đã Copy
                                </motion.div>
                              ) : (
                                <motion.div 
                                  key="copy"
                                  initial={{ scale: 0.8, opacity: 0 }} 
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="flex items-center gap-1 text-slate-500 font-semibold"
                                >
                                  <Copy className="w-3.5 h-3.5" /> Sao Chép
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </TactileButton>
                        </div>

                        {/* Bride Gift */}
                        <div className="neomorph-raised rounded-3xl p-4 flex flex-col items-center text-center space-y-3">
                          <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider font-sans">Nhà Gái</span>
                          <div className="w-24 h-24 bg-white p-1 rounded-xl shadow-inner border border-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src="/thiepmaudovang/images/qr-bride.png" 
                              alt="Bride Bank QR" 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                          <div className="text-[10px] text-slate-500 space-y-0.5 font-sans">
                            <p className="font-bold text-slate-700">Vietcombank</p>
                            <p>STK: 0071000987654</p>
                            <p>Phạm Thúy Vân</p>
                          </div>
                          <TactileButton 
                            onClick={() => handleCopyAccount("0071000987654", "bride")}
                            className="w-full h-9 !rounded-xl !p-0 !text-[11px]"
                          >
                            <AnimatePresence mode="wait">
                              {copiedBride ? (
                                <motion.div 
                                  key="check-bride" 
                                  initial={{ scale: 0.8, opacity: 0 }} 
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="flex items-center gap-1 text-green-600 font-semibold"
                                >
                                  <Check className="w-3.5 h-3.5" /> Đã Copy
                                </motion.div>
                              ) : (
                                <motion.div 
                                  key="copy-bride"
                                  initial={{ scale: 0.8, opacity: 0 }} 
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="flex items-center gap-1 text-slate-500 font-semibold"
                                >
                                  <Copy className="w-3.5 h-3.5" /> Sao Chép
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </TactileButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOCK SCREEN (TACTILE SWIPE TO ACTIVATE) */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              exit={{ 
                y: "-100%", 
                opacity: 0,
                filter: "blur(8px)",
                transition: { type: "spring", duration: 0.65, bounce: 0.1 }
              }}
              className="absolute inset-0 z-30 flex flex-col justify-between pt-20 pb-16 px-6 neomorph-bg"
              style={{
                willChange: "transform, opacity, filter"
              }}
            >
              {/* Top Clock widget */}
              <div className="text-center space-y-2 mt-4">
                <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">
                  WEDDING PHONE MINI OS
                </span>
                <h1 className="text-6xl font-extrabold text-slate-700 tracking-tight font-sans">
                  {systemTime}
                </h1>
                <p className="text-sm font-semibold text-slate-500 font-sans">
                  {systemDate}
                </p>
              </div>

              {/* Invitation Center Notification card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0 }}
                onClick={triggerUnlock}
                className="neomorph-raised rounded-3xl p-5 border-t border-white/50 cursor-pointer hover:bg-slate-100/50 active:scale-98 transition-all"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-500 flex-shrink-0 neomorph-raised-sm">
                    <Heart className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="text-xs space-y-1 flex-grow">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-slate-700 font-sans">1 Hộp Thư Tin Nhắn</span>
                      <span className="text-[10px] text-slate-400">Vừa xong</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">Vinh Quang & Thúy Vân</h4>
                    <p className="text-slate-500 leading-relaxed text-left">
                      Kính mời: <span className="font-bold text-rose-600">{to}</span> đến tham dự lễ cưới ấm áp của tụi mình...
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Slide to unlock track */}
              <div className="flex flex-col items-center space-y-4">
                <div className="neomorph-sunken h-16 w-full max-w-[290px] rounded-full flex items-center px-1.5 relative border border-slate-200/40">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 216 }}
                    dragElastic={0.05}
                    dragMomentum={false}
                    onDragEnd={handleUnlockDragEnd}
                    style={{ x: dragUnlockX }}
                    className="
                      neomorph-raised w-13 h-13 rounded-full cursor-grab active:cursor-grabbing 
                      flex items-center justify-center text-slate-500 bg-white border border-slate-100
                    "
                  >
                    <Unlock className="w-5 h-5 text-slate-400" />
                  </motion.div>
                  
                  <motion.span 
                    style={{ opacity: slideTextOpacity }}
                    className="
                      absolute inset-0 flex items-center justify-center pl-10 text-[10px] 
                      text-slate-400 font-sans pointer-events-none uppercase tracking-widest font-bold
                    "
                  >
                    Trượt để mở thiệp
                  </motion.span>
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  Hoặc chạm vào tin nhắn để mở trực tiếp
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HOME SCREEN */}
        <div className="flex-grow pt-14 pb-20 px-6 flex flex-col justify-between h-full relative z-10">
          
          {/* Top Panel (Widgets) */}
          <div className="space-y-6">
            
            {/* Countdown Widget */}
            <div className="neomorph-raised rounded-3xl p-5 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-sans font-bold tracking-wider uppercase mb-3 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-500" /> Đếm Ngược Ngày Chung Đôi
              </span>
              
              <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
                {/* Days */}
                <div className="neomorph-raised-sm rounded-2xl p-2.5 text-center border-t border-white/40">
                  <span className="text-2xl font-bold text-slate-700 tracking-tight font-sans">
                    {countdown.days}
                  </span>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-sans mt-0.5">Ngày</p>
                </div>
                {/* Hours */}
                <div className="neomorph-raised-sm rounded-2xl p-2.5 text-center border-t border-white/40">
                  <span className="text-2xl font-bold text-slate-700 tracking-tight font-sans">
                    {countdown.hours}
                  </span>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-sans mt-0.5">Giờ</p>
                </div>
                {/* Minutes */}
                <div className="neomorph-raised-sm rounded-2xl p-2.5 text-center border-t border-white/40">
                  <span className="text-2xl font-bold text-slate-700 tracking-tight font-sans">
                    {countdown.mins}
                  </span>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-sans mt-0.5">Phút</p>
                </div>
              </div>
              
              <div className="mt-3 text-[10px] text-slate-500 font-bold tracking-wide font-sans text-center">
                Vào lúc: {wedding.location_info.groom_family?.time} | {wedding.location_info.groom_family?.date}
              </div>
            </div>

            {/* Grid of App Shortcuts */}
            <div className="grid grid-cols-2 gap-5 px-1">
              
              {/* App 1: Thư Mời */}
              <TactileButton 
                onClick={() => setActiveApp("invite")}
                className="aspect-square flex-col gap-2 rounded-3xl"
              >
                <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-rose-500 neomorph-raised-sm">
                  <Heart className="w-5 h-5 fill-rose-500/20" />
                </div>
                <span className="text-xs font-bold text-slate-600 font-sans tracking-wide">Thư Mời</span>
              </TactileButton>

              {/* App 2: Album Kỷ Niệm */}
              <TactileButton 
                onClick={() => setActiveApp("album")}
                className="aspect-square flex-col gap-2 rounded-3xl"
              >
                <div className="w-10 h-10 bg-sky-50 border border-sky-100 rounded-full flex items-center justify-center text-sky-500 neomorph-raised-sm">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-600 font-sans tracking-wide">Album Ảnh</span>
              </TactileButton>

              {/* App 3: Phản Hồi & Lời Chúc */}
              <TactileButton 
                onClick={() => setActiveApp("rsvp")}
                className="aspect-square flex-col gap-2 rounded-3xl"
              >
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center text-amber-500 neomorph-raised-sm">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-600 font-sans tracking-wide">Gửi Lời Chúc</span>
              </TactileButton>

              {/* App 4: Bản Đồ & Mừng Cưới */}
              <TactileButton 
                onClick={() => setActiveApp("map")}
                className="aspect-square flex-col gap-2 rounded-3xl"
              >
                <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500 neomorph-raised-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-600 font-sans tracking-wide">Bản Đồ / Quà</span>
              </TactileButton>
            </div>
          </div>

          {/* Bottom Panel (Player & System Settings) */}
          <div className="space-y-4">
            
            {/* Music Player widget */}
            <div className="neomorph-raised rounded-3xl p-3 flex items-center justify-between border-t border-white/50">
              <div className="flex items-center gap-3">
                {/* Vinyl Record */}
                <div className="relative w-11 h-11 flex-shrink-0">
                  <div 
                    className={`
                      w-full h-full rounded-full bg-neutral-900 flex items-center justify-center border-2 border-slate-700
                      ${isPlaying ? "disk-spin" : ""}
                    `}
                    style={{ willChange: "transform" }}
                  >
                    {/* Vinyl center sticker */}
                    <div className="w-3.5 h-3.5 bg-rose-500 rounded-full border border-neutral-900" />
                  </div>
                  
                  {/* Floating music notes */}
                  {isPlaying && (
                    <>
                      <div className="absolute top-[-8px] right-0 text-[10px] text-rose-500 font-bold music-note-anim" style={{ "--note-x": "15px", animationDelay: "0s" } as any}>♫</div>
                      <div className="absolute top-[-8px] right-2 text-[10px] text-rose-600 font-bold music-note-anim" style={{ "--note-x": "-10px", animationDelay: "0.8s" } as any}>♪</div>
                      <div className="absolute top-[-8px] right-4 text-[10px] text-rose-400 font-bold music-note-anim" style={{ "--note-x": "20px", animationDelay: "1.6s" } as any}>♫</div>
                    </>
                  )}
                </div>

                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-700 truncate w-[160px] font-sans">
                    Ngày Đầu Tiên
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold truncate w-[160px] font-sans mt-0.5">
                    Đức Phúc - Nhạc Cưới
                  </p>
                </div>
              </div>

              {/* Play Pause button */}
              <TactileButton 
                onClick={toggleAudio}
                className="w-10 h-10 !rounded-full !p-0"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-slate-500" />
                ) : (
                  <Play className="w-4 h-4 text-slate-500 pl-0.5" />
                )}
              </TactileButton>
            </div>

            {/* Bottom Quick-Settings Bar */}
            <div className="flex items-center justify-between px-2">
              <TactileButton 
                onClick={() => setIsLocked(true)}
                className="w-10 h-10 !rounded-full !p-0"
                title="Khóa máy"
              >
                <Lock className="w-4 h-4 text-slate-400" />
              </TactileButton>

              {/* Quick instructions pull tab indicator */}
              <button 
                onClick={openDrawer}
                className="flex flex-col items-center text-slate-400 cursor-pointer py-1 px-3 hover:text-slate-500"
              >
                <ChevronDown className="w-4 h-4 animate-bounce" />
                <span className="text-[8px] font-bold tracking-widest uppercase font-sans">Lịch Trình Tiệc</span>
              </button>

              {/* Theme Switcher Toggle */}
              <TactileButton 
                onClick={() => setTheme(theme === "clay" ? "sage" : "clay")}
                className="w-10 h-10 !rounded-full !p-0"
                title="Đổi chủ đề màu"
              >
                {theme === "clay" ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-emerald-600" />
                )}
              </TactileButton>
            </div>
          </div>
        </div>

        {/* ==============================================================================
           DIRECTIVE 3: PULL-TO-REVEAL SCHEDULE DRAWER
           ============================================================================== */}
        <motion.div
          drag="y"
          dragConstraints={{ top: closedDrawerY, bottom: openDrawerY }}
          dragElastic={0.8}
          dragMomentum={false}
          onDragEnd={handleDrawerDragEnd}
          style={{ y: drawerDisplayY }}
          className="
            absolute top-0 left-0 w-full h-[520px] bg-slate-100/95 backdrop-blur-md z-40 
            rounded-b-[32px] border-b border-black/10 flex flex-col justify-between 
            shadow-[0_15px_30px_rgba(0,0,0,0.15)]
          "
        >
          {/* Drawer contents */}
          <div className="pt-14 pb-4 px-6 flex-grow overflow-y-auto custom-scroll text-xs">
            <div className="text-center mb-5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                Thông tin hành trình
              </span>
              <h3 className="text-md font-bold text-slate-700 font-sans tracking-wide uppercase mt-1">
                Lịch Trình Đám Cưới
              </h3>
            </div>

            {/* Timeline steps */}
            <div className="space-y-4 pl-2 border-l-2 border-slate-300 ml-4 py-2">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute top-1 -left-[15px] w-2 h-2 rounded-full bg-sky-500 border border-slate-100" />
                <div className="space-y-0.5 text-left">
                  <span className="font-mono text-[10px] text-sky-600 font-bold">11:00 AM</span>
                  <h4 className="font-bold text-slate-700">Đón Tiếp Khách Mời</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Chào đón đại gia đình quý khách, chụp hình kỷ niệm cùng cô dâu và chú rể tại photobooth sảnh tiệc.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="absolute top-1 -left-[15px] w-2 h-2 rounded-full bg-rose-500 border border-slate-100" />
                <div className="space-y-0.5 text-left">
                  <span className="font-mono text-[10px] text-rose-600 font-bold">11:30 AM</span>
                  <h4 className="font-bold text-slate-700">Lễ Thành Hôn (Ceremony)</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Nghi thức kết hôn chính thức, cắt bánh kem, rót rượu mừng, trao lời hẹn thề trước toàn thể hôn trường.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute top-1 -left-[15px] w-2 h-2 rounded-full bg-amber-500 border border-slate-100" />
                <div className="space-y-0.5 text-left">
                  <span className="font-mono text-[10px] text-amber-600 font-bold">12:00 PM</span>
                  <h4 className="font-bold text-slate-700">Khai Tiệc Chúc Mừng</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Khai tiệc ẩm thực thân mật, nâng ly cùng gia đình hai bên và thưởng thức chương trình ca nhạc nhẹ.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute top-1 -left-[15px] w-2 h-2 rounded-full bg-emerald-500 border border-slate-100" />
                <div className="space-y-0.5 text-left">
                  <span className="font-mono text-[10px] text-emerald-600 font-bold">13:00 PM</span>
                  <h4 className="font-bold text-slate-700">Giao Lưu & Tiễn Khách</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Lời cảm ơn chân thành từ cô dâu & chú rể gửi tới khách mời đã chung vui cùng hai vợ chồng.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pull tab handle at the bottom of the drawer sheet */}
          <div 
            onClick={() => {
              const currentY = drawerDragY.get();
              if (currentY > closedDrawerY + 50) {
                closeDrawer();
              } else {
                openDrawer();
              }
            }}
            className="h-10 bg-slate-200/90 border-t border-slate-300/30 flex items-center justify-center cursor-pointer rounded-b-[32px] select-none active:bg-slate-300/50 transition-colors"
          >
            <div className="w-12 h-1 bg-slate-400 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
