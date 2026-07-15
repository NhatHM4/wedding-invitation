"use client";

import { useState, useEffect } from "react";
import Cl46HeroSection from "@/components/cinelove46/Cl46HeroSection";
import Cl46AmbientPetals from "@/components/cinelove46/Cl46AmbientPetals";
import Cl46InvitationSection from "@/components/cinelove46/Cl46InvitationSection";
import Cl46CalendarSection from "@/components/cinelove46/Cl46CalendarSection";
import Cl46QuotesSection from "@/components/cinelove46/Cl46QuotesSection";
import Cl46CountdownSection from "@/components/cinelove46/Cl46CountdownSection";
import Cl46RSVPSection from "@/components/cinelove46/Cl46RSVPSection";
import Cl46GiftSection from "@/components/cinelove46/Cl46GiftSection";
import Cl46AudioPlayer from "@/components/cinelove46/Cl46AudioPlayer";
import Cl46InteractionToolbar from "@/components/cinelove46/Cl46InteractionToolbar";
import Cl46WishesOverlay from "@/components/cinelove46/Cl46WishesOverlay";

interface WeddingData {
  id?: string;
  groom_name?: string;
  bride_name?: string;
  event_date?: string;
  venue?: string;
  slug?: string;
}

interface Wish {
  id: string;
  guest_name: string;
  content: string;
}

interface TemplateCineLove46Props {
  wedding?: WeddingData;
}

const LeafSeparator = () => (
  <div className="w-full flex items-center justify-center py-2 bg-[#fdfcf7] select-none">
    <svg width="80" height="16" viewBox="0 0 80 16" fill="none" className="text-[#c5a880]/50">
      <path d="M 0 8 C 20 8, 30 11, 40 8 C 50 5, 60 8, 80 8" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
      <circle cx="40" cy="8" r="1.5" fill="currentColor" />
      <path d="M 37 6 C 36 4, 34 5, 35 7" stroke="currentColor" strokeWidth="0.75" fill="currentColor" />
      <path d="M 43 10 C 44 12, 46 11, 45 9" stroke="currentColor" strokeWidth="0.75" fill="currentColor" />
    </svg>
  </div>
);

export default function TemplateCineLove46({ wedding }: TemplateCineLove46Props) {
  const [animate, setAnimate] = useState(false);
  const [likes, setLikes] = useState(117);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);

  // Activate observer elements after layout loads
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 400);
    return () => clearTimeout(t);
  }, []);

  // IntersectionObserver scroll animations
  useEffect(() => {
    if (!animate) return;
    const els = document.querySelectorAll(".is-animation");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("animation");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [animate]);

  const handleWishSubmitted = (name: string, content: string) => {
    const newWish = { id: `wish-${Date.now()}`, guest_name: name, content };
    setWishes((prev) => [...prev, newWish]);
    setLikes((l) => l + 1);
  };

  const handleLikeTriggered = () => {
    setLikes((l) => l + 1);
    // Add floating heart animation instance
    const id = Date.now();
    const left = 20 + Math.random() * 60; // Percent position
    setFloatingHearts((prev) => [...prev, { id, left }]);

    // Auto-remove heart DOM after animation
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 2000);
  };

  const handleGiftTriggered = () => {
    const el = document.getElementById("gift-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#e8e0d8] py-0 overflow-x-hidden relative" data-template="cinelove46">
      {/* Visual responsive canvas frame */}
      <div
        className="relative flex flex-col min-h-screen w-full max-w-[420px] overflow-x-hidden shadow-2xl pb-[100px] bg-[#fdfcf7] cinelove46-container"
      >
        <Cl46AmbientPetals />
        <Cl46HeroSection wedding={wedding} />
        <LeafSeparator />
        <Cl46InvitationSection wedding={wedding} />
        <LeafSeparator />
        <Cl46CalendarSection wedding={wedding} />
        <LeafSeparator />
        <Cl46QuotesSection />
        <LeafSeparator />
        <Cl46CountdownSection wedding={wedding} />
        <LeafSeparator />
        <Cl46RSVPSection weddingId={wedding?.id} onWishSubmitted={() => setLikes((l) => l + 1)} />
        <LeafSeparator />

        {/* Anchor for scroll box targeting */}
        <div id="gift-section" className="w-full">
          <Cl46GiftSection wedding={wedding} />
        </div>
      </div>

      {/* Wishes Floating Bubbles overlay (now outside the zoomed container to stay fixed on viewport) */}
      <Cl46WishesOverlay wishes={wishes} />

      {/* Floating top-right audio player */}
      <Cl46AudioPlayer />

      {/* Floating bottom toolbar */}
      <Cl46InteractionToolbar
        onWishSubmitted={handleWishSubmitted}
        likesCount={likes}
        onLikeTriggered={handleLikeTriggered}
        onGiftTriggered={handleGiftTriggered}
      />

      {/* Floating heart animations portal container */}
      <div className="fixed inset-0 pointer-events-none z-[95] overflow-hidden">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-[60px] text-red-500 text-2xl animate-float-heart"
            style={{ left: `${heart.left}%` }}
          >
            ❤️
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float-heart {
          0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(-300px) scale(1.3) rotate(20deg); opacity: 0; }
        }
        .animate-float-heart {
          animation: float-heart 2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
