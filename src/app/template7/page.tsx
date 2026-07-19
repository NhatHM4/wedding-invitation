"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import Template7 from "@/components/templates/Template7";

export default function Template7Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for Template 7 (Neomorphic Clay & Sage Theme)
  const previewWedding: Wedding = {
    id: "preview-template7-id",
    slug: "template7-preview",
    secret_key: "secret7",
    groom_name: "Vinh Quang",
    bride_name: "Thúy Vân",
    event_date: "2026-12-12T11:00:00+07:00", // Future date for countdown
    music_url: "/thiepmaudovang/audio/bg-music.mp3",
    images: [
      "/thiepmaudovang/images/cover.jpg",
      "/thiepmaudovang/images/gallery-1.jpg",
      "/thiepmaudovang/images/gallery-2.jpg",
      "/thiepmaudovang/images/gallery-3.jpg",
      "/thiepmaudovang/images/gallery-4.jpg",
      "/thiepmaudovang/images/gallery-5.jpg",
      "/thiepmaudovang/images/gallery-6.jpg",
      "/thiepmaudovang/images/gallery-7.jpg",
    ],
    template_id: "template7",
    location_info: {
      groom_family: {
        father_name: "Nguyễn Vinh Hải",
        mother_name: "Trần Thị Quang",
        address: "Trung tâm Hội nghị Lotte, 54 Liễu Giai, Cống Vị, Ba Đình, Hà Nội",
        time: "11:00",
        date: "Thứ Bảy, ngày 12 tháng 12 năm 2026",
        map_url: "https://maps.app.goo.gl/y56r4UqN6yM4H4s9A",
      },
      bride_family: {
        father_name: "Phạm Thúy Lâm",
        mother_name: "Lê Thị Vân",
        address: "Adora Center, 431 Hoàng Văn Thụ, Phường 4, Tân Bình, TP. HCM",
        time: "11:00",
        date: "Thứ Bảy, ngày 12 tháng 12 năm 2026",
        map_url: "https://maps.app.goo.gl/y56r4UqN6yM4H4s9A",
      },
    },
  };

  const mockWishes: Wish[] = [
    {
      id: 1,
      wedding_id: "preview-template7-id",
      guest_name: "Hoàng Minh",
      content: "[Xác nhận: THAM DỰ - Đi cùng: 2 người] Chúc mừng hạnh phúc Vinh Quang và Thúy Vân! Thiết kế mini-OS neomorphic rất đột phá và bắt mắt.",
      created_at: "2026-07-18T05:00:00.000Z",
    },
    {
      id: 2,
      wedding_id: "preview-template7-id",
      guest_name: "Lan Anh",
      content: "[Xác nhận: THAM DỰ - Đi cùng: 1 người] Chúc hai bạn trăm năm hạnh phúc, mãi mãi đồng hành bên nhau nhé!",
      created_at: "2026-07-18T04:00:00.000Z",
    },
    {
      id: 3,
      wedding_id: "preview-template7-id",
      guest_name: "Minh Đức",
      content: "Rất tiếc mình có lịch công tác nên không tham dự được. Chúc mừng ngày vui của hai bạn!",
      created_at: "2026-07-18T03:00:00.000Z",
    },
  ];

  return <Template7 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
