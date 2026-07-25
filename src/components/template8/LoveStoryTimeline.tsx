"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Compass, Wine, Camera } from "lucide-react";
import { Wedding } from "@/types";

interface LoveStoryTimelineProps {
  wedding: Wedding;
}

export default function LoveStoryTimeline({ wedding }: LoveStoryTimelineProps) {
  const chapters = [
    {
      chapter: "CHAPTER ONE",
      title: "Lần Đầu Gặp Gỡ",
      date: "15 THÁNG 03, 2021",
      icon: Compass,
      quote: "Giữa thế gian huyên náo, em là điều duy nhất làm trái tim anh rung động.",
      content: "Một ánh nhìn ngẫu nhiên tại góc quán quen, khởi đầu cho một hành trình đáng nhớ.",
      image: "/template8/images/story-1.jpg",
    },
    {
      chapter: "CHAPTER TWO",
      title: "Hẹn Hò & Gắn Kết",
      date: "20 THÁNG 10, 2022",
      icon: Wine,
      quote: "Mỗi ngày trôi qua bên em đều là một ngày nắng đẹp.",
      content: "Những buổi chiều dạo phố, những chuyến đi cùng nhau thắt chặt thêm tình cảm lứa đôi.",
      image: "/template8/images/story-2.jpg",
    },
    {
      chapter: "CHAPTER THREE",
      title: "Lời Cầu Hôn",
      date: "14 THÁNG 02, 2025",
      icon: Sparkles,
      quote: "Giữa thế gian huyên náo, em là điều duy nhất đáng giá.",
      content: "Dưới ánh hoàng hôn bên bờ biển, chiếc nhẫn được trao cùng lời hứa trọn đời.",
      image: "/template8/images/story-3.jpg",
    },
  ];

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
            LOVE STORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mt-2">
            CÂU CHUYỆN TÌNH YÊU
          </h2>
          <div className="w-16 h-[2px] bg-rose-300 mx-auto mt-4" />
        </motion.div>

        {/* Timeline Items */}
        <div className="space-y-16 relative">
          {/* Vertical Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[1px] bg-rose-200 -translate-x-1/2" />

          {chapters.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.chapter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Text Content */}
                <div className={`w-full md:w-1/2 ${isEven ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-xs font-bold tracking-[0.2em] text-rose-500 uppercase">
                    {item.chapter}
                  </span>
                  <h3 className="font-serif text-2xl text-rose-950 font-normal mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-rose-400 font-medium tracking-wider mb-3">
                    {item.date}
                  </p>
                  <p className="text-sm italic text-gray-600 font-serif leading-relaxed mb-3">
                    "{item.quote}"
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                {/* Center Badge Icon */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-200 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Image Frame */}
                <div className="w-full md:w-1/2">
                  <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-rose-100/50 group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/template8/images/hero.jpg";
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
