"use client";

import { useEffect, useRef, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { ScrollReveal } from "./ScrollReveal";

interface CountdownProps {
  weddingDate: string;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 200);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[72px] h-[72px] md:w-[90px] md:h-[90px] border border-[#F5F0E8]/10 rounded-sm flex items-center justify-center relative overflow-hidden">
        <span
          className={`font-[family-name:var(--font-cormorant-garamond)] text-4xl md:text-5xl font-light text-[#F5F0E8] tabular-nums transition-all duration-300 ${
            isFlipping ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          {String(displayValue).padStart(2, "0")}
        </span>
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 mt-3">
        {label}
      </p>
    </div>
  );
}

export function Countdown({ weddingDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(weddingDate);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-xl mx-auto text-center">
        <ScrollReveal>
          <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60 mb-10">
            {isPast ? "— Kỷ niệm —" : "— Đếm ngược —"}
          </p>
        </ScrollReveal>

        {isPast ? (
          <ScrollReveal direction="up" delay={0.2} blur>
            <div className="space-y-4">
              <p
                className="font-[family-name:var(--font-cormorant-garamond)] font-light text-[#F5F0E8] leading-relaxed"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                Chúng tôi đã chính thức
              </p>
              <p
                className="font-[family-name:var(--font-alexbrush)] text-[#D4AF72]"
                style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
              >
                bên nhau trọn đời
              </p>
              <svg
                className="w-6 h-6 mx-auto mt-6 text-[#D4AF72] animate-heart-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </ScrollReveal>
        ) : (
          <>
            <ScrollReveal direction="up" delay={0.15}>
              <h2
                className="font-[family-name:var(--font-cormorant-garamond)] font-light text-[#F5F0E8] mb-12"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                Đếm ngược đến ngày trọng đại
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex justify-center gap-3 md:gap-5">
                <CountdownUnit value={days} label="Ngày" />
                <CountdownUnit value={hours} label="Giờ" />
                <CountdownUnit value={minutes} label="Phút" />
                <CountdownUnit value={seconds} label="Giây" />
              </div>
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
}
