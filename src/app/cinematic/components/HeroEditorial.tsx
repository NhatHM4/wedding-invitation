"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

interface HeroEditorialProps {
  heroImage: string;
  groomShortName: string;
  brideShortName: string;
}

export function HeroEditorial({ heroImage, groomShortName, brideShortName }: HeroEditorialProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const words = ["FALL", "IN", "LOVE"];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col md:flex-row items-center overflow-hidden py-16 md:py-0"
    >
      {/* Typography Side */}
      <div className="relative z-10 w-full md:w-[45%] flex flex-col justify-center px-6 md:px-12 lg:px-20 order-2 md:order-1 mt-8 md:mt-0">
        <motion.div style={{ y: textY }}>
          {words.map((word, i) => (
            <ScrollReveal
              key={word}
              direction="up"
              delay={0.15 * i}
              duration={1}
              className="overflow-hidden"
            >
              <h2
                className="font-[family-name:var(--font-cormorant-garamond)] font-light leading-[0.9] tracking-tight"
                style={{
                  fontSize: "clamp(3.5rem, 12vw, 9rem)",
                  color: i === 2 ? "#D4AF72" : "#F5F0E8",
                }}
              >
                {word}
              </h2>
            </ScrollReveal>
          ))}

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.6} className="mt-6 md:mt-10">
            <p className="font-[family-name:var(--font-inter)] text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#F5F0E8]/40">
              {groomShortName} & {brideShortName} — 2026
            </p>
          </ScrollReveal>
        </motion.div>
      </div>

      {/* Image Side */}
      <div className="relative w-full md:w-[55%] h-[60vh] md:h-screen order-1 md:order-2">
        <motion.div className="relative w-full h-full" style={{ y: imageY }}>
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={heroImage}
              alt="Wedding hero photo"
              fill
              className="object-cover scale-110"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
            {/* Dark edge vignette */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1a1a1a]/60 md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:hidden" />
          </div>
        </motion.div>

        {/* Floating script text over image */}
        <ScrollReveal
          direction="none"
          delay={0.8}
          duration={1.2}
          className="absolute bottom-12 right-6 md:bottom-20 md:right-12 z-10"
        >
          <p
            className="font-[family-name:var(--font-alexbrush)] text-[#D4AF72]/60 rotate-[-8deg]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Our Wedding
          </p>
        </ScrollReveal>
      </div>

      {/* Vertical text accent — desktop only */}
      <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20">
        <p
          className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#F5F0E8]/20"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          You are the love of my life
        </p>
      </div>
    </section>
  );
}
