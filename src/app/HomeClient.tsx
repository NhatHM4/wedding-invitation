"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function HomeClient() {
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [activeFeatureModal, setActiveFeatureModal] = useState<"guest-name" | "subdomain" | "realtime-wishes" | null>(null);
  const [demoGuestInput, setDemoGuestInput] = useState<string>("Minh Nhật");

  // Realtime Wishes Demo State
  const [demoWishes, setDemoWishes] = useState<Array<{ id: number; name: string; message: string; time: string; color: string }>>([
    { id: 1, name: "Anh Nam & Chị Mai", message: "Chúc hai bạn trăm năm hạnh phúc, sớm đón quý tử nhé! ❤️", time: "Vừa xong", color: "bg-rose-50 border-rose-200 text-rose-800" },
    { id: 2, name: "Chú Bảy", message: "Mừng ngày trọng đại của hai cháu. Chúc gia đình nhỏ luôn tràn ngập tiếng cười!", time: "2 phút trước", color: "bg-amber-50 border-amber-200 text-amber-800" },
    { id: 3, name: "Bạn Linh (Đại học)", message: "Mãi bên nhau hạnh phúc nha 2 bạn tui! 🎉🎉", time: "5 phút trước", color: "bg-blue-50 border-blue-200 text-blue-800" }
  ]);
  const [newWishName, setNewWishName] = useState("");
  const [newWishMessage, setNewWishMessage] = useState("");
  const [justAddedWishId, setJustAddedWishId] = useState<number | null>(null);

  const handleAddDemoWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishName.trim() || !newWishMessage.trim()) return;
    const newId = Date.now();
    const newWishItem = {
      id: newId,
      name: newWishName.trim(),
      message: newWishMessage.trim(),
      time: "Vừa xong",
      color: "bg-rose-50 border-rose-300 text-rose-800"
    };
    setDemoWishes([newWishItem, ...demoWishes]);
    setJustAddedWishId(newId);
    setNewWishName("");
    setNewWishMessage("");
    setTimeout(() => setJustAddedWishId(null), 3000);
  };

  const templates = [
    {
      id: "template-dovang",
      name: "Mẫu Á Đông Red-Gold",
      description: "Đậm nét truyền thống nhưng không kém phần quý phái. Ấn tượng với hiệu ứng mở cổng chào mở rèm nhung hoành tráng, cánh hoa đào rơi lãng mạn và nhạc nền ấm áp.",
      previewUrl: "/thiepmaudovang",
      badge: "Hiệu ứng Độc Quyền",
      colorClasses: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        accent: "#7d1f2a"
      },
      image: "/thiepmaudovang/images/preview.webp",
      scrollPreview: true
    },
    {
      id: "template-white-rose",
      name: "Mẫu Trắng Hồng Space",
      description: "Phong cách trắng hồng thanh lịch tinh khôi kết hợp hiệu ứng anti-gravity phong bì bay lượn độc đáo. Động cơ tinh vân cảm ứng nhạc nền sống động cùng hộp mừng cưới thông minh.",
      previewUrl: "/Template1",
      badge: "Mới Nhất",
      colorClasses: {
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-700",
        accent: "#f43f5e"
      },
      image: "/template1/preview/Template1.webp",
      scrollPreview: true
    },
    {
      id: "template-watercolor",
      name: "Mẫu Pop-Up Sách Nổi",
      description: "Cuốn sách màu nước 3D tuyệt đẹp với trang lật chân thực. Các lớp mô hình giấy lâu đài, rừng cây và cặp đôi dựng đứng sinh động, tương tác cảm biến con quay hồi chuyển tạo chiều sâu thực tế.",
      previewUrl: "/template2",
      badge: "Độc Đáo",
      colorClasses: {
        bg: "bg-orange-50",
        border: "border-rose-200",
        text: "text-rose-600",
        accent: "#f08080"
      },
      image: "/template2/preview/template2.webp",
      scrollPreview: true
    },
    {
      id: "template-bento",
      name: "Mẫu Bento Grid Magazine",
      description: "Thiết kế dạng lưới Bento hiện đại, tối ưu không gian hiển thị hình ảnh và thông tin sự kiện như một tạp chí thời trang cưới sang trọng.",
      previewUrl: "/template3",
      badge: "Bento Grid",
      colorClasses: {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        accent: "#047857"
      },
      image: "/template3/preview/template3.webp",
      scrollPreview: true
    },
    {
      id: "template-brutalist",
      name: "Mẫu Brutalist Art Gallery",
      description: "Phong cách thiết kế Brutalism phá cách, ấn tượng mạnh với đường nét cứng cáp, bố cục tự do và hiệu ứng trượt cuộn lồng ảnh nghệ thuật.",
      previewUrl: "/template4",
      badge: "Nghệ Thuật Cực Hạn",
      colorClasses: {
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        text: "text-indigo-700",
        accent: "#4338ca"
      },
      image: "/template4/preview/template4.webp",
      scrollPreview: true
    },
    {
      id: "template-kinetic",
      name: "Mẫu Typography Động",
      description: "Tập trung vào hiệu ứng chuyển động chữ (Kinetic Typography) ấn tượng, mặt nạ ảnh lồng chữ và các khối chữ chạy vô tận đầy hiện đại.",
      previewUrl: "/template5",
      badge: "Kinetic Motion",
      colorClasses: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-700",
        accent: "#e11d48"
      },
      image: "/template5/preview/template5.webp",
      scrollPreview: true
    },
    {
      id: "template-rosegold",
      name: "Mẫu Rose Gold & Blossom",
      description: "Mẫu thiệp lãng mạn sang trọng với tông màu kem đào, hoa hồng rơi nhẹ nhàng, kết hợp đếm ngược ngày hỷ, xác nhận RSVP thông minh và bank mừng cưới.",
      previewUrl: "/template6",
      badge: "Mới & Lãng Mạn",
      colorClasses: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-700",
        accent: "#8E4A49"
      },
      image: "/template6/preview/template6.webp",
      scrollPreview: true
    },
    {
      id: "template-neomorphic",
      name: "Mẫu Neomorphic Mini-OS",
      description: "Đột phá với phong cách thiết kế Skeuomorphism/Neomorphism giả lập hệ điều hành điện thoại sang trọng. Tích hợp thanh kéo lịch trình, album ảnh Polaroid tương tác vật lý sống động và nhạc nền thông minh.",
      previewUrl: "/template7",
      badge: "Độc Bản OS",
      colorClasses: {
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-700",
        accent: "#B8BEC6"
      },
      image: "/template7/preview/template7.webp",
      scrollPreview: true
    },
    {
      id: "template-cinelove38",
      name: "Mẫu Cinelove Golden Hour",
      description: "Phong cách Blush Floral & Golden Hour lãng mạn cao cấp. Tích hợp album ảnh cưới lightbox, đồng hồ đếm ngược, form xác nhận RSVP và hộp mừng cưới QR tiện lợi.",
      previewUrl: "/template8",
      badge: "Thiết Kế Mới",
      colorClasses: {
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-700",
        accent: "#e11d48"
      },
      image: "/template8/preview/template8.webp",
      scrollPreview: true
    }
  ];

  const features = [
    {
      title: "Đồng giá 99k",
      description: "Sở hữu thiệp cưới cao cấp trọn gói chỉ với 99.000 VNĐ, không phát sinh chi phí ẩn.",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Ảnh & Nhạc Không Giới Hạn",
      description: "Đăng tải album ảnh cưới bao nhiêu tùy thích, chèn bất cứ bản nhạc tình yêu nào bạn muốn phát.",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      title: "Cá Nhân Hóa Tên Khách Mời",
      description: "Tính năng tạo liên kết mời riêng biệt với tên người nhận tùy biến xuất hiện ngay trên thiệp cưới.",
      demoType: "guest-name",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Tên Miền Theo Tên Cô Dâu Chú Rể",
      description: "Sử dụng đường dẫn subdomain chuyên nghiệp, độc đáo mang đậm dấu ấn riêng của hai bạn.",
      demoType: "subdomain",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Nhận Lời Chúc Thời Gian Thực",
      description: "Khách mời gửi lời chúc trực tiếp và hiển thị ngay tức thì lên Sổ lưu bút chúc mừng của thiệp.",
      demoType: "realtime-wishes",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Sửa Thiệp Theo Yêu Cầu < 24h",
      description: "Cần chỉnh sửa cấu trúc hay yêu cầu riêng biệt? Admin hỗ trợ sửa lỗi nhanh chóng trong vòng 24 giờ.",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Lưu Trữ Thiệp Cưới 1 Năm",
      description: "Thiệp cưới online của hai bạn sẽ luôn hoạt động trực tuyến trong suốt 1 năm làm kỷ niệm bền lâu.",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div
      className="min-h-screen bg-[#FFF8F9] flex justify-center py-0 sm:py-8 antialiased"
      onClick={() => setActivePreviewId(null)}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Global CSS for custom luxury fonts and custom styles */}
      <style jsx global>{`
        .font-serif-lux {
          font-family: 'Playfair Display', serif;
        }
        .font-sans-lux {
          font-family: 'Montserrat', sans-serif;
        }
        .font-artistic {
          font-family: 'Alex Brush', cursive;
        }
        /* Custom scrollbar for mobile container content */
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(251, 113, 133, 0.05);
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(251, 113, 133, 0.2);
          border-radius: 10px;
        }

        /* Floating hearts animation defined globally to prevent nested style jsx compilation errors */
        @keyframes float-heart-10s {
          0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translateY(-350px) scale(1.2) rotate(15deg); opacity: 0; }
        }

        /* Preview pill hover transition defined globally to prevent nested style jsx compilation errors */
        .preview-pill {
          transition: opacity 300ms ease;
          opacity: 1;
        }
        :global(.group):hover .preview-pill {
          opacity: 0 !important;
          pointer-events: none;
        }
      `}</style>

      {/* Mobile-first main container */}
      <div className="w-full max-w-[480px] bg-white flex flex-col shadow-[0_10px_50px_rgba(244,63,94,0.08)] sm:rounded-[32px] overflow-hidden min-h-screen relative border border-rose-100/50">

        {/* Decorative Floating Luxury Elements */}
        <div className="absolute top-[-80px] left-[-80px] w-[260px] h-[260px] bg-gradient-to-tr from-rose-200/40 to-pink-100/30 rounded-full blur-3xl opacity-60 pointer-events-none z-0"></div>
        <div className="absolute top-[350px] right-[-100px] w-[240px] h-[240px] bg-gradient-to-bl from-pink-200/30 to-amber-100/20 rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>
        <div className="absolute bottom-[-60px] left-[-60px] w-[220px] h-[220px] bg-gradient-to-tr from-rose-200/30 to-red-100/20 rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>

        {/* Subtle Luxury Pattern Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(#fecdd3_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.25] pointer-events-none z-0"></div>

        {/* Header */}
        <header className="sticky top-0 w-full h-[70px] bg-white/90 backdrop-blur-md border-b border-rose-100/60 px-6 flex items-center justify-between z-50 shadow-[0_2px_15px_rgba(244,63,94,0.015)]">
          <div className="flex flex-col">
            <span className="text-lg font-bold font-serif-lux tracking-wide bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Hạnh Phúc
            </span>
            <span className="text-[7.5px] uppercase tracking-[0.2em] text-rose-400 font-bold -mt-0.5">
              SAVE THE DATE
            </span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider px-3.5 py-1.5 bg-rose-50/70 border border-rose-100/80 text-rose-600 rounded-full shadow-[inset_0_1px_2px_rgba(244,63,94,0.05)]">
            Thiệp Cưới Online
          </span>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scroll z-10 flex flex-col pb-6">

          {/* Hero Banner Section */}
          <section className="px-6 pt-10 pb-6 text-center flex flex-col items-center gap-2 relative">
            {/* Calligraphic greeting */}
            <span className="font-artistic text-[38px] text-rose-400 font-medium leading-none mb-1 drop-shadow-sm select-none">
              Lưu giữ trăm năm
            </span>
            <h1 className="text-2xl sm:text-[26px] font-bold font-serif-lux text-gray-800 leading-tight tracking-tight mt-1">
              Tạo Thiệp Cưới Online & Website Đám Cưới <br />
              <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">Save The Date</span>
            </h1>
            <p className="text-[12px] text-gray-500 max-w-[290px] leading-relaxed font-sans-lux mt-2">
              Tạo thiệp cưới điện tử sang trọng chỉ trong 5 phút. Tích hợp RSVP, thiệp cưới QR code & gửi Zalo/Facebook dễ dàng.
            </p>
            {/* Elegant Floral Divider */}
            <div className="flex items-center gap-3 w-full justify-center mt-3 opacity-60">
              <div className="h-[0.5px] bg-rose-200 w-12"></div>
              <span className="text-rose-400 text-xs">✿</span>
              <div className="h-[0.5px] bg-rose-200 w-12"></div>
            </div>
          </section>

          {/* 1. SHOWCASE TEMPLATES SECTION FIRST (2 Columns Grid) */}
          <section className="px-4 flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1 px-1.5">
              <h2 className="text-[15px] font-bold text-gray-800 font-serif-lux flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 border border-white shadow-sm"></span>
                Mẫu Thiệp Cưới Online & Điện Tử Đẹp
              </h2>
              <p className="text-[10.5px] text-gray-400 font-sans-lux">Chạm vào thiệp để xem trước hiệu ứng cuộn</p>
            </div>

            {/* 2 Columns Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="flex flex-col bg-white rounded-xl overflow-hidden border border-rose-100/50 shadow-[0_4px_25px_rgba(244,63,94,0.02)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(244,63,94,0.06)]"
                >
                  {/* Clean 9:16 Frame as standard hyperlink to match Zenlove */}
                  <a
                    href={tpl.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn click lan ra ngoài làm reset active state
                      if (activePreviewId !== tpl.id) {
                        e.preventDefault(); // Lần đầu chạm: chặn chuyển trang, kích hoạt tự động scroll preview
                        setActivePreviewId(tpl.id);
                      }
                    }}
                    className="group relative w-full aspect-[9/16] overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] bg-rose-50/10 border-b border-rose-100/20 block cursor-pointer"
                  >
                    {/* Live Simulation / Image Container */}
                    <div className="absolute inset-0 w-full h-full">
                      {tpl.scrollPreview ? (
                        /* Standard img tag handles w-full h-auto absolute positioning perfectly and scales dynamically without parent wrapper stretching issues */
                        <img
                          src={tpl.image}
                          alt={`Mẫu thiệp cưới online ${tpl.name} - Save The Date`}
                          width={360}
                          height={640}
                          loading="lazy"
                          decoding="async"
                          className={`w-full min-h-full h-auto absolute left-0 top-0 translate-y-0 object-cover object-top transition-[top,transform] duration-500 ease-out group-hover:animate-scroll-down ${activePreviewId === tpl.id ? "animate-scroll-down" : ""
                            }`}
                        />
                      ) : (
                        <Image
                          src={tpl.image}
                          alt={`Mẫu thiệp cưới online ${tpl.name} - Save The Date`}
                          fill
                          sizes="(max-width: 480px) 50vw, 200px"
                          loading="lazy"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>

                    {/* Floating Hearts Mockup Overlay (only for templates that are not dovang) */}
                    {tpl.id !== "template-dovang" && (
                      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                        <span className="absolute bottom-[-20px] left-[20%] text-rose-400 text-base opacity-0" style={{ animation: "float-heart-10s 6s infinite linear" }}>❤️</span>
                        <span className="absolute bottom-[-20px] left-[55%] text-rose-500 text-lg opacity-0" style={{ animation: "float-heart-10s 8s infinite linear 2s" }}>💖</span>
                        <span className="absolute bottom-[-20px] left-[80%] text-pink-400 text-sm opacity-0" style={{ animation: "float-heart-10s 7s infinite linear 4s" }}>💕</span>
                      </div>
                    )}

                    {/* "Xem mẫu" pill at the bottom - visible in normal state, fades out on hover */}
                    {tpl.scrollPreview && (
                      <div className={`preview-pill absolute bottom-3.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-rose-100 text-rose-600 text-[10px] font-bold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(244,63,94,0.1)] z-30 flex items-center gap-1.5 ${activePreviewId === tpl.id ? "opacity-0 pointer-events-none" : ""
                        }`}>
                        <svg className="w-2.5 h-2.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}

                    {/* Pulsing button when active on mobile (activePreviewId === tpl.id) */}
                    {activePreviewId === tpl.id && (
                      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-[0_4px_15px_rgba(225,29,72,0.35)] z-30 animate-pulse flex items-center gap-1.5 pointer-events-none">
                        <span>XEM</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    )}

                  </a>

                  {/* Template Info (Tên gọn gàng phía dưới) */}
                  <div className="flex flex-col gap-0.5 py-3 px-3.5">
                    <span className="text-[7.5px] font-bold uppercase tracking-wider self-start text-[#db2777]">
                      {tpl.badge === "Hiệu ứng Độc Quyền" ? "Exclusive" : "Popular"}
                    </span>
                    <h3 className="text-[11.5px] font-bold text-gray-800 font-serif-lux leading-tight truncate">
                      {tpl.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Luxury Spacer */}
          <div className="my-8 px-6 flex items-center justify-center">
            <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-rose-100 to-transparent"></div>
          </div>

          {/* 2. SHOWCASE FEATURES SECTION */}
          <section className="px-5 flex flex-col gap-6">
            <div className="flex flex-col gap-1 px-0.5">
              <h2 className="text-[15px] font-bold text-gray-800 font-serif-lux flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 border border-white shadow-sm"></span>
                Tính Năng Thiệp Cưới Điện Tử Vượt Trội
              </h2>
              <p className="text-[10.5px] text-gray-400 font-sans-lux">Nền tảng thiệp cưới online tối ưu & đầy đủ nhất</p>
            </div>

            {/* Features list in 2-column or list styled cards */}
            <div className="flex flex-col gap-3.5">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (feat.demoType) {
                      setActiveFeatureModal(feat.demoType as "guest-name" | "subdomain" | "realtime-wishes");
                    }
                  }}
                  className={`flex items-start gap-4 p-3.5 rounded-[20px] bg-white border border-rose-100/40 shadow-[0_2px_15px_rgba(244,63,94,0.015)] transition-all duration-300 ${feat.demoType
                    ? "cursor-pointer hover:border-rose-300 hover:shadow-[0_6px_25px_rgba(244,63,94,0.08)] relative group border-rose-200/80"
                    : "hover:shadow-[0_4px_20px_rgba(244,63,94,0.04)]"
                    }`}
                >
                  <div className="p-3.5 rounded-[16px] bg-rose-50/70 border border-rose-100/30 shrink-0 text-rose-500 shadow-[inset_0_1px_3px_rgba(244,63,94,0.05)]">
                    {feat.icon}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[13px] font-bold text-gray-800 font-serif-lux flex items-center gap-1.5">
                        {feat.title}
                      </h3>
                      {feat.demoType && (
                        <span className="text-[9.5px] font-extrabold text-rose-600 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 animate-pulse group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <span>Xem minh họa</span>
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans-lux">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Luxury Spacer */}
          <div className="my-8 px-6 flex items-center justify-center">
            <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-rose-100 to-transparent"></div>
          </div>

          {/* 3. DEVELOPER CONTACT & LETTER NOTE */}
          <section className="px-5 flex flex-col gap-6">
            <div className="flex flex-col gap-1 px-0.5">
              <h2 className="text-[15px] font-bold text-gray-800 font-serif-lux flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 border border-white shadow-sm"></span>
                Liên Hệ Hỗ Trợ
              </h2>
              <p className="text-[10.5px] text-gray-400 font-sans-lux">Admin hỗ trợ thiết kế mọi ý muốn của bạn</p>
            </div>

            {/* Letter Container styled as a Luxury Invitation Card */}
            <div className="w-full bg-rose-50/30 border border-rose-100/50 rounded-[28px] p-6 flex flex-col gap-5 relative shadow-[0_2px_20px_rgba(244,63,94,0.01)] overflow-hidden">

              {/* Elegant Wax Seal Icon Watermark */}
              <div className="absolute right-[-15px] bottom-[-15px] opacity-[0.04] pointer-events-none select-none">
                <svg className="w-36 h-36" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold font-serif-lux shadow-md border-2 border-white">
                  AD
                </div>
                <div className="flex flex-col">
                  <span className="text-[12.5px] font-bold text-gray-800 font-serif-lux">Quýt Kiếm Sỹ</span>
                  <span className="text-[9px] uppercase tracking-wider text-rose-500 font-extrabold">ADMIN / DEVELOPER</span>
                </div>
              </div>

              <p className="text-[12px] text-gray-600 leading-relaxed italic font-sans-lux relative pl-3 border-l-2 border-rose-300">
                &ldquo;Đặc biệt, vì mình là lập trình viên phát triển trực tiếp hệ thống này nên sẽ rất linh động trong tất cả tình huống chỉnh sửa. Nếu hai bạn có bất kỳ yêu cầu riêng biệt nào (đổi màu, sắp xếp lại bố cục, thêm tính năng...), đừng ngần ngại nhắn tin hoặc liên lạc trực tiếp cho mình nhé!&rdquo;
              </p>

              <div className="w-full h-[0.5px] bg-rose-100/50"></div>

              {/* Contact actions */}
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://zalo.me/0798128201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[45px] rounded-xl bg-[#0068ff] text-white items-center justify-center gap-2 font-bold text-[13px] shadow-[0_4px_15px_rgba(0,104,255,0.25)] hover:opacity-90 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                  Liên Hệ Zalo hỗ trợ
                </a>
              </div>
            </div>
          </section>

          {/* Luxury Spacer */}
          <div className="my-8 px-6 flex items-center justify-center">
            <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-rose-100 to-transparent"></div>
          </div>

          {/* 4. FAQ SECTION (SEO Rich Snippets) */}
          <section className="px-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1 px-0.5">
              <h2 className="text-[15px] font-bold text-gray-800 font-serif-lux flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 border border-white shadow-sm"></span>
                Câu Hỏi Thường Gặp (FAQ)
              </h2>
              <p className="text-[10.5px] text-gray-400 font-sans-lux">Giải đáp thắc mắc về tạo thiệp cưới điện tử SaveTheDate</p>
            </div>

            <div className="flex flex-col gap-3 font-sans-lux">
              <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100/60 flex flex-col gap-1.5 shadow-sm">
                <h3 className="font-bold text-rose-800 text-[12.5px]">Tạo thiệp cưới online tại SaveTheDate mất bao lâu?</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed">Bạn có thể tạo và tùy chỉnh website thiệp cưới điện tử sang trọng chỉ trong vòng 5 phút với đầy đủ thông tin, album ảnh và nhạc nền.</p>
              </div>
              <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100/60 flex flex-col gap-1.5 shadow-sm">
                <h3 className="font-bold text-rose-800 text-[12.5px]">Thiệp cưới điện tử có chia sẻ qua Zalo, Facebook được không?</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed">Hoàn toàn được! Thiệp cưới SaveTheDate được tối ưu hình ảnh preview nét đẹp khi gửi qua Zalo, Facebook, Messenger, iMessage và hỗ trợ cá nhân hóa tên từng khách mời.</p>
              </div>
              <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100/60 flex flex-col gap-1.5 shadow-sm">
                <h3 className="font-bold text-rose-800 text-[12.5px]">SaveTheDate có hỗ trợ tên miền riêng (custom domain) không?</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed">Có, hệ thống hỗ trợ gán tên miền riêng (VD: codau-chure.com) hoặc subdomain theo tên cô dâu chú rể giúp thiệp cưới chuyên nghiệp và độc đáo.</p>
              </div>
              <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100/60 flex flex-col gap-1.5 shadow-sm">
                <h3 className="font-bold text-rose-800 text-[12.5px]">Giá tạo thiệp cưới online là bao nhiêu?</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed">SaveTheDate cung cấp thiệp cưới online cao cấp trọn gói đồng giá 99.000 VNĐ không phát sinh chi phí ẩn, lưu trữ 1 năm.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="h-[75px] bg-[#FFFBFB] border-t border-rose-100/60 px-6 flex items-center justify-center text-[10px] text-gray-400 text-center z-10 shrink-0 font-sans-lux leading-relaxed">
          &copy; {new Date().getFullYear()} Thiệp Cưới Online Hạnh Phúc.<br />
          <span className="text-[9px] text-rose-400 font-semibold tracking-wider uppercase mt-0.5 block">Lưu giữ tình yêu trọn vẹn của hai bạn</span>
        </footer>
      </div>

      {/* FEATURE DEMO MODAL */}
      {activeFeatureModal && (
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          onClick={() => setActiveFeatureModal(null)}
        >
          <div
            className="w-full max-w-[430px] max-h-[90vh] bg-white rounded-[28px] overflow-y-auto custom-scroll border border-rose-100 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-5 flex flex-col gap-4 relative animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveFeatureModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm hover:bg-rose-100 transition-colors z-20 shadow-sm border border-rose-100"
            >
              ✕
            </button>

            {activeFeatureModal === "guest-name" ? (
              <div className="flex flex-col gap-4">
                <div className="text-center flex flex-col items-center pt-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                    Tính Năng Nổi Bật
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#7d1f2a] font-serif-lux mt-2 uppercase tracking-wide">
                    TÍNH NĂNG ĐIỀN TÊN KHÁCH MỜI
                  </h2>
                  <div className="w-14 h-[2px] bg-rose-300 my-1.5 rounded-full"></div>
                </div>

                <div className="bg-rose-50/40 p-3 rounded-2xl border border-rose-100/60 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2 text-center text-[9.5px] font-bold text-gray-800 uppercase tracking-tight">
                    <div className="flex flex-col items-center leading-tight">
                      <span className="text-gray-400 font-normal">1. Trước khi điền tên</span>
                      <span className="text-gray-600 font-extrabold">(Hiện dãy dấu ...)</span>
                    </div>
                    <div className="flex flex-col items-center leading-tight text-rose-700">
                      <span className="text-rose-500 font-normal">2. Sau khi điền tên</span>
                      <span className="text-rose-700 font-extrabold">(Viết tên lên dấu ...)</span>
                    </div>
                  </div>

                  <div className="flex items-stretch justify-between gap-1.5 min-w-0">
                    <div className="flex-1 min-w-0 bg-white rounded-xl border-2 border-stone-200 shadow-sm p-2 flex flex-col justify-between items-center">
                      <div className="w-full bg-[#FFFBF7] rounded-lg border border-amber-200/60 p-3 flex flex-col items-center justify-center text-center min-w-0 min-h-[90px]">
                        <div className="w-full bg-stone-50/80 rounded-lg p-2.5 border-2 border-stone-200 flex flex-col items-center justify-center min-w-0">
                          <span className="text-[7.5px] text-stone-600 uppercase tracking-wider font-bold whitespace-nowrap mb-0.5">TRÂN TRỌNG KÍNH MỜI</span>
                          <div className="relative inline-flex items-center justify-center w-full mt-1 overflow-hidden">
                            <span className="text-stone-400 font-mono tracking-[0.25em] text-[10px] whitespace-nowrap">
                              ......................
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[7.5px] text-gray-400 italic mt-1.5 whitespace-nowrap">Chỉ có dãy dấu chấm</span>
                    </div>

                    <div className="flex flex-col items-center justify-center shrink-0 text-rose-500 font-bold px-0.5">
                      <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0 bg-white rounded-xl border-2 border-rose-500 shadow-md p-2 flex flex-col justify-between items-center relative">
                      <span className="absolute -top-2.5 bg-rose-600 text-white text-[6.5px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10 whitespace-nowrap">
                        Đã điền tên
                      </span>
                      <div className="w-full bg-[#FFFBF7] rounded-lg border border-amber-200/60 p-3 flex flex-col items-center justify-center text-center min-w-0 min-h-[90px]">
                        <div className="w-full bg-white rounded-lg p-2.5 border-2 border-rose-600 shadow-inner flex flex-col items-center justify-center min-w-0">
                          <span className="text-[7.5px] text-stone-600 uppercase tracking-wider font-bold whitespace-nowrap mb-0.5">TRÂN TRỌNG KÍNH MỜI</span>
                          <div className="relative inline-flex items-center justify-center w-full mt-1 overflow-hidden">
                            <span className="absolute bottom-0 text-stone-300 font-mono tracking-[0.25em] text-[10px] pointer-events-none select-none whitespace-nowrap">
                              ......................
                            </span>
                            <span className="relative z-10 text-[15px] font-bold text-red-600 font-ephesis leading-none pb-0.5 truncate max-w-full px-0.5">
                              {demoGuestInput || "Minh Nhật"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[7.5px] text-rose-600 font-extrabold truncate max-w-[120px] mt-1.5 whitespace-nowrap">Viết tên lên dấu ...</span>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-rose-200/80 flex flex-col gap-1.5 shadow-sm mt-0.5">
                    <label className="text-[10px] font-bold text-rose-700 uppercase tracking-wider flex items-center justify-between">
                      <span>✍️ Thử nhập tên để xem trực tiếp:</span>
                      <span className="text-[8px] text-gray-400 font-normal">Nhập gì cũng được</span>
                    </label>
                    <input
                      type="text"
                      value={demoGuestInput}
                      onChange={(e) => setDemoGuestInput(e.target.value)}
                      placeholder="Ví dụ: Chị Thảo, Gia đình Anh Hùng..."
                      className="w-full text-xs px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-lg outline-none focus:border-rose-500 focus:bg-white transition-colors text-red-600 font-semibold"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 text-[11px] text-gray-700 font-sans-lux bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0">👉</span>
                    <span><strong className="text-gray-900 font-bold">Không giới hạn</strong> lượt tạo tên khách mời.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0">👉</span>
                    <span>Tạo tên <strong className="text-gray-900 font-bold">từng khách</strong> hoặc nhập <strong className="text-gray-900 font-bold">danh sách hàng loạt</strong> nhanh chóng.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0">👉</span>
                    <span>Hỗ trợ <strong className="text-gray-900 font-bold">theo dõi khách đã xem thiệp</strong> hay chưa.</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveFeatureModal(null)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 text-white font-bold text-xs shadow-md hover:opacity-95 transition-opacity"
                >
                  Đã Hiểu
                </button>
              </div>
            ) : activeFeatureModal === "realtime-wishes" ? (
              <div className="flex flex-col gap-4">
                <div className="text-center flex flex-col items-center pt-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#70151e] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                    Tính Năng Nổi Bật
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#70151e] font-serif-lux mt-2 uppercase tracking-wide">
                    NHẬN LỜI CHÚC THỜI GIAN THỰC
                  </h2>
                  <div className="w-14 h-[2px] bg-[#70151e] my-1.5 rounded-full"></div>
                </div>

                <div className="bg-[#FFFBF5] p-3 rounded-2xl border-2 border-amber-200/80 shadow-md flex flex-col gap-3 relative overflow-hidden">
                  <div className="bg-[#70151e] p-3.5 rounded-2xl flex flex-col gap-2.5 shadow-md border border-rose-900">
                    <div className="bg-white/95 rounded-xl px-3 py-2 text-[10.5px] text-rose-400 font-sans border border-rose-100/50">
                      Tên của bạn là? *
                    </div>
                    <div className="bg-white/95 rounded-xl px-3 py-2 text-[10.5px] text-rose-400 font-sans border border-rose-100/50">
                      Bạn là gì của Dâu Rể nhỉ? *
                    </div>
                    <div className="bg-white/95 rounded-xl px-3 py-2 text-[10.5px] text-rose-400 font-sans border border-rose-100/50">
                      Gửi lời chúc đến Dâu Rể nhé!
                    </div>
                    <div className="bg-white/95 rounded-xl px-3 py-2 text-[10.5px] text-gray-700 font-sans flex items-center justify-between border border-rose-100/50">
                      <span>Bạn Có Tham Dự Không? *</span>
                      <span className="text-xs text-stone-400">▼</span>
                    </div>

                    <div className="flex justify-center mt-1">
                      <button className="bg-white text-[#70151e] font-bold text-[11px] px-7 py-2 rounded-xl shadow-md uppercase tracking-wider">
                        GỬI NGAY
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 my-1">
                    <button className="bg-[#70151e] text-white font-bold text-xs px-6 py-2 rounded-xl shadow-md uppercase tracking-wider border border-rose-900">
                      GỬI MỪNG CƯỚI
                    </button>
                    <span className="text-[#e1697b] text-3xl font-serif leading-none mt-1">囍</span>
                    <h3 className="font-artistic text-2xl text-[#70151e] font-bold leading-none">
                      Sổ Lưu Bút Lời Chúc
                    </h3>
                  </div>

                  <div className="bg-[#70151e] p-3 rounded-2xl flex flex-col gap-2.5 shadow-md border border-rose-900">
                    <form onSubmit={handleAddDemoWish} className="bg-white/95 rounded-xl p-2.5 flex flex-col gap-2 border border-rose-100">
                      <span className="text-[10px] font-bold text-[#70151e] uppercase tracking-wider">✍️ Thử gửi lời chúc thực tế:</span>
                      <input
                        type="text"
                        value={newWishName}
                        onChange={(e) => setNewWishName(e.target.value)}
                        placeholder="Tên của bạn..."
                        className="w-full text-[11px] px-2.5 py-1.5 bg-rose-50/50 border border-rose-200 rounded-lg outline-none focus:border-rose-500 text-gray-800"
                      />
                      <input
                        type="text"
                        value={newWishMessage}
                        onChange={(e) => setNewWishMessage(e.target.value)}
                        placeholder="Lời chúc gửi Dâu Rể..."
                        className="w-full text-[11px] px-2.5 py-1.5 bg-rose-50/50 border border-rose-200 rounded-lg outline-none focus:border-rose-500 text-gray-800"
                      />
                      <button
                        type="submit"
                        className="w-full py-1.5 bg-[#70151e] text-white font-bold text-[11px] rounded-lg shadow-sm hover:bg-rose-900 transition-colors uppercase tracking-wider"
                      >
                        Gửi Lời Chúc Ngay
                      </button>
                    </form>

                    <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto custom-scroll pr-1">
                      {demoWishes.map((w) => (
                        <div
                          key={w.id}
                          className={`bg-white rounded-xl p-2.5 flex flex-col gap-1 shadow-sm relative transition-all duration-500 ${justAddedWishId === w.id ? "ring-2 ring-amber-400 animate-bounce" : ""
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#70151e] truncate">{w.name}</span>
                            <span className="text-[9px] text-gray-400">{w.time}</span>
                          </div>
                          <p className="text-[10.5px] text-gray-700 leading-snug">{w.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveFeatureModal(null)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 text-white font-bold text-xs shadow-md"
                >
                  Đã Hiểu
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="text-center flex flex-col items-center pt-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    Tùy Biến Tên Miền
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-gray-800 font-serif-lux mt-2 uppercase tracking-wide">
                    TÊN MIỀN RIÊNG
                  </h2>
                  <div className="w-14 h-[2px] bg-indigo-300 my-1.5 rounded-full"></div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Đường dẫn mặc định</span>
                    <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-gray-200 text-[11px] text-gray-400 truncate">
                      <span className="text-xs shrink-0">🌐</span>
                      <span className="truncate">savethedate.io.vn/template</span>
                    </div>
                  </div>
                  <div className="flex justify-center text-rose-500">
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7-7H3" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider flex items-center justify-between">
                      <span>Tên miền riêng</span>
                      <span className="bg-rose-100 text-rose-700 text-[8.5px] px-2 py-0.5 rounded-full font-extrabold">Độc Quyền</span>
                    </span>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 px-3.5 py-3 rounded-xl border-2 border-rose-400 text-[12px] font-bold text-rose-700 truncate shadow-sm">
                      <span className="text-xs shrink-0">🔒</span>
                      <span className="truncate">minhhoang-maihuong.savethedate.io.vn</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 text-[11px] text-gray-700 font-sans-lux bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0">👉</span>
                    <span><strong className="text-gray-900 font-bold">Tên miền độc quyền</strong> dạng <code className="bg-rose-50 text-rose-600 px-1 py-0.5 rounded text-[10px]">codau-chure.savethedate.io.vn</code>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0">👉</span>
                    <span>Dễ nhớ, chuyên nghiệp, tự tin chia sẻ Zalo/Messenger.</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveFeatureModal(null)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-500 text-white font-bold text-xs shadow-md"
                >
                  Đã Hiểu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
