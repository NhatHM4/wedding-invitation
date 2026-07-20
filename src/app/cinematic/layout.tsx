import type { Metadata, Viewport } from "next";
import "./cinematic.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Tùng & Thúy — Thiệp Cưới",
  description:
    "Trân trọng kính mời bạn đến dự lễ cưới của Minh Tùng & Thanh Thúy — 25.10.2026",
  openGraph: {
    title: "Tùng & Thúy — Thiệp Cưới",
    description:
      "Trân trọng kính mời bạn đến dự lễ cưới của Minh Tùng & Thanh Thúy",
    type: "website",
    locale: "vi_VN",
  },
};

export default function CinematicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1a1a1a] text-[#F5F0E8] min-h-screen overflow-x-hidden cinematic-scroll">
      {children}
    </div>
  );
}
