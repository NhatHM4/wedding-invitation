"use client";

import React from "react";
import { motion } from "framer-motion";

export default function T2WatercolorBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#fbfbf8] overflow-hidden pointer-events-none">
      
      {/* 1. Paper Grain Texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Floating watercolor organic blobs (animated pastel colors) */}
      
      {/* Pink watercolor stain */}
      <motion.div
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
        }}
        className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#fde2e4]/30 blur-[60px]"
      />

      {/* Sage green watercolor stain */}
      <motion.div
        animate={{
          x: [0, -35, 15, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#e8f1f2]/25 blur-[70px]"
      />

      {/* Gold/Orange watercolor stain */}
      <motion.div
        animate={{
          x: [0, 15, -25, 0],
          y: [0, -20, 35, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 28,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 -left-20 w-80 h-96 rounded-full bg-[#fae588]/15 blur-[55px]"
      />

      {/* Soft lavender accent */}
      <motion.div
        animate={{
          x: [0, -10, 25, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-[#e8dbfc]/20 blur-[50px]"
      />
    </div>
  );
}
