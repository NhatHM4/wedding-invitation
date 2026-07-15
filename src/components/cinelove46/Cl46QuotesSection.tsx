"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "./motion-presets";

const block1Images = [
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
  "/thiepmaudovang/images/gallery-4.jpg",
  "/thiepmaudovang/images/gallery-5.jpg",
  "/thiepmaudovang/images/gallery-6.jpg"
];

export default function Cl46QuotesSection() {
  return (
    <section className="w-full px-5 py-8 bg-[#fdfcf7] flex flex-col gap-8 overflow-hidden border-b border-[#e8e2d8]">
      {/* Quote Block 1: Side-by-side vertical split */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="w-full flex items-stretch gap-3"
      >
        {/* Left image */}
        <div className="relative w-1/2 aspect-[3/4] border border-[#e8e2d8] rounded overflow-hidden shadow-sm bg-white p-1">
          <div className="relative w-full h-full rounded-sm overflow-hidden">
            <Image
              src={block1Images[0]}
              alt="Wedding portrait"
              fill
              sizes="190px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Quote card with dark red background */}
        <div className="w-1/2 bg-gradient-to-b from-[#5c161e] to-[#420f14] rounded p-4 text-white flex flex-col justify-between shadow-sm relative">
          <div className="absolute inset-1.5 border border-[#c5a880]/20 pointer-events-none rounded-sm" />
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm mb-3 z-10 p-0.5 bg-white/10">
            <Image
              src={block1Images[1]}
              alt="Wedding portrait mini"
              fill
              sizes="150px"
              className="object-cover rounded-sm"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center z-10 pl-1">
            <p className="font-sans-clean text-[9.5px] uppercase tracking-[2px] text-[#c5a880] font-bold mb-1.5">
              Dear Love
            </p>
            <h4 className="font-serif-display text-[15px] font-bold italic tracking-wide leading-snug text-[#fdfcf7]">
              I love you all I can
            </h4>
          </div>
        </div>
      </motion.div>

      {/* English small quote row */}
      <div className="w-full flex items-center gap-3 py-1">
        <div className="flex-1 border-t border-[#e8e2d8]" />
        <p className="font-serif-display text-[12.5px] italic text-[#6b645f] max-w-[280px] text-center leading-relaxed font-light">
          "If I know what love is, it is because of you."
        </p>
        <div className="flex-1 border-t border-[#e8e2d8]" />
      </div>

      {/* Quote Block 2: Vietnamese quotation section header */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="w-full bg-[#fdfcf7] border border-[#e8e2d8] rounded p-6 text-center flex flex-col items-center shadow-sm relative"
      >
        <div className="absolute inset-1.5 border border-[#c5a880]/20 pointer-events-none rounded-sm" />
        <span className="text-xl text-[#c5a880] z-10">❝</span>
        <p className="font-serif-display text-[14.5px] tracking-wide leading-relaxed text-[#5c161e] text-center italic max-w-[320px] z-10 font-medium">
          Hôn nhân là chuyện cả đời.
          <br />
          Yêu người vừa ý, Cưới người Mình thương.
        </p>
        <span className="text-xl text-[#c5a880] mt-1.5 z-10">❞</span>
      </motion.div>

      {/* Cinematic asymmetrical photo grid */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-2 gap-4 items-start"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <motion.div
            variants={fadeInUp}
            className="relative w-full aspect-[3/4] border border-[#e8e2d8] rounded overflow-hidden shadow-sm bg-white p-1"
          >
            <div className="relative w-full h-full rounded-sm overflow-hidden">
              <Image
                src={block1Images[2]}
                alt="Couples gallery 2"
                fill
                sizes="180px"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="relative w-full aspect-square border border-[#e8e2d8] rounded overflow-hidden shadow-sm bg-white p-1"
          >
            <div className="relative w-full h-full rounded-sm overflow-hidden">
              <Image
                src={block1Images[4]}
                alt="Couples gallery 4"
                fill
                sizes="180px"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column with vertical stagger offset */}
        <div className="flex flex-col gap-4 pt-6">
          <motion.div
            variants={fadeInUp}
            className="relative w-full aspect-square border border-[#e8e2d8] rounded overflow-hidden shadow-sm bg-white p-1"
          >
            <div className="relative w-full h-full rounded-sm overflow-hidden">
              <Image
                src={block1Images[3]}
                alt="Couples gallery 3"
                fill
                sizes="180px"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="relative w-full aspect-[3/4] border border-[#e8e2d8] rounded overflow-hidden shadow-sm bg-white p-1"
          >
            <div className="relative w-full h-full rounded-sm overflow-hidden">
              <Image
                src={block1Images[5]}
                alt="Couples gallery 5"
                fill
                sizes="180px"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* With You Quote row */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="w-full text-center py-6 relative flex flex-col items-center"
      >
        <span className="font-sans-clean text-[9px] tracking-[3px] text-[#6b645f] uppercase font-bold">
          OUR ETERNAL LOVE
        </span>
        <h3 className="font-serif-display text-[26px] tracking-[6px] text-[#5c161e] uppercase font-light mt-1">
          WITH YOU
        </h3>
        <div className="w-12 h-[0.5px] bg-[#c5a880] my-3" />
        <p className="font-serif-display text-[13px] text-[#6b645f] italic max-w-[280px] leading-relaxed select-none">
          Every moment of each day, loving and missing you dominates every inch of my brain.
        </p>
      </motion.div>

      {/* Bottom Quote Banner */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="w-full bg-[#faf6f0] border border-[#e8e2d8] rounded p-5 text-center shadow-sm flex flex-col items-center relative"
      >
        <div className="absolute inset-1 border border-[#c5a880]/15 pointer-events-none rounded-sm" />
        <p className="font-serif-display text-[13.5px] italic tracking-wide text-[#5c161e] font-medium z-10">
          "You make me want to be a better man."
        </p>
        <p className="font-sans-clean text-[9px] text-[#6b645f] uppercase tracking-[1.5px] mt-3 font-semibold z-10">
          Em khiến anh muốn trở thành phiên bản tốt nhất của chính mình.
        </p>
      </motion.div>
    </section>
  );
}
