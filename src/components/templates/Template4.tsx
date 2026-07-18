"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, 
  VolumeX, 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  Send,
  MessageSquare,
  Gift,
  Copy,
  Check,
  X
} from "lucide-react";
import { Wedding, Wish } from "@/types";
import dynamic from "next/dynamic";
import BrutalistScrollRevealHeader from "../template4/BrutalistScrollRevealHeader";
import PolaroidOverlapGallery from "../template4/PolaroidOverlapGallery";

// Load WebGL FluidDistortionImage dynamically with SSR disabled to prevent hydration errors
const FluidDistortionImage = dynamic(() => import("../template4/FluidDistortionImage"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
      <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Loading Canvas...</span>
    </div>
  )
});

interface Template4Props {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

const defaultImages = [
  "/thiepmaudovang/images/cover.jpg",
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
  "/thiepmaudovang/images/gallery-4.jpg",
];

const defaultCaptions = [
  "Frame 01: The Exhibition Intro",
  "Frame 02: Moments of Harmony",
  "Frame 03: Mutual Understanding",
  "Frame 04: The Vow Exchange",
  "Frame 05: Eternal Reflection"
];

export default function Template4({ wedding, to, wishes }: Template4Props) {
  const [isEntered, setIsEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lookbookIndex, setLookbookIndex] = useState(0);
  
  // Wishes Feed State
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes);
  const [formName, setFormName] = useState(to !== "Quý khách" ? to : "");
  const [formContent, setFormContent] = useState("");
  const [rsvpAttending, setRsvpAttending] = useState<boolean | null>(null);
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Popup overlay states
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [selectedLookbookIndex, setSelectedLookbookIndex] = useState<number | null>(null);

  // Copy Clipboard Helper States
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const images = wedding.images && wedding.images.length > 0 ? wedding.images : defaultImages;

  // Handle entry and play background music
  const handleEnterExhibition = () => {
    setIsEntered(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play blocked by browser policies: ", err));
    }
  };

