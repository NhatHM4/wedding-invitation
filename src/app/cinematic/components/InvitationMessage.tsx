"use client";

import { ScrollReveal } from "./ScrollReveal";
import { formatLongDate } from "../utils/date";

interface InvitationMessageProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  to?: string;
}

export function InvitationMessage({ groomName, brideName, weddingDate, to = "" }: InvitationMessageProps) {
  const formattedDate = formatLongDate(weddingDate);

  const lines = [
    "Trân trọng kính mời",
    to ? to : "quý khách",
    "đến dự buổi tiệc chung vui",
    "nhân ngày lễ thành hôn của chúng tôi",
    `${groomName} & ${brideName}`,
    `Vào ${formattedDate}`,
  ];

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative top element */}
        <ScrollReveal delay={0}>
          <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60 mb-12">
            — Thiệp mời —
          </p>
        </ScrollReveal>

        {/* Vietnamese invitation — line by line */}
        <div className="space-y-3 md:space-y-4">
          {lines.map((line, i) => (
            <ScrollReveal key={i} direction="up" delay={0.12 * (i + 1)} blur>
              <p
                className={`font-[family-name:var(--font-cormorant-garamond)] leading-relaxed ${
                  i === 4
                    ? "text-2xl md:text-3xl text-[#D4AF72] font-medium mt-6 mb-6"
                    : i === 5
                    ? "text-base md:text-lg text-[#F5F0E8]/60 italic"
                    : i === 1 && to
                    ? "text-xl md:text-2xl text-[#D4AF72] font-semibold tracking-wide"
                    : "text-lg md:text-xl text-[#F5F0E8]/80 italic"
                }`}
              >
                {line}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Decorative line */}
        <ScrollReveal delay={0.8} className="mt-14 mb-14">
          <div className="ornament-line w-full max-w-[200px] mx-auto" />
        </ScrollReveal>

        {/* English quote */}
        <ScrollReveal direction="up" delay={0.9} blur>
          <p
            className="font-[family-name:var(--font-alexbrush)] text-[#F5F0E8]/30 leading-relaxed"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            &ldquo;Two souls, one heart&rdquo;
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
