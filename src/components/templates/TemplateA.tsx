'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Wedding, Wish } from '@/types';

interface TemplateAProps {
  wedding: Wedding;
  to: string;
  wishes: Wish[];
  onNewWish?: (wish: Wish) => void;
}

export default function TemplateA({ wedding, to, wishes: initialWishes, onNewWish }: TemplateAProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setWishes(initialWishes);
  }, [initialWishes]);

  // Khởi tạo và quản lý nhạc nền
  useEffect(() => {
    if (wedding.music_url) {
      audioRef.current = new Audio(wedding.music_url);
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [wedding.music_url]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Autoplay blocked:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setFormMessage('');

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wedding_id: wedding.id,
          guest_name: name,
          content: content,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (onNewWish) {
          onNewWish(result.data);
        }
        setWishes([result.data, ...wishes]);
        setName('');
        setContent('');
        setFormMessage('Gửi lời chúc thành công! Cảm ơn bạn.');
      } else {
        setFormMessage('Gửi lời chúc thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
      setFormMessage('Đã xảy ra lỗi, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#4A3B32] font-serif relative overflow-x-hidden">
      {/* Import font Great Vibes & Playfair Display */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Quicksand:wght@300..700&display=swap"
        rel="stylesheet"
      />

      {/* Floating Music Button */}
      {wedding.music_url && (
        <button
          onClick={toggleMusic}
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
            isPlaying ? 'bg-[#D9383A] text-white animate-spin-slow' : 'bg-white border-2 border-[#D9383A] text-[#D9383A]'
          }`}
          aria-label="Toggle Music"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center p-4 bg-gradient-to-b from-[#FAF0E6] via-[#FFFDF9] to-[#FFFDF9]">
        {/* Border Decor */}
        <div className="absolute inset-8 border border-[#E8C895] pointer-events-none rounded-sm"></div>
        <div className="absolute inset-10 border-2 border-[#E8C895] pointer-events-none opacity-40 rounded-sm"></div>

        <div className="z-10 max-w-xl px-6">
          <p className="text-[#D9383A] tracking-[0.25em] text-sm font-semibold uppercase mb-6">Thư Mời Lễ Cưới</p>
          
          <h1 className="font-['Great_Vibes'] text-6xl md:text-8xl text-[#D9383A] my-4 leading-none">
            {wedding.groom_name}
          </h1>
          <span className="text-2xl font-['Great_Vibes'] text-[#E8C895] block my-2">&</span>
          <h1 className="font-['Great_Vibes'] text-6xl md:text-8xl text-[#D9383A] my-4 leading-none">
            {wedding.bride_name}
          </h1>

          {wedding.event_date && (
            <p className="mt-8 text-lg font-medium text-[#7C6656] tracking-[0.1em]">
              {new Date(wedding.event_date).toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}

          {to && (
            <div className="mt-12 p-6 bg-white border border-[#E8C895]/30 rounded-lg shadow-sm">
              <p className="text-xs uppercase tracking-[0.15em] text-[#7C6656] mb-2 font-['Quicksand'] font-medium">Trân trọng kính mời</p>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#D9383A]">{to}</h3>
              <p className="text-sm mt-3 text-[#7C6656] italic font-['Quicksand']">Tới dự buổi tiệc thân mật mừng ngày chung đôi của chúng tôi</p>
            </div>
          )}
        </div>
      </section>

      {/* Groom & Bride Info Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center border-t border-[#E8C895]/20">
        <h2 className="font-['Great_Vibes'] text-4xl md:text-5xl text-[#D9383A] mb-12">Cô Dâu & Chú Rể</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Chú rể */}
          <div className="bg-[#FAF7F2] p-8 border border-[#E8C895]/40 rounded-lg shadow-sm relative">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#D9383A] mb-4">Chú Rể</h3>
            <h4 className="font-['Playfair_Display'] text-xl font-bold mb-4">{wedding.groom_name}</h4>
            {wedding.location_info?.groom_family && (
              <div className="text-sm text-[#7C6656] font-['Quicksand'] space-y-1">
                {wedding.location_info.groom_family.father_name && <p>Con ông: {wedding.location_info.groom_family.father_name}</p>}
                {wedding.location_info.groom_family.mother_name && <p>Con bà: {wedding.location_info.groom_family.mother_name}</p>}
              </div>
            )}
          </div>

          {/* Cô dâu */}
          <div className="bg-[#FAF7F2] p-8 border border-[#E8C895]/40 rounded-lg shadow-sm relative">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#D9383A] mb-4">Cô Dâu</h3>
            <h4 className="font-['Playfair_Display'] text-xl font-bold mb-4">{wedding.bride_name}</h4>
            {wedding.location_info?.bride_family && (
              <div className="text-sm text-[#7C6656] font-['Quicksand'] space-y-1">
                {wedding.location_info.bride_family.father_name && <p>Con ông: {wedding.location_info.bride_family.father_name}</p>}
                {wedding.location_info.bride_family.mother_name && <p>Con bà: {wedding.location_info.bride_family.mother_name}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Date and Locations Section */}
      <section className="py-20 px-4 bg-[#FAF7F2] border-t border-b border-[#E8C895]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-['Great_Vibes'] text-4xl md:text-5xl text-[#D9383A] text-center mb-16">Thời Gian & Địa Điểm</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Nhà trai */}
            {wedding.location_info?.groom_family && (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E8C895]/20">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#D9383A] mb-4 border-b border-[#E8C895]/30 pb-2">Lễ Thành Hôn - Nhà Trai</h3>
                <div className="font-['Quicksand'] text-sm space-y-3 text-[#7C6656]">
                  <p><strong>Thời gian:</strong> {wedding.location_info.groom_family.time || '11:00'} - {wedding.location_info.groom_family.date || 'Ngày lành tháng tốt'}</p>
                  <p><strong>Địa chỉ:</strong> {wedding.location_info.groom_family.address || 'Đang cập nhật...'}</p>
                  {wedding.location_info.groom_family.map_url && (
                    <a
                      href={wedding.location_info.groom_family.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-6 py-2 bg-[#D9383A] text-white text-xs font-semibold uppercase tracking-wider rounded shadow hover:bg-[#B32729] transition duration-200"
                    >
                      Chỉ Đường Google Maps
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Nhà gái */}
            {wedding.location_info?.bride_family && (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E8C895]/20">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#D9383A] mb-4 border-b border-[#E8C895]/30 pb-2">Lễ Vu Quy - Nhà Gái</h3>
                <div className="font-['Quicksand'] text-sm space-y-3 text-[#7C6656]">
                  <p><strong>Thời gian:</strong> {wedding.location_info.bride_family.time || '11:00'} - {wedding.location_info.bride_family.date || 'Ngày lành tháng tốt'}</p>
                  <p><strong>Địa chỉ:</strong> {wedding.location_info.bride_family.address || 'Đang cập nhật...'}</p>
                  {wedding.location_info.bride_family.map_url && (
                    <a
                      href={wedding.location_info.bride_family.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-6 py-2 bg-[#D9383A] text-white text-xs font-semibold uppercase tracking-wider rounded shadow hover:bg-[#B32729] transition duration-200"
                    >
                      Chỉ Đường Google Maps
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery (Optional) */}
      {wedding.images && wedding.images.length > 0 && (
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <h2 className="font-['Great_Vibes'] text-4xl md:text-5xl text-[#D9383A] text-center mb-12">Album Ảnh Cưới</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wedding.images.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded shadow-sm border border-[#E8C895]/20 bg-white aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`Ảnh cưới ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Wishing Wall Section */}
      <section className="py-20 px-4 bg-[#FFFDF9] border-t border-[#E8C895]/20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Form gửi lời chúc */}
          <div className="p-8 bg-white border border-[#E8C895]/30 rounded-lg shadow-sm">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#D9383A] mb-6">Gửi Lời Chúc Mừng</h3>
            
            <form onSubmit={handleWishSubmit} className="space-y-4 font-['Quicksand']">
              <div>
                <label className="block text-sm font-medium text-[#7C6656] mb-1">Tên của bạn</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nhập tên của bạn..."
                  className="w-full p-3 border border-[#E8C895]/40 rounded bg-[#FFFDF9] focus:outline-none focus:border-[#D9383A] text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#7C6656] mb-1">Lời chúc</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Gửi những lời chúc tốt đẹp nhất tới cô dâu & chú rể..."
                  rows={4}
                  className="w-full p-3 border border-[#E8C895]/40 rounded bg-[#FFFDF9] focus:outline-none focus:border-[#D9383A] text-sm"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#D9383A] text-white rounded font-semibold uppercase tracking-wider text-xs shadow hover:bg-[#B32729] disabled:bg-gray-400 transition duration-200"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi Lời Chúc'}
              </button>

              {formMessage && (
                <p className="text-center text-sm font-medium text-[#7C6656] mt-4 italic">{formMessage}</p>
              )}
            </form>
          </div>

          {/* Danh sách lời chúc */}
          <div className="flex flex-col h-[400px]">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#D9383A] mb-6">Hòm Lời Chúc</h3>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {wishes.length === 0 ? (
                <div className="text-center py-12 text-[#7C6656] italic font-['Quicksand']">
                  Hãy là người đầu tiên gửi lời chúc tốt đẹp nhất đến cặp đôi!
                </div>
              ) : (
                wishes.map((wish) => (
                  <div key={wish.id} className="p-4 bg-[#FAF7F2] rounded border-l-4 border-[#D9383A] shadow-sm">
                    <p className="font-['Playfair_Display'] font-bold text-sm text-[#D9383A] mb-1">{wish.guest_name}</p>
                    <p className="text-sm font-['Quicksand'] text-[#7C6656] leading-relaxed whitespace-pre-wrap">{wish.content}</p>
                    <p className="text-[10px] text-gray-400 mt-2 font-['Quicksand']">
                      {new Date(wish.created_at).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#FAF7F2] text-center border-t border-[#E8C895]/20 font-['Quicksand'] text-xs text-[#7C6656]">
        <p className="uppercase tracking-[0.2em] font-semibold mb-2">Cảm Ơn Bạn Đã Đến Chung Vui</p>
        <p>&copy; {new Date().getFullYear()} - Thiết kế với tất cả tình yêu.</p>
      </footer>

      {/* Spin slow animation definition */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FFFDF9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E8C895;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
