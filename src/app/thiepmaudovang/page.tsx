"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TmdvHeroSection from "@/components/thiepmaudovang/TmdvHeroSection";
import TmdvAnnouncementSection from "@/components/thiepmaudovang/TmdvAnnouncementSection";
import TmdvProgramSection from "@/components/thiepmaudovang/TmdvProgramSection";
import TmdvRSVPSection from "@/components/thiepmaudovang/TmdvRSVPSection";
import TmdvAlbumSection from "@/components/thiepmaudovang/TmdvAlbumSection";
import TmdvFooter from "@/components/thiepmaudovang/TmdvFooter";
import TmdvAudioPlayer from "@/components/thiepmaudovang/TmdvAudioPlayer";
import TmdvGiftModal from "@/components/thiepmaudovang/TmdvGiftModal";
import TmdvHeartsBackground from "@/components/thiepmaudovang/TmdvHeartsBackground";

export default function ThiepMauDoVangPage() {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);

  useEffect(() => {
    // Wait 1.5s so the user can appreciate the gorgeous romantic curtain with the seal
    const t1 = setTimeout(() => setCurtainOpen(true), 1500);
    // Remove DOM after animation finishes
    const t2 = setTimeout(() => setCurtainDone(true), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Scroll entrance animations (only runs after curtains are fully opened and removed)
  useEffect(() => {
    if (!curtainDone) return;

    const els = document.querySelectorAll(".is-animation");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animation");
          }
        });
      },
      { 
        threshold: 0.15, 
        // 100px buffer at the bottom ensures elements trigger animation ONLY when scrolled well into view
        rootMargin: "0px 0px -100px 0px" 
      }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [curtainDone]);

  return (
    <main className="min-h-screen w-full flex justify-center bg-white py-0 overflow-x-hidden">
      <TmdvHeartsBackground />

      <div className="tmdv-container relative w-full max-w-[420px] bg-white shadow-2xl border-x border-gray-200 flex flex-col min-h-screen overflow-x-hidden">

        {/* ── ROMANTIC CURTAIN REVEAL ── */}
        {!curtainDone && (
          <div className="absolute top-0 left-0 w-full h-screen z-[9999] pointer-events-none overflow-hidden">

            {/* Soft blush overlay — fades out as curtains open */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #fff5f7 0%, #fce4ec 50%, #fff5f7 100%)",
                transition: curtainOpen ? "opacity 2000ms ease-out" : "none",
                opacity: curtainOpen ? 0 : 1,
                transitionDelay: curtainOpen ? "800ms" : "0ms",
                zIndex: 0,
              }}
            />

            {/* LEFT curtain — floats out to the left */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "55%",
                height: "100%",
                zIndex: 2,
                transition: curtainOpen
                  ? "transform 2400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 2400ms ease-out"
                  : "none",
                transform: curtainOpen ? "translateX(-105%)" : "translateX(0)",
                opacity: curtainOpen ? 0 : 1,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url('/thiepmaudovang/images/curtain-door.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "right center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>

            {/* RIGHT curtain — floats out to the right (mirrored) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "55%",
                height: "100%",
                zIndex: 2,
                transition: curtainOpen
                  ? "transform 2400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 2400ms ease-out"
                  : "none",
                transform: curtainOpen ? "translateX(105%)" : "translateX(0)",
                opacity: curtainOpen ? 0 : 1,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url('/thiepmaudovang/images/curtain-door.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "right center",
                  backgroundRepeat: "no-repeat",
                  transform: "scaleX(-1)",
                }}
              />
            </div>

            {/* Center ornament (Double Happiness Seal) — fades and scales down as curtains open */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: curtainOpen 
                  ? "translate(-50%, -50%) scale(0.3)" 
                  : "translate(-50%, -50%) scale(1)",
                opacity: curtainOpen ? 0 : 1,
                transition: "transform 1800ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1500ms ease-out",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <div className="w-[120px] h-[120px] bg-white/90 backdrop-blur-[4px] border-2 border-[#c5a880] rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(125,31,42,0.25)]">
                <div className="relative w-[70px] h-[70px] filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
                  <Image
                    src="/thiepmaudovang/images/double-happiness.png"
                    alt="Double Happiness Seal"
                    fill
                    sizes="70px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── INVITATION CONTENT — always beneath curtains ── */}
        <div 
          className="flex flex-col w-full"
          style={{
            opacity: curtainOpen ? 1 : 0,
            transform: curtainOpen ? "translateY(0) scale(1)" : "translateY(15px) scale(0.97)",
            transition: "opacity 2200ms cubic-bezier(0.215, 0.610, 0.355, 1), transform 2200ms cubic-bezier(0.215, 0.610, 0.355, 1)",
            transitionDelay: "300ms",
          }}
        >
          <TmdvHeroSection />
          <TmdvAnnouncementSection />
          <TmdvProgramSection />
          <TmdvRSVPSection onOpenGift={() => setIsGiftOpen(true)} />
          <TmdvAlbumSection />
          <TmdvFooter />
        </div>

        <TmdvAudioPlayer />
        <TmdvGiftModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />
      </div>
    </main>
  );
}
