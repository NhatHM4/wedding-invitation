"use client";

import { useState, useEffect, useCallback } from "react";
import TmdvHeroSection from "@/components/thiepmaudovang/TmdvHeroSection";
import TmdvAnnouncementSection from "@/components/thiepmaudovang/TmdvAnnouncementSection";
import TmdvCoupleSection from "@/components/thiepmaudovang/TmdvCoupleSection";
import TmdvProgramSection from "@/components/thiepmaudovang/TmdvProgramSection";
import TmdvRSVPSection from "@/components/thiepmaudovang/TmdvRSVPSection";
import TmdvWishesSection from "@/components/thiepmaudovang/TmdvWishesSection";
import TmdvAlbumSection from "@/components/thiepmaudovang/TmdvAlbumSection";
import TmdvFooter from "@/components/thiepmaudovang/TmdvFooter";
import TmdvAudioPlayer from "@/components/thiepmaudovang/TmdvAudioPlayer";
import TmdvGiftModal from "@/components/thiepmaudovang/TmdvGiftModal";
import TmdvHeartsBackground from "@/components/thiepmaudovang/TmdvHeartsBackground";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface TemplateDoVangProps {
  wedding: any;
  to: string;
  wishes: any[];
}

export default function TemplateDoVang({ wedding, to, wishes: initialWishes }: TemplateDoVangProps) {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  const [scale, setScale] = useState(1);
  const [wishesList, setWishesList] = useState<any[]>(initialWishes);

  const fetchWishes = useCallback(async (weddingId: string) => {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("wedding_id", weddingId)
      .order("created_at", { ascending: false });
    if (!error && data) {
      setWishesList(data);
    }
  }, []);

  useEffect(() => {
    setWishesList(initialWishes);
  }, [initialWishes]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 420) {
        setScale(width / 420);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setCurtainOpen(true), 1500);
    const t2 = setTimeout(() => setCurtainDone(true), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
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
        rootMargin: "0px 0px -100px 0px"
      }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [curtainDone, wishesList]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-white py-0 overflow-x-hidden relative">
      <TmdvHeartsBackground />

      {/* ── ROMANTIC CURTAIN REVEAL ── */}
      {!curtainDone && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Left Door */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              zIndex: 3, // Set to 3 so the attached seal overlays the right door and doesn't get cut in half
              transition: curtainOpen
                ? "transform 3500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 3500ms ease-out"
                : "none",
              transform: curtainOpen ? "translateX(-100%)" : "translateX(0)",
              backgroundColor: "#b91c1c", // Brighter, more vibrant traditional red
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='40' viewBox='0 0 60 40'%3E%3Cpath d='M30 40c11.046 0 20-8.954 20-20S41.046 0 30 0 10 8.954 10 20s8.954 20 20 20zm0-4c-8.837 0-16-7.163-16-16S21.163 4 30 4s16 7.163 16 16-7.163 16-16 16zm-15-6c5.523 0 10-4.477 10-10S20.523 10 15 10 5 14.477 5 20s4.477 10 10 10zm30 0c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z' fill='%23c5a880' fill-opacity='.08' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              borderRight: "4px solid #c5a880",
              boxShadow: "inset -10px 0 20px rgba(0,0,0,0.3)"
            }}
          >
            {/* Square double happiness seal attached to the right side of the left door */}
            <div 
              style={{
                position: "absolute",
                top: "50%",
                right: "-50px", // Centered on the seam (width is 100px, so half is 50px)
                transform: "translateY(-50%)",
                width: "100px",
                height: "100px",
                backgroundColor: "#b91c1c", // Brighter, more vibrant traditional red
                border: "3px double #c5a880",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                zIndex: 10,
              }}
            >
              <div className="relative w-[65px] h-[65px]">
                <Image
                  src="/thiepmaudovang/images/double-happiness.png"
                  alt="Double Happiness Seal"
                  fill
                  sizes="65px"
                  className="object-contain filter brightness-[1.2]"
                />
              </div>
            </div>
          </div>

          {/* Right Door */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              zIndex: 2, // Layered behind the left door's seal
              transition: curtainOpen
                ? "transform 3500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 3500ms ease-out"
                : "none",
              transform: curtainOpen ? "translateX(100%)" : "translateX(0)",
              backgroundColor: "#b91c1c", // Brighter, more vibrant traditional red
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='40' viewBox='0 0 60 40'%3E%3Cpath d='M30 40c11.046 0 20-8.954 20-20S41.046 0 30 0 10 8.954 10 20s8.954 20 20 20zm0-4c-8.837 0-16-7.163-16-16S21.163 4 30 4s16 7.163 16 16-7.163 16-16 16zm-15-6c5.523 0 10-4.477 10-10S20.523 10 15 10 5 14.477 5 20s4.477 10 10 10zm30 0c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z' fill='%23c5a880' fill-opacity='.08' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              borderLeft: "4px solid #c5a880",
              boxShadow: "inset 10px 0 20px rgba(0,0,0,0.3)"
            }}
          />
        </div>
      )}

      <div 
        className="tmdv-container relative flex flex-col min-h-screen overflow-x-hidden bg-white shadow-2xl border-x border-gray-200"
        style={{
          width: scale < 1 ? "420px" : "100%",
          maxWidth: scale < 1 ? "none" : "420px",
          zoom: scale,
        }}
      >
        {/* ── INVITATION CONTENT ── */}
        <div className="flex flex-col w-full opacity-100">
          <TmdvHeroSection wedding={wedding} to={to} animate={curtainOpen} />
          <TmdvAnnouncementSection wedding={wedding} />
          <TmdvCoupleSection wedding={wedding} />
          <TmdvProgramSection wedding={wedding} />
          <TmdvRSVPSection 
            onOpenGift={() => setIsGiftOpen(true)} 
            weddingId={wedding?.id}
            onWishSubmitted={() => wedding && fetchWishes(wedding.id)}
          />
          <TmdvWishesSection wishes={wishesList} />
          <TmdvAlbumSection />
          <TmdvFooter wedding={wedding} />
        </div>

        <TmdvAudioPlayer wedding={wedding} />
        <TmdvGiftModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} wedding={wedding} />
      </div>
    </div>
  );
}
