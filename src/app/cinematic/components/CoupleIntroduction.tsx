"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

interface CoupleIntroductionProps {
  groomName: string;
  brideName: string;
  groomImage: string;
  brideImage: string;
}

export function CoupleIntroduction({
  groomName,
  brideName,
  groomImage,
  brideImage,
}: CoupleIntroductionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-30, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [30, 0]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-0">
      {/* Section header */}
      <ScrollReveal className="text-center mb-10 md:mb-0 md:absolute md:top-12 md:left-1/2 md:-translate-x-1/2 md:z-30 px-6">
        <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60">
          — Cô dâu & Chú rể —
        </p>
      </ScrollReveal>

      <div className="flex flex-col md:flex-row md:min-h-screen relative">
        {/* Groom Side */}
        <motion.div
          className="relative w-full md:w-1/2 h-[70vh] md:h-screen overflow-hidden"
          style={{ x: leftX }}
        >
          <Image
            src={groomImage}
            alt={`Chú rể ${groomName}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />

          {/* Name & role */}
          <div className="absolute bottom-10 left-6 md:left-10 z-10">
            <ScrollReveal direction="up" delay={0.2}>
              <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.35em] text-[#D4AF72] mb-2">
                Chú rể
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.35}>
              <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl md:text-4xl lg:text-5xl font-light text-[#F5F0E8]">
                {groomName}
              </h3>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.5}>
              <p className="font-[family-name:var(--font-alexbrush)] text-2xl md:text-3xl text-[#F5F0E8]/30 mt-2">
                {groomName.split(" ").pop()}
              </p>
            </ScrollReveal>
          </div>
        </motion.div>

        {/* Center Ampersand — desktop only */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <ScrollReveal direction="none" delay={0.6}>
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#D4AF72]/30 flex items-center justify-center">
              <span className="font-[family-name:var(--font-alexbrush)] text-3xl text-[#D4AF72]">
                &
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile Ampersand */}
        <div className="flex md:hidden justify-center -my-5 relative z-20">
          <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#D4AF72]/30 flex items-center justify-center">
            <span className="font-[family-name:var(--font-alexbrush)] text-2xl text-[#D4AF72]">
              &
            </span>
          </div>
        </div>

        {/* Bride Side */}
        <motion.div
          className="relative w-full md:w-1/2 h-[70vh] md:h-screen overflow-hidden"
          style={{ x: rightX }}
        >
          <Image
            src={brideImage}
            alt={`Cô dâu ${brideName}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />

          {/* Name & role */}
          <div className="absolute bottom-10 right-6 md:right-10 z-10 text-right">
            <ScrollReveal direction="up" delay={0.3}>
              <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.35em] text-[#D4AF72] mb-2">
                Cô dâu
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.45}>
              <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl md:text-4xl lg:text-5xl font-light text-[#F5F0E8]">
                {brideName}
              </h3>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.6}>
              <p className="font-[family-name:var(--font-alexbrush)] text-2xl md:text-3xl text-[#F5F0E8]/30 mt-2">
                {brideName.split(" ").pop()}
              </p>
            </ScrollReveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
