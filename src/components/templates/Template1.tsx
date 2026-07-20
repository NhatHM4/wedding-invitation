"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wedding, Wish } from "@/types";
import T1NebulaBackground from "@/components/template1/T1NebulaBackground";
import T1Envelope from "@/components/template1/T1Envelope";
import T1StoryDeck from "@/components/template1/T1StoryDeck";
import T1ScrollMap from "@/components/template1/T1ScrollMap";
import T1RSVPSection from "@/components/template1/T1RSVPSection";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Template1Props {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

export default function Template1({ wedding, to, wishes }: Template1Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Initialize background music source
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

  // Connect Web Audio API context upon user interaction (avoid browser restrictions)
  const initAudioContext = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const analyser = ctx.createAnalyser();

        const source = ctx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        setAnalyserNode(analyser);
      } catch (err) {
        console.error("Web Audio API not fully supported/blocked:", err);
      }
    } else if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  };

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    initAudioContext();

    // Play music immediately on open
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay was blocked:", err));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    initAudioContext();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Play failed:", err));
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-br from-[#fff7f9] via-[#fffbfd] to-[#fff3f6] text-[#5c3c43] overflow-x-hidden font-sans relative antialiased selection:bg-rose-500/30">

      {/* Import Premium Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Embedded Global Styles scoped to this template */}
      <style jsx global>{`
        .font-serif-lux {
          font-family: 'Playfair Display', serif;
        }
        .font-artistic {
          font-family: 'Alex Brush', cursive;
        }
        /* Custom scrollbar */
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(244, 63, 94, 0.05);
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(244, 63, 94, 0.2);
          border-radius: 10px;
        }
      `}</style>

      {/* ── AUDIO REACTIVE NEBULA CANVAS ── */}
      <T1NebulaBackground analyser={analyserNode} isPlaying={isPlaying} isOpened={isOpened} />

      {/* ── 3D ENVELOPE OPENING OVERLAY ── */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="envelope-layer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-auto"
          >
            <T1Envelope onOpen={handleOpenEnvelope} to={to} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN INVITATION MOBILE CONTAINER ── */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col w-full max-w-[420px] min-h-screen bg-[#fffbfc]/90 border-x border-rose-200/40 shadow-[0_10px_60px_rgba(244,63,94,0.1)] pb-24 overflow-x-hidden text-[#5c3c43]"
        >
          {/* AESTHETIC DECORATIVE GRID */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(244,63,94,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-[0.25] z-0" />

          {/* 1. HERO COVER SECTION (IMAGE 1 STYLE) */}
          <section className="relative w-full flex flex-col items-center text-center p-6 border-b border-rose-200/30">
            {/* Corner Luxury Frame Decors */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-rose-300/30" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-rose-300/30" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-rose-300/30" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-rose-300/30" />

            {/* Circular Double Happiness Seal & Tassel */}
            <div className="flex flex-col items-center justify-center mt-6 mb-4">
              <div className="w-14 h-14 rounded-full border border-dashed border-rose-400 p-0.5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-rose-300 flex items-center justify-center text-rose-500 text-2xl font-bold">
                  囍
                </div>
              </div>
              <div className="w-[1.5px] h-6 bg-rose-400/70 relative">
                <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 border border-rose-400/70 bg-[#fffbfc]" />
              </div>
            </div>

            {/* Family Details (House of Groom vs House of Bride) */}
            <div className="grid grid-cols-2 gap-4 w-full px-2 mb-6">
              {/* House of Groom */}
              <div className="flex flex-col text-center">
                <span className="text-xs font-bold text-[#8b1a1a] uppercase tracking-wider mb-1 font-sans">Nhà Trai</span>
                <span className="text-xs font-semibold text-slate-800">{wedding.location_info.groom_family?.father_name}</span>
                <span className="text-xs font-semibold text-slate-800">{wedding.location_info.groom_family?.mother_name}</span>
                <span className="text-[10px] text-slate-500 mt-1 leading-normal font-sans">
                  {wedding.location_info.groom_family?.address}
                </span>
              </div>

              {/* House of Bride */}
              <div className="flex flex-col text-center">
                <span className="text-xs font-bold text-[#8b1a1a] uppercase tracking-wider mb-1 font-sans">Nhà Gái</span>
                <span className="text-xs font-semibold text-slate-800">{wedding.location_info.bride_family?.father_name}</span>
                <span className="text-xs font-semibold text-slate-800">{wedding.location_info.bride_family?.mother_name}</span>
                <span className="text-[10px] text-slate-500 mt-1 leading-normal font-sans">
                  {wedding.location_info.bride_family?.address}
                </span>
              </div>
            </div>

            {/* Quote announcement */}
            <span className="text-xs text-slate-500 font-sans italic my-2">
              Trân trọng báo tin Lễ Thành Hôn của
            </span>

            {/* Couple names heading */}
            <div className="flex flex-col items-center gap-0.5 my-4 z-10">
              <h1 className="font-artistic text-5xl font-bold tracking-wide text-[#8b1a1a] drop-shadow-sm">
                {wedding.groom_name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-rose-300">♥</span>
                <span className="font-serif-lux text-lg text-slate-600 font-semibold">&</span>
                <span className="text-rose-300">♥</span>
              </div>
              <h1 className="font-artistic text-5xl font-bold tracking-wide text-[#8b1a1a] drop-shadow-sm">
                {wedding.bride_name}
              </h1>
            </div>

            {/* Couple Cover Photo (Image 1 Red frame style) */}
            <div className="relative w-full max-w-[285px] aspect-[9/16] mx-auto rounded-xl overflow-hidden border-[6px] border-[#8b1a1a] shadow-lg my-6">
              <Image
                src="/thiepmaudovang/images/cover.jpg"
                alt="Minh Hoàng & Mai Hương"
                fill
                sizes="285px"
                className="object-cover"
              />
            </div>
          </section>

          {/* SECTION BREAK */}
          <div className="w-full flex justify-center py-2 text-rose-300/30 select-none">
            ✦ ✦ ✦
          </div>

          {/* 1B. INVITATION & DATE SECTION (IMAGE 2 STYLE) */}
          <section className="relative w-full flex flex-col items-center text-center p-6 border-b border-rose-200/30 bg-white/30">
            {/* Greeting Divider */}
            <div className="flex items-center gap-3 w-full justify-center mb-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-rose-300/50" />
              <span className="text-rose-400 text-lg">✿</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-rose-300/50" />
            </div>

            {/* Trân Trọng Kính Mời */}
            <span className="font-artistic text-3xl font-bold text-[#8b1a1a] my-1">
              Trân Trọng Kính Mời
            </span>
            <h3 className="text-2xl font-bold font-serif-lux text-[#8b1a1a] bg-rose-50/50 border border-rose-100 px-6 py-2 rounded-xl shadow-sm mb-6 max-w-[280px]">
              {to}
            </h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-sans mb-3">Tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi</p>

            {/* Three Portrait Photo Grid (Image 2 style) */}
            <div className="grid grid-cols-3 gap-2 w-full mb-8">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-rose-100 shadow-sm animate-fade-in-up">
                <Image src="/thiepmaudovang/images/gallery-1.jpg" alt="Wedding detail 1" fill sizes="120px" className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-rose-100 shadow-sm translate-y-[-10px] animate-fade-in-up delay-100">
                <Image src="/thiepmaudovang/images/gallery-2.jpg" alt="Wedding detail 2" fill sizes="120px" className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-rose-100 shadow-sm animate-fade-in-up delay-200">
                <Image src="/thiepmaudovang/images/gallery-3.jpg" alt="Wedding detail 3" fill sizes="120px" className="object-cover" />
              </div>
            </div>

            {/* LỄ THÀNH HÔN details layout */}
            <div className="flex flex-col items-center">
              <h2 className="text-[#8b1a1a] text-2xl font-bold tracking-widest font-sans uppercase">
                Lễ Thành Hôn
              </h2>
              <span className="text-xs text-slate-500 my-1 font-sans">Vào lúc</span>

              {/* Centered Date Layout Box matching Image 2 */}
              <div className="flex items-center gap-6 my-4 border-y border-rose-200/50 py-3 px-6">
                {/* Time left */}
                <div className="text-slate-600 flex flex-col justify-center items-center">
                  <span className="text-xl font-bold font-sans">11:00</span>
                  <span className="text-[10px] text-slate-400 font-sans uppercase">Giờ trưa</span>
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] h-12 bg-rose-200/50" />

                {/* Day Details */}
                <div className="flex flex-col text-left font-sans">
                  <span className="text-xs text-slate-600 font-semibold">Thứ Bảy</span>
                  <span className="text-4xl font-extrabold text-[#8b1a1a] leading-none my-0.5">10</span>
                  <span className="text-xs text-slate-500 font-semibold">Tháng 10, 2026</span>
                </div>
              </div>

              {/* Lunar Date */}
              <p className="text-xs text-[#8b1a1a]/80 font-sans italic font-medium">
                (Tức Ngày 25 Tháng 10 Năm Ất Tỵ)
              </p>

              {/* Location Address */}
              <div className="flex items-center gap-1.5 mt-6 px-4">
                <span className="text-rose-500 animate-pulse text-sm">❤️</span>
                <p className="text-sm font-semibold text-slate-700 font-sans max-w-[260px] leading-relaxed">
                  {wedding.location_info.groom_family?.address}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION BREAK */}
          <div className="w-full flex justify-center py-2 text-rose-300/30 select-none">
            ✦ ✦ ✦
          </div>

          {/* Groom & Bride Info Section */}
          <section className="w-full py-10 px-6 text-center">
            <div className="flex flex-col items-center bg-white/80 border border-rose-100/50 rounded-3xl p-6 shadow-[0_15px_50px_rgba(244,63,94,0.06)]">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest font-sans">Giới thiệu</span>
              <h2 className="text-2xl font-bold text-[#5c3c43] font-serif-lux mt-1 mb-8">Cô Dâu & Chú Rể</h2>
              
              <div className="flex flex-col gap-8 w-full">
                {/* Chú rể */}
                <div className="flex flex-col items-center bg-rose-50/20 border border-rose-100/40 rounded-2xl p-6 shadow-sm">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-rose-300 mb-4 shadow-md">
                    <Image
                      src="/thiepmaudovang/images/gallery-2.jpg"
                      alt="Chú rể"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-artistic text-3xl font-bold text-[#8b1a1a] mb-1">Chú Rể</h3>
                  <h4 className="font-serif-lux text-lg font-bold text-[#5c3c43] mb-3">{wedding.groom_name}</h4>
                  {wedding.location_info?.groom_family && (
                    <div className="text-xs text-slate-600 font-sans space-y-1 mb-3">
                      {wedding.location_info.groom_family.father_name && <p><span className="text-slate-400">Con ông:</span> {wedding.location_info.groom_family.father_name}</p>}
                      {wedding.location_info.groom_family.mother_name && <p><span className="text-slate-400">Con bà:</span> {wedding.location_info.groom_family.mother_name}</p>}
                    </div>
                  )}
                  <p className="text-xs text-[#5c3c43]/80 italic leading-relaxed border-t border-rose-100/60 pt-3 max-w-[260px]">
                    &ldquo;Là một chàng trai điềm đạm, ấm áp và luôn tràn đầy hoài bão. Đối với anh, tình yêu không chỉ là những lời ngọt ngào mà còn là sự thấu hiểu, cùng nhau vượt qua mọi hành trình cuộc sống.&rdquo;
                  </p>
                </div>

                {/* Cô dâu */}
                <div className="flex flex-col items-center bg-rose-50/20 border border-rose-100/40 rounded-2xl p-6 shadow-sm">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-rose-300 mb-4 shadow-md">
                    <Image
                      src="/thiepmaudovang/images/gallery-1.jpg"
                      alt="Cô dâu"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-artistic text-3xl font-bold text-[#8b1a1a] mb-1">Cô Dâu</h3>
                  <h4 className="font-serif-lux text-lg font-bold text-[#5c3c43] mb-3">{wedding.bride_name}</h4>
                  {wedding.location_info?.bride_family && (
                    <div className="text-xs text-slate-600 font-sans space-y-1 mb-3">
                      {wedding.location_info.bride_family.father_name && <p><span className="text-slate-400">Con ông:</span> {wedding.location_info.bride_family.father_name}</p>}
                      {wedding.location_info.bride_family.mother_name && <p><span className="text-slate-400">Con bà:</span> {wedding.location_info.bride_family.mother_name}</p>}
                    </div>
                  )}
                  <p className="text-xs text-[#5c3c43]/80 italic leading-relaxed border-t border-rose-100/60 pt-3 max-w-[260px]">
                    &ldquo;Một cô gái dịu dàng, tinh tế và luôn mang đến nguồn năng lượng tích cực cho mọi người xung quanh. Cô tin rằng hạnh phúc chân chính là khi hai trái tim luôn đập cùng một nhịp.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION BREAK */}
          <div className="w-full flex justify-center py-2 text-rose-300/30 select-none">
            ✦ ✦ ✦
          </div>

          {/* 2. TINDER STORY CARDS SECTION */}
          <section className="w-full">
            <T1StoryDeck />
          </section>

          {/* SECTION BREAK */}
          <div className="w-full flex justify-center py-2 text-rose-300/30 select-none">
            ✦ ✦ ✦
          </div>

          {/* 3. INTERACTIVE SCROLL MAP SECTION */}
          <section className="w-full">
            <T1ScrollMap />
          </section>

          {/* SECTION BREAK */}
          <div className="w-full flex justify-center py-2 text-rose-300/30 select-none">
            ✦ ✦ ✦
          </div>

          {/* 4. RSVP AND GUESTBOOK SECTION */}
          <section className="w-full">
            <T1RSVPSection weddingId={wedding.id} initialWishes={wishes} />
          </section>

          {/* SECTION BREAK */}
          <div className="w-full flex justify-center py-2 text-rose-300/30 select-none">
            ✦ ✦ ✦
          </div>

          {/* 4B. GIFT / WEDDING SHISTRY SECTION */}
          <section className="w-full py-8 px-6 text-center">
            <div className="flex flex-col items-center bg-white/80 border border-rose-100/50 rounded-3xl p-6 shadow-[0_10px_45px_rgba(244,63,94,0.05)]">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Mừng Cưới</span>
              <h3 className="text-xl font-bold text-[#5c3c43] font-serif-lux mt-1 mb-3">Hộp Mừng Cưới</h3>
              <p className="text-xs text-[#6e4e55] leading-relaxed max-w-[280px] mb-6">
                Sự hiện diện của quý khách là niềm hạnh phúc lớn nhất của chúng tôi. Nếu muốn gửi quà chúc mừng, bạn có thể gửi qua tài khoản bên dưới.
              </p>
              <button
                onClick={() => setIsGiftModalOpen(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full text-xs font-bold uppercase tracking-wider transition shadow-md shadow-rose-300/30 flex items-center gap-2"
              >
                <span>🎁</span> Gửi Quà Mừng Cưới
              </button>
            </div>
          </section>

          {/* 5. GREETING FOOTER */}
          <footer className="w-full text-center py-10 flex flex-col items-center gap-2">
            <span className="text-[10px] text-rose-400/50 uppercase tracking-widest font-sans">Thank you for being part of our special day!</span>
            <span className="font-artistic text-3xl font-bold text-[#8b1a1a] drop-shadow-sm mt-1">
              Thiệp cưới Hạnh phúc
            </span>
          </footer>

          {/* FLOATING MUSIC TOGGLE BUTTON */}
          <button
            onClick={toggleMusic}
            className={`fixed bottom-6 right-6 z-40 p-4 rounded-full border shadow-2xl transition-all duration-300 outline-none ${isPlaying
                ? "bg-rose-500 border-rose-400 text-white animate-[spin_8s_linear_infinite]"
                : "bg-white/80 border-rose-300 text-rose-500 hover:bg-white"
              }`}
            style={{ boxShadow: "0 0 20px rgba(244,63,94,0.2)" }}
            aria-label="Toggle Background Music"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          {/* GIFT MODAL POPUP */}
          <AnimatePresence>
            {isGiftModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsGiftModalOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative bg-white border border-rose-100 rounded-3xl p-6 shadow-2xl w-full max-w-[340px] z-10 text-center flex flex-col items-center"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setIsGiftModalOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg outline-none"
                  >
                    ✕
                  </button>

                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Cảm Ơn</span>
                  <h4 className="text-lg font-bold text-[#5c3c43] font-serif-lux mb-4">Thông Tin Mừng Cưới</h4>

                  {/* Tabs */}
                  <div className="flex gap-2 w-full mb-4">
                    <button
                      onClick={() => setActiveTab("groom")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                        activeTab === "groom"
                          ? "bg-rose-500 text-white shadow-sm"
                          : "bg-rose-50/50 text-[#6e4e55] hover:bg-rose-50"
                      }`}
                    >
                      Nhà Trai (Chú rể)
                    </button>
                    <button
                      onClick={() => setActiveTab("bride")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                        activeTab === "bride"
                          ? "bg-rose-500 text-white shadow-sm"
                          : "bg-rose-50/50 text-[#6e4e55] hover:bg-rose-50"
                      }`}
                    >
                      Nhà Gái (Cô dâu)
                    </button>
                  </div>

                  {activeTab === "groom" ? (
                    <div className="w-full flex flex-col items-center">
                      {/* QR Code */}
                      <div className="relative w-44 h-44 bg-stone-50 border border-rose-100 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-inner mb-4">
                        <Image
                          src="/thiepmaudovang/images/qr-groom.png"
                          alt="Mã QR Chú rể"
                          width={160}
                          height={160}
                          className="object-contain"
                        />
                      </div>
                      <div className="w-full text-left bg-rose-50/40 border border-rose-100/50 rounded-2xl p-4 text-xs text-[#5c3c43] flex flex-col gap-2 font-sans">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Ngân hàng</span>
                          <p className="font-semibold text-slate-800">MB Bank (Ngân hàng Quân đội)</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Số tài khoản</span>
                          <p className="font-semibold text-slate-800 font-mono text-sm">123456789999</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Chủ tài khoản</span>
                          <p className="font-semibold text-slate-800 uppercase">Nguyễn Minh Hoàng</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center">
                      {/* QR Code */}
                      <div className="relative w-44 h-44 bg-stone-50 border border-rose-100 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-inner mb-4">
                        <Image
                          src="/thiepmaudovang/images/qr-bride.png"
                          alt="Mã QR Cô dâu"
                          width={160}
                          height={160}
                          className="object-contain"
                        />
                      </div>
                      <div className="w-full text-left bg-rose-50/40 border border-rose-100/50 rounded-2xl p-4 text-xs text-[#5c3c43] flex flex-col gap-2 font-sans">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Ngân hàng</span>
                          <p className="font-semibold text-slate-800">Vietcombank</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Số tài khoản</span>
                          <p className="font-semibold text-slate-800 font-mono text-sm">987654321111</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Chủ tài khoản</span>
                          <p className="font-semibold text-slate-800 uppercase">Trần Mai Hương</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-rose-400/80 font-medium italic mt-4">
                    Trân trọng cảm ơn tấm lòng của bạn!
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
