"use client";

import { ScrollReveal } from "./ScrollReveal";
import { formatShortDate } from "../utils/date";

interface FooterProps {
  groomShortName: string;
  brideShortName: string;
  weddingDate: string;
}

export function Footer({ groomShortName, brideShortName, weddingDate }: FooterProps) {
  const formatted = formatShortDate(weddingDate);

  return (
    <footer className="py-16 md:py-20 px-6 border-t border-[#F5F0E8]/5">
      <div className="max-w-md mx-auto text-center">
        <ScrollReveal>
          <p className="font-[family-name:var(--font-alexbrush)] text-[#D4AF72]/40 text-xl mb-4">
            Thank you
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#F5F0E8]/70">
              {groomShortName}
            </span>
            <svg
              className="w-4 h-4 text-[#D4AF72]/50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-[family-name:var(--font-cormorant-garamond)] text-lg text-[#F5F0E8]/70">
              {brideShortName}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/25">
            {formatted}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45} className="mt-8">
          <p className="font-[family-name:var(--font-inter)] text-[10px] text-[#F5F0E8]/15">
            Made with ❤️
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
