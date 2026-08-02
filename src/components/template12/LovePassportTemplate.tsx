"use client";

import React, { useState } from "react";
import { Wedding, Wish } from "@/types";
import PassportMusicPlayer from "./PassportMusicPlayer";
import PassportOpening from "./PassportOpening";
import PassportProfile from "./PassportProfile";
import JourneyMap from "./JourneyMap";
import ScratchPostcard from "./ScratchPostcard";
import WeddingDestination from "./WeddingDestination";
import CheckInRSVP from "./CheckInRSVP";
import BoardingPass from "./BoardingPass";
import TravelPhotoGallery from "./TravelPhotoGallery";
import GuestStampWall from "./GuestStampWall";
import FinalDestination from "./FinalDestination";

interface LovePassportTemplateProps {
  wedding: Wedding;
  to?: string;
  wishes?: Wish[];
}

export default function LovePassportTemplate({
  wedding,
  to = "",
  wishes = [],
}: LovePassportTemplateProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [autoPlayRequested, setAutoPlayRequested] = useState(false);

  const groomName = wedding.groom_name || "Chú Rể";
  const brideName = wedding.bride_name || "Cô Dâu";
  const guestName = to || "";

  const handleOpenPassport = () => {
    setAutoPlayRequested(true);
    setIsMusicPlaying(true);
    const target = document.getElementById("passport-profile");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleMusic = () => {
    setAutoPlayRequested(!autoPlayRequested);
    setIsMusicPlaying(!isMusicPlaying);
  };

  const imagesList =
    wedding.images && wedding.images.length > 0
      ? wedding.images
      : [
          "/thiepmaudovang/images/cover.jpg",
          "/thiepmaudovang/images/gallery-1.jpg",
          "/thiepmaudovang/images/gallery-2.jpg",
          "/thiepmaudovang/images/gallery-3.jpg",
        ];

  return (
    <div className="min-h-[100dvh] w-full bg-[#0B111D] flex justify-center antialiased selection:bg-[#B89B62] selection:text-[#172235]">
      {/* Desktop Ambient Background Accents */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#B89B62_1px,transparent_1px)] [background-size:32px_32px] hidden sm:block" />

      {/* Main Mobile-First Card Container (Fixed at 480px width max on Desktop, 100% on Mobile) */}
      <div className="w-full max-w-[480px] bg-[#172235] text-[#F4EBDD] min-h-[100dvh] shadow-[0_0_60px_rgba(0,0,0,0.8)] relative sm:border-x sm:border-[#B89B62]/40 overflow-x-hidden flex flex-col">
        {/* 1. Opening Cover Experience */}
        <PassportOpening
          groomName={groomName}
          brideName={brideName}
          eventDate={wedding.event_date}
          guestName={guestName}
          onOpenPassport={handleOpenPassport}
          onToggleMusic={handleToggleMusic}
          isMusicPlaying={isMusicPlaying}
        />

        {/* 2. Passport Dual Bio Profile */}
        <PassportProfile
          groomName={groomName}
          brideName={brideName}
          groomImage={imagesList[0]}
          brideImage={imagesList[1] || imagesList[0]}
          eventDate={wedding.event_date}
        />

        {/* 3. Interactive Love Journey Map */}
        <JourneyMap />

        {/* 4. Interactive Scratch Postcard */}
        <ScratchPostcard secretImage={imagesList[2] || imagesList[0]} />

        {/* 5. Wedding Destination & Flight Board */}
        <WeddingDestination
          eventDate={wedding.event_date}
          groomFamily={wedding.location_info?.groom_family}
          brideFamily={wedding.location_info?.bride_family}
        />

        {/* 6. Check-In RSVP Form */}
        <CheckInRSVP weddingId={wedding.id} defaultGuestName={guestName} />

        {/* 7. Boarding Pass */}
        <BoardingPass
          groomName={groomName}
          brideName={brideName}
          guestName={guestName || "Quý Khách"}
          eventDate={wedding.event_date}
          timeStr={wedding.location_info?.groom_family?.time || "11:00 AM"}
          address={wedding.location_info?.groom_family?.address}
          mapUrl={wedding.location_info?.groom_family?.map_url}
          isAttending={true}
        />

        {/* 8. Luggage & Stamp Photo Gallery */}
        <TravelPhotoGallery images={imagesList} />

        {/* 9. Guestbook Stamp Wall */}
        <GuestStampWall
          weddingId={wedding.id}
          wishes={wishes}
          isMusicPlaying={isMusicPlaying}
        />

        {/* 10. Final Passport Destination */}
        <FinalDestination
          groomName={groomName}
          brideName={brideName}
          eventDate={wedding.event_date}
          finalImage={imagesList[0]}
        />

        {/* Floating Audio Control (Positioned relative to mobile frame on desktop) */}
        <PassportMusicPlayer
          musicUrl={wedding.music_url || "/thiepmaudovang/audio/bg-music.mp3"}
          autoPlayRequested={autoPlayRequested}
        />
      </div>
    </div>
  );
}
