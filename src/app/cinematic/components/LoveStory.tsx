"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import type { LoveStoryMilestone } from "../data/types";
import { formatStoryDate } from "../utils/date";

interface LoveStoryProps {
  milestones: LoveStoryMilestone[];
}

function StoryScene({
  milestone,
  index,
}: {
  milestone: LoveStoryMilestone;
  index: number;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const formattedDate = formatStoryDate(milestone.date);

  const isEven = index % 2 === 0;

  return (
    <div ref={sceneRef} className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src={milestone.image}
          alt={milestone.title}
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/70 to-[#1a1a1a]/80" />

      {/* Content */}
      <div
        className={`relative z-10 w-full px-6 md:px-16 lg:px-24 py-20 flex flex-col ${
          isEven ? "items-start text-left" : "items-end text-right"
        }`}
      >
        {/* Chapter number */}
        <ScrollReveal direction="up" delay={0.1}>
          <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.4em] text-[#D4AF72]/50 mb-4">
            Chương {String(index + 1).padStart(2, "0")}
          </p>
        </ScrollReveal>

        {/* Date */}
        <ScrollReveal direction="up" delay={0.2}>
          <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-[#F5F0E8]/40 mb-4">
            {formattedDate}
          </p>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal direction="up" delay={0.35} blur>
          <h3
            className="font-[family-name:var(--font-cormorant-garamond)] font-light text-[#F5F0E8] leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            {milestone.title}
          </h3>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal direction="up" delay={0.5} blur>
          <p className="font-[family-name:var(--font-cormorant-garamond)] italic text-base md:text-lg text-[#F5F0E8]/60 max-w-md leading-relaxed">
            {milestone.description}
          </p>
        </ScrollReveal>

        {/* Decorative line */}
        <ScrollReveal direction={isEven ? "left" : "right"} delay={0.65}>
          <div className="w-16 h-px bg-[#D4AF72]/40 mt-8" />
        </ScrollReveal>
      </div>
    </div>
  );
}

export function LoveStory({ milestones }: LoveStoryProps) {
  return (
    <section className="relative">
      {/* Section header */}
      <div className="py-16 md:py-24 text-center px-6">
        <ScrollReveal>
          <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60 mb-6">
            — Câu chuyện tình yêu —
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2
            className="font-[family-name:var(--font-cormorant-garamond)] font-light text-[#F5F0E8]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Our Love Story
          </h2>
        </ScrollReveal>
      </div>

      {/* Story scenes */}
      {milestones.map((milestone, index) => (
        <StoryScene key={milestone.date} milestone={milestone} index={index} />
      ))}
    </section>
  );
}
