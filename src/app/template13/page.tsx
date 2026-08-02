"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import LoveFilmLabTemplate from "@/components/template13/LoveFilmLabTemplate";

export default function Template13Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  const mockWedding: Wedding = {
    id: "template13-love-film-lab-id",
    slug: "love-film-lab",
    template_id: "template13",
    secret_key: "secret",
    groom_name: "Thế Vinh",
    bride_name: "Phương Thảo",
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
        address: "Trung tâm Tiệc cưới & Hội nghị Grand Ballroom, 123 Đường Láng, Hà Nội",
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
      wedding_id: "template13-love-film-lab-id",
      guest_name: "Hoàng Nam",
      content: "Chúc hai bạn có một thước phim cuộc đời rực rỡ, ngập tràn tiếng cười và hạnh phúc vĩnh cửu!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "template13-love-film-lab-id",
      guest_name: "Trang Anh",
      content: "Chúc dâu rể tráng nên thật nhiều kỷ niệm đẹp cùng nhau trên chặng đường dài phía trước!",
      created_at: new Date().toISOString(),
    },
  ];

  return <LoveFilmLabTemplate wedding={mockWedding} to={to} wishes={mockWishes} />;
}
