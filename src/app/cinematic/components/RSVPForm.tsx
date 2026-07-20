"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const rsvpSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ và tên"),
  attending: z.enum(["yes", "no"]),
  guestCount: z
    .number()
    .min(1, "Tối thiểu 1 người")
    .max(10, "Tối đa 10 người")
    .optional(),
  side: z.enum(["groom", "bride"]),
  message: z.string().optional(),
});

type RSVPFormValues = {
  fullName: string;
  attending: "yes" | "no";
  guestCount?: number;
  side: "groom" | "bride";
  message?: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface RSVPFormProps {
  guestName?: string;
}

export function RSVPForm({ guestName = "" }: RSVPFormProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [cooldown, setCooldown] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema) as any,
    defaultValues: {
      fullName: guestName,
      attending: "yes",
      side: "bride",
      guestCount: 1,
    },
  });

  useEffect(() => {
    if (guestName) {
      setValue("fullName", guestName);
    }
  }, [guestName, setValue]);

  const attending = watch("attending");

  const onSubmit = async (data: RSVPFormValues) => {
    if (cooldown || status === "loading") return;

    setStatus("loading");
    setCooldown(true);

    try {
      const response = await fetch("/api/cinematic/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setCooldown(false), 3000);
    }
  };

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-10">
          <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.5em] text-[#D4AF72]/60 mb-6">
            — Xác nhận —
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant-garamond)] font-light text-[#F5F0E8]"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Xác nhận tham dự
          </h2>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-lg p-10 text-center"
            >
              <svg
                className="w-12 h-12 mx-auto mb-4 text-[#D4AF72]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-[#F5F0E8] mb-3">
                Cảm ơn bạn!
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]/60">
                Chúng tôi đã nhận được phản hồi của bạn. Hẹn gặp bạn trong ngày vui!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ScrollReveal direction="up" delay={0.2}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="glass rounded-lg p-8 md:p-10 space-y-6"
                  noValidate
                >
                  {/* Full name */}
                  <div>
                    <label
                      htmlFor="rsvp-name"
                      className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 block mb-1"
                    >
                      Họ và tên *
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      className="cinematic-input"
                      placeholder="Nhập họ và tên"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="font-[family-name:var(--font-inter)] text-[11px] text-red-400 mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Attending */}
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 mb-3">
                      Xác nhận tham dự *
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="yes"
                          className="cinematic-radio"
                          {...register("attending")}
                        />
                        <span className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]/70">
                          Sẽ tham dự
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="no"
                          className="cinematic-radio"
                          {...register("attending")}
                        />
                        <span className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]/70">
                          Không thể tham dự
                        </span>
                      </label>
                    </div>
                    {errors.attending && (
                      <p className="font-[family-name:var(--font-inter)] text-[11px] text-red-400 mt-1">
                        {errors.attending.message}
                      </p>
                    )}
                  </div>

                  {/* Guest count — only if attending */}
                  {attending === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label
                        htmlFor="rsvp-guests"
                        className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 block mb-1"
                      >
                        Số người tham dự
                      </label>
                      <input
                        id="rsvp-guests"
                        type="number"
                        min={1}
                        max={10}
                        className="cinematic-input w-24"
                        {...register("guestCount")}
                      />
                      {errors.guestCount && (
                        <p className="font-[family-name:var(--font-inter)] text-[11px] text-red-400 mt-1">
                          {errors.guestCount.message}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Side */}
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 mb-3">
                      Bạn là khách mời của *
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="bride"
                          className="cinematic-radio"
                          {...register("side")}
                        />
                        <span className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]/70">
                          Nhà gái
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="groom"
                          className="cinematic-radio"
                          {...register("side")}
                        />
                        <span className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0E8]/70">
                          Nhà trai
                        </span>
                      </label>
                    </div>
                    {errors.side && (
                      <p className="font-[family-name:var(--font-inter)] text-[11px] text-red-400 mt-1">
                        {errors.side.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="rsvp-message"
                      className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/40 block mb-1"
                    >
                      Lời nhắn
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={3}
                      className="cinematic-input resize-none"
                      placeholder="Gửi lời chúc đến cô dâu & chú rể..."
                      {...register("message")}
                    />
                  </div>

                  {/* Error message */}
                  {status === "error" && (
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-red-400 text-center">
                      Có lỗi xảy ra. Vui lòng thử lại!
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading" || cooldown}
                    className="w-full py-3.5 bg-[#D4AF72] text-[#1a1a1a] font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-[#C4A060] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="opacity-25"
                          />
                          <path
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            fill="currentColor"
                            className="opacity-75"
                          />
                        </svg>
                        Đang gửi...
                      </span>
                    ) : (
                      "Gửi xác nhận"
                    )}
                  </button>
                </form>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
