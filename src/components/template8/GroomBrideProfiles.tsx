"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Phone, MessageCircle } from "lucide-react";
import { Wedding } from "@/types";

interface GroomBrideProfilesProps {
  wedding: Wedding;
}

export default function GroomBrideProfiles({ wedding }: GroomBrideProfilesProps) {
  const groomFamily = wedding.location_info?.groom_family || {
    father_name: "Nguyễn Viết Minh",
    mother_name: "Trịnh Thị Lan",
  };

  const brideFamily = wedding.location_info?.bride_family || {
    father_name: "Trịnh Văn Huy",
    mother_name: "Ngô Mai Hoàn",
  };

  const groomQuote = "Hạnh phúc lớn nhất chính là có thể đặt tay mình vào tay em.";
  const brideQuote = "Em không phải là điểm cuối của tình yêu, mà là động lực nguyên sơ của nó. Vì em, anh đã yêu thế giới này.";

  return (
    <section className="py-20 px-4 bg-[#FDF8F5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-medium">
            GROOM & BRIDE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mt-2">
            CHÚ RỂ & CÔ DÂU
          </h2>
          <div className="w-16 h-[2px] bg-rose-300 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Groom Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-rose-100 shadow-xl shadow-rose-100/40"
          >
            {/* Avatar Frame */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-rose-100 shadow-md mb-6">
              <img
                src="/template8/images/groom.jpg"
                alt={wedding.groom_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/template8/images/hero.jpg";
                }}
              />
            </div>

            <span className="text-xs uppercase tracking-widest text-rose-500 font-semibold mb-1">
              CHÚ RỂ
            </span>
            <h3 className="font-artistic-name text-3xl sm:text-4xl text-rose-950 mb-4">
              {wedding.groom_name}
            </h3>

            {/* Parents Information */}
            <div className="text-sm text-gray-600 mb-6 space-y-1 bg-rose-50/50 px-6 py-3 rounded-2xl w-full">
              <p>
                <span className="text-gray-500">Con ông:</span>{" "}
                <strong className="font-artistic-name text-lg text-gray-800">{groomFamily.father_name || "Nguyễn Viết Minh"}</strong>
              </p>
              <p>
                <span className="text-gray-500">Con bà:</span>{" "}
                <strong className="font-artistic-name text-lg text-gray-800">{groomFamily.mother_name || "Trịnh Thị Lan"}</strong>
              </p>
            </div>

            {/* Quote */}
            <blockquote className="text-sm italic text-gray-600 font-serif leading-relaxed mb-6 px-4">
              "{groomQuote}"
            </blockquote>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href="tel:0987654321"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-800 text-xs font-medium hover:bg-rose-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi điện</span>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Nhắn Zalo</span>
              </a>
            </div>
          </motion.div>

          {/* Bride Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-rose-100 shadow-xl shadow-rose-100/40"
          >
            {/* Avatar Frame */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-rose-100 shadow-md mb-6">
              <img
                src="/template8/images/bride.jpg"
                alt={wedding.bride_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/template8/images/hero.jpg";
                }}
              />
            </div>

            <span className="text-xs uppercase tracking-widest text-rose-500 font-semibold mb-1">
              CÔ DÂU
            </span>
            <h3 className="font-artistic-name text-3xl sm:text-4xl text-rose-950 mb-4">
              {wedding.bride_name}
            </h3>

            {/* Parents Information */}
            <div className="text-sm text-gray-600 mb-6 space-y-1 bg-rose-50/50 px-6 py-3 rounded-2xl w-full">
              <p>
                <span className="text-gray-500">Con ông:</span>{" "}
                <strong className="font-artistic-name text-lg text-gray-800">{brideFamily.father_name || "Trịnh Văn Huy"}</strong>
              </p>
              <p>
                <span className="text-gray-500">Con bà:</span>{" "}
                <strong className="font-artistic-name text-lg text-gray-800">{brideFamily.mother_name || "Ngô Mai Hoàn"}</strong>
              </p>
            </div>

            {/* Quote */}
            <blockquote className="text-sm italic text-gray-600 font-serif leading-relaxed mb-6 px-4">
              "{brideQuote}"
            </blockquote>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href="tel:0912345678"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-800 text-xs font-medium hover:bg-rose-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi điện</span>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Nhắn Zalo</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
