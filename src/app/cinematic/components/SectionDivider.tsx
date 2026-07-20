"use client";

import { ScrollReveal } from "./ScrollReveal";

interface SectionDividerProps {
  className?: string;
  ornament?: boolean;
}

export function SectionDivider({ className = "", ornament = true }: SectionDividerProps) {
  return (
    <ScrollReveal className={`py-12 md:py-16 flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-4 w-full max-w-xs mx-auto">
        <div className="ornament-line flex-1" />
        {ornament && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-[#D4AF72] flex-shrink-0"
          >
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
              fill="currentColor"
            />
          </svg>
        )}
        <div className="ornament-line flex-1" />
      </div>
    </ScrollReveal>
  );
}
