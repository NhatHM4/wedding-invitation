"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import Template5 from "@/components/templates/Template5";

export default function Template5Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for Template 5 (Immersive Kinetic Typography)
  const previewWedding: Wedding = {
    id: "preview-template5-id",
    slug: "template5-preview",
    secret_key: "secret5",
    groom_name: "Minh Hoàng",
    bride_name: "Mai Hương",
    event_date: "2026-10-10T11:00:00",
    music_url: "/thiepmaudovang/audio/bg-music.mp3",
    images: [
      "/thiepmaudovang/images/cover.jpg",
      "/thiepmaudovang/images/gallery-1.jpg",
      "/thiepmaudovang/images/gallery-2.jpg",
      "/thiepmaudovang/images/gallery-3.jpg",
      "/thiepmaudovang/images/gallery-4.jpg",
    ],
    template_id: "template5",
    location_info: {
      groom_family: {
        father_name: "Nguyễn Văn Hùng",
        mother_name: "Lê Thị Lan",
        address: "Khách sạn Melia, 44B Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
        time: "11:00",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        map_url: "https://maps.app.goo.gl/y56r4UqN6yM4H4s9A",
      },
      bride_family: {
        father_name: "Trần Văn Minh",
        mother_name: "Phạm Thị Hoa",
        address: "White Palace, 194 Hoàng Văn Thụ, Phú Nhuận, TP. HCM",
        time: "11:00",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        map_url: "https://maps.app.goo.gl/y56r4UqN6yM4H4s9A",
      },
    },
  };

  const mockWishes: Wish[] = [
    {
      id: 1,
      wedding_id: "preview-template5-id",
      guest_name: "Ngọc Anh",
      content: "Thiệp cưới đẹp quá! Typography động thật ấn tượng. Chúc hai bạn trăm năm hạnh phúc bên nhau nhé!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "preview-template5-id",
      guest_name: "Thanh Bình",
      content: "Hiệu ứng ảnh trong chữ thật sáng tạo và độc đáo! Chúc mừng hôn lễ Minh Hoàng & Mai Hương!",
      created_at: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 3,
      wedding_id: "preview-template5-id",
      guest_name: "Quỳnh Trang",
      content: "Rất ấn tượng với thiết kế tối giản sang trọng. Chúc hai bạn hạnh phúc mãi mãi!",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  return <Template5 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
