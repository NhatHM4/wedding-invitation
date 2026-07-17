"use client";

import { useEffect, useState } from "react";

import { Wedding, Wish } from "@/types";
import Template1 from "@/components/templates/Template1";

export default function Template1Page() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "Quý khách");
    }
  }, []);

  // Mock wedding data for the template
  const previewWedding: Wedding = {
    id: "preview-template1-id",
    slug: "template1-preview",
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
    template_id: "template1",
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
      wedding_id: "preview-template1-id",
      guest_name: "Hoàng Nam",
      content: "Chúc hai bạn trăm năm hạnh phúc, sớm đón quý tử nhé! Ngày vui trọn vẹn!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "preview-template1-id",
      guest_name: "Thùy Trang",
      content: "Chúc mừng Linh Chi và Anh Đức! Đôi bạn thanh mai trúc mã nay đã về chung một nhà rồi. Mãi hạnh phúc nha!",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 3,
      wedding_id: "preview-template1-id",
      guest_name: "Anh Tuấn & Lan Anh",
      content: "Hôn nhân là khởi đầu của một hành trình tuyệt đẹp. Chúc hai bạn luôn yêu thương và thấu hiểu nhau.",
      created_at: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  return <Template1 wedding={previewWedding} to={to} wishes={mockWishes} />;
}
