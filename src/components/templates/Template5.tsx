"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
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
  ChevronDown,
  Send,
  Gift,
  ExternalLink,
  User,
} from "lucide-react";
import KineticStretchingText from "@/components/template5/KineticStretchingText";
import BiDirectionalMarquee from "@/components/template5/BiDirectionalMarquee";
import TextSilhouetteMask from "@/components/template5/TextSilhouetteMask";
import FloatingHearts from "@/components/common/FloatingHearts";

// ── Types ──────────────────────────────────────────────────────────────────
interface Template5Props {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
}

// ── Gallery images ──────────────────────────────────────────────────────────
const GALLERY = [
  "/thiepmaudovang/images/cover.jpg",
  "/thiepmaudovang/images/couple-small-1.jpg",
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/couple-small-2.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/couple-small-3.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
  "/thiepmaudovang/images/gallery-4.jpg",
];

// ── Animated Section Wrapper ────────────────────────────────────────────────
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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Rose ornament line ──────────────────────────────────────────────────────
function GoldLine({ width = "60px" }: { width?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: "center",
        margin: "1rem 0",
      }}
    >
      <div style={{ height: "1px", width, background: "#FB7185", opacity: 0.5 }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 0L7.5 4.5H12L8.25 7.3L9.75 12L6 9.2L2.25 12L3.75 7.3L0 4.5H4.5L6 0Z"
          fill="#F43F5E"
          fillOpacity="0.8"
        />
      </svg>
      <div style={{ height: "1px", width, background: "#FB7185", opacity: 0.5 }} />
    </div>
  );
}

// ── Countdown unit ──────────────────────────────────────────────────────────
function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: "center", minWidth: "60px" }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontFamily: "var(--font-cormorant-garamond)",
            fontWeight: 700,
            fontSize: "clamp(2rem, 9vw, 3.5rem)",
            color: "#881337",
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, "0")}
        </motion.div>
      </AnimatePresence>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#E11D48",
          marginTop: "0.4rem",
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ── Separator dot ───────────────────────────────────────────────────────────
function CountSep() {
  return (
    <div
      style={{
        fontFamily: "var(--font-cormorant-garamond)",
        fontWeight: 700,
        fontSize: "clamp(2rem, 9vw, 3.5rem)",
        color: "#FB7185",
        lineHeight: 1,
        paddingBottom: "1.2rem",
        opacity: 0.8,
      }}
    >
      :
    </div>
  );
}

// ── Ambient particles (client-side only to avoid SSR hydration mismatch) ─────
interface Particle {
  id: number;
  x: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        top: Math.random() * 100,
        size: i % 3 === 0 ? 3 : 2,
        duration: 2.5 + Math.random() * 3,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "#FB7185",
            left: `${p.x}%`,
            top: `${p.top}%`,
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// ── Gallery card with parallax ──────────────────────────────────────────────
function GalleryCard({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20]);