  // Toggle Audio Player
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Failed to resume audio: ", err));
    }
  };

  // Submit RSVP & Wishes
  const handleSubmitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContent.trim()) return;

    setIsSubmitting(true);
    
    // Simulate Network Request
    setTimeout(() => {
      const newWish: Wish = {
        id: Date.now(),
        wedding_id: wedding.id,
        guest_name: formName,
        content: formContent,
        created_at: new Date().toISOString()
      };

      setLocalWishes([newWish, ...localWishes]);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormContent("");

      // Reset submit state after 2.5s
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2500);
    }, 1200);
  };

  const copyToClipboard = (text: string, type: "groom" | "bride") => {
    navigator.clipboard.writeText(text);
    if (type === "groom") {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  // Ensure music tracks if browser blocks tab changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
      } else if (!document.hidden && audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  return (
    <div className="relative max-w-md mx-auto min-h-screen bg-[#FAF9F6] text-neutral-900 shadow-2xl flex flex-col overflow-x-hidden font-inter">
      {/* Background ambient audio stream */}
      <audio 
        ref={audioRef} 
        src={wedding.music_url || "/thiepmaudovang/audio/bg-music.mp3"} 
        loop 
        preload="auto"
      />

      <AnimatePresence>
        {!isEntered && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0, transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-50 bg-[#FAF9F6] flex flex-col justify-between p-6 select-none max-w-md mx-auto"
          >
            {/* Ticket Header */}
            <div className="flex justify-between items-baseline border-b border-neutral-900/10 pb-4">
              <span className="text-[10px] tracking-widest font-semibold uppercase text-neutral-400 font-mono">MUSEUM OF LOVE</span>
              <span className="text-[10px] tracking-widest font-semibold uppercase text-neutral-800 font-mono">ADMISSION: OPEN</span>
            </div>

            {/* Ticket Body */}
            <div className="my-auto space-y-8 py-8">
              <div className="space-y-2">
                <span className="text-[9px] tracking-[0.2em] font-mono text-neutral-400 block uppercase">EXHIBITION NO. 04</span>
                <h1 className="font-cormorant-garamond text-4xl font-light tracking-tight leading-none uppercase text-neutral-800">
                  {wedding.groom_name} <br />
                  <span className="italic font-normal lowercase text-neutral-500">&amp;</span> {wedding.bride_name}
                </h1>
              </div>

              <div className="border-l-[1.5px] border-neutral-900 pl-4 py-1 space-y-1">
                <span className="text-[9px] tracking-widest font-mono text-neutral-400 block uppercase">DATE / TIMINGS</span>
                <span className="font-cormorant-garamond text-xl font-bold tracking-wider">10 . 10 . 2026</span>
                <span className="text-[9px] font-mono text-neutral-500 block uppercase tracking-widest">
                  {wedding.location_info.groom_family?.time || "11:00 AM"} • SATURDAY
                </span>
              </div>

              <div className="pt-4 border-t border-dashed border-neutral-900/20 space-y-1">
                <span className="text-[9px] tracking-widest font-mono text-neutral-400 block uppercase font-light">SPECIAL ENTRY FOR</span>
                <span className="font-cormorant-garamond text-2xl italic font-semibold text-neutral-800">{to}</span>
              </div>
            </div>

            {/* Entry Ticket Pass Button */}
            <div className="space-y-5">
              <div className="bg-neutral-900 text-[#FAF9F6] p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                {/* Visual ticket notch cuts */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-[#FAF9F6] rounded-r-full border-r border-neutral-900/10"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-[#FAF9F6] rounded-l-full border-l border-neutral-900/10"></div>
                
                <button
                  onClick={handleEnterExhibition}
                  className="w-full py-2 flex flex-col items-center justify-center font-semibold tracking-widest text-[10px] uppercase cursor-pointer"
                >
                  <span className="group-hover:scale-105 transition-transform duration-300">ENTER EXHIBITION // NHẬN THƯ</span>
                  <span className="text-[8px] text-neutral-400 font-mono mt-1 font-light tracking-widest">TAP FOR AUDIO & ART EXPERIENCE</span>
                </button>
              </div>
              
              <div className="text-center">
                <span className="text-[8px] tracking-[0.2em] text-neutral-400 uppercase font-mono">
                  EST. 2026 • LOCKED 60FPS GALLERY
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Controller */}
      {isEntered && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 bg-neutral-950/80 hover:bg-neutral-950 backdrop-blur-md text-[#FAF9F6] p-3 rounded-full border border-white/10 shadow-lg transition-transform active:scale-95 flex items-center justify-center"
          aria-label="Toggle background music"
        >
          {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
        </button>
      )}

      {/* SECTION 1: HEADER & HERO SHADER */}
      <section className="relative w-full border-b border-neutral-900/10 flex flex-col">
        {/* Gallery Subheader bar */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-neutral-900/10 text-[9px] tracking-widest font-mono text-neutral-400 uppercase">
          <span>EXHIBITION: ROOM 04</span>
          <span>CURATOR: LOVE ARCHIVE</span>
        </div>

        {/* Title Block */}
        <div className="px-5 py-8 space-y-3">
          <BrutalistScrollRevealHeader 
            text="THE UNION OF" 
            className="font-inter text-xs tracking-[0.25em] font-semibold text-neutral-400 uppercase"
          />
          <BrutalistScrollRevealHeader 
            text={wedding.groom_name.toUpperCase()} 
            className="font-cormorant-garamond text-4xl font-light tracking-tight text-neutral-900 leading-none"
          />
          <span className="font-cormorant-garamond text-2xl italic font-light text-neutral-400 block px-6">&amp;</span>
          <BrutalistScrollRevealHeader 
            text={wedding.bride_name.toUpperCase()} 
            className="font-cormorant-garamond text-4xl font-light tracking-tight text-neutral-900 leading-none"
          />
        </div>

        {/* Hero WebGL Liquid Displacement Card */}
        <div className="px-5 pb-8">
          <div className="border border-neutral-900/10 p-2 bg-white">
            <FluidDistortionImage 
              src={images[0]} 
              alt="Groom and Bride exhibition hero piece" 
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="flex justify-between items-center mt-2 px-1 text-[8px] font-mono text-neutral-400 uppercase">
              <span>PLATE NO. 01 / LIQUID ENGINE</span>
              <span>TAP & SWIPE IMAGE TO DISTORT</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CURATOR'S NOTE & GENERAL LOGISTICS */}
      <section className="px-5 py-12 bg-white border-b border-neutral-900/10 space-y-8">
        <div className="space-y-2">
          <span className="text-[9px] tracking-widest font-mono text-neutral-400 uppercase block">// CURATORIAL STATEMENT</span>
          <h2 className="font-cormorant-garamond text-2xl italic tracking-wide text-neutral-800 leading-tight">
            “Tình yêu không chỉ là ngắm nhìn nhau, mà là cùng nhìn về một hướng.”
          </h2>
          <p className="font-inter text-xs text-neutral-500 font-light leading-relaxed pt-2">
            Được lấy cảm hứng từ không gian tối giản của những triển lãm nghệ thuật đương đại, chúng tôi trân trọng kính mời quý khách tham quan buổi trưng bày đặc biệt lưu giữ các lát cắt hạnh phúc của Minh Hoàng & Mai Hương.
          </p>
        </div>

        {/* Asymmetrical Groom & Bride Grid details */}
        <div className="border-t border-neutral-900/10 pt-8 space-y-8">
          {/* Groom details */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline border-b border-neutral-900/10 pb-2">
              <span className="font-cormorant-garamond text-xl font-medium tracking-wide">CHÚ RỂ / THE GROOM</span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase">EXHIBITOR A</span>
            </div>
            
            <div className="flex gap-4 items-center">
              {/* Groom portrait photo */}
              <div className="w-1/3 aspect-[3/4] overflow-hidden border border-neutral-900/10 p-1 bg-white flex-shrink-0 shadow-sm">
                <img 
                  src={images[1]} 
                  alt={wedding.groom_name} 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" 
                  loading="lazy"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-cormorant-garamond text-2xl font-bold tracking-wide text-neutral-800 leading-none">{wedding.groom_name}</h3>
                <p className="text-[9px] text-neutral-400 font-semibold uppercase font-mono tracking-wider pt-1.5">Trưởng nam của:</p>
                <p className="text-xs text-neutral-700 font-light leading-snug">{wedding.location_info.groom_family?.father_name || "Nguyễn Văn A"} & {wedding.location_info.groom_family?.mother_name || "Lê Thị B"}</p>
                <p className="text-[10px] text-neutral-500 italic leading-relaxed pt-1">{wedding.location_info.groom_family?.address || "Đại diện gia đình chú rể, Hà Nội"}</p>
              </div>
            </div>
          </div>

          {/* Bride details */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline border-b border-neutral-900/10 pb-2">
              <span className="font-cormorant-garamond text-xl font-medium tracking-wide">CÔ DÂU / THE BRIDE</span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase">EXHIBITOR B</span>
            </div>
            
            <div className="flex gap-4 items-center flex-row-reverse">
              {/* Bride portrait photo */}
              <div className="w-1/3 aspect-[3/4] overflow-hidden border border-neutral-900/10 p-1 bg-white flex-shrink-0 shadow-sm">
                <img 
                  src={images[2]} 
                  alt={wedding.bride_name} 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" 
                  loading="lazy"
                />
              </div>
              <div className="flex-1 space-y-1 text-right">
                <h3 className="font-cormorant-garamond text-2xl font-bold tracking-wide text-neutral-800 leading-none">{wedding.bride_name}</h3>
                <p className="text-[9px] text-neutral-400 font-semibold uppercase font-mono tracking-wider pt-1.5">Ái nữ của:</p>
                <p className="text-xs text-neutral-700 font-light leading-snug">{wedding.location_info.bride_family?.father_name || "Trần Văn C"} & {wedding.location_info.bride_family?.mother_name || "Phạm Thị D"}</p>
                <p className="text-[10px] text-neutral-500 italic leading-relaxed pt-1">{wedding.location_info.bride_family?.address || "Đại diện gia đình cô dâu, TP. Hồ Chí Minh"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SPATIAL POLAROID OVERLAP LOOKBOOK */}
      <section className="px-5 py-12 bg-[#121212] text-[#FAF9F6] border-b border-neutral-900/10 space-y-8 flex flex-col justify-center">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[9px] tracking-widest font-mono text-neutral-500 uppercase block">// EXHIBIT B: LOOKBOOK DESIGNS</span>
          <h2 className="font-cormorant-garamond text-3xl font-light tracking-wide text-neutral-100 uppercase">
            GALLERY LOOKBOOK
          </h2>
        </div>

        {/* Polaroid overlap drag component */}
        <PolaroidOverlapGallery 
          images={images} 
          captions={defaultCaptions}
          onCardDiscarded={(idx) => setLookbookIndex(idx)}
          onCardSelected={(idx) => setSelectedLookbookIndex(idx)}
        />

        {/* Dynamic Typography Box strictly underneath the canvas */}
        <div className="border border-white/10 p-4 bg-[#1a1a1a] min-h-[145px] flex flex-col justify-between will-change-transform" style={{ backfaceVisibility: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={lookbookIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-2"
            >
              <span className="text-[9px] tracking-widest text-[#FAF9F6]/40 uppercase font-mono block">
                EXHIBITION PIECE // MEMOIR 0{Math.min(lookbookIndex + 1, images.length)}
              </span>
              <h3 className="font-cormorant-garamond text-base italic text-[#FAF9F6] font-medium leading-snug">
                {lookbookIndex === 0 && "“Mỗi ngày bên em là một tác phẩm nghệ thuật vô giá mà anh luôn muốn nâng niu.”"}
                {lookbookIndex === 1 && "“Lời cầu hôn dưới ánh hoàng hôn là khoảnh khắc chúng ta thuộc về nhau mãi mãi.”"}
                {lookbookIndex === 2 && "“Hôm nay, trước sự chứng kiến của hai bên gia đình, chúng ta chính thức bắt đầu.”"}
                {lookbookIndex === 3 && "“Cùng nắm tay đi qua những thăng trầm cuộc đời, gìn giữ nụ cười và ngọn lửa tình yêu.”"}
                {lookbookIndex >= 4 && "“Cảm ơn quý người thương đã là một mảnh ký ức đẹp trong triển lãm đặc biệt này.”"}
              </h3>
              <p className="font-inter text-[11px] text-[#FAF9F6]/60 font-light leading-relaxed">
                {lookbookIndex === 0 && "Kỷ niệm những ngày đầu tiên gặp gỡ đầy duyên nợ, nơi hai tâm hồn tìm thấy nhau giữa dòng đời nhộn nhịp."}
                {lookbookIndex === 1 && "Lời hứa hẹn cùng đồng hành suốt những năm tháng thanh xuân mở ra bước ngoặt mới của đôi lứa."}
                {lookbookIndex === 2 && "Lễ cưới được cử hành trân trọng với sự chung vui chân thành từ những người thương yêu nhất."}
                {lookbookIndex === 3 && "Minh chứng cho sự tin tưởng bền chặt và mong ước xây dựng tổ ấm hạnh phúc vững vàng."}
                {lookbookIndex >= 4 && "Quý khách vui lòng kéo xuống để xem chi tiết thời gian, bản đồ dẫn đường và phản hồi thư mời (RSVP)."}
              </p>
            </motion.div>
          </AnimatePresence>

          {lookbookIndex < images.length && (
            <span className="text-[8px] tracking-widest text-[#FAF9F6]/30 uppercase text-right block mt-3 font-mono">
              [ SWIPE PICTURE TO REVEAL NEXT PIECE ]
            </span>
          )}
        </div>
      </section>

      {/* SECTION 4: EXHIBITION TIMETABLE / TIMELINE */}
      <section className="px-5 py-12 bg-[#FAF9F6] border-b border-neutral-900/10 space-y-8">
        <div className="space-y-2">
          <span className="text-[9px] tracking-widest font-mono text-neutral-400 uppercase block">// EVENT SCHEDULE</span>
          <h2 className="font-cormorant-garamond text-3xl font-light tracking-wide uppercase text-neutral-900">
            TIMETABLE
          </h2>
        </div>

        {/* Contemporary minimalist timeline table */}
        <div className="border-t border-neutral-900/10 divide-y divide-neutral-900/10 font-inter">
          <div className="py-4 flex justify-between items-start gap-4">
            <span className="text-xs font-mono text-neutral-400 pt-0.5">11:00</span>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs tracking-wider uppercase font-semibold text-neutral-800">WELCOME GUESTS / ĐÓN KHÁCH</h4>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Đón tiếp quý khách mời tại sảnh chính của triển lãm, chụp hình kỷ niệm cùng cô dâu và chú rể.
              </p>
            </div>
          </div>

          <div className="py-4 flex justify-between items-start gap-4">
            <span className="text-xs font-mono text-neutral-400 pt-0.5">11:30</span>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs tracking-wider uppercase font-semibold text-neutral-800">THE CEREMONY / THÀNH HÔN</h4>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Nghi thức trao nhẫn thiêng liêng, lời thề nguyện gắn kết trọn đời trước gia quyến và bạn bè thân hữu.
              </p>
            </div>
          </div>

          <div className="py-4 flex justify-between items-start gap-4">
            <span className="text-xs font-mono text-neutral-400 pt-0.5">12:00</span>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs tracking-wider uppercase font-semibold text-neutral-800">BANQUET / KHAI TIỆC</h4>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Thưởng thức tiệc trưa thân mật cùng chương trình ca nhạc chúc mừng hạnh phúc của đôi trẻ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: EXHIBITION VENUE & MAPS */}
      <section className="px-5 py-12 bg-white border-b border-neutral-900/10 space-y-8">
        <div className="space-y-2">
          <span className="text-[9px] tracking-widest font-mono text-neutral-400 uppercase block">// EXHIBIT LOCATION</span>
          <h2 className="font-cormorant-garamond text-3xl font-light tracking-wide uppercase text-neutral-900">
            THE VENUE
          </h2>
        </div>

        {/* Asymmetric Map Detail Cards with Cute Chibi Maps */}
        <div className="space-y-6">
          <div className="border border-neutral-900/10 p-4 space-y-3 bg-[#FAF9F6] shadow-sm">
            <div className="flex justify-between items-center border-b border-neutral-900/5 pb-2">
              <span className="text-[10px] font-mono text-neutral-800 font-bold uppercase tracking-wider">NHÀ TRAI // GROOM PARTY</span>
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            </div>
            
            {/* Cute Hanoi Chibi Map illustration */}
            <div className="border border-neutral-900/10 p-1 bg-white aspect-[4/3] w-full overflow-hidden shadow-inner">
              <img 
                src="/thiepmaudovang/images/map-groom-chibi.png" 
                alt="Bản đồ dẫn đường chibi nhà trai - Hà Nội" 
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-semibold text-neutral-900 font-mono">11:00 AM • 10.10.2026</p>
              <p className="text-neutral-500 font-light leading-relaxed">
                {wedding.location_info.groom_family?.address || "Trung tâm Hội nghị Tiệc cưới Khách sạn Melia, Lý Thường Kiệt, Hoàn Kiếm, Hà Nội"}
              </p>
            </div>
            {wedding.location_info.groom_family?.map_url && (
              <a 
                href={wedding.location_info.groom_family.map_url}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full justify-center items-center gap-1.5 text-[9px] font-bold tracking-widest font-mono uppercase bg-neutral-900 text-[#FAF9F6] px-3 py-2.5 hover:bg-neutral-800 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" /> MAP DIRECTIONS // CHỈ ĐƯỜNG
              </a>
            )}
          </div>

          <div className="border border-neutral-900/10 p-4 space-y-3 bg-[#FAF9F6] shadow-sm">
            <div className="flex justify-between items-center border-b border-neutral-900/5 pb-2">
              <span className="text-[10px] font-mono text-neutral-800 font-bold uppercase tracking-wider">NHÀ GÁI // BRIDE PARTY</span>
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            </div>
            
            {/* Cute Saigon Chibi Map illustration */}
            <div className="border border-neutral-900/10 p-1 bg-white aspect-[4/3] w-full overflow-hidden shadow-inner">
              <img 
                src="/thiepmaudovang/images/map-bride-chibi.png" 
                alt="Bản đồ dẫn đường chibi nhà gái - Sài Gòn" 
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-semibold text-neutral-900 font-mono">11:00 AM • 10.10.2026</p>
              <p className="text-neutral-500 font-light leading-relaxed">
                {wedding.location_info.bride_family?.address || "Trung tâm Tiệc cưới White Palace, Hoàng Văn Thụ, Phú Nhuận, TP. Hồ Chí Minh"}
              </p>
            </div>
            {wedding.location_info.bride_family?.map_url && (
              <a 
                href={wedding.location_info.bride_family.map_url}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full justify-center items-center gap-1.5 text-[9px] font-bold tracking-widest font-mono uppercase bg-neutral-900 text-[#FAF9F6] px-3 py-2.5 hover:bg-neutral-800 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" /> MAP DIRECTIONS // CHỈ ĐƯỜNG
              </a>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 6: SUPPORT THE ART (GIFT REGISTRY) */}
      <section className="px-5 py-12 bg-[#FAF9F6] border-b border-neutral-900/10 space-y-8">
        <div className="space-y-2">
          <span className="text-[9px] tracking-widest font-mono text-neutral-400 uppercase block">// EXHIBIT FUNDING</span>
          <h2 className="font-cormorant-garamond text-3xl font-light tracking-wide uppercase text-neutral-900">
            REGISTRY &amp; GIFTS
          </h2>
          <p className="text-xs text-neutral-500 font-light leading-relaxed">
            Sự hiện diện của quý khách là món quà lớn nhất dành cho hai vợ chồng. Nếu muốn gửi tặng lời chúc kèm đóng góp, quý khách có thể gửi tới tài khoản mừng cưới bên dưới.
          </p>
        </div>

        {/* Elegant button to toggle registry popup */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsGiftOpen(true)}
            className="w-full py-4 border border-neutral-900 bg-neutral-900 text-[#FAF9F6] text-[10px] font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
          >
            <Gift className="w-4 h-4" /> SEND WISHES & CONTRIBUTIONS // GỬI QUÀ MỪNG CƯỚI
          </button>
        </div>
      </section>

      {/* SECTION 7: RSVP & VISITOR LOG (GUEST REGISTRY BOOK) */}
      <section className="px-5 py-12 bg-white border-b border-neutral-900/10 space-y-8">
        <div className="space-y-2">
          <span className="text-[9px] tracking-widest font-mono text-neutral-400 uppercase block">// VISITOR BOOK REGISTRATION</span>
          <h2 className="font-cormorant-garamond text-3xl font-light tracking-wide uppercase text-neutral-900">
            RSVP &amp; WISHES
          </h2>
          <p className="text-xs text-neutral-500 font-light leading-relaxed">
            Vui lòng xác nhận sự tham gia của bạn trước ngày 25.09.2026 để ban tổ chức chuẩn bị chu đáo nhất.
          </p>
        </div>

        {/* Form RSVP */}
        <form onSubmit={handleSubmitRsvp} className="space-y-4 text-xs font-mono">
          <div className="space-y-1.5">
            <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono block">HỌ VÀ TÊN // FULL NAME *</label>
            <input 
              type="text" 
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Nhập họ tên của bạn..." 
              required
              className="w-full p-3 border border-neutral-200 focus:border-neutral-900 bg-transparent outline-none text-neutral-800 transition-colors font-sans text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono block">BẠN SẼ THAM DỰ? // WILL YOU ATTEND? *</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRsvpAttending(true)}
                className={`py-3 border uppercase tracking-wider font-semibold transition-all duration-300 text-[10px] flex items-center justify-center ${
                  rsvpAttending === true 
                  ? "bg-neutral-900 border-neutral-900 text-[#FAF9F6]" 
                  : "bg-transparent border-neutral-200 text-neutral-700 hover:border-neutral-400"
                }`}
              >
                YES // CÓ THAM DỰ
              </button>
              <button
                type="button"
                onClick={() => setRsvpAttending(false)}
                className={`py-3 border uppercase tracking-wider font-semibold transition-all duration-300 text-[10px] flex items-center justify-center ${
                  rsvpAttending === false 
                  ? "bg-neutral-900 border-neutral-900 text-[#FAF9F6]" 
                  : "bg-transparent border-neutral-200 text-neutral-700 hover:border-neutral-400"
                }`}
              >
                NO // KHÔNG THỂ
              </button>
            </div>
          </div>

          {rsvpAttending === true && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-1.5 overflow-hidden"
            >
              <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono block">SỐ NGƯỜI THAM DỰ // GUESTS NUMBER</label>
              <select
                value={rsvpGuests}
                onChange={(e) => setRsvpGuests(e.target.value)}
                className="w-full p-3 border border-neutral-200 focus:border-neutral-900 bg-transparent outline-none text-neutral-800 transition-colors font-sans text-xs"
              >
                <option value="1">1 người</option>
                <option value="2">2 người</option>
                <option value="3">3 người</option>
                <option value="4">4 người</option>
              </select>
            </motion.div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono block">LỜI CHÚC // WISHES &amp; MESSAGES *</label>
            <textarea 
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              placeholder="Gửi lời chúc ấm áp nhất đến cô dâu & chú rể..." 
              required
              rows={4}
              className="w-full p-3 border border-neutral-200 focus:border-neutral-900 bg-transparent outline-none text-neutral-800 transition-colors font-sans text-xs resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`w-full py-3 flex items-center justify-center gap-2 uppercase tracking-widest font-semibold text-[10px] transition-all ${
              isSubmitted 
              ? "bg-green-700 text-white" 
              : "bg-neutral-900 hover:bg-neutral-800 text-[#FAF9F6] active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <span>REGISTERING...</span>
            ) : isSubmitted ? (
              <>
                <Check className="w-3.5 h-3.5" /> SENT SUCCESS // ĐÃ GỬI
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> SUBMIT REGISTRY // GỬI LỜI CHÚC
              </>
            )}
          </button>
        </form>

        {/* Wishes List (Logbook Feed) */}
        <div className="pt-6 space-y-4 border-t border-neutral-900/10">
          <div className="flex items-center gap-2 text-neutral-400 font-mono text-[9px] tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5" /> 
            <span>VISITOR LOG ({localWishes.length})</span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 divide-y divide-neutral-900/5">
            {localWishes.length === 0 ? (
              <p className="text-center py-6 text-neutral-400 font-light italic text-xs">
                Chưa có lời chúc nào trong sổ lưu niệm triển lãm.
              </p>
            ) : (
              localWishes.map((wish, index) => (
                <div 
                  key={wish.id || index}
                  className={`pt-3 ${index === 0 ? "border-t-0" : ""} space-y-1.5`}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="font-cormorant-garamond text-base font-bold text-neutral-800">
                      {wish.guest_name}
                    </span>
                    <span className="text-[8px] font-mono text-neutral-400">
                      {wish.created_at ? new Date(wish.created_at).toLocaleDateString("vi-VN") : "10/10/2026"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed font-sans">
                    {wish.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8: MINIMAL OUTRO */}
      <footer className="py-12 bg-[#FAF9F6] text-center border-t border-neutral-900/10 space-y-3 font-mono select-none">
        <Heart className="w-5 h-5 text-red-500 mx-auto animate-bounce" />
        <p className="text-[10px] tracking-widest text-neutral-400 uppercase">
          THANK YOU FOR WATCHING
        </p>
        <p className="font-cormorant-garamond text-lg italic text-neutral-700">
          Minh Hoàng &amp; Mai Hương
        </p>
        <p className="text-[7px] text-neutral-300 uppercase tracking-widest pt-2">
          Designed by Antigravity © 2026
        </p>
      </footer>

      {/* Lookbook Lightbox Magnification Modal Overlay */}
      <AnimatePresence>
        {selectedLookbookIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col justify-between p-6 select-none max-w-md mx-auto"
          >
            {/* Close action */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLookbookIndex(null)}
                className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close lookbook zoom"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Magnified Image */}
            <motion.div 
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="my-auto border border-white/10 p-2 bg-neutral-900 shadow-2xl flex flex-col items-center justify-center"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-neutral-900 border border-white/5">
                <img
                  src={images[selectedLookbookIndex]}
                  alt={defaultCaptions[selectedLookbookIndex]}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="font-cormorant-garamond text-lg italic text-[#FAF9F6]/90">
                  {defaultCaptions[selectedLookbookIndex]}
                </p>
                <p className="text-[9px] font-mono text-[#FAF9F6]/40 uppercase tracking-widest mt-1">
                  ROOM 04 LOOKBOOK // FRAME 0{selectedLookbookIndex + 1}
                </p>
              </div>
            </motion.div>

            <div className="text-center pb-4 text-[#FAF9F6]/30 text-[9px] font-mono tracking-widest uppercase">
              [ TAP X BUTTON TO RETURN TO GALLERY ]
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registry Gift Funding Popup Bottom Sheet */}
      <AnimatePresence>
        {isGiftOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGiftOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end justify-center max-w-md mx-auto"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()} // Prevent bubble trigger
              className="w-full bg-[#FAF9F6] border-t border-neutral-900/10 p-6 space-y-6 max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-baseline border-b border-neutral-900/10 pb-4">
                <span className="font-cormorant-garamond text-xl font-bold tracking-wide">MỪNG CƯỚI // CONTRIBUTIONS</span>
                <button
                  onClick={() => setIsGiftOpen(false)}
                  className="text-neutral-500 hover:text-neutral-800 p-1 hover:bg-neutral-900/5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                Sự hiện diện của quý khách là món quà lớn nhất dành cho hai vợ chồng. Nếu muốn gửi tặng lời chúc kèm đóng góp, quý khách có thể gửi tới tài khoản bên dưới.
              </p>

              {/* Details inputs */}
              <div className="space-y-4 font-mono text-xs">
                {/* Groom registry */}
                <div className="border border-neutral-900/10 p-4 bg-white flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">GROOM FUNDING // CHÚ RỂ</span>
                      <p className="font-bold text-neutral-800 font-inter text-sm">ĐỖ MINH HOÀNG</p>
                      <p className="text-[11px] text-neutral-600 font-semibold font-mono">Techcombank: 19035246723015</p>
                      <p className="text-[10px] text-neutral-400 font-light">Chi nhánh Hà Nội</p>
                    </div>
                    <div className="w-14 h-14 bg-neutral-100 border border-neutral-200/70 p-1 flex items-center justify-center flex-shrink-0">
                      <span className="text-[7px] text-neutral-400 text-center font-mono">Groom QR</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard("19035246723015", "groom")}
                    className="w-full py-1.5 border border-neutral-900 text-neutral-900 text-[9px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-900 hover:text-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    {copiedGroom ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> COPIED NUMBER
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> COPY ACCOUNT NUMBER
                      </>
                    )}
                  </button>
                </div>

                {/* Bride registry */}
                <div className="border border-neutral-900/10 p-4 bg-white flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">BRIDE FUNDING // CÔ DÂU</span>
                      <p className="font-bold text-neutral-800 font-inter text-sm">LÊ MAI HƯƠNG</p>
                      <p className="text-[11px] text-neutral-600 font-semibold font-mono">Vietcombank: 0071001294863</p>
                      <p className="text-[10px] text-neutral-400 font-light">Chi nhánh TP. HCM</p>
                    </div>
                    <div className="w-14 h-14 bg-neutral-100 border border-neutral-200/70 p-1 flex items-center justify-center flex-shrink-0">
                      <span className="text-[7px] text-neutral-400 text-center font-mono">Bride QR</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard("0071001294863", "bride")}
                    className="w-full py-1.5 border border-neutral-900 text-neutral-900 text-[9px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-900 hover:text-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    {copiedBride ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> COPIED NUMBER
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> COPY ACCOUNT NUMBER
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="text-center pt-2">
                <p className="text-[9px] text-neutral-400 tracking-wider uppercase font-mono">
                  CẢM ƠN TẤM LÒNG & SỰ ĐỒNG HÀNH CỦA QUÝ KHÁCH
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
