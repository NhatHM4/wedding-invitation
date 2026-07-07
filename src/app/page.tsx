import React from 'react';

export default function Home() {
  const templates = [
    {
      id: 'template-classic',
      name: 'Mẫu Classic Romantic (Hồng Kem & Vàng)',
      description: 'Phong cách phương Tây thanh lịch, nhẹ nhàng. Giao diện nhã nhặn với hoa văn tối giản và nhạc nền du dương, mang lại cảm giác lãng mạn và tinh tế.',
      features: ['Nhạc nền looping tự động', 'Hộp thư gửi lời chúc', 'Thông tin gia đình & Google Maps', 'Album ảnh cưới'],
      previewUrl: '/card/minhhoang-maihuong',
      badge: 'Phổ biến nhất',
      colorTheme: 'bg-rose-50 border-rose-200 text-rose-700',
    },
    {
      id: 'template-dovang',
      name: 'Mẫu Traditional Red-Gold (Đỏ Vàng Hoàng Gia)',
      description: 'Phong cách Á Đông truyền thống. Ấn tượng với hiệu ứng mở rèm nhung đỏ sang trọng, con dấu song hỷ vàng óng cùng nhạc lễ ấm áp.',
      features: ['Hiệu ứng mở rèm hoành tráng', 'Hiệu ứng tim bay lãng mạn', 'Trình phát nhạc cổ điển', 'Hộp thư chúc mừng & album ảnh di động'],
      previewUrl: '/thiepmaudovang',
      badge: 'Hiệu ứng độc quyền',
      colorTheme: 'bg-amber-50 border-amber-200 text-amber-800',
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-between text-[#4A3B32] font-sans antialiased">
      {/* Header */}
      <header className="py-6 px-8 border-b border-[#E8C895]/20 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="text-xl font-bold tracking-widest text-[#D9383A] font-serif">
          E-WEDDING
        </div>
        <div className="text-xs font-semibold px-3 py-1 bg-[#FAF7F2] border border-[#E8C895]/30 rounded-full text-[#7C6656]">
          Dịch vụ thiệp cưới online cao cấp
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-4 max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <span className="bg-[#D9383A]/10 text-[#D9383A] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Nhanh chóng • Tối ưu di động • Chuẩn SEO
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-serif text-[#D9383A] font-bold leading-tight">
            Tạo Thiệp Cưới Online <br />
            Độc Bản & Tinh Tế
          </h1>

          <p className="text-base sm:text-lg text-[#7C6656] max-w-xl mx-auto leading-relaxed">
            Gửi lời mời trân trọng và nhận những lời chúc ý nghĩa từ người thân, bạn bè. 
            Thiết kế sang trọng, tải trang tức thời và hiển thị hoàn hảo trên mọi thiết bị.
          </p>
        </section>

        {/* Templates Showcase Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#D9383A] font-bold">Khám Phá Các Mẫu Thiệp Mẫu</h2>
            <p className="text-sm text-[#7C6656] mt-2">Bấm vào xem thử để trải nghiệm thực tế hiệu ứng hoạt họa và âm thanh</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {templates.map((tpl) => (
              <div 
                key={tpl.id}
                className="bg-white border border-[#E8C895]/20 rounded-xl shadow-lg hover:shadow-xl hover:border-[#E8C895]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Header card */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${tpl.colorTheme}`}>
                      {tpl.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#D9383A]">
                    {tpl.name}
                  </h3>
                  
                  <p className="text-sm text-[#7C6656] leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider">Tính năng nổi bật:</h4>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-[#7C6656]">
                      {tpl.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer card */}
                <div className="p-6 bg-[#FAF7F2] border-t border-[#E8C895]/10 flex gap-4">
                  <a
                    href={tpl.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 px-6 bg-[#D9383A] text-white rounded-lg font-semibold text-sm shadow hover:bg-[#B32729] transition-all duration-200"
                  >
                    Xem thử giao diện
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-gray-400 border-t border-[#E8C895]/20 bg-white/30">
        &copy; {new Date().getFullYear()} E-Wedding Platform. Thiết kế tối ưu cho trải nghiệm người dùng.
      </footer>
    </div>
  );
}
