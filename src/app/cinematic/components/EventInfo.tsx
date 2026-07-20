"use client";

import { ScrollReveal } from "./ScrollReveal";
import type { VenueInfo } from "../data/types";
import { formatLongDate, formatTime } from "../utils/date";

interface EventInfoProps {
  weddingDate: string;
  lunarDate: string;
  venue: VenueInfo;
}

export function EventInfo({ weddingDate, lunarDate, venue }: EventInfoProps) {
  const formattedDate = formatLongDate(weddingDate);
  const formattedTime = formatTime(weddingDate);

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60 mb-6">
            — Thông tin —
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant-garamond)] font-light text-[#F5F0E8]"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Tiệc Cưới
          </h2>
        </ScrollReveal>

        {/* Event card */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="glass rounded-lg p-8 md:p-10 space-y-6">
            {/* Date & Time */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg
                  className="w-4 h-4 text-[#D4AF72]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <p className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#F5F0E8] capitalize">
                  {formattedDate}
                </p>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]/50 italic">
                ({lunarDate})
              </p>
            </div>

            {/* Divider */}
            <div className="ornament-line w-full" />

            {/* Time */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="w-4 h-4 text-[#D4AF72]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#F5F0E8]">
                  {formattedTime}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="ornament-line w-full" />

            {/* Venue */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="w-4 h-4 text-[#D4AF72] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#F5F0E8]">
                  {venue.name}
                </p>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]/50">
                {venue.address}
              </p>
            </div>

            {/* Dress code */}
            {venue.dressCode && (
              <>
                <div className="ornament-line w-full" />
                <div className="text-center">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#D4AF72]/60 mb-2">
                    Trang phục
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]/60">
                    {venue.dressCode}
                  </p>
                </div>
              </>
            )}

            {/* Map button */}
            <div className="pt-2">
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-[#D4AF72]/30 rounded-sm text-[#D4AF72] font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#D4AF72]/10 hover:border-[#D4AF72]/50 active:scale-[0.98]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Xem đường đi
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
