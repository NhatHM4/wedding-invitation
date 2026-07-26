"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import Template9 from "@/components/templates/Template9";

export default function Template9Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for Template 9 ("The House We Built Between Us" / "Ngôi Nhà Chúng Mình Xây Giữa Hai Trái Tim")
  const previewWedding: Wedding = {
    id: "preview-template9-id",
    slug: "template9-preview",
    secret_key: "secret9",
    groom_name: "Hoàng Nam",
    bride_name: "Thảo Chi",
    event_date: "2025-11-16T11:30:00+07:00",
    music_url: "/template8/audio/bg-music.mp3",
    images: [
      "/template8/images/hero.jpg",
      "/template8/images/groom.jpg",
      "/template8/images/bride.jpg",
      "/template8/images/gallery-1.jpg",
      "/template8/images/gallery-2.jpg",
      "/template8/images/gallery-3.jpg",
      "/template8/images/gallery-4.jpg",
      "/template8/images/gallery-5.jpg",
      "/template8/images/gallery-6.jpg",
    ],
    template_id: "template9",
    location_info: {
      groom_family: {
        father_name: "Nguyễn Văn Đức",
        mother_name: "Lê Thị Mai",
        address: "Trung tâm Hội nghị & Tiệc cưới JW Marriott, Nam Từ Liêm, Hà Nội",
        time: "11:30",
        date: "Chủ Nhật, ngày 16 tháng 11 năm 2025",
        map_url: "https://maps.google.com",
      },
      bride_family: {
        father_name: "Trịnh Hoài Nam",
        mother_name: "Ngô Khánh Vân",
        address: "Trung tâm Hội nghị & Tiệc cưới JW Marriott, Nam Từ Liêm, Hà Nội",
        time: "11:30",
        date: "Chủ Nhật, ngày 16 tháng 11 năm 2025",
        map_url: "https://maps.google.com",
      },
    },
  };

  const mockWishes: Wish[] = [
    {
      id: 1,
      wedding_id: "preview-template9-id",
      guest_name: "Quốc Anh & Phương Trinh",
      content: "Chúc hai bạn Hoàng Nam và Thảo Chi mãi mãi đồng hành, vun đắp mái nhà chung luôn ngập tràn ấm áp và nụ cười!",
      created_at: "2025-10-15T09:00:00.000Z",
    },
    {
      id: 2,
      wedding_id: "preview-template9-id",
      guest_name: "Thùy Dương (Bạn Cô Dâu)",
      content: "Thiệp cưới mang ý nghĩa tuyệt vời quá! Chúc Thảo Chi luôn là nữ hoàng trong ngôi nhà nhỏ của hai bạn nhé.",
      created_at: "2025-10-18T14:20:00.000Z",
    },
    {
      id: 3,
      wedding_id: "preview-template9-id",
      guest_name: "Minh Triết",
      content: "Chúc đôi bạn sớm có thêm những thiên thần nhỏ, hạnh phúc viên mãn trăm năm!",
      created_at: "2025-10-22T16:45:00.000Z",
    },
  ];

  return <Template9 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
