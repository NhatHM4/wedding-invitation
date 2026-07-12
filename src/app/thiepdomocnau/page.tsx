"use client";

import { useState, useEffect, useCallback } from "react";
import TmdnHeroSection from "@/components/thiepdomocnau/TmdnHeroSection";
import TmdnAnnouncementSection from "@/components/thiepdomocnau/TmdnAnnouncementSection";
import TmdnProgramSection from "@/components/thiepdomocnau/TmdnProgramSection";
import TmdnRSVPSection from "@/components/thiepdomocnau/TmdnRSVPSection";
import TmdnWishesSection from "@/components/thiepdomocnau/TmdnWishesSection";
import TmdnAlbumSection from "@/components/thiepdomocnau/TmdnAlbumSection";
import TmdnFooter from "@/components/thiepdomocnau/TmdnFooter";
import TmdnAudioPlayer from "@/components/thiepdomocnau/TmdnAudioPlayer";
import TmdnGiftModal from "@/components/thiepdomocnau/TmdnGiftModal";
import { supabase } from "@/lib/supabase";

export default function ThiepDoMocNauPage() {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [wedding, setWedding] = useState<{ id: string } | null>(null);
  const [wishesList, setWishesList] = useState<
    { id: string | number; guest_name: string; content: string; created_at: string }[]
  >([]);

  // ── Responsive scale for narrow screens ──
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setScale(w < 420 ? w / 420 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Fetch wishes from DB ──
  const fetchWishes = useCallback(async (weddingId: string) => {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("wedding_id", weddingId)
      .order("created_at", { ascending: false });
    if (!error && data) setWishesList(data);
  }, []);

  // ── Fetch wedding record ──
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("weddings")
        .select("*")
        .eq("slug", "minhhoang-maihuong")
        .single();
      if (!error && data) {
        setWedding(data);
        fetchWishes(data.id);
      }
    };
    load();
  }, [fetchWishes]);

  // ── Scroll entrance animations ──
  useEffect(() => {
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
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [wedding, wishesList]); // re-run when DB records load so they also get observed

  return (
    <>
      {/* Outer page — light blue-grey background matching the target */}
      <main
        className="min-h-screen w-full flex justify-center py-0 overflow-x-hidden"
        style={{ background: "linear-gradient(135deg, #e8ecf4 0%, #dce4f0 100%)" }}
      >
        {/* White invitation card — max 420px, fills narrow screens */}
        <div
          className="relative flex flex-col min-h-screen bg-white shadow-2xl overflow-hidden"
          style={{
            width: scale < 1 ? "420px" : "100%",
            maxWidth: "420px",
            zoom: scale,
          }}
        >
          <TmdnHeroSection />
          <TmdnAnnouncementSection />
          <TmdnProgramSection />
          <TmdnRSVPSection
            onOpenGift={() => setIsGiftOpen(true)}
            weddingId={wedding?.id}
            onWishSubmitted={() => {
              if (wedding) fetchWishes(wedding.id);
            }}
          />
          <TmdnWishesSection wishes={wishesList} />
          <TmdnAlbumSection />
          <TmdnFooter />
        </div>
      </main>

      {/* Floating audio player — outside the scaled container so it stays in viewport */}
      <TmdnAudioPlayer />

      {/* Gift modal */}
      <TmdnGiftModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />
    </>
  );
}
