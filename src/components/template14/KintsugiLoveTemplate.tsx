"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wedding, Wish } from "@/types";
import KintsugiOpening from "./KintsugiOpening";
import GoldenSeamNavigation from "./GoldenSeamNavigation";
import CoupleCeramicPortrait from "./CoupleCeramicPortrait";
import GoldenLoveStory from "./GoldenLoveStory";
import MemoryGoldReveal from "./MemoryGoldReveal";
import CeramicGallery from "./CeramicGallery";
import KilnCountdown from "./KilnCountdown";
import WeddingCeramicPlate from "./WeddingCeramicPlate";
import FinalFragmentRSVP, { RsvpSuccessData } from "./FinalFragmentRSVP";
import PersonalizedGoldenSeal from "./PersonalizedGoldenSeal";
import CeramicGuestbook from "./CeramicGuestbook";
import CeramicAudioControl from "./CeramicAudioControl";
import { CeramicFragmentData } from "./CeramicAssembly";

interface KintsugiLoveTemplateProps {
  wedding: Wedding;
  to?: string;
  wishes?: Wish[];
}

const INITIAL_FRAGMENTS: CeramicFragmentData[] = [
  {
    id: 1,
    title: "Lời mời",
    subtitle: "Dành riêng cho khách",
    sectionId: "invitation",
    pathD: "M 50,50 L 200,50 L 170,180 L 50,150 Z",
    assembled: false,
    color: "porcelain-grad",
  },
  {
    id: 2,
    title: "Chúng mình",
    subtitle: "Cô dâu & Chú rể",
    sectionId: "couple",
    pathD: "M 200,50 L 350,50 L 350,180 L 170,180 Z",
    assembled: false,
    color: "clay-grad",
  },
  {
    id: 3,
    title: "Chuyện tình",
    subtitle: "Những mốc thời gian",
    sectionId: "love-story",
    pathD: "M 50,150 L 170,180 L 120,320 L 50,300 Z",
    assembled: false,
    color: "porcelain-grad",
  },
  {
    id: 4,
    title: "Khoảnh khắc",
    subtitle: "Album ảnh trưng bày",
    sectionId: "gallery",
    pathD: "M 170,180 L 350,180 L 350,320 L 220,330 Z",
    assembled: false,
    color: "burgundy-grad",
  },
  {
    id: 5,
    title: "Ngày trọng đại",
    subtitle: "Địa điểm & Buổi lễ",
    sectionId: "ceremony",
    pathD: "M 120,320 L 220,330 L 200,380 L 50,350 Z",
    assembled: false,
    color: "clay-grad",
  },
  {
    id: 6,
    title: "Xác nhận RSVP",
    subtitle: "Mảnh ghép cuối cùng",
    sectionId: "rsvp",
    pathD: "M 220,330 L 350,320 L 350,380 L 200,380 Z",
    assembled: false,
    color: "porcelain-grad",
  },
];

