"use client";

import React, { useState } from "react";
import { Wedding, Wish } from "@/types";

import Section1Keys from "@/components/template9/Section1Keys";
import Section2Foundation from "@/components/template9/Section2Foundation";
import Section3Door from "@/components/template9/Section3Door";
import Section4LivingRoom from "@/components/template9/Section4LivingRoom";
import Section5Window from "@/components/template9/Section5Window";
import Section6Table from "@/components/template9/Section6Table";
import Section7Clock from "@/components/template9/Section7Clock";
import Section8Guestbook from "@/components/template9/Section8Guestbook";
import Section9Light from "@/components/template9/Section9Light";
import Section10Home from "@/components/template9/Section10Home";
import HouseMusicPlayer from "@/components/template9/HouseMusicPlayer";

interface Template9Props {
  wedding: Wedding;
  to?: string;
  wishes?: Wish[];
}

export default function Template9({ wedding, to = "", wishes = [] }: Template9Props) {
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  const groomName = wedding.groom_name || "Chú Rể";
  const brideName = wedding.bride_name || "Cô Dâu";

  const coverImage = wedding.images && wedding.images.length > 0 ? wedding.images[0] : undefined;

  const handleOpenDoor = () => {
    setIsDoorOpen(true);
  };

  const handleScrollToGuestbook = () => {
    const el = document.getElementById("guestbook");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReplay = () => {
    setIsDoorOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen bg-[#F3EFE7] text-[#49372F] font-sans antialiased overflow-x-hidden selection:bg-[#A55D43] selection:text-[#F3EFE7]">
      {/* Floating Music Player */}
      <HouseMusicPlayer musicUrl={wedding.music_url} autoPlayTriggered={isDoorOpen} />

      {/* Guest Personalization Banner (if 'to' parameter is present) */}
      {to && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-[#49372F] text-[#F3EFE7] text-xs font-sans py-2 px-4 text-center tracking-wider border-b border-[#D8CABB]/30 flex justify-center items-center gap-2">
          <span className="font-handwriting text-sm text-[#E2B96F]">Trân trọng kính mời:</span>
          <span className="font-semibold uppercase text-[#E2B96F]">{to}</span>
        </div>
      )}

      {/* Section 1: The Keys */}
      <Section1Keys
        groomName={groomName}
        brideName={brideName}
        onOpenDoor={handleOpenDoor}
        isOpen={isDoorOpen}
      />

      {/* Narrative House Sections (Revealed & Accessible) */}
      <div className={`transition-opacity duration-1000 ${isDoorOpen ? "opacity-100 pointer-events-auto" : "opacity-90"}`}>
        {/* Section 2: The Foundation */}
        <Section2Foundation />

        {/* Section 3: The Door */}
        <Section3Door coverImage={coverImage} meetingDate={wedding.location_info?.groom_family?.date} />

        {/* Section 4: The Living Room */}
        <Section4LivingRoom images={wedding.images} />

        {/* Section 5: The Window */}
        <Section5Window windowImage={wedding.images?.[4] || coverImage} />

        {/* Section 6: The Table */}
        <Section6Table wedding={wedding} onScrollToGuestbook={handleScrollToGuestbook} />

        {/* Section 7: The Clock */}
        <Section7Clock eventDate={wedding.event_date} />

        {/* Section 8: The Guestbook */}
        <Section8Guestbook weddingId={wedding.id} wishes={wishes} />

        {/* Section 9: The Light */}
        <Section9Light />

        {/* Section 10: The Home */}
        <Section10Home
          groomName={groomName}
          brideName={brideName}
          weddingDate={wedding.event_date}
          onReplay={handleReplay}
        />
      </div>
    </main>
  );
}
