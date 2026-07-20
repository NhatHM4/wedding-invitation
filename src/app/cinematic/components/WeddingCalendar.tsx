"use client";

import { useMemo } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { formatMonthLong } from "../utils/date";

interface WeddingCalendarProps {
  weddingDate: string;
}

export function WeddingCalendar({ weddingDate }: WeddingCalendarProps) {
  const targetDate = useMemo(() => new Date(weddingDate), [weddingDate]);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const weddingDay = targetDate.getDate();

  const monthName = formatMonthLong(targetDate);
  const dayNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // getDay() returns 0 for Sunday, we want Monday = 0
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek < 0) startDayOfWeek = 6;

    const days: (number | null)[] = [];

    // Empty cells before first day
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }

    return days;
  }, [year, month]);

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-8">
          <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60 mb-6">
            — Lịch cưới —
          </p>
          <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl md:text-3xl font-light text-[#F5F0E8] capitalize">
            {monthName} {year}
          </h2>
        </ScrollReveal>

        {/* Calendar grid */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="glass rounded-lg p-5 md:p-6">
            {/* Day names header */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {dayNames.map((name) => (
                <div
                  key={name}
                  className="text-center font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-wider text-[#F5F0E8]/30 py-2"
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                const isWeddingDay = day === weddingDay;

                return (
                  <div
                    key={i}
                    className={`relative flex flex-col items-center justify-center py-2 rounded-sm transition-colors duration-300 ${
                      isWeddingDay
                        ? "bg-[#D4AF72]/20"
                        : day
                        ? "hover:bg-[#F5F0E8]/5"
                        : ""
                    }`}
                  >
                    {day && (
                      <>
                        <span
                          className={`font-[family-name:var(--font-inter)] text-sm ${
                            isWeddingDay
                              ? "text-[#D4AF72] font-medium"
                              : "text-[#F5F0E8]/60"
                          }`}
                        >
                          {day}
                        </span>
                        {isWeddingDay && (
                          <svg
                            className="w-3 h-3 text-[#D4AF72] mt-0.5 animate-heart-pulse"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