export default function KintsugiLoveTemplate({
  wedding,
  to = "",
  wishes = [],
}: KintsugiLoveTemplateProps) {
  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Fragments progress state
  const [fragments, setFragments] = useState<CeramicFragmentData[]>(INITIAL_FRAGMENTS);
  const [rsvpData, setRsvpData] = useState<RsvpSuccessData | null>(null);

  // Personalization fallback
  const guestName = to && to !== "Quý khách" ? to : "";

  // Load progress from sessionStorage
  useEffect(() => {
    try {
      const storedProgress = sessionStorage.getItem("kintsugi_progress");
      if (storedProgress) {
        const ids: number[] = JSON.parse(storedProgress);
        setFragments((prev) =>
          prev.map((f) => ({ ...f, assembled: ids.includes(f.id) }))
        );
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save progress helper
  const saveProgress = (updated: CeramicFragmentData[]) => {
    try {
      const assembledIds = updated.filter((f) => f.assembled).map((f) => f.id);
      sessionStorage.setItem("kintsugi_progress", JSON.stringify(assembledIds));
    } catch {
      // Ignore
    }
  };

  const handleAssembleFragment = (id: number) => {
    const updated = fragments.map((f) => (f.id === id ? { ...f, assembled: true } : f));
    setFragments(updated);
    saveProgress(updated);
  };

  const handleAssembleAll = () => {
    const updated = fragments.map((f) => ({ ...f, assembled: true }));
    setFragments(updated);
    saveProgress(updated);
  };

  const handleSkipOpening = () => {
    handleAssembleAll();
    const el = document.getElementById("invitation");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Audio Toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => setIsPlayingMusic(false));
    }
  };

  const assembledCount = fragments.filter((f) => f.assembled).length;

  return (
    <div className="min-h-screen w-full bg-[#FAF7F0] text-[#252320] font-sans selection:bg-[#B99245] selection:text-[#FAF7F0] relative overflow-x-hidden">
      
      {/* Background Audio Element */}
      {wedding.music_url && (
        <audio ref={audioRef} src={wedding.music_url} loop preload="auto" />
      )}

      {/* Floating Audio Control Button */}
      <CeramicAudioControl
        isPlaying={isPlayingMusic}
        onToggle={toggleMusic}
        hasMusic={Boolean(wedding.music_url)}
      />

      {/* Floating Side Golden Navigation */}
      <GoldenSeamNavigation
        assembledCount={assembledCount}
        totalFragments={fragments.length}
      />

      {/* 1. Opening Screen - Broken Ceramic Assembly */}
      <KintsugiOpening
        groomName={wedding.groom_name}
        brideName={wedding.bride_name}
        eventDate={wedding.event_date}
        guestName={guestName}
        fragments={fragments}
        onAssembleFragment={handleAssembleFragment}
        onAssembleAll={handleAssembleAll}
        onSkipOpening={handleSkipOpening}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={toggleMusic}
        hasMusic={Boolean(wedding.music_url)}
      />

      {/* Main Content Invitation Sections */}
      <div id="invitation" className="relative">
        
        {/* 2. Couple Section (Hai Mảnh Gốm) */}
        <CoupleCeramicPortrait
          groomName={wedding.groom_name}
          brideName={wedding.bride_name}
          groomImage={wedding.images?.[0] || "/thiepmaudovang/images/cover.jpg"}
          brideImage={wedding.images?.[1] || "/thiepmaudovang/images/gallery-1.jpg"}
        />

        {/* 3. Love Story (Đường Nứt Hóa Vàng) */}
        <GoldenLoveStory />

        {/* 4. Memory Gold Reveal (Phủ Vàng Kỷ Niệm) */}
        <MemoryGoldReveal
          memoryImage={wedding.images?.[2] || wedding.images?.[0] || "/thiepmaudovang/images/cover.jpg"}
        />

        {/* 5. Ceramic Gallery (Album Ảnh Trưng Bày) */}
        <CeramicGallery images={wedding.images} />

        {/* 6. Kiln Countdown (Đồng Hồ Men Gốm) */}
        <KilnCountdown targetDate={wedding.event_date} />

        {/* 7. Wedding Ceremony Info (Thông Tin Ngày Cưới) */}
        <WeddingCeramicPlate wedding={wedding} />

        {/* 8. Final Fragment RSVP (Xác Nhận Tham Dự) */}
        <FinalFragmentRSVP
          weddingId={wedding.id}
          defaultGuestName={guestName}
          onRsvpSuccess={(data) => setRsvpData(data)}
        />

        {/* 9. Personalized Golden Seal (Ấn Vàng Ngày Chung Đôi) */}
        {rsvpData && (
          <PersonalizedGoldenSeal
            data={rsvpData}
            groomName={wedding.groom_name}
            brideName={wedding.bride_name}
            eventDate={wedding.event_date}
            venueAddress={wedding.location_info?.groom_family?.address}
            mapUrl={wedding.location_info?.groom_family?.map_url}
          />
        )}

        {/* 10. Guestbook (Khắc Lời Chúc Lên Gốm) */}
        <CeramicGuestbook weddingId={wedding.id} wishes={wishes} />
      </div>

      {/* Footer Branding */}
      <footer className="py-8 text-center bg-[#252320] text-[#FAF7F0] border-t border-[#B99245]/30">
        <p className="text-xs font-serif tracking-widest text-[#B99245] uppercase">
          KINTSUGI LOVE • SAVETHEDATE.IO.VN
        </p>
        <p className="text-[10px] font-mono text-[#FAF7F0]/60 mt-1">
          Made with love & high-craft ceramics
        </p>
      </footer>
    </div>
  );
}
