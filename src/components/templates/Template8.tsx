"use client";

import React from "react";
import { Wedding, Wish } from "@/types";
import HeroSection from "../template8/HeroSection";
import GroomBrideProfiles from "../template8/GroomBrideProfiles";
import CountdownSection from "../template8/CountdownSection";
import EventLocationDetails from "../template8/EventLocationDetails";
import RSVPFormSection from "../template8/RSVPFormSection";
import LoveStoryTimeline from "../template8/LoveStoryTimeline";
import GiftBoxSection from "../template8/GiftBoxSection";
import PhotoGallerySection from "../template8/PhotoGallerySection";
import WishesSection from "../template8/WishesSection";
import MusicPlayerFloating from "../template8/MusicPlayerFloating";
import FloatingHearts from "@/components/common/FloatingHearts";
import { Heart } from "lucide-react";

interface Template8Props {
  wedding: Wedding;
  to?: string;
  wishes?: Wish[];
}

export default function Template8({ wedding, to, wishes = [] }: Template8Props) {
  return (
    <main className="min-h-screen bg-[#FDF8F5] text-gray-800 font-sans selection:bg-rose-200 selection:text-rose-900 relative">
      {/* Gentle Floating Hearts */}
      <FloatingHearts />

      {/* Floating Music Player */}
      <MusicPlayerFloating musicUrl={wedding.music_url} />

      {/* 1. Hero Section */}
      <HeroSection wedding={wedding} to={to} />

      {/* 2. Groom & Bride Profiles */}
      <GroomBrideProfiles wedding={wedding} />

      {/* 3. Countdown Section */}
      <CountdownSection wedding={wedding} />

      {/* 4. Event & Location Details */}
      <EventLocationDetails wedding={wedding} />

      {/* 5. Love Story Timeline */}
      <LoveStoryTimeline wedding={wedding} />

      {/* 6. Photo Gallery */}
      <PhotoGallerySection wedding={wedding} />

      {/* 7. RSVP Form */}
      <RSVPFormSection weddingId={wedding.id} />

      {/* 8. Gift Box / Bank Transfer */}
      <GiftBoxSection wedding={wedding} />

      {/* 9. Wishes / Guestbook */}
      <WishesSection wishes={wishes} weddingId={wedding.id} />

      {/* Footer Thank You Banner */}
      <footer className="py-16 px-4 bg-gradient-to-b from-[#FFF5F2] to-rose-950 text-center text-white relative overflow-hidden">
        <div className="max-w-md mx-auto space-y-4">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mx-auto animate-bounce" />
          <h3 className="font-serif text-3xl sm:text-4xl text-rose-100">
            THANK YOU!
          </h3>
          <p className="text-xs text-rose-200 tracking-widest leading-relaxed">
            CẢM ƠN BẠN ĐÃ LÀ MỘT PHẦN TRONG NGÀY HẠNH PHÚC CỦA CHÚNG TÔI
          </p>
          <div className="w-12 h-[1px] bg-rose-400/50 mx-auto my-4" />
          <p className="text-rose-300">
            <span className="font-artistic-name block text-lg leading-tight">{wedding.groom_name} &amp; {wedding.bride_name}</span>
            <span className="block mt-1 text-[10px] tracking-[0.2em]">16.11.2025</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
