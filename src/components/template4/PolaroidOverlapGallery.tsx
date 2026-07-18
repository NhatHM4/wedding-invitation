"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useReducedMotion } from "framer-motion";

interface PolaroidOverlapGalleryProps {
  images: string[];
  captions?: string[];
  onCardDiscarded?: (index: number) => void;
  onCardSelected?: (index: number) => void;
  className?: string;
}

export default function PolaroidOverlapGallery({
  images,
  captions = [],
  onCardDiscarded,
  onCardSelected,
  className = "",
}: PolaroidOverlapGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Hardware acceleration guardrail: only render the top card and the next 2 cards to save GPU memory
  const visibleCardsCount = 3;

  const handleDragEnd = (index: number, info: any) => {
    if (shouldReduceMotion) return;

    const velocityX = info.velocity.x;
    const offsetX = info.offset.x;

    // Flick Threshold: velocity.x > 500 px/s OR offset.x > 150 px
    if (Math.abs(velocityX) > 500 || Math.abs(offsetX) > 150) {
      // Eject offscreen directionally
      const targetX = offsetX > 0 ? 600 : -600;

      // Update state after a short delay allowing the exit transition to play
      setTimeout(() => {
        const nextIndex = index + 1;
        setCurrentIndex(nextIndex);
        if (onCardDiscarded) {
          onCardDiscarded(nextIndex);
        }
      }, 150);
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Rigid Aspect Ratio boundary to prevent Layout Shifts */}
      <div className="relative w-full aspect-[3/4] max-w-[300px] select-none">
        <AnimatePresence mode="popLayout">
          {images.map((src, index) => {
            // Memory Leak Protection: safely detach off-screen or deep-stack layers
            if (index < currentIndex || index >= currentIndex + visibleCardsCount) {
              return null;
            }

            return (
              <PolaroidCard
                key={src}
                src={src}
                caption={captions[index] || `Exhibition Frame ${index + 1}`}
                index={index}
                currentIndex={currentIndex}
                onDragEnd={(info) => handleDragEnd(index, info)}
                shouldReduceMotion={shouldReduceMotion ? true : false}
                onSelect={() => onCardSelected && onCardSelected(index)}
              />
            );
          })}
        </AnimatePresence>

        {/* Display reset action once all items are thrown */}
        {currentIndex >= images.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 border border-black/10 bg-[#FAF9F6] text-center shadow-inner"
          >
            <p className="font-cormorant-garamond text-lg italic text-black/60">
              [ End of Lookbook ]
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                if (onCardDiscarded) onCardDiscarded(0);
              }}
              className="mt-4 px-4 py-2 border border-black text-[10px] font-inter tracking-widest uppercase hover:bg-black hover:text-[#FAF9F6] transition-all duration-300"
            >
              Examine Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface PolaroidCardProps {
  src: string;
  caption: string;
  index: number;
  currentIndex: number;
  onDragEnd: (info: any) => void;
  shouldReduceMotion: boolean;
  onSelect?: () => void;
}

function PolaroidCard({
  src,
  caption,
  index,
  currentIndex,
  onDragEnd,
  shouldReduceMotion,
  onSelect,
}: PolaroidCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map displacement x into rotation degrees
  const rotateTransform = useTransform(x, [-200, 200], [-25, 25]);

  // Stacking index math
  const relativeIndex = index - currentIndex;
  
  // Asymmetrical starting rotations to look like carelessly dropped real prints
  const initialRotation = index % 2 === 0 ? relativeIndex * 2.0 : relativeIndex * -2.0;
  
  const isTopCard = index === currentIndex;

  return (
    <motion.div
      style={{
        x,
        y,
        rotate: isTopCard ? rotateTransform : initialRotation,
        zIndex: 50 - index,
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      drag={isTopCard && !shouldReduceMotion ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(e, info) => onDragEnd(info)}
      onTap={() => {
        if (isTopCard && onSelect) {
          onSelect();
        }
      }}
      initial={{ scale: 0.92, opacity: 0, y: 15 }}
      animate={{
        scale: 1 - relativeIndex * 0.03,
        opacity: 1,
        y: relativeIndex * -10, // Vertical stacking offset
        transition: { 
          type: "spring", 
          stiffness: 220, 
          damping: 22 
        },
      }}
      exit={{
        x: x.get() >= 0 ? 500 : -500,
        opacity: 0,
        rotate: x.get() >= 0 ? 35 : -35,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      className={`absolute inset-0 p-3 pb-8 bg-white border border-black/5 flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] ${
        isTopCard ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"
      } will-change-transform`}
    >
      {/* Rigid 1:1 image square to avoid shifts */}
      <div className="relative w-full aspect-square overflow-hidden bg-neutral-100 border border-neutral-200/50">
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover select-none pointer-events-none"
          loading="lazy"
        />
      </div>

      {/* Frame text label */}
      <div className="mt-2 text-center">
        <span className="font-cormorant-garamond text-sm italic tracking-wide text-neutral-800">
          {caption}
        </span>
      </div>
    </motion.div>
  );
}
