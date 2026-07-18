"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import Template3 from "@/components/templates/Template3";

export default function Template3Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for Template 3 (Bento Grid Magazine)
  const previewWedding: Wedding = {
    id: "preview-template3-id",
    slug: "template3-preview",
    secret_key: "secret",
    groom_name: "Minh Hoàng",
    bride_name: "Mai Hương",
    event_date: "2026-10-10T11:00:00",
    music_url: "/thiepmaudovang/audio/bg-music.mp3",
    images: [
      "/thiepmaudovang/images/cover.jpg",
      "/thiepmaudovang/images/gallery-1.jpg",
      "/thiepmaudovang/images/gallery-2.jpg",
      "/thiepmaudovang/images/gallery-3.jpg",
    ],
    template_id: "template3",
    location_info: {
      groom_family: {
        father_name: "Nguyễn Văn A",
        mother_name: "Lê Thị B",
        address: "123 Đường Láng, Đống Đa, Hà Nội",
        time: "11:00",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        map_url: "https://maps.app.goo.gl/y56r4UqN6yM4H4s9A",
      },
      bride_family: {
        father_name: "Trần Văn C",
        mother_name: "Phạm Thị D",
        address: "456 Nguyễn Huệ, Quận 1, TP. HCM",
        time: "11:00",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        map_url: "https://maps.app.goo.gl/y56r4UqN6yM4H4s9A",
      },
    },
  };

  // Mock initial wishes for preview
  const mockWishes: Wish[] = [
    {
      id: 1,
      wedding_id: "preview-template3-id",
      guest_name: "Thành Đạt",
      content: "Giao diện Bento Grid đỉnh quá! Rất hiện đại và cuốn hút. Chúc hai bạn trăm năm hạnh phúc nhé!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "preview-template3-id",
      guest_name: "Quỳnh Chi",
      content: "Thiệp cưới rất sang xịn mịn. Chúc chú rể Minh Hoàng & cô dâu Mai Hương hạnh phúc viên mãn!",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  return <Template3 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
