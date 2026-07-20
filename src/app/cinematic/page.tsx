"use client";

import { useState, useCallback, useEffect } from "react";
import { weddingData } from "./data/wedding-data";
import { OpeningCover } from "./components/OpeningCover";
import { MusicController } from "./components/MusicController";
import { HeroEditorial } from "./components/HeroEditorial";
import { InvitationMessage } from "./components/InvitationMessage";
import { CoupleIntroduction } from "./components/CoupleIntroduction";
import { LoveStory } from "./components/LoveStory";
import { Countdown } from "./components/Countdown";
import { PhotoExperience } from "./components/PhotoExperience";
import { WeddingCalendar } from "./components/WeddingCalendar";
import { EventInfo } from "./components/EventInfo";
import { GiftBox } from "./components/GiftBox";
import { RSVPForm } from "./components/RSVPForm";
import { Footer } from "./components/Footer";
import { SectionDivider } from "./components/SectionDivider";

export default function CinematicPage() {
  const [isOpened, setIsOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "");
    }
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
    // Attempt to play music after user interaction
    setIsMusicPlaying(true);
  }, []);

  const handleMusicToggle = useCallback((playing: boolean) => {
    setIsMusicPlaying(playing);
  }, []);

  return (
    <>
      {/* Opening Cover */}
      {!isOpened && (
        <OpeningCover
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          weddingDate={weddingData.weddingDate}
          coverImage={weddingData.images.cover}
          onOpen={handleOpen}
          to={to}
        />
      )}

      {/* Music Controller — only show after opening */}
      {isOpened && (
        <MusicController
          musicSrc={weddingData.music}
          isPlaying={isMusicPlaying}
          onToggle={handleMusicToggle}
        />
      )}

      {/* Main Content */}
      <main
        className={`transition-opacity duration-1000 ${
          isOpened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Section 3: Hero Editorial */}
        <HeroEditorial
          heroImage={weddingData.images.hero}
          groomShortName={weddingData.groom.shortName}
          brideShortName={weddingData.bride.shortName}
        />

        <SectionDivider />

        {/* Section 4: Invitation Message */}
        <InvitationMessage
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          weddingDate={weddingData.weddingDate}
          to={to}
        />

        <SectionDivider />

        {/* Section 5: Couple Introduction */}
        <CoupleIntroduction
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          groomImage={weddingData.images.groom}
          brideImage={weddingData.images.bride}
        />

        <SectionDivider />

        {/* Section 6: Love Story */}
        <LoveStory milestones={weddingData.loveStory} />

        <SectionDivider />

        {/* Section 7: Countdown */}
        <Countdown weddingDate={weddingData.weddingDate} />

        <SectionDivider />

        {/* Section 8: Photo Gallery */}
        <PhotoExperience images={weddingData.images.gallery} />

        <SectionDivider />

        {/* Section 9: Wedding Calendar */}
        <WeddingCalendar weddingDate={weddingData.weddingDate} />

        <SectionDivider />

        {/* Section 10: Event Information */}
        <EventInfo
          weddingDate={weddingData.weddingDate}
          lunarDate={weddingData.lunarDate}
          venue={weddingData.venue}
        />

        <SectionDivider />

        {/* Section 11: Gift Box */}
        <GiftBox giftInfo={weddingData.giftInfo} />

        <SectionDivider />

        {/* Section 12: RSVP Form */}
        <RSVPForm guestName={to} />

        {/* Section 13: Footer */}
        <Footer
          groomShortName={weddingData.groom.shortName}
          brideShortName={weddingData.bride.shortName}
          weddingDate={weddingData.weddingDate}
        />
      </main>
    </>
  );
}
