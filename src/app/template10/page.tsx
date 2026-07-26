"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import Template10 from "@/components/templates/Template10";

export default function Template10Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for Template 10 ("When Two Timelines Became One")
  const previewWedding: Wedding = {
    id: "preview-template10-id",
    slug: "template10-preview",
    secret_key: "secret",
    groom_name: "Minh Hoàng",
    bride_name: "Mai Hương",
    event_date: "2026-10-10T11:00:00+07:00",
    music_url: "/thiepmaudovang/audio/bg-music.mp3",
    images: [
      "/thiepmaudovang/images/cover.jpg",
      "/thiepmaudovang/images/gallery-1.jpg",
      "/thiepmaudovang/images/gallery-2.jpg",
      "/thiepmaudovang/images/gallery-3.jpg",
    ],
    template_id: "template10",
    location_info: {
      groom_family: {
        father_name: "Nguyễn Văn A",
        mother_name: "Lê Thị B",
        address: "123 Đường Láng, Đống Đa, Hà Nội",
        time: "11:00",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        map_url: "https://maps.google.com",
      },
      bride_family: {
        father_name: "Trần Văn C",
        mother_name: "Phạm Thị D",
        address: "456 Nguyễn Huệ, Quận 1, TP. HCM",
        time: "11:00",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        map_url: "https://maps.google.com",
      },
    },
  };

  // Mock initial wishes for preview
  const mockWishes: Wish[] = [
    {
      id: 1,
      wedding_id: "preview-template10-id",
      guest_name: "Thành Đạt",
      content: "Ý tưởng hai dòng thời gian giao thoa thực sự xúc động! Chúc Hoàng & Hương trăm năm hạnh phúc!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "preview-template10-id",
      guest_name: "Quỳnh Chi",
      content: "Thiệp cưới quá thơ và tinh tế. Chúc hai bạn cùng viết tiếp những chương đẹp nhất trên cùng một dòng thời gian nhé!",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  return <Template10 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
