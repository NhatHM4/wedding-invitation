"use client";

import { use } from "react";
import { Wedding, Wish } from "@/types";
import LovePassportTemplate from "@/components/template12/LovePassportTemplate";

export const runtime = 'edge';

interface PageProps {
  searchParams: Promise<{ to?: string }>;
}

export default function Template12Page({ searchParams }: PageProps) {
  const resolvedParams = use(searchParams);
  const to = resolvedParams?.to || "Quý khách";

  const mockWedding: Wedding = {
    id: "template12-passport-id",
    slug: "love-passport-journey",
    template_id: "template12",
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
      wedding_id: "template12-passport-id",
      guest_name: "Hoàng Nam",
      content: "Chúc hai bạn một hành trình mới ngập tràn tiếng cười, hạnh phúc và bình an trọn vẹn!",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      wedding_id: "template12-passport-id",
      guest_name: "Trang Anh",
      content: "Chúc hai chiếc hành khách đáng yêu nhất luôn đồng hành cùng nhau trên mọi chuyến đi cuộc đời!",
      created_at: new Date().toISOString(),
    },
  ];

  return <LovePassportTemplate wedding={mockWedding} to={to} wishes={mockWishes} />;
}
