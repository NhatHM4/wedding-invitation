"use client";

import React, { useState, useRef, useEffect } from "react";
import { Wedding, Wish } from "@/types";
import FilmBoxOpening from "./FilmBoxOpening";
import FilmStripNavigation from "./FilmStripNavigation";
import DarkroomReveal from "./DarkroomReveal";
import CoupleContactSheet from "./CoupleContactSheet";
import LoveStoryFilm from "./LoveStoryFilm";
import AudioMemory from "./AudioMemory";
import WeddingProductionSheet from "./WeddingProductionSheet";
import ProjectorCountdown from "./ProjectorCountdown";
import PhotoPrintRSVP from "./PhotoPrintRSVP";
import PersonalizedPolaroid from "./PersonalizedPolaroid";
import DarkroomGallery from "./DarkroomGallery";
import PolaroidGuestbook from "./PolaroidGuestbook";
import FinalFilmFrame from "./FinalFilmFrame";

interface LoveFilmLabTemplateProps {
  wedding: Wedding;
  to?: string;
  wishes?: Wish[];
}

export default function LoveFilmLabTemplate({
  wedding,
  to,
  wishes = [],
}: LoveFilmLabTemplateProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isFilmOpened, setIsFilmOpened] = useState<boolean>(false);
  const [rsvpData, setRsvpData] = useState<{
    guestName: string;
    attending: boolean;
    guestCount: number;
    side: "groom" | "bride";
    ticketCode: string;
  } | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicUrl = wedding.music_url || "/thiepmaudovang/audio/bg-music.mp3";

  // Audio setup
  useEffect(() => {
    if (!audioRef.current && typeof window !== "undefined") {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {
        setIsPlayingMusic(false);
      });
    }
  };

  const handleOpenFilm = () => {
    setIsFilmOpened(true);
    if (audioRef.current && !isPlayingMusic) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  const groomName = wedding.groom_name || "Thế Vinh";
  const brideName = wedding.bride_name || "Phương Thảo";
  const groomFamily = wedding.location_info?.groom_family;
  const brideFamily = wedding.location_info?.bride_family;

  const galleryImages = (wedding.images && wedding.images.length > 0)
    ? wedding.images
    : [
        "/thiepmaudovang/images/cover.jpg",
        "/thiepmaudovang/images/gallery-1.jpg",
        "/thiepmaudovang/images/gallery-2.jpg",
        "/thiepmaudovang/images/gallery-3.jpg",
      ];

  return (
    <main className="min-h-screen bg-[#121212] text-[#F1E6D2] font-sans selection:bg-[#A53A32] selection:text-[#F1E6D2]">
      {/* 1. Màn Hình Opening Hộp Phim Cá Nhân Hóa */}
      {!isFilmOpened ? (
        <FilmBoxOpening
          groomName={groomName}
          brideName={brideName}
          eventDate={wedding.event_date}
          guestName={to}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={toggleMusic}
          onOpenFilm={handleOpenFilm}
        />
      ) : (
        <div className="animate-fadeIn">
          {/* Audio Memory Top Widget */}
          <AudioMemory
            musicUrl={musicUrl}
            isPlaying={isPlayingMusic}
            onTogglePlay={toggleMusic}
          />

          {/* 2. Dải Phim Kỷ Niệm (Film Strip Navigation) */}
          <FilmStripNavigation />

          {/* 3. Tráng Ảnh Phòng Tối (Darkroom Reveal) */}
          <DarkroomReveal image={galleryImages[0]} />

          {/* 4. Contact Sheet Cô Dâu & Chú Rể */}
          <CoupleContactSheet
            groomName={groomName}
            brideName={brideName}
            groomImage={galleryImages[1] || galleryImages[0]}
            brideImage={galleryImages[2] || galleryImages[0]}
            groomFather={groomFamily?.father_name}
            groomMother={groomFamily?.mother_name}
            brideFather={brideFamily?.father_name}
            brideMother={brideFamily?.mother_name}
          />

          {/* 5. Thước Phim Hành Trình Tình Yêu (Love Story Projector) */}
          <LoveStoryFilm />

          {/* 6. Production Sheet Thông Tin Tiệc Cưới */}
          <WeddingProductionSheet
            eventDate={wedding.event_date}
            groomFamily={groomFamily}
            brideFamily={brideFamily}
          />

          {/* 7. Máy Chiếu Đếm Ngược Ngày Hỷ */}
          <ProjectorCountdown targetDate={wedding.event_date} />

          {/* 8. RSVP Phòng In Ảnh & Polaroid Cá Nhân Hóa */}
          <PhotoPrintRSVP
            weddingId={wedding.id}
            defaultGuestName={to}
            onRsvpSuccess={(data) => setRsvpData(data)}
          />

          {rsvpData && (
            <PersonalizedPolaroid
              guestName={rsvpData.guestName}
              groomName={groomName}
              brideName={brideName}
              eventDate={groomFamily?.date || "10/10/2026"}
              eventTime={groomFamily?.time || "11:00 AM"}
              venueAddress={groomFamily?.address}
              ticketCode={rsvpData.ticketCode}
              attending={rsvpData.attending}
              mapUrl={groomFamily?.map_url}
            />
          )}

          {/* 9. Bàn Phơi Ảnh Cưới (Darkroom Lightbox Gallery) */}
          <DarkroomGallery images={galleryImages} />

          {/* 10. Lời Chúc Mặt Sau Ảnh Polaroid (Guestbook) */}
          <PolaroidGuestbook weddingId={wedding.id} wishes={wishes} />

          {/* 11. Khung Phim Cuối Cùng (Final Scene) */}
          <FinalFilmFrame
            groomName={groomName}
            brideName={brideName}
            eventDate={wedding.event_date}
            mapUrl={groomFamily?.map_url}
          />
        </div>
      )}
    </main>
  );
}