  return (
    <motion.div
      ref={ref}
      style={{ y, position: "relative", overflow: "hidden" }}
      className="gallery-card"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          aspectRatio: index % 3 === 0 ? "3/4" : "1/1",
          boxShadow: "0 4px 20px rgba(244, 63, 94, 0.08)",
        }}
      >
        <Image
          src={src}
          alt={`Wedding photo ${index + 1}`}
          width={400}
          height={400}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Template5({ wedding, to, wishes }: Template5Props) {
  // ── State ────────────────────────────────────────────────────────────────
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ── Parallax hero image (window-based to avoid unhydrated-ref warning) ──
  const { scrollY: heroScrollY } = useScroll();
  const heroY = useTransform(heroScrollY, [0, 600], ["0%", "22%"]);

  // ── Countdown ────────────────────────────────────────────────────────────
  useEffect(() => {
    const target = wedding.event_date ? new Date(wedding.event_date) : new Date("2026-10-10T11:00:00");
    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [wedding.event_date]);

  // ── Audio ─────────────────────────────────────────────────────────────────
  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // ── RSVP submit ───────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wedding_id: wedding.id, guest_name: formName, content: formMessage }),
      });
      if (res.ok) {
        const newWish: Wish = {
          id: Date.now(),
          wedding_id: wedding.id,
          guest_name: formName,
          content: formMessage,
          created_at: new Date().toISOString(),
        };
        setLocalWishes((p) => [newWish, ...p]);
        setIsSubmitted(true);
        setFormName(""); setFormMessage("");
      }
    } catch { /* silent */ }
    setIsSubmitting(false);
  };

  const groomFamily = wedding.location_info?.groom_family;
  const brideFamily = wedding.location_info?.bride_family;

  // ── Envelope screen ────────────────────────────────────────────────────────
  if (!isOpened) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "linear-gradient(to bottom, #FFFFFF 0%, #FFF0F3 50%, #FFE4E8 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background ambient particles */}
        <AmbientParticles />

        {/* Recipient label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#E11D48",
            marginBottom: "1.5rem",
          }}
        >
          Trân Trọng Kính Mời
        </motion.p>

        <div className="relative inline-flex items-center justify-center px-6 min-w-[220px] mb-4">
          <span className="absolute bottom-0 text-rose-300/60 font-mono tracking-[0.25em] text-xs pointer-events-none select-none">
            ..............................
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ textAlign: "center" }}
            className="relative z-10"
          >
            <KineticStretchingText
              text={to || "Quý Khách"}
              fontSize="clamp(2.8rem, 12vw, 5.5rem)"
              color="#DC2626"
              className="font-ephesis drop-shadow-sm"
            />
          </motion.div>
        </div>

        <GoldLine />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-cormorant-garamond)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 4vw, 1.4rem)",
            color: "rgba(136,19,55,0.75)",
            textAlign: "center",
            marginBottom: "3rem",
            lineHeight: 1.6,
          }}
        >
          trân trọng kính mời<br />tham dự hôn lễ của chúng tôi
        </motion.p>

        <BiDirectionalMarquee
          text="Trân trọng kính mời · You are invited · Chúc mừng"
          baseSpeed={0.5}
          fontSize="0.75rem"
          color="rgba(244,63,94,0.4)"
          paddingY="0.5rem"
          className="absolute bottom-28 left-0 right-0"
        />

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setIsOpened(true);
            if (audioRef.current) {
              audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          }}
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(244, 63, 94, 0.3)",
            color: "#E11D48",
            boxShadow: "0 4px 20px rgba(244, 63, 94, 0.12)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            padding: "1rem 2.5rem",
            borderRadius: "30px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          Mở thiệp
          <ChevronDown size={14} />
        </motion.button>

        {/* Audio element */}
        {wedding.music_url && (
          <audio ref={audioRef} src={wedding.music_url} loop />
        )}
      </div>
    );
  }

  // ── MAIN INVITATION ────────────────────────────────────────────────────────
  return (
    <div
      style={{
        background: "#FFF8F9",
        color: "#374151",
        minHeight: "100dvh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <FloatingHearts />
      {/* Audio */}
      {wedding.music_url && <audio ref={audioRef} src={wedding.music_url} loop />}

      {/* ── Fixed audio toggle ─────────────────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleAudio}
        style={{
          position: "fixed",
          top: "1.25rem",
          right: "1.25rem",
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.85)",
          border: "1px solid rgba(244, 63, 94, 0.2)",
          boxShadow: "0 4px 15px rgba(244, 63, 94, 0.1)",
          backdropFilter: "blur(8px)",
          borderRadius: "50%",
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#E11D48",
        }}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </motion.button>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HERO COVER                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Parallax background photo */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            y: heroY,
            zIndex: 0,
          }}
        >
          <Image
            src="/thiepmaudovang/images/cover.jpg"
            alt="Wedding cover"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
          />
          {/* Light rose overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(255, 245, 247, 0.7) 0%, rgba(255, 245, 247, 0.25) 40%, rgba(255, 248, 249, 0.95) 100%)",
            }}
          />
        </motion.div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", width: "100%" }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#E11D48",
              marginBottom: "1.5rem",
            }}
          >
            wedding invitation
          </motion.p>

          {/* Text Silhouette Mask — couple names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <TextSilhouetteMask
              imageSrc="/thiepmaudovang/images/couple-small-1.jpg"
              coupleNames={`${wedding.groom_name.split(" ").pop()} & ${wedding.bride_name.split(" ").pop()}`}
              fontSize="clamp(2.2rem, 11vw, 4.5rem)"
            />
          </motion.div>

          <GoldLine />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 4vw, 1.5rem)",
              color: "#881337",
              marginTop: "0.5rem",
            }}
          >
            {wedding.bride_name} · {wedding.groom_name}
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ marginTop: "3rem" }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "rgba(244, 63, 94, 0.5)" }}
            >
              <ChevronDown size={20} style={{ margin: "0 auto" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MARQUEE 1                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <BiDirectionalMarquee
        text={`${wedding.groom_name}  ♡  ${wedding.bride_name}  ·  Forever`}
        baseSpeed={0.7}
        color="#F43F5E"
        background="rgba(251, 113, 133, 0.08)"
        paddingY="1.25rem"
        className="z-0"
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: KINETIC NAMES + DATE                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <FadeSection>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#E11D48",
              marginBottom: "2.5rem",
            }}
          >
            hân hạnh thông báo
          </p>
        </FadeSection>

        <KineticStretchingText
          text={wedding.groom_name}
          fontSize="clamp(2.2rem, 11vw, 5rem)"
          color="#881337"
          style={{ marginBottom: "0.25rem" }}
        />

        <motion.div
          style={{
            fontFamily: "var(--font-cormorant-garamond)",
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 5vw, 2rem)",
            color: "#F43F5E",
            margin: "0.5rem 0",
          }}
        >
          &amp;
        </motion.div>

        <KineticStretchingText
          text={wedding.bride_name}
          fontSize="clamp(2.2rem, 11vw, 5rem)"
          color="#881337"
          style={{ marginBottom: "2.5rem" }}
        />

        <FadeSection delay={0.2}>
          <GoldLine />
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.72rem",
              letterSpacing: "0.25em",
              color: "rgba(75, 85, 99, 0.8)",
              marginTop: "1.5rem",
            }}
          >
            {groomFamily?.date || "Thứ Bảy, ngày 10 tháng 10 năm 2026"}
          </p>
        </FadeSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: STORY                                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 2rem 5rem", maxWidth: "520px", margin: "0 auto" }}>
        <FadeSection>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#E11D48",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            câu chuyện của chúng tôi
          </p>
        </FadeSection>

        <FadeSection delay={0.1}>
          <p
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 5vw, 1.85rem)",
              color: "#881337",
              lineHeight: 1.65,
              textAlign: "center",
            }}
          >
            &ldquo;Tình yêu không phải là tìm kiếm người hoàn hảo, mà là nhìn thấy sự hoàn hảo trong người bất hoàn.&rdquo;
          </p>
        </FadeSection>

        <FadeSection delay={0.2}>
          <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.82rem",
                lineHeight: 1.8,
                color: "#4B5563",
              }}
            >
              Hành trình của chúng tôi bắt đầu từ những khoảnh khắc bình dị nhất — một buổi chiều tình cờ, một nụ cười chân thành, và một trái tim biết yêu thương. Hôm nay, chúng tôi muốn chia sẻ niềm hạnh phúc đó cùng những người thân yêu nhất.
            </p>
          </div>
        </FadeSection>

        {/* Couple photo */}
        <FadeSection delay={0.3}>
          <div
            style={{
              marginTop: "2.5rem",
              borderRadius: "12px",
              overflow: "hidden",
              aspectRatio: "4/5",
              position: "relative",
              boxShadow: "0 10px 30px rgba(244, 63, 94, 0.08)",
            }}
          >
            <Image
              src="/thiepmaudovang/images/gallery-9.jpg"
              alt="Couple story"
              fill
              sizes="(max-width: 520px) 100vw, 520px"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 60%, rgba(255, 248, 249, 0.8) 100%)",
              }}
            />
          </div>
        </FadeSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MARQUEE 2                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <BiDirectionalMarquee
        text="Save the Date · Lưu ngày này lại · Always &amp; Forever"
        baseSpeed={-0.6}
        color="rgba(225, 29, 72, 0.4)"
        background="rgba(255, 228, 230, 0.4)"
        paddingY="1rem"
        fontSize="0.7rem"
        className="z-0"
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: COUNTDOWN                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "5rem 1.5rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <FadeSection>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#E11D48",
              marginBottom: "3rem",
            }}
          >
            đếm ngược ngày trọng đại
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <CountUnit value={timeLeft.days} label="ngày" />
            <CountSep />
            <CountUnit value={timeLeft.hours} label="giờ" />
            <CountSep />
            <CountUnit value={timeLeft.minutes} label="phút" />
            <CountSep />
            <CountUnit value={timeLeft.seconds} label="giây" />
          </div>

          <GoldLine />

          <KineticStretchingText
            text={groomFamily?.date || "10 · 10 · 2026"}
            fontSize="clamp(1.5rem, 7vw, 2.5rem)"
            color="rgba(136, 19, 55, 0.6)"
            style={{ marginTop: "1.5rem" }}
          />
        </FadeSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4.5: GROOM & BRIDE PROFILES                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 1.5rem", borderBottom: "1px solid rgba(251, 113, 133, 0.15)" }}>
        <FadeSection>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#E11D48",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            cô dâu & chú rể
          </p>
        </FadeSection>

        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem", maxWidth: "480px", margin: "0 auto" }}>
          {/* Chú rể */}
          <FadeSection delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid rgba(251, 113, 133, 0.2)", padding: "1.5rem", borderRadius: "16px", background: "rgba(255, 255, 255, 0.85)", boxShadow: "0 8px 30px rgba(244, 63, 94, 0.04)" }}>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <div style={{ position: "relative", width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", border: "2px solid #F43F5E", flexShrink: 0, boxShadow: "0 4px 15px rgba(244, 63, 94, 0.15)" }}>
                  <Image
                    src="/thiepmaudovang/images/gallery-2.jpg"
                    alt="Chú rể"
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.6rem", fontWeight: "bold", color: "#E11D48", textTransform: "uppercase", letterSpacing: "0.15em", display: "block" }}>Chú rể</span>
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.35rem", color: "#881337", fontWeight: 600, marginTop: "0.25rem" }}>
                    {wedding.groom_name}
                  </h3>
                  {groomFamily && (
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#6B7280", marginTop: "0.35rem", lineHeight: "1.4" }}>
                      {groomFamily.father_name && <p>Con ông: {groomFamily.father_name}</p>}
                      {groomFamily.mother_name && <p>Con bà: {groomFamily.mother_name}</p>}
                    </div>
                  )}
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#4B5563", lineHeight: "1.6", fontStyle: "italic", borderTop: "1px solid rgba(251, 113, 133, 0.15)", paddingTop: "0.75rem", textAlign: "center" }}>
                &ldquo;Là một chàng trai điềm đạm, ấm áp và luôn tràn đầy hoài bão. Đối với anh, tình yêu không chỉ là những lời ngọt ngào mà còn là sự thấu hiểu, cùng nhau vượt qua mọi hành trình cuộc sống.&rdquo;
              </p>
            </div>
          </FadeSection>

          {/* Cô dâu */}
          <FadeSection delay={0.3}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid rgba(251, 113, 133, 0.2)", padding: "1.5rem", borderRadius: "16px", background: "rgba(255, 255, 255, 0.85)", boxShadow: "0 8px 30px rgba(244, 63, 94, 0.04)" }}>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexDirection: "row-reverse", textAlign: "right" }}>
                <div style={{ position: "relative", width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", border: "2px solid #F43F5E", flexShrink: 0, boxShadow: "0 4px 15px rgba(244, 63, 94, 0.15)" }}>
                  <Image
                    src="/thiepmaudovang/images/gallery-1.jpg"
                    alt="Cô dâu"
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.6rem", fontWeight: "bold", color: "#E11D48", textTransform: "uppercase", letterSpacing: "0.15em", display: "block" }}>Cô dâu</span>
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.35rem", color: "#881337", fontWeight: 600, marginTop: "0.25rem" }}>
                    {wedding.bride_name}
                  </h3>
                  {brideFamily && (
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#6B7280", marginTop: "0.35rem", lineHeight: "1.4" }}>
                      {brideFamily.father_name && <p>Con ông: {brideFamily.father_name}</p>}
                      {brideFamily.mother_name && <p>Con bà: {brideFamily.mother_name}</p>}
                    </div>
                  )}
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#4B5563", lineHeight: "1.6", fontStyle: "italic", borderTop: "1px solid rgba(251, 113, 133, 0.15)", paddingTop: "0.75rem", textAlign: "center" }}>
                &ldquo;Một cô gái dịu dàng, tinh tế và luôn mang đến nguồn năng lượng tích cực cho mọi người xung quanh. Cô tin rằng hạnh phúc chân chính là khi hai trái tim luôn đập cùng một nhịp.&rdquo;
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5: EVENT DETAILS                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 1.5rem 5rem" }}>
        <FadeSection>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#E11D48",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            thông tin hôn lễ
          </p>
        </FadeSection>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "480px", margin: "0 auto" }}>
          {[
            { label: "Nhà trai", data: groomFamily },
            { label: "Nhà gái", data: brideFamily },
          ].map(({ label, data }, i) =>
            data ? (
              <FadeSection key={label} delay={i * 0.15}>
                <div
                  style={{
                    border: "1px solid rgba(251, 113, 133, 0.2)",
                    borderRadius: "16px",
                    padding: "1.75rem 1.5rem",
                    background: "rgba(255, 255, 255, 0.85)",
                    boxShadow: "0 8px 25px rgba(244, 63, 94, 0.04)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#E11D48",
                      marginBottom: "1.25rem",
                      fontWeight: 700,
                    }}
                  >
                    {label}
                  </p>

                  {(data.father_name || data.mother_name) && (
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant-garamond)",
                        fontStyle: "italic",
                        fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
                        color: "#6B7280",
                        marginBottom: "1.25rem",
                        lineHeight: 1.6,
                      }}
                    >
                      Con của {data.father_name} &amp; {data.mother_name}
                    </p>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {data.date && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Calendar size={13} color="#F43F5E" style={{ flexShrink: 0 }} />
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#374151" }}>
                          {data.date}
                        </span>
                      </div>
                    )}
                    {data.time && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Clock size={13} color="#F43F5E" style={{ flexShrink: 0 }} />
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#374151" }}>
                          {data.time}
                        </span>
                      </div>
                    )}
                    {data.address && (
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <MapPin size={13} color="#F43F5E" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#374151", lineHeight: 1.6 }}>
                          {data.address}
                        </span>
                      </div>
                    )}
                  </div>

                  {data.map_url && (
                    <a
                      href={data.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginTop: "1.25rem",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#E11D48",
                        fontWeight: 600,
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(225, 29, 72, 0.3)",
                        paddingBottom: "2px",
                      }}
                    >
                      Xem bản đồ <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </FadeSection>
            ) : null
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 6: GALLERY                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "3rem 1rem 5rem" }}>
        <FadeSection>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#E11D48",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            album ảnh
          </p>
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
          }}
        >
          {GALLERY.map((src, i) => (
            <FadeSection key={src} delay={i * 0.07}>
              <div onClick={() => setLightboxSrc(src)} style={{ cursor: "pointer" }}>
                <GalleryCard src={src} index={i} />
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* Gallery lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(255, 245, 247, 0.95)",
              backdropFilter: "blur(10px)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "relative",
                width: "90vw",
                maxWidth: "480px",
                aspectRatio: "3/4",
                boxShadow: "0 10px 40px rgba(244, 63, 94, 0.15)",
              }}
            >
              <Image src={lightboxSrc} alt="Gallery" fill style={{ objectFit: "cover", borderRadius: "12px" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MARQUEE 3                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <BiDirectionalMarquee
        text="Chụp ảnh cùng nhau · Khoảnh khắc đẹp · Memories"
        baseSpeed={0.9}
        color="rgba(225, 29, 72, 0.35)"
        fontSize="0.68rem"
        paddingY="0.8rem"
        className="z-0"
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 7: GIFT INFO                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <FadeSection>
          <button
            onClick={() => setIsGiftOpen((v) => !v)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(251, 113, 133, 0.3)",
              boxShadow: "0 4px 15px rgba(244, 63, 94, 0.04)",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              cursor: "pointer",
              color: "#881337",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Gift size={16} color="#F43F5E" />
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", letterSpacing: "0.1em", fontWeight: 600 }}>
                Thông tin mừng cưới
              </span>
            </div>
            <motion.div animate={{ rotate: isGiftOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={16} color="#F43F5E" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isGiftOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden", maxWidth: "480px", margin: "0 auto" }}
              >
                <div
                  style={{
                    border: "1px solid rgba(251, 113, 133, 0.2)",
                    borderTop: "none",
                    borderRadius: "0 0 12px 12px",
                    padding: "1.5rem",
                    background: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  {[
                    { label: "Chú rể", name: wedding.groom_name, bank: "Vietcombank", number: "1234567890" },
                    { label: "Cô dâu", name: wedding.bride_name, bank: "Techcombank", number: "0987654321" },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: "1.25rem" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#E11D48", textTransform: "uppercase", marginBottom: "0.5rem", fontWeight: 700 }}>
                        {item.label}
                      </p>
                      <p style={{ fontFamily: "var(--font-cormorant-garamond)", fontSize: "1.1rem", color: "#881337", fontWeight: 700, marginBottom: "0.25rem" }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#4B5563" }}>
                        {item.bank} · {item.number}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 8: RSVP + GUESTBOOK                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 1.5rem 5rem", maxWidth: "520px", margin: "0 auto" }}>
        <FadeSection>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#E11D48",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            sổ lưu bút
          </p>
        </FadeSection>

        {/* RSVP toggle */}
        <FadeSection delay={0.1}>
          <button
            onClick={() => setIsRsvpOpen((v) => !v)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(251, 113, 133, 0.3)",
              boxShadow: "0 4px 15px rgba(244, 63, 94, 0.04)",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              cursor: "pointer",
              color: "#881337",
              marginBottom: "0",
            }}
          >
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", letterSpacing: "0.1em", fontWeight: 600 }}>
              Gửi lời chúc
            </span>
            <motion.div animate={{ rotate: isRsvpOpen ? 180 : 0 }}>
              <ChevronDown size={16} color="#F43F5E" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isRsvpOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    border: "1px solid rgba(251, 113, 133, 0.2)",
                    borderTop: "none",
                    borderRadius: "0 0 12px 12px",
                    padding: "1.5rem",
                    background: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                      <div style={{ marginBottom: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            borderBottom: "1px solid rgba(251, 113, 133, 0.3)",
                            paddingBottom: "0.75rem",
                          }}
                        >
                          <User size={13} color="#F43F5E" />
                          <input
                            type="text"
                            placeholder="Tên của bạn"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            required
                            style={{
                              background: "transparent",
                              border: "none",
                              outline: "none",
                              color: "#374151",
                              fontFamily: "var(--font-inter)",
                              fontSize: "0.85rem",
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ marginBottom: "1.25rem" }}>
                        <textarea
                          placeholder="Lời chúc của bạn..."
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          rows={3}
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            borderBottom: "1px solid rgba(251, 113, 133, 0.3)",
                            outline: "none",
                            color: "#374151",
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.85rem",
                            resize: "none",
                            paddingBottom: "0.75rem",
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "#F43F5E",
                          border: "none",
                          borderRadius: "20px",
                          padding: "0.75rem 1.5rem",
                          color: "#FFFFFF",
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.68rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          cursor: "pointer",
                          boxShadow: "0 4px 15px rgba(244, 63, 94, 0.25)",
                          opacity: isSubmitting ? 0.5 : 1,
                        }}
                      >
                        {isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}
                        <Send size={12} />
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: "center", padding: "1rem 0" }}
                    >
                      <Heart size={24} color="#F43F5E" style={{ margin: "0 auto 0.75rem" }} />
                      <p style={{ fontFamily: "var(--font-cormorant-garamond)", fontStyle: "italic", fontSize: "1.1rem", color: "#881337" }}>
                        Cảm ơn lời chúc của bạn!
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeSection>

        {/* Wishes list */}
        {localWishes.length > 0 && (
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {localWishes.map((wish, i) => (
              <FadeSection key={wish.id} delay={i * 0.05}>
                <div
                  style={{
                    border: "1px solid rgba(251, 113, 133, 0.2)",
                    borderRadius: "12px",
                    padding: "1.25rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.85)",
                    boxShadow: "0 4px 15px rgba(244, 63, 94, 0.03)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                    <div
                      style={{
                        width: "1.75rem",
                        height: "1.75rem",
                        borderRadius: "50%",
                        background: "rgba(251, 113, 133, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <User size={11} color="#F43F5E" />
                    </div>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 600, color: "#881337" }}>
                      {wish.guest_name}
                    </p>
                  </div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#4B5563", lineHeight: 1.65 }}>
                    {wish.content}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          padding: "4rem 1.5rem 3rem",
          textAlign: "center",
          borderTop: "1px solid rgba(251, 113, 133, 0.15)",
        }}
      >
        <BiDirectionalMarquee
          text="Trân trọng · With Love · Cảm ơn bạn đã đến · Mãi yêu"
          baseSpeed={0.4}
          color="rgba(225, 29, 72, 0.3)"
          fontSize="0.65rem"
          paddingY="0.6rem"
          className="z-0"
        />

        <div style={{ marginTop: "3rem" }}>
          <KineticStretchingText
            text={`${wedding.groom_name.split(" ").pop()} & ${wedding.bride_name.split(" ").pop()}`}
            fontSize="clamp(1.8rem, 8vw, 3rem)"
            color="rgba(136, 19, 55, 0.4)"
          />
          <GoldLine />
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(225, 29, 72, 0.4)",
              marginTop: "1rem",
            }}
          >
            {groomFamily?.date || "10 · 10 · 2026"}
          </p>
        </div>

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.58rem",
            color: "rgba(156, 163, 175, 0.7)",
            marginTop: "3rem",
            letterSpacing: "0.15em",
          }}
        >
          made with ♡ · e-wedding
        </p>
      </footer>
    </div>
  );
}
