"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import Template2 from "@/components/templates/Template2";

export default function Template2Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for Template 2 (Pop-Up Book)
  const previewWedding: Wedding = {
    id: "preview-template2-id",
    slug: "template2-preview",
    secret_key: "secret",
    groom_name: "Minh Hoàng",
    bride_name: "Mai Hương",
    event_date: "2026-10-10T11:00:00",
    music_url: "/thiepmaudovang/audio/bg-music.mp3",
    images: [
      "/thiepmaudovang/images/gallery-1.jpg",
      "/thiepmaudovang/images/gallery-2.jpg",
      "/thiepmaudovang/images/gallery-3.jpg",
      "/thiepmaudovang/images/cover.jpg",
    ],
    template_id: "template2",
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
      wedding_id: "preview-template2-id",
      guest_name: "Thành Đạt",
      content: "Cuốn sách mở ra đỉnh quá! Chúc Hoàng & Hương trăm năm hạnh phúc, gia đình viên mãn nhé!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "preview-template2-id",
      guest_name: "Quỳnh Chi",
      content: "Chúc mừng cô dâu chú rể! Một thiệp cưới 3D pop-up rất nhẹ nhàng và thơ mộng. Chúc hai bạn hạnh phúc!",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  return <Template2 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
