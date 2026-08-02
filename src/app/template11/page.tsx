"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import GardenTemplate from "@/components/template11/GardenTemplate";

export default function Template11Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  const mockWedding: Wedding = {
    id: "template11-garden-id",
    slug: "template11-garden",
    template_id: "template11",
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
    location_info: {
      groom_family: {
        father_name: "Nguyễn Văn An",
        mother_name: "Lê Thị Bình",
        address: "Trung tâm Tiệc cưới & Hội nghị, 123 Đường Láng, Hà Nội",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        time: "11:00 AM",
        map_url: "https://maps.google.com",
      },
      bride_family: {
        father_name: "Trần Văn Cường",
        mother_name: "Phạm Thị Dung",
        address: "Nhà hàng Tiệc cưới Riverside, 456 Nguyễn Trãi, Hà Nội",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        time: "11:00 AM",
        map_url: "https://maps.google.com",
      },
    },
  };

  const mockWishes: Wish[] = [
    {
      id: 1,
      wedding_id: "template11-garden-id",
      guest_name: "Anh Tuấn",
      content: "Chúc hai em một đời bình an, cùng nhau trồng một khu vườn rực rỡ hạnh phúc!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "template11-garden-id",
      guest_name: "Chị Thảo",
      content: "Trăm năm hạnh phúc, mãi dịu dàng và yêu thương nhau như những ngày đầu!",
      created_at: new Date().toISOString(),
    },
  ];

  return <GardenTemplate wedding={mockWedding} to={to} wishes={mockWishes} />;
}
