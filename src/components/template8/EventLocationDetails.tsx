"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Navigation, Clock } from "lucide-react";
import { Wedding } from "@/types";

interface EventLocationDetailsProps {
  wedding: Wedding;
}

export default function EventLocationDetails({ wedding }: EventLocationDetailsProps) {
  const groomLocation = wedding.location_info?.groom_family || {
    address: "Nhà hàng Diamond Palace, Hai Bà Trưng, Hà Nội",
    time: "12:00",
    date: "Chủ Nhật, Ngày 16/11/2025",
    map_url: "https://maps.google.com",
  };

  const brideLocation = wedding.location_info?.bride_family || {
    address: "Nhà hàng Diamond Palace, Hai Bà Trưng, Hà Nội",
    time: "12:00",
    date: "Chủ Nhật, Ngày 16/11/2025",
    map_url: "https://maps.google.com",
  };

  // Calendar for Nov 2025 (Nov 16 is Sunday)
  const calendarDays = [
    { day: "", isCurrent: false },
    { day: "", isCurrent: false },
    { day: "", isCurrent: false },
    { day: "", isCurrent: false },
    { day: "", isCurrent: false },
    { day: "1", isCurrent: false },
    { day: "2", isCurrent: false },
    { day: "3", isCurrent: false },
    { day: "4", isCurrent: false },
    { day: "5", isCurrent: false },
    { day: "6", isCurrent: false },
    { day: "7", isCurrent: false },
    { day: "8", isCurrent: false },
    { day: "9", isCurrent: false },
    { day: "10", isCurrent: false },
    { day: "11", isCurrent: false },
    { day: "12", isCurrent: false },
    { day: "13", isCurrent: false },
    { day: "14", isCurrent: false },
    { day: "15", isCurrent: false },
    { day: "16", isCurrent: true }, // Wedding day!
    { day: "17", isCurrent: false },
    { day: "18", isCurrent: false },
    { day: "19", isCurrent: false },
    { day: "20", isCurrent: false },
    { day: "21", isCurrent: false },
    { day: "22", isCurrent: false },
    { day: "23", isCurrent: false },
    { day: "24", isCurrent: false },
    { day: "25", isCurrent: false },
    { day: "26", isCurrent: false },
    { day: "27", isCurrent: false },
    { day: "28", isCurrent: false },
    { day: "29", isCurrent: false },
    { day: "30", isCurrent: false },
  ];

  return (
    <section className="py-20 px-4 bg-[#FFF5F2] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-medium">
            WEDDING INVITATION & EVENT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mt-2">
            THỜI GIAN & ĐỊA ĐIỂM
          </h2>
          <div className="w-16 h-[2px] bg-rose-300 mx-auto mt-4" />
        </motion.div>

        {/* Calendar and Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-100 shadow-xl shadow-rose-100/50"
          >
            <div className="text-center mb-6">
              <h3 className="font-serif text-xl text-rose-900 font-medium">
                THÁNG 11 / 2025
              </h3>
              <p className="text-xs text-rose-500 tracking-widest mt-1">
                NOVEMBER 2025
              </p>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-rose-800 mb-3 border-b border-rose-100 pb-2">
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span>T6</span>
              <span>T7</span>
              <span className="text-rose-500">CN</span>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {calendarDays.map((item, idx) => (
                <div
                  key={idx}
                  className={`h-9 flex items-center justify-center rounded-full text-xs transition-colors ${
                    item.isCurrent
                      ? "bg-rose-600 text-white font-bold shadow-md shadow-rose-300 scale-110"
                      : item.day
                      ? "text-gray-700 hover:bg-rose-50"
                      : "text-transparent"
                  }`}
                >
                  {item.day}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-rose-100 text-center">
              <p className="text-xs text-rose-700 font-medium flex items-center justify-center gap-1">
                <Calendar className="w-4 h-4 text-rose-500" />
                <span>12:00 - Chủ Nhật, Ngày 16/11/2025</span>
              </p>
            </div>
          </motion.div>

          {/* Location Cards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Groom's Party Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-100 shadow-xl shadow-rose-100/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs font-bold uppercase tracking-widest text-rose-600 px-3 py-1 bg-rose-50 rounded-full">
                TIỆC CƯỚI
              </span>

              <h3 className="font-serif text-2xl text-gray-900 mt-4 mb-2">
                Nhà hàng Diamond Palace
              </h3>

              <div className="space-y-3 text-sm text-gray-600 my-4">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <span><strong>Thời gian:</strong> {groomLocation.time || "12:00"} - {groomLocation.date || "Chủ Nhật, Ngày 16/11/2025"}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <span><strong>Địa chỉ:</strong> {groomLocation.address}</span>
                </div>
              </div>

              <a
                href={groomLocation.map_url || "https://maps.google.com"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition-colors shadow-md shadow-rose-200"
              >
                <Navigation className="w-4 h-4" />
                <span>Xem bản đồ chỉ đường</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
