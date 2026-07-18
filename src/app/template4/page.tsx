"use client";

import { useEffect, useState } from "react";
import { Wedding, Wish } from "@/types";
import Template4 from "@/components/templates/Template4";

export default function Template4Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for Template 4 (Contemporary Brutalist Art Gallery)
  const previewWedding: Wedding = {
    id: "preview-template4-id",
    slug: "template4-preview",
    secret_key: "secret4",
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
    template_id: "template4",
    location_info: {
      groom_family: {
        father_name: "Nguyễn Văn A",
        mother_name: "Lê Thị B",
        address: "Khách sạn Melia, Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
        time: "11:00",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        map_url: "https://maps.app.goo.gl/y56r4UqN6yM4H4s9A",
      },
      bride_family: {
        father_name: "Trần Văn C",
        mother_name: "Phạm Thị D",
        address: "Trung tâm Tiệc cưới White Palace, Hoàng Văn Thụ, Phú Nhuận, TP. HCM",
        time: "11:00",
        date: "Thứ Bảy, ngày 10 tháng 10 năm 2026",
        map_url: "https://maps.app.goo.gl/y56r4UqN6yM4H4s9A",
      },
    },
  };

  // Mock initial wishes for visitor log
  const mockWishes: Wish[] = [
    {
      id: 1,
      wedding_id: "preview-template4-id",
      guest_name: "Thành Đạt",
      content: "Giao diện triển lãm nghệ thuật này đỉnh thực sự! Quá tinh tế và hiện đại. Chúc hai bạn hạnh phúc viên mãn!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "preview-template4-id",
      guest_name: "Khánh Linh",
      content: "Rất ấn tượng với phần vuốt ảnh Polaroid và hiệu ứng sóng nước. Chúc cô dâu & chú rể trăm năm tình viên mãn!",
      created_at: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 3,
      wedding_id: "preview-template4-id",
      guest_name: "Quỳnh Chi",
      content: "Thiệp mời sang trọng quá, thiết kế tối giản rất hợp gu mình. Chúc mừng hạnh phúc chú rể Minh Hoàng & cô dâu Mai Hương!",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  return <Template4 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
