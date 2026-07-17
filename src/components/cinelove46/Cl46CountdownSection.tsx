"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "./motion-presets";

interface Cl46CountdownSectionProps {
  wedding?: any;
}

export default function Cl46CountdownSection({ wedding }: Cl46CountdownSectionProps) {
  const targetDateStr = wedding?.event_date || "2025-12-06T12:00:00";

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDateStr).getTime();

    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="w-full overflow-hidden border-b border-[#e8e2d8] relative">

      {/* Full-width background image with cinematic overlay */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <Image
          src="/thiepmaudovang/images/cover.jpg"
          alt="Countdown backdrop"
          fill
          priority
          sizes="420px"
          className="object-cover object-center"
        />
        {/* Cinematic left-leaning gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(26,20,16,0.88) 0%, rgba(26,20,16,0.65) 45%, rgba(26,20,16,0.2) 75%, transparent 100%)" }}
        />

        {/* Vertical text mark */}
        <div className="absolute left-4 bottom-6 text-[#fdfcf7]/25 font-serif-display font-light uppercase tracking-[5px] text-[13px] [writing-mode:vertical-lr] select-none z-10">
          LOVE ALWAYS
        </div>

        {/* Film-frame marks on photo */}
        <div className="film-frame absolute inset-0 pointer-events-none z-20" />

        {/* Section content — layered on photo */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 z-10">

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <p className="section-label text-[#c5a880]/80 mb-1">COUNTDOWN</p>
            <p
              className="font-script-accent text-[38px] text-[#fdfcf7]"
              style={{ fontStyle: "normal" }}
            >
              Đếm ngược ngày cưới
            </p>
          </motion.div>

          {/* Editorial numeral row — no boxes */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex items-start gap-1"
          >
            {/* Days */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <span className="countdown-numeral">
                {isMounted ? pad(timeLeft.days) : "--"}
              </span>
              <span className="countdown-label">Ngày</span>
            </motion.div>

            <span className="countdown-sep">·</span>

            {/* Hours */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <span className="countdown-numeral">
                {isMounted ? pad(timeLeft.hours) : "--"}
              </span>
              <span className="countdown-label">Giờ</span>
            </motion.div>

            <span className="countdown-sep">·</span>

            {/* Minutes */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <span className="countdown-numeral">
                {isMounted ? pad(timeLeft.minutes) : "--"}
              </span>
              <span className="countdown-label">Phút</span>
            </motion.div>

            <span className="countdown-sep">·</span>

            {/* Seconds */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <span className="countdown-numeral">
                {isMounted ? pad(timeLeft.seconds) : "--"}
              </span>
              <span className="countdown-label">Giây</span>
            </motion.div>
          </motion.div>

          {/* Gold contour line below numerals */}
          <div className="contour-line mt-8" style={{ width: "75%" }} />
        </div>
      </div>
    </section>
  );
}
