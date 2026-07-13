"use client";

import { useEffect, useState } from "react";
import TemplateCineLove46 from "@/components/templates/TemplateCineLove46";

export default function CineLove46PreviewPage() {
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTo(params.get("to") || "");
    }
  }, []);

  // Mock wedding data for preview matching the template info
  const previewWedding = {
    id: "preview-cinelove46",
    groom_name: "Tuấn Linh",
    bride_name: "Nguyễn Phượng",
    event_date: "2025-12-06T12:00:00",
    venue: "Tư Gia Nhà Trai",
    slug: "cinelove46-preview",
  };

  return <TemplateCineLove46 wedding={previewWedding} />;
}
