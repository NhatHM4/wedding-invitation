"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import Template8 from "@/components/templates/Template8";

export default function Template8Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for Template 8 (Cinelove 38 - Blush Floral & Golden Elegance Theme)
  const previewWedding: Wedding = {
    id: "preview-template8-id",
    slug: "template8-preview",
    secret_key: "secret8",
    groom_name: "Nguyễn Thanh Huy",
    bride_name: "Trịnh Phương Thúy",
    event_date: "2025-11-16T12:00:00+07:00",
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
    template_id: "template8",
    location_info: {
      groom_family: {
        father_name: "Nguyễn Viết Minh",
        mother_name: "Trịnh Thị Lan",
        address: "Nhà hàng Diamond Palace, Hai Bà Trưng, Hà Nội",
        time: "12:00",
        date: "Chủ Nhật, ngày 16 tháng 11 năm 2025",
        map_url: "https://maps.google.com",
      },
      bride_family: {
        father_name: "Trịnh Văn Huy",
        mother_name: "Ngô Mai Hoàn",
        address: "Nhà hàng Diamond Palace, Hai Bà Trưng, Hà Nội",
        time: "12:00",
        date: "Chủ Nhật, ngày 16 tháng 11 năm 2025",
        map_url: "https://maps.google.com",
      },
    },
  };

  const mockWishes: Wish[] = [
    {
      id: 1,
      wedding_id: "preview-template8-id",
      guest_name: "Anh Tuấn & Minh Hằng",
      content: "Chúc hai bạn Thanh Huy và Phương Thúy trăm năm hạnh phúc, cùng nhau đi qua mọi bão giông và đong đầy yêu thương!",
      created_at: "2025-10-20T08:00:00.000Z",
    },
    {
      id: 2,
      wedding_id: "preview-template8-id",
      guest_name: "Khánh Linh",
      content: "Chúc mừng ngày vui của hai bạn! Thiệp cưới thiết kế quá tinh tế và lãng mạn.",
      created_at: "2025-10-21T09:30:00.000Z",
    },
    {
      id: 3,
      wedding_id: "preview-template8-id",
      guest_name: "Đức Hoàng",
      content: "Chúc đôi bạn trẻ sớm có quý tử, gia đình luôn tràn ngập tiếng cười và niềm vui!",
      created_at: "2025-10-22T10:15:00.000Z",
    },
  ];

  return <Template8 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
