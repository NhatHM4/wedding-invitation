"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, editorialSlide } from "./motion-presets";

const galleryImages = [
  "/thiepmaudovang/images/gallery-1.jpg",
  "/thiepmaudovang/images/gallery-2.jpg",
  "/thiepmaudovang/images/gallery-3.jpg",
  "/thiepmaudovang/images/gallery-4.jpg",
  "/thiepmaudovang/images/gallery-5.jpg",
  "/thiepmaudovang/images/gallery-6.jpg"
];

export default function Cl46QuotesSection() {
  return (
    <section className="w-full px-5 py-10 bg-[#fdfcf7] flex flex-col gap-8 overflow-hidden border-b border-[#e8e2d8]">

      {/* ── Block 1: Portrait + Dark quote card ── */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        className="w-full flex items-stretch gap-3"
      >
        {/* Left portrait — no white border, film-frame marks */}
        <motion.div
          variants={editorialSlide}
          className="relative w-1/2 aspect-[3/4] overflow-hidden shadow-md film-frame flex-shrink-0"
        >
          <Image
            src={galleryImages[0]}
            alt="Wedding portrait"
            fill
            sizes="190px"
            className="object-cover object-top hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Right quote card — burgundy */}
        <motion.div
          variants={fadeInUp}
          className="w-1/2 rounded-sm p-4 text-white flex flex-col justify-between shadow-md relative overflow-hidden film-frame-inner"
          style={{ background: "linear-gradient(165deg, #5c161e 0%, #420f14 55%, #2a0a0d 100%)" }}
        >
          <div className="absolute inset-1.5 border border-[#c5a880]/15 pointer-events-none" />
          <div className="relative w-full aspect-[4/3] overflow-hidden mb-3 z-10">
            <Image
              src={galleryImages[1]}
              alt="Wedding portrait mini"
              fill
              sizes="150px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center z-10">
            <p className="font-sans-clean text-[8.5px] uppercase tracking-[2px] text-[#c5a880] font-bold mb-1.5">
              Dear Love
            </p>
            <h4 className="font-serif-display text-[15px] font-medium italic tracking-wide leading-snug text-[#fdfcf7]">
              I love you all I can
            </h4>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Italic english quote ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="w-full flex items-center gap-3 py-1"
      >
        <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent to-[#e8e2d8]" />
        <p className="font-serif-display text-[13px] italic text-[#6b645f] max-w-[250px] text-center leading-relaxed font-light">
          &ldquo;If I know what love is,<br />it is because of you.&rdquo;
        </p>
        <div className="flex-1 h-[0.5px] bg-gradient-to-l from-transparent to-[#e8e2d8]" />
      </motion.div>

      {/* ── Vietnamese quotation — left-aligned, asymmetric ── */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={editorialSlide}
        className="w-full flex items-start gap-4"
      >
        {/* Quote text — left anchored */}
        <div className="flex-1">
          <span className="text-[22px] text-[#c5a880] leading-none block mb-1">❝</span>
          <p className="font-serif-display text-[15px] tracking-wide leading-relaxed text-[#5c161e] italic font-medium">
            Hôn nhân là chuyện cả đời.
            <br />
            Yêu người vừa ý, Cưới người Mình thương.
          </p>
          <span className="text-[16px] text-[#c5a880] leading-none block mt-1">❞</span>
        </div>

        {/* Botanical ornament — right */}
        <div className="flex-shrink-0 opacity-35 mt-2">
          <svg width="36" height="54" viewBox="0 0 36 54" fill="none">
            <path d="M18 52 C18 36, 18 18, 18 2" stroke="#2e4a3f" strokeWidth="1" strokeLinecap="round"/>
            <path d="M18 38 C12 32, 9 24, 12 20 C15 24, 17 32, 18 38Z" fill="#2e4a3f" opacity="0.7"/>
            <path d="M18 26 C24 20, 27 14, 24 10 C21 14, 19 20, 18 26Z" fill="#2e4a3f" opacity="0.7"/>
            <path d="M18 16 C13 12, 11 7, 14 4 C16 7, 17 12, 18 16Z" fill="#2e4a3f" opacity="0.5"/>
          </svg>
        </div>
      </motion.div>

      {/* ── Gallery — asymmetric, no white borders, film marks on 2 images ── */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-2 gap-3 items-start"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          <motion.div
            variants={fadeInUp}
            className="relative w-full aspect-[3/4] overflow-hidden shadow-sm film-frame"
          >
            <Image
              src={galleryImages[2]}
              alt="Gallery 1"
              fill
              sizes="180px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="relative w-full aspect-square overflow-hidden shadow-sm"
          >
            <Image
              src={galleryImages[4]}
              alt="Gallery 3"
              fill
              sizes="180px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>

        {/* Right column — offset top */}
        <div className="flex flex-col gap-3 pt-8">
          <motion.div
            variants={fadeInUp}
            className="relative w-full aspect-square overflow-hidden shadow-sm"
          >
            <Image
              src={galleryImages[3]}
              alt="Gallery 2"
              fill
              sizes="180px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="relative w-full aspect-[3/4] overflow-hidden shadow-sm film-frame-inner"
          >
            <Image
              src={galleryImages[5]}
              alt="Gallery 4"
              fill
              sizes="180px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── "WITH YOU" editorial text moment ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center py-5 relative flex flex-col items-center"
      >
        <span className="section-label">OUR ETERNAL LOVE</span>
        <h3 className="font-serif-display text-[34px] tracking-[8px] text-[#5c161e] uppercase font-extralight mt-2">
          WITH YOU
        </h3>
        <div className="contour-line my-4 w-[75%]" />
        <p className="font-serif-display text-[13.5px] text-[#6b645f] italic max-w-[270px] leading-relaxed font-light select-none">
          Every moment of each day, loving and missing you dominates every inch of my brain.
        </p>
      </motion.div>

      {/* ── Bottom quote — no box, left-border accent only ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full border-l-2 border-[#c5a880]/50 pl-4 py-2"
      >
        <p className="font-serif-display text-[14px] italic tracking-wide text-[#5c161e] font-medium leading-relaxed">
          &ldquo;You make me want to be a better man.&rdquo;
        </p>
        <p className="font-sans-clean text-[9.5px] text-[#6b645f] tracking-wide mt-2 leading-relaxed">
          Em khiến anh muốn trở thành phiên bản tốt nhất của chính mình.
        </p>
      </motion.div>
    </section>
  );
}
