"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation, animate } from "framer-motion";

interface T1EnvelopeProps {
  onOpen: () => void;
  to: string;
}

export default function T1Envelope({ onOpen, to }: T1EnvelopeProps) {
  const [isBroken, setIsBroken] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [cardFlyOut, setCardFlyOut] = useState(false);
  const yDrag = useMotionValue(0);
  const controls = useAnimation();

  // Map drag progress (from 0 to -100) to flap rotation (from 0 to -180 degrees)
  // When yDrag is at 0, top flap is closed (rotateX is 0).
  // When yDrag is pulled up to -80, top flap is fully open (rotateX is -180).
  const flapRotateX = useTransform(yDrag, [0, -80], [0, -180]);

  // Map drag progress to wax seal split
  const leftSealX = useTransform(yDrag, [0, -40, -80], [0, -10, -35]);
  const rightSealX = useTransform(yDrag, [0, -40, -80], [0, 10, 35]);
  const sealRotate = useTransform(yDrag, [0, -80], [0, -15]);
  const sealOpacity = useTransform(yDrag, [0, -70, -100], [1, 0.9, 0]);

  // Bouncing help text opacity (fade out as dragged)
  const helpOpacity = useTransform(yDrag, [0, -30], [1, 0]);

  const handleDragEnd = async () => {
    const currentY = yDrag.get();
    if (currentY <= -50) {
      // Trigger open sequence
      setIsOpening(true);
      setIsBroken(true);

      // 1. Slow down and animate top flap opening and wax seal splitting
      await animate(yDrag, -100, {
        duration: 1.5,
        ease: "easeOut",
      });

      // 2. Animate the inner card flying out of the envelope
      setCardFlyOut(true);

      // Wait for card flight animation to show before unmounting
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // 3. Fade out the envelope wrapper slowly
      await controls.start({
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.8, ease: "easeInOut" }
      });

      onOpen();
    } else {
      // Snap back
      controls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md overflow-hidden">
      {/* CSS 3D Styles */}
      <style jsx global>{`
        .perspective-1500 {
          perspective: 1500px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>

      {/* Floating Sparkle Nebulae Stars (ambient glow behind envelope) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/40 via-[#0e072b]/50 to-indigo-950/40 pointer-events-none" />

      {/* 9:16 Responsive Envelope Wrapper */}
      <div className="relative w-full max-w-[390px] h-[90vh] max-h-[720px] flex flex-col items-center justify-center px-6">

        {/* Guest Greeting Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8 z-10"
        >
          <p className="text-purple-300 uppercase tracking-[0.25em] text-xs font-semibold mb-2">Trân Trọng Kính Mời</p>
          <h2 className="text-white text-3xl font-bold font-serif-lux drop-shadow-[0_2px_10px_rgba(147,51,234,0.3)]">{to}</h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-3" />
        </motion.div>

        {/* 3D Envelope container */}
        <motion.div
          animate={controls}
          drag={!isOpening ? "y" : false}
          dragConstraints={{ top: -120, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ y: yDrag }}
          className="relative w-full aspect-[4/3] bg-purple-900/10 border border-purple-500/20 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5),_0_0_50px_rgba(147,51,234,0.15)] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1500 preserve-3d z-10"
        >

          {/* 1. Envelope Back Panel */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#211440] to-[#120a26] rounded-2xl overflow-hidden preserve-3d border border-purple-400/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent)] pointer-events-none" />
          </div>

          {/* 2. Inner Invitation Card Peek */}
          <motion.div
            style={{
              y: useTransform(yDrag, [0, -100], [10, -50]),
              scale: useTransform(yDrag, [0, -100], [0.95, 0.98]),
            }}
            animate={cardFlyOut ? {
              y: -340,
              scale: 1.4,
              rotate: [0, -4, 4, 0],
              opacity: [1, 1, 0.9, 0],
              transition: { duration: 1.5, ease: "easeInOut" }
            } : undefined}
            className="absolute bottom-4 left-6 right-6 top-10 bg-[#fbfaf5] border border-amber-200/50 rounded-lg shadow-inner z-[2] p-4 flex flex-col justify-center items-center text-center text-[#5a2e36] font-serif overflow-hidden select-none pointer-events-none"
          >
            <div className="w-full h-full border border-amber-200/30 flex flex-col items-center justify-center p-2 rounded relative">
              <span className="text-[10px] uppercase tracking-widest text-amber-700/70 font-sans font-semibold mb-1">Save The Date</span>
              <h3 className="text-l font-bold font-serif-lux text-[#5a2e36] mb-1">Minh Hoàng & Mai Hương</h3>
              <p className="text-[9px] text-amber-800 font-sans font-medium tracking-wide">10.10.2026</p>
            </div>
          </motion.div>

          {/* 3. Left and Right Flaps (3D visual overlap) */}
          {/* Left Flap */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[51%] bg-gradient-to-r from-[#211440] to-[#2b1b54] z-[3] border-l border-purple-500/10"
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              boxShadow: "5px 0 15px rgba(0, 0, 0, 0.2)",
            }}
          />
          {/* Right Flap */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[51%] bg-gradient-to-l from-[#211440] to-[#291a4f] z-[3] border-r border-purple-500/10"
            style={{
              clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
              boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.2)",
            }}
          />

          {/* 4. Bottom Flap */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[52%] bg-gradient-to-t from-[#160d2b] to-[#251847] z-[4] border-b border-purple-500/10 rounded-b-2xl"
            style={{
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              boxShadow: "0 -5px 15px rgba(0,0,0,0.1)",
            }}
          />

          <motion.div
            style={{
              transformOrigin: "top",
              rotateX: flapRotateX,
              zIndex: useTransform(yDrag, [0, -35, -80], [5, 5, 1]),
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            }}
            className="absolute left-0 right-0 top-0 h-[50%] bg-gradient-to-b from-[#2e1d5a] to-[#221542] border-t border-purple-400/20 rounded-t-2xl shadow-[0_5px_15px_rgba(0, 0, 0, 0.3)] preserve-3d"
          />

          {/* 6. Wax Seal (Center element - splits and breaks) */}
          <motion.div
            style={{
              y: useTransform(yDrag, [0, -100], [0, 0]),
              opacity: sealOpacity,
              rotate: sealRotate,
            }}
            className="absolute z-[10] w-24 h-24 flex items-center justify-center"
          >
            {/* Wax Seal Left Half */}
            <motion.div
              style={{ x: leftSealX }}
              className="absolute left-0 top-0 bottom-0 w-12 overflow-hidden"
            >
              <div className="absolute top-1/2 left-6 -translate-y-1/2 w-[72px] h-[72px] bg-gradient-to-r from-red-700 via-rose-600 to-rose-500 rounded-full border-2 border-amber-400 shadow-[0_4px_15px_rgba(0,0,0,0.4)] flex items-center justify-end pr-[4px]">
                <div className="text-white text-lg font-bold font-serif-lux select-none pr-1">M</div>
              </div>
            </motion.div>

            {/* Wax Seal Right Half */}
            <motion.div
              style={{ x: rightSealX }}
              className="absolute right-0 top-0 bottom-0 w-12 overflow-hidden"
            >
              <div className="absolute top-1/2 right-6 -translate-y-1/2 w-[72px] h-[72px] bg-gradient-to-l from-red-700 via-rose-600 to-rose-500 rounded-full border-2 border-amber-400 shadow-[0_4px_15px_rgba(0,0,0,0.4)] flex items-center justify-start pl-[4px]">
                <div className="text-white text-lg font-bold font-serif-lux select-none pl-1">H</div>
              </div>
            </motion.div>

            {/* Small Gold & ribbon detail in center */}
            <div className="absolute w-[2px] h-8 bg-amber-400/40 mix-blend-overlay" />
          </motion.div>

        </motion.div>

        {/* Drag Hint Footer */}
        <motion.div
          style={{ opacity: helpOpacity }}
          className="mt-8 flex flex-col items-center gap-2 pointer-events-none z-10"
        >
          {/* Bouncing Chevron Arrow */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-purple-400 text-2xl font-bold"
          >
            ↑
          </motion.div>
          <span className="text-purple-300 text-xs font-semibold uppercase tracking-[0.25em] animate-pulse">
            Vuốt để xé phong bì
          </span>
        </motion.div>

      </div>
    </div>
  );
}
