"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
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
      image: "/thiepmaudovang/images/ceremony-photo.jpg"
    },
    {
      id: "template-classic",
      name: "Mẫu Classic Romantic",
      description: "Thanh lịch, dịu dàng phương Tây với tông màu kem ấm áp. Bố cục tối giản, sang trọng, tập trung vào khoảnh khắc tình yêu và lời chúc của khách mời.",
      previewUrl: "/card/minhhoang-maihuong",
      badge: "Được Yêu Thích Nhất",
      colorClasses: {
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-700",
        accent: "#db2777"
      },
      image: "/thiepmaudovang/images/cover.jpg"
    }
  ];

  const [activeTemplate, setActiveTemplate] = useState(templates[0]);

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
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Tên Miền Theo Tên Cô Dâu Chú Rể",
      description: "Sử dụng đường dẫn subdomain chuyên nghiệp, độc đáo mang đậm dấu ấn riêng của hai bạn.",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Nhận Lời Chúc Thời Gian Thực",
      description: "Khách mời gửi lời chúc trực tiếp và hiển thị ngay tức thì lên Sổ lưu bút chúc mừng của thiệp.",
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
    <div className="min-h-screen bg-[#FFF5F6] flex justify-center py-0 sm:py-6 antialiased font-sans">
      
      {/* Mobile-first main container */}
      <div className="w-full max-w-[480px] bg-white flex flex-col shadow-2xl sm:rounded-3xl overflow-hidden min-h-screen relative border border-[#FFE0E5]">
        
        {/* Floating background blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-rose-100 rounded-full blur-3xl opacity-60 pointer-events-none z-0"></div>
        <div className="absolute top-[400px] right-[-100px] w-[200px] h-[200px] bg-pink-100 rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-rose-100 rounded-full blur-3xl opacity-40 pointer-events-none z-0"></div>

        {/* Header */}
        <header className="sticky top-0 w-full h-[65px] bg-white/80 backdrop-blur-md border-b border-[#FFE0E5] px-5 flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-serif tracking-tight text-rose-600">
              Hạnh Phúc
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-rose-50 border border-rose-200 text-rose-600 rounded-full">
            Thiệp Cưới Online
          </span>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto z-10 flex flex-col">
          
          {/* Hero Banner Section */}
          <section className="px-5 py-8 text-center flex flex-col items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#333] leading-tight mt-2">
              Thiệp Cưới Online <br />
              <span className="text-rose-500">Hạnh Phúc</span>
            </h1>
            <p className="text-[13px] text-gray-500 max-w-[320px] leading-relaxed">
              Tạo lời mời trọn vẹn, lưu giữ khoảnh khắc trăm năm. Tối ưu hoàn hảo cho di động, giao diện mượt mà và dễ dàng chia sẻ.
            </p>
            <div className="w-[80px] h-[2px] bg-rose-300 my-1 rounded"></div>
          </section>

          {/* ── LIVE INTERACTIVE PREVIEW SECTION ── */}
          <section className="px-5 py-4 flex flex-col items-center gap-5">
            <div className="text-center flex flex-col gap-1">
              <h2 className="text-sm font-bold text-gray-800 font-serif flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                Bản Chạy Thử Trực Tiếp (Live Demo)
              </h2>
              <p className="text-[11px] text-gray-400">Xem trước hoạt ảnh mở rèm và chạy thực tế bên dưới</p>
            </div>

            {/* Template Selector Tabs */}
            <div className="flex bg-rose-50/60 p-1.5 rounded-xl border border-rose-100 w-full max-w-[340px]">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setActiveTemplate(tpl)}
                  className={`flex-1 text-[11px] font-bold py-2 px-3 rounded-lg transition-all ${
                    activeTemplate.id === tpl.id
                      ? "bg-rose-500 text-white shadow-md"
                      : "text-gray-500 hover:text-rose-500"
                  }`}
                >
                  {tpl.name.replace("Mẫu ", "")}
                </button>
              ))}
            </div>

            {/* Interactive Phone Mockup Frame */}
            <div className="relative w-[280px] h-[480px] border-[10px] border-[#222] rounded-[38px] shadow-2xl overflow-hidden bg-rose-50 flex items-center justify-center">
              {/* Speaker & camera dots */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[60px] h-[15px] bg-[#222] rounded-full z-30 flex items-center justify-center gap-1.5 px-3">
                <div className="w-[18px] h-[3px] bg-gray-600 rounded-full"></div>
                <div className="w-[4px] h-[4px] bg-gray-600 rounded-full"></div>
              </div>

              {/* Live iframe loading the template */}
              <iframe
                src={activeTemplate.previewUrl}
                title="Live Wedding Template Preview"
                className="w-full h-full border-none pointer-events-auto z-10 pt-[25px]"
                allow="autoplay"
              />
            </div>
            
            {/* Direct preview page button */}
            <a
              href={activeTemplate.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1 mt-1"
            >
              Xem bản đầy đủ trên tab mới
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </section>

          {/* Divider */}
          <div className="w-full h-2.5 bg-rose-50/50 border-y border-[#FFE0E5]"></div>

          {/* 1. SHOWCASE TEMPLATES SECTION FIRST */}
          <section className="px-5 py-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-[#333] font-serif flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                Danh Sách Mẫu Thiệp
              </h2>
              <p className="text-[11px] text-gray-400">Chọn xem thử để trải nghiệm hiệu ứng hình ảnh và âm nhạc thực tế</p>
            </div>

            <div className="flex flex-col gap-6">
              {templates.map((tpl) => (
                <div 
                  key={tpl.id}
                  className="w-full bg-white rounded-2xl border border-rose-100 shadow-[0_4px_20px_rgba(244,63,94,0.06)] overflow-hidden flex flex-col"
                >
                  {/* Fake Device Image Frame */}
                  <div className="relative w-full h-[180px] bg-gray-50 overflow-hidden group">
                    <Image
                      src={tpl.image}
                      alt={tpl.name}
                      fill
                      sizes="480px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span className={`absolute top-3 right-3 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/95 border ${tpl.colorClasses.text} border-rose-100 shadow`}>
                      {tpl.badge}
                    </span>
                  </div>

                  {/* Card Description */}
                  <div className="p-4 sm:p-5 flex flex-col gap-3">
                    <h3 className="text-base font-bold text-gray-800 font-serif">
                      {tpl.name}
                    </h3>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                      {tpl.description}
                    </p>
                    <a
                      href={tpl.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-[40px] mt-2 flex items-center justify-center rounded-xl text-white font-bold text-[13px] shadow-lg shadow-rose-200 hover:shadow-xl transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${tpl.colorClasses.accent} 0%, #db2777 100%)`
                      }}
                    >
                      XEM THỬ GIAO DIỆN
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="w-full h-2.5 bg-rose-50/50 border-y border-[#FFE0E5]"></div>

          {/* 2. SHOWCASE FEATURES SECTION */}
          <section className="px-5 py-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-[#333] font-serif flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                Tính Năng Nổi Bật
              </h2>
              <p className="text-[11px] text-gray-400">Nền tảng thiệp cưới online tối ưu và đầy đủ nhất</p>
            </div>

            {/* Features list */}
            <div className="flex flex-col gap-4">
              {features.map((feat, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-rose-50/60 shadow-[0_2px_12px_rgba(244,63,94,0.03)]"
                >
                  <div className="p-2.5 rounded-xl bg-rose-50 shrink-0">
                    {feat.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[13px] font-bold text-gray-800">
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="w-full h-2.5 bg-rose-50/50 border-y border-[#FFE0E5]"></div>

          {/* 3. DEVELOPER CONTACT & LETTER NOTE */}
          <section className="px-5 py-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-[#333] font-serif flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                Liên Hệ Hỗ Trợ
              </h2>
              <p className="text-[11px] text-gray-400">Admin sẽ hỗ trợ tư vấn mọi mong muốn của bạn</p>
            </div>

            {/* Letter Container */}
            <div className="w-full bg-rose-50/40 border border-rose-100 rounded-2xl p-5 flex flex-col gap-4 relative shadow-[inset_0_2px_8px_rgba(244,63,94,0.02)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold font-serif shadow-md border-2 border-white">
                  AD
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-800">Nhật H.M (Admin)</span>
                  <span className="text-[10px] text-rose-500 font-semibold">Người phát triển trực tiếp</span>
                </div>
              </div>

              <p className="text-[12px] text-gray-600 leading-relaxed italic">
                &ldquo;Đặc biệt, vì mình là lập trình viên phát triển trực tiếp hệ thống này nên sẽ rất linh động trong tất cả tình huống chỉnh sửa. Nếu hai bạn có bất kỳ yêu cầu riêng biệt nào (đổi màu, sắp xếp lại bố cục, thêm tính năng...), đừng ngần ngại nhắn tin hoặc liên lạc trực tiếp cho mình nhé!&rdquo;
              </p>

              <div className="w-full h-[1px] bg-rose-100"></div>

              {/* Contact actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <a 
                  href="https://zalo.me/0932204787" // Custom placeholder or your actual Zalo
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-[42px] rounded-xl bg-[#0068ff] text-white flex items-center justify-center gap-2 font-bold text-[13px] shadow shadow-[#0068ff]/30 hover:opacity-90"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                  Liên Hệ Zalo
                </a>
                <a 
                  href="tel:0932204787"
                  className="flex-1 h-[42px] rounded-xl border border-rose-200 bg-white text-rose-600 flex items-center justify-center gap-2 font-bold text-[13px] shadow hover:bg-rose-50/50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Gọi Điện Thoại
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="h-[60px] bg-white border-t border-[#FFE0E5] px-5 flex items-center justify-center text-[10px] text-gray-400 text-center z-10 shrink-0">
          &copy; {new Date().getFullYear()} Thiệp Cưới Online Hạnh Phúc.<br />Lưu giữ tình yêu trọn vẹn của hai bạn.
        </footer>
      </div>

    </div>
  );
}
